import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

const bundle = await build({
  entryPoints: [new URL('../src/role-actions.js', import.meta.url).pathname],
  bundle: true, format: 'esm', platform: 'browser', write: false,
  plugins: [{ name: 'raw-role-helper', setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, args => ({
      path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: 'raw',
    }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({
      contents: await readFile(args.path, 'utf8'), loader: 'text',
    }));
  } }],
});
const { mountRoleActions, mountRoleAutomationCatalog } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

const STORE = '/Users/oka/Desktop/openspec-store';
const PROJECT = '/Users/oka/Desktop/openhands-demo';
const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const STAGES = ['propose', 'update', 'apply'];
const ALL_ACTIONS = JSON.parse(await readFile(new URL('../../openhands-automation/runtime/actions.json', import.meta.url), 'utf8'));
const ALL_STAGES = ALL_ACTIONS.map(action => action.id);
const AUTOMATIONS = ROLES.flatMap((role, r) => ALL_STAGES.map((stage, index) => ({
  id: `0f0f0f0f-1111-4444-8888-${String(r * ALL_STAGES.length + index + 1).padStart(12, "0")}`,
  name: `OpenSpec ${role} · ${ALL_ACTIONS.find(action => action.id === stage).label}`, stage, role,
})));
const RUN_ID = '05ad810c-bcc0-409b-902d-1bc78023c22b';
const CONVERSATION_ID = '6f3d24ee-3348-4d84-991d-955359e50a29';
const SERVICE = { url_from_agent: 'http://127.0.0.1:8001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY' };
const PREFIXES = { SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' };
const REQUIREMENT = { id: 'REQ-004', title: 'Complete tasks', summary: 'Keep completed tasks visible.',
  specs: ROLES.flatMap(role => ['first', 'second'].map(feature => ({ id: `${PREFIXES[role]}-REQ-004-${feature}`, change: `${PREFIXES[role]}-REQ-004-${feature}`, role, title: feature }))) };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function output(value) { return { stdout: JSON.stringify(value), stderr: '', exit_code: 0, order: 0 }; }
function connection(action, options = {}) {
  return { version: 1, kind: action, ready: options.ready ?? true, automations: AUTOMATIONS,
    configuration: { workspace: PROJECT, spec_store: options.store || STORE, store_id: 'openspec-store',
      repository: '/Users/oka/Desktop/openhands-automation', profile: 'codex-acp-demo', skill_root: PROJECT, timeout_seconds: 1800 }, message: 'Connect the role automations.' };
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
async function eventually(check, message = 'UI state') {
  for (let i = 0; i < 80; i++) {
    if (check()) return;
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  assert.ok(check(), `Timed out waiting for ${message}`);
}
async function settled() { await new Promise(resolve => setImmediate(resolve)); }

function setup(t, options = {}) {
  const dom = new JSDOM('<!doctype html><main></main>', { url: 'http://127.0.0.1:8000/' });
  const previous = new Map(['document', 'localStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  Object.defineProperty(globalThis, 'document', { configurable: true, value: dom.window.document });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: dom.window.localStorage });
  for (const [key, value] of Object.entries(options.storage || {})) dom.window.localStorage.setItem(key, value);
  const container = dom.window.document.querySelector('main');
  const evidenceCalls = [], actions = [], requests = [], navigation = [], selections = [], storageAccess = [], disposers = new Set();
  if (options.trackStorage) for (const method of ['getItem', 'setItem', 'removeItem']) {
    const original = dom.window.Storage.prototype[method];
    t.mock.method(dom.window.Storage.prototype, method, function (...args) {
      storageAccess.push([method, ...args]);
      return original.apply(this, args);
    });
  }
  let activeRole = options.role || 'SA';
  let currentDispose;
  const host = {
    backend: { id: options.backend || 'local-main', kind: 'local' },
    agentServer: { async request(request) {
      requests.push(request);
      if (request.path === '/server_info') return options.advertised === false ? {} : { runtime_services: { services: { automation: SERVICE } } };
      if (request.path === '/api/file/home') return { home: '/Users/test' };
      assert.equal(request.method, 'POST');
      assert.equal(request.path, '/api/bash/execute_bash_command');
      assert.equal(request.body.cwd, '/Users/test');
      const encoded = request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)?.[1];
      assert.ok(encoded, 'The fixed helper must receive one encoded JSON argument');
      const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
      assert.deepEqual(payload.service, SERVICE);
      assert.equal(payload.home, '/Users/test');
      if (['history', 'record'].includes(payload.action)) {
        evidenceCalls.push(payload);
        return options.evidence ? options.evidence(payload) : output({ version: 1, kind: 'history', data: { revisions: [], reviews: [], deliveries: [] } });
      }
      actions.push(payload);
      if (options.action) {
        const handled = await options.action(payload, actions.length);
        if (handled !== undefined) return handled;
      }
      if (payload.action === 'dispatch') return output({ version: 1, kind: 'dispatch',
        automation_id: payload.input.automation_id, request_id: payload.input.request_id, run_id: RUN_ID });
      if (payload.action === 'status') return output({ version: 1, kind: 'status',
        automation_id: payload.input.automation_id, run_id: payload.input.run_id,
        status: 'COMPLETED', error: null, conversation_id: CONVERSATION_ID, report: null });
      return output(connection(payload.action, { ready: payload.action === 'setup' || options.ready !== false, store: options.connectionStore }));
    } },
  };
  function mount(overrides = {}) {
    activeRole = overrides.role || options.role || 'SA';
    host.backend.id = overrides.backend || options.backend || 'local-main';
    const requirement = Object.hasOwn(overrides, 'requirement') ? overrides.requirement
      : Object.hasOwn(options, 'requirement') ? options.requirement : REQUIREMENT;
    const dispose = options.catalog ? mountRoleAutomationCatalog({ host, container, navigate: href => navigation.push(href),
      role: activeRole, showConnection: options.showConnection }) : mountRoleActions({ host, container, navigate: href => navigation.push(href),
      workspace: overrides.store || options.store || STORE,
      requirement,
      onSetupComplete: options.onSetupComplete,
      externalSelection: options.externalSelection,
      initialStage: Object.hasOwn(overrides, 'initialStage') ? overrides.initialStage : options.initialStage,
      initialDraft: Object.hasOwn(overrides, 'initialDraft') ? overrides.initialDraft : options.initialDraft,
      onStageChange: (stage, state) => { selections.push([stage, state]); options.onStageChange?.(stage, state); },
      specId: Object.hasOwn(overrides, 'specId') ? overrides.specId : Object.hasOwn(options, 'specId') ? options.specId
        : requirement ? `${PREFIXES[activeRole]}-${requirement.id}-first` : null,
      role: { id: activeRole, label: activeRole, specs: requirement?.specs?.filter(spec => spec.role === activeRole).map(spec => spec.id), tasks: [], total: 0, complete: 0, state: 'backlog' } });
    disposers.add(dispose); currentDispose = dispose;
    return dispose;
  }
  function dispose() { currentDispose?.(); disposers.delete(currentDispose); currentDispose = null; }
  mount();
  t.after(() => {
    for (const clean of disposers) clean();
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
    }
  });
  const query = selector => container.querySelector(selector);
  const button = name => [...container.querySelectorAll('button')].find(node => node.textContent === name);
  return { dom, container, host, requests, actions, evidenceCalls, navigation, selections, storageAccess, mount, dispose, query, button,
    controller: () => currentDispose,
    async ready() {
      const panel = query(options.catalog ? '.osb-automation-catalog' : '.osb-role-actions');
      await eventually(() => panel.getAttribute('aria-busy') === 'false', 'connection probe');
    },
    select(stage) {
      const node = query(`[aria-label="${activeRole} automation"]`); node.value = stage;
      node.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    },
    fill(prompt, change = 'add-task-reminders') {
      query(`[aria-label="${activeRole} prompt"]`).value = prompt;
      query(`[aria-label="${activeRole} new feature name"]`).value = change;
    },
    submit() { query('form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })); },
    dispatched() { return actions.filter(item => item.action === 'dispatch'); },
    stored() { return Object.entries(dom.window.localStorage); },
  };
}

test('inline role controls default to Apply and automatically probe without connecting or dispatching', async t => {
  const app = setup(t);
  assert.equal(app.query('details, summary'), null);
  assert.equal(app.query('.osb-role-actions').getAttribute('aria-label'), 'Run OpenSpec automation for SA');
  assert.equal(app.query('.osb-role-actions-body').firstElementChild, app.query('form'));
  assert.equal(app.container.querySelectorAll('select').length, 4, 'Role spec is supplied by the parent');
  assert.equal(app.query('[aria-label="SA automation"]').value, 'apply');
  assert.equal(app.query('[aria-label="SA new feature name"]').parentElement.hidden, true);
  assert.equal(app.query('[aria-label="SA prompt"]').required, false);
  assert.equal(app.button('Run SA Apply').disabled, true);
  await app.ready();
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
  assert.equal(app.button('Run SA Apply').disabled, false);
  assert.match(app.container.textContent, /Managed workspaces:.*openhands-demo/);
  assert.match(app.container.textContent, /Spec store:.*openspec-store/);
  await app.ready();
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
});

test('Connect installs explicitly while Check connection remains read-only', async t => {
  const app = setup(t, { ready: false });
  await app.ready();
  assert.equal(app.button('Run SA Apply').disabled, true);
  app.button('Connect shared automations').click();
  await eventually(() => !app.button('Run SA Apply').disabled);
  app.button('Check connection').click();
  await eventually(() => app.actions.length === 3 && app.query('.osb-role-actions').getAttribute('aria-busy') === 'false');
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'setup', 'probe']);
  assert.equal(app.dispatched().length, 0);
});

for (const role of ROLES) for (const stage of STAGES) {
  test(`${role} ${stage} submits exactly its selected role, automation, requirement and single prompt`, async t => {
    const app = setup(t, { role });
    await app.ready(); app.select(stage);
    const prompt = stage === 'apply' ? '' : `Refine 标签 for ${role}; keep $(commands), "quotes" and \`text\` as data.`;
    app.fill(prompt); app.submit();
    await eventually(() => app.query('a')?.textContent.includes('Open automation run'));
    assert.equal(app.dispatched().length, 1);
    const input = app.dispatched()[0].input;
    assert.deepEqual({ ...input, automation_id: undefined, request_id: undefined }, {
      stage, spec_store: STORE, requirement_id: REQUIREMENT.id, context_change: `${PREFIXES[role]}-REQ-004-first`,
      role, change: `${PREFIXES[role]}-REQ-004-${stage === 'propose' ? 'add-task-reminders' : 'first'}`, spec_id: `${PREFIXES[role]}-REQ-004-${stage === 'propose' ? 'add-task-reminders' : 'first'}`, request: prompt,
      automation_id: undefined, request_id: undefined,
    });
    assert.equal(input.automation_id, AUTOMATIONS.find(item => item.stage === stage && item.role === role).id);
    assert.match(input.request_id, UUID);
    assert.equal(app.query('input').parentElement.hidden, stage !== 'propose');
    assert.equal(app.query('textarea').required, stage !== 'apply');
    assert.equal(app.button(`Run ${role} ${stage[0].toUpperCase()}${stage.slice(1)}`).disabled, true);
    const persisted = JSON.stringify(app.stored());
    assert.doesNotMatch(persisted, /标签|\$\(commands\)|auth_env_var|request"/);
    app.query('a').click();
    assert.equal(app.navigation.at(-1), `/automations/${input.automation_id}?run=${RUN_ID}`);
  });
}

test('invalid Propose and Update inputs cannot dispatch; switching automations updates required inputs and boundaries', async t => {
  const app = setup(t);
  await app.ready();
  for (const [stage, prompt, change] of [
    ['propose', '', 'new-change'], ['propose', 'Concrete work', ''], ['propose', 'Concrete work', '../outside'],
    ['propose', 'Concrete work', 'first'], ['propose', 'x'.repeat(10001), 'new-change'],
    ['update', ' \n ', 'ignored'], ['update', 'x'.repeat(10001), 'ignored'],
  ]) {
    app.select(stage); app.fill(prompt, change); app.submit();
    await settled();
    assert.equal(app.dispatched().length, 0, `Rejected ${stage}: ${change}`);
    assert.ok(app.query('[role="status"]').textContent.length, 'Show actionable validation feedback');
  }
  app.select('update');
  assert.match(app.query('.osb-skill-help').textContent, /Revise the selected specification/);
  app.select('apply');
  assert.match(app.query('.osb-skill-help').textContent, /Implement the selected spec tasks/);
  assert.equal(app.query('input').parentElement.hidden, true);
  assert.equal(app.query('textarea').required, false);
});

test('a missing advertised service or mismatched store cannot dispatch work', async t => {
  for (const options of [{ advertised: false }, { connectionStore: '/another/store' }]) {
    await t.test(JSON.stringify(options), async child => {
      const app = setup(child, options);
      await app.ready(); app.submit(); await settled();
      assert.equal(app.button('Run SA Apply').disabled, true);
      assert.equal(app.dispatched().length, 0);
      if (options.advertised === false) assert.equal(app.actions.length, 0);
      else assert.match(app.container.textContent, /not the configured.*store/);
    });
  }
});

test('duplicate submissions are suppressed while pending and after the returned run', async t => {
  const pending = deferred();
  const app = setup(t, { action: payload => payload.action === 'dispatch' ? pending.promise : undefined });
  await app.ready(); app.fill('Implement the selected role only.'); app.submit(); app.submit();
  await eventually(() => app.dispatched().length === 1);
  assert.equal(app.query('select').disabled, true);
  assert.equal(app.query('textarea').disabled, true);
  const input = app.dispatched()[0].input;
  pending.resolve(output({ version: 1, kind: 'dispatch', automation_id: input.automation_id, request_id: input.request_id, run_id: RUN_ID }));
  await eventually(() => app.query('a'));
  app.submit(); await settled();
  assert.equal(app.dispatched().length, 1);
});

test('uncertain dispatch retains its request reference through remount and never silently retries', async t => {
  const app = setup(t, { action: payload => {
    if (payload.action === 'dispatch') throw new Error('connection lost');
  } });
  await app.ready(); app.submit();
  await eventually(() => app.query('a')?.textContent.includes('Inspect automation history'));
  const request = app.dispatched()[0].input;
  assert.match(app.container.textContent, /may have started/);
  assert.ok(app.container.textContent.includes(request.request_id));
  app.dispose(); app.mount(); await app.ready(); app.submit(); await settled();
  assert.equal(app.dispatched().length, 1);
  assert.equal(app.button('Run SA Apply').disabled, true);
  app.query('a').click();
  assert.equal(app.navigation.at(-1), `/automations/${request.automation_id}`);
  app.button('Start another run').click();
  assert.equal(app.button('Run SA Apply').disabled, false);
  assert.equal(app.dispatched().length, 1, 'Resetting a reference is not a submission');
});

test('saved run references isolate backend, store, requirement and role and preserve the original run on return', async t => {
  const app = setup(t);
  await app.ready(); app.submit(); await eventually(() => app.query('a'));
  for (const overrides of [{ backend: 'other-backend' }, { store: '/other/store' },
    { role: 'Frontend' }, { requirement: { ...REQUIREMENT, id: 'REQ-005' } }]) {
    app.dispose(); app.mount(overrides); await app.ready();
    assert.equal(app.query('a'), null, `No prior run leaked into ${JSON.stringify(overrides)}`);
  }
  app.dispose(); app.mount(); await app.ready();
  assert.equal(app.query('a')?.getAttribute('href'), `/automations/${AUTOMATIONS.find(item => item.role === 'SA' && item.stage === 'apply').id}?run=${RUN_ID}`);
  assert.equal(app.dispatched().length, 1);
  assert.equal(app.query('textarea').value, '', 'Prompt text is not restored from storage');
});

test('a disposed dispatch response cannot replace a newer request saved by the remounted panel', async t => {
  const pending = deferred();
  let dispatchCount = 0;
  const app = setup(t, { action: payload => {
    if (payload.action === 'dispatch' && ++dispatchCount === 1) return pending.promise;
  } });
  await app.ready(); app.submit();
  await eventually(() => app.dispatched().length === 1);
  const earlier = app.dispatched()[0].input;
  app.dispose(); app.mount(); await app.ready();
  app.button('Start another run').click(); app.submit();
  await eventually(() => app.dispatched().length === 2 && app.query('a')?.textContent.includes('Open automation run'));
  const newer = app.dispatched()[1].input;
  assert.notEqual(earlier.request_id, newer.request_id);
  const before = app.stored();
  pending.resolve(output({ version: 1, kind: 'dispatch', automation_id: earlier.automation_id,
    request_id: earlier.request_id, run_id: '661994fa-ec3a-4f31-9749-6dd2792ff8ea' }));
  await settled(); await settled();
  assert.deepEqual(app.stored(), before, 'Late results preserve the newer persisted reference');
  app.dispose(); app.mount(); await app.ready();
  assert.ok(app.container.textContent.includes(newer.request_id));
  assert.ok(!app.container.textContent.includes(earlier.request_id));
  assert.equal(app.query('a').getAttribute('href'), `/automations/${newer.automation_id}?run=${RUN_ID}`);
  assert.equal(app.dispatched().length, 2);
});

test('status refresh exposes native run and conversation links without changing requirement progress or dispatching', async t => {
  const app = setup(t);
  const before = structuredClone(REQUIREMENT);
  await app.ready(); app.submit(); await eventually(() => app.button('Refresh run status'));
  app.button('Refresh run status').click();
  await eventually(() => app.query('.osb-run-status'));
  assert.match(app.query('.osb-run-status').textContent, /completed/);
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'dispatch', 'status']);
  assert.match(app.container.textContent, /Refresh the requirement/);
  assert.deepEqual(REQUIREMENT, before);
  const conversation = [...app.container.querySelectorAll('a')].find(node => node.textContent.includes('Open conversation'));
  conversation.click();
  assert.equal(app.navigation.at(-1), `/conversations/${CONVERSATION_ID}`);
  assert.equal(app.dispatched().length, 1);
});

for (const role of ROLES) test(`${role} can submit Update after a completed Review without dismissing its result`, async t => {
  const app = setup(t, { role });
  await app.ready(); app.select('review'); app.submit();
  await eventually(() => app.button('Refresh run status'));
  app.select('update'); app.fill('Clarify the existing contract');
  assert.equal(app.button(`Run ${role} Update`).disabled, true, 'Unverified previous run still blocks submission');
  await app.ready();
  assert.equal(app.button(`Run ${role} Update`).disabled, false);
  assert.match(app.query('.osb-run-status').textContent, /completed/);
  assert.equal(app.dispatched().length, 1, 'Reading status never starts the next action');
  assert.equal(app.actions.filter(item => item.action === 'status').length, 1, 'Selecting the next action checks the previous run automatically');
  app.submit(); await eventually(() => app.dispatched().length === 2);
  assert.equal(app.dispatched()[1].input.stage, 'update');
  assert.equal(app.dispatched()[1].input.request, 'Clarify the existing contract');
  assert.notEqual(app.dispatched()[1].input.request_id, app.dispatched()[0].input.request_id);
  assert.equal(app.button(`Run ${role} Update`).disabled, true, 'The new request owns the lock');
});

test('remount checks a saved run and releases only confirmed terminal statuses', async t => {
  for (const status of ['COMPLETED', 'FAILED', 'CANCELLED', 'SKIPPED', 'PENDING', 'RUNNING', 'unavailable']) await t.test(status, async child => {
    const app = setup(child, { action: payload => {
      if (payload.action !== 'status') return;
      if (status === 'unavailable') throw new Error('Status unavailable');
      return output({ version: 1, kind: 'status', automation_id: payload.input.automation_id,
        run_id: payload.input.run_id, status, error: null, conversation_id: null, report: null });
    } });
    await app.ready(); app.submit(); await eventually(() => app.button('Refresh run status'));
    const history = app.stored();
    app.dispose(); app.mount({ initialStage: 'update' }); await app.ready();
    assert.equal(app.actions.filter(item => item.action === 'status').length, 1, 'Reload must read the saved native run');
    assert.equal(app.dispatched().length, 1, 'Reload never retries or starts work');
    assert.equal(app.button('Run SA Update').disabled, ['PENDING', 'RUNNING', 'unavailable'].includes(status));
    assert.deepEqual(app.stored(), history, 'Keep the prior result reference visible');
  });
});

test('failed run displays literal error evidence and missing conversation does not create a link', async t => {
  const app = setup(t, { action: payload => payload.action === 'status' ? output({
    version: 1, kind: 'status', automation_id: payload.input.automation_id, run_id: payload.input.run_id,
    status: 'FAILED', error: '<img src=x onerror=alert(1)> Missing approval.', conversation_id: null, report: null,
  }) : undefined });
  await app.ready(); app.submit(); await eventually(() => app.button('Refresh run status'));
  app.button('Refresh run status').click(); await eventually(() => app.query('.osb-run-status'));
  assert.match(app.container.textContent, /failed.*Missing approval/s);
  assert.equal(app.query('img'), null);
  assert.equal(app.container.querySelectorAll('a').length, 1);
  assert.equal(app.dispatched().length, 1);
});

test('late connection, dispatch and status results cannot recreate a disposed role panel', async t => {
  for (const action of ['probe', 'dispatch', 'status']) await t.test(action, async child => {
    const pending = deferred();
    const app = setup(child, { action: payload => payload.action === action ? pending.promise : undefined });
    if (action !== 'probe') {
      await app.ready(); app.submit();
      if (action === 'status') {
        await eventually(() => app.button('Refresh run status'));
        app.button('Refresh run status').click();
      }
    }
    await eventually(() => app.actions.some(item => item.action === action));
    const input = app.actions.find(item => item.action === action).input;
    app.dispose();
    const value = action === 'probe' ? connection('probe') : action === 'dispatch' ? {
      version: 1, kind: action, automation_id: input.automation_id, request_id: input.request_id, run_id: RUN_ID,
    } : { version: 1, kind: action, automation_id: input.automation_id, run_id: RUN_ID,
      status: 'COMPLETED', error: null, conversation_id: CONVERSATION_ID, report: null };
    pending.resolve(output(value)); await settled(); await settled();
    assert.equal(app.container.childElementCount, 0);
    assert.deepEqual(app.navigation, []);
  });
});

test('the bound sibling spec is immutable and prior history never overrides the new target or automation', async t => {
  const app = setup(t, { role: 'Frontend', specId: 'FE-REQ-004-second' });
  await app.ready(); app.select('update'); app.fill('Refine the second spec'); app.submit();
  await eventually(() => app.dispatched().length === 1 && app.query('a'));
  assert.equal(app.dispatched()[0].input.spec_id, 'FE-REQ-004-second');
  assert.match(app.query('[role="status"]').textContent, /FE-REQ-004-second/);
  app.dispose(); app.mount({ specId: 'FE-REQ-004-first' }); await app.ready();
  assert.equal(app.query('[aria-label="Frontend spec"]'), null);
  assert.equal(app.query('[aria-label="Frontend automation"]').value, 'apply');
  assert.equal(app.query('[aria-label="Frontend automation"]').disabled, false);
  assert.match(app.query('[role="status"]').textContent, /FE-REQ-004-second/);
  assert.equal(app.dispatched().length, 1);
  app.button('Start another run').click(); app.submit();
  await eventually(() => app.dispatched().length === 2 && app.query('a'));
  assert.equal(app.dispatched()[1].input.spec_id, 'FE-REQ-004-first');
  assert.equal(app.dispatched()[1].input.stage, 'apply');
});

test('effective configuration follows Automation and explains the supported entry point', async t => {
  const app = setup(t);
  await app.ready();
  assert.match(app.query('.osb-automation-target').textContent, /Effective settings.*Role: SA.*Automation: Apply.*codex-acp-demo.*1800 seconds.*Workflow resources:/s);
  assert.match(app.container.textContent, /Native Run now has no requirement context/);
  assert.match(app.container.textContent, /native profile selector does not override/);
  app.select('update');
  assert.match(app.query('.osb-automation-target').textContent, /Automation: Update/);
  app.select('propose');
  assert.match(app.query('.osb-automation-target').textContent, /Automation: Propose/);
  assert.equal(app.dispatched().length, 0);
});

test('unconnected settings are explicitly marked as requiring reconnect', async t => {
  const app = setup(t, { ready: false });
  await app.ready();
  assert.match(app.query('.osb-automation-target').textContent, /Configured settings · reconnect required/);
  assert.equal(app.button('Run SA Apply').disabled, true);
});

test('business outcomes preserve lifecycle, original findings, audit details and historical profile as text', async t => {
  for (const [kind, label] of [['completed', 'Completed'], ['blocked', 'Waiting for dependency'],
    ['needs_review', 'Needs review'], ['execution_error', 'Execution error']]) await t.test(kind, async child => {
    const { repository, ...configuration } = connection('probe').configuration;
    const outcome = { status: kind, blocker_type: kind === 'blocked' ? 'dependency' : null,
      summary: '<img src=x onerror=alert(1)> Backend API skill missing', findings: ['Original blocker'],
      audit_errors: kind === 'execution_error' ? ['Missing correction reason'] : [],
      next_action: 'Implement Backend labels first', agent_status: kind === 'execution_error' ? 'blocked' : null };
    const app = setup(child, { action: payload => payload.action === 'status' ? output({
      version: 1, kind: 'status', automation_id: payload.input.automation_id, run_id: payload.input.run_id,
      status: kind === 'completed' ? 'COMPLETED' : 'FAILED', conversation_id: CONVERSATION_ID, error: null,
      report: { role: 'SA', stage: 'apply', requirement_id: REQUIREMENT.id, spec_id: 'SA-REQ-004-first',
        configuration: { ...configuration, profile: 'previous-run-profile' }, outcome },
    }) : undefined });
    await app.ready(); app.submit(); await eventually(() => app.button('Refresh run status'));
    app.button('Refresh run status').click(); await eventually(() => app.query('.osb-run-status'));
    assert.equal(app.query('.osb-run-status').textContent, `Result: ${label}`);
    assert.equal(app.query('.osb-outcome-summary').textContent, outcome.summary, 'Authored outcome wording remains literal');
    assert.match(app.container.textContent, /Native run:.*Original blocker.*Next: Implement Backend labels first.*Run profile: previous-run-profile/s);
    assert.match(app.query('.osb-automation-target').textContent, /codex-acp-demo/);
    if (kind === 'execution_error') assert.match(app.container.textContent, /Agent reported: blocked.*Audit: Missing correction reason/s);
    assert.equal(app.query('img'), null);
    assert.equal(app.button('Run SA Apply').disabled, false, 'A finished native run does not lock the next action');
    assert.equal(app.dispatched().length, 1);
  });
});

test('foreign spec report is not rendered inside a saved run', async t => {
  const { repository, ...configuration } = connection('probe').configuration;
  const app = setup(t, { action: payload => payload.action === 'status' ? output({
    version: 1, kind: 'status', automation_id: payload.input.automation_id, run_id: payload.input.run_id,
    status: 'FAILED', conversation_id: CONVERSATION_ID, error: null,
    report: { role: 'SA', stage: 'apply', requirement_id: REQUIREMENT.id, spec_id: 'SA-REQ-004-second', configuration,
      outcome: { status: 'blocked', blocker_type: 'dependency', summary: 'Foreign private details', findings: [],
        audit_errors: [], next_action: 'Foreign next action', agent_status: null } },
  }) : undefined });
  await app.ready(); app.submit(); await eventually(() => app.button('Refresh run status'));
  app.button('Refresh run status').click();
  await eventually(() => app.container.textContent.includes('do not match this submitted spec'));
  assert.doesNotMatch(app.container.textContent, /Foreign private/);
  assert.equal(app.button('Run SA Apply').disabled, true, 'A mismatched status cannot release the lock');
});

test('an earlier run retains its original spec identity when that spec is removed', async t => {
  const app = setup(t);
  await app.ready(); app.submit();
  await eventually(() => app.query('a'));
  app.dispose();
  app.mount({ specId: 'SA-REQ-004-second', requirement: { ...REQUIREMENT, specs: REQUIREMENT.specs.filter(spec => spec.id !== 'SA-REQ-004-first') } });
  await app.ready();
  assert.match(app.query('[role="status"]').textContent, /SA-REQ-004-first/);
  assert.equal(app.button('Run SA Apply').disabled, false, 'The completed earlier run does not block the current spec');
  assert.equal(app.dispatched().length, 1);
});

test('legacy metadata stays read-only and empty roles can explicitly propose a canonical spec', async t => {
  await t.test('legacy', async child => {
    const { specs, ...legacy } = REQUIREMENT;
    const app = setup(child, { requirement: legacy });
    await app.ready(); app.submit(); await settled();
    assert.equal(app.button('Run SA Apply').disabled, true);
    assert.match(app.query('.osb-skill-help').textContent, /canonical role change/);
    assert.equal(app.dispatched().length, 0);
  });
  await t.test('empty role', async child => {
    const app = setup(child, { role: 'Backend', specId: '', requirement: { ...REQUIREMENT, specs: REQUIREMENT.specs.filter(spec => spec.role !== 'Backend') } });
    await app.ready();
    assert.equal(app.query('[aria-label="Backend automation"]').value, 'propose');
    for (const stage of ['update', 'apply']) {
      app.select(stage); app.fill('No existing spec'); app.submit(); await settled();
      assert.equal(app.button(`Run Backend ${stage === 'update' ? 'Update' : 'Apply'}`).disabled, true);
      assert.match(app.query('.osb-skill-help').textContent, /Choose an existing Role spec/);
      assert.equal(app.dispatched().length, 0);
    }
    app.select('propose');
    app.fill('Plan date validation', 'date-validation');
    app.query('input').dispatchEvent(new app.dom.window.Event('input'));
    assert.match(app.container.textContent, /New spec: BE-REQ-004-date-validation/);
    app.submit(); await eventually(() => app.query('a'));
    assert.equal(app.dispatched()[0].input.spec_id, 'BE-REQ-004-date-validation');
    assert.equal(app.dispatched()[0].input.change, 'BE-REQ-004-date-validation');
  });
});

test('running run evidence does not lock automation or draft editing, including after remount', async t => {
  const app = setup(t, { action: payload => payload.action === 'status' ? output({
    version: 1, kind: 'status', automation_id: payload.input.automation_id, run_id: payload.input.run_id,
    status: 'RUNNING', error: null, conversation_id: null, report: null,
  }) : undefined });
  await app.ready(); app.select('propose'); app.fill('Plan reminders', 'reminders'); app.submit();
  await eventually(() => app.query('a'));
  const history = app.stored();
  app.dispose(); app.mount(); await app.ready();
  assert.equal(app.query('select').value, 'apply', 'Previous Propose does not choose the next automation');
  assert.equal(app.query('input').value, '', 'A previous feature name is not a new draft');
  for (const stage of STAGES) {
    assert.equal(app.query('select').disabled, false);
    assert.equal(app.query('textarea').disabled, false);
    assert.equal(app.query('input').disabled, false);
    app.select(stage); app.fill('A new draft', 'other-feature');
    assert.equal(app.query('input').parentElement.hidden, stage !== 'propose');
    assert.equal(app.query('textarea').required, stage !== 'apply');
    assert.match(app.query('[role="status"]').textContent, /SA-REQ-004-reminders/);
    assert.equal(app.button(`Run SA ${stage[0].toUpperCase()}${stage.slice(1)}`).disabled, true);
    app.submit(); await settled();
    assert.equal(app.dispatched().length, 1);
    assert.deepEqual(app.stored(), history);
  }
  assert.match(app.query('[role="status"]').textContent, /Start another run/);
  app.button('Start another run').click();
  assert.equal(app.button('Run SA Apply').disabled, false);
  assert.equal(app.dispatched().length, 1);
});

test('connection probes, setup and status checks leave automation and draft inputs responsive', async t => {
  for (const action of ['probe', 'setup', 'status']) await t.test(action, async child => {
    const pending = deferred();
    const app = setup(child, { ready: action !== 'setup',
      action: payload => payload.action === action ? pending.promise : undefined });
    if (action !== 'probe') {
      await app.ready();
      if (action === 'setup') app.button('Connect shared automations').click();
      else {
        app.submit(); await eventually(() => app.button('Refresh run status'));
        app.button('Refresh run status').click();
      }
    }
    await eventually(() => app.actions.some(item => item.action === action));
    assert.equal(app.query('.osb-role-actions').getAttribute('aria-busy'), 'true');
    for (const selector of ['select', 'textarea', 'input']) assert.equal(app.query(selector).disabled, false);
    app.select('propose'); app.fill('Draft while checking', 'pending-feature');
    app.query('input').dispatchEvent(new app.dom.window.Event('input'));
    assert.equal(app.query('input').parentElement.hidden, false);
    assert.equal(app.query('textarea').required, true);
    assert.match(app.query('.osb-skill-help').textContent, action === 'status' ? /Refresh run status/ : /Create a role specification/);
    assert.equal(app.button('Run SA Propose').disabled, true);
    app.submit();
    const input = app.actions.find(item => item.action === action).input;
    pending.resolve(output(action === 'status' ? { version: 1, kind: action, automation_id: input.automation_id,
      run_id: input.run_id, status: 'COMPLETED', error: null, conversation_id: CONVERSATION_ID } : connection(action)));
    await app.ready();
    assert.equal(app.query('select').value, 'propose');
    assert.equal(app.query('textarea').value, 'Draft while checking');
    assert.equal(app.query('input').value, 'pending-feature');
    assert.equal(app.dispatched().length, action === 'status' ? 1 : 0);
  });
});

test('missing, stale and wrong-role bound targets cannot dispatch any automation', async t => {
  for (const specId of [undefined, 'SA-REQ-004-removed', 'FE-REQ-004-first']) {
    await t.test(String(specId), async child => {
      const app = setup(child, { specId });
      await app.ready();
      assert.equal(app.query('select').disabled, true);
      assert.match(app.query('.osb-skill-help').textContent, /missing or does not belong/);
      for (const stage of STAGES) {
        app.select(stage); app.fill('Do not dispatch stale work', 'new-feature'); app.submit();
        assert.equal(app.button(`Run SA ${stage[0].toUpperCase()}${stage.slice(1)}`).disabled, true);
      }
      await settled();
      assert.equal(app.dispatched().length, 0);
    });
  }
});

for (const role of ROLES) test(`${role} catalog shows only its six existing definitions and history without dispatch`, async t => {
  const app = setup(t, { catalog: true, role });
  await app.ready();
  const rows = [...app.container.querySelectorAll('.osb-automation-item')];
  const expected = AUTOMATIONS.filter(item => item.role === role);
  assert.deepEqual(rows.map(row => row.dataset.stage), ALL_STAGES);
  assert.deepEqual(rows.map(row => row.querySelector('.osb-automation-name').textContent), expected.map(item => item.name));
  const links = [...app.container.querySelectorAll('a')];
  assert.deepEqual(links.map(link => link.getAttribute('href')), expected.map(item => `/automations/${item.id}`));
  for (const link of links) link.click();
  assert.deepEqual(app.navigation, expected.map(item => `/automations/${item.id}`));
  assert.match(app.query('.osb-automation-connection').textContent, /all 24 role automations verified/);
  assert.equal(app.button('Connect shared automations').hidden, true);
  assert.equal(app.query('form, select, input, textarea'), null);
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
  assert.deepEqual(app.stored(), []);
});

test('catalog setup is explicitly shared across 24 definitions and checking only probes', async t => {
  const app = setup(t, { catalog: true, ready: false });
  await app.ready();
  assert.match(app.container.textContent, /24 role automations/);
  assert.match(app.query('.osb-automation-connection').textContent, /needs setup or an update/);
  assert.equal(app.button('Connect shared automations').hidden, false);
  app.button('Connect shared automations').click();
  await eventually(() => app.button('Connect shared automations').hidden);
  app.button('Check connection').click();
  await eventually(() => app.actions.length === 3 && app.query('.osb-automation-catalog').getAttribute('aria-busy') === 'false');
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'setup', 'probe']);
  assert.ok(app.actions.every(item => !Object.hasOwn(item, 'input')));
  assert.deepEqual(app.stored(), []);
});

