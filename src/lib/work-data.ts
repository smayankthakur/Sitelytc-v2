/** Real Sitelytc portfolio. Each project's full case study lives on its own
 *  sub-domain (matches sitelytc.com/work), so cards link out there. */

export type WorkCategory =
  | "ecommerce"
  | "frontend"
  | "website"
  | "media"
  | "dashboard";

export type CaseStudy = {
  slug: string;
  client: string;
  category: WorkCategory;
  categoryLabel: string;
  outcome: string;
  href: string; // external case-study sub-domain
  logo: string; // /Client/<file>
  /** Headline metric for the immersive view (animated). */
  metricValue?: number;
  metricPrefix?: string;
  metricSuffix?: string;
  /** One-line narrative for the immersive view. */
  summary?: string;
  /** Optional screenshot at /work/<slug>.webp — falls back to a blueprint panel. */
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "babydocshop",
    client: "BabyDocShop.ie",
    category: "ecommerce",
    categoryLabel: "Ecommerce Ops + Growth",
    outcome: "Revenue improved from €10k/month to €65k+/month.",
    href: "https://babydocshop.sitelytc.com",
    logo: "/Client/BabyDoc_Shop_Logo.webp",
    metricValue: 650,
    metricSuffix: "%",
    summary:
      "We rebuilt the storefront for speed and conversion — monthly revenue climbed from about €10k to €65k+.",
  },
  {
    slug: "dealzook",
    client: "Dealzook",
    category: "frontend",
    categoryLabel: "Frontend Design + UI",
    outcome: "Successful launch of the new deal portal.",
    href: "https://dealzook.sitelytc.com",
    logo: "/Client/DealZook_logo.webp",
    summary:
      "A fast, modern deal portal with a refreshed UI — launched on time and on brand.",
  },
  {
    slug: "prevot-associates",
    client: "PreVot Associates",
    category: "website",
    categoryLabel: "Website Design",
    outcome: "40% increase in monthly lead inquiries.",
    href: "https://prevot-associates.sitelytc.com",
    logo: "/Client/Prevot_Associates_logo.webp",
    metricValue: 40,
    metricSuffix: "%",
    summary:
      "A credibility-first redesign that lifted monthly lead inquiries by around 40%.",
  },
  {
    slug: "hairdoc",
    client: "HairDoc",
    category: "website",
    categoryLabel: "Website Design",
    outcome: "50% increase in direct booking inquiries.",
    href: "https://hairdoc.sitelytc.com",
    logo: "/Client/HairDoc_logo.webp",
    metricValue: 50,
    metricSuffix: "%",
    summary:
      "A booking-focused site that increased direct booking inquiries by around 50%.",
  },
  {
    slug: "m-magazine",
    client: "M Magazine Bay Area",
    category: "media",
    categoryLabel: "Media Ops + Audience Growth",
    outcome: "Improved audience reach and engagement (25% MoM growth).",
    href: "https://m-magazine.sitelytc.com",
    logo: "/Client/mdigitalbayarea_logo.webp",
    metricValue: 25,
    metricSuffix: "%",
    summary:
      "A media platform tuned for reach — audience engagement grew around 25% month over month.",
  },
  {
    slug: "global-corporate-tour",
    client: "Global Corporate Tour",
    category: "dashboard",
    categoryLabel: "Backend Dashboard",
    outcome: "Reduction in tour management time by 30%.",
    href: "https://global-corporate-tour.sitelytc.com",
    logo: "/Client/Global_corporate_tour_Logo.webp",
    metricValue: 30,
    metricSuffix: "%",
    summary:
      "A custom backend dashboard that cut tour-management time by around 30%.",
  },
  {
    slug: "ozuna-tortilla-factory",
    client: "Ozuna Tortilla Factory",
    category: "website",
    categoryLabel: "Website Design",
    outcome: "Significant increase in wholesale inquiries via the new web form.",
    href: "https://ozuna-tortilla-factory.sitelytc.com",
    logo: "/Client/Ozuna_logo.webp",
    summary:
      "A clean website with a streamlined wholesale form that drove a notable rise in inquiries.",
  },
];

export const workCategories: { id: WorkCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ecommerce", label: "Ecommerce Ops" },
  { id: "frontend", label: "Frontend Design" },
  { id: "website", label: "Website Design" },
  { id: "media", label: "Media Ops" },
  { id: "dashboard", label: "Backend Dashboard" },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
