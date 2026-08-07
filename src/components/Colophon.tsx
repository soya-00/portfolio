import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function Colophon() {
  return (
    <Section id="colophon" label="Colophon" title="How I work">
      <Reveal>
        <div className="space-y-6 leading-relaxed text-muted-foreground">
          <p>
            My interest is research, not shipping software. The projects here
            are instruments — things built to make a question answerable — and
            they are AI-assisted at the implementation level.{" "}
            <span className="text-foreground">
              I am deliberate about that distinction because attribution is the
              part of research practice you cannot be casual about:
            </span>{" "}
            what is yours, what is borrowed, what a tool produced. Getting it
            right on a personal project is practice for getting it right where
            it counts.
          </p>
          <p>
            I am also teaching myself computer science from the foundations. I
            work on one subject at a time, in short and deep bursts, rather than
            trying to finish a syllabus: Nand2Tetris for computer architecture,
            Mathematical Thinking through Stanford, and algorithms and data
            structures now.
          </p>
          <p>
            Operating systems runs alongside all of it, studied in C — OSTEP,
            Operating System Concepts, and human factors on the flight deck,
            which is where BLOC&apos;s interface comes from.
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
