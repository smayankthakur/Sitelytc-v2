import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Sitelytc's website and services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

const updated = "June 2026";

export default function TermsPage() {
  return (
    <section className="reveal py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-ink-200">
          <Block title="Agreement">
            <p>
              These terms govern your use of {site.url} and any services provided
              by {site.name}. By using the site or engaging our services, you
              agree to them.
            </p>
          </Block>

          <Block title="Services">
            <p>
              We provide web design and development, AI automation, and
              cybersecurity audit services. The specific scope, deliverables,
              and timeline for any engagement are defined in a separate written
              proposal or statement of work, which takes precedence over these
              terms where they conflict.
            </p>
          </Block>

          <Block title="Payments">
            <p>
              Fixed-price packages are payable via our secure checkout (Razorpay
              for INR, Stripe for international). Project work is billed per the
              terms in your proposal. All prices exclude applicable taxes (e.g.
              GST) unless stated otherwise.
            </p>
          </Block>

          <Block title="Intellectual property">
            <p>
              On full payment, deliverables we create specifically for you become
              yours, except for third-party components and our pre-existing
              tools and frameworks, which remain ours and are licensed to you for
              use in the delivered work.
            </p>
          </Block>

          <Block title="Security audit disclaimer">
            <p>
              A security audit reflects findings at a point in time and cannot
              guarantee that a system is free of all vulnerabilities. You remain
              responsible for acting on remediation guidance and maintaining
              ongoing security.
            </p>
          </Block>

          <Block title="Limitation of liability">
            <p>
              To the extent permitted by law, our total liability for any claim
              arising from an engagement is limited to the fees paid for that
              engagement. We are not liable for indirect or consequential losses.
            </p>
          </Block>

          <Block title="Governing law">
            <p>
              These terms are governed by the laws of India. Any disputes are
              subject to the exclusive jurisdiction of the courts in our
              registered location.
            </p>
          </Block>

          <Block title="Contact">
            <p>
              Questions about these terms? Reach us via our{" "}
              <a className="font-medium text-gold-300 hover:underline" href="/contact">
                contact page
              </a>
              .
            </p>
          </Block>
        </div>
      </Container>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}
