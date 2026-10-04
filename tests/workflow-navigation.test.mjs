import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { createWorkflowDocument, installWorkflowBridge } from '../src/workflow-viewer-bridge.js';

const bundle = await build({
  entryPoints: [new URL('../src/workflow-navigation.js', import.meta.url).pathname],
  bundle: true, format: 'esm', platform: 'browser', write: false,
  plugins: [{ name: 'raw-workflow', setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: 'raw' }));
    builder.onLoad({ filter: /.*/, namespace: 'raw' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
  } }],
});
const { mountWorkflowNavigation } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const CONFIG = { channel: 'openspec-workflow', version: 1, token: 'unique-test-instance', parentOrigin: 'http://127.0.0.1:8000' };
function message(config, kind, rest = {}) {
  return { channel: config.channel, version: config.version, token: config.token, kind, ...rest };
}
function parentFixture(t) {
  const dom = new JSDOM('<main></main>', { url: CONFIG.parentOrigin });
  t.after(() => dom.window.close());
  const selected = [];
  const controller = mountWorkflowNavigation({ container: dom.window.document.querySelector('main'), role: 'SA',
    onSelect(stage) { selected.push(stage); controller.setState(stage); } });
  const frame = dom.window.document.querySelector('iframe');
  const config = JSON.parse(frame.srcdoc.match(/<script id="openspec-workflow-config" type="application\/json">([^<]*)<\/script>/)[1]);
  const outbound = []; frame.contentWindow.postMessage = (...args) => outbound.push(args);
  function receive(kind, rest = {}, overrides = {}) {
    dom.window.dispatchEvent(new dom.window.MessageEvent('message', {
      source: frame.contentWindow, origin: 'null', data: message(config, kind, rest), ...overrides,
    }));
  }
  return { dom, controller, frame, config, selected, outbound, receive };
}

test('isolated viewer retains native runtime, its controls and canonical standalone input', t => {
  const { frame } = parentFixture(t);
  assert.equal(frame.getAttribute('sandbox'), 'allow-scripts');
  assert.equal(frame.getAttribute('referrerpolicy'), 'no-referrer');
  assert.match(frame.srcdoc, /<head><meta http-equiv="Content-Security-Policy"/);
  assert.match(frame.srcdoc, /default-src 'none'.*connect-src 'none'/);
  assert.match(frame.srcdoc, /<html data-present="true"/);
  assert.doesNotMatch(frame.srcdoc.slice(0, frame.srcdoc.indexOf('<head>')), /data-embed/);
  for (const id of ['btn-node-finder', 'btn-present', 'btn-export', 'btn-overview-map', 'btn-semantic-lens']) {
    assert.ok(frame.srcdoc.includes(`id="${id}"`), `Retain native ${id}`);
  }
  for (const view of ['in', 'out', 'reset']) assert.ok(frame.srcdoc.includes(`data-view="${view}"`));
  assert.match(frame.srcdoc, /Archify\.routeProbe =/);
  assert.match(frame.srcdoc, /Archify\.view =/);
  assert.match(frame.srcdoc, /data-node-id="action-update"/);
  const original = '<!doctype html><html lang="en"><head></head><body>checked</body></html>';
  const derived = createWorkflowDocument(original, CONFIG);
  assert.equal(original, '<!doctype html><html lang="en"><head></head><body>checked</body></html>');
  assert.match(derived, /checked<script id="openspec-workflow-config"/);
});

test('ready handshake publishes the form state without selecting or sharing form data', t => {
  const app = parentFixture(t);
  app.controller.setState('apply');
  app.receive('select', { stage: 'update' });
  assert.deepEqual(app.selected, []);
  assert.deepEqual(app.outbound, []);
  app.receive('ready');
  assert.deepEqual(app.selected, []);
  assert.deepEqual(app.outbound, [[message(app.config, 'state', { stage: 'apply', disabled: false }), '*']]);
  app.receive('select', { stage: 'update' });
  assert.deepEqual(app.selected, ['update']);
  assert.equal(app.dom.window.document.querySelector('.osb-workflow-current').dataset.stage, 'update');
});

