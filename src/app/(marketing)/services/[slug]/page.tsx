import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { services, serviceSlugs } from "@/lib/services-data";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services[slug];
  if (!s) return { title: "Service not found" };
  return {
    title: s.kicker,
    description: s.intro,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services[slug];
  if (!s) notFound();

  const Icon = s.icon;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.kicker,
    description: s.intro,
    provider: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="reveal relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-1/4 top-[-30%] h-[36rem] w-[36rem] rounded-full bg-brand-600/20 blur-3xl animate-gradient-drift" />
        </div>
        <Container className="relative py-20 sm:py-28">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-gold-300">
            <Icon className="h-3.5 w-3.5" />
            {s.kicker}
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {s.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-300">{s.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Start a project <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={s.related.href} size="lg" variant="secondary">
              {s.related.label}
            </ButtonLink>
          </div>

          {/* Metrics */}
          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
            {s.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`reveal reveal-d${i + 1} rounded-2xl border border-white/10 bg-surface p-5 text-center`}
              >
                <p className="text-3xl font-bold text-gradient-gold">{m.value}</p>
                <p className="mt-1 text-xs text-ink-400">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="The problem" title={s.problem.heading} />
          <div className="space-y-5 text-lg leading-relaxed text-ink-300">
            {s.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-elevate">
        <SectionHeading eyebrow="How we do it" title="A method, not a guess." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {s.approach.map((a, i) => (
            <div
              key={a.title}
              className={`reveal reveal-d${i + 1} card-lift ring-glow rounded-2xl border border-white/10 bg-surface p-6`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500/10 text-sm font-bold text-gold-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-semibold text-white">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Deliverables + standards */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What you get" title="Concrete deliverables." />
            <ul className="mt-6 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-ink-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Standards" title="The bar we build to." />
            <div className="mt-6 flex flex-wrap gap-3">
              {s.standards.map((st) => (
                <span
                  key={st}
                  className="rounded-xl border border-white/10 bg-surface px-5 py-2.5 text-sm font-semibold text-ink-200"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-elevate">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {s.faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-surface p-6">
              <h3 className="font-semibold text-white">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-gold-500/30 bg-gold-500/10 p-8 text-center sm:p-10">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to start?
          </h2>
          <p className="mt-3 text-ink-300">
            Send a brief or book a call — we&apos;ll reply with a fixed-price
            proposal within 48 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Send a brief <ArrowRight className="h-4 w-4" />
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
