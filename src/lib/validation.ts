import { z } from "zod";

/** Project verticals offered (Step 1 of the contact form). */
export const projectTypes = ["web", "ai", "cybersecurity", "other"] as const;
export type ProjectType = (typeof projectTypes)[number];

/**
 * Contact form payload. Validated identically on the client (before submit)
 * and on the server (api/contact). Budget is stored in INR (rupees).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email"),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  projectType: z.enum(projectTypes),
  budget: z.number().int().min(0).max(10_000_000),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (min 10 chars)")
    .max(2000),
  captchaToken: z.string().min(1, "Please complete the CAPTCHA"),
  // Honeypot: must be empty. Bots tend to fill every field.
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Cybersecurity package payment request (api/payment). */
export const paymentSchema = z.object({
  packageId: z.enum([
    "vapt-starter",
    "vapt-growth",
    "iso-gap",
    "iso-full",
    "soc2-gap",
    "pci-dss",
    "hipaa",
    "gdpr",
    "dpdpa",
    "compliance-combined",
    "training-ir",
  ]),
  customerName: z.string().trim().min(2).max(100).optional(),
  customerEmail: z.string().trim().email().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

/** Portal sign-in (api/portal/login). */
export const portalLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  password: z.string().min(8, "Password is too short").max(200),
});

export type PortalLoginInput = z.infer<typeof portalLoginSchema>;
