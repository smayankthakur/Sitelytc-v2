import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createKritviaLead } from "@/lib/hubspot";
import { notifyLead } from "@/lib/notify";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  automation: z.string().trim().min(2).max(500),
});

/** Kritvia waitlist → HubSpot Kritvia Leads pipeline. */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  const limit = await rateLimit(`waitlist:${ip}`, { limit: 5, window: "1h" });
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
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const clean = {
    name: DOMPurify.sanitize(parsed.data.name),
    email: DOMPurify.sanitize(parsed.data.email),
    automation: DOMPurify.sanitize(parsed.data.automation),
  };

  try {
    await createKritviaLead(clean);
  } catch (err) {
    console.error("[waitlist] HubSpot sync failed:", err);
  }

  await notifyLead(
    "New Kritvia waitlist signup — Sitelytc",
    [
      { label: "Name", value: clean.name },
      { label: "Email", value: clean.email },
      { label: "Wants to automate", value: clean.automation },
    ],
    clean.email,
  );

  return NextResponse.json({ success: true });
}
