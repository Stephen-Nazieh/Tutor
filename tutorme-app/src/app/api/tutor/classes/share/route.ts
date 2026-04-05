import { NextRequest, NextResponse } from 'next/server'
import { eq, inArray } from 'drizzle-orm'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  notification,
  liveSession,
  curriculumEnrollment,
  user as userTable,
  profile,
  courseBatch,
} from '@/lib/db/schema'
import crypto from 'crypto'

/**
 * POST /api/tutor/classes/share
 * Shares a live class link with selected students and groups (batches).
 */
export const POST = withAuth(
  async (req: NextRequest, session) => {
    const tutorId = session?.user?.id
    const body = await req.json()
    const { classId, studentIds = [], groupIds = [] } = body

    if (!classId) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 })
    }

    try {
      // 1. Verify class belongs to tutor
      const classData = await drizzleDb.query.liveSession.findFirst({
        where: eq(liveSession, classId),
      })

      if (!classData || classData.tutorId !== tutorId) {
        return NextResponse.json({ error: 'Class not found or unauthorized' }, { status: 404 })
      }

      const joinLink = `${req.nextUrl.origin}/student/feedback?sessionId=${classId}`
      const targetStudentIds = new Set<string>(studentIds)

      // 2. Resolve groupIds to studentIds
      if (groupIds.length > 0) {
        // First get courseIds from batches
        const batches = await drizzleDb.query.courseBatch.findMany({
          where: inArray(courseBatch.batchId, groupIds),
          columns: { courseId: true },
        })
        const courseIdsFromBatches = batches.map(b => b.courseId)
        
        // Then find enrollments for those courses
        if (courseIdsFromBatches.length > 0) {
          const groupEnrollments = await drizzleDb.query.curriculumEnrollment.findMany({
            where: inArray(curriculumEnrollment.courseId, courseIdsFromBatches),
            columns: { studentId: true },
          })
          groupEnrollments.forEach(e => targetStudentIds.add(e.studentId))
        }
      }

      if (targetStudentIds.size === 0) {
        return NextResponse.json({ error: 'No students or groups selected' }, { status: 400 })
      }

      // 3. Create notifications for each student
      const notificationsToInsert = Array.from(targetStudentIds).map(studentId => ({
        notificationId: crypto.randomUUID(),
        userId: studentId,
        type: 'CLASS_INVITATION',
        title: 'Class Invitation',
        message: `${session.user.name || 'Your tutor'} has invited you to join the class: ${classData.title}`,
        actionUrl: joinLink,
        read: false,
        createdAt: new Date(),
      }))

      if (notificationsToInsert.length > 0) {
        await drizzleDb.insert(notification).values(notificationsToInsert)
      }

      return NextResponse.json({
        success: true,
        message: `Class link shared with ${targetStudentIds.size} students`,
      })
    } catch (error) {
      console.error('Failed to share class:', error)
      return handleApiError(error, 'Failed to share class', 'api/tutor/classes/share/route.ts')
    }
  },
  { role: 'TUTOR' }
)
