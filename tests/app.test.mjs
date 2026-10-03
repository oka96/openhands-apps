import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { activate } from '../extension.js';

const DEFAULT_STORE = '/Users/oka/Desktop/openspec-store';
const BASE = '/extensions/openspec-progress/progress';
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
const UNSAFE_ARTIFACT = '# Proposal\n<script>window.artifactExecuted = true</script>\n<img src=x onerror="window.artifactExecuted = true">';

function board(workspace = DEFAULT_STORE) {
  return {
    version: 1,
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
      return {
        id: `REQ-00${index + 1}`,
        title: `Requirement for ${stage}`,
        summary: `A ${stage} requirement to illustrate the delivery lifecycle.`,
        change,
        stage,
        roles,
        complete: tasks.filter(task => task.done).length,
        total: tasks.length,
        rolesComplete: roles.filter(role => role.state === 'done').length,
        tasks,
        warnings: [],
        artifacts: ['proposal', 'design', 'specs', 'tasks'].map(id => ({
          id,
          path: `${root}/${id === 'specs' ? id : `${id}.md`}`,
          status: 'present',
          content: id === 'proposal' ? UNSAFE_ARTIFACT : `# ${id}\nSource text for ${change}.`,
        })),
      };
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
  const navigation = [];
  const registrations = [];
  let unregisterCount = 0;
  let page;
  const host = {
    apiVersion: options.apiVersion || '1',
    extension: { name: 'openspec-progress' },
    backend: { id: options.backendId || 'local-main', kind: options.backendKind || 'local' },
    registerPage(id, render) {
      registrations.push(id);
      page = render;
      return () => { unregisterCount++; };
    },
    agentServer: {
      async request(request) {
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
  const start = () => { deactivate = activate(host); return deactivate; };
  if (options.start !== false) start();
  const dispose = options.mount === false || options.start === false ? null : mount();
  const document = dom.window.document;
  return {
    dom, document, host, calls, navigation, registrations, mount, dispose, start,
    deactivate: () => { const cleanup = deactivate; deactivate = null; cleanup?.(); },
    unregisterCount: () => unregisterCount,
    query: selector => document.querySelector(selector),
    all: selector => [...document.querySelectorAll(selector)],
    button: text => [...document.querySelectorAll('button')].find(node => node.textContent.includes(text)),
    change(selector, value, eventName = 'change') {
      const node = document.querySelector(selector);
      assert.ok(node, `Expected ${selector} to be rendered`);
      node.value = value;
      node.dispatchEvent(new dom.window.Event(eventName, { bubbles: true }));
    },
  };
}

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
  assert.equal(app.query('.osb-stage-qa .osb-card-foot').textContent, '3/4 roles7/8 tasks');
  assert.equal(app.query('.osb-stage-done .osb-card-foot').textContent, '4/4 roles8/8 tasks');
  assert.equal(app.query('.osb-stage-blocked .osb-blocker').textContent, '! Waiting for the design decision');
  assert.deepEqual(app.all('.osb-stage-qa .osb-role').map(node => node.getAttribute('aria-label')), [
    'SA: Complete · 2/2 tasks', 'Frontend: Complete · 2/2 tasks',
    'Backend: Complete · 2/2 tasks', 'QA: In progress · 1/2 tasks',
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
  assert.equal(app.query('.osb-checklist li small').textContent, 'tasks.md:3');
  assert.match(app.query('.osb-footer').textContent, /Read-only progress/);
  assert.equal(app.all('details.osb-role-actions').length, 4);
  assert.deepEqual(app.all('details.osb-role-actions summary').map(node => node.getAttribute('aria-label')),
    ROLE_IDS.map(role => `Run OpenSpec skill for ${role}`));
  assert.equal(app.calls.length, 1, 'Rendering role controls does not contact Automation or start a run');
  app.query('.osb-breadcrumb a').click();
  assert.deepEqual(app.navigation, [BASE]);
});

test('legacy change detail routes resolve to the same requirement', async t => {
  const app = setup(t, { path: 'changes/sample-qa' });
  await settled();
  assert.equal(app.query('.osb-breadcrumb .osb-id').textContent, 'REQ-004');
  assert.equal(app.query('.osb-detail-heading h2').textContent, 'Requirement for qa');
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
  const app = setup(t, { path: 'requirements/REQ-004' });
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
  const app = setup(t, { path: 'requirements/REQ-002', request: (request, count) => {
    if (count === 3) throw new Error('Store unavailable');
    const data = board();
    data.requirements[1].artifacts[1].content = `# Design revision ${count}\n\nKeep source exact.\n`;
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
  assert.equal(app.calls.length, 3);
});

test('empty artifacts are explained and task preview cannot change progress', async t => {
  const data = board();
  data.requirements[1].artifacts[1].content = '';
  data.requirements[1].artifacts[3].content = '# Tasks\n\n- [x] Ready\n- [ ] Pending\n';
  const app = setup(t, { path: 'requirements/REQ-002', request: () => output(data) });
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
  const app = setup(t, { path: 'requirements/REQ-002' });
  await settled();
  app.button('Source').click();
  const createElement = app.document.createElement;
  app.document.createElement = function(tag, ...args) {
    if (tag === 'h1') throw new Error('Renderer unavailable');
    return createElement.call(this, tag, ...args);
  };
  try { app.button('Preview').click(); } finally { app.document.createElement = createElement; }
  assert.match(app.query('.osb-artifact-body [role="alert"]').textContent, /could not be previewed/);
  assert.equal(app.all('.osb-role-panel').length, 4);
  app.button('View source').click();
  assert.equal(app.query('.osb-artifact-source').textContent, UNSAFE_ARTIFACT);
  assert.equal(app.document.activeElement, app.button('Source'));
  assert.equal(app.calls.length, 1);
});

test('missing source artifacts and missing role tasks remain visible as warnings', async t => {
  const data = board();
  const requirement = data.requirements[0];
  requirement.artifacts[1].status = 'missing';
  requirement.artifacts[1].content = '';
  requirement.warnings.push('Missing design artifact.');
  requirement.tasks = requirement.tasks.filter(task => task.role !== 'QA');
  requirement.total = requirement.tasks.length;
  requirement.roles[3].total = 0;
  requirement.roles[3].tasks = [];
  requirement.warnings.push('QA has no tracked tasks; add a task before this role can finish.');
  const app = setup(t, { path: 'requirements/REQ-001', request: () => output(data) });
  await settled();
  assert.match(app.query('.osb-content').textContent, /QA has no tracked tasks/);
  assert.match(app.query('.osb-pipeline').textContent, /No tasks assigned to this role/);
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
  assert.match(app.query('.osb-empty').textContent, /openspec\/requirements.json/);
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
  assert.equal(app.query('.osb-stage-done .osb-card-foot').textContent, '4/4 roles8/8 tasks');
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
  assert.deepEqual(app.navigation, [BASE]);
  assert.equal(app.calls.length, 1);
  app.dispose();
  app.mount('');
  await settled();
  assert.equal(app.calls[1].body.cwd, '/tmp/another-store');
});