test('catalog reserves missing role slots without borrowing another role definition', async t => {
  const app = setup(t, { catalog: true, role: 'Backend', action: payload => output({
    ...connection(payload.action, { ready: false }),
    automations: AUTOMATIONS.filter(item => item.role !== 'Backend' || item.stage === 'apply'),
  }) });
  await app.ready();
  assert.equal(app.container.querySelectorAll('.osb-automation-item').length, 6);
  assert.equal(app.container.querySelectorAll('a').length, 1);
  assert.match(app.query('a').getAttribute('href'), new RegExp(AUTOMATIONS.find(item => item.role === 'Backend' && item.stage === 'apply').id));
  assert.equal([...app.container.querySelectorAll('.osb-automation-item')].filter(row => row.textContent.includes('Definition is not installed')).length, 5);
  assert.doesNotMatch(app.container.textContent, /OpenSpec (SA|Frontend|QA) ·/);
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
});

test('catalog rejects a role-only ready claim and permits an explicit read-only retry', async t => {
  const app = setup(t, { catalog: true, action: (payload, count) => count === 1 ? output({
    ...connection(payload.action), automations: AUTOMATIONS.filter(item => item.role === 'SA'),
  }) : undefined });
  await app.ready();
  assert.match(app.query('.osb-automation-connection').textContent, /Invalid role automation response/);
  assert.equal(app.container.querySelectorAll('a').length, 0);
  assert.match(app.container.textContent, /availability could not be checked/);
  app.button('Check connection').click();
  await eventually(() => app.container.querySelectorAll('a').length === 6);
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'probe']);
});

