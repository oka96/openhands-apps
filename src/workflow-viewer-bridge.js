const STAGES = ['propose', 'update', 'apply'];

/** Strict protocol: no target, prompt, arbitrary command or nested payload. */
export function isWorkflowMessage(data, config, kinds) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || !kinds.includes(data.kind) ||
      data.channel !== config.channel || data.version !== config.version || data.token !== config.token) return false;
  const keys = ['channel', 'version', 'token', 'kind'];
  if (data.kind === 'select' || data.kind === 'state') {
    keys.push('stage');
    if (!STAGES.includes(data.stage)) return false;
  }
  if (data.kind === 'state') {
    keys.push('disabled');
    if (typeof data.disabled !== 'boolean') return false;
  }
  return Object.keys(data).length === keys.length && keys.every(key => Object.hasOwn(data, key));
}

// Serialized into the trusted document after Archify's own initialization.
// Keep this function self-contained: it runs in an opaque, isolated frame.
export function installWorkflowBridge() {
  const config = JSON.parse(document.getElementById('openspec-workflow-config').textContent);
  const stages = ['propose', 'update', 'apply'];
  const canvas = document.querySelector('.diagram-container');
  const svg = canvas?.querySelector(':scope > svg');
  if (!svg || !window.Archify?.view) return;
  const nodes = stages.map(stage => svg.querySelector(`[data-node-id="action-${stage}"]`));
  if (nodes.some(node => !node)) return;
  // The native artifact labels the entire SVG as one image; the app makes its
  // existing keyboard-operable node buttons available to assistive technology.
  svg.setAttribute('role', 'group');
  if (document.documentElement.getAttribute('data-theme') !== 'light') window.Archify.theme.toggle();
  let disabled = true;
  const current = document.createElement('p'); current.id = 'openspec-workflow-current';
  current.className = 'openspec-workflow-sr'; current.setAttribute('role', 'status');
  document.body.append(current);
  function send(kind, stage) {
    const data = { channel: config.channel, version: config.version, token: config.token, kind };
    if (stage) data.stage = stage;
    window.parent.postMessage(data, config.parentOrigin);
  }
  function select(event) {
    if (disabled || canvas.getAttribute('data-just-panned') === 'true' || svg.hasAttribute('data-route-picking')) return;
    if (event.type === 'click' && event.defaultPrevented) return;
    if (event.type === 'keydown' && (event.repeat || (event.key !== 'Enter' && event.key !== ' '))) return;
    const node = event.target.closest?.('[data-node-id]');
    const index = nodes.indexOf(node);
    if (index < 0) return;
    // Native keyboard focus calls preventDefault. It is still a direct action;
    // Route Probe instead intercepts in capture and never reaches this handler.
    if (event.type === 'keydown') event.preventDefault();
    send('select', stages[index]);
  }
  svg.addEventListener('click', select);
  svg.addEventListener('keydown', select);
  // Export is not part of the embedded workflow, including the guide shortcut.
  document.addEventListener('keydown', event => {
    if (!['e', 'E'].includes(event.key) || event.metaKey || event.ctrlKey || event.altKey ||
        event.target?.closest?.('input, textarea, [contenteditable]:not([contenteditable="false"])')) return;
    event.preventDefault(); event.stopImmediatePropagation();
  }, true);
  document.querySelectorAll('.diagram-guide-shortcuts > span').forEach(hint => {
    if (hint.querySelector('kbd')?.textContent.trim() === 'E') hint.remove();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.defaultPrevented) send('collapse');
  });
  window.addEventListener('message', event => {
    const data = event.data;
    if (event.source !== window.parent || event.origin !== config.parentOrigin || !data ||
        typeof data !== 'object' || Array.isArray(data) || Object.keys(data).length !== 6 ||
        !['channel', 'version', 'token', 'kind', 'stage', 'disabled'].every(key => Object.hasOwn(data, key)) ||
        data.channel !== config.channel || data.version !== config.version || data.token !== config.token ||
        data.kind !== 'state' || !stages.includes(data.stage) || typeof data.disabled !== 'boolean') return;
    disabled = data.disabled;
    // Keep app selection outside the canonical SVG. Its visible HTML status and
    // this live announcement are distinct from Archify's aria-pressed focus.
    document.documentElement.dataset.automationSelected = data.stage;
    current.textContent = `Current automation: ${data.stage}. ${disabled ? 'Automation selection is locked while submitting. Diagram inspection remains available.' : 'Activate a node to select its automation; use Run in the form to start work.'}`;
  });
  // These native actions produce about:srcdoc links or require clipboard access.
  // These actions remain unavailable in the embedded workflow.
  document.querySelectorAll('#btn-focus-copy, #route-probe-copy, #semantic-lens-copy, button[data-action="copy"]').forEach(button => {
    button.disabled = true;
    button.title = 'Clipboard and share links are unavailable in this embedded canvas.';
  });
  send('ready');
}

/** Derive the app view without modifying Archify's checked standalone HTML. */
export function createWorkflowDocument(html, config) {
  const csp = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data: blob:; font-src data:; connect-src \'none\'; base-uri \'none\'; form-action \'none\'">';
  const encoded = JSON.stringify(config).replaceAll('<', '\\u003c');
  const bridge = `<script id="openspec-workflow-config" type="application/json">${encoded}</script><script>(${installWorkflowBridge.toString()})();</script>`;
  // The selection highlight is scoped to the HTML viewer. Archify's canonical
  // export stylesheet collector intentionally excludes this host-only selector.
  const selectionSelectors = STAGES.map(stage => `html[data-automation-selected="${stage}"] body .diagram-container [data-node-id="action-${stage}"] > rect:not(.c-mask)`).join(', ');
  const styles = `<style>
    ${selectionSelectors} { stroke-width: 3; }
    /* Role automation details already live in the adjacent form. */
    html body #focus-chip { display: none !important; }
    html body #btn-export, html body #export-menu { display: none !important; }
    html body .openspec-workflow-sr { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  </style>`;
  return html.replace('<head>', `<head>${csp}`)
    .replace('<html ', '<html data-present="true" ')
    .replace('</head>', `${styles}</head>`)
    .replace('</body>', `${bridge}</body>`);
}
