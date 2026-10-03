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
  check(fields(item, ['id', 'title', 'summary', 'change', 'stage', 'roles', 'complete', 'total', 'rolesComplete', 'tasks', 'warnings', 'artifacts', 'specs'])
    && text(item.id, 64) && /^REQ-[0-9]{3,}$/.test(item.id) && text(item.title, 200) && text(item.summary, 4000, true)
    && text(item.change, 100) && SLUG.test(item.change) && Array.isArray(item.specs) && item.specs.length <= 20
    && Array.isArray(item.roles) && item.roles.length === 4 && Array.isArray(item.tasks)
    && count(item.total) && count(item.complete) && item.complete <= item.total && item.tasks.length === item.total
    && Array.isArray(item.warnings) && item.warnings.length <= 100 && item.warnings.every(warning => text(warning, 4000))
    && unique(item.warnings) && Array.isArray(item.artifacts) && item.artifacts.length === 2);
  const root = `${workspace === '/' ? '' : workspace}/openspec/changes/${item.change}`;
  function validateArtifact(artifact, id, sourcePath, warnings) {
    check(fields(artifact, ['id', 'path', 'status', 'content']) && artifact.id === id && artifact.path === sourcePath
      && ['present', 'missing'].includes(artifact.status) && text(artifact.content, 64 * 1024, true)
      && encoder.encode(artifact.content).length <= 64 * 1024
      && (artifact.status !== 'missing' || (artifact.content === '' && warnings.length > 0)));
  }
  item.artifacts.forEach((artifact, index) => {
    const id = ['proposal', 'design'][index]; validateArtifact(artifact, id, `${root}/${id}.md`, item.warnings);
  });
  check(unique(item.specs.map(spec => spec.id)));
  for (const spec of item.specs) {
    check(fields(spec, ['id', 'title', 'role', 'state', 'note', 'complete', 'total', 'tasks', 'artifacts', 'warnings'])
      && text(spec.id, 160) && text(spec.title, 200) && ROLES.includes(spec.role)
      && spec.id.startsWith(`${PREFIXES[spec.role]}-${item.id}-`) && SLUG.test(spec.id.slice(`${PREFIXES[spec.role]}-${item.id}-`.length))
      && ['backlog', 'in_progress', 'blocked', 'done'].includes(spec.state) && text(spec.note, 4000, true)
      && count(spec.total) && count(spec.complete) && spec.complete <= spec.total && Array.isArray(spec.tasks) && spec.tasks.length === spec.total
      && Array.isArray(spec.artifacts) && spec.artifacts.length === 2 && Array.isArray(spec.warnings) && spec.warnings.length <= 10
      && spec.warnings.every(warning => text(warning, 4000)) && unique(spec.warnings));
    validateArtifact(spec.artifacts[0], 'specs', `${root}/specs/${spec.id}/spec.md`, spec.warnings);
    validateArtifact(spec.artifacts[1], 'tasks', `${root}/tasks/${spec.id}.md`, spec.warnings);
    spec.tasks.forEach(task => { validateTask(task, spec.artifacts[1].path, spec.id); check(task.role === spec.role); });
    check(unique(spec.tasks.map(task => task.id)) && unique(spec.tasks.map(task => task.line))
      && spec.complete === spec.tasks.filter(task => task.done).length && (spec.artifacts[1].status === 'present' || spec.total === 0));
    const completed = spec.total > 0 && spec.complete === spec.total && spec.artifacts[0].content.trim().length > 0;
    check((spec.state === 'done') === completed && (spec.complete === 0 || spec.state !== 'backlog'));
    if (!spec.total) check(spec.warnings.includes('No tracked tasks; completion is unverified.'));
    if (!spec.artifacts[0].content.trim()) check(spec.warnings.includes('Specification content is missing or empty; completion is unverified.'));
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
      && role.id === ROLES[index] && role.label === LABELS[index] && text(role.owner, 200) && text(role.note, 4000, true)
      && Array.isArray(role.specs));
    const specs = item.specs.filter(spec => spec.role === role.id);
    check(JSON.stringify(role.specs) === JSON.stringify(specs.map(spec => spec.id)));
    compareTasks(role.tasks, specs.flatMap(spec => spec.tasks));
    check(role.total === role.tasks.length && role.complete === role.tasks.filter(task => task.done).length);
    const state = specs.length && specs.every(spec => spec.state === 'done') ? 'done'
      : specs.some(spec => spec.state === 'blocked') ? 'blocked'
        : specs.some(spec => ['done', 'in_progress'].includes(spec.state)) ? 'in_progress' : 'backlog';
    check(role.state === state);
    if (!specs.length) check(item.warnings.includes(`${role.id} has no registered specs; completion is unverified.`));
  });
  check(item.rolesComplete === item.roles.filter(role => role.state === 'done').length);
  const states = item.roles.map(role => role.state);
  const stage = states.includes('blocked') ? 'blocked' : item.rolesComplete === 4 ? 'done'
    : states.every(state => state === 'backlog') ? 'backlog' : states[0] !== 'done' ? 'sa'
      : states[1] !== 'done' || states[2] !== 'done' ? 'implementation' : 'qa';
  check(item.stage === stage);
}

