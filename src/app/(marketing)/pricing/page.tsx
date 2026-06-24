import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { BuyButton } from "@/components/cybersecurity/BuyButton";
import { packages, formatINR, type PackageId } from "@/lib/packages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Web, Security & AI",
  description:
    "Transparent pricing for web engineering, fixed-price cybersecurity audits, and Kritvia AI automation. Fixed packages where it makes sense, scoped quotes where it doesn't.",
  alternates: { canonical: "/pricing" },
};

// Web/engineering tiers are scoped per project; figures are indicative starting points.
const webTiers = [
  {
    name: "Launch",
    price: "from ₹60,000",
    blurb: "A fast, polished marketing site for early-stage brands.",
    features: [
      "Up to 6 pages on Next.js",
      "Responsive, dark-or-light design system",
      "SEO, analytics & contact integration",
      "Security headers + form protection",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "from ₹1,50,000",
    blurb: "A conversion-focused site or web app with real functionality.",
    features: [
      "Custom web app (auth, dashboards, CMS)",
      "API & third-party integrations",
      "Performance-tuned (Core Web Vitals)",
      "CRM + payments wired in",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    blurb: "Complex platforms, portals, and ongoing engineering.",
    features: [
      "Multi-app / portal architecture",
      "Dedicated engineering retainer",
      "SLA-backed support & monitoring",
      "Quarterly security re-tests",
    ],
    highlighted: false,
  },
];

const securityPicks: { id: PackageId; label: string }[] = [
  { id: "vapt-starter", label: "VAPT — Starter" },
  { id: "vapt-growth", label: "VAPT — Growth" },
  { id: "iso-gap", label: "ISO 27001 — Gap" },
  { id: "gdpr", label: "GDPR Audit" },
  { id: "dpdpa", label: "DPDPA Audit" },
  { id: "training-ir", label: "Training & IR" },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing built like our work — clear and honest.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            Fixed prices where the scope is known (security audits), scoped quotes
            where it isn&apos;t (custom engineering). No hidden retainers, no
            surprise invoices.
          </p>
        </Container>
      </section>

      {/* Web tiers */}
      <Section>
        <SectionHeading
          eyebrow="Web & Engineering"
          title="Project-based, scoped to your goals."
          lede="Indicative starting points — final pricing follows a short discovery call."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {webTiers.map((t) => (
            <div
              key={t.name}
              className={
                "flex flex-col rounded-2xl border bg-surface p-7 " +
                (t.highlighted
                  ? "border-gold-500/40 ring-1 ring-gold-500/30"
                  : "border-white/10")
              }
            >
              {t.highlighted ? (
                <span className="mb-3 inline-block w-fit rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold text-white">{t.name}</h3>
              <p className="mt-2 text-2xl font-bold text-white">{t.price}</p>
              <p className="mt-2 text-sm text-ink-300">{t.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                className="mt-7 w-full"
                variant={t.highlighted ? "primary" : "secondary"}
              >
                Get a quote <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      {/* Security fixed packages */}
      <Section className="bg-elevate">
        <SectionHeading
          eyebrow="Cybersecurity"
          title="Fixed-price audits you can buy today."
          lede="Defined scope, defined deliverables, defined price. Secure checkout via Razorpay / Stripe."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPicks.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6"
            >
              <p className="font-semibold text-white">{p.label}</p>
              <p className="mt-1 text-2xl font-bold text-gold-300">
                {formatINR(packages[p.id].amountPaise)}
              </p>
              <p className="mt-2 flex-1 text-sm text-ink-400">
                {packages[p.id].description}
              </p>
              <BuyButton packageId={p.id} label="Buy now" className="mt-5 w-full" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-400">
          See the full breakdown, scope, and compliance matrix on the{" "}
          <Link href="/cybersecurity" className="text-gold-300 hover:underline">
            Cybersecurity page
          </Link>
          . Prices exclude GST.
        </p>
      </Section>

      {/* Kritvia */}
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-brand-500/30 bg-brand-600/10 p-8 text-center sm:p-10">
          <p className="eyebrow">
            AI Automation
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Kritvia is in early access.
          </h2>
          <p className="mt-3 text-ink-300">
            Pricing for the AI operating system is being finalised with our first
            cohort. Join the waitlist to lock in founding-member terms.
          </p>
          <ButtonLink href="/kritvia" size="lg" className="mt-6">
            Join the Kritvia waitlist <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-elevate" reveal>
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Not sure which fits?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-300">
            Tell us the goal and we&apos;ll recommend the smallest engagement that
            gets you there.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={site.calendly} external size="lg" variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
