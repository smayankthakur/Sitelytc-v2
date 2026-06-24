"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { site } from "@/lib/site";

/** Sticky bar that slides up after the user scrolls past the first viewport. */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-2xl border border-ink-800 bg-canvas/90 p-4 shadow-xl backdrop-blur sm:px-6">
        <p className="flex-1 text-sm font-medium text-white sm:text-base">
          Not sure which service you need?
        </p>
        <a
          href={site.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Book a free 30-min call
          <ArrowRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-500 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
