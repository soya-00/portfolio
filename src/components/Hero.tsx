export default function Hero() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-40 py-[90px] text-center">
      <h1
        className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Where <em className="not-italic text-muted-foreground">dreams</em> rise{" "}
        <em className="not-italic text-muted-foreground">through the silence.</em>
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        We&apos;re designing tools for deep thinkers, bold creators, and quiet
        rebels. Amid the chaos, we build digital spaces for sharp focus and
        inspired work.
      </p>

      <button className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03]">
        Begin Journey
      </button>
    </main>
  );
}
