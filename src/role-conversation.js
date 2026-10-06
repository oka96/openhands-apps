import { callRoleAutomation } from './automation.js';

/** Navigation only: the server resolves the exact selected spec's conversation. */
export function mountRoleConversation({ host, container, context, navigate }) {
  const document = container.ownerDocument;
  const el = (tag, text, className = '') => {
    const node = document.createElement(tag); node.textContent = text; node.className = className; return node;
  };
  let disposed = false, generation = 0;
  const panel = el('section', '', 'osb-conversation-handoff'); panel.setAttribute('aria-label', 'Continue in conversation');
  const status = el('p', '', 'osb-muted'); status.setAttribute('role', 'status');
  const link = el('a', 'Open conversation →', 'osb-button osb-primary');
  const unavailable = el('button', 'Open conversation', 'osb-button'); unavailable.type = 'button'; unavailable.disabled = true;
  const refresh = el('button', 'Refresh conversation', 'osb-button'); refresh.type = 'button';
  const controls = el('div', '', 'osb-run-controls'); controls.append(unavailable, refresh);
  panel.append(el('h3', 'Review, commit & merge'), controls, status);
  container.append(panel);
  link.addEventListener('click', event => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate(link.getAttribute('href'));
  });
  async function reload() {
    const current = ++generation;
    refresh.disabled = true; link.remove(); link.removeAttribute('href'); unavailable.hidden = false;
    status.textContent = 'Finding conversation…';
    try {
      const result = await callRoleAutomation(host, 'conversation', context);
      if (disposed || current !== generation) return;
      const conversation = result.conversation;
      if (conversation) {
        link.href = `/conversations/${conversation.id}?backend=${encodeURIComponent(host.backend.id)}`;
        controls.prepend(link); unavailable.hidden = true;
        status.textContent = `${conversation.stage[0].toUpperCase() + conversation.stage.slice(1)} · ${conversation.status} · ${new Date(conversation.started_at).toLocaleString()}`;
      } else status.textContent = 'No related conversation yet. Run Propose, Update or Apply.';
    } catch (error) {
      if (!disposed && current === generation) status.textContent = `Could not find the conversation. ${error.message || 'Refresh to retry.'}`;
    } finally { if (!disposed && current === generation) refresh.disabled = false; }
  }
  refresh.addEventListener('click', reload);
  reload();
  return { element: panel, refresh: reload, dispose() { disposed = true; ++generation; panel.remove(); } };
}
