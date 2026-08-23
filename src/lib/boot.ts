export const BOOT_SEEN_KEY = "soya:boot-seen";

/** The banner's steps, counter and fade in BootSequence add up to this. */
export const BOOT_TOTAL_MS = 2180;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

let decided: boolean | null = null;

/**
 * Whether the boot banner runs this page load.
 *
 * Decided once, on the first call, and cached for the life of the module.
 * BootSequence and the hero both depend on this answer, and BootSequence
 * writes the session flag the answer is derived from — so recomputing it
 * later returns a different result. That is a real race: under StrictMode the
 * banner mounts twice, the flag is set by the first mount, and the headline
 * then reads "already seen", starts typing immediately, and finishes behind
 * the banner where nobody sees it. Caching removes the ordering dependency.
 */
export const bootWillPlay = () => {
  if (decided !== null) return decided;
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) {
    decided = false;
    return decided;
  }
  try {
    decided = window.sessionStorage.getItem(BOOT_SEEN_KEY) !== "1";
  } catch {
    // Blocked storage: play it rather than desynchronizing the two.
    decided = true;
  }
  return decided;
};
