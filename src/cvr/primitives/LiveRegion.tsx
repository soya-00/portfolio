import { useCallback, useRef, useState } from "react";

/**
 * One announcer for the whole piece.
 *
 * The charter asks for a single live-region strategy defined once in the
 * shell, which modules use rather than each inventing their own — several
 * competing live regions is how a screen reader ends up either silent or
 * shouting. Everything that changes state without moving focus routes here:
 * reader settings, module layer switches, filter changes.
 *
 * Polite rather than assertive, because nothing this piece does is urgent
 * enough to interrupt someone mid-sentence.
 */
export function useAnnouncer() {
  const [message, setMessage] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const announce = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    window.clearTimeout(timer.current);
    // Clear first so an identical consecutive message is still spoken.
    setMessage("");
    timer.current = window.setTimeout(() => setMessage(text), 60);
  }, []);

  return { message, announce };
}

export default function LiveRegion({ message }: { message: string }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
