import Disclosure from "@/cvr/primitives/Disclosure";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  chain,
  cutBranch,
  openQuestion,
  parallel,
  withSource,
} from "@/cvr/lib/origin";

/**
 * The module's textual equivalent, shipped in the same commit as the module.
 *
 * A diagram is the weakest of the four forms to meet without sight, since
 * its whole payload is spatial. So this is written as the argument rather
 * than as a description of boxes: the order, the join, the cut branch and
 * the open question, in the sequence a reader needs them.
 */
export default function OriginChainText() {
  return (
    <Disclosure
      id="the-chain-text"
      kicker="Textual equivalent"
      label="The chain, as continuous text"
      summary="Every link, its date, its source and its standing, with the second strand and the cut branch."
    >
      <div className="prose-cvr space-y-4 text-sm">
        <p>
          The chain runs through {chain.length} documents. Each is listed below
          in the order the section states, with the date it carries and the
          source it rests on. The order is the prose's, and the nodes are not
          placed on a measured time axis: two of the dates overlap to the month
          and one carries only a year, so a measured axis would assert a
          sequence the record does not establish.
        </p>

        <ol className="space-y-3">
          {chain.map(withSource).map((n, i) => (
            <li key={n.id}>
              <span className="text-foreground/90">
                {i + 1}. {n.label}, {n.when}.
              </span>{" "}
              {n.detail}{" "}
              {n.source && (
                <span className="text-muted-foreground/70">
                  <cite className="not-italic">{n.source.citation}</cite>.{" "}
                  {VERIFICATION_LABEL[n.source.verification]}.
                </span>
              )}
              {n.flag && <span className="block mt-1 text-muted-foreground/85">{n.flag}</span>}
            </li>
          ))}
        </ol>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          The second strand
        </h4>
        {parallel.map(withSource).map((n) => (
          <p key={n.id}>
            <span className="text-foreground/90">
              {n.label}, {n.when},
            </span>{" "}
            joins the chain at the workshop rather than running along it.{" "}
            {n.detail}{" "}
            {n.source && (
              <span className="text-muted-foreground/70">
                <cite className="not-italic">{n.source.citation}</cite>.{" "}
                {VERIFICATION_LABEL[n.source.verification]}.
              </span>
            )}
          </p>
        ))}
        <p>
          The founding evidence base therefore holds a recommendation arising
          from a fatal accident and a simulator study with no fatalities at
          all, and of the two it is the simulator study that could establish a
          general pattern, since it had a control condition and a denominator.
          An accident investigation has neither.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Drawn off the chain and cut
        </h4>
        <p>
          {cutBranch.label}. {cutBranch.detail} Cut, {cutBranch.id}. It is
          shown as refused rather than omitted, because a reader who has met
          the claim elsewhere is owed the refusal.
        </p>

        <h4 className="font-display pt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          What the chain does not settle
        </h4>
        <p>{openQuestion.detail}</p>
      </div>
    </Disclosure>
  );
}
