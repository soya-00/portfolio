import { imageSources } from "@/lib/images";

const SRC = "landing-page.png" as const;

/**
 * The cockpit photograph behind every page.
 *
 * One component rather than the copy that used to sit in both Index and
 * PageFrame: it is the same picture in the same position on all five entry
 * points, and two copies of it drifted apart the moment either was touched.
 *
 * It is decorative — the page says nothing that depends on it — so it is
 * empty-alt and hidden from assistive technology.
 *
 * Not the LCP element, despite covering the viewport: Chrome does not count an
 * image that fills the screen and behaves as a background, so the largest
 * paint here is the headline. That is why it carries no fetchpriority. It is
 * still the single heaviest thing on the page, which is the reason it is
 * served as AVIF at a couple of dozen kilobytes rather than as a 1.6 MB PNG.
 */
export default function BackdropPhoto() {
  const img = imageSources(SRC);

  return (
    <picture>
      <source type="image/avif" srcSet={img.avif} sizes="100vw" />
      <source type="image/webp" srcSet={img.webp} sizes="100vw" />
      <img
        src={img.fallback}
        srcSet={img.jpg}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={img.width}
        height={img.height}
        decoding="async"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />
    </picture>
  );
}
