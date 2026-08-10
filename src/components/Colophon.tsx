import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function Colophon() {
  return (
    <Section id="colophon" label="Colophon" title="How I work">
      <Reveal>
        <div className="space-y-6 leading-relaxed text-muted-foreground">
          <p>
            My interest is in research rather than in shipping software, so the
            projects here are instruments — things built to make a question
            answerable — and at the implementation level they are AI-assisted.{" "}
            <span className="text-foreground">
              I say that outright because attribution is the part of research
              practice nobody can afford to be casual about,
            </span>{" "}
            and keeping track of what is mine, what is borrowed and what a tool
            produced is a habit that only holds up later if it is practiced
            somewhere the stakes are low.
          </p>
          <p>
            Alongside that I am teaching myself computer science from the
            foundations, working on one subject at a time in short and deep
            bursts rather than marching through a syllabus, which so far has
            meant Nand2Tetris for computer architecture, Mathematical Thinking
            through Stanford, and algorithms and data structures now.
          </p>
          <p>
            Operating systems runs underneath all of it, studied in C through
            OSTEP and Operating System Concepts, together with human factors on
            the flight deck, which is where BLOC&apos;s interface comes from.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-8 text-sm">
          <a
            href="https://github.com/soya-00"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
          >
            github.com/soya-00
          </a>
          <a
            href="mailto:ppiaillust@gmail.com"
            className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            ppiaillust@gmail.com
          </a>
          <a
            href="#top"
            className="ml-auto text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
