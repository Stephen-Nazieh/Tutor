// @ts-nocheck
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */

import * as Sentry from '@sentry/nextjs'
import { reportMetric, reportError } from '@/lib/performance/performance-monitoring-shared'

export function getSentryInitOptions(overrides?: Record<string, unknown>) {
  const base: Parameters<typeof Sentry.init>[0] = {
    dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV ?? 'development',
    tracesSampleRate: 0.1,
    profilesSampleRate: 0.1,
    normalizeDepth: 10,
    autoSessionTracking: true,
    maxBreadcrumbs: 50,
    maxValueLength: 10000,
    beforeSend(event) {
      if (event.extra) {
        const extra = event.extra as Record<string, unknown>
        if ('password' in extra) delete extra.password
        if ('creditCard' in extra) delete extra.creditCard
        if ('token' in extra) delete extra.token
        if ('apiKey' in extra) delete extra.apiKey
      }
      const t = event.exception?.values?.[0]?.type
      if (t === 'ChunkLoadError' || t === 'Loading chunk failed') return null
      if (event.message?.includes?.('loading') || event.message?.includes?.('chunk')) return null
      return event
    },
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.category === 'console' && breadcrumb.data?.arguments) {
        const args = breadcrumb.data.arguments as unknown[]
        if (args.some((a) => typeof a === 'string' && a.toLowerCase().includes('password'))) return null
      }
      return breadcrumb
    },
  }
  return { ...base, ...overrides } as Parameters<typeof Sentry.init>[0]
}

export const globalErrorHandler = {
  handleError(error: Error, context?: Record<string, unknown>) {
    Sentry.captureException(error, { extra: context, tags: { source: 'global_handler', region: 'global' } })
    try {
      reportError(error, context)
    } catch {
      /* ignore */
    }
  },
  handleWarning(warning: string, context?: Record<string, unknown>) {
    Sentry.captureMessage(warning, 'warning', { extra: context, tags: { source: 'global_handler', region: 'global' } })
  },
  addBreadcrumb(breadcrumb: { message: string; data?: Record<string, unknown>; category?: string }) {
    Sentry.addBreadcrumb({
      category: breadcrumb.category ?? 'default',
      message: breadcrumb.message,
      data: breadcrumb.data,
      timestamp: Date.now() / 1000,
    })
  },
}

function captureMetric(name: string, value: number, unit: string) {
  try {
    const m = (Sentry as { metrics?: { distribution?: (n: string, v: number, o?: object) => void; count?: (n: string, v?: number) => void } }).metrics
    if (unit === 'count' && typeof m?.count === 'function') m.count(name, value)
    else if (typeof m?.distribution === 'function') m.distribution(name, value, { unit: 'millisecond' })
    else reportMetric(name, value, unit === 'count' ? 'count' : 'ms')
  } catch {
    reportMetric(name, value, unit === 'count' ? 'count' : 'ms')
  }
}

export const globalPerformanceMonitor = {
  trackApiEndpoint(endpoint: string, responseTime: number, errorCount: number) {
    captureMetric('api_response_time', responseTime, 'ms')
    if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count')
  },
  trackInteraction(type: string, element: string, value?: unknown) {
    Sentry.addBreadcrumb({ category: 'interaction', message: `${type} on ${element}`, data: value as Record<string, unknown>, timestamp: Date.now() / 1000 })
  },
  trackCacheHit(cacheKey: string, hit: boolean) {
    reportMetric('cache_hit_rate', hit ? 1 : 0, 'count', { cacheKey, type: hit ? 'HIT' : 'MISS' })
  },
  trackWebVital(name: string, value: number) {
    captureMetric(`web_vital_${name.toLowerCase()}`, value, name === 'CLS' ? 'none' : 'ms')
  },
  trackLongTask(_startTime: number, duration: number) {
    captureMetric('long_task_duration', duration, 'ms')
  },
}

export function setupClientMonitoring() {
  if (typeof window === 'undefined') return
  window.addEventListener('error', (event) => {
    if (event.error?.message?.includes?.('loading') || event.error?.message?.includes?.('chunk') || event.message?.includes?.('loading') || event.message?.includes?.('chunk')) return
    globalErrorHandler.handleError(event.error ?? new Error(event.message), { filename: event.filename, lineno: event.lineno, colno: event.colno, userAgent: navigator.userAgent, timestamp: Date.now() })
  })
  window.addEventListener('unhandledrejection', (event) => {
    const err = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    if (err.message?.includes?.('loading') || err.message?.includes?.('chunk')) return
    globalErrorHandler.handleError(err, { type: 'unhandledrejection', timestamp: Date.now() })
  })
  if ('PerformanceObserver' in window) {
    try {
      const o = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as PerformanceEntry & { value?: number; renderTime?: number; loadTime?: number }
          const value = e.value ?? e.renderTime ?? e.loadTime ?? e.duration ?? 0
          if (value > 0) {
            const name = (e.name || e.entryType || '').toUpperCase()
            const vital = name.includes('LCP') || name.includes('LARGEST') ? 'LCP' : name.includes('FID') || name.includes('FIRST-INPUT') ? 'FID' : name.includes('CLS') || name.includes('LAYOUT') ? 'CLS' : name.includes('TTFB') ? 'TTFB' : name.includes('FCP') ? 'FCP' : name
            globalPerformanceMonitor.trackWebVital(vital, value)
          }
        }
      })
      o.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] })
    } catch {
      /* ignore */
    }
    try {
      const o2 = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as PerformanceEntry
          globalPerformanceMonitor.trackLongTask(e.startTime, e.duration)
        }
      })
      o2.observe({ entryTypes: ['longtask'] })
    } catch {
      /* ignore */
    }
  }
}

export { Sentry }
