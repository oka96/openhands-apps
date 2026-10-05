'use strict';

// Transport only. Collection and role rules are owned by Automation.
try {
  const runtime = require('/Users/oka/Desktop/openhands-automation/runtime/collector.cjs');
  exports.collect = runtime.collect;
  exports.main = runtime.main;
  if (require.main === module || module.id === '[eval]') runtime.main(process.argv[module.id === '[eval]' ? 1 : 2]);
} catch {
  process.stdout.write(JSON.stringify({ version: 1, kind: 'error', message: 'Automation collector is unavailable. Restore the configured openhands-automation checkout.' }) + '\n');
  process.exitCode = 1;
}
