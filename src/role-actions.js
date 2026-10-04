import { callRoleAutomation, validateRoleInput } from './automation.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SKILLS = { propose: 'Propose', update: 'Update', apply: 'Apply' };
const SKILL_NAMES = { propose: 'openspec-propose', update: 'openspec-update-change', apply: 'openspec-apply-change' };
const HELP = {
  propose: 'Add a named spec to this requirement and role. Stops before implementation.',
  update: 'Revise the selected spec and its tasks. Submitting authorizes the edits in your prompt. Sibling changes stay unchanged. Stops before implementation.',
  apply: 'Work through this role’s selected spec tasks. Check tasks only after their required verification succeeds.',
};
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

export function mountRoleActions({ host, container, navigate, workspace, requirement, role, specId }) {
  let disposed = false, busy = false, dispatching = false, connection = null, last = null, lastStatus = null;
  const supportsSpecs = Array.isArray(requirement.specs) && Array.isArray(role.specs);
  const specs = supportsSpecs ? requirement.specs.filter(spec => spec.role === role.id && role.specs.includes(spec.id)) : [];
  const prefix = `${{ SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' }[role.id]}-${requirement.id}-`;
  const supportedTarget = supportsSpecs && typeof specId === 'string' && (specId === '' ||
    (specId.startsWith(prefix) && specs.some(item => item.id === specId)));
  const key = `openhands.apps.openspec-progress:v5:${host.backend.id}:${workspace}:${requirement.id}:${role.id}:run`;
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value && UUID.test(value.request_id) && UUID.test(value.automation_id) && SKILLS[value.stage]
      && typeof value.spec_id === 'string' && value.spec_id.startsWith(prefix)
      && (!value.run_id || UUID.test(value.run_id))) last = value;
  } catch { /* Optional storage. */ }
  function remember(value) {
    lastStatus = null;
    last = value;
    try { if (value) localStorage.setItem(key, JSON.stringify(value)); else localStorage.removeItem(key); } catch { /* Optional storage. */ }
  }
  function rememberResult(attempt, runId) {
    last = { ...attempt, run_id: runId };
    try {
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
  panel.setAttribute('aria-label', `Run OpenSpec skill for ${role.id}`);
  const body = el('div', 'osb-role-actions-body');
  const connectionText = el('p', 'osb-muted');
  const target = el('p', 'osb-automation-target');
  const launchHelp = el('p', 'osb-muted', 'Submit here in OpenSpec Kanban after choosing a requirement, Role spec and Skill. Native Run now has no requirement context. The profile shown here comes from role-workflow.json; the native profile selector does not override it.');
  const setup = button('Connect automations', () => connect('setup'));
  const probe = button('Check connection', () => connect('probe'));
  const connectionActions = el('div', 'osb-run-controls'); connectionActions.append(setup, probe);
  const setupHelp = el('p', 'osb-muted', 'Connect installs Propose, Update and Apply for each role and removes superseded OpenSpec automations. It starts no agent.');
  const form = el('form', 'osb-skill-form'); form.setAttribute('aria-label', `${role.id} automation`);
  const skillLabel = el('label', 'osb-skill-field'); skillLabel.append(el('span', 'osb-label', 'Skill'));
  const skill = el('select'); skill.setAttribute('aria-label', `${role.id} skill`);
  for (const [value, label] of Object.entries(SKILLS)) { const option = el('option', '', label); option.value = value; skill.append(option); }
  skill.value = specId === '' ? 'propose' : 'apply'; skillLabel.append(skill);
  const changeLabel = el('label', 'osb-skill-field'); changeLabel.append(el('span', 'osb-label', 'New feature name'));
  const change = el('input'); change.setAttribute('aria-label', `${role.id} new feature name`);
  change.placeholder = 'date-validation'; change.maxLength = 160 - prefix.length; changeLabel.append(change);
  const specPreview = el('p', 'osb-muted'); specPreview.setAttribute('aria-live', 'polite');
  const promptLabel = el('label', 'osb-skill-field');
  const promptTitle = el('span', 'osb-label'); promptLabel.append(promptTitle);
  const prompt = el('textarea'); prompt.setAttribute('aria-label', `${role.id} prompt`);
  prompt.rows = 4; prompt.maxLength = 10000; prompt.placeholder = 'Describe the work or constraints for this role…'; promptLabel.append(prompt);
  const help = el('p', 'osb-skill-help');
  const submit = el('button', 'osb-button osb-primary'); submit.type = 'submit';
  form.append(skillLabel, changeLabel, specPreview, promptLabel, help, submit);
  const result = el('div', 'osb-run-result'); result.setAttribute('role', 'status'); result.setAttribute('aria-live', 'polite');
  body.append(form, connectionText, target, launchHelp, connectionActions, setupHelp, result);
  panel.append(body); container.append(panel);

  function update() {
    const stage = skill.value;
    if (connection) {
      const config = connection.configuration;
      target.textContent = `${connection.ready ? 'Effective settings' : 'Configured settings · reconnect required'}\n` +
        `Role: ${role.id} · Skill: ${SKILL_NAMES[stage]}\nAgent profile: ${config.profile} · Timeout: ${config.timeout_seconds} seconds\n` +
        `Code project: ${config.workspace}\nSpec store: ${config.spec_store}\nSkill source: ${config.skill_root}`;
    }
    const matches = connection?.configuration?.spec_store === workspace;
    submit.disabled = !supportedTarget || busy || !connection?.ready || !matches || Boolean(last) || (stage !== 'propose' && !specId);
    skill.disabled = change.disabled = prompt.disabled = !supportedTarget || dispatching;
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    setupHelp.hidden = Boolean(connection?.ready);
    changeLabel.hidden = stage !== 'propose'; change.required = stage === 'propose';
    specPreview.hidden = stage !== 'propose'; specPreview.textContent = `New spec: ${prefix}${change.value.trim() || '<feature>'}`;
    prompt.required = stage !== 'apply'; promptTitle.textContent = stage === 'apply' ? 'Prompt (optional)' : 'Prompt';
    help.textContent = !supportsSpecs ? 'Load a store with canonical role change folders before running automations.'
      : !supportedTarget ? 'The selected spec is missing or does not belong to this role. Choose a current Role spec before running a skill.'
      : stage !== 'propose' && !specId ? 'Choose an existing Role spec for Update or Apply, or select Propose to add a new spec.' : HELP[stage];
    submit.textContent = `Run ${role.id} ${SKILLS[stage]}`;
    panel.setAttribute('aria-busy', String(busy));
  }
  function renderLast(message) {
    result.replaceChildren();
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
    result.append(el('p', 'osb-muted', 'Choose Start another run to enable a new submission. Changing Skill does not start work.'));
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
      if (lastStatus.conversation_id) result.append(link('Open conversation →', `/conversations/${lastStatus.conversation_id}`));
      if (lastStatus.status === 'COMPLETED') result.append(el('p', 'osb-muted', 'Refresh the requirement to read any source changes.'));
    }
  }
  async function connect(action) {
    if (busy || disposed) return;
    busy = true; update();
    connectionText.textContent = action === 'setup' ? 'Connecting role automations…' : 'Checking role automations…';
    try {
      const value = await callRoleAutomation(host, action);
      if (disposed) return;
      connection = value;
      const matches = value.configuration.spec_store === workspace;
      connectionText.textContent = !matches ? 'This store is not the configured automation store. Update role-workflow.json and reconnect.'
        : value.ready ? 'Connected · Propose, Update, Apply' : value.message;
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
          status.report.spec_id !== attempt.spec_id || status.report.requirement_id !== requirement.id ||
          status.report.configuration.spec_store !== workspace)) throw new Error('Run details do not match this submitted spec. Inspect native history.');
      lastStatus = status;
      renderLast();
    } catch (error) { if (!disposed) renderLast(error.message || 'Cannot read run status.'); }
    finally {
      busy = false;
      if (!disposed) { update(); for (const control of result.querySelectorAll('button')) control.disabled = false; }
    }
  }
  skill.addEventListener('change', update);
  change.addEventListener('input', update);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!supportedTarget || busy || last || disposed || !connection?.ready || connection.configuration.spec_store !== workspace ||
      (skill.value !== 'propose' && !specId)) return;
    let input;
    try {
      if (skill.value === 'propose' && specs.some(item => item.id === prefix + change.value.trim())) throw new Error('This spec already exists. Choose a new feature name.');
      input = validateRoleInput({ stage: skill.value, spec_store: workspace, requirement_id: requirement.id,
        context_change: skill.value === 'propose' ? (specId || requirement.specs[0]?.change) : specId, role: role.id,
        change: skill.value === 'propose' ? prefix + change.value.trim() : specId,
        spec_id: skill.value === 'propose' ? prefix + change.value.trim() : specId,
        request: prompt.value });
    } catch (error) { renderLast(error.message); return; }
    const automation = connection.automations.find(item => item.stage === skill.value && item.role === role.id);
    if (!automation) { renderLast('Reconnect the role automations before running this skill.'); return; }
    const attempt = { request_id: crypto.randomUUID(), automation_id: automation.id, stage: skill.value, spec_id: input.spec_id };
    remember(attempt); busy = dispatching = true; update(); result.textContent = 'Submitting one automation request…';
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
  renderLast(); update(); connect('probe');
  return () => { disposed = true; panel.remove(); };
}
