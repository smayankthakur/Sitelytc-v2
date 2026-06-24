import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Scale,
  Radar,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BuyButton } from "@/components/cybersecurity/BuyButton";
import { HealthCheckForm } from "@/components/cybersecurity/HealthCheckForm";
import { packages, formatINR, type PackageId } from "@/lib/packages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Audits — VAPT, ISO 27001, SOC 2, GDPR & DPDPA",
  description:
    "Penetration testing, compliance readiness (ISO 27001, SOC 2, PCI-DSS, HIPAA), GDPR/DPDPA data-privacy audits, managed SOC, and security training. Every finding scored on CVSS with a step-by-step fix.",
  alternates: { canonical: "/cybersecurity" },
};

type Buyable = { id: PackageId; label: string };

type Pkg = {
  icon: typeof ShieldCheck;
  kicker: string;
  title: string;
  blurb: string;
  scope: string[];
  deliverables: string[];
  /** Fixed-price options. Omit for retainer/quote-led offerings. */
  buy?: Buyable[];
  /** Shown under the buy panel; also used as the CTA copy when `buy` is absent. */
  custom?: string;
};

const buyable = (id: PackageId, prefix: string): Buyable => ({
  id,
  label: `${prefix} — ${formatINR(packages[id].amountPaise)}`,
});

const pkgs: Pkg[] = [
  {
    icon: ShieldCheck,
    kicker: "Package 1 · VAPT",
    title: "Vulnerability Assessment & Penetration Testing",
    blurb:
      "For startups and SMBs handling payments or user data. Black-box and grey-box testing against the OWASP Top 10 and API Top 10.",
    scope: [
      "OWASP Top 10 + OWASP API Top 10",
      "Authentication & session management",
      "Business-logic vulnerabilities",
      "SSL/TLS & security-header configuration",
    ],
    deliverables: [
      "Executive summary (1 page, non-technical)",
      "CVSS v3.1-scored technical findings",
      "Prioritised remediation checklist",
      "Re-test after fixes (Growth+)",
    ],
    buy: [buyable("vapt-starter", "Starter"), buyable("vapt-growth", "Growth")],
    custom: "Enterprise (complex SaaS / e-commerce): custom scope, 7–14 days.",
  },
  {
    icon: FileSearch,
    kicker: "Package 2 · Audit & Compliance Readiness",
    title: "ISO 27001 · SOC 2 · PCI-DSS · HIPAA",
    blurb:
      "Get audit-ready for the framework your buyers, partners, or regulators expect — gap assessment, control mapping, and a clear roadmap to certification.",
    scope: [
      "Gap analysis vs the target framework",
      "Risk register + Statement of Applicability (ISO)",
      "Control mapping + evidence-collection plan (SOC 2)",
      "Scope & segmentation review (PCI-DSS) · safeguards (HIPAA)",
    ],
    deliverables: [
      "Policy templates (AUP, Access Control, IR, BCDR)",
      "Readiness report + remediation roadmap",
      "Pre-audit support (optional retainer)",
      "Gap analysis in ~1 week; full readiness 4–6 weeks",
    ],
    buy: [
      buyable("iso-gap", "ISO 27001 Gap"),
      buyable("iso-full", "ISO 27001 Full"),
      buyable("soc2-gap", "SOC 2 Readiness"),
      buyable("pci-dss", "PCI-DSS"),
      buyable("hipaa", "HIPAA"),
    ],
    custom: "Multi-framework or audit liaison: advisory retainer from ₹30,000/month.",
  },
  {
    icon: Scale,
    kicker: "Package 3 · Data Privacy",
    title: "GDPR / DPDPA 2023 Compliance",
    blurb:
      "For businesses handling EU user data (GDPR) or any Indian business collecting personal data (DPDPA 2023).",
    scope: [
      "Data-flow mapping (collection → storage → access → retention)",
      "Lawful-basis assessment per activity",
      "Cookie audit + consent review",
      "Data-subject-rights (DSR) process",
    ],
    deliverables: [
      "Privacy Policy + Cookie Policy drafting",
      "Data-breach response plan",
      "DPDPA 2023 / GDPR compliance checklist",
      "5–7 business days per audit",
    ],
    buy: [
      buyable("gdpr", "GDPR"),
      buyable("dpdpa", "DPDPA"),
      buyable("compliance-combined", "Combined"),
    ],
  },
  {
    icon: Radar,
    kicker: "Package 4 · Managed Security",
    title: "Managed SOC — Monitoring & Incident Response",
    blurb:
      "Ongoing protection after the audit. Continuous monitoring, threat detection, and a defined incident-response retainer so you're not facing an attack alone.",
    scope: [
      "24/7 log & threat monitoring",
      "Vulnerability management & patch advisories",
      "Quarterly re-tests + posture reporting",
      "Defined incident-response SLA",
    ],
    deliverables: [
      "Monthly security posture report",
      "Real-time alerting & triage",
      "Incident-response runbook + on-call",
      "Priced as a monthly retainer (scope-dependent)",
    ],
    // Retainer / quote-led — no fixed checkout.
    custom: "Retainers start from ₹40,000/month. Book a scoping call for a quote.",
  },
  {
    icon: GraduationCap,
    kicker: "Package 5 · Training & IR",
    title: "Security Awareness Training & IR Planning",
    blurb:
      "Your team is the largest attack surface. Train them, simulate real phishing, and have a tested plan for when something gets through.",
    scope: [
      "Security-awareness training (live or async)",
      "Simulated phishing campaign + reporting",
      "Incident-response plan & tabletop exercise",
      "Role-based guidance for devs & ops",
    ],
    deliverables: [
      "Training session + recordings",
      "Phishing-simulation results & benchmarks",
      "Incident-response playbook",
      "Per-engagement (team-size dependent)",
    ],
    buy: [buyable("training-ir", "Engagement")],
    custom: "Org-wide rollout or recurring programmes: talk to us.",
  },
];

