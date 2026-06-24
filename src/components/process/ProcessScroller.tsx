"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Phase = {
  name: string;
  duration: string;
  deliverables: string[];
  involvement: string;
};

/** Pinned scroll-through: a sticky left column tracks the active phase while the
 *  phase cards scroll past on the right. Degrades to a clean stack on mobile. */
export function ProcessScroller({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of refs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [phases.length]);

  const current = phases[active] ?? phases[0];
  if (!current) return null;

  return (
    <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      {/* Sticky tracker (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <p className="eyebrow">our process</p>
          <div className="mt-6 flex items-start gap-5">
            <span className="font-display text-7xl font-bold leading-none text-gradient-gold tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className="pt-2">
              <h3 className="font-display text-3xl font-bold tracking-tight text-white">
                {current.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold-300">
                {current.duration}
              </p>
            </div>
          </div>

          <ol className="mt-10 space-y-3">
            {phases.map((p, i) => (
              <li
                key={p.name}
                className={cn(
                  "flex items-center gap-3 text-sm transition-colors duration-300",
                  i === active ? "text-white" : "text-ink-500",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                    i <= active ? "bg-gold-400" : "bg-white/15",
                  )}
                />
                {p.name}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Scrolling phase cards */}
      <div className="space-y-8 lg:space-y-24">
        {phases.map((phase, i) => (
          <div
            key={phase.name}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "reveal rounded-2xl border bg-surface p-7 transition-colors duration-300 sm:p-9 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center",
              i === active ? "border-gold-500/30" : "border-white/10",
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                <span className="text-ink-600 lg:hidden">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                </span>
                {phase.name}
              </h2>
              <span className="text-sm font-medium text-gold-300">
                {phase.duration}
              </span>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {phase.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full bg-white/5 px-3 py-1 text-sm text-ink-200"
                >
                  {d}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-ink-400">
              <span className="font-medium text-ink-200">Your involvement:</span>{" "}
              {phase.involvement}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
