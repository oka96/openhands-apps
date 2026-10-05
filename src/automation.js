import bridgeSource from './automation_bridge.py?raw';
import { ACTIONS, STAGES } from './workflow-actions.js';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const STATES = ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED', 'SKIPPED'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REPOSITORY = '/Users/oka/Desktop/openhands-automation';
const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const exact = (value, fields) => object(value) && Object.keys(value).length === fields.length && fields.every(field => Object.hasOwn(value, field));
const uuid = value => typeof value === 'string' && UUID.test(value);
const path = value => typeof value === 'string' && value.startsWith('/') && value.length <= 4096 &&
  !/[\0\r\n\\]/.test(value) && !value.split('/').some(part => ['.', '..', '.local'].includes(part)) &&
  value !== '/' && !value.endsWith('/') && !value.includes('//');
const slug = value => typeof value === 'string' && value.length <= 100 && SLUG.test(value);
const text = (value, max) => typeof value === 'string' && value.length <= max && !value.includes('\0');
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };

export function validateRoleInput(input) {
  const fields = ['stage', 'spec_store', 'requirement_id', 'context_change', 'role', 'spec_id', 'change', 'request'];
  for (const key of ['applications', 'target', 'review_id', 'message']) if (object(input) && Object.hasOwn(input, key)) fields.push(key);
  if (object(input) && Object.hasOwn(input, 'application_id')) { fields.push('application_id'); requireValue(slug(input.application_id) && input.application_id.length <= 80, 'Choose an impacted application.'); }
  const withIds = object(input) && (Object.hasOwn(input, 'automation_id') || Object.hasOwn(input, 'request_id'));
  requireValue(exact(input, withIds ? [...fields, 'automation_id', 'request_id'] : fields), 'Invalid role automation input fields.');
  requireValue(STAGES.includes(input.stage) && ROLES.includes(input.role), 'Choose a supported role and OpenSpec automation.');
  requireValue(path(input.spec_store), 'Load an absolute local spec store directory first.');
  requireValue(typeof input.requirement_id === 'string' && input.requirement_id.length <= 160 &&
    /^[A-Z][A-Z0-9]*-[0-9]+$/.test(input.requirement_id), 'Choose a valid requirement.');
  const context = typeof input.context_change === 'string' && input.context_change.match(/^(SA|FE|BE|QA)-([A-Z][A-Z0-9]*-[0-9]+)-([a-z0-9]+(?:-[a-z0-9]+)*)$/);
  const newRequirement = input.stage === 'propose' && input.role === 'SA' && input.context_change === '';
  requireValue((newRequirement || context && input.context_change.length <= 160 && context[2] === input.requirement_id) && input.change === input.spec_id &&
    (input.stage === 'propose' || input.context_change === input.change), 'Role actions must use a canonical change in this requirement.');
  const prefix = `${{ SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' }[input.role]}-${input.requirement_id}-`;
  requireValue(typeof input.spec_id === 'string' && input.spec_id.length <= 160 && input.spec_id.startsWith(prefix) &&
    SLUG.test(input.spec_id.slice(prefix.length)), 'Choose a spec belonging to this requirement and role.');
  requireValue(text(input.request, 10000) && (!['propose', 'update'].includes(input.stage) || input.request.trim().length > 0),
    'Enter a prompt of at most 10000 characters. Propose and Update require a prompt.');
  if (withIds) requireValue(uuid(input.automation_id) && uuid(input.request_id), 'Invalid automation or request ID.');
  return input;
}

