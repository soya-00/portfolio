import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
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
  );
}
