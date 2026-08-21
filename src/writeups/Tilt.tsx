import CaseStudyPage, { type CaseSection } from "@/components/CaseStudyPage";
import { DataTable, Decision, H3, Note } from "@/components/CaseParts";
import Figure from "@/components/Figure";
import PullQuote from "@/components/PullQuote";
import RepoTree from "@/components/RepoTree";

const SECTIONS: CaseSection[] = [
  {
    id: "origin",
    label: "Origin",
    title: "Four tools and a year of thinking",
    body: (
      <>
        <p>
          Before Tilt I moved between Obsidian and Notion for several years, and
          the friction was never in the writing but in everything wrapped around
          it: choosing where a thought belonged, naming a tag I would forget,
          deciding whether something was a note or a task, formatting it so it
          looked like it deserved to be kept, and, as a second-language writer,
          spending attention on English that should have gone into the thought.
          Pile suggested a way out of that, since it treated a journal as a
          stream the software reads afterwards rather than a filing cabinet the
          writer maintains. Consequently, I circled my own version of that idea
          for roughly a year without building it.
        </p>
        <p>
          Distill then appeared, built from a similar starting point and
          considerably further along, which forced the question of whether my
          version still needed to exist. I decided it did, although not because
          I could out-build either one, but because the constraints I cared
          about were product decisions rather than features: my own machine, my
          own key, no account, and an agent with no authority to edit my
          journal. I am openly downstream of Pile and aware of Distill, and the
          divergence I claim is in what Tilt refuses to do.
        </p>
      </>
    ),
  },
  {
    id: "loop",
    label: "Loop",
    title: "Writing as the only job",
    body: (
      <>
        <p>
          I use Tilt without structure on purpose. For example, a session
          consists of opening it, writing until the thought is out, and, if
          there is time, reading the questions, connections and contradictions
          it has raised since last time, answering those with more writing, and
          stopping when there is nothing left to say. At no point do I ask
          myself where a thought belongs, since the only obligation I kept is
          the production of thoughts.
        </p>
        <p>
          Furthermore, I divided that into five loops in the codebase —
          inputting, categorizing, connecting, distilling and seeing — and each
          later loop only operates on material I produced without being asked to
          organize it. As such, organization becomes a consequence of writing
          rather than a precondition for it.
        </p>

        <Figure
          src="constellationdark.png"
          alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
          caption="Two entries the app connected on its own, and the constellation they sit in"
        />
      </>
    ),
  },
  {
    id: "constraints",
    label: "Constraints",
    title: "Constraints set before the first commit",
    body: (
      <>
        <p>
          I fixed four constraints before writing any code, and every one of
          them cost me implementation work later. Firstly, I licensed Tilt under
          MIT and intend to keep it free. Secondly, I run it against the
          user’s own API key rather than a subscription, which means I built no
          account system, no server holding anyone’s writing, and no billing
          relationship to protect. Thirdly, I made everything except one
          capability work offline. Finally, I keep journal contents on the
          writer’s disk and place the index, vectors and credential in a
          separate support directory, so handing someone your journal folder
          does not also hand them a database and a credential.
        </p>
        <p>
          Consequently, my dependence on the model is deliberately lower than in
          the products that motivated Tilt, since a journal that cannot open
          without a key is a journal you do not own.
        </p>
      </>
    ),
  },
  {
    id: "proposals",
    label: "Proposals",
    title: "Nothing applies itself",
    body: (
      <>
        <p>
          I made every structural change the agent wants arrive as a line where
          it belongs, with two buttons, and nothing happens until one is
          pressed. That reads as a courtesy and is in fact the load-bearing
          decision of the project, because an agent that files, connects, merges
          and splits your writing overnight is easy to build and impossible to
          audit. In particular, the failure I was most afraid of was waking to a
          reorganized journal with no way of telling whether the reorganization
          was right.
        </p>
        <p>
          Therefore, I made refusals durable rather than incidental. Whatever
          you turn down is written to{" "}
          <span className="text-foreground/90">folders.md</span> beside your
          entries, so a dismissal survives deletion of the database and the
          agent cannot quietly re-propose something you already answered.
        </p>
        <p>
          However, I allow one asymmetry, since merges do happen unattended
          while splits never do. A wrong merge stays visible in the sidebar and
          the next pass can undo it, whereas a wrong split names its two halves
          differently, after which nothing looks at them together again and no
          later pass can restore the subject. As such, reversibility rather than
          importance decides which operations run while I sleep.
        </p>

        <PullQuote cite="Tilt — docs/design.md">
          A folder you maintain is filing work.
        </PullQuote>

        <p>
          Furthermore, I pay for that rule in three places, because every
          proposal needs somewhere to live in the interface and a durable record
          of dismissal, every unattended pass has to end at something
          reviewable, and any statistic driving a proposal has to be good enough
          to interrupt a person with.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    label: "Storage",
    title: "Markdown as the record, SQLite as a view",
    body: (
      <>
        <p>
          I keep journal contents as a folder of Markdown with YAML frontmatter,
          readable in Obsidian, greppable and diffable in git, while SQLite
          exists only to accelerate queries. Specifically, I set the rule that
          deletion of the index must lose nothing, which is cheap to state and
          expensive to keep, because every derived thing — folder assignments,
          connections, dismissals, the record of a proposal you refused — then
          has to round-trip through frontmatter. Otherwise the database quietly
          becomes a second source of truth with the Markdown as a partial copy.
        </p>
        <p>
          Rebuilding had to change shape as a result. I would have dropped every
          row and reloaded, but{" "}
          <span className="text-foreground/90">entry_themes</span> and{" "}
          <span className="text-foreground/90">links</span> cascade from
          entries, so that implementation would have destroyed the agent’s
          accumulated work on every boot. Therefore, I made{" "}
          <span className="text-foreground/90">Index.rebuild</span> reconcile
          instead: upsert what is on disk, delete only what vanished, then
          restore themes and links from each entry’s own frontmatter.
        </p>
        <p>
          Payoff arrived somewhere I was not looking for it, since seeding a
          realistic journal for screenshots meant writing Markdown files and
          calling <span className="text-foreground/90">rebuild()</span> with no
          key, no model call and no network, and 24 entries with 20 connections
          came back from files alone. Folder-level facts were the single thing I
          could not accommodate, because a folder has no file of its own and is
          only implied by the labels its members carry. Consequently, I added{" "}
          <span className="text-foreground/90">folders.md</span> to hold facts
          about a folder rather than about any single entry.
        </p>

        <RepoTree
          root="tilt"
          caption="Repository at 1d1af4e"
          nodes={[
            {
              name: "core/",
              note: "the service — Markdown in, structure out",
              children: [
                { name: "tilt/", note: "journal, store, embed, agents, api" },
                { name: "tests/" },
                { name: "pyproject.toml" },
              ],
            },
            {
              name: "apps/",
              children: [
                { name: "desktop/", note: "Tauri shell, React front end" },
              ],
            },
            {
              name: "docs/",
              children: [
                { name: "architecture.md" },
                { name: "design.md" },
                { name: "install.md" },
                { name: "tour.md" },
              ],
            },
            { name: "scripts/", note: "sidecar build, icons, install" },
            { name: "SECURITY.md", note: "the audit" },
            { name: "README.md" },
          ]}
        />
      </>
    ),
  },
  {
    id: "decisions",
    label: "Decisions",
    title: "Decisions",
    body: (
      <>
        <p>
          I keep each of the five below beside the alternative it displaced,
          since a choice is only legible next to the option it beat.
        </p>

        <Decision
          title="Propose a folder split under the folder it concerns, with two buttons"
          chose="Show the proposal in place and wait."
          rejected="Apply the split and log it, letting the user undo."
          why="Recovering from a wrong merge is possible because the next pass sees both folders together, whereas a wrong split names its halves differently and no later pass ever considers them jointly again."
        />
        <Decision
          title="Give the model a veto over a statistical proposal"
          chose="Statistics choose what to propose, and the model can only refuse."
          rejected="Let the model decide which folders to split."
          why="Framing it as a veto means a confident wrong answer costs a missed proposal instead of a wrong one, and since the expected answer is no, it is also the cheaper call."
        />
        <Decision
          title="Brute-force cosine over every stored vector"
          chose="A full scan at query time."
          rejected="An approximate nearest-neighbor index."
          why="At a few thousand entries a full scan is about a millisecond of pure Python, while an ANN index would be a second structure to keep in step with the journal for a saving nobody could feel."
        />
        <Decision
          title="Report two files claiming one entry id, and index the newer"
          chose="Surface the collision and carry on."
          rejected="Rename or merge the conflicted copy automatically."
          why="Journals live in synced folders and a Dropbox conflicted copy carries the same id in its frontmatter, so renaming somebody’s files without asking is not this application’s business."
        />
        <Decision
          title="One agent with a name and a manner you write"
          chose="A single agent whose persona is yours to set."
          rejected="A roster of specialized agents to assemble."
          why="Assembling a roster makes the user a manager of software, whereas here the configurable thing is who the agent is."
        />
      </>
    ),
  },
  {
    id: "measured",
    label: "Measured",
    title: "Measured before chosen",
    body: (
      <>
        <p>
          I measured both thresholds before choosing them, because each one
          decides when to interrupt someone and a number I picked because it
          sounded right would have been one I could not defend.
        </p>

        <H3>When has a folder become two subjects?</H3>
        <p>
          Difficulty here is that two-means always returns two clusters, so a
          folder about a single subject still scores positive. Consequently, the
          threshold had to clear every one of those rather than merely detect
          real divisions, which is why I measured the false-positive population
          first.
        </p>

        <DataTable
          head={["Arrangement", "Score", "Reading"]}
          minWidth="38rem"
          rows={[
            [
              "One subject, 12 entries to a decade of writing",
              "≤ 0.06",
              "Ceiling of the false-positive population",
            ],
            [
              "One subject drifting steadily along an axis",
              "≤ 0.11",
              "Worst honest false positive",
            ],
            [
              "Two subjects, barely distinct",
              "≥ 0.23",
              "Floor of the true positives",
            ],
            [
              "Threshold chosen",
              "0.15",
              "In the gap, nearer the false-positive ceiling",
            ],
          ]}
        />

        <H3>Is this entry in the wrong folder?</H3>
        <p>
          Categorizing happens as you write, which is cheap, immediate and never
          asks anything, but it is path dependent, since the first entries
          establish the vocabulary and everything afterwards gets bent toward
          it. Therefore, I made the nightly pass compare each entry against the
          center of every folder while excluding the entry from its own
          folder’s average, so it is not measured against a position it helps
          define.
        </p>

        <DataTable
          head={["Population", "Score", "Reading"]}
          minWidth="38rem"
          rows={[
            [
              "Worst correctly-filed entry",
              "−0.12",
              "Correct filing scores negative — inside and outside a subject are opposite signs of one quantity",
            ],
            [
              "Weakest genuinely mis-filed entry",
              "+0.17",
              "Floor of the true positives",
            ],
            [
              "Threshold chosen",
              "0.10",
              "Separates further than the split threshold, so it needs no model veto",
            ],
          ]}
        />

        <p>
          I built the two passes differently because of that wider separation.
          As such, the measurement determined the architecture rather than the
          architecture determining what to measure.
        </p>

        <Note label="Where the statistic stops">
          Stretch a single subject far enough — someone circling one topic and
          moving a long way while they do — and it scores like two. No threshold
          fixes that: at some point “one subject that moved” and “two subjects”
          are the same arrangement of points, and telling them apart is a
          question about meaning rather than geometry. Pinned in a test rather
          than left to be discovered, and the second reason the model gets a
          veto and you get the click. Furthermore, I measured every number above
          on a planted corpus rather than on real writing. Therefore, what they
          establish is that the thresholds separate the arrangements I could
          construct, and the honest version still requires somebody’s actual
          journal.
        </Note>
      </>
    ),
  },
  {
    id: "cost-of-error",
    label: "Cost of error",
    title: "Cost of error",
    body: (
      <>
        <p>
          I tuned both passes in opposite directions on purpose, because
          splitting a folder wrongly cannot be undone from the interface whereas
          moving one entry wrongly costs a dismissal and nothing else.
        </p>

        <DataTable
          head={["", "Splitting a folder", "Moving one entry"]}
          minWidth="40rem"
          rows={[
            [
              "Cost of a wrong move",
              "Unrecoverable — halves named differently, no later pass looks at them together",
              "One entry misplaced, one dismissal to undo",
            ],
            ["Separation available", "0.11 → 0.23", "−0.12 → +0.17"],
            [
              "Gate",
              "Statistics propose, model vetoes, user clicks",
              "Statistics propose, user clicks",
            ],
            ["Model spend", "One call per surviving candidate", "None"],
            ["Tuned toward", "Missing real splits", "Catching mis-filings"],
          ]}
        />

        <p>
          Unattended work stops at{" "}
          <span className="text-foreground/90">
            SCHEDULED_BUDGET_FRACTION = 0.8
          </span>{" "}
          of the spend ceiling, so a runaway background pass cannot exhaust the
          budget you would want for something you asked for. Anything you
          requested directly always proceeds.
        </p>
      </>
    ),
  },
  {
    id: "removals",
    label: "Removals",
    title: "Strongest decisions were removals",
    body: (
      <>
        <H3>Growth timeline, struck off rather than deferred</H3>
        <p>
          I wanted the growth timeline more than anything else left on the
          roadmap. However, a view charting how your thinking developed is a
          progress chart, and a progress chart belongs to the productivity
          category Tilt exists to stay out of. Therefore, I struck it rather
          than deferring it, which ended the roadmap at phase 6, and I recorded
          in the README that there is no phase 7 and why, since an item left as
          future work means reopening the argument every few months.
        </p>

        <H3>Weekly summary, replaced with weekly silence</H3>
        <p>
          I removed the weekly summary for the same reason I would eventually
          have stopped reading it. A summary produced on a schedule is produced
          on the weeks that held nothing too, and after a month of those you
          have learned to skip it, including the week it would have mattered.
          Consequently, I made the pass notice instead, and only two things
          count: a contradiction you drew this week between two things you
          wrote, and an open question a month or more old that this week’s
          writing came near. Most weeks it finds nothing, and I leave the
          interface unchanged.
        </p>

        <H3>Hand-filing, in both directions</H3>
        <p>
          I left no way to tag an entry and no way to create a folder. You can
          rename one to pin it against future agent edits, and delete one in two
          clicks, and deletion keeps every entry that was in it. Absent from the
          interface is the ability to do the agent’s job for it. Furthermore, I
          applied the same rule at the top level, so there are no todos, no
          boards and no due dates anywhere.
        </p>
      </>
    ),
  },
  {
    id: "defects",
    label: "Defect ledger",
    title: "Defect ledger",
    body: (
      <>
        <p>
          I kept every defect below for the duration of its invisibility rather
          than for its difficulty, and each fix is covered by a regression test
          that fails without it.
        </p>

        <H3>A cron that never fired</H3>
        <p>
          I scheduled the nightly and weekly jobs at wall-clock times, which is
          correct on a server and wrong on a laptop, because a cron only fires
          if the process is alive at that minute. For example, closing the lid
          at midnight means 03:17 simply never happens, and opening the machine
          at nine schedules the next 03:17, which is also a night the laptop
          will be shut. Consequently, I had built a folder pass, a scout and a
          weekly notice that did not run rarely but never.
        </p>
        <p>
          I fixed it by changing the question. Rather than asking whether the
          moment arrived, I made the runner ask whether enough time has passed
          since a job last ran, which the index can answer because every run
          leaves a row there whether it succeeded, failed or stopped at the
          ceiling. Furthermore, I pinned the controlling constants from both
          sides in tests, so the slack window holds against double-running and
          never-running rather than only against the safe direction.
        </p>

        <DataTable
          head={["Defect", "Why it stayed invisible", "Rule"]}
          minWidth="46rem"
          rows={[
            [
              "An entry id from frontmatter was interpolated straight into a file path, so a crafted id wrote outside the journal",
              "Containment helper already existed and was used by two of the three stores. Entry store skipped it, and nothing pointed at the gap.",
              "Check identity at the boundary and assert containment at the sink. Either alone stops the attack, and a test exercising only one lets the other rot.",
            ],
            [
              "Auth gate exempted any path ending .png or .html — which several API routes ending in a caller-supplied segment did",
              "Only reachable in the container topology. Desktop gate is total, so local testing could never surface it.",
              "An exemption must be decided by what the mount owns, never by how the URL is spelled.",
            ],
            [
              "Import deleted the journal then extracted, so an archive failing halfway left no journal and nothing to roll back to",
              "Every test used a valid archive. Failure needs a file that passes the manifest check and then breaks mid-extraction.",
              "Stage into a sibling directory, swap only when every member is on disk. Test the archive that fails partway.",
            ],
            [
              "Nothing stopped two instances sharing one journal, and an interleaved frontmatter rewrite lost one silently",
              "Ordinary dev workflow does exactly this — installed app hides rather than quits, dev reads the same folder. Neither process shows any sign.",
              "Take an advisory lock at the real entry point and let the kernel release it.",
            ],
            [
              "Export wrote the archive into the support folder, and erase removes that folder, so export-then-erase destroyed the backup",
              "Both halves work correctly in isolation, and they live in different Settings panels, so nothing put them on screen together.",
              "Ask where a file has to survive to, rather than where it is convenient to put it.",
            ],
            [
              "/status reported the key as keychain-held whenever a keychain was available, while save falls back to a file when the keychain refuses",
              "Right on both machines you would test on: one with a working keychain, one with none. Wrong only when a keychain exists and declines.",
              "Report where a credential actually landed — a fact on disk — rather than which backend was present.",
            ],
          ]}
        />

        <p>
          Additionally, I withdrew two further findings after testing and
          retained them in the document rather than deleting them, so the next
          reader does not spend an afternoon raising them again.
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
          AI implemented the codebase, and every decision above was mine. I had
          AI write most of the production code, along with much of the debugging
          and testing, which are the two areas where my own experience is
          thinnest, and I had it draft the repository documentation the same
          way.
        </p>
        <p>
          I removed the growth timeline although it was implementable and
          already scheduled. I required splitting to stop at a proposal although
          shipping it as an automatic operation with an undo would have been
          easier. I required both thresholds measured although choosing them by
          feel would have looked identical in the interface.
        </p>
        <p>
          However, I took the model’s judgment sometimes. Reconciling the index
          rather than dropping it, and refusing to rename somebody’s conflicted
          copies, both emerged from implementation work I did not have the
          experience to do alone.
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
              "Connector precision is unmeasured. Gate I set is ≥0.8 on hand-labeled pairs.",
              "Open",
              "Needs a real corpus and a real key — the offline provider matches keywords and would only measure itself. Dismissals are kept as tombstones rather than deleted, so the rate per link kind is recoverable whenever there is a corpus worth measuring.",
            ],
            [
              "Reading a link hands the model an unscoped fetch tool while excerpts of recent entries are in the same prompt.",
              "Open",
              "Closing it means giving up article reading or scoping the tool to one URL — a decision about what the app is rather than a patch.",
            ],
            [
              "Nothing here can be handed to someone who will not build it themselves.",
              "Open",
              "A .dmg is something you compile on your own Mac, and the container is how you would hand it to anyone else. This is the honest gap between this and a shipped product.",
            ],
            [
              "Split statistic cannot separate “one subject that moved” from “two subjects”.",
              "Contained",
              "Pinned in a test as a known limit.",
            ],
            [
              "Interface is more cluttered than the premise deserves.",
              "Open",
              "I completed the roadmap, but I still surround “write and let it notice” with more surface than it requires, and I do not yet see which parts can go without losing the noticing itself. Therefore, I treat reduction as the next design problem rather than a polish pass.",
            ],
            [
              "Visual language still carries traces of the products that motivated it.",
              "Open",
              "I have already moved Tilt away from where it started, and the next revision continues that deliberately, since a divergent set of constraints deserves a design that is not borrowing its vocabulary.",
            ],
          ]}
        />
      </>
    ),
  },
];

