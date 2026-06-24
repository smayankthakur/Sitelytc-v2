import type { Metadata } from "next";
import { Network, Boxes, BarChart3, Plug, Workflow, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WaitlistForm } from "@/components/kritvia/WaitlistForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kritvia — The AI Operating System for your business",
  description:
    "Kritvia is the AI operating system for your business: multi-agent orchestration, sandboxed code execution, and business intelligence. Join the waitlist.",
  alternates: { canonical: "/kritvia" },
};

const features = [
  {
    icon: Network,
    title: "Multi-agent orchestration",
    body: "Coordinated AI agents that plan, delegate, and execute across your tools — not a single chatbot, but a team.",
  },
  {
    icon: Boxes,
    title: "Sandboxed code execution",
    body: "Agents run real code in isolated, audited sandboxes — powerful enough to do the work, safe enough to trust.",
  },
  {
    icon: BarChart3,
    title: "Business intelligence",
    body: "Every action is logged and measurable, so you always know what your agents did and what it's worth.",
  },
];

const steps = [
  { icon: Plug, title: "Connect your tools", body: "Link the apps and data your business already runs on." },
  { icon: Workflow, title: "Define your workflows", body: "Describe the outcomes you want — Kritvia maps the steps." },
  { icon: Play, title: "Let agents run", body: "Agents execute on schedule or on demand, with full audit trails." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kritvia",
  applicationCategory: "BusinessApplication",
  description:
    "AI operating system: multi-agent orchestration, sandboxed code execution, and business intelligence.",
  publisher: { "@type": "Organization", name: site.name },
};

export default function KritviaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="reveal relative overflow-hidden bg-ink-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-gradient-drift absolute left-[-10%] top-[-20%] h-[34rem] w-[34rem] rounded-full bg-brand-600/25 blur-3xl" />
        </div>
        <Container className="relative py-24 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
                Now in private preview
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                The AI operating system for your business.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-ink-300">
                Kritvia runs your operations with coordinated AI agents —
                connect your tools, define your workflows, and let them run.
              </p>
            </div>
            <div>
              <WaitlistForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="reveal py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built to do real work, safely.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-surface p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500/10 text-gold-300">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="reveal bg-elevate py-20 sm:py-24">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white">How it works</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-white/10 bg-surface p-7">
                <span className="text-sm font-bold text-gold-300">
                  0{i + 1}
                </span>
                <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-gold-500/15 text-gold-300">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo placeholder */}
      <section className="reveal py-20 sm:py-24">
        <Container className="max-w-4xl">
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-ink-900 to-brand-900">
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white">
                <Play className="h-7 w-7" />
              </span>
              <p className="mt-4 text-sm text-white/70">
                Agent dashboard demo — coming soon
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
