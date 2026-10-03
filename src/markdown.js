import { Lexer } from 'marked';
import { decodeHTMLStrict } from 'entities';

function safeLink(token) {
  const destination = token.autolink ? token.href : decodeHTMLStrict(token.href);
  // Reject browser URL repairs (relative paths, whitespace, and backslashes).
  if (!/^https?:\/\//i.test(destination) || /[\u0000-\u0020\u007f\\]/.test(destination)) return null;
  try {
    const url = new URL(destination);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname ? url.href : null;
  } catch {
    return null;
  }
}

/** Render Markdown using explicit DOM nodes; document HTML is always inert text. */
export function renderMarkdown(source, doc = document) {
  if (typeof source !== 'string') throw new TypeError('Markdown source must be a string.');

  const text = value => doc.createTextNode(value ?? '');
  const element = (tag, children) => {
    const node = doc.createElement(tag);
    if (children) appendTokens(children, node);
    return node;
  };

  function appendTokens(tokens, parent) {
    for (const token of tokens) {
      switch (token.type) {
        case 'space':
        case 'def':
          break;
        case 'heading': {
          const tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'][token.depth - 1];
          parent.append(tag ? element(tag, token.tokens) : text(token.raw));
          break;
        }
        case 'paragraph':
          parent.append(element('p', token.tokens));
          break;
        case 'blockquote':
          parent.append(element('blockquote', token.tokens));
          break;
        case 'strong':
          parent.append(element('strong', token.tokens));
          break;
        case 'em':
          parent.append(element('em', token.tokens));
          break;
        case 'del':
          parent.append(element('del', token.tokens));
          break;
        case 'text':
          if (token.tokens) appendTokens(token.tokens, parent);
          // Marked decodes some numeric entities already; decode raw text once.
          else parent.append(text(token.escaped ? token.raw : decodeHTMLStrict(token.raw)));
          break;
        case 'escape':
          parent.append(text(token.text));
          break;
        case 'codespan': {
          const code = element('code');
          code.textContent = token.text;
          parent.append(code);
          break;
        }
        case 'code': {
          const pre = element('pre');
          const code = element('code');
          code.textContent = token.text;
          pre.append(code);
          parent.append(pre);
          break;
        }
        case 'hr':
          parent.append(element('hr'));
          break;
        case 'br':
          parent.append(element('br'));
          break;
        case 'list': {
          const list = element(token.ordered ? 'ol' : 'ul');
          if (token.ordered && Number.isSafeInteger(token.start)) list.start = token.start;
          if (token.items.some(item => item.task)) list.className = 'osb-markdown-task-list';
          for (const item of token.items) {
            const li = element('li', item.tokens);
            if (item.task) {
              li.className = 'osb-markdown-task-item';
              const checkbox = li.querySelector('input[type="checkbox"]');
              if (checkbox) checkbox.setAttribute('aria-label', `${item.checked ? 'Completed' : 'Incomplete'} task: ${li.textContent.trim()}`);
            }
            list.append(li);
          }
          parent.append(list);
          break;
        }
        case 'checkbox': {
          const checkbox = element('input');
          checkbox.type = 'checkbox';
          checkbox.disabled = true;
          checkbox.checked = token.checked === true;
          checkbox.setAttribute('aria-label', token.checked ? 'Completed task' : 'Incomplete task');
          parent.append(checkbox, text(' '));
          break;
        }
        case 'table': {
          const wrapper = element('div');
          wrapper.className = 'osb-markdown-table-wrap';
          const table = element('table');
          const head = element('thead');
          const body = element('tbody');
          for (const [rows, tag, section] of [[[token.header], 'th', head], [token.rows, 'td', body]]) {
            for (const cells of rows) {
              const row = element('tr');
              for (const cell of cells) {
                const node = element(tag, cell.tokens);
                if (tag === 'th') node.scope = 'col';
                if (['left', 'center', 'right'].includes(cell.align)) node.style.textAlign = cell.align;
                row.append(node);
              }
              section.append(row);
            }
          }
          table.append(head, body);
          wrapper.append(table);
          parent.append(wrapper);
          break;
        }
        case 'link': {
          const label = doc.createDocumentFragment();
          if (token.autolink) label.append(text(token.text));
          else appendTokens(token.tokens, label);
          const href = safeLink(token);
          if (href) {
            const anchor = element('a');
            anchor.href = href;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.append(label);
            parent.append(anchor);
          } else {
            parent.append(text(label.textContent));
          }
          break;
        }
        case 'image': {
          const label = doc.createDocumentFragment();
          appendTokens(token.tokens, label);
          parent.append(text(label.textContent || '[Image]'));
          break;
        }
        case 'html':
          if (token.block) {
            const literal = element('pre');
            literal.className = 'osb-markdown-literal';
            literal.textContent = token.raw;
            parent.append(literal);
          } else parent.append(text(token.raw));
          break;
        default:
          parent.append(text(token.raw));
      }
    }
  }

  const fragment = doc.createDocumentFragment();
  appendTokens(Lexer.lex(source, { gfm: true, breaks: false }), fragment);
  return fragment;
}
