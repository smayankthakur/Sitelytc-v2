"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "navbar-enter sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
        scrolled || open
          ? "border-white/10 bg-canvas/55 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-2xl supports-[backdrop-filter]:bg-canvas/45"
          : "border-transparent bg-transparent",
      )}
    >
      {/* gold sheen line, fades in with the glass */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Sitelytc home"
          data-cursor="Home"
        >
          <Image
            src="/logo.webp"
            alt="Sitelytc"
            width={130}
            height={34}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  active ? "text-white" : "text-ink-300 hover:text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-gold-400 transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/contact" variant="ghost" size="sm">
            Contact
          </ButtonLink>
          <ButtonLink href={site.calendly} external size="sm" cursor="Book">
            Book a Call
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-200 hover:bg-white/5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/5 text-gold-300"
                      : "text-ink-200 hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2">
              <ButtonLink href="/contact" variant="secondary" size="md">
                Contact
              </ButtonLink>
              <ButtonLink href={site.calendly} external size="md">
                Book a Call
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
