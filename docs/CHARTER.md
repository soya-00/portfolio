1. Project in one sentence

An interactive case study showing how investigators in different countries read cockpit voice recorder evidence, and how those readings became Crew Resource Management.

2. Audience

Primary — the reader the piece is built for. A researcher or academic in human factors, aviation safety, safety science, or science and technology studies who already knows what CRM is, can name the canonical accidents, and has read at least some of the foundational literature. What they do not have is the international picture: they know the US and possibly the UK story, and they do not know when Japan mandated CRM, what Brazil's programme was called, or that CVR legal protection varies enough that the same evidence is admissible in one country's criminal court and inadmissible in another's. This reader is not here to learn the basics. They are here for the comparison, and they will check the sources.

Secondary. An informed general reader — someone who reads long-form journalism, has no aviation background, and arrived from a link. They need jargon defined on first use and no prior knowledge assumed, and they must be able to finish the core path without opening a single deeper layer.

Tertiary. [Your name] as portfolio evidence, shown to editors, research groups, and hiring committees who will judge it on sourcing discipline and information design rather than on visual polish.

Explicitly not the audience. Working pilots seeking training material, accident investigators seeking case reference, and families or friends of anyone in the corpus. The piece is not built for them, and the third group is a reason for several of the non-goals below.

3. Non-goals
This does not produce original analysis of transcripts. Every analytic claim — that a concern was raised, that it was hedged, that it went unacknowledged — is attributed to a named investigating authority or a peer-reviewed study, and that attribution is visible to the reader at the point of the claim. Where the literature disagrees, the piece shows the disagreement and does not adjudicate it.
This is not a comprehensive accident database. It is a bounded corpus of roughly twenty-five to thirty accidents chosen to illustrate documented patterns, and the selection criteria are published within the piece. It will never be complete, will not be updated as new accidents occur, and is not a substitute for the authorities' own databases.
This does not host, link to, embed, or describe cockpit audio. No recordings, no reconstructions, no simulated audio, no waveforms, no audio-derived visualisations. Transcripts are treated as documents.
This does not name individual crew members anywhere a reader can see. Crew appear by role only — Captain, First Officer, Flight Engineer, Controller — in body text, transcripts, annotations, alt text, accessible names, page titles, and metadata. Names remain in the cited source documents, where readers who need them can find them.
This is not a training product. No quizzes, no scoring, no progress certification, no assessment, no learning objectives, no gamification. The reader consumes and navigates; they are not evaluated.
This does not argue that CRM works. The effectiveness question is a large, contested empirical literature of its own, and the piece neither claims CRM reduced accidents nor claims it did not. Where effectiveness evidence is relevant to a historical decision, it is reported as what the actors at the time believed and what later evaluation found.
This does not second-guess official findings. No re-litigation of probable cause, no alternative theories, no engagement with contested-cause controversies except where the contest itself is documented in the published record and is the point being made.
This does not conduct original data collection. No interviews, no records requests, no correspondence with authorities, no archival visits. It works from published, publicly accessible material, and where that material is thin the piece says so rather than filling the gap.
This does not commemorate. It is not a memorial and does not tell victims' stories. People appear as sources of recorded speech that investigators analysed, which is a deliberately narrow frame and a limitation the piece states openly rather than disguises.
This does not cover military or general aviation as a parallel track. Commercial air transport only. Military aviation psychology appears solely as pre-history for CRM's origins.
This is not maintained. It is a dated publication with a stated research cutoff, not a living resource. Link rot will happen and the piece is designed to fail gracefully rather than to be curated indefinitely.
4. Done-condition

A reader who was not involved in building it can complete the core path using only a keyboard and a screen reader, reach an equivalent textual alternative for every interactive module, and trace every factual claim on screen to a citation that resolves to a live source.

Verified by these checks, each performed by someone uninvolved:

Sourcing. An automated pass over all rendered text finds zero factual assertions without a resolving source ID, and zero source IDs that fail to resolve to an entry in sources.json with a live URL or a documented offline citation.
Fabrication. An automated diff of every transcript line, date, casualty figure, report number, regulatory instrument number, and direct quotation rendered on screen against data/ returns zero items present on screen and absent from the corpus.
Keyboard. A tester completes the entire piece — every section, every module, every disclosure layer, every control — without touching a pointing device, logging zero keyboard traps and zero unreachable interactive elements.
Alternatives. A screen-reader user who has not been told the textual equivalents exist discovers and reaches all four of them.
Timing. Word count of the core path divided by 220 words per minute, plus measured interaction time, falls between 20 and 25 minutes; the same measure with all deeper layers expanded falls at or below 45.
Settings. The piece is complete and loses no information under: motion off, largest text size, 200% browser zoom, all deeper layers collapsed, and the sensitivity setting at its most restrictive.
Degradation. With JavaScript disabled, all body text is readable, all citations are visible, and all textual equivalents are reachable.
Editorial. A grep across every reader-facing surface returns zero crew proper names. A reader asked "does this piece argue that CVR evidence caused CRM?" answers that it presents the question as open.
5. Interfaces

Research corpus → build. Four markdown briefs and an audit in research/, converted into validated JSON in data/; the build treats both directories as read-only ground truth and may not originate a fact.

Data → build gate. scripts/validate.js runs before every build and fails the build on any analytic field lacking a source reference, any unresolved source ID, any dead link, any crew proper name in a reader-facing field, or any jurisdiction value that is null rather than an explicit not-documented marker.

Design system → build. Visual design and styling arrive from the project owner as a separate supplied codebase; the build makes structural, semantic, and behavioural decisions only, and no visual ones beyond what function requires.

Reader entry. Any section and any deeper layer is directly linkable and readable cold, with no gating and no required sequence, because a substantial share of arrivals will land mid-piece from a citation or a share.

Reader exit. The reader leaves holding a working account of how CVR evidence was read differently across jurisdictions, an explicit sense of which parts of that account are contested, and a short onward list matched to the sections they actually read.

Onward apparatus → external. Further reading hands off to primary report repositories, foundational papers, journals, datasets, and books, each carrying honest access status — open, paywalled, library, or purchase — so no reader follows a recommendation into a paywall unwarned.

Sensitivity markers → reader control. content/SENSITIVITY.md keys final-moments passages to a reader-facing setting whose default is collapsed-behind-a-control.

6. Deferred
Item	Condition that pulls it in
Non-English interface and content localisation	A partner institution or collaborator commits to translation review; machine translation of this material is not acceptable at any quality bar.
Deep-tier accidents beyond six	The Stage 5 timing measurement shows the core path landing under 20 minutes with room to spare.
Original coding of transcripts against a published scheme	Named academic supervision and institutional ethics review are in place — never on the strength of a portfolio project alone.
Saves and near-misses as their own chapter rather than corpus records	The research finds enough publicly reported cases to sustain a chapter; currently uncertain and a genuine gap in the public record.
Citable dataset release with a DOI	A researcher asks to cite or reuse the corpus.
Print or PDF long-form version	An editor or publication requests one.
Transfer into maritime, healthcare, and rail as a full chapter	The aviation material lands under budget, or a reader-facing signal shows demand.
Second research pass on jurisdictions documented only in non-English sources	Reader or specialist feedback identifies a specific national account the piece got wrong or missed.