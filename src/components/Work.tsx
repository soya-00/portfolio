import type { ReactNode } from "react";
import LinkChip from "@/components/LinkChip";
import PullQuote from "@/components/PullQuote";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

type ProjectProps = {
  index: string;
  name: string;
  kicker: string;
  stack: string;
  status: string;
  children: ReactNode;
};

function Project({
  index,
  name,
  kicker,
  stack,
  status,
  children,
}: ProjectProps) {
  return (
    <article className="[&+&]:mt-28">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-accent">
            {index}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <h3
          className="mt-6 text-3xl font-normal tracking-tight sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {name}
        </h3>
        <p className="mt-2 text-base text-muted-foreground">{kicker}</p>

        <dl className="mt-8 grid gap-x-6 gap-y-3 border-y border-border/60 py-5 text-sm sm:grid-cols-[7rem_1fr]">
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Built with
          </dt>
          <dd className="text-foreground/90">{stack}</dd>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Status
          </dt>
          <dd className="text-foreground/90">{status}</dd>
        </dl>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </Reveal>
    </article>
  );
}

export default function Work() {
  return (
    <Section id="work" label="Work" title="Three instruments">
      <Project
        index="01"
        name="Tilt"
        kicker="A thinking instrument for macOS."
        stack="Python · FastAPI · SQLite · React · Tauri"
        status="Early but real. Not distributed — no signed build, no installer."
      >
        <p>
          Tilt is a journal that notices things. You write into one stream — no
          folders, no filing — and the app gives back understanding: what you
          were circling, where today echoes something from March, where you now
          contradict yourself.{" "}
          <span className="text-foreground">
            There are no todos, no boards, and no due dates anywhere in it, by
            design.
          </span>
        </p>
        <p>
          Markdown files on disk are the source of truth, and the database is
          treated as a cache that can be deleted and rebuilt. Before demoing it,
          I audited it and wrote down the result. The document opens by refusing
          to posture:
        </p>

        <PullQuote cite="Tilt — SECURITY.md">
          Tilt is a single-user local application whose backend happens to speak
          HTTP. That sentence is the whole threat model.
        </PullQuote>

        <p>
          It records what held, seven findings that did not and were fixed, four
          more that a second review found after the first had missed them, and
          two that testing withdrew — kept in the document so they are not
          raised again by the next reader. One passage corrects an earlier
          version of itself for having been{" "}
          <span className="text-foreground">too kind to itself</span>. The
          security document is the artifact I would point a reader at first.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <LinkChip href="https://github.com/soya-00/tilt">Repository</LinkChip>
          <LinkChip href="https://github.com/soya-00/tilt/blob/main/SECURITY.md">
            SECURITY.md
          </LinkChip>
        </div>
      </Project>

      <Project
        index="02"
        name="GALS"
        kicker="Try out a career before you have to choose one."
        stack="FastAPI · Jinja · HTMX · Tailwind · Render"
        status="Deployed prototype. Shared accounts, no per-student privacy yet."
      >
        <p>
          A web application for Vietnamese high-school students. Instead of
          reading about careers, you take the role of someone doing the job and
          work through a real situation from it. An AI assistant sits alongside,
          but{" "}
          <span className="text-foreground">
            it only asks questions back; it does not solve anything for you.
          </span>
        </p>
        <p>
          GALS deliberately has no scores, no rankings, and no model answers.
          Grading would turn career exploration into a test, and a test is the
          thing these students already have too many of. Each profession also
          gets its own shape of evidence and its own output — an energy engineer
          produces a system plan, an epidemiologist an investigation plan —
          because if every job reduces to &ldquo;interview users, then design an
          app,&rdquo; the learner has misunderstood what professions are.
        </p>
        <p>
          It was built for a competition and its documentation is in Vietnamese.
          Because it is aimed at minors, I wrote its limits down at length
          rather than leaving them to be discovered:
        </p>

        <PullQuote cite="GALS — LEGAL.md, translated">
          Read this page before letting any real student use GALS.
        </PullQuote>

        <p>
          The document separates what the design intends from what the prototype
          actually does. The promise that a teacher cannot see a student who has
          not entered a class code is named there as{" "}
          <span className="text-foreground">
            a design intention, not something the prototype achieves
          </span>
          .
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <LinkChip href="https://steam-mvp.onrender.com">Live demo</LinkChip>
          <LinkChip href="https://github.com/soya-00/steam-mvp">
            Repository
          </LinkChip>
          <LinkChip href="https://github.com/soya-00/steam-mvp/blob/main/LEGAL.md">
            LEGAL.md
          </LinkChip>
        </div>
      </Project>

      <Project
        index="03"
        name="BLOC OS"
        kicker="A kernel, and the mistake that preceded it."
        stack="C · AArch64 assembly · QEMU · Raspberry Pi 5"
        status="A few milestones in. Boots under QEMU; far from the interface."
      >
        <p>
          For three months I had a Python application with a boot sequence,
          flight strips, and a live traffic scope, and I called it an operating
          system. It ran on top of Linux as an ordinary process. Every
          &ldquo;systems check&rdquo; in its boot sequence was a function call,
          not a probe. The first entry in the decision log for the rewrite is
          the retraction:
        </p>

        <PullQuote cite="BLOC OS — DECISIONS.md, entry 0">
          It was called an operating system and it was not one.
        </PullQuote>

        <p>
          About ten thousand lines of Python and tests did not carry across.
          Four specification documents did. The lesson I wrote down for myself
          was that the error was letting the prototype become the project —
          code that has drifted from its intent still describes itself loudly.
        </p>
        <p>
          What exists now is a bare-metal AArch64 kernel for the Raspberry Pi 5.
          It builds for three boards, boots under QEMU, prints over UART, drops
          from EL2 to EL1, and deliberately faults itself three times to prove
          the exception vector table works.{" "}
          <span className="text-foreground">
            It is a long way from the interface it is being built for, and the
            roadmap says so.
          </span>{" "}
          The rule I hold myself to there: a session ends with something that
          runs, or it was scoped wrong.
        </p>
        <p>
          That interface is designed after analog flight decks — annunciator
          panels, information hierarchy you read at a glance. It is a design
          system rather than a theme, and it was written after building three
          prototypes and comparing them, not before:
        </p>

        <PullQuote cite="BLOC OS — DESIGN.md">
          Every palette entry is named for what it means. There is no{" "}
          <code className="font-mono text-[0.9em]">amber</code>; there is{" "}
          <code className="font-mono text-[0.9em]">attention</code>.
        </PullQuote>

        <p>
          The rule that anything conveyed by color is also conveyed by something
          else is marked non-negotiable. The predecessor is still public — it is
          the evidence for the retraction above, not a portfolio piece:{" "}
          <a
            href="https://github.com/soya-00/bloc-os-beta"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
          >
            the Python version I abandoned
          </a>
          , with the log of why.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <LinkChip href="https://github.com/soya-00/bloc-os">
            Repository
          </LinkChip>
          <LinkChip href="https://github.com/soya-00/bloc-os/blob/main/docs/DECISIONS.md">
            DECISIONS.md
          </LinkChip>
          <LinkChip href="https://github.com/soya-00/bloc-os/blob/main/docs/DESIGN.md">
            DESIGN.md
          </LinkChip>
        </div>
      </Project>
    </Section>
  );
}
