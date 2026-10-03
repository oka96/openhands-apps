'use strict';

// This fixed, read-only collector is embedded in the Canvas app and run by its Agent Server.
const fs = require('node:fs');
const path = require('node:path');

const ROLE_IDS = ['SA', 'Frontend', 'Backend', 'QA'];
const ROLE_LABELS = ['Solution Architect', 'Frontend', 'Backend', 'Quality Assurance'];
const ROLE_PREFIX = { SA: 'SA', Frontend: 'FE', Backend: 'BE', QA: 'QA' };
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIREMENT_ID = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/;
const MAX_FILE = 64 * 1024;
const MAX_METADATA = 128 * 1024;
const MAX_OUTPUT = 512 * 1024;
const MAX_REQUIREMENTS = 50;
const MAX_TASKS = 500;
class CollectorError extends Error {}

function requireValue(condition, message) {
  if (!condition) throw new CollectorError(message);
}
function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function text(value, limit = 2000, empty = false) {
  return typeof value === 'string' && (empty || value.trim().length > 0) && value.length <= limit && !value.includes('\0');
}
function fields(value, names) { return Object.keys(value).every(key => names.includes(key)); }
function unique(values, message) { requireValue(new Set(values).size === values.length, message); }
function contained(root, target) { return target === root || target.startsWith(root + path.sep); }
function localSegment(value) { return value.split(path.sep).includes('.local'); }

// Resolve before reading. Refuse symlink aliases as well as escapes so each source location
// shown in the app identifies exactly the file that supplied its evidence.
function safePath(target, root) {
  requireValue(contained(root, target) && !localSegment(target), 'Source path is outside the permitted store.');
  let canonical;
  try { canonical = fs.realpathSync(target); }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
  requireValue(canonical === target && contained(root, canonical) && !localSegment(canonical),
    'Symlinked or escaping source paths are not supported.');
  return true;
}

function readFile(target, root, limit = MAX_FILE) {
  if (!safePath(target, root)) return null;
  let descriptor;
  try {
    descriptor = fs.openSync(target, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
    const stat = fs.fstatSync(descriptor);
    requireValue(stat.isFile(), 'Expected a regular source file.');
    requireValue(stat.size <= limit, 'A store source file exceeded its size limit.');
    // Read at most limit+1 bytes even if the file grows after fstat.
    const buffer = Buffer.alloc(limit + 1);
    let length = 0;
    while (length < buffer.length) {
      const read = fs.readSync(descriptor, buffer, length, buffer.length - length, null);
      if (!read) break;
      length += read;
    }
    requireValue(length <= limit, 'A store source file exceeded its size limit.');
    const content = buffer.subarray(0, length);
    const decoded = content.toString('utf8');
    requireValue(Buffer.from(decoded, 'utf8').equals(content) && !decoded.includes('\0'), 'A store source file is not valid UTF-8 text.');
    return decoded;
  } finally { if (descriptor !== undefined) fs.closeSync(descriptor); }
}

function validateMetadata(value) {
  requireValue(object(value) && fields(value, ['version', 'name', 'description', 'requirements']) && [1, 2].includes(value.version)
    && text(value.name, 200) && text(value.description, 4000, true) && Array.isArray(value.requirements)
    && value.requirements.length <= MAX_REQUIREMENTS, 'Invalid openspec/requirements.json store metadata.');
  for (const item of value.requirements) {
    requireValue(object(item) && fields(item, ['id', 'title', 'summary', 'change', 'roles'])
      && text(item.id, 64) && REQUIREMENT_ID.test(item.id) && text(item.title, 200) && text(item.summary, 4000, true)
      && text(item.change, 100) && SLUG.test(item.change)
      && object(item.roles) && fields(item.roles, ROLE_IDS), 'Invalid requirement metadata.');
    if (value.version === 2) {
      requireValue(/^REQ-[0-9]{3,}$/.test(item.id) && ROLE_IDS.every(id => Object.hasOwn(item.roles, id)), 'Invalid requirement ID or missing role metadata.');
      let specs = 0;
      for (const [id, role] of Object.entries(item.roles)) {
        requireValue(object(role) && fields(role, ['owner', 'note', 'specs']) && text(role.owner, 200)
          && text(role.note, 4000, true) && Array.isArray(role.specs), 'Invalid role-spec metadata.');
        specs += role.specs.length;
        for (const spec of role.specs) {
          const prefix = `${ROLE_PREFIX[id]}-${item.id}-`;
          requireValue(object(spec) && fields(spec, ['id', 'title', 'state', 'note']) && text(spec.id, 160)
            && spec.id.startsWith(prefix) && SLUG.test(spec.id.slice(prefix.length)) && text(spec.title, 200)
            && ['backlog', 'in_progress', 'blocked'].includes(spec.state) && text(spec.note, 4000, true),
          'Invalid spec identity, role ownership, or spec metadata.');
        }
      }
      requireValue(specs <= 20, 'A requirement exceeded the 20-spec limit.');
      continue;
    }
    for (const role of Object.values(item.roles)) {
      requireValue(object(role) && fields(role, ['owner', 'state', 'note']) && text(role.owner, 200)
        && ['backlog', 'in_progress', 'blocked'].includes(role.state) && text(role.note, 4000, true), 'Invalid requirement role metadata.');
    }
  }
  unique(value.requirements.map(item => item.id), 'Duplicate requirement IDs in store metadata.');
  unique(value.requirements.map(item => item.change), 'Multiple requirements point to the same change.');
  if (value.version === 2) unique(value.requirements.flatMap(item => Object.values(item.roles).flatMap(role => role.specs.map(spec => spec.id))), 'Duplicate spec IDs in store metadata.');
  return value;
}

function parseTasks(content, sourcePath) {
  const tasks = [];
  (content || '').split(/\r?\n/).forEach((line, index) => {
    // Match OpenSpec 1.14 task-progress semantics, including unusual/empty markers,
    // nested/ordered lists and fenced examples. Only x means done; links stay links.
    const match = line.match(/^\s*(?:[-*+]|\d{1,9}[.)])\s*\[(?:\s*([^\]\s]?)\s*\](?![([])|\s+\])\s*(.*)/);
    if (!match) return;
    let description = match[2].trim();
    let id = `line-${index + 1}`;
    let role = null;
    const number = description.match(/^(\d+(?:\.\d+)+|\d+)\.?\s+/);
    if (number) { id = number[1]; description = description.slice(number[0].length); }
    const rolePrefix = description.match(/^\[(SA|Frontend|Backend|QA)\]\s*/);
    if (rolePrefix) {
      role = rolePrefix[1];
      description = description.slice(rolePrefix[0].length);
      if (!number) {
        const after = description.match(/^(\d+(?:\.\d+)+|\d+)\.?\s+/);
        if (after) { id = after[1]; description = description.slice(after[0].length); }
      }
    }
    requireValue(text(description, 4000), 'A task has an empty or oversized description.');
    tasks.push({ id, description, done: (match[1] || '').toLowerCase() === 'x', line: index + 1, sourcePath, role });
    requireValue(tasks.length <= MAX_TASKS, 'A requirement exceeded the 500-task limit.');
  });
  unique(tasks.map(task => task.id), 'Duplicate task IDs in a requirement.');
  return tasks;
}

