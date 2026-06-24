"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      console.log(
        "%c✦ SITELYTC%c — Precision Digital Architecture\n%cLike the build? We engineer web, AI & security.  →  sitelytc@gmail.com\n%cpsst — try the Konami code ↑↑↓↓←→←→ b a",
        "color:#efbe52;font-weight:700;font-size:14px",
        "color:#aab2c8;font-size:12px",
        "color:#7f889f;font-size:11px",
        "color:#5c6478;font-size:10px",
      );
    } catch {
      /* ignore */
    }

    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = key === KONAMI[idx] ? idx + 1 : key === KONAMI[0] ? 1 : 0;
      if (idx === KONAMI.length) {
        idx = 0;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setActive(true);
        window.setTimeout(() => setActive(false), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;
  return (
    <>
      <div aria-hidden className="egg-grid" />
      <div className="egg-toast" role="status">
        ✦ Blueprint mode
      </div>
    </>
  );
}