test('parent rejects spoofed, malformed, foreign-origin and foreign-instance messages', t => {
  const app = parentFixture(t);
  app.receive('ready');
  const valid = message(app.config, 'select', { stage: 'update' });
  for (const overrides of [
    { source: app.dom.window }, { origin: CONFIG.parentOrigin }, { origin: '' },
    { data: { ...valid, token: 'another-instance' } }, { data: { ...valid, version: 2 } },
    { data: { ...valid, stage: 'run' } }, { data: { ...valid, prompt: 'untrusted' } },
    { data: { ...valid, kind: 'dispatch' } }, { data: null }, { data: [] },
  ]) app.receive('select', {}, overrides);
  assert.deepEqual(app.selected, []);
  const before = app.outbound.length;
  app.receive('ready', { stage: 'apply' });
  assert.equal(app.outbound.length, before, 'ready also requires an exact envelope');
});

test('dispatch lock, rejected selections and disposal preserve authoritative form state', t => {
  const app = parentFixture(t);
  app.receive('ready'); app.controller.setState('apply', { disabled: true });
  app.receive('select', { stage: 'update' });
  assert.deepEqual(app.selected, []);
  assert.deepEqual(app.outbound.at(-1)[0], message(app.config, 'state', { stage: 'apply', disabled: true }));
  assert.equal(app.controller.setState('unknown'), false);
  app.controller.setState('apply', { disabled: false }); app.controller.dispose();
  app.receive('select', { stage: 'update' }); app.receive('ready');
  assert.deepEqual(app.selected, []);
  assert.equal(app.controller.setState('propose'), false);
  assert.equal(app.dom.window.document.querySelector('iframe'), null);
  app.controller.dispose();
});

test('expanding and closing keep the same viewer document and restore focus', t => {
  const app = parentFixture(t); app.receive('ready');
  const document = app.dom.window.document;
  const expand = document.querySelector('.osb-workflow-expand');
  const dialog = document.querySelector('dialog');
  const srcdoc = app.frame.srcdoc;
  let modalCalls = 0;
  dialog.close = () => { dialog.open = false; };
  dialog.showModal = () => { dialog.open = true; modalCalls++; };
  expand.click();
  assert.equal(modalCalls, 1); assert.equal(dialog.getAttribute('aria-modal'), 'true');
  assert.equal(document.querySelector('iframe'), app.frame);
  app.receive('collapse');
  assert.equal(dialog.getAttribute('aria-modal'), null); assert.equal(dialog.open, true);
  assert.equal(document.activeElement, expand);
  assert.equal(app.frame.srcdoc, srcdoc);
  assert.deepEqual(app.selected, []);
  expand.click(); dialog.dispatchEvent(new app.dom.window.Event('cancel', { cancelable: true }));
  assert.equal(dialog.classList.contains('is-expanded'), false);
});

function childFixture(t) {
  const dom = new JSDOM(`<!doctype html><html data-theme="light"><body>
    <script id="openspec-workflow-config" type="application/json">${JSON.stringify(CONFIG)}</script>
    <div class="diagram-container"><svg>${['propose', 'update', 'apply'].map(stage =>
      `<g tabindex="0" aria-pressed="false" data-node-id="action-${stage}"><rect/></g>`).join('')}</svg></div>
    <button id="finder-result" data-node-id="action-update">Finder result</button>
    <button id="btn-zoom-in">Zoom in</button><button id="btn-focus-copy">Copy link</button>
    <button data-action="copy">Copy image</button>
    </body></html>`, { url: 'about:blank', runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const { window } = dom; const { document } = window;
  const sent = []; window.postMessage = (...args) => sent.push(args);
  window.Archify = { view: {}, theme: { toggle() { throw Error('Already light'); } } };
  const svg = document.querySelector('svg');
  // Native focus has already registered and prevents keyboard defaults.
  svg.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); event.target.setAttribute('aria-pressed', 'true');
    }
  });
  svg.addEventListener('click', event => {
    if (document.documentElement.dataset.preventClick) event.preventDefault();
  });
  // Native Route Probe consumes selection in capture, before any focus/bridge.
  svg.addEventListener('click', event => {
    if (svg.hasAttribute('data-route-picking')) {
      event.preventDefault(); event.stopImmediatePropagation(); svg.removeAttribute('data-route-picking');
    }
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.documentElement.dataset.inspection) event.preventDefault();
  });
  window.eval(`(${installWorkflowBridge.toString()})();`);
  function state(stage = 'propose', disabled = false, overrides = {}) {
    window.dispatchEvent(new window.MessageEvent('message', { source: window.parent, origin: CONFIG.parentOrigin,
      data: message(CONFIG, 'state', { stage, disabled }), ...overrides }));
  }
  function activate(stage, key = null, repeat = false) {
    const node = svg.querySelector(`[data-node-id="action-${stage}"]`);
    node.dispatchEvent(key ? new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, key, repeat })
      : new window.MouseEvent('click', { bubbles: true, cancelable: true }));
  }
  return { window, document, svg, sent, state, activate };
}

