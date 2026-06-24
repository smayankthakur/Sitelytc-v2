# Deploying Sitelytc to Vercel

This app is a standard Next.js 15 project. Vercel auto-detects the build — the
included `vercel.json` only pins the framework and sets the primary serverless
region to Mumbai (`bom1`), closest to the India-first audience.

## 1. Import the repo

1. Go to vercel.com → **Add New… → Project**.
2. Import `smayankthakur/Sitelytc-v2` from GitHub.
3. Framework preset: **Next.js** (auto-detected). Leave build & output settings
   at their defaults:
   - Build command: `next build`
   - Install command: `npm install`
   - Output: handled by Next.js
4. Don't deploy yet — add environment variables first (next section).

## 2. Environment variables

Add these under **Project → Settings → Environment Variables** (Production, and
Preview if you want PR previews to work). The app runs without them — every
integration no-ops gracefully — but live features need the real values.

| Variable | Needed for | Public? |
|---|---|---|
| `HUBSPOT_API_KEY` | CRM sync (contact, waitlist, newsletter) | no |
| `HUBSPOT_AGENCY_PIPELINE_ID`, `HUBSPOT_AGENCY_STAGE_ID` | Agency Leads deals | no |
| `HUBSPOT_KRITVIA_PIPELINE_ID`, `HUBSPOT_KRITVIA_STAGE_ID` | Kritvia waitlist deals | no |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | INR package checkout | no |
| `RAZORPAY_WEBHOOK_SECRET` | Verifying payment webhooks | no |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | International payments | no |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `MAYANK_WHATSAPP_NUMBER` | Lead notifications | no |
| `CLOUDFLARE_TURNSTILE_SECRET` | CAPTCHA verification (server) | no |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA widget (client) | **yes** |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | no |
| `DATABASE_URL` | Postgres (when wired) | no |
| `NEXTAUTH_SECRET` | Auth (when wired) | no |
| `NEXT_PUBLIC_CALENDLY_URL` | Booking CTAs | **yes** |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp sticky CTA | **yes** |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, payment callback | **yes** |

> **Rate limiting:** without the Upstash Redis vars, the limiter "fails open"
> (allows all requests). Set them in production. A free Upstash Redis database
> takes two minutes to create.

Set `NEXT_PUBLIC_SITE_URL` to your final domain (e.g. `https://sitelytc.com`) so
canonical URLs and the Razorpay payment callback resolve correctly.

## 3. Deploy

Click **Deploy**. First build takes a couple of minutes. You'll get a
`*.vercel.app` URL to verify everything renders.

## 4. Custom domain + Cloudflare

The project brief routes traffic through Cloudflare Pro in front of Vercel:

1. In Vercel → **Settings → Domains**, add `sitelytc.com`.
2. In Cloudflare DNS, point the domain at Vercel (CNAME to the Vercel target, or
   the A/AAAA records Vercel provides), proxied (orange cloud) **on**.
3. Configure the Cloudflare side per `skills/security-hardening` in the
   `sitelytc-rebuild` plugin: WAF (OWASP ruleset), TLS 1.3 min, HSTS preload,
   and rate-limiting rules for `/api/contact` and `/api/payment`.

App-level security headers (HSTS, X-Frame-Options, nosniff, COOP) ship from
`next.config.ts`, and the nonce-based CSP from `src/middleware.ts` — these work
on Vercel automatically.

## 5. Post-deploy checklist

- [ ] Razorpay dashboard → Webhooks → add `https://<domain>/api/webhook/razorpay`,
      subscribe to `payment_link.paid` / `payment.captured`, set the signing
      secret to match `RAZORPAY_WEBHOOK_SECRET`.
- [ ] Cloudflare Turnstile → create a widget for the domain, set site key
      (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) and secret (`CLOUDFLARE_TURNSTILE_SECRET`).
- [ ] Set `NEXT_PUBLIC_CALENDLY_URL` to the real Calendly link.
- [ ] Set `MAYANK_WHATSAPP_NUMBER` + `NEXT_PUBLIC_WHATSAPP_NUMBER` (format `91XXXXXXXXXX`).
- [ ] Submit a test contact form → confirm the HubSpot contact + deal appear.
- [ ] Run a Razorpay test-mode payment → confirm the webhook fires and the
      callback lands on `/payment/success`.
- [ ] Run Lighthouse — target 95+ performance/accessibility per the brief.

## CI/CD

Once imported, every push to `main` auto-deploys to production and every pull
request gets a preview URL. No extra configuration needed.
