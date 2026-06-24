"use client";

import { useEffect, useState } from "react";

// Persists across the template's per-navigation remounts — so the very first
// page load (handled by the preloader) doesn't trigger the wipe.
let seenFirst = false;

export function RouteTransition() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!seenFirst) {
      seenFirst = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlay(true);
    const t = window.setTimeout(() => setPlay(false), 750);
    return () => window.clearTimeout(t);
  }, []);

  if (!play) return null;
  return <div aria-hidden className="route-transition" />;
}