function artifact(id, target, root, warnings) {
  const content = readFile(target, root);
  if (content === null) warnings.push(`Missing ${id} artifact: ${path.relative(root, target)}.`);
  return { id, path: target, status: content === null ? 'missing' : 'present', content: content || '' };
}

function specsArtifact(changeRoot, workspace, warnings) {
  const target = path.join(changeRoot, 'specs');
  const pieces = [];
  let combinedBytes = 0;
  let entryCount = 0;
  function scan(directory, depth) {
    requireValue(depth <= 8, 'A requirement exceeded the specification directory depth limit.');
    requireValue(safePath(directory, workspace) && fs.statSync(directory).isDirectory(), 'Expected a specs directory.');
    const entries = fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    entryCount += entries.length;
    requireValue(entryCount <= 500, 'A requirement exceeded the specification directory entry limit.');
    for (const entry of entries) {
      requireValue(!entry.isSymbolicLink(), 'Symlinked specification paths are not supported.');
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        requireValue(SLUG.test(entry.name), 'Specification directory names must be kebab-case.');
        scan(file, depth + 1);
      } else if (entry.name === 'spec.md') {
        const content = readFile(file, workspace);
        requireValue(content !== null, 'A specification changed while it was being read; refresh to try again.');
        const piece = `# ${path.relative(workspace, file)}\n\n${content}`;
        combinedBytes += Buffer.byteLength(piece, 'utf8') + (pieces.length ? 7 : 0);
        requireValue(combinedBytes <= MAX_METADATA, 'Combined requirement specifications exceeded the 128 KiB limit.');
        pieces.push(piece);
      }
    }
  }
  if (safePath(target, workspace)) scan(target, 0);
  if (!pieces.length) warnings.push('Missing specs artifact: no capability spec.md files found.');
  const content = pieces.join('\n\n---\n\n');
  requireValue(Buffer.byteLength(content, 'utf8') <= MAX_METADATA, 'Combined requirement specifications exceeded the 128 KiB limit.');
  return { id: 'specs', path: target, status: pieces.length ? 'present' : 'missing', content };
}

