import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { Lexer } from 'marked';
import { renderMarkdown } from '../src/markdown.js';

function preview(source) {
  const dom = new JSDOM('<!doctype html><main></main>', { url: 'https://canvas.example/' });
  const root = dom.window.document.querySelector('main');
  root.append(renderMarkdown(source, dom.window.document));
  return root;
}

test('formats headings, emphasis, quotes, rules, breaks, and reference links', () => {
  const root = preview('# Plan\n\n## Details\n\nA **strong** and *emphasized*, ~~removed~~ idea.  \nNext line.\n\n> A quote\n>\n> Another paragraph.\n\n---\n\n[Guide][docs]\n\n[docs]: https://example.com/guide');
  assert.equal(root.querySelector('h1').textContent, 'Plan');
  assert.equal(root.querySelector('h2').textContent, 'Details');
  assert.equal(root.querySelector('strong').textContent, 'strong');
  assert.equal(root.querySelector('em').textContent, 'emphasized');
  assert.equal(root.querySelector('del').textContent, 'removed');
  assert.equal(root.querySelectorAll('blockquote p').length, 2);
  assert.equal(root.querySelectorAll('hr').length, 1);
  assert.equal(root.querySelectorAll('br').length, 1);
  assert.equal(root.querySelector('a').href, 'https://example.com/guide');
});

test('renders nested ordered and unordered lists with read-only named task checkboxes', () => {
  const root = preview('3. First\n   - [x] Write **design**\n   - [ ] Review design\n     1. Nested step\n4. Second\n\n- [ ] First paragraph\n\n  Second paragraph');
  assert.equal(root.querySelector('ol').start, 3);
  assert.equal(root.querySelectorAll('ol > li').length, 3);
  assert.ok(root.querySelector('ol > li > ul > li > ol'));
  const checkboxes = [...root.querySelectorAll('input')];
  assert.equal(checkboxes.length, 3);
  assert.deepEqual(checkboxes.map(box => box.checked), [true, false, false]);
  for (const box of checkboxes) {
    assert.equal(box.type, 'checkbox');
    assert.equal(box.disabled, true);
    assert.match(box.getAttribute('aria-label'), /task: .+/);
  }
  assert.equal(checkboxes[0].getAttribute('aria-label'), 'Completed task: Write design');
  assert.equal(root.querySelectorAll('.osb-markdown-task-item').length, 3);
});

test('renders a table with semantic column headings and inline content', () => {
  const root = preview('| Field | Value |\n| :--- | ---: |\n| **Role** | `SA` |\n| Stage | Design |');
  assert.equal(root.querySelectorAll('thead th').length, 2);
  assert.ok([...root.querySelectorAll('th')].every(cell => cell.scope === 'col'));
  assert.equal(root.querySelectorAll('tbody tr').length, 2);
  assert.equal(root.querySelector('tbody strong').textContent, 'Role');
  assert.equal(root.querySelector('tbody code').textContent, 'SA');
  assert.equal(root.querySelector('th:last-child').style.textAlign, 'right');
  assert.ok(root.querySelector('.osb-markdown-table-wrap > table'));
});

test('preserves fenced and indented code whitespace and code entities literally', () => {
  const fenced = '  const text = "&amp; <tag>";\n\treturn text;\n\n';
  const root = preview(`Inline \`&amp; <tag>  spaces\`.\n\n\`\`\`js\n${fenced}\`\`\`\n\n    indented &copy;\n      deeper\n`);
  assert.equal(root.querySelector('p code').textContent, '&amp; <tag>  spaces');
  const blocks = [...root.querySelectorAll('pre code')];
  assert.equal(blocks[0].textContent, fenced.slice(0, -1));
  assert.equal(blocks[1].textContent, 'indented &copy;\n  deeper\n');
  assert.equal(root.querySelector('tag'), null);
});

test('decodes text entities exactly once without decoding escaped ampersands or HTML', () => {
  const root = preview('&amp; &copy; &#65; &#x1F680; &NotEqualTilde; &unknown; &copy\n\n&#38;amp; &amp;amp; \\&amp; \\&#65;\n\n&lt;script&gt;alert(1)&lt;/script&gt;\n\n`&#65; &amp;`');
  const paragraphs = [...root.querySelectorAll('p')];
  assert.equal(paragraphs[0].textContent, '& © A 🚀 ≂̸ &unknown; &copy');
  assert.equal(paragraphs[1].textContent, '&amp; &amp; &amp; &#65;');
  assert.equal(paragraphs[2].textContent, '<script>alert(1)</script>');
  assert.equal(paragraphs[3].textContent, '&#65; &amp;');
  assert.equal(root.querySelector('script'), null);
});