function validateResponse(data, action, input) {
  const invalid = 'Invalid role automation response. Inspect native Automation history before retrying.';
  requireValue(object(data) && data.version === 1 && data.kind === action, invalid);
  if (action === 'history' || action === 'record') {
    requireValue(exact(data, ['version', 'kind', 'data']) && object(data.data), invalid);
    if (action === 'history') requireValue(['revisions', 'reviews', 'deliveries'].every(key => Array.isArray(data.data[key]) && data.data[key].length <= 50
      && data.data[key].every(row => uuid(row.id) && text(row.created_at, 80))), invalid);
    else {
      const value = data.data;
      requireValue(value.id === input.id && object(value.context) && ['spec_store', 'role', 'requirement_id', 'spec_id'].every(key => value.context[key] === input[key]), invalid);
      if (value.files !== undefined) requireValue(Array.isArray(value.files) && value.files.length <= 200 && value.files.every(file => object(file)
        && text(file.path, 4096) && text(file.diff, 6 * 1024 * 1024) && typeof file.binary === 'boolean'), invalid);
      if (value.url !== undefined) requireValue(typeof value.url === 'string' && /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\/pull\/[0-9]+$/.test(value.url), invalid);
    }
  } else if (action === 'dispatch') {
    requireValue(exact(data, ['version', 'kind', 'run_id', 'automation_id', 'request_id']) && uuid(data.run_id) &&
      data.automation_id === input.automation_id && data.request_id === input.request_id, invalid);
  } else if (action === 'status') {
    requireValue(exact(data, ['version', 'kind', 'run_id', 'automation_id', 'status', 'conversation_id', 'error', 'report']) &&
      data.run_id === input.run_id && data.automation_id === input.automation_id && STATES.includes(data.status) &&
      (data.conversation_id === null || uuid(data.conversation_id)) &&
      (data.error === null || text(data.error, 600)), invalid);
    if (data.report !== null) {
      const report = data.report, result = report?.outcome;
      requireValue(exact(report, ['role', 'stage', 'requirement_id', 'spec_id', 'configuration', 'outcome']) &&
        ROLES.includes(report.role) && STAGES.includes(report.stage) &&
        (report.requirement_id === null && report.spec_id === null && data.conversation_id === null ||
          typeof report.requirement_id === 'string' && /^[A-Z][A-Z0-9]*-[0-9]+$/.test(report.requirement_id) &&
          typeof report.spec_id === 'string' && report.spec_id.length <= 160 &&
          report.spec_id.startsWith(`${{ SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' }[report.role]}-${report.requirement_id}-`) &&
          SLUG.test(report.spec_id.slice(`${{ SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' }[report.role]}-${report.requirement_id}-`.length))), invalid);
      validateConfiguration(report.configuration, false, invalid);
      requireValue(exact(result, ['status', 'blocker_type', 'summary', 'findings', 'audit_errors', 'next_action', 'agent_status']) &&
        ['completed', 'blocked', 'needs_review', 'execution_error'].includes(result.status) &&
        [null, 'dependency', 'input'].includes(result.blocker_type) && (result.status === 'blocked' || result.blocker_type === null) &&
        [null, 'completed', 'blocked', 'findings'].includes(result.agent_status) && text(result.summary, 2000) && result.summary.length > 0 &&
        text(result.next_action, 1000) && result.next_action.length > 0 &&
        ['findings', 'audit_errors'].every(key => Array.isArray(result[key]) && result[key].length <= 8 && result[key].every(value => text(value, 1000))) &&
        ['COMPLETED', 'FAILED'].includes(data.status) && (data.status === 'COMPLETED') === (result.status === 'completed'), invalid);
    }
  } else {
    requireValue(exact(data, ['version', 'kind', 'ready', 'automations', 'configuration', 'message']) &&
      typeof data.ready === 'boolean' && text(data.message, 600) && Array.isArray(data.automations) && data.automations.length <= ROLES.length * STAGES.length, invalid);
    const config = data.configuration;
    validateConfiguration(config, true, invalid);
    const ids = new Set(), stages = new Set();
    for (const row of data.automations) {
      const pair = `${row.role}:${row.stage}`;
      requireValue(exact(row, ['id', 'name', 'stage', 'role']) && uuid(row.id) && STAGES.includes(row.stage) && ROLES.includes(row.role) &&
        row.name === `OpenSpec ${row.role} · ${ACTIONS.find(action => action.id === row.stage)?.label}` && !ids.has(row.id) && !stages.has(pair), invalid);
      ids.add(row.id); stages.add(pair);
    }
    requireValue(!data.ready || data.automations.length === ROLES.length * STAGES.length, invalid);
    requireValue(action !== 'setup' || data.ready, invalid);
  }
  return data;
}

