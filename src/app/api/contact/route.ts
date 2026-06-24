import { NextResponse, type NextRequest } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { contactSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { createHubSpotContact } from "@/lib/hubspot";
import { notifyLead } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  // 1. Rate limit — 5 submissions / hour / IP (matches Cloudflare rule).
  const limit = await rateLimit(`contact:${ip}`, { limit: 5, window: "1h" });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // 2. Parse + validate (Zod).
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const data = parsed.data;

  // 3. Honeypot — must be empty.
  if (data.honeypot) {
    // Pretend success so bots don't learn anything.
    return NextResponse.json({ success: true });
  }

  // 4. CAPTCHA.
  const captchaOk = await verifyTurnstile(data.captchaToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 },
    );
  }

  // 5. Sanitise free-text before it ever reaches the CRM.
  const clean = {
    name: DOMPurify.sanitize(data.name),
    email: DOMPurify.sanitize(data.email),
    company: data.company ? DOMPurify.sanitize(data.company) : undefined,
    message: DOMPurify.sanitize(data.message),
    projectType: data.projectType,
    budget: data.budget,
  };

  // 6. CRM + notification. Don't fail the user if a downstream service errors.
  try {
    await createHubSpotContact(clean);
  } catch (err) {
    console.error("[contact] HubSpot sync failed:", err);
  }

  await notifyLead(
    "New project enquiry — Sitelytc",
    [
      { label: "Name", value: clean.name },
      { label: "Email", value: clean.email },
      { label: "Company", value: clean.company },
      { label: "Project type", value: clean.projectType },
      { label: "Budget (INR)", value: clean.budget },
      { label: "Message", value: clean.message },
    ],
    clean.email,
  );

  return NextResponse.json({ success: true });
}
