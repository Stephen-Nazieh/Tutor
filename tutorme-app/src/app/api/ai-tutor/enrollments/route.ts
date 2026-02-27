/**
 * AI Tutor Enrollments API
 * GET /api/ai-tutor/enrollments — list (withAuth)
 * PATCH /api/ai-tutor/enrollments — update (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorEnrollment, aITutorDailyUsage } from '@/lib/db/schema'
import { eq, and, inArray, desc } from 'drizzle-orm'

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const enrollments = await drizzleDb
      .select()
      .from(aITutorEnrollment)
      .where(
        and(
          eq(aITutorEnrollment.studentId, session.user.id),
          inArray(aITutorEnrollment.status, ['active', 'paused'])
        )
      )
      .orderBy(desc(aITutorEnrollment.lastSessionAt))

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const [dailyUsage] = await drizzleDb
      .select()
      .from(aITutorDailyUsage)
      .where(
        and(
          eq(aITutorDailyUsage.userId, session.user.id),
          eq(aITutorDailyUsage.date, today)
        )
      )
      .limit(1)

    return NextResponse.json({
      enrollments: enrollments.map((e) => ({
        id: e.id,
        subjectCode: e.subjectCode,
        status: e.status,
        totalSessions: e.totalSessions,
        totalMinutes: e.totalMinutes,
        lastSessionAt: e.lastSessionAt,
        enrolledAt: e.enrolledAt,
      })),
      dailyUsage: {
        sessionCount: dailyUsage?.sessionCount ?? 0,
        minutesUsed: dailyUsage?.minutesUsed ?? 0,
      },
    })
  } catch (error) {
    console.error('Get enrollments error:', error)
    return NextResponse.json(
      { error: 'Failed to get enrollments' },
      { status: 500 }
    )
  }
}

async function patchHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { enrollmentId, updates } = body

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID required' },
        { status: 400 }
      )
    }

    const [enrollment] = await drizzleDb
      .select()
      .from(aITutorEnrollment)
      .where(
        and(
          eq(aITutorEnrollment.id, enrollmentId),
          eq(aITutorEnrollment.studentId, session.user.id)
        )
      )
      .limit(1)

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    const allowedUpdates: { status?: string } = {}
    if (updates?.status) allowedUpdates.status = updates.status

    if (Object.keys(allowedUpdates).length > 0) {
      await drizzleDb
        .update(aITutorEnrollment)
        .set(allowedUpdates)
        .where(eq(aITutorEnrollment.id, enrollmentId))
    }

    const [updated] = await drizzleDb
      .select()
      .from(aITutorEnrollment)
      .where(eq(aITutorEnrollment.id, enrollmentId))
      .limit(1)

    return NextResponse.json({
      enrollment: updated
        ? {
            id: updated.id,
            subjectCode: updated.subjectCode,
            status: updated.status,
            totalSessions: updated.totalSessions,
            totalMinutes: updated.totalMinutes,
          }
        : null,
    })
  } catch (error) {
    console.error('Update enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const PATCH = withAuth(patchHandler)
