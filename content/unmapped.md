---
apparatus: true
slug: unmapped
title: Assertions no source supports
always_reachable: true
---

# Assertions no source supports

Every other check in this project is mechanical. `validate.js` proves that anchors resolve, that references exist, that rendered quotations derive from stored text. None of that can find a sentence that is simply asserted, because an assertion with no citation looks, to a validator, exactly like prose.

This register is the manual counterpart. It is the only requested output that cannot be verified automatically, and the only one that says where the piece is thin.

Fifteen entries. Each carries what the prose claims, why nothing supports it, and what would close it.

---

## Contested node has no register entry on either side

**UM-01 · Neither the popular account nor its best-known rebuttal is in `sources.json`.**

Section 08 turns on a disagreement between a bestselling book and a widely read blog post. Section 12 says outright that *"the most-read rebuttal is a blog post and free"* and that *"the asymmetry of that list is the argument in miniature."*

Neither document has a source record. Register carries the scholarly alternative, a book-length critique of Western aviation concepts in East Asian contexts, together with the authority's own report, and not the two texts the section is actually about.

**Why it is not an oversight to leave open.** Adding them is easy and I have deliberately not done it, because the choice is editorial: a piece that declines to adjudicate a dispute has to decide whether it is citing these as *sources for claims* or *objects of study*. Corpus brief treated popular accounts as objects of study. If that holds, they belong in a separate register with a different verification vocabulary, and not in `sources.json` alongside statutes.

**Closes when:** a decision is made about which register they enter, then two records are added.

**UM-02 · The claim that the first officer spoke.**

Section 08 states that *"the first officer called for a missed approach,"* and this is the factual pivot of the counter-argument. It is currently cited to the authority's report at `secondary-only`, on the cockpit voice recorder factual record.

That citation has not been verified against the report. It is the single most load-bearing unverified fact in the piece, because if the utterance is not in the factual record as described, the counter-position loses its strongest empirical leg and the section becomes unbalanced in favor of the popular account.

**Closes when:** the factual record is read. High priority, above most items on the quotation-capture list.

---

## Claims about drivers

**UM-03 · Insurer premium credits.**

Section 10 describes *"voluntary premium credits from the 1990s aimed at general-aviation simulator proficiency"* and *"audit-linked discussion from the late 2000s."* Both are specific enough to be checkable and neither has a source record.

This sits inside the section whose whole argument is that the insurer role is undocumented, so an unsourced specific about insurers is a small self-contradiction. Section is more honest without the detail than with it unsourced.

**Closes when:** records are added, or the two specifics are cut and the section rests on the absence alone, which it can.

**UM-04 · The union magazine that published the term.**

Section 10 states that *"Term itself was published in a pilots' union magazine by the NASA researcher who coined it."* This is one of the two documented pillars of the union-advocacy candidate.

In the first citation draft I mapped it to the NASA workshop proceedings. That was wrong: the proceedings are a different document, published by a different body, in a different year. Mapping has been removed and not corrected, because no record for the magazine exists.

**Closes when:** a record for the magazine issue is added. Until then the union pillar rests on one documented item, not two.

**UM-05 · The adjacent-field effectiveness studies.**

Effectiveness layer says *"Studies from adjacent fields that tried the same measurement produced contradictory results, some large and some null, with none randomized."* Three studies are being characterized and none is cited.

Rhetorical work here is real: the contradiction is what justifies the piece declining to answer the effectiveness question. An uncited contradiction cannot carry that weight.

**Closes when:** the studies are named, or the sentence is reduced to what the 1990 paper itself supports, which is the methodological argument without the examples.

---

## Evaluative and comparative claims

**UM-06 · "The most litigated provision in this area."**

Section 12 says this of the Canadian statute's section 28. It is a comparative empirical claim about relative litigation volume across jurisdictions, and nothing in the corpus measures that.

**Reassessed 18 August 2026, retain and cite.** Verification found the provision was litigated to the Supreme Court of Canada in 2022 through two levels of appeal, on the recording itself. Claim is considerably more defensible than first judged. It remains comparative and should be attributed instead of stated flatly.

