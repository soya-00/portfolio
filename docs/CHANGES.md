# Corrections applied after external review

Eight defects were identified in an integration review. All were real. This records what changed and what did not.

## Fixed in the corpus

**Two layer files had a runaway `# H1`.** In `layers/effectiveness.md` and `layers/adjudication.md` the heading had swallowed the entire first paragraph of body prose — a build artifact from the split that moved that material out of the core path. Frontmatter titles were correct throughout. Fixed at source; the renderer does not need to work around it.

**Three metadata strings understated the corpus.** `README.md` said 18 accident records (it counted only the `corpus` tier; the roster is 27) and 5 verified quotations. `quotations.json._meta` said "1 of 12 verified". The true count is **4 verified, 7 pending capture, 1 cut**, and `REPORT.md` was the only document with it right. All three corrected. This mattered more than a typo: "1 of 12" would have dropped three verified quotations, including all three original-language statute quotations, which are the evidentiary spine of the divergence section.

## Fixed in the gate

**R5 blocked a build that never intended to render the records it blocked on.** Correct in principle — the piece cannot render a quotation nobody has read — and wrong in placement. The report's own warning applies: a build that fails on things nothing uses teaches people to disable it. The strictness moved rather than disappeared. R5 now warns on pending captures; **R11** fails the build if any rendered component references a quotation that is not verified.

**R7 did not enforce what its own comment promised.** The comment described two patterns — a rank plus a name, and two adjacent capitalized words — and only the first was implemented, so a bare two-word name passed silently. It also scanned only three data arrays and never opened `content/`, which is where most of the piece's words are. Both patterns now run across every markdown file. Zero name findings, which confirms the content was already clean; the check should still exist.

A `permitted_terms` list was added alongside the existing name allowlist. Without it the completed check produced 23 warnings, every one a false positive on an operator, a place or a sentence-initial word — and 23 lines of noise is how a rule gets ignored. Markdown headings and emphasis markers are now stripped before the scan, since they were breaking the sentence-boundary test.

**R12 is new**, and it enforces the charter's first done-condition, which previously could not be run at all: no content file carried a single source ID and `validate.js` never opened `content/`.

## Added

**`content/citations.json`** — 72 entries: 62 prose anchors mapped to sources, 10 keyed to cut-list ids. A sidecar, so `content/` stays untouched ground truth. Each anchor is a verbatim phrase that must appear exactly once in its section; R12 checks both that and source resolution.

Status is **draft**. Anchor matching and reference resolution are mechanical and now gate-enforced. Which source backs which sentence is editorial judgment and wants a read-through before publication.

**`content/labels.json`** — 27 display labels. Prose names cases by place and year, data by operator and flight number, and the transform is not mechanical: Kegworth takes the first component of `location`, Guam the last. Each is set explicitly. Also supplies the join key the sensitivity spec was missing.

**`content/single-origin.json`** — 3 claims resting on a single origin. Not inferred: `sources.downgraded` is false on all 61 records and no schema field encodes it, so deriving it would have originated a judgment. Each entry points at prose that already states the dependency.

## Second review round

**Four sections had no citations at all** — `00-methods`, `12-onward` and all four layers. The layers were never scanned by R12, which read only the numbered core files, and `methods` and `onward` were explicitly exempted from even the warning. That exemption was wrong in both cases: `onward` names fourteen sources in prose, and `divergence-gaps` carries the Brazilian constitutional finding.

The metadata had deferred `12-onward` as "generated at build". It cannot be. The prose names sources as English descriptions — *"Indonesia's aviation law via the national legal database"* — which is good writing and has no id in it. All 23 mappings are now explicit.

**Three new reference types**, because forcing every claim to point at an external source was the wrong shape. `corpus_ref` covers claims derived from the corpus itself; `governance_ref` covers sentences stating the piece's own rules, which cite the charter rather than a source; `unmapped_ref` points at the register below. R12 fails a citation carrying no reference of any kind.

**`content/unmapped.md`** — 14 assertions no source supports. This was the one requested output missing, and the only one that cannot be mechanically verified: an uncited assertion looks, to a validator, exactly like prose.

Nine of the fourteen are closable with a record or a cut. Five are not, and that is the register's real finding: the piece's central thesis, its four-model taxonomy and its denominator argument are the author's reasoning rather than sourced claims. A publication promising that every factual assertion resolves has to be able to say which of its sentences are not factual assertions.

Two entries are corrections rather than gaps. The union-magazine claim had been mis-mapped to the NASA workshop proceedings — a different document, body and year — and the mapping was removed rather than repaired, since no record for the magazine exists. And neither the popular account at the center of section 08 nor its best-known rebuttal has a source record, so the contested node the piece builds a section around has no register entry on either side.

**R12 now fails rather than warns** when a section has no citations mapped.

