"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const COOKIE = "__sl_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`));
  const val = match?.split("=")[1];
  return val === "granted" || val === "denied" ? val : null;
}

function writeChoice(value: Choice) {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${MAX_AGE}; samesite=lax`;
}

/**
 * Loads GA4 ONLY after analytics consent is granted. Scripts carry the document
 * CSP nonce so they pass the nonce-based policy. Without a GA id (keyless dev),
 * nothing loads — the banner still records the choice.
 */
function loadGA(gaId: string, nonce?: string) {
  const w = window as unknown as {
    __sl_ga_loaded?: boolean;
    dataLayer?: unknown[];
  };
  if (w.__sl_ga_loaded || !gaId) return;
  w.__sl_ga_loaded = true;

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  if (nonce) tag.nonce = nonce;
  document.head.appendChild(tag);

  const init = document.createElement("script");
  if (nonce) init.nonce = nonce;
  init.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('consent', 'default', { analytics_storage: 'granted' });
    gtag('config', '${gaId}', { anonymize_ip: true });
  `;
  document.head.appendChild(init);
}

export function ConsentBanner({
  gaId,
  nonce,
}: {
  gaId?: string;
  nonce?: string;
}) {
  // undefined = cookie not read yet (SSR + first paint → render nothing).
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    const existing = readChoice();
    setChoice(existing);
    if (existing === "granted" && gaId) loadGA(gaId, nonce);
  }, [gaId, nonce]);

  function decide(value: Choice) {
    writeChoice(value);
    setChoice(value);
    if (value === "granted" && gaId) loadGA(gaId, nonce);
  }

  // Not yet read, or already decided → no banner.
  if (choice === undefined || choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="consent-pop fixed inset-x-4 bottom-4 z-50 sm:left-6 sm:right-auto sm:max-w-md"
    >
      <div className="rounded-2xl border border-white/10 bg-surface/95 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-500/10 text-gold-300">
            <Cookie className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">We value your privacy</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-300">
              We use essential cookies to run the site. With your consent we also
              use analytics to improve it. See our{" "}
              <Link href="/cookies" className="text-gold-300 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => decide("granted")}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 text-sm font-semibold text-ink-950 transition hover:brightness-110"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-white/5 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/10"
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </div>
  );
}
