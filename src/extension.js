import styles from './styles.css';
import { loadBoard, validateWorkspace } from './client.js';
import { mountRoleActions } from './role-actions.js';
import { renderMarkdown } from './markdown.js';

const DEFAULT_STORE = '/Users/oka/Desktop/openspec-store';
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

export function activate(host) {
  if (host.apiVersion !== '1') throw new Error('OpenSpec Kanban requires Canvas host API 1.');
  const base = `/extensions/${encodeURIComponent(host.extension.name)}/progress`;
  const key = `openhands.apps.openspec-progress:v3:${host.backend.id}:store`;
  let workspace = DEFAULT_STORE;
  try { workspace = validateWorkspace(localStorage.getItem(key) || DEFAULT_STORE); } catch { /* Optional storage. */ }
  const filters = { query: '', role: '', view: 'board' };
  const mounts = new Set();
  const unregister = host.registerPage('progress', ({ container, path, navigate }) => {
    let disposed = false, busy = false, generation = 0, snapshot = null;
    let selectedArtifact = 'proposal', artifactMode = 'preview', selectedSpec = '';
    const actionDisposers = new Set();
    function clearActions() { for (const cleanup of actionDisposers) cleanup(); actionDisposers.clear(); }
    const root = el('section', 'osb-root');
    const style = el('style'); style.dataset.openspecBoard = 'true'; style.textContent = styles;
    root.append(style); container.append(root);
    const dispose = () => { disposed = true; generation++; clearActions(); root.remove(); mounts.delete(dispose); };
    mounts.add(dispose);
    const route = path ? /^(requirements|changes)\/([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)$/.exec(path) : null;
    function link(text, href, className) {
      const node = el('a', className, text); node.href = href;
      node.addEventListener('click', event => {
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); navigate(href);
      });
      return node;
    }
    if (path && !route) {
      root.append(el('h1', '', 'Page not found'), el('p', 'osb-muted', 'This board route is not available.'), link('← Back to board', base, 'osb-button'));
      return dispose;
    }
    if (host.backend.kind !== 'local') {
      root.append(el('h1', '', 'OpenSpec Kanban'), el('p', 'osb-alert', 'Connect a local Agent Server to read your OpenSpec store.'));
      return dispose;
    }
    const header = el('header', 'osb-header');
    const branding = el('div', 'osb-brand');
    branding.append(el('div', 'osb-symbol', 'OS'));
    const title = el('div');
    title.append(el('p', 'osb-eyebrow', 'OPENSPEC / DELIVERY WORKSPACE'), el('h1', '', 'OpenSpec Kanban'));
    branding.append(title);
    const actions = el('div', 'osb-header-actions');
    const refresh = button('↻  Refresh', 'osb-button osb-primary', () => refreshData());
    actions.append(badge('Live from files', 'live'), refresh); header.append(branding, actions);
    const subtitle = el('p', 'osb-subtitle', 'Requirements → role specs → verified tasks.');
    const storeForm = el('form', 'osb-store');
    const storeLabel = el('label', 'osb-store-field');
    storeLabel.append(el('span', 'osb-label', 'SPEC STORE'));
    const storeInput = el('input'); storeInput.value = workspace; storeInput.spellcheck = false;
    storeInput.setAttribute('aria-label', 'Spec store directory'); storeInput.autocomplete = 'off';
    storeLabel.append(storeInput);
    const load = el('button', 'osb-button', 'Load store'); load.type = 'submit';
    storeForm.append(storeLabel, load);
    storeForm.addEventListener('submit', event => {
      event.preventDefault(); if (busy) return;
      try {
        const nextWorkspace = validateWorkspace(storeInput.value.trim());
        workspace = nextWorkspace;
        try { localStorage.setItem(key, workspace); } catch { /* Optional storage. */ }
        if (path) { navigate(base); return; }
        snapshot = null; clearActions(); content.replaceChildren(); metrics.replaceChildren(); refreshData();
      } catch (error) { showError(error.message); }
    });
    const notice = el('div', 'osb-notice'); notice.setAttribute('role', 'status'); notice.setAttribute('aria-live', 'polite');
    const metrics = el('div', 'osb-metrics');
    const content = el('div', 'osb-content');
    const footer = el('footer', 'osb-footer');
    footer.append(el('span', '', 'Completion follows task checkboxes. All four roles must finish.'), el('span', '', 'Read-only progress · Run role skills from requirement details'));
    root.append(header, subtitle, storeForm, notice, metrics, content, footer);

    function showError(message) {
      notice.className = 'osb-notice osb-alert'; notice.setAttribute('role', 'alert');
      notice.textContent = `${snapshot ? 'Stale snapshot — ' : ''}${message}`;
    }
    function drawMetrics() {
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
        const pill = el('span', `osb-role osb-${role.state}`, `${role.state === 'done' ? '✓ ' : role.state === 'blocked' ? '! ' : ''}${SHORT[role.id]}`);
        pill.title = `${role.id}: ${STATES[role.state]}${role.specs ? ` · ${role.specs.length} specs` : ''} · ${role.complete}/${role.total} tasks`;
        pill.setAttribute('aria-label', pill.title); strip.append(pill);
      }
      return strip;
    }
    function card(requirement) {
      const item = link('', `${base}/requirements/${encodeURIComponent(requirement.id)}`, 'osb-card');
      const top = el('div', 'osb-card-top'); top.append(el('span', 'osb-id', requirement.id));
      item.append(top, el('h3', '', requirement.title), el('p', 'osb-card-summary', requirement.summary), roleStrip(requirement));
      const foot = el('div', 'osb-card-foot');
      foot.append(el('span', '', `${requirement.rolesComplete}/4 roles${requirement.specs ? ` · ${requirement.specs.length} specs` : ''}`), el('span', '', `${requirement.complete}/${requirement.total} tasks`));
      item.append(meter(requirement.complete, requirement.total, `${requirement.id} tasks complete`), foot);
      const blocked = requirement.roles.find(r => r.state === 'blocked');
      if (blocked) item.append(el('p', 'osb-blocker', `! ${requirement.specs?.find(spec => spec.role === blocked.id && spec.state === 'blocked')?.note || blocked.note || `${blocked.id} is blocked`}`));
      if (requirement.warnings.length) item.append(el('span', 'osb-warning', `${requirement.warnings.length} tracking warning${requirement.warnings.length === 1 ? '' : 's'}`));
      return item;
    }
    function drawBoard() {
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
      content.append(toolbar, caption, results);
      function drawResults() {
        const query = filters.query.trim().toLowerCase();
        const reqs = snapshot.requirements.filter(r => (!query || `${r.id} ${r.title} ${r.summary} ${r.change} ${(r.specs || []).map(spec => `${spec.id} ${spec.title}`).join(' ')}`.toLowerCase().includes(query)) &&
          (!filters.role || r.roles.some(role => role.id === filters.role && role.state !== 'done')));
        count.textContent = `${reqs.length} of ${snapshot.requirements.length} requirements`;
        results.replaceChildren();
        if (!reqs.length) {
          const empty = el('div', 'osb-empty');
          empty.append(el('h2', '', snapshot.requirements.length ? 'No matching requirements' : 'Your board is ready'),
            el('p', 'osb-muted', snapshot.requirements.length ? 'Try another search or clear your filters.' : 'Add requirements to openspec/requirements.json, then refresh.'));
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
            name.append(el('span', 'osb-id', r.id), link(r.title, `${base}/requirements/${encodeURIComponent(r.id)}`, 'osb-list-title'));
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
    function drawDetail(requirement) {
      clearActions();
      content.replaceChildren();
      const crumb = el('div', 'osb-breadcrumb'); crumb.append(link('← All requirements', base, ''), el('span', '', '/'), el('span', 'osb-id', requirement.id));
      const heading = el('div', 'osb-detail-heading');
      const title = el('div'); title.append(el('h2', '', requirement.title), el('p', 'osb-muted', requirement.summary));
      const badges = el('div', 'osb-header-actions'); badges.append(badge(stageLabel(requirement.stage), requirement.stage));
      heading.append(title, badges); content.append(crumb, heading);
      const summary = el('div', 'osb-completion');
      summary.append(el('strong', '', `${requirement.rolesComplete} of 4 roles complete`), meter(requirement.complete, requirement.total, 'Requirement task progress'), el('span', 'osb-muted', `${requirement.complete} of ${requirement.total} tasks checked`));
      content.append(summary);
      if (requirement.warnings.length) { const warnings = el('div', 'osb-alert'); for (const warning of requirement.warnings) warnings.append(el('p', '', warning)); content.append(warnings); }
      const specs = requirement.specs || [];
      if (!specs.some(spec => spec.id === selectedSpec)) selectedSpec = specs[0]?.id || '';
      function taskList(tasks, emptyMessage = 'No tracked tasks.') {
        const list = el('ul', 'osb-checklist');
        for (const task of tasks) {
          const item = el('li', task.done ? 'completed' : '');
          const mark = el('span', 'osb-check', task.done ? '✓' : '○'); mark.setAttribute('aria-label', task.done ? 'Complete' : 'Remaining');
          const text = el('div'); text.append(el('span', '', task.description), el('small', '', `${task.specId ? `${task.specId}.md` : 'tasks.md'}:${task.line}`));
          item.append(mark, text); list.append(item);
        }
        if (!tasks.length) list.append(el('li', 'osb-warning', emptyMessage));
        return list;
      }
      const pipeline = el('div', 'osb-pipeline');
      for (const role of requirement.roles) {
        const panel = el('section', `osb-role-panel osb-${role.state}`);
        const top = el('div', 'osb-role-panel-top'); top.append(el('span', 'osb-role-avatar', SHORT[role.id]), badge(STATES[role.state], role.state));
        panel.append(top, el('h3', '', role.id === 'SA' ? 'SA · Solution Architect' : role.id), el('p', 'osb-owner', role.owner), meter(role.complete, role.total, `${role.id} task progress`), el('p', 'osb-task-count', `${role.complete} / ${role.total} tasks`));
        if (role.note) panel.append(el('p', 'osb-role-note', role.note));
        if (requirement.specs) {
          const ownSpecs = specs.filter(spec => spec.role === role.id);
          panel.append(el('p', 'osb-spec-count', `${ownSpecs.filter(spec => spec.state === 'done').length} / ${ownSpecs.length} specs complete`));
          for (const spec of ownSpecs) {
            const group = el('section', 'osb-role-spec'); group.setAttribute('aria-label', spec.id);
            const open = button(spec.id, 'osb-spec-link', () => {
              selectedSpec = spec.id; specSelect.value = selectedSpec; selectedArtifact = 'specs'; drawArtifact();
              artifactSection.scrollIntoView?.({ behavior: 'smooth', block: 'start' }); specSelect.focus({ preventScroll: true });
            });
            group.append(open, el('h4', '', spec.title), badge(STATES[spec.state], spec.state),
              el('span', 'osb-spec-progress', `${spec.complete} / ${spec.total} tasks`));
            if (spec.note) group.append(el('p', 'osb-role-note', spec.note));
            group.append(taskList(spec.tasks)); panel.append(group);
          }
          if (!ownSpecs.length) panel.append(el('p', 'osb-warning', 'No specs yet. Propose a feature for this role.'));
        } else panel.append(taskList(role.tasks, 'No tasks assigned to this role.'));
        actionDisposers.add(mountRoleActions({ host, container: panel, navigate, workspace, requirement, role }));
        pipeline.append(panel);
      }
      content.append(pipeline);
      const unassigned = requirement.tasks.filter(t => !t.role);
      if (unassigned.length) { const other = el('section', 'osb-unassigned'); other.append(el('h3', '', 'Unassigned tasks')); for (const task of unassigned) other.append(el('p', '', `${task.done ? '✓' : '○'} ${task.description}`)); content.append(other); }
      const artifactSection = el('section', 'osb-artifacts');
      const artifactHeader = el('div', 'osb-artifact-heading'); artifactHeader.append(el('h3', '', 'Source artifacts'), el('code', '', `openspec/changes/${requirement.change}`));
      const specSelect = el('select', 'osb-spec-select'); specSelect.setAttribute('aria-label', 'Artifact spec');
      for (const spec of specs) { const option = el('option', '', `${spec.id} · ${spec.title}`); option.value = spec.id; specSelect.append(option); }
      specSelect.value = selectedSpec;
      specSelect.addEventListener('change', () => {
        selectedSpec = specSelect.value;
        if (!['specs', 'tasks'].includes(selectedArtifact)) selectedArtifact = 'specs';
        drawArtifact();
      });
      if (specs.length) {
        const specLabel = el('label', 'osb-artifact-spec'); specLabel.append(el('span', 'osb-label', 'Role spec'), specSelect); artifactHeader.append(specLabel);
      }
      const tabs = el('div', 'osb-artifact-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Source artifact');
      const toolbar = el('div', 'osb-artifact-toolbar');
      const modes = el('div', 'osb-views osb-artifact-modes'); modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', 'Artifact display');
      const body = el('div', 'osb-artifact-body');
      const modeButtons = new Map();
      for (const [mode, label] of [['preview', 'Preview'], ['source', 'Source']]) {
        const control = button(label, 'osb-view', () => { artifactMode = mode; drawArtifact(); });
        modeButtons.set(mode, control); modes.append(control);
      }
      const artifactButtons = new Map();
      const artifacts = () => [...requirement.artifacts, ...(specs.find(spec => spec.id === selectedSpec)?.artifacts || [])];
      for (const id of artifacts().map(artifact => artifact.id)) {
        const control = button(ARTIFACTS[id], '', () => { selectedArtifact = id; drawArtifact(); });
        artifactButtons.set(id, control); tabs.append(control);
      }
      function drawArtifact() {
        const available = artifacts();
        const artifact = available.find(a => a.id === selectedArtifact) || available[0];
        body.replaceChildren();
        for (const [id, control] of artifactButtons) {
          control.textContent = `${ARTIFACTS[id]}${available.find(a => a.id === id)?.status === 'missing' ? ' · missing' : ''}`;
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
          fallback.append(message, button('View source', 'osb-button', () => { artifactMode = 'source'; drawArtifact(); modeButtons.get('source').focus(); }));
          body.append(fallback);
        }
      }
      toolbar.append(tabs, modes);
      artifactSection.append(artifactHeader, toolbar, body); content.append(artifactSection); drawArtifact();
    }
    async function refreshData() {
      if (busy || disposed) return;
      busy = true; const current = ++generation;
      refresh.disabled = load.disabled = storeInput.disabled = true; refresh.textContent = 'Refreshing…'; root.setAttribute('aria-busy', 'true');
      notice.className = 'osb-notice'; notice.setAttribute('role', 'status'); notice.textContent = 'Reading requirements and role checklists…';
      if (!snapshot) content.replaceChildren(el('div', 'osb-loading', 'Loading OpenSpec Kanban…'));
      try {
        const data = await loadBoard(host, workspace);
        if (disposed || current !== generation) return;
        snapshot = data; drawMetrics();
        notice.textContent = `${data.description} · Refreshed ${time(data.generatedAt)}`;
        if (route) {
          const requirement = data.requirements.find(r => route[1] === 'requirements' ? r.id === route[2] : r.change === route[2]);
          if (requirement) drawDetail(requirement);
          else { clearActions(); content.replaceChildren(el('h2', '', 'Requirement not found'), el('p', 'osb-muted', 'This requirement is not in the selected store.'), link('← Back to board', base, 'osb-button')); }
        } else drawBoard();
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
