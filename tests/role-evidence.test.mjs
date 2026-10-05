import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

const bundle = await build({ entryPoints: [new URL('../src/role-evidence.js', import.meta.url).pathname], bundle: true,
  format: 'esm', platform: 'browser', write: false, plugins: [{ name: 'raw', setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }] });
const { mountRoleEvidence } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const context = { spec_store: '/tmp/spec-store', role: 'Backend', requirement_id: 'BOOK-001', spec_id: 'BE-BOOK-001-booking' };
const ids = [1, 2, 3].map(n => `00000000-0000-4000-8000-00000000000${n}`);
const created_at = '2026-10-06T00:00:00Z';
const metadata = id => ({ id, created_at, stage: 'update', outcome: 'completed', file_count: 1 });
const record = (id, diff) => ({ id, context, created_at, stage: 'update', files: [{ path: 'proposal.md', status: 'modified', binary: false, diff }] });
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { resolve, promise }; };
async function eventually(check) {
  for (let i = 0; i < 100; i++) { if (check()) return; await new Promise(resolve => setTimeout(resolve, 5)); }
  assert.ok(check());
}
function setup(t, handler) {
  const dom = new JSDOM('<main></main>', { url: 'http://127.0.0.1:8000' });
  const container = dom.window.document.querySelector('main'), calls = [];
  const host = { agentServer: { async request(request) {
    if (request.path === '/server_info') return { runtime_services: { services: { automation: { url_from_agent: 'http://127.0.0.1:18001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY' } } } };
    if (request.path === '/api/file/home') return { home: '/Users/test' };
    const payload = JSON.parse(Buffer.from(request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1], 'base64').toString());
    calls.push(payload);
    const data = await handler(payload);
    return { stdout: JSON.stringify({ version: 1, kind: payload.action, data }), exit_code: 0, order: 0 };
  } } };
  const controller = mountRoleEvidence({ host, container, context });
  t.after(() => { controller.dispose(); dom.window.close(); });
  return { controller, container, calls,
    button(label) { return [...container.querySelectorAll('button')].find(node => node.textContent === label); },
    choose(id) { const select = container.querySelector('select'); select.value = id; select.dispatchEvent(new dom.window.Event('change')); } };
}

test('successive revisions render literal diffs and stale record responses cannot replace the selected revision', async t => {
  const old = deferred();
  const app = setup(t, payload => payload.action === 'history' ? { revisions: ids.slice(0, 2).map(metadata), reviews: [], deliveries: [] }
    : payload.input.id === ids[0] ? old.promise : record(ids[1], '-before\n+<img src=x onerror=alert(1)>\n+second update'));
  await eventually(() => app.calls.some(call => call.action === 'record'));
  app.choose(ids[1]); await eventually(() => app.container.textContent.includes('second update'));
  old.resolve(record(ids[0], '+stale first update')); await new Promise(resolve => setImmediate(resolve));
  assert.doesNotMatch(app.container.textContent, /stale first update/);
  assert.equal(app.container.querySelector('img, script'), null);
  assert.match(app.container.textContent, /<img src=x onerror=alert\(1\)>/);
  assert.deepEqual(new Set(app.calls.map(call => call.action)), new Set(['history', 'record']));
  assert.ok(app.calls.every(call => call.input.spec_id === context.spec_id));
});

test('switching tabs during initial history fetch retains history and renders the chosen receipt', async t => {
  const pending = deferred();
  const app = setup(t, payload => payload.action === 'history' ? pending.promise : {
    id: ids[2], context, created_at, stage: 'merge-request', state: 'complete', commit: 'a'.repeat(40), branch: 'codex/booking', url: 'https://github.com/example/backend/pull/7',
  });
  app.button('Delivery receipts').click();
  pending.resolve({ revisions: [], reviews: [], deliveries: [metadata(ids[2])] });
  await eventually(() => app.container.querySelector('a'));
  assert.equal(app.container.querySelector('a').href, 'https://github.com/example/backend/pull/7');
  assert.match(app.container.textContent, /Delivery: complete/);
  assert.equal(app.calls.find(call => call.action === 'record').input.kind, 'deliveries');
});

test('untrusted receipt links and cross-role records are rejected; disposing suppresses late records', async t => {
  for (const malformed of [{ ...record(ids[0], '+data'), context: { ...context, role: 'QA' } },
    { ...record(ids[0], '+data'), url: 'javascript:alert(1)' }]) {
    await t.test('invalid record', async child => {
      const app = setup(child, payload => payload.action === 'history' ? { revisions: [metadata(ids[0])], reviews: [], deliveries: [] } : malformed);
      await eventually(() => app.container.textContent.includes('Invalid role automation response'));
      assert.equal(app.container.querySelector('a, pre'), null);
    });
  }
  const pending = deferred();
  const app = setup(t, payload => payload.action === 'history' ? { revisions: [metadata(ids[0])], reviews: [], deliveries: [] } : pending.promise);
  await eventually(() => app.calls.some(call => call.action === 'record'));
  app.controller.dispose(); pending.resolve(record(ids[0], '+late'));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(app.container.childElementCount, 0);
});
