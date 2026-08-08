import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

type EntryProps = {
  title: string;
  state: string;
  delay: number;
  children: ReactNode;
};

function Entry({ title, state, delay, children }: EntryProps) {
  return (
    <Reveal delay={delay}>
      <article className="border-t border-border/60 pt-8 [&+&]:mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-display text-lg text-foreground sm:text-xl">
            {title}
          </h3>
          <span className="font-display rounded-full border border-accent/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-accent">
            {state}
          </span>
        </div>
        <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
      </article>
    </Reveal>
  );
}

export default function Research() {
  return (
    <Section id="research" label="Research" title="Open problems">
      <Reveal>
        <p className="mb-12 leading-relaxed text-muted-foreground">
          Three things in progress. None are finished, and I would rather say
          where they actually are than describe them as results.
        </p>
      </Reveal>

      <Entry title="MentalFallacy" state="Mid-rescope" delay={0}>
        Detecting logical fallacies and cognitive distortions in natural text —
        Reddit corpus labeling, pilot model runs, structured failure analysis.
        Published models still perform poorly on this, so the honest description
        is an open problem rather than a finding I am reporting. I am currently
        rescoping it.
      </Entry>

      <Entry
        title="Banking technology and vision disability in Vietnam"
        state="November submission"
        delay={0.06}
      >
        A paper on how banking technology serves, and fails to serve, people
        with vision disabilities in Vietnam. Targeted for submission in
        November.
      </Entry>

      <Entry title="Extended Essay" state="In progress" delay={0.12}>
        Whether a Monte Carlo estimate of pi reproduces exactly and whether it is correct are separate properties.
        A generator with a structural defect returns bit-identical results on every run and converges at the expected
        rate to the wrong value. Reproducibility is often treated as evidence of validity.
      </Entry>
    </Section>
  );
}
