const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "How I work", href: "#colophon" },
];

export default function Navbar() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-6">
        <a
          href="#"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Soya
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/soya-00"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03]"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
