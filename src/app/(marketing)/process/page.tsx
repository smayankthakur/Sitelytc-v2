import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion, type Faq } from "@/components/process/FaqAccordion";
import { ProcessScroller } from "@/components/process/ProcessScroller";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How we work — a transparent 6-phase process from discovery to launch, with no surprises on scope, timeline, or price.",
  alternates: { canonical: "/process" },
};

const phases = [
  {
    name: "Discovery",
    duration: "Typically 1 week",
    deliverables: ["Goals & scope workshop", "Technical audit", "Success metrics defined"],
    involvement: "1 kick-off call + async review",
  },
  {
    name: "Strategy",
    duration: "Typically 1 week",
    deliverables: ["Information architecture", "Content plan", "Tech & integration decisions"],
    involvement: "1 review call",
  },
  {
    name: "Design",
    duration: "1–2 weeks",
    deliverables: ["Design system", "Key page designs", "Interactive prototype"],
    involvement: "Async feedback + 1 review",
  },
  {
    name: "Development",
    duration: "2–4 weeks",
    deliverables: ["Next.js build", "Integrations wired", "CMS + content loaded"],
    involvement: "Weekly progress demos",
  },
  {
    name: "QA",
    duration: "Typically 1 week",
    deliverables: ["Cross-device testing", "Lighthouse 95+", "Self-VAPT security pass"],
    involvement: "1 sign-off review",
  },
  {
    name: "Launch",
    duration: "Launch day + 30 days",
    deliverables: ["DNS + go-live", "Analytics verified", "30-day support window"],
    involvement: "Go-live call + handover",
  },
];

const faqs: Faq[] = [
  {
    q: "What are your payment terms?",
    a: "Typically 50% to begin and 50% on launch, with milestone billing on larger projects. Cybersecurity packages are paid upfront via secure Razorpay or Stripe checkout.",
  },
  {
    q: "What's your revision policy?",
    a: "Each design phase includes two rounds of revisions. Beyond that, we bill transparently by the hour — and we'll always tell you before the meter starts.",
  },
  {
    q: "How long does a typical project take?",
    a: "A marketing site is usually 4–6 weeks end to end; a web app or store with integrations is 8–12 weeks. Discovery sets a firm timeline before we start.",
  },
  {
    q: "What's your tech stack?",
    a: "Next.js 15, TypeScript, and Tailwind for the front end; PostgreSQL and FastAPI where a backend is needed; Cloudflare and Vercel for hosting. Security is built in, not bolted on.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Every project includes a 30-day support window. After that, we offer monthly retainers for maintenance, content, and ongoing security.",
  },
  {
    q: "Can you add a security audit to a build?",
    a: "Yes — we run a self-VAPT pass on every build before launch, and you can add a full VAPT, ISO 27001 readiness, or GDPR/DPDPA audit as an add-on.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How we work. No surprises.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            A transparent process with clear deliverables and a defined level of
            your involvement at every phase.
          </p>
        </Container>
      </section>

      {/* Pinned scroll-through */}
      <section className="reveal py-16 sm:py-24">
        <Container>
          <ProcessScroller phases={phases} />
        </Container>
      </section>

      {/* FAQ */}
      <section className="reveal bg-elevate py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Frequently asked
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="reveal bg-ink-950">
        <Container className="py-20 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start?
          </h2>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={site.calendly} external size="lg">
              Book a discovery call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
