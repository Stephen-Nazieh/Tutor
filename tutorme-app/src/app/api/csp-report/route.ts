/**
 * CSP Violation Report Endpoint
 * 
 * Receives Content Security Policy violation reports from browsers.
 * In production, these should be sent to a logging service (Sentry, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const report = await req.json()
    
    // Log CSP violations
    // In production, send to your error tracking service (Sentry, etc.)
    if (process.env.NODE_ENV === 'production') {
      console.warn('[CSP Violation]', JSON.stringify(report))
    } else {
      console.log('[CSP Violation - Dev]', JSON.stringify(report, null, 2))
    }
    
    return NextResponse.json({ received: true })
  } catch {
    // Silently accept malformed reports to avoid exposing errors
    return NextResponse.json({ received: true })
  }
}
