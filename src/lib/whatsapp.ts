/**
 * WhatsApp Business API — owns: sticky CTA, Mayank notifications, payment
 * confirmations. Never lead scoring or CRM data.
 *
 * No-ops (with a warning) if not configured, so a failed notification never
 * breaks a form submission.
 */
export async function sendWhatsAppNotification(message: string): Promise<void> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.MAYANK_WHATSAPP_NUMBER ?? "918826849403";

  if (!token || !phoneNumberId || !to) {
    console.warn("[whatsapp] Not fully configured — skipping notification.");
    return;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      },
    );
    if (!res.ok) {
      console.error(`[whatsapp] Send failed: ${res.status}`);
    }
  } catch (err) {
    console.error("[whatsapp] Send threw:", err);
  }
}
