"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals `.reveal` elements as they enter the viewport by toggling `.in-view`.
 *
 * Re-runs on every route change (App Router keeps the layout mounted, so a
 * one-shot effect would leave a newly navigated page's sections stuck hidden).
 * Elements already in/near the viewport are revealed immediately; the rest are
 * observed. A safety timeout guarantees content is never left invisible.
 * Reduced-motion users get everything revealed at once.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("in-view");
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in-view)"),
    );
    if (els.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    const vh = window.innerHeight;
    els.forEach((el) => {
      // Anything already on screen (or above it) reveals right away — no wait
      // for the observer callback, so above-the-fold text is never blank.
      if (el.getBoundingClientRect().top < vh * 0.95) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    // Safety net: never leave content hidden if something goes wrong.
    const failSafe = window.setTimeout(() => els.forEach(reveal), 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(failSafe);
    };
  }, [pathname]);

  return null;
}
