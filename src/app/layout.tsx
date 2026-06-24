import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { headers } from "next/headers";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { PageLoader } from "@/components/fx/PageLoader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { EasterEgg } from "@/components/fx/EasterEgg";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ff-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Sitelytc builds Next.js websites, AI automation, and security audits with engineering precision. Web design, VAPT, ISO 27001 and GDPR/DPDPA compliance for Indian and global startups.",
  keywords: [
    "Next.js development",
    "VAPT audit India",
    "cybersecurity audit",
    "AI automation",
    "web design agency",
    "ISO 27001",
    "DPDPA compliance",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Websites, AI automation, and security audits built with engineering precision.",
    url: site.url,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="relative font-sans" suppressHydrationWarning>
        {/* Enable scroll-reveal animations before first paint (CSP-nonce’d).
            Without JS, `.reveal` content stays fully visible. */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />

        {/* Intro loader (only visible when JS is present; fades out via PageLoader) */}
        <div id="page-loader">
          <div className="page-loader-grid" aria-hidden />
          <div className="page-loader-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="Sitelytc"
              width={80}
              height={80}
              className="page-loader-logo"
            />
            <p className="page-loader-tag">Precision Digital Architecture</p>
            <div className="page-loader-bar">
              <span />
            </div>
          </div>
          <span id="page-loader-count" className="page-loader-count">00</span>
        </div>
        {/* Ambient page backdrop */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-canvas"
        >
          <div className="absolute left-1/2 top-0 h-[42rem] w-[80rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[32rem] w-[40rem] rounded-full bg-gold-500/5 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
            }}
          />
        </div>

        {children}
        <PageLoader />
        <CustomCursor />
        <EasterEgg />
        <SmoothScroll
          enabled={process.env.NEXT_PUBLIC_SMOOTH_SCROLL === "true"}
          nonce={nonce}
        />
        <ScrollProgress />
        <ScrollReveal />
        <ConsentBanner gaId={process.env.NEXT_PUBLIC_GA_ID} nonce={nonce} />
      </body>
    </html>
  );
}
