import {
  Code2,
  Bot,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** Per-service detail content powering /services/[slug]. */
export type ServiceDetail = {
  slug: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  intro: string;
  problem: { heading: string; body: string[] };
  approach: { title: string; body: string }[];
  deliverables: string[];
  standards: string[];
  metrics: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string };
};

export const services: Record<string, ServiceDetail> = {
  web: {
    slug: "web",
    icon: Code2,
    kicker: "Web Design & Development",
    title: "Websites engineered like software — fast, secure, built to convert.",
    intro:
      "Design and Next.js development in-house. No page builders, no bloated themes — just maintainable code that loads in under two seconds and turns visitors into customers.",
    problem: {
      heading: "Most websites are a cost, not an asset.",
      body: [
        "Template builders ship slow, generic sites that rank poorly and convert worse. Six months later they're brittle, insecure, and impossible to extend.",
        "We treat your site as a product: designed for your funnel, coded for performance, and hardened before it ever goes live.",
      ],
    },
    approach: [
      { title: "Design system first", body: "A bespoke, reusable system — type, color, components — so every page is consistent and fast to extend." },
      { title: "Engineered for Core Web Vitals", body: "Next.js 15, image optimization, edge caching. We target 95+ Lighthouse and sub-2s loads." },
      { title: "Conversion-focused IA", body: "Structure, copy hierarchy, and CTAs mapped to how your buyers actually decide." },
      { title: "Hardened before launch", body: "Security headers, validation, and bot protection ship by default — plus a self-VAPT pass." },
    ],
    deliverables: [
      "Custom design system + responsive build",
      "Next.js 15 + TypeScript, 95+ Core Web Vitals",
      "On-page SEO + structured data (JSON-LD)",
      "Security headers + CAPTCHA on every form",
      "Analytics, consent banner & CMS handover",
      "30 days of post-launch support",
    ],
    standards: ["Next.js 15", "TypeScript", "WCAG 2.2 AA", "Core Web Vitals", "OWASP"],
    metrics: [
      { value: "<2s", label: "Target load time" },
      { value: "95+", label: "Lighthouse score" },
      { value: "650%", label: "Peak client growth" },
    ],
    faqs: [
      { q: "How long does a build take?", a: "A marketing site is typically 2 weeks; a web app with integrations runs 4–8 weeks depending on scope. You'll get a fixed timeline after discovery." },
      { q: "Do I own the code?", a: "Yes — everything is handed over in your repository, fully documented. No lock-in to a proprietary builder." },
      { q: "Can you work with our existing brand?", a: "Absolutely. We can extend your current identity or design a new system from scratch." },
    ],
    related: { label: "See pricing", href: "/pricing" },
  },
  ai: {
    slug: "ai",
    icon: Bot,
    kicker: "AI Automation — Kritvia",
    title: "Automation that runs your operations while you sleep.",
    intro:
      "Multi-agent automation and process digitalisation on the Kritvia infrastructure. Connect your tools, define your workflows, and let coordinated agents do the repetitive work — safely and auditably.",
    problem: {
      heading: "Your team is doing work software should do.",
      body: [
        "Copy-pasting between tools, chasing approvals, re-keying data — it's slow, error-prone, and it doesn't scale with you.",
        "We map those workflows and hand them to AI agents that plan, delegate, and execute across your stack, with every action logged.",
      ],
    },
    approach: [
      { title: "Workflow discovery", body: "We map the processes eating your team's time and pick the highest-ROI ones to automate first." },
      { title: "Multi-agent orchestration", body: "A team of agents — not a single chatbot — that coordinate to complete real, multi-step tasks." },
      { title: "Sandboxed execution", body: "Agents run real code in isolated, audited environments: powerful enough to act, safe enough to trust." },
      { title: "Dashboards & handover", body: "Visibility into what ran, when, and why — plus training so your team owns it." },
    ],
    deliverables: [
      "Workflow discovery + automation map",
      "Multi-agent orchestration setup",
      "Tool & data integrations",
      "Sandboxed execution + full audit logs",
      "Reporting dashboards",
      "Team training & handover",
    ],
    standards: ["Multi-agent", "Sandboxed", "Audit-logged", "Human-in-the-loop"],
    metrics: [
      { value: "24/7", label: "Always-on agents" },
      { value: "100%", label: "Actions audited" },
      { value: "Days", label: "To first automation" },
    ],
    faqs: [
      { q: "Is it safe to let agents act on our systems?", a: "Yes — agents run in sandboxes with scoped permissions, human-in-the-loop checkpoints for sensitive steps, and a complete audit trail." },
      { q: "What can you automate?", a: "Lead routing, reporting, data sync, document generation, customer follow-ups, and most repetitive multi-tool workflows." },
      { q: "Is Kritvia available now?", a: "It's in early access. Join the waitlist for founding-member terms." },
    ],
    related: { label: "Explore Kritvia", href: "/kritvia" },
  },
  cybersecurity: {
    slug: "cybersecurity",
    icon: ShieldCheck,
    kicker: "Cybersecurity Audits",
    title: "Audits that fix real vulnerabilities — not a PDF to tick a box.",
    intro:
      "VAPT, compliance readiness (ISO 27001, SOC 2, PCI-DSS, HIPAA), and GDPR/DPDPA data-privacy audits. Every finding includes the exact issue, a CVSS score, and a step-by-step fix.",
    problem: {
      heading: "A breach costs more than the audit ever would.",
      body: [
        "Most security reports are generic checklists that don't tell you what to actually fix. Meanwhile one exploited vulnerability can end a deal — or a company.",
        "We test like an attacker, score like an auditor, and report like an engineer: prioritised, reproducible, and remediable.",
      ],
    },
    approach: [
      { title: "Scope & threat-model", body: "We define exactly what's in scope and the realistic threats to it before testing begins." },
      { title: "Test", body: "Black-box and grey-box testing against OWASP Top 10, API Top 10, auth, and business logic." },
      { title: "Report", body: "Executive summary + CVSS-scored technical findings, each with a concrete fix." },
      { title: "Remediate & re-test", body: "We help you fix, then verify the fixes held — so the report ends in 'resolved', not 'open'." },
    ],
    deliverables: [
      "OWASP Top 10 + API Top 10 testing",
      "CVSS v3.1-scored findings + remediation",
      "Compliance gap analysis (ISO/SOC 2/PCI/HIPAA)",
      "GDPR / DPDPA 2023 data-privacy review",
      "Re-test after fixes",
      "Branded report + tracked remediation plan",
    ],
    standards: ["OWASP", "CVSS v3.1", "ISO 27001", "SOC 2", "PCI-DSS", "NIST"],
    metrics: [
      { value: "₹25k+", label: "VAPT from" },
      { value: "3–5d", label: "Typical delivery" },
      { value: "0", label: "Generic-PDF reports" },
    ],
    faqs: [
      { q: "Will testing take down our site?", a: "No — we use safe, scoped methodologies and coordinate any intrusive tests with you in advance." },
      { q: "Do you help us fix the findings?", a: "Yes. Every package includes a clear remediation plan, and Growth+ tiers include a re-test after you fix." },
      { q: "Can you get us certified?", a: "We get you fully audit-ready; SOC 2 attestation and PCI ASV scans are completed with our licensed audit partners." },
    ],
    related: { label: "See packages & checkout", href: "/cybersecurity" },
  },
};

export const serviceSlugs = Object.keys(services);
