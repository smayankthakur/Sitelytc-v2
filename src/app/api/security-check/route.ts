import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { subscribeToNewsletter } from "@/lib/hubspot";
import { notifyLead } from "@/lib/notify";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email(),
  website: z.string().trim().url().max(2048),
});

/**
 * Free security health-check lead magnet.
 *
 * This endpoint captures the lead synchronously (HubSpot + WhatsApp). The
 * actual scan + branded-PDF generation is a background job (Phase 3): run
 * Mozilla Observatory / SSL Labs / securityheaders.com, render the PDF, and
 * email it via a HubSpot/Resend sequence (Day 1 / Day 3 / Day 7).
 */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  // Tighter limit — 3 / hour / IP — this triggers outbound scans.
  const limit = await rateLimit(`security-check:${ip}`, { limit: 3, window: "1h" });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email and website URL." },
      { status: 400 },
    );
  }

  const email = DOMPurify.sanitize(parsed.data.email);
  const website = DOMPurify.sanitize(parsed.data.website);

  try {
    await subscribeToNewsletter(email);
  } catch (err) {
    console.error("[security-check] HubSpot capture failed:", err);
  }

  await notifyLead(
    "Free security health-check request — Sitelytc",
    [
      { label: "Email", value: email },
      { label: "Website", value: website },
    ],
    email,
  );

  // TODO (Phase 3): enqueue background scan + PDF + drip sequence.

  return NextResponse.json({ success: true });
}
