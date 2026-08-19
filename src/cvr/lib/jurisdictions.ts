import jurisdictionsJson from "../../../data/jurisdictions.json";
import { sources, type Source, type Verification } from "@/cvr/lib/citations";

/**
 * The comparison, and how much of it is established.
 *
 * Two things have to stay separable here and the data keeps them separate,
 * so the accessors do too. A field can be *documented weakly* — read from a
 * summary rather than a statute — or it can be *not documented at all*,
 * meaning three research rounds failed to establish it. Those are different
 * claims. Collapsing the second into the first would report an absence of
 * research as an absence of protection, which is the one failure the section
 * names in advance: "an empty cell reads as no protection and that is not
 * what is being reported."
 *
 * So NOT-DOCUMENTED is never a tier. It is a separate kind, and every
 * accessor below returns it as one.
 */

export const FIELDS = [
  "instrument",
  "cvr_disclosure_bar",
  "cvr_evidentiary_bar",
  "criminal_use",
  "crm_mandate",
  "crm_mandate_first_date",
] as const;

export type Field = (typeof FIELDS)[number];

export const FIELD_LABEL: Record<Field, string> = {
  instrument: "Instrument",
  cvr_disclosure_bar: "Disclosure bar",
  cvr_evidentiary_bar: "Evidentiary bar",
  criminal_use: "Criminal use",
  crm_mandate: "CRM mandate",
  crm_mandate_first_date: "Mandate date",
};

/** Which side of the comparison a field sits on. */
export const FIELD_GROUP: Record<Field, "protection" | "mandate"> = {
  instrument: "protection",
  cvr_disclosure_bar: "protection",
  cvr_evidentiary_bar: "protection",
  criminal_use: "protection",
  crm_mandate: "mandate",
  crm_mandate_first_date: "mandate",
};

export type RegimeClass =
  | "express-bar"
  | "separation-principle"
  | "discretionary"
  | "judicial-seizure"
  | "NOT-DOCUMENTED";

export type TranslationStatus =
  | "original-read"
  | "official-translation"
  | "unofficial-translation"
  | "not-applicable";

type RawField =
  | "NOT-DOCUMENTED"
  | { value: string; source_ref: string; verification: Verification; note?: string };

type RawJurisdiction = {
  id: string;
  country: string;
  regime_class: RegimeClass;
  language_of_record: string;
  translation_status: TranslationStatus;
  audit_refs: string[];
} & Record<Field, RawField>;

const RAW = jurisdictionsJson.jurisdictions as unknown as RawJurisdiction[];

const META = jurisdictionsJson._meta as { description: string; regime_class_note: string };

/** The four-model definitions, verbatim from the corpus, split on the sentence. */
export const REGIME_DEFINITION: Record<Exclude<RegimeClass, "NOT-DOCUMENTED">, string> =
  Object.fromEntries(
    META.regime_class_note
      .split(/\.\s+(?=[a-z-]+ =)/)
      .map((s) => {
        const [k, ...rest] = s.split(" = ");
        return [k.trim(), rest.join(" = ").replace(/\.$/, "").trim()];
      })
  ) as Record<Exclude<RegimeClass, "NOT-DOCUMENTED">, string>;

export const REGIME_LABEL: Record<RegimeClass, string> = {
  "express-bar": "Express bar",
  "separation-principle": "Separation principle",
  discretionary: "Discretionary control",
  "judicial-seizure": "Judicial seizure first",
  "NOT-DOCUMENTED": "Not documented",
};

export const TRANSLATION_LABEL: Record<TranslationStatus, string> = {
  "original-read": "Read in the original",
  "official-translation": "Official translation",
  "unofficial-translation": "Unofficial translation only",
  "not-applicable": "English is the language of record",
};

export const LANGUAGE_NAME: Record<string, string> = {
  en: "English",
  ko: "Korean",
  ja: "Japanese",
  id: "Indonesian",
  fr: "French",
  pt: "Portuguese",
  zh: "Chinese",
  ru: "Russian",
};

/**
 * A cell is either an absence or a documented value at a tier. The union is
 * deliberate: there is no code path on which an absence carries a tier.
 */
export type Cell =
  | { kind: "absent"; field: Field }
  | {
      kind: "documented";
      field: Field;
      value: string;
      verification: Verification;
      note?: string;
      source: Source | null;
      sourceRef: string;
    };

