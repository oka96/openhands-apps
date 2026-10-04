import { build } from "esbuild";
import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KANBAN_APP, ROLE_APPS } from "../src/app-config.js";
import { validateApp, validateAllApps } from "./validate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apps = [KANBAN_APP, ...ROLE_APPS];

for (const app of apps) {
  const packageRoot = path.resolve(root, app.packageDirectory);
  const dist = path.join(packageRoot, "dist");
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  const entry = app === KANBAN_APP ? "src/entries/kanban.js" : path.join(app.packageDirectory, "src/extension.js");
  const result = await build({
    absWorkingDir: root,
    entryPoints: [entry],
    outfile: path.join(dist, "extension.js"),
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    splitting: false,
    sourcemap: false,
    legalComments: "none",
    metafile: true,
    loader: { ".css": "text" },
    plugins: [{
      name: "embedded-raw-source",
      setup(builder) {
        builder.onResolve({ filter: /\?raw$/ }, ({ path: request, resolveDir }) => ({
          path: path.resolve(resolveDir, request.slice(0, -4)),
          namespace: "embedded-raw-source",
        }));
        builder.onLoad({ filter: /.*/, namespace: "embedded-raw-source" }, async ({ path: filename }) => {
          // Server programs are embedded as data, never imported into the browser.
          const encoded = (await readFile(filename)).toString("base64");
          return {
            contents: `export default new TextDecoder().decode(Uint8Array.from(atob(${JSON.stringify(encoded)}), character => character.charCodeAt(0)));`,
            loader: "js",
            watchFiles: [filename],
          };
        });
      },
    }],
  });
  if (Object.keys(result.metafile.outputs).length !== 1) {
    throw new Error(`${app.name} must build to exactly one browser module.`);
  }
  for (const output of Object.values(result.metafile.outputs)) {
    if (output.imports.length !== 0) throw new Error(`${app.name} contains an unresolved import.`);
    if (output.exports.length !== 1 || output.exports[0] !== "activate") {
      throw new Error(`${app.name} must export only activate.`);
    }
  }
  await validateApp(packageRoot, { dist: true, app });
}

// Publish only after every package builds and validates successfully.
for (const app of apps) {
  const packageRoot = path.resolve(root, app.packageDirectory);
  await copyFile(path.join(packageRoot, "dist/extension.js"), path.join(packageRoot, "extension.js"));
}
await validateAllApps(root);
console.log("Built and validated five self-contained Canvas App packages.");
