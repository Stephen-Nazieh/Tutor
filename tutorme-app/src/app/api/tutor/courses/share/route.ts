/**
 * Tutor Course Sharing API
 * POST: Share course with parent(s) by email
 * GET: List courses shared by this tutor
 * Global tutor-parent course sharing system (one-way: tutors → parents)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, withRateLimit } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

const shareSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  recipientEmails: z.array(z.string().email()).min(1, 'At least one recipient email required'),
  message: z.string().min(1, 'Message is required'),
  parentIds: z.array(z.string()).optional(),
})

async function postHandler(req: NextRequest, session: { user: { id: string; name?: string | null } }) {
  const rateLimit = await withRateLimit(req, 20)
  if (rateLimit.response) return rateLimit.response

  const body = await req.json()
  const parseResult = shareSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const data = parseResult.data

  const course = await db.curriculum.findUnique({
    where: {
      id: data.courseId,
      creatorId: session.user.id,
    },
  })

  if (!course) {
    return NextResponse.json(
      { error: 'Course not found or permission denied' },
      { status: 404 }
    )
  }

  const results: Array<{ email: string; status: string; error?: string }> = []

  for (const email of data.recipientEmails) {
    try {
      const recipient = await db.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          profile: { select: { name: true } },
          familyMembers: {
            where: { relation: { in: ['parent', 'PARENT', 'guardian'] } },
            select: { familyAccountId: true },
          },
        },
      })

      if (!recipient) {
        results.push({ email, status: 'not_found' })
        continue
      }

      if (recipient.role !== 'PARENT' && recipient.role !== 'ADMIN') {
        results.push({ email, status: 'not_parent' })
        continue
      }

      const existingShare = await db.curriculumShare.findUnique({
        where: {
          curriculumId_recipientId: {
            curriculumId: data.courseId,
            recipientId: recipient.id,
          },
        },
      })

      if (existingShare) {
        results.push({ email, status: 'already_shared' })
        continue
      }

      const shareRecord = await db.curriculumShare.create({
        data: {
          curriculumId: data.courseId,
          sharedByTutorId: session.user.id,
          recipientId: recipient.id,
          message: data.message,
          isPublic: false,
        },
      })

      const familyAccountId = recipient.familyMembers[0]?.familyAccountId
      if (familyAccountId) {
        const tutorName = session.user.name ?? 'Your teacher'
        await db.familyNotification.create({
          data: {
            parentId: familyAccountId,
            title: 'Course Shared by Tutor',
            message: `${tutorName} shared a course with you: "${course.name}". ${data.message} View: /parent/courses/${shareRecord.id}`,
          },
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
    resource: 'curriculum-share',
    resourceId: data.courseId,
    recipientCount: data.recipientEmails.length,
    results: results.map((r) => ({ email: r.email, status: r.status })),
  })

  return NextResponse.json({
    success: true,
    results,
    message: 'Course shared successfully with selected parents',
    courseId: data.courseId,
  })
}

async function getHandler(_req: NextRequest, session: { user: { id: string } }) {
  const sharedCourses = await db.curriculumShare.findMany({
    where: { sharedByTutorId: session.user.id },
    orderBy: { sharedAt: 'desc' },
    include: {
      recipient: {
        include: {
          profile: { select: { name: true } },
        },
      },
      curriculum: {
        select: {
          id: true,
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
