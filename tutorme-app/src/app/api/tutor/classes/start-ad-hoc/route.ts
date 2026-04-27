import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { getPool } from '@/lib/db/drizzle'
import { liveSession, user, course } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { notify } from '@/lib/notifications/notify'

const SPECIAL_TOKENS = ['kim.kon#26', 'stephen#26'] // fallback token, should match the one in landing page

export const POST = withAuth(
  async (req: NextRequest, { user: currentUser }) => {
    try {
      const { type, courseId, title, trainingToken, targetAudience, trainingCategory } =
        await req.json()

      if (type === 'training') {
        // Verify token
        if (!SPECIAL_TOKENS.includes(trainingToken)) {
          return NextResponse.json({ error: 'Invalid access token' }, { status: 403 })
        }

        const sessionId = randomUUID()

        await drizzleDb.insert(liveSession).values({
          sessionId,
          tutorId: currentUser.id,
          courseId: null, // Training sessions aren't tied to a specific course
          title: title || 'Live Training Session',
          category: 'Training',
          description: 'Tutor training session',
          status: 'active',
          startedAt: new Date(),
          scheduledAt: new Date(),
          roomId: randomUUID(), // This will be created in daily.co when accessed
        })

        // Notify tutors based on target audience
        const pool = getPool()
        let targetTutorIds: string[] = []

        if (targetAudience === 'new') {
          // Tutors who have NEVER attended a training session
          const result = await pool.query(
            `SELECT u."id" FROM "User" u
             WHERE u."role" = 'TUTOR'
             AND NOT EXISTS (
               SELECT 1 FROM "TrainingAttendance" ta
               WHERE ta."tutorId" = u."id"
             )`
          )
          targetTutorIds = result.rows.map((r: any) => r.id)
        } else if (targetAudience === 'math') {
          const result = await pool.query(
            `SELECT u."id" FROM "User" u
             JOIN "Profile" p ON u."id" = p."userId"
             WHERE u."role" = 'TUTOR'
             AND EXISTS (
               SELECT 1 FROM unnest(p."subjectsOfInterest") s
               WHERE LOWER(s) LIKE '%math%'
             )`
          )
          targetTutorIds = result.rows.map((r: any) => r.id)
        } else if (targetAudience === 'science') {
          const result = await pool.query(
            `SELECT u."id" FROM "User" u
             JOIN "Profile" p ON u."id" = p."userId"
             WHERE u."role" = 'TUTOR'
             AND EXISTS (
               SELECT 1 FROM unnest(p."subjectsOfInterest") s
               WHERE LOWER(s) LIKE '%science%'
                OR LOWER(s) LIKE '%physics%'
                OR LOWER(s) LIKE '%chemistry%'
                OR LOWER(s) LIKE '%biology%'
             )`
          )
          targetTutorIds = result.rows.map((r: any) => r.id)
        } else if (targetAudience === 'language') {
          const result = await pool.query(
            `SELECT u."id" FROM "User" u
             JOIN "Profile" p ON u."id" = p."userId"
             WHERE u."role" = 'TUTOR'
             AND EXISTS (
               SELECT 1 FROM unnest(p."subjectsOfInterest") s
               WHERE LOWER(s) LIKE '%english%'
                OR LOWER(s) LIKE '%language%'
                OR LOWER(s) LIKE '%literature%'
                OR LOWER(s) LIKE '%ielts%'
                OR LOWER(s) LIKE '%toefl%'
             )`
          )
          targetTutorIds = result.rows.map((r: any) => r.id)
        } else {
          // 'all' or any other value — notify all tutors
          const result = await drizzleDb
            .select({ id: user.userId })
            .from(user)
            .where(eq(user.role, 'TUTOR'))
          targetTutorIds = result.map(r => r.id)
        }

        const notifyPromises = targetTutorIds.map(tutorId =>
          notify({
            userId: tutorId,
            type: 'system',
            title: 'New Training Session Started',
            message: `A new ${trainingCategory || 'orientation'} training session has started!`,
            actionUrl: `/tutor/sessions/${sessionId}`,
          })
        )
        await Promise.allSettled(notifyPromises)

        return NextResponse.json({ success: true, sessionId })
      }

      if (type === 'teaching') {
        if (!courseId) {
          return NextResponse.json(
            { error: 'Course ID is required for teaching sessions' },
            { status: 400 }
          )
        }

        // Check if course is published and has students
        const [courseRecord] = await drizzleDb
          .select()
          .from(course)
          .where(eq(course.courseId, courseId))
          .limit(1)
        if (!courseRecord) {
          return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        const sessionId = randomUUID()
        const isPublished = courseRecord.isPublished

        await drizzleDb.insert(liveSession).values({
          sessionId,
          tutorId: currentUser.id,
          courseId,
          title: title || `${courseRecord.name} - Live Session`,
          category: Array.isArray(courseRecord.categories)
            ? courseRecord.categories[0] || 'General'
            : 'General',
          status: 'active',
          startedAt: new Date(),
          scheduledAt: new Date(),
          roomId: randomUUID(),
        })

        if (isPublished) {
          // Find enrolled students and notify them
          // Note: In a real app, we would query courseEnrollment table to find students
          // For now, we'll assume the notification logic exists elsewhere or we trigger it via an event
        }

        return NextResponse.json({ success: true, sessionId })
      }

      return NextResponse.json({ error: 'Invalid session type' }, { status: 400 })
    } catch (error) {
      console.error('Failed to create session:', error)
      const errObj = error as any
      return NextResponse.json(
        { error: errObj?.message || 'Internal server error' },
        { status: 500 }
      )
    }
  },
  { role: 'TUTOR' }
)
