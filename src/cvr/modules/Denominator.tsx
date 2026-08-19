import { useEffect, useRef, useState } from "react";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  TIER_LABEL,
  TIER_MARK,
  byTier,
  counted,
  savesOrigin,
  substitutes,
} from "@/cvr/lib/denominator";
import DenominatorText from "@/cvr/modules/Denominator.text";

/**
 * The census of failures, and the population it cannot see.
 *
 * FORM. A unit chart on one side and nothing on the other. Every record in
 * the corpus is one mark, because the count is small enough to show whole and
 * because a reader can then verify the number by looking. The other side is
 * deliberately not a shape: no bar, no area, no proportion, no second number.
 *
 * WHY IT IS NOT A COMPARISON. The obvious figure here is two quantities side
 * by side, and it would be a fabrication. Nothing in the corpus measures how
 * many flights went well, so any extent given to that side would be a ratio
 * invented to make the figure legible. `anti-patterns` calls interpolating a
 * value to smooth a display exactly what it is. So the unrecorded side runs
 * off the edge of the frame with no boundary, and a region with no boundary
 * cannot be read off.
 *
 * THE LOOP. The section says the recordings from those flights are
 * overwritten, on a loop, within hours. That is a fact about the medium, and
 * the ring renders it: uniform ticks, cleared by an advancing head, on a
 * cycle. Nothing about it varies, because nothing about it is derived from
 * anything that was recorded. It is not a waveform and it carries no
 * duration, since the corpus gives none.
 */

const TICKS = 48;

