type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requests =
  new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000;

const MAX_REQUESTS = 30;

export function checkRateLimit(
  key: string,
): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();

  const existing = requests.get(key);

  if (
    !existing ||
    existing.resetAt <= now
  ) {
    requests.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(
        (existing.resetAt - now) / 1000,
      ),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining:
      MAX_REQUESTS - existing.count,
  };
}