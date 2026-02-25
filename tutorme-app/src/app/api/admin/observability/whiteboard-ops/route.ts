import { NextResponse } from 'next/server'
import { withAuth, ForbiddenError } from '@/lib/api/middleware'
import { getWhiteboardOpObservability } from '@/lib/socket-server'

export const GET = withAuth(async (req, session) => {
  const role = String(session.user.role || '').toUpperCase()
  if (role !== 'ADMIN' && role !== 'TUTOR') {
    throw new ForbiddenError('Only tutors and admins can access whiteboard observability')
  }

  const roomId = req.nextUrl.searchParams.get('roomId') || undefined
  const rows = getWhiteboardOpObservability(roomId)

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    totalBoards: rows.length,
    boards: rows,
  })
})

