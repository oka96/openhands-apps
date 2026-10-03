import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { roleSpecsFixture } from './helpers/role-specs.mjs';

const built = await build({ entryPoints: [new URL('../src/client.js', import.meta.url).pathname], bundle: true,
  format: 'esm', platform: 'browser', write: false, plugins: [{ name: 'raw', setup(builder) {
    builder.onResolve({ filter: /collector\.cjs\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, 'collector.cjs'), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }] });
const { validateBoard } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text + '\n//# sourceURL=role-spec-client.js').toString('base64')}`);

test('multiple specs aggregate without conflating repeated local task IDs', async t => {
  const fixture = await roleSpecsFixture(t);
  const board = await fixture.run(); validateBoard(board, fixture.cwd);
  const req = board.requirements[0];
  assert.equal(board.version, 2);
  assert.equal(req.stage, 'implementation');
  assert.equal(req.rolesComplete, 3);
  assert.deepEqual([req.complete, req.total], [4, 5]);
  assert.equal(req.roles[1].state, 'in_progress');
  assert.deepEqual(req.roles[1].specs, ['FE-REQ-001-labels', 'FE-REQ-001-filters']);
  assert.equal(new Set(req.tasks.map(task => task.id)).size, 1);
  assert.equal(new Set(req.tasks.map(task => `${task.specId}:${task.id}`)).size, 5);
  await writeFile(path.join(fixture.root, 'tasks/FE-REQ-001-filters.md'), '- [x] 1.1 [Frontend] Verify Frontend filters\n');
  const completed = await fixture.run(); validateBoard(completed, fixture.cwd);
  assert.equal(completed.requirements[0].stage, 'done');
});

test('missing source, empty tasks and zero specs cannot produce a completed role', async t => {
  for (const missing of ['task', 'spec', 'empty', 'role']) {
    const fixture = await roleSpecsFixture(t);
    if (missing === 'task') await rm(path.join(fixture.root, 'tasks/SA-REQ-001-labels.md'));
    if (missing === 'spec') await rm(path.join(fixture.root, 'specs/SA-REQ-001-labels/spec.md'));
    if (missing === 'empty') await writeFile(path.join(fixture.root, 'tasks/SA-REQ-001-labels.md'), '# No tasks\n');
    if (missing === 'role') await fixture.removeRole('SA');
    const board = await fixture.run(); validateBoard(board, fixture.cwd);
    assert.notEqual(board.requirements[0].roles[0].state, 'done');
    assert.ok(board.requirements[0].warnings.length);
  }
});

test('an unfinished spec blocker wins, and a checked spec clears an old blocker hint', async t => {
  const fixture = await roleSpecsFixture(t);
  const specs = fixture.metadata.requirements[0].roles.Frontend.specs;
  specs[1].state = 'blocked'; specs[1].note = 'Awaiting filter contract'; await fixture.save();
  let board = await fixture.run(); validateBoard(board, fixture.cwd);
  assert.equal(board.requirements[0].stage, 'blocked');
  assert.equal(board.requirements[0].specs[2].note, 'Awaiting filter contract');
  specs[1].state = 'backlog'; specs[0].state = 'blocked'; await fixture.save();
  board = await fixture.run(); validateBoard(board, fixture.cwd);
  assert.equal(board.requirements[0].specs[1].state, 'done');
  assert.equal(board.requirements[0].stage, 'implementation');
});

test('collector rejects wrong spec ownership, duplicate identities and excess specs', async t => {
  for (const edit of [
    r => { r.roles.SA.specs[0].id = 'BE-REQ-001-labels'; },
    r => { r.roles.SA.specs[0].id = 'SA-REQ-002-labels'; },
    r => { r.roles.SA.specs[0].id = 'SA-REQ-001-../../private'; },
    r => { r.roles.SA.specs.push({ ...r.roles.SA.specs[0] }); },
    r => { r.roles.SA.specs = Array.from({ length: 21 }, (_, i) => ({ ...r.roles.SA.specs[0], id: `SA-REQ-001-part-${i}` })); },
  ]) {
    const fixture = await roleSpecsFixture(t); edit(fixture.metadata.requirements[0]); await fixture.save();
    assert.equal((await fixture.run()).kind, 'error');
  }
});

test('collector rejects cross-role tasks, duplicate local task IDs and symlinked spec files', async t => {
  for (const bad of ['role', 'duplicate', 'symlink']) {
    const fixture = await roleSpecsFixture(t);
    const tasks = path.join(fixture.root, 'tasks/SA-REQ-001-labels.md');
    if (bad === 'role') await writeFile(tasks, '- [ ] 1.1 [QA] Wrong role\n');
    if (bad === 'duplicate') await writeFile(tasks, '- [ ] 1.1 [SA] First\n- [ ] 1.1 [SA] Second\n');
    if (bad === 'symlink') {
      const spec = path.join(fixture.root, 'specs/SA-REQ-001-labels/spec.md');
      await rm(spec); await symlink(path.join(fixture.root, 'proposal.md'), spec);
    }
    assert.equal((await fixture.run()).kind, 'error');
  }
});

test('task and file limits still apply across independent specs', async t => {
  const fixture = await roleSpecsFixture(t);
  const tasks = path.join(fixture.root, 'tasks/SA-REQ-001-labels.md');
  await writeFile(tasks, Array.from({ length: 499 }, (_, index) => `- [ ] ${index + 1}.1 [SA] Verify case ${index}`).join('\n'));
  assert.match((await fixture.run()).message, /500-task limit/);
  await writeFile(tasks, '- [ ] 1.1 [SA] Verify scope\n');
  await writeFile(path.join(fixture.root, 'specs/SA-REQ-001-labels/spec.md'), 'x'.repeat(65537));
  assert.match((await fixture.run()).message, /size limit/);
});

test('unregistered active source files cannot hide unfinished work from the board', async t => {
  for (const kind of ['tasks', 'specs']) {
    const fixture = await roleSpecsFixture(t);
    if (kind === 'tasks') await writeFile(path.join(fixture.root, 'tasks/SA-REQ-001-orphan.md'), '- [ ] 1.1 [SA] Unregistered work\n');
    else {
      await mkdir(path.join(fixture.root, 'specs/SA-REQ-001-orphan'));
      await writeFile(path.join(fixture.root, 'specs/SA-REQ-001-orphan/spec.md'), '# Unregistered spec\n');
    }
    const result = await fixture.run();
    assert.equal(result.kind, 'error');
    assert.match(result.message, /Unregistered.*source.*REQ-001/);
  }
});

test('strict client rejects tampered spec identity, path, counts, grouping and premature completion', async t => {
  const fixture = await roleSpecsFixture(t); const data = await fixture.run();
  for (const edit of [
    r => { r.specs[0].id = 'FE-REQ-001-labels'; },
    r => { r.specs[0].artifacts[0].path = '/tmp/private.md'; },
    r => { r.specs[0].total = 99; },
    r => { r.roles[1].state = 'done'; },
    r => { r.roles[1].specs.reverse(); },
    r => { r.tasks[0].specId = r.specs[1].id; },
    r => { r.specs[2].state = 'done'; },
    r => { r.specs[0].artifacts[0].content = ''; },
    r => { r.specs[0].tasks[0].role = 'QA'; },
    r => { r.specs.push(structuredClone(r.specs[0])); },
  ]) {
    const next = structuredClone(data); edit(next.requirements[0]);
    assert.throws(() => validateBoard(next, fixture.cwd));
  }
});
