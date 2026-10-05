export const APP_VERSION = '0.12.0';
export const DEFAULT_STORE = '/Users/oka/Desktop/openspec-store';
export const KANBAN_APP = Object.freeze({
  name: 'openspec-progress', role: null, short: 'OS', displayName: 'OpenSpec Kanban',
  pageId: 'progress', path: '/progress', packageDirectory: '.',
});
export const ROLE_APPS = Object.freeze([
  ['sa', 'SA', 'SA'], ['fe', 'Frontend', 'FE'], ['be', 'Backend', 'BE'], ['qa', 'QA', 'QA'],
].map(([slug, role, short]) => Object.freeze({
  name: `openspec-${slug}`, role, short, displayName: `${short} Workflow`,
  pageId: 'role', path: '/role', packageDirectory: `apps/openspec-${slug}`,
})));

export function roleApp(role) {
  const app = ROLE_APPS.find(item => item.role === role);
  if (!app) throw new Error('Unknown OpenSpec role.');
  return app;
}

export function storeKey(backendId) {
  return `openhands.apps.openspec-progress:v3:${backendId}:store`;
}
