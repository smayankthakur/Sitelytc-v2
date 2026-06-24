/**
 * User store. Today: an in-code demo store with PBKDF2-hashed passwords (no
 * plaintext, no dependencies). To go live, set DATABASE_URL and replace the
 * lookup in `findUserByEmail` with a Neon/Drizzle query — see src/lib/db/.
 *
 * Demo credentials (dev only):
 *   client@demo.sitelytc.com / demo12345   → Client portal
 *   agency@demo.sitelytc.com / demo12345   → Agency portal
 */
import { fromB64url, type Role } from "@/lib/auth";

export type User = {
  id: string;
  email: string;
  name: string;
  org: string;
  role: Role;
  /** Format: v1$<iterations>$<saltB64url>$<hashB64url> (PBKDF2-SHA256). */
  passwordHash: string;
};

const demoUsers: User[] = [
  {
    id: "u_client_demo",
    email: "client@demo.sitelytc.com",
    name: "Aanya",
    org: "BabyDocShop",
    role: "client",
    passwordHash:
      "v1$120000$u1q60mtr7PJdrud0HYtymg$s72xm6rxB2kmf543-EGVFUK6b6GSN3yPVlpUz7zG2Fc",
  },
  {
    id: "u_agency_demo",
    email: "agency@demo.sitelytc.com",
    name: "Rohan",
    org: "Northstar Digital",
    role: "agency",
    passwordHash:
      "v1$120000$oyf_I9RLd3EqHIpAeoG_Ew$lYJlef2FSiyk4I7b3GbKONQRe3bJ3Zcfk56-wZdvQbM",
  },
];

export async function findUserByEmail(email: string): Promise<User | null> {
  const e = email.trim().toLowerCase();
  // DB SEAM: if (process.env.DATABASE_URL) return db.query.users.findFirst(...)
  return demoUsers.find((u) => u.email === e) ?? null;
}

/** Constant-time PBKDF2 password verification. */
export async function verifyPassword(
  user: User,
  password: string,
): Promise<boolean> {
  const [v, itersStr, saltB64, hashB64] = user.passwordHash.split("$");
  if (v !== "v1" || !itersStr || !saltB64 || !hashB64) return false;
  const iterations = parseInt(itersStr, 10);
  const salt = fromB64url(saltB64);
  const expected = fromB64url(hashB64);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      key,
      expected.length * 8,
    ),
  );

  if (derived.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) diff |= derived[i]! ^ expected[i]!;
  return diff === 0;
}
