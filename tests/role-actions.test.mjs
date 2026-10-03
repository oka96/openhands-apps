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
const { mountRoleActions } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

const STORE = '/Users/oka/Desktop/openspec-store';
const PROJECT = '/Users/oka/Desktop/openhands-demo';
const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const STAGES = ['propose', 'update', 'apply'];
const AUTOMATIONS = ROLES.flatMap((role, r) => STAGES.map((stage, index) => ({
  id: `0f0f0f0f-1111-4444-8888-${String(r * 3 + index + 1).padStart(12, "0")}`,
  name: `OpenSpec ${role} · ${stage[0].toUpperCase()}${stage.slice(1)}`, stage, role,
})));
const RUN_ID = '05ad810c-bcc0-409b-902d-1bc78023c22b';
const CONVERSATION_ID = '6f3d24ee-3348-4d84-991d-955359e50a29';
const SERVICE = { url_from_agent: 'http://127.0.0.1:8001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY' };
const PREFIXES = { SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' };
const REQUIREMENT = { id: 'REQ-004', title: 'Complete tasks', summary: 'Keep completed tasks visible.', change: 'add-task-completion',
  specs: ROLES.flatMap(role => ['first', 'second'].map(feature => ({ id: `${PREFIXES[role]}-REQ-004-${feature}`, role, title: feature }))) };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function output(value) { return { stdout: JSON.stringify(value), stderr: '', exit_code: 0, order: 0 }; }
function connection(action, options = {}) {
  return { version: 1, kind: action, ready: options.ready ?? true, automations: AUTOMATIONS,
    configuration: { workspace: PROJECT, spec_store: options.store || STORE, store_id: 'openspec-store',
      repository: '/Users/oka/Desktop/openhands-automation' }, message: 'Connect the role automations.' };
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
  const actions = [], requests = [], navigation = [], disposers = new Set();
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
      actions.push(payload);
      if (options.action) {
        const handled = await options.action(payload, actions.length);
        if (handled !== undefined) return handled;
      }
      if (payload.action === 'dispatch') return output({ version: 1, kind: 'dispatch',
        automation_id: payload.input.automation_id, request_id: payload.input.request_id, run_id: RUN_ID });
      if (payload.action === 'status') return output({ version: 1, kind: 'status',
        automation_id: payload.input.automation_id, run_id: payload.input.run_id,
        status: 'COMPLETED', error: null, conversation_id: CONVERSATION_ID });
      return output(connection(payload.action, { ready: payload.action === 'setup' || options.ready !== false, store: options.connectionStore }));
    } },
  };
  function mount(overrides = {}) {
    activeRole = overrides.role || options.role || 'SA';
    host.backend.id = overrides.backend || options.backend || 'local-main';
    const dispose = mountRoleActions({ host, container, navigate: href => navigation.push(href),
      workspace: overrides.store || options.store || STORE,
      requirement: overrides.requirement || options.requirement || REQUIREMENT,
      specId: Object.hasOwn(overrides, 'specId') ? overrides.specId : Object.hasOwn(options, 'specId') ? options.specId
        : `${PREFIXES[activeRole]}-${(overrides.requirement || options.requirement || REQUIREMENT).id}-first`,
      role: { id: activeRole, label: activeRole, specs: (overrides.requirement || options.requirement || REQUIREMENT).specs?.filter(spec => spec.role === activeRole).map(spec => spec.id), tasks: [], total: 0, complete: 0, state: 'backlog' } });
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
  return { dom, container, host, requests, actions, navigation, mount, dispose, query, button,
    async ready() {
      const panel = query('.osb-role-actions');
      await eventually(() => panel.getAttribute('aria-busy') === 'false', 'connection probe');
    },
    select(stage) {
      const node = query(`[aria-label="${activeRole} skill"]`); node.value = stage;
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
  assert.equal(app.query('.osb-role-actions').getAttribute('aria-label'), 'Run OpenSpec skill for SA');
  assert.equal(app.query('.osb-role-actions-body').firstElementChild, app.query('form'));
  assert.equal(app.container.querySelectorAll('select').length, 1, 'Role spec is supplied by the parent');
  assert.equal(app.query('[aria-label="SA skill"]').value, 'apply');
  assert.equal(app.query('[aria-label="SA new feature name"]').parentElement.hidden, true);
  assert.equal(app.query('[aria-label="SA prompt"]').required, false);
  assert.equal(app.button('Run SA Apply').disabled, true);
  await app.ready();
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
  assert.equal(app.button('Run SA Apply').disabled, false);
  assert.match(app.container.textContent, /Code project:.*openhands-demo/);
  assert.match(app.container.textContent, /Spec store:.*openspec-store/);
  await app.ready();
  assert.deepEqual(app.actions.map(item => item.action), ['probe']);
});

test('Connect installs explicitly while Check connection remains read-only', async t => {
  const app = setup(t, { ready: false });
  await app.ready();
  assert.equal(app.button('Run SA Apply').disabled, true);
  app.button('Connect automations').click();
  await eventually(() => !app.button('Run SA Apply').disabled);
  app.button('Check connection').click();
  await eventually(() => app.actions.length === 3 && app.query('.osb-role-actions').getAttribute('aria-busy') === 'false');
  assert.deepEqual(app.actions.map(item => item.action), ['probe', 'setup', 'probe']);
  assert.equal(app.dispatched().length, 0);
});

for (const role of ROLES) for (const stage of STAGES) {
  test(`${role} ${stage} submits exactly its selected role, skill, requirement and single prompt`, async t => {
    const app = setup(t, { role });
    await app.ready(); app.select(stage);
    const prompt = stage === 'apply' ? '' : `Refine 标签 for ${role}; keep $(commands), "quotes" and \`text\` as data.`;
    app.fill(prompt); app.submit();
    await eventually(() => app.query('a')?.textContent.includes('Open automation run'));
    assert.equal(app.dispatched().length, 1);
    const input = app.dispatched()[0].input;
    assert.deepEqual({ ...input, automation_id: undefined, request_id: undefined }, {
      stage, spec_store: STORE, requirement_id: REQUIREMENT.id, context_change: REQUIREMENT.change,
      role, change: REQUIREMENT.change, spec_id: `${PREFIXES[role]}-REQ-004-${stage === 'propose' ? 'add-task-reminders' : 'first'}`, request: prompt,
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

test('invalid Propose and Update inputs cannot dispatch; switching skills updates required inputs and boundaries', async t => {
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
  assert.match(app.query('.osb-skill-help').textContent, /authorizes.*prompt/);
  app.select('apply');
  assert.match(app.query('.osb-skill-help').textContent, /this role.*verification/);
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
  assert.equal(app.query('a')?.getAttribute('href'), `/automations/${AUTOMATIONS[2].id}?run=${RUN_ID}`);
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

test('failed run displays literal error evidence and missing conversation does not create a link', async t => {
  const app = setup(t, { action: payload => payload.action === 'status' ? output({
    version: 1, kind: 'status', automation_id: payload.input.automation_id, run_id: payload.input.run_id,
    status: 'FAILED', error: '<img src=x onerror=alert(1)> Missing approval.', conversation_id: null,
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
      status: 'COMPLETED', error: null, conversation_id: CONVERSATION_ID };
    pending.resolve(output(value)); await settled(); await settled();
    assert.equal(app.container.childElementCount, 0);
    assert.deepEqual(app.navigation, []);
  });
});

test('the bound sibling spec is immutable and prior history never overrides the new target or skill', async t => {
  const app = setup(t, { role: 'Frontend', specId: 'FE-REQ-004-second' });
  await app.ready(); app.select('update'); app.fill('Refine the second spec'); app.submit();
  await eventually(() => app.dispatched().length === 1 && app.query('a'));
  assert.equal(app.dispatched()[0].input.spec_id, 'FE-REQ-004-second');
  assert.match(app.query('[role="status"]').textContent, /FE-REQ-004-second/);
  app.dispose(); app.mount({ specId: 'FE-REQ-004-first' }); await app.ready();
  assert.equal(app.query('[aria-label="Frontend spec"]'), null);
  assert.equal(app.query('[aria-label="Frontend skill"]').value, 'apply');
  assert.equal(app.query('[aria-label="Frontend skill"]').disabled, false);
  assert.match(app.query('[role="status"]').textContent, /FE-REQ-004-second/);
  assert.equal(app.dispatched().length, 1);
  app.button('Start another run').click(); app.submit();
  await eventually(() => app.dispatched().length === 2 && app.query('a'));
  assert.equal(app.dispatched()[1].input.spec_id, 'FE-REQ-004-first');
  assert.equal(app.dispatched()[1].input.stage, 'apply');
});

test('an earlier run retains its original spec identity when that spec is removed', async t => {
  const app = setup(t);
  await app.ready(); app.submit();
  await eventually(() => app.query('a'));
  app.dispose();
  app.mount({ specId: 'SA-REQ-004-second', requirement: { ...REQUIREMENT, specs: REQUIREMENT.specs.filter(spec => spec.id !== 'SA-REQ-004-first') } });
  await app.ready();
  assert.match(app.query('[role="status"]').textContent, /SA-REQ-004-first/);
  assert.equal(app.button('Run SA Apply').disabled, true);
  assert.equal(app.dispatched().length, 1);
});

test('legacy metadata stays read-only and empty roles can explicitly propose a canonical spec', async t => {
  await t.test('legacy', async child => {
    const { specs, ...legacy } = REQUIREMENT;
    const app = setup(child, { requirement: legacy });
    await app.ready(); app.submit(); await settled();
    assert.equal(app.button('Run SA Apply').disabled, true);
    assert.match(app.query('.osb-skill-help').textContent, /legacy.*Migrate/);
    assert.equal(app.dispatched().length, 0);
  });
  await t.test('empty role', async child => {
    const app = setup(child, { role: 'Backend', specId: '', requirement: { ...REQUIREMENT, specs: [] } });
    await app.ready();
    assert.equal(app.query('[aria-label="Backend skill"]').value, 'propose');
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
    assert.equal(app.dispatched()[0].input.change, REQUIREMENT.change);
  });
});

test('previous run evidence does not lock skill or draft editing, including after remount', async t => {
  const app = setup(t);
  await app.ready(); app.select('propose'); app.fill('Plan reminders', 'reminders'); app.submit();
  await eventually(() => app.query('a'));
  const history = app.stored();
  app.dispose(); app.mount(); await app.ready();
  assert.equal(app.query('select').value, 'apply', 'Previous Propose does not choose the next skill');
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

test('connection probes, setup and status checks leave skill and draft inputs responsive', async t => {
  for (const action of ['probe', 'setup', 'status']) await t.test(action, async child => {
    const pending = deferred();
    const app = setup(child, { ready: action !== 'setup',
      action: payload => payload.action === action ? pending.promise : undefined });
    if (action !== 'probe') {
      await app.ready();
      if (action === 'setup') app.button('Connect automations').click();
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
    assert.match(app.query('.osb-skill-help').textContent, /Add a named spec/);
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

test('missing, stale and wrong-role bound targets cannot dispatch any skill', async t => {
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
