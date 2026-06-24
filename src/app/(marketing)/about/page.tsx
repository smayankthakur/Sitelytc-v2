import type { Metadata } from "next";
import { ArrowRight, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sitelytc is a precision-first digital studio founded by Mayank — engineering websites, AI automation, and security audits for startups in India and worldwide.",
  alternates: { canonical: "/about" },
};

const differentiators = [
  {
    icon: Cpu,
    title: "Engineering-first, not template-based",
    body: "Every site is designed and coded in-house on Next.js. No page builders, no bloated themes — just fast, maintainable software.",
  },
  {
    icon: ShieldCheck,
    title: "Security-native",
    body: "We run a self-VAPT pass on every build and ship hardened headers, validation, and rate limiting by default — not as an afterthought.",
  },
  {
    icon: Sparkles,
    title: "AI-powered",
    body: "We build on the same Kritvia AIBOS infrastructure we sell — so automation and intelligence are available to every client, not just enterprises.",
  },
];

const trust = [
  { label: "ISO 9001", value: "Quality management certified" },
  { label: "GSTIN", value: "Registered & GST compliant" },
  { label: "DPDPA 2023", value: "Data-protection compliant" },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "PostgreSQL",
  "Cloudflare",
  "Vercel",
];

export default function AboutPage() {
  return (
    <>
      {/* Founder story */}
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">
            About Sitelytc
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built on engineering discipline.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-300">
            <p>
              Sitelytc started with a simple frustration: too many agencies sell
              polish over substance — slow sites, insecure forms, and reports
              that never get acted on.
            </p>
            <p>
              Founded by Mayank, Sitelytc takes the opposite approach. We treat a
              website like software: measured, tested, and hardened. The result
              is precision digital architecture — work that performs, converts,
              and holds up under scrutiny.
            </p>
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="reveal py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            What makes us different
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-white/10 bg-surface p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500/10 text-gold-300">
                  <d.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust & compliance */}
      <section className="reveal bg-elevate py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Trust & compliance
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trust.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-white/10 bg-surface p-6 text-center"
              >
                <p className="text-xl font-bold text-white">{t.label}</p>
                <p className="mt-1 text-sm text-ink-300">{t.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-500">
            Registered company details and certification numbers available on
            request.
          </p>
        </Container>
      </section>

      {/* Stack */}
      <section className="reveal py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            The stack we build on
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-xl border border-white/10 bg-surface px-5 py-2.5 font-semibold text-ink-200"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="reveal bg-ink-950">
        <Container className="py-20 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's build something precise.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Send a brief <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={site.calendly}
              external
              size="lg"
              className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15"
            >
              Book a call
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
