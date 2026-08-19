import Disclosure from "@/cvr/primitives/Disclosure";
import { ACCESS_LABEL } from "@/cvr/lib/citations";
import {
  LANGUAGE_NAME,
  ellipsis,
  grounds,
  ledger,
  redaction,
  reproduced,
  reproducibleCount,
  withheldCount,
  withheldQuotations,
} from "@/cvr/lib/document";

/**
 * The module's textual equivalent, shipped in the same commit as the module.
 *
 * Equivalent rather than summary: the same records, the same grounds, the
 * same provenance, in a shape that does not require operating a control. For
 * a citation-heavy piece a real share of the primary audience will prefer it
 * outright, so it is a peer of the module rather than a fallback from it.
 *
 * Reachable three ways: this control, a direct link to its id, and the global
 * alternatives setting.
 */
export default function TheDocumentText() {
  return (
    <Disclosure
      id="the-document-text"
      kicker="Textual equivalent"
      label="The document, as continuous text"
      summary="Every record, ground and reproduced passage from the module above, without the controls."
    >
      <div className="prose-cvr space-y-4 text-sm">
        <p>
          Of the {ledger.length} records in this corpus, {reproducibleCount}{" "}
          carry an explicit reuse grant covering the investigating authority's
          report, and {withheldCount} do not. What a reader may be shown is
          settled by {grounds.length} distinct legal grounds, listed below, and
          in two cases by an investigation that has not concluded.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Grounds, most frequent first
        </h4>
        <ul className="space-y-1 pl-5">
          {grounds.map((g) => (
            <li key={g.basis} className="list-disc marker:text-accent/60">
              {g.basis} — {g.count} {g.count === 1 ? "record" : "records"},{" "}
              {g.reproducible ? "quotable" : "cite only"}.
            </li>
          ))}
        </ul>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Records that cannot be quoted
        </h4>
        <p>
          {ledger
            .filter((r) => !r.reproducible)
            .map((r) => r.display)
            .join("; ")}
          .
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Records that can
        </h4>
        <p>
          {ledger
            .filter((r) => r.reproducible)
            .map((r) => r.display)
            .join("; ")}
          .
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Notation
        </h4>
        <p>{redaction.rule}</p>
        <p>{redaction.notation}</p>
        <p>{redaction.storage}</p>
        <p>{ellipsis.rule}</p>
        <p>{ellipsis.rationale}</p>
        <p>
          No worked example accompanies these rules, because no verified
          quotation in this corpus carries a redaction or an elision.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Statute text reproduced in the original
        </h4>
        {reproduced.map((r) => (
          <p key={r.id}>
            <span lang={r.source.language}>{r.text}</span>
            {" — "}
            {r.source.citation}
            {r.locator ? `, ${r.locator}` : ""}.{" "}
            {LANGUAGE_NAME[r.source.language] ?? r.source.language},{" "}
            {ACCESS_LABEL[r.source.access]}, reproduced under an explicit grant.
          </p>
        ))}
        {withheldQuotations.length > 0 && (
          <p>
            A further {withheldQuotations.length === 1 ? "passage is" : `${withheldQuotations.length} passages are`}{" "}
            verified and not reproduced, the source being cite-only.
          </p>
        )}
      </div>
    </Disclosure>
  );
}
