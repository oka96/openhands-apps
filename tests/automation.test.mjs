import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const output = await build({ entryPoints: [new URL('../src/automation.js', import.meta.url).pathname],
  bundle: true, format: 'esm', platform: 'browser', write: false, plugins: [{ name: 'raw-bridge', setup(builder) {
    builder.onResolve({ filter: /automation_bridge\.py\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, 'automation_bridge.py'), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }] });
const { callRoleAutomation, validateRoleInput } = await import(`data:text/javascript;base64,${Buffer.from(output.outputFiles[0].text).toString('base64')}`);
const execute = promisify(execFile);
const AUTO = '11dc086b-64d3-4414-bfad-f9a2ef84c503';
const REQUEST = '9f7c478c-5ad3-438d-a5c5-a4a24c173927';
const RUN = 'a4e6543c-4c21-4f9b-9a9e-6598d1f544d8';
const service = { url_from_agent: 'http://127.0.0.1:18021', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY' };
const baseInput = { stage: 'update', spec_store: '/Users/oka/Desktop/openspec-store', requirement_id: 'REQ-001',
  context_change: 'current-change', role: 'SA', change: 'current-change', request: 'Update 标签; $(never-run)', automation_id: AUTO, request_id: REQUEST };
const config = { workspace: '/Users/oka/Desktop/openhands-demo', spec_store: baseInput.spec_store,
  store_id: 'openspec-store', repository: '/Users/oka/Desktop/openhands-automation' };
const info = (kind = 'probe', ready = false) => ({ version: 1, kind, ready, configuration: config,
  automations: ready ? ['SA', 'Frontend', 'Backend', 'QA'].flatMap((role, r) => ['propose', 'update', 'apply'].map((stage, index) => ({
    id: AUTO.slice(0, -2) + (r * 3 + index).toString(16).padStart(2, "0"), stage, role, name: `OpenSpec ${role} · ${stage[0].toUpperCase()}${stage.slice(1)}`,
  }))) : [], message: 'Connect automations.' });
const dispatched = { version: 1, kind: 'dispatch', automation_id: AUTO, request_id: REQUEST, run_id: RUN };
const status = { version: 1, kind: 'status', automation_id: AUTO, run_id: RUN, status: 'RUNNING', conversation_id: null, error: null };

function host(value, overrides = {}) {
  const calls = [];
  return { calls, agentServer: { request: async options => {
    calls.push(options);
    if (options.path === '/server_info') return { runtime_services: { services: { automation: overrides.service ?? service } } };
    if (options.path === '/api/file/home') return { home: overrides.home ?? '/Users/oka' };
    if (overrides.fail) throw new Error('secret connection material');
    return overrides.output ?? { stdout: JSON.stringify(value), order: 0, exit_code: 0 };
  } } };
}

test('all four roles and three stages accept a single prompt with exact context rules', () => {
  for (const role of ['SA', 'Frontend', 'Backend', 'QA']) for (const stage of ['propose', 'update', 'apply']) {
    const input = { ...baseInput, role, stage, change: stage === 'propose' ? 'new-change' : 'current-change', request: stage === 'apply' ? '' : baseInput.request };
    assert.equal(validateRoleInput(input), input);
    const { automation_id, request_id, ...form } = input;
    assert.equal(validateRoleInput(form), form);
  }
});

test('malformed form data cannot contact Agent Server', async () => {
  for (const edit of [{ role: 'Admin' }, { stage: 'sync' }, { request: '' }, { request: 'x'.repeat(10001) },
    { spec_store: '/tmp/.local/store' }, { spec_store: '/tmp/../store' }, { requirement_id: '../../x' },
    { context_change: 'elsewhere' }, { change: '../escape' }, { change: 'different-change' }, { extra: true },
    { automation_id: 'invalid' }, { request_id: 'invalid' }, { stage: 'propose' }]) {
    const adapter = host(dispatched);
    await assert.rejects(callRoleAutomation(adapter, 'dispatch', { ...baseInput, ...edit }));
    assert.equal(adapter.calls.length, 0);
  }
});

test('probe is read-only bridge action and setup is explicit with bounded timeout', async () => {
  const adapter = host(info());
  assert.equal((await callRoleAutomation(adapter, 'probe')).ready, false);
  assert.equal(adapter.calls.length, 3);
  assert.equal(adapter.calls[2].body.timeout, 30);
  const setup = host(info('setup', true));
  assert.equal((await callRoleAutomation(setup, 'setup')).ready, true);
  assert.equal(setup.calls[2].body.timeout, 180);
  await assert.rejects(callRoleAutomation(adapter, 'probe', {}));
  await assert.rejects(callRoleAutomation(adapter, 'schedule'));
});

test('UTF-8 prompt and inputs are shell-quoted encoded data beside a fixed helper', async () => {
  const adapter = host(dispatched);
  assert.deepEqual(await callRoleAutomation(adapter, 'dispatch', baseInput), dispatched);
  const call = adapter.calls[2];
  assert.equal(call.path, '/api/bash/execute_bash_command');
  assert.equal(call.method, 'POST');
  assert.equal(call.body.cwd, '/Users/oka');
  assert.ok(!call.body.command.includes(baseInput.request));
  const parsed = await execute('python3', ['-c', 'import json,shlex,sys; print(json.dumps(shlex.split(sys.argv[1])))', call.body.command]);
  const args = JSON.parse(parsed.stdout);
  assert.deepEqual(args.slice(0, 2), ['python3', '-c']);
  assert.equal(args[2], await readFile(new URL('../src/automation_bridge.py', import.meta.url), 'utf8'));
  const payload = JSON.parse(Buffer.from(args[3], 'base64').toString('utf8'));
  assert.deepEqual(payload, { action: 'dispatch', service, home: '/Users/oka', input: baseInput });
  assert.equal(args.length, 4);
});

test('unsupported advertised service never executes a helper or guesses credentials', async () => {
  for (const change of [{ url_from_agent: 'https://example.com' }, { url_from_agent: 'http://user:secret@localhost' },
    { url_from_agent: 'http://127.0.0.1/path' }, { api_prefix: '/other' }, { auth_env_var: 'SECRET' }]) {
    const adapter = host(info(), { service: { ...service, ...change } });
    await assert.rejects(callRoleAutomation(adapter, 'probe'));
    assert.equal(adapter.calls.length, 2);
  }
  const adapter = host(info(), { home: '/tmp/../home' });
  await assert.rejects(callRoleAutomation(adapter, 'probe'));
  assert.equal(adapter.calls.length, 2);
});

test('malformed or mismatched connection and dispatch responses fail closed', async () => {
  for (const data of [null, {}, { ...info(), ready: true }, { ...info(), configuration: { ...config, repository: '/tmp/other' } },
    { ...info(), secret: 'private' }, { ...info(), automations: [{ id: AUTO, name: 'wrong', stage: 'apply' }] },
    { ...info('setup', true), kind: 'probe', automations: [info('setup', true).automations[0], info('setup', true).automations[0]] }]) {
    await assert.rejects(callRoleAutomation(host(data), 'probe'));
  }
  for (const data of [{ ...dispatched, request_id: RUN }, { ...dispatched, automation_id: RUN }, { ...dispatched, run_id: 'bad' },
    { ...dispatched, secret: 'private' }]) await assert.rejects(callRoleAutomation(host(data), 'dispatch', baseInput));
});

test('unknown outcomes are bounded and never retried automatically or leak host errors', async () => {
  const adapter = host(dispatched, { fail: true });
  await assert.rejects(callRoleAutomation(adapter, 'dispatch', baseInput), error => /outcome is unknown/.test(error.message) && !error.message.includes('secret'));
  assert.equal(adapter.calls.length, 3);
  for (const output of [null, {}, { stdout: '{}', order: 1, exit_code: 0 }, { stdout: '{', order: 0, exit_code: 0 },
    { stdout: JSON.stringify(dispatched), order: 0, exit_code: 1 }, { stdout: 'x'.repeat(140000), order: 0, exit_code: 0 }]) {
    // Null output is represented explicitly without the host's default fallback.
    const malformed = host(dispatched);
    const original = malformed.agentServer.request;
    malformed.agentServer.request = options => options.method === 'POST' ? Promise.resolve(output) : original(options);
    await assert.rejects(callRoleAutomation(malformed, 'dispatch', baseInput));
  }
  await assert.rejects(callRoleAutomation(host(null, { output: { order: 0, exit_code: 1,
    stdout: JSON.stringify({ version: 1, kind: 'error', message: 'Reconnect the role automations.' }) } }), 'probe'), /Reconnect/);
});

test('status requires exact run identity and validates native state and safe display fields', async () => {
  const input = { run_id: RUN, automation_id: AUTO };
  assert.deepEqual(await callRoleAutomation(host(status), 'status', input), status);
  for (const edit of [{ run_id: REQUEST }, { automation_id: REQUEST }, { status: 'SUCCESS' },
    { conversation_id: '/some/path' }, { error: 'x'.repeat(601) }, { run_metadata: {} }]) {
    await assert.rejects(callRoleAutomation(host({ ...status, ...edit }), 'status', input));
  }
  const adapter = host(status);
  await assert.rejects(callRoleAutomation(adapter, 'status', { ...input, request: 'extra' }));
  assert.equal(adapter.calls.length, 0);
});