test('detail catalog hides duplicate connection controls and still probes without writing state', async t => {
  const app = setup(t, { catalog: true, role: 'QA', showConnection: false });
  await app.ready();
  assert.equal(app.container.querySelectorAll('.osb-automation-item').length, 6);
  assert.equal(app.query('button'), null);
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
  assert.deepEqual(app.stored(), []);
});

test('disposed catalog ignores late probe and setup results', async t => {
  for (const action of ['probe', 'setup']) await t.test(action, async child => {
    const pending = deferred();
    const app = setup(child, { catalog: true, ready: false,
      action: payload => payload.action === action ? pending.promise : undefined });
    if (action === 'setup') { await app.ready(); app.button('Connect shared automations').click(); }
    await eventually(() => app.actions.some(item => item.action === action));
    app.dispose();
    assert.equal(app.container.childElementCount, 0);
    pending.resolve(output(connection(action)));
    await settled();
    assert.equal(app.container.childElementCount, 0);
    assert.equal(app.dispatched().length, 0);
  });
});

test('catalog requires a canonical fixed role before contacting the backend', async t => {
  const app = setup(t, { catalog: true });
  await app.ready(); app.dispose();
  const calls = app.requests.length;
  for (const role of ['FE', 'BE', 'Admin', null]) assert.throws(() => mountRoleAutomationCatalog({
    host: app.host, container: app.container, navigate: () => {}, role,
  }), /supported fixed OpenSpec role/);
  assert.equal(app.requests.length, calls);
  assert.equal(app.container.childElementCount, 0);
});

