import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const source = new URL('../../openhands-automation/runtime/actions.json', import.meta.url);
const target = new URL('../src/workflow-actions.js', import.meta.url);
const actions = JSON.parse(await readFile(source, 'utf8'));
const generated = '// Generated from openhands-automation/runtime/actions.json; presentation metadata only.\n'
  + `export const ACTIONS = Object.freeze(${JSON.stringify(actions, null, 2)});\n`
  + 'export const STAGES = ACTIONS.map(action => action.id);\n';
if (process.argv.includes('--check')) assert.equal(await readFile(target, 'utf8'), generated, 'Rebuild the app action catalog from Automation.');
else await writeFile(target, generated);
