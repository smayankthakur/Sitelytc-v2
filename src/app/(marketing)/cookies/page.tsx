import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Sitelytc uses cookies — essential only by default, analytics and marketing strictly consent-gated under GDPR and India's DPDPA 2023.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: false },
};

const updated = "June 2026";

const rows = [
  ["__sl_consent", "Essential", "Stores your cookie-consent choices", "6 months"],
  ["__sl_session", "Essential", "Maintains a secure session / CSRF protection", "Session"],
  ["__cf_bm / cf_clearance", "Essential", "Cloudflare bot & DDoS protection", "Up to 30 min"],
  ["_ga / _ga_*", "Analytics (consent)", "Google Analytics 4 — aggregate usage", "Up to 13 months"],
  ["va-* (Vercel)", "Analytics (consent)", "Cookieless performance metrics", "n/a"],
];

export default function CookiePage() {
  return (
    <section className="reveal py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-ink-200">
          <Block title="What cookies are">
            <p>
              Cookies are small text files stored on your device. {site.name}{" "}
              uses them sparingly — only what&apos;s needed to run the site
              securely, plus optional analytics that load <em>only</em> after you
              consent.
            </p>
          </Block>

          <Block title="Categories we use">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Strictly necessary</strong> — security, session, and
                consent storage. These cannot be switched off.
              </li>
              <li>
                <strong>Analytics</strong> — help us understand aggregate usage.
                Loaded only with your consent (Google Consent Mode v2).
              </li>
              <li>
                <strong>Marketing</strong> — not used today. If introduced, they
                will be consent-gated and listed here first.
              </li>
            </ul>
          </Block>

          <Block title="Cookies at a glance">
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-surface text-ink-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cookie</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]} className="border-t border-white/10">
                      <td className="px-4 py-3 font-mono text-xs text-white">{r[0]}</td>
                      <td className="px-4 py-3 text-ink-300">{r[1]}</td>
                      <td className="px-4 py-3 text-ink-300">{r[2]}</td>
                      <td className="px-4 py-3 text-ink-400">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <Block title="Managing your choices">
            <p>
              You can accept or reject non-essential cookies via our consent
              banner, and change your choice anytime by clearing the{" "}
              <code className="text-ink-300">__sl_consent</code> cookie or using
              your browser settings. Blocking essential cookies may break parts
              of the site.
            </p>
          </Block>

          <Block title="Legal basis">
            <p>
              Consent for analytics and marketing cookies; legitimate interest /
              necessity for essential cookies — consistent with the EU GDPR and
              India&apos;s DPDPA 2023. See our{" "}
              <a className="font-medium text-gold-300 hover:underline" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </Block>
        </div>
      </Container>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}
