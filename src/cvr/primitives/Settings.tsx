import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reader settings. Persisted without an account, functional with storage
 * unavailable, and reachable from anywhere in two keystrokes.
 *
 * Every setting is applied as a data attribute on <html> and read back by
 * CSS, so the whole apparatus is one small script plus stylesheet rules. The
 * defaults are the safe ones — motion follows the system, sensitivity stays
 * collapsed — which means the no-JavaScript state is already the correct
 * state rather than a degraded one.
 */

export type Motion = "full" | "reduced" | "none";
export type TextSize = "s" | "m" | "l" | "xl";
export type Density = "comfortable" | "compact";
export type Sensitivity = "expanded" | "collapsed" | "hidden";
export type Alternatives = "modules" | "text";

export type ReaderSettings = {
  motion: Motion;
  text: TextSize;
  density: Density;
  sensitivity: Sensitivity;
  alternatives: Alternatives;
};

const KEY = "cvr:reader";

export const DEFAULTS: ReaderSettings = {
  motion: "full",
  text: "m",
  density: "comfortable",
  sensitivity: "collapsed",
  alternatives: "modules",
};

function load(): ReaderSettings {
  if (typeof window === "undefined") return DEFAULTS;
  const base = { ...DEFAULTS };
  // Initialise from the system preference, overridable in both directions.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    base.motion = "reduced";
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...base, ...(JSON.parse(raw) as Partial<ReaderSettings>) };
  } catch {
    /* storage unavailable: the defaults still work */
  }
  return base;
}

function apply(s: ReaderSettings) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.dataset.motion = s.motion;
  el.dataset.text = s.text;
  el.dataset.density = s.density;
  el.dataset.sensitivity = s.sensitivity;
  el.dataset.alternatives = s.alternatives;
}

const GROUPS: {
  key: keyof ReaderSettings;
  legend: string;
  hint: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "motion",
    legend: "Motion",
    hint: "Reduced and off are complete experiences, not degraded ones. Nothing is conveyed by motion alone.",
    options: [
      { value: "full", label: "Full" },
      { value: "reduced", label: "Reduced" },
      { value: "none", label: "Off" },
    ],
  },
  {
    key: "text",
    legend: "Text size",
    hint: "The layout holds at the largest step.",
    options: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
    ],
  },
  {
    key: "density",
    legend: "Density",
    hint: "Compact opens every deeper layer at once, for reading the whole argument in one pass.",
    options: [
      { value: "comfortable", label: "Comfortable" },
      { value: "compact", label: "Compact" },
    ],
  },
  {
    key: "sensitivity",
    legend: "Final-moments material",
    hint: "Passages describing the final minutes. Collapsed by default; the piece is complete either way.",
    options: [
      { value: "expanded", label: "Show" },
      { value: "collapsed", label: "Behind a control" },
      { value: "hidden", label: "Hide" },
    ],
  },
  {
    key: "alternatives",
    legend: "Interactive modules",
    hint: "Every module has a textual equivalent carrying the same content, annotations and provenance.",
    options: [
      { value: "modules", label: "Interactive" },
      { value: "text", label: "Text equivalent" },
    ],
  },
];

export default function Settings({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = load();
    setSettings(initial);
    apply(initial);
    setReady(true);
  }, []);

  const set = useCallback(
    (key: keyof ReaderSettings, value: string) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value } as ReaderSettings;
        apply(next);
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* not essential; the setting still applies for this visit */
        }
        return next;
      });
      const group = GROUPS.find((g) => g.key === key);
      const label = group?.options.find((o) => o.value === value)?.label ?? value;
      announce(`${group?.legend ?? key} set to ${label}`);
    },
    [announce]
  );

  return (
    <details
      id="reader-settings"
      className="group scroll-mt-24 border-y border-border bg-background/80"
    >
      <summary className="font-display flex cursor-pointer list-none items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-foreground/85 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
        <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-90">
          ▸
        </span>
        Reading settings
        <span className="ml-auto text-muted-foreground/70">
          motion · text · density · sensitivity · alternatives
        </span>
      </summary>

      <div className="grid gap-6 px-6 pb-6 pt-2 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <fieldset key={g.key} className="min-w-0">
            <legend className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {g.legend}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.options.map((o) => {
                const active = settings[g.key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => set(g.key, o.value)}
                    className={cn(
                      "font-display border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-foreground/70 hover:border-accent/60 hover:text-foreground"
                    )}
                  >
                    {/* The state is carried by a glyph as well as the fill, so
                        it never depends on colour alone. */}
                    <span aria-hidden="true" className="mr-1.5">
                      {active ? "◼" : "◻"}
                    </span>
                    {o.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              {g.hint}
            </p>
          </fieldset>
        ))}

        <p className="text-xs leading-relaxed text-muted-foreground/60 sm:col-span-2">
          {ready
            ? "Settings persist in this browser. With storage blocked they apply for this visit only."
            : "Settings apply once scripting is available. Without it the piece renders at its defaults, which lose no content."}
        </p>
      </div>
    </details>
  );
}
