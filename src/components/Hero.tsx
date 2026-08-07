export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-40 py-[90px] text-center">
      <h1
        className="animate-fade-rise max-w-6xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        I build instruments for thinking,{" "}
        <em className="not-italic text-muted-foreground">
          and I write down why.
        </em>
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Seventeen, final year of the IB Diploma in Vietnam. I make things that
        hold attention or make a question answerable — and I keep the record of
        what was chosen, what was wrong, and what I threw away.
      </p>

      <a
        href="#work"
        className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03]"
      >
        See the work
      </a>
    </section>
  );
}
