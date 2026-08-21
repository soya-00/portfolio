import CaseStudyPage, { type CaseSection } from "@/components/CaseStudyPage";
import { DataTable } from "@/components/CaseParts";
import Figure from "@/components/Figure";
import PullQuote from "@/components/PullQuote";

const SECTIONS: CaseSection[] = [
  {
    id: "origin",
    label: "Origin",
    title: "Where the interaction model came from",
    body: (
      <>
        <p>
          BLOC came out of six years of writing Python and several months inside
          Ace Combat, Project Wingman and Nuclear Option, where I kept paying
          attention to the wrong thing. Rather than the flying, I kept returning
          to the panel: information arranged for scanning rather than reading,
          controls sitting close to the task that needs them, and an operator
          who works through instruments without ever accumulating a screen full
          of windows.
        </p>
        <p>
          Commercial air-traffic management does the same work under far heavier
          load. For example, a controller holds many moving objects, each
          carrying a status, and the entire discipline is organized around
          preventing conflicts before they happen rather than resolving them
          afterwards. Therefore, what interested me was not the aesthetic but
          the claim underneath it, which is that a dense, high-stakes
          environment can be made legible by arrangement rather than by hiding
          things behind menus.
        </p>
        <p>
          I chose a personal working environment as the testing ground because
          it is the least glamorous case available. Notes, objectives and time
          blocks carry no real urgency, so if the interaction model earns its
          keep there, it earns it on the merits rather than on adrenaline.
        </p>
      </>
    ),
  },
  {
    id: "prototype",
    label: "Prototype",
    title: "A prototype that had to be usable",
    body: (
      <>
        <p>
          I built the first version in Python with pygame-ce, and it reached
          roughly 5,400 lines: no mouse, no windows, a boot sequence naming each
          subsystem as it comes up, an instrument strip, fourteen single-key
          systems, live ADS-B traffic drawn on a radar scope, and tasks rendered
          as flight strips over the London TMA. Terminal rendering carries most
          of the modes, while pygame-ce carries the traffic scope alone.
        </p>

        <Figure
          src="01boot.png"
          alt="BLOC OS v0.1 booting in green monospace on black: a systems check listing VAULT, CONFIG, AGENDA, TRAFFIC, VOICE ENGINE and WHISPER as OK, with BLUETOOTH, PRINTER and SYNC on STANDBY, then ALL SYSTEMS NOMINAL, a welcome line for ADMIN-1 dated Friday 21 August 2026, and the voice engine still loading."
          caption="Boot sequence, naming every subsystem and its state before handing over"
        />

        <p>
          I kept all data as plain Markdown and TOML in{" "}
          <span className="text-foreground/90">~/bloc</span>, so nothing is
          stored in a proprietary format and every file remains readable and
          editable without BLOC running at all.
        </p>

        <Figure
          src="08pulse.png"
          alt="PULSE focus timer partway through session 1 of 4, showing 24:52 remaining on a study block and a session log alternating four 25-minute study periods with 5-minute breaks before a 15-minute long break, with the timer reported as active and running."
          caption="One of the fourteen systems, running inside the same instrument frame"
        />

        <p>
          AI wrote and debugged a substantial part of that prototype after I had
          established the interaction. Consequently, the prototype tested a
          design rather than my ability to implement one, which was the point,
          since I needed to know whether the model held up before committing
          years to it.
        </p>
        <p>
          Two things it exposed almost immediately. Firstly, fourteen top-level
          commands plus more than forty per-screen bindings gave me no shared
          idiom, and the count was never really the problem, because flat access
          is fast and an instrument panel is supposed to have buttons.
          Secondly, tasks, boards, agenda blocks and time were four separate
          concepts in the code that the user experiences as one thing.
        </p>
      </>
    ),
  },
  {
    id: "mfd",
    label: "MFD model",
    title: "Four modes and a closed set of keys",
    body: (
      <>
        <Figure
          src="02menu.png"
          alt="BLOC's v0.1 command menu listing fourteen single-key commands in three groups: INPUT with radio input, new note and new objective, REVIEW with list objectives, mark complete, delete and open flight archive, and SYSTEMS with agenda, traffic air time, mission boards, pulse focus timer, radar over the London TMA, settings and touchdown. An instrument strip across the top carries the time, a task count, battery level and the current agenda block."
          caption="Surface being replaced — fourteen commands with no shared idiom"
        />

        <p>
          Real avionics do not solve navigation with long command lists. They
          use a multi-function display: a home status page rather than a
          launcher, a few modes, and soft keys along the bottom whose labels
          change with context. Therefore, I rebuilt the surface on that model,
          with four modes — OBJECTIVES, AGENDA, TRAFFIC, SYSTEMS — contextual
          soft keys, and global keys that work from every screen.
        </p>
        <p>
          Load-bearing part is not the mode count. I made the framework own the
          key loop while screens declare their soft keys as data, which is what
          lets the legend render itself and lets global keys work everywhere
          without each screen cooperating. A soft key may not reuse a global
          key, and <span className="text-foreground/90">SoftKey</span> raises on
          construction if one tries.
        </p>
        <p>
          Furthermore, I closed the global set at four — direct-to, back, home,
          quit — and wrote a test asserting there are exactly four, so a fifth
          global costs a conscious edit rather than arriving as a drive-by
          addition. New capabilities therefore cost a direct-to keyword rather
          than a keybinding, which is the property that keeps the surface small
          while the system grows.
        </p>
        <p>
          Same reasoning covers the hardware plan, since physical buttons under
          a screen with labels above them is an MFD. As such, the GPIO panel and
          the on-screen layout are the same design rather than two designs that
          need reconciling later.
        </p>
      </>
    ),
  },
  {
    id: "strip",
    label: "Flight strip",
    title: "One record, four views",
    body: (
      <>
        <p>
          In air traffic control a flight strip carries a callsign, times and a
          status, and moves between bays as the flight progresses. That object
          is simultaneously a kanban card, an agenda block and a task, which is
          the observation the data model now rests on.
        </p>
        <p>
          Therefore, I collapsed four concepts into one record: id, title,
          status, optional board and column, optional scheduled start and end,
          due date, tags, priority, timestamps, body. Four views read that
          single store rather than three models being kept in step with each
          other. Each strip is one file in{" "}
          <span className="text-foreground/90">~/bloc/strips/</span> with TOML
          frontmatter.
        </p>

        <Figure
          src="03objectives.png"
          alt="Five objectives listed as numbered checkboxes under the instrument strip: drafting the v0.2 MFD soft-key spec, wiring a thermal printer ribbon cable, reviewing radar sweep decay timing, booking a flight sim slot and transcribing the debrief backlog, each carrying a due date and tags such as #bloc, #hardware and #voice."
          caption="Same records as a task list"
        />

        <Figure
          src="06boardflightops.png"
          alt="Same records drawn as a board called FLIGHT OPS, with columns INBOX, IN PROGRESS, REVIEW and DONE holding an e-ink standby display driver, a rotary encoder detent mapping, the strip unification work carrying an attention flag and a due date, a soft-key legend renderer, and a direct-to keyword parser."
          caption="Same records as a board"
        />

        <Figure
          src="04agenda.png"
          alt="Agenda for 21 August 2026 as five time blocks between 07:00 and 19:00. A morning brief and a two-hour deep work block are marked LANDED, with deep work filled to 95 percent in amber, while code review, an enclosure fit check and a debrief recording remain QUEUED. Soft keys along the bottom offer add, edit, complete, delete, reload and back."
          caption="Same records as agenda blocks, with an attention fill on the block in progress"
        />

        <Figure
          src="10autoflight.png"
          alt="Full-screen radar scope over the London TMA showing sixteen live aircraft contacts with callsigns, flight levels and speeds, plotted against airports, waypoints and a sector boundary. A left rail holds the day's tasks as flight strips in INCOMING, ACTIVE and LANDED bays, and a right rail lists the same items as objectives with day progress at 32 percent."
          caption="Same records as flight strips, beside live traffic on the scope"
        />

        <p>
          Bays are INCOMING, ACTIVE, HOLDING and LANDED, which are the strip
          statuses with one bay per column. However, the shipped v0.1 renderer
          only draws three of them, since HOLDING is part of the design target
          rather than current behavior.
        </p>
      </>
    ),
  },
  {
    id: "local",
    label: "Local control",
    title: "Where the data is allowed to be",
    body: (
      <>
        <p>
          I turned down a backup design that would have placed a copy of the
          vault somewhere outside my own physical control, and the reason was
          not that the data would have been exposed. Convenience was real and
          the risk was small. However, the property I actually wanted was that
          the data stays on hardware I hold, with the risk of losing it resting
          on me rather than being transferred to somebody who would keep it
          safer. Accepting the possibility of loss is part of the ownership
          rather than a cost I failed to notice.
        </p>
        <p>
          Several decisions that look unrelated turn out to be that same rule
          applied in different places. Debrief recordings never leave the
          device. Transcription runs on-device through faster-whisper. Cloud
          extraction was rejected outright. Even the evaluation corpus for the
          debrief work cannot enter the repository, because real rambles are a
          diary and only the machinery is public.
        </p>
        <p>
          Consequently, the future ADS-B direction follows from the same
          constraint, since receiving the signal directly is preferable to
          querying somebody’s hosted API, even where the hosted route would be
          easier.
        </p>
      </>
    ),
  },
  {
    id: "debrief",
    label: "DEBRIEF",
    title: "Extraction that proposes and never commits",
    body: (
      <>
        <p>
          DEBRIEF is the subsystem I am most interested in and the one with the
          least code behind it so far. Intended shape is a 30-second to 2-minute
          spoken ramble at the end of a day, transcribed locally, with
          actionable items extracted from it and recurring signals tracked over
          a longer period.
        </p>
        <p>
          I made extraction propose rather than commit. Candidates arrive at a
          review screen where they are accepted, edited or rejected, and the
          governing rule is precision over recall. A missed to-do costs one
          item, whereas a hallucinated one costs trust in the entire list, and a
          task list you do not trust is dead. Therefore, the tuning is
          deliberately biased toward extracting less.
        </p>
        <p>
          Audio is discarded once transcription succeeds rather than never
          written, since the WAV has to persist in{" "}
          <span className="text-foreground/90">debriefs/pending/</span> until
          the transcript exists or a failed run would lose the recording
          entirely. Transcript is the artifact that survives.
        </p>
        <p>
          Part I actually want is the correlation between what was said and what
          was done, because a record of stated intentions sitting beside a
          record of completed strips is a comparison no productivity tool I use
          will make. That part is designed rather than built.
        </p>
      </>
    ),
  },
  {
    id: "design-system",
    label: "Design system",
    title: "Color as a role",
    body: (
      <>
        <p>
          I wrote the design system down before the rebuild, and screens answer
          to it rather than the other way round.
        </p>

        <PullQuote cite="BLOC — docs/DESIGN.md">
          Every palette entry is named for what it means. There is no{" "}
          <code className="font-display text-[0.95em]">amber</code> in the
          codebase; there is{" "}
          <code className="font-display text-[0.95em]">attention</code>.
        </PullQuote>

        <p>
          Related rule is marked non-negotiable, and it is that anything
          conveyed by color is also conveyed by something else. For example, an
          overdue strip carries a flag glyph on its left edge as well as its
          coloring. Color alone fails in daylight on a glossy panel, fails on
          the dimmest theme, fails entirely on the high-contrast one, and fails
          permanently for red-green color blindness. As such, treating color as
          sufficient would break the interface in exactly the conditions the
          hardware is meant for.
        </p>
        <p>
          Rendering runs through a single module by design, so no other code
          writes to the screen directly and the theme cannot be bypassed one
          call site at a time.
        </p>
      </>
    ),
  },
  {
    id: "state",
    label: "Current state",
    title: "Current implementation state",
    body: (
      <>
        <p>
          I would rather be precise about this than let the name do the work.
        </p>

        <DataTable
          head={["Component", "State"]}
          minWidth="38rem"
          rows={[
            [
              "v0.1 Python application",
              "Runs. python main.py is the working entry point.",
            ],
            [
              "v0.2 rebuild",
              "In progress, subsystem by subsystem, with v0.1 still running throughout so the tree is never broken.",
            ],
            [
              "MFD contract, data layer, strip record, view layer",
              "Built.",
            ],
            [
              "DEBRIEF",
              "Designed. Local transcription exists, and the review flow does not.",
            ],
            [
              "Thermal printer",
              "Declared, unimplemented, first item on the cut list.",
            ],
            [
              "Raspberry Pi 5 appliance",
              "Target rather than current state.",
            ],
            [
              "Operating system, kernel, bootloader",
              "Not started. No C and no assembly exists in this repository.",
            ],
          ]}
        />

        <Figure
          src="09touchdown.png"
          alt="Shutdown sequence titled INITIATING LANDING SEQUENCE, confirming in turn that flight data is saved, the vault is secured, the voice engine is offline and systems are standing down."
          caption="Shutdown, written in the same vocabulary as the boot"
        />

        <p>
          Consequently, &ldquo;OS&rdquo; in the name describes an intention
          rather than an artifact. I am building an operating environment that
          currently runs on top of somebody else’s operating system, and the
          question of whether it should eventually become one is open rather
          than settled.
        </p>
      </>
    ),
  },
  {
    id: "authorship",
    label: "Authorship",
    title: "Division of labor on this project",
    body: (
      <>
        <p>
          Original interface work was mine, written in Python, which is the one
          language where I have enough experience to build a thing before
          knowing exactly what it should be. AI then improved and debugged that
          prototype substantially, and it carried much of the v0.2
          implementation.
        </p>
        <p>
          I decided the four modes, the closed global-key set, the flight-strip
          abstraction, the precision-over-recall rule, the
          discard-after-transcription policy, and the refusal to send recordings
          anywhere. Furthermore, I wrote the decision log before the code in
          every rebuild session, so the reasoning exists independently of
          whoever typed the implementation.
        </p>
        <p>
          However, the rebuild sequence itself, the strangler-fig approach that
          keeps v0.1 running while v0.2 grows beside it, came out of
          implementation advice I took rather than direction I gave.
        </p>
      </>
    ),
  },
  {
    id: "remains",
    label: "Still open",
    title: "Still open",
    body: (
      <>
        <DataTable
          head={["Item", "Status", "Plan"]}
          minWidth="46rem"
          rows={[
            [
              "Whether BLOC should become an operating system at all",
              "Open",
              "Nothing in the current design requires a kernel. Answering it means naming a capability the host OS genuinely prevents, and I have not found one yet.",
            ],
            [
              "DEBRIEF review flow and the said-versus-done correlation",
              "Designed rather than built",
              "Local transcription works. Extraction, the review screen and the longitudinal comparison are the next real subsystem.",
            ],
            [
              "Hardware",
              "Not started",
              "Pi 5 in an instrument-panel enclosure, kiosk boot, toggle switches and a rotary encoder. Every part of that is a claim the software has not been tested against.",
            ],
            [
              "Four bays in the renderer",
              "Partial",
              "HOLDING exists in the design and not in the v0.1 drawing code.",
            ],
            [
              "Whether the interaction model survives someone else using it",
              "Untested",
              "Only I have used BLOC. An interface justified by legibility under load has never been in front of a second person.",
            ],
          ]}
        />
      </>
    ),
  },
];

