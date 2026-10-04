import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { APP_VERSION, KANBAN_APP, ROLE_APPS } from "../src/app-config.js";

const run = promisify(execFile);
const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apps = [KANBAN_APP, ...ROLE_APPS];

export async function validateApp(root = defaultRoot, { dist = false, app } = {}) {
  const manifest = JSON.parse(await readFile(path.join(root, "canvas-extension.json"), "utf8"));
  const expected = app ?? apps.find(item => item.name === manifest.name);
  if (!expected || manifest.schema_version !== 1 || manifest.name !== expected.name
      || manifest.version !== APP_VERSION || manifest.entrypoint !== "extension.js"
      || manifest.display_name !== expected.displayName) {
    throw new Error("Unexpected OpenSpec App manifest metadata.");
  }
  const pages = manifest.contributes?.pages;
  if (!Array.isArray(pages) || pages.length !== 1 || pages[0].id !== expected.pageId
      || pages[0].path !== expected.path || pages[0].title !== expected.displayName
      || pages[0].nav_label !== expected.displayName) {
    throw new Error(`The manifest must declare only the ${expected.displayName} page.`);
  }
  if (dist) {
    const files = await readdir(path.join(root, "dist"), { recursive: true });
    if (files.length !== 1 || files[0] !== manifest.entrypoint) {
      throw new Error("Build output must contain exactly dist/extension.js.");
    }
  }
  const entrypoint = path.join(root, dist ? "dist" : "", manifest.entrypoint);
  const source = await readFile(entrypoint, "utf8");
  if (!source.trim()) throw new Error("The browser module is empty.");
  if (!/\bexport\s*(?:\{[^}]*\bactivate\b[^}]*\}|(?:async\s+)?function\s+activate\b)/m.test(source)) {
    throw new Error("The browser module must export activate.");
  }
  const forbidden = [
    [/(?:^|[;}\n])\s*import\s+(?:[^"'()]*?\s+from\s+)?["'][^"']+["']/m, "external import"],
    [/\bimport\s*\(/, "dynamic import"],
    [/\bexport\s+[^;]*?\sfrom\s*["']/m, "re-exported dependency"],
    [/\b(?:require\s*\(|module\.exports)/, "CommonJS dependency"],
    [/\b(?:process\s*\.|Buffer\s*\.|global\s*\.|__dirname\b|__filename\b)/, "Node-only global"],
    [/sourceMappingURL=/, "source-map reference"],
  ];
  for (const [pattern, description] of forbidden) {
    if (pattern.test(source)) throw new Error(`The browser module contains a ${description}.`);
  }
  const registered = [...source.matchAll(/\.registerPage\s*\(\s*["']([^"']+)["']/g)];
  for (const [, page] of registered) {
    if (page !== expected.pageId) throw new Error(`The browser module registers undeclared page ${page}.`);
  }
  await run(process.execPath, ["--check", entrypoint]);
  return true;
}

export async function validateAllApps(root = defaultRoot) {
  for (const app of apps) {
    const packageRoot = path.resolve(root, app.packageDirectory);
    await validateApp(packageRoot, { app });
    await validateApp(packageRoot, { dist: true, app });
    const [published, built] = await Promise.all([
      readFile(path.join(packageRoot, "extension.js")),
      readFile(path.join(packageRoot, "dist/extension.js")),
    ]);
    if (!published.equals(built)) throw new Error(`${app.name}/extension.js is stale; run npm run build.`);
  }
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await validateAllApps();
    console.log("All five OpenSpec App manifests and browser modules are valid.");
  } catch (error) {
    console.error(`App validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
