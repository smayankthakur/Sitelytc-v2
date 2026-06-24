/** Central site config + structured content used across pages. */

export const site = {
  name: "Sitelytc",
  legalName: "Sitelytc Digital Media Pvt. Ltd.",
  tagline: "Precision Digital Architecture",
  description:
    "Websites, AI automation, and security audits built with the discipline of software — for startups in India and worldwide.",
  url: "https://sitelytc.com",
  calendly:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/sitelytc/sitelytc-meet",
  email: "hello@sitelytc.com",
  phone: "+917291849403",
  phoneDisplay: "+91 72918 49403",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917291849403",
  location: "India — serving clients worldwide",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://in.linkedin.com/company/sitelytc-digital" },
  { label: "Instagram", href: "https://www.instagram.com/sitelytc/" },
  { label: "YouTube", href: "https://www.youtube.com/@Sitelytcdigitalmedia" },
  { label: "Behance", href: "https://www.behance.net/mayankthakur" },
  { label: "GitHub", href: "https://github.com/smayankthakur" },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Pricing", href: "/pricing" },
  { label: "Kritvia", href: "/kritvia" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
] as const;
