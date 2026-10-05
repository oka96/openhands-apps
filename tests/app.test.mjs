import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { ACTIONS, STAGES } from '../src/workflow-actions.js';
import { JSDOM } from 'jsdom';
import path from 'node:path';
import { build } from 'esbuild';
import { KANBAN_APP, ROLE_APPS, roleApp, storeKey } from '../src/app-config.js';
import { appHref, encodeWorkspace } from '../src/navigation.js';
const bundle = await build({
  entryPoints: [new URL('../src/extension.js', import.meta.url).pathname],
  bundle: true, format: 'esm', platform: 'browser', write: false, loader: { '.css': 'text' },
  plugins: [{ name: 'raw-ui-helper', setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }],
});
const { activate, activateRoleApp } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
import { roleSpecsFixture } from './helpers/role-specs.mjs';

const DEFAULT_STORE = '/Users/oka/Desktop/openspec-store';
const BASE = appHref(KANBAN_APP, DEFAULT_STORE);
function inventory() { return { canvas_extensions: ROLE_APPS.map(app => ({ name: app.name, enabled: true, manifest: { name: app.name, contributes: { pages: [{ id: app.pageId, path: app.path }] } } })) }; }
const ROLE_IDS = ['SA', 'Frontend', 'Backend', 'QA'];
const ROLE_LABELS = ['Solution Architect', 'Frontend', 'Backend', 'Quality Assurance'];
const STAGES = ['backlog', 'sa', 'implementation', 'qa', 'blocked', 'done'];
const ROLE_STATES = [
  ['backlog', 'backlog', 'backlog', 'backlog'],
  ['in_progress', 'backlog', 'backlog', 'backlog'],
  ['done', 'in_progress', 'backlog', 'backlog'],
  ['done', 'done', 'done', 'in_progress'],
  ['done', 'blocked', 'in_progress', 'backlog'],
  ['done', 'done', 'done', 'done'],
];
const UNSAFE_ARTIFACT = '# Proposal\nKeep this skill note unchanged.\n<script>window.artifactExecuted = true</script>\n<img src=x onerror="window.artifactExecuted = true">';

function board(workspace = DEFAULT_STORE) {
  return {
    version: 3,
    kind: 'board',
    workspace,
    name: 'Sample delivery store',
    description: 'Six independent requirements across all four roles',
    generatedAt: new Date().toISOString(),
    requirements: STAGES.map((stage, index) => {
      const change = `sample-${stage}`;
      const root = `${workspace}/openspec/changes/${change}`;
      const tasks = ROLE_IDS.flatMap((role, roleIndex) => [0, 1].map(taskIndex => ({
        id: `${roleIndex + 1}.${taskIndex + 1}`,
        description: `Complete ${role} deliverable ${taskIndex + 1}`,
        done: ROLE_STATES[index][roleIndex] === 'done' ||
          (ROLE_STATES[index][roleIndex] === 'in_progress' && taskIndex === 0),
        line: roleIndex * 3 + taskIndex + 3,
        sourcePath: `${root}/tasks.md`,
        role,
      })));
      const roles = ROLE_IDS.map((id, roleIndex) => {
        const roleTasks = tasks.filter(task => task.role === id);
        return {
          id,
          label: ROLE_LABELS[roleIndex],
          owner: `Sample ${id} owner`,
          state: ROLE_STATES[index][roleIndex],
          note: ROLE_STATES[index][roleIndex] === 'blocked' ? 'Waiting for the design decision' : '',
          complete: roleTasks.filter(task => task.done).length,
          total: roleTasks.length,
          tasks: roleTasks,
        };
      });
      const specs = roles.map((role, roleIndex) => {
        const id = `${['SA', 'FE', 'BE', 'QA'][roleIndex]}-REQ-00${index + 1}-${change}`;
        role.specs = [id];
        role.tasks.forEach(task => { task.sourcePath = `${workspace}/openspec/changes/${id}/tasks.md`; task.specId = id; });
        return { id, change: id, title: change, role: role.id, state: role.state, note: role.note,
          complete: role.complete, total: role.total, tasks: role.tasks, warnings: [],
          artifacts: ['proposal', 'design', 'specs', 'tasks'].map(kind => ({ id: kind,
            path: `${workspace}/openspec/changes/${id}/${kind === 'specs' ? kind : `${kind}.md`}`,
            status: 'present', content: kind === 'proposal' ? UNSAFE_ARTIFACT : `# ${kind}\nSource text for ${change}.` })) };
      });
      return { id: `REQ-00${index + 1}`, title: `Requirement for ${stage}`,
        summary: `A ${stage} requirement to illustrate the delivery lifecycle.`, stage, roles, specs,
        complete: tasks.filter(task => task.done).length, total: tasks.length,
        rolesComplete: roles.filter(role => role.state === 'done').length, tasks, warnings: [] };

    }),
  };
}

