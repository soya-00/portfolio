import type { ReactNode } from "react";
import Section from "@/components/Section";

type EntryProps = {
  title: string;
  state: string;
  children: ReactNode;
};

function Entry({ title, state, children }: EntryProps) {
  return (
    <article className="border-t border-border/60 pt-8 first:border-t-0 first:pt-0 [&+&]:mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-lg text-foreground">{title}</h3>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {state}
        </span>
      </div>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </article>
  );
}

export default function Research() {
  return (
    <Section id="research" label="Research" title="Open problems">
      <p className="mb-12 leading-relaxed text-muted-foreground">
        Three things in progress. None are finished, and I would rather say
        where they actually are than describe them as results.
      </p>

      <Entry title="MentalFallacy" state="Mid-rescope">
        Detecting logical fallacies and cognitive distortions in natural text —
        Reddit corpus labeling, pilot model runs, structured failure analysis.
        Published models still perform poorly on this, so the honest description
        is an open problem rather than a finding I am reporting. I am currently
        rescoping it.
      </Entry>

      <Entry
        title="Banking technology and vision disability in Vietnam"
        state="November submission"
      >
        A paper on how banking technology serves, and fails to serve, people
        with vision disabilities in Vietnam. I am the main author. Targeted for
        submission in November.
      </Entry>

      <Entry title="Extended Essay" state="In progress">
        On the reproducibility and accuracy of pseudorandom number generators in
        Monte Carlo estimation of pi.
      </Entry>
    </Section>
  );
}