test('only successful explicit setup notifies its mounted role workspace to refresh the catalog', async t => {
  let completions = 0;
  const pending = deferred();
  const app = setup(t, { ready: false, onSetupComplete: () => { completions++; },
    action: (payload, count) => payload.action === 'setup' && count > 3 ? pending.promise : undefined });
  await app.ready();
  assert.equal(completions, 0);
  app.button('Connect shared automations').click();
  await app.ready();
  assert.equal(completions, 1);
  app.button('Check connection').click();
  await app.ready();
  assert.equal(completions, 1);
  app.button('Connect shared automations').click();
  await eventually(() => app.actions.length === 4);
  app.dispose(); pending.resolve(output(connection('setup')));
  await settled();
  assert.equal(completions, 1);
  assert.equal(app.dispatched().length, 0);
});

test('role run references survive movement from Kanban to the separately installed role app', async t => {
  const app = setup(t, { role: 'Frontend' });
  app.host.extension = { name: 'openspec-progress' };
  await app.ready(); app.submit();
  await eventually(() => app.button('Refresh run status'));
  const stored = app.stored();
  app.dispose();
  app.host.extension = { name: 'openspec-fe' };
  app.mount(); await app.ready();
  assert.deepEqual(app.stored(), stored);
  assert.ok(app.button('Refresh run status'));
  assert.equal(app.button('Run Frontend Apply').disabled, false, 'The saved run is checked after moving between Apps');
  assert.equal(app.dispatched().length, 1);
});

