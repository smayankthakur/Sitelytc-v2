"use client";

import { useEffect } from "react";

type LenisInstance = { raf: (time: number) => void; destroy: () => void };
type LenisCtor = new (opts?: Record<string, unknown>) => LenisInstance;

const LENIS_VERSION = "1.1.18";

/**
 * Opt-in inertia smooth scroll (Lenis), loaded from CDN so it adds no build
 * dependency. Enabled only when NEXT_PUBLIC_SMOOTH_SCROLL === "true" AND the
 * user hasn't requested reduced motion. The injected script carries the CSP
 * nonce. For production you can `npm i lenis` and import it directly instead.
 */
export function SmoothScroll({
  enabled,
  nonce,
}: {
  enabled: boolean;
  nonce?: string;
}) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let instance: LenisInstance | undefined;
    let raf = 0;
    let cancelled = false;

    const begin = (Lenis: LenisCtor) => {
      if (cancelled) return;
      instance = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (t: number) => {
        instance?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const w = window as unknown as { Lenis?: LenisCtor };
    if (w.Lenis) {
      begin(w.Lenis);
    } else {
      const tag = document.createElement("script");
      tag.src = `https://cdn.jsdelivr.net/npm/lenis@${LENIS_VERSION}/dist/lenis.min.js`;
      if (nonce) tag.nonce = nonce;
      tag.onload = () => {
        if (w.Lenis) begin(w.Lenis);
      };
      document.head.appendChild(tag);
    }

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, [enabled, nonce]);

  return null;
}
