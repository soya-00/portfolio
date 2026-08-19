---
layer: true
slug: redaction-note
title: Why the names are missing
parent: 00-methods
---

# Why the names are missing

Where a quotation from an official report appears with a role in square brackets — `[the Captain]`, `[the First Officer]` — a name has been removed and the person's role put in its place. Nothing else in the quotation has been changed. An ellipsis ( … ) means something was left out; brackets mean something was replaced.

The reason is a limit this piece sets for itself. The people whose voices were recorded did not choose to be studied, and they cannot object to how they are described. Investigators analysed what they said, and that analysis is the subject here — but their names are not needed for it, and using them would turn a document about how institutions read evidence into a document about individuals.

This is a choice, and it costs something: a redacted quotation is no longer exactly what the source says. The unaltered text is held in this project's data and checked against the original for every quotation on this page, so that what you read differs from the source in exactly the declared ways and no others.

## How this is checked

The unaltered text of every quotation is held in this project's data and is never rendered. What appears on the page must be reproducible from the stored text by applying only the declared substitutions and omissions — so the rendered quotation differs from the source in exactly the declared ways and no others. A build in which any other difference has crept in does not ship.

This is a derivation proof rather than a search for suspicious characters. It cannot tell whether a particular redaction was a good idea, and it does not try; where a redaction covers an unusually large share of a passage, or falls inside the clause carrying the analytic weight, the build raises it for a person to look at rather than failing on its own judgment.
