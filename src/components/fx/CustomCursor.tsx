"use client";

import { useEffect, useRef } from "react";

/** Additive cursor ring (desktop/fine-pointer, motion-safe). Native cursor stays. */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [role=button], input, textarea, select, label");
      el.style.scale = interactive ? "1.9" : "1";
      el.style.backgroundColor = interactive ? "rgba(239,190,82,0.12)" : "transparent";
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return <div ref={ref} aria-hidden className="custom-cursor" style={{ opacity: 0 }} />;
}
