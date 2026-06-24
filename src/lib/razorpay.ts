import Razorpay from "razorpay";
import { site } from "@/lib/site";

/** Owns: INR package payments only. Never lead management or calendar. */

let client: Razorpay | null = null;

function getClient(): Razorpay | null {
  if (client) return client;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  client = new Razorpay({ key_id, key_secret });
  return client;
}

export async function createPaymentLink(data: {
  amount: number; // paise
  description: string;
  customerName?: string;
  customerEmail?: string;
}): Promise<string> {
  const rp = getClient();
  if (!rp) {
    throw new Error("Razorpay not configured (RAZORPAY_KEY_ID/SECRET missing).");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const body = {
    amount: data.amount,
    currency: "INR",
    description: data.description,
    ...(data.customerName || data.customerEmail
      ? {
          customer: {
            name: data.customerName ?? "",
            email: data.customerEmail ?? "",
          },
        }
      : {}),
    notify: { sms: false, email: Boolean(data.customerEmail) },
    reminder_enable: true,
    callback_url: `${baseUrl}/payment/success`,
    callback_method: "get",
  };

  // The razorpay SDK's payment-link typings are incomplete; cast through the
  // SDK's own parameter/return types to stay type-safe without `any`.
  const link = (await rp.paymentLink.create(
    body as unknown as Parameters<typeof rp.paymentLink.create>[0],
  )) as unknown as { short_url: string };

  return link.short_url;
}
