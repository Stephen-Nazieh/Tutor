/**
 * Web Vitals API
 * Accepts POST from next/web-vitals (useReportWebVitals) to avoid 404s.
 * Returns 200; payload can be logged or stored later.
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    await request.json().catch(() => ({}))
    return new NextResponse(null, { status: 200 })
  } catch {
    return new NextResponse(null, { status: 200 })
  }
}
