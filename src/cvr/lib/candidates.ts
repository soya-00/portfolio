import { sources } from "@/cvr/lib/citations";
import { ledger } from "@/cvr/lib/document";

/**
 * Five candidate causes, against how well each is documented.
 *
 * The scale is ORDINAL and not categorical: well-documented, documented,
 * weak, not documented. Swapping two steps changes the claim, which is the
 * test `color-formula` sets for the distinction, so the encoding is one hue
 * with monotone lightness and not four hues.
 *
 * "Untestable" is off that scale entirely. It is not a weaker grade of
 * evidence; it is a question the record cannot answer however much evidence
 * arrives. Putting it at the bottom of the ramp would say something false.
 */

export type Strength = 4 | 3 | 2 | 1;

export const STRENGTH_LABEL: Record<Strength, string> = {
  4: "Well documented",
  3: "Documented",
  2: "Weak",
  1: "Not documented",
};

/** Filled blocks, so the ordering survives without color. */
export const STRENGTH_RAMP: Record<Strength, string> = {
  4: "▰▰▰▰",
  3: "▰▰▰▱",
  2: "▰▰▱▱",
  1: "▰▱▱▱",
};

export type Candidate = {
  id: string;
  label: string;
  strength: Strength | "untestable";
  verdict: string;
  evidence: string;
  leaves: string;
  sourceRefs: string[];
  flag?: string;
};

export const candidates: Candidate[] = [
  {
    id: "regulatory",
    label: "Regulatory and institutional pressure",
    strength: 4,
    verdict: "Traceable end to end, and each step has a document number.",
    evidence:
      "A 1979 recommendation to the regulator, a NASA workshop the same year, the first airline program in 1981, a 1990 rule creating an optional qualification path, and a 1995 final rule effective March 1996 making CRM binding for US scheduled operators, with compliance phased to 1998 and 1999.",
    leaves: "Regulatory action leaves document numbers.",
    sourceRefs: ["ntsb-rec-a-79-047", "faa-sfar-58", "faa-final-rule-1995"],
  },
  {
    id: "union",
    label: "Union advocacy",
    strength: 3,
    verdict: "Documented, and on both sides of the recording question.",
    evidence:
      "The term itself was published in a pilots' union magazine by the NASA researcher who coined it, and the union was involved in the first US program. Union bodies have also been consistently against the recording, opposing cockpit image recorders on privacy, misinterpretation and litigation grounds across four decades.",
    leaves: "Union advocacy leaves published position papers.",
    sourceRefs: ["ifalpa-23pos28"],
    flag:
      "The union-magazine publication is one of two pillars of this candidate and has no source record. An earlier draft mapped it to the NASA workshop proceedings, which is a different document from a different body in a different year, and that mapping was removed rather than corrected. Registered as UM-04.",
  },
  {
    id: "manufacturer",
    label: "Manufacturer influence",
    strength: 2,
    verdict: "Weak, and mostly later than the formative period.",
    evidence:
      "Manufacturers appear in this corpus chiefly as the makers of the aircraft involved. Where they commissioned human-factors work, it is well after the formative period. A widely repeated claim that manufacturer assistance drove adoption in China was searched for in Chinese-language regulatory sources and not found.",
    leaves: "Commissioned human-factors work is published late or not at all.",
    sourceRefs: ["caac-ac-121-fs-41r1"],
    flag:
      "The China claim is on the cut list as CL-04, and appears here as a claim that failed rather than as evidence.",
  },
  {
    id: "insurance",
    label: "Insurance pressure",
    strength: 1,
    verdict: "Not documented at all, and the significant one.",
    evidence:
      "The canonical histories trace every driver, from workshops to regulator, airlines and union, and never mention insurers, underwriters or premiums. Where the industry discusses the subject at all it treats better coordination as a cause of better loss experience, which reverses the direction of the hypothesis.",
    leaves:
      "Insurance underwriting leaves commercial records that are not public and were never written for an outside reader.",
    sourceRefs: ["helmreich-merritt-wilhelm-1999"],
    flag:
      "The nearest incentives found, voluntary premium credits from the 1990s and audit-linked discussion from the late 2000s, are specific enough to be checkable and have no source record. Registered as UM-03. This sits inside the section arguing that the insurer role is undocumented, so an unsourced specific about insurers is a small self-contradiction.",
  },
  {
    id: "fashion",
    label: "Institutional fashion",
    strength: "untestable",
    verdict: "Untestable as posed, which is not the same as unevidenced.",
    evidence:
      "The management-grid lineage of the first programs is documented. Whether that constitutes a cause is not a question the record can answer.",
    leaves: "No document would settle it either way.",
    sourceRefs: ["helmreich-merritt-wilhelm-1999"],
  },
];

/** Generic, so the narrowing on `ranked` survives the map. */
export const withSources = <T extends Candidate>(c: T) => ({
  ...c,
  resolved: c.sourceRefs.map((r) => sources[r]).filter(Boolean),
});

export const ranked = candidates.filter(
  (c): c is Candidate & { strength: Strength } => c.strength !== "untestable"
);

export const untestable = candidates.filter((c) => c.strength === "untestable");

/**
 * The corpus comparison, on the two dimensions that have a sourced schema
 * field. Outcome, phase of flight, cockpit language and whether coordination
 * was cited would all improve it and none of them exists in the data, so none
 * is shown and the omission is stated instead of quietly filled.
 */
const decadeOf = (year: number) => `${Math.floor(year / 10) * 10}s`;

export const decades = Array.from(
  new Set(ledger.map((r) => decadeOf(r.year)))
).sort();

export const authorities = Array.from(new Set(ledger.map((r) => r.authority))).sort();

export const corpusGrid = authorities.map((authority) => ({
  authority,
  cells: decades.map((d) => ({
    decade: d,
    n: ledger.filter((r) => r.authority === authority && decadeOf(r.year) === d).length,
  })),
  total: ledger.filter((r) => r.authority === authority).length,
}));

export const omittedDimensions = [
  "Outcome, which would separate the survivable cases from the fatal ones",
  "Phase of flight",
  "Language of the cockpit",
  "Whether coordination was cited in the finding",
];
