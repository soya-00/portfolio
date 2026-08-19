#!/usr/bin/env node
/** Core-path timing check against the done-condition: 20-25 minutes at 220 wpm. */
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'content');
const WPM = 220;
let total = 0; const rows = [];
for (const f of fs.readdirSync(dir).filter(f => /^\d/.test(f)).sort()) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm || !/core_path:\s*true/.test(fm[1])) continue;
  const body = raw.replace(/^---\n[\s\S]*?\n---/, '');
  const words = body.split(/\s+/).filter(Boolean).length;
  total += words; rows.push([f, words, (words / WPM).toFixed(1)]);
}
console.log('\n  CORE PATH TIMING\n  ' + '─'.repeat(58));
for (const [f, w, m] of rows) console.log(`  ${f.padEnd(34)} ${String(w).padStart(5)} w   ${m.padStart(5)} min`);
const mins = total / WPM;
console.log('  ' + '─'.repeat(58));
console.log(`  ${'TOTAL'.padEnd(34)} ${String(total).padStart(5)} w   ${mins.toFixed(1).padStart(5)} min reading`);
console.log(`  ${'+ interaction (est. 4 min)'.padEnd(34)} ${''.padStart(5)}    ${(mins + 4).toFixed(1).padStart(5)} min total`);
const t = mins + 4;
console.log(`\n  Done-condition: 20-25 min core path.  ${t >= 20 && t <= 25 ? 'PASS' : t < 20 ? 'UNDER — room for a seventh deep case' : 'OVER — trim or move material to optional layers'}\n`);