export default function TiltWriteup() {
  return (
    <CaseStudyPage
      name="Tilt"
      kicker="A journal that notices things."
      meta={[
        { label: "Stage", value: "Working prototype, 2026" },
        {
          label: "Built with",
          value: "Python · FastAPI · SQLite · React · Tauri",
        },
        {
          label: "Distribution",
          value: "Source only. No signed build, no installer, no accounts.",
        },
      ]}
      links={[
        { label: "Repository", href: "https://github.com/soya-00/tilt" },
        {
          label: "SECURITY.md",
          href: "https://github.com/soya-00/tilt/blob/main/SECURITY.md",
        },
      ]}
      lead={
        <>
          <p>
            Every proposed feature answered one question: does its output make
            you do something, or understand something? Only the second shipped.
          </p>
          <p>
            I designed Tilt and specified its constraints, thus, the decisions
            below are the ones that survived contact with storage, cost,
            concurrency and my own roadmap.
          </p>
        </>
      }
      preamble={
        <DataTable
          head={["Part", "Size"]}
          minWidth="24rem"
          caption="Contents of the repository"
          rows={[
            ["Python", "11,585 lines, plus 7,746 in tests"],
            ["TypeScript", "6,284 lines, plus 2,479 in tests"],
            ["Rust (Tauri shell)", "498 lines"],
            ["Tests", "697 — 511 pytest, 186 vitest"],
            ["Commits on main", "71"],
          ]}
        />
      }
      sections={SECTIONS}
    />
  );
}
