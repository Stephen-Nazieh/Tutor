/**
 * Web Vitals Analytics API
 * Receives performance metrics from the client via navigator.sendBeacon
 * POST /api/analytics/web-vitals
 */

import { NextRequest, NextResponse } from 'next/server'

interface WebVitalMetric {
  id: string
  name: string
  value: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  entries?: unknown[]
  navigationType?: string
}

/**
 * POST handler for web vitals
 * Uses sendBeacon which doesn't send content-type, so we handle both JSON and text
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the metric from the request body
    let metric: WebVitalMetric

    try {
      const body = await req.json()
      metric = body as WebVitalMetric
    } catch {
      // If JSON parsing fails, try to parse as text (sendBeacon sends plain text sometimes)
      const text = await req.text()
      metric = JSON.parse(text) as WebVitalMetric
    }

    // In development, log the metric
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vital] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      })
    }

    // TODO: Store metrics in database for production analytics
    // Example with Drizzle:
    // await drizzleDb.insert(webVitalsTable).values({
    //   id: metric.id,
    //   name: metric.name,
    //   value: metric.value,
    //   rating: metric.rating,
    //   timestamp: new Date(),
    //   userAgent: req.headers.get('user-agent'),
    //   url: req.headers.get('referer'),
    // });

    // For now, just acknowledge receipt
    return NextResponse.json({ success: true })
  } catch (error) {
    // Log error but don't fail - analytics should never break the user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('[Web Vitals] Error processing metric:', error)
    }

    // Return 200 even on error to prevent client retries
    return NextResponse.json({ success: false, error: 'Invalid metric' }, { status: 200 })
  }
}

/**
 * OPTIONS handler for CORS preflight
 * sendBeacon sends preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
