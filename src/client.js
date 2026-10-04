import collectorSource from './collector.cjs?raw';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
const LABELS = ['Solution Architect', 'Frontend', 'Backend', 'Quality Assurance'];
const PREFIXES = { SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' };
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LIMIT = 512 * 1024;
const encoder = new TextEncoder();

function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function text(value, limit = 2000, empty = false) {
  return typeof value === 'string' && (empty || value.trim().length > 0) && value.length <= limit && !value.includes('\0');
}
function count(value) { return Number.isSafeInteger(value) && value >= 0 && value <= 500; }
function fields(value, names) { return object(value) && Object.keys(value).every(key => names.includes(key)); }
function check(value, message = 'The store returned invalid or inconsistent board data.') {
  if (!value) throw new Error(message);
}
function unique(values) { return new Set(values).size === values.length; }
function sameTask(left, right) {
  return ['id', 'description', 'done', 'line', 'sourcePath', 'role'].every(key => left[key] === right[key]);
}

export function validateWorkspace(value) {
  check(typeof value === 'string' && value.startsWith('/') && value.length <= 4096 && !/[\0\r\n\\]/.test(value)
    && !value.split('/').some(part => ['.', '..', '.local'].includes(part)),
  'Enter an absolute store directory on the connected Agent Server, without symlinks or parent-directory segments.');
  return value.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
}

function validateTask(task, tasksPath, specId) {
  check(fields(task, ['id', 'description', 'done', 'line', 'sourcePath', 'role', ...(specId ? ['specId'] : [])]) && text(task.id, 100)
    && text(task.description, 4000) && typeof task.done === 'boolean' && Number.isSafeInteger(task.line)
    && task.line > 0 && task.line <= 65536 && task.sourcePath === tasksPath
    && (task.role === null || ROLES.includes(task.role)) && (!specId || task.specId === specId));
}

function validateRequirementWithSpecs(item, workspace) {
  check(fields(item, ['id', 'title', 'summary', 'stage', 'roles', 'complete', 'total', 'rolesComplete', 'tasks', 'warnings', 'specs'])
    && text(item.id, 160) && /^[A-Z][A-Z0-9]*-[0-9]+$/.test(item.id) && text(item.title, 200) && text(item.summary, 4000, true)
    && Array.isArray(item.specs) && item.specs.length <= 20
    && Array.isArray(item.roles) && item.roles.length === 4 && Array.isArray(item.tasks)
    && count(item.total) && count(item.complete) && item.complete <= item.total && item.tasks.length === item.total
    && Array.isArray(item.warnings) && item.warnings.length <= 11000 && item.warnings.every(warning => text(warning, 4000))
    && unique(item.warnings));
  function validateArtifact(artifact, id, sourcePath, warnings) {
    check(fields(artifact, ['id', 'path', 'status', 'content']) && artifact.id === id && artifact.path === sourcePath
      && ['present', 'missing'].includes(artifact.status) && text(artifact.content, (id === 'specs' ? 128 : 64) * 1024, true)
      && encoder.encode(artifact.content).length <= (id === 'specs' ? 128 : 64) * 1024
      && (artifact.status !== 'missing' || (artifact.content === '' && warnings.length > 0)));
  }
  check(unique(item.specs.map(spec => spec.id)));
  for (const spec of item.specs) {
    check(fields(spec, ['id', 'change', 'title', 'role', 'state', 'note', 'complete', 'total', 'tasks', 'artifacts', 'warnings'])
      && text(spec.id, 160) && spec.change === spec.id && text(spec.title, 200) && ROLES.includes(spec.role)
      && spec.id.startsWith(`${PREFIXES[spec.role]}-${item.id}-`) && SLUG.test(spec.id.slice(`${PREFIXES[spec.role]}-${item.id}-`.length))
      && ['backlog', 'in_progress', 'blocked', 'done'].includes(spec.state) && text(spec.note, 4000, true)
      && count(spec.total) && count(spec.complete) && spec.complete <= spec.total && Array.isArray(spec.tasks) && spec.tasks.length === spec.total
      && Array.isArray(spec.artifacts) && spec.artifacts.length === 4 && Array.isArray(spec.warnings) && spec.warnings.length <= 510
      && spec.warnings.every(warning => text(warning, 4000)) && unique(spec.warnings));
    const root = `${workspace === '/' ? '' : workspace}/openspec/changes/${spec.change}`;
    ['proposal', 'design', 'specs', 'tasks'].forEach((id, index) => validateArtifact(spec.artifacts[index], id,
      `${root}/${id === 'specs' ? 'specs' : `${id}.md`}`, spec.warnings));
    spec.tasks.forEach(task => { validateTask(task, spec.artifacts[3].path, spec.id); check(task.role === spec.role); });
    check(unique(spec.tasks.map(task => task.id)) && unique(spec.tasks.map(task => task.line))
      && spec.complete === spec.tasks.filter(task => task.done).length && (spec.artifacts[3].status === 'present' || spec.total === 0));
    const completed = spec.total > 0 && spec.complete === spec.total && spec.artifacts.every(a => a.status === 'present' && a.content.trim()) && !spec.warnings.length;
    check((spec.state === 'done') === completed && (spec.complete === 0 || spec.state !== 'backlog'));
    if (!spec.total) check(spec.warnings.includes('No tracked tasks; completion is unverified.'));
    if (spec.artifacts.some(a => !a.content.trim())) check(spec.warnings.includes('Planning or task content is missing or empty; completion is unverified.'));
    check(spec.warnings.every(warning => item.warnings.includes(`${spec.id}: ${warning}`)));
  }
  function compareTasks(actual, expected) {
    check(Array.isArray(actual) && actual.length === expected.length);
    actual.forEach((task, index) => {
      const wanted = expected[index]; validateTask(task, wanted.sourcePath, wanted.specId);
      check(sameTask(task, wanted));
    });
  }
  compareTasks(item.tasks, item.specs.flatMap(spec => spec.tasks));
  check(item.complete === item.tasks.filter(task => task.done).length);
  item.roles.forEach((role, index) => {
    check(fields(role, ['id', 'label', 'owner', 'state', 'note', 'complete', 'total', 'tasks', 'specs'])
      && role.id === ROLES[index] && role.label === LABELS[index] && text(role.owner, 4000) && text(role.note, 80000, true)
      && Array.isArray(role.specs));
    const specs = item.specs.filter(spec => spec.role === role.id);
    check(JSON.stringify(role.specs) === JSON.stringify(specs.map(spec => spec.id)));
    compareTasks(role.tasks, specs.flatMap(spec => spec.tasks));
    check(role.total === role.tasks.length && role.complete === role.tasks.filter(task => task.done).length);
    const state = specs.length && specs.every(spec => spec.state === 'done') ? 'done'
      : specs.some(spec => spec.state === 'blocked') ? 'blocked'
        : specs.some(spec => ['done', 'in_progress'].includes(spec.state)) ? 'in_progress' : 'backlog';
    check(role.state === state);
    if (!specs.length) check(item.warnings.includes(`${role.id} has no role changes; completion is unverified.`));
  });
  check(item.rolesComplete === item.roles.filter(role => role.state === 'done').length);
  const states = item.roles.map(role => role.state);
  const stage = states.includes('blocked') ? 'blocked' : item.rolesComplete === 4 ? 'done'
    : states.every(state => state === 'backlog') ? 'backlog' : states[0] !== 'done' ? 'sa'
      : states[1] !== 'done' || states[2] !== 'done' ? 'implementation' : 'qa';
  check(item.stage === stage);
}

export function validateBoard(data, workspace, now = Date.now()) {
  const cwd = validateWorkspace(workspace);
  check(fields(data, ['version', 'kind', 'workspace', 'name', 'description', 'generatedAt', 'requirements'])
    && data.version === 3 && data.kind === 'board' && data.workspace === cwd && text(data.name, 200)
    && text(data.description, 4000, true) && typeof data.generatedAt === 'string'
    && Number.isFinite(Date.parse(data.generatedAt)) && new Date(data.generatedAt).toISOString() === data.generatedAt
    && Array.isArray(data.requirements) && data.requirements.length <= 50);
  const age = now - Date.parse(data.generatedAt);
  check(age >= -60_000 && age <= 300_000, 'The store returned an old snapshot or its server clock differs. Refresh and check the Agent Server clock.');
  check(encoder.encode(JSON.stringify(data)).length <= LIMIT, 'Store data exceeded the 512 KiB output limit.');
  data.requirements.forEach(item => validateRequirementWithSpecs(item, cwd));
  check(unique(data.requirements.map(item => item.id)));
  check(unique(data.requirements.flatMap(item => item.specs.map(spec => spec.id))));
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