export type Row = {
  id: string;
  country: string;
  regime: RegimeClass;
  language: string;
  translation: TranslationStatus;
  cells: Record<Field, Cell>;
  /** Documented cells out of FIELDS.length. */
  documented: number;
};

const cellOf = (field: Field, raw: RawField): Cell =>
  raw === "NOT-DOCUMENTED"
    ? { kind: "absent", field }
    : {
        kind: "documented",
        field,
        value: raw.value,
        verification: raw.verification,
        note: raw.note,
        source: sources[raw.source_ref] ?? null,
        sourceRef: raw.source_ref,
      };

export const rows: Row[] = RAW.map((j) => {
  const cells = Object.fromEntries(
    FIELDS.map((f) => [f, cellOf(f, j[f])])
  ) as Record<Field, Cell>;
  return {
    id: j.id,
    country: j.country,
    regime: j.regime_class,
    language: j.language_of_record,
    translation: j.translation_status,
    cells,
    documented: FIELDS.filter((f) => cells[f].kind === "documented").length,
  };
});

export const cellCount = rows.length * FIELDS.length;

export const absentCount = rows.reduce(
  (n, r) => n + FIELDS.filter((f) => r.cells[f].kind === "absent").length,
  0
);

export const documentedCount = cellCount - absentCount;

/** Documented cells by tier. Absences are not in this tally, by design. */
export const byTier: Record<Verification, number> = rows.reduce(
  (acc, r) => {
    for (const f of FIELDS) {
      const c = r.cells[f];
      if (c.kind === "documented") acc[c.verification] += 1;
    }
    return acc;
  },
  {
    "primary-verified": 0,
    "official-translation-verified": 0,
    "secondary-only": 0,
    "brief-only": 0,
    "not-documented": 0,
  } as Record<Verification, number>
);

/** Jurisdictions whose protection side is blank end to end. */
export const blankOnProtection: Row[] = rows.filter((r) =>
  FIELDS.filter((f) => FIELD_GROUP[f] === "protection").every(
    (f) => r.cells[f].kind === "absent"
  )
);

export const regimeGroups = (
  ["express-bar", "separation-principle", "discretionary", "judicial-seizure", "NOT-DOCUMENTED"] as RegimeClass[]
).map((regime) => ({ regime, members: rows.filter((r) => r.regime === regime) }));

export const readInOriginal: Row[] = rows.filter(
  (r) => r.translation === "original-read"
);

export const translationCaveats: Row[] = rows.filter(
  (r) => r.translation === "unofficial-translation"
);

/**
 * The two tests at the top of a legal system, which went opposite ways.
 *
 * Both are in the corpus and both are cited in the prose. They are lifted
 * out here because a comparison that showed only the Brazilian result would
 * make the express-bar model look sturdier than the record supports — the
 * layer says exactly that, and a module built from the same data should not
 * quietly reintroduce the impression the layer exists to correct.
 */
export const topCourtTests = [
  {
    id: "br",
    country: "Brazil",
    outcome: "upheld" as const,
    heading: "The provisions survived",
    sourceRef: "brazil-stf-adi-5667",
  },
  {
    id: "ca",
    country: "Canada",
    outcome: "overridden" as const,
    heading: "The privilege yielded",
    sourceRef: "canada-scc-carroll-byrne-2022",
  },
].map((t) => ({ ...t, source: sources[t.sourceRef] ?? null, account: readerFacingNote(t.sourceRef) }));

/**
 * A source note, minus the sentences that are about the corpus rather than
 * about the world.
 *
 * The Carroll-Byrne record closes by observing that the divergence section
 * "currently says" the Brazilian finding has no counterpart. That was true of
 * an earlier draft and the section has since been rewritten, so rendering the
 * sentence would put a false statement about this piece on screen. The rest
 * of the note is the account of the case and is reproduced whole.
 *
 * Sentence-level and explicit, so the exclusion is auditable. Nothing is
 * paraphrased: what survives the filter is corpus text verbatim.
 */
function readerFacingNote(id: string): string {
  const note = sources[id]?._note;
  if (!note) return "";
  return note
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !/divergence section/i.test(sentence))
    .join(" ")
    .trim();
}
