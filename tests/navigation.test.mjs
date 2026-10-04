import test from 'node:test';
import assert from 'node:assert/strict';
import { KANBAN_APP, ROLE_APPS, roleApp, storeKey } from '../src/app-config.js';
import { encodeWorkspace, decodeWorkspace, appHref, parseAppPath } from '../src/navigation.js';

test('all role links preserve store, requirement and selected change without query or encoded slashes', () => {
  for (const app of ROLE_APPS) {
    const workspace = '/Users/oka/项目 store #?';
    const change = `${app.short}-REQ-003-filter-tasks`;
    const href = appHref(app, workspace, 'REQ-003', change);
    assert.equal(href.includes('?'), false);
    assert.equal(href.includes('%2F'), false);
    assert.deepEqual(parseAppPath(href.slice(`/extensions/${app.name}${app.path}/`.length)), { workspace, requirementId: 'REQ-003', change });
    assert.equal(roleApp(app.role), app);
  }
  assert.throws(() => roleApp('FE'));
  assert.equal(storeKey('default-local'), 'openhands.apps.openspec-progress:v3:default-local:store');
});

test('Kanban return and store-home links retain normalized store and zero-padded requirement IDs', () => {
  const href = appHref(KANBAN_APP, '/Users//oka/store/', 'FEATURE-0002');
  assert.deepEqual(parseAppPath(href.split('/progress/')[1]), { workspace: '/Users/oka/store', requirementId: 'FEATURE-0002', change: '' });
  assert.deepEqual(parseAppPath(`stores/${encodeWorkspace('/')}`), { workspace: '/', requirementId: '', change: '' });
});

test('direct and legacy routes remain explicit', () => {
  assert.deepEqual(parseAppPath(''), { workspace: null, requirementId: '', change: '' });
  assert.equal(parseAppPath('requirements/REQ-003').requirementId, 'REQ-003');
  assert.equal(parseAppPath('changes/FE-REQ-003-filter', { allowLegacyChange: true }).change, 'FE-REQ-003-filter');
  assert.throws(() => parseAppPath('changes/FE-REQ-003-filter'));
});

test('invalid routes and noncanonical or unsafe workspace encodings are rejected', () => {
  for (const workspace of ['relative', '/tmp/../store', '/tmp/.local/store', '/tmp/./store', '/tmp/line\nstore', '/tmp/\\store', '/tmp/\uD800', '/'.repeat(4097)]) {
    assert.throws(() => encodeWorkspace(workspace), workspace);
  }
  for (const token of ['', 'Lw==', 'Lx', '_w', 'Li4', 'L3RtcC8uLi9zdG9yZQ', 'L3RtcC8vc3RvcmU', 'A'.repeat(22001)]) {
    assert.throws(() => decodeWorkspace(token), token.slice(0, 50));
  }
  for (const path of ['stores', 'stores/', '/requirements/REQ-003', 'requirements/req-003', 'requirements/REQ-003/', 'requirements/REQ-003/changes/', 'requirements/REQ-003/nope/change', 'requirements/REQ-003/changes/a%2Fb']) {
    assert.throws(() => parseAppPath(path), path);
  }
  assert.throws(() => appHref(KANBAN_APP, '/', '', 'orphan-change'));
  assert.throws(() => appHref(KANBAN_APP, '/', 'REQ-003/changes/other'));
});
