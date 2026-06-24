"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock } from "lucide-react";

const field =
  "w-full rounded-xl border border-white/10 bg-elevate px-4 py-3 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        role?: "client" | "agency";
        error?: string;
      };
      if (!res.ok || !data.role) {
        throw new Error(data.error ?? "Sign-in failed");
      }
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      const dest =
        next && next.startsWith("/portal/")
          ? next
          : data.role === "client"
            ? "/portal/client"
            : "/portal/agency";
      router.replace(dest);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setLoading(false);
    }
  }

  function fill(role: "client" | "agency") {
    setEmail(`${role}@demo.sitelytc.com`);
    setPassword("demo12345");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-200">Email</label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-200">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={field}
        />
      </div>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 text-sm font-semibold text-ink-950 shadow-[0_4px_24px_-6px_rgba(224,168,46,0.6)] transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            Sign in <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="rounded-xl border border-white/10 bg-elevate/60 p-3 text-xs text-ink-400">
        <p className="flex items-center gap-1.5 font-medium text-ink-300">
          <Lock className="h-3.5 w-3.5 text-gold-300" /> Demo accounts
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => fill("client")}
            className="rounded-lg border border-white/10 px-2.5 py-1 text-ink-300 transition-colors hover:border-gold-400/40 hover:text-white"
          >
            Use client demo
          </button>
          <button
            type="button"
            onClick={() => fill("agency")}
            className="rounded-lg border border-white/10 px-2.5 py-1 text-ink-300 transition-colors hover:border-gold-400/40 hover:text-white"
          >
            Use agency demo
          </button>
        </div>
      </div>
    </form>
  );
}
