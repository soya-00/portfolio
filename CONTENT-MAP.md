# Content map — build reference

Every section is directly linkable and readable cold. No gating, no required sequence.

## Core path — 4,593 words, 20.9 min reading, 24.9 min with interaction (PASS: 20–25 min)

| # | File | Slug | Words | Renders |
|---|---|---|---|---|
| 0 | `00-methods.md` | methods | 468 | prose + redaction pointer |
| 1 | `01-before-the-recorder.md` | before-the-recorder | 239 | prose |
| 2 | `02-the-instrument-arrives.md` | the-instrument-arrives | 291 | prose + ICAO timeline |
| 3 | `03-portland.md` | portland | 392 | prose + deep-tier entry point |
| 4 | `04-the-workshop.md` | the-workshop | 375 | prose + origin-chain diagram |
| 5 | `05-divergence.md` | divergence | 613 | **spine** — `jurisdictions.json` comparison |
| 6 | `06-six-readings.md` | six-readings | 490 | six-case selector |
| 7 | `07-generations.md` | generations | 423 | generational schema, marked as one lineage |
| 8 | `08-the-culture-argument.md` | the-culture-argument | 453 | two-column contested node |
| 9 | `09-what-cannot-be-seen.md` | what-cannot-be-seen | 410 | denominator visualisation |
| 10 | `10-causes-we-cannot-evidence.md` | causes-we-cannot-evidence | 439 | five-candidate evidence matrix |

## Apparatus — always reachable, outside the timed path

| File | Slug | Renders |
|---|---|---|
| `11-what-this-does-not-say.md` | what-this-does-not-say | `cutlist.json` |
| `12-onward.md` | onward | onward list with access status; 23 explicit source mappings |
| `unmapped.md` | unmapped | 14-entry register of unsupported assertions |

## Optional layers

| File | Parent |
|---|---|
| `layers/redaction-note.md` | 00-methods |
| `layers/divergence-gaps.md` | 05-divergence |
| `layers/effectiveness.md` | 07-generations |
| `layers/adjudication.md` | 08-the-culture-argument |

## Sidecars

| File | Purpose | Status |
|---|---|---|
| `content/citations.json` | **113 entries**, all 17 sections and layers covered. 86 source refs, 10 cut-list refs, 7 corpus refs, 6 governance refs, 4 pointing at the unmapped register | DRAFT — mechanically verified, needs editorial ratification |
| `content/unmapped.md` | **14 assertions no source supports.** The only output no validator can produce; R12 fails if it is missing or empty | Complete |
| `content/labels.json` | 27 display labels. Prose names cases by place and year, data by operator and flight; the transform is not mechanical, so each is explicit | Complete |
| `content/single-origin.json` | 3 claims resting on a single origin, recorded from prose that already states the dependency. Not inferred — no field encodes it | Complete |

## Data bindings

| Component | Source | Notes |
|---|---|---|
| Jurisdiction comparison | `jurisdictions.json` | `NOT-DOCUMENTED` must render as an explicit marker, never an empty cell |
| Accident selector | `accidents.json` | filter by `tier`; `sensitivity` governs default collapse |
| Six-case deep tier | `accidents.json` where `tier == "deep"` | `transcript.reproducible` governs whether transcript material renders |
| Cut list | `cutlist.json` | reader-facing |
| Source apparatus | `sources.json` | every citation resolves here; show `access` honestly |
| Quotations | `quotations.json` | render `rendered` only, never `verbatim`; `status != "verified"` must not render |
| Sensitivity control | `content/SENSITIVITY.md` + `accidents[].sensitivity` | default collapsed; join via `labels.json` |
| Citations | `content/citations.json` | anchor matches once in section; gate rule R12 |
| Unmapped assertions | `content/unmapped.md` | render the marker at the anchor, link to the register entry |
| Single-origin markers | `content/single-origin.json` | renders as "X argues that…", never as fact |

## Settings the piece must survive with no loss of information

Motion off · largest text size · 200% zoom · all layers collapsed · sensitivity at most restrictive · JavaScript disabled (body text, citations and textual equivalents all reachable).

## Four textual equivalents required

Jurisdiction comparison · origin-chain diagram · denominator visualisation · five-candidate evidence matrix. Each must be discoverable by a screen-reader user who has not been told it exists.
