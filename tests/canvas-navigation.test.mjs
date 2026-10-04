import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { chmod, stat, mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import vm from 'node:vm';
import test from 'node:test';
import { NAVIGATION, MODULE_TARGETS, TARGETS, openSpecPage, orderOpenSpecPages, openSpecIcon, patchSource, customizeCanvasNavigation } from '../scripts/canvas-navigation.mjs';

const run = promisify(execFile);
const names = ['openspec-progress', 'openspec-sa', 'openspec-fe', 'openspec-be', 'openspec-qa'];
function page(name) {
  const item = Object.hasOwn(NAVIGATION, name) ? NAVIGATION[name] : null;
  return { extension: { name }, contribution: { id: item?.pageId || 'main', path: item?.path.slice(1) || 'main', title: `${name} title`, nav_label: `${name} label` },
    href: item?.href || `/extensions/${name}/main` };
}
const jsx = (tag, props, key) => ({ tag, props, key });
function* permutations(items) {
  if (!items.length) { yield []; return; }
  for (const [index, item] of items.entries()) for (const tail of permutations(items.filter((_, i) => i !== index))) yield [item, ...tail];
}
async function fixture(t, options = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'canvas-navigation-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(path.join(root, 'package.json'), JSON.stringify({ name: options.name || '@openhands/agent-canvas', version: options.version || '1.24.0', type: 'module' }));
  const originals = new Map();
  for (const [index, target] of MODULE_TARGETS.entries()) {
    // Minimal original host scope around the real three versioned sidebar
    // fragments, so tests execute the resulting React model, not just strings.
    const content = `const pe=inputPages,K=inputPages,x=${index === 1 ? '"NativeNavLink"' : 'inputPages'},An="NativeNavLink",p={SidebarNavLink:"NativeNavLink"},Y={jsx},w={jsx},k=jsx,i={PanelsTopLeft:"NativeIcon"},vt="NativeIcon",e=false,P=false,$=18,T=18,j=18;\nglobalThis.result=${target.before};\n//# sourceMappingURL=original.map\n`;
    await mkdir(path.dirname(path.join(root, target.file)), { recursive: true });
    await writeFile(path.join(root, target.file), content); originals.set(target.file, content);
  }
  const manifest = { entry: { module: '/assets/entry.client-original.js' },
    routes: { 'routes/root-layout': { module: '/assets/root-layout-BLAC4seH.js', imports: ['/assets/shared.js'] }, other: { module: '/assets/other.js' } },
    url: '/assets/manifest-e1e4878e.js', version: 'e1e4878e' };
  const asset = `window.__reactRouterManifest=${JSON.stringify(manifest)};\n`;
  const html = '<!doctype html><html><head><link rel="modulepreload" href="/assets/manifest-e1e4878e.js"/></head><body><script type="module">import "/assets/manifest-e1e4878e.js"; import("/assets/entry.client-original.js");</script></body></html>';
  for (const [filename, content] of [[TARGETS[3].file, asset], [TARGETS[4].file, html]]) {
    await writeFile(path.join(root, filename), content); originals.set(filename, content);
  }
  return { root, originals };
}
async function contents(root) {
  return Promise.all(TARGETS.map(target => readFile(path.join(root, target.file), 'utf8')));
}

test('OpenSpec order is deterministic across all activation sequences and partial inventories', () => {
  const before = page('before'), between = page('between'), after = page('after');
  for (const sequence of permutations(names)) {
    const selected = sequence.map(page);
    const input = [before, selected[0], between, ...selected.slice(1), after];
    const result = orderOpenSpecPages(input);
    assert.equal(result[0], before); assert.equal(result[2], between); assert.equal(result[7], after);
    assert.deepEqual(result.filter(openSpecPage).map(item => item.extension.name), names);
    assert.deepEqual(input, [before, selected[0], between, ...selected.slice(1), after], 'Never mutate runtime state');
  }
  assert.deepEqual(orderOpenSpecPages([page('openspec-qa'), before, page('openspec-sa')]).map(item => item.extension.name), ['openspec-sa', 'before', 'openspec-qa']);
  assert.deepEqual(orderOpenSpecPages([before, between]), [before, between]);
});

test('only the exact five app/page/path/href combinations receive customization', () => {
  for (const name of names) {
    const valid = page(name);
    assert.ok(openSpecPage(valid));
    assert.ok(openSpecPage({ ...valid, contribution: { ...valid.contribution, path: `/${valid.contribution.path}` } }));
    for (const invalid of [
      { ...valid, extension: { name: `${name}-other` } },
      { ...valid, contribution: { ...valid.contribution, id: 'another-page' } },
      { ...valid, contribution: { ...valid.contribution, path: `${valid.contribution.path}/other` } },
      { ...valid, href: `${valid.href}/requirements/REQ-001` },
      { ...valid, href: '/conversations' },
    ]) assert.equal(Boolean(openSpecPage(invalid)), false);
  }
  for (const invalid of [null, {}, page('other'), page('toString'), page('__proto__')]) assert.equal(Boolean(openSpecPage(invalid)), false);
});

test('icons have five distinct accessible outline shapes and preserve unknown-page fallback', () => {
  const shapes = new Set();
  for (const name of names) {
    const icon = openSpecIcon(page(name), jsx, 'fallback', 18);
    assert.equal(icon.tag, 'svg'); assert.equal(icon.props.width, 18); assert.equal(icon.props.height, 18);
    assert.equal(icon.props['aria-hidden'], true); assert.equal(icon.props.focusable, false);
    assert.equal(icon.props.stroke, 'currentColor'); assert.equal(icon.props.fill, 'none');
    assert.equal(icon.props['data-openspec-icon'], name);
    assert.ok(icon.props.children.every(child => ['path', 'rect', 'ellipse'].includes(child.tag)));
    shapes.add(JSON.stringify(icon.props.children));
  }
  assert.equal(shapes.size, 5);
  const fallback = {}; assert.equal(openSpecIcon(page('unknown'), jsx, fallback, 18), fallback);
});

test('all three patched native modules render ordered React elements without changing unknown labels, hrefs or icons', async t => {
  const { root, originals } = await fixture(t);
  const inputPages = [page('before'), page('openspec-qa'), page('between'), page('openspec-be'), page('openspec-sa'), page('openspec-fe'), page('openspec-progress')];
  for (const target of MODULE_TARGETS) {
    const original = originals.get(target.file), patched = patchSource(target.file, original);
    assert.doesNotMatch(patched, /sourceMappingURL/);
    const baseline = { inputPages, jsx }; vm.runInNewContext(original, baseline);
    const context = { inputPages, jsx }; vm.runInNewContext(patched, context);
    assert.deepEqual(Array.from(context.result, item => item.props.to), [inputPages[0].href, page(names[0]).href, inputPages[2].href, ...names.slice(1).map(name => page(name).href)]);
    for (const index of [0, 2]) assert.deepEqual(JSON.parse(JSON.stringify(context.result[index])), JSON.parse(JSON.stringify(baseline.result[index])));
    for (const item of context.result.filter(item => item.props.icon.props?.['data-openspec-icon'])) {
      const name = item.props.icon.props['data-openspec-icon'];
      assert.equal(item.props.label, `${name} label`); assert.equal(item.props.to, page(name).href);
    }
    const filename = path.join(root, target.file); await writeFile(filename, patched);
    await run(process.execPath, ['--check', filename]);
  }
});

test('apply is idempotent and restore returns every original byte', async t => {
  const { root, originals } = await fixture(t);
  assert.equal((await customizeCanvasNavigation(root, { dryRun: true })).status, 'would apply');
  assert.deepEqual((await readdir(root)).sort(), ['build', 'dist', 'package.json']);
  const applied = await customizeCanvasNavigation(root); assert.equal(applied.status, 'applied'); assert.equal(applied.files.length, 5);
  const first = await contents(root);
  assert.equal((await customizeCanvasNavigation(root)).status, 'already applied'); assert.deepEqual(await contents(root), first);
  assert.equal((await customizeCanvasNavigation(root, { restore: true, dryRun: true })).status, 'would restore');
  assert.equal((await customizeCanvasNavigation(root, { restore: true })).status, 'restored');
  assert.deepEqual(await contents(root), [...originals.values()]);
  assert.equal((await customizeCanvasNavigation(root, { restore: true })).status, 'original');
  assert.deepEqual((await readdir(root)).sort(), ['build', 'dist', 'package.json']);
});

for (const options of [{ version: '1.25.0' }, { name: 'another-package' }]) test(`unsupported package ${JSON.stringify(options)} is rejected before writes`, async t => {
  const { root, originals } = await fixture(t, options);
  await assert.rejects(customizeCanvasNavigation(root), /Only @openhands\/agent-canvas 1.24.0/);
  assert.deepEqual(await contents(root), [...originals.values()]);
  assert.deepEqual((await readdir(root)).sort(), ['build', 'dist', 'package.json']);
});

test('structural guard checks the last target before changing any earlier file', async t => {
  const { root } = await fixture(t);
  await writeFile(path.join(root, TARGETS.at(-1).file), 'different sidebar code');
  const before = await contents(root);
  await assert.rejects(customizeCanvasNavigation(root), /Unsupported Canvas sidebar structure/);
  assert.deepEqual(await contents(root), before);
  assert.deepEqual((await readdir(root)).sort(), ['build', 'dist', 'package.json']);
});

test('duplicated native anchors and stale customization markers are rejected', () => {
  for (const target of MODULE_TARGETS) {
    assert.throws(() => patchSource(target.file, target.before + target.before), /Unsupported/);
    assert.throws(() => patchSource(target.file, patchSource(target.file, target.before)), /Unsupported/);
  }
});

test('restore refuses to discard a later edit or a corrupted backup', async t => {
  const { root } = await fixture(t); await customizeCanvasNavigation(root);
  const filename = path.join(root, TARGETS[1].file), saved = await readFile(filename, 'utf8');
  await writeFile(filename, saved + '\n// Someone else changed this.');
  const before = await contents(root);
  await assert.rejects(customizeCanvasNavigation(root, { restore: true }), /changed after customization/);
  assert.deepEqual(await contents(root), before);
  await writeFile(filename, saved);
  const backupPath = path.join(root, '.openspec-navigation-backup-v1.json');
  const backup = JSON.parse(await readFile(backupPath, 'utf8')); backup.files[0].original += '\n';
  await writeFile(backupPath, JSON.stringify(backup));
  await assert.rejects(customizeCanvasNavigation(root, { restore: true }), /backup does not match/);
  assert.equal(await readFile(filename, 'utf8'), saved);
});

test('linked target files are rejected without changing their destination', async t => {
  const { root, originals } = await fixture(t);
  const filename = path.join(root, TARGETS[0].file), elsewhere = path.join(root, 'elsewhere.js');
  await writeFile(elsewhere, originals.get(TARGETS[0].file)); await rm(filename); await symlink(elsewhere, filename);
  await assert.rejects(customizeCanvasNavigation(root), /ordinary Canvas package file/);
  assert.equal(await readFile(elsewhere, 'utf8'), originals.get(TARGETS[0].file));
});

test('the CLI accepts the documented positional package path and restore flags', async t => {
  const { root, originals } = await fixture(t);
  const cli = new URL('../scripts/apply-canvas-navigation.mjs', import.meta.url).pathname;
  assert.match((await run(process.execPath, [cli, root, '--check'])).stdout, /would apply/);
  await run(process.execPath, [cli, root]); await run(process.execPath, [cli, root, '--restore']);
  assert.deepEqual(await contents(root), [...originals.values()]);
  await assert.rejects(run(process.execPath, [cli, root, '--unknown']), /Usage:/);
});

test('HTML and route manifest revise both cache keys using the patched chunk content', async t => {
  const { root, originals } = await fixture(t);
  const applied = await customizeCanvasNavigation(root);
  const chunk = await readFile(path.join(root, TARGETS[0].file), 'utf8');
  const revision = createHash('sha256').update(chunk).digest('hex').slice(0, 12);
  assert.equal(applied.revision, revision);
  const expectedManifest = `/assets/manifest-e1e4878e.js?openspec-nav=${revision}`;
  const manifestSource = await readFile(path.join(root, TARGETS[3].file), 'utf8');
  const context = { window: {} }; vm.runInNewContext(manifestSource, context);
  const manifest = JSON.parse(JSON.stringify(context.window.__reactRouterManifest));
  assert.equal(manifest.url, expectedManifest);
  assert.equal(manifest.version, `e1e4878e-openspec-${revision}`);
  assert.equal(manifest.routes['routes/root-layout'].module, `/assets/root-layout-BLAC4seH.js?openspec-nav=${revision}`);
  const originalContext = { window: {} }; vm.runInNewContext(originals.get(TARGETS[3].file), originalContext);
  const originalManifest = JSON.parse(JSON.stringify(originalContext.window.__reactRouterManifest));
  assert.deepEqual(manifest.entry, originalManifest.entry);
  assert.deepEqual(manifest.routes.other, originalManifest.routes.other);
  assert.deepEqual(manifest.routes['routes/root-layout'].imports, originalManifest.routes['routes/root-layout'].imports);
  const html = await readFile(path.join(root, TARGETS[4].file), 'utf8');
  assert.ok(html.includes(`href="${expectedManifest}"`));
  assert.ok(html.includes(`import "${expectedManifest}";`));
  assert.equal(html.split(expectedManifest).length, 3);
  assert.equal(html.replaceAll(expectedManifest, '/assets/manifest-e1e4878e.js'), originals.get(TARGETS[4].file));
  assert.notEqual(manifest.url, originalManifest.url, 'Normal reload must miss the old immutable manifest cache key');
  assert.notEqual(manifest.routes['routes/root-layout'].module, originalManifest.routes['routes/root-layout'].module, 'The fresh manifest must miss the old immutable chunk cache key');
  await run(process.execPath, ['--check', path.join(root, TARGETS[3].file)]);
  const other = await fixture(t);
  await writeFile(path.join(other.root, TARGETS[0].file), other.originals.get(TARGETS[0].file) + '\n// Another native build body.');
  assert.notEqual((await customizeCanvasNavigation(other.root, { dryRun: true })).revision, revision);
});

test('unexpected manifest shape or loader reference is rejected before altering any file', async t => {
  for (const invalid of [
    ['build/assets/manifest-e1e4878e.js', source => source.replace('root-layout-BLAC4seH.js', 'other-layout.js')],
    ['build/assets/manifest-e1e4878e.js', source => source.replace('window.__reactRouterManifest=', 'window.somethingElse=')],
    ['build/index.html', source => source.replace('import "/assets/manifest-e1e4878e.js";', '')],
  ]) {
    const { root } = await fixture(t); const filename = path.join(root, invalid[0]);
    await writeFile(filename, invalid[1](await readFile(filename, 'utf8')));
    const before = await contents(root);
    await assert.rejects(customizeCanvasNavigation(root), /Unsupported Canvas sidebar structure/);
    assert.deepEqual(await contents(root), before);
    assert.deepEqual((await readdir(root)).sort(), ['build', 'dist', 'package.json']);
  }
});


test('restrictive process umask preserves apply modes and restores original modes including unchanged content', async t => {
  const { root, originals } = await fixture(t);
  const filenames = TARGETS.map(target => path.join(root, target.file));
  await Promise.all(filenames.map(filename => chmod(filename, 0o644)));
  const moduleUrl = new URL('../scripts/canvas-navigation.mjs', import.meta.url).href;
  const child = `const { customizeCanvasNavigation } = await import(${JSON.stringify(moduleUrl)});
    process.umask(0o077);
    await customizeCanvasNavigation(process.argv[1], { restore: process.argv[2] === 'restore' });`;
  await run(process.execPath, ['--input-type=module', '-e', child, root]);
  assert.deepEqual(await Promise.all(filenames.map(async filename => (await stat(filename)).mode & 0o777)), [0o644, 0o644, 0o644, 0o644, 0o644]);
  // Apply preserves a deliberate current-mode change on an already patched file.
  await chmod(filenames[0], 0o600);
  await run(process.execPath, ['--input-type=module', '-e', child, root]);
  assert.equal((await stat(filenames[0])).mode & 0o777, 0o600);
  // One file already has original content, but restoration must still repair
  // its permissions from the saved backup rather than skipping that file.
  await writeFile(filenames.at(-1), originals.get(TARGETS.at(-1).file));
  await chmod(filenames.at(-1), 0o600);
  await run(process.execPath, ['--input-type=module', '-e', child, root, 'restore']);
  assert.deepEqual(await contents(root), [...originals.values()]);
  assert.deepEqual(await Promise.all(filenames.map(async filename => (await stat(filename)).mode & 0o777)), [0o644, 0o644, 0o644, 0o644, 0o644]);
});
