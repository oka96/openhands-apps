import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = new URL('../', import.meta.url);
const paths = {
  html: 'docs/workflows/role-workflow.html',
  candidate: 'docs/workflows/role-workflow.workflow.json',
  delivery: 'docs/workflows/role-workflow.delivery.json',
  finalize: 'docs/workflows/review-2/role-workflow.finalize-summary.json',
  svg: 'docs/workflows/role-workflow.svg',
  extraction: 'docs/workflows/role-workflow.extraction.json',
};
const stages = ['propose', 'update', 'apply'];
const edges = ['planning-revision', 'revision-implementation'];
const scope = 'svg[data-role-workflow-diagram]';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const read = path => readFile(new URL(path, root));
const identity = (path, bytes) => ({ path, sha256: digest(bytes), bytes: bytes.length });

assert(process.argv.slice(2).every(arg => arg === '--check') && process.argv.length <= 3,
  'Usage: node scripts/extract-role-workflow.mjs [--check]');
const check = process.argv.includes('--check');
const [html, candidate, deliveryBytes, finalizeBytes] = await Promise.all([
  read(paths.html), read(paths.candidate), read(paths.delivery), read(paths.finalize),
]);
const delivery = JSON.parse(deliveryBytes);
const final = JSON.parse(finalizeBytes);
assert.equal(delivery.status, 'current', 'Archify delivery must be current');
assert.equal(final.status, 'pass', 'Archify finalize must pass');
assert.deepEqual(final.gates, { validate: 'pass', deliver: 'pass', check: 'pass', 'browser-check': 'pass' });
for (const receipt of [delivery, final]) {
  assert.equal(receipt.artifact.sha256, digest(html), 'Delivered HTML digest does not match its receipt');
  assert.equal(receipt.artifact.bytes, html.length, 'Delivered HTML size does not match its receipt');
  assert.equal(receipt.specification.sha256, digest(candidate), 'Candidate changed after delivery');
  assert.equal(receipt.specification.bytes, candidate.length, 'Candidate size changed after delivery');
}

