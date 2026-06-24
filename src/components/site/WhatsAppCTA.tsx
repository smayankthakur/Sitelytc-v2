"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

const DISMISS_KEY = "sitelytc-wa-dismissed";

/**
 * Sticky WhatsApp CTA. Appears after the user scrolls past ~40% of the page,
 * and stays dismissed for the rest of the session (sessionStorage).
 */
export function WhatsAppCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // assume dismissed until checked

  useEffect(() => {
    const already = sessionStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(already);
    if (already) return;

    function onScroll() {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  if (dismissed || !visible) return null;

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Sitelytc, I'd like to discuss a project.",
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-4 pr-5 font-semibold text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat with us</span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss WhatsApp CTA"
        className="grid h-7 w-7 place-items-center rounded-full bg-surface/80 text-white shadow hover:bg-ink-900"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
