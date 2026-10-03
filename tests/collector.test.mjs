import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, realpath, mkdir, writeFile, rm, symlink, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collect } from '../src/collector.cjs';

const ROLES = ['SA', 'Frontend', 'Backend', 'QA'];
function metadata(overrides = {}) {
  return { version: 1, name: '团队 Store 🛍️', description: 'Role-based requirements', requirements: [{
    id: 'REQ-001', title: 'Accessible checkout', summary: 'Payment review', change: 'accessible-checkout',
    roles: Object.fromEntries(ROLES.map(role => [role, { owner: `${role} owner`, state: 'backlog', note: '' }])),
    ...overrides,
  }] };
}
function taskText(done = [], extra = '') {
  return '# Tasks\n\n' + ROLES.map((role, index) => `- [${done.includes(role) ? 'x' : ' '}] ${index + 1}.1 [${role}] Complete ${role} work`).join('\n') + extra;
}
async function fixture(t, data = metadata(), tasks = taskText()) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'store-collector-'));
  const cwd = await realpath(temporary);
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const change = path.join(cwd, 'openspec', 'changes', 'accessible-checkout');
  await mkdir(path.join(change, 'specs', 'checkout'), { recursive: true });
  await writeFile(path.join(cwd, 'openspec', 'requirements.json'), JSON.stringify(data));
  for (const name of ['proposal', 'design']) await writeFile(path.join(change, `${name}.md`), `# ${name}\n\nSource content.`);
  await writeFile(path.join(change, 'specs', 'checkout', 'spec.md'), '# Requirements\n\n### Requirement: Accessible checkout\n');
  await writeFile(path.join(change, 'tasks.md'), tasks);
  return { cwd, change, run: () => collect({ action: 'board' }, { cwd }) };
}

test('all four role checklists gate progress through backlog, SA, implementation, QA, and done', async t => {
  for (const [done, hint, expected] of [
    [[], null, 'backlog'], [[], 'SA', 'sa'], [['SA'], null, 'implementation'],
    [['SA', 'Frontend'], null, 'implementation'], [['SA', 'Backend'], null, 'implementation'],
    [['SA', 'Frontend', 'Backend'], null, 'qa'], [ROLES, null, 'done'],
  ]) {
    const data = metadata();
    if (hint) data.requirements[0].roles[hint].state = 'in_progress';
    const { run } = await fixture(t, data, taskText(done));
    const board = await run();
    assert.equal(board.kind, 'board');
    const item = board.requirements[0];
    assert.equal(Object.hasOwn(item, 'priority'), false);
    assert.equal(item.stage, expected);
    assert.equal(item.complete, done.length);
    assert.equal(item.rolesComplete, done.length);
    assert.equal(item.total, 4);
    assert.deepEqual(item.roles.map(role => role.id), ROLES);
    assert.deepEqual(item.roles.map(role => role.state), ROLES.map(role => done.includes(role) ? 'done' : hint === role ? 'in_progress' : 'backlog'));
    assert.equal(item.warnings.length, 0);
  }
});

test('unfinished blocked roles override every phase; completion clears an old blocked hint', async t => {
  const data = metadata();
  data.requirements[0].roles.QA.state = 'blocked';
  data.requirements[0].roles.QA.note = 'Waiting for test environment';
  const first = await fixture(t, data, taskText(['SA']));
  const item = (await first.run()).requirements[0];
  assert.equal(item.stage, 'blocked');
  assert.equal(item.roles[3].note, 'Waiting for test environment');
  const second = await fixture(t, data, taskText(ROLES));
  assert.equal((await second.run()).requirements[0].stage, 'done');
});

test('partial role completion infers in progress but preserves blocked metadata', async t => {
  for (const [hint, expected] of [['backlog', 'in_progress'], ['blocked', 'blocked']]) {
    const data = metadata();
    data.requirements[0].roles.SA.state = hint;
    const { run } = await fixture(t, data, taskText(['SA'], '\n- [ ] 1.2 [SA] Review design'));
    const role = (await run()).requirements[0].roles[0];
    assert.equal(role.state, expected);
    assert.equal(role.complete, 1);
    assert.equal(role.total, 2);
  }
});

test('missing and empty task files leave all roles unverified and visibly warned', async t => {
  for (const missing of [true, false]) {
    const { run, change } = await fixture(t, metadata(), '');
    if (missing) await rm(path.join(change, 'tasks.md'));
    const item = (await run()).requirements[0];
    assert.equal(item.stage, 'backlog');
    assert.equal(item.rolesComplete, 0);
    assert.equal(item.total, 0);
    assert.ok(item.roles.every(role => role.state !== 'done'));
    for (const role of ROLES) assert.ok(item.warnings.some(warning => warning.includes(`${role} has no tracked tasks`)));
    assert.equal(item.artifacts[3].status, missing ? 'missing' : 'present');
  }
});

