import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", id: "work" },
  { label: "Research", id: "research" },
  { label: "How I work", id: "colophon" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const { activeId } = useScrollSpy(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* No bar — a short fade instead, so content dissolves under the status
          line rather than colliding with it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/90 via-background/45 to-transparent"
      />
      <nav className="relative mx-auto flex w-full max-w-4xl items-center gap-6 px-6 py-4">
        <a
          href="#top"
          className="font-display shrink-0 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70 sm:text-xl"
        >
          Soya
        </a>

        {/* A status line rather than a menu: always visible, scrolling
            sideways on narrow screens instead of collapsing out of reach. */}
        <div className="no-scrollbar flex flex-1 items-center gap-6 overflow-x-auto whitespace-nowrap">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={cn(
                "shrink-0 text-[13px] transition-colors duration-200",
                activeId === id
                  ? "text-foreground underline decoration-1 underline-offset-4"
                  : "text-foreground/60 hover:text-foreground"
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
          className="shrink-0 text-[13px] text-foreground/60 transition-colors duration-200 hover:text-foreground"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
