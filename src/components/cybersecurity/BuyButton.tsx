"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import type { PackageId } from "@/lib/packages";
import { cn } from "@/lib/utils";

/**
 * Requests a Razorpay payment link for a fixed-price package and redirects to
 * it. If checkout isn't available (e.g. keys not configured), falls back to the
 * contact page so the lead is never lost.
 */
export function BuyButton({
  packageId,
  label = "Get Started",
  className,
}: {
  packageId: PackageId;
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error ?? "Checkout unavailable");
    } catch {
      // Fail safe: route to contact with the package preselected.
      setError("Checkout is unavailable right now — let's set it up directly.");
      setTimeout(() => router.push(`/contact?package=${packageId}`), 1200);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={loading}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60",
          className,
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Starting…
          </>
        ) : (
          <>
            {label} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error ? (
        <p className="mt-2 text-xs text-ink-400">{error}</p>
      ) : null}
    </div>
  );
}
