import { ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/fx/Magnetic";
import { BlueprintHero } from "@/components/fx/BlueprintHero";
import { RotatingWord } from "@/components/fx/RotatingWord";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Signature interactive WebGL blueprint backdrop */}
      <BlueprintHero />
      {/* Scrims keep the headline readable over the blueprint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas/80 via-canvas/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
      />

      <Container className="relative pb-28 pt-28 sm:pb-36 sm:pt-40">
        {/* Eyebrow */}
        <div className="reveal flex items-center justify-between gap-4" style={{ transitionDelay: "0ms" }}>
          <span className="eyebrow">security-native digital studio</span>
          <span className="hidden text-xs text-ink-500 sm:block">Est. 2018 · India · worldwide</span>
        </div>

        {/* Editorial display headline (kinetic line-mask reveal) */}
        <h1 className="display mt-8 text-white">
          <span className="kinetic-line">
            <span className="kinetic-line-inner" style={{ animationDelay: "0.05s" }}>
              Sharp by design.
            </span>
          </span>
          <span className="kinetic-line">
            <span className="kinetic-line-inner" style={{ animationDelay: "0.16s" }}>
              Built to{" "}
              <RotatingWord
                className="text-gradient-gold"
                words={["perform.", "convert.", "scale.", "endure."]}
              />
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <p
            className="reveal max-w-xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl"
            style={{ transitionDelay: "140ms" }}
          >
            We engineer Next.js websites, AI automation, and security audits with
            the discipline of software — fast, secure, and built to convert. Not
            marketing fluff.
          </p>

          <div
            className="reveal flex flex-col gap-4 lg:items-end"
            style={{ transitionDelay: "220ms" }}
          >
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Magnetic>
                <ButtonLink href={site.calendly} external size="lg" cursor={"Let\u2019s go"}>
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="/work" size="lg" variant="secondary" cursor="View">
                  See Our Work
                </ButtonLink>
              </Magnetic>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-400 lg:justify-end">
              <span><span className="font-display font-semibold text-white">€550k+</span> revenue</span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span><span className="font-display font-semibold text-white">650%</span> peak growth</span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span><span className="font-display font-semibold text-white">ISO 9001</span> certified</span>
            </div>
          </div>
        </div>
      </Container>

      <div
        aria-hidden
        className="animate-float absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-600"
      >
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
