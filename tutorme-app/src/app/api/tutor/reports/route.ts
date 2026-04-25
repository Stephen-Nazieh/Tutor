import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { studentTaskReport, profile } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { notify } from '@/lib/notifications/notify'

// GET /api/tutor/reports
export const GET = withAuth(
  async (req: NextRequest, { user: currentUser }) => {
    try {
      const reports = await drizzleDb
        .select({
          reportId: studentTaskReport.reportId,
          studentId: studentTaskReport.studentId,
          studentName: profile.name,
          courseId: studentTaskReport.courseId,
          taskId: studentTaskReport.taskId,
          type: studentTaskReport.type,
          title: studentTaskReport.title,
          status: studentTaskReport.status,
          createdAt: studentTaskReport.createdAt,
          sentAt: studentTaskReport.sentAt,
        })
        .from(studentTaskReport)
        .leftJoin(profile, eq(studentTaskReport.studentId, profile.userId))
        .where(eq(studentTaskReport.tutorId, currentUser.id))
        .orderBy(studentTaskReport.createdAt)

      return NextResponse.json({ reports })
    } catch (error) {
      console.error('Failed to fetch reports:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  },
  { role: 'TUTOR' }
)

// PATCH /api/tutor/reports
// Send or Update a report
export const PATCH = withAuth(
  async (req: NextRequest, { user: currentUser }) => {
    try {
      const { reportId, status, strengths, weaknesses, overallComments, score } = await req.json()

      if (!reportId) {
        return NextResponse.json({ error: 'Missing reportId' }, { status: 400 })
      }

      // Verify ownership
      const [existingReport] = await drizzleDb
        .select()
        .from(studentTaskReport)
        .where(
          and(
            eq(studentTaskReport.reportId, reportId),
            eq(studentTaskReport.tutorId, currentUser.id)
          )
        )
        .limit(1)

      if (!existingReport) {
        return NextResponse.json({ error: 'Report not found' }, { status: 404 })
      }

      const isSending = status === 'sent' && existingReport.status !== 'sent'

      const updateData: any = {
        updatedAt: new Date(),
      }

      if (status) updateData.status = status
      if (strengths) updateData.strengths = strengths
      if (weaknesses) updateData.weaknesses = weaknesses
      if (overallComments !== undefined) updateData.overallComments = overallComments
      if (score !== undefined) updateData.score = score
      if (isSending) updateData.sentAt = new Date()

      await drizzleDb
        .update(studentTaskReport)
        .set(updateData)
        .where(eq(studentTaskReport.reportId, reportId))

      if (isSending) {
        // Notify the student
        await notify({
          userId: existingReport.studentId,
          type: 'class',
          title: 'Report Received',
          message: `Your tutor has sent the "${existingReport.title}" report. Check your Directory!`,
          actionUrl: '/student/feedback',
        })
      }

      return NextResponse.json({ success: true, message: 'Report updated' })
    } catch (error) {
      console.error('Failed to update report:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  },
  { role: 'TUTOR' }
)
