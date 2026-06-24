import type { Metadata } from "next";
import { MessageCircle, CalendarClock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MultiStepForm } from "@/components/contact/MultiStepForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. We reply within 24 hours and send a clear proposal within 48. Or book a discovery call directly.",
  alternates: { canonical: "/contact" },
};

const steps = [
  {
    title: "We review your brief",
    detail: "Same day. We read every submission ourselves — no bots, no queue.",
  },
  {
    title: "Discovery call scheduled",
    detail: "A focused 30-minute call to understand goals, scope, and constraints.",
  },
  {
    title: "Proposal in 48 hours",
    detail: "A clear plan with scope, timeline, and fixed pricing. No surprises.",
  },
];

const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi Sitelytc, I'd like to discuss a project.",
)}`;

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let's build something precise.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            Send us a short brief and we'll reply within 24 hours — or book a
            call and skip straight to a conversation.
          </p>
        </Container>
      </section>

      <section className="reveal py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* Form */}
            <div>
              <MultiStepForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  What happens next
                </h2>
                <ol className="mt-5 space-y-5">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{s.title}</p>
                        <p className="mt-0.5 text-sm text-ink-300">{s.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface p-6">
                <h2 className="text-lg font-semibold text-white">
                  Prefer to talk now?
                </h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={site.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:border-gold-500/40 hover:bg-elevate"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold-500/15 text-gold-300">
                      <CalendarClock className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-white">
                        Book a call
                      </span>
                      <span className="block text-sm text-ink-300">
                        30-min discovery via Calendly
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-ink-500" />
                  </a>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:border-gold-500/40 hover:bg-elevate"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-500/10 text-accent-400">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-white">
                        WhatsApp us
                      </span>
                      <span className="block text-sm text-ink-300">
                        Quick questions, fast answers
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-ink-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
