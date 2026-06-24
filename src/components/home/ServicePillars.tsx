import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { ArrowRight, Code2, Bot, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const pillars = [
  {
    icon: Code2,
    n: "01",
    title: "Web Design & Development",
    description:
      "Next.js sites that load in under 2 seconds and convert. Designed and engineered in-house — never templated.",
    href: "/services/web",
  },
  {
    icon: Bot,
    n: "02",
    title: "AI Automation — Kritvia",
    description:
      "Multi-agent automation that runs your operations while you sleep. Process digitalisation on the Kritvia infrastructure.",
    href: "/kritvia",
  },
  {
    icon: ShieldCheck,
    n: "03",
    title: "Cybersecurity Audits",
    description:
      "VAPT, ISO 27001 readiness, and GDPR/DPDPA compliance. Reports that fix real vulnerabilities — not a PDF to tick a box.",
    href: "/cybersecurity",
  },
];

export function ServicePillars() {
  return (
    <Section>
      <SectionHeading
        eyebrow="what we do"
        title="Three disciplines. One standard of precision."
        lede="Most agencies do one thing well. We engineer all three so your site, your operations, and your security move together."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <SpotlightCard
            key={p.title}
            href={p.href}
            cursor="Explore"
            className="group card-lift ring-glow flex flex-col rounded-2xl border border-white/10 bg-surface p-8 hover:border-gold-500/30"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-ink-100 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
                <p.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-sm text-ink-600">{p.n}</span>
            </div>
            <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-white">
              {p.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
              {p.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
