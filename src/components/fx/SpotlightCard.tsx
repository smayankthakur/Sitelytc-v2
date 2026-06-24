"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** A Link card with a gold spotlight that follows the cursor. The overlay span
 *  is absolutely positioned, so it never disrupts the card's flex layout. */
export function SpotlightCard({
  href,
  className,
  children,
  cursor,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  cursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      data-cursor={cursor}
      onPointerMove={onMove}
      className={cn("spotlight-card relative", className)}
    >
      <span aria-hidden className="spotlight-glow" />
      {children}
    </Link>
  );
}
