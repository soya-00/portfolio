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
            answerable only. As such, I naturally
            integrate AI in implementation, but the work starts earlier than
            the code. I choose the problem and define its scope. I sketch the
            interaction and decide what the system is allowed to do. I also
            write down the constraints that the implementation has to survive.
            Meanwhile, AI writes most of the production code. It also handles
            much of the debugging and testing, and it helps with repository
            documentation, two areas where I lack real experience in.
          </p>
          <p>
            Alongside the projects, I am teaching myself computer science from
            the foundations. I do this one subject at a time, in short and deep
            bursts, rather than following a linear syllabus. For example, I use
            Nand2Tetris for architecture, Stanford&apos;s Mathematical Thinking
            for formal reasoning, and I am now moving into algorithms and data
            structures.
          </p>
          <p>
            Operating systems runs underneath much of this work. So I am
            studying C through OSTEP and Operating System Concepts. At the same
            time, I continue reading about human factors on the flight deck,
            which is where the original interface decisions for BLOC came from.
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