export default function Denominator({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [reduced, setReduced] = useState(true);
  const [head, setHead] = useState(0);
  const [showTiers, setShowTiers] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const seen = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const node = wrap.current;
    if (!node) return;
    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      (es) => {
        const visible = es.some((e) => e.isIntersecting);
        if (visible && !timer) {
          timer = window.setInterval(() => {
            raf = window.requestAnimationFrame(() => setHead((h) => (h + 1) % TICKS));
          }, 110);
          seen.current = true;
        } else if (!visible && timer) {
          window.clearInterval(timer);
          timer = 0;
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      id="the-denominator"
      aria-labelledby="the-denominator-heading"
      className="module my-12 scroll-mt-24 border-y border-border py-8"
      ref={wrap}
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Module · four of four
      </p>
      <h3
        id="the-denominator-heading"
        className="font-display mt-2 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
      >
        A census of failures
      </h3>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        Every record here was selected by one rule: something went wrong badly
        enough to trigger an investigation. The figure shows the whole of what
        that rule caught, and refuses to give a size to what it did not.
      </p>

      <div className="module-interactive">
        <div className="mt-6 grid gap-px border border-border bg-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:border-r-0">
          {/* Counted. One mark per record, so the number can be verified by
              looking rather than taken on trust. */}
          <div className="bg-background px-5 py-5">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-accent">
              Investigated, and therefore counted
            </p>
            <p className="font-display mt-1 text-4xl font-bold tabular-nums text-foreground">
              {counted.length}
            </p>
            <ul
              className="mt-4 flex flex-wrap gap-1.5"
              aria-label={`${counted.length} records, one mark each`}
            >
              {counted.map((r) => (
                <li
                  key={r.id}
                  className="font-display text-base leading-none text-accent"
                  title={`${r.display} · ${TIER_LABEL[r.tier] ?? r.tier}`}
                >
                  <span aria-hidden="true">{TIER_MARK[r.tier] ?? "▪"}</span>
                  <span className="sr-only">
                    {r.display}, {TIER_LABEL[r.tier] ?? r.tier}.
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-expanded={showTiers}
              onClick={() => {
                setShowTiers((v) => !v);
                announce(
                  showTiers
                    ? "Tier breakdown collapsed"
                    : byTier
                        .map((t) => `${TIER_LABEL[t.tier]}: ${t.members.length}`)
                        .join(". ")
                );
              }}
              className="js-only font-display mt-4 border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:border-accent/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true" className="mr-1.5">
                {showTiers ? "◼" : "◻"}
              </span>
              What the marks are
            </button>
            <dl
              className={
                showTiers
                  ? "mt-3 space-y-1 text-xs text-muted-foreground"
                  : "mt-3 space-y-1 text-xs text-muted-foreground js-hidden"
              }
            >
              {byTier.map((t) => (
                <div key={t.tier} className="flex items-baseline gap-2">
                  <dt className="font-display text-accent">
                    <span aria-hidden="true">{TIER_MARK[t.tier]}</span>{" "}
                    {TIER_LABEL[t.tier]}
                  </dt>
                  <dd className="tabular-nums">{t.members.length}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Not counted, and given no extent. The frame is open on the right
              because closing it would state a size. */}
          <div className="bg-background px-5 py-5">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Coordination that worked
            </p>
            <p className="font-display mt-1 text-4xl font-bold text-muted-foreground/50">
              no denominator
            </p>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              Nobody investigates the flights where a first officer raised a
              concern and the captain acted on it. No authority publishes a
              report on the approach that was stabilised because somebody
              called it. The evidence of coordination working is destroyed by
              design, and the evidence of it failing is preserved,
              transcribed, analysed and published.
            </p>

            {/* The loop. Uniform ticks, cleared by an advancing head. */}
            <div className="mt-5 flex items-center gap-4">
              <svg
                viewBox="0 0 60 60"
                className="h-20 w-20 shrink-0"
                role="img"
                aria-label="A ring of uniform ticks with a head advancing around it, clearing the ticks behind. It represents a recording loop being overwritten and carries no measurement."
              >
                {Array.from({ length: TICKS }, (_, i) => {
                  const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
                  const behind = reduced
                    ? i > TICKS * 0.45
                    : (i - head + TICKS) % TICKS > TICKS * 0.45;
                  return (
                    <line
                      key={i}
                      x1={30 + Math.cos(a) * 20}
                      y1={30 + Math.sin(a) * 20}
                      x2={30 + Math.cos(a) * 26}
                      y2={30 + Math.sin(a) * 26}
                      stroke="currentColor"
                      strokeWidth={1.6}
                      className={behind ? "text-border/40" : "text-accent"}
                    />
                  );
                })}
              </svg>
              <p className="text-xs leading-relaxed text-muted-foreground/75">
                Those recordings are overwritten, on a loop, within hours. The
                ring carries no duration and no measurement, because the
                corpus gives none. It is here because the mechanism is the
                argument: the record of success is erased by the same design
                that preserves the record of failure.
              </p>
            </div>

          </div>
        </div>

        <p className="mt-3 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
          The right-hand side of this figure has no boundary and no quantity on
          purpose. Nothing in this corpus measures how often coordination
          succeeds, so drawing that side at any size would put a ratio on
          screen that no source supports. The comparison this piece cannot
          make is the reason the piece exists.
        </p>

        <h4 className="font-display mt-8 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Three partial substitutes, none sufficient
        </h4>
        <div className="mt-3 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
          {substitutes.map((s) => (
            <div key={s.id} className="bg-background px-5 py-4">
              <p className="font-display text-[11px] uppercase tracking-[0.14em] text-accent">
                {s.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.can}</p>
              <p className="mt-2 border-l-2 border-border pl-3 text-xs leading-relaxed text-muted-foreground/80">
                {s.cannot}
              </p>
              {s.id === "saves" && savesOrigin && (
                <p className="mt-2 border-l-2 border-accent/60 pl-3 text-xs leading-relaxed text-muted-foreground/85">
                  <span aria-hidden="true" className="mr-1 text-accent">◈</span>
                  Single origin. {savesOrigin.attribution} {savesOrigin.note}
                </p>
              )}
              {s.source && (
                <p className="mt-2 text-xs text-muted-foreground/70">
                  <cite className="not-italic">{s.source.citation}</cite> ·{" "}
                  {VERIFICATION_LABEL[s.source.verification]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="module-equivalent">
        <DenominatorText />
      </div>
    </section>
  );
}