test('external automation selection has one authoritative stage and preserves the mounted draft', async t => {
  const app = setup(t, { externalSelection: true, initialStage: 'update',
    initialDraft: { prompt: 'Draft <script> stays literal', feature: 'new-feature' } });
  const control = app.controller(), form = app.query('form'), prompt = app.query('textarea'), feature = app.query('input');
  assert.deepEqual(app.selections, [['update', { disabled: false }]]);
  assert.equal(app.query('[aria-label="SA automation"]'), null, 'The diagram replaces the dropdown without a second accessible selector');
  assert.equal(app.query('form').getAttribute('aria-label'), 'SA automation form');
  assert.equal(app.query('.osb-selected-automation').getAttribute('aria-label'), 'SA selected automation');
  await app.ready();
  assert.deepEqual(app.selections, [['update', { disabled: false }]], 'Probe completion does not invent a selection/lock transition');
  for (const stage of ['apply', 'propose', 'update']) {
    assert.equal(control.selectStage(stage), true);
    const definition = AUTOMATIONS.find(item => item.role === 'SA' && item.stage === stage);
    assert.equal(control.getStage(), stage);
    assert.equal(app.query('form'), form);
    assert.equal(app.query('textarea'), prompt);
    assert.equal(app.query('input'), feature);
    assert.deepEqual(control.getDraft(), { stage, prompt: 'Draft <script> stays literal', feature: 'new-feature' });
    assert.equal(app.query('.osb-selected-automation-title').textContent, `SA ${stage[0].toUpperCase()}${stage.slice(1)}`);
    assert.equal(app.query('.osb-automation-name').textContent, definition.name);
    assert.equal(app.query('.osb-selected-automation-definition a').getAttribute('href'), `/automations/${definition.id}`);
    assert.equal(prompt.required, stage !== 'apply');
    assert.equal(feature.parentElement.hidden, stage !== 'propose');
    assert.ok(app.query('.osb-selected-automation-description').textContent.length);
  }
  const draft = control.getDraft(); draft.prompt = 'Mutated snapshot';
  assert.equal(control.getDraft().prompt, 'Draft <script> stays literal');
  assert.match(app.query('.osb-selected-automation-context').textContent, /REQ-004.*SA-REQ-004-first/);
  app.query('.osb-selected-automation-definition a').click();
  assert.deepEqual(app.navigation, [`/automations/${AUTOMATIONS[1].id}`]);
  assert.equal(app.query('script'), null);
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
  assert.deepEqual(app.stored(), []);
});

