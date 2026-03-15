// Simple in-memory rate limiter — per serverless instance, good enough for low-traffic protection
const map = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = map.get(ip)

  if (!entry || now > entry.resetAt) {
    map.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}

export function getIP(req: Request): string {
  const forwarded = (req.headers as Headers).get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}
