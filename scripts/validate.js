#!/usr/bin/env node
/**
 * Build gate. Runs before every build and fails it on any charter violation.
 *
 * Design principle: this validator proves derivation, it does not pattern-match
 * for suspicion. It cannot tell whether a redaction was a good idea, and it does
 * not try. Judgment cases warn and route to a human; a build that fails on
 * judgment calls teaches people to disable it.
 *
 * Exit 0 = build may proceed. Exit 1 = build blocked.
 */

const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data');
const read = f => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));

const errors = [];
const warnings = [];
const fail = (rule, msg) => errors.push({ rule, msg });
const warn = (rule, msg) => warnings.push({ rule, msg });

const sources      = read('sources.json').sources;
const accidents    = read('accidents.json').accidents;
const jurisdictions= read('jurisdictions.json').jurisdictions;
const quotations   = read('quotations.json').quotations;
const permitted    = read('permitted-names.json').permitted;
const cuts         = read('cutlist.json').cuts;

const sourceIds = new Set(sources.map(s => s.id));
const allowedNames = new Set(permitted.map(p => p.name));
const allowedTerms = new Set(read('permitted-names.json').permitted_terms || []);

/* ── RULE 1 ── Source integrity ─────────────────────────────────────────── */
{
  const seen = new Set();
  for (const s of sources) {
    if (seen.has(s.id)) fail('R1', `duplicate source id: ${s.id}`);
    seen.add(s.id);
    if (!s.licence || !s.licence.status) fail('R1', `${s.id}: no licence determination`);
    if (s.licence?.status === 'reproducible' && !s.licence.attribution)
      fail('R1', `${s.id}: reproducible but no attribution wording supplied`);
    // A source with no URL must be honestly marked offline or library, not open.
    if (!s.url && s.access === 'open')
      fail('R1', `${s.id}: marked open access but carries no resolving URL`);
    if (!s.archive_url)
      warn('R1', `${s.id}: no archive snapshot — the piece is unmaintained, so link rot is certain`);
  }
}

/* ── RULE 2 ── Every source_ref resolves ────────────────────────────────── */
{
  const check = (ref, where) => {
    if (ref === null || ref === undefined) return;
    const base = String(ref).split('#')[0];
    if (!sourceIds.has(base)) fail('R2', `${where}: unresolved source_ref "${ref}"`);
  };
  for (const a of accidents) {
    check(a.fatalities?.source_ref, `accident ${a.id} fatalities`);
    check(a.fatalities?.subsequent_source_ref, `accident ${a.id} subsequent deaths`);
    check(a.report?.source_ref, `accident ${a.id} report`);
    check(a.cvr_role?.source_ref, `accident ${a.id} cvr_role`);
  }
  for (const j of jurisdictions)
    for (const f of ['instrument','cvr_disclosure_bar','cvr_evidentiary_bar','criminal_use','crm_mandate','crm_mandate_first_date'])
      if (j[f] && j[f] !== 'NOT-DOCUMENTED') check(j[f].source_ref, `jurisdiction ${j.id}.${f}`);
  for (const q of quotations) check(q.source_ref, `quotation ${q.id}`);
}

/* ── RULE 3 ── No null jurisdiction values ──────────────────────────────── */
{
  const required = ['regime_class','instrument','cvr_disclosure_bar','cvr_evidentiary_bar','crm_mandate','crm_mandate_first_date'];
  for (const j of jurisdictions)
    for (const f of required) {
      const v = j[f];
      if (v === null || v === undefined || v === '')
        fail('R3', `jurisdiction ${j.id}.${f} is null — must be the explicit NOT-DOCUMENTED marker so a reader can tell "no protection" from "not established"`);
    }
}

