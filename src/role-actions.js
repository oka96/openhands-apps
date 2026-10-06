import { callRoleAutomation, validateRoleInput } from './automation.js';
import { ACTIONS } from './workflow-actions.js';
import { mountRoleConversation } from './role-conversation.js';
import { mountRoleEvidence } from './role-evidence.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FINISHED_STATES = new Set(['COMPLETED', 'FAILED', 'CANCELLED', 'SKIPPED']);
const SKILLS = Object.fromEntries(ACTIONS.map(action => [action.id, action.label]));
const SKILL_NAMES = Object.fromEntries(ACTIONS.map(action => [action.id, action.kind === 'agent' ? action.skill : 'Deterministic automation']));
const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const SHARED_SETUP_HELP = 'Connect the 12 role automations: Propose, Update and Apply for SA, Frontend, Backend and QA. Setup starts no agent.';
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function button(text, action) {
  const node = el('button', 'osb-button', text); node.type = 'button';
  node.addEventListener('click', action); return node;
}

function requireRole(role) {
  if (!ROLES.includes(role)) throw new Error('Choose a supported fixed OpenSpec role.');
}

function navigationLink(text, href, navigate) {
  const node = el('a', 'osb-run-link', text); node.href = href;
  node.addEventListener('click', event => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate(href);
  });
  return node;
}

