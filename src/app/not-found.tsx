import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "404 — Off the blueprint",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        {/* Blueprint backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgba(239,190,82,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(239,190,82,0.10) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(ellipse at center, black 18%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 18%, transparent 72%)",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-gold-400/20" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[28vw] font-bold leading-none text-white/[0.03]">
            404
          </span>
        </div>

        <Container className="relative py-24 text-center">
          <div className="flex justify-center">
            <p className="eyebrow">error 404</p>
          </div>
          <h1 className="font-display mt-6 text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Off the blueprint.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-300">
            This page never made it past the drafting table. Let&apos;s get you
            back on plan.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Back home
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-400">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
