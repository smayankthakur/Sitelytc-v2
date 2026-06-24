"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await fetch("/api/portal/logout", { method: "POST" }).catch(() => {});
    router.replace("/portal/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" /> {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
