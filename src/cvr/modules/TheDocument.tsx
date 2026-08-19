import { useState } from "react";
import { cn } from "@/lib/utils";
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
import { ACCESS_LABEL } from "@/cvr/lib/citations";
import TheDocumentText from "@/cvr/modules/TheDocument.text";

/**
 * The document, and what may be shown of it.
 *
 * Not a chart. The job here is identity and reason, not magnitude: thirteen
 * against fourteen is a stat pair, and the thing worth reading is the
 * nineteen distinct legal grounds behind the split. So it is a ledger, and
 * the reasons are quoted from the corpus rather than summarised.
 *
 * Every state carries a glyph and a word as well as its colour, so nothing
 * depends on hue — which is the portfolio's own standing rule and the
 * charter's.
 */

type View = "reproduction" | "notation" | "original";

const VIEWS: { id: View; label: string; hint: string }[] = [
  { id: "reproduction", label: "What may be shown", hint: "Reproduction status for all 27 records, and the ground for each" },
  { id: "notation", label: "How it is marked", hint: "The conventions governing brackets and ellipses" },
  { id: "original", label: "In the original", hint: "Statute text reproduced in its own language" },
];

const YES = "▣";
const NO = "▨";

export default function TheDocument({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [view, setView] = useState<View>("reproduction");
  const [onlyWithheld, setOnlyWithheld] = useState(false);

  const rows = onlyWithheld ? ledger.filter((r) => !r.reproducible) : ledger;

  return (
    <section
      id="the-document"
      aria-labelledby="the-document-heading"
      className="module my-12 scroll-mt-24 border-y border-border py-8"
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Module · one of four
      </p>
      <h3
        id="the-document-heading"
        className="font-display mt-2 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
      >
        The document, and what may be shown of it
      </h3>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        A reader cannot be handed a transcript here. Which of these records
        yields quotable text is settled by copyright law and, in two cases, by
        an investigation that has not finished — not by what the recording
        contained or by any judgement of ours.
      </p>

      <div className="module-interactive">
      {/* The headline pair. Two numbers, no plot: there is no magnitude to
          compare beyond the split itself. */}
      <dl className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {[
          { n: reproducibleCount, glyph: YES, label: "Quotable", sub: "An explicit reuse grant covers the report" },
          { n: withheldCount, glyph: NO, label: "Cite only", sub: "No grant located, or the report does not exist yet" },
        ].map((s) => (
          <div key={s.label} className="bg-background px-5 py-4">
            <dt className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="text-accent">{s.glyph}</span>
              {s.label}
            </dt>
            <dd className="font-display mt-1 text-4xl font-bold tabular-nums text-foreground">
              {s.n}
              <span className="ml-2 text-base font-normal text-muted-foreground/70">
                of {ledger.length}
              </span>
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground/70">{s.sub}</dd>
          </div>
        ))}
      </dl>

      {/* Filters in one row above the content. */}
      <div className="js-only mt-6 flex flex-wrap items-center gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => {
              setView(v.id);
              announce(`${v.label}. ${v.hint}`);
            }}
            className={cn(
              "font-display border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              view === v.id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-foreground/70 hover:border-accent/60 hover:text-foreground"
            )}
          >
            <span aria-hidden="true" className="mr-1.5">{view === v.id ? "◼" : "◻"}</span>
            {v.label}
          </button>
        ))}
      </div>

      <p className="no-js-only mt-6 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground/80">
        Switching between views needs scripting, which is unavailable. The
        ledger below is complete, and the textual equivalent at the foot of
        this module carries the notation rules and the reproduced statute text
        as continuous prose.
      </p>

      {view === "reproduction" && (
        <div className="mt-6">
          <button
            type="button"
            aria-pressed={onlyWithheld}
            onClick={() => {
              setOnlyWithheld((v) => !v);
              announce(
                onlyWithheld
                  ? `Showing all ${ledger.length} records`
                  : `Showing the ${withheldCount} records that cannot be quoted`
              );
            }}
            className="js-only font-display border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:border-accent/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden="true" className="mr-1.5">{onlyWithheld ? "◼" : "◻"}</span>
            Only what cannot be quoted
          </button>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Reproduction status for each record in the corpus, with the
                legal ground for it.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  {["Case", "Investigating authority", "Status", "Ground"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="font-display py-2 pr-4 text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground/70"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/40 align-top">
                    <th scope="row" className="py-3 pr-4 font-normal text-foreground/90">
                      {r.display}
                      {r.tier === "deep" && (
                        <span className="font-display ml-2 text-[9px] uppercase tracking-[0.14em] text-accent">
                          deep
                        </span>
                      )}
                    </th>
                    <td className="py-3 pr-4 text-muted-foreground">{r.authority}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "font-display text-[11px] uppercase tracking-[0.12em]",
                          r.reproducible ? "text-accent" : "text-muted-foreground"
                        )}
                      >
                        <span aria-hidden="true" className="mr-1.5">
                          {r.reproducible ? YES : NO}
                        </span>
                        {r.reproducible ? "Quotable" : "Cite only"}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground/85">{r.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
            {grounds.length} distinct grounds across {ledger.length} records.
            This is a bounded illustrative selection, not a representative
            sample of accidents.
          </p>
        </div>
      )}

      {view === "notation" && (
        <div className="mt-6 max-w-[68ch] space-y-5 text-sm leading-relaxed text-muted-foreground">
          <dl className="space-y-5">
            {[
              { t: "What may be redacted", d: redaction.rule },
              { t: "How a redaction is marked", d: redaction.notation },
              { t: "What is stored, and what is shown", d: redaction.storage },
              { t: "One elision, never two", d: ellipsis.rule },
              { t: "Why", d: ellipsis.rationale },
            ].map((x) => (
              <div key={x.t}>
                <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                  {x.t}
                </dt>
                <dd className="mt-1 text-foreground/85">{x.d}</dd>
              </div>
            ))}
          </dl>
          <p className="border-l-2 border-border pl-4 text-muted-foreground/75">
            No worked example is shown, because none of the verified quotations
            in this corpus carries a redaction or an elision. Inventing one to
            illustrate the convention would put a line on screen that no source
            supports.
          </p>
        </div>
      )}

      {view === "original" && (
        <div className="mt-6 space-y-6">
          {reproduced.map((r) => (
            <figure key={r.id} className="reproduced">
              <blockquote lang={r.source.language} className="reproduced-text">
                {r.text}
              </blockquote>
              <figcaption className="reproduced-source">
                <span className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                  {LANGUAGE_NAME[r.source.language] ?? r.source.language} ·{" "}
                  {ACCESS_LABEL[r.source.access]} · reproduced under an explicit grant
                </span>
                <cite className="mt-1 block not-italic text-foreground/85">
                  {r.source.citation}
                  {r.locator ? `, ${r.locator}` : ""}
                </cite>
                {r.note && (
                  <span className="mt-1 block text-muted-foreground/70">{r.note}</span>
                )}
              </figcaption>
            </figure>
          ))}

          {withheldQuotations.length > 0 && (
            <p className="max-w-[68ch] border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground/75">
              {withheldQuotations.length === 1 ? "One further passage is" : `${withheldQuotations.length} further passages are`}{" "}
              verified word for word and still not shown here: the source is
              cite-only, so quoting it would exceed the grant. It is described
              in the prose and cited instead.
            </p>
          )}
        </div>
      )}

      </div>

      <div className="module-equivalent">
        <TheDocumentText />
      </div>
    </section>
  );
}
