import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", id: "work" },
  { label: "Research", id: "research" },
  { label: "How I work", id: "colophon" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const { scrolled, activeId } = useScrollSpy(SECTION_IDS);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        // Frosted rather than opaque: the background stays visible and tinted,
        // which is what reads as glass. Saturation lifts what shows through.
        scrolled
          ? "border-b border-white/[0.08] bg-background/80 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between px-6 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70 sm:text-xl"
        >
          Soya
        </a>

        {/* Utility type recedes: body face, sentence case, no tracking. */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={cn(
                "text-[13px] transition-colors duration-200",
                activeId === id
                  ? "text-foreground"
                  : "text-foreground/55 hover:text-foreground"
              )}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/soya-00"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-foreground/55 transition-colors duration-200 hover:text-foreground"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
