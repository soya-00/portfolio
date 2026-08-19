import {
  ACCESS_LABEL,
  KIND_GLYPH,
  KIND_LABEL,
  VERIFICATION_LABEL,
  unmappedEntries,
  type Citation,
} from "@/cvr/lib/citations";

/**
 * The citation primitive. Built once and used everywhere.
 *
 * Phrasing content only — a span, an anchor and more spans — because a
 * citation lives mid-sentence inside a <p>, and <details> is flow content.
 * An earlier build used <details> and the HTML parser closed the paragraph at
 * every marker: seventeen of seventeen citations in the divergence section
 * were ejected out of their paragraph, splitting sentences across lines and
 * stranding a bare full stop on its own. Valid nesting is not pedantry here.
 *
 * Opening is driven by :target, so it works with JavaScript disabled, is
 * reachable and operable from the keyboard, and makes every citation
 * independently deep-linkable — which the charter asks of every disclosure.
 *
 * Five kinds, because a claim resting on a statute and a claim resting on the
 * author's own reasoning are not the same object and must not look the same.
 * The glyph carries the distinction; colour never carries it alone.
 */
export default function Cite({ c }: { c: Citation }) {
  const glyph = KIND_GLYPH[c.kind];
  const kindLabel = KIND_LABEL[c.kind];
  const panelId = `cite-${c.id}`;
  const markerId = `from-${c.id}`;

  return (
    <span className="cite">
      <a
        id={markerId}
        href={`#${panelId}`}
        className="cite-marker font-display"
        aria-label={`${kindLabel}, reference ${c.ordinal}`}
      >
        <span aria-hidden="true">{glyph}</span>
        <span className="tabular-nums">{c.ordinal}</span>
      </a>

      <span id={panelId} className="cite-panel" role="note">
        <span className="font-display block text-[0.85em] uppercase tracking-[0.14em] text-foreground/70">
          {glyph} {kindLabel}
        </span>

        {c.kind === "source" && c.source && (
          <>
            <cite className="mt-1 block not-italic text-foreground/90">
              {c.source.citation}
            </cite>
            {c.locator && <span className="block">At {c.locator}.</span>}
            <span className="mt-1 block">
              {c.source.authority} · {ACCESS_LABEL[c.source.access]} ·{" "}
              {c.source.licence.status === "cite-only"
                ? "Cite only, not reproducible"
                : c.source.licence.status === "undetermined"
                  ? "Reproduction terms not established"
                  : "Reproducible"}
            </span>
            {c.source.url ? (
              <a
                href={c.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block break-all text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
              >
                {c.source.url}
              </a>
            ) : (
              <span className="mt-1 block text-muted-foreground/80">
                No online copy located. Cited offline.
              </span>
            )}
            {c.source.archive_url && (
              <a
                href={c.source.archive_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block break-all text-foreground/80 underline decoration-border underline-offset-4 hover:decoration-accent"
              >
                Archived copy
              </a>
            )}
          </>
        )}

        {c.kind === "cut" && (
          <span className="mt-1 block">
            Examined and cut. This claim does not appear anywhere in the piece.
            Cut list entry {c.cut_ref}.
          </span>
        )}

        {c.kind === "corpus" && (
          <span className="mt-1 block">
            Derived from the corpus itself rather than from an outside source:{" "}
            <span className="text-foreground/90">{c.corpus_ref}</span>.
          </span>
        )}

        {c.kind === "governance" && (
          <span className="mt-1 block">
            States a rule this piece sets for itself, recorded in{" "}
            <span className="text-foreground/90">{c.governance_ref}</span>.
          </span>
        )}

        {c.kind === "unmapped" && (
          <span className="mt-1 block">
            <span className="text-foreground/90">
              No source supports this sentence.
            </span>{" "}
            It is the author's reasoning rather than a sourced claim, and is
            registered as {c.unmapped_ref}
            {c.unmapped_ref && unmappedEntries[c.unmapped_ref]
              ? `: ${unmappedEntries[c.unmapped_ref]}.`
              : "."}{" "}
            <a
              href="#unmapped"
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
            >
              The register sets out why
            </a>
            .
          </span>
        )}

        {c.verification && (
          <span className="mt-2 block text-muted-foreground/80">
            {VERIFICATION_LABEL[c.verification]}.
          </span>
        )}

        {c.note && (
          <span className="mt-1 block text-muted-foreground/80">{c.note}</span>
        )}

        <a href={`#${markerId}`} className="cite-close font-display">
          Close reference
        </a>
      </span>
    </span>
  );
}
