/**
 * Get a specific student's whiteboard
 * 
 * GET /api/sessions/[sessionId]/whiteboard/[studentId]
 * Tutor can view any student's whiteboard; students can only view if public
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { sessionId, studentId } = params
  const userId = session.user.id
  const userRole = session.user.role
  
  // Find the student's whiteboard
  const whiteboard = await db.whiteboard.findFirst({
    where: {
      sessionId,
      tutorId: studentId,
      ownerType: 'student'
    },
    include: {
      pages: {
        orderBy: { order: 'asc' }
      }
    }
  })
  
  if (!whiteboard) {
    return NextResponse.json({ error: 'Whiteboard not found' }, { status: 404 })
  }
  
  // Check permissions
  if (userRole === 'TUTOR') {
    // Tutor can view if visibility is not 'private'
    if (whiteboard.visibility === 'private') {
      return NextResponse.json({ error: 'Whiteboard is private' }, { status: 403 })
    }
  } else {
    // Student can only view if public
    if (whiteboard.visibility !== 'public') {
      return NextResponse.json({ error: 'Whiteboard is not public' }, { status: 403 })
    }
    // And not their own
    if (studentId === userId) {
      // Return their own whiteboard
      return NextResponse.json({ whiteboard })
    }
  }
  
  // Get student name
  const student = await db.user.findUnique({
    where: { id: studentId },
    select: {
      profile: {
        select: {
          name: true
        }
      }
    }
  })
  
  return NextResponse.json({
    whiteboard: {
      ...whiteboard,
      studentName: student?.profile?.name || 'Unknown'
    }
  })
})
