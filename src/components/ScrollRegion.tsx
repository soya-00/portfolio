import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A horizontally scrolling container a keyboard can actually reach.
 *
 * Wide content scrolling inside its own box instead of the page body is the
 * right call, but only if the box can be operated without a mouse. An overflow
 * container takes the arrow keys only once it can take focus; Chrome and
 * Firefox now focus a scrollable one on their own, Safari does not, and none
 * of them announce it. So: tabIndex for the operation, and a role with a name
 * so the stop means something when it is reached.
 *
 * The tab stop is withdrawn when the content fits. Most of these boxes only
 * overflow on a narrow window, and a stop that lands on a box with nothing to
 * scroll is just an empty press. It starts present and is removed rather than
 * the other way round, so the prerendered markup and the no-JS case keep the
 * stop they need — the refinement is what requires the script, not the access.
 *
 * An unnamed region is worse than no region — it announces as "region" and
 * tells the listener nothing — so a caller with no label gets the tab stop
 * alone. Pass a label by pointing labelledBy at text already on the page
 * rather than writing a second copy of it.
 */
export default function ScrollRegion({
  labelledBy,
  label,
  className,
  children,
}: {
  /** Id of existing on-page text — a caption or figcaption — to name this by. */
  labelledBy?: string;
  /** Only for regions with no on-page text to point at. */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    measure();

    // The box's own size and its content's size both decide this, and the
    // content is what changes when a column of text rewraps.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => observer.disconnect();
  }, []);

  const named = Boolean(labelledBy || label);

  return (
    <div
      ref={ref}
      tabIndex={overflowing ? 0 : undefined}
      role={overflowing && named ? "region" : undefined}
      aria-labelledby={overflowing ? labelledBy : undefined}
      aria-label={overflowing && !labelledBy ? label : undefined}
      className={cn(
        "overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
    >
      {children}
    </div>
  );
}