function output(data) {
  return { stdout: JSON.stringify(data), stderr: '', exit_code: 0, order: 0 };
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function assertWorkflowLayout(app) {
  const layout = app.query('.osb-workflow-layout');
  const workspace = app.query('.osb-workflow-workspace');
  const artifacts = app.query('.osb-workflow-artifacts');
  assert.equal(layout.children.length, 2, 'The upper row contains only the canvas and automation form');
  assert.equal(layout.firstElementChild.className, 'osb-workflow-rail');
  assert.equal(layout.lastElementChild, workspace);
  assert.equal(workspace.querySelectorAll('form.osb-skill-form').length, 1);
  assert.equal(workspace.querySelector('[aria-label="Requirement"]'), app.query('[aria-label="Requirement"]'));
  assert.equal(layout.nextElementSibling, artifacts, 'Source artifacts occupy their own full-width section below both columns');
  assert.equal(artifacts.parentElement, layout.parentElement);
  assert.equal(artifacts.querySelector('form, [aria-label="Requirement"]'), null);
  assert.equal(app.all('.osb-workflow-frame').length, 1, 'Every role workspace mounts one complete Archify viewer');
  assert.equal(app.query('.osb-workflow-frame').closest('.osb-workflow-rail'), layout.firstElementChild);
  assert.equal(app.query('.osb-workflow-diagram svg'), null, 'Archify owns its isolated viewer document');
}

function workflowMessage(frame, kind, stage) {
  const config = frame.srcdoc.match(/<script id="openspec-workflow-config" type="application\/json">([^<]*)<\/script>/);
  assert.ok(config, 'The viewer must include an instance-scoped bridge configuration');
  const { channel, version, token } = JSON.parse(config[1]);
  return { channel, version, token, kind, ...(kind === 'select' ? { stage } : {}) };
}

async function settled() {
  await new Promise(resolve => setImmediate(resolve));
  await new Promise(resolve => setImmediate(resolve));
}

function setup(t, options = {}) {
  const dom = new JSDOM('<!doctype html><main></main>', { url: 'http://127.0.0.1:8000/' });
  const previous = new Map(['document', 'localStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  Object.defineProperty(globalThis, 'document', { configurable: true, value: dom.window.document });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: dom.window.localStorage });
  for (const [key, value] of Object.entries(options.storage || {})) dom.window.localStorage.setItem(key, value);
  const calls = [];
  const automationCalls = [];
  const inventoryCalls = [];
  const navigation = [];
  const registrations = [];
  let unregisterCount = 0;
  let page;
  const host = {
    apiVersion: options.apiVersion || '1',
    extension: { name: options.role ? roleApp(options.role).name : KANBAN_APP.name },
    backend: { id: options.backendId || 'local-main', kind: options.backendKind || 'local' },
    registerPage(id, render) {
      registrations.push(id);
      page = render;
      return () => { unregisterCount++; };
    },
    agentServer: {
      async request(request) {
        if (request.path === '/api/canvas-extensions/installed') {
          inventoryCalls.push(request);
          return options.inventoryRequest ? options.inventoryRequest(request) : options.inventory ?? inventory();
        }
        if (request.method === 'GET' || request.body?.cwd === '/Users/test') {
          automationCalls.push(request);
          if (options.automationRequest) return options.automationRequest(request);
          assert.ok(['/server_info', '/api/file/home'].includes(request.path));
          return {};
        }
        calls.push(request);
        return options.request ? options.request(request, calls.length) : output(board(request.body.cwd));
      },
    },
  };
  let deactivate;
  const mount = (path = options.path || '', container = dom.window.document.querySelector('main')) =>
    page({ container, path, navigate: href => navigation.push(href) });
  t.after(() => {
    deactivate?.();
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  const start = () => { deactivate = options.role ? activateRoleApp(host, options.role) : activate(host); return deactivate; };
  if (options.start !== false) start();
  const dispose = options.mount === false || options.start === false ? null : mount();
  const document = dom.window.document;
  return {
    dom, document, host, calls, automationCalls, inventoryCalls, navigation, registrations, mount, dispose, start,
    deactivate: () => { const cleanup = deactivate; deactivate = null; cleanup?.(); },
    unregisterCount: () => unregisterCount,
    query: selector => document.querySelector(selector),
    all: selector => [...document.querySelectorAll(selector)],
    button: text => [...document.querySelectorAll('button')].find(node => node.textContent.includes(text)),
    selectAutomation(stage) {
      const frame = document.querySelector('.osb-workflow-frame');
      assert.ok(frame, 'Expected the Archify viewer');
      for (const kind of ['ready', 'select']) dom.window.dispatchEvent(new dom.window.MessageEvent('message', {
        origin: 'null', source: frame.contentWindow, data: workflowMessage(frame, kind, stage),
      }));
    },
    change(selector, value, eventName = 'change') {
      const node = document.querySelector(selector);
      assert.ok(node, `Expected ${selector} to be rendered`);
      node.value = value;
      node.dispatchEvent(new dom.window.Event(eventName, { bubbles: true }));
    },
  };
}

test('role specs show independent progress and exact selectable sources across refresh', async t => {
  const fixture = await roleSpecsFixture(t);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-001',
    storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd },
    request: async () => output(await fixture.run()) });
  await settled(); await settled();
  assert.equal(app.all('.osb-role-spec').length, 2);
  assert.equal(app.all('.osb-workflow-workspace form').length, 1);
  assert.equal(app.all('.osb-role-actions summary, .osb-role-actions details').length, 0);
  assert.equal(app.all('.osb-role-actions select').length, 0, 'The diagram is the visible automation selector');
  assert.equal(app.query('.osb-completion strong').textContent, '3 of 4 roles complete');
  assert.equal(app.all('.osb-spec-count')[0].textContent, '1 / 2 specs complete');
  app.change('[aria-label="Artifact spec"]', 'FE-REQ-001-filters');
  assert.equal(app.query('.osb-workflow-workspace form').getAttribute('aria-label'), 'Frontend automation form');
  app.selectAutomation('update');
  app.change('[aria-label="Frontend prompt"]', 'Refine filter behavior', 'input');
  const draftForm = app.query('.osb-workflow-workspace form');
  const viewer = app.query('.osb-workflow-frame');
  assert.match(app.query('.osb-markdown').textContent, /Frontend filters/);
  assert.match(app.query('.osb-artifact-path').textContent, /FE-REQ-001-filters\/specs$/);
  app.button('Tasks').click(); app.button('Source').click();
  assert.equal(app.query('.osb-workflow-workspace form'), draftForm);
  assert.equal(app.query('.osb-workflow-frame'), viewer, 'Artifact tabs and modes retain the current Archify camera');
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, 'Refine filter behavior');
  assert.equal(app.query('.osb-artifact-source').textContent, '# Tasks\n\n- [ ] 1.1 [Frontend] Verify Frontend filters\n');
  app.change('[aria-label="Artifact spec"]', 'FE-REQ-001-labels');
  assert.equal(app.query('.osb-workflow-frame'), viewer, 'Choosing another spec updates the form without replacing the viewer');
  assert.match(app.query('.osb-artifact-source').textContent, /\[x\].*Frontend labels/);
  assert.equal(app.calls.length, 1);
  app.button('Refresh').click(); await settled(); await settled();
  assert.equal(app.query('[aria-label="Artifact spec"]').value, 'FE-REQ-001-labels');
  assert.match(app.query('.osb-artifact-source').textContent, /Frontend labels/);
  assert.equal(app.button('Source').getAttribute('aria-pressed'), 'true');
  app.button('FE-REQ-001-filters').click();
  assert.equal(app.query('.osb-workflow-workspace form').getAttribute('aria-label'), 'Frontend automation form');
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, '', 'A draft does not leak across targets');
  assert.match(app.query('.osb-artifact-source').textContent, /Contract for FE-REQ-001-filters/);
  assert.equal(app.document.activeElement, app.query('[aria-label="Artifact spec"]'));
  app.button('Proposal').click();
  assert.match(app.query('.osb-artifact-source').textContent, /Proposal for FE-REQ-001-filters/);
  assert.equal(app.calls.length, 2, 'Only the explicit store refresh collects the board again');
  assert.ok(app.automationCalls.every(call => call.method === 'GET'), 'Target changes only probe advertised services');
});

test('Role spec selects the exact target for the single inline automation form', async t => {
  const fixture = await roleSpecsFixture(t);
  const actions = [];
  const automations = ROLE_IDS.flatMap((role, r) => STAGES.map((stage, s) => ({
    id: `0f0f0f0f-1111-4444-8888-${String(r * STAGES.length + s + 1).padStart(12, '0')}`,
    name: `OpenSpec ${role} · ${ACTIONS.find(action => action.id === stage).label}`, role, stage,
  })));
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-001',
    storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd },
    request: async () => output(await fixture.run()),
    automationRequest: async request => {
      if (request.path === '/server_info') return { runtime_services: { services: { automation: {
        url_from_agent: 'http://127.0.0.1:18001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY',
      } } } };
      if (request.path === '/api/file/home') return { home: '/Users/test' };
      const encoded = request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1];
      const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
      actions.push(payload);
      if (payload.action === 'dispatch') return output({ version: 1, kind: 'dispatch',
        automation_id: payload.input.automation_id, request_id: payload.input.request_id,
        run_id: '05ad810c-bcc0-409b-902d-1bc78023c22b' });
      assert.equal(payload.action, 'probe', 'Selection never performs setup or dispatch');
      return output({ version: 1, kind: 'probe', ready: true, automations,
        configuration: { workspace: '/Users/test/project', spec_store: fixture.cwd,
          store_id: 'openspec-store', repository: '/Users/oka/Desktop/openhands-automation',
          profile: 'codex-acp-demo', skill_root: '/Users/test/project', timeout_seconds: 1800 }, message: '' });
    },
  });
  await settled(); await settled();
  app.change('[aria-label="Artifact spec"]', 'FE-REQ-001-filters');
  app.selectAutomation('update');
  app.change('[aria-label="Frontend prompt"]', 'Clarify the selected filter rule.', 'input');
  await settled();
  assert.equal(app.all('form.osb-skill-form').length, 1);
  assert.ok(actions.every(action => action.action === 'probe'));
  assert.equal(app.button('Run Frontend Update').disabled, false);
  app.button('Run Frontend Update').click(); await settled();
  const dispatches = actions.filter(action => action.action === 'dispatch');
  assert.equal(dispatches.length, 1);
  assert.equal(dispatches[0].input.spec_id, 'FE-REQ-001-filters');
  assert.equal(dispatches[0].input.role, 'Frontend');
  assert.equal(dispatches[0].input.stage, 'update');
  assert.equal(dispatches[0].input.request, 'Clarify the selected filter rule.');
  app.selectAutomation('propose');
  assert.equal(app.query('[aria-label="Frontend new feature name"]').parentElement.hidden, false);
  assert.equal(actions.filter(action => action.action === 'dispatch').length, 1);
});

test('board search matches spec identity and title while counting parent requirements', async t => {
  const fixture = await roleSpecsFixture(t);
  const app = setup(t, { storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd },
    request: async () => output(await fixture.run()) });
  await settled(); await settled();
  for (const query of ['FE-REQ-001-filters', 'Frontend filters']) {
    app.change('[aria-label="Search requirements"]', query, 'input');
    assert.equal(app.all('.osb-card').length, 1);
    assert.match(app.query('.osb-card-foot').textContent, /5 specs/);
  }
  app.change('[aria-label="Search requirements"]', 'FE-REQ-001-missing', 'input');
  assert.equal(app.all('.osb-card').length, 0);
  assert.equal(app.calls.length, 1);
});

