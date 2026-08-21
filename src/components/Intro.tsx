import Reveal from "@/components/Reveal";

export default function Intro() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-28 md:pt-36">
      <Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I do not usually start from a plan. I start from friction. Something
            makes me think in a shape I did not choose, or slows me down where
            there is no reason to be slow, and only later does it become a project
            I can name.
          </p>
          <p>
            An idea is easy to defend on paper. Building it is where I
            find out whether it survives storage, identity, evidence, uncertainty
            and the edge cases that disappear from a sketch.
          </p>
          <p>
            Next I want to work further into natural language processing and
            machine learning, while continuing to study philosophy alongside
            computer science.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
