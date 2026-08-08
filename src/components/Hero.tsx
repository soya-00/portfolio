export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="animate-fade-rise font-display max-w-6xl text-5xl font-normal leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
        I build instruments for thinking,{" "}
        <em className="not-italic text-foreground/60">down to the kernel.</em>
      </h1>

      <p className="animate-fade-rise-delay mt-10 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
Seventeen, final year of the IB Diploma in Vietnam.
        Operating systems, computational linguistics, and accessibility research. 
        Heading toward machine learning, flight decks, and philosophy.
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
