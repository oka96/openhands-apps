import { customizeCanvasNavigation } from './canvas-navigation.mjs';

const args = process.argv.slice(2);
const positional = args.filter(arg => !arg.startsWith('--'));
const flags = args.filter(arg => arg.startsWith('--'));
const packageDirectory = positional[0];
if (positional.length !== 1 || flags.some(flag => !['--restore', '--check'].includes(flag)) || new Set(flags).size !== flags.length) {
  console.error('Usage: node scripts/apply-canvas-navigation.mjs <installed-agent-canvas-directory> [--restore] [--check]');
  process.exitCode = 1;
} else {
  try {
    const result = await customizeCanvasNavigation(packageDirectory, { restore: flags.includes('--restore'), dryRun: flags.includes('--check') });
    console.log(`OpenSpec native navigation: ${result.status}.`);
    for (const file of result.files) console.log(`  ${file}`);
  } catch (error) {
    console.error(error.message); process.exitCode = 1;
  }
}
