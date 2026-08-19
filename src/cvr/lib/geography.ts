import { rows, type RegimeClass, type Row } from "@/cvr/lib/jurisdictions";

/**
 * Where each legal object applies.
 *
 * Geography is substantive in this section and not decoration: "which one you
 * are dealing with depends entirely on where the aircraft came down." So the
 * comparison gets a map.
 *
 * WHAT THE COORDINATES ARE. Approximate country centroids, in degrees. They
 * are a rendering substrate in the same way a typeface is, and they assert
 * nothing about the subject: no coordinate here encodes a finding, a border
 * or a claim any source would have to support. Every value a reader takes
 * meaning from still comes from the corpus.
 *
 * WHAT THE MAP DELIBERATELY DOES NOT DO. It draws no coastlines and no
 * borders. A filled world map would put roughly a hundred and eighty
 * unstudied countries on screen in some resting state, and a reader would
 * read that state as a finding about them. There is no finding about them.
 * So the ground is empty, a graticule carries orientation, and only the
 * fourteen records in the corpus are marked.
 */

export type Placed = Row & {
  lat: number;
  lon: number;
  /** Label offset in degrees, hand-set where markers would collide. */
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
};

const PLACES: Record<string, { lat: number; lon: number; dx: number; dy: number; anchor: Placed["anchor"] }> = {
  us: { lat: 39.5, lon: -98.4, dx: 0, dy: -7, anchor: "middle" },
  ca: { lat: 56.1, lon: -106.3, dx: 0, dy: -7, anchor: "middle" },
  br: { lat: -14.2, lon: -51.9, dx: 0, dy: 10, anchor: "middle" },
  gb: { lat: 54.0, lon: -2.0, dx: -6, dy: -4, anchor: "end" },
  fr: { lat: 46.6, lon: 2.5, dx: -5, dy: 8, anchor: "end" },
  ru: { lat: 61.5, lon: 105.3, dx: 0, dy: -7, anchor: "middle" },
  cn: { lat: 35.9, lon: 104.2, dx: -6, dy: 2, anchor: "end" },
  in: { lat: 22.0, lon: 79.0, dx: -6, dy: 4, anchor: "end" },
  kr: { lat: 36.5, lon: 127.9, dx: -6, dy: -3, anchor: "end" },
  jp: { lat: 36.2, lon: 138.3, dx: 6, dy: 7, anchor: "start" },
  id: { lat: -2.5, lon: 118.0, dx: 0, dy: 11, anchor: "middle" },
  au: { lat: -25.3, lon: 133.8, dx: 0, dy: 11, anchor: "middle" },
};

/** Longitude to viewBox x, latitude to viewBox y. Equirectangular, no tricks. */
export const px = (lon: number) => lon + 180;
export const py = (lat: number) => 90 - lat;

export const placed: Placed[] = rows
  .filter((r) => PLACES[r.id])
  .map((r) => ({ ...r, ...PLACES[r.id] }));

/**
 * The records that are not a place.
 *
 * The European Union is a legal order rather than a territory, and ICAO is a
 * standard that applies wherever a contracting state applies it. Putting
 * either on a dot would say something false about its reach, so they sit in
 * a band beneath the map instead of on it.
 */
export const nonTerritorial: Row[] = rows.filter((r) => !PLACES[r.id]);

export const REGIME_MARK: Record<RegimeClass, string> = {
  "express-bar": "▣",
  "separation-principle": "◐",
  discretionary: "◇",
  "judicial-seizure": "▲",
  "NOT-DOCUMENTED": "—",
};
