/**
 * Lead notifications. Sends every form submission (with full content) to the
 * Sitelytc inbox AND WhatsApp. No-ops gracefully (logs) until a provider is
 * configured, so a failed notification never breaks a form submission.
 *
 * Email   → sitelytc@gmail.com   (Web3Forms preferred — zero domain setup — else Resend)
 * WhatsApp → +91 88268 49403     (CallMeBot preferred — free — else Meta Business API)
 */
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export const NOTIFY_EMAIL = "sitelytc@gmail.com";
export const NOTIFY_WHATSAPP = process.env.MAYANK_WHATSAPP_NUMBER ?? "918826849403";

export type LeadField = { label: string; value: string | number | null | undefined };

function present(fields: LeadField[]): LeadField[] {
  return fields.filter(
    (f) => f.value !== undefined && f.value !== null && `${f.value}`.trim() !== "",
  );
}

function toText(fields: LeadField[]): string {
  return present(fields)
    .map((f) => `${f.label}: ${f.value}`)
    .join("\n");
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendEmail(subject: string, fields: LeadField[], replyTo?: string) {
  const text = toText(fields);

  // 1) Web3Forms — delivers straight to the inbox tied to the access key.
  const w3 = process.env.WEB3FORMS_ACCESS_KEY;
  if (w3) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: w3,
          subject,
          from_name: "Sitelytc Website",
          ...(replyTo ? { replyto: replyTo } : {}),
          message: text,
        }),
      });
      if (!res.ok) console.error("[notify] Web3Forms failed:", res.status);
      return;
    } catch (err) {
      console.error("[notify] Web3Forms threw:", err);
    }
  }

  // 2) Resend — needs a verified from-domain.
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM_EMAIL;
  if (key && from) {
    const rows = present(fields)
      .map(
        (f) =>
          `<tr><td style="padding:4px 14px 4px 0;color:#888">${esc(f.label)}</td><td style="padding:4px 0"><strong>${esc(String(f.value))}</strong></td></tr>`,
      )
      .join("");
    const html = `<h2 style="font-family:Arial,sans-serif">${esc(subject)}</h2><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [NOTIFY_EMAIL],
          subject,
          html,
          text,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });
      if (!res.ok) console.error("[notify] Resend failed:", res.status);
      return;
    } catch (err) {
      console.error("[notify] Resend threw:", err);
    }
  }

  console.warn(
    `[notify] Email not configured — would send to ${NOTIFY_EMAIL}:\n${subject}\n${text}`,
  );
}

async function sendWhatsApp(subject: string, fields: LeadField[]) {
  const message = `${subject}\n\n${toText(fields)}`;

  // 1) CallMeBot — free, no Meta Business setup.
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (apikey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        NOTIFY_WHATSAPP,
      )}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apikey)}`;
      const res = await fetch(url);
      if (!res.ok) console.error("[notify] CallMeBot failed:", res.status);
      return;
    } catch (err) {
      console.error("[notify] CallMeBot threw:", err);
    }
  }

  // 2) Meta WhatsApp Business API (recipient = MAYANK_WHATSAPP_NUMBER).
  await sendWhatsAppNotification(message);
}

/** Send a form submission to the inbox + WhatsApp with its full content. */
export async function notifyLead(
  subject: string,
  fields: LeadField[],
  replyTo?: string,
): Promise<void> {
  await Promise.allSettled([
    sendEmail(subject, fields, replyTo),
    sendWhatsApp(subject, fields),
  ]);
}
