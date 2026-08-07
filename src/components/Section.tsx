import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  label,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-24 md:py-36",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          <p className="font-label text-xs uppercase tracking-[0.22em] text-accent">
            {label}
          </p>
        </div>
        <h2 className="font-display mt-5 text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
