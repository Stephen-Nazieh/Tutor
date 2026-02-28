/**
 * GET /api/auth/session-realm?realm=tutor|student
 * Returns the session from the realm-scoped cookie so tutor/student tabs
 * can display the correct user without being overwritten by the default cookie.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSessionForRealm } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const realmParam = request.nextUrl.searchParams.get('realm')
  const realm = realmParam === 'tutor' ? 'tutor' : realmParam === 'student' ? 'student' : null
  if (!realm) {
    return NextResponse.json({ error: 'Missing or invalid realm (tutor|student)' }, { status: 400 })
  }

  const session = await getSessionForRealm(request, realm)
  return NextResponse.json(session ?? {})
}
