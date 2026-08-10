import type { ReactNode } from "react";
import {
  BackToProjects,
  PageHeader,
  PageShell,
  type MetaCol,
  type PageLink,
} from "@/components/PageShell";

export type { MetaCol, PageLink as WriteupLink };

type WriteupPageProps = {
  name: string;
  kicker: string;
  /** Rendered as labelled columns under the wordmark. Keep values short. */
  meta: MetaCol[];
  links: PageLink[];
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
  return (
    <PageShell>
      <PageHeader name={name} kicker={kicker} meta={meta} links={links} />

      {/* The opening, set large. */}
      <div className="mt-10 space-y-5 text-xl leading-[1.25] tracking-[-0.01em] text-foreground sm:text-2xl md:text-[28px]">
        {lead}
      </div>

      <div className="mt-14 space-y-6 pb-24 leading-relaxed text-muted-foreground">
        {children}
        <BackToProjects />
      </div>
    </PageShell>
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
