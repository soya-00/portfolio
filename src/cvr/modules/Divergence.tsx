import { useState } from "react";
import { cn } from "@/lib/utils";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  FIELDS,
  FIELD_GROUP,
  FIELD_LABEL,
  LANGUAGE_NAME,
  REGIME_DEFINITION,
  REGIME_LABEL,
  TRANSLATION_LABEL,
  absentCount,
  blankOnProtection,
  byTier,
  cellCount,
  documentedCount,
  regimeGroups,
  rows,
  topCourtTests,
  translationCaveats,
  type Cell,
  type Row,
} from "@/cvr/lib/jurisdictions";
import DivergenceMap from "@/cvr/modules/DivergenceMap";
import DivergenceText from "@/cvr/modules/Divergence.text";

/**
 * A recording in law, jurisdiction by jurisdiction.
 *
 * FORM. Fourteen jurisdictions against six fields, every cell holding a
 * category rather than a quantity, so this is a categorical grid and not a
 * chart. Nothing here has a magnitude to plot: "Article 359(1)" is not more
 * or less than "no bar located", it is a different kind of thing.
 *
 * COLOUR. State is carried by glyph, by fill pattern and by a written label,
 * and by hue last or not at all. Two independent reasons land on the same
 * rule. The portfolio holds one accent, so a five-way colour split would have
 * to invent four hues the design system does not have. And a categorical
 * palette stops being separable somewhere around seven meaning-bearing
 * classes anyway, which is roughly where this lands once absence is counted.
 * No categorical hue set exists here, so there is no palette to validate —
 * an exemption, and not a check that was skipped.
 *
 * The one ordinal dimension is how well a documented cell is established,
 * running primary, official translation, secondary, brief. That takes a
 * monotone ramp of filled blocks, which is a ramp in glyph rather than in
 * colour.
 *
 * ABSENCE IS NOT THE BOTTOM OF THAT RAMP. It is a different kind, and it
 * gets a different treatment: hatched fill, an em rule, and the words "not
 * documented". The section says why in advance, and the whole module fails
 * if this one distinction fails.
 */

type View = "grid" | "map" | "models" | "statutes";

const VIEWS: { id: View; label: string; hint: string }[] = [
  { id: "grid", label: "What is established", hint: "All fourteen jurisdictions against all six fields, showing which cells rest on a document and which were never established" },
  { id: "map", label: "Where they apply", hint: "A schematic world showing each territorial jurisdiction and how much of it is established" },
  { id: "models", label: "The four models", hint: "The classification, its definitions, and the two tests at the top of a legal system" },
  { id: "statutes", label: "What each says", hint: "The documented value of every field, with its source and how well it is established" },
];

/** Monotone ramp. Four blocks, and every documented tier keeps at least one. */
const RAMP: Record<string, string> = {
  "primary-verified": "▰▰▰▰",
  "official-translation-verified": "▰▰▰▱",
  "secondary-only": "▰▰▱▱",
  "brief-only": "▰▱▱▱",
};

const SHORT: Record<string, string> = {
  "primary-verified": "Primary",
  "official-translation-verified": "Translation",
  "secondary-only": "Secondary",
  "brief-only": "Brief",
};

function GridCell({ cell }: { cell: Cell }) {
  if (cell.kind === "absent") {
    return (
      <td className="hatch border border-border/50 p-0 align-middle">
        <span className="flex flex-col items-center justify-center px-2 py-2.5 text-center">
          <span aria-hidden="true" className="text-muted-foreground">
            —
          </span>
          <span className="font-display mt-0.5 block text-[8px] uppercase leading-tight tracking-[0.08em] text-muted-foreground">
            Not documented
          </span>
        </span>
      </td>
    );
  }
  return (
    <td className="border border-border/50 p-0 align-middle">
      <span className="flex flex-col items-center justify-center px-2 py-2.5 text-center">
        <span aria-hidden="true" className="text-[10px] tracking-[0.1em] text-accent">
          {RAMP[cell.verification] ?? "▰▱▱▱"}
        </span>
        <span className="font-display mt-0.5 block text-[8px] uppercase leading-tight tracking-[0.08em] text-muted-foreground">
          {SHORT[cell.verification] ?? cell.verification}
        </span>
      </span>
    </td>
  );
}

function RowHead({ r }: { r: Row }) {
  return (
    <th
      scope="row"
      className="border border-border/50 py-2 pl-2 pr-3 text-left align-middle font-normal"
    >
      <span className="block text-foreground/90">{r.country}</span>
      <span className="font-display block text-[9px] uppercase leading-tight tracking-[0.1em] text-muted-foreground/70">
        {REGIME_LABEL[r.regime]}
        {r.translation === "original-read" && " · original"}
        {r.translation === "unofficial-translation" && " · unofficial"}
      </span>
    </th>
  );
}

