import type { ReactNode } from "react";
import Cite from "@/cvr/primitives/Cite";
import type { Citation } from "@/cvr/lib/citations";

/**
 * A markdown renderer for exactly the subset content/ uses: h1, h2,
 * paragraphs, bullet lists, horizontal rules, and inline bold, italic and
 * code. A library would bring a parse tree this does not need and one more
 * dependency to keep alive in a piece declared unmaintained.
 *
 * The load-bearing detail is where citations are attached. Anchors in
 * citations.json are verbatim phrases from the markdown *source* — four of
 * them carry ** or * emphasis and one carries a non-ASCII character. Matching
 * them against rendered HTML would silently drop those four, so anchors are
 * resolved against the raw text first and the markers injected during the
 * render pass rather than after it.
 */

type Block =
  | { type: "h1" | "h2" | "p"; raw: string }
  | { type: "ul"; items: string[] }
  | { type: "hr" };

export function toBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", raw: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };
  const flush = () => {
    flushParagraph();
    flushList();
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      flush();
    } else if (t === "---") {
      flush();
      blocks.push({ type: "hr" });
    } else if (t.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", raw: t.slice(3) });
    } else if (t.startsWith("# ")) {
      flush();
      blocks.push({ type: "h1", raw: t.slice(2) });
    } else if (t.startsWith("- ")) {
      flushParagraph();
      list.push(t.slice(2));
    } else {
      flushList();
      paragraph.push(t);
    }
  }
  flush();
  return blocks;
}

/** Which emphases apply to a run. They nest: the register bolds a line that
 *  contains an inline code span, so a flat tokeniser would print backticks. */
type Fmt = { strong?: boolean; em?: boolean; code?: boolean };

/** A leaf run of text, carrying its own offset in the raw source. */
type Token = { fmt: Fmt; text: string; start: number };

const INLINE_SRC = /(\*\*[^*]+\*\*|(?<!\*)\*[^*\n]+\*(?!\*)|`[^`\n]+`)/;

/**
 * Produces leaf runs whose `start` is the raw offset of their first
 * character, so a citation's insertion point maps to a position inside a run
 * by simple subtraction. Emphasis recurses; code does not, since backticks do
 * not nest.
 */
function tokenize(raw: string, base: Fmt = {}, offset = 0): Token[] {
  const out: Token[] = [];
  const re = new RegExp(INLINE_SRC.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      out.push({ fmt: base, text: raw.slice(last, m.index), start: offset + last });
    }
    const tok = m[0];
    const isStrong = tok.startsWith("**");
    const isCode = tok.startsWith("`");
    const pad = isStrong ? 2 : 1;
    const inner = tok.slice(pad, -pad);

    if (isCode) {
      out.push({ fmt: { ...base, code: true }, text: inner, start: offset + m.index + pad });
    } else {
      out.push(
        ...tokenize(
          inner,
          { ...base, [isStrong ? "strong" : "em"]: true },
          offset + m.index + pad
        )
      );
    }
    last = m.index + tok.length;
  }
  if (last < raw.length) {
    out.push({ fmt: base, text: raw.slice(last), start: offset + last });
  }
  return out;
}

function wrap(fmt: Fmt, text: string, key: string): ReactNode {
  if (!text) return null;
  let node: ReactNode = text;
  if (fmt.code)
    node = <code className="font-display text-[0.92em] text-foreground/90">{node}</code>;
  if (fmt.em) node = <em className="italic text-foreground/90">{node}</em>;
  if (fmt.strong)
    node = <strong className="font-semibold text-foreground">{node}</strong>;
  return <span key={key}>{node}</span>;
}

/**
 * Renders a raw block with its citation markers injected.
 *
 * Emphasis is tokenised first and markers are placed *through* that token
 * stream, because slicing the raw string at an anchor boundary can cut an
 * emphasis span in half and leave literal asterisks on the page. Several
 * anchors in the corpus do exactly that — one ends inside a bold sentence in
 * the methods section, another inside `sources.json` in the register — so a
 * marker landing mid-emphasis splits the token and both halves keep their
 * formatting.
 */
function withCitations(
  raw: string,
  cites: Citation[],
  keyPrefix: string
): ReactNode[] {
  const marks = cites
    .map((c) => ({ c, at: c.anchor ? raw.indexOf(c.anchor) : -1 }))
    .filter((h) => h.at >= 0)
    .map((h) => ({ c: h.c, offset: h.at + h.c.anchor!.length }))
    .sort((a, b) => a.offset - b.offset);

  const tokens = tokenize(raw);
  const out: ReactNode[] = [];
  let mi = 0;
  let emitted = -1; // two anchors ending at the same point get one marker each,
  // but never a second marker at a position already passed

  tokens.forEach((tok, ti) => {
    const tokEnd = tok.start + tok.text.length;
    let cursor = 0;
    let part = 0;

    while (mi < marks.length && marks[mi].offset <= tokEnd) {
      const { c, offset } = marks[mi];
      mi++;
      if (offset <= emitted) continue;
      const cut = Math.max(cursor, Math.min(tok.text.length, offset - tok.start));
      out.push(wrap(tok.fmt, tok.text.slice(cursor, cut), `${keyPrefix}-${ti}-${part++}`));
      out.push(<Cite key={c.id} c={c} />);
      cursor = cut;
      emitted = offset;
    }

    out.push(wrap(tok.fmt, tok.text.slice(cursor), `${keyPrefix}-${ti}-${part}`));
  });

  return out.filter(Boolean);
}

/**
 * Renders a section body.
 *
 * `skipLeadingH1` drops the body's own title line, which repeats the
 * frontmatter title the shell already renders as the section heading. Checked
 * against the corpus: no citation is anchored inside a leading title line, so
 * dropping it cannot orphan a marker. `unattachedAnchors` catches it at build
 * time if that ever stops being true.
 */
export function renderMarkdown(
  body: string,
  cites: Citation[],
  opts: { skipLeadingH1?: boolean } = {}
): ReactNode[] {
  let blocks = toBlocks(body);

  if (opts.skipLeadingH1 && blocks[0]?.type === "h1") {
    blocks = blocks.slice(1);
  }

  const nodes: ReactNode[] = [];

  blocks.forEach((b, i) => {
    const key = `b${i}`;
    if (b.type === "hr") {
      nodes.push(
        <hr key={key} className="my-10 border-t border-border/60" aria-hidden="true" />
      );
      return;
    }
    if (b.type === "ul") {
      nodes.push(
        <ul key={key} className="my-5 space-y-3 pl-5">
          {b.items.map((item, j) => (
            <li key={`${key}-${j}`} className="list-disc marker:text-accent/60">
              {withCitations(item, cites, `${key}-${j}`)}
            </li>
          ))}
        </ul>
      );
      return;
    }
    if (b.type === "h2") {
      nodes.push(
        <h3
          key={key}
          className="font-display mt-10 text-lg font-bold uppercase tracking-[0.08em] text-foreground"
        >
          {withCitations(b.raw, cites, key)}
        </h3>
      );
      return;
    }
    if (b.type === "h1") {
      nodes.push(
        <h3
          key={key}
          className="font-display mt-10 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
        >
          {withCitations(b.raw, cites, key)}
        </h3>
      );
      return;
    }
    nodes.push(
      <p key={key} className="my-5">
        {withCitations(b.raw, cites, key)}
      </p>
    );
  });

  return nodes;
}

/** Which anchors failed to attach anywhere. Used by the build-time check. */
export function unattachedAnchors(body: string, cites: Citation[]): string[] {
  return cites
    .filter((c) => c.anchor && !body.includes(c.anchor))
    .map((c) => c.id);
}
