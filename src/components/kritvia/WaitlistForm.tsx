"use client";

import { useState } from "react";
import { Loader2, CircleCheck } from "lucide-react";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [automation, setAutomation] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, automation }),
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
      <div className="rounded-2xl border border-accent-500/30 bg-surface p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-500/10 text-accent-400">
          <CircleCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-white">You're on the list.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-300">
          We'll be in touch as Kritvia opens up. Thanks for your interest
          {name ? `, ${name.split(" ")[0]}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-white">Join the waitlist</h3>
      <p className="mt-1 text-sm text-ink-300">
        Be first to access Kritvia when it opens.
      </p>

      <div className="mt-5 space-y-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
          aria-label="Name"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
          aria-label="Email"
        />
        <textarea
          required
          rows={3}
          value={automation}
          onChange={(e) => setAutomation(e.target.value)}
          placeholder="What would you automate first?"
          className={`${inputClass} resize-y`}
          aria-label="What would you automate first?"
        />
      </div>

      {error ? (
        <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Joining…
          </>
        ) : (
          "Request access"
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
