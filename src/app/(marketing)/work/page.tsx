import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImmersiveCaseStudies } from "@/components/work/ImmersiveCaseStudies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A deep dive into our digital engineering portfolio — from high-growth ecommerce to enterprise dashboard architecture.",
  alternates: { canonical: "/work" },
};

// ISR per page spec.
export const revalidate = 3600;

export default function WorkPage() {
  return (
    <>
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Selected work.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            A deep dive into our digital engineering portfolio — from
            high-growth ecommerce to enterprise dashboard architecture. Each
            project opens its full case study.
          </p>
        </Container>
      </section>

      <section className="reveal py-16 sm:py-20">
        <Container>
          <ImmersiveCaseStudies />
        </Container>
      </section>
    </>
  );
}
