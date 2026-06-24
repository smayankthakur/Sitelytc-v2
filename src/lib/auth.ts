/**
 * Stateless session auth — HMAC-SHA256 signed tokens stored in an httpOnly
 * cookie. Uses only Web Crypto + btoa/atob so it runs in BOTH the Node runtime
 * (route handlers) and the Edge runtime (middleware) with no dependencies.
 *
 * Production hardening path: swap the user store (lib/users.ts) to Neon/Drizzle
 * and, if you want managed MFA/SSO, replace this with Clerk. The route
 * protection in middleware stays the same shape.
 */

export const SESSION_COOKIE = "__sl_portal";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export type Role = "client" | "agency";

export type SessionPayload = {
  sub: string;
  email: string;
  role: Role;
  name: string;
  org: string;
  exp: number; // unix seconds
};

const encoder = new TextEncoder();

function getSecret(): string {
  // In production SESSION_SECRET MUST be set; the dev fallback keeps `npm dev`
  // working keyless and is never used once the env var is configured.
  return process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me";
}

export function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function fromB64url(str: string) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Sign a payload into a `<body>.<sig>` token. */
export async function createSessionToken(
  payload: Omit<SessionPayload, "exp"> & { exp?: number },
): Promise<string> {
  const full: SessionPayload = {
    ...payload,
    exp: payload.exp ?? Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const body = b64url(encoder.encode(JSON.stringify(full)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(body));
  return `${body}.${b64url(sig)}`;
}

/** Verify signature + expiry. Returns the payload or null. */
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      fromB64url(sig),
      encoder.encode(body),
    );
    if (!ok) return null;
    const payload = JSON.parse(
      new TextDecoder().decode(fromB64url(body)),
    ) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