test('child accepts only exact parent state and keeps automation selection separate from native focus', t => {
  const app = childFixture(t);
  assert.deepEqual(JSON.parse(JSON.stringify(app.sent)), [[message(CONFIG, 'ready'), CONFIG.parentOrigin]]);
  app.activate('update'); assert.equal(app.sent.length, 1, 'locked until parent state arrives');
  for (const overrides of [
    { origin: 'null' }, { source: null },
    { data: message(CONFIG, 'state', { stage: 'update', disabled: false, target: 'REQ-999' }) },
    { data: message({ ...CONFIG, token: 'stale' }, 'state', { stage: 'update', disabled: false }) },
    { data: message(CONFIG, 'state', { stage: 'update', disabled: 'false' }) },
  ]) app.state('update', false, overrides);
  app.activate('update'); assert.equal(app.sent.length, 1);
  app.state('apply');
  const apply = app.svg.querySelector('[data-node-id="action-apply"]');
  assert.equal(app.document.documentElement.dataset.automationSelected, 'apply');
  assert.equal(apply.getAttribute('aria-pressed'), 'false');
  assert.equal(app.svg.querySelector('[aria-current], [aria-describedby], [data-automation-selected]'), null,
    'canonical SVG has no host-only state or dangling accessible description');
  app.activate('update', 'Enter');
  assert.equal(app.sent.at(-1)[0].stage, 'update');
  assert.equal(app.document.documentElement.dataset.automationSelected, 'apply', 'selection waits for form confirmation');
  app.state('update');
  assert.equal(app.document.documentElement.dataset.automationSelected, 'update');
  assert.equal(app.svg.querySelector('[data-node-id="action-update"]').getAttribute('aria-pressed'), 'true');
});

test('only direct click and first Enter/Space select; pan, route, finder and controls do not', t => {
  const app = childFixture(t); app.state();
  app.activate('update'); app.activate('apply', ' ');
  assert.deepEqual(app.sent.slice(1).map(([data]) => data.stage), ['update', 'apply']);
  const before = app.sent.length;
  app.activate('apply', ' ', true); app.activate('update', 'ArrowDown');
  app.document.documentElement.dataset.preventClick = 'true'; app.activate('update');
  delete app.document.documentElement.dataset.preventClick;
  app.svg.setAttribute('data-route-picking', 'target'); app.activate('update');
  assert.equal(app.svg.hasAttribute('data-route-picking'), false, 'native route consumed activation');
  app.document.querySelector('.diagram-container').setAttribute('data-just-panned', 'true'); app.activate('update');
  app.document.querySelector('.diagram-container').removeAttribute('data-just-panned');
  app.document.querySelector('#finder-result').click(); app.document.querySelector('#btn-zoom-in').click();
  app.state('propose', true); app.activate('update');
  assert.equal(app.sent.length, before);
  assert.equal(app.document.querySelector('#btn-focus-copy').disabled, true);
  assert.equal(app.document.querySelector('[data-action="copy"]').disabled, true);
});

test('Escape closes the expanded host only after native inspection has handled its own state', t => {
  const app = childFixture(t); app.state();
  app.document.documentElement.dataset.inspection = 'focus';
  app.document.dispatchEvent(new app.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert.equal(app.sent.length, 1);
  delete app.document.documentElement.dataset.inspection;
  app.document.dispatchEvent(new app.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert.equal(app.sent.at(-1)[0].kind, 'collapse');
});
