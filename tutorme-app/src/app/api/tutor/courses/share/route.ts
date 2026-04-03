/**
 * Tutor Course Sharing API
 * POST: Share course with parent(s) by email
 * GET: List courses shared by this tutor
 * Global tutor-parent course sharing system (one-way: tutors → parents)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq, and, desc, sql } from 'drizzle-orm'
import { withAuth, withRateLimit } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, user, courseShare, familyNotification, familyMember } from '@/lib/db/schema'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'
import crypto from 'crypto'

const shareSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  recipientEmails: z.array(z.string().email()).min(1, 'At least one recipient email required'),
  message: z.string().min(1, 'Message is required'),
  parentIds: z.array(z.string()).optional(),
})

async function postHandler(
  req: NextRequest,
  session: { user: { id: string; name?: string | null } }
) {
  const rateLimit = await withRateLimit(req, 20)
  if (rateLimit.response) return rateLimit.response

  const body = await req.json().catch(() => ({}))
  const parseResult = shareSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const data = parseResult.data

  const [courseRow] = await drizzleDb
    .select()
    .from(course)
    .where(and(eq(course.courseId, data.courseId), eq(course.creatorId, session.user.id)))

  if (!courseRow) {
    return NextResponse.json({ error: 'Course not found or permission denied' }, { status: 404 })
  }

  const results: Array<{ email: string; status: string; error?: string }> = []

  for (const email of data.recipientEmails) {
    try {
      const recipient = await drizzleDb.query.user.findFirst({
        where: eq(user.email, email.toLowerCase()),
        with: {
          profile: { columns: { name: true } },
          familyMemberships: {
            where: (fm, { or }) =>
              or(
                eq(sql`lower(${fm.relation})`, 'parent'),
                eq(sql`lower(${fm.relation})`, 'children'),
                eq(sql`lower(${fm.relation})`, 'guardian')
              ),
            columns: { familyAccountId: true },
          },
        },
      })

      if (!recipient) {
        results.push({ email, status: 'not_found' })
        continue
      }

      if (recipient.role !== 'PARENT' && recipient.role !== 'ADMIN') {
      const shareId = crypto.randomUUID()
      const insertedShare = await drizzleDb
        .insert(courseShare)
        .values({
          shareId: shareId,
          courseId: data.courseId,
          sharedByTutorId: session.user.id,
          recipientId: recipient.userId,
          message: data.message,
          isPublic: false,
        })
        .onConflictDoNothing({ target: [courseShare.courseId, courseShare.recipientId] })
        .returning({ shareId: courseShare.shareId })

      if (insertedShare.length === 0) {
        results.push({ email, status: 'already_shared' })
        continue
      }
      })

      const familyAccountId = recipient.familyMemberships?.[0]?.familyAccountId
      if (familyAccountId) {
        const tutorName = session.user.name ?? 'Your teacher'
        await drizzleDb.insert(familyNotification).values({
          notificationId: crypto.randomUUID(),
          parentId: familyAccountId,
          title: 'Course Shared by Tutor',
          message: `${tutorName} shared a course with you: "${courseRow.name}". ${data.message} View: /parent/courses/${shareId}`,
          isRead: false,
        })
      }

      results.push({ email, status: 'sent' })
    } catch (shareError) {
      console.error(`Failed to share with ${email}:`, shareError)
      results.push({
        email,
        status: 'failed',
        error: shareError instanceof Error ? shareError.message : 'Unknown error',
      })
    }
  }

  await logAudit(session.user.id, AUDIT_ACTIONS.COURSE_SHARE, {
    resource: 'course-share',
    resourceId: data.courseId,
    recipientCount: data.recipientEmails.length,
    results: results.map(r => ({ email: r.email, status: r.status })),
  })

  return NextResponse.json({
    success: true,
    results,
    message: 'Course shared successfully with selected parents',
    courseId: data.courseId,
  })
}

async function getHandler(_req: NextRequest, session: { user: { id: string } }) {
  const sharedCourses = await drizzleDb.query.courseShare.findMany({
    where: eq(courseShare.sharedByTutorId, session.user.id),
    orderBy: [desc(courseShare.sharedAt)],
    with: {
      recipient: {
        with: {
          profile: { columns: { name: true } },
        },
      },
      course: {
        columns: {
          courseId: true,
          name: true,
          subject: true,
          gradeLevel: true,
          description: true,
        },
      },
    },
  })

  return NextResponse.json({
    success: true,
    sharedCourses,
    totalCount: sharedCourses.length,
  })
}

export const POST = withAuth(postHandler, { role: 'TUTOR' })
export const GET = withAuth(getHandler, { role: 'TUTOR' })
