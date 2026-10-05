import collectorSource from './collector.cjs?raw';
import { validateWorkspace } from './workspace.js';
export { validateWorkspace } from './workspace.js';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const LIMIT = 512 * 1024;
const encoder = new TextEncoder();
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, limit = 4000) => typeof value === 'string' && value.length <= limit && !value.includes('\0');
const fields = (value, names) => object(value) && Object.keys(value).every(key => names.includes(key));
const count = value => Number.isSafeInteger(value) && value >= 0 && value <= 500;
const unique = (rows, key = item => item.id) => new Set(rows.map(key)).size === rows.length;
const specPattern = /^(SA|FE|BE|QA)-[A-Z][A-Z0-9]*-[0-9]+-[a-z0-9]+(?:-[a-z0-9]+)*$/;
function check(value, message = 'The automation returned invalid or inconsistent display data.') { if (!value) throw new Error(message); }
const strings = (value, limit) => Array.isArray(value) && value.length <= limit && value.every(item => text(item));
function tasks(value, cwd) {
  return Array.isArray(value) && value.length <= 500 && value.every(task => object(task) && text(task.id, 100)
    && text(task.description) && typeof task.done === 'boolean' && Number.isSafeInteger(task.line) && task.line > 0
    && text(task.specId, 160) && specPattern.test(task.specId) && ROLES.includes(task.role)
    && task.sourcePath === `${cwd}/openspec/changes/${task.specId}/tasks.md`)
    && unique(value, task => `${task.specId}:${task.id}`) && unique(value, task => `${task.specId}:${task.line}`);
}

/** Validate the display contract only. Automation owns scope and progress decisions. */
export function validateBoard(data, workspace, now = Date.now()) {
  const cwd = validateWorkspace(workspace);
  check(fields(data, ['version', 'kind', 'workspace', 'name', 'description', 'generatedAt', 'requirements'])
    && data.version === 3 && data.kind === 'board' && data.workspace === cwd && text(data.name, 200)
    && text(data.description) && typeof data.generatedAt === 'string' && Number.isFinite(Date.parse(data.generatedAt))
    && Array.isArray(data.requirements) && data.requirements.length <= 50 && unique(data.requirements));
  const age = now - Date.parse(data.generatedAt);
  check(age >= -60_000 && age <= 300_000, 'The store returned an old snapshot or its server clock differs. Refresh and check the Agent Server clock.');
  check(encoder.encode(JSON.stringify(data)).length <= LIMIT, 'Store data exceeded the 512 KiB output limit.');
  for (const item of data.requirements) {
    check(fields(item, ['id', 'title', 'summary', 'stage', 'total', 'complete', 'rolesComplete', 'tasks', 'warnings', 'roles', 'specs']) && typeof item.id === 'string' && /^[A-Z][A-Z0-9]*-[0-9]+$/.test(item.id) && text(item.title, 200)
      && text(item.summary) && ['backlog', 'sa', 'implementation', 'qa', 'blocked', 'done'].includes(item.stage)
      && count(item.total) && count(item.complete) && count(item.rolesComplete) && item.rolesComplete <= 4 && tasks(item.tasks, cwd) && strings(item.warnings, 11000)
      && Array.isArray(item.roles) && item.roles.length === 4 && item.roles.every((role, index) => role?.id === ROLES[index])
      && Array.isArray(item.specs) && item.specs.length <= 20 && unique(item.specs));
    for (const role of item.roles) check(object(role) && ROLES.includes(role.id) && text(role.label, 200) && text(role.owner)
      && text(role.note, 80000) && ['backlog', 'in_progress', 'blocked', 'done'].includes(role.state)
      && count(role.total) && count(role.complete) && tasks(role.tasks, cwd) && strings(role.specs, 20));
    for (const spec of item.specs) {
      check(object(spec) && text(spec.id, 160) && /^(SA|FE|BE|QA)-[A-Z][A-Z0-9]*-[0-9]+-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(spec.id)
        && spec.change === spec.id && text(spec.title, 200) && ROLES.includes(spec.role) && text(spec.note)
        && ['backlog', 'in_progress', 'blocked', 'done'].includes(spec.state) && count(spec.total) && count(spec.complete)
        && tasks(spec.tasks, cwd) && strings(spec.warnings, 510) && Array.isArray(spec.artifacts) && spec.artifacts.length === 4 && unique(spec.artifacts));
      for (const artifact of spec.artifacts) check(object(artifact) && ['proposal', 'design', 'specs', 'tasks'].includes(artifact.id)
        && artifact.path === `${cwd}/openspec/changes/${spec.id}/${artifact.id === 'specs' ? 'specs' : artifact.id + '.md'}`
        && ['present', 'missing'].includes(artifact.status) && text(artifact.content, 128 * 1024)
        && (artifact.status === 'present' || artifact.content === ''));
      if (spec.scope) {
        check(object(spec.scope) && Array.isArray(spec.scope.applications) && spec.scope.applications.length <= 20
          && strings(spec.scope.references, 20));
        for (const app of spec.scope.applications) check(object(app) && text(app.id, 80) && text(app.name, 200) && ROLES.includes(app.role)
          && typeof app.repository === 'string' && /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\.git$/.test(app.repository));
      }
    }
  }
  return data;
}

export async function loadBoard(host, workspace) {
  const cwd = validateWorkspace(workspace);
  // The workspace is a structured API field; the shell executes only fixed source and fixed input.
  const bytes = encoder.encode(JSON.stringify({ action: 'board' }));
  const encoded = btoa(String.fromCharCode(...bytes));
  const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
  const command = `node -e ${quote(collectorSource)} ${quote(encoded)}`;
  let response;
  try {
    response = await host.agentServer.request({ method: 'POST', path: '/api/bash/execute_bash_command',
      body: { command, cwd, timeout: 30 } });
  } catch {
    throw new Error('Cannot read this store from the Agent Server. Check its connection and store directory, then refresh.');
  }
  check(object(response) && typeof response.stdout === 'string' && encoder.encode(response.stdout).length <= LIMIT + 1
    && response.order === 0 && Number.isInteger(response.exit_code),
  'The store query did not return complete output. Refresh or inspect the Agent Server.');
  let data;
  try { data = JSON.parse(response.stdout); }
  catch { throw new Error('The store query returned invalid output. Check that Node.js is installed on the Agent Server.'); }
  if (fields(data, ['version', 'kind', 'message']) && data.version === 1 && data.kind === 'error' && text(data.message, 600)) {
    throw new Error(data.message);
  }
  check(response.exit_code === 0, 'The store query failed on the Agent Server. Refresh to try again.');
  return validateBoard(data, cwd);
}
