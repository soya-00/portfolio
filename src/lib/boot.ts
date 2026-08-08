export const BOOT_SEEN_KEY = "soya:boot-seen";

/** The banner's steps, counter and fade in BootSequence add up to this. */
export const BOOT_TOTAL_MS = 4370;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Whether the boot check will run this page load.
 *
 * Read during render by both BootSequence and the hero, so the headline can
 * wait for the check to clear instead of typing itself behind it. Hero renders
 * first, so it reads the flag before BootSequence's effect sets it.
 */
export const bootWillPlay = () => {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  try {
    return window.sessionStorage.getItem(BOOT_SEEN_KEY) !== "1";
  } catch {
    // Blocked storage: assume it plays rather than desynchronising.
    return true;
  }
};
