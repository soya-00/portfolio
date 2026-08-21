import { useEffect, useState } from "react";
import { Column, PageFrame, PageHeader } from "@/components/PageShell";
import { citationsFor } from "@/cvr/lib/citations";
import { layers, sections, unmapped } from "@/cvr/lib/corpus";
import { renderMarkdown } from "@/cvr/lib/markdown";
import Divergence from "@/cvr/modules/Divergence";
import { ApparatusExtras } from "@/cvr/modules/Apparatus";
import Denominator from "@/cvr/modules/Denominator";
import EvidenceMatrix from "@/cvr/modules/EvidenceMatrix";
import OriginChain from "@/cvr/modules/OriginChain";
import TheDocument from "@/cvr/modules/TheDocument";
import Disclosure from "@/cvr/primitives/Disclosure";
import LiveRegion, { useAnnouncer } from "@/cvr/primitives/LiveRegion";
import Settings from "@/cvr/primitives/Settings";

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

const layersFor = (slug: string) => layers.filter((l) => l.parent?.includes(slug));

/**
 * Reading position, read from the viewport rather than offsetTop because the
 * sections sit inside a positioned console. Starts at zero on the server so
 * the hydrated markup matches what was prerendered.
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
 * Three targets rather than one: the charter requires a way into the content,
 * into navigation, and past every interactive module. Visible on focus only,
 * and first in the tab order.
 */
function SkipLinks() {
  const links = [
    { href: "#main", label: "Skip to the piece" },
    { href: "#contents", label: "Skip to contents" },
    { href: "#reader-settings", label: "Skip to reading settings" },
    { href: "#apparatus", label: "Skip to sources and apparatus" },
  ];
  return (
    <nav aria-label="Skip links">
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-display sr-only bg-accent px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-accent-foreground focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60]"
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
  const { message, announce } = useAnnouncer();
  const here = sections[active];

  return (
    <>
      <SkipLinks />
      <LiveRegion message={message} />

      <PageFrame>
        <div className="pt-10">
          <Column>
            <PageHeader
              name={WORDMARK}
              kicker={TITLE}
              meta={[
                {
                  label: "Subject",
                  value:
                    "Cockpit voice recorder evidence and Crew Resource Management",
                },
                {
                  label: "Research cutoff",
                  value: "16 August 2026. A dated publication, not maintained.",
                },
                {
                  label: "Corpus",
                  value: "27 accidents · 14 jurisdictions · 62 sources",
                },
              ]}
              links={[]}
            />

            <nav
              id="contents"
              aria-label="Contents"
              className="mt-12 scroll-mt-24 border-t border-border pt-4"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                Contents · every section is readable cold, in any order
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

        <div className="mt-10">
          <Settings announce={announce} />
        </div>

        {/* Reading position, spanning the console the way a status line does. */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 py-2.5 backdrop-blur-sm">
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
              className="progress-fill h-px bg-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <Column>
          {/* A div, not a <main>: PageFrame already renders the console as
              the page's <main>, and nesting a second one is invalid and hands
              a screen reader two main landmarks. The skip link still targets
              this id, which lands the reader at the first section. */}
          <div id="main" className="scroll-mt-24 pb-24">
            {sections.map((s) => {
              const kids = layersFor(s.slug);
              const cites = citationsFor(s.slug);
              return (
                <section
                  key={s.slug}
                  id={s.slug}
                  aria-labelledby={`${s.slug}-heading`}
                  className="scroll-mt-24 border-b border-border/40 py-12 last:border-b-0"
                >
                  <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                    {num(s.section ?? 0)}
                    {s.corePath ? "" : " · apparatus"}
                  </p>
                  <h2
                    id={`${s.slug}-heading`}
                    className="font-display mt-3 text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
                  >
                    {s.title}
                  </h2>

                  <div className="prose-cvr mt-6 leading-relaxed text-muted-foreground">
                    {renderMarkdown(s.body, cites, { skipLeadingH1: true })}
                  </div>

                  {/* The recorder as a legal object is this section's subject,
                      so what may be reproduced of one belongs here rather than
                      in an appendix. */}
                  {s.slug === "the-instrument-arrives" && (
                    <TheDocument announce={announce} />
                  )}

                  {/* The spine. This section is the comparison, so the grid
                      belongs inside it rather than in an appendix the
                      argument would then have to refer out to. */}
                  {s.slug === "divergence" && <Divergence announce={announce} />}

                  {/* The chain belongs to the workshop section rather than to
                      Portland: section 04 is where the second strand arrives,
                      and the second strand is the argument. */}
                  {s.slug === "the-workshop" && <OriginChain announce={announce} />}

                  {s.slug === "what-cannot-be-seen" && (
                    <Denominator announce={announce} />
                  )}

                  {s.slug === "causes-we-cannot-evidence" && (
                    <EvidenceMatrix announce={announce} />
                  )}

                  {kids.map((l) => (
                    <Disclosure
                      key={l.slug}
                      id={l.slug}
                      kicker="Optional layer"
                      label={l.title}
                      summary={`${l.words} words. Nothing the argument above depends on.`}
                    >
                      <div className="prose-cvr">
                        {renderMarkdown(l.body, citationsFor(l.slug), {
                          skipLeadingH1: true,
                        })}
                      </div>
                    </Disclosure>
                  ))}
                </section>
              );
            })}

            <section
              id="apparatus"
              aria-labelledby="apparatus-heading"
              className="scroll-mt-24 border-t border-border pt-12"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                Apparatus
              </p>
              <h2
                id="apparatus-heading"
                className="font-display mt-3 text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
              >
                Sources and apparatus
              </h2>

              {/* The two registers a reader is owed: what was refused, and
                  what was used. The cut list says of itself that it renders
                  to the reader rather than sitting in the repository. */}
              <ApparatusExtras announce={announce} />

              {unmapped && (
                <div id={unmapped.slug} className="prose-cvr mt-6 scroll-mt-24 leading-relaxed text-muted-foreground">
                  {renderMarkdown(unmapped.body, citationsFor(unmapped.slug), {
                    skipLeadingH1: true,
                  })}
                </div>
              )}
            </section>
          </div>
        </Column>
      </PageFrame>
    </>
  );
}

export { WORDMARK, TITLE };
