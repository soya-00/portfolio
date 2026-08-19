import citationsJson from "../../../content/citations.json";
import sourcesJson from "../../../data/sources.json";
import unmappedRaw from "../../../content/unmapped.md?raw";

/**
 * The citation apparatus. Five kinds of reference, because forcing every
 * claim to point at an external source was the wrong shape: some claims are
 * derived from the corpus itself, some state the piece's own rules, and some
 * are assertions nothing supports and which have to say so.
 */
export type CitationKind =
  | "source"
  | "cut"
  | "corpus"
  | "governance"
  | "unmapped";

export type Verification =
  | "primary-verified"
  | "official-translation-verified"
  | "secondary-only"
  | "brief-only"
  | "not-documented";

export type RawCitation = {
  id: string;
  section: string;
  anchor: string | null;
  source_ref?: string;
  cut_ref?: string;
  corpus_ref?: string;
  governance_ref?: string;
  unmapped_ref?: string;
  locator?: string | null;
  verification?: Verification;
  note?: string;
};

export type Source = {
  id: string;
  citation: string;
  authority: string;
  type: string;
  number: string | null;
  date: string | null;
  language: string;
  url: string | null;
  archive_url: string | null;
  access: "open" | "paywalled" | "library" | "purchase" | "offline";
  licence: { status: "reproducible" | "cite-only" | "undetermined"; basis: string };
  verification: Verification;
  confidence: "high" | "medium" | "low";
};

export const sources: Record<string, Source> = Object.fromEntries(
  (sourcesJson.sources as unknown as Source[]).map((s) => [s.id, s])
);

const RAW = citationsJson.citations as unknown as RawCitation[];

export type Citation = RawCitation & {
  kind: CitationKind;
  /** Resolved target. Present for source citations; null for the rest. */
  source: Source | null;
  /** Ordinal within its section, used for the visible marker. */
  ordinal: number;
};

function kindOf(c: RawCitation): CitationKind {
  if (c.source_ref) return "source";
  if (c.cut_ref) return "cut";
  if (c.corpus_ref) return "corpus";
  if (c.governance_ref) return "governance";
  return "unmapped";
}

const bySection = new Map<string, Citation[]>();
for (const c of RAW) {
  const list = bySection.get(c.section) ?? [];
  list.push({
    ...c,
    kind: kindOf(c),
    source: c.source_ref ? (sources[c.source_ref.split("#")[0]] ?? null) : null,
    ordinal: list.length + 1,
  });
  bySection.set(c.section, list);
}

export const citationsFor = (slug: string): Citation[] => bySection.get(slug) ?? [];

export const allCitations: Citation[] = RAW.map((c, i) => ({
  ...c,
  kind: kindOf(c),
  source: c.source_ref ? (sources[c.source_ref.split("#")[0]] ?? null) : null,
  ordinal: i + 1,
}));

/**
 * The unmapped register, parsed out of its own markdown so an unmapped_ref
 * can show the reader what it points at rather than only that it points
 * somewhere. Entries are headed `**UM-01 · Title.**`, which is the same shape
 * validate.js keys on.
 */
const UM_HEADING = /\*\*(UM-\d+)\s*·\s*([^*]+?)\*\*/g;

export const unmappedEntries: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const m of unmappedRaw.matchAll(UM_HEADING)) {
    out[m[1]] = m[2].trim().replace(/\.$/, "");
  }
  return out;
})();

/** Human label per kind, used in the marker and read out by assistive tech. */
export const KIND_LABEL: Record<CitationKind, string> = {
  source: "Source",
  cut: "Cut from the piece",
  corpus: "Derived from the corpus",
  governance: "The piece's own rule",
  unmapped: "Unsupported by any source",
};

/**
 * Non-colour marker per kind. The palette carries one accent, and the
 * charter requires every colour distinction to have a redundant encoding, so
 * the glyph is the primary channel and colour never carries meaning alone.
 */
export const KIND_GLYPH: Record<CitationKind, string> = {
  source: "§",
  cut: "✂",
  corpus: "▦",
  governance: "¶",
  unmapped: "○",
};

export const VERIFICATION_LABEL: Record<Verification, string> = {
  "primary-verified": "Primary source read",
  "official-translation-verified": "Official translation read",
  "secondary-only": "Rests on a summary or third-party account",
  "brief-only": "Entered from the research briefs, not separately checked",
  "not-documented": "A search failed; the absence is the finding",
};

export const ACCESS_LABEL: Record<Source["access"], string> = {
  open: "Open",
  paywalled: "Paywalled",
  library: "Library",
  purchase: "Purchase",
  offline: "Offline",
};
