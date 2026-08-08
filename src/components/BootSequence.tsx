import { useEffect, useState } from "react";
import { BOOT_SEEN_KEY, bootWillPlay } from "@/lib/boot";
import { cn } from "@/lib/utils";

/* Timings, in order. A workstation ROM banner: the machine names itself,
   states what it has, counts its memory, then hands off. */
const T_MARK = 0;
const T_COPY = 420;
const T_SPECS = 760;
const T_CHECK = 1080;
const COUNT_TICK = 17; // ms per percent
const T_COUNT_END = T_CHECK + 100 * COUNT_TICK;
const T_AUTO = T_COUNT_END + 320;
const T_BOOT = T_AUTO + 420;
const T_LEAVE = T_BOOT + 900;
const FADE = 450;

export default function BootSequence() {
  const [skipped] = useState(() => !bootWillPlay());
  const [step, setStep] = useState(0);
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

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));

    at(T_MARK, () => setStep(1));
    at(T_COPY, () => setStep(2));
    at(T_SPECS, () => setStep(3));

    at(T_CHECK, () => {
      setStep(4);
      let n = 0;
      const tick = window.setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= 100) window.clearInterval(tick);
      }, COUNT_TICK);
      timers.push(tick);
    });

    at(T_AUTO, () => setStep(5));
    at(T_BOOT, () => setStep(6));
    at(T_LEAVE, () => setLeaving(true));
    at(T_LEAVE + FADE, () => setDone(true));

    return () => timers.forEach((t) => {
      window.clearTimeout(t);
      window.clearInterval(t);
    });
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

  const line = (n: number) => (step >= n ? "opacity-100" : "opacity-0");

  return (
    <div
      aria-hidden="true"
      className={cn(
        // Above the fixed nav (z-50) so the banner reads as the whole screen.
        "fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity ease-out",
        leaving && "pointer-events-none opacity-0"
      )}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      {/* Centred as a block; the text inside stays flush left, the way a
          console writes it. */}
      <div className="font-display w-full max-w-xl px-6 text-left">
        <p
          className={cn(
            "text-5xl font-bold tracking-tight text-foreground transition-opacity duration-300 sm:text-6xl",
            line(1)
          )}
        >
          SOYA-00
        </p>

        <div className="mt-6 space-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <p className={cn("transition-opacity duration-300", line(2))}>
            (C) Soya, Hanoi 2026
          </p>
          <p className={cn("pl-8 transition-opacity duration-300", line(3))}>
            3 instruments, 3 open problems, 1 kernel
          </p>
          <p className={cn("pl-8 transition-opacity duration-300", line(4))}>
            Memory check:{" "}
            {count < 100 ? (
              <span className="tabular-nums text-foreground">
                {String(count).padStart(3, "0")}%
              </span>
            ) : (
              <span className="text-foreground">
                549 tests passed, 0 skipped
              </span>
            )}
          </p>
          <p className={cn("transition-opacity duration-300", line(5))}>
            Auto-booting...
          </p>
          <p className={cn("transition-opacity duration-300", line(6))}>
            Booting portfolio(0,1,0) index
          </p>
        </div>

        <span className="animate-caret mt-2 inline-block h-[1.1em] w-[0.6em] bg-foreground align-text-bottom" />
      </div>
    </div>
  );
}