for (const role of ROLES) test(`${role} controlled form maps all three nodes to the existing signed automation`, async t => {
  const app = setup(t, { role, externalSelection: true });
  await app.ready();
  for (const [index, stage] of STAGES.entries()) {
    assert.equal(app.controller().selectStage(stage), true);
    app.fill(stage === 'apply' ? '' : `Requested ${stage}`, 'controlled-feature');
    assert.equal(app.dispatched().length, index, 'Selection alone does not dispatch');
    app.submit(); app.submit();
    await eventually(() => app.query('.osb-run-result a')?.textContent.includes('Open automation run'));
    const input = app.dispatched()[index].input;
    assert.equal(input.stage, stage);
    assert.equal(input.role, role);
    assert.equal(input.automation_id, AUTOMATIONS.find(item => item.role === role && item.stage === stage).id);
    assert.equal(input.requirement_id, 'REQ-004');
    assert.equal(input.context_change, `${PREFIXES[role]}-REQ-004-first`);
    assert.equal(input.spec_id, `${PREFIXES[role]}-REQ-004-${stage === 'propose' ? 'controlled-feature' : 'first'}`);
    assert.equal(app.dispatched().length, index + 1, 'Duplicate explicit submissions remain blocked');
    app.button('Start another run').click();
  }
});

