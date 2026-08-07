import type { ReactNode } from "react";
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
        "mx-auto w-full max-w-3xl scroll-mt-16 px-6 py-24 md:py-32",
        className
      )}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <h2
        className="mt-4 text-4xl font-normal leading-tight tracking-[-1px] sm:text-5xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
