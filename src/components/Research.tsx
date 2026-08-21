import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

type EntryProps = {
  title: string;
  state: string;
  delay: number;
  /** Directory of the entry's long-form page, under BASE_URL. Omit for an entry without one. */
  writeup?: string;
  children: ReactNode;
};

function Entry({ title, state, delay, writeup, children }: EntryProps) {
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

        {writeup && (
          <a
            href={`${import.meta.env.BASE_URL}${writeup}/`}
            className="font-display group mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-accent"
          >
            Read more
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        )}
      </article>
    </Reveal>
  );
}

export default function Research() {
  return (
    <Section id="research" label="Research" title="Open problems">
      <Reveal>
        <p className="mb-12 leading-relaxed text-muted-foreground">
          Four things sit here and only one of them is finished, and because an
          unfinished project is easy to write up as though it were already a
          result, I would rather say where each one actually stands. Even the
          finished one is dated rather than maintained, and it says so on the
          page.
        </p>
      </Reveal>

      <Entry title="MentalFallacy" state="Mid-rescope" delay={0}>
        I am working on detecting logical fallacies and cognitive distortions in
        natural text, which so far has meant labeling a Reddit corpus, running
        pilot models against it and going through where those models fail rather
        than where they succeed. Published work still performs poorly on the
        task, so what I have is an open problem rather than a finding, and I am
        rescoping it on that basis.
      </Entry>

      <Entry
        title="Banking technology and vision disability in Vietnam"
        state="November submission"
        delay={0.06}
      >
        A paper on how banking technology in Vietnam serves people with vision
        disabilities, and where it fails them, which I am targeting for
        submission in November.
      </Entry>

      <Entry title="Extended Essay" state="In progress" delay={0.12}>
        Whether a Monte Carlo estimate of pi reproduces exactly and whether it
        is correct turn out to be separate properties, since a generator
        carrying a structural defect will return bit-identical results on every
        run while converging, at the expected rate, on the wrong value.
        Reproducibility gets treated as evidence of validity far more often than
        it earns, and that gap is what the essay is about.
      </Entry>

      <Entry title="CVR" state="Completed" delay={0.18} writeup="cvr">
        An interactive case study on how investigators in a dozen countries read
        cockpit voice recorder evidence, and how those readings became Crew
        Resource Management. There is no single legal object called a cockpit
        voice recording, and the conventional answer that the recordings
        revealed the problem and CRM was the answer is widely repeated rather
        than established, so the piece keeps that question open.
      </Entry>
    </Section>
  );
}