test('a role without specs has an explicit incomplete state and has no invented shared sources', async t => {
  const fixture = await roleSpecsFixture(t);
  await fixture.removeRole('SA');
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-001',
    storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd },
    request: async () => output(await fixture.run()) });
  await settled(); await settled();
  assert.match(app.query('.osb-pipeline').textContent, /No specs yet/);
  assert.match(app.query('.osb-content').textContent, /SA has no role changes/);
  assert.equal(app.query('.osb-completion strong').textContent, '2 of 4 roles complete');
  assert.equal(app.query('[aria-label="Artifact spec"]').value, 'new:SA');
  assert.equal(app.query('.osb-workflow-current').dataset.stage, 'propose');
  assert.equal(app.query('.osb-markdown'), null);
  assert.match(app.query('.osb-artifact-message').textContent, /No artifacts/);
  assert.equal(app.button('Specification'), undefined);
  assert.equal(app.button('Tasks'), undefined);
  assert.equal(app.all('[aria-label="Artifact spec"] option').length, 1);
});

test('manifest identity registers the native page and all six Kanban lanes', async t => {
  const manifest = JSON.parse(await readFile(new URL('../canvas-extension.json', import.meta.url), 'utf8'));
  const app = setup(t);
  await settled();
  assert.equal(manifest.name, 'openspec-progress');
  assert.equal(manifest.entrypoint, 'extension.js');
  assert.deepEqual(app.registrations, manifest.contributes.pages.map(page => page.id));
  assert.deepEqual(app.all('.osb-lane h2').map(node => node.textContent),
    ['Backlog', 'Solution design', 'Implementation', 'Verification', 'Blocked', 'Done']);
  for (const [index, stage] of STAGES.entries()) {
    assert.equal(app.query(`.osb-stage-${stage} .osb-card .osb-id`).textContent, `REQ-00${index + 1}`);
  }
  assert.equal(app.all('.osb-card').length, 6);
  assert.equal(app.query('[aria-label="Filter by priority"]'), null);
  assert.equal(app.all('.osb-card-top .osb-badge').length, 0);
  assert.equal(app.query('.osb-stage-qa .osb-card-foot').textContent, '3/4 roles · 4 specs7/8 tasks');
  assert.equal(app.query('.osb-stage-done .osb-card-foot').textContent, '4/4 roles · 4 specs8/8 tasks');
  assert.equal(app.query('.osb-stage-blocked .osb-blocker').textContent, '! Waiting for the design decision');
  assert.deepEqual(app.all('.osb-stage-qa .osb-role').map(node => node.getAttribute('aria-label')), [
    'SA: Complete · 1 specs · 2/2 tasks', 'Frontend: Complete · 1 specs · 2/2 tasks',
    'Backend: Complete · 1 specs · 2/2 tasks', 'QA: In progress · 1 specs · 1/2 tasks',
  ]);
  assert.equal(app.query('.osb-metrics').textContent.includes('9 / 24'), true);
  assert.ok(app.query('style[data-openspec-board]').textContent.length > 100);
  assert.equal(app.query('.osb-root').getAttribute('aria-busy'), 'false');
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0].method, 'POST');
  assert.equal(app.calls[0].path, '/api/bash/execute_bash_command');
  assert.equal(app.calls[0].body.cwd, DEFAULT_STORE);
  assert.match(app.calls[0].body.command, /^node -e /);
});

test('search is case insensitive and matches requirement IDs, titles and change names', async t => {
  const app = setup(t);
  await settled();
  for (const query of ['req-003', 'REQUIREMENT FOR IMPLEMENTATION', 'SAMPLE-IMPLEMENTATION']) {
    app.change('[aria-label="Search requirements"]', query, 'input');
    assert.deepEqual(app.all('.osb-card .osb-id').map(node => node.textContent), ['REQ-003']);
    assert.match(app.query('.osb-board-caption').textContent, /1 of 6 requirements/);
  }
});

test('search and unfinished-role filters combine, and an empty result can clear all filters', async t => {
  const app = setup(t);
  await settled();
  app.change('[aria-label="Filter by unfinished role"]', 'Frontend');
  assert.deepEqual(app.all('.osb-card .osb-id').map(node => node.textContent), ['REQ-001', 'REQ-002', 'REQ-003', 'REQ-005']);
  app.change('[aria-label="Search requirements"]', 'implementation', 'input');
  assert.deepEqual(app.all('.osb-card .osb-id').map(node => node.textContent), ['REQ-003']);
  app.change('[aria-label="Search requirements"]', 'absent requirement', 'input');
  assert.equal(app.query('.osb-empty h2').textContent, 'No matching requirements');
  assert.equal(app.all('.osb-card').length, 0);
  app.button('Clear filters').click();
  assert.equal(app.all('.osb-card').length, 6);
  for (const selector of ['[aria-label="Search requirements"]', '[aria-label="Filter by unfinished role"]']) {
    assert.equal(app.query(selector).value, '');
  }
});

test('list view preserves filters and its requirement links use host navigation', async t => {
  const app = setup(t);
  await settled();
  app.change('[aria-label="Filter by unfinished role"]', 'Frontend');
  app.button('List').click();
  assert.equal(app.button('List').getAttribute('aria-pressed'), 'true');
  assert.equal(app.query('.osb-board'), null);
  assert.deepEqual(app.all('thead th').map(node => node.textContent),
    ['Requirement', 'Stage', 'Role progress', 'Tasks']);
  assert.equal(app.all('tbody tr').length, 4);
  app.query('.osb-list-title').click();
  assert.deepEqual(app.navigation, [`${BASE}/requirements/REQ-001`]);
  app.button('Board').click();
  assert.equal(app.all('.osb-card').length, 4);
  assert.equal(app.query('[aria-label="Filter by unfinished role"]').value, 'Frontend');
  assert.equal(app.button('Board').getAttribute('aria-pressed'), 'true');
});

test('direct requirement detail displays all roles and read-only task checklists', async t => {
  const app = setup(t, { path: 'requirements/REQ-004' });
  await settled();
  assert.equal(app.query('.osb-detail-heading h2').textContent, 'Requirement for qa');
  assert.deepEqual(app.all('.osb-detail-heading .osb-badge').map(node => node.textContent), ['Verification']);
  assert.equal(app.query('.osb-completion strong').textContent, '3 of 4 roles complete');
  assert.deepEqual(app.all('.osb-role-panel h3').map(node => node.textContent),
    ['SA · Solution Architect', 'Frontend', 'Backend', 'QA']);
  assert.deepEqual(app.all('.osb-owner').map(node => node.textContent), ROLE_IDS.map(role => `Sample ${role} owner`));
  assert.equal(app.all('.osb-checklist li').length, 8);
  assert.equal(app.all('.osb-checklist li.completed').length, 7);
  assert.equal(app.all('.osb-checklist input, .osb-checklist button, [contenteditable="true"]').length, 0);
  assert.equal(app.query('.osb-checklist li small').textContent, 'SA-REQ-004-sample-qa/tasks.md:3');
  assert.match(app.query('.osb-footer').textContent, /Read-only progress/);
  assert.equal(app.all('.osb-role-actions, .osb-artifacts').length, 0, 'Kanban delegates sources and execution to role apps');
  assert.equal(app.all('.osb-role-spec a').length, 4);
  assert.equal(app.automationCalls.length, 0);
  assert.equal(app.calls.length, 1);
  assert.ok(app.automationCalls.every(call => call.method === 'GET'), 'Read-only connection discovery never dispatches');
  app.query('.osb-breadcrumb a').click();
  assert.deepEqual(app.navigation, [BASE]);
});

test('role change deep links select its exact source and fixed role within the requirement', async t => {
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-004/changes/FE-REQ-004-sample-qa' });
  await settled();
  assert.equal(app.query('.osb-breadcrumb .osb-id').textContent, 'REQ-004');
  assert.equal(app.query('.osb-detail-heading h2').textContent, 'Requirement for qa');
  assert.equal(app.query('[aria-label="Artifact spec"]').value, 'FE-REQ-004-sample-qa');
  assert.match(app.query('.osb-artifact-path').textContent, /FE-REQ-004-sample-qa\/proposal.md$/);
  assert.ok(app.query('.osb-selected-automation-title'));
  assert.equal(app.all('[aria-label="Artifact spec"] option').length, 1);
  app.button('Design').click();
  app.button('Refresh').click(); await settled();
  assert.equal(app.query('[aria-label="Artifact spec"]').value, 'FE-REQ-004-sample-qa');
  assert.match(app.query('.osb-artifact-path').textContent, /FE-REQ-004-sample-qa\/design.md$/);
});

