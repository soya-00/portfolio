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
      {/* Fixed rather than scrolling: the photograph stays in frame for the
          whole page and the console travels over it. A fixed <img> is used
          instead of background-attachment, which iOS Safari ignores. */}
      <img
        src={`${import.meta.env.BASE_URL}landing-page.png`}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <StatusStrip />
      </div>

      <Navbar />

      <main className="relative z-10">
        <div className="console relative mx-auto w-full max-w-4xl border-x border-white/[0.07] pb-24">
          <Intro />
          <Work />
          <Research />
          <Colophon />
        </div>
      </main>

      <BootSequence />
    </div>
  );
}