for (const role of ROLES.filter(role => role !== 'SA')) test(`${role} home is an editable draft with no fake target or run storage access`, async t => {
  const app = setup(t, { role, externalSelection: true, requirement: null, specId: null, trackStorage: true });
  const control = app.controller();
  assert.equal(control.getStage(), 'propose');
  assert.deepEqual(control.getDraft(), { stage: 'propose', prompt: '', feature: '' });
  await app.ready();
  app.fill('Private home draft', 'private-feature');
  for (const stage of STAGES) {
    assert.equal(control.selectStage(stage), true);
    assert.equal(app.query('textarea').disabled, false);
    assert.equal(app.query('input').disabled, false);
    assert.equal(app.button(`Run ${role} ${stage[0].toUpperCase()}${stage.slice(1)}`).disabled, true);
    assert.match(app.query('.osb-selected-automation-context').textContent, /Choose a requirement/);
    if (stage === 'propose') assert.match(app.container.textContent, /Choose a requirement to preview the new spec name/);
    app.submit();
  }
  app.button('Check connection').click(); await app.ready();
  assert.deepEqual(control.getDraft(), { stage: 'apply', prompt: 'Private home draft', feature: 'private-feature' });
  assert.deepEqual(app.storageAccess, [], 'No recovery key is read or written without a requirement');
  assert.equal(app.dispatched().length, 0);
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'probe']);
  assert.doesNotMatch(app.container.textContent, /REQ-004|null|undefined/);
});

test('an explicit first-target handoff initializes stage and draft without persisting prompt text', async t => {
  const app = setup(t, { externalSelection: true, requirement: null, specId: null, trackStorage: true });
  await app.ready();
  app.controller().selectStage('propose'); app.fill('Plan from the home draft', 'handoff-feature');
  const draft = app.controller().getDraft();
  app.dispose();
  assert.deepEqual(app.storageAccess, []);
  app.mount({ requirement: REQUIREMENT, specId: 'SA-REQ-004-first', initialStage: draft.stage, initialDraft: draft });
  await app.ready();
  assert.deepEqual(app.controller().getDraft(), draft);
  app.submit();
  await eventually(() => app.query('.osb-run-result a'));
  assert.equal(app.dispatched()[0].input.spec_id, 'SA-REQ-004-handoff-feature');
  assert.equal(app.dispatched()[0].input.request, draft.prompt);
  assert.doesNotMatch(JSON.stringify(app.stored()), /Plan from the home draft/);
  app.dispose();
  app.mount({ requirement: REQUIREMENT, specId: 'SA-REQ-004-second' });
  await app.ready();
  assert.deepEqual(app.controller().getDraft(), { stage: 'apply', prompt: '', feature: '' }, 'Another target receives no implicit draft');
});

test('only an explicit null home context unlocks drafting; invalid real targets remain non-executable', async t => {
  for (const options of [
    { requirement: REQUIREMENT, specId: null }, { requirement: REQUIREMENT, specId: 'SA-REQ-004-missing' },
    { requirement: REQUIREMENT, specId: 'FE-REQ-004-first' }, { requirement: null, specId: 'SA-REQ-004-first' },
  ]) await t.test(`${options.requirement ? 'requirement' : 'no requirement'} / ${options.specId}`, async child => {
    const app = setup(child, { ...options, externalSelection: true });
    await app.ready();
    for (const stage of STAGES) {
      app.controller().selectStage(stage);
      assert.equal(app.query('input').disabled, true);
      assert.equal(app.query('textarea').disabled, true);
      assert.equal(app.button(`Run SA ${stage[0].toUpperCase()}${stage.slice(1)}`).disabled, true);
      app.submit();
    }
    assert.equal(app.dispatched().length, 0);
  });
});

test('controlled dispatch locks node changes and notifies lock transitions without clearing draft', async t => {
  const pending = deferred();
  const app = setup(t, { externalSelection: true, initialStage: 'update',
    action: payload => payload.action === 'dispatch' ? pending.promise : undefined });
  await app.ready(); app.fill('Do this exact update', 'retained-feature');
  app.submit();
  assert.deepEqual(app.selections, [['update', { disabled: false }], ['update', { disabled: true }]]);
  for (const stage of STAGES) assert.equal(app.controller().selectStage(stage), false);
  assert.equal(app.controller().getStage(), 'update');
  assert.equal(app.query('textarea').disabled, true);
  await eventually(() => app.dispatched().length === 1);
  const input = app.dispatched()[0].input;
  pending.resolve(output({ version: 1, kind: 'dispatch', automation_id: input.automation_id, request_id: input.request_id, run_id: RUN_ID }));
  await app.ready();
  assert.deepEqual(app.selections, [['update', { disabled: false }], ['update', { disabled: true }], ['update', { disabled: false }]]);
  assert.equal(app.controller().selectStage('propose'), true);
  assert.deepEqual(app.controller().getDraft(), { stage: 'propose', prompt: 'Do this exact update', feature: 'retained-feature' });
  assert.equal(app.button('Run SA Propose').disabled, true, 'Saved run still prevents another submission');
  assert.equal(app.dispatched().length, 1);
});