## Third round — claim verification

Five load-bearing claims were checked against sources rather than accepted from the briefs. Findings in `docs/VERIFICATION-2026-08-18.md`. Nothing was contradicted; two claims need editorial change and one affects the spine module.

**The Guam claim is true and misleadingly clean.** The first officer did speak — and so did the flight engineer, which strengthens the counter-position. But three seconds before calling for a missed approach the same first officer dismissed a sink-rate alert while descending at 1,400 feet per minute, and the call came about five seconds before impact. A section saying only *"the first officer did speak"* invites a reader to picture assertive juniors being overridden. The record is worse than that, and worse in a way the cultural reading does not predict.

**Brazil's uniqueness claim needs narrowing.** Three factual corrections applied: the judgment is 14 August 2024, not September; Min. Flávio Dino partially dissented; the September date belongs to the relator's 2021 vote. Two overstatements handed back: the upheld provisions protect SIPAER material generally rather than the CVR specifically, and *"no counterpart elsewhere in the corpus"* omits Canada's Supreme Court decision in *Carroll-Byrne*, where the CVR privilege was tested and the recording ordered released. A source record for it has been added.

**Two claims came back stronger than written.** The Sharm el-Sheikh report stated no probable cause at all, listing four possible causes; the US authority responded with a document reported at some forty pages and the French authority with a statement on errors and omissions — a formal disagreement squarely about what the recorded evidence showed. The Dryden commission issued 191 recommendations, all accepted, and is treated in the literature as a landmark in systemic investigation.

**One capture warning recorded.** The Moshansky conclusion runs in two halves — the captain bears responsibility, *and* the system failed him by placing him in that position. The pending quotation captures only the first. Rendered alone it reverses the meaning of the inquiry most celebrated for refusing individual-blame findings. Flagged in `quotations.json`: both halves or neither.

**UM-15 added**; UM-06 reassessed from cut-candidate to retain-and-cite, since the Canadian provision turns out to be genuinely well litigated.

## Handed-back decisions, now made

The three claim decisions from the verification round were left to the author and are now applied, because two of them blocked the spine module and the third was a data correction that had only been half-made.

**Japan — completed.** The exemption correction had landed in `sources.json` only, while `jurisdictions.json` still read *articles 5(5) and 5(6)*. That is the file the comparison consumes, so the uncorrected value was the one that would render as the cell and the corrected one sat in a source note reachable only by opening a citation. Item 3 is a distinct ground; omitting it understated the exemption's breadth. Now corrected where it renders.

**Brazil — the "no counterpart" framing is gone.** The spine now states that two regimes here have been tested at the top of their own legal systems and went opposite ways: Brazil's confidentiality provisions survived a constitutional challenge, and Canada's privilege was litigated to its Supreme Court on a recording itself and the recording was ordered released. The layer sets out both narrowings — the Brazilian provisions protect investigation material generally rather than the recorder specifically, and the higher-level test that went *against* protection concerned the recorder directly. A comparison reporting only the Brazilian result would make the express-bar model look sturdier than the record shows.

**Guam — the section carries the timing now.** Both junior crew spoke, which strengthens the counter-position. But the missed-approach call came about five seconds before impact, and three seconds before it the same first officer had dismissed a sink-rate alert during a 1,400 foot-per-minute descent. As written, the section invited a reader to picture assertive juniors being overridden. What the record shows is slower and worse than that, and worse in a way a theory about deference does not predict.

**Cost.** The additions ran the core path to 25.4 minutes, over the done-condition. Roughly 130 words were trimmed across eight sections to bring it back to 25.0 — compression, not removed coverage. Eight citation anchors broke against the edited prose and were repaired; seven new citations were added for the new claims.

## Not changed, and why

**The word-count target was dropped, not met.** 5,500 words ÷ 220 is 25.0 minutes of reading before any interaction, so the bottom of the word range already exceeded the top of the time range. The targets were mutually impossible. Timing governs, because that is what the charter actually verifies. Meeting the word count would have required originating roughly a thousand words, which the corpus rule forbids.

**The two modules with no data are still not built.** There is no transcript record type in the schema, no utterance data, and no annotation categories; `crm_mandate_first_date` is dated on 5 of 14 jurisdictions. Rendering five points as a lag pattern would misrepresent nine absences as an empty timeline.

**Thirteen sources still have no URL**, including two that carry the piece's central claim. They are marked `offline` and render as full citations with authority, number and date rather than as broken links. The gate permits this deliberately: R1 fails only on `open` access with no URL.

**All six deep-tier cases are retained.** Two are cite-only. The asymmetry is disclosed to the reader in section 06 — a reader who finds more textual detail on the American and British cases is seeing copyright law rather than editorial judgment — rather than hidden by quietly writing less about the affected cases.
