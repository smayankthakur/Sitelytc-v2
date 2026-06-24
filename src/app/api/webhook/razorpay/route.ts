import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

/**
 * Razorpay webhook. The signature is an HMAC-SHA256 of the RAW request body
 * keyed with the webhook secret — so we must read req.text(), never req.json(),
 * and compare in constant time before trusting anything in the payload.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[razorpay webhook] RAZORPAY_WEBHOOK_SECRET not set.");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { event?: string; payload?: unknown };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (event.event) {
    case "payment_link.paid":
    case "payment.captured":
      // TODO (Phase 2): update HubSpot deal stage + WhatsApp confirm to client.
      console.info("[razorpay webhook] payment confirmed:", event.event);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
