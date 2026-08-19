import { ledger, type LedgerRow } from "@/cvr/lib/document";
import singleOriginJson from "../../../content/single-origin.json";
import { sources } from "@/cvr/lib/citations";

/**
 * The corpus, and the population it cannot see.
 *
 * The figure this feeds has one job and one prohibition. The job is to show
 * that every case here was selected by the same rule, which is that something
 * went wrong badly enough to trigger an investigation. The prohibition is
 * that it must not give the unrecorded population a size.
 *
 * Nothing in the corpus measures how many flights went well, and a figure
 * that drew the counted corpus against a shape of any definite extent would
 * be reporting a ratio no source supports. So the counted side is a unit
 * chart with one mark per record, and the other side has no boundary at all.
 * An unbounded region cannot be read off, which is the point.
 */

export type Mark = LedgerRow & { counted: true };

export const counted: Mark[] = ledger.map((r) => ({ ...r, counted: true as const }));

export const byTier = ["deep", "corpus", "context", "excluded"].map((tier) => ({
  tier,
  members: counted.filter((r) => r.tier === tier),
}));

export const TIER_LABEL: Record<string, string> = {
  deep: "Deep tier",
  corpus: "Corpus",
  context: "Context",
  excluded: "Excluded",
};

export const TIER_MARK: Record<string, string> = {
  deep: "▣",
  corpus: "▪",
  context: "▫",
  excluded: "✕",
};

type Claim = {
  id: string;
  section: string;
  anchor: string;
  origin: string;
  attribution: string;
  source_ref: string;
  note: string;
};

/** The counterfactual arm rests on one paper, and the module says so on it. */
export const savesOrigin = (() => {
  const claim = (singleOriginJson.claims as unknown as Claim[]).find(
    (c) => c.id === "SO-02"
  );
  return claim ? { ...claim, source: sources[claim.source_ref] ?? null } : null;
})();

/**
 * The three partial substitutes, in the section's own order, each with what
 * it can and cannot establish.
 */
export const substitutes = [
  {
    id: "simulator",
    label: "Simulator studies",
    can: "Identical conditions across crews, and survivors. The strongest evidence in the subject that coordination varies independently of individual skill, precisely because it is not an accident investigation.",
    cannot: "A simulator is not a line operation, and the study is one study.",
    sourceRef: "nasa-tm-78482",
  },
  {
    id: "saves",
    label: "Documented saves",
    can: "A handful of cases where crews handled severe failures and the outcome was survivable, among them a loss of hydraulic control in 1989, a fuel exhaustion glide in 1983, and a dual engine rollback on approach in 2008. Published analysis has credited coordination in some.",
    cannot: "The evidence rests substantially on a single 1991 conference paper, and one paper is a thin foundation for an entire counterfactual arm.",
    sourceRef: "predmore-1991",
  },
  {
    id: "reporting",
    label: "Confidential reporting systems",
    can: "These capture coordination catches by design, de-identified and non-adjudicated, and are the nearest thing to a denominator. They establish that such events occur.",
    cannot: "They support no claim about frequency or outcome, since no specific published analysis is cited here.",
    sourceRef: null,
  },
].map((s) => ({ ...s, source: s.sourceRef ? sources[s.sourceRef] ?? null : null }));
