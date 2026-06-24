import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * NOTE: draft testimonials across web/ecommerce/AI/branding/media. Replace names
 * with real, attributable quotes (with permission) before relying on them.
 */
const testimonials = [
  {
    quote:
      "Sitelytc rebuilt our store and revenue went from €10k to €65k+ a month. Faster site, cleaner checkout, and they actually understood retail.",
    name: "Priya Nair",
    role: "Founder",
    company: "BabyDocShop",
    initials: "PN",
  },
  {
    quote:
      "The new UI is gorgeous and it just feels fast. Our bounce rate dropped and people finally scroll the whole page.",
    name: "Karan Shah",
    role: "Product Lead",
    company: "Dealzook",
    initials: "KS",
  },
  {
    quote:
      "They took our dated site and turned it into something we're proud to send clients. Booking enquiries doubled in the first month.",
    name: "Dr. Aisling Byrne",
    role: "Director",
    company: "HairDoc",
    initials: "AB",
  },
  {
    quote:
      "Professional from day one. The website reflects the seriousness of our practice, and the copy finally sounds like us.",
    name: "Marc Prévot",
    role: "Partner",
    company: "PreVot Associates",
    initials: "MP",
  },
  {
    quote:
      "Our digital magazine needed speed and polish at scale. Sitelytc delivered both — pages load instantly even with heavy media.",
    name: "Renee Carter",
    role: "Editor-in-Chief",
    company: "M Digital Bay Area",
    initials: "RC",
  },
  {
    quote:
      "Kritvia automated three of our manual ops workflows. It paid for itself in the first month and freed up two people.",
    name: "Daniel Roy",
    role: "Operations Lead",
    company: "Forge & Co",
    initials: "DR",
  },
  {
    quote:
      "We needed a booking-heavy travel site that wouldn't fall over. It's been flawless through our busiest season.",
    name: "Sophie Allard",
    role: "Marketing Head",
    company: "Global Corporate Tour",
    initials: "SA",
  },
  {
    quote:
      "From branding to packaging to the website, everything finally feels like one brand. Online orders are up double digits month on month.",
    name: "Miguel Ozuna",
    role: "Owner",
    company: "Ozuna Tortilla Factory",
    initials: "MO",
  },
  {
    quote:
      "They shipped a faster, cleaner site in half the time our last agency quoted — and explained every decision along the way.",
    name: "Arjun Mehta",
    role: "CEO",
    company: "NorthBridge",
    initials: "AM",
  },
  {
    quote:
      "The AI automation they built drafts our reports and routes leads automatically. It's like adding a teammate who never sleeps.",
    name: "Hana Park",
    role: "Founder",
    company: "Lumen Labs",
    initials: "HP",
  },
  {
    quote:
      "Core Web Vitals all green, design that wins comments, and a CMS my team can actually use. Rare combination.",
    name: "Tom Whitfield",
    role: "Head of Growth",
    company: "Aether AI",
    initials: "TW",
  },
  {
    quote:
      "Communication was effortless, deadlines were real, and the result outperformed our targets. We're already planning project two.",
    name: "Neha Kapoor",
    role: "Co-founder",
    company: "Stillwater",
    initials: "NK",
  },
];

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="what clients say"
        title="Loved by founders and teams."
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="card-lift mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-surface p-7"
          >
            <blockquote className="text-pretty text-ink-200">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 text-sm font-bold text-ink-100">
                {t.initials}
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-white">{t.name}</span>
                <span className="block text-ink-400">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
