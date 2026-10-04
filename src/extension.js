import styles from './styles.css';
import { loadBoard, validateWorkspace } from './client.js';
import { mountRoleActions } from './role-actions.js';
import { mountWorkflowNavigation } from './workflow-navigation.js';
import { renderMarkdown } from './markdown.js';

import { DEFAULT_STORE, KANBAN_APP, ROLE_APPS, roleApp, storeKey } from './app-config.js';
import { appHref, parseAppPath } from './navigation.js';
const STAGES = [
  ['backlog', 'Backlog', 'Ready to shape'], ['sa', 'Solution design', 'SA'],
  ['implementation', 'Implementation', 'Frontend + Backend'], ['qa', 'Verification', 'QA'],
  ['blocked', 'Blocked', 'Needs a decision'], ['done', 'Done', 'All four roles complete'],
];
const STATES = { backlog: 'Not started', in_progress: 'In progress', blocked: 'Blocked', done: 'Complete' };
const SHORT = { SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' };
const ARTIFACTS = { proposal: 'Proposal', design: 'Design', specs: 'Specification', tasks: 'Tasks' };
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function button(text, className, handler) {
  const node = el('button', className, text);
  node.type = 'button';
  node.addEventListener('click', handler);
  return node;
}
function badge(text, kind = '') { return el('span', `osb-badge ${kind ? `osb-${kind}` : ''}`, text); }
function meter(done, total, label) {
  const node = el('div', 'osb-meter');
  node.setAttribute('role', 'progressbar');
  node.setAttribute('aria-label', label);
  node.setAttribute('aria-valuenow', String(done));
  node.setAttribute('aria-valuemax', String(total || 1));
  node.setAttribute('aria-valuemin', '0');
  const fill = el('span'); fill.style.width = `${total ? done / total * 100 : 0}%`; node.append(fill);
  return node;
}
function stageLabel(stage) { return STAGES.find(([id]) => id === stage)?.[1] || stage; }
function time(value) { return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

export function activate(host) { return activateApp(host, KANBAN_APP); }
export function activateRoleApp(host, roleId) { return activateApp(host, roleApp(roleId)); }

function activateApp(host, app) {
  const fixedRole = app.role || null;
  if (host.apiVersion !== '1') throw new Error('OpenSpec Kanban requires Canvas host API 1.');
  const key = storeKey(host.backend.id);
  const filters = { query: '', role: '', view: 'board' };
  const mounts = new Set();
  // A home draft crosses one intentional navigation only, within this app instance.
  let homeDraftHandoff = null;
  const unregister = host.registerPage(app.pageId, ({ container, path, navigate }) => {
    let workspace = DEFAULT_STORE;
    try { workspace = validateWorkspace(localStorage.getItem(key) || DEFAULT_STORE); } catch { /* Optional storage. */ }
    let route, routeError;
    try { route = parseAppPath(path || '', { allowLegacyChange: !fixedRole }); if (route.workspace) workspace = route.workspace; } catch (error) { routeError = error; }
    const pendingHandoff = homeDraftHandoff;
    homeDraftHandoff = null;
    let initialDraft = !routeError && pendingHandoff?.workspace === workspace && pendingHandoff.requirementId === route.requirementId && !route.change ? pendingHandoff.draft : null;
    const homeHref = () => appHref(app, workspace);
    const requirementHref = id => appHref(app, workspace, id);
    let inventory = null, inventoryError = false;
    let disposed = false, busy = false, generation = 0, contentGeneration = 0, snapshot = null;
    let selectedArtifact = 'proposal', artifactMode = 'preview', selectedSpec = '';
    const actionDisposers = new Set();
    function clearActions() { for (const cleanup of actionDisposers) cleanup(); actionDisposers.clear(); }
    const root = el('section', `osb-root${fixedRole ? ' osb-role-workspace' : ''}`);
    const style = el('style'); style.dataset.openspecBoard = 'true'; style.textContent = styles;
    root.append(style); container.append(root);
    const dispose = () => { disposed = true; generation++; clearActions(); root.remove(); mounts.delete(dispose); };
    mounts.add(dispose);

    function link(text, href, className) {
      const node = el('a', className, text); node.href = href;
      node.addEventListener('click', event => {
        if (disposed) { event.preventDefault(); return; }
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); navigate(href);
      });
      return node;
    }
    if (routeError) {
      root.append(el('h1', '', 'Page not found'), el('p', 'osb-muted', 'This board route is not available.'), link('← Back to work list', homeHref(), 'osb-button'));
      return dispose;
    }
    if (host.backend.kind !== 'local') {
      root.append(el('h1', '', app.displayName), el('p', 'osb-alert', 'Connect a local Agent Server to read your OpenSpec store.'));
      return dispose;
    }
    const header = el('header', 'osb-header');
    const branding = el('div', 'osb-brand');
    branding.append(el('div', 'osb-symbol', 'OS'));
    const title = el('div');
    title.append(el('p', 'osb-eyebrow', fixedRole ? `OPENSPEC / ${app.short} WORKSPACE` : 'OPENSPEC / DELIVERY WORKSPACE'), el('h1', '', app.displayName));
    branding.append(title);
    const actions = el('div', 'osb-header-actions');
    const refresh = button('↻  Refresh', 'osb-button osb-primary', () => refreshData());
    actions.append(badge('Live from files', 'live'), refresh); header.append(branding, actions);
    const subtitle = el('p', 'osb-subtitle', fixedRole ? `${app.short} changes, source artifacts and related automations.` : 'Requirements → role workspaces → verified tasks.');
    const storeForm = el('form', 'osb-store');
    const storeLabel = el('label', 'osb-store-field');
    storeLabel.append(el('span', 'osb-label', 'SPEC STORE'));
    const storeInput = el('input'); storeInput.value = workspace; storeInput.spellcheck = false;
    storeInput.setAttribute('aria-label', 'Spec store directory'); storeInput.autocomplete = 'off';
    storeLabel.append(storeInput);
    const load = el('button', 'osb-button', 'Load store'); load.type = 'submit';
    storeForm.append(storeLabel, load);
    storeForm.addEventListener('submit', event => {
      event.preventDefault(); if (disposed || busy) return;
      try {
        const nextWorkspace = validateWorkspace(storeInput.value.trim());
        homeDraftHandoff = null; initialDraft = null;
        workspace = nextWorkspace;
        try { localStorage.setItem(key, workspace); } catch { /* Optional storage. */ }
        if (route?.workspace || route?.requirementId || route?.change) { navigate(homeHref()); return; }
        snapshot = null; contentGeneration++; clearActions(); content.replaceChildren(); metrics.replaceChildren(); refreshData();
      } catch (error) { showError(error.message); }
    });
    const notice = el('div', 'osb-notice'); notice.setAttribute('role', 'status'); notice.setAttribute('aria-live', 'polite');
    const metrics = el('div', 'osb-metrics');
    const content = el('div', 'osb-content');
    const footer = el('footer', 'osb-footer');
    footer.append(el('span', '', 'Completion follows task checkboxes. All four roles must finish.'), el('span', '', fixedRole ? 'Read-only artifacts · Automations run only on explicit submit' : 'Read-only progress · Open a role workspace to inspect sources and run automations'));
    root.append(header, subtitle, storeForm, notice, metrics, content, footer);

    function showError(message) {
      notice.className = 'osb-notice osb-alert'; notice.setAttribute('role', 'alert');
      notice.textContent = `${snapshot ? 'Stale snapshot — ' : ''}${message}`;
    }
    function workflowWorkspace() {
      const layout = el('div', 'osb-workflow-layout');
      const rail = el('aside', 'osb-workflow-rail');
      const right = el('section', 'osb-workflow-workspace');
      right.setAttribute('aria-label', `${app.short} automation workspace`);
      const artifacts = el('section', 'osb-artifacts osb-workflow-artifacts');
      artifacts.setAttribute('aria-label', `${app.short} source artifacts`);
      let actions = null;
      const navigation = mountWorkflowNavigation({ container: rail, role: app.short, onSelect: stage => actions?.selectStage(stage) || false });
      actionDisposers.add(navigation.dispose);
      layout.append(rail, right);
      return { layout, right, artifacts, navigation, setActions(value) { actions = value; } };
    }
    function requirementPicker(requirement = null, beforeNavigate) {
      const pickerGeneration = contentGeneration;
      const label = el('label', 'osb-artifact-spec');
      label.append(el('span', 'osb-label', 'Requirement'));
      const select = el('select', 'osb-spec-select'); select.setAttribute('aria-label', 'Requirement');
      if (!requirement) { const placeholder = el('option', '', 'Choose a requirement…'); placeholder.value = ''; select.append(placeholder); }
      for (const item of snapshot.requirements) { const option = el('option', '', `${item.id} · ${item.title}`); option.value = item.id; select.append(option); }
      select.value = requirement?.id || '';
      select.addEventListener('change', () => {
        if (disposed || pickerGeneration !== contentGeneration || select.value === requirement?.id || !snapshot.requirements.some(item => item.id === select.value)) return;
        homeDraftHandoff = null;
        beforeNavigate?.(select.value);
        navigate(requirementHref(select.value));
      });
      label.append(select); return label;
    }
    function roleDestination(roleId, requirementId = '', change = '', label) {
      const descriptor = roleApp(roleId);
      const row = inventory?.find(item => item.name === descriptor.name);
      const pages = row?.manifest?.contributes?.pages;
      const page = Array.isArray(pages) && pages.find(page => page?.id === descriptor.pageId && page.path === descriptor.path);
      const available = row?.enabled === true && row?.manifest?.name === descriptor.name && page;
      const state = inventoryError || inventory === null ? 'availability unknown' : !row ? 'not installed' : !row.enabled ? 'disabled' : 'unavailable';
      const node = available ? link(label || `Open ${descriptor.displayName}`, appHref(descriptor, workspace, requirementId, change), 'osb-role-link')
        : el('span', 'osb-role-unavailable', `${label || descriptor.displayName} · ${state}`);
      node.dataset.roleApp = descriptor.name; node.dataset.available = String(Boolean(available)); return node;
    }
    function availabilityNotice() {
      const section = el('div', 'osb-app-availability');
      section.append(el('span', 'osb-muted', inventoryError ? 'Role app availability could not be checked. Refresh to retry.' : 'Role workspaces'), link('Manage Apps', '/apps', 'osb-run-link'));
      for (const descriptor of ROLE_APPS) section.append(roleDestination(descriptor.role));
      return section;
    }
    function drawMetrics() {
      if (fixedRole) {
        const specs = snapshot.requirements.flatMap(item => item.specs.filter(spec => spec.role === fixedRole));
        metrics.replaceChildren(el('p', 'osb-muted', `${specs.length} ${app.short} changes · ${specs.filter(spec => spec.state === 'done').length} complete · ${specs.reduce((n, spec) => n + spec.complete, 0)} / ${specs.reduce((n, spec) => n + spec.total, 0)} tasks checked`)); return;
      }
      const reqs = snapshot.requirements;
      const rolesDone = reqs.reduce((n, r) => n + r.rolesComplete, 0);
      metrics.replaceChildren();
      for (const [label, value, hint, kind] of [
        ['Requirements', String(reqs.length).padStart(2, '0'), snapshot.name, ''],
        ['In delivery', String(reqs.filter(r => !['backlog', 'done', 'blocked'].includes(r.stage)).length).padStart(2, '0'), 'Across design, build & verification', 'active'],
        ['Roles complete', `${rolesDone} / ${reqs.length * 4}`, 'SA · Frontend · Backend · QA', ''],
        ['Ready / blocked', `${reqs.filter(r => r.stage === 'done').length} / ${reqs.filter(r => r.stage === 'blocked').length}`, 'All roles done / needs attention', ''],
      ]) {
        const metric = el('div', `osb-metric ${kind}`);
        metric.append(el('span', 'osb-label', label), el('strong', '', value), el('span', 'osb-muted', hint));
        metrics.append(metric);
      }
    }
    function roleStrip(requirement) {
      const strip = el('div', 'osb-role-strip');
      for (const role of requirement.roles) {
        const pill = roleDestination(role.id, requirement.id, '', `${role.state === 'done' ? '✓ ' : role.state === 'blocked' ? '! ' : ''}${SHORT[role.id]}`);
        pill.classList.add('osb-role', `osb-${role.state}`);
        pill.title = `${role.id}: ${STATES[role.state]}${role.specs ? ` · ${role.specs.length} specs` : ''} · ${role.complete}/${role.total} tasks`;
        pill.setAttribute('aria-label', pill.title); strip.append(pill);
      }
      return strip;
    }
    function card(requirement) {
      const item = el('article', 'osb-card');
      const top = el('div', 'osb-card-top'); top.append(el('span', 'osb-id', requirement.id));
      const title = el('h3'); title.append(link(requirement.title, requirementHref(requirement.id), 'osb-card-title'));
      item.append(top, title, el('p', 'osb-card-summary', requirement.summary), roleStrip(requirement));
      const foot = el('div', 'osb-card-foot');
      foot.append(el('span', '', `${requirement.rolesComplete}/4 roles${requirement.specs ? ` · ${requirement.specs.length} specs` : ''}`), el('span', '', `${requirement.complete}/${requirement.total} tasks`));
      item.append(meter(requirement.complete, requirement.total, `${requirement.id} tasks complete`), foot);
      const blocked = requirement.roles.find(r => r.state === 'blocked');
      if (blocked) item.append(el('p', 'osb-blocker', `! ${requirement.specs?.find(spec => spec.role === blocked.id && spec.state === 'blocked')?.note || blocked.note || `${blocked.id} is blocked`}`));
      if (requirement.warnings.length) item.append(el('span', 'osb-warning', `${requirement.warnings.length} tracking warning${requirement.warnings.length === 1 ? '' : 's'}`));
      return item;
    }
    function drawBoard() {
      if (fixedRole) { drawRoleHome(); return; }
      clearActions();
      content.replaceChildren();
      const toolbar = el('div', 'osb-toolbar');
      const views = el('div', 'osb-views'); views.setAttribute('role', 'group'); views.setAttribute('aria-label', 'View');
      for (const [id, label] of [['board', '▥  Board'], ['list', '☷  List']]) {
        const control = button(label, `osb-view ${filters.view === id ? 'selected' : ''}`, () => { filters.view = id; drawBoard(); });
        control.setAttribute('aria-pressed', String(filters.view === id)); views.append(control);
      }
      const search = el('input', 'osb-search'); search.type = 'search'; search.placeholder = 'Search requirements…'; search.value = filters.query;
      search.setAttribute('aria-label', 'Search requirements');
      search.addEventListener('input', () => { filters.query = search.value; drawResults(); });
      function select(label, field, choices) {
        const node = el('select'); node.setAttribute('aria-label', label);
        for (const [value, labelText] of choices) { const option = el('option', '', labelText); option.value = value; node.append(option); }
        node.value = filters[field]; node.addEventListener('change', () => { filters[field] = node.value; drawResults(); });
        return node;
      }
      toolbar.append(views, search,
        select('Filter by unfinished role', 'role', [['', 'All roles'], ['SA', 'SA remaining'], ['Frontend', 'Frontend remaining'], ['Backend', 'Backend remaining'], ['QA', 'QA remaining']]));
      const caption = el('div', 'osb-board-caption');
      const count = el('span'); caption.append(count, el('span', '', 'SA → Frontend + Backend → QA → Done'));
      const results = el('div');
      content.append(availabilityNotice(), toolbar, caption, results);
      function drawResults() {
        const query = filters.query.trim().toLowerCase();
        const reqs = snapshot.requirements.filter(r => (!query || `${r.id} ${r.title} ${r.summary} ${(r.specs || []).map(spec => `${spec.id} ${spec.title}`).join(' ')}`.toLowerCase().includes(query)) &&
          (!filters.role || r.roles.some(role => role.id === filters.role && role.state !== 'done')));
        count.textContent = `${reqs.length} of ${snapshot.requirements.length} requirements`;
        results.replaceChildren();
        if (!reqs.length) {
          const empty = el('div', 'osb-empty');
          empty.append(el('h2', '', snapshot.requirements.length ? 'No matching requirements' : 'Your board is ready'),
            el('p', 'osb-muted', snapshot.requirements.length ? 'Try another search or clear your filters.' : 'Add a role change under openspec/changes, for example SA-REQ-001-feature, then refresh.'));
          if (snapshot.requirements.length) empty.append(button('Clear filters', 'osb-button', () => { filters.query = ''; filters.role = ''; drawBoard(); }));
          results.append(empty); return;
        }
        if (filters.view === 'list') {
          const wrap = el('div', 'osb-table-wrap'); const table = el('table', 'osb-table');
          const head = el('thead'); const tr = el('tr');
          for (const label of ['Requirement', 'Stage', 'Role progress', 'Tasks']) tr.append(el('th', '', label));
          head.append(tr); table.append(head); const body = el('tbody');
          for (const r of reqs) {
            const row = el('tr'); const name = el('td');
            name.append(el('span', 'osb-id', r.id), link(r.title, requirementHref(r.id), 'osb-list-title'));
            const stage = el('td'); stage.append(badge(stageLabel(r.stage), r.stage));
            const roles = el('td'); roles.append(roleStrip(r));
            row.append(name, stage, roles, el('td', '', `${r.complete} / ${r.total}`)); body.append(row);
          }
          table.append(body); wrap.append(table); results.append(wrap); return;
        }
        const board = el('div', 'osb-board'); board.setAttribute('aria-label', 'Requirement Kanban'); board.tabIndex = 0;
        for (const [id, label, hint] of STAGES) {
          const lane = el('section', `osb-lane osb-stage-${id}`); lane.setAttribute('aria-label', `${label} lane`);
          const items = reqs.filter(r => r.stage === id); const head = el('div', 'osb-lane-head');
          const laneTitle = el('div', 'osb-lane-title'); laneTitle.append(el('span', 'osb-dot'), el('h2', '', label), el('span', 'osb-count', String(items.length)));
          head.append(laneTitle, el('p', '', hint)); lane.append(head);
          for (const item of items) lane.append(card(item));
          if (!items.length) lane.append(el('div', 'osb-lane-empty', 'No requirements'));
          board.append(lane);
        }
        results.append(board);
      }
      drawResults();
    }
    function drawRoleHome() {
      clearActions(); content.replaceChildren();
      const heading = el('div', 'osb-role-home-heading');
      heading.append(el('h2', '', 'Choose an automation'), link('Open shared Kanban', appHref(KANBAN_APP, workspace), 'osb-button'));
      const flow = workflowWorkspace();
      const targets = el('div', 'osb-workflow-targets');
      let disposeAction;
      targets.append(requirementPicker(null, requirementId => {
        homeDraftHandoff = { workspace, requirementId, draft: disposeAction.getDraft() };
      }));
      const emptySpec = el('p', 'osb-muted', 'Role spec becomes available after choosing a requirement.');
      targets.append(emptySpec);
      const actions = el('div', 'osb-artifact-actions');
      actions.setAttribute('role', 'group'); actions.setAttribute('aria-label', 'Selected spec automation');
      const source = el('div', 'osb-artifact-heading'); source.append(el('h3', '', 'Source artifacts'));
      flow.right.append(targets, actions);
      flow.artifacts.append(source, el('p', 'osb-artifact-message', 'Choose a requirement and role spec to view its artifacts.'));
      content.append(heading, flow.layout, flow.artifacts);
      disposeAction = mountRoleActions({ host, container: actions, navigate, workspace, requirement: null, role: { id: fixedRole }, specId: null,
        externalSelection: true, onStageChange: (stage, state) => flow.navigation.setState(stage, state) });
      flow.setActions(disposeAction); actionDisposers.add(disposeAction);
      const work = el('details', 'osb-supporting-work'); work.append(el('summary', '', `${app.short} work · ${snapshot.requirements.length} requirements`));
      const search = el('input', 'osb-search'); search.type = 'search'; search.placeholder = 'Search requirements…'; search.value = filters.query; search.setAttribute('aria-label', 'Search requirements');
      const results = el('div', 'osb-role-work-list'); work.append(search, results); content.append(work);
      function render() {
        filters.query = search.value; const query = filters.query.trim().toLowerCase(); results.replaceChildren();
        const reqs = snapshot.requirements.filter(req => `${req.id} ${req.title} ${req.specs.filter(spec => spec.role === fixedRole).map(spec => `${spec.id} ${spec.title}`).join(' ')}`.toLowerCase().includes(query));
        for (const req of reqs) {
          const role = req.roles.find(role => role.id === fixedRole), specs = req.specs.filter(spec => spec.role === fixedRole);
          const row = el('section', 'osb-role-work-item'); const title = el('h3'); title.append(link(`${req.id} · ${req.title}`, requirementHref(req.id), ''));
          row.append(title, badge(STATES[role.state], role.state), el('p', 'osb-muted', `${role.complete} / ${role.total} tasks · ${specs.length} changes`));
          for (const spec of specs) row.append(link(`${spec.id} · ${spec.title}`, appHref(app, workspace, req.id, spec.id), 'osb-spec-link'));
          if (!specs.length) row.append(el('p', 'osb-muted', `No ${app.short} changes yet. Open this requirement to propose one.`));
          results.append(row);
        }
        if (!reqs.length) results.append(el('p', 'osb-empty', snapshot.requirements.length ? 'No matching requirements.' : 'No requirements yet. Add a canonical role change to the store, then refresh.'));
      }
      search.addEventListener('input', render); render();
    }
    function targetError(message) {
      initialDraft = null;
      clearActions(); content.replaceChildren(el('h2', '', 'Change unavailable'), el('p', 'osb-alert', message), link('← Back to work list', homeHref(), 'osb-button'));
    }
    function drawDetail(requirement) {
      const detailGeneration = contentGeneration;
      const currentDetail = () => !disposed && contentGeneration === detailGeneration;
      clearActions();
      content.replaceChildren();
      const crumb = el('div', 'osb-breadcrumb'); crumb.append(link('← All requirements', homeHref(), ''), el('span', '', '/'), el('span', 'osb-id', requirement.id));
      const heading = el('div', 'osb-detail-heading');
      const title = el('div'); title.append(el('h2', '', requirement.title), el('p', 'osb-muted', requirement.summary));
      const badges = el('div', 'osb-header-actions'); badges.append(badge(stageLabel(requirement.stage), requirement.stage));
      if (fixedRole) badges.append(link('Back to Kanban', appHref(KANBAN_APP, workspace, requirement.id), 'osb-button'));
      heading.append(title, badges); content.append(crumb, heading);
      const summary = el('div', 'osb-completion');
      summary.append(el('strong', '', `${requirement.rolesComplete} of 4 roles complete`), meter(requirement.complete, requirement.total, 'Requirement task progress'), el('span', 'osb-muted', `${requirement.complete} of ${requirement.total} tasks checked`));
      const supportingWork = fixedRole ? el('details', 'osb-supporting-work') : content;
      if (fixedRole) supportingWork.append(el('summary', '', `${app.short} progress and tasks`));
      supportingWork.append(summary);
      if (requirement.warnings.length) { const warnings = el('div', 'osb-alert'); for (const warning of requirement.warnings) warnings.append(el('p', '', warning)); content.append(warnings); }
      const specs = requirement.specs.filter(spec => !fixedRole || spec.role === fixedRole);
      if (fixedRole && route.change && !selectedSpec) selectedSpec = route.change;
      if (fixedRole && selectedSpec && !selectedSpec.startsWith('new:') && !specs.some(spec => spec.id === selectedSpec)) { targetError('The selected change is missing or does not belong to this requirement and role. Return to the work list and choose a current target.'); return; }
      const emptyRoles = requirement.specs ? requirement.roles.filter(role => (!fixedRole || role.id === fixedRole) && !role.specs.length) : [];
      const targets = [
        ...specs.map(spec => ({ value: spec.id, label: `${spec.id} · ${spec.title}`, role: spec.role, specId: spec.id })),
        ...emptyRoles.map(role => ({ value: `new:${role.id}`, label: `${role.id} · New spec`, role: role.id, specId: '' })),
      ];
      if (!targets.some(target => target.value === selectedSpec)) selectedSpec = targets[0]?.value || '';
      function taskList(tasks, emptyMessage = 'No tracked tasks.') {
        const list = el('ul', 'osb-checklist');
        for (const task of tasks) {
          const item = el('li', task.done ? 'completed' : '');
          const mark = el('span', 'osb-check', task.done ? '✓' : '○'); mark.setAttribute('aria-label', task.done ? 'Complete' : 'Remaining');
          const text = el('div'); text.append(el('span', '', task.description), el('small', '', `${task.specId ? `${task.specId}/tasks.md` : 'tasks.md'}:${task.line}`));
          item.append(mark, text); list.append(item);
        }
        if (!tasks.length) list.append(el('li', 'osb-warning', emptyMessage));
        return list;
      }
      const pipeline = el('div', 'osb-pipeline');
      const flow = fixedRole ? workflowWorkspace() : null;
      const artifactActions = el('div', 'osb-artifact-actions');
      artifactActions.setAttribute('role', 'group'); artifactActions.setAttribute('aria-label', 'Selected spec automation');
      let actionTarget = null, disposeAction = null;
      function drawActions() {
        if (!currentDetail()) return;
        if (actionTarget === selectedSpec) return;
        if (disposeAction) { disposeAction(); actionDisposers.delete(disposeAction); disposeAction = null; }
        artifactActions.replaceChildren(); actionTarget = selectedSpec;
        const target = targets.find(item => item.value === selectedSpec);
        if (!target) { initialDraft = null; artifactActions.append(el('p', 'osb-muted', 'Migrate this store to role specs to run an automation.')); return; }
        const role = requirement.roles.find(item => item.id === target.role);
        const draft = initialDraft; initialDraft = null;
        disposeAction = mountRoleActions({ host, container: artifactActions, navigate, workspace, requirement, role, specId: target.specId,
          initialStage: draft?.stage, initialDraft: draft, externalSelection: true,
          onStageChange: (stage, state) => flow.navigation.setState(stage, state),
        });
        flow.setActions(disposeAction); actionDisposers.add(disposeAction);
      }
      for (const role of requirement.roles.filter(role => !fixedRole || role.id === fixedRole)) {
        const panel = el('section', `osb-role-panel osb-${role.state}`);
        const top = el('div', 'osb-role-panel-top'); top.append(el('span', 'osb-role-avatar', SHORT[role.id]), badge(STATES[role.state], role.state));
        panel.append(top, el('h3', '', role.id === 'SA' ? 'SA · Solution Architect' : role.id), el('p', 'osb-owner', role.owner), meter(role.complete, role.total, `${role.id} task progress`), el('p', 'osb-task-count', `${role.complete} / ${role.total} tasks`));
        if (role.note) panel.append(el('p', 'osb-role-note', role.note));
        if (requirement.specs) {
          const ownSpecs = specs.filter(spec => spec.role === role.id);
          panel.append(el('p', 'osb-spec-count', `${ownSpecs.filter(spec => spec.state === 'done').length} / ${ownSpecs.length} specs complete`));
          for (const spec of ownSpecs) {
            const group = el('section', 'osb-role-spec'); group.setAttribute('aria-label', spec.id);
            const open = !fixedRole ? roleDestination(role.id, requirement.id, spec.id, spec.id) : button(spec.id, 'osb-spec-link', () => {
              if (!currentDetail()) return;
              selectedSpec = spec.id; specSelect.value = selectedSpec; selectedArtifact = 'specs'; drawArtifact(); drawActions();
              artifactSection.scrollIntoView?.({ behavior: 'smooth', block: 'start' }); specSelect.focus({ preventScroll: true });
            });
            group.append(open, el('h4', '', spec.title), badge(STATES[spec.state], spec.state),
              el('span', 'osb-spec-progress', `${spec.complete} / ${spec.total} tasks`));
            if (spec.note) group.append(el('p', 'osb-role-note', spec.note));
            group.append(taskList(spec.tasks)); panel.append(group);
          }
          if (!ownSpecs.length) panel.append(el('p', 'osb-warning', 'No specs yet. Propose a feature for this role.'));
        } else panel.append(taskList(role.tasks, 'No tasks assigned to this role.'));
        if (!fixedRole) panel.append(roleDestination(role.id, requirement.id));
        pipeline.append(panel);
      }
      supportingWork.append(pipeline);
      if (!fixedRole) { content.append(availabilityNotice()); return; }
      const artifactSection = flow.artifacts;
      const artifactHeader = el('div', 'osb-artifact-heading'); const changePath = el('code'); artifactHeader.append(el('h3', '', 'Source artifacts'), changePath);
      const targetSelectors = el('div', 'osb-workflow-targets'); targetSelectors.append(requirementPicker(requirement));
      const specSelect = el('select', 'osb-spec-select'); specSelect.setAttribute('aria-label', 'Artifact spec');
      for (const target of targets) { const option = el('option', '', target.label); option.value = target.value; specSelect.append(option); }
      specSelect.value = selectedSpec;
      specSelect.addEventListener('change', () => {
        if (!currentDetail()) return;
        selectedSpec = specSelect.value;
        if (!['specs', 'tasks'].includes(selectedArtifact)) selectedArtifact = 'specs';
        drawArtifact(); drawActions();
      });
      if (targets.length) {
        const specLabel = el('label', 'osb-artifact-spec'); specLabel.append(el('span', 'osb-label', 'Role spec'), specSelect); targetSelectors.append(specLabel);
      }
      const tabs = el('div', 'osb-artifact-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Source artifact');
      const toolbar = el('div', 'osb-artifact-toolbar');
      const modes = el('div', 'osb-views osb-artifact-modes'); modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', 'Artifact display');
      const body = el('div', 'osb-artifact-body');
      const modeButtons = new Map();
      for (const [mode, label] of [['preview', 'Preview'], ['source', 'Source']]) {
        const control = button(label, 'osb-view', () => { if (!currentDetail()) return; artifactMode = mode; drawArtifact(); });
        modeButtons.set(mode, control); modes.append(control);
      }
      const artifactButtons = new Map();
      const artifacts = () => specs.find(spec => spec.id === selectedSpec)?.artifacts || [];
      const artifactIds = new Set(specs.flatMap(spec => spec.artifacts).map(artifact => artifact.id));
      for (const id of artifactIds) {
        const control = button(ARTIFACTS[id], '', () => { if (!currentDetail()) return; selectedArtifact = id; drawArtifact(); });
        artifactButtons.set(id, control); tabs.append(control);
      }
      function drawArtifact() {
        if (!currentDetail()) return;
        changePath.textContent = specs.find(spec => spec.id === selectedSpec)?.change ? `openspec/changes/${selectedSpec}` : 'Choose an existing role change to preview artifacts';
        const available = artifacts();
        const artifact = available.find(a => a.id === selectedArtifact) || available[0];
        body.replaceChildren();
        for (const [id, control] of artifactButtons) {
          const item = available.find(a => a.id === id);
          control.hidden = !item;
          control.textContent = `${ARTIFACTS[id]}${item?.status === 'missing' ? ' · missing' : ''}`;
          control.classList.toggle('selected', id === artifact?.id);
          control.setAttribute('aria-pressed', String(id === artifact?.id));
        }
        for (const [mode, control] of modeButtons) {
          control.classList.toggle('selected', artifactMode === mode);
          control.setAttribute('aria-pressed', String(artifactMode === mode));
        }
        if (!artifact) { body.append(el('p', 'osb-artifact-message', 'No artifacts are available.')); return; }
        body.append(el('div', 'osb-artifact-path', artifact.path));
        if (artifact.status === 'missing') { body.append(el('p', 'osb-artifact-message', 'This artifact has not been created yet.')); return; }
        if (!artifact.content.trim()) body.append(el('p', 'osb-artifact-message', 'This artifact is empty.'));
        if (artifactMode === 'source') { body.append(el('pre', 'osb-artifact-source', artifact.content)); return; }
        if (!artifact.content.trim()) return;
        const preview = el('div', 'osb-markdown');
        preview.setAttribute('role', 'region'); preview.setAttribute('aria-label', `${ARTIFACTS[artifact.id]} preview`); preview.tabIndex = 0;
        try {
          preview.append(renderMarkdown(artifact.content)); body.append(preview);
        } catch {
          const fallback = el('div', 'osb-artifact-message');
          const message = el('p', '', 'This Markdown could not be previewed. You can still read its source.'); message.setAttribute('role', 'alert');
          fallback.append(message, button('View source', 'osb-button', () => { if (!currentDetail()) return; artifactMode = 'source'; drawArtifact(); modeButtons.get('source').focus(); }));
          body.append(fallback);
        }
      }
      toolbar.append(tabs, modes);
      flow.right.append(targetSelectors, artifactActions);
      artifactSection.append(artifactHeader, toolbar, body);
      content.append(flow.layout, artifactSection, supportingWork); drawArtifact(); drawActions();
    }
    function drawSnapshot() {
      contentGeneration++;
      if (route.requirementId || route.change) {
        const requirement = snapshot.requirements.find(r => route.requirementId ? r.id === route.requirementId : r.specs.some(spec => spec.change === route.change));
        if (requirement) {
          if (route.change && !selectedSpec && !requirement.specs.some(spec => spec.id === route.change && (!fixedRole || spec.role === fixedRole))) { targetError('The linked change is missing or belongs to another requirement or role.'); return; }
          if (route.change && !selectedSpec) selectedSpec = route.change;
          drawDetail(requirement);
        } else { initialDraft = null; clearActions(); content.replaceChildren(el('h2', '', 'Requirement not found'), el('p', 'osb-muted', 'This requirement is not in the selected store.'), link('← Back to work list', homeHref(), 'osb-button')); }
      } else drawBoard();
    }
    async function refreshData() {
      if (busy || disposed) return;
      busy = true; const current = ++generation;
      refresh.disabled = load.disabled = storeInput.disabled = true; refresh.textContent = 'Refreshing…'; root.setAttribute('aria-busy', 'true');
      notice.className = 'osb-notice'; notice.setAttribute('role', 'status'); notice.textContent = 'Reading requirements and role checklists…';
      if (!snapshot) content.replaceChildren(el('div', 'osb-loading', `Loading ${app.displayName}…`));
      if (!fixedRole) {
        inventory = null; inventoryError = false;
        Promise.resolve().then(() => host.agentServer.request({ method: 'GET', path: '/api/canvas-extensions/installed' })).then(value => {
          if (disposed || current !== generation) return;
          const entries = value?.canvas_extensions;
          if (!Array.isArray(entries) || entries.length > 200 || entries.some(row => !row || typeof row.name !== 'string' || row.name.length > 100 || (row.enabled !== undefined && typeof row.enabled !== 'boolean')) || new Set(entries.map(row => row.name)).size !== entries.length) throw new Error('Invalid app inventory.');
          inventory = entries;
        }).catch(() => {
          if (!disposed && current === generation) { inventory = null; inventoryError = true; }
        }).finally(() => {
          if (!disposed && current === generation && snapshot && !busy) drawSnapshot();
        });
      }
      try {
        const data = await loadBoard(host, workspace);
        if (disposed || current !== generation) return;
        snapshot = data; drawMetrics();
        notice.textContent = `${data.description} · Refreshed ${time(data.generatedAt)}`;
        drawSnapshot();
      } catch (error) {
        if (disposed || current !== generation) return;
        showError(error.message);
        if (!snapshot) content.replaceChildren(el('div', 'osb-empty', 'Check the store directory and Agent Server connection, then refresh.'));
      } finally {
        if (!disposed && current === generation) { busy = false; refresh.disabled = load.disabled = storeInput.disabled = false; refresh.textContent = '↻  Refresh'; root.setAttribute('aria-busy', 'false'); }
      }
    }
    refreshData();
    return dispose;
  });
  return () => { for (const dispose of [...mounts]) dispose(); unregister(); };
}
