import Reveal from "@/components/Reveal";

export default function Intro() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-28 md:pt-36">
      <Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I am seventeen, in my final year of the IB Diploma in Vietnam, and
            bilingual in Vietnamese and English.
          </p>
          <p>
            I am usually building from something that feels slightly misaligned
            rather than from a clear plan, and I tend to notice it first as
            friction in how I am forced to think, or in how a system makes me
            slow down in places where I do not want to be slowed down, and only
            later does it become something I can name as a direction or a
            project.
          </p>
          <p>
            Building each one gave me a different way to find out whether the
            original idea held up once it had to deal with storage, identity,
            evidence, uncertainty and the ordinary edge cases that disappear
            from a sketch.
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
