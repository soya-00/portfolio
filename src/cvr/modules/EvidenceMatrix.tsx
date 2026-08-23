import { useState } from "react";
import ScrollRegion from "@/components/ScrollRegion";
import { cn } from "@/lib/utils";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  STRENGTH_LABEL,
  STRENGTH_RAMP,
  corpusGrid,
  decades,
  omittedDimensions,
  ranked,
  untestable,
  withSources,
  type Strength,
} from "@/cvr/lib/candidates";
import EvidenceMatrixText from "@/cvr/modules/EvidenceMatrix.text";

/**
 * Five candidate causes, ranked by how well each is documented.
 *
 * FORM. An ordered comparison across one scale, so a ranked row chart. The
 * bar length and the ramp step both encode documentation strength, which is
 * the only place in this piece where a colour ramp is justified: the scale is
 * ordinal, reordering it changes the claim, and `color-formula` sends exactly
 * that case to one hue with monotone lightness.
 *
 * The ramp is validated rather than eyeballed. See index.css for the command
 * and its output. Colour still never travels alone: every step also carries a
 * filled-block glyph and its written label.
 *
 * WHAT THE FIGURE MUST NOT SAY. A ranked chart invites the reading that the
 * top bar is the strongest cause. It is not: it is the best documented, and
 * the section's argument is that the two come apart. The asymmetry note
 * carries that and sits with the figure rather than after it. Insurance
 * renders as not documented and never as did not happen.
 */

const FILL: Record<Strength, string> = {
  4: "hsl(var(--doc-4))",
  3: "hsl(var(--doc-3))",
  2: "hsl(var(--doc-2))",
  1: "hsl(var(--doc-1))",
};

