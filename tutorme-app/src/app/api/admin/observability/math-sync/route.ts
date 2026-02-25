import { NextResponse } from 'next/server'
import { withAuth, ForbiddenError } from '@/lib/api/middleware'
import { getMathSyncObservability } from '@/lib/socket-server'

export const GET = withAuth(async (req, session) => {
  const role = String(session.user.role || '').toUpperCase()
  if (role !== 'ADMIN' && role !== 'TUTOR') {
    throw new ForbiddenError('Only tutors and admins can access math sync observability')
  }

  const sessionId = req.nextUrl.searchParams.get('sessionId') || undefined
  const rows = getMathSyncObservability(sessionId)

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    totalRooms: rows.length,
    rooms: rows,
  })
})