// JSDOM parses only: scripts and external resources are never enabled.
const dom = new JSDOM(html.toString('utf8'));
try {
  const document = dom.window.document;
  const source = document.querySelector('svg[data-layout-contract="readable-v2"]');
  assert(source, 'Expected a delivered readable-v2 SVG');
  assert.equal(source.querySelectorAll('g[data-node-id]').length, stages.length);
  const nodes = stages.map(stage => {
    const node = source.querySelector(`g[data-node-id="action-${stage}"]`);
    assert(node, `Missing ${stage} action`);
    return node;
  });
  const edgePaths = edges.map(id => {
    const path = source.querySelector(`path[data-edge-id="${id}"]`);
    assert(path, `Missing ${id} relationship`);
    return path;
  });
  const labels = edges.map(id => {
    const label = source.querySelector(`g[data-edge-id="${id}"]`);
    assert(label, `Missing ${id} label`);
    return label;
  });
  assert.equal(source.querySelectorAll('path[data-edge-id]').length, edges.length);
  const boxes = nodes.map(node => {
    const rect = node.querySelector(':scope > rect.c-mask');
    assert(rect, 'Action needs its generated mask rectangle');
    return Object.fromEntries(['x', 'y', 'width', 'height'].map(key => [key, Number(rect.getAttribute(key))]));
  });
  const x = Math.min(...boxes.map(box => box.x)) - 8;
  const y = Math.min(...boxes.map(box => box.y)) - 8;
  const right = Math.max(...boxes.map(box => box.x + box.width)) + 8;
  const bottom = Math.max(...boxes.map(box => box.y + box.height)) + 8;
  const viewBox = [x, y, right - x, bottom - y].join(' ');
  assert.equal(viewBox, '40 78 192 300', 'Recheck embedded layout after changing Archify geometry');
  for (const label of labels) {
    const rect = label.querySelector('rect');
    const [lx, ly, width, height] = ['x', 'y', 'width', 'height'].map(key => Number(rect.getAttribute(key)));
    assert(lx >= x && ly >= y && lx + width <= right && ly + height <= bottom, 'Label exceeds derived viewBox');
  }
  for (const path of edgePaths) {
    for (const point of path.getAttribute('data-composition-points').split(';')) {
      const [px, py] = point.split(',').map(Number);
      assert(px >= x && px <= right && py >= y && py <= bottom, 'Relationship exceeds derived viewBox');
    }
  }

  const rules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
  function rule(selector) {
    const found = rules.find(item => item.selectorText?.replace(/\s+/g, ' ') === selector);
    assert(found, `Missing generated style: ${selector}`);
    return found;
  }
  const selectors = ['.c-grid', '.c-mask', '.c-backend', '.t-primary', '.t-muted', '.t-edge-default',
    '.a-default', '.m-default', '.m-emphasis', '.m-security', '.m-dashed',
    'svg .semantic-sigil', 'svg .semantic-sigil > *', 'svg .s-backend'];
  const semanticStyles = selectors.map(selector =>
    `${scope} ${selector.replace(/^svg /, '')} { ${rule(selector).style.cssText} }`).join('\n');
  const variables = [...new Set([...semanticStyles.matchAll(/var\((--[\w-]+)\)/g)].map(match => match[1]))].sort();
  const palette = selector => variables.map(name => {
    const value = rule(selector).style.getPropertyValue(name);
    assert(value, `Missing ${selector} theme token ${name}`);
    return `${name}: ${value};`;
  }).join(' ');
  const light = palette('[data-theme="light"]');
  const dark = palette(':root, [data-theme="dark"]');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [name, value] of Object.entries({ viewBox, role: 'group', lang: 'en',
    'aria-label': 'Role workflow automations', 'data-role-workflow-diagram': '',
    'data-archify-source-sha256': digest(html) })) svg.setAttribute(name, value);
  const style = document.createElementNS(svg.namespaceURI, 'style');
  style.textContent = `\n${scope} { ${light} font-family: ${rule('body').style.getPropertyValue('font-family')}; }\n` +
    `[data-theme="dark"] ${scope}, ${scope}[data-theme="dark"] { ${dark} }\n` +
    `${scope}[data-theme="light"] { ${light} }\n${semanticStyles}\n`;
  svg.append(style);
  for (const element of [source.querySelector('title'), source.querySelector('desc'), source.querySelector('defs'),
    ...edgePaths, ...nodes, ...labels]) {
    assert(element, 'Missing generated SVG structure');
    svg.append(element.cloneNode(true));
  }
  assert.equal(svg.querySelectorAll('script, foreignObject, image, a').length, 0, 'Unexpected active SVG content');
  for (const element of svg.querySelectorAll('*')) for (const attr of element.attributes) {
    assert(!/^on/i.test(attr.name) && !/^(?:href|xlink:href)$/i.test(attr.name), 'Unexpected SVG action or external resource');
  }
  const bytes = Buffer.from(`${new dom.window.XMLSerializer().serializeToString(svg)}\n`);
  const receipt = Buffer.from(`${JSON.stringify({
    schemaVersion: 1,
    source: identity(paths.html, html),
    specification: identity(paths.candidate, candidate),
    output: identity(paths.svg, bytes),
    finalizeReceipt: paths.finalize,
    viewBox,
    actions: stages.map(stage => `action-${stage}`),
    preserved: ['generated defs', 'action groups', 'relationship paths', 'relationship labels', 'semantic styles', 'theme palette values'],
    adaptations: ['crop framing to measured bounds plus 8px', 'omit standalone grid and lane framing',
      'order action groups for keyboard navigation', 'scope semantic styles', 'accessible group wrapper', 'light palette default'],
    integrationValidation: 'Standalone Archify checks do not validate embedded app interactions.',
  }, null, 2)}\n`);
  if (check) {
    assert.deepEqual(await read(paths.svg), bytes, 'Embedded SVG is stale; run node scripts/extract-role-workflow.mjs');
    assert.deepEqual(await read(paths.extraction), receipt, 'Extraction receipt is stale; regenerate the SVG');
  } else {
    await writeFile(new URL(paths.svg, root), bytes);
    await writeFile(new URL(paths.extraction, root), receipt);
  }
  console.log(`${check ? 'Verified' : 'Extracted'} ${fileURLToPath(new URL(paths.svg, root))} (${bytes.length} bytes, SHA-256 ${digest(bytes)})`);
} finally {
  dom.window.close();
}
