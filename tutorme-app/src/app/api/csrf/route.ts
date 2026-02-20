/**
 * CSRF token endpoint. GET returns a token and sets the CSRF cookie.
 * Client should send this token in X-CSRF-Token header on state-changing requests.
 */

import { NextResponse } from 'next/server'
import { getCsrfToken } from '@/lib/security/csrf'

export async function GET() {
  const token = await getCsrfToken()
  return NextResponse.json({ token })
}