export default function Divergence({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [view, setView] = useState<View>("grid");

  return (
    <section
      id="the-comparison"
      aria-labelledby="the-comparison-heading"
      className="module my-12 scroll-mt-24 border-y border-border py-8"
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Module · two of four
      </p>
      <h3
        id="the-comparison-heading"
        className="font-display mt-2 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
      >
        A recording in law, jurisdiction by jurisdiction
      </h3>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        The same object, read under fourteen legal systems. What the grid
        reports first is not which country protects a recording most, but how
        much of the comparison rests on a document anyone can go and check.
      </p>

      {/* BR2 / UM-11. Persistent, in every view, and above the data rather
          than under it: the reader meets the caveat before the grid, because
          the grid's own organising axis is the thing being qualified. */}
      <div className="mt-5 max-w-[68ch] border-l-2 border-accent/60 pl-4 text-sm leading-relaxed">
        <p className="font-display text-[10px] uppercase tracking-[0.16em] text-accent">
          The axis of this comparison is unsourced
        </p>
        <p className="mt-1.5 text-muted-foreground">
          Each statutory reading below was made against the instrument in its
          own language and can be checked. The four-model classification that
          organises them is this project's own, and it is published nowhere.
          A reader entitled to check sources can check every row and cannot
          check the scheme the rows are sorted into.
        </p>
      </div>

      <div className="module-interactive">
        {/* Two numbers and no plot. The split is the whole finding and it
            happens to be exact, so drawing it would add nothing a reader
            cannot get from the pair. */}
        <dl className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          <div className="bg-background px-5 py-4">
            <dt className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="text-accent">▰</span>
              Rests on a document
            </dt>
            <dd className="font-display mt-1 text-4xl font-bold tabular-nums text-foreground">
              {documentedCount}
              <span className="ml-2 text-base font-normal text-muted-foreground/70">
                of {cellCount}
              </span>
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground/70">
              {byTier["primary-verified"]} of them read against the instrument
              itself
            </dd>
          </div>
          <div className="bg-background px-5 py-4">
            <dt className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="text-muted-foreground">—</span>
              Never established
            </dt>
            <dd className="font-display mt-1 text-4xl font-bold tabular-nums text-foreground">
              {absentCount}
              <span className="ml-2 text-base font-normal text-muted-foreground/70">
                of {cellCount}
              </span>
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground/70">
              Searched across three research rounds and not found. Not a
              finding that no rule exists
            </dd>
          </div>
        </dl>

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
              <span aria-hidden="true" className="mr-1.5">
                {view === v.id ? "◼" : "◻"}
              </span>
              {v.label}
            </button>
          ))}
        </div>

        <p className="no-js-only mt-6 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground/80">
          Switching between views needs scripting, which is unavailable. The
          grid below is complete, and the textual equivalent at the foot of
          this module carries the four models, both court tests and every
          statutory reading as continuous prose.
        </p>

        {view === "grid" && (
          <div className="mt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              {(["primary-verified", "secondary-only", "brief-only"] as const).map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-[10px] tracking-[0.1em] text-accent">
                    {RAMP[t]}
                  </span>
                  {VERIFICATION_LABEL[t]}
                </li>
              ))}
              <li className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="hatch inline-block h-3 w-6 border border-border/60"
                />
                Not documented
              </li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[46rem] table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">
                  Fourteen jurisdictions against six fields. Each cell shows
                  how well that field is established, or that it was never
                  established at all.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-[9.5rem] border border-border/50 px-2 py-2">
                      <span className="sr-only">Jurisdiction</span>
                    </th>
                    {FIELDS.map((f) => (
                      <th
                        key={f}
                        scope="col"
                        className="border border-border/50 px-2 py-2 text-center"
                      >
                        <span className="font-display block text-[9px] font-normal uppercase leading-tight tracking-[0.12em] text-muted-foreground/80">
                          {FIELD_LABEL[f]}
                        </span>
                        <span className="font-display block text-[8px] font-normal uppercase tracking-[0.1em] text-muted-foreground/50">
                          {FIELD_GROUP[f]}
                        </span>
                      </th>
                    ))}
                    <th scope="col" className="w-[3rem] border border-border/50 px-2 py-2 text-center">
                      <span className="font-display block text-[9px] font-normal uppercase tracking-[0.12em] text-muted-foreground/80">
                        Of six
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <RowHead r={r} />
                      {FIELDS.map((f) => (
                        <GridCell key={f} cell={r.cells[f]} />
                      ))}
                      <td className="border border-border/50 px-2 py-2 text-center">
                        <span className="font-display tabular-nums text-foreground/80">
                          {r.documented}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
              The whole protection side is blank for{" "}
              {blankOnProtection.length} jurisdictions:{" "}
              {blankOnProtection.map((r) => r.country).join(", ")}. Each is in
              this comparison for another reason, and each is a hole in it.
              The United Kingdom is the one that costs most, since it is here
              through a major accident investigation and its protection rules
              were never separately established.
            </p>
          </div>
        )}

        {view === "map" && <DivergenceMap />}

        {view === "models" && (
          <div className="mt-6 space-y-8">
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {regimeGroups.map((g) => (
                <div key={g.regime} className="bg-background px-5 py-4">
                  <p className="font-display text-[11px] uppercase tracking-[0.14em] text-accent">
                    {REGIME_LABEL[g.regime]}
                    <span className="ml-2 tabular-nums text-muted-foreground/60">
                      {g.members.length}
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {g.regime === "NOT-DOCUMENTED"
                      ? "No classification was established. These are not a fifth model; they are jurisdictions the research did not reach."
                      : REGIME_DEFINITION[g.regime]}
                  </p>
                  <p className="mt-2 text-sm text-foreground/85">
                    {g.members.map((m) => m.country).join(", ") || "None"}
                  </p>
                </div>
              ))}
            </div>

            {/* Both, or neither. Showing only Brazil would make the
                express-bar model look sturdier than the record supports. */}
            <div>
              <h4 className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Two tested at the top of a legal system
              </h4>
              <p className="mt-1.5 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                They went opposite ways, and the one that went against
                protection concerned the recorder directly.
              </p>
              <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {topCourtTests.map((t) => (
                  <div key={t.id} className="bg-background px-5 py-4">
                    <p className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
                      <span aria-hidden="true">
                        {t.outcome === "upheld" ? "▲" : "▼"}
                      </span>
                      {t.country} · {t.heading}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                      {t.account}
                    </p>
                    {t.source && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
                        <cite className="not-italic">{t.source.citation}</cite>
                        {t.source.url && (
                          <>
                            {" · "}
                            <a
                              href={t.source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-border underline-offset-2 transition-colors hover:decoration-accent"
                            >
                              Source
                            </a>
                          </>
                        )}
                        {" · "}
                        {VERIFICATION_LABEL[t.source.verification]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "statutes" && (
          <div className="mt-6 space-y-8">
            {rows.map((r) => (
              <div key={r.id} className="border-t border-border/60 pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h4 className="font-display text-base uppercase tracking-[0.06em] text-foreground">
                    {r.country}
                  </h4>
                  <p className="font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    {REGIME_LABEL[r.regime]} ·{" "}
                    {LANGUAGE_NAME[r.language] ?? r.language} ·{" "}
                    {TRANSLATION_LABEL[r.translation]}
                  </p>
                </div>
                <dl className="mt-3 space-y-3">
                  {FIELDS.map((f) => {
                    const c = r.cells[f];
                    return (
                      <div key={f} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
                        <dt className="font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                          {FIELD_LABEL[f]}
                        </dt>
                        {c.kind === "absent" ? (
                          <dd className="hatch mt-0.5 border-l-2 border-border pl-3 text-sm text-muted-foreground sm:mt-0">
                            <span aria-hidden="true">— </span>
                            Not documented. Searched and not established, which
                            is not the same as a finding that no rule exists.
                          </dd>
                        ) : (
                          <dd className="mt-0.5 text-sm leading-relaxed text-foreground/85 sm:mt-0">
                            {c.value}
                            <span className="mt-1 block text-xs text-muted-foreground/70">
                              <span aria-hidden="true" className="mr-1.5 tracking-[0.1em] text-accent">
                                {RAMP[c.verification]}
                              </span>
                              {VERIFICATION_LABEL[c.verification]}
                              {c.source && (
                                <>
                                  {" · "}
                                  <cite className="not-italic">{c.source.citation}</cite>
                                </>
                              )}
                            </span>
                            {c.note && (
                              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground/60">
                                {c.note}
                              </span>
                            )}
                          </dd>
                        )}
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
            {translationCaveats.length > 0 && (
              <p className="max-w-[68ch] border-l-2 border-border pl-4 text-xs leading-relaxed text-muted-foreground/75">
                {translationCaveats.map((r) => r.country).join(", ")}:{" "}
                {translationCaveats.length === 1 ? "read" : "read"} through an
                unofficial translation. Any English rendering of the
                instrument is unofficial and is marked as such here rather
                than presented as the text.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="module-equivalent">
        <DivergenceText />
      </div>
    </section>
  );
}
