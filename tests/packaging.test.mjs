import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { build } from 'esbuild';
import { APP_VERSION, KANBAN_APP, ROLE_APPS } from '../src/app-config.js';
import { validateApp, validateAllApps } from '../scripts/validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const apps = [KANBAN_APP, ...ROLE_APPS];
const moduleSource = 'export function activate(host) { return host; }\n';

async function fixture(t, app = ROLE_APPS[0]) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'openspec-app-package-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const manifest = JSON.parse(await readFile(path.join(root, app.packageDirectory, 'canvas-extension.json'), 'utf8'));
  await writeFile(path.join(directory, 'canvas-extension.json'), JSON.stringify(manifest));
  await writeFile(path.join(directory, 'extension.js'), moduleSource);
  await mkdir(path.join(directory, 'dist'));
  await writeFile(path.join(directory, 'dist/extension.js'), moduleSource);
  return { directory, manifest, app };
}

test('five distinct manifests share the release version and match fixed app routes', async () => {
  assert.equal(apps.length, 5);
  assert.equal(new Set(apps.map(app => app.name)).size, 5);
  assert.deepEqual(ROLE_APPS.map(app => app.role), ['SA', 'Frontend', 'Backend', 'QA']);
  assert.deepEqual(ROLE_APPS.map(app => app.displayName), ['SA Workflow', 'FE Workflow', 'BE Workflow', 'QA Workflow']);
  const packageInfo = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'));
  assert.equal(packageInfo.version, APP_VERSION);
  assert.equal(lock.version, APP_VERSION);
  assert.equal(lock.packages[''].version, APP_VERSION);
  for (const app of apps) {
    const manifest = JSON.parse(await readFile(path.join(root, app.packageDirectory, 'canvas-extension.json'), 'utf8'));
    assert.equal(manifest.name, app.name);
    assert.equal(manifest.display_name, app.displayName);
    assert.equal(manifest.version, APP_VERSION);
    assert.equal(manifest.entrypoint, 'extension.js');
    assert.deepEqual(manifest.contributes.pages.map(page => [page.id, page.path, page.title]), [[app.pageId, app.path, app.displayName]]);
    assert.equal(manifest.contributes.pages[0].nav_label, app.displayName);
  }
});

test('role entrypoints bind their fixed role independently of mutable host input', async () => {
  for (const app of ROLE_APPS) {
    const result = await build({
      entryPoints: [path.join(root, app.packageDirectory, 'src/extension.js')],
      bundle: true, format: 'esm', platform: 'browser', write: false,
      plugins: [{ name: 'activation-contract', setup(builder) {
        builder.onLoad({ filter: /src\/extension\.js$/ }, ({ path: filename }) => {
          if (filename !== path.join(root, 'src/extension.js')) return;
          return { contents: 'export function activateRoleApp(host, role) { return { host, role }; }', loader: 'js' };
        });
      } }],
    });
    const entrypoint = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
    assert.deepEqual(Object.keys(entrypoint), ['activate']);
    const host = { role: 'Another role', extension: { name: 'not-an-execution-role' } };
    const active = entrypoint.activate(host);
    assert.equal(active.role, app.role);
    assert.equal(active.host, host);
  }
});

test('validator accepts a self-contained source and distribution package', async (t) => {
  const { directory, app } = await fixture(t);
  assert.equal(await validateApp(directory, { app }), true);
  assert.equal(await validateApp(directory, { app, dist: true }), true);
});

for (const [label, edit, pattern] of [
  ['wrong app identity', value => { value.name = 'openspec-fe'; }, /manifest metadata/],
  ['stale version', value => { value.version = '0.7.0'; }, /manifest metadata/],
  ['wrong role page', value => { value.contributes.pages[0].path = '/progress'; }, /declare only/],
  ['extra page', value => { value.contributes.pages.push({ ...value.contributes.pages[0], id: 'other' }); }, /declare only/],
]) {
  test(`validator rejects ${label}`, async (t) => {
    const { directory, manifest, app } = await fixture(t);
    edit(manifest);
    await writeFile(path.join(directory, 'canvas-extension.json'), JSON.stringify(manifest));
    await assert.rejects(validateApp(directory, { app }), pattern);
  });
}

for (const [label, source, pattern] of [
  ['missing activation', 'export function other() {}', /export activate/],
  ['unbundled dependency', 'import value from "elsewhere";\nexport function activate() {}', /external import/],
  ['dynamic dependency', 'export async function activate() { return import("elsewhere"); }', /dynamic import/],
  ['Node runtime dependency', 'export function activate() { return process.cwd(); }', /Node-only global/],
  ['undeclared page', 'export function activate(host) { return host.registerPage("progress", {}); }', /undeclared page/],
]) {
  test(`validator rejects ${label}`, async (t) => {
    const { directory, app } = await fixture(t);
    await writeFile(path.join(directory, 'extension.js'), source);
    await assert.rejects(validateApp(directory, { app }), pattern);
  });
}

test('validator rejects split distributions and stale checked-in bundles', async (t) => {
  const { directory, app } = await fixture(t);
  await writeFile(path.join(directory, 'dist/extra.js'), 'export const value = 1;');
  await assert.rejects(validateApp(directory, { app, dist: true }), /exactly dist\/extension.js/);
  await rm(path.join(directory, 'dist/extra.js'));
  for (const descriptor of apps) {
    const destination = path.resolve(directory, descriptor.packageDirectory);
    await mkdir(path.join(destination, 'dist'), { recursive: true });
    const manifest = await readFile(path.join(root, descriptor.packageDirectory, 'canvas-extension.json'));
    await writeFile(path.join(destination, 'canvas-extension.json'), manifest);
    await writeFile(path.join(destination, 'extension.js'), moduleSource);
    await writeFile(path.join(destination, 'dist/extension.js'), moduleSource);
  }
  assert.equal(await validateAllApps(directory), true);
  await writeFile(path.join(directory, ROLE_APPS[3].packageDirectory, 'extension.js'), `${moduleSource}// stale\n`);
  await assert.rejects(validateAllApps(directory), /openspec-qa\/extension.js is stale/);
});

test('all published packages match their validated single-file distributions', async () => {
  assert.equal(await validateAllApps(root), true);
});