test('a missing role prevents completion even when every existing checkbox is checked', async t => {
  const { run } = await fixture(t, metadata(), taskText(ROLES).split('\n').filter(line => !line.includes('[QA]')).join('\n'));
  const item = (await run()).requirements[0];
  assert.equal(item.complete, item.total);
  assert.equal(item.rolesComplete, 3);
  assert.equal(item.stage, 'qa');
  assert.equal(item.roles[3].state, 'backlog');
});

test('unassigned unfinished checkboxes prevent done, including unknown role names', async t => {
  const { run } = await fixture(t, metadata(), taskText(ROLES, '\n- [ ] 5.1 [DevOps] Deploy'));
  const item = (await run()).requirements[0];
  assert.equal(item.stage, 'implementation');
  assert.equal(item.total, 5);
  assert.equal(item.tasks[4].role, null);
  assert.match(item.warnings.join(' '), /without a recognized role/);
  const complete = await fixture(t, metadata(), taskText(ROLES, '\n- [x] 5.1 Document result'));
  assert.equal((await complete.run()).requirements[0].stage, 'done');
  const unstarted = await fixture(t, metadata(), taskText([], '\n- [x] 5.1 Miscellaneous note'));
  assert.equal((await unstarted.run()).requirements[0].stage, 'backlog');
});

test('role prefixes, uppercase checkmarks, source lines, Unicode and untrusted markup remain data', async t => {
  const source = '# Tasks\n- [X] [SA] 1.1 中文 🧪 <img src=x onerror=alert(1)>\n- [ ] 2.1 [Frontend] Build\n'
    + '```md\n- [x] 9.9 [QA] Example only\n```\n- [ ] 3.1 [Backend] API\n- [ ] 4.1 [QA] Verify\n';
  const { run, change } = await fixture(t, metadata(), source);
  const board = await run();
  assert.equal(board.name, '团队 Store 🛍️');
  const item = board.requirements[0];
  assert.equal(item.total, 5);
  assert.deepEqual(item.tasks[0], { id: '1.1', description: '中文 🧪 <img src=x onerror=alert(1)>', done: true,
    line: 2, sourcePath: path.join(change, 'tasks.md'), role: 'SA' });
  assert.match(item.artifacts[2].content, /openspec\/changes\/accessible-checkout\/specs\/checkout\/spec.md/);
  assert.equal(item.artifacts[3].content, source);
});

test('every one-character checkbox marker is tracked; only trimmed x or X counts as done', async t => {
  for (const marker of ['-', '~', '', '?', '  ']) {
    const { run } = await fixture(t, metadata(), taskText(ROLES, `\n- [${marker}] 4.2 [QA] Still unfinished`));
    const item = (await run()).requirements[0];
    assert.equal(item.total, 5, `marker [${marker}] must stay tracked`);
    assert.equal(item.complete, 4);
    assert.equal(item.stage, 'qa');
    assert.equal(item.tasks[4].done, false);
  }
  const { run } = await fixture(t, metadata(), taskText(ROLES, '\n- [ x ] 4.2 [QA] Done\n- [ X] 4.3 [QA] Also done'));
  assert.equal((await run()).requirements[0].stage, 'done');
  const invalid = await fixture(t, metadata(), taskText(ROLES, '\n- [ ]'));
  assert.match((await invalid.run()).message, /empty or oversized description/);
});

test('OpenSpec list syntax retains fenced and no-space tasks without swallowing link bullets', async t => {
  const extra = '\n```md\n- [~]4.2 [QA] Still tracked\n```\n+ [ ]4.3 [QA] No space\n9) [-]4.4 [QA] Ordered\n'
    + '- [Documentation](./guide.md)\n- [A](./guide.md)\n- [1][reference]\n- [WIP] Not a single-token checkbox';
  const { run } = await fixture(t, metadata(), taskText(ROLES, extra));
  const item = (await run()).requirements[0];
  assert.equal(item.total, 7);
  assert.equal(item.complete, 4);
  assert.equal(item.stage, 'qa');
});

