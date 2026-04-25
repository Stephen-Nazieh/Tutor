import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { studentTaskReport, course } from '@/lib/db/schema'
import { notify } from '@/lib/notifications/notify'
import crypto from 'crypto'
import { eq } from 'drizzle-orm'

export const POST = withAuth(
  async (req: NextRequest, { user }) => {
    try {
      const { courseId, taskId, type, title } = await req.json()

      if (!courseId) {
        return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
      }

      // Fetch the course to get the tutorId
      const [courseRecord] = await drizzleDb
        .select()
        .from(course)
        .where(eq(course.courseId, courseId))
        .limit(1)

      if (!courseRecord) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }

      const tutorId = courseRecord.creatorId
      if (!tutorId) {
        return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
      }
      const reportId = crypto.randomUUID()
      const reportType = type || 'task' // 'task', 'assessment', or 'master'
      const reportTitle =
        title || (reportType === 'master' ? 'Master Report Request' : 'Detailed Report Request')

      await drizzleDb.insert(studentTaskReport).values({
        reportId,
        studentId: user.id,
        tutorId,
        courseId,
        taskId: taskId || null,
        type: reportType,
        title: reportTitle,
        status: 'requested',
      })

      // Notify the tutor
      const studentName = user.name || 'A student'
      await notify({
        userId: tutorId,
        type: 'class',
        title: 'Report Requested',
        message: `${studentName} has requested a ${reportType} report for course "${courseRecord.name}".`,
        actionUrl: '/tutor/reports', // They can manage reports here
      })

      return NextResponse.json({ success: true, message: 'Report requested successfully' })
    } catch (error) {
      console.error('Failed to request report:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  },
  { role: 'STUDENT' }
)
