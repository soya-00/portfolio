import Figure from "@/components/Figure";
import PullQuote from "@/components/PullQuote";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function TiltWriteup() {
  return (
    <WriteupPage
      bay="HOLDING"
      name="Tilt"
      kicker="A thinking instrument for macOS."
      meta={[
        { label: "Built with", value: "Python · FastAPI · SQLite · React · Tauri" },
        {
          label: "Status",
          value:
            "Feature-complete against its roadmap. Unsigned, so there is no installer.",
        },
        {
          label: "Checked by",
          value: "486 tests across the core service, run by CI on every push.",
        },
      ]}
      links={[
        { label: "Repository", href: "https://github.com/soya-00/tilt" },
        {
          label: "SECURITY.md",
          href: "https://github.com/soya-00/tilt/blob/main/SECURITY.md",
        },
      ]}
    >
      <H2>The problem</H2>
      <p>
        A journal accumulates. That is the whole of what most of them do. After
        a year you have a few hundred entries and no way to see that a question
        you asked in March is the same question you are asking now in different
        words. Folders do not help, because filing happens at the moment of
        writing, when you know least about what the entry will turn out to be
        about.
      </p>
      <p>
        Tilt is built on the assumption that the filing is the wrong job to give
        the person.{" "}
        <span className="text-foreground">
          You write into one stream, and the application is responsible for
          finding the shape.
        </span>
      </p>

      <Figure
        src="constellationdark.png"
        alt="Tilt showing a stream of journal entries linked by 'builds on' and 'echoes' relations, with a constellation graph of 29 connected thoughts beside it."
        caption="Two entries the app connected on its own, and the constellation they sit in"
      />

      <H2>What it refuses</H2>
      <p>
        There are no todos, no boards, and no due dates anywhere in Tilt. This
        is the load-bearing decision, not a missing feature. A journal that also
        tracks tasks becomes a task tracker with a notes field, because anything
        with a deadline outranks anything without one. The moment a due date
        exists on the screen, it is the only thing on the screen.
      </p>
      <p>
        The agent is constrained the same way. It proposes; it does not
        rearrange. Everything structural it notices is offered as two buttons,
        and nothing it finds is written into the journal unless you accept it —
        the moment it writes unasked, the journal stops being yours.
      </p>

      <H2>Markdown is the truth, the database is a cache</H2>
      <p>
        Entries are Markdown files on disk. The SQLite index — full-text search,
        embeddings, the connection graph — is derived, and can be deleted at any
        time and rebuilt from the files. This is a deliberate constraint that
        costs real work: every feature has to be expressible as something
        recomputable from plain text.
      </p>
      <p>
        The reason is ownership. A journal you cannot read without its
        application is not a journal, it is a database you happen to write
        prose into. If Tilt disappears, the directory is still a folder of dated
        Markdown files that any editor opens.
      </p>

      <H2>The audit</H2>
      <p>
        Before demoing it to anyone I audited it and wrote down the result. The
        document opens by refusing to posture:
      </p>

      <PullQuote cite="Tilt — SECURITY.md">
        Tilt is a single-user local application whose backend happens to speak
        HTTP. That sentence is the whole threat model.
      </PullQuote>

      <p>
        Naming the threat model that precisely is what makes the rest of the
        document possible. There is no user model in Tilt — one data directory,
        one settings file, one key — and that is not a defect waiting to be
        patched, it is what the application is. Once that is stated, the real
        questions become answerable: what happens when the backend is reachable
        from another machine, what happens when a feed returns something hostile,
        what happens when a model provider errors.
      </p>
      <p>
        The document records four things. What held — SQL and FTS5 injection,
        YAML loading, layered escaping on rendered diagrams, the key never
        serialized out. Seven findings that did not hold and were fixed,
        including request forgery in feed fetching, a token check that only
        engaged when a token already existed, and path traversal. Four more that
        a second review found after the first had missed them. And two that
        testing withdrew — kept in the document rather than deleted, so the next
        reader does not raise them again.
      </p>

      <H2>What is not done</H2>
      <p>
        Distribution. There is no signed build and no installer, because
        notarization requires a paid Apple Developer account. The embedding path
        has also never run against a real API key, and its thresholds were
        measured on planted vectors rather than on anything a person actually
        wrote — which means the numbers are plausible rather than validated, and
        the repository says so.
      </p>
    </WriteupPage>
  );
}
