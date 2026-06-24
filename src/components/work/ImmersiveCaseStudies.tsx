"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/work-data";
import { Counter } from "@/components/fx/Counter";
import { cn } from "@/lib/utils";

/** On-brand fallback when a project has no screenshot yet. */
function BlueprintPanel({ initials }: { initials: string }) {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,190,82,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(239,190,82,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid h-44 w-44 rotate-45 place-items-center rounded-2xl border border-gold-400/40">
          <span className="-rotate-45 font-display text-3xl font-bold text-gold-300/70">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ImmersiveCaseStudies() {
  const visuals = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        for (const el of visuals.current) {
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const off = (r.top + r.height / 2 - vh / 2) / vh;
          el.style.transform = `translateY(${off * -26}px)`;
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="space-y-28 sm:space-y-40">
      {caseStudies.map((c, i) => {
        const flip = i % 2 === 1;
        const initials = c.client
          .replace(/[^A-Za-z ]/g, "")
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <article
            key={c.slug}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* Visual */}
            <div
              className={cn(
                "reveal",
                flip ? "reveal-right lg:order-2" : "reveal-left",
              )}
            >
              <div
                ref={(el) => {
                  visuals.current[i] = el;
                }}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 shadow-2xl will-change-transform"
              >
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.client} project`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                ) : (
                  <BlueprintPanel initials={initials} />
                )}

                {/* Logo chip — light card so dark-background logos stay visible */}
                <div className="absolute left-5 top-5 rounded-xl bg-white px-4 py-2.5 shadow-lg">
                  <Image
                    src={c.logo}
                    alt={c.client}
                    width={120}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={cn("reveal", flip ? "lg:order-1" : "")}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} — {c.categoryLabel}
              </p>
              <h3 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {c.client}
              </h3>

              {c.metricValue !== undefined ? (
                <p className="mt-6 font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
                  {c.metricPrefix}
                  <Counter value={c.metricValue} suffix={c.metricSuffix} />
                </p>
              ) : null}

              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-300">
                {c.summary ?? c.outcome}
              </p>

              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
              >
                View live case study
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
