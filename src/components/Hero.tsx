export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="animate-fade-rise max-w-5xl text-4xl font-normal leading-[1.05] sm:text-6xl md:text-7xl">
        <span className="font-serif tracking-[-1.5px] sm:tracking-[-2.46px]">
          I build instruments for thinking,
        </span>{" "}
        <em className="font-display block not-italic text-2xl font-bold uppercase tracking-tight text-accent sm:mt-4 sm:text-4xl md:text-5xl">
          and I write down why
        </em>
      </h1>

      <p className="animate-fade-rise-delay mt-10 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
        Seventeen, final year of the IB Diploma in Vietnam. I make things that
        hold attention or make a question answerable — and I keep the record of
        what was chosen, what was wrong, and what I threw away.
      </p>

      <a
        href="#work"
        className="animate-fade-rise-delay-2 liquid-glass font-label mt-12 cursor-pointer rounded-full px-12 py-4 text-sm uppercase tracking-[0.14em] text-foreground hover:scale-[1.03] sm:px-14 sm:py-5"
      >
        See the work
      </a>
    </section>
  );
}