test('detail task text preserves meaningful leading numbers from the collector', async t => {
  const data = board();
  const requirement = data.requirements[3];
  requirement.tasks[0].description = '429 responses include Retry-After';
  const app = setup(t, { path: 'requirements/REQ-004', request: () => output(data) });
  await settled();
  assert.equal(app.query('.osb-checklist li div > span').textContent, '429 responses include Retry-After');
});

test('artifact preview defaults on and source tabs preserve literal text without executing HTML', async t => {
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-004' });
  await settled();
  assert.equal(app.button('Preview').getAttribute('aria-pressed'), 'true');
  assert.equal(app.query('.osb-markdown h1').textContent, 'Proposal');
  assert.match(app.query('.osb-markdown').textContent, /<script>/);
  assert.equal(app.query('.osb-artifact-body script, .osb-artifact-body img'), null);
  assert.equal(app.dom.window.artifactExecuted, undefined);
  app.button('Source').focus();
  app.button('Source').click();
  assert.equal(app.document.activeElement, app.button('Source'));
  assert.equal(app.button('Source').getAttribute('aria-pressed'), 'true');
  assert.equal(app.query('.osb-artifact-source').textContent, UNSAFE_ARTIFACT);
  for (const [label, artifact] of [['Design', 'design'], ['Specification', 'specs'], ['Tasks', 'tasks']]) {
    app.button(label).focus();
    app.button(label).click();
    assert.equal(app.document.activeElement, app.button(label));
    assert.equal(app.query('.osb-artifact-source').textContent, `# ${artifact}\nSource text for sample-qa.`);
    assert.equal(app.button(label).getAttribute('aria-pressed'), 'true');
    assert.equal(app.button('Source').getAttribute('aria-pressed'), 'true');
  }
  app.button('Preview').click();
  assert.equal(app.query('.osb-markdown h1').textContent, 'tasks');
  app.button('Design').click();
  assert.equal(app.query('.osb-markdown h1').textContent, 'design');
  assert.equal(app.button('Preview').getAttribute('aria-pressed'), 'true');
  assert.equal(app.calls.length, 1, 'Artifact inspection must use the read-only snapshot');
});

test('artifact mode and selected document survive successful and failed refreshes', async t => {
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-002', request: (request, count) => {
    if (count === 3) throw new Error('Store unavailable');
    const data = board();
    data.requirements[1].specs[0].artifacts[1].content = `# Design revision ${count}\n\nKeep source exact.\n`;
    return output(data);
  } });
  await settled();
  app.button('Design').click(); app.button('Source').click();
  app.button('Refresh').click(); await settled();
  assert.equal(app.query('.osb-artifact-source').textContent, '# Design revision 2\n\nKeep source exact.\n');
  assert.equal(app.button('Source').getAttribute('aria-pressed'), 'true');
  assert.equal(app.button('Design').getAttribute('aria-pressed'), 'true');
  app.button('Preview').click();
  assert.equal(app.query('.osb-markdown h1').textContent, 'Design revision 2');
  app.button('Refresh').click(); await settled();
  assert.equal(app.query('.osb-markdown h1').textContent, 'Design revision 2');
  assert.equal(app.button('Preview').getAttribute('aria-pressed'), 'true');
  assert.match(app.query('[role="alert"]').textContent, /Stale snapshot/);
  app.button('Source').click();
  assert.equal(app.query('.osb-artifact-source').textContent, '# Design revision 2\n\nKeep source exact.\n', 'A failed refresh leaves snapshot inspection usable');
  assert.equal(app.calls.length, 3);
});

test('empty artifacts are explained and task preview cannot change progress', async t => {
  const data = board();
  data.requirements[1].specs[0].artifacts[1].content = '';
  data.requirements[1].specs[0].warnings = ['Planning or task content is missing or empty; completion is unverified.'];
  data.requirements[1].warnings = data.requirements[1].specs[0].warnings.map(w => `${data.requirements[1].specs[0].id}: ${w}`);
  data.requirements[1].specs[0].artifacts[3].content = '# Tasks\n\n- [x] Ready\n- [ ] Pending\n';
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-002', request: () => output(data) });
  await settled();
  app.button('Design').click();
  assert.equal(app.query('.osb-artifact-message').textContent, 'This artifact is empty.');
  app.button('Source').click();
  assert.equal(app.query('.osb-artifact-source').textContent, '');
  app.button('Tasks').click(); app.button('Preview').click();
  const checks = app.all('.osb-markdown input[type="checkbox"]');
  assert.equal(checks.length, 2);
  assert.ok(checks.every(node => node.disabled));
  assert.deepEqual(checks.map(node => node.checked), [true, false]);
  checks[1].click();
  assert.equal(checks[1].checked, false);
  assert.equal(app.calls.length, 1);
});

test('preview rendering failure preserves source access and the requirement details', async t => {
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-002' });
  await settled();
  app.button('Source').click();
  const createElement = app.document.createElement;
  app.document.createElement = function(tag, ...args) {
    if (tag === 'h1') throw new Error('Renderer unavailable');
    return createElement.call(this, tag, ...args);
  };
  try { app.button('Preview').click(); } finally { app.document.createElement = createElement; }
  assert.match(app.query('.osb-artifact-body [role="alert"]').textContent, /could not be previewed/);
  assert.equal(app.all('.osb-role-panel').length, 1);
  app.button('View source').click();
  assert.equal(app.query('.osb-artifact-source').textContent, UNSAFE_ARTIFACT);
  assert.equal(app.document.activeElement, app.button('Source'));
  assert.equal(app.calls.length, 1);
});

test('missing source artifacts and missing role tasks remain visible as warnings', async t => {
  const data = board();
  const requirement = data.requirements[0];
  requirement.specs[0].artifacts[1].status = 'missing';
  requirement.specs[0].artifacts[1].content = '';
  requirement.specs[0].warnings = ['Planning or task content is missing or empty; completion is unverified.'];
  requirement.specs = requirement.specs.filter(spec => spec.role !== 'QA');
  requirement.tasks = requirement.tasks.filter(task => task.role !== 'QA');
  requirement.total = requirement.tasks.length;
  Object.assign(requirement.roles[3], { total: 0, tasks: [], specs: [] });
  requirement.warnings = [...requirement.specs[0].warnings.map(w => `${requirement.specs[0].id}: ${w}`), 'QA has no role changes; completion is unverified.'];
  const app = setup(t, { role: 'SA', path: 'requirements/REQ-001', request: () => output(data) });
  await settled();
  assert.match(app.query('.osb-content').textContent, /QA has no role changes/);
  assert.equal(app.all('.osb-role-panel').length, 1);
  assert.equal(app.query('.osb-completion strong').textContent, '0 of 4 roles complete');
  app.button('Design · missing').click();
  assert.equal(app.query('.osb-artifact-message').textContent, 'This artifact has not been created yet.');
  app.button('Source').click();
  assert.equal(app.query('.osb-artifact-message').textContent, 'This artifact has not been created yet.');
});

test('unknown page routes return a visible fallback without querying the store', async t => {
  const app = setup(t, { path: 'requirements/REQ-004/extra' });
  await settled();
  assert.equal(app.query('h1').textContent, 'Page not found');
  assert.equal(app.calls.length, 0);
  app.query('.osb-root a').click();
  assert.deepEqual(app.navigation, [BASE]);
});

test('well-formed but unknown requirement routes show a recovery link', async t => {
  const app = setup(t, { path: 'requirements/REQ-999' });
  await settled();
  assert.equal(app.query('.osb-content h2').textContent, 'Requirement not found');
  assert.equal(app.query('.osb-content a').getAttribute('href'), BASE);
  assert.equal(app.query('.osb-detail-heading'), null);
});

test('an empty store displays onboarding without a misleading filtered-empty action', async t => {
  const data = board();
  data.requirements = [];
  const app = setup(t, { request: () => output(data) });
  await settled();
  assert.equal(app.query('.osb-empty h2').textContent, 'Your board is ready');
  assert.match(app.query('.osb-empty').textContent, /openspec\/changes/);
  assert.equal(app.button('Clear filters'), undefined);
  assert.equal(app.query('.osb-metrics strong').textContent, '00');
});