export function mountRoleAutomationCatalog({ host, container, navigate, role, showConnection = true }) {
  requireRole(role);
  let disposed = false, busy = false, connection = null, failed = false;
  const panel = el('section', 'osb-automation-catalog');
  panel.setAttribute('aria-label', `${role} related automations`);
  panel.append(el('h2', '', 'Related automations'),
    el('p', 'osb-muted', `These three native automations belong to ${role}. Open their history here; submit an automation from a requirement’s role workspace.`));
  const status = el('p', 'osb-automation-connection'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  const list = el('ul', 'osb-automation-list');
  const setup = button('Connect shared automations', () => connect('setup'));
  const probe = button('Check connection', () => connect('probe'));
  const controls = el('div', 'osb-run-controls'); controls.append(setup, probe);
  const setupHelp = el('p', 'osb-muted', SHARED_SETUP_HELP);
  panel.append(list, status, setupHelp);
  if (showConnection) panel.append(controls);
  container.append(panel);

  function render() {
    list.replaceChildren();
    for (const [stage, label] of Object.entries(SKILLS)) {
      const row = el('li', 'osb-automation-item'); row.dataset.stage = stage;
      row.append(el('h3', '', label), el('p', 'osb-muted', SKILL_NAMES[stage]));
      const definition = connection?.automations.find(item => item.role === role && item.stage === stage);
      if (definition) {
        row.append(el('p', 'osb-automation-name', definition.name),
          navigationLink(`Open ${label} history →`, `/automations/${definition.id}`, navigate));
      } else {
        row.append(el('p', 'osb-muted', connection ? 'Definition is not installed. Connect shared automations.'
          : failed ? 'Definition availability could not be checked.' : 'Checking definition…'));
      }
      list.append(row);
    }
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    panel.setAttribute('aria-busy', String(busy));
  }

  async function connect(action) {
    if (disposed || busy) return;
    busy = true; failed = false;
    status.textContent = action === 'setup' ? 'Connecting the shared role automations…' : 'Checking shared automation connection…';
    render();
    try {
      const value = await callRoleAutomation(host, action);
      if (disposed) return;
      connection = value;
      status.textContent = value.ready ? 'Shared connection ready · all 12 role automations verified.'
        : 'Shared connection needs setup or an update. Existing history remains available.';
    } catch (error) {
      if (!disposed) {
        connection = null; failed = true;
        status.textContent = error.message || 'Cannot check the shared automation connection.';
      }
    } finally {
      busy = false;
      if (!disposed) render();
    }
  }
  connect('probe');
  return () => { disposed = true; panel.remove(); };
}

export function mountRoleActions({ host, container, navigate, workspace, requirement, role, specId, onSetupComplete,
  initialStage, initialDraft, externalSelection = false, onStageChange }) {
  requireRole(role?.id);
  let disposed = false, busy = false, dispatching = false, connection = null, last = null, lastStatus = null;
  const home = requirement === null && specId === null;
  const newRequirement = home && role.id === 'SA';
  const defaultStage = home || specId === '' ? 'propose' : 'apply';
  let stage = typeof initialStage === 'string' && Object.hasOwn(SKILLS, initialStage) ? initialStage : defaultStage;
  let notifiedStage, notifiedDisabled;
  const supportsSpecs = Array.isArray(requirement?.specs) && Array.isArray(role.specs);
  const specs = supportsSpecs ? requirement.specs.filter(spec => spec.role === role.id && role.specs.includes(spec.id)) : [];
  const prefix = requirement ? `${{ SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' }[role.id]}-${requirement.id}-` : '';
  const supportedTarget = newRequirement || supportsSpecs && typeof specId === 'string' && (specId === '' ||
    (specId.startsWith(prefix) && specs.some(item => item.id === specId)));
  const key = requirement ? `openhands.apps.openspec-progress:v5:${host.backend.id}:${workspace}:${requirement.id}:${role.id}:run` : null;
  if (key) try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value && UUID.test(value.request_id) && UUID.test(value.automation_id) && SKILLS[value.stage]
      && typeof value.spec_id === 'string' && value.spec_id.startsWith(prefix)
      && (!value.run_id || UUID.test(value.run_id))) last = value;
  } catch { /* Optional storage. */ }
  function previousRunFinished() { return Boolean(lastStatus && FINISHED_STATES.has(lastStatus.status)); }
  function previousRunBlocks() { return Boolean(last) && !previousRunFinished(); }
  function remember(value) {
    lastStatus = null;
    last = value;
    if (key) try { if (value) localStorage.setItem(key, JSON.stringify(value)); else localStorage.removeItem(key); } catch { /* Optional storage. */ }
  }
  function rememberResult(attempt, runId) {
    last = { ...attempt, run_id: runId };
    if (key) try {
      // A remounted panel may have cleared this attempt or submitted a newer one.
      // Keep its reference while still showing this panel's own completed request.
      if (JSON.parse(localStorage.getItem(key))?.request_id === attempt.request_id) {
        localStorage.setItem(key, JSON.stringify(last));
      }
    } catch { /* Optional storage. */ }
  }
  function link(text, href) {
    const node = el('a', 'osb-run-link', text); node.href = href;
    node.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); navigate(href);
    });
    return node;
  }
  const panel = el('section', 'osb-role-actions');
  panel.setAttribute('aria-label', `Run OpenSpec automation for ${role.id}`);
  const body = el('div', 'osb-role-actions-body');
  const connectionText = el('p', 'osb-muted');
  const target = el('p', 'osb-automation-target');
  const setup = button('Connect shared automations', () => connect('setup'));
  const probe = button('Check connection', () => connect('probe'));
  const connectionActions = el('div', 'osb-run-controls'); connectionActions.append(setup);
  const settings = el('details', 'osb-action-details');
  settings.append(el('summary', '', 'Automation settings'), target, probe);
  const form = el('form', 'osb-skill-form'); form.setAttribute('aria-label', `${role.id} automation form`);
  const intake = el('fieldset', 'osb-intake'); intake.hidden = !newRequirement;
  intake.append(el('legend', '', 'New requirement'));
  const requirementLabel = el('label', 'osb-skill-field'); requirementLabel.append(el('span', 'osb-label', 'Requirement ID'));
  const requirementId = el('input'); requirementId.placeholder = 'BOOK-002'; requirementId.maxLength = 100;
  requirementId.setAttribute('aria-label', 'New requirement ID'); requirementLabel.append(requirementId); intake.append(requirementLabel);
  const bindings = el('div', 'osb-application-bindings'); intake.append(bindings);
  const appRows = [];
  function addApplication(initialRole = 'Backend') {
    if (appRows.length >= 20) return;
    const row = el('fieldset', 'osb-application-binding'); row.append(el('legend', '', 'Impacted application'));
    const fields = {};
    for (const [key, label] of [['id', 'Application ID'], ['name', 'Application name'], ['role', 'Implementation role'], ['repository', 'GitHub repository URL']]) {
      const field = el('label', 'osb-skill-field'); field.append(el('span', 'osb-label', label));
      const input = el(key === 'role' ? 'select' : 'input'); input.setAttribute('aria-label', label);
      if (key === 'role') {
        for (const value of ['Backend', 'Frontend', 'QA']) { const option = el('option', '', value); option.value = value; input.append(option); }
        input.value = initialRole;
      } else input.maxLength = key === 'repository' ? 500 : key === 'id' ? 80 : 200;
      if (key === 'repository') input.placeholder = 'https://github.com/owner/repository.git';
      fields[key] = input; field.append(input); row.append(field);
    }
    const entry = { row, fields };
    row.append(button('Remove application', () => { appRows.splice(appRows.indexOf(entry), 1); row.remove(); }));
    appRows.push(entry); bindings.append(row);
  }
  if (newRequirement) addApplication();
  intake.append(button('Add application', () => addApplication()));
  const selected = el('header', 'osb-selected-automation'); selected.setAttribute('aria-label', `${role.id} selected automation`);
  const selectedTitle = el('h2', 'osb-selected-automation-title');
  const selectedDefinition = el('div', 'osb-selected-automation-definition');
  selected.append(selectedTitle, selectedDefinition);
  const skillLabel = el('label', 'osb-skill-field'); skillLabel.append(el('span', 'osb-label', 'Automation'));
  const skill = el('select'); skill.setAttribute('aria-label', `${role.id} automation`);
  for (const [value, label] of Object.entries(SKILLS)) { const option = el('option', '', label); option.value = value; skill.append(option); }
  skill.value = stage; skillLabel.append(skill);
  const changeLabel = el('label', 'osb-skill-field'); changeLabel.append(el('span', 'osb-label', 'New feature name'));
  const change = el('input'); change.setAttribute('aria-label', `${role.id} new feature name`);
  change.placeholder = 'booking-validation'; change.maxLength = 160 - prefix.length; changeLabel.append(change);
  const appLabel = el('label', 'osb-skill-field'); appLabel.append(el('span', 'osb-label', 'Impacted application'));
  const application = el('select'); application.setAttribute('aria-label', `${role.id} impacted application`);
  const appChoices = [...new Map((requirement?.specs || []).filter(item => item.role === 'SA').flatMap(item => item.scope?.applications || [])
    .filter(item => item.role === role.id).map(item => [item.id, item])).values()];
  if (appChoices.length !== 1) { const option = el('option', '', 'Choose an application'); option.value = ''; application.append(option); }
  for (const item of appChoices) { const option = el('option', '', `${item.name} · ${item.id}`); option.value = item.id; application.append(option); }
  const selectedApp = specs.find(item => item.id === specId)?.scope?.applications[0]?.id;
  if (selectedApp && appChoices.some(item => item.id === selectedApp)) application.value = selectedApp;
  appLabel.append(application);
  const specPreview = el('p', 'osb-muted'); specPreview.setAttribute('aria-live', 'polite');
  const promptLabel = el('label', 'osb-skill-field');
  const promptTitle = el('span', 'osb-label'); promptLabel.append(promptTitle);
  const prompt = el('textarea'); prompt.setAttribute('aria-label', `${role.id} prompt`);
  prompt.rows = 4; prompt.maxLength = 10000; prompt.placeholder = 'Add instructions…'; promptLabel.append(prompt);
  if (typeof initialDraft?.prompt === 'string') prompt.value = initialDraft.prompt;
  if (typeof initialDraft?.feature === 'string') change.value = initialDraft.feature;
  let evidence = null, conversation = null;
  const help = el('p', 'osb-skill-help');
  const submit = el('button', 'osb-button osb-primary'); submit.type = 'submit';
  form.append(externalSelection ? selected : skillLabel, ...(newRequirement ? [intake] : []), changeLabel, ...(appChoices.length && role.id !== 'SA' ? [appLabel] : []), specPreview, promptLabel, help, submit);
  const result = el('div', 'osb-run-result'); result.setAttribute('role', 'status'); result.setAttribute('aria-live', 'polite');
  const runDetails = el('details', 'osb-action-details osb-last-run');
  const runSummary = el('summary', '', 'Last run'); runDetails.append(runSummary, result);
  body.append(form, connectionText, connectionActions, settings, runDetails);
  panel.append(body); container.append(panel);
  if (specId && requirement) {
    const context = { spec_store: workspace, role: role.id, requirement_id: requirement.id, spec_id: specId };
    conversation = mountRoleConversation({ host, container: body, context, navigate });
    body.prepend(conversation.element);
    evidence = mountRoleEvidence({ host, container: body, context });
  }

  function update() {
    if (disposed) return;
    skill.value = stage;
    panel.dataset.stage = stage;
    if (externalSelection) {
      selectedTitle.textContent = `${role.id} ${SKILLS[stage]}`;
      const definition = connection?.automations.find(item => item.role === role.id && item.stage === stage);
      selectedDefinition.replaceChildren();
      if (definition) {
        const history = link('Automation history →', `/automations/${definition.id}`);
        history.title = definition.name;
        selectedDefinition.append(history);
      }
    }
    if (connection) {
      const config = connection.configuration;
      target.textContent = `${connection.ready ? 'Effective settings' : 'Configured settings · reconnect required'}\n` +
        `Role: ${role.id} · Automation: ${SKILLS[stage]}\nAgent profile: ${config.profile} · Timeout: ${config.timeout_seconds} seconds\n` +
        `Managed workspaces: ${config.workspace}\nSpec store: ${config.spec_store}\nWorkflow resources: ${config.skill_root}`;
    }
    const matches = connection?.configuration?.spec_store === workspace;
    submit.disabled = !supportedTarget || busy || !connection?.ready || !matches || previousRunBlocks() || (stage !== 'propose' && !specId);
    skill.disabled = change.disabled = prompt.disabled = (!supportedTarget && !home) || dispatching;
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    connectionActions.hidden = setup.hidden;
    appLabel.hidden = stage !== 'propose' || role.id === 'SA' || !appChoices.length;
    application.required = !appLabel.hidden; application.disabled = dispatching;
    changeLabel.hidden = stage !== 'propose'; change.required = stage === 'propose';
    intake.hidden = !newRequirement || stage !== 'propose';
    requirementId.required = newRequirement && stage === 'propose';
    requirementId.disabled = dispatching;
    for (const row of appRows) for (const field of Object.values(row.fields)) { field.required = !intake.hidden; field.disabled = dispatching; }
    specPreview.hidden = stage !== 'propose';
    specPreview.textContent = newRequirement ? `New spec: SA-${requirementId.value.trim() || '<requirement>'}-${change.value.trim() || '<feature>'}`
      : home ? 'Choose a requirement to preview the new spec name.' : `New spec: ${prefix}${change.value.trim() || '<feature>'}`;
    prompt.required = ['propose', 'update'].includes(stage); promptTitle.textContent = prompt.required ? 'Prompt' : 'Prompt (optional)';
    help.textContent = newRequirement && stage === 'propose' ? ''
      : home ? 'Choose a requirement and Role spec.'
      : !supportsSpecs ? 'Load a store with role specs.'
      : !supportedTarget ? 'Choose a valid Role spec.'
      : stage !== 'propose' && !specId ? 'Choose a Role spec, or use Propose to create one.'
      : previousRunBlocks() ? last.run_id
        ? 'Previous run unresolved. Refresh run status below.'
        : 'Request outcome unknown. Check automation history before retrying.'
      : '';
    help.hidden = !help.textContent;
    submit.textContent = `Run ${role.id} ${SKILLS[stage]}`;
    panel.setAttribute('aria-busy', String(busy));
    if (notifiedStage !== stage || notifiedDisabled !== dispatching) {
      notifiedStage = stage; notifiedDisabled = dispatching;
      onStageChange?.(stage, { disabled: dispatching });
    }
  }
  function selectStage(value) {
    if (disposed || dispatching || typeof value !== 'string' || !Object.hasOwn(SKILLS, value)) return false;
    stage = value;
    update();
    if (previousRunBlocks()) refreshStatus();
    return true;
  }
  function renderLast(message) {
    result.replaceChildren();
    runDetails.hidden = !last && !message;
    runDetails.open = Boolean(message || last && (previousRunBlocks() || lastStatus?.status === 'FAILED' || lastStatus?.error ||
      lastStatus?.report?.outcome && lastStatus.report.outcome.status !== 'completed'));
    const status = lastStatus?.report?.outcome?.status || lastStatus?.status;
    runSummary.textContent = !last && message ? 'Run error' : status ? `Last run · ${status.toLowerCase().replaceAll('_', ' ')}` : 'Last run';
    if (message) result.append(el('p', 'osb-run-error', message));
    if (!last) return;
    result.append(el('p', '', last.run_id ? `${SKILLS[last.stage]} submitted for ${last.spec_id}. Refresh status or open the run for its result.`
      : `The request for ${last.spec_id} may have started. Inspect automation history before starting another run.`),
    link(last.run_id ? 'Open automation run →' : 'Inspect automation history →', `/automations/${last.automation_id}${last.run_id ? `?run=${last.run_id}` : ''}`));
    if (last.run_id) {
      const refresh = button('Refresh run status', refreshStatus); refresh.disabled = busy;
      result.append(refresh);
    }
    const another = button('Start another run', () => { if (busy || disposed) return; remember(null); renderLast(); update(); });
    another.disabled = busy; result.append(another);
    result.append(el('small', 'osb-request-ref', `Request ${last.request_id}`));
    result.append(el('p', 'osb-muted', previousRunFinished()
      ? 'The previous run has finished. You can submit the selected automation; this result stays visible until then.'
      : 'Refresh run status to check whether the previous run has finished. If its result is unknown, inspect native history before choosing Start another run.'));
    if (lastStatus) {
      const report = lastStatus.report, outcome = report?.outcome;
      const labels = { completed: 'Completed', blocked: outcome?.blocker_type === 'dependency' ? 'Waiting for dependency' : 'Blocked · action needed',
        needs_review: 'Needs review', execution_error: 'Execution error' };
      result.prepend(el('p', 'osb-run-status', outcome ? `Result: ${labels[outcome.status]}` : `Status: ${lastStatus.status.toLowerCase()}`));
      if (outcome) {
        result.append(el('small', 'osb-muted', `Native run: ${lastStatus.status.toLowerCase()} · ${report.role} · ${SKILLS[report.stage]} · ${report.spec_id || 'No spec selected'}`));
        result.append(el('p', 'osb-outcome-summary', outcome.summary));
        if (outcome.agent_status) result.append(el('small', 'osb-muted', `Agent reported: ${outcome.agent_status}`));
        for (const finding of outcome.findings) result.append(el('p', 'osb-run-finding', finding));
        for (const issue of outcome.audit_errors) result.append(el('p', 'osb-run-error', `Audit: ${issue}`));
        result.append(el('p', 'osb-next-action', `Next: ${outcome.next_action}`));
        result.append(el('small', 'osb-automation-target', `Run profile: ${report.configuration.profile} · Timeout: ${report.configuration.timeout_seconds} seconds\nCode project: ${report.configuration.workspace}\nSpec store: ${report.configuration.spec_store}`));
      } else if (['COMPLETED', 'FAILED'].includes(lastStatus.status)) {
        result.append(el('p', 'osb-muted', 'Detailed outcome is unavailable for this run. Open native history or its conversation for the reason.'));
      }
      if (lastStatus.error) result.append(el('p', 'osb-run-error', lastStatus.error));
      if (lastStatus.conversation_id) result.append(link('Open conversation →', `/conversations/${lastStatus.conversation_id}?backend=${encodeURIComponent(host.backend.id)}`));
      if (lastStatus.status === 'COMPLETED') result.append(el('p', 'osb-muted', 'Refresh the requirement to read any source changes.'));
    }
  }
  async function connect(action) {
    if (busy || disposed) return;
    busy = true; update();
    connectionText.textContent = action === 'setup' ? 'Connecting…' : 'Checking connection…';
    try {
      const value = await callRoleAutomation(host, action);
      if (disposed) return;
      connection = value;
      const matches = value.configuration.spec_store === workspace;
      connectionText.textContent = !matches ? 'This store is not the configured automation store. Update role-workflow.json and reconnect.'
        : value.ready ? 'Connected' : value.message;
      if (action === 'setup') onSetupComplete?.();
    } catch (error) {
      if (!disposed) { connection = null; target.textContent = ''; connectionText.textContent = error.message || 'Cannot connect to automations.'; }
    } finally { busy = false; if (!disposed) update(); }
  }
  async function refreshStatus() {
    if (busy || disposed || !last?.run_id) return;
    const attempt = last; busy = true; update(); renderLast();
    try {
      const status = await callRoleAutomation(host, 'status', { automation_id: attempt.automation_id, run_id: attempt.run_id });
      if (disposed || last !== attempt) return;
      if (status.report && (status.report.role !== role.id || status.report.stage !== attempt.stage ||
          status.report.spec_id !== attempt.spec_id || status.report.requirement_id !== (requirement?.id || attempt.requirement_id) ||
          status.report.configuration.spec_store !== workspace)) throw new Error('Run details do not match this submitted spec. Inspect native history.');
      lastStatus = status;
      renderLast();
      conversation?.refresh();
      if (['COMPLETED', 'FAILED'].includes(status.status)) evidence?.refresh('revisions');
    } catch (error) { if (!disposed) renderLast(error.message || 'Cannot read run status.'); }
    finally {
      busy = false;
      if (!disposed) { update(); for (const control of result.querySelectorAll('button')) control.disabled = false; }
    }
  }
  skill.addEventListener('change', () => { if (!selectStage(skill.value)) skill.value = stage; });
  change.addEventListener('input', update);
  requirementId.addEventListener('input', update);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!supportedTarget || busy || previousRunBlocks() || disposed || !connection?.ready || connection.configuration.spec_store !== workspace ||
      (stage !== 'propose' && !specId)) return;
    let input;
    try {
      if (stage === 'propose' && specs.some(item => item.id === prefix + change.value.trim())) throw new Error('This spec already exists. Choose a new feature name.');
      const chosenRequirement = newRequirement ? requirementId.value.trim() : requirement.id;
      const chosenSpec = stage === 'propose' ? (newRequirement ? `SA-${chosenRequirement}-` : prefix) + change.value.trim() : specId;
      input = validateRoleInput({ stage, spec_store: workspace, requirement_id: chosenRequirement,
        context_change: newRequirement ? '' : stage === 'propose' ? (specId || requirement.specs[0]?.change) : specId, role: role.id,
        change: chosenSpec, spec_id: chosenSpec,
        ...(newRequirement ? { applications: appRows.map(row => Object.fromEntries(Object.entries(row.fields).map(([key, field]) => [key, field.value.trim()]))) } : {}),
        request: prompt.value,
        ...(stage === 'propose' && appChoices.length && role.id !== 'SA' ? { application_id: application.value } : {}) });
    } catch (error) { renderLast(error.message); return; }
    const automation = connection.automations.find(item => item.stage === stage && item.role === role.id);
    if (!automation) { renderLast('Reconnect the role automations before running this automation.'); return; }
    const attempt = { request_id: crypto.randomUUID(), automation_id: automation.id, stage, spec_id: input.spec_id, requirement_id: input.requirement_id };
    remember(attempt); busy = dispatching = true; update(); runDetails.hidden = false; runDetails.open = true; result.textContent = 'Submitting…';
    try {
      const response = await callRoleAutomation(host, 'dispatch', { ...input, automation_id: attempt.automation_id, request_id: attempt.request_id });
      rememberResult(attempt, response.run_id);
      if (!disposed) renderLast();
    } catch (error) { if (!disposed) renderLast(error.message || 'Unknown submission outcome. Inspect automation history.'); }
    finally {
      busy = dispatching = false;
      if (!disposed) { update(); for (const control of result.querySelectorAll('button')) control.disabled = false; }
    }
  });
  renderLast(); update();
  connect('probe').then(() => refreshStatus());
  const cleanup = () => { disposed = true; conversation?.dispose(); evidence?.dispose(); panel.remove(); };
  cleanup.selectStage = selectStage;
  cleanup.getStage = () => stage;
  cleanup.getDraft = () => ({ stage, prompt: prompt.value, feature: change.value });
  return cleanup;
}