function requirement(item, workspace) {
  const root = path.join(workspace, 'openspec', 'changes', item.change);
  safePath(root, workspace);
  const warnings = [];
  const artifacts = [artifact('proposal', path.join(root, 'proposal.md'), workspace, warnings),
    artifact('design', path.join(root, 'design.md'), workspace, warnings), specsArtifact(root, workspace, warnings),
    artifact('tasks', path.join(root, 'tasks.md'), workspace, warnings)];
  const tasks = parseTasks(artifacts[3].content, artifacts[3].path);
  const roles = ROLE_IDS.map((id, index) => {
    const metadata = item.roles[id];
    const ownTasks = tasks.filter(task => task.role === id);
    const complete = ownTasks.filter(task => task.done).length;
    if (!metadata) warnings.push(`${id} has no owner or state metadata.`);
    if (!ownTasks.length) warnings.push(`${id} has no tracked tasks; completion is unverified.`);
    const state = ownTasks.length > 0 && complete === ownTasks.length ? 'done'
      : metadata?.state === 'blocked' ? 'blocked'
        : complete > 0 || metadata?.state === 'in_progress' ? 'in_progress' : 'backlog';
    return { id, label: ROLE_LABELS[index], owner: metadata?.owner || 'Unassigned', state, note: metadata?.note || '',
      complete, total: ownTasks.length, tasks: ownTasks };
  });
  const unassigned = tasks.filter(task => task.role === null);
  if (unassigned.length) warnings.push(`${unassigned.length} task${unassigned.length === 1 ? '' : 's'} without a recognized role; assign SA, Frontend, Backend, or QA.`);
  const rolesComplete = roles.filter(role => role.state === 'done').length;
  let stage;
  if (roles.some(role => role.state === 'blocked')) stage = 'blocked';
  else if (rolesComplete === ROLE_IDS.length && unassigned.every(task => task.done)) stage = 'done';
  else if (roles.every(role => role.state === 'backlog')) stage = 'backlog';
  else if (roles[0].state !== 'done') stage = 'sa';
  else if (roles[1].state !== 'done' || roles[2].state !== 'done') stage = 'implementation';
  else if (roles[3].state !== 'done') stage = 'qa';
  else stage = 'implementation';
  return { id: item.id, title: item.title, summary: item.summary, change: item.change,
    stage, roles, complete: tasks.filter(task => task.done).length, total: tasks.length, rolesComplete,
    tasks, warnings, artifacts };
}

function requirementWithSpecs(item, workspace) {
  const root = path.join(workspace, 'openspec', 'changes', item.change);
  safePath(root, workspace);
  const registered = new Set(ROLE_IDS.flatMap(role => item.roles[role].specs.map(spec => spec.id)));
  for (const kind of ['specs', 'tasks']) {
    const directory = path.join(root, kind);
    if (!safePath(directory, workspace)) continue;
    requireValue(fs.statSync(directory).isDirectory(), `Expected a ${kind} directory.`);
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    requireValue(entries.length <= 500, 'A requirement exceeded the source directory entry limit.');
    for (const entry of entries) {
      const tracked = kind === 'specs' ? entry.isDirectory() || entry.isSymbolicLink() : entry.name.endsWith('.md');
      if (!tracked) continue;
      const id = kind === 'specs' ? entry.name : entry.name.slice(0, -3);
      requireValue(!entry.isSymbolicLink() && (kind !== 'tasks' || entry.isFile()), 'Symlinked or irregular role spec source paths are not supported.');
      requireValue(registered.has(id), `Unregistered ${kind} source ${entry.name} in ${item.id}; register the role spec or move the source outside the active schema paths.`);
    }
  }
  const warnings = [];
  const artifacts = ['proposal', 'design'].map(id => artifact(id, path.join(root, `${id}.md`), workspace, warnings));
  const specs = ROLE_IDS.flatMap(role => item.roles[role].specs.map(metadata => {
    const ownWarnings = [];
    const ownArtifacts = [artifact('specs', path.join(root, 'specs', metadata.id, 'spec.md'), workspace, ownWarnings),
      artifact('tasks', path.join(root, 'tasks', `${metadata.id}.md`), workspace, ownWarnings)];
    const tasks = parseTasks(ownArtifacts[1].content, ownArtifacts[1].path).map(task => ({ ...task, specId: metadata.id }));
    requireValue(tasks.every(task => task.role === role), `Every task in ${metadata.id} must have its owning [${role}] role tag.`);
    const complete = tasks.filter(task => task.done).length;
    if (!tasks.length) ownWarnings.push('No tracked tasks; completion is unverified.');
    if (!ownArtifacts[0].content.trim()) ownWarnings.push('Specification content is missing or empty; completion is unverified.');
    const state = tasks.length && complete === tasks.length && ownArtifacts[0].content.trim() ? 'done'
      : metadata.state === 'blocked' ? 'blocked' : complete || metadata.state === 'in_progress' ? 'in_progress' : 'backlog';
    warnings.push(...ownWarnings.map(warning => `${metadata.id}: ${warning}`));
    return { id: metadata.id, title: metadata.title, role, state, note: metadata.note,
      complete, total: tasks.length, tasks, artifacts: ownArtifacts, warnings: ownWarnings };
  }));
  const tasks = specs.flatMap(spec => spec.tasks);
  requireValue(tasks.length <= MAX_TASKS, 'A requirement exceeded the 500-task limit.');
  const roles = ROLE_IDS.map((id, index) => {
    const ownSpecs = specs.filter(spec => spec.role === id);
    const ownTasks = ownSpecs.flatMap(spec => spec.tasks);
    if (!ownSpecs.length) warnings.push(`${id} has no registered specs; completion is unverified.`);
    const state = ownSpecs.length && ownSpecs.every(spec => spec.state === 'done') ? 'done'
      : ownSpecs.some(spec => spec.state === 'blocked') ? 'blocked'
        : ownSpecs.some(spec => ['done', 'in_progress'].includes(spec.state)) ? 'in_progress' : 'backlog';
    return { id, label: ROLE_LABELS[index], owner: item.roles[id].owner, note: item.roles[id].note, state,
      specs: ownSpecs.map(spec => spec.id), tasks: ownTasks, complete: ownTasks.filter(task => task.done).length, total: ownTasks.length };
  });
  const rolesComplete = roles.filter(role => role.state === 'done').length;
  const stage = roles.some(role => role.state === 'blocked') ? 'blocked' : rolesComplete === 4 ? 'done'
    : roles.every(role => role.state === 'backlog') ? 'backlog' : roles[0].state !== 'done' ? 'sa'
      : roles[1].state !== 'done' || roles[2].state !== 'done' ? 'implementation' : 'qa';
  return { id: item.id, title: item.title, summary: item.summary, change: item.change, stage, roles,
    complete: tasks.filter(task => task.done).length, total: tasks.length, rolesComplete, tasks, warnings, artifacts, specs };
}

