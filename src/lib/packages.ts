/**
 * Cybersecurity package catalogue. Amounts are in paise (₹25,000 = 2_500_000)
 * because Razorpay works in the smallest currency unit.
 *
 * Only FIXED-PRICE packages live here — they are buyable via Razorpay/Stripe
 * checkout. Retainer-based offerings (Managed Security / SOC) have no fixed
 * price and route to a discovery call on the page instead.
 *
 * NOTE: prices below are provisional placeholders — confirm before launch.
 */
export type PackageId =
  // VAPT
  | "vapt-starter"
  | "vapt-growth"
  // Audit & compliance readiness (frameworks)
  | "iso-gap"
  | "iso-full"
  | "soc2-gap"
  | "pci-dss"
  | "hipaa"
  // Data-privacy compliance
  | "gdpr"
  | "dpdpa"
  | "compliance-combined"
  // Training & incident response
  | "training-ir";

export type CyberPackage = {
  id: PackageId;
  name: string;
  amountPaise: number;
  description: string;
};

export const packages: Record<PackageId, CyberPackage> = {
  "vapt-starter": {
    id: "vapt-starter",
    name: "VAPT — Starter",
    amountPaise: 2_500_000,
    description: "VAPT Report for a static website up to 10 pages (3 business days).",
  },
  "vapt-growth": {
    id: "vapt-growth",
    name: "VAPT — Growth",
    amountPaise: 7_500_000,
    description: "VAPT Report for a web app with auth + API (5 business days).",
  },
  "iso-gap": {
    id: "iso-gap",
    name: "ISO 27001 — Gap Analysis",
    amountPaise: 4_000_000,
    description: "ISO/IEC 27001:2022 gap analysis across 114 controls.",
  },
  "iso-full": {
    id: "iso-full",
    name: "ISO 27001 — Full Readiness",
    amountPaise: 15_000_000,
    description: "Full ISO 27001 readiness: risk register, SoA, policy templates.",
  },
  "soc2-gap": {
    id: "soc2-gap",
    name: "SOC 2 — Readiness Assessment",
    amountPaise: 6_000_000,
    description:
      "SOC 2 (Type I/II) trust-criteria gap assessment, control mapping, and evidence plan.",
  },
  "pci-dss": {
    id: "pci-dss",
    name: "PCI-DSS — Readiness",
    amountPaise: 4_500_000,
    description:
      "PCI-DSS scope definition, SAQ guidance, and segmentation review for payment handlers.",
  },
  hipaa: {
    id: "hipaa",
    name: "HIPAA — Security Rule Readiness",
    amountPaise: 5_000_000,
    description:
      "HIPAA security-rule risk analysis, safeguards checklist, and BAA templates.",
  },
  gdpr: {
    id: "gdpr",
    name: "GDPR Compliance Audit",
    amountPaise: 3_500_000,
    description: "GDPR data-flow mapping, lawful-basis assessment, privacy notices.",
  },
  dpdpa: {
    id: "dpdpa",
    name: "DPDPA Compliance Audit",
    amountPaise: 2_500_000,
    description: "India DPDPA 2023 readiness: consent, notices, DSR process.",
  },
  "compliance-combined": {
    id: "compliance-combined",
    name: "GDPR + DPDPA Combined",
    amountPaise: 5_000_000,
    description: "Combined GDPR and DPDPA compliance audit.",
  },
  "training-ir": {
    id: "training-ir",
    name: "Security Training & Incident Response",
    amountPaise: 4_000_000,
    description:
      "Security-awareness training, phishing simulation, and an incident-response plan (per engagement).",
  },
};

/** Format paise as a clean ₹ string, e.g. 2_500_000 → "₹25,000". */
export function formatINR(amountPaise: number): string {
  const rupees = amountPaise / 100;
  return `₹${rupees.toLocaleString("en-IN")}`;
}