test('allows only absolute HTTP(S) destinations with isolated external navigation', () => {
  const root = preview('[Secure](https://example.com/?a=1&amp;b=2) [Plain](http://example.com/path) [Encoded](https&colon;//example.com/encoded)\n\n<https://example.com/?literal=&amp;>');
  const links = [...root.querySelectorAll('a')];
  assert.equal(links.length, 4);
  assert.equal(links[0].href, 'https://example.com/?a=1&b=2');
  assert.equal(links[2].href, 'https://example.com/encoded');
  assert.equal(links[3].href, 'https://example.com/?literal=&amp;');
  assert.equal(links[3].textContent, 'https://example.com/?literal=&amp;');
  for (const link of links) {
    assert.equal(link.target, '_blank');
    assert.equal(link.rel, 'noopener noreferrer');
  }
});

test('keeps obfuscated, unsupported, and relative link destinations inert', () => {
  const destinations = [
    'javascript:alert%281%29', 'jav&#x61;script:alert%281%29', 'java&Tab;script:alert%281%29',
    'java%73cript:alert%281%29', 'data:text/html,hello', 'file:///etc/passwd',
    'mailto:user@example.com', '/local', '../tasks.md', '#design', '//example.com/',
    'https&colon;&#x09;//example.com/', 'https://', 'https:example.com',
    'https://example.com/&#x0a;path',
  ];
  for (const destination of destinations) {
    const root = preview(`[**Read**](${destination})`);
    assert.equal(root.querySelector('a'), null, destination);
    assert.equal(root.textContent, 'Read', destination);
  }
});

test('shows raw HTML and images as text without executable or resource-loading nodes', () => {
  const root = preview('<script>window.pwned = true</script>\n\n<img src="https://example.com/pixel" onerror="alert(1)">\n\n<iframe srcdoc="<script>alert(1)</script>"></iframe>\n\n<style>@import "https://example.com/style";</style>\n\n<svg><a href="javascript:alert(1)">x</a></svg>\n\nInline <b onclick="alert(1)">HTML &amp;</b>.\n\n![**Diagram** &amp; notes](https://example.com/image.svg) ![](data:image/svg+xml,evil)\n\n![Remote](//example.com/pixel)');
  assert.equal(root.querySelector('script, img, iframe, style, svg, b, a, link, object, embed, form'), null);
  assert.match(root.textContent, /<script>window.pwned = true<\/script>/);
  assert.match(root.textContent, /<img src="https:\/\/example.com\/pixel" onerror="alert\(1\)">/);
  assert.match(root.textContent, /Inline <b onclick="alert\(1\)">HTML &<\/b>\./);
  assert.match(root.textContent, /Diagram & notes \[Image\]/);
  assert.match(root.textContent, /Remote/);
  for (const node of root.querySelectorAll('*')) {
    for (const attribute of node.attributes) assert.ok(!/^(?:on|src)/i.test(attribute.name), attribute.name);
  }
});

test('retains raw HTML entities and unsupported diagram syntax without executing them', () => {
  const root = preview('<div>&amp; &#65;</div>\n\n```mermaid\ngraph LR\n  A --> B\n```\n\n[^unsupported]');
  assert.equal(root.querySelector('.osb-markdown-literal').textContent, '<div>&amp; &#65;</div>');
  assert.equal(root.querySelector('pre code').textContent, 'graph LR\n  A --> B');
  assert.match(root.textContent, /\[\^unsupported\]/);
  assert.equal(root.querySelector('div, svg'), null);
});

test('falls back to literal raw text for unknown tokens', context => {
  context.mock.method(Lexer, 'lex', () => [{ type: 'future-token', raw: '<img src=x onerror=alert(1)>' }]);
  const root = preview('Future syntax');
  assert.equal(root.textContent, '<img src=x onerror=alert(1)>');
  assert.equal(root.children.length, 0);
});

test('returns an empty fragment for empty input and rejects invalid source types', () => {
  const document = new JSDOM('').window.document;
  assert.equal(renderMarkdown('', document).childNodes.length, 0);
  assert.equal(renderMarkdown(' \n\n', document).childNodes.length, 0);
  assert.throws(() => renderMarkdown(null, document), /must be a string/);
});
