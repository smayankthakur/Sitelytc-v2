/**
 * Cloudflare Turnstile server-side verification.
 *
 * Returns true on a valid token. If no secret is configured:
 *   - production  → fail closed (returns false)
 *   - development → fail open (returns true) so local dev works without keys
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") return false;
    console.warn("[turnstile] No secret configured — skipping verification (dev).");
    return true;
  }

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (remoteIp) form.append("remoteip", remoteIp);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