test('initial failures display an actionable error and a later refresh recovers', async t => {
  const app = setup(t, { request: (request, call) => {
    if (call === 1) throw new Error('offline');
    return output(board(request.body.cwd));
  } });
  await settled();
  assert.match(app.query('[role="alert"]').textContent, /Cannot read this store/);
  assert.doesNotMatch(app.query('[role="alert"]').textContent, /Stale snapshot/);
  assert.equal(app.all('.osb-card').length, 0);
  assert.equal(app.button('Refresh').disabled, false);
  app.button('Refresh').click();
  await settled();
  assert.equal(app.all('.osb-card').length, 6);
  assert.equal(app.query('[role="alert"]'), null);
});

test('failed refresh retains the last board with an explicit stale warning', async t => {
  const app = setup(t, { request: (request, call) => {
    if (call > 1) throw new Error('offline');
    return output(board(request.body.cwd));
  } });
  await settled();
  const before = app.query('.osb-board').textContent;
  app.button('Refresh').click();
  await settled();
  assert.equal(app.query('.osb-board').textContent, before);
  assert.match(app.query('[role="alert"]').textContent, /^Stale snapshot — Cannot read this store/);
  assert.equal(app.query('.osb-root').getAttribute('aria-busy'), 'false');
  assert.equal(app.button('Refresh').disabled, false);
});

test('refresh reloads role counts and moves a requirement after source progress changes', async t => {
  const app = setup(t, { request: (request, call) => {
    const data = board(request.body.cwd);
    if (call > 1) {
      const requirement = data.requirements[3];
      requirement.tasks.forEach(task => { task.done = true; });
      requirement.roles.forEach(role => { role.state = 'done'; role.complete = role.total; });
      requirement.specs.forEach(spec => { spec.state = 'done'; spec.complete = spec.total; });
      requirement.stage = 'done';
      requirement.rolesComplete = 4;
      requirement.complete = requirement.total;
    }
    return output(data);
  } });
  await settled();
  assert.equal(app.all('.osb-stage-qa .osb-card').length, 1);
  app.button('Refresh').click();
  await settled();
  assert.equal(app.all('.osb-stage-qa .osb-card').length, 0);
  assert.deepEqual(app.all('.osb-stage-done .osb-card .osb-id').map(node => node.textContent), ['REQ-004', 'REQ-006']);
  assert.equal(app.query('.osb-stage-done .osb-card-foot').textContent, '4/4 roles · 4 specs8/8 tasks');
});

test('pending requests disable controls and prevent duplicate refresh or store submissions', async t => {
  const pending = deferred();
  const app = setup(t, { request: () => pending.promise });
  assert.equal(app.calls.length, 1);
  assert.equal(app.button('Refreshing').disabled, true);
  assert.equal(app.button('Load store').disabled, true);
  assert.equal(app.query('[aria-label="Spec store directory"]').disabled, true);
  app.button('Refreshing').dispatchEvent(new app.dom.window.Event('click'));
  app.query('.osb-store').dispatchEvent(new app.dom.window.Event('submit', { cancelable: true }));
  assert.equal(app.calls.length, 1);
  pending.resolve(output(board()));
  await settled();
  assert.equal(app.all('.osb-card').length, 6);
  assert.equal(app.button('Refresh').disabled, false);
  assert.equal(app.query('[aria-label="Spec store directory"]').disabled, false);
});

test('unmount while loading removes styles and ignores the late response', async t => {
  const pending = deferred();
  const app = setup(t, { request: () => pending.promise });
  const detachedRoot = app.query('.osb-root');
  const loadingText = detachedRoot.textContent;
  app.dispose();
  assert.equal(app.query('.osb-root'), null);
  assert.equal(app.query('style[data-openspec-board]'), null);
  const replacement = app.document.createElement('p');
  replacement.textContent = 'Another page';
  app.query('main').append(replacement);
  pending.resolve(output(board()));
  await settled();
  assert.equal(app.query('main').textContent, 'Another page');
  assert.equal(detachedRoot.textContent, loadingText);
});

test('extension deactivation unregisters its page and cleans all live mounts', async t => {
  const app = setup(t);
  const other = app.document.createElement('aside');
  app.document.body.append(other);
  app.mount('requirements/REQ-006', other);
  await settled();
  assert.equal(app.all('.osb-root').length, 2);
  assert.equal(app.all('style[data-openspec-board]').length, 2);
  app.deactivate();
  assert.equal(app.unregisterCount(), 1);
  assert.equal(app.all('.osb-root, style[data-openspec-board]').length, 0);
});

test('unsupported host versions fail before registering a page or querying data', t => {
  const app = setup(t, { apiVersion: '2', start: false });
  assert.throws(() => app.start(), /requires Canvas host API 1/);
  assert.deepEqual(app.registrations, []);
  assert.equal(app.calls.length, 0);
});

test('nonlocal backends display the supported connection requirement without a query', async t => {
  const app = setup(t, { backendKind: 'remote' });
  await settled();
  assert.match(app.query('.osb-alert').textContent, /Connect a local Agent Server/);
  assert.equal(app.calls.length, 0);
});

test('remembered store locations are scoped to the selected backend and update on submit', async t => {
  const key = 'openhands.apps.openspec-progress:v3:local-main:store';
  const otherKey = 'openhands.apps.openspec-progress:v3:other-backend:store';
  const app = setup(t, { storage: { [key]: '/tmp/remembered-store', [otherKey]: '/tmp/other-store' } });
  await settled();
  assert.equal(app.calls[0].body.cwd, '/tmp/remembered-store');
  assert.equal(app.query('[aria-label="Spec store directory"]').value, '/tmp/remembered-store');
  app.change('[aria-label="Spec store directory"]', '/tmp/new-store');
  app.query('.osb-store').dispatchEvent(new app.dom.window.Event('submit', { cancelable: true }));
  await settled();
  assert.equal(app.calls[1].body.cwd, '/tmp/new-store');
  assert.equal(app.dom.window.localStorage.getItem(key), '/tmp/new-store');
  assert.equal(app.dom.window.localStorage.getItem(otherKey), '/tmp/other-store');
  assert.equal(app.all('.osb-card').length, 6);
  app.deactivate();
  app.host.backend.id = 'other-backend';
  app.start();
  app.mount();
  await settled();
  assert.equal(app.calls[2].body.cwd, '/tmp/other-store');
});

test('invalid remembered paths fall back to the default and invalid submitted paths never query', async t => {
  const key = 'openhands.apps.openspec-progress:v3:local-main:store';
  const app = setup(t, { storage: { [key]: '/tmp/../invalid' } });
  await settled();
  assert.equal(app.calls[0].body.cwd, DEFAULT_STORE);
  app.change('[aria-label="Spec store directory"]', '/tmp/../invalid');
  app.query('.osb-store').dispatchEvent(new app.dom.window.Event('submit', { cancelable: true }));
  await settled();
  assert.equal(app.calls.length, 1);
  assert.match(app.query('[role="alert"]').textContent, /Enter an absolute store directory/);
  assert.equal(app.all('.osb-card').length, 6);
});

test('changing the store from a detail route navigates back before loading the new board', async t => {
  const app = setup(t, { path: 'requirements/REQ-004' });
  await settled();
  app.change('[aria-label="Spec store directory"]', '/tmp/another-store');
  app.query('.osb-store').dispatchEvent(new app.dom.window.Event('submit', { cancelable: true }));
  assert.deepEqual(app.navigation, [appHref(KANBAN_APP, '/tmp/another-store')]);
  assert.equal(app.calls.length, 1);
  app.dispose();
  app.mount('');
  await settled();
  assert.equal(app.calls[1].body.cwd, '/tmp/another-store');
});

test('switching role changes loads all four owned artifact paths without dispatch', async t => {
  const fixture = await roleSpecsFixture(t);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-001',
    storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd },
    request: async () => output(await fixture.run()) });
  await settled(); await settled();
  for (const id of ['FE-REQ-001-labels', 'FE-REQ-001-filters']) {
    app.change('[aria-label="Artifact spec"]', id);
    assert.equal(app.query('.osb-artifact-heading code').textContent, `openspec/changes/${id}`);
    for (const [button, relative] of [['Proposal', 'proposal.md'], ['Design', 'design.md'], ['Specification', 'specs'], ['Tasks', 'tasks.md']]) {
      app.button(button).click();
      assert.equal(app.query('.osb-artifact-path').textContent, `${fixture.root}/${id}/${relative}`);
    }
  }
  assert.equal(app.calls.length, 1);
  assert.ok(app.automationCalls.every(call => call.method === 'GET'));
});

