import { NextResponse, type NextRequest } from "next/server";
import { paymentSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { packages } from "@/lib/packages";
import { createPaymentLink } from "@/lib/razorpay";

export const runtime = "nodejs";

/**
 * Creates a Razorpay payment link for a fixed-price cybersecurity package.
 * The amount is taken from the server-side catalogue — never from the client —
 * so a tampered request can't change the price.
 */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  // Rate limit — 5 / hour / IP (matches Cloudflare /api/payment rule).
  const limit = await rateLimit(`payment:${ip}`, { limit: 5, window: "1h" });
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

  const parsed = paymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const pkg = packages[parsed.data.packageId];

  try {
    const url = await createPaymentLink({
      amount: pkg.amountPaise,
      description: pkg.description,
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
    });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[payment] Razorpay link failed:", err);
    return NextResponse.json(
      { error: "Could not create payment link. Please contact us." },
      { status: 502 },
    );
  }
}
