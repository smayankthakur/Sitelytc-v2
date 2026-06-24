import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/portal/LoginForm";
import { getPortalSession } from "@/lib/portal-session";

export const metadata: Metadata = {
  title: "Portal Sign in",
  robots: { index: false, follow: false },
};

export default async function PortalLoginPage() {
  const session = await getPortalSession();
  if (session) {
    redirect(session.role === "client" ? "/portal/client" : "/portal/agency");
  }

  return (
    <section className="reveal relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[120px] animate-gradient-drift" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure sign-in
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-ink-400">
            Sign in to your Sitelytc portal.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-surface p-7 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
