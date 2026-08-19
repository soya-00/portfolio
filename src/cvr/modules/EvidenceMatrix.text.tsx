import Disclosure from "@/cvr/primitives/Disclosure";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  STRENGTH_LABEL,
  corpusGrid,
  decades,
  omittedDimensions,
  ranked,
  untestable,
  withSources,
} from "@/cvr/lib/candidates";

/**
 * The module's textual equivalent, shipped in the same commit as the module.
 *
 * The ranking is the payload and it survives into prose intact, so this is
 * the same argument in the same order, with each candidate's evidence, its
 * flags and its sources.
 */
export default function EvidenceMatrixText() {
  return (
    <Disclosure
      id="the-candidates-text"
      kicker="Textual equivalent"
      label="The candidates, as continuous text"
      summary="All five candidates with their evidence, their flags and their sources, and the corpus comparison."
    >
      <div className="prose-cvr space-y-4 text-sm">
        <p>
          Five candidate causes were tested. They are ranked below by how well
          each is documented, which is not the same as how much each mattered.
          The scale runs from well documented down to not documented, and one
          candidate sits off it entirely.
        </p>

        {ranked.map(withSources).map((c, i) => (
          <p key={c.id}>
            <span className="text-foreground/90">
              {i + 1}. {c.label} · {STRENGTH_LABEL[c.strength]}.
            </span>{" "}
            {c.verdict} {c.evidence} What it leaves behind: {c.leaves}
            {c.flag && <> {c.flag}</>}
            {c.resolved.length > 0 && (
              <span className="text-muted-foreground/70">
                {" "}
                {c.resolved
                  .map((s) => `${s.citation}. ${VERIFICATION_LABEL[s.verification]}.`)
                  .join(" ")}
              </span>
            )}
          </p>
        ))}

        {untestable.map((c) => (
          <p key={c.id}>
            <span className="text-foreground/90">{c.label} · off the scale.</span>{" "}
            {c.verdict} {c.evidence} It carries no rank, because a question the
            record cannot answer is not a weaker grade of evidence.
          </p>
        ))}

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          The asymmetry
        </h4>
        <p>
          Regulatory action leaves document numbers, union advocacy leaves
          published position papers, and insurance underwriting leaves
          commercial records that are not public and were never written for an
          outside reader. An absence of evidence produced by a documentation
          asymmetry is not evidence of absence. It does not mean insurers were
          unimportant; it means that if insurers had been decisive, this
          research would probably not be able to show it.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          The corpus by authority and decade
        </h4>
        {corpusGrid.map((r) => (
          <p key={r.authority}>
            <span className="text-foreground/90">{r.authority}:</span>{" "}
            {r.cells
              .filter((c) => c.n > 0)
              .map((c) => `${c.n} in the ${c.decade}`)
              .join(", ")}
            . {r.total} in total.
          </p>
        ))}
        <p>
          {decades.length} decades are represented. Authority and decade are
          the only two dimensions with a sourced schema field, so they are the
          only two shown. {omittedDimensions.join("; ")} would each improve
          this comparison and none exists in the data, so each is named rather
          than approximated. This is a bounded illustrative selection and not a
          representative sample of accidents.
        </p>
      </div>
    </Disclosure>
  );
}
