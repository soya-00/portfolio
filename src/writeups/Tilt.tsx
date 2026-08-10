import CaseStudyPage, { type CaseSection } from "@/components/CaseStudyPage";
import { DataTable, Decision, H3, Note } from "@/components/CaseParts";
import Figure from "@/components/Figure";
import PullQuote from "@/components/PullQuote";
import RepoTree from "@/components/RepoTree";

const SECTIONS: CaseSection[] = [
  {
    id: "the-rule",
    label: "The rule",
    title: "The rule everything hangs off",
    kicker: "The agent proposes. You click.",
    body: (
      <>
        <p>
          Every structural change the agent wants to make arrives as a line
          where it belongs, with two buttons, and nothing happens until one is
          pressed.
        </p>
        <p>
          That sounds like a courtesy. It’s the load-bearing decision of the
          project, and almost every hard problem below is downstream of it. An
          agent that files, connects, merges and splits your writing while you
          sleep is easy to build and impossible to trust. The failure I was most
          afraid of was waking up to a reorganized journal — not because the
          reorganization would be wrong, but because there’d be no way to tell
          whether it was.
        </p>
        <p>
          So the agent never rearranges. It notices, proposes, and what you turn
          down is written to{" "}
          <span className="text-foreground/90">folders.md</span> beside your
          entries, so a refusal survives deleting the database.
        </p>
        <p>
          The cost lands in three places. Every proposal needs somewhere to live
          in the interface and a durable record of being dismissed. Every
          unattended pass has to produce something reviewable rather than
          something done. And any statistic driving a proposal has to be good
          enough to interrupt someone with — which forced the measurement work
          below.
        </p>

        <PullQuote cite="Tilt — docs/design.md">
          A folder you maintain is filing work.
        </PullQuote>

        <Figure
          src="constellationdark.png"
          alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
          caption="Two entries the app connected on its own, and the constellation they sit in"
        />
      </>
    ),
  },
  {
    id: "the-constraint",
    label: "The constraint",
    title: "The constraint that made it hard",
    kicker:
      "Markdown files are the truth. The database is a cache I must be able to delete.",
    body: (
      <>
        <p>
          The journal is a folder of Markdown with YAML frontmatter — readable
          in Obsidian, greppable, diffable in git. SQLite exists only to make
          queries fast, and the rule I set was that deleting it must lose
          nothing.
        </p>
        <p>
          Cheap to state, expensive to keep. Every derived thing — folder
          assignments, connections, dismissals, the record of a proposal you
          refused — has to round-trip through frontmatter, not just a table. The
          moment one lives only in SQLite, the database is a second source of
          truth and the Markdown is a partial copy.
        </p>
        <p>
          It also decided the shape of rebuilding. The obvious implementation
          drops every row and reloads, but{" "}
          <span className="text-foreground/90">entry_themes</span> and{" "}
          <span className="text-foreground/90">links</span> cascade from
          entries, so that would destroy the agent’s work on every boot.{" "}
          <span className="text-foreground/90">Index.rebuild</span> is a
          reconcile instead: upsert what’s on disk, delete only what vanished,
          then restore themes and links from each entry’s own frontmatter.
        </p>
        <p>
          The payoff showed up somewhere unrelated. When I needed screenshots,
          seeding a realistic journal meant writing Markdown files and calling{" "}
          <span className="text-foreground/90">rebuild()</span> — no API key, no
          model call, no network. 24 entries and 20 connections came back from
          files alone, which is the claim the constraint was making all along.
        </p>
        <p>
          A second rule fell out of the first: the journal folder holds only
          what you wrote. Index, vectors and API key live in a separate support
          directory, so handing someone your journal doesn’t also hand them a
          database and a credential.
        </p>

        <RepoTree
          root="tilt"
          caption="The repository at 1d1af4e"
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
    kicker: "Each one kept beside the road not taken.",
    body: (
      <>
        <Decision
          title="Propose a folder split under the folder it concerns, with two buttons"
          chose="Show the proposal in place and wait."
          rejected="Apply the split and log it, letting the user undo."
          why="A wrong merge is recoverable — the next pass sees both folders together and can undo it. A wrong split names its halves differently, so nothing ever looks at them together again and no pass puts the subject back."
        />
        <Decision
          title="Give the model a veto over a statistical proposal"
          chose="Statistics choose what to propose; the model can only refuse."
          rejected="Let the model decide which folders to split."
          why="A confident wrong answer then costs a missed proposal instead of a wrong one — and the expected answer is no, so it’s also the cheaper call."
        />
        <Decision
          title="Brute-force cosine over every stored vector"
          chose="A full scan at query time."
          rejected="An approximate nearest-neighbor index."
          why="At a few thousand entries a full scan is about a millisecond of pure Python. An ANN index would be a second structure to keep in step with the journal, for a saving nobody could feel."
        />
        <Decision
          title="Report two files claiming one entry id, and index the newer"
          chose="Surface the collision and carry on."
          rejected="Rename or merge the conflicted copy automatically."
          why="Journals live in synced folders, and Dropbox’s “(conflicted copy)” carries the same id in its frontmatter. Renaming somebody’s files without asking isn’t this app’s business."
        />
        <Decision
          title="One agent with a name and a manner you write"
          chose="A single agent whose persona is yours to set."
          rejected="A roster of specialized agents to assemble."
          why="A roster makes the user a manager of software. What’s configurable here is who the agent is."
        />
      </>
    ),
  },
  {
    id: "measured",
    label: "Measured, not eyeballed",
    title: "Measured, not eyeballed",
    kicker:
      "Both thresholds decide when to interrupt someone, so a number picked because it sounded right would’ve been one I couldn’t defend.",
    body: (
      <>
        <H3>When has a folder become two subjects?</H3>
        <p>
          The trap: two-means always returns two clusters, so a folder about one
          subject still scores positive. The threshold has to clear every one of
          those, not merely detect real divisions.
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
          Categorizing happens as you write — cheap, immediate, never asks
          anything — but it’s path dependent: the first entries create the
          vocabulary and everything after gets bent toward it. The nightly pass
          compares each entry against the center of every folder, leaving the
          entry out of its own folder’s average so it isn’t measured against a
          position it helps define.
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
          That wider separation is why the two passes are built differently. The
          measurement decided the architecture, not the other way round.
        </p>

        <Note label="Where the statistic stops">
          Stretch a single subject far enough — someone circling one topic and
          moving a long way while they do — and it scores like two. No threshold
          fixes that: at some point “one subject that moved” and “two subjects”
          are the same arrangement of points, and telling them apart is a
          question about meaning rather than geometry. Pinned in a test rather
          than left to be discovered, and the second reason the model gets a
          veto and you get the click.
        </Note>
      </>
    ),
  },
  {
    id: "cost-of-error",
    label: "Cost of error",
    title: "Cost of error",
    kicker: "The two passes are tuned in opposite directions on purpose.",
    body: (
      <>
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
          of the spend ceiling, so a runaway background pass can’t exhaust the
          budget you’d want for something you asked for. Anything you requested
          directly always proceeds.
        </p>
      </>
    ),
  },
  {
    id: "removals",
    label: "Removals",
    title: "The strongest decisions were removals",
    body: (
      <>
        <H3>The growth timeline, struck off rather than deferred</H3>
        <p>
          Last item on the roadmap. A view charting how your thinking developed
          is a progress chart, and a progress chart is the productivity app this
          deliberately isn’t. Removed from the roadmap rather than left as
          future work, because leaving it there means reopening the argument
          every time.
        </p>

        <H3>The weekly summary, replaced with weekly silence</H3>
        <p>
          A summary produced on a schedule is produced on the weeks that held
          nothing too, and after a month of those you’ve learned to skip it —
          including the week it would have mattered. So the pass notices
          instead. Two things count: a contradiction you drew this week between
          two things you wrote, and an open question a month or more old that
          this week’s writing came near. Most weeks it finds nothing and the
          interface is unchanged.
        </p>

        <H3>Hand-filing, in both directions</H3>
        <p>
          No way to tag an entry, no way to create a folder. You can rename one
          to pin it against future agent edits, and delete one in two clicks —
          and deleting keeps every entry that was in it. What’s missing is the
          ability to do the agent’s job for it.
        </p>
        <p>
          No todos, no boards, no due dates anywhere — the same rule at the top
          level.
        </p>
      </>
    ),
  },
  {
    id: "defects",
    label: "Defect ledger",
    title: "Defect ledger",
    kicker:
      "Bugs whose interest is in how long they stayed invisible. Every fix is covered by a regression test; the suite went 494 → 511 across the review.",
    body: (
      <>
        <DataTable
          head={["Defect", "Why it stayed invisible", "Rule"]}
          minWidth="46rem"
          rows={[
            [
              "An entry id from frontmatter was interpolated straight into a file path, so a crafted id wrote outside the journal",
              "The containment helper already existed and was used by two of the three stores. The entry store skipped it, and nothing pointed at the gap.",
              "Check identity at the boundary and assert containment at the sink. Either alone stops the attack; a test exercising only one lets the other rot.",
            ],
            [
              "The auth gate exempted any path ending .png or .html — which several API routes ending in a caller-supplied segment did",
              "Only reachable in the container topology. The desktop gate is total, so local testing could never surface it.",
              "An exemption must be decided by what the mount owns, never by how the URL is spelled.",
            ],
            [
              "Import deleted the journal then extracted, so an archive failing halfway left no journal and nothing to roll back to",
              "Every test used a valid archive. The failure needs a file that passes the manifest check and then breaks mid-extraction.",
              "Stage into a sibling directory, swap only when every member is on disk. Test the archive that fails partway.",
            ],
            [
              "Nothing stopped two instances sharing one journal; an interleaved frontmatter rewrite lost one silently",
              "It’s the ordinary dev workflow — the installed app hides rather than quits, dev reads the same folder. Neither process shows any sign.",
              "Take an advisory lock at the real entry point and let the kernel release it.",
            ],
            [
              "Export wrote the archive into the support folder, and erase removes that folder — so export-then-erase destroyed the backup",
              "Both halves work correctly in isolation, and they live in different Settings panels, so nothing put them on screen together.",
              "Ask where a file has to survive to, not just where it’s convenient to put it.",
            ],
            [
              "/status reported the key as keychain-held whenever a keychain was available, while save falls back to a file when the keychain refuses",
              "Right on both machines you’d test on: one with a working keychain, one with none. Wrong only when a keychain exists and declines.",
              "Report where a credential actually landed — a fact on disk — not which backend was present.",
            ],
          ]}
        />

        <p>
          Two findings I withdrew after testing, recorded rather than quietly
          dropped: feed XML entity expansion turned out bounded by the runtime’s
          own amplification guard with the error already caught, and a
          body-limit bypass was real but already documented with a compensating
          control I verified works.
        </p>
      </>
    ),
  },
  {
    id: "wrong",
    label: "What I got wrong",
    title: "What I got wrong",
    body: (
      <>
        <p>
          <span className="text-foreground/90">
            I shipped a Dockerfile that could never have built.
          </span>{" "}
          Committed, reviewed by me, wrong in a way only running it reveals. The
          rule: a build step that’s never executed is a comment. CI went in
          shortly after, and I proved it would fail before trusting it to pass.
        </p>
        <p>
          <span className="text-foreground/90">
            I let the interface and the gate disagree about the same question.
          </span>{" "}
          Whether the process serves the web interface was derived in two places
          from two slightly different conditions — one checked a static
          directory was configured, the other that it existed. They agreed on
          every machine I tested. The rule: when two pieces of code need the
          same answer, they get one expression.
        </p>
        <p>
          <span className="text-foreground/90">
            I trusted my own documentation over the code it described.
          </span>{" "}
          Writing a claim down makes it feel settled, and once it is written the
          next reader has no reason to go and check, which means a document
          describing what I intended rather than what the system does is worse
          than having written nothing at all. The rule I took from it is that a
          sentence about behavior has to be traceable to the line that produces
          it, or it does not go in.
        </p>
      </>
    ),
  },
  {
    id: "remains",
    label: "What remains",
    title: "What remains",
    body: (
      <>
        <DataTable
          head={["Item", "Status", "Plan"]}
          minWidth="46rem"
          rows={[
            [
              "Connector precision is unmeasured. Gate I set is ≥0.8 on hand-labeled pairs.",
              "Open",
              "Needs a real corpus and a real key — the offline provider matches keywords and would only measure itself. Dismissals are kept as tombstones rather than deleted, so the rate per link kind is recoverable whenever there’s a corpus worth measuring.",
            ],
            [
              "Reading a link hands the model an unscoped fetch tool while excerpts of recent entries are in the same prompt.",
              "Open",
              "Closing it means giving up article reading or scoping the tool to one URL — a decision about what the app is, not a patch.",
            ],
            [
              "No signed build, no installer.",
              "Open",
              "The .dmg is something you compile on your own Mac; the container is how you’d hand it to anyone else. This is the honest gap between this and a shipped product.",
            ],
            [
              "Whether the brief is a queue — the closest thing in the app to a to-do list, the one shape I ruled out.",
              "Open",
              "The way to find out is to use it, not to reason harder. Offline the loop closes: the scout picked a paper because of a question written nine days earlier, and the sweep later linked one of its ideas back unprompted. That proves the plumbing, not the judgment.",
            ],
            [
              "The split statistic can’t separate “one subject that moved” from “two subjects”.",
              "Contained",
              "Pinned in a test as a known limit. No threshold fixes it.",
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
        { label: "Distribution", value: "None. No signed build, no installer." },
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
            Tilt is a macOS thinking instrument I designed and built — a single
            stream you write into, and an agent whose job is to hand back
            understanding rather than tasks. This is the record of what that
            rule cost.
          </p>
        </>
      }
      preamble={
        <DataTable
          head={["Part", "Size"]}
          minWidth="24rem"
          caption="What is actually there"
          rows={[
            ["Python", "11,585 lines, plus 7,746 in tests"],
            ["TypeScript", "6,284 lines, plus 2,479 in tests"],
            ["Rust (Tauri shell)", "498 lines"],
            ["Tests", "697 — 511 pytest, 186 vitest"],
            ["Commits on main", "71"],
            ["Distribution", "None. No signed build, no installer."],
          ]}
        />
      }
      sections={SECTIONS}
    />
  );
}
