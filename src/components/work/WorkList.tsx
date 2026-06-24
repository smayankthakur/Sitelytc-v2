"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { workCategories, type CaseStudy, type WorkCategory } from "@/lib/work-data";
import { cn } from "@/lib/utils";

/** Portfolio list with a cursor-following logo preview. Each row links to the
 *  project's own case-study sub-domain (matches the live site). */
export function WorkList({ items }: { items: CaseStudy[] }) {
  const [active, setActive] = useState<WorkCategory | "all">("all");
  const [hovered, setHovered] = useState<CaseStudy | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  function move(e: React.PointerEvent) {
    const el = previewRef.current;
    if (!el) return;
    const x = e.clientX;
    const y = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${x + 24}px, ${y - 110}px) rotate(-4deg)`;
      rafRef.current = 0;
    });
  }

  return (
    <div onPointerMove={move}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {workCategories.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === f.id
                ? "bg-brand-600 text-white"
                : "bg-white/5 text-ink-200 hover:bg-white/10",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="mt-8 border-t border-white/10">
        {shown.map((c, i) => (
          <a
            key={c.slug}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerEnter={() => setHovered(c)}
            onPointerLeave={() => setHovered((h) => (h?.slug === c.slug ? null : h))}
            className="group flex items-center gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02] sm:py-9"
          >
            <span className="hidden w-10 shrink-0 font-mono text-sm text-ink-500 sm:block">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white p-2 sm:hidden">
              <Image
                src={c.logo}
                alt={c.client}
                width={48}
                height={48}
                className="h-full w-auto object-contain"
              />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-gold-300 sm:text-3xl">
                  {c.client}
                </h3>
                <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-semibold text-gold-300">
                  {c.categoryLabel}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-400">&ldquo;{c.outcome}&rdquo;</p>
            </div>

            <span className="hidden shrink-0 items-center text-sm font-semibold text-gold-300 sm:inline-flex">
              Deep dive
            </span>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-ink-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300" />
          </a>
        ))}
      </div>

      {/* Cursor-following preview (white card so any logo stays visible) */}
      <div
        ref={previewRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-50 hidden h-[200px] w-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl transition-[opacity,scale] duration-300 [@media(pointer:fine)]:block motion-reduce:!hidden",
          hovered ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        {hovered ? (
          <div className="flex h-full w-full items-center justify-center p-10">
            <Image
              src={hovered.logo}
              alt={hovered.client}
              width={240}
              height={120}
              className="max-h-full w-auto object-contain"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
