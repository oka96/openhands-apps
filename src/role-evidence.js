import { callRoleAutomation } from './automation.js';

const LABELS = { revisions: 'Spec revisions', reviews: 'Reviewed changes', deliveries: 'Delivery receipts' };
const stamp = value => new Date(value).toLocaleString();

/** Render automation records. This component never computes a diff or executes Git. */
export function mountRoleEvidence({ host, container, context, onReviews }) {
  const document = container.ownerDocument;
  const el = (tag, text, className = '') => {
    const node = document.createElement(tag); node.textContent = text; node.className = className; return node;
  };
  let disposed = false, generation = 0, historyGeneration = 0, kind = 'revisions', listing = null;
  const panel = el('section', '', 'osb-evidence'); panel.setAttribute('aria-label', 'Specification revisions and delivery');
  const heading = el('div', '', 'osb-artifact-heading');
  const refresh = el('button', 'Refresh history', 'osb-button'); refresh.type = 'button';
  heading.append(el('h3', 'Specification revisions and delivery'), refresh);
  const tabs = el('div', '', 'osb-artifact-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Evidence type');
  const select = el('select'); select.setAttribute('aria-label', 'Evidence record');
  const status = el('p', '', 'osb-muted'); status.setAttribute('role', 'status');
  const body = el('div', '', 'osb-evidence-body');
  const controls = new Map();
  for (const [key, label] of Object.entries(LABELS)) {
    const button = el('button', label); button.type = 'button';
    button.addEventListener('click', () => { kind = key; renderList(); });
    controls.set(key, button); tabs.append(button);
  }
  panel.append(heading, tabs, select, status, body); container.append(panel);

  async function read() {
    const id = select.value, selectedKind = kind, current = ++generation;
    body.replaceChildren();
    if (!id) return;
    status.textContent = 'Loading selected evidence…';
    try {
      const result = await callRoleAutomation(host, 'record', { ...context, kind: selectedKind, id });
      if (disposed || generation !== current) return;
      const record = result.data;
      status.textContent = `${stamp(record.created_at)} · ${record.stage || record.target || 'Review'}${record.outcome ? ` · ${record.outcome}` : ''}`;
      if (record.repository) body.append(el('p', record.repository, 'osb-muted'));
      if (record.commit) body.append(el('p', `Commit ${record.commit} · ${record.branch}`, 'osb-receipt'));
      if (record.state) body.append(el('p', `Delivery: ${record.state}`));
      if (record.url) {
        const link = el('a', 'Open pull request →', 'osb-run-link');
        link.href = record.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; body.append(link);
      }
      if (record.files?.length === 0) body.append(el('p', 'No changes in this reviewed snapshot.', 'osb-muted'));
      for (const file of record.files || []) {
        const details = el('details', '', 'osb-diff-file'); details.open = true;
        details.append(el('summary', `${file.status} · ${file.path}${file.binary ? ' · binary' : ''}`));
        const pre = el('pre', '', 'osb-diff'); pre.setAttribute('aria-label', `Diff for ${file.path}`);
        for (const line of file.diff.split('\n')) pre.append(el('span', line || ' ', line.startsWith('+') ? 'osb-diff-add' : line.startsWith('-') ? 'osb-diff-remove' : ''));
        details.append(pre); body.append(details);
      }
    } catch (error) { if (!disposed && generation === current) status.textContent = error.message; }
  }
  function renderList() {
    ++generation; body.replaceChildren(); select.replaceChildren();
    for (const [key, button] of controls) button.setAttribute('aria-pressed', String(key === kind));
    for (const row of listing?.[kind] || []) {
      const option = el('option', `${stamp(row.created_at)} · ${row.stage || row.target || 'Review'} · ${row.outcome || row.state || `${row.file_count} files`}`);
      option.value = row.id; select.append(option);
    }
    select.hidden = !select.options.length;
    if (select.options.length) read();
    else status.textContent = kind === 'revisions' ? 'Spec changes appear here after Propose, Update or Apply runs.'
      : kind === 'reviews' ? 'Run Review to capture a spec or code diff before delivery.' : 'Commit and Merge Request receipts appear here.';
  }
  async function reload(preferredKind) {
    const current = ++historyGeneration;
    if (preferredKind && LABELS[preferredKind]) kind = preferredKind;
    refresh.disabled = true; status.textContent = 'Loading history…';
    try {
      const result = await callRoleAutomation(host, 'history', context);
      if (disposed || historyGeneration !== current) return;
      listing = result.data; onReviews?.(listing.reviews); renderList();
    } catch (error) { if (!disposed && historyGeneration === current) status.textContent = error.message; }
    finally { if (!disposed && historyGeneration === current) refresh.disabled = false; }
  }
  refresh.addEventListener('click', () => reload()); select.addEventListener('change', read);
  reload();
  return { refresh: reload, dispose() { disposed = true; ++generation; ++historyGeneration; panel.remove(); } };
}
