import type { ReactNode } from "react";

type PullQuoteProps = {
  children: ReactNode;
  cite: string;
};

export default function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <figure className="liquid-glass my-8 rounded-2xl bg-surface/40 px-7 py-6">
      <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
        {children}
      </blockquote>
      <figcaption className="font-display mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {cite}
      </figcaption>
    </figure>
  );
}
