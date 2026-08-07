import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", id: "work" },
  { label: "Research", id: "research" },
  { label: "How I work", id: "colophon" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const { scrolled, activeId, progress } = useScrollSpy(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between px-6 py-5 sm:px-8">
          <a
            href="#top"
            className="text-2xl tracking-tight text-foreground transition-opacity hover:opacity-80 sm:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Soya
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeId === id ? "true" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  activeId === id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                    activeId === id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </div>

          <a
            href="https://github.com/soya-00"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full px-5 py-2 text-sm text-foreground hover:scale-[1.03] sm:px-6 sm:py-2.5"
          >
            GitHub
          </a>
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="h-px origin-left bg-accent/70 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
