import { useEffect, useState } from "react";

/** UTC, formatted the way a flight deck writes it: 174551Z. */
function zulu(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
}

const FIELDS = ["3 INSTRUMENTS", "3 OPEN PROBLEMS", "1 KERNEL"];

export default function StatusStrip() {
  const [time, setTime] = useState(() => zulu(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(zulu(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-background/40 backdrop-blur-md">
      {/* max-w-4xl matches the console panel, so the strip reads as its top edge. */}
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3.5">
        <span className="font-display text-xs tracking-[0.18em] text-accent">
          ◈ SOYA
        </span>
        <span className="font-display text-xs tracking-[0.18em] text-foreground/70">
          HANOI
        </span>
        <span
          className="font-display text-xs tabular-nums tracking-[0.18em] text-foreground/70"
          aria-hidden="true"
        >
          {time}
        </span>
        <span className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
          {FIELDS.map((f) => (
            <span
              key={f}
              className="font-display text-xs tracking-[0.18em] text-foreground/50"
            >
              {f}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