const badges = [
  "OWASP",
  "ISO 27001",
  "SOC 2",
  "PCI-DSS",
  "HIPAA",
  "GDPR",
  "DPDPA 2023",
  "NIST",
];

const matrix: { framework: string; who: string; receive: string }[] = [
  {
    framework: "ISO 27001:2022",
    who: "Selling into enterprise procurement; EU/US expansion",
    receive: "Gap analysis, risk register, SoA, ISMS policy pack",
  },
  {
    framework: "SOC 2 (Type I/II)",
    who: "SaaS serving US enterprise buyers",
    receive: "Trust-criteria gap, control mapping, evidence plan",
  },
  {
    framework: "PCI-DSS",
    who: "Anyone storing or processing card payments",
    receive: "Scope definition, SAQ guidance, segmentation review",
  },
  {
    framework: "HIPAA",
    who: "Healthcare / health-data handlers",
    receive: "Security-rule risk analysis, safeguards, BAA templates",
  },
  {
    framework: "GDPR",
    who: "Any business handling EU personal data",
    receive: "Data mapping, lawful-basis, DSR & breach process",
  },
  {
    framework: "DPDPA 2023",
    who: "Any Indian business collecting personal data",
    receive: "Consent & notice review, DSR process, checklist",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Cybersecurity Audit & Compliance",
  provider: { "@type": "Organization", name: site.name },
  areaServed: ["IN", "EU", "US"],
  description:
    "VAPT, compliance readiness (ISO 27001, SOC 2, PCI-DSS, HIPAA), GDPR/DPDPA 2023 data-privacy audits, managed SOC, and security training — CVSS-scored findings with step-by-step remediation.",
};

export default function CybersecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hook header */}
      <section className="reveal relative overflow-hidden bg-ink-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-1/4 top-[-30%] h-[36rem] w-[36rem] rounded-full bg-brand-600/20 blur-3xl" />
        </div>
        <Container className="relative py-24 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              OWASP-aligned · CVSS-scored · ISO 27001 · SOC 2 · DPDPA 2023
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Most websites have at least one exploitable vulnerability. Does
              yours?
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-300">
              We don't send you a 5-page PDF with generic advice. Every finding
              includes the exact line of code, the CVSS severity score, and a
              step-by-step fix — from a one-off pen test to ongoing managed
              security.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#health-check" size="lg">
                Get a free security score <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={site.calendly}
                external
                size="lg"
                variant="secondary"
              >
                Book a security call
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Package cards */}
      <section className="reveal py-20 sm:py-24">
        <Container>
          <div className="space-y-8">
            {pkgs.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-surface p-7 shadow-sm sm:p-9"
              >
                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                      <p.icon className="h-3.5 w-3.5" />
                      {p.kicker}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-ink-300">{p.blurb}</p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                          What we cover
                        </p>
                        <ul className="mt-3 space-y-2">
                          {p.scope.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm text-ink-200">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                          You receive
                        </p>
                        <ul className="mt-3 space-y-2">
                          {p.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm text-ink-200">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Buy / enquire panel */}
                  <div className="flex flex-col justify-center gap-3 rounded-xl bg-elevate p-6">
                    {p.buy ? (
                      <>
                        {p.buy.map((b) => (
                          <BuyButton
                            key={b.id}
                            packageId={b.id}
                            label={b.label}
                            className="w-full"
                          />
                        ))}
                        {p.custom ? (
                          <p className="mt-1 text-xs leading-relaxed text-ink-400">
                            {p.custom}{" "}
                            <Link href="/contact" className="font-medium text-gold-300 hover:underline">
                              Talk to us →
                            </Link>
                          </p>
                        ) : null}
                        <p className="text-[11px] text-ink-500">
                          Prices exclude GST. Secure checkout via Razorpay / Stripe.
                        </p>
                      </>
                    ) : (
                      <>
                        <ButtonLink
                          href={site.calendly}
                          external
                          size="md"
                          className="w-full"
                        >
                          Book a scoping call <ArrowRight className="h-4 w-4" />
                        </ButtonLink>
                        {p.custom ? (
                          <p className="mt-1 text-xs leading-relaxed text-ink-400">
                            {p.custom}
                          </p>
                        ) : null}
                        <Link
                          href="/contact"
                          className="text-center text-xs font-medium text-gold-300 hover:underline"
                        >
                          Or send us the details →
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Compliance matrix */}
      <section className="reveal bg-ink-950 py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">
              Compliance matrix
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Which framework do you actually need?
            </h2>
            <p className="mt-4 text-lg text-ink-300">
              Pick by the buyer or regulator in front of you. Every readiness
              engagement ends with a branded report and a tracked remediation plan.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface text-ink-300">
                  <th className="px-5 py-4 font-semibold">Framework</th>
                  <th className="px-5 py-4 font-semibold">Who it's for</th>
                  <th className="px-5 py-4 font-semibold">What you receive</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((m) => (
                  <tr key={m.framework} className="border-t border-white/10">
                    <td className="px-5 py-4 font-semibold text-white">{m.framework}</td>
                    <td className="px-5 py-4 text-ink-300">{m.who}</td>
                    <td className="px-5 py-4 text-ink-200">{m.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-500">
            Note: SOC 2 attestation and PCI ASV scans are delivered with licensed
            audit partners. We get you fully ready and manage the engagement.
          </p>
        </Container>
      </section>

      {/* Lead magnet */}
      <section id="health-check" className="reveal bg-elevate py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Not ready to commit? Start with a free score.
              </h2>
              <p className="mt-4 text-lg text-ink-300">
                Enter your URL and we'll run an automated check across Mozilla
                Observatory, SSL Labs, and your security headers — then send a
                branded report within 5 minutes.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "No sales call required",
                  "Plain-English findings, ranked by severity",
                  "A clear next step if anything needs fixing",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink-200">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <HealthCheckForm />
          </div>
        </Container>
      </section>

      {/* Trust + badge wall */}
      <section className="reveal py-16">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-500">
            Aligned with the standards that matter
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-xl border border-white/10 bg-surface px-6 py-3 text-lg font-bold text-ink-200"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gold-500/30 bg-gold-500/10 p-7 text-center">
            <p className="text-lg font-semibold text-white">
              We secured our own site before yours.
            </p>
            <p className="mt-2 text-ink-300">
              Read the self-VAPT we ran on sitelytc.com before launch — every
              check, every fix.
            </p>
            <Link
              href="/blog/self-vapt-sitelytc"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300"
            >
              Read the self-VAPT case study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
