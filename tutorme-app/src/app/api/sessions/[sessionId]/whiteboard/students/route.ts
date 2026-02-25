/**
 * Get all visible student whiteboards for a session
 * 
 * GET /api/sessions/[sessionId]/whiteboard/students
 * Returns all student whiteboards that are visible to the tutor
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId } = params
  
  // Only tutors can view all student whiteboards
  if (session.user.role !== 'TUTOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Get all whiteboards for this session that are not private
  const whiteboards = await db.whiteboard.findMany({
    where: {
      sessionId,
      ownerType: 'student',
      visibility: {
        in: ['tutor-only', 'public']
      }
    },
    include: {
      pages: {
        orderBy: { order: 'asc' },
        take: 1 // Only get first page for preview
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
  
  // Get student names
  const studentIds = whiteboards.map(wb => wb.tutorId)
  const students = await db.user.findMany({
    where: {
      id: { in: studentIds }
    },
    select: {
      id: true,
      profile: {
        select: {
          name: true
        }
      }
    }
  })
  
  const studentMap = new Map(students.map(s => [s.id, s.profile?.name || 'Unknown']))
  
  // Format response
  const formattedWhiteboards = whiteboards.map(wb => ({
    id: wb.id,
    studentId: wb.tutorId,
    studentName: studentMap.get(wb.tutorId) || 'Unknown',
    visibility: wb.visibility,
    title: wb.title,
    pages: wb.pages,
    updatedAt: wb.updatedAt
  }))
  
  return NextResponse.json({ whiteboards: formattedWhiteboards })
})
