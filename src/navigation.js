import { KANBAN_APP, ROLE_APPS } from './app-config.js';
import { validateWorkspace } from './workspace.js';

const REQUIREMENT = /^[A-Z][A-Z0-9]*-[0-9]+$/;
const CHANGE = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });
function invalid() { throw new Error('This workspace link is invalid.'); }
function validId(value, pattern) { return typeof value === 'string' && value.length <= 160 && pattern.test(value); }

export function encodeWorkspace(workspace) {
  const value = validateWorkspace(workspace);
  const bytes = encoder.encode(value);
  if (decoder.decode(bytes) !== value) invalid();
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeWorkspace(token) {
  if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{1,22000}$/.test(token)) invalid();
  try {
    const binary = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
    const value = decoder.decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
    if (encodeWorkspace(value) !== token) invalid();
    return value;
  } catch { invalid(); }
}

export function appHref(app, workspace, requirementId = '', change = '') {
  if (![KANBAN_APP, ...ROLE_APPS].includes(app)
    || (requirementId && !validId(requirementId, REQUIREMENT))
    || (change && (!requirementId || !validId(change, CHANGE)))) invalid();
  return `/extensions/${app.name}${app.path}/stores/${encodeWorkspace(workspace)}`
    + (requirementId ? `/requirements/${requirementId}` : '')
    + (change ? `/changes/${change}` : '');
}

export function parseAppPath(path = '', { allowLegacyChange = false } = {}) {
  if (typeof path !== 'string') invalid();
  const parts = path ? path.split('/') : [];
  let workspace = null, requirementId = '', change = '';
  if (parts[0] === 'stores') {
    parts.shift(); workspace = decodeWorkspace(parts.shift());
  }
  if (parts.length === 2 && parts[0] === 'changes' && allowLegacyChange) {
    change = parts[1];
    if (!validId(change, CHANGE)) invalid();
  } else if (parts.length) {
    if (![2, 4].includes(parts.length) || parts[0] !== 'requirements' || !validId(parts[1], REQUIREMENT)) invalid();
    requirementId = parts[1];
    if (parts.length === 4) {
      if (parts[2] !== 'changes' || !validId(parts[3], CHANGE)) invalid();
      change = parts[3];
    }
  }
  return { workspace, requirementId, change };
}
