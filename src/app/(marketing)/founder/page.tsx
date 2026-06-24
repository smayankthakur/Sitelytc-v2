import type { Metadata } from "next";
import { ArrowRight, Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder — Mayank Thakur",
  description:
    "Meet Mayank Thakur, founder of Sitelytc — an engineer building websites, AI automation, and security audits with the discipline of software.",
  alternates: { canonical: "/founder" },
};

const socials = [
  { label: "LinkedIn", href: "https://in.linkedin.com/company/sitelytc-digital", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/smayankthakur", icon: Github },
  { label: "Instagram", href: "https://www.instagram.com/sitelytc/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@Sitelytcdigitalmedia", icon: Youtube },
];

const principles = [
  {
    title: "Software discipline over shortcuts",
    body: "Anyone can ship a template. I build every project as software — versioned, tested, and maintainable — so it still performs a year later.",
  },
  {
    title: "Security is not a phase",
    body: "I run a security pass on my own work before yours. Hardened headers, validation, and rate limiting ship by default, not as an upsell.",
  },
  {
    title: "Outcomes, measured",
    body: "Revenue, conversion, lead volume, time saved. If we can't measure the result, we redefine the goal until we can.",
  },
];

export default function FounderPage() {
  return (
    <>
      {/* Hero */}
      <section className="reveal relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 top-[-30%] h-[34rem] w-[34rem] rounded-full bg-brand-600/20 blur-3xl" />
          <div className="absolute right-0 bottom-[-40%] h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 py-24 lg:grid-cols-[1.3fr_1fr] sm:py-28">
          <div>
            <p className="eyebrow">
              The Founder
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Hi, I&apos;m Mayank — I build digital systems that earn their keep.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-300">
              Sitelytc started from a simple frustration: too many businesses pay
              for websites that look fine and do nothing. I founded it to engineer
              the opposite — fast, secure, conversion-focused systems built like
              real software.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                Work with me <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={site.calendly} external size="lg" variant="secondary">
                Book a call
              </ButtonLink>
            </div>
          </div>

          {/* Founder intro video (poster = portrait) */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <video
              src="/founder/intro.mp4"
              poster="/founder/Founder.png"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="The story"
            title="From writing code to running a studio."
          />
          <div className="space-y-5 text-lg leading-relaxed text-ink-300">
            <p>
              I&apos;m an engineer first. Before Sitelytc, I spent my time deep in
              code — building, breaking, and securing web applications. That
              background shapes everything here: I don&apos;t see a website as a
              brochure, I see it as a product that has to be fast, reliable, and
              defensible.
            </p>
            <p>
              Over the years I&apos;ve helped brands grow revenue, launch portals,
              and unblock enterprise deals by treating their digital presence as
              infrastructure. The studio exists to bring that engineering rigour to
              startups and growing businesses that can&apos;t afford a full in-house
              team — in India and worldwide.
            </p>
            <p>
              Today Sitelytc spans three things I care about: precision web
              engineering, AI automation (through{" "}
              <span className="text-white">Kritvia</span>), and cybersecurity
              audits that give founders real answers, not generic PDFs.
            </p>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-elevate">
        <SectionHeading
          eyebrow="How I work"
          title="Three principles I don't compromise on."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-surface p-7"
            >
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-3 text-ink-300">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Connect + CTA */}
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-gold-500/30 bg-gold-500/10 p-8 text-center sm:p-10">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Let&apos;s build something that performs.
          </h2>
          <p className="mt-3 text-ink-300">
            Tell me what you&apos;re working on — I read every message myself.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-gold-300"
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
