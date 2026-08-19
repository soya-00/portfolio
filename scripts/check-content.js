#!/usr/bin/env node
/**
 * Fabrication check.
 *
 * The charter's first done-condition is that an automated pass over all
 * rendered text finds zero items present on screen and absent from the
 * corpus. validate.js proves the data side; this proves the render side.
 *
 * It strips the citation panels — apparatus, generated from sources.json —
 * and the shell's own furniture, then compares what is left against the prose
 * in content/ word for word. Anything the renderer added, dropped, reordered
 * or paraphrased shows up as a mismatch.
 *
 * Exit 0 = the page says what the corpus says. Exit 1 = it does not.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGE = path.join(ROOT, 'dist', 'cvr', 'index.html');
const CONTENT = path.join(ROOT, 'content');

if (!fs.existsSync(PAGE)) {
  console.error('  check-content: dist/cvr/index.html not found — run the build first');
  process.exit(1);
}

/* ── Source side: the prose the corpus contains ─────────────────────────── */

const stripFrontmatter = s => s.replace(/^---\n[\s\S]*?\n---\n?/, '');

// Inline markdown carries no words of its own; block markers do not either.
const stripMarkdown = s =>
  s
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/^\s*---\s*$/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1')
    .replace(/`([^`\n]+)`/g, '$1');

const words = s =>
  s
    .replace(/ /g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const docs = [];
const collect = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { collect(p); continue; }
    if (!entry.name.endsWith('.md')) continue;
    const raw = fs.readFileSync(p, 'utf8');
    const slug = (raw.match(/slug:\s*(\S+)/) || [])[1];
    if (!slug) continue;
    docs.push({ slug, file: path.relative(ROOT, p), body: stripFrontmatter(raw) });
  }
};
collect(CONTENT);

/* ── Rendered side: what the page actually shows ────────────────────────── */

let html = fs.readFileSync(PAGE, 'utf8');

/**
 * Citations are inline apparatus — marker and reference panel both — and are
 * removed whole, with no separator, because each sits mid-sentence and a
 * space would land before the following comma and report drift that is not
 * there.
 *
 * Counted rather than pattern-matched: the panel's shape varies by citation
 * kind, so a regex ending on a fixed run of closing tags either stops short
 * or swallows the rest of the paragraph.
 */
const stripBalanced = (src, openTag) => {
  let out = '';
  let i = 0;
  for (;;) {
    const start = src.indexOf(openTag, i);
    if (start === -1) return out + src.slice(i);
    out += src.slice(i, start);
    let depth = 0;
    let j = start;
    const tag = /<(\/?)span\b[^>]*>/g;
    tag.lastIndex = start;
    let m;
    while ((m = tag.exec(src)) !== null) {
      depth += m[1] ? -1 : 1;
      if (depth === 0) { j = m.index + m[0].length; break; }
    }
    if (depth !== 0) {
      console.error('  check-content: unbalanced citation markup — aborting');
      process.exit(1);
    }
    i = j;
  }
};

html = stripBalanced(html, '<span class="cite">');
// Disclosure and settings summaries are furniture, and sit between blocks, so
// a separator is correct here.
html = html.replace(/<summary[\s\S]*?<\/summary>/g, ' ');
// Screen-reader-only text is not visible prose.
html = html.replace(/<div aria-live[\s\S]*?<\/div>/g, ' ');

const NAMED = {
  nbsp: ' ', lt: '<', gt: '>', quot: '"', apos: "'",
  hellip: '…', mdash: '—', ndash: '–', middot: '·', amp: '&',
};

/**
 * React escapes apostrophes as &#x27; rather than &#39;, so a decoder that
 * only knows the decimal form silently mangles every possessive in the piece.
 * Handle both numeric forms generally, and decode &amp; last so a literal
 * ampersand in the prose is not double-decoded.
 */
const decode = s =>
  s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&(nbsp|lt|gt|quot|apos|hellip|mdash|ndash|middot);/g, (_, n) => NAMED[n])
    .replace(/&amp;/g, '&');

/**
 * Block tags separate words; inline tags do not. Collapsing both to a space
 * splits "<code>[the Captain]</code>," into two tokens and reports drift that
 * is not there, so the two are stripped differently.
 */
const BLOCK = /^\/?(p|div|section|main|nav|article|aside|header|footer|h[1-6]|ul|ol|li|dl|dt|dd|table|thead|tbody|tr|td|th|hr|br|blockquote|pre|figure|figcaption|details|summary|fieldset|legend|form|button)\b/i;

const text = words(
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<([^>\s/]+|\/[^>\s]+)([^>]*)>/g, (_, name) =>
        BLOCK.test(name) ? ' ' : ''
      )
  )
).join(' ');

/* ── Compare ────────────────────────────────────────────────────────────── */

const failures = [];
let checked = 0;

for (const doc of docs) {
  const bodyWords = words(stripMarkdown(doc.body));
  if (bodyWords.length === 0) continue;

  // The rendered page drops each file's leading H1, which repeats the
  // frontmatter title already shown as the section heading.
  const firstLine = doc.body.trim().split('\n')[0];
  const skip = firstLine.startsWith('# ') ? words(stripMarkdown(firstLine)).length : 0;
  const expected = bodyWords.slice(skip);

  checked++;
  const needle = expected.join(' ');
  if (!text.includes(needle)) {
    // Narrow to the first word that diverges, so the report is actionable.
    let lo = 0, hi = expected.length;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (text.includes(expected.slice(0, mid).join(' '))) lo = mid; else hi = mid - 1;
    }
    failures.push({
      file: doc.file,
      at: lo,
      of: expected.length,
      context: expected.slice(Math.max(0, lo - 6), lo + 6).join(' '),
    });
  }
}

/* ── Report ─────────────────────────────────────────────────────────────── */

console.log('\n  CONTENT DRIFT\n  ' + '─'.repeat(58));
console.log(`  ${checked} documents compared against the rendered page\n`);

if (failures.length) {
  for (const f of failures) {
    console.log(`  ✗ ${f.file}`);
    console.log(`      diverges after word ${f.at} of ${f.of}`);
    console.log(`      …${f.context}…\n`);
  }
  console.log('  ' + '─'.repeat(58));
  console.log(`  DRIFT DETECTED — ${failures.length} document(s) do not render verbatim\n`);
  process.exit(1);
}

console.log('  ✓ every document renders word for word\n');
console.log('  ' + '─'.repeat(58));
console.log('  NO DRIFT\n');
