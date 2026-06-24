"use client";

import { useEffect, useRef } from "react";

/**
 * Contextual cursor: a gold ring that follows the pointer, grows over any
 * interactive element, and becomes a labelled pill over elements carrying a
 * `data-cursor="…"` attribute. Desktop / fine-pointer + motion-safe only.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;
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
      const node = t?.closest<HTMLElement>(
        "[data-cursor], a, button, [role=button], input, textarea, select, label",
      );
      if (!node) {
        el.classList.remove("is-active", "is-label");
        return;
      }
      const text = node.getAttribute("data-cursor");
      if (text) {
        label.textContent = text;
        el.classList.add("is-label");
        el.classList.remove("is-active");
      } else {
        el.classList.add("is-active");
        el.classList.remove("is-label");
      }
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

  return (
    <div ref={ref} aria-hidden className="custom-cursor" style={{ opacity: 0 }}>
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );
}
