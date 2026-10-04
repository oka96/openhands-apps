import { createHash, randomUUID } from 'node:crypto';
import { chmod, lstat, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { KANBAN_APP, ROLE_APPS } from '../src/app-config.js';

const VERSION = '1.24.0';
const MARKER = '/* OpenSpec native navigation v1 */';
const BACKUP = '.openspec-navigation-backup-v1.json';
const LOCK = '.openspec-navigation.lock';
const ICONS = [
  [['rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }], ['path', { d: 'M9 3v18M15 3v18M5.5 7h1M11.5 7h1M17.5 7h1' }]],
  [['rect', { x: 9, y: 2, width: 6, height: 6, rx: 1 }], ['rect', { x: 2, y: 16, width: 6, height: 6, rx: 1 }], ['rect', { x: 16, y: 16, width: 6, height: 6, rx: 1 }], ['path', { d: 'M12 8v4M5 16v-4h14v4' }]],
  [['rect', { x: 2, y: 3, width: 20, height: 18, rx: 2 }], ['path', { d: 'M2 8h20M6 5.5h.01M9 5.5h.01m-2 7 3 3-3 3m6 0h4' }]],
  [['ellipse', { cx: 12, cy: 5, rx: 9, ry: 3 }], ['path', { d: 'M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3' }]],
  [['path', { d: 'M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6l-9-4Z' }], ['path', { d: 'm8 12 3 3 5-6' }]],
];
export const NAVIGATION = Object.freeze(Object.fromEntries([KANBAN_APP, ...ROLE_APPS].map((app, rank) => [app.name, {
  rank, pageId: app.pageId, path: app.path, href: `/extensions/${app.name}${app.path}`, icon: ICONS[rank],
}])));

// These functions are embedded unchanged in the host modules. They only depend
// on the explicit mapping above; all React elements still belong to Canvas.
export function openSpecPage(page) {
  const item = Object.hasOwn(NAVIGATION, page?.extension?.name) ? NAVIGATION[page.extension.name] : null;
  return item && page.contribution?.id === item.pageId && page.href === item.href
    && [item.path, item.path.slice(1)].includes(page.contribution?.path) ? item : null;
}
export function orderOpenSpecPages(pages) {
  const selected = pages.filter(page => openSpecPage(page)).sort((a, b) => openSpecPage(a).rank - openSpecPage(b).rank);
  let index = 0;
  return pages.map(page => openSpecPage(page) ? selected[index++] : page);
}
export function openSpecIcon(page, jsx, fallback, size) {
  const item = openSpecPage(page);
  if (!item) return fallback;
  return jsx('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: false, 'data-openspec-icon': page.extension.name,
    children: item.icon.map(([tag, attributes], index) => jsx(tag, attributes, index)),
  });
}

const PREFIX = '__openSpecNativeNavigationV1';
function embeddedHelpers() {
  const source = `const NAVIGATION = ${JSON.stringify(NAVIGATION)};\n${openSpecPage}\n${orderOpenSpecPages}\n${openSpecIcon}`;
  return `${MARKER}\n${source.replace(/\b(NAVIGATION|openSpecPage|orderOpenSpecPages|openSpecIcon)\b/g, name => `${PREFIX}_${name}`)}\n`;
}
const SORT = `${PREFIX}_orderOpenSpecPages`;
const ICON = `${PREFIX}_openSpecIcon`;
export const MODULE_TARGETS = Object.freeze([
  {
    file: 'build/assets/root-layout-BLAC4seH.js',
    before: 'x.map(t=>(0,Y.jsx)(An,{to:t.href,label:t.contribution.nav_label||t.contribution.title,testId:`sidebar-canvas-extension-${t.extension.name}-${t.contribution.id}`,collapsed:e,icon:(0,Y.jsx)(vt,{width:$,height:$})},`${t.extension.name}:${t.contribution.id}`))',
    after: `${SORT}(x).map(t=>(0,Y.jsx)(An,{to:t.href,label:t.contribution.nav_label||t.contribution.title,testId:\`sidebar-canvas-extension-\${t.extension.name}-\${t.contribution.id}\`,collapsed:e,icon:${ICON}(t,Y.jsx,(0,Y.jsx)(vt,{width:$,height:$}),$)},\`\${t.extension.name}:\${t.contribution.id}\`))`,
  },
  {
    file: 'dist/components/features/sidebar/sidebar-rail-body.js',
    before: "pe.map((e) => /* @__PURE__ */ k(x, {\n\t\t\t\t\t\tto: e.href,\n\t\t\t\t\t\tlabel: e.contribution.nav_label || e.contribution.title,\n\t\t\t\t\t\ttestId: `sidebar-canvas-extension-${e.extension.name}-${e.contribution.id}`,\n\t\t\t\t\t\tcollapsed: P,\n\t\t\t\t\t\ticon: /* @__PURE__ */ k(i, {\n\t\t\t\t\t\t\twidth: j,\n\t\t\t\t\t\t\theight: j\n\t\t\t\t\t\t})\n\t\t\t\t\t}, `${e.extension.name}:${e.contribution.id}`))",
    after: `${SORT}(pe).map((e) => k(x, {\n\t\t\t\t\t\t\tto: e.href,\n\t\t\t\t\t\t\tlabel: e.contribution.nav_label || e.contribution.title,\n\t\t\t\t\t\t\ttestId: \`sidebar-canvas-extension-\${e.extension.name}-\${e.contribution.id}\`,\n\t\t\t\t\t\t\tcollapsed: P,\n\t\t\t\t\t\t\ticon: ${ICON}(e, k, k(i, { width: j, height: j }), j)\n\t\t\t\t\t\t}, \`\${e.extension.name}:\${e.contribution.id}\`))`,
  },
  {
    file: 'dist/components/features/sidebar/sidebar-rail-body.cjs',
    before: 'K.map(t=>(0,w.jsx)(p.SidebarNavLink,{to:t.href,label:t.contribution.nav_label||t.contribution.title,testId:`sidebar-canvas-extension-${t.extension.name}-${t.contribution.id}`,collapsed:e,icon:(0,w.jsx)(i.PanelsTopLeft,{width:T,height:T})},`${t.extension.name}:${t.contribution.id}`))',
    after: `${SORT}(K).map(t=>(0,w.jsx)(p.SidebarNavLink,{to:t.href,label:t.contribution.nav_label||t.contribution.title,testId:\`sidebar-canvas-extension-\${t.extension.name}-\${t.contribution.id}\`,collapsed:e,icon:${ICON}(t,w.jsx,(0,w.jsx)(i.PanelsTopLeft,{width:T,height:T}),T)},\`\${t.extension.name}:\${t.contribution.id}\`))`,
  },
]);

const MANIFEST_FILE = 'build/assets/manifest-e1e4878e.js';
const MANIFEST_URL = '/assets/manifest-e1e4878e.js';
const ROOT_URL = '/assets/root-layout-BLAC4seH.js';
export const TARGETS = Object.freeze([...MODULE_TARGETS, { file: MANIFEST_FILE }, { file: 'build/index.html' }]);
function incompatible(filename) { throw new Error(`Unsupported Canvas sidebar structure: ${filename}. No files were changed.`); }
function replaceExact(source, before, after, filename, count = 1) {
  if (source.split(before).length !== count + 1) incompatible(filename);
  return source.replaceAll(before, after);
}

export function patchSource(filename, source, { revision } = {}) {
  if (filename === MANIFEST_FILE || filename === 'build/index.html') {
    if (!/^[0-9a-f]{12}$/.test(revision || '')) incompatible(filename);
    const suffix = `?openspec-nav=${revision}`;
    if (filename === 'build/index.html') {
      // Both preload and executing import must use the same fresh manifest.
      if (source.split(MANIFEST_URL).length !== 3) incompatible(filename);
      source = replaceExact(source, `href="${MANIFEST_URL}"`, `href="${MANIFEST_URL}${suffix}"`, filename);
      return replaceExact(source, `import "${MANIFEST_URL}";`, `import "${MANIFEST_URL}${suffix}";`, filename);
    }
    const prefix = 'window.__reactRouterManifest=';
    if (!source.startsWith(prefix)) incompatible(filename);
    let manifest;
    try { manifest = JSON.parse(source.slice(prefix.length).trim().replace(/;$/, '')); } catch { incompatible(filename); }
    if (manifest?.url !== MANIFEST_URL || manifest.version !== 'e1e4878e' || manifest.routes?.['routes/root-layout']?.module !== ROOT_URL) incompatible(filename);
    source = replaceExact(source, JSON.stringify(ROOT_URL), JSON.stringify(ROOT_URL + suffix), filename);
    source = replaceExact(source, JSON.stringify(MANIFEST_URL), JSON.stringify(MANIFEST_URL + suffix), filename);
    return replaceExact(source, '"version":"e1e4878e"', `"version":"e1e4878e-openspec-${revision}"`, filename);
  }
  const target = MODULE_TARGETS.find(item => item.file === filename);
  if (!target || source.includes(MARKER)) incompatible(filename);
  return embeddedHelpers() + replaceExact(source, target.before, target.after, filename).replace(/^\/\/# sourceMappingURL=.*$/gm, '');
}

function hash(content) { return createHash('sha256').update(content).digest('hex'); }
async function readPlainFile(root, relative) {
  const parts = relative.split('/'); let current = root;
  for (let index = 0; index < parts.length; index++) {
    current = path.join(current, parts[index]); const info = await lstat(current);
    if (info.isSymbolicLink() || (index === parts.length - 1 ? !info.isFile() : !info.isDirectory())) throw new Error(`Expected an ordinary Canvas package file: ${relative}`);
  }
  const info = await lstat(current);
  return { content: await readFile(current, 'utf8'), mode: info.mode & 0o777 };
}
async function readBackup(root) {
  try { return JSON.parse((await readPlainFile(root, BACKUP)).content); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
function validateBackup(backup) {
  if (backup?.version !== 1 || backup.packageVersion !== VERSION || !Array.isArray(backup.files) || backup.files.length !== TARGETS.length) throw new Error('Invalid Canvas navigation backup. No files were changed.');
  let revision;
  for (const [index, item] of backup.files.entries()) {
    if (item.file !== TARGETS[index].file || typeof item.original !== 'string' || hash(item.original) !== item.originalHash
      || !Number.isInteger(item.mode) || item.mode < 0 || item.mode > 0o777) {
      throw new Error('Canvas navigation backup does not match this customization. No files were changed.');
    }
    const patched = patchSource(item.file, item.original, { revision });
    if (hash(patched) !== item.patchedHash) throw new Error('Canvas navigation backup does not match this customization. No files were changed.');
    if (index === 0) revision = hash(patched).slice(0, 12);
  }
}
async function replaceFiles(root, files) {
  const staged = [], replaced = [];
  try {
    for (const file of files) {
      const temporary = path.join(root, `${file.file}.openspec-${randomUUID()}.tmp`);
      staged.push({ ...file, temporary });
      await writeFile(temporary, file.next, { flag: 'wx', mode: file.nextMode });
      await chmod(temporary, file.nextMode);
    }
    for (const file of staged) { await rename(file.temporary, path.join(root, file.file)); replaced.push(file); }
  } catch (error) {
    for (const file of replaced.reverse()) {
      const temporary = path.join(root, `${file.file}.openspec-rollback-${randomUUID()}.tmp`);
      await writeFile(temporary, file.content, { flag: 'wx', mode: file.mode });
      await chmod(temporary, file.mode);
      await rename(temporary, path.join(root, file.file));
    }
    throw error;
  } finally { await Promise.all(staged.map(file => rm(file.temporary, { force: true }))); }
}

export async function customizeCanvasNavigation(packageDirectory, { restore = false, dryRun = false } = {}) {
  if (typeof packageDirectory !== 'string' || !packageDirectory) throw new Error('Pass the installed @openhands/agent-canvas package directory.');
  const root = path.resolve(packageDirectory);
  const manifest = JSON.parse((await readPlainFile(root, 'package.json')).content);
  if (manifest.name !== '@openhands/agent-canvas' || manifest.version !== VERSION) throw new Error(`Only @openhands/agent-canvas ${VERSION} is supported. No files were changed.`);
  const backup = await readBackup(root);
  if (backup) validateBackup(backup);
  const files = []; let revision;
  for (const [index, target] of TARGETS.entries()) {
    const current = await readPlainFile(root, target.file);
    const original = backup ? backup.files[index].original : current.content;
    const patched = patchSource(target.file, original, { revision });
    if (index === 0) revision = hash(patched).slice(0, 12);
    if (backup && ![original, patched].includes(current.content)) throw new Error(`Canvas file changed after customization: ${target.file}. Refusing to overwrite it.`);
    files.push({ file: target.file, ...current, original, patched, next: restore ? original : patched,
      nextMode: restore && backup ? backup.files[index].mode : current.mode });
  }
  if (restore && !backup) return { status: 'original', files: [] };
  const changes = files.filter(file => file.next !== file.content || file.nextMode !== file.mode);
  if (dryRun) return { status: changes.length ? (restore ? 'would restore' : 'would apply') : (restore ? 'original' : 'already applied'), files: changes.map(file => file.file), revision };
  if (!changes.length && !restore) return { status: 'already applied', files: [] };
  const lock = path.join(root, LOCK);
  await mkdir(lock);
  try {
    // Recheck after acquiring the lock; another operation may have finished
    // between preflight and locking. Never overwrite a concurrently edited file.
    for (const file of files) {
      const current = await readPlainFile(root, file.file);
      if (current.content !== file.content || current.mode !== file.mode) throw new Error(`Canvas file changed during preflight: ${file.file}`);
    }
    const latestBackup = await readBackup(root);
    if (JSON.stringify(latestBackup) !== JSON.stringify(backup)) throw new Error('Canvas navigation backup changed during preflight. Retry the command.');
    if (!backup) {
      const saved = { version: 1, packageVersion: VERSION, files: files.map(file => ({
        file: file.file, mode: file.mode, original: file.original, originalHash: hash(file.original), patchedHash: hash(file.patched),
      })) };
      const temporary = path.join(root, `${BACKUP}.${randomUUID()}.tmp`);
      try {
        await writeFile(temporary, JSON.stringify(saved), { flag: 'wx', mode: 0o600 });
        await rename(temporary, path.join(root, BACKUP));
      } finally { await rm(temporary, { force: true }); }
    }
    await replaceFiles(root, changes);
    if (restore) await rm(path.join(root, BACKUP));
    return { status: restore ? 'restored' : 'applied', files: changes.map(file => file.file), revision };
  } finally { await rm(lock, { recursive: true }); }
}
