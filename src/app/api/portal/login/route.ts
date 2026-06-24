import { NextResponse, type NextRequest } from "next/server";
import { portalLoginSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { findUserByEmail, verifyPassword } from "@/lib/users";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  // Throttle credential stuffing: 8 attempts / minute / IP.
  const limit = await rateLimit(`portal-login:${ip}`, {
    limit: 8,
    window: "1m",
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = portalLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const user = await findUserByEmail(parsed.data.email);
  // Always run verify to keep timing uniform whether or not the user exists.
  const ok = user
    ? await verifyPassword(user, parsed.data.password)
    : await verifyPassword(
        {
          id: "x",
          email: "x",
          name: "x",
          org: "x",
          role: "client",
          passwordHash:
            "v1$120000$u1q60mtr7PJdrud0HYtymg$s72xm6rxB2kmf543-EGVFUK6b6GSN3yPVlpUz7zG2Fc",
        },
        parsed.data.password,
      );

  if (!user || !ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    org: user.org,
  });

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
