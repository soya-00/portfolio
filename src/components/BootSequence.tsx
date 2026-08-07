import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINES = [
  { label: "INSTRUMENTS", value: "OK" },
  { label: "RESEARCH", value: "OK" },
  { label: "DISPLAY", value: "READY" },
];

const STEP = 190; // ms between lines
const HOLD = 420; // ms after the last line
const FADE = 420; // ms of fade-out
const SEEN_KEY = "soya:boot-seen";

const shouldSkip = () => {
  if (typeof window === "undefined") return true;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // Private mode or blocked storage: play it rather than fail.
    return false;
  }
};

/**
 * A short systems check over the hero, echoing BLOC's boot sequence.
 *
 * It is purely an overlay — the hero renders underneath from the first frame,
 * so if this never mounts, never advances, or throws, the page is unaffected.
 * Skipped entirely for reduced motion and after the first visit in a session,
 * and dismissable with a click or any key.
 */
export default function BootSequence() {
  const [skipped] = useState(shouldSkip);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skipped) return;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* not essential */
    }

    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), i * STEP));
    });
    timers.push(
      window.setTimeout(() => setLeaving(true), LINES.length * STEP + HOLD)
    );
    timers.push(
      window.setTimeout(
        () => setDone(true),
        LINES.length * STEP + HOLD + FADE
      )
    );
    return () => timers.forEach(clearTimeout);
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
        "fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity duration-[420ms] ease-out",
        leaving && "pointer-events-none opacity-0"
      )}
    >
      <div className="font-display w-full max-w-xs px-6 text-sm tracking-[0.16em]">
        {LINES.map((line, i) => (
          <div
            key={line.label}
            className={cn(
              "flex items-baseline justify-between py-1 transition-opacity duration-200",
              i < shown ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-muted-foreground">{line.label}</span>
            <span className="text-accent">[ {line.value} ]</span>
          </div>
        ))}
      </div>
    </div>
  );
}
