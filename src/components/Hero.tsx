import Typewriter from "@/components/Typewriter";

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="font-display max-w-6xl text-5xl font-normal leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
        <Typewriter
          segments={[
            { text: "I build instruments for thinking, " },
            { text: "down to the kernel.", className: "text-foreground/60" },
          ]}
        />
      </h1>

      <p className="animate-fade-rise-delay mt-10 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
        Seventeen, final year of the IB Diploma in Vietnam. I make things that
        hold attention or make a question answerable — and I keep the record of
        what was chosen, what was wrong, and what I threw away.
      </p>

      <a
        href="#work"
        className="animate-fade-rise-delay-2 liquid-glass font-display mt-12 cursor-pointer rounded-full bg-background/40 px-12 py-4 text-base text-foreground hover:scale-[1.03] sm:px-14 sm:py-5"
      >
        See the work
      </a>
    </section>
  );
}
