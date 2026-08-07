import Section from "@/components/Section";

export default function Colophon() {
  return (
    <Section id="colophon" label="Colophon" title="How I work">
      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <p>
          My interest is research, not shipping software. The projects here are
          instruments — things built to make a question answerable — and they
          are AI-assisted at the implementation level.{" "}
          <span className="text-foreground">
            I am deliberate about that distinction because attribution is the
            part of research practice you cannot be casual about:
          </span>{" "}
          what is yours, what is borrowed, what a tool produced. Getting it
          right on a personal project is practice for getting it right where it
          counts.
        </p>
        <p>
          Alongside that, and more slowly, computer science properly — in
          depth-sprints rather than for completion. Nand2Tetris for computer
          architecture, Mathematical Thinking through Stanford, and algorithms
          and data structures now. Reading runs in parallel and does not stay in
          one lane: operating systems, epistemic injustice, human factors on the
          flight deck, the philosophy of solitude.
        </p>

        <div className="pt-6">
          <p className="lowercase text-muted-foreground">
            i keep two registers. one is this one — precise, instrumented, sized
            to what actually runs. the other is softer and lives elsewhere:
            lowercase, seasonal, given to metaphor. i don&apos;t think rigor and
            tenderness are opposites, and holding both is deliberate rather than
            unresolved.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-8 text-sm">
        <a
          href="https://github.com/soya-00"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          github.com/soya-00
        </a>
        <a
          href="mailto:ppiaillust@gmail.com"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          ppiaillust@gmail.com
        </a>
      </div>
    </Section>
  );
}
