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
        kicker="A journal that notices things, so writing stays the only job."
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
          Tilt grew out of the same problem I kept encountering in other
          knowledge tools: Obsidian gave me a place to write and left the
          structure to me, Notion made that structure easy enough to become part
          of the work itself, and Pile suggested that a journal could do more of
          the noticing afterwards, so I spent roughly a year thinking about my
          own version before Distill appeared and gave me another reference
          point to work from.
        </p>
        <p>
          Tilt therefore starts with one stream rather than a hierarchy of
          folders, and an entry remains an entry rather than becoming a task,
          board item or filing decision simply because the system can classify
          it, with recurring thoughts, related entries and contradictions
          appearing later as things to inspect.
        </p>

        <Figure
          src="constellationdark.png"
          alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
          caption="Constellation view, with two entries connected by the system"
        />

        <p>
          Anything the system derives begins as a proposal, which means a
          connection can sit there waiting to be accepted without silently
          becoming part of the journal, while Markdown remains readable on disk
          and SQLite can be discarded and rebuilt from it, so the database holds
          a view of the journal rather than becoming the only place where the
          journal exists.
        </p>
        <p>
          That decision reached into imports and screenshots as well, since
          files can seed the system without an API key or another network
          request and a dismissed proposal does not leave behind some
          database-only state that the original files can no longer describe.
        </p>

        <PullQuote cite="Tilt — SECURITY.md">
          Tilt is a single-user local application whose backend happens to speak
          HTTP. That sentence is the whole threat model.
        </PullQuote>

        <p>
          A security review then found an entry ID escaping its intended path,
          an import capable of replacing the existing journal before a failed
          extraction had finished, and concurrent writes that could overwrite
          the same frontmatter without either copy noticing, which meant each
          fix had to reach the point where the assumption actually failed rather
          than stopping at a broader statement about security.
        </p>
        <p>
          A growth timeline reached the roadmap and then left it, because I
          wanted to inspect how thoughts changed over time and found that
          turning those changes into a progress measure pulled the journal back
          toward the productivity systems it was supposed to avoid.
        </p>
      </Project>

      <Project
        bay="ACTIVE"
        name="GALS"
        kicker="Try a career before you have to choose one."
        stack="FastAPI · Jinja2 · HTMX · Tailwind v4 · Postgres · OpenAI"
        status="Built, mostly compliance-ready. Accounts and consent capture are done in the codebase, while the public demo still runs the shared-account build. Preparing for a supervised school pilot."
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
          Around age nine I ran a program I had written and understood almost
          immediately that I had found a kind of problem solving I could keep
          doing for a very long time. Years later, while running a computer
          science club at school and watching other students encounter
          programming for the first time through exercises that felt abstract or
          procedural rather than meaningful, I noticed that most of them had
          never had an equivalent &ldquo;eureka&rdquo; moment where the logic of
          a system suddenly clicks into place and changes how you think about
          what a computer is actually doing. That gap is where GALS started.
        </p>
        <p>
          A career description can tell a student that an epidemiologist
          investigates disease or that an energy engineer works with complex
          systems, but reading that description still leaves the student outside
          the problem, so GALS puts them inside a situation first and asks them
          to decide what to do with incomplete information.
        </p>

        <Figure
          src="03scenario.png"
          alt="A GALS scenario workspace in Vietnamese: the student is in role as Ngọc, a data analyst, on question 2 of 5 of the empathize stage, asked what in an application set reflects real circumstances and what reflects presentation skill. Assistant asks a question back, and a right-hand rail lists accumulated facts including twelve applications sharing one handwriting."
          caption="Prototype interface, with one question at a time and the evidence rail on the right"
        />

        <p>
          Each profession gets its own scenario, evidence and output, so an
          epidemiology case can require one kind of reasoning while an energy
          system or cybersecurity incident requires another. I kept that
          variation in the data rather than forcing every profession through one
          generic interaction simply because the generic version would have been
          easier to reproduce.
        </p>
        <p>
          Scores, rankings and model answers never made it into the design
          because a student reaching a different conclusion should leave the
          system with another line of reasoning to examine rather than a number
          telling them how close they came to an expected response.
        </p>
        <p>
          Meanwhile, AI sits inside the scenario and asks questions, offers
          another angle or introduces information, but the student chooses what
          to do with it and what eventually becomes part of their response.
        </p>

        <Figure
          src="05hoso.png"
          alt="A GALS competency profile in Vietnamese: counts of scenarios entered and answers written, a private message from a teacher, the app's reflection on how the student reasoned, and a portfolio entry with its own separate sharing control."
          caption="Prototype rather than final interface, showing a teacher's private message and a separate sharing control"
        />

        <p>
          GALS reached the national top 25 of STEAM for ALL held by Genderation
          Vietnam x Tuva Communication x UN Women.
        </p>
        <p>
          Later testing produced a more useful failure when a class-code
          rotation bug surfaced, and the first instinctive fix was to preserve
          readability of student identifiers by carrying part of the old code
          forward so that existing records would not break mid-course. Although
          that resolved the immediate operational issue, it also made me notice
          a deeper constraint I had not properly enforced, because I did not
          actually want a student&apos;s identifier to encode or reveal which
          class it had originated from in the first place. Once I changed that
          boundary and separated identity from class context more strictly, it
          exposed another, more subtle leak in the export path, where the live
          class code was still being written into a file that was meant to
          persist beyond the lifetime of the class itself.
        </p>

        <p className="text-muted-foreground/80">
          Screens are in Vietnamese because the students are.
        </p>
      </Project>

      <Project
        bay="INCOMING"
        name="BLOC OS"
        kicker="A flight deck for daily work, headed for its own hardware."
        stack="Python · pygame-ce · faster-whisper · Raspberry Pi 5"
        status="v0.2 rebuild in progress, aimed at a Raspberry Pi 5 appliance."
        checked="Subsystems are being rebuilt one at a time, with the interaction model and data model changing as each pass exposes another problem."
        writeup="bloc"
        links={[
          {
            label: "Repository",
            href: "https://github.com/soya-00/bloc-os-beta",
          },
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
          BLOC came from six years of working in Python and several months of
          playing Ace Combat, Project Wingman and Nuclear Option, where I kept
          returning to the flight deck because information was arranged for
          scanning, controls stayed close to the task at hand, and the operator
          could work through an instrument panel without turning the screen into
          a collection of windows.
        </p>
        <p>
          I wanted to see whether that interaction model could survive in
          something as ordinary as a personal working environment, so I built a
          Python and pygame prototype and started treating calendars, tasks and
          boards as problems in the interface rather than as separate
          applications that happened to share a screen.
        </p>
        <Figure
          src="10autoflight.png"
          alt="Full-screen radar scope over the London TMA showing sixteen live aircraft contacts with callsigns, flight levels and speeds, plotted against airports, waypoints and a sector boundary. A left rail holds the day's tasks as flight strips in INCOMING, ACTIVE and LANDED bays, and a right rail lists the same items as objectives with day progress at 32 percent."
          caption="Interface design based on the initial DEMO"
        />

        <p>
          The first prototype grew to roughly 5,400 lines, with no mouse, no
          windows, a boot sequence, an instrument strip, single-key systems,
          live traffic on a radar scope and tasks rendered as flight strips over
          the London TMA using pygame, and AI later handled much of the
          implementation and debugging while I kept changing the interaction
          itself when the prototype made its weak points obvious.
        </p>
        <p>
          The current rebuild is much smaller conceptually, with four modes
          replacing the original fourteen top-level commands and contextual soft
          keys exposing the controls relevant to the current mode while the
          global key set remains fixed, and tasks, boards and agenda blocks now
          resolve to one flight-strip record that can appear in several views
          without being copied into three different models.
        </p>

        <PullQuote cite="BLOC — DESIGN.md">
          Every palette entry is named for what it means. There is no{" "}
          <code className="font-display text-[0.95em]">amber</code> in the
          codebase; there is{" "}
          <code className="font-display text-[0.95em]">attention</code>.
        </PullQuote>

        <p>
          Color is therefore only one part of the visual state, because a
          daylight condition, a theme change or an inability to distinguish two
          colors should still leave the user with the same information. This is
          why the interface carries state through labels, position and control
          behavior as well as through the palette.
        </p>
      </Project>
    </Section>
  );
}
