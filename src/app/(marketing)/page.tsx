import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { ServicePillars } from "@/components/home/ServicePillars";
import { HomeStatement } from "@/components/home/HomeStatement";
import { OutcomeStats } from "@/components/home/OutcomeStats";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { Testimonials } from "@/components/home/Testimonials";
import { Recognition } from "@/components/home/Recognition";
import { BlogPreview } from "@/components/home/BlogPreview";
import { BottomCTA } from "@/components/home/BottomCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precision Digital Architecture",
  description:
    "Sitelytc builds Next.js websites, AI automation, and security audits with engineering precision. Book a free discovery call.",
  alternates: { canonical: "/" },
};

// ISR — revalidate every 60s per page spec.
export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description:
    "Web design & development, AI automation, and cybersecurity audits (VAPT, ISO 27001, GDPR/DPDPA).",
  areaServed: ["IN", "EU", "US"],
  slogan: site.tagline,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LogoMarquee />
      <ServicePillars />
      <HomeStatement />
      <OutcomeStats />
      <FeaturedCaseStudy />
      <Testimonials />
      <Recognition />
      <BlogPreview />
      <BottomCTA />
    </>
  );
}
