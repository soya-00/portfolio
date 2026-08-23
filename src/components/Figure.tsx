import { type ImageName } from "@/lib/image-manifest";
import { imageSources } from "@/lib/images";

type FigureProps = {
  /**
   * Master filename, as it sits in assets-src/ and in the manifest. The
   * derivatives are resolved from it, so callers never name a format or a
   * width, and a filename that has no master is a type error rather than a
   * broken image in production.
   */
  src: ImageName;
  alt: string;
  caption: string;
};

/**
 * A screenshot with its caption.
 *
 * Three formats, narrowest acceptable first: AVIF where it decodes, WebP where
 * it does not, and a JPEG on the img itself as the floor. A browser takes the
 * first source it understands and never fetches the others.
 *
 * width and height come from the manifest rather than from the caller. They
 * are not decoration — with only `w-full` set, the image had no height until
 * it arrived, and everything below it moved when it did. Skim to the bottom of
 * a writeup on a slow connection and that measured 0.267 CLS, which is inside
 * the band Chrome calls poor. The pair gives the box an aspect ratio to hold
 * the space with. h-auto has to be in the class list for that to work: the
 * width attribute loses to `w-full`, but the height attribute would not, and
 * the image would sit locked at its intrinsic pixel height.
 */
export default function Figure({ src, alt, caption }: FigureProps) {
  const img = imageSources(src);

  // The figure lives in the max-w-3xl text column, so it is never wider than
  // 768px on a desktop. Without this the browser assumes 100vw and pulls the
  // 1536 for a 768 slot.
  const sizes = "(min-width: 768px) 768px, 100vw";

  return (
    <figure className="my-10">
      <picture>
        <source type="image/avif" srcSet={img.avif} sizes={sizes} />
        <source type="image/webp" srcSet={img.webp} sizes={sizes} />
        {/* The fallback carries a srcSet too. A browser old enough to need
            JPEG is likely on a small screen, and there is no reason to hand it
            the 1536 when the 768 is right there. */}
        <img
          src={img.fallback}
          srcSet={img.jpg}
          sizes={sizes}
          alt={alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-lg border border-border/70 bg-surface/40"
        />
      </picture>
      <figcaption className="font-display mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
