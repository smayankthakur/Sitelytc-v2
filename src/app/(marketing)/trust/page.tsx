import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  Server,
  Bug,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Trust Center — Security & Compliance",
  description:
    "How Sitelytc secures its own platform: hardened HTTP headers, nonce-based CSP, input validation, rate limiting, privacy-by-design, and responsible disclosure.",
  alternates: { canonical: "/trust" },
};

const posture = [
  {
    icon: Lock,
    title: "Encryption & transport",
    points: [
      "TLS 1.3 with HSTS (includeSubDomains, preload)",
      "Automatic certificate management",
      "Secrets stored server-side only — never in the client bundle",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Application hardening",
    points: [
      "Nonce-based Content-Security-Policy (no unsafe-inline)",
      "Full header set: X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors 'none'",
      "Zod input validation on every API route + output sanitisation",
    ],
  },
  {
    icon: Server,
    title: "Abuse prevention",
    points: [
      "Per-IP rate limiting on contact, payment, and lead endpoints",
      "Turnstile (privacy-friendly) challenge + honeypot on forms",
      "Webhook signature verification for all payment events",
    ],
  },
];

const compliance = [
  { name: "ISO 9001", status: "Certified", note: "Quality management" },
  { name: "DPDPA 2023", status: "Compliant", note: "India data-protection" },
  { name: "GDPR", status: "Aligned", note: "EU personal-data handling" },
  { name: "OWASP", status: "Self-tested", note: "Top 10 + API Top 10 pass before launch" },
];

const subprocessors = [
  { name: "Vercel", purpose: "Hosting & edge delivery" },
  { name: "Cloudflare", purpose: "DNS, WAF & DDoS protection" },
  { name: "Razorpay / Stripe", purpose: "Payment processing (no card data stored by us)" },
  { name: "HubSpot", purpose: "CRM & lead management" },
  { name: "Upstash", purpose: "Rate-limiting store" },
];

export default function TrustPage() {
  return (
    <>
      {/* Hero */}
      <section className="reveal relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-[-30%] h-[34rem] w-[34rem] rounded-full bg-brand-600/20 blur-3xl" />
        </div>
        <Container className="relative py-24 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Trust Center
          </span>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            We secure our own platform the way we secure yours.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-300">
            Selling security audits means holding ourselves to the same bar. Here
            is exactly how this site is built, hardened, and monitored — and how
            to report an issue if you find one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/blog/self-vapt-sitelytc" size="lg">
              Read our self-VAPT <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/cybersecurity" size="lg" variant="secondary">
              Our security services
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Posture */}
      <Section>
        <SectionHeading
          eyebrow="Security posture"
          title="What's in place, in plain terms."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posture.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-surface p-7">
              <p.icon className="h-6 w-6 text-gold-300" />
              <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="text-sm leading-relaxed text-ink-300">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Compliance */}
      <Section className="bg-elevate">
        <SectionHeading
          eyebrow="Compliance"
          title="Standards we hold ourselves to."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compliance.map((c) => (
            <div key={c.name} className="rounded-2xl border border-white/10 bg-surface p-6">
              <p className="text-lg font-bold text-white">{c.name}</p>
              <p className="mt-1 inline-block rounded-full bg-gold-500/10 px-3 py-0.5 text-xs font-semibold text-gold-300">
                {c.status}
              </p>
              <p className="mt-3 text-sm text-ink-400">{c.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Data handling + sub-processors */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Your data" title="Privacy by design." />
            <ul className="mt-6 space-y-3 text-ink-300">
              <li className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                We collect only what a request needs, store it in the EU/India
                region, and never sell it.
              </li>
              <li className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                You can request access or deletion of your data at any time —
                see our{" "}
                <Link href="/privacy" className="text-gold-300 hover:underline">
                  Privacy Policy
                </Link>
                .
              </li>
              <li className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                Cookie use is minimal and consent-gated for analytics.
              </li>
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Sub-processors" title="Who we rely on." />
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {subprocessors.map((s) => (
                    <tr key={s.name} className="border-b border-white/10 last:border-0">
                      <td className="px-5 py-3 font-semibold text-white">{s.name}</td>
                      <td className="px-5 py-3 text-ink-300">{s.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Responsible disclosure */}
      <Section className="bg-elevate">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-surface p-8 text-center sm:p-10">
          <Bug className="mx-auto h-7 w-7 text-gold-300" />
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-white">
            Found a vulnerability?
          </h2>
          <p className="mt-3 text-ink-300">
            We welcome responsible disclosure. Email{" "}
            <a
              href="mailto:security@sitelytc.com"
              className="font-semibold text-gold-300 hover:underline"
            >
              security@sitelytc.com
            </a>{" "}
            with details and steps to reproduce. We aim to acknowledge within 48
            hours and will credit valid reports.
          </p>
          <p className="mt-4 text-xs text-ink-500">
            A machine-readable policy is published at{" "}
            <code className="text-ink-300">/.well-known/security.txt</code>.
          </p>
        </div>
      </Section>
    </>
  );
}
