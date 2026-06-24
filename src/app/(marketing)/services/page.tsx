import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Code2, Bot, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { StickyCTA } from "@/components/services/StickyCTA";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design & development, AI automation, and cybersecurity audits — three disciplines engineered to one standard of precision. Transparent, tiered pricing.",
  alternates: { canonical: "/services" },
};

type Tier = {
  name: string;
  price: string;
  note: string;
  features: string[];
  highlighted?: boolean;
};

type Vertical = {
  id: string;
  icon: typeof Code2;
  kicker: string;
  title: string;
  summary: string;
  deliverables: string[];
  tiers: Tier[];
  footnote?: { label: string; href: string };
};

const verticals: Vertical[] = [
  {
    id: "web",
    icon: Code2,
    kicker: "Web Design & Development",
    title: "Websites that load in under 2 seconds. Built to convert.",
    summary:
      "Design and Next.js development in-house — never templated. Engineered for speed, SEO, and conversion, hardened before launch.",
    deliverables: [
      "Custom design system + responsive build",
      "Next.js 15, TypeScript, Core Web Vitals 95+",
      "On-page SEO + structured data",
      "Security headers + CAPTCHA on all forms",
      "Analytics + CMS handover",
    ],
    tiers: [
      {
        name: "Starter",
        price: "₹60,000",
        note: "Marketing site, up to 6 pages",
        features: ["Up to 6 pages", "Contact form + CRM", "Basic SEO", "2-week delivery"],
      },
      {
        name: "Growth",
        price: "₹1,50,000",
        note: "Web app or store with integrations",
        features: [
          "Up to 15 pages / app screens",
          "Payments (Razorpay + Stripe)",
          "Blog / CMS + case studies",
          "VAPT pass before launch",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        note: "Complex SaaS / e-commerce",
        features: ["Unlimited scope", "Dedicated architecture", "SLA + retainer", "Priority support"],
      },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    kicker: "AI Automation — Kritvia",
    title: "Automation that runs your operations while you sleep.",
    summary:
      "Multi-agent automation and process digitalisation on the Kritvia AIBOS infrastructure. Connect your tools, define your workflows, let agents run.",
    deliverables: [
      "Workflow discovery + automation map",
      "Multi-agent orchestration setup",
      "Tool & data integrations",
      "Sandboxed execution + audit logs",
      "Dashboards + handover training",
    ],
    tiers: [
      {
        name: "Pilot",
        price: "₹50,000",
        note: "Automate one workflow",
        features: ["1 workflow automated", "Up to 3 integrations", "Setup + training", "30-day support"],
      },
      {
        name: "Scale",
        price: "₹1,25,000",
        note: "Multi-workflow operations",
        features: ["Up to 4 workflows", "Custom agents", "Dashboards & reporting", "Priority support"],
        highlighted: true,
      },
      {
        name: "Platform",
        price: "Custom",
        note: "Full AIBOS deployment",
        features: ["Org-wide automation", "Dedicated infrastructure", "SLA + retainer", "Roadmap partnership"],
      },
    ],
    footnote: { label: "Explore Kritvia", href: "/kritvia" },
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    kicker: "Cybersecurity Audits",
    title: "Reports that fix real vulnerabilities. Not a PDF to tick a box.",
    summary:
      "VAPT, ISO 27001 readiness, and GDPR/DPDPA compliance — scoped, scored, and remediated. Full package details and direct checkout on the cybersecurity page.",
    deliverables: [
      "OWASP Top 10 + API Top 10 testing",
      "CVSS-scored findings + remediation",
      "ISO 27001:2022 gap analysis",
      "GDPR / DPDPA 2023 compliance",
      "Re-test after fixes (Growth+)",
    ],
    tiers: [
      {
        name: "VAPT",
        price: "From ₹25,000",
        note: "Vulnerability & penetration testing",
        features: ["OWASP Top 10", "Executive + technical report", "Remediation checklist", "3–5 day delivery"],
      },
      {
        name: "ISO 27001",
        price: "From ₹40,000",
        note: "Readiness & gap analysis",
        features: ["114 controls assessed", "Risk register", "Policy templates", "Retainer option"],
        highlighted: true,
      },
      {
        name: "GDPR / DPDPA",
        price: "From ₹25,000",
        note: "Data protection compliance",
        features: ["Data-flow mapping", "Privacy notices", "DSR process", "Breach plan"],
      },
    ],
    footnote: { label: "See full packages & checkout", href: "/cybersecurity" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: verticals.map((v, i) => ({
    "@type": "Service",
    position: i + 1,
    name: v.kicker,
    description: v.summary,
    provider: { "@type": "Organization", name: site.name },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">
            What we build
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Three disciplines. One standard of precision.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            Most agencies do one thing. We engineer web, AI, and security so they
            move together — with transparent, tiered pricing and no hidden fees.
          </p>
        </Container>
      </section>

      {verticals.map((v, idx) => (
        <section
          key={v.id}
          id={v.id}
          className={cn("reveal", idx % 2 === 1 ? "bg-elevate" : "bg-surface", "py-20 sm:py-24")}
        >
          <Container>
            <div
              className={cn(
                "grid items-start gap-12 lg:grid-cols-2",
                idx % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              {/* Copy + deliverables */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                  <v.icon className="h-3.5 w-3.5" />
                  {v.kicker}
                </span>
                <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-white">
                  {v.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-300">
                  {v.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {v.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                      <span className="text-ink-200">{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href={`/services/${v.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300"
                  >
                    Deep dive: {v.kicker}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {v.footnote ? (
                  <Link
                    href={v.footnote.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300"
                  >
                    {v.footnote.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              {/* Pricing tiers */}
              <div className="grid gap-4 sm:grid-cols-3">
                {v.tiers.map((t) => (
                  <div
                    key={t.name}
                    className={cn(
                      "flex flex-col rounded-2xl border p-5",
                      t.highlighted
                        ? "border-gold-500 bg-surface shadow-md ring-1 ring-brand-600"
                        : "border-white/10 bg-surface",
                    )}
                  >
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{t.price}</p>
                    <p className="mt-1 text-xs text-ink-400">{t.note}</p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="reveal bg-ink-950">
        <Container className="py-20 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tell us what you're building.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-300">
            Send a brief or book a call — we'll recommend the right service and
            send a fixed-price proposal within 48 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Send a Brief <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={site.calendly}
              external
              size="lg"
              className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15"
            >
              Book a Call
            </ButtonLink>
          </div>
        </Container>
      </section>

      <StickyCTA />
    </>
  );
}
