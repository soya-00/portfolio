import Typewriter from "@/components/Typewriter";

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="font-display max-w-6xl text-5xl font-normal leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
        <Typewriter
          segments={[
            { text: "I build instruments for thinking, " },
            {
              text: "then test the assumptions behind them.",
              className: "text-foreground/60",
            },
          ]}
        />
      </h1>

      <p className="animate-fade-rise-delay mt-10 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
        Seventeen, in my final year of the IB Diploma in Vietnam. I work across
        journaling, career education and personal computing, usually starting
        with a problem, building around it, and changing the system when the
        first version exposes an assumption I had not accounted for.
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
