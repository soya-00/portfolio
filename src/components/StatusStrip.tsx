import { useEffect, useState } from "react";

/** UTC, formatted the way a flight deck writes it: 174551Z. */
function zulu(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
}

const FIELDS = [
  "3 INSTRUMENTS",
  "3 OPEN PROBLEMS",
  "1 RETRACTION",
];

export default function StatusStrip() {
  const [time, setTime] = useState(() => zulu(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(zulu(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-y border-border/60 bg-surface/30">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3">
        <span className="font-display text-xs tracking-[0.18em] text-accent">
          ◈ SOYA
        </span>
        <span className="font-display text-xs tracking-[0.18em] text-muted-foreground">
          HANOI
        </span>
        <span
          className="font-display text-xs tabular-nums tracking-[0.18em] text-muted-foreground"
          aria-hidden="true"
        >
          {time}
        </span>
        {FIELDS.map((f) => (
          <span
            key={f}
            className="font-display text-xs tracking-[0.18em] text-muted-foreground"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
