import cutlistJson from "../../../data/cutlist.json";
import { sources, type Source } from "@/cvr/lib/citations";

/**
 * The two registers a reader is owed: what was refused, and what was used.
 *
 * `cutlist.json` says of itself that it is "rendered to the reader as a
 * section of the publication, not held internally", so it renders whole. The
 * source register is the other half: a citation a reader cannot resolve is
 * not a citation, and thirteen of these have no URL, which the register says
 * rather than hides behind a dead link.
 */

export type Cut = {
  id: string;
  claim: string;
  reason: string;
  searched: string[];
  status: "cut" | "rescued" | "prescribed" | "flagged";
  audit_ref: string;
};

export const cuts = cutlistJson.cuts as unknown as Cut[];

export const STATUS_LABEL: Record<Cut["status"], string> = {
  cut: "Cut outright",
  rescued: "Searched again and found",
  prescribed: "Retained under a prescribed limit",
  flagged: "Retained with the limitation visible",
};

export const STATUS_NOTE: Record<Cut["status"], string> = {
  cut: "The claim appears nowhere in this piece, in any form.",
  rescued: "The claim was cut, searched for again, and recovered with a source.",
  prescribed: "The claim stands, and what may be reproduced of it is limited.",
  flagged: "The claim stands with its limitation on screen rather than in a note.",
};

export const STATUS_GLYPH: Record<Cut["status"], string> = {
  cut: "✕",
  rescued: "↺",
  prescribed: "§",
  flagged: "◇",
};

export const cutsByStatus = (
  ["cut", "rescued", "prescribed", "flagged"] as Cut["status"][]
).map((status) => ({ status, members: cuts.filter((c) => c.status === status) }));

/* ── the source register ─────────────────────────────────────────────── */

export const register: Source[] = Object.values(sources).sort((a, b) =>
  a.citation.localeCompare(b.citation)
);

export const LICENCE_LABEL: Record<Source["licence"]["status"], string> = {
  reproducible: "Reproducible",
  "cite-only": "Cite only",
  undetermined: "Undetermined",
};

export const unlinked = register.filter((s) => !s.url);

export const byAccess = (["open", "paywalled", "library", "purchase", "offline"] as const).map(
  (access) => ({ access, n: register.filter((s) => s.access === access).length })
);

export const byLicence = (["reproducible", "cite-only", "undetermined"] as const).map(
  (status) => ({ status, n: register.filter((s) => s.licence.status === status).length })
);

export const byVerification = (
  ["primary-verified", "official-translation-verified", "secondary-only", "brief-only", "not-documented"] as const
).map((v) => ({ v, n: register.filter((s) => s.verification === v).length }));

export const LANGUAGE_NAME: Record<string, string> = {
  en: "English",
  ko: "Korean",
  ja: "Japanese",
  id: "Indonesian",
  fr: "French",
  pt: "Portuguese",
  zh: "Chinese",
  ru: "Russian",
  es: "Spanish",
  de: "German",
};

export const nonEnglish = register.filter((s) => s.language !== "en");
