import Disclosure from "@/cvr/primitives/Disclosure";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  FIELDS,
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
  readInOriginal,
  regimeGroups,
  rows,
  topCourtTests,
} from "@/cvr/lib/jurisdictions";

/**
 * The module's textual equivalent, shipped in the same commit as the module.
 *
 * Equivalent and not summary: every jurisdiction, every field, every absence
 * and both court tests, in a shape that needs no control operated. A grid is
 * the wrong form for a screen reader and a good one for a sighted reader
 * scanning for holes, so both exist and neither is the fallback.
 */
export default function DivergenceText() {
  return (
    <Disclosure
      id="the-comparison-text"
      kicker="Textual equivalent"
      label="The comparison, as continuous text"
      summary="All fourteen jurisdictions, all six fields, both court tests and every absence, without the controls."
    >
      <div className="prose-cvr space-y-4 text-sm">
        <p>
          Fourteen jurisdictions are compared across six fields, giving{" "}
          {cellCount} cells. {documentedCount} rest on a document and{" "}
          {absentCount} were never established, which is an even split.
          Of the documented cells, {byTier["primary-verified"]} were read
          against the instrument itself, {byTier["secondary-only"]} come from a
          secondary account, and {byTier["brief-only"]} were carried from the
          project briefs and never re-read.
        </p>
        <p>
          The four-model classification that organises the comparison is this
          project's own and is published nowhere. Each individual statutory
          reading can be checked; the scheme they are sorted into cannot.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          The four models
        </h4>
        <dl className="space-y-3">
          {regimeGroups.map((g) => (
            <div key={g.regime}>
              <dt className="text-foreground/90">
                {REGIME_LABEL[g.regime]} · {g.members.length}
              </dt>
              <dd className="text-muted-foreground">
                {g.regime === "NOT-DOCUMENTED"
                  ? "No classification was established. These are not a fifth model; they are jurisdictions the research did not reach."
                  : REGIME_DEFINITION[g.regime]}
                {g.members.length > 0 && ` ${g.members.map((m) => m.country).join(", ")}.`}
              </dd>
            </div>
          ))}
        </dl>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Two tested at the top of a legal system
        </h4>
        {topCourtTests.map((t) => (
          <p key={t.id}>
            <span className="text-foreground/90">
              {t.country}, {t.heading}.
            </span>{" "}
            {t.account}{" "}
            {t.source && (
              <span className="text-muted-foreground/70">
                <cite className="not-italic">{t.source.citation}</cite>.{" "}
                {VERIFICATION_LABEL[t.source.verification]}.
              </span>
            )}
          </p>
        ))}
        <p>
          They went opposite ways, and the one that went against protection
          concerned the recorder directly. A comparison reporting only the
          Brazilian result would make the express-bar model look sturdier than
          the record shows.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Every jurisdiction, field by field
        </h4>
        {rows.map((r) => (
          <div key={r.id}>
            <p className="text-foreground/90">
              {r.country} · {REGIME_LABEL[r.regime]} ·{" "}
              {LANGUAGE_NAME[r.language] ?? r.language} ·{" "}
              {TRANSLATION_LABEL[r.translation]} · {r.documented} of{" "}
              {FIELDS.length} fields documented
            </p>
            <dl className="mt-1 space-y-1">
              {FIELDS.map((f) => {
                const c = r.cells[f];
                return (
                  <div key={f}>
                    <dt className="sr-only">{FIELD_LABEL[f]}</dt>
                    <dd className="text-muted-foreground">
                      <span className="text-foreground/75">{FIELD_LABEL[f]}:</span>{" "}
                      {c.kind === "absent" ? (
                        <>
                          not documented. Searched and not established, which is
                          not the same as a finding that no rule exists.
                        </>
                      ) : (
                        <>
                          {c.value}. {VERIFICATION_LABEL[c.verification]}
                          {c.source ? `, ${c.source.citation}` : ""}.
                          {c.note ? ` ${c.note}` : ""}
                        </>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Where the comparison is blank
        </h4>
        <p>
          {blankOnProtection.map((r) => r.country).join(", ")} carry nothing at
          all on the protection side. Each appears in this comparison for
          another reason and each is a hole in it. The United Kingdom is the
          costliest, since it is here through a major accident investigation
          and its protection rules were never separately established.
        </p>
        <p>
          {readInOriginal.length} of the statutory readings were made against
          the instrument in its own language:{" "}
          {readInOriginal.map((r) => r.country).join(", ")}. Japan was read
          through an unofficial translation, and no English rendering of the
          Japanese instruments is official.
        </p>
      </div>
    </Disclosure>
  );
}
