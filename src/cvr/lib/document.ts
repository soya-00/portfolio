import accidentsJson from "../../../data/accidents.json";
import conventionsJson from "../../../data/conventions.json";
import labelsJson from "../../../content/labels.json";
import quotationsJson from "../../../data/quotations.json";
import { sources, type Source, type Verification } from "@/cvr/lib/citations";

/**
 * What may be shown of a transcript, and why.
 *
 * The reader cannot be handed a transcript, and the reason is not editorial
 * discretion — it is copyright law and, in two cases, an investigation that
 * has not concluded. That is the point of the module, so the reason is the
 * payload and it comes from the corpus verbatim.
 */

type Accident = {
  id: string;
  date: string;
  tier: string;
  authority: string;
  jurisdiction: string;
  transcript: { reproducible: boolean; basis: string };
};

const ACCIDENTS = accidentsJson.accidents as unknown as Accident[];

const DISPLAY: Record<string, string> = Object.fromEntries(
  (labelsJson.labels as { id: string; display: string }[]).map((l) => [l.id, l.display])
);

export type LedgerRow = {
  id: string;
  display: string;
  year: number;
  authority: string;
  tier: string;
  reproducible: boolean;
  basis: string;
};

export const ledger: LedgerRow[] = ACCIDENTS.map((a) => ({
  id: a.id,
  display: DISPLAY[a.id] ?? a.id,
  year: Number(a.date.slice(0, 4)),
  authority: a.authority,
  tier: a.tier,
  reproducible: a.transcript.reproducible,
  basis: a.transcript.basis,
})).sort((x, y) => x.year - y.year);

export const reproducibleCount = ledger.filter((r) => r.reproducible).length;
export const withheldCount = ledger.length - reproducibleCount;

/** Distinct legal grounds, most common first. The spread is the finding. */
export const grounds: { basis: string; count: number; reproducible: boolean }[] =
  Object.values(
    ledger.reduce<Record<string, { basis: string; count: number; reproducible: boolean }>>(
      (acc, r) => {
        acc[r.basis] ??= { basis: r.basis, count: 0, reproducible: r.reproducible };
        acc[r.basis].count += 1;
        return acc;
      },
      {}
    )
  ).sort((a, b) => b.count - a.count || a.basis.localeCompare(b.basis));

/* ── Notation ───────────────────────────────────────────────────────────── */

const conventions = conventionsJson as unknown as {
  redaction: { rule: string; notation: string; storage: string; disclosure: string };
  ellipsis: { rule: string; rationale: string };
};

export const redaction = conventions.redaction;
export const ellipsis = conventions.ellipsis;

/* ── Reproduced statute text ────────────────────────────────────────────── */

type Quotation = {
  id: string;
  source_ref: string;
  locator: string | null;
  rendered: string | null;
  status: string;
  _note?: string;
};

const QUOTATIONS = quotationsJson.quotations as unknown as Quotation[];

export type Reproduced = {
  id: string;
  text: string;
  locator: string | null;
  source: Source;
  note?: string;
};

/**
 * Two gates, not one. R11 already blocks anything unverified from rendering;
 * this adds the licence check, because a quotation can be verified and still
 * not reproducible. The 1990 effectiveness quotation is exactly that case —
 * verified word for word, sitting on a cite-only source — so it is described
 * rather than shown.
 */
const renderable = (q: Quotation): boolean => {
  if (q.status !== "verified" || !q.rendered) return false;
  const s = sources[q.source_ref.split("#")[0]];
  return !!s && s.licence.status !== "cite-only";
};

export const reproduced: Reproduced[] = QUOTATIONS.filter(renderable).map((q) => ({
  id: q.id,
  text: q.rendered as string,
  locator: q.locator,
  source: sources[q.source_ref.split("#")[0]],
  note: q._note,
}));

/** Verified, but held back because reproducing it would exceed the grant. */
export const withheldQuotations = QUOTATIONS.filter(
  (q) => q.status === "verified" && !renderable(q)
).map((q) => ({ id: q.id, source: sources[q.source_ref.split("#")[0]] }));

export const LANGUAGE_NAME: Record<string, string> = {
  en: "English",
  id: "Indonesian",
  ko: "Korean",
  fr: "French",
  pt: "Portuguese",
  es: "Spanish",
  ja: "Japanese",
  zh: "Chinese",
  de: "German",
  ru: "Russian",
};

export type { Verification };
