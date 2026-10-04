import { activateRoleApp } from '../../../src/extension.js';

export function activate(host) {
  return activateRoleApp(host, 'SA');
}
