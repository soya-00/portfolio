import Colophon from "@/components/Colophon";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Research from "@/components/Research";
import Work from "@/components/Work";

export default function Index() {
  return (
    <div className="relative">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <img
          src="/landing-image.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Navbar />
        <Hero />
      </div>

      <main className="relative z-10 bg-background pb-16">
        <Intro />
        <Work />
        <Research />
        <Colophon />
      </main>
    </div>
  );
}
