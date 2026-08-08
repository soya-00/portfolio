import Reveal from "@/components/Reveal";

export default function Intro() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-28 md:pt-36">
      <Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I&apos;m seventeen, in my final year of the IB Diploma in Vietnam,
            and bilingual in Vietnamese and English.
          </p>
          <p>
            On paper, a journal, a learning tool, and a kernel have little in common. 
            {" "}
            <span className="text-foreground">
              Underneath, they are one thing.
            </span>{" "}
          Each is an instrument for thinking — a tool that makes reasoning visible,
            to the person doing it or to the machine underneath. And each carries a
            log of what was decided and why, including the decisions that were wrong.
            The instruments show what I build. The logs show how I think.
          </p>
          <p>
            I want to do research in natural language processing and machine learning, and to keep studying philosophy while I do.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
