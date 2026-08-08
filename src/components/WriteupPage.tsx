import type { ReactNode } from "react";

export type MetaCol = { label: string; value: string };
export type WriteupLink = { label: string; href: string };

type WriteupPageProps = {
  name: string;
  kicker: string;
  /** Rendered as labelled columns under the wordmark. Keep values short. */
  meta: MetaCol[];
  links: WriteupLink[];
  /** The opening, set large. */
  lead: ReactNode;
  children: ReactNode;
};

/**
 * Editorial layout: the name at full width, dense metadata bands beneath it,
 * then the opening set large and the body stepping down. Everything is flush
 * left and the rules are hairlines.
 */
export default function WriteupPage({
  name,
  kicker,
  meta,
  links,
  lead,
  children,
}: WriteupPageProps) {
  const home = import.meta.env.BASE_URL;

  return (
    <div className="relative">
      <img
        src={`${home}landing-page.png`}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />

      {/* Same panel and text column as the index page. */}
      <main className="console relative z-10 mx-auto w-full max-w-4xl border-x border-white/[0.07]">
        <div className="mx-auto w-full max-w-3xl px-6 pt-10">
          {/*
            Sized so the longest name reaches the full measure and none of them
            overflow it; the cap holds once the console stops growing.
          */}
          <h1
            className="font-display font-bold uppercase leading-[0.8] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "min(20vw, 195px)" }}
          >
            {name}
          </h1>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-border pt-2 text-[11px] uppercase tracking-[0.14em] sm:text-xs">
            <span className="font-display text-muted-foreground">{kicker}</span>
            <nav className="font-display flex gap-5">
              <a href={home} className="text-foreground/70 hover:text-foreground">
                Index
              </a>
              <a
                href={`${home}#work`}
                className="text-foreground/70 hover:text-foreground"
              >
                Projects
              </a>
            </nav>
          </div>

          <dl className="grid grid-cols-1 gap-x-8 border-t border-border sm:grid-cols-3">
            {meta.map((c) => (
              <div
                key={c.label}
                className="border-b border-border/60 py-3 last:border-b-0 sm:border-b-0"
              >
                <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                  {c.label}
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-foreground/90">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-x-6 gap-y-1 border-y border-border py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[11px] uppercase tracking-[0.14em] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* The opening, set large. */}
          <div className="mt-10 space-y-5 text-xl leading-[1.25] tracking-[-0.01em] text-foreground sm:text-2xl md:text-[28px]">
            {lead}
          </div>

          <div className="mt-14 space-y-6 pb-24 leading-relaxed text-muted-foreground">
            {children}

            <p className="pt-6 text-sm">
              <a
                href={`${home}#work`}
                className="font-display uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                ← Back to projects
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/** A section heading inside a writeup. */
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display pt-8 text-xl font-bold uppercase tracking-[0.06em] text-foreground">
      {children}
    </h2>
  );
}