test('controlled selection stays editable during discovery and rejects unknown or disposed changes', async t => {
  const pending = deferred();
  const app = setup(t, { externalSelection: true, action: payload => payload.action === 'probe' ? pending.promise : undefined });
  const control = app.controller();
  assert.equal(control.selectStage('update'), true);
  app.fill('Draft during discovery', 'new-feature');
  for (const stage of ['archive', '__proto__', 'constructor', '', null, undefined, { toString: () => 'propose' }]) {
    assert.equal(control.selectStage(stage), false);
  }
  assert.equal(control.getStage(), 'update');
  const selections = [...app.selections];
  await eventually(() => app.actions.length === 1);
  app.dispose();
  assert.equal(control.selectStage('apply'), false);
  pending.resolve(output(connection('probe'))); await settled();
  assert.deepEqual(app.selections, selections);
  assert.equal(app.container.childElementCount, 0);
  assert.deepEqual(control.getDraft(), { stage: 'update', prompt: 'Draft during discovery', feature: 'new-feature' });
});

test('disposing an in-flight controlled dispatch suppresses late selection callbacks but keeps run recovery', async t => {
  const pending = deferred();
  const app = setup(t, { externalSelection: true, action: payload => payload.action === 'dispatch' ? pending.promise : undefined });
  await app.ready(); app.submit();
  await eventually(() => app.dispatched().length === 1);
  const input = app.dispatched()[0].input, control = app.controller(), selections = [...app.selections];
  app.dispose();
  pending.resolve(output({ version: 1, kind: 'dispatch', automation_id: input.automation_id, request_id: input.request_id, run_id: RUN_ID }));
  await settled();
  assert.deepEqual(app.selections, selections);
  assert.equal(control.selectStage('update'), false);
  assert.equal(app.container.childElementCount, 0);
  assert.equal(JSON.parse(app.stored()[0][1]).run_id, RUN_ID);
});

test('selected automation details never substitute another role or fabricate a missing definition link', async t => {
  const app = setup(t, { externalSelection: true, initialStage: 'update', action: payload => output({
    ...connection(payload.action, { ready: false }),
    automations: AUTOMATIONS.filter(item => !(item.role === 'SA' && item.stage === 'update')),
  }) });
  await app.ready();
  assert.match(app.query('.osb-selected-automation-definition').textContent, /Definition is not installed/);
  assert.equal(app.query('.osb-selected-automation-definition a'), null);
  app.controller().selectStage('apply');
  assert.equal(app.query('.osb-selected-automation-definition a').getAttribute('href'), `/automations/${AUTOMATIONS.find(item => item.role === 'SA' && item.stage === 'apply').id}`);
  assert.equal(app.button('Run SA Apply').disabled, true);
  assert.equal(app.dispatched().length, 0);
});


test('Propose binds a selected impacted application without allowing event repository overrides', async t => {
  const requirement = structuredClone(REQUIREMENT);
  const apps = ['one', 'two'].map(id => ({ id, name: id, role: 'Backend', repository: `https://github.com/example/${id}.git` }));
  requirement.specs.find(spec => spec.role === 'SA').scope = { version: 1, applications: apps, references: [] };
  const ui = setup(t, { role: 'Backend', requirement });
  await ui.ready(); ui.select('propose'); ui.fill('Implement the selected application', 'booking');
  const selector = ui.query('[aria-label="Backend impacted application"]');
  assert.equal(selector.options.length, 3);
  selector.value = 'two'; ui.submit(); await settled();
  assert.equal(ui.dispatched().length, 1);
  assert.equal(ui.dispatched()[0].input.application_id, 'two');
  assert(!Object.hasOwn(ui.dispatched()[0].input, 'repository'));
});

test('SA home submits a new requirement and multiple repository bindings with the entered prompt', async t => {
  const app = setup(t, { role: 'SA', requirement: null, specId: null });
  await app.ready();
  app.query('[aria-label="New requirement ID"]').value = 'BOOK-007';
  app.fill('Plan room booking with conflicts', 'booking');
  const applications = ['Backend', 'Frontend', 'QA'].map((role, i) => ({ id: `app-${i}`, name: `Booking ${role}`, role,
    repository: `https://github.com/example/app-${i}.git` }));
  for (const [i, item] of applications.entries()) {
    if (i) app.button('Add application').click();
    const fields = app.container.querySelectorAll('.osb-application-binding')[i].querySelectorAll('input, select');
    [...fields].forEach((field, index) => { field.value = item[['id', 'name', 'role', 'repository'][index]]; });
  }
  assert.equal(app.dispatched().length, 0);
  app.submit(); await eventually(() => app.dispatched().length === 1);
  const input = app.dispatched()[0].input;
  assert.equal(input.requirement_id, 'BOOK-007');
  assert.equal(input.spec_id, 'SA-BOOK-007-booking');
  assert.equal(input.context_change, '');
  assert.equal(input.request, 'Plan room booking with conflicts');
  assert.deepEqual(input.applications, applications);
});

for (const role of ROLES) test(`${role} Review, Commit and Merge Request submit the selected target and snapshot only on Run`, async t => {
  const reviewId = '11111111-1111-4111-8111-111111111111';
  const target = role === 'SA' ? 'specs' : 'code';
  const app = setup(t, { role, evidence: payload => output({ version: 1, kind: payload.action, data:
    payload.action === 'history' ? { revisions: [], deliveries: [], reviews: [{ id: reviewId, target, file_count: 1, created_at: '2026-10-06T00:00:00Z' }] }
      : { id: payload.input.id, context: Object.fromEntries(Object.entries(payload.input).filter(([key]) => !['id', 'kind'].includes(key))),
        created_at: '2026-10-06T00:00:00Z', target, files: [] } }) });
  await app.ready(); await eventually(() => app.query('[aria-label="Reviewed snapshot"]').options.length === 2);
  assert.deepEqual([...app.query('[aria-label="Repository target"]').options].map(option => option.value), role === 'SA' ? ['specs'] : ['specs', 'code']);
  for (const [index, stage] of ['review', 'commit', 'merge-request'].entries()) {
    app.select(stage);
    assert.equal(app.dispatched().length, index, 'Selecting a node never runs it');
    if (stage !== 'review') {
      app.submit(); await settled();
      assert.equal(app.dispatched().length, index, 'Delivery requires an explicit reviewed snapshot');
      app.query('[aria-label="Reviewed snapshot"]').value = reviewId;
      app.query('[aria-label="Commit message / PR title"]').value = 'Implement booking';
    }
    app.submit(); await eventually(() => app.button('Refresh run status'));
    const input = app.dispatched()[index].input;
    assert.equal(input.target, target); assert.equal(input.stage, stage); assert.equal(input.request, '');
    assert.equal(input.automation_id, AUTOMATIONS.find(row => row.role === role && row.stage === stage).id);
    if (stage !== 'review') { assert.equal(input.review_id, reviewId); assert.equal(input.message, 'Implement booking'); }
    app.button('Start another run').click();
    app.query('[aria-label="Reviewed snapshot"]').value = '';
  }
  assert.ok(app.evidenceCalls.every(call => ['history', 'record'].includes(call.action)));
});
