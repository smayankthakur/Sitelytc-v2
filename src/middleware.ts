import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

/**
 * Nonce-based Content-Security-Policy.
 *
 * A fresh nonce is generated per request and attached to the response header
 * `x-nonce`, which Server Components read to stamp inline <script> tags.
 * This keeps `'unsafe-inline'` out of script-src while still allowing Next.js
 * hydration scripts to run.
 */
export async function middleware(request: NextRequest) {
  // ── Portal route protection (role-based) ──
  const { pathname } = request.nextUrl;
  const isClientArea = pathname.startsWith("/portal/client");
  const isAgencyArea = pathname.startsWith("/portal/agency");
  if (isClientArea || isAgencyArea) {
    const session = await verifySessionToken(
      request.cookies.get(SESSION_COOKIE)?.value,
    );
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/login";
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    if (isClientArea && session.role !== "client") {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/agency";
      url.search = "";
      return NextResponse.redirect(url);
    }
    if (isAgencyArea && session.role !== "agency") {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/client";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Edge runtime: use Web APIs only (no Node Buffer).
  const nonce = btoa(crypto.randomUUID());

  const isDev = process.env.NODE_ENV !== "production";

  // In dev, Next.js needs 'unsafe-eval' for React Refresh / Fast Refresh.
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `frame-src 'self' https://calendly.com https://*.calendly.com https://www.loom.com`,
    `connect-src 'self' https://api.hubapi.com https://api.razorpay.com https://api.stripe.com https://challenges.cloudflare.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
