import Disclosure from "@/cvr/primitives/Disclosure";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  TIER_LABEL,
  byTier,
  counted,
  savesOrigin,
  substitutes,
} from "@/cvr/lib/denominator";

/**
 * The module's textual equivalent, shipped in the same commit as the module.
 *
 * The figure's argument is that one side has a number and the other has
 * none, which survives into prose without loss. This equivalent is arguably
 * the clearer of the two forms.
 */
export default function DenominatorText() {
  return (
    <Disclosure
      id="the-denominator-text"
      kicker="Textual equivalent"
      label="The denominator, as continuous text"
      summary="What the corpus counts, what it cannot count, and the three partial substitutes with their limits."
    >
      <div className="prose-cvr space-y-4 text-sm">
        <p>
          The corpus holds {counted.length} records, and every one of them was
          selected by the same rule: something went wrong badly enough to
          trigger an investigation. They divide into{" "}
          {byTier
            .map((t) => `${t.members.length} ${TIER_LABEL[t.tier].toLowerCase()}`)
            .join(", ")}
          .
        </p>
        <p>
          There is no denominator. Nobody investigates the flights where a
          first officer raised a concern and the captain acted on it, and no
          authority publishes a report on the approach that was stabilized
          because somebody called it. Those recordings are overwritten, on a
          loop, within hours. The evidence of coordination working is
          destroyed by design, and the evidence of it failing is preserved,
          transcribed, analyzed and published.
        </p>
        <p>
          So the accident corpus can establish that poor coordination appears
          in accidents. It cannot establish how often good coordination
          prevents them, because the comparison case is unrecorded. No number
          is given for that side anywhere in this piece, and the figure gives
          it no size either, since any size would be a ratio no source
          supports.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Three partial substitutes, none sufficient
        </h4>
        {substitutes.map((s) => (
          <p key={s.id}>
            <span className="text-foreground/90">{s.label}.</span> {s.can}{" "}
            {s.cannot}
            {s.id === "saves" && savesOrigin && (
              <> Single origin: {savesOrigin.attribution} {savesOrigin.note}</>
            )}
            {s.source && (
              <span className="text-muted-foreground/70">
                {" "}
                <cite className="not-italic">{s.source.citation}</cite>.{" "}
                {VERIFICATION_LABEL[s.source.verification]}.
              </span>
            )}
          </p>
        ))}

        <p>
          An interactive piece can easily present a corpus as though it were a
          sample. This is a census of failures and not a sample, and a
          discipline built on studying accidents will tend to find that
          accidents are what its subject explains.
        </p>
      </div>
    </Disclosure>
  );
}
