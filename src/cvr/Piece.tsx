import { useEffect, useState } from "react";
import { Column, PageFrame, PageHeader } from "@/components/PageShell";
import { corePath, layers, sections, unmapped } from "@/cvr/lib/corpus";

/**
 * PageHeader sets the name at min(20vw, 195px) inside a 768px column, so
 * anything past about six characters wraps; the descriptive line rides in the
 * kicker instead.
 *
 * CVR rather than CRM deliberately. CRM is the contested consequence, and the
 * charter's overriding constraint is that a draft resolving into "the
 * recordings revealed the problem and CRM was the answer" has failed. Naming
 * the piece after the conclusion would settle the argument on the masthead.
 * CVR names the object under examination instead.
 */
const WORDMARK = "CVR";
const TITLE = "How different countries read the same evidence.";

const num = (i: number) => String(i).padStart(2, "0");

/** Layers grouped by the section they hang off. */
const layersFor = (slug: string) => layers.filter((l) => l.parent?.includes(slug));

/**
 * Reading position. Read from the viewport rather than offsetTop, because the
 * sections sit inside a positioned console — same reason CaseStudyPage does it.
 * Starts at zero on the server so the hydrated markup matches.
 */
function useReadingPosition(slugs: string[]) {
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
      slugs.forEach((slug, i) => {
        const el = document.getElementById(slug);
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
  }, [slugs]);

  return { active, progress };
}

/**
 * Skip links. Three targets rather than one, because the charter requires a
 * way past every interactive module as well as into the content. Visible on
 * focus only, and first in the tab order.
 */
function SkipLinks() {
  return (
    <nav aria-label="Skip links" className="absolute left-0 top-0 z-50">
      <ul className="flex">
        {[
          { href: "#main", label: "Skip to the piece" },
          { href: "#contents", label: "Skip to contents" },
          { href: "#apparatus", label: "Skip to sources and apparatus" },
        ].map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-display sr-only rounded-none bg-accent px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-accent-foreground focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Piece() {
  const slugs = sections.map((s) => s.slug);
  const { active, progress } = useReadingPosition(slugs);
  const here = sections[active];

  return (
    <>
      <SkipLinks />
      <PageFrame>
        <div className="pt-10">
          <Column>
            <PageHeader
              name={WORDMARK}
              kicker={TITLE}
              meta={[
                { label: "Subject", value: "Cockpit voice recorder evidence and Crew Resource Management" },
                { label: "Research cutoff", value: "16 August 2026. Dated, not maintained." },
                { label: "Corpus", value: "27 accidents · 14 jurisdictions · 62 sources" },
              ]}
              links={[]}
            />

            <div className="mt-10 space-y-5 text-xl leading-[1.25] tracking-[-0.01em] text-foreground sm:text-2xl md:text-[28px]">
              <p>
                Investigators in a dozen countries listened to recordings of
                people at work in the last minutes before an aircraft was
                destroyed. They were listening for different things, they were
                permitted to do different things with what they heard, and in
                several countries they were forbidden by statute from letting
                anyone else hear it at all.
              </p>
              <p className="text-muted-foreground">
                What did investigators conclude the recordings meant, and how
                much did those conclusions actually shape the training
                discipline that followed? The question is open, and this does
                not close it.
              </p>
            </div>

            <nav
              id="contents"
              aria-label="Contents"
              className="mt-14 scroll-mt-20 border-t border-border pt-4"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                Contents
              </p>
              <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
                {sections.map((s) => (
                  <li key={s.slug} className="border-b border-border/50">
                    <a
                      href={`#${s.slug}`}
                      className="font-display flex gap-3 py-2 text-[12px] uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <span className="text-muted-foreground/60">
                        {num(s.section ?? 0)}
                      </span>
                      <span className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent">
                        {s.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Column>
        </div>

        {/* Reading position, spanning the console the way a status line does. */}
        <div className="sticky top-0 z-20 mt-12 border-y border-border bg-background/95 py-2.5 backdrop-blur-sm">
          <Column>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[11px] uppercase tracking-[0.14em] text-accent">
                {num(active)}
                <span className="text-muted-foreground/50">
                  /{num(sections.length - 1)}
                </span>
              </span>
              <span className="font-display flex-1 truncate text-[11px] uppercase tracking-[0.14em] text-foreground">
                {here?.title}
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
          <main id="main" className="scroll-mt-20 pb-24">
            {sections.map((s) => {
              const kids = layersFor(s.slug);
              return (
                <section
                  key={s.slug}
                  id={s.slug}
                  aria-labelledby={`${s.slug}-heading`}
                  className="scroll-mt-20 border-b border-border/40 py-12 last:border-b-0"
                >
                  <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                    {num(s.section ?? 0)}
                    {s.corePath ? "" : " — apparatus"}
                  </p>
                  <h2
                    id={`${s.slug}-heading`}
                    className="font-display mt-3 text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
                  >
                    {s.title}
                  </h2>

                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground/70">
                    {s.words} words. Prose, citations and the four modules land
                    in the content stage; this is the shell.
                  </p>

                  {kids.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {kids.map((l) => (
                        <li key={l.slug}>
                          <a
                            href={`#${l.slug}`}
                            className="font-display text-[11px] uppercase tracking-[0.14em] text-foreground/70 underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                          >
                            Layer — {l.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}

            <section
              id="apparatus"
              aria-labelledby="apparatus-heading"
              className="scroll-mt-20 border-t border-border pt-12"
            >
              <h2
                id="apparatus-heading"
                className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
              >
                Apparatus
              </h2>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {layers.map((l) => (
                  <li key={l.slug} id={l.slug} className="scroll-mt-20">
                    <span className="font-display text-[11px] uppercase tracking-[0.14em] text-foreground/80">
                      Layer
                    </span>{" "}
                    {l.title}
                  </li>
                ))}
                {unmapped && (
                  <li id={unmapped.slug} className="scroll-mt-20">
                    <span className="font-display text-[11px] uppercase tracking-[0.14em] text-foreground/80">
                      Register
                    </span>{" "}
                    {unmapped.title}
                  </li>
                )}
              </ul>

              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Core path {corePath.length} sections,{" "}
                {corePath.reduce((n, s) => n + s.words, 0)} words. Every section
                and every layer is directly linkable and readable cold; nothing
                is gated and no order is required.
              </p>
            </section>
          </main>
        </Column>
      </PageFrame>
    </>
  );
}

export { WORDMARK, TITLE };