export default function BlocWriteup() {
  return (
    <CaseStudyPage
      name="BLOC"
      kicker="A flight deck for daily work, headed for its own hardware."
      meta={[
        {
          label: "Stage",
          value:
            "v0.2 rebuild in progress. Python prototype, and no operating-system work started.",
        },
        {
          label: "Built with",
          value: "Python · pygame-ce · faster-whisper · Markdown and TOML",
        },
        {
          label: "Target",
          value: "Raspberry Pi 5 appliance, kiosk boot, physical controls",
        },
      ]}
      links={[
        {
          label: "Repository",
          href: "https://github.com/soya-00/bloc-os-beta",
        },
        {
          label: "DESIGN.md",
          href: "https://github.com/soya-00/bloc-os-beta/blob/main/docs/DESIGN.md",
        },
        {
          label: "DECISIONS.md",
          href: "https://github.com/soya-00/bloc-os-beta/blob/main/docs/DECISIONS.md",
        },
      ]}
      lead={
        <>
          <p>
            Keyboard driven, no mouse, no windows. A boot sequence, an
            instrument strip, and a set of single-key systems, with tasks
            rendered as flight strips over the London TMA.
          </p>
          <p>
            BLOC is named as an operating system and is currently a Python
            application, which is a gap I would rather state at the top than
            have a reader discover three sections in.
          </p>
        </>
      }
      preamble={
        <DataTable
          head={["Part", "Size"]}
          minWidth="24rem"
          caption="Contents of the repository"
          rows={[
            ["Python", "roughly 12,250 lines across 57 modules"],
            ["C, assembly, kernel code", "none"],
            ["Design documents", "DESIGN.md, DECISIONS.md"],
            ["Data on disk", "Markdown and TOML in ~/bloc"],
            ["License", "MIT"],
          ]}
        />
      }
      sections={SECTIONS}
    />
  );
}
