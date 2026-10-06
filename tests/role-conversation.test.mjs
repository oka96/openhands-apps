import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

const bundle = await build({ entryPoints: [new URL('../src/role-conversation.js', import.meta.url).pathname], bundle: true,
  format: 'esm', platform: 'browser', write: false, plugins: [{ name: 'raw', setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }] });
const { mountRoleConversation } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const context = { spec_store: '/tmp/spec-store', role: 'Backend', requirement_id: 'BOOK-001', spec_id: 'BE-BOOK-001-booking' };
const conversation = { id: '00000000-0000-4000-8000-000000000001', run_id: '00000000-0000-4000-8000-000000000002',
  stage: 'apply', status: 'COMPLETED', started_at: '2026-10-06T00:00:00Z' };
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { resolve, promise }; };
async function eventually(check) {
  for (let i = 0; i < 100; i++) { if (check()) return; await new Promise(resolve => setTimeout(resolve, 5)); }
  assert.ok(check());
}
function setup(t, handler = () => ({ conversation })) {
  const dom = new JSDOM('<main></main>', { url: 'http://127.0.0.1:8000' });
  const container = dom.window.document.querySelector('main'), calls = [], navigation = [], controllers = [];
  const host = { backend: { id: 'selected backend' }, agentServer: { async request(request) {
    if (request.path === '/server_info') return { runtime_services: { services: { automation: { url_from_agent: 'http://127.0.0.1:18001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY' } } } };
    if (request.path === '/api/file/home') return { home: '/Users/test' };
    const payload = JSON.parse(Buffer.from(request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1], 'base64').toString());
    calls.push(payload);
    const result = await handler(payload);
    return { stdout: JSON.stringify({ version: 1, kind: 'conversation', context: payload.input, ...result }), exit_code: 0, order: 0 };
  } } };
  const mount = (selected = context) => {
    const controller = mountRoleConversation({ host, container, context: selected, navigate: url => navigation.push(url) });
    controllers.push(controller); return controller;
  };
  t.after(() => { controllers.forEach(controller => controller.dispose()); dom.window.close(); });
  return { mount, container, calls, navigation, dom };
}

test('handoff survives remount without browser storage and preserves the selected backend', async t => {
  const app = setup(t), first = app.mount();
  await eventually(() => app.container.querySelector('a[href]'));
  first.dispose(); app.mount();
  await eventually(() => app.container.querySelector('a[href]'));
  const link = app.container.querySelector('a[href]'); link.click();
  assert.deepEqual(app.navigation, [`/conversations/${conversation.id}?backend=selected%20backend`]);
  assert.equal(app.calls.length, 2);
  assert.ok(app.calls.every(call => call.action === 'conversation' && JSON.stringify(call.input) === JSON.stringify(context)));
  assert.equal(app.dom.window.localStorage.length, 0);
});

test('empty lookup explains how to create a conversation and never starts work', async t => {
  const app = setup(t, () => ({ conversation: null })); app.mount();
  await eventually(() => app.container.textContent.includes('No related conversation yet'));
  assert.equal(app.container.querySelector('a'), null);
  assert.equal(app.container.querySelector('button').disabled, true);
  assert.match(app.container.textContent, /Run Propose, Update or Apply/);
  assert.deepEqual(app.calls.map(call => call.action), ['conversation']);
});

test('failed refresh removes a stale link and permits retry', async t => {
  let fail = false;
  const app = setup(t, () => { if (fail) throw new Error('Unavailable'); return { conversation: { ...conversation, status: 'RUNNING' } }; });
  const controller = app.mount(); await eventually(() => app.container.querySelector('a[href]'));
  fail = true; await controller.refresh();
  assert.match(app.container.textContent, /Could not find the conversation/);
  assert.equal(app.container.querySelector('a'), null);
  fail = false; await controller.refresh();
  assert.match(app.container.textContent, /RUNNING/);
  assert.ok(app.container.querySelector('a[href]'));
});

test('cross-spec, malformed and unsafe lookup results never produce links', async t => {
  for (const result of [{ context: { ...context, spec_id: 'BE-BOOK-001-other' }, conversation },
    { conversation: { ...conversation, id: '../escape' } }, { conversation: { ...conversation, stage: 'commit' } }]) {
    const app = setup(t, () => result); app.mount();
    await eventually(() => app.container.textContent.includes('Invalid role automation response'));
    assert.equal(app.container.querySelector('a'), null);
  }
});

test('late old-spec response cannot replace the newly selected spec', async t => {
  const pending = deferred();
  const app = setup(t, payload => payload.input.spec_id === context.spec_id ? pending.promise : { conversation: { ...conversation, id: conversation.run_id } });
  const old = app.mount(); await eventually(() => app.calls.length === 1); old.dispose();
  app.mount({ ...context, spec_id: 'BE-BOOK-001-other' });
  await eventually(() => app.container.querySelector('a[href]'));
  pending.resolve({ conversation }); await new Promise(resolve => setImmediate(resolve));
  assert.match(app.container.querySelector('a').href, new RegExp(conversation.run_id));
  assert.equal(app.container.querySelectorAll('section').length, 1);
});
