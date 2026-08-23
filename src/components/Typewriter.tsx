import { useEffect, useState } from "react";
import { BOOT_TOTAL_MS, bootWillPlay, prefersReducedMotion } from "@/lib/boot";

export type Segment = { text: string; className?: string };

type TypewriterProps = {
  segments: Segment[];
  /** Milliseconds per character. */
  speed?: number;
  className?: string;
};

/**
 * Types a headline out one character at a time.
 *
 * Every character is in the DOM from the first frame and only its opacity
 * changes, so the line never reflows as it fills — appending text would
 * re-wrap and shift the whole hero on each keystroke.
 *
 * The name comes from a visually-hidden copy of the string rather than from
 * aria-label. ARIA prohibits aria-label on a span, which has no role, and
 * screen readers are free to ignore it there; since every animated character
 * is aria-hidden, a dropped label would leave the page's only h1 with no
 * accessible name at all.
 */
export default function Typewriter({
  segments,
  speed = 26,
  className,
}: TypewriterProps) {
  const full = segments.map((s) => s.text).join("");
  const [reduced] = useState(prefersReducedMotion);
  const [shown, setShown] = useState(() =>
    prefersReducedMotion() ? full.length : 0
  );

  useEffect(() => {
    if (reduced) return;
    // Wait for the boot check to clear rather than typing behind it.
    const start = bootWillPlay() ? BOOT_TOTAL_MS - 250 : 250;
    let i = 0;
    let tick: number | undefined;

    const begin = window.setTimeout(() => {
      tick = window.setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= full.length && tick) window.clearInterval(tick);
      }, speed);
    }, start);

    return () => {
      window.clearTimeout(begin);
      if (tick) window.clearInterval(tick);
    };
  }, [full.length, speed, reduced]);

  const done = shown >= full.length;
  let index = 0;

  return (
    <span className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {segments.map((segment, s) => (
          <span key={s} className={segment.className}>
            {[...segment.text].map((char, c) => {
              const visible = index++ < shown;
              return (
                <span
                  key={c}
                  style={{ opacity: visible ? 1 : 0 }}
                  className="transition-opacity duration-100"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
        {!reduced && !done && (
          <span className="ml-1 inline-block h-[0.75em] w-[0.5ch] animate-caret bg-accent align-baseline" />
        )}
      </span>
    </span>
  );
}
