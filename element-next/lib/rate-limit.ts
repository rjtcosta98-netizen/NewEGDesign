/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Works per serverless/edge instance. Good enough for low-traffic forms;
 * replace the Map with an external store (Upstash Redis, KV) when you need
 * cross-instance protection at scale.
 */

interface Entry {
  count: number;
  reset: number; // epoch ms when the window expires
}

const store = new Map<string, Entry>();

/**
 * Returns true if the request is allowed, false if it exceeds the limit.
 *
 * @param key       Unique key, e.g. "contact:1.2.3.4"
 * @param limit     Max requests allowed within the window
 * @param windowMs  Window duration in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}