function validateRequirement(item, workspace) {
  check(fields(item, ['id', 'title', 'summary', 'change', 'stage', 'roles', 'complete', 'total', 'rolesComplete', 'tasks', 'warnings', 'artifacts'])
    && text(item.id, 64) && /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/.test(item.id) && text(item.title, 200)
    && text(item.summary, 4000, true) && text(item.change, 100) && SLUG.test(item.change)
    && Array.isArray(item.roles) && item.roles.length === 4
    && count(item.total) && count(item.complete) && item.complete <= item.total
    && Number.isInteger(item.rolesComplete) && item.rolesComplete >= 0 && item.rolesComplete <= 4
    && Array.isArray(item.tasks) && item.tasks.length === item.total && Array.isArray(item.warnings)
    && item.warnings.length <= 100 && item.warnings.every(warning => text(warning, 4000))
    && unique(item.warnings) && Array.isArray(item.artifacts) && item.artifacts.length === 4);
  const root = `${workspace === '/' ? '' : workspace}/openspec/changes/${item.change}`;
  const tasksPath = `${root}/tasks.md`;
  item.tasks.forEach(task => validateTask(task, tasksPath));
  check(unique(item.tasks.map(task => task.id)) && unique(item.tasks.map(task => task.line))
    && item.tasks.filter(task => task.done).length === item.complete);
  const artifactIds = ['proposal', 'design', 'specs', 'tasks'];
  item.artifacts.forEach((artifact, index) => {
    const id = artifactIds[index];
    check(fields(artifact, ['id', 'path', 'status', 'content']) && artifact.id === id
      && artifact.path === `${root}/${id === 'specs' ? 'specs' : `${id}.md`}`
      && ['present', 'missing'].includes(artifact.status) && text(artifact.content, 128 * 1024, true)
      && encoder.encode(artifact.content).length <= (id === 'specs' ? 128 * 1024 : 64 * 1024)
      && (artifact.status !== 'missing' || artifact.content === ''));
    if (artifact.status === 'missing') check(item.warnings.length > 0);
  });
  check(item.artifacts[3].status === 'present' || item.total === 0);
  item.roles.forEach((role, index) => {
    check(fields(role, ['id', 'label', 'owner', 'state', 'note', 'complete', 'total', 'tasks']) && role.id === ROLES[index]
      && role.label === LABELS[index] && text(role.owner, 200) && text(role.note, 4000, true)
      && ['backlog', 'in_progress', 'blocked', 'done'].includes(role.state) && count(role.complete) && count(role.total)
      && role.complete <= role.total && Array.isArray(role.tasks));
    const expected = item.tasks.filter(task => task.role === role.id);
    check(role.total === expected.length && role.complete === expected.filter(task => task.done).length
      && role.tasks.length === expected.length);
    role.tasks.forEach((task, taskIndex) => {
      validateTask(task, tasksPath);
      check(sameTask(task, expected[taskIndex]));
    });
    check((role.state === 'done') === (role.total > 0 && role.complete === role.total));
    check(role.complete === 0 || role.state !== 'backlog');
    if (!role.total) check(item.warnings.some(warning => warning.startsWith(`${role.id} has no tracked tasks;`)));
  });
  const unassigned = item.tasks.filter(task => task.role === null);
  if (unassigned.length) check(item.warnings.some(warning => warning.includes('without a recognized role')));
  check(item.rolesComplete === item.roles.filter(role => role.state === 'done').length);
  const states = item.roles.map(role => role.state);
  const stage = states.includes('blocked') ? 'blocked'
    : item.rolesComplete === 4 && unassigned.every(task => task.done) ? 'done'
      : states.every(state => state === 'backlog') ? 'backlog'
        : states[0] !== 'done' ? 'sa'
          : states[1] !== 'done' || states[2] !== 'done' ? 'implementation'
            : states[3] !== 'done' ? 'qa' : 'implementation';
  check(item.stage === stage);
}

export function validateBoard(data, workspace, now = Date.now()) {
  const cwd = validateWorkspace(workspace);
  check(fields(data, ['version', 'kind', 'workspace', 'name', 'description', 'generatedAt', 'requirements'])
    && [1, 2].includes(data.version) && data.kind === 'board' && data.workspace === cwd && text(data.name, 200)
    && text(data.description, 4000, true) && typeof data.generatedAt === 'string'
    && Number.isFinite(Date.parse(data.generatedAt)) && new Date(data.generatedAt).toISOString() === data.generatedAt
    && Array.isArray(data.requirements) && data.requirements.length <= 50);
  const age = now - Date.parse(data.generatedAt);
  check(age >= -60_000 && age <= 300_000, 'The store returned an old snapshot or its server clock differs. Refresh and check the Agent Server clock.');
  check(encoder.encode(JSON.stringify(data)).length <= LIMIT, 'Store data exceeded the 512 KiB output limit.');
  data.requirements.forEach(item => data.version === 2 ? validateRequirementWithSpecs(item, cwd) : validateRequirement(item, cwd));
  check(unique(data.requirements.map(item => item.id)) && unique(data.requirements.map(item => item.change)));
  if (data.version === 2) check(unique(data.requirements.flatMap(item => item.specs.map(spec => spec.id))));
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