function validateConfiguration(config, repository, message) {
  requireValue(exact(config, ['workspace', 'spec_store', 'store_id', 'profile', 'skill_root', 'timeout_seconds', ...(repository ? ['repository'] : [])]) &&
    path(config.workspace) && path(config.spec_store) && path(config.skill_root) && slug(config.store_id) &&
    text(config.profile, 200) && config.profile.trim().length > 0 && Number.isInteger(config.timeout_seconds) &&
    config.timeout_seconds >= 60 && config.timeout_seconds <= 1800 && (!repository || config.repository === REPOSITORY), message);
}

export async function callRoleAutomation(host, action, input) {
  requireValue(['probe', 'setup', 'dispatch', 'status', 'history', 'record'].includes(action), 'Unsupported role automation action.');
  if (action === 'dispatch') {
    validateRoleInput(input);
    requireValue(uuid(input.automation_id) && uuid(input.request_id), 'A submission needs automation and request IDs.');
  } else if (action === 'status') {
    requireValue(exact(input, ['run_id', 'automation_id']) && uuid(input.run_id) && uuid(input.automation_id), 'Invalid run status request.');
  } else if (action === 'history' || action === 'record') {
    requireValue(exact(input, ['spec_store', 'role', 'requirement_id', 'spec_id', ...(action === 'record' ? ['kind', 'id'] : [])])
      && path(input.spec_store) && ROLES.includes(input.role) && text(input.requirement_id, 160) && text(input.spec_id, 160), 'Choose a role specification to view its evidence.');
    if (action === 'record') requireValue(['revisions', 'reviews', 'deliveries'].includes(input.kind) && uuid(input.id), 'Choose a valid evidence record.');
  } else requireValue(input === undefined, 'Unexpected role automation inputs.');
  let info, home;
  try {
    [info, home] = await Promise.all([
      host.agentServer.request({ method: 'GET', path: '/server_info' }),
      host.agentServer.request({ method: 'GET', path: '/api/file/home' }),
    ]);
  } catch { throw new Error('Cannot discover this backend’s local Automation service.'); }
  const service = info?.runtime_services?.services?.automation;
  requireValue(object(service) && typeof service.url_from_agent === 'string' && path(home?.home),
    'This backend does not advertise local Automation. Use the native local Canvas stack.');
  let origin;
  try { origin = new URL(service.url_from_agent); } catch { throw new Error('Invalid advertised Automation service.'); }
  requireValue(['http:', 'https:'].includes(origin.protocol) && ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname) &&
    !origin.username && !origin.password && !origin.search && !origin.hash && origin.pathname === '/' &&
    service.api_prefix === '/api/automation' && service.auth_env_var === 'OPENHANDS_AUTOMATION_API_KEY',
    'Only the advertised local Automation service is supported.');
  const payload = { action, service: { url_from_agent: service.url_from_agent,
    api_prefix: service.api_prefix, auth_env_var: service.auth_env_var }, home: home.home, ...(input ? { input } : {}) };
  const encoded = btoa(Array.from(new TextEncoder().encode(JSON.stringify(payload)), byte => String.fromCharCode(byte)).join(''));
  let output;
  try {
    output = await host.agentServer.request({ method: 'POST', path: '/api/bash/execute_bash_command', body: {
      command: `python3 -c ${quote(bridgeSource)} ${quote(encoded)}`, cwd: home.home, timeout: action === 'setup' ? 180 : 30,
    } });
  } catch { throw new Error('The Automation request outcome is unknown. Inspect native Automation history before retrying.'); }
  requireValue(object(output) && output.order === 0 && Number.isInteger(output.exit_code) && typeof output.stdout === 'string' &&
    new TextEncoder().encode(output.stdout).length <= (action === 'record' ? 6 * 1024 * 1024 : 128 * 1024),
    'Incomplete Automation output. Inspect native Automation history before retrying.');
  let data;
  try { data = JSON.parse(output.stdout); } catch { throw new Error('Invalid Automation output. Inspect native Automation history before retrying.'); }
  if (exact(data, ['version', 'kind', 'message']) && data.version === 1 && data.kind === 'error' && text(data.message, 600)) throw new Error(data.message);
  requireValue(output.exit_code === 0, 'Automation failed. Inspect native Automation history before retrying.');
  return validateResponse(data, action, input);
}
