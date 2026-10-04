import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, realpath, mkdir, writeFile, rm, symlink, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collect } from '../src/collector.cjs';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'], PREFIXES = ['SA', 'FE', 'BE', 'QA'];
async function fixture(t, done = [], hints = {}) {
  const cwd = await realpath(await mkdtemp(path.join(os.tmpdir(), 'store-collector-')));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const changes = path.join(cwd, 'openspec', 'changes'), roots = {};
  for (const [index, role] of ROLES.entries()) {
    const directory = roots[role] = path.join(changes, `${PREFIXES[index]}-REQ-001-checkout`);
    await mkdir(path.join(directory, 'specs', 'checkout'), { recursive: true });
    await writeFile(path.join(directory, 'proposal.md'), `# Proposal\n\n## Kanban\n- Requirement title: Accessible checkout\n- Requirement summary: Payment review\n- Owner: ${role} owner\n- State: ${hints[role] || 'backlog'}\n- Note: Waiting for test environment\n`);
    await writeFile(path.join(directory, 'design.md'), '# Design\n\nSource content.');
    await writeFile(path.join(directory, 'specs/checkout/spec.md'), '# Requirements\n\n### Requirement: Accessible checkout\n');
    await writeFile(path.join(directory, 'tasks.md'), `# Tasks\n\n- [${done.includes(role) ? 'x' : ' '}] 1.1 Complete ${role} work\n`);
  }
  return { cwd, changes, roots, change: roots.SA, run: () => collect({ action: 'board' }, { cwd }) };
}

test('four folder-owned checklists gate backlog, design, implementation, QA, and done without a registry', async t => {
  for (const [done, hints, expected] of [[[], {}, 'backlog'], [[], { SA: 'in_progress' }, 'sa'], [['SA'], {}, 'implementation'],
    [['SA', 'Frontend'], {}, 'implementation'], [['SA', 'Backend'], {}, 'implementation'], [['SA', 'Frontend', 'Backend'], {}, 'qa'], [ROLES, {}, 'done']]) {
    const { run } = await fixture(t, done, hints), board = await run(), item = board.requirements[0];
    assert.equal(board.version, 3); assert.equal(item.stage, expected);
    assert.deepEqual([item.complete, item.total, item.rolesComplete], [done.length, 4, done.length]);
    assert.deepEqual(item.roles.map(role => role.id), ROLES);
    assert.equal(item.warnings.length, 0); assert.equal(Object.hasOwn(item, 'change'), false); assert.equal(Object.hasOwn(item, 'artifacts'), false);
    assert.ok(item.specs.every(spec => spec.change === spec.id && spec.artifacts.length === 4));
  }
});

test('optional blockers and partial checkboxes derive progress; completion clears stale hints', async t => {
  const first = await fixture(t, ['SA'], { QA: 'blocked' });
  assert.equal((await first.run()).requirements[0].stage, 'blocked');
  const complete = await fixture(t, ROLES, { QA: 'blocked' });
  assert.equal((await complete.run()).requirements[0].stage, 'done');
  await writeFile(path.join(first.change, 'tasks.md'), '- [x] 1.1 First\n- [ ] 1.2 Review design');
  const role = (await first.run()).requirements[0].roles[0];
  assert.deepEqual([role.state, role.complete, role.total], ['in_progress', 1, 2]);
});

test('missing or empty any planning artifact and empty tasks prevent false completion', async t => {
  for (const filename of ['proposal.md', 'design.md', 'tasks.md', 'specs/checkout/spec.md']) for (const missing of [false, true]) {
    const fixtureData = await fixture(t, ROLES), filenamePath = path.join(fixtureData.change, filename);
    if (missing) await rm(filenamePath); else await writeFile(filenamePath, '');
    const item = (await fixtureData.run()).requirements[0];
    assert.notEqual(item.roles[0].state, 'done', `${filename} missing=${missing}`);
    assert.ok(item.warnings.length);
  }
});

test('missing role prevents requirement completion even when existing checkboxes are checked', async t => {
  const data = await fixture(t, ROLES); await rm(data.roots.QA, { recursive: true });
  const item = (await data.run()).requirements[0];
  assert.equal(item.complete, item.total); assert.equal(item.rolesComplete, 3); assert.equal(item.stage, 'qa');
  assert.match(item.warnings.join(' '), /QA has no role changes/);
});

