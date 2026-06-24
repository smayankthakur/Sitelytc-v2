import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getPortalSession } from "@/lib/portal-session";
import {
  agencyClients,
  agencyPipeline,
  agencyStats,
} from "@/lib/portal-data";

export const metadata: Metadata = {
  title: "Agency Portal",
  robots: { index: false, follow: false },
};

const healthStyles: Record<string, string> = {
  Good: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Attention: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  "At risk": "bg-red-500/15 text-red-300 ring-red-500/30",
};

export default async function AgencyPortalPage() {
  const session = await getPortalSession();
  if (!session || session.role !== "agency") redirect("/portal/login");
  return (
    <PortalShell
      role="agency"
      title="Agency dashboard"
      user={{ name: session.name, org: session.org }}
    >
      {/* Stats */}
      <section className="reveal">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agencyStats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-d${i + 1} card-lift rounded-2xl border border-white/10 bg-surface p-6`}
            >
              <p className="text-3xl font-bold text-gradient-gold">{s.value}</p>
              <p className="mt-1 text-xs text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section id="pipeline" className="reveal scroll-mt-24">
        <h2 className="text-lg font-semibold text-white">Pipeline</h2>
        <p className="mt-1 text-sm text-ink-400">Shared deal flow across your book.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agencyPipeline.map((p, i) => (
            <div
              key={p.stage}
              className={`reveal reveal-d${i + 1} rounded-2xl border border-white/10 bg-surface p-5`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{p.stage}</p>
                <span className="rounded-full bg-brand-600/20 px-2.5 py-0.5 text-xs font-semibold text-brand-200">
                  {p.count}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-white">{p.value}</p>
              <p className="text-xs text-ink-500">pipeline value</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="reveal scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Clients</h2>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-300">
            <Plus className="h-3.5 w-3.5" /> Add client
          </span>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-ink-300">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Health</th>
                <th className="px-5 py-3 font-semibold">MRR</th>
              </tr>
            </thead>
            <tbody>
              {agencyClients.map((c) => (
                <tr key={c.name} className="border-t border-white/10 transition-colors hover:bg-white/5">
                  <td className="px-5 py-3 font-medium text-white">{c.name}</td>
                  <td className="px-5 py-3 text-ink-300">{c.plan}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${healthStyles[c.health] ?? healthStyles.Good}`}
                    >
                      {c.health}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-white">{c.mrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="reveal">
        <div className="rounded-2xl border border-brand-500/30 bg-brand-600/10 p-6 text-sm text-ink-300">
          <span className="font-semibold text-white">Demo data.</span> Real auth
          (Clerk: passkeys + MFA + SSO), role-based access, and a Neon/Drizzle
          database are the next wiring step — the UI is production-ready.
        </div>
      </section>
    </PortalShell>
  );
}
