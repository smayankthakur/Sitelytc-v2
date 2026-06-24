import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function BottomCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
      </div>

      <Container className="reveal relative py-28 text-center">
        <div className="flex justify-center">
          <p className="eyebrow">let&rsquo;s build</p>
        </div>
        <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Ready to build something precise?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-ink-300">
          Book a free 30-minute discovery call. We’ll review your goals and send
          a clear proposal within 48 hours.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.calendly} external size="lg" cursor="Book">
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            size="lg"
            cursor="Write"
            className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15"
          >
            Send a Brief
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
