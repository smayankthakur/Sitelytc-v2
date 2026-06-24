import type { Metadata } from "next";
import { CircleCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment received",
  description: "Thank you — your payment has been received.",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <section className="reveal py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-500/10 text-accent-400">
          <CircleCheck className="h-9 w-9" />
        </span>
        <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Payment received. Thank you.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-300">
          Your receipt is on its way by email. We&apos;ll be in touch within one
          business day to schedule the kickoff and confirm scope.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.calendly} external size="lg">
            Book your kickoff call <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
