#!/usr/bin/env node
/** Reports remaining placeholders. With --strict, exits 1 if any remain (use in the launch CI job). */
import { collect } from './list-placeholders.mjs';

const found = await collect();
const strict = process.argv.includes('--strict');
if (found.length === 0) {
  console.log('No placeholders remain.');
  process.exit(0);
}
console.log(`${found.length} placeholder occurrence(s) remain. See docs/PLACEHOLDERS.md.`);
if (strict) {
  for (const f of found.slice(0, 50)) console.log(`  ${f.file}:${f.line}  ${f.raw}`);
  process.exit(1);
}
