"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Circular reading-progress for long article pages. Tracks the first matching
 *  element (default <article>); appears once you're into it. */
export function ReadingProgress({ target = "article" }: { target?: string }) {
  const [p, setP] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setP(prog);
      setShow(rect.top < -120 && rect.bottom > window.innerHeight * 0.6);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  const r = 18;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-40 transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-canvas/80 backdrop-blur">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="var(--color-gold-400)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - p)}
          />
        </svg>
        <span className="text-[10px] font-semibold text-ink-200">
          {Math.round(p * 100)}
        </span>
      </div>
    </div>
  );
}
