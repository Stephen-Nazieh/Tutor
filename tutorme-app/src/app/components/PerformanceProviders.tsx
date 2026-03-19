'use client'

import { ReactNode, useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

// Service Worker Registration: side effect in useEffect so hooks are unconditional and order is stable.
function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return
    navigator.serviceWorker
      .register('/sw.js')
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  }, [])
  return null
}

// Web Vitals Analytics: single unconditional hook at top level.
function WebVitalsAnalytics() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production') {
      const body = JSON.stringify(metric)
      const url = '/api/analytics/web-vitals'
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body)
      } else {
        fetch(url, { body, method: 'POST', keepalive: true }).catch(() => {})
      }
    } else {
      console.log('[Web Vitals]', metric)
    }
  })
  return null
}

// LCP observer: side effect in useEffect so no conditional hooks; consistent server/client tree.
function OptimizedHead() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        if (process.env.NODE_ENV === 'development') {
          entries.forEach((entry) => {
            console.log('[LCP]', entry)
          })
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch {
      // Ignore if LCP observer is not supported
    }
  }, [])
  return null
}

interface PerformanceProvidersProps {
  children: ReactNode
}

/**
 * Performance providers. Renders children directly (no Suspense) to avoid
 * server/client hydration mismatch: server and client must see the same tree.
 */
export function PerformanceProviders({ children }: PerformanceProvidersProps) {
  return (
    <>
      <ServiceWorkerProvider />
      <WebVitalsAnalytics />
      <OptimizedHead />
      {children}
    </>
  )
}
