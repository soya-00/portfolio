import { useEffect, useState } from "react";
import { BOOT_SEEN_KEY, bootWillPlay } from "@/lib/boot";
import { cn } from "@/lib/utils";

/** Each line resolves once the counter passes its mark. */
const LINES = [
  { label: "INSTRUMENTS", value: "OK", at: 28 },
  { label: "RESEARCH", value: "OK", at: 56 },
  { label: "DISPLAY", value: "READY", at: 84 },
];

const TICK = 26; // ms per percent — 100 ticks ≈ 2.6s
const HOLD = 400; // ms on 100 before leaving
const FADE = 450; // ms of fade-out

/**
 * A systems check over the hero, in the register of the boot sequence the
 * Python prototype had.
 *
 * Purely an overlay — the hero renders underneath from the first frame, so if
 * this never mounts, never advances, or throws, the page is unaffected.
 * Skipped for reduced motion and after the first visit in a session, and a
 * click or any key dismisses it.
 */
export default function BootSequence() {
  const [skipped] = useState(() => !bootWillPlay());
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skipped) return;
    try {
      window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
    } catch {
      /* not essential */
    }

    let n = 0;
    const timers: number[] = [];
    const tick = window.setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= 100) {
        window.clearInterval(tick);
        timers.push(window.setTimeout(() => setLeaving(true), HOLD));
        timers.push(window.setTimeout(() => setDone(true), HOLD + FADE));
      }
    }, TICK);

    return () => {
      window.clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [skipped]);

  useEffect(() => {
    if (skipped || done) return;
    const dismiss = () => {
      setLeaving(true);
      window.setTimeout(() => setDone(true), FADE);
    };
    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, [skipped, done]);

  if (skipped || done) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        // Above the fixed nav (z-50) so the check reads as a whole screen.
        "fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity ease-out",
        leaving && "pointer-events-none opacity-0"
      )}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      <div className="font-display w-full max-w-sm px-6 text-sm tracking-[0.16em]">
        {LINES.map((line) => (
          <div
            key={line.label}
            className={cn(
              "flex items-baseline justify-between py-1.5 transition-opacity duration-300",
              count >= line.at ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-muted-foreground">{line.label}</span>
            <span className="text-accent">[ {line.value} ]</span>
          </div>
        ))}

        <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-muted-foreground/70">
            {count < 100 ? "CHECKING" : "READY"}
          </span>
          <span className="text-2xl tabular-nums text-foreground">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        <div className="mt-3 h-px w-full bg-border">
          <div
            className="h-px bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
