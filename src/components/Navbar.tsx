const NAV_LINKS = [
  { label: "Home", href: "#", active: true },
  { label: "Studio", href: "#" },
  { label: "About", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Reach Us", href: "#" },
];

export default function Navbar() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-6">
        <a
          href="/"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Velorah<sup className="text-xs">®</sup>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              className={
                active
                  ? "text-sm text-foreground transition-colors"
                  : "text-sm text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {label}
            </a>
          ))}
        </div>

        <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03]">
          Begin Journey
        </button>
      </nav>
    </header>
  );
}
