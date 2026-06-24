import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, UserCircle, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Portals — Sign in",
  description: "Sitelytc client and agency portals.",
  robots: { index: false, follow: false },
};

const portals = [
  {
    href: "/portal/client",
    icon: UserCircle,
    title: "Client Portal",
    desc: "Track your engagements, download deliverables, follow your remediation plan, and view invoices.",
    points: ["Deliverables vault", "Findings & remediation tracker", "Invoices & payments"],
  },
  {
    href: "/portal/agency",
    icon: Users,
    title: "Agency Portal",
    desc: "Manage sub-accounts, your shared pipeline, client health, and referral commissions.",
    points: ["Client roster & health", "Sales pipeline", "Referrals & commission"],
  },
];

export default function PortalHubPage() {
  return (
    <section className="reveal relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[34rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[120px] animate-gradient-drift" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-8 sm:py-28">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
            <ShieldCheck className="h-3.5 w-3.5" /> MFA-protected · role-based access
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to Sitelytc Portals
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300">
            Choose your workspace and sign in. Demo accounts are available on the
            sign-in screen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portals.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className={`reveal reveal-d${i + 1} card-lift ring-glow group rounded-2xl border border-white/10 bg-surface p-8`}
            >
              <p.icon className="h-8 w-8 text-gold-300" />
              <h2 className="mt-5 text-xl font-bold text-white">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-ink-300">
                    <Lock className="h-3.5 w-3.5 text-gold-300" /> {pt}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                Sign in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
