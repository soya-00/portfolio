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
      <img
        src={`${import.meta.env.BASE_URL}landing-page.png`}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />

      {/* Navbar is the page's banner and it is fixed, so putting it first in
          the DOM costs nothing visually and gets the tab order right: masthead,
          then headline, then the console. Hero and the status line sit inside
          main rather than beside it — left outside, they belonged to no
          landmark, and the h1 was unreachable by the shortcut a screen reader
          user navigates with. */}
      <Navbar />

      <main className="relative z-10">
        <div className="flex min-h-screen flex-col">
          <Hero />
          <StatusStrip />
        </div>

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
