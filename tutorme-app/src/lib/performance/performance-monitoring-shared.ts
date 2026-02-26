/**
 * Client/Edge-safe performance reporting (no DB, no Node-only modules).
 * Use this from Sentry setup and client components so the bundle never pulls in
 * pg/drizzle or notify (which would break browser and Edge).
 *
 * For server-only features (DB persistence, alerting), use performance-monitoring.ts.
 */

import * as Sentry from '@sentry/nextjs'

/**
 * Report metric (Sentry-only; safe for client and Edge).
 */
export function reportMetric(
  name: string,
  value: number,
  unit: 'ms' | 'bytes' | 'count' | 'percentage' = 'ms',
  tags?: Record<string, string>
): void {
  try {
    const m = (Sentry as { metrics?: { distribution?: (n: string, v: number, o?: object) => void; count?: (n: string, v?: number) => void } }).metrics
    if (unit === 'count' && typeof m?.count === 'function') {
      m.count(name, value)
    } else if (typeof m?.distribution === 'function') {
      m.distribution(name, value, { unit: 'millisecond', tags })
    }
  } catch {
    /* no-op */
  }
}

/**
 * Report error (Sentry-only; safe for client and Edge).
 */
export function reportError(error: Error, context?: Record<string, unknown>): void {
  try {
    Sentry.captureException(error, { extra: context })
  } catch {
    /* no-op */
  }
}
