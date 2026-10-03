import { callRoleAutomation, validateRoleInput } from './automation.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SKILLS = { propose: 'Propose', update: 'Update', apply: 'Apply' };
const HELP = {
  propose: 'Plan a new requirement from this role’s perspective, with tasks for all four roles. Stops before implementation.',
  update: 'Revise this requirement’s planning artifacts. Submitting authorizes the edits described in your prompt. Stops before implementation.',
  apply: 'Work through this role’s tasks in the selected change. Check tasks only after their required verification succeeds.',
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

export function mountRoleActions({ host, container, navigate, workspace, requirement, role }) {
  let disposed = false, busy = false, opened = false, connection = null, last = null;
  const key = `openhands.apps.openspec-progress:v4:${host.backend.id}:${workspace}:${requirement.id}:${role.id}:run`;
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value && UUID.test(value.request_id) && UUID.test(value.automation_id) && SKILLS[value.stage]
      && (!value.run_id || UUID.test(value.run_id))) last = value;
  } catch { /* Optional storage. */ }
  function remember(value) {
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
  const panel = el('details', 'osb-role-actions');
  const summary = el('summary', '', 'Run OpenSpec skill');
  summary.setAttribute('aria-label', `Run OpenSpec skill for ${role.id}`);
  panel.append(summary);
  const body = el('div', 'osb-role-actions-body');
  const connectionText = el('p', 'osb-muted', 'Open this panel to check the automation connection.');
  const target = el('p', 'osb-automation-target');
  const setup = button('Connect automations', () => connect('setup'));
  const probe = button('Check connection', () => connect('probe'));
  const connectionActions = el('div', 'osb-run-controls'); connectionActions.append(setup, probe);
  const setupHelp = el('p', 'osb-muted', 'Connect installs Propose, Update and Apply for each role and removes superseded OpenSpec automations. It starts no agent.');
  const form = el('form', 'osb-skill-form'); form.setAttribute('aria-label', `${role.id} automation`);
  const skillLabel = el('label', 'osb-skill-field'); skillLabel.append(el('span', 'osb-label', 'Skill'));
  const skill = el('select'); skill.setAttribute('aria-label', `${role.id} skill`);
  for (const [value, label] of Object.entries(SKILLS)) { const option = el('option', '', label); option.value = value; skill.append(option); }
  skill.value = last?.stage || 'apply'; skillLabel.append(skill);
  const changeLabel = el('label', 'osb-skill-field'); changeLabel.append(el('span', 'osb-label', 'New change name'));
  const change = el('input'); change.setAttribute('aria-label', `${role.id} new change name`);
  change.placeholder = 'add-task-reminders'; change.maxLength = 100; changeLabel.append(change);
  const promptLabel = el('label', 'osb-skill-field');
  const promptTitle = el('span', 'osb-label'); promptLabel.append(promptTitle);
  const prompt = el('textarea'); prompt.setAttribute('aria-label', `${role.id} prompt`);
  prompt.rows = 4; prompt.maxLength = 10000; prompt.placeholder = 'Describe the work or constraints for this role…'; promptLabel.append(prompt);
  const help = el('p', 'osb-skill-help');
  const submit = el('button', 'osb-button osb-primary'); submit.type = 'submit';
  form.append(skillLabel, changeLabel, promptLabel, help, submit);
  const result = el('div', 'osb-run-result'); result.setAttribute('role', 'status'); result.setAttribute('aria-live', 'polite');
  body.append(connectionText, target, connectionActions, setupHelp, form, result);
  panel.append(body); container.append(panel);

  function update() {
    const stage = skill.value;
    const matches = connection?.configuration?.spec_store === workspace;
    submit.disabled = busy || !connection?.ready || !matches || Boolean(last);
    skill.disabled = change.disabled = prompt.disabled = busy || Boolean(last);
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    setupHelp.hidden = Boolean(connection?.ready);
    changeLabel.hidden = stage !== 'propose'; change.required = stage === 'propose';
    prompt.required = stage !== 'apply'; promptTitle.textContent = stage === 'apply' ? 'Prompt (optional)' : 'Prompt';
    help.textContent = HELP[stage]; submit.textContent = `Run ${role.id} ${SKILLS[stage]}`;
    panel.setAttribute('aria-busy', String(busy));
  }
  function renderLast(message) {
    result.replaceChildren();
    if (message) result.append(el('p', 'osb-run-error', message));
    if (!last) return;
    result.append(el('p', '', last.run_id ? `${SKILLS[last.stage]} submitted for ${role.id}. Refresh status or open the run for its result.`
      : 'This request may have started. Inspect automation history before starting another run.'),
    link(last.run_id ? 'Open automation run →' : 'Inspect automation history →', `/automations/${last.automation_id}${last.run_id ? `?run=${last.run_id}` : ''}`));
    if (last.run_id) {
      const refresh = button('Refresh run status', refreshStatus); refresh.disabled = busy;
      result.append(refresh);
    }
    const another = button('Start another run', () => { if (busy || disposed) return; remember(null); renderLast(); update(); });
    another.disabled = busy; result.append(another);
    result.append(el('small', 'osb-request-ref', `Request ${last.request_id}`));
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
      target.textContent = `Code project: ${value.configuration.workspace}\nSpec store: ${value.configuration.spec_store}`;
    } catch (error) {
      if (!disposed) { connection = null; connectionText.textContent = error.message || 'Cannot connect to automations.'; }
    } finally { busy = false; if (!disposed) update(); }
  }
  async function refreshStatus() {
    if (busy || disposed || !last?.run_id) return;
    const attempt = last; busy = true; update(); renderLast();
    try {
      const status = await callRoleAutomation(host, 'status', { automation_id: attempt.automation_id, run_id: attempt.run_id });
      if (disposed || last !== attempt) return;
      renderLast();
      result.prepend(el('p', 'osb-run-status', `Status: ${status.status.toLowerCase()}`));
      if (status.error) result.append(el('p', 'osb-run-error', status.error));
      if (status.conversation_id) result.append(link('Open conversation →', `/conversations/${status.conversation_id}`));
      if (status.status === 'COMPLETED') result.append(el('p', 'osb-muted', 'Refresh the requirement to read any source changes.'));
    } catch (error) { if (!disposed) renderLast(error.message || 'Cannot read run status.'); }
    finally {
      busy = false;
      if (!disposed) { update(); for (const control of result.querySelectorAll('button')) control.disabled = false; }
    }
  }
  skill.addEventListener('change', update);
  panel.addEventListener('toggle', () => {
    if (!panel.open || opened || disposed) return;
    opened = true; renderLast(); connect('probe');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || last || disposed || !connection?.ready || connection.configuration.spec_store !== workspace) return;
    let input;
    try {
      input = validateRoleInput({ stage: skill.value, spec_store: workspace, requirement_id: requirement.id,
        context_change: requirement.change, role: role.id, change: skill.value === 'propose' ? change.value.trim() : requirement.change,
        request: prompt.value });
    } catch (error) { renderLast(error.message); return; }
    const automation = connection.automations.find(item => item.stage === skill.value && item.role === role.id);
    if (!automation) { renderLast('Reconnect the role automations before running this skill.'); return; }
    const attempt = { request_id: crypto.randomUUID(), automation_id: automation.id, stage: skill.value };
    remember(attempt); busy = true; update(); result.textContent = 'Submitting one automation request…';
    try {
      const response = await callRoleAutomation(host, 'dispatch', { ...input, automation_id: attempt.automation_id, request_id: attempt.request_id });
      rememberResult(attempt, response.run_id);
      if (!disposed) renderLast();
    } catch (error) { if (!disposed) renderLast(error.message || 'Unknown submission outcome. Inspect automation history.'); }
    finally {
      busy = false;
      if (!disposed) { update(); for (const control of result.querySelectorAll('button')) control.disabled = false; }
    }
  });
  update();
  return () => { disposed = true; panel.remove(); };
}