test('nested capability specs are recursively included with source paths and bounded depth', async t => {
  const { run, change } = await fixture(t);
  const nested = path.join(change, 'specs', 'checkout', 'accessibility');
  await mkdir(nested);
  await writeFile(path.join(nested, 'spec.md'), '# Nested keyboard scenarios');
  const specs = (await run()).requirements[0].artifacts[2];
  assert.match(specs.content, /specs\/checkout\/accessibility\/spec.md/);
  assert.match(specs.content, /Nested keyboard scenarios/);
  assert.match(specs.content, /Accessible checkout/);
  const deep = path.join(change, 'specs', ...Array.from({ length: 9 }, (_, index) => `level-${index}`));
  await mkdir(deep, { recursive: true });
  await writeFile(path.join(deep, 'spec.md'), '# Too deep');
  assert.match((await run()).message, /depth limit/);
});

test('missing planning artifacts are useful per-requirement warnings', async t => {
  const { run, change } = await fixture(t);
  await rm(path.join(change, 'proposal.md'));
  await rm(path.join(change, 'specs'), { recursive: true });
  const item = (await run()).requirements[0];
  assert.equal(item.artifacts[0].status, 'missing');
  assert.equal(item.artifacts[2].status, 'missing');
  assert.match(item.warnings.join(' '), /Missing proposal artifact/);
  assert.match(item.warnings.join(' '), /Missing specs artifact/);
});

test('malformed metadata, removed fields, duplicate requirement/change IDs and duplicate task IDs fail closed', async t => {
  for (const modify of [
    data => { data.version = 2; }, data => { data.requirements[0].priority = 'high'; },
    data => { data.requirements[0].roles.SA.state = 'done'; }, data => { data.requirements[0].roles.Other = {}; },
    data => { data.requirements.push(structuredClone(data.requirements[0])); },
    data => { data.requirements.push({ ...structuredClone(data.requirements[0]), id: 'REQ-002' }); },
    data => { data.requirements[0].roles.SA.owner = 1; },
  ]) {
    const data = metadata(); modify(data);
    const { run } = await fixture(t, data);
    assert.equal((await run()).kind, 'error');
  }
  const { run, cwd } = await fixture(t, metadata(), taskText([], '\n- [ ] 1.1 [QA] Duplicate'));
  assert.match((await run()).message, /Duplicate task IDs/);
  await writeFile(path.join(cwd, 'openspec', 'requirements.json'), '{ nope');
  assert.match((await run()).message, /not valid JSON/);
});

test('path traversal, unsafe actions, symlink escapes, and .local workspaces are rejected', async t => {
  const traversal = await fixture(t, metadata({ change: '../../.local/private' }));
  assert.equal((await traversal.run()).kind, 'error');
  assert.equal((await collect({ action: 'board', command: 'anything' }, { cwd: traversal.cwd })).kind, 'error');
  assert.equal((await collect({ action: 'write' }, { cwd: traversal.cwd })).kind, 'error');
  assert.equal((await collect({ action: 'board' }, { cwd: path.join(traversal.cwd, '.local') })).kind, 'error');
  const outside = await fixture(t);
  const inside = await fixture(t);
  await rm(path.join(inside.change, 'tasks.md'));
  await symlink(path.join(outside.change, 'tasks.md'), path.join(inside.change, 'tasks.md'));
  assert.match((await inside.run()).message, /Symlinked or escaping/);
  const specLink = await fixture(t);
  await rm(path.join(specLink.change, 'specs', 'checkout'), { recursive: true });
  await symlink(path.join(outside.change, 'specs', 'checkout'), path.join(specLink.change, 'specs', 'checkout'));
  assert.match((await specLink.run()).message, /Symlinked specification/);
});

test('file byte limits, invalid UTF-8, and aggregate output limits are enforced', async t => {
  const { run, change, cwd } = await fixture(t);
  await writeFile(path.join(change, 'proposal.md'), '🧪'.repeat(17_000));
  assert.match((await run()).message, /size limit/);
  await writeFile(path.join(change, 'proposal.md'), Buffer.from([0xc3, 0x28]));
  assert.match((await run()).message, /UTF-8/);
  await writeFile(path.join(change, 'proposal.md'), 'x'.repeat(60_000));
  const data = metadata();
  for (let index = 1; index < 10; index++) {
    const changeName = `large-${index}`;
    data.requirements.push({ ...structuredClone(data.requirements[0]), id: `REQ-0${index + 1}0`, change: changeName });
    const directory = path.join(cwd, 'openspec', 'changes', changeName);
    await mkdir(directory);
    await writeFile(path.join(directory, 'proposal.md'), await readFile(path.join(change, 'proposal.md')));
  }
  await writeFile(path.join(cwd, 'openspec', 'requirements.json'), JSON.stringify(data));
  assert.match((await run()).message, /512 KiB output limit/);
});
