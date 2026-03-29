import { NextResponse } from 'next/server'
import { getAllowedOrigins } from './cors'
import { getCspHeader } from './csp'

export function addSecurityHeaders(res: NextResponse, req?: Request): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Content-Security-Policy', getCspHeader())

  if (req) {
    const origin = req.headers.get('origin')
    if (origin && getAllowedOrigins().includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }
  }

  return res
}
