const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= LIMIT) return false;

  entry.count++;
  return true;
}
