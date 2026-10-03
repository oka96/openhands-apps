import bridgeSource from './automation_bridge.py?raw';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const STAGES = ['propose', 'update', 'apply'];
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
  const fields = ['stage', 'spec_store', 'requirement_id', 'context_change', 'role', 'change', 'request'];
  const withIds = object(input) && (Object.hasOwn(input, 'automation_id') || Object.hasOwn(input, 'request_id'));
  requireValue(exact(input, withIds ? [...fields, 'automation_id', 'request_id'] : fields), 'Invalid role automation input fields.');
  requireValue(STAGES.includes(input.stage) && ROLES.includes(input.role), 'Choose a supported role and OpenSpec skill.');
  requireValue(path(input.spec_store), 'Load an absolute local spec store directory first.');
  requireValue(typeof input.requirement_id === 'string' && input.requirement_id.length <= 64 &&
    /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/.test(input.requirement_id), 'Choose a valid requirement.');
  requireValue(slug(input.context_change) && slug(input.change), 'Enter a kebab-case change name of at most 100 characters.');
  requireValue(input.stage === 'propose' ? input.change !== input.context_change : input.change === input.context_change,
    input.stage === 'propose' ? 'Propose needs a new change name.' : 'Update and Apply must use this requirement’s change.');
  requireValue(text(input.request, 10000) && (input.stage === 'apply' || input.request.trim().length > 0),
    'Enter a prompt of at most 10000 characters. Propose and Update require a prompt.');
  if (withIds) requireValue(uuid(input.automation_id) && uuid(input.request_id), 'Invalid automation or request ID.');
  return input;
}

function validateResponse(data, action, input) {
  const invalid = 'Invalid role automation response. Inspect native Automation history before retrying.';
  requireValue(object(data) && data.version === 1 && data.kind === action, invalid);
  if (action === 'dispatch') {
    requireValue(exact(data, ['version', 'kind', 'run_id', 'automation_id', 'request_id']) && uuid(data.run_id) &&
      data.automation_id === input.automation_id && data.request_id === input.request_id, invalid);
  } else if (action === 'status') {
    requireValue(exact(data, ['version', 'kind', 'run_id', 'automation_id', 'status', 'conversation_id', 'error']) &&
      data.run_id === input.run_id && data.automation_id === input.automation_id && STATES.includes(data.status) &&
      (data.conversation_id === null || uuid(data.conversation_id)) &&
      (data.error === null || text(data.error, 600)), invalid);
  } else {
    requireValue(exact(data, ['version', 'kind', 'ready', 'automations', 'configuration', 'message']) &&
      typeof data.ready === 'boolean' && text(data.message, 600) && Array.isArray(data.automations) && data.automations.length <= 12, invalid);
    const config = data.configuration;
    requireValue(exact(config, ['workspace', 'spec_store', 'store_id', 'repository']) && path(config.workspace) &&
      path(config.spec_store) && slug(config.store_id) && config.repository === REPOSITORY, invalid);
    const ids = new Set(), stages = new Set();
    for (const row of data.automations) {
      const pair = `${row.role}:${row.stage}`;
      requireValue(exact(row, ['id', 'name', 'stage', 'role']) && uuid(row.id) && STAGES.includes(row.stage) && ROLES.includes(row.role) &&
        row.name === `OpenSpec ${row.role} · ${row.stage[0].toUpperCase()}${row.stage.slice(1)}` && !ids.has(row.id) && !stages.has(pair), invalid);
      ids.add(row.id); stages.add(pair);
    }
    requireValue(!data.ready || data.automations.length === 12, invalid);
    requireValue(action !== 'setup' || data.ready, invalid);
  }
  return data;
}

export async function callRoleAutomation(host, action, input) {
  requireValue(['probe', 'setup', 'dispatch', 'status'].includes(action), 'Unsupported role automation action.');
  if (action === 'dispatch') {
    validateRoleInput(input);
    requireValue(uuid(input.automation_id) && uuid(input.request_id), 'A submission needs automation and request IDs.');
  } else if (action === 'status') {
    requireValue(exact(input, ['run_id', 'automation_id']) && uuid(input.run_id) && uuid(input.automation_id), 'Invalid run status request.');
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
    new TextEncoder().encode(output.stdout).length <= 128 * 1024,
    'Incomplete Automation output. Inspect native Automation history before retrying.');
  let data;
  try { data = JSON.parse(output.stdout); } catch { throw new Error('Invalid Automation output. Inspect native Automation history before retrying.'); }
  if (exact(data, ['version', 'kind', 'message']) && data.version === 1 && data.kind === 'error' && text(data.message, 600)) throw new Error(data.message);
  requireValue(output.exit_code === 0, 'Automation failed. Inspect native Automation history before retrying.');
  return validateResponse(data, action, input);
}