function errorResult(error) {
  return { version: 1, kind: 'error', message: error instanceof CollectorError ? error.message : 'Could not read the local OpenSpec store. Check its directory and file permissions.' };
}

async function collect(input, { cwd = process.cwd() } = {}) {
  try {
    requireValue(object(input) && fields(input, ['action']) && input.action === 'board', 'Unsupported collector request.');
    requireValue(text(cwd, 4096) && path.isAbsolute(cwd) && !/[\r\n]/.test(cwd) && !localSegment(cwd), 'Workspace must be an absolute local store path.');
    const workspace = path.resolve(cwd);
    requireValue(safePath(workspace, workspace) && fs.statSync(workspace).isDirectory(), 'Store directory is unavailable.');
    const raw = readFile(path.join(workspace, 'openspec', 'requirements.json'), workspace, MAX_METADATA);
    requireValue(raw !== null, 'Missing openspec/requirements.json. Select an OpenSpec store directory.');
    let metadata;
    try { metadata = JSON.parse(raw); } catch { throw new CollectorError('openspec/requirements.json is not valid JSON.'); }
    validateMetadata(metadata);
    const result = { version: metadata.version, kind: 'board', workspace, name: metadata.name, description: metadata.description,
      generatedAt: new Date().toISOString(), requirements: metadata.requirements.map(item =>
        metadata.version === 2 ? requirementWithSpecs(item, workspace) : requirement(item, workspace)) };
    requireValue(Buffer.byteLength(JSON.stringify(result), 'utf8') <= MAX_OUTPUT, 'Store data exceeded the 512 KiB output limit.');
    return result;
  } catch (error) { return errorResult(error); }
}

async function main() {
  let result;
  try {
    const encoded = process.argv[module.id === '[eval]' ? 1 : 2];
    requireValue(typeof encoded === 'string' && encoded.length > 0 && encoded.length <= 4096
      && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded), 'Expected one base64-encoded JSON input.');
    const decoded = Buffer.from(encoded, 'base64');
    requireValue(decoded.toString('base64') === encoded && Buffer.from(decoded.toString('utf8'), 'utf8').equals(decoded), 'Invalid input encoding.');
    let input;
    try { input = JSON.parse(decoded.toString('utf8')); } catch { throw new CollectorError('Input was not valid JSON.'); }
    result = await collect(input);
  } catch (error) { result = errorResult(error); }
  process.stdout.write(JSON.stringify(result) + '\n');
  if (result.kind === 'error') process.exitCode = 1;
}

module.exports = { collect };
if (require.main === module || module.id === '[eval]') main();