test('folder names group arbitrary prefixes and preserve zeroes; unrelated changes and archives are excluded', async t => {
  const data = await fixture(t);
  for (const name of ['SA-STORY-12-api', 'FE-STORY-12-editor', 'BE-STORY-012-api', 'regular-change', 'archive/SA-REQ-999-archived']) await mkdir(path.join(data.changes, name), { recursive: true });
  await writeFile(path.join(data.cwd, 'openspec/requirements.json'), '{ malformed and deliberately ignored');
  const board = await data.run();
  assert.deepEqual(board.requirements.map(item => item.id), ['REQ-001', 'STORY-012', 'STORY-12']);
  assert.equal(board.requirements[2].specs.length, 2); assert.equal(board.requirements[2].title, 'STORY-12');
  assert.equal(board.requirements[2].roles[0].owner, 'Unassigned');
});

test('Markdown context is optional, multiline values survive, conflicts are deterministic warnings', async t => {
  const data = await fixture(t);
  await writeFile(path.join(data.change, 'proposal.md'), '# Proposal\n\n## Kanban\n- Requirement title: Different title\n- Requirement summary: First line\n  Second line\n- Owner: Owner <b>data</b>\n- Role note: first\n  second\n\n## Other\n- State: blocked\n');
  const item = (await data.run()).requirements[0];
  assert.equal(item.title, 'Accessible checkout');
  assert.match(item.warnings.join(' '), /Conflicting Requirement title/);
  assert.equal(item.roles[0].note, 'first\nsecond'); assert.equal(item.roles[0].owner, 'Owner <b>data</b>');
  assert.equal(item.roles[0].state, 'backlog');
  await writeFile(path.join(data.change, 'proposal.md'), '# Plain standard proposal');
  assert.equal((await data.run()).requirements[0].specs[0].title, 'checkout');
});

test('explicit task role tags must match folder ownership, while untagged tasks inherit it', async t => {
  const data = await fixture(t);
  await writeFile(path.join(data.change, 'tasks.md'), '- [X] [SA] 1.1 中文 🧪 <img src=x>\n- [ ] 1.2 429 responses include Retry-After\n');
  const tasks = (await data.run()).requirements[0].specs[0].tasks;
  assert.equal(tasks[0].description, '中文 🧪 <img src=x>'); assert.equal(tasks[1].description, '429 responses include Retry-After');
  assert.equal(tasks[0].line, 1); assert.equal(tasks[0].role, 'SA');
  await writeFile(path.join(data.change, 'tasks.md'), '- [ ] 1.1 [QA] Wrong role');
  assert.match((await data.run()).message, /must belong to SA/);
});

test('all single checkbox markers, nested and ordered lists, fenced examples and no-space tasks remain tracked', async t => {
  const data = await fixture(t, ROLES);
  for (const marker of ['-', '~', '', '?', '  ']) {
    await writeFile(path.join(data.roots.QA, 'tasks.md'), `- [x] 1.1 Done\n- [${marker}] 1.2 Pending\n`);
    const item = (await data.run()).requirements[0]; assert.equal(item.total, 5); assert.equal(item.complete, 4); assert.equal(item.stage, 'qa');
  }
  await writeFile(path.join(data.roots.QA, 'tasks.md'), '```md\n- [~]1.1 Example\n```\n+ [ ]1.2 No space\n9) [-]1.3 Ordered\n- [Documentation](./guide.md)\n- [A](./guide.md)\n- [1][reference]\n');
  assert.equal((await data.run()).requirements[0].roles[3].total, 3);
  await writeFile(path.join(data.change, 'tasks.md'), '- [ ]'); assert.match((await data.run()).message, /empty or oversized description/);
});

test('multiple and nested capability specs compile with exact paths and bounded depth', async t => {
  const data = await fixture(t), nested = path.join(data.change, 'specs/checkout/accessibility');
  await mkdir(nested); await writeFile(path.join(nested, 'spec.md'), '# Keyboard scenarios');
  const artifact = (await data.run()).requirements[0].specs[0].artifacts[2];
  assert.match(artifact.content, /specs\/checkout\/accessibility\/spec.md/); assert.match(artifact.content, /Accessible checkout/);
  const deep = path.join(data.change, 'specs', ...Array.from({ length: 9 }, (_, i) => `depth-${i}`));
  await mkdir(deep, { recursive: true }); await writeFile(path.join(deep, 'spec.md'), '# Deep');
  assert.match((await data.run()).message, /depth limit/);
});

