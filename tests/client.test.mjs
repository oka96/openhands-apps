import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, realpath, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { build } from 'esbuild';
import { collect } from '../src/collector.cjs';

const built = await build({ entryPoints: [new URL('../src/client.js', import.meta.url).pathname], bundle: true,
  format: 'esm', platform: 'browser', write: false, plugins: [{ name: 'raw-collector', setup(builder) {
    builder.onResolve({ filter: /collector\.cjs\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, 'collector.cjs'), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }] });
const { loadBoard, validateBoard, validateWorkspace } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`);
const execute = promisify(execFile);

async function fixture(t) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'board-client-'));
  const root = await realpath(temporary);
  // Quotes, Unicode and shell metacharacters must only travel through structured cwd.
  const cwd = path.join(root, "用户's $(echo injected) `echo surprise`");
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [index, role] of ['SA', 'Frontend', 'Backend', 'QA'].entries()) {
    const change = path.join(cwd, 'openspec/changes', `${['SA', 'FE', 'BE', 'QA'][index]}-REQ-001-sample`);
    await mkdir(path.join(change, 'specs/sample'), { recursive: true });
    await writeFile(path.join(change, 'proposal.md'), '# Proposal\n## Kanban\n- Requirement title: <img src=x onerror=alert(1)>\n');
    await writeFile(path.join(change, 'design.md'), '# Design');
    await writeFile(path.join(change, 'specs/sample/spec.md'), '# Spec');
    await writeFile(path.join(change, 'tasks.md'), `- [ ] 1.1 Finish ${role}\n- [ ] 1.2 Verify ${role}`);
  }
  const data = await collect({ action: 'board' }, { cwd });
  assert.equal(data.kind, 'board');
  return { cwd, data };
}
function response(data, overrides = {}) { return { stdout: JSON.stringify(data) + '\n', exit_code: 0, order: 0, ...overrides }; }
function hostReturning(value) { return { agentServer: { request: async () => value } }; }

test('the fixed embedded collector round-trips through a real shell with Unicode and hostile-looking cwd as data', async t => {
  const { cwd } = await fixture(t);
  let called = 0;
  const host = { agentServer: { request: async request => {
    called++;
    assert.equal(request.method, 'POST');
    assert.equal(request.path, '/api/bash/execute_bash_command');
    assert.equal(request.body.cwd, cwd);
    assert.ok(!request.body.command.includes(cwd));
    assert.equal(request.body.timeout, 30);
    const output = await execute('/bin/sh', ['-c', request.body.command], { cwd: request.body.cwd, maxBuffer: 1024 * 1024 });
    return { ...output, exit_code: 0, order: 0 };
  } } };
  const board = await loadBoard(host, cwd + '/');
  assert.equal(called, 1);
  assert.equal(board.workspace, cwd);
  assert.equal(board.name, path.basename(cwd));
  assert.equal(board.requirements[0].title, '<img src=x onerror=alert(1)>');
  assert.equal(Object.hasOwn(board.requirements[0], 'priority'), false);
});

test('workspace validation rejects unsafe or ambiguous paths before contacting the host', async () => {
  let calls = 0;
  const host = { agentServer: { request: async () => { calls++; } } };
  for (const value of ['relative', '/tmp/../store', '/tmp/.local/store', '/tmp/./store', '/tmp/line\nbreak', '/tmp/zero\0byte', '/tmp\\path']) {
    await assert.rejects(loadBoard(host, value), /absolute store directory/);
  }
  assert.equal(calls, 0);
  assert.equal(validateWorkspace('/tmp//store///'), '/tmp/store');
});

test('malformed, partial, failed, oversize and host-error responses never become a board', async t => {
  const { data, cwd } = await fixture(t);
  for (const value of [null, {}, response(data, { order: 1 }), response(data, { exit_code: null }),
    response(data, { exit_code: 1 }), response(data, { stdout: '{"version":1' }),
    response(data, { stdout: '🧪'.repeat(140_000) }), response(data, { stdout: JSON.stringify(data) + '\nextra' })]) {
    await assert.rejects(loadBoard(hostReturning(value), cwd));
  }
  await assert.rejects(loadBoard({ agentServer: { request: async () => { throw new Error('private connection details'); } } }, cwd), /Cannot read this store/);
  await assert.rejects(loadBoard(hostReturning(response({ version: 1, kind: 'error', message: 'Missing openspec/changes.' }, { exit_code: 1 })), cwd), /Missing openspec\/changes/);
});

test('client rejects stale, future, cross-workspace and duplicate requirement responses', async t => {
  const { data, cwd } = await fixture(t);
  for (const edit of [
    value => { value.generatedAt = new Date(Date.now() - 360_000).toISOString(); },
    value => { value.generatedAt = new Date(Date.now() + 120_000).toISOString(); },
    value => { value.workspace = '/some/other/store'; },
    value => { value.requirements.push(structuredClone(value.requirements[0])); },
    value => { value.version = 2; }, value => { value.generatedAt = 'yesterday'; },
  ]) {
    const next = structuredClone(data); edit(next);
    await assert.rejects(loadBoard(hostReturning(response(next)), cwd));
  }
});

test('client independently rejects removed fields and inconsistent counts, roles, completion gates, warnings, and source paths', async t => {
  const { data, cwd } = await fixture(t);
  for (const edit of [
    item => { item.priority = 'high'; },
    item => { item.complete = 4; }, item => { item.rolesComplete = 4; }, item => { item.stage = 'done'; },
    item => { item.roles[0].state = 'done'; }, item => { item.roles[0].total = 9; },
    item => { item.roles[0].tasks[0] = { ...item.roles[0].tasks[0], description: 'Different' }; }, item => { item.tasks[0].sourcePath = '/outside/tasks.md'; },
    item => { item.tasks[0].role = 'DevOps'; }, item => { item.tasks[0].done = 'yes'; },
    item => { item.tasks[1].id = item.tasks[0].id; }, item => { item.tasks[1].line = item.tasks[0].line; },
    item => { item.roles.reverse(); }, item => { item.specs[0].artifacts[0].path = '/outside/proposal.md'; },
    item => { item.specs[0].artifacts[0].status = 'missing'; item.specs[0].artifacts[0].content = 'Not empty'; },
    item => { item.specs[0].warnings = ['Not propagated']; }, item => { item.roles[0].note = 123; },
  ]) {
    const next = structuredClone(data); edit(next.requirements[0]);
    assert.throws(() => validateBoard(next, cwd), /invalid or inconsistent/);
  }
  assert.equal(validateBoard(data, cwd), data);
});

test('client rejects a fully checked requirement with zero tasks in one role falsely reported done', async t => {
  const { data, cwd } = await fixture(t);
  const item = data.requirements[0];
  item.tasks = item.tasks.filter(task => task.role !== 'QA');
  item.total = item.complete = 3;
  item.rolesComplete = 4;
  item.stage = 'done';
  item.tasks.forEach(task => { task.done = true; });
  item.roles.forEach(role => {
    role.tasks = item.tasks.filter(task => task.role === role.id);
    role.total = role.complete = role.tasks.length;
    role.state = 'done';
  });
  assert.throws(() => validateBoard(data, cwd), /invalid or inconsistent/);
});
