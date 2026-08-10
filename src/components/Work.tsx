import type { ReactNode } from "react";
import Figure from "@/components/Figure";
import LinkChip from "@/components/LinkChip";
import ProjectTree from "@/components/ProjectTree";
import PullQuote from "@/components/PullQuote";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

/**
 * Strip bays, per BLOC's DESIGN.md: INCOMING · ACTIVE · HOLDING · LANDED.
 * Emphasis encodes where the work is, so the bay never depends on color
 * alone — the word carries it, the treatment reinforces it.
 */
const BAY_STYLES: Record<string, string> = {
  ACTIVE: "border border-accent bg-accent text-background",
  HOLDING: "border border-accent/70 text-accent",
  LANDED: "border border-border text-muted-foreground",
};

type ProjectProps = {
  bay: keyof typeof BAY_STYLES | string;
  name: string;
  kicker: string;
  stack: string;
  status: string;
  checked: string;
  /** Directory of the project's long-form page, under BASE_URL. Omit for a project without one. */
  writeup?: string;
  /** Rendered as chips on the left of the closing row. */
  links: { label: string; href: string }[];
  children: ReactNode;
};

function Project({
  bay,
  name,
  kicker,
  stack,
  status,
  checked,
  writeup,
  links,
  children,
}: ProjectProps) {
  return (
    <article className="[&+&]:mt-28">
      <Reveal>
        <div className="flex items-stretch">
          <span
            className={`font-display px-3 py-1.5 text-xs tracking-[0.18em] ${
              BAY_STYLES[bay] ?? BAY_STYLES.LANDED
            }`}
          >
            {bay}
          </span>
          <span
            className="ml-4 flex-1 self-center border-t border-border"
            aria-hidden="true"
          />
        </div>

        <h3 className="font-display mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {name}
        </h3>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          {kicker}
        </p>

        <dl className="mt-8 grid gap-x-6 gap-y-3 border-y border-border/60 py-5 text-sm sm:grid-cols-[7rem_1fr]">
          <dt className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Built with
          </dt>
          <dd className="text-foreground/90">{stack}</dd>
          <dt className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Status
          </dt>
          <dd className="text-foreground/90">{status}</dd>
          <dt className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Checked by
          </dt>
          <dd className="text-foreground/90">{checked}</dd>
        </dl>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
          {children}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {links.map((l) => (
            <LinkChip key={l.href} href={l.href}>
              {l.label}
            </LinkChip>
          ))}

          {writeup && (
            <a
              href={`${import.meta.env.BASE_URL}${writeup}/`}
              className="font-display group ml-auto inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Read more
              <span
                aria-hidden="true"
                className="text-accent transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}

export default function Work() {
  return (
    <Section id="work" label="Projects" title="Three instruments">
      <Reveal>
        <div className="mb-24 border-y border-border/60 py-8">
          <ProjectTree />
        </div>
      </Reveal>

      <Project
        bay="HOLDING"
        name="Tilt"
        kicker="A thinking instrument for macOS."
        stack="Python · FastAPI · SQLite · React · Tauri"
        status="Early but real. Unsigned — notarization needs a paid Apple Developer account, so there is no installer yet."
        checked="486 tests across the core service, run by CI on every push."
        writeup="tilt"
        links={[
          { label: "Repository", href: "https://github.com/soya-00/tilt" },
          {
            label: "SECURITY.md",
            href: "https://github.com/soya-00/tilt/blob/main/SECURITY.md",
          },
        ]}
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

        <Figure
          src="constellationdark.png"
          alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
          caption="The constellation, and two entries the app connected on its own"
        />

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
          raised again by the next reader. The security document is the artifact
          I would point a reader at first.
        </p>
      </Project>

      <Project
        bay="LANDED"
        name="GALS"
        kicker="Try out a career before you have to choose one."
        stack="FastAPI · Jinja · HTMX · Tailwind · Render"
        status="Deployed prototype. Shared accounts, no per-student privacy yet."
        checked="63 tests, run by CI on every push."
        writeup="gals"
        links={[
          { label: "Live demo", href: "https://steam-mvp.onrender.com" },
          { label: "Repository", href: "https://github.com/soya-00/steam-mvp" },
          {
            label: "LEGAL.md",
            href: "https://github.com/soya-00/steam-mvp/blob/main/LEGAL.md",
          },
        ]}
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

        <Figure
          src="05hoso.png"
          alt="A GALS competency profile in Vietnamese: counts of scenarios entered and answers written, a private message from a teacher, the app's reflection on how the student reasoned, and a portfolio entry with its own separate sharing control."
          caption="The profile: a teacher's private message, and sharing as a separate control"
        />

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
          rather than leaving them to be discovered. That document separates
          what the design intends from what the prototype actually does.
        </p>

        <Figure
          src="02trangcanhan.png"
          alt="A GALS student home page in Vietnamese showing counts of journal entries, portfolio items and badges, two written notes from a teacher, and four unordered entry points into the app."
          caption="A student's page: a teacher's notes, and four ways in with no required order"
        />

        <p className="text-muted-foreground/80">
          Screens are in Vietnamese because the students are.
        </p>
      </Project>

      <Project
        bay="ACTIVE"
        name="BLOC OS"
        kicker="A kernel, and the prototype that specified it."
        stack="C · AArch64 assembly · QEMU · Raspberry Pi 5"
        status="A few milestones in. Boots under QEMU; far from the interface."
        checked="Every milestone has to run under QEMU before the next one starts."
        links={[
          { label: "Repository", href: "https://github.com/soya-00/bloc-os" },
          {
            label: "DECISIONS.md",
            href: "https://github.com/soya-00/bloc-os-beta/blob/main/docs/DECISIONS.md",
          },
          {
            label: "DESIGN.md",
            href: "https://github.com/soya-00/bloc-os-beta/blob/main/docs/DESIGN.md",
          },
        ]}
      >
        <p>
          I built the first version entirely in Python, on purpose.{" "}
          <span className="text-foreground">
            The question was whether the interface was worth committing to
          </span>{" "}
          — flight strips, single-key commands, the thermal printer, the Whisper
          dispatch call. Python answered that in weeks. Answering it in C would
          have cost months before I learned anything about the design.
        </p>
        <p>
          It did what a prototype is for. Four specification documents came out
          of it and carried into this repository: the design system, the record
          format, the interaction contract, and the status vocabulary. About ten
          thousand lines of Python did not carry across, and were never meant
          to.
        </p>
        <p>
          What exists now is a bare-metal AArch64 kernel for the Raspberry Pi 5.
          It builds for three boards, boots under QEMU, prints over UART, drops
          from EL2 to EL1, and deliberately faults itself three times to prove
          the exception vector table works.{" "}
          <span className="text-foreground">
            It is a long way from the interface it is being built for, and the
            roadmap says so.
          </span>
        </p>
        <p>
          That interface is designed after analog flight decks — annunciator
          panels, information hierarchy you read at a glance. It is a design
          system rather than a theme, and it was written after building three
          prototypes and comparing them, not before:
        </p>

        <PullQuote cite="BLOC — DESIGN.md">
          Every palette entry is named for what it means. There is no{" "}
          <code className="font-display text-[0.95em]">amber</code> in the
          codebase; there is{" "}
          <code className="font-display text-[0.95em]">attention</code>.
        </PullQuote>

        <p>
          The rule that anything conveyed by color is also conveyed by something
          else is marked non-negotiable. The prototype is still public, and the
          specifications above are what it was built to produce:{" "}
          <a
            href="https://github.com/soya-00/bloc-os-beta"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
          >
            the Python version
          </a>
          , with the log of what it settled.
        </p>
      </Project>
    </Section>
  );
}
