/**
 * Reads content/ at build time. The build may render this material and may
 * never originate a fact, so everything here is derived from the files
 * themselves — section order, titles and slugs included.
 */

const CORE = import.meta.glob("../../../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const LAYERS = import.meta.glob("../../../content/layers/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type Frontmatter = Record<string, string>;

export type Doc = {
  /** Anchor and deep-link target. */
  slug: string;
  title: string;
  /** Ordinal from the filename's frontmatter; layers have none. */
  section: number | null;
  corePath: boolean;
  apparatus: boolean;
  /** Layers name the section they hang off. */
  parent: string | null;
  readingTimeMin: number | null;
  body: string;
  words: number;
};

/**
 * Deliberately small. The frontmatter in content/ is flat key: value with no
 * nesting, lists or quoting, so a YAML dependency would buy nothing and would
 * be one more thing to keep alive in a piece declared unmaintained.
 */
function parseFrontmatter(raw: string): { fm: Frontmatter; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) return { fm: {}, body: raw };

  const fm: Frontmatter = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    fm[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { fm, body: raw.slice(match[0].length) };
}

function toDoc(path: string, raw: string): Doc {
  const { fm, body } = parseFrontmatter(raw);
  const fallbackSlug = path.replace(/^.*\//, "").replace(/\.md$/, "");
  return {
    slug: fm.slug ?? fallbackSlug,
    title: fm.title ?? fallbackSlug,
    section: fm.section === undefined ? null : Number(fm.section),
    corePath: fm.core_path === "true",
    apparatus: fm.apparatus === "true",
    parent: fm.parent ?? null,
    readingTimeMin:
      fm.reading_time_min === undefined ? null : Number(fm.reading_time_min),
    body,
    words: body.split(/\s+/).filter(Boolean).length,
  };
}

const byOrdinal = (a: Doc, b: Doc) =>
  (a.section ?? Number.MAX_SAFE_INTEGER) - (b.section ?? Number.MAX_SAFE_INTEGER);

/** Sections 0-12, in the order the corpus numbers them. */
export const sections: Doc[] = Object.entries(CORE)
  .filter(([path]) => /\/\d+-/.test(path))
  .map(([path, raw]) => toDoc(path, raw))
  .sort(byOrdinal);

/** Optional layers, each naming its parent section. */
export const layers: Doc[] = Object.entries(LAYERS)
  .map(([path, raw]) => toDoc(path, raw))
  .sort((a, b) => a.slug.localeCompare(b.slug));

/**
 * Apparatus that is not a numbered section: the register of assertions no
 * source supports. Reachable, and outside the timed path.
 */
export const unmapped: Doc | null = (() => {
  const entry = Object.entries(CORE).find(([p]) => p.endsWith("/unmapped.md"));
  return entry ? toDoc(entry[0], entry[1]) : null;
})();

export const corePath = sections.filter((s) => s.corePath);

export const coreWords = corePath.reduce((n, s) => n + s.words, 0);

/** The charter measures at 220 wpm and adds interaction time separately. */
export const coreMinutes = coreWords / 220;