function readyAutomations(actions, workspace = DEFAULT_STORE) {
  const automations = ROLE_IDS.flatMap((role, r) => STAGES.map((stage, s) => ({
    id: `0f0f0f0f-1111-4444-8888-${String(r * STAGES.length + s + 1).padStart(12, '0')}`,
    name: `OpenSpec ${role} · ${ACTIONS.find(action => action.id === stage).label}`, role, stage,
  })));
  return async request => {
    if (request.path === '/server_info') return { runtime_services: { services: { automation: {
      url_from_agent: 'http://127.0.0.1:18001', api_prefix: '/api/automation', auth_env_var: 'OPENHANDS_AUTOMATION_API_KEY',
    } } } };
    if (request.path === '/api/file/home') return { home: '/Users/test' };
    const encoded = request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1];
    const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    actions.push(payload);
    assert.equal(payload.action, 'probe', 'Passive role workspace interactions only probe definitions');
    return output({ version: 1, kind: 'probe', ready: true, automations,
      configuration: { workspace: '/Users/test/project', spec_store: workspace,
        store_id: 'openspec-store', repository: '/Users/oka/Desktop/openhands-automation',
        profile: 'codex-acp-demo', skill_root: '/Users/test/project', timeout_seconds: 1800 }, message: '' });
  };
}

function assertAutomationLanguage(app) {
  const owned = app.all('.osb-header, .osb-footer, .osb-artifact-actions, .osb-automation-catalog');
  for (const node of owned) assert.doesNotMatch(node.textContent, /\bskills?\b/i, 'Execution copy uses automation terminology');
  for (const node of app.all('[aria-label]')) assert.doesNotMatch(node.getAttribute('aria-label'), /\bskills?\b/i);
}

for (const descriptor of ROLE_APPS) {
  test(`${descriptor.displayName} home and detail expose only its work and three related automations`, async t => {
    const actions = [];
    const app = setup(t, { role: descriptor.role, automationRequest: readyAutomations(actions) });
    await settled();
    assert.deepEqual(app.registrations, ['role']);
    assert.equal(app.query('.osb-header h1').textContent, descriptor.displayName);
    assertAutomationLanguage(app);
    assert.equal(app.all('.osb-role-work-item').length, 6);
    const changes = app.all('.osb-role-work-item .osb-spec-link');
    assert.equal(changes.length, 6);
    assert.ok(changes.every(node => node.textContent.startsWith(`${descriptor.short}-`)));
    assertWorkflowLayout(app);
    assert.equal(app.query('.osb-supporting-work').open, false, 'Work list remains available below the workflow');
    assert.equal(app.query('[aria-label="Requirement"]').value, '', 'Home does not select a fabricated target');
    assert.equal(app.query(`[aria-label="${descriptor.role} prompt"]`).disabled, false);
    for (const stage of ['propose', 'update', 'apply']) {
      app.selectAutomation(stage);
      const label = stage[0].toUpperCase() + stage.slice(1);
      assert.match(app.query('.osb-selected-automation-definition').textContent, new RegExp(`OpenSpec ${descriptor.role} · ${label}`));
      assert.equal(app.button(`Run ${descriptor.role} ${label}`).disabled, true);
    }
    app.query('.osb-selected-automation-definition a').click();
    assert.match(app.navigation[0], /^\/automations\/0f0f0f0f-/);
    app.button('Refresh').click(); await settled();
    assertWorkflowLayout(app);
    app.dispose();
    app.mount(`requirements/REQ-004/changes/${descriptor.short}-REQ-004-sample-qa`);
    await settled();
    assert.equal(app.all('.osb-role-panel').length, 1);
    assertWorkflowLayout(app);
    assert.equal(app.all('.osb-automation-catalog').length, 0, 'Selected action owns its definition and connection controls');
    assert.equal(app.all('[aria-label="Artifact spec"] option').length, 1);
    assert.equal(app.query('[aria-label="Artifact spec"]').value, `${descriptor.short}-REQ-004-sample-qa`);
    assert.equal(app.query('form.osb-skill-form').getAttribute('aria-label'), `${descriptor.role} automation form`);
    assert.equal(app.all(`[aria-label="${descriptor.role} automation"]`).length, 0, 'No duplicate dropdown competes with the diagram');
    const form = app.query('.osb-skill-form');
    const source = app.query('.osb-markdown');
    const viewer = app.query('.osb-workflow-frame');
    app.change(`[aria-label="${descriptor.role} prompt"]`, 'Keep this draft while selecting nodes', 'input');
    for (const stage of ['propose', 'update', 'apply']) {
      app.selectAutomation(stage);
      assert.equal(app.query('.osb-skill-form'), form, 'Node selection preserves the mounted form');
      assert.equal(app.query('.osb-markdown'), source, 'Node selection preserves the mounted artifact');
      assert.equal(app.query('.osb-workflow-frame'), viewer, 'Selection synchronization does not reset the viewer');
      assert.equal(app.query(`[aria-label="${descriptor.role} prompt"]`).value, 'Keep this draft while selecting nodes');
      assert.equal(app.query('.osb-workflow-current').dataset.stage, stage);
      assert.equal(app.all('.osb-workflow-current').length, 1);
      assert.equal(app.query(`[aria-label="${descriptor.role} new feature name"]`).required, stage === 'propose');
      assert.equal(app.query(`[aria-label="${descriptor.role} prompt"]`).required, stage !== 'apply');
      assertAutomationLanguage(app);
    }
    assert.match(app.query('.osb-markdown').textContent, /Keep this skill note unchanged\./, 'User-authored artifact wording stays literal');
    assert.equal(app.inventoryCalls.length, 0, 'Role workspace does not depend on app inventory');
    assert.ok(actions.length >= 3 && actions.every(action => action.action === 'probe'));
  });
}

test('Kanban links preserve store, requirement and selected role change without nested anchors', async t => {
  const workspace = '/tmp/共享 store';
  const app = setup(t, { storage: { [storeKey('local-main')]: workspace } });
  await settled();
  const title = app.query('.osb-card-title');
  assert.equal(title.getAttribute('href'), appHref(KANBAN_APP, workspace, 'REQ-001'));
  assert.equal(app.all('a a').length, 0);
  const frontend = app.query('.osb-card [data-role-app="openspec-fe"]');
  assert.equal(frontend.getAttribute('href'), appHref(roleApp('Frontend'), workspace, 'REQ-001'));
  frontend.click();
  assert.equal(app.navigation[0], frontend.getAttribute('href'));
  app.dispose(); app.mount(`stores/${encodeWorkspace(workspace)}/requirements/REQ-004`);
  await settled();
  for (const descriptor of ROLE_APPS) {
    const link = app.query(`.osb-role-spec [data-role-app="${descriptor.name}"]`);
    assert.equal(link.getAttribute('href'), appHref(descriptor, workspace, 'REQ-004', `${descriptor.short}-REQ-004-sample-qa`));
  }
  assert.equal(app.all('.osb-artifacts, .osb-skill-form').length, 0);
  assert.equal(app.automationCalls.length, 0);
});

test('Kanban explains missing, disabled and malformed app destinations and retries inventory', async t => {
  const entries = inventory().canvas_extensions;
  entries[0].enabled = false;
  entries[1].manifest.contributes.pages = {};
  let result = { canvas_extensions: entries.slice(0, 3) };
  const app = setup(t, { inventoryRequest: () => result });
  await settled();
  const role = name => app.query(`.osb-app-availability [data-role-app="${name}"]`);
  assert.match(role('openspec-sa').textContent, /disabled/);
  assert.match(role('openspec-fe').textContent, /unavailable/);
  assert.match(role('openspec-qa').textContent, /not installed/);
  for (const id of ['openspec-sa', 'openspec-fe', 'openspec-qa']) assert.equal(role(id).tagName, 'SPAN');
  assert.equal(role('openspec-be').tagName, 'A');
  assert.equal(app.query('.osb-app-availability a').getAttribute('href'), '/apps');
  assert.equal(app.all('.osb-card').length, 6);
  result = inventory(); app.button('Refresh').click(); await settled();
  assert.equal(app.all('.osb-app-availability [data-available="true"]').length, 4);
  assert.equal(app.inventoryCalls.length, 2);
});

