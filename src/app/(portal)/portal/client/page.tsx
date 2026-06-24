import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FileDown, ShieldAlert } from "lucide-react";
import { PortalShell, SeverityBadge } from "@/components/portal/PortalShell";
import { getPortalSession } from "@/lib/portal-session";
import {
  clientEngagements,
  deliverables,
  findings,
  invoices,
} from "@/lib/portal-data";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  Open: "text-red-300",
  "Re-testing": "text-amber-300",
  Fixed: "text-emerald-300",
  Paid: "text-emerald-300",
  Due: "text-amber-300",
};

export default async function ClientPortalPage() {
  const session = await getPortalSession();
  if (!session || session.role !== "client") redirect("/portal/login");
  const openFindings = findings.filter((f) => f.status !== "Fixed").length;

  return (
    <PortalShell
      role="client"
      title="Your security dashboard"
      user={{ name: session.name, org: session.org }}
    >
      {/* Engagements */}
      <section className="reveal">
        <div className="grid gap-4 sm:grid-cols-3">
          {clientEngagements.map((e, i) => (
            <div
              key={e.name}
              className={`reveal reveal-d${i + 1} card-lift rounded-2xl border border-white/10 bg-surface p-6`}
            >
              <p className="text-sm font-semibold text-white">{e.name}</p>
              <p className="mt-1 text-xs text-ink-400">{e.status} · {e.due}</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
                  style={{ width: `${e.progress}%` }}
                />
              </div>
              <p className="mt-2 text-right text-xs text-ink-400">{e.progress}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="reveal scroll-mt-24">
        <h2 className="text-lg font-semibold text-white">Deliverables vault</h2>
        <p className="mt-1 text-sm text-ink-400">
          Signed, expiring download links. Your reports live here.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-ink-300">
              <tr>
                <th className="px-5 py-3 font-semibold">File</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Size</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {deliverables.map((d) => (
                <tr key={d.name} className="border-t border-white/10 transition-colors hover:bg-white/5">
                  <td className="px-5 py-3 font-medium text-white">{d.name}</td>
                  <td className="px-5 py-3 text-ink-300">{d.kind}</td>
                  <td className="px-5 py-3 text-ink-400">{d.date}</td>
                  <td className="px-5 py-3 text-ink-400">{d.size}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300">
                      <FileDown className="h-3.5 w-3.5" /> Download
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Findings / remediation tracker */}
      <section id="findings" className="reveal scroll-mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Remediation tracker</h2>
            <p className="mt-1 text-sm text-ink-400">
              {openFindings} of {findings.length} findings still need attention.
            </p>
          </div>
          <ShieldAlert className="h-6 w-6 text-gold-300" />
        </div>
        <div className="mt-5 space-y-3">
          {findings.map((f) => (
            <div
              key={f.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-surface px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-500">{f.id}</span>
                <span className="text-sm text-white">{f.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <SeverityBadge severity={f.severity} />
                <span className={`text-xs font-semibold ${statusStyles[f.status] ?? "text-ink-300"}`}>
                  {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Invoices */}
      <section id="invoices" className="reveal scroll-mt-24">
        <h2 className="text-lg font-semibold text-white">Invoices</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-ink-300">
              <tr>
                <th className="px-5 py-3 font-semibold">Invoice</th>
                <th className="px-5 py-3 font-semibold">Item</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-white/10 transition-colors hover:bg-white/5">
                  <td className="px-5 py-3 font-mono text-xs text-white">{inv.id}</td>
                  <td className="px-5 py-3 text-ink-200">{inv.item}</td>
                  <td className="px-5 py-3 font-semibold text-white">{inv.amount}</td>
                  <td className="px-5 py-3 text-ink-400">{inv.date}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold ${statusStyles[inv.status] ?? "text-ink-300"}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PortalShell>
  );
}
