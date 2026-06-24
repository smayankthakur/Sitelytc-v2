"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Cycles through words with a kinetic swap. Holds the first word for reduced-motion. */
export function RotatingWord({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (words.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[i] ?? words[0] ?? "";

  return (
    <span className={cn("rotating-word", className)}>
      <span key={i} className="rotating-word-inner">
        {word}
      </span>
    </span>
  );
}
