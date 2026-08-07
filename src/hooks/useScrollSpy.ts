import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past the top, and which section is
 * currently in view.
 */
export function useScrollSpy(ids: string[]) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        // Glass backing appears as soon as the page moves, so content never
        // scrolls under a fully transparent bar.
        setScrolled(y > 80);

        // Active section: the last one whose top has passed the upper third.
        // Measured against the viewport — offsetTop would be relative to the
        // nearest positioned ancestor, not the document.
        const line = window.innerHeight / 3;
        let current: string | null = null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        setActiveId(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return { scrolled, activeId };
}