/* ── RULE 4 ── Analytic fields carry provenance ─────────────────────────── */
{
  for (const a of accidents) {
    if (a.cvr_role?.summary && !a.cvr_role.source_ref)
      fail('R4', `accident ${a.id}: cvr_role asserts what an authority found but carries no source_ref`);
    if (!a.selection_basis)
      fail('R4', `accident ${a.id}: no published selection basis`);
    if (a.fatalities?.reported !== null && !a.fatalities?.basis)
      fail('R4', `accident ${a.id}: fatality figure with no stated counting basis`);
  }
  for (const j of jurisdictions)
    for (const f of ['cvr_evidentiary_bar','crm_mandate'])
      if (j[f] !== 'NOT-DOCUMENTED' && j[f] && !j[f].verification)
        fail('R4', `jurisdiction ${j.id}.${f}: no verification tier`);
}

/* ── RULE 5 ── Quotation derivation proof ───────────────────────────────── */
{
  const applyTransforms = (verbatim, redactions, elisions) => {
    const ops = [
      ...redactions.map(r => ({ span: r.span, text: r.replacement })),
      ...elisions.map(e => ({ span: e.span, text: ' … ' }))
    ].sort((a, b) => b.span[0] - a.span[0]);
    let out = verbatim;
    for (const op of ops) out = out.slice(0, op.span[0]) + op.text + out.slice(op.span[1]);
    return out;
  };

  for (const q of quotations) {
    if (q.status === 'cut') continue;

    if (!q.necessity || q.necessity.length === 0)
      fail('R5', `quotation ${q.id}: no necessity criterion — every quotation must justify why exact wording is required`);

    if (q.elisions && q.elisions.length > 1)
      fail('R5', `quotation ${q.id}: ${q.elisions.length} internal elisions — two is a reassembly, not an elision`);

    if (q.verbatim === null) {
      // Not a build failure. Nothing renders an uncaptured quotation — R11 enforces that.
      // Blocking here would fail a build that never intended to use the record, and a gate
      // that blocks on things nothing renders teaches people to disable it.
      if (q.status !== 'pending-capture' && q.status !== 'pending-verification')
        fail('R5', `quotation ${q.id}: no verbatim and status is "${q.status}" — only pending records may lack captured text`);
      else
        warn('R5', `quotation ${q.id}: verbatim not captured — held back from rendering by R11`);
      continue;
    }

    const derived = applyTransforms(q.verbatim, q.redactions || [], q.elisions || []);
    if (derived !== q.rendered)
      fail('R5', `quotation ${q.id}: rendered text is not derivable from verbatim by the declared transformations alone`);

    // Brackets in rendered output must correspond to a declared redaction.
    const bracketCount = (q.rendered.match(/\[/g) || []).length;
    if (bracketCount !== (q.redactions || []).length)
      fail('R5', `quotation ${q.id}: ${bracketCount} bracket(s) rendered but ${(q.redactions||[]).length} redaction(s) declared`);

    // Judgment case: heavy redaction warns, does not fail.
    const redChars = (q.redactions || []).reduce((n, r) => n + (r.span[1] - r.span[0]), 0);
    if (q.verbatim.length && redChars / q.verbatim.length > 0.167)
      warn('R5', `quotation ${q.id}: redactions cover over a sixth of the passage — consider paraphrase (human review, not a failure)`);
  }
}

/* ── RULE 6 ── Verbatim never reaches a rendered surface ────────────────── */
{
  // The renderer consumes only `rendered`. Guard against a verbatim string
  // leaking into any other reader-facing field.
  const verbatims = quotations.filter(q => q.verbatim).map(q => q.verbatim);
  const surfaces = [];
  for (const a of accidents) surfaces.push(a.cvr_role?.summary, a.selection_basis, a.label);
  for (const j of jurisdictions)
    for (const f of ['cvr_evidentiary_bar','cvr_disclosure_bar','crm_mandate'])
      if (j[f] !== 'NOT-DOCUMENTED' && j[f]) surfaces.push(String(j[f].value));
  for (const v of verbatims)
    for (const s of surfaces.filter(Boolean))
      if (s.includes(v)) fail('R6', `verbatim quotation text leaked into a rendered field: "${v.slice(0, 40)}…"`);
}

/* ── RULE 7 ── Crew names: justify every name, don't hunt bad ones ──────── */
{
  const surfaces = [];
  const push = (t, w) => { if (typeof t === 'string' && t) surfaces.push([t, w]); };
  for (const a of accidents) { push(a.label, `accident ${a.id}.label`); push(a.cvr_role?.summary, `accident ${a.id}.cvr_role`); push(a.selection_basis, `accident ${a.id}.selection_basis`); }
  for (const q of quotations) push(q.rendered, `quotation ${q.id}`);
  for (const c of cuts) { push(c.claim, `cut ${c.id}.claim`); push(c.reason, `cut ${c.id}.reason`); }

  // content/ holds most of the piece's words, so it is scanned too.
  const contentDir = path.join(__dirname, '..', 'content');
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []);
  if (fs.existsSync(contentDir))
    for (const f of walk(contentDir))
      push(fs.readFileSync(f, 'utf8')
        .replace(/^---\n[\s\S]*?\n---/, '')
        .replace(/^#{1,6} .*$/gm, '')      // headings are not sentence context
        .replace(/\*\*|__|\*|`/g, '')      // emphasis markers break the boundary test
        .replace(/^\s*[-|] .*$/gm, ''),    // table rows and list markers
        `content/${path.relative(contentDir, f)}`);

  const roleWords = new Set(['Resource','Management','Officer','Engineer','Voice','Recorder','Airlines','Air',
    'Aviation','Safety','Board','Flight','Crew','Transportation','Accident','Investigation','Court','Appeal',
    'Federal','Register','Government','Licence','License','Open','Standard','Conference','Publication','Technical',
    'Memorandum','Digest','Science','Studies','Journal','Psychology','Union','States','Kingdom','Republic','Law',
    'Article','Rules','Regulation','Code','Act','Annex','Human','Factors','Cockpit','Recorder','Data','Report']);

  // Both halves of the promised shape: rank + name, and two adjacent capitalised words.
  const rank = /\b(Capt(?:ain)?|First Officer|F\/O|Flight Engineer|Cmdr|Commander)\s+([A-Z][a-z]+)/g;
  const pair = /\b([A-Z][a-z]{2,})\s+([A-Z][a-z]{2,})\b/g;
  for (const [text, where] of surfaces) {
    let m;
    rank.lastIndex = 0;
    while ((m = rank.exec(text)) !== null)
      if (!allowedNames.has(m[2]) && !roleWords.has(m[2]))
        fail('R7', `${where}: rank-plus-name construction "${m[0]}" — crew appear by role only, and this name is not on the allowlist`);
    pair.lastIndex = 0;
    while ((m = pair.exec(text)) !== null) {
      if (roleWords.has(m[1]) || roleWords.has(m[2])) continue;
      if (allowedNames.has(m[1]) || allowedNames.has(m[2]) || allowedNames.has(m[0])) continue;
      if (allowedTerms.has(m[0])) continue;
      // Sentence-initial capitals are not name shapes.
      if (/(^|[.!?:]\s+|\n)$/.test(text.slice(Math.max(0, m.index - 3), m.index))) continue;
      warn('R7', `${where}: capitalised pair "${m[0]}" is not on the allowlist — confirm it is not a crew name`);
    }
  }
}

/* ── RULE 8 ── Licence honesty: nothing reproduced without a grant ──────── */
{
  const byId = Object.fromEntries(sources.map(s => [s.id, s]));
  for (const a of accidents) {
    if (a.transcript?.reproducible === true) {
      const src = byId[a.report?.source_ref];
      if (!src) continue;
      if (src.licence.status !== 'reproducible')
        fail('R8', `accident ${a.id}: transcript marked reproducible but its report source "${src.id}" is ${src.licence.status}`);
    }
  }
  for (const q of quotations) {
    if (q.status === 'cut') continue;
    const src = byId[String(q.source_ref).split('#')[0]];
    if (src && src.licence.status === 'cite-only' && q.verbatim)
      warn('R8', `quotation ${q.id}: source "${src.id}" is cite-only — verbatim held for verification but must not be reproduced on screen`);
  }
}

/* ── RULE 9 ── Absence language ─────────────────────────────────────────── */
{
  const banned = [/\bno mandate exists\b/i, /\bthere is no bar\b/i, /\bdoes not exist\b/i, /\bno such (?:law|rule|provision) exists\b/i];
  const surfaces = [];
  for (const j of jurisdictions) if (j._note) surfaces.push([j._note, `jurisdiction ${j.id}`]);
  for (const c of cuts) surfaces.push([c.reason, `cut ${c.id}`]);
  for (const [text, where] of surfaces)
    for (const re of banned)
      if (re.test(text))
        fail('R9', `${where}: renders a failed search as a negative finding — say the thing was not located, not that it does not exist`);
}

/* ── RULE 11 ── Nothing renders an unverified quotation ─────────────────── */
{
  // The strictness R5 gave up. A quotation may sit in the register unverified;
  // it may not reach a rendered surface until its text has been read.
  const renderable = quotations.filter(q => q.status === 'verified');
  for (const q of quotations) {
    if (q.status === 'verified' && !q.verbatim)
      fail('R11', `quotation ${q.id}: marked verified but carries no captured text`);
    if (q.status === 'verified' && !q.rendered)
      fail('R11', `quotation ${q.id}: marked verified but has nothing to render`);
  }
  if (fs.existsSync(path.join(DATA, '..', 'content', 'citations.json'))) {
    const cites = JSON.parse(fs.readFileSync(path.join(DATA, '..', 'content', 'citations.json'), 'utf8')).citations;
    const ids = new Set(renderable.map(q => q.id));
    for (const c of cites)
      if (c.quotation_ref && !ids.has(c.quotation_ref))
        fail('R11', `citation ${c.id}: references quotation "${c.quotation_ref}", which is not verified`);
  }
}

/* ── RULE 12 ── Every claim carries a resolving source ──────────────────── */
{
  const cpath = path.join(DATA, '..', 'content', 'citations.json');
  const cdir  = path.join(DATA, '..', 'content');
  if (!fs.existsSync(cpath)) {
    fail('R12', 'content/citations.json missing — the charter requires every factual assertion to carry a resolving source ID');
  } else {
    const cites = JSON.parse(fs.readFileSync(cpath, 'utf8')).citations;
    const bodies = {};
    const collect = dir => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) { collect(p); continue; }
        if (!e.name.endsWith('.md')) continue;
        const raw = fs.readFileSync(p, 'utf8');
        const slug = (raw.match(/slug:\s*(\S+)/) || [])[1];
        if (slug) bodies[slug] = raw.replace(/^---\n[\s\S]*?\n---/, '');
      }
    };
    collect(cdir);
    const cutIds = new Set(cuts.map(c => c.id));
    // The unmapped register is the manual counterpart to every other check here: it holds the
    // assertions no source supports, which no validator can detect on its own.
    const upath = path.join(DATA, '..', 'content', 'unmapped.md');
    const unmappedIds = new Set();
    if (!fs.existsSync(upath)) {
      fail('R12', 'content/unmapped.md missing — the register of assertions no source supports is a required output');
    } else {
      for (const m of fs.readFileSync(upath, 'utf8').matchAll(/\*\*(UM-\d+)\s/g)) unmappedIds.add(m[1]);
      if (unmappedIds.size === 0)
        fail('R12', 'content/unmapped.md registers nothing — a piece with no unsupported assertions has not looked');
    }
    for (const c of cites) {
      if (c.source_ref && !sourceIds.has(c.source_ref))
        fail('R12', `citation ${c.id}: unresolved source_ref "${c.source_ref}"`);
      if (c.cut_ref && !cutIds.has(c.cut_ref))
        fail('R12', `citation ${c.id}: unresolved cut_ref "${c.cut_ref}"`);
      // A citation must point somewhere. corpus_ref covers claims derived from the corpus
      // itself, governance_ref covers the piece's own rules, unmapped_ref covers assertions
      // nothing supports — which must be registered rather than left silent.
      if (!c.source_ref && !c.cut_ref && !c.corpus_ref && !c.governance_ref && !c.unmapped_ref)
        fail('R12', `citation ${c.id}: carries no reference of any kind`);
      if (c.governance_ref && !fs.existsSync(path.join(DATA, '..', c.governance_ref)))
        fail('R12', `citation ${c.id}: governance_ref "${c.governance_ref}" does not exist`);
      if (c.corpus_ref && !fs.existsSync(path.join(DATA, '..', c.corpus_ref.split('#')[0])))
        fail('R12', `citation ${c.id}: corpus_ref "${c.corpus_ref}" does not exist`);
      if (c.unmapped_ref && !unmappedIds.has(c.unmapped_ref))
        fail('R12', `citation ${c.id}: unmapped_ref "${c.unmapped_ref}" is not registered in content/unmapped.md`);
      if (!c.anchor) continue;
      const body = bodies[c.section];
      if (body === undefined) { fail('R12', `citation ${c.id}: no section with slug "${c.section}"`); continue; }
      const n = body.split(c.anchor).length - 1;
      if (n === 0) fail('R12', `citation ${c.id}: anchor not found in ${c.section} — "${c.anchor.slice(0, 50)}…"`);
      else if (n > 1) fail('R12', `citation ${c.id}: anchor appears ${n} times in ${c.section}, must be unique`);
    }
    const covered = new Set(cites.map(c => c.section));
    for (const slug of Object.keys(bodies))
      if (!covered.has(slug) && slug !== 'unmapped')
        fail('R12', `section "${slug}" has no citations mapped — every section carrying claims must be covered`);
  }
}

/* ── RULE 10 ── Cut list must be non-empty ──────────────────────────────── */
if (cuts.filter(c => c.status === 'cut').length === 0)
  fail('R10', 'cut list contains no executed cuts — an audit that cuts nothing did not audit');

/* ── Report ─────────────────────────────────────────────────────────────── */
const rules = {
  R1: 'Source integrity and licence determination',
  R2: 'Source reference resolution',
  R3: 'No null jurisdiction values',
  R4: 'Analytic fields carry provenance',
  R5: 'Quotation derivation proof',
  R6: 'Verbatim never rendered',
  R7: 'Crew names by role only',
  R8: 'Licence honesty',
  R9: 'Absence language',
  R10: 'Cut list non-empty',
  R11: 'Nothing renders an unverified quotation',
  R12: 'Every claim carries a resolving source'
};

console.log('\n  BUILD GATE\n  ' + '─'.repeat(58));
console.log(`  ${sources.length} sources · ${accidents.length} accidents · ${jurisdictions.length} jurisdictions · ${quotations.length} quotations\n`);

const grouped = {};
for (const e of errors) (grouped[e.rule] ||= []).push(e.msg);

for (const [id, name] of Object.entries(rules)) {
  const n = (grouped[id] || []).length;
  console.log(`  ${n ? '✗' : '✓'} ${id}  ${name}${n ? `  — ${n} failure${n > 1 ? 's' : ''}` : ''}`);
  for (const m of (grouped[id] || []).slice(0, 6)) console.log(`        ${m}`);
  if (n > 6) console.log(`        … and ${n - 6} more`);
}

if (warnings.length) {
  console.log(`\n  ${warnings.length} warning${warnings.length > 1 ? 's' : ''} (human review, not blocking):`);
  const shown = warnings.slice(0, 5);
  for (const w of shown) console.log(`        [${w.rule}] ${w.msg}`);
  if (warnings.length > shown.length) console.log(`        … and ${warnings.length - shown.length} more`);
}

console.log('\n  ' + '─'.repeat(58));
if (errors.length) {
  console.log(`  BUILD BLOCKED — ${errors.length} failures across ${Object.keys(grouped).length} rules\n`);
  process.exit(1);
}
console.log('  BUILD MAY PROCEED\n');
