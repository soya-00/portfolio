import PullQuote from "@/components/PullQuote";
import RepoTree from "@/components/RepoTree";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function BlocWriteup() {
  return (
    <WriteupPage
      name="BLOC OS"
      kicker="A kernel, and the prototype that specified it."
      meta={[
        {
          label: "Built with",
          value: "C · AArch64 assembly · QEMU · Raspberry Pi 5",
        },
        {
          label: "Status",
          value:
            "A few milestones in. Boots under QEMU; far from the interface.",
        },
        {
          label: "Checked by",
          value:
            "Every milestone must run under QEMU before the next one starts.",
        },
      ]}
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
        {
          label: "bloc-os-beta",
          href: "https://github.com/soya-00/bloc-os-beta",
        },
      ]}
      lead={
        <>
          <p>
            I wrote the first version entirely in Python, on purpose. It existed
            to answer one question: was the interface worth a commitment at all?
            Flight strips that move between bays. Single-key commands with no
            mouse. A thermal printer for the day's strips. A voice dispatch call
            routed through Whisper.
          </p>
          <p>
            None of those are questions about C. They are questions about
            whether a person actually wants to work this way. Python answered
            them in weeks.
          </p>
        </>
      }
    >
      <p>
        To ask them in C would have cost months before I learned anything about
        the design. The prototype ran on Linux as an ordinary process and never
        pretended otherwise.
      </p>

      <H2>What it settled</H2>
      <p>
        The prototype produced four specification documents, which carried into
        the kernel repository: the design system, the record format, the
        interaction contract, and the status vocabulary. About ten thousand
        lines of Python did not transfer, and were never meant to.
      </p>
      <p>
        That ratio is the point of a prototype. The code was the cost of the
        specifications. The specifications are the thing worth keeping. I wrote
        the design system after I built three renderers and compared them. Every
        rule in it has a render behind it that made the problem visible.
      </p>

      <H2>The design is a system, not a theme</H2>
      <p>
        The interface follows analog flight decks — annunciator panels,
        information you read at a glance rather than parse. One rule keeps that
        from decoration: each color is named for what it means.
      </p>

      <PullQuote cite="BLOC — DESIGN.md">
        Every palette entry is named for what it means. There is no{" "}
        <code className="font-display text-[0.95em]">amber</code> in the
        codebase; there is{" "}
        <code className="font-display text-[0.95em]">attention</code>.
      </PullQuote>

      <p>
        A palette with a color called amber rots. The next screen reaches for
        &ldquo;the orange one&rdquo; and invents a meaning nobody else knows. A
        palette with a role called{" "}
        <code className="font-display text-[0.95em]">attention</code> forces the
        question of whether this thing genuinely needs a decision from the
        person.
      </p>
      <p>
        The related rule is marked non-negotiable: anything conveyed by color is
        also conveyed by something else. That one came from a real failure. An
        early contrast check summed RGB channels. A phosphor green summed lower
        than a muted mint while it read considerably brighter. The check
        declared a correct palette broken.
      </p>

      <H2>What actually runs</H2>

      <RepoTree
        root="bloc-os"
        caption="The repository at b86db4a — the documents outnumber the kernel"
        nodes={[
          {
            name: "boot/",
            children: [
              { name: "boot.S", note: "EL2 to EL1, then C" },
              { name: "vectors.S", note: "the exception table" },
              { name: "link.ld.in", note: "generated per board" },
            ],
          },
          {
            name: "kernel/",
            children: [
              { name: "main.c" },
              { name: "uart.c", note: "PL011, the first character" },
              { name: "exception.c" },
            ],
          },
          {
            name: "board/",
            note: "three targets",
            children: [
              { name: "pi5.h" },
              { name: "raspi4b.h" },
              { name: "virt.h", note: "QEMU" },
            ],
          },
          {
            name: "docs/",
            note: "carried over from the prototype",
            children: [
              { name: "DESIGN.md", note: "the design system" },
              { name: "FORMAT.md", note: "the record format" },
              { name: "INTERACTION.md", note: "the interaction contract" },
              { name: "VOCAB.md", note: "the status vocabulary" },
              { name: "DECISIONS.md", note: "the log" },
              { name: "HARDWARE.md" },
              { name: "ROADMAP.md", note: "fifteen milestones" },
            ],
          },
          { name: "Makefile" },
          { name: "README.md" },
        ]}
      />

      <p>
        A bare-metal AArch64 kernel for the Raspberry Pi 5, in C and assembly.
        It builds for three boards through a generated linker script. It boots
        under QEMU and prints over the PL011 UART. It drops from EL2 to EL1,
        then deliberately faults itself three times to prove the exception
        vector table catches what it should.
      </p>
      <p>
        Milestone one was not &ldquo;it boots.&rdquo; It was a single character
        on the wire — the first claim a person can actually check. Every
        milestone since must run under QEMU before the next one starts.
      </p>

      <H2>Honest pace</H2>
      <p>
        This is a long way from the interface it is built for. The roadmap says
        so plainly. A framebuffer sits around milestone eleven of fifteen. The
        estimate to reach the full flight-deck surface is years at a hobby pace.
        Emulation is authoritative about the architecture, not about what real
        hardware enforces. Nothing here is proved on a board yet.
      </p>
    </WriteupPage>
  );
}
