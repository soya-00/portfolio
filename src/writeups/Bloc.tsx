import PullQuote from "@/components/PullQuote";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function BlocWriteup() {
  return (
    <WriteupPage
      bay="ACTIVE"
      name="BLOC OS"
      kicker="A kernel, and the prototype that specified it."
      meta={[
        {
          label: "Built with",
          value: "C · AArch64 assembly · QEMU · Raspberry Pi 5",
        },
        {
          label: "Status",
          value: "A few milestones in. Boots under QEMU; far from the interface.",
        },
        {
          label: "Checked by",
          value:
            "Every milestone has to run under QEMU before the next one starts.",
        },
      ]}
      links={[
        { label: "Repository", href: "https://github.com/soya-00/bloc-os" },
        {
          label: "DECISIONS.md",
          href: "https://github.com/soya-00/bloc-os/blob/main/docs/DECISIONS.md",
        },
        {
          label: "DESIGN.md",
          href: "https://github.com/soya-00/bloc-os/blob/main/docs/DESIGN.md",
        },
        {
          label: "The Python prototype",
          href: "https://github.com/soya-00/bloc-os-beta",
        },
      ]}
    >
      <H2>Why Python first</H2>
      <p>
        The first version was written entirely in Python, on purpose. The
        question it existed to answer was whether the interface was worth
        committing to at all: flight strips that move between bays, single-key
        commands with no mouse, a thermal printer for the day's strips, and a
        voice dispatch call routed through Whisper.
      </p>
      <p>
        None of those are questions about C. They are questions about whether a
        person actually wants to work this way, and Python answered them in
        weeks.{" "}
        <span className="text-foreground">
          Asking them in C would have cost months before I learned anything
          about the design.
        </span>{" "}
        The prototype ran on top of Linux as an ordinary process and was never
        pretending otherwise.
      </p>

      <H2>What it settled</H2>
      <p>
        Four specification documents came out of it and carried into the kernel
        repository: the design system, the record format, the interaction
        contract, and the status vocabulary. About ten thousand lines of Python
        did not carry across, and were never meant to.
      </p>
      <p>
        That ratio is the point of a prototype. The code was the cost of
        producing the specifications; the specifications are the thing worth
        keeping. The design system in particular was written after building
        three different renderers and comparing them, so every rule in it has a
        render behind it that made the problem visible.
      </p>

      <H2>The design is a system, not a theme</H2>
      <p>
        The interface is modelled on analog flight decks — annunciator panels,
        information you read at a glance rather than parse. The rule that keeps
        that from being decoration is that colours are named for what they mean:
      </p>

      <PullQuote cite="BLOC OS — DESIGN.md">
        Every palette entry is named for what it means. There is no{" "}
        <code className="font-mono text-[0.9em]">amber</code>; there is{" "}
        <code className="font-mono text-[0.9em]">attention</code>.
      </PullQuote>

      <p>
        A palette with a colour called amber rots, because the next screen
        reaches for &ldquo;the orange one&rdquo; and invents a meaning nobody
        else knows about. A palette with a role called{" "}
        <code className="font-mono text-[0.9em]">attention</code> forces the
        question of whether this thing genuinely needs a decision from the
        person.
      </p>
      <p>
        The related rule is marked non-negotiable: anything conveyed by colour
        is also conveyed by something else. That one came from a real failure —
        an early contrast check summed RGB channels, and a phosphor green summed
        lower than a muted mint while reading considerably brighter, so the
        check declared a correct palette broken.
      </p>

      <H2>What actually runs</H2>
      <p>
        A bare-metal AArch64 kernel for the Raspberry Pi 5, in C and assembly.
        It builds for three boards through a generated linker script, boots under
        QEMU, prints over the PL011 UART, drops from EL2 to EL1, and then
        deliberately faults itself three times to prove the exception vector
        table catches what it should.
      </p>
      <p>
        Milestone one was not &ldquo;it boots&rdquo; — it was a single character
        arriving on the wire, because that is the first claim that can actually
        be checked. Every milestone since has had to run under QEMU before the
        next one starts.
      </p>

      <H2>Honest pace</H2>
      <p>
        This is a long way from the interface it is being built for, and the
        roadmap says so plainly. A framebuffer is around milestone eleven of
        fifteen, and the estimate for reaching the full flight-deck surface is
        years at a hobby pace. Emulation is authoritative about the architecture
        and not about what real hardware enforces, so nothing here has been
        proved on a board yet.
      </p>
    </WriteupPage>
  );
}