test('malformed role identities, invalid Markdown metadata and duplicate local task IDs fail closed', async t => {
  for (const name of ['SA-REQ-x-feature', 'FE-req-1-feature', 'QA-REQ-1-BAD', `SA-REQ-1-${'a'.repeat(160)}`]) {
    const data = await fixture(t); await mkdir(path.join(data.changes, name)); assert.equal((await data.run()).kind, 'error');
  }
  for (const text of ['- State: done', '- Owner: ' + 'x'.repeat(201), '- State: backlog\n- State: blocked']) {
    const data = await fixture(t); await writeFile(path.join(data.change, 'proposal.md'), '# Proposal\n## Kanban\n' + text); assert.equal((await data.run()).kind, 'error');
  }
  const data = await fixture(t); await writeFile(path.join(data.change, 'tasks.md'), '- [ ] 1.1 First\n- [x] 1.1 Duplicate');
  assert.match((await data.run()).message, /Duplicate task IDs/);
});

test('unsafe actions, local private workspaces and symlinked changes/artifacts cannot escape the store', async t => {
  const data = await fixture(t), outside = await fixture(t);
  for (const action of [{ action: 'write' }, { action: 'board', command: 'anything' }]) assert.equal((await collect(action, { cwd: data.cwd })).kind, 'error');
  assert.equal((await collect({ action: 'board' }, { cwd: path.join(data.cwd, '.local') })).kind, 'error');
  await rm(path.join(data.change, 'tasks.md')); await symlink(path.join(outside.change, 'tasks.md'), path.join(data.change, 'tasks.md'));
  assert.match((await data.run()).message, /Symlinked or escaping/);
  await rm(path.join(data.change, 'tasks.md')); await writeFile(path.join(data.change, 'tasks.md'), '- [ ] 1.1 Safe');
  await symlink(outside.change, path.join(data.changes, 'SA-REQ-001-linked'));
  assert.match((await data.run()).message, /Symlinked change/);
});

test('byte limits, invalid UTF-8, group limit, aggregate output limit and safe empty stores are enforced', async t => {
  const data = await fixture(t);
  await writeFile(path.join(data.change, 'proposal.md'), '🧪'.repeat(17000)); assert.match((await data.run()).message, /size limit/);
  await writeFile(path.join(data.change, 'proposal.md'), Buffer.from([0xc3, 0x28])); assert.match((await data.run()).message, /UTF-8/);
  await writeFile(path.join(data.change, 'proposal.md'), 'x'.repeat(60000));
  for (let i = 1; i < 10; i++) { const directory = path.join(data.changes, `SA-REQ-${i}-large`); await mkdir(directory); await writeFile(path.join(directory, 'proposal.md'), 'x'.repeat(60000)); }
  assert.match((await data.run()).message, /512 KiB output limit/);
  await rm(data.changes, { recursive: true }); await mkdir(data.changes);
  assert.deepEqual((await data.run()).requirements, []);
  for (let i = 0; i < 51; i++) await mkdir(path.join(data.changes, `SA-REQ-${i}-feature`));
  assert.match((await data.run()).message, /50-requirement limit/);
});

test('Kanban code examples are ignored and duplicate sections, blank states, aliases and broken links are validated', async t => {
  const data = await fixture(t);
  await writeFile(path.join(data.change, 'proposal.md'), '# Proposal\n```md\n## Kanban\n- State: blocked\n```\n## Kanban\n* Owner: Someone\n+ State: in_progress\n');
  let item = (await data.run()).requirements[0];
  assert.equal(item.roles[0].state, 'in_progress'); assert.equal(item.roles[0].owner, 'Someone');
  await writeFile(path.join(data.change, 'proposal.md'), '# Proposal\n## Kanban\n## Kanban\n');
  assert.match((await data.run()).message, /Duplicate Kanban section/);
  await writeFile(path.join(data.change, 'proposal.md'), '# Proposal\n## Kanban\n- State: \n');
  assert.match((await data.run()).message, /Invalid Kanban State/);
  await writeFile(path.join(data.change, 'proposal.md'), '# Proposal');
  await writeFile(path.join(data.roots.Frontend, 'tasks.md'), '- [ ] 1.1 [FE] Edit UI');
  assert.equal((await data.run()).requirements[0].roles[1].tasks[0].description, 'Edit UI');
  await writeFile(path.join(data.change, 'tasks.md'), '- [ ] 1.1 [BE] Wrong role');
  assert.match((await data.run()).message, /must belong to SA/);
  await rm(path.join(data.change, 'tasks.md')); await symlink(path.join(data.cwd, 'missing'), path.join(data.change, 'tasks.md'));
  assert.match((await data.run()).message, /Symlinked/);
});
