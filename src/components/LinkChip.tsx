type LinkChipProps = {
  href: string;
  children: string;
};

export default function LinkChip({ href, children }: LinkChipProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-foreground hover:scale-[1.03]"
    >
      {children}
      <span aria-hidden="true" className="text-muted-foreground">
        ↗
      </span>
    </a>
  );
}
