import type { ReactNode } from "react";
import BackdropPhoto from "@/components/BackdropPhoto";

export type MetaCol = { label: string; value: string };
export type PageLink = { label: string; href: string };

/**
 * The fixed photograph and the translucent console, with nothing inside it.
 * Callers that need a full-panel element (a status bar spanning the console)
 * lay out their own columns.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <BackdropPhoto />

      {/* Same panel as the index page. */}
      <main className="console relative z-10 mx-auto w-full max-w-4xl border-x border-white/[0.07]">
        {children}
      </main>
    </div>
  );
}

/** The text column, matching the index page's sections. */
export function Column({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-6">{children}</div>;
}

/** Frame plus a single text column — the shape a plain writeup needs. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <PageFrame>
      <div className="pt-10">
        <Column>{children}</Column>
      </div>
    </PageFrame>
  );
}

/**
 * Masthead, kicker, labeled metadata band and source links — the fixed
 * furniture at the head of any long-form page.
 */
export function PageHeader({
  name,
  kicker,
  meta,
  links,
}: {
  name: string;
  kicker: string;
  meta: MetaCol[];
  links: PageLink[];
}) {
  const home = import.meta.env.BASE_URL;

  return (
    <>
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

      {/* Omitted entirely when there are no links, rather than leaving an
          empty ruled band under the metadata. */}
      {links.length > 0 && (
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
      )}
    </>
  );
}

/** Closing link back to the projects list. */
export function BackToProjects() {
  return (
    <p className="pt-6 text-sm">
      <a
        href={`${import.meta.env.BASE_URL}#work`}
        className="font-display uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
      >
        ← Back to projects
      </a>
    </p>
  );
}
