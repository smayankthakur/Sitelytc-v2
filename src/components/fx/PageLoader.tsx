"use client";

import { useEffect } from "react";

/** Runs the intro once per tab: animates the 0→100 counter, then fades out. */
export function PageLoader() {
  useEffect(() => {
    const el = document.getElementById("page-loader");
    if (!el) return;

    let seen = false;
    try {
      seen = !!sessionStorage.getItem("sl_intro");
    } catch {
      seen = false;
    }
    if (seen) {
      el.style.display = "none";
      return;
    }

    const count = document.getElementById("page-loader-count");
    const start = performance.now();
    const duration = 950;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      if (count) count.textContent = String(Math.round(p * 100)).padStart(2, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const out = window.setTimeout(() => {
      el.classList.add("is-out");
      try {
        sessionStorage.setItem("sl_intro", "1");
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        el.style.display = "none";
      }, 650);
    }, 1050);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(out);
    };
  }, []);

  return null;
}