for (const [label, response] of [
  ['failed', () => { throw new Error('Inventory offline'); }],
  ['malformed', () => ({ canvas_extensions: [{ name: 'openspec-sa', enabled: 'yes' }] })],
  ['duplicate', () => ({ canvas_extensions: [inventory().canvas_extensions[0], inventory().canvas_extensions[0]] })],
]) test(`${label} installed app inventory leaves Kanban readable with an unknown availability state`, async t => {
  const app = setup(t, { inventoryRequest: response }); await settled();
  assert.equal(app.all('.osb-card').length, 6);
  assert.equal(app.all('.osb-app-availability [data-available="true"]').length, 0);
  assert.match(app.query('.osb-app-availability').textContent, /could not be checked/);
});

test('pending app inventory does not block store reads and late inventory cannot repopulate an unmounted page', async t => {
  const pending = deferred();
  const app = setup(t, { inventoryRequest: () => pending.promise }); await settled();
  assert.equal(app.all('.osb-card').length, 6);
  assert.match(app.query('.osb-app-availability').textContent, /availability unknown/);
  const oldRoot = app.query('.osb-root'); const before = oldRoot.textContent;
  app.dispose(); pending.resolve(inventory()); await settled();
  assert.equal(app.query('.osb-root'), null);
  assert.equal(oldRoot.textContent, before);
});

test('the latest inventory response wins after a newer refresh', async t => {
  const first = deferred(); let count = 0;
  const app = setup(t, { inventoryRequest: () => ++count === 1 ? first.promise : inventory() }); await settled();
  app.button('Refresh').click(); await settled();
  assert.equal(app.all('.osb-app-availability [data-available="true"]').length, 4);
  first.resolve({ canvas_extensions: [] }); await settled();
  assert.equal(app.all('.osb-app-availability [data-available="true"]').length, 4);
});

test('role page mounts use latest shared store while explicit deep-link context wins and returns intact', async t => {
  const key = storeKey('local-main'); const role = roleApp('Backend');
  const app = setup(t, { role: 'Backend', mount: false, storage: { [key]: '/tmp/old-store' } });
  app.dom.window.localStorage.setItem(key, '/tmp/latest-store');
  const dispose = app.mount(); await settled();
  assert.equal(app.calls[0].body.cwd, '/tmp/latest-store'); dispose();
  app.dom.window.localStorage.setItem(key, '/tmp/another-store');
  const workspace = '/tmp/explicit store';
  app.mount(`stores/${encodeWorkspace(workspace)}/requirements/REQ-004/changes/BE-REQ-004-sample-qa`); await settled();
  assert.equal(app.calls[1].body.cwd, workspace);
  assert.equal(app.query('[aria-label="Spec store directory"]').value, workspace);
  assert.equal(app.query('.osb-breadcrumb a').getAttribute('href'), appHref(role, workspace));
  const back = app.all('a').find(node => node.textContent === 'Back to Kanban');
  assert.equal(back.getAttribute('href'), appHref(KANBAN_APP, workspace, 'REQ-004'));
  back.click(); assert.equal(app.navigation[0], back.getAttribute('href'));
});

for (const role of [null, 'Frontend']) test(`${role || 'Kanban'} store-aware home updates URL context before a new mount`, async t => {
  const app = setup(t, { role, path: `stores/${encodeWorkspace('/tmp/old-store')}` }); await settled();
  app.change('[aria-label="Spec store directory"]', '/tmp/new-store');
  app.query('.osb-store').dispatchEvent(new app.dom.window.Event('submit', { cancelable: true }));
  const descriptor = role ? roleApp(role) : KANBAN_APP;
  assert.deepEqual(app.navigation, [appHref(descriptor, '/tmp/new-store')]);
  assert.equal(app.calls.length, 1, 'Navigation owns loading the new route');
  app.dispose(); app.mount(`stores/${encodeWorkspace('/tmp/new-store')}`); await settled();
  assert.equal(app.calls[1].body.cwd, '/tmp/new-store');
});

for (const change of ['QA-REQ-004-sample-qa', 'FE-REQ-002-sample-sa', 'FE-REQ-004-missing']) {
  test(`role deep link ${change} cannot silently select an executable fallback`, async t => {
    const app = setup(t, { role: 'Frontend', path: `requirements/REQ-004/changes/${change}` }); await settled();
    assert.equal(app.query('.osb-content h2').textContent, 'Change unavailable');
    assert.match(app.query('.osb-content').textContent, /missing|another requirement or role/);
    assert.equal(app.all('.osb-skill-form, .osb-artifacts').length, 0);
    assert.equal(app.automationCalls.length, 0);
  });
}

test('removing the original link target preserves a newer selection; removing that selection yields an explicit error', async t => {
  const fixture = await roleSpecsFixture(t);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-001/changes/FE-REQ-001-labels',
    storage: { [storeKey('local-main')]: fixture.cwd }, request: async () => output(await fixture.run()) });
  await settled(); await settled();
  app.change('[aria-label="Artifact spec"]', 'FE-REQ-001-filters');
  const { rm } = await import('node:fs/promises');
  await rm(path.join(fixture.root, 'FE-REQ-001-labels'), { recursive: true });
  app.button('Refresh').click(); await settled(); await settled();
  assert.equal(app.query('[aria-label="Artifact spec"]').value, 'FE-REQ-001-filters');
  await rm(path.join(fixture.root, 'FE-REQ-001-filters'), { recursive: true });
  app.button('Refresh').click(); await settled(); await settled();
  assert.equal(app.query('.osb-content h2').textContent, 'Change unavailable');
  assert.equal(app.all('.osb-skill-form, .osb-artifacts').length, 0);
});

test('a legacy Kanban change route remains a read-only summary with exact role destination', async t => {
  const app = setup(t, { path: 'changes/BE-REQ-004-sample-qa' }); await settled();
  assert.equal(app.query('.osb-detail-heading h2').textContent, 'Requirement for qa');
  assert.equal(app.query('.osb-role-spec [data-role-app="openspec-be"]').getAttribute('href'),
    appHref(roleApp('Backend'), DEFAULT_STORE, 'REQ-004', 'BE-REQ-004-sample-qa'));
  assert.equal(app.all('.osb-artifacts, .osb-skill-form').length, 0);
});

test('shared setup updates selected automation history without remounting its draft', async t => {
  const actions = [];
  let connected = false;
  const validProbe = readyAutomations([]);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-004', automationRequest: async request => {
    if (request.method === 'GET') return validProbe(request);
    const encoded = request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1];
    const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    actions.push(payload.action);
    if (payload.action === 'setup') connected = true;
    assert.ok(['probe', 'setup'].includes(payload.action));
    const probePayload = { ...payload, action: 'probe' };
    const probeRequest = { ...request, body: { ...request.body, command: request.body.command.replace(/'([A-Za-z0-9+/=]+)'\s*$/, `'${Buffer.from(JSON.stringify(probePayload)).toString('base64')}'`) } };
    const response = await validProbe(probeRequest);
    const value = JSON.parse(response.stdout);
    value.kind = payload.action;
    if (!connected) { value.ready = false; value.automations = []; }
    return output(value);
  } });
  await settled();
  assert.equal(app.all('.osb-selected-automation-definition a').length, 0);
  app.selectAutomation('update');
  app.change('[aria-label="Frontend prompt"]', 'Preserve connection setup draft', 'input');
  const form = app.query('.osb-skill-form');
  app.button('Connect shared automations').click(); await settled();
  assert.equal(app.query('.osb-skill-form'), form, 'Setup must preserve the selected action form');
  assert.equal(app.all('.osb-selected-automation-definition a').length, 1);
  assert.match(app.query('.osb-selected-automation-definition').textContent, /Frontend · Update/);
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, 'Preserve connection setup draft');
  assert.equal(app.query('.osb-workflow-current').dataset.stage, 'update');
  assert.deepEqual(actions, ['probe', 'setup']);
});

