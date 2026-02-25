'use client'

import { ReactNode, Suspense } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

// Service Worker Registration Component
function ServiceWorkerProvider() {
  // This runs only on client side due to 'use client'
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  }
  return null
}

// Web Vitals Analytics Component
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

// Optimized Head Component
function OptimizedHead() {
  // This runs only on client side due to 'use client'
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
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
    } catch (e) {
      // Ignore if LCP observer is not supported
    }
  }
  return null
}

interface PerformanceProvidersProps {
  children: ReactNode
}

export function PerformanceProviders({ children }: PerformanceProvidersProps) {
  return (
    <>
      <ServiceWorkerProvider />
      <WebVitalsAnalytics />
      <OptimizedHead />
      <Suspense fallback={<AppSkeleton />}>
        {children}
      </Suspense>
    </>
  )
}

// Optimized skeleton component
function AppSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        <nav className="h-16 bg-white border-b shadow-sm" />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
