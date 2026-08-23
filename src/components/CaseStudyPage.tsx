import { useEffect, useState, type ReactNode } from "react";
import {
  BackToProjects,
  Column,
  PageFrame,
  PageHeader,
  type MetaCol,
  type PageLink,
} from "@/components/PageShell";
import { cn } from "@/lib/utils";

export type CaseSection = {
  /** Anchor, and the key the progress bar tracks. */
  id: string;
  /** Short form, used in the contents and the progress bar. */
  label: string;
  /** The section's own heading. */
  title: string;
  /** The line under the heading. */
  kicker?: string;
  body: ReactNode;
};

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Tracks which section the reader is in and how far through the page they are.
 * Positions are read from the viewport rather than from offsetTop, because the
 * sections sit inside a positioned console.
 */
function useReadingPosition(sections: CaseSection[]) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(1, doc.scrollTop / scrollable) : 0);

      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = i;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return { active, progress };
}

export default function CaseStudyPage({
  name,
  kicker,
  meta,
  links,
  lead,
  preamble,
  sections,
}: {
  name: string;
  kicker: string;
  meta: MetaCol[];
  links: PageLink[];
  lead: ReactNode;
  /** Optional fact sheet, set between the opening and the contents. */
  preamble?: ReactNode;
  sections: CaseSection[];
}) {
  const { active, progress } = useReadingPosition(sections);
  const here = sections[active];
  const prev = active > 0 ? sections[active - 1] : undefined;
  const next = active < sections.length - 1 ? sections[active + 1] : undefined;

  return (
    <PageFrame>
      <div className="pt-10">
        <Column>
          <PageHeader name={name} kicker={kicker} meta={meta} links={links} />

          <div className="mt-10 space-y-5 text-xl leading-[1.25] tracking-[-0.01em] text-foreground sm:text-2xl md:text-[28px]">
            {lead}
          </div>

          {preamble}

          {/* Contents, in full, before the reader commits to the scroll. */}
          <nav
            aria-label="Contents"
            className="mt-14 border-t border-border pt-4"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              Contents
            </p>
            <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id} className="border-b border-border/50">
                  <a
                    href={`#${s.id}`}
                    className="font-display flex gap-3 py-2 text-[12px] uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="text-muted-foreground/75">{num(i)}</span>
                    <span className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Column>
      </div>

      {/*
        Reading position. Spans the console so it reads as a status bar, with
        its own background because the body scrolls underneath it.
      */}
      <div className="sticky top-0 z-20 mt-12 border-y border-border bg-background/95 py-2.5 backdrop-blur-sm">
        <Column>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[11px] uppercase tracking-[0.14em] text-accent">
              {num(active)}
              <span className="text-muted-foreground/75">
                /{num(sections.length - 1)}
              </span>
            </span>
            <span className="font-display flex-1 truncate text-[11px] uppercase tracking-[0.14em] text-foreground">
              {here?.label}
            </span>
            <span className="font-display flex shrink-0 gap-3 text-[11px] uppercase tracking-[0.14em]">
              {/* pointer-events-none stops the mouse and nothing else: without
                  aria-disabled and tabIndex the spent arrow still took focus
                  and still jumped to #top. Being genuinely inactive is also
                  what exempts it from the contrast floor. */}
              <a
                href={prev ? `#${prev.id}` : "#top"}
                aria-disabled={prev ? undefined : true}
                tabIndex={prev ? undefined : -1}
                className={cn(
                  "transition-colors",
                  prev
                    ? "text-foreground/70 hover:text-foreground"
                    : "pointer-events-none text-muted-foreground/30",
                )}
                aria-label="Previous section"
              >
                ←
              </a>
              <a
                href={next ? `#${next.id}` : "#top"}
                aria-disabled={next ? undefined : true}
                tabIndex={next ? undefined : -1}
                className={cn(
                  "transition-colors",
                  next
                    ? "text-foreground/70 hover:text-foreground"
                    : "pointer-events-none text-muted-foreground/30",
                )}
                aria-label="Next section"
              >
                →
              </a>
            </span>
          </div>
        </Column>
        <div
          className="mt-2 h-px w-full bg-border"
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div
            className="h-px bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <Column>
        <div className="pb-24">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-20 border-b border-border/40 py-12 last:border-b-0"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                {num(i)} — {s.label}
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold uppercase tracking-[0.04em] text-foreground">
                {s.title}
              </h2>
              {s.kicker && (
                <p className="mt-2 text-lg leading-snug text-foreground/80">
                  {s.kicker}
                </p>
              )}
              <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
                {s.body}
              </div>
            </section>
          ))}

          <BackToProjects />
        </div>
      </Column>
    </PageFrame>
  );
}