test('home carries its draft only to the explicitly chosen first requirement, once', async t => {
  const actions = [];
  const app = setup(t, { role: 'Frontend', automationRequest: readyAutomations(actions) });
  await settled();
  app.selectAutomation('propose');
  app.change('[aria-label="Frontend new feature name"]', 'Filter drafts', 'input');
  app.change('[aria-label="Frontend prompt"]', 'Create a filter control', 'input');
  assert.equal(app.button('Run Frontend Propose').disabled, true);
  assert.equal(app.dom.window.localStorage.length, 0, 'Untargeted drafts are never persisted');
  app.change('[aria-label="Requirement"]', 'REQ-004');
  assert.deepEqual(app.navigation, [appHref(roleApp('Frontend'), DEFAULT_STORE, 'REQ-004')]);
  app.dispose();
  const disposeTarget = app.mount(`stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-004`);
  await settled();
  assert.equal(app.query('[aria-label="Requirement"]').value, 'REQ-004');
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, 'Create a filter control');
  assert.equal(app.query('[aria-label="Frontend new feature name"]').value, 'Filter drafts');
  assert.equal(app.query('.osb-workflow-current').dataset.stage, 'propose');
  assert.equal(app.button('Run Frontend Propose').disabled, false);
  app.change('[aria-label="Requirement"]', 'REQ-005');
  disposeTarget();
  const disposeNext = app.mount(`stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-005`);
  await settled();
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, '', 'Changing an existing target discards its draft');
  assert.equal(app.query('[aria-label="Frontend new feature name"]').value, '');
  disposeNext(); app.mount(`stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-004`);
  await settled();
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, '', 'Consumed home draft cannot reappear');
  assert.ok(actions.every(action => action.action === 'probe'));
});

for (const [label, destination] of [
  ['another requirement', `stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-005`],
  ['another store', `stores/${encodeWorkspace('/tmp/other-store')}/requirements/REQ-004`],
  ['an explicit different change route', `stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-004/changes/FE-REQ-004-sample-qa`],
  ['a missing target', `stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-999`],
]) test(`home draft cannot leak after navigation to ${label}`, async t => {
  const app = setup(t, { role: 'Frontend' }); await settled();
  app.change('[aria-label="Frontend prompt"]', 'Do not leak this draft', 'input');
  app.change('[aria-label="Requirement"]', 'REQ-004');
  app.dispose(); const disposeOther = app.mount(destination); await settled();
  if (app.query('[aria-label="Frontend prompt"]')) assert.equal(app.query('[aria-label="Frontend prompt"]').value, '');
  disposeOther(); app.mount(`stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-004`); await settled();
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, '');
  assert.ok(app.automationCalls.every(call => call.method === 'GET'));
});

test('dispatch locks viewer selection and leaving disposes retained frame messages', async t => {
  const pending = deferred(); const actions = []; const probe = readyAutomations(actions);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-004', automationRequest: request => {
    if (request.method === 'GET') return probe(request);
    const encoded = request.body.command.match(/'([A-Za-z0-9+/=]+)'\s*$/)[1];
    const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    if (payload.action !== 'dispatch') return probe(request);
    actions.push(payload); return pending.promise;
  } });
  await settled();
  app.selectAutomation('update');
  app.change('[aria-label="Frontend prompt"]', 'Refine this exact target', 'input');
  const form = app.query('.osb-skill-form');
  const source = app.query('.osb-markdown');
  app.button('Run Frontend Update').click(); await settled();
  assert.equal(app.query('.osb-workflow-current').dataset.disabled, 'true');
  for (const stage of ['propose', 'apply', 'propose']) app.selectAutomation(stage);
  assert.equal(app.query('.osb-workflow-current').dataset.stage, 'update');
  assert.equal(app.query('.osb-skill-form'), form); assert.equal(app.query('.osb-markdown'), source);
  const retainedFrame = app.query('.osb-workflow-frame');
  const retainedSource = retainedFrame.contentWindow;
  const retainedSelection = workflowMessage(retainedFrame, 'select', 'propose');
  const dispatch = actions.find(action => action.action === 'dispatch');
  assert.equal(dispatch.input.stage, 'update');
  assert.equal(dispatch.input.spec_id, 'FE-REQ-004-sample-qa');
  assert.equal(dispatch.input.request, 'Refine this exact target');
  app.dispose();
  app.dom.window.dispatchEvent(new app.dom.window.MessageEvent('message', { origin: 'null', source: retainedSource, data: retainedSelection }));
  pending.resolve(output({ version: 1, kind: 'dispatch', automation_id: dispatch.input.automation_id,
    request_id: dispatch.input.request_id, run_id: '05ad810c-bcc0-409b-902d-1bc78023c22b' }));
  await settled();
  assert.equal(app.query('.osb-root'), null);
  assert.equal(actions.filter(action => action.action === 'dispatch').length, 1);
});

test('a vanished first target discards its home draft even if the requirement returns on refresh', async t => {
  const app = setup(t, { role: 'Frontend', request: (request, count) => {
    const data = board(request.body.cwd);
    if (count === 2) data.requirements = data.requirements.filter(item => item.id !== 'REQ-004');
    return output(data);
  } });
  await settled();
  app.change('[aria-label="Frontend prompt"]', 'Discard this missing-target draft', 'input');
  app.change('[aria-label="Requirement"]', 'REQ-004');
  app.dispose(); app.mount(`stores/${encodeWorkspace(DEFAULT_STORE)}/requirements/REQ-004`); await settled();
  assert.equal(app.query('.osb-content h2').textContent, 'Requirement not found');
  app.button('Refresh').click(); await settled();
  assert.equal(app.query('[aria-label="Requirement"]').value, 'REQ-004');
  assert.equal(app.query('[aria-label="Frontend prompt"]').value, '');
  assert.equal(app.query('.osb-workflow-current').dataset.stage, 'apply', 'Recovered target gets a fresh action state');
});

test('retained target and artifact controls cannot remount actions after refresh or page disposal', async t => {
  const fixture = await roleSpecsFixture(t);
  const app = setup(t, { role: 'Frontend', path: 'requirements/REQ-001',
    storage: { [storeKey('local-main')]: fixture.cwd }, request: async () => output(await fixture.run()) });
  await settled(); await settled();
  const oldSpec = app.query('[aria-label="Artifact spec"]');
  const oldRequirement = app.query('[aria-label="Requirement"]');
  const oldSource = app.button('Source');
  app.button('Refresh').click(); await settled(); await settled();
  const form = app.query('.osb-skill-form'), currentSpec = app.query('[aria-label="Artifact spec"]');
  const selected = currentSpec.value, calls = app.automationCalls.length;
  const otherSpec = [...currentSpec.options].find(option => option.value !== selected).value;
  oldSpec.value = otherSpec; oldSpec.dispatchEvent(new app.dom.window.Event('change'));
  oldRequirement.dispatchEvent(new app.dom.window.Event('change')); oldSource.click();
  await settled();
  assert.equal(app.query('.osb-skill-form'), form);
  assert.equal(currentSpec.value, selected, 'Old target controls cannot alter the current selection');
  assert.equal(app.button('Preview').getAttribute('aria-pressed'), 'true');
  assert.equal(app.automationCalls.length, calls);
  const currentSource = app.button('Source');
  app.dispose(); currentSpec.value = otherSpec;
  currentSpec.dispatchEvent(new app.dom.window.Event('change')); currentSource.click(); await settled();
  assert.equal(app.automationCalls.length, calls, 'Disposed target controls cannot start detached discovery');
  assert.equal(app.query('.osb-root'), null);
  assert.deepEqual(app.navigation, []);
});

test('each role screen shows bound applications and upstream specs without dispatching', async t => {
  const { addRepositoryScopes } = await import('./helpers/role-specs.mjs');
  const fixture = await roleSpecsFixture(t);
  await addRepositoryScopes(fixture);
  for (const role of ROLE_IDS) await t.test(role, async t => {
    const ui = setup(t, { role, path: 'requirements/REQ-001', storage: { 'openhands.apps.openspec-progress:v3:local-main:store': fixture.cwd }, request: async () => output(await fixture.run()) });
    await settled();
    const scopes = [...ui.document.querySelectorAll('.osb-applications')];
    assert(scopes.length, `${role} scope visible`);
    const links = scopes.flatMap(node => [...node.querySelectorAll('a')]);
    assert(links.length >= (role === 'SA' ? 3 : 1));
    for (const link of links) assert.match(link.href, role === 'SA' ? /github.com\/example\/sample-/ : new RegExp(`sample-${role.toLowerCase()}$`));
    assert.match(ui.document.body.textContent, role === 'SA' ? /Design and handoff only/ : /Based on: SA-REQ-001-labels/);
    assert(!ui.automationCalls.some(call => call.method === 'POST'));
  });
});
