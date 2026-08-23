import type { ReactNode } from "react";

/**
 * The disclosure primitive. Built once and used everywhere: optional layers,
 * sensitivity-gated passages, and the textual equivalent beside each module.
 *
 * A native <details>, for the same reasons the citation is one. It is
 * labeled, keyboard-operable, has its state announced without any ARIA of
 * ours, is deep-linkable by id, and — the part that matters most — it is
 * collapsed by default with JavaScript disabled, which is exactly the default
 * the sensitivity setting requires.
 *
 * Deeper layers read as optional: visually subordinate, clearly labeled with
 * what is inside, and never hiding anything the core argument depends on.
 */
export default function Disclosure({
  id,
  kicker,
  label,
  summary,
  defaultOpen = false,
  children,
}: {
  /** Anchor, so the layer is directly linkable and readable cold. */
  id: string;
  /** Small overline: what kind of thing this is. */
  kicker: string;
  /** The control's own text. */
  label: string;
  /** One line on what opening it will show, so the choice is informed. */
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="disclosure group my-6 scroll-mt-24 border-l-2 border-border/70 pl-4 transition-colors open:border-accent/60"
    >
      <summary className="cursor-pointer list-none rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span className="font-display block text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          {kicker}
        </span>
        <span className="font-display mt-1 flex items-baseline gap-2 text-[12px] uppercase tracking-[0.12em] text-foreground/85 underline decoration-border underline-offset-4 transition-colors group-hover:decoration-accent">
          <span
            aria-hidden="true"
            className="text-accent transition-transform group-open:rotate-90"
          >
            ▸
          </span>
          {label}
        </span>
        {summary && (
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground/80">
            {summary}
          </span>
        )}
      </summary>

      <div className="mt-4 leading-relaxed text-muted-foreground">{children}</div>
    </details>
  );
}
