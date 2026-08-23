import { IMAGES, type ImageName } from "@/lib/image-manifest";

export type ImageSources = {
  /** Intrinsic size of the master, for the aspect ratio the box holds. */
  width: number;
  height: number;
  /** One srcSet per format, narrowest encoded width first. */
  avif: string;
  webp: string;
  jpg: string;
  /** Widest JPEG, for the img's own src. */
  fallback: string;
};

/**
 * Every URL a picture element needs for one master, resolved against BASE_URL
 * so it survives the /portfolio/ subpath deploy.
 *
 * Both the figures and the backdrop were assembling these strings themselves
 * and getting the same answer two different ways, which is one filename
 * convention held in two places. The convention lives here now: derivatives
 * are `<stem>-<width>.<ext>`, and only this function and the script that
 * writes them need to agree on that.
 */
export function imageSources(name: ImageName): ImageSources {
  const base = import.meta.env.BASE_URL;
  const { width, height, widths } = IMAGES[name];
  const stem = name.replace(/\.png$/, "");

  const set = (ext: string) =>
    widths.map((w) => `${base}${stem}-${w}.${ext} ${w}w`).join(", ");

  return {
    width,
    height,
    avif: set("avif"),
    webp: set("webp"),
    jpg: set("jpg"),
    fallback: `${base}${stem}-${widths[widths.length - 1]}.jpg`,
  };
}
