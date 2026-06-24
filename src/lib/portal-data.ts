/**
 * Mock portal data. The portal UI is a fully-built front-end shell; wiring it to
 * real auth (Clerk: MFA/SSO) and a database (Neon + Drizzle) is the next step.
 * Until then these fixtures drive the dashboards so the UX is reviewable.
 */
export type Severity = "critical" | "high" | "medium" | "low";

export const clientEngagements = [
  { name: "VAPT — Web App", status: "In progress", progress: 60, due: "in 3 days" },
  { name: "ISO 27001 Readiness", status: "Awaiting evidence", progress: 35, due: "in 2 weeks" },
  { name: "Website Rebuild", status: "Live", progress: 100, due: "Delivered" },
];

export const deliverables = [
  { name: "VAPT Report — Q2.pdf", kind: "Report", date: "Jun 18, 2026", size: "2.4 MB" },
  { name: "Remediation Plan.xlsx", kind: "Tracker", date: "Jun 18, 2026", size: "84 KB" },
  { name: "ISO 27001 Gap Analysis.pdf", kind: "Report", date: "Jun 10, 2026", size: "1.1 MB" },
  { name: "Executive Summary.pdf", kind: "Summary", date: "Jun 18, 2026", size: "320 KB" },
];

export const findings: {
  id: string;
  title: string;
  severity: Severity;
  status: "Open" | "Fixed" | "Re-testing";
}[] = [
  { id: "F-01", title: "Missing rate limit on login", severity: "high", status: "Fixed" },
  { id: "F-02", title: "Reflected XSS in search param", severity: "critical", status: "Re-testing" },
  { id: "F-03", title: "Verbose error messages leak stack", severity: "medium", status: "Open" },
  { id: "F-04", title: "Cookie missing Secure flag", severity: "low", status: "Fixed" },
  { id: "F-05", title: "Outdated dependency (CVE-2025-1234)", severity: "high", status: "Open" },
];

export const invoices = [
  { id: "INV-2041", item: "VAPT — Growth", amount: "₹75,000", status: "Paid", date: "Jun 1, 2026" },
  { id: "INV-2042", item: "ISO 27001 — Gap", amount: "₹40,000", status: "Paid", date: "Jun 1, 2026" },
  { id: "INV-2050", item: "Managed SOC — Jun", amount: "₹40,000", status: "Due", date: "Jun 25, 2026" },
];

export const agencyClients = [
  { name: "BabyDocShop", plan: "Managed SOC", health: "Good", mrr: "₹40,000" },
  { name: "Dealzook", plan: "VAPT + Web", health: "Attention", mrr: "₹0" },
  { name: "HairDoc", plan: "Website", health: "Good", mrr: "₹0" },
  { name: "PreVot Associates", plan: "Compliance", health: "Good", mrr: "₹30,000" },
];

export const agencyPipeline = [
  { stage: "New", count: 6, value: "₹4.2L" },
  { stage: "Scoping", count: 3, value: "₹2.8L" },
  { stage: "Proposal", count: 2, value: "₹1.9L" },
  { stage: "Won", count: 4, value: "₹3.6L" },
];

export const agencyStats = [
  { value: "12", label: "Active clients" },
  { value: "₹1.1L", label: "Monthly recurring" },
  { value: "₹3.6L", label: "Won this quarter" },
  { value: "18%", label: "Referral commission" },
];
