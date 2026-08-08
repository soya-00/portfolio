import type { ReactNode } from "react";
import LinkChip from "@/components/LinkChip";

export type WriteupLink = { label: string; href: string };

type WriteupPageProps = {
  bay: string;
  name: string;
  kicker: string;
  meta: { label: string; value: string }[];
  links: WriteupLink[];
  children: ReactNode;
};

/**
 * Layout for a project's long-form page. Same console over the same fixed
 * photograph as the index, so a deep link does not feel like another site.
 */
export default function WriteupPage({
  bay,
  name,
  kicker,
  meta,
  links,
  children,
}: WriteupPageProps) {
  return (
    <div className="relative">
      <img
        src={`${import.meta.env.BASE_URL}landing-page.png`}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/90 via-background/45 to-transparent"
        />
        <nav className="relative mx-auto flex w-full max-w-4xl items-center gap-6 px-6 py-4">
          <a
            href={import.meta.env.BASE_URL}
            className="font-display shrink-0 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70 sm:text-xl"
          >
            Soya
          </a>
          <a
            href={`${import.meta.env.BASE_URL}#work`}
            className="text-[13px] text-foreground/60 transition-colors hover:text-foreground"
          >
            ← Back to projects
          </a>
        </nav>
      </header>

      <main className="relative z-10 pt-24">
        <div className="console relative mx-auto w-full max-w-4xl border-x border-white/[0.07] pb-24">
          <article className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
            <div className="flex items-stretch">
              <span className="font-display border border-accent/70 px-3 py-1.5 text-xs tracking-[0.18em] text-accent">
                {bay}
              </span>
              <span
                className="ml-4 flex-1 self-center border-t border-border"
                aria-hidden="true"
              />
            </div>

            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
              {kicker}
            </p>

            <dl className="mt-8 grid gap-x-6 gap-y-3 border-y border-border/60 py-5 text-sm sm:grid-cols-[7rem_1fr]">
              {meta.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="text-foreground/90">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-6 leading-relaxed text-muted-foreground">
              {children}
            </div>

            <div className="mt-14 flex flex-wrap gap-3 border-t border-border/60 pt-8">
              {links.map((l) => (
                <LinkChip key={l.href} href={l.href}>
                  {l.label}
                </LinkChip>
              ))}
            </div>

            <p className="mt-12 text-sm">
              <a
                href={`${import.meta.env.BASE_URL}#work`}
                className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
              >
                ← Back to projects
              </a>
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}

/** A section heading inside a writeup. */
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display pt-8 text-2xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}
