import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sitelytc collects, uses, and protects your personal data — aligned with GDPR and India's DPDPA 2023.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

const updated = "June 2026";

export default function PrivacyPage() {
  return (
    <section className="reveal py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-400">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-ink-200">
          <Block title="Who we are">
            <p>
              {site.name} (“we”, “us”) operates {site.url}. This policy explains
              what personal data we collect, why, and the rights you have over
              it. It is designed to meet the EU GDPR and India&apos;s Digital
              Personal Data Protection Act, 2023 (DPDPA).
            </p>
          </Block>

          <Block title="Information we collect">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Contact submissions:</strong> name, email, company,
                project type, budget range, and the message you send us.
              </li>
              <li>
                <strong>Newsletter &amp; lead magnet:</strong> email address and,
                for the security health check, the website URL you submit.
              </li>
              <li>
                <strong>Waitlist:</strong> name, email, and what you&apos;d like
                to automate.
              </li>
              <li>
                <strong>Technical data:</strong> standard server and security
                logs (e.g. IP address) used for rate limiting and fraud
                prevention.
              </li>
            </ul>
          </Block>

          <Block title="How we use your data">
            <p>
              To respond to enquiries, deliver requested reports, process
              payments for purchased services, send communications you have
              opted into, and keep our services secure. We do not sell your
              personal data.
            </p>
          </Block>

          <Block title="Lawful basis">
            <p>
              We rely on your consent (newsletter, health check), the
              performance of a contract (delivering services you purchase), and
              our legitimate interests (security and fraud prevention), as
              applicable under GDPR and DPDPA.
            </p>
          </Block>

          <Block title="Sharing &amp; processors">
            <p>
              We share data only with the processors needed to run our service —
              for example HubSpot (CRM), Razorpay and Stripe (payments),
              Cloudflare (security), and our hosting provider. Each acts under
              contract and only on our instructions.
            </p>
          </Block>

          <Block title="Retention">
            <p>
              We keep personal data only as long as necessary for the purposes
              above or as required by law, then delete or anonymise it.
            </p>
          </Block>

          <Block title="Your rights">
            <p>
              You may request access, correction, deletion, or portability of
              your data, and may withdraw consent at any time. To exercise these
              rights, contact us at the address below.
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              We use only the cookies necessary to operate the site and keep it
              secure. If we add analytics or marketing cookies, we will request
              consent first.
            </p>
          </Block>

          <Block title="Contact">
            <p>
              Questions or requests? Reach us via our{" "}
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