export default function EvidenceMatrix({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [showCorpus, setShowCorpus] = useState(false);

  return (
    <section
      id="the-candidates"
      aria-labelledby="the-candidates-heading"
      className="module my-12 scroll-mt-24 border-y border-border py-8"
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Module · the evidence matrix
      </p>
      <h3
        id="the-candidates-heading"
        className="font-display mt-2 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
      >
        Five candidates, ranked by documentation
      </h3>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        The scale below measures how well each candidate is documented, and it
        does not measure how much each one mattered. The section's argument is
        that those two things come apart, and that the pattern of what is
        documented is itself a finding.
      </p>

      <div className="module-interactive">
        <ul className="mt-6 space-y-px overflow-hidden border border-border bg-border">
          {ranked.map(withSources).map((c) => (
            <li key={c.id} className="bg-background">
              <button
                type="button"
                aria-expanded={open === c.id}
                aria-controls={`cand-${c.id}`}
                onClick={() => {
                  const next = open === c.id ? null : c.id;
                  setOpen(next);
                  announce(
                    next
                      ? `${c.label}. ${STRENGTH_LABEL[c.strength]}. ${c.verdict} ${c.evidence}`
                      : "Collapsed"
                  );
                }}
                className="js-only w-full px-5 py-4 text-left transition-colors hover:bg-foreground/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span aria-hidden="true" className="text-accent">
                    {open === c.id ? "▾" : "▸"}
                  </span>
                  <span className="font-display text-sm uppercase tracking-[0.06em] text-foreground">
                    {c.label}
                  </span>
                  <span className="font-display ml-auto flex items-baseline gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                    <span aria-hidden="true" className="tracking-[0.1em] text-accent">
                      {STRENGTH_RAMP[c.strength]}
                    </span>
                    {STRENGTH_LABEL[c.strength]}
                  </span>
                </span>
                {/* Length and ramp step both carry the same ordinal value. */}
                <span
                  aria-hidden="true"
                  className="mt-2 block h-1.5 bg-border"
                >
                  <span
                    className="block h-full"
                    style={{
                      width: `${(c.strength / 4) * 100}%`,
                      background: FILL[c.strength],
                    }}
                  />
                </span>
              </button>

              <div
                id={`cand-${c.id}`}
                className={cn(
                  "chain-detail px-5 pb-4 text-sm leading-relaxed text-muted-foreground",
                  open === c.id ? "block" : "hidden"
                )}
              >
                <p className="no-js-only font-display pt-3 text-sm uppercase tracking-[0.06em] text-foreground">
                  {c.label} · {STRENGTH_LABEL[c.strength]}
                </p>
                <p className="mt-1 text-foreground/85">{c.verdict}</p>
                <p className="mt-2">{c.evidence}</p>
                <p className="mt-2 text-xs text-muted-foreground/75">
                  What it leaves behind: {c.leaves}
                </p>
                {c.flag && (
                  <p className="mt-2 border-l-2 border-accent/60 pl-3 text-xs leading-relaxed text-muted-foreground/85">
                    <span aria-hidden="true" className="mr-1 text-accent">◇</span>
                    {c.flag}
                  </p>
                )}
                {c.resolved.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground/70">
                    {c.resolved.map((s) => (
                      <li key={s.id}>
                        <cite className="not-italic">{s.citation}</cite> ·{" "}
                        {VERIFICATION_LABEL[s.verification]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Off the scale, and drawn off it. */}
        {untestable.map(withSources).map((c) => (
          <div key={c.id} className="mt-4 border border-dashed border-border px-5 py-4">
            <p className="font-display flex flex-wrap items-baseline gap-x-3 text-sm uppercase tracking-[0.06em] text-foreground">
              {c.label}
              <span className="font-display ml-auto text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                <span aria-hidden="true" className="mr-2">◇</span>
                Off the scale
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {c.verdict} {c.evidence}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              It carries no bar because it belongs to no rung. A question the
              record cannot answer is not a weaker grade of evidence, and
              placing it at the bottom of the ramp would say something false
              about it.
            </p>
          </div>
        ))}

        <div className="mt-6 max-w-[68ch] border-l-2 border-accent/60 pl-4 text-sm leading-relaxed">
          <p className="font-display text-[10px] uppercase tracking-[0.16em] text-accent">
            The unevenness is not random
          </p>
          <p className="mt-1.5 text-muted-foreground">
            Regulatory action leaves document numbers, union advocacy leaves
            published position papers, and insurance underwriting leaves
            commercial records that are not public and were never written for
            an outside reader. So a reader arriving here finds that the
            documented causes are institutional, and should be careful about
            what that means. It does not mean insurers were unimportant. It
            means that if insurers had been decisive, this research would
            probably not be able to show it.
          </p>
        </div>

        {/* The corpus comparison, on the two dimensions the data actually
            carries. The rest are named as omitted rather than approximated. */}
        <button
          type="button"
          aria-expanded={showCorpus}
          aria-controls="corpus-grid"
          onClick={() => {
            setShowCorpus((v) => !v);
            announce(
              showCorpus
                ? "Corpus comparison collapsed"
                : `The corpus by investigating authority and decade. ${corpusGrid.length} authorities across ${decades.length} decades.`
            );
          }}
          className="js-only font-display mt-8 border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:border-accent/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span aria-hidden="true" className="mr-1.5">
            {showCorpus ? "◼" : "◻"}
          </span>
          The corpus by authority and decade
        </button>

        <div
          id="corpus-grid"
          className={cn(
            "chain-detail mt-4",
            showCorpus ? "block" : "hidden"
          )}
        >
          <ScrollRegion labelledBy="corpus-grid-caption">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption id="corpus-grid-caption" className="sr-only">
                Records in the corpus by investigating authority and decade.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="font-display py-2 pr-4 text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground/70"
                  >
                    Investigating authority
                  </th>
                  {decades.map((d) => (
                    <th
                      key={d}
                      scope="col"
                      className="font-display px-2 py-2 text-center text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground/70"
                    >
                      {d}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="font-display px-2 py-2 text-center text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground/70"
                  >
                    All
                  </th>
                </tr>
              </thead>
              <tbody>
                {corpusGrid.map((r) => (
                  <tr key={r.authority} className="border-b border-border/40">
                    <th scope="row" className="py-2 pr-4 font-normal text-foreground/90">
                      {r.authority}
                    </th>
                    {r.cells.map((c) => (
                      <td
                        key={c.decade}
                        className="px-2 py-2 text-center tabular-nums text-muted-foreground"
                      >
                        {c.n === 0 ? (
                          <span aria-hidden="true" className="text-border">
                            ·
                          </span>
                        ) : (
                          c.n
                        )}
                        {c.n === 0 && <span className="sr-only">none</span>}
                      </td>
                    ))}
                    <td className="px-2 py-2 text-center tabular-nums text-foreground/80">
                      {r.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollRegion>
          <p className="mt-3 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
            Authority and decade are the only two dimensions with a sourced
            schema field, so they are the only two shown.{" "}
            {omittedDimensions.join("; ")} would each improve this comparison
            and none of them exists in the data. Deriving them would be
            original analysis, so they are named here rather than approximated.
            This is a bounded illustrative selection and not a representative
            sample of accidents.
          </p>
        </div>
      </div>

      <div className="module-equivalent">
        <EvidenceMatrixText />
      </div>
    </section>
  );
}
