"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, CircleCheck } from "lucide-react";

/** Lead-magnet capture: free automated security health check. */
export function HealthCheckForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/security-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-accent-500/30 bg-surface p-6 text-center sm:p-8">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-500/10 text-accent-400">
          <CircleCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Scan queued — check your inbox.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-300">
          Your branded security report lands within 5 minutes. We'll follow up
          with what we found and how to fix it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-2 text-gold-300">
        <ShieldCheck className="h-5 w-5" />
        <span className="text-sm font-semibold">Free security health check</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-white">
        Get your website's security score
      </h3>
      <p className="mt-1 text-sm text-ink-300">
        Mozilla Observatory + SSL Labs + security headers, in one branded PDF.
        No cost, no obligation.
      </p>

      <div className="mt-5 space-y-3">
        <input
          type="url"
          required
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourwebsite.com"
          className={inputClass}
          aria-label="Website URL"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
          aria-label="Email address"
        />
      </div>

      {error ? (
        <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Scanning…
          </>
        ) : (
          "Get my free score"
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink-500">
        We'll email your report. Unsubscribe anytime. DPDPA 2023 compliant.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
