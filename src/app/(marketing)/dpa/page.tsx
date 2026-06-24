import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Processing Addendum (DPA)",
  description:
    "Sitelytc's Data Processing Addendum — roles, scope, sub-processors, security measures, breach notification, and transfers under GDPR and India's DPDPA 2023.",
  alternates: { canonical: "/dpa" },
  robots: { index: true, follow: false },
};

const updated = "June 2026";

const subprocessors = [
  ["Vercel", "Hosting & edge delivery", "USA / global"],
  ["Cloudflare", "DNS, WAF, DDoS protection", "Global"],
  ["Razorpay", "Payments (India)", "India"],
  ["Stripe", "Payments (international)", "USA / EU"],
  ["HubSpot", "CRM & lead management", "USA / EU"],
  ["Upstash", "Rate-limiting store", "Global"],
];

export default function DpaPage() {
  return (
    <section className="reveal py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white">
          Data Processing Addendum
        </h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: {updated}</p>
        <p className="mt-6 leading-relaxed text-ink-300">
          This Addendum forms part of the agreement between {site.name} (“we”,
          the Processor) and the customer (“you”, the Controller) when we process
          personal data on your behalf. It is designed to satisfy Article 28 of
          the EU GDPR and the corresponding obligations under India&apos;s DPDPA
          2023. A countersigned PDF is available on request.
        </p>

        <div className="mt-8 space-y-8 text-ink-200">
          <Block title="1. Roles & scope">
            <p>
              You are the Controller and determine the purposes of processing; we
              are the Processor and act only on your documented instructions. We
              process personal data solely to provide the engaged services (web
              engineering, AI automation, and security/compliance work).
            </p>
          </Block>

          <Block title="2. Nature of data">
            <p>
              Depending on the engagement we may process contact details, account
              data, usage and log data, and any content within systems we are
              retained to build or audit. Special-category data is processed only
              where expressly agreed.
            </p>
          </Block>

          <Block title="3. Sub-processors">
            <p>We engage the following sub-processors, each under contract:</p>
            <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-surface text-ink-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Sub-processor</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {subprocessors.map((s) => (
                    <tr key={s[0]} className="border-t border-white/10">
                      <td className="px-4 py-3 font-semibold text-white">{s[0]}</td>
                      <td className="px-4 py-3 text-ink-300">{s[1]}</td>
                      <td className="px-4 py-3 text-ink-400">{s[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <Block title="4. Security measures">
            <p>
              We maintain technical and organisational measures including
              encryption in transit (TLS 1.3), least-privilege access with MFA,
              hardened application controls, rate limiting, audit logging, and a
              tested incident-response process. Details are on our{" "}
              <a className="font-medium text-gold-300 hover:underline" href="/trust">
                Trust Center
              </a>
              .
            </p>
          </Block>

          <Block title="5. Breach notification">
            <p>
              We will notify you without undue delay — and within 72 hours where
              feasible — after becoming aware of a personal-data breach affecting
              your data, with the information you need to meet your own
              obligations.
            </p>
          </Block>

          <Block title="6. Data subject requests">
            <p>
              We will assist you in responding to access, correction, deletion,
              and portability requests, and implement such requests on your
              instruction where the data sits in systems we operate.
            </p>
          </Block>

          <Block title="7. International transfers">
            <p>
              Where personal data is transferred outside its origin region, we
              rely on appropriate safeguards (e.g. Standard Contractual Clauses)
              and the sub-processor commitments above.
            </p>
          </Block>

          <Block title="8. Return & deletion">
            <p>
              On termination, we will return or delete personal data at your
              choice, save where retention is required by law.
            </p>
          </Block>

          <Block title="9. Audits">
            <p>
              We will make available the information necessary to demonstrate
              compliance and allow for reasonable audits, subject to
              confidentiality.
            </p>
          </Block>

          <Block title="Request a signed copy">
            <p>
              To execute this DPA, contact us via our{" "}
              <a className="font-medium text-gold-300 hover:underline" href="/contact">
                contact page
              </a>{" "}
              and we&apos;ll send a countersigned version.
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
