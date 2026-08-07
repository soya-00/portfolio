export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1
        className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-1.5px] sm:text-7xl sm:tracking-[-2.46px] md:text-8xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        I build instruments for thinking,{" "}
        <em className="not-italic text-muted-foreground">
          and I write down why.
        </em>
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
        Seventeen, final year of the IB Diploma in Vietnam. I make things that
        hold attention or make a question answerable — and I keep the record of
        what was chosen, what was wrong, and what I threw away.
      </p>

      <a
        href="#work"
        className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-12 py-4 text-base text-foreground hover:scale-[1.03] sm:px-14 sm:py-5"
      >
        See the work
      </a>

      <a
        href="#work"
        aria-label="Scroll to the work"
        className="animate-fade-rise-delay-2 absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground sm:block"
      >
        <span className="block h-10 w-px animate-pulse bg-current opacity-60" />
      </a>
    </section>
  );
}
