import BootSequence from "@/components/BootSequence";
import Colophon from "@/components/Colophon";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Research from "@/components/Research";
import StatusStrip from "@/components/StatusStrip";
import Work from "@/components/Work";

export default function Index() {
  return (
    <div id="top" className="relative">
      <div className="hero-fade relative flex min-h-screen flex-col overflow-hidden">
        <img
          // Root-absolute paths in JSX are not rebased by Vite; BASE_URL keeps
          // this correct when the site is served from a subpath.
          src={`${import.meta.env.BASE_URL}landing-page.png`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Hero />
        <StatusStrip />
        <BootSequence />
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
