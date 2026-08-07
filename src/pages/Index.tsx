import Colophon from "@/components/Colophon";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Research from "@/components/Research";
import Work from "@/components/Work";

export default function Index() {
  return (
    <div id="top" className="relative">
      <div className="hero-fade relative flex min-h-screen flex-col overflow-hidden">
        <img
          src="/landing-image.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Hero />
      </div>

      <Navbar />

      <main className="relative z-10 bg-background pb-24">
        <Intro />
        <Work />
        <Research />
        <Colophon />
      </main>
    </div>
  );
}
