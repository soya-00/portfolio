type FigureProps = {
  /** Filename in public/, resolved against BASE_URL for the subpath deploy. */
  src: string;
  alt: string;
  caption: string;
};

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-10">
      <img
        src={`${import.meta.env.BASE_URL}${src}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg border border-border/70 bg-surface/40"
      />
      <figcaption className="font-display mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
