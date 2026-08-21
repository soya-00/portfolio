import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function Colophon() {
  return (
    <Section id="colophon" label="Colophon" title="How I work">
      <Reveal>
        <div className="space-y-6 leading-relaxed text-muted-foreground">
          <p>
            I integrate AI in implementation, but the work starts earlier than
            the code. I choose the problem and define its scope. I sketch the
            interaction and decide what the system is allowed to do. I also
            write down the constraints that the implementation has to survive.
            Meanwhile, AI writes most of the production code. It also handles
            much of the debugging and testing, and it helps with repository
            documentation, both areas where I lack real experience in.
          </p>
          <p>
            Interface design happens before the model gets involved. Evidently,
            I begin by sketching on paper first, since it allows the interaction
            to exist without implementation pressure. For instance, I then move
            into Figma and work through the interaction in more detail, refining
            how each state behaves before any code exists. After that, I bring
            the decision into code, and only then does the model suggest
            implementations, which I can still reject when they solve the wrong
            problem.
          </p>
          <p>
            A class-code fix in GALS preserved readable identifiers by carrying
            part of an older code forward. However, this made the student
            identity depend on the class identity, so I removed it. In doing so,
            I found another leak in the export path. Meanwhile, a growth
            timeline in Tilt made the journal easier to measure, but at the same
            time it made it harder to keep as a journal, so it left the roadmap.
          </p>
          <p>
            Verification starts from those constraints and works back through
            the implementation. Furthermore, a compile passing does not settle
            an interaction question, since a technically valid fix can still
            violate an identity boundary. On the other hand, a feature can be
            removed after implementation when the result turns out to change the
            category of the system, rather than simply improving it.
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
