import { Redis } from "@upstash/redis";

/**
 * Fixed-window rate limiter backed by Upstash Redis.
 *
 * If Redis env vars are absent (e.g. local dev), the limiter "fails open" so
 * the app still runs — production MUST set UPSTASH_REDIS_REST_URL/TOKEN.
 */
const hasRedis =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasRedis ? Redis.fromEnv() : null;

type Window = "1m" | "1h" | "1d";

const windowSeconds: Record<Window, number> = {
  "1m": 60,
  "1h": 3600,
  "1d": 86400,
};

export async function rateLimit(
  identifier: string,
  options: { limit: number; window: Window },
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const seconds = windowSeconds[options.window];

  if (!redis) {
    // Dev fallback: never block, but make it obvious in logs.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[rate-limit] Redis not configured — allowing request.");
    }
    return { success: true, remaining: options.limit, reset: Date.now() + seconds * 1000 };
  }

  const key = `rate-limit:${identifier}`;
  const requests = await redis.incr(key);
  if (requests === 1) await redis.expire(key, seconds);

  return {
    success: requests <= options.limit,
    remaining: Math.max(0, options.limit - requests),
    reset: Date.now() + seconds * 1000,
  };
}

/** Best-effort client IP, preferring Cloudflare's header. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("CF-Connecting-IP") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
