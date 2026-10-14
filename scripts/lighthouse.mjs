#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile, headless Chromium) against a running server and
 * prints the four category scores per URL. Usage:
 *   npm run build && npm start &   # or any host
 *   node scripts/lighthouse.mjs http://localhost:4321
 * Requires `npx lighthouse` (downloaded on first use) and a Chrome/Chromium binary
 * (set CHROME_PATH if it is not on PATH).
 */
import { spawnSync } from 'node:child_process';

const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const paths = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ['/', '/capabilities/', '/capabilities/serdes/', '/engagement-models/', '/case-studies/', '/security/', '/team/', '/insights/', '/insights/ucie-in-practice/', '/careers/', '/contact/', '/privacy/'];

const rows = [];
for (const p of paths) {
  const url = base + p;
  const res = spawnSync('npx', ['--yes', 'lighthouse', url, '--quiet', '--output=json', '--output-path=stdout', '--only-categories=performance,accessibility,best-practices,seo', '--chrome-flags=--headless=new --no-sandbox --disable-gpu'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) {
    console.error(`lighthouse failed for ${url}:\n${res.stderr}`);
    continue;
  }
  const json = JSON.parse(res.stdout);
  const s = (k) => Math.round((json.categories[k]?.score ?? 0) * 100);
  rows.push({ path: p, performance: s('performance'), accessibility: s('accessibility'), 'best-practices': s('best-practices'), seo: s('seo') });
}
console.table(rows);
const failing = rows.filter((r) => Object.values(r).some((v) => typeof v === 'number' && v < 95));
process.exit(failing.length ? 1 : 0);
