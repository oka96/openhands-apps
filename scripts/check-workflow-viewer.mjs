import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { STAGES } from '../src/workflow-actions.js';

const root = new URL('../.archify/workflow-role-conversation-20261006/', import.meta.url);
const read = name => readFile(new URL(name, root));
const [html, candidate, deliveryBytes, finalBytes] = await Promise.all([
  read('role-workflow.html'), read('candidate.json'),
  read('role-workflow.delivery.json'), read('role-workflow.finalize-summary.json'),
]);
const final = JSON.parse(finalBytes);
assert.deepEqual(JSON.parse(candidate).nodes.map(node => node.id).sort(), STAGES.map(stage => `action-${stage}`).sort(),
  'Every workflow node must map to one native role action.');
assert.equal(final.status, 'pass', 'Archify finalization must pass.');
assert.deepEqual(final.gates, {
  validate: 'pass', deliver: 'pass', check: 'pass', 'browser-check': 'pass',
});
const delivery = JSON.parse(deliveryBytes);
assert.equal(delivery.status, 'current', 'Archify delivery must be current.');
for (const receipt of [delivery, final]) {
  for (const [key, bytes] of [['artifact', html], ['specification', candidate]]) {
    assert.equal(receipt[key].sha256, createHash('sha256').update(bytes).digest('hex'),
      `Archify ${key} changed after validation; finalize it again.`);
    assert.equal(receipt[key].bytes, bytes.length, `Archify ${key} size does not match.`);
  }
}
console.log('Verified the full Archify viewer against its four passing delivery gates.');
