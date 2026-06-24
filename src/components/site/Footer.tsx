import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site, socials } from "@/lib/site";
import { AmbientAudio } from "@/components/fx/AmbientAudio";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Design & Development", href: "/services/web" },
      { label: "AI Automation — Kritvia", href: "/kritvia" },
      { label: "Cybersecurity Audits", href: "/cybersecurity" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Selected Work", href: "/work" },
      { label: "Our Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Trust Center", href: "/trust" },
      { label: "Client Portal", href: "/portal/client" },
      { label: "Agency Portal", href: "/portal/agency" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  YouTube: Youtube,
  GitHub: Github,
};

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "DPA", href: "/dpa" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-elevate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand + contact */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex" aria-label="Sitelytc home">
              <Image
                src="/logo.webp"
                alt="Sitelytc"
                width={150}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink-300">
              Premium digital media and software engineering firm specializing
              in high-performance digital ecosystems and institutional growth.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">
              {site.description}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-gold-300"
              >
                <Mail className="h-4 w-4 text-gold-300" /> {site.email}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-gold-300"
              >
                <MessageCircle className="h-4 w-4 text-gold-300" /> WhatsApp{" "}
                {site.phoneDisplay}
              </a>
              <p className="flex items-center gap-2.5 text-ink-400">
                <MapPin className="h-4 w-4 text-gold-300" /> {site.location}
              </p>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-gold-400/40 hover:bg-white/5 hover:text-white"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : (
                      <span className="text-[11px] font-bold">Bē</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-300 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold text-white sm:text-2xl">
              Have a project in mind?
            </p>
            <p className="mt-1 text-sm text-ink-400">
              Tell us the goal — we&apos;ll reply with a clear plan within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-5 text-sm font-semibold text-ink-950 transition hover:brightness-110"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-xl bg-white/5 px-5 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/10"
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-ink-400">
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p className="text-[11px] uppercase tracking-wider text-ink-500">
              ISO 9001 certified · OWASP-aligned · GDPR &amp; DPDPA 2023 compliant
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-400">
            <AmbientAudio />
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
