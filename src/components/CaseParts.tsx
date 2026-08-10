import type { ReactNode } from "react";

/**
 * A data table in the terminal register: OffBit column labels, hairline rules,
 * no fills. Cells align to the top because most of them run to several lines.
 */
export function DataTable({
  head,
  rows,
  caption,
  minWidth = "34rem",
}: {
  head: string[];
  rows: ReactNode[][];
  caption?: string;
  minWidth?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left text-[13px]"
          style={{ minWidth }}
        >
          <thead>
            <tr className="border-y border-border">
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="font-display py-2 pr-6 align-bottom text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground/70 last:pr-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-3 pr-6 align-top leading-snug last:pr-0 ${
                      j === 0 ? "text-foreground/90" : "text-muted-foreground"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="font-display mt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** A subheading inside a section. */
export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display pt-6 text-base font-bold uppercase tracking-[0.06em] text-foreground">
      {children}
    </h3>
  );
}

/**
 * A decision, with the road not taken kept beside it. The rejected option is
 * part of the record, not a footnote.
 */
export function Decision({
  title,
  chose,
  rejected,
  why,
}: {
  title: string;
  chose: ReactNode;
  rejected?: ReactNode;
  why: ReactNode;
}) {
  const rows: [string, ReactNode][] = [
    ["Chose", chose],
    ...(rejected ? ([["Rejected", rejected]] as [string, ReactNode][]) : []),
    ["Why", why],
  ];

  return (
    <div className="my-8 border-l border-accent/50 pl-5">
      <p className="font-display text-sm font-bold uppercase tracking-[0.06em] text-foreground">
        {title}
      </p>
      <dl className="mt-3 grid gap-x-5 gap-y-2 text-[13px] sm:grid-cols-[5.5rem_1fr]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 sm:pt-[3px]">
              {label}
            </dt>
            <dd className="leading-snug text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A labeled aside — the rule behind a decision, or the cost of one. */
export function Note({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 border-y border-border/60 py-5">
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-accent">
        {label}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </aside>
  );
}

/** A row of counts, set large. */
export function Stats({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="my-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border/60 py-6 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="font-display block text-3xl font-bold leading-none text-foreground">
              {s.value}
            </span>
            <span className="mt-2 block text-[12px] leading-snug text-muted-foreground">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Two states of the same screen, side by side. */
export function BeforeAfter({
  columns,
}: {
  columns: { label: string; rows: { label: string; value: ReactNode }[] }[];
}) {
  return (
    <div className="my-8 grid gap-8 border-y border-border/60 py-6 sm:grid-cols-2">
      {columns.map((col) => (
        <div key={col.label}>
          <p className="font-display text-[10px] uppercase tracking-[0.16em] text-accent">
            {col.label}
          </p>
          <dl className="mt-3 space-y-3 text-[13px]">
            {col.rows.map((r) => (
              <div key={r.label}>
                <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                  {r.label}
                </dt>
                <dd className="mt-1 leading-snug text-muted-foreground">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/** Palette chips, each carrying the ratio it was measured at. */
export function Swatches({
  items,
}: {
  items: { hex: string; name: string; ratio: string }[];
}) {
  return (
    <ul className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((s) => (
        <li key={s.hex} className="border border-border/60">
          <span
            aria-hidden="true"
            className="block h-12 w-full border-b border-border/60"
            style={{ backgroundColor: s.hex }}
          />
          <span className="block px-3 py-2.5">
            <span className="font-display block text-[11px] uppercase tracking-[0.14em] text-foreground">
              {s.name}
            </span>
            <span className="font-display mt-1 block text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
              {s.hex}
            </span>
            <span className="mt-1 block text-[12px] text-muted-foreground">
              {s.ratio}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
