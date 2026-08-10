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
            A journal, a learning tool and a kernel do not obviously belong on
            the same page, but the reason I keep returning to all three is
            that{" "}
            <span className="text-foreground">
              each one is an instrument for thinking
            </span>{" "}
            — a tool built to make reasoning visible, either to the person doing
            it or to the machine underneath. Because I cannot trust my own
            account of a decision several months after making it, each project
            also carries a log of what was decided and why, including the
            decisions that turned out to be wrong. The instruments are the part
            you can run, while the logs are the part that shows how I got there.
          </p>
          <p>
            What I want to do next is research in natural language processing
            and machine learning, and to carry on studying philosophy alongside
            it rather than after it.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
