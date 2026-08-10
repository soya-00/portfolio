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
  INCOMING: "border border-accent/35 text-accent/70",
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
        checked="697 tests — 511 pytest, 186 vitest — run by CI on every push."
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
          Tilt is a journal that notices things, which in practice means you
          write into a single stream with no folders to choose and no filing to
          keep up with, and what the application hands back is understanding
          rather than organization — what you were circling, where today echoes
          something you wrote in March, where you now contradict yourself.{" "}
          <span className="text-foreground">
            There are no todos, no boards and no due dates anywhere in it,
            because anything carrying a deadline outranks everything that does
            not.
          </span>
        </p>

        <Figure
          src="constellationdark.png"
          alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
          caption="The constellation, and two entries the app connected on its own"
        />

        <p>
          Markdown files on disk are the source of truth and the database is
          treated as a cache I have to be able to delete, which costs real work
          on every feature but means the journal outlives the application
          holding it. Before I demoed it to anyone I audited it and wrote the
          result down, and the document opens by refusing to posture:
        </p>

        <PullQuote cite="Tilt — SECURITY.md">
          Tilt is a single-user local application whose backend happens to speak
          HTTP. That sentence is the whole threat model.
        </PullQuote>

        <p>
          What follows is what held, six defects that did not and were fixed,
          and two findings that testing withdrew — kept in the document rather
          than deleted, so the next reader does not spend an afternoon raising
          them again. Each of the six is interesting less for being hard than
          for how long it stayed invisible, which is why that document is the
          artifact I would point a reader at first.
        </p>
      </Project>

      <Project
        bay="ACTIVE"
        name="GALS"
        kicker="Try out a career before you have to choose one."
        stack="FastAPI · Jinja2 · HTMX · Tailwind v4 · SQLite · Gemini"
        status="Built and compliance-ready. Accounts and consent capture done; preparing for a supervised school pilot."
        checked="222 tests, run by CI on every push."
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
          A web application for Vietnamese high-school students, built on the
          observation that reading a description of a career tells you almost
          nothing about whether you would want to do it, so instead you take the
          role of someone holding the job and work through a real situation from
          it, with an AI assistant sitting alongside you that{" "}
          <span className="text-foreground">
            only ever asks questions back and never solves anything for you.
          </span>
        </p>

        <Figure
          src="03scenario.png"
          alt="A GALS scenario workspace in Vietnamese: the student is in role as Ngọc, a data analyst, on question 2 of 5 of the empathize stage, asked what in an application set reflects real circumstances and what reflects presentation skill. The assistant asks a question back, and a right-hand rail lists accumulated facts including twelve applications sharing one handwriting."
          caption="Prototype interface, not final — one question at a time, with the evidence rail on the right"
        />

        <p>
          GALS has no scores, no rankings and no model answers, since grading
          would turn career exploration into an examination and an examination
          is the thing these students already have too much of. Each profession
          also gets its own shape of evidence and its own output, so that an
          energy engineer produces a system plan where an epidemiologist
          produces an investigation plan, because if every job resolves into
          &ldquo;interview users, then design an app&rdquo; then the student has
          quietly learned that all professions are product design.
        </p>
        <p>
          It was built for a competition and its documentation is in Vietnamese,
          and because it is aimed at minors I wrote its limits down at length
          rather than leaving them to be found later, in a document that keeps
          what the design intends separate from what the build actually does.
        </p>

        <Figure
          src="05hoso.png"
          alt="A GALS competency profile in Vietnamese: counts of scenarios entered and answers written, a private message from a teacher, the app's reflection on how the student reasoned, and a portfolio entry with its own separate sharing control."
          caption="Prototype interface, not final — the profile: a teacher's private message, and sharing as a separate control"
        />

        <p className="text-muted-foreground/80">
          Screens are in Vietnamese because the students are.
        </p>
      </Project>

      <Project
        bay="INCOMING"
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
          I built the first version entirely in Python, on purpose, because{" "}
          <span className="text-foreground">
            the question I needed answered was whether the interface was worth
            committing to at all
          </span>{" "}
          — flight strips, single-key commands, a thermal printer, a dispatch
          call routed through Whisper — and Python answered that in weeks where
          asking the same question in C would have cost months before I learned
          anything about the design.
        </p>
        <p>
          It did what a prototype is for. Four specification documents came out
          of it and carried into this repository, covering the design system,
          the record format, the interaction contract and the status vocabulary,
          while about ten thousand lines of Python did not carry across and were
          never meant to.
        </p>
        <p>
          What exists now is a bare-metal AArch64 kernel for the Raspberry Pi 5,
          which builds for three boards, boots under QEMU, prints over UART,
          drops from EL2 to EL1 and then deliberately faults itself three times
          to prove the exception vector table catches what it should.{" "}
          <span className="text-foreground">
            It is a long way from the interface it is being built for, and the
            roadmap says so rather than implying otherwise.
          </span>
        </p>
        <p>
          That interface follows analog flight decks, with annunciator panels
          and an information hierarchy you read at a glance instead of parsing,
          and it counts as a design system rather than a theme because it was
          written after building three prototypes and comparing them:
        </p>

        <PullQuote cite="BLOC — DESIGN.md">
          Every palette entry is named for what it means. There is no{" "}
          <code className="font-display text-[0.95em]">amber</code> in the
          codebase; there is{" "}
          <code className="font-display text-[0.95em]">attention</code>.
        </PullQuote>

        <p>
          The related rule, that anything conveyed by color is also conveyed by
          something else, is marked non-negotiable. The prototype that produced
          these specifications is still public as{" "}
          <a
            href="https://github.com/soya-00/bloc-os-beta"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
          >
            bloc-os-beta
          </a>
          , together with the log of what it settled.
        </p>
      </Project>
    </Section>
  );
}