**UM-07 · The Tenerife emphasis divergence.**

Section 06 claims the English-language rendering *"foregrounds crew coordination"* where the Spanish original foregrounds procedural violations, and calls the difference *"a translation-and-circulation effect and not a disagreement between investigators."*

Spanish report is in the register. An English-language union report that the claim is about is not. So the piece asserts a difference between two documents while holding only one of them.

**Closes when:** a record for the English report is added, which also settles whether it can be quoted at all.

**UM-08 · "Every other safety change of the same decades."**

Effectiveness layer lists confounders without citing any. Uncontroversial, and still an assertion.

**Closes when:** cut or cited. Low priority, since it supports an argument that survives without it.

---

## Structural arguments that are the author's own

These are the piece's reasoning and not its facts. They are listed because the charter's rule is that nothing on screen lacks a source, and reasoning does not have one, which is a real limitation whether or not it is a fixable one.

**UM-09 · The denominator argument.** Section 09's core claim, that recordings from flights where coordination worked are overwritten, so the evidence of success is destroyed by design while the evidence of failure is preserved, is a structural observation and not a sourced finding. It is arguably the most original thing in the piece and nothing supports it but its own logic.

**UM-10 · The causal chain in section 03.** Its framing of the sequence, and its claim that the open question is whether the recording caused what followed or made an existing argument persuasive. This is the piece's central thesis and it is, necessarily, the author's.

**UM-11 · The four-model taxonomy.** Section 05 classes the jurisdictions into express bar, separation principle, discretionary, and judicial seizure. Each individual reading is primary-verified against the statute. **Classification scheme itself is not published anywhere**, and the report describes it as the project's original contribution, which is another way of saying no source supports it.

This is the sharpest tension in the project. Charter forbids original analysis. A taxonomy is original analysis. Defense is that it organizes verified readings without generating new ones, although a reader entitled to check sources cannot check the scheme, and that should be visible and not assumed.

**UM-15 · "Widest frame any authority here applied."** Section 06's characterization of the Dryden commission. Verification confirmed the underlying facts comfortably, with 191 recommendations, all accepted, spanning deregulation, airline management, scheduling, equipment, training and regulatory oversight, and the inquiry is treated in the literature as a landmark in systemic investigation. But *widest* is a comparative judgment across this corpus, made by this project, and published nowhere. Same class as UM-11.

**UM-12 · "A cockpit voice recorder is a strange object in legal terms."** Section 02's framing of the surveillance bargain. Authorial, and unsupported.

---

## Absences characterized without a source for the absence

**UM-13 · Confidential reporting systems.**

Section 09 says these *"capture coordination catches by design, de-identified and non-adjudicated,"* and the section itself concedes that no specific published analysis is cited. That concession is honest and it does not make the description sourced. A claim about what a class of systems captures by design is a claim about their design documents, which are not in the register.

**Closes when:** one system's published design documentation is added, or the paragraph is cut. Section survives the cut, although it would lose its only partial answer to the denominator problem.

**UM-14 · "Never mention insurers."**

Section 10's strongest sentence is that the canonical histories *"never mention insurers, underwriters or premiums."* It is cited to the 1999 history at `not-documented`, which is the right tier and an awkward one: it is a claim about the **absence** of something in documents, and no citation can prove an absence, since only a reader checking the document can.

**Closes when:** it cannot fully close. Honest render is a claim about what a search found, attributed to this project's own search and not to a source. That is what the piece already says in `REPORT.md`, and the section should say it too.

---

## Why this register exists

Nine of these fifteen are closable with a source record or a cut. Five are not: UM-09 through UM-12 are the piece's own reasoning, and UM-14 is a negative that no citation can carry.

That distinction is the useful output. A publication claiming that every factual assertion resolves to a source has to be able to say which of its sentences are *not* factual assertions, and the honest answer is that its central thesis, its taxonomy and its best structural argument are all in that category.

They are not weaker for it, although they are differently accountable, and a reader who has been promised source resolution should be told which is which.
