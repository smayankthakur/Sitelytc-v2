"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Reveals text word-by-word (stagger) when scrolled into view. */
export function SplitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("split-text", className)}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="split-word">
          <span
            className="split-word-inner"
            style={{ transitionDelay: `${i * 0.035}s` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
