import Figure from "@/components/Figure";
import PullQuote from "@/components/PullQuote";
import RepoTree from "@/components/RepoTree";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function TiltWriteup() {
  return (
    <WriteupPage
      name="Tilt"
      kicker="A thinking instrument for macOS."
      meta={[
        {
          label: "Built with",
          value: "Python · FastAPI · SQLite · React · Tauri",
        },
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
      lead={
        <>
          <p>
            A journal accumulates. That is the whole of what most of them do.
            After a year you have a few hundred entries. Nothing shows you that
            a question from March is the same question you ask now in different
            words. Folders do not help. Filing happens at the moment of writing,
            when you know least about what the entry is about.
          </p>
          <p>
            Tilt assumes the filing is the wrong job to give the person. You
            write into one stream. The application finds the shape.
          </p>
        </>
      }
    >
      <RepoTree
        root="tilt"
        caption="The repository at 1d1af4e"
        nodes={[
          {
            name: "core/",
            note: "the service — Markdown in, structure out",
            children: [
              { name: "tilt/", note: "journal, store, embed, agents, api" },
              { name: "tests/", note: "486 tests" },
              { name: "pyproject.toml" },
            ],
          },
          {
            name: "apps/",
            children: [{ name: "desktop/", note: "Tauri shell, React front end" }],
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
        The agent is constrained the same way. It proposes. It does not
        rearrange. The agent offers everything structural it notices as two
        buttons. Nothing it finds enters the journal unless you accept it. The
        moment it writes unasked, the journal stops being yours.
      </p>

      <H2>Markdown is the truth, the database is a cache</H2>
      <p>
        Entries are Markdown files on disk. The SQLite index — full-text search,
        embeddings, the connection graph — is derived. You can delete it at any
        time and rebuild it from the files. This constraint costs real work.
        Every feature must be expressible as something recomputable from plain
        text.
      </p>
      <p>
        The reason is ownership. A journal you cannot read without its
        application is not a journal. It is a database you happen to write prose
        into. If Tilt disappears, the directory is still a folder of dated
        Markdown files that any editor opens.
      </p>

      <H2>The audit</H2>
      <p>
        Before I demoed it to anyone, I audited it and wrote down the result.
        The document opens by refusing to posture:
      </p>

      <PullQuote cite="Tilt — SECURITY.md">
        Tilt is a single-user local application whose backend happens to speak
        HTTP. That sentence is the whole threat model.
      </PullQuote>

      <p>
        That precise threat model makes the rest of the document possible. Tilt
        has no user model — one data directory, one settings file, one key. That
        is not a defect waiting for a patch. It is what the application is. Once
        that is stated, the real questions become answerable. What happens when
        another machine can reach the backend. What happens when a feed returns
        something hostile. What happens when a model provider errors.
      </p>
      <p>
        The document records four things. The parts that passed — SQL and FTS5
        injection, YAML loading, layered escaping on rendered diagrams, the key
        never serialized out. Seven problems I found and fixed, including
        request forgery in feed fetching, a token check that only engaged when a
        token already existed, and path traversal. Four more that a second
        review caught after the first had missed them. And two that testing
        proved were not problems — kept in the document rather than deleted, so
        the next reader does not raise them again.
      </p>

      <H2>What is not done</H2>
      <p>
        Distribution. There is no signed build and no installer, because
        notarization requires a paid Apple Developer account. The embedding path
        has never run against a real API key. I measured its thresholds on
        planted vectors, not on anything a person wrote. The numbers are
        plausible rather than validated, and the repository says so.
      </p>
    </WriteupPage>
  );
}
