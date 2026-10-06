import workflowHtml from '../.archify/workflow-role-conversation-20261006/role-workflow.html?raw';
import { createWorkflowDocument, isWorkflowMessage } from './workflow-viewer-bridge.js';

import { ACTIONS, STAGES } from './workflow-actions.js';
const label = stage => ACTIONS.find(action => action.id === stage)?.label;

/** Keep Archify's complete viewer isolated from the Canvas host and its data. */
export function mountWorkflowNavigation({ container, role, onSelect }) {
  const document = container.ownerDocument;
  const window = document.defaultView;
  const config = {
    channel: 'openspec-workflow', version: 1,
    token: window.crypto.randomUUID(), parentOrigin: window.location.origin,
  };
  let disposed = false, ready = false, disabled = false, stage = 'propose', expanded = false;
  const panel = document.createElement('section'); panel.className = 'osb-workflow-navigation';
  panel.setAttribute('aria-label', `${role} automation workflow`);
  const toolbar = document.createElement('div'); toolbar.className = 'osb-workflow-toolbar';
  const title = document.createElement('h2'); title.textContent = 'Automation workflow';
  const expand = document.createElement('button'); expand.type = 'button';
  expand.className = 'osb-button osb-workflow-expand'; expand.textContent = 'Expand canvas';
  const help = document.createElement('p'); help.className = 'osb-muted';
  help.textContent = 'Select a node to choose an automation. Explore with zoom, pan, search and the diagram controls. Only Run starts work.';
  const current = document.createElement('p'); current.className = 'osb-workflow-current';
  current.setAttribute('role', 'status'); current.setAttribute('aria-live', 'polite');
  const viewer = document.createElement('dialog'); viewer.className = 'osb-workflow-viewer';
  viewer.setAttribute('aria-label', `${role} workflow canvas`); viewer.open = true;
  const expandedToolbar = document.createElement('div'); expandedToolbar.className = 'osb-workflow-expanded-toolbar';
  expandedToolbar.hidden = true;
  const expandedTitle = document.createElement('h3'); expandedTitle.textContent = `${role} automation workflow`;
  const collapse = document.createElement('button'); collapse.type = 'button'; collapse.className = 'osb-button'; collapse.textContent = 'Close canvas';
  const frame = document.createElement('iframe'); frame.className = 'osb-workflow-frame';
  frame.title = `${role} interactive Archify workflow`;
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('referrerpolicy', 'no-referrer');
  frame.srcdoc = createWorkflowDocument(workflowHtml, config);

  function publish() {
    if (disposed || !ready) return;
    // Opaque sandbox origins require "*"; the receiver checks our exact origin,
    // source window and per-mount token before accepting this tiny state object.
    frame.contentWindow?.postMessage({ channel: config.channel, version: config.version,
      token: config.token, kind: 'state', stage, disabled }, '*');
  }
  function renderState() {
    current.dataset.stage = stage; current.dataset.disabled = String(disabled);
    current.textContent = `${label(stage)} selected${disabled ? ' — selection locked while submitting' : ''}`;
    publish();
  }
  function closeExpanded() {
    if (!expanded) return;
    expanded = false;
    if (typeof viewer.close === 'function') viewer.close();
    viewer.classList.remove('is-expanded'); viewer.removeAttribute('aria-modal');
    expandedToolbar.hidden = true; viewer.open = true;
    if (!disposed) expand.focus();
  }
  function openExpanded() {
    if (disposed || expanded) return;
    expanded = true;
    viewer.classList.add('is-expanded'); viewer.setAttribute('aria-modal', 'true');
    expandedToolbar.hidden = false;
    // Changing the top layer preserves the iframe's document and camera state.
    if (typeof viewer.showModal === 'function') {
      viewer.close(); viewer.showModal();
    }
    collapse.focus();
  }
  function receive(event) {
    if (disposed || event.source !== frame.contentWindow || event.origin !== 'null' ||
        !isWorkflowMessage(event.data, config, ['ready', 'select', 'collapse'])) return;
    if (event.data.kind === 'ready') { ready = true; publish(); return; }
    if (!ready) return;
    if (event.data.kind === 'collapse') { closeExpanded(); return; }
    if (!disabled) onSelect(event.data.stage);
    // Only the form owns stage changes. A rejected selection restores its state.
    publish();
  }
  window.addEventListener('message', receive);
  expand.addEventListener('click', openExpanded);
  collapse.addEventListener('click', closeExpanded);
  viewer.addEventListener('cancel', event => { event.preventDefault(); closeExpanded(); });
  expandedToolbar.append(expandedTitle, collapse); viewer.append(expandedToolbar, frame);
  toolbar.append(title, expand); panel.append(toolbar, help, current, viewer); container.append(panel);
  renderState();
  return {
    setState(nextStage, state = {}) {
      if (disposed || !STAGES.includes(nextStage)) return false;
      stage = nextStage; disabled = Boolean(state.disabled); renderState(); return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true; ready = false; closeExpanded();
      window.removeEventListener('message', receive); panel.remove();
    },
  };
}
