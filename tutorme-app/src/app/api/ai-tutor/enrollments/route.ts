/**
 * AI Tutor Enrollments API
 * GET /api/ai-tutor/enrollments — list (withAuth)
 * PATCH /api/ai-tutor/enrollments — update (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const enrollments = await db.aITutorEnrollment.findMany({
      where: { 
        studentId: session.user.id,
        status: { in: ['active', 'paused'] }
      },
      orderBy: { lastSessionAt: 'desc' }
    })

    // Get usage for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const dailyUsage = await db.aITutorDailyUsage.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      }
    })

    return NextResponse.json({
      enrollments: enrollments.map((e: any) => ({
        id: e.id,
        subjectCode: e.subjectCode,
        status: e.status,
        totalSessions: e.totalSessions,
        totalMinutes: e.totalMinutes,
        lastSessionAt: e.lastSessionAt,
        enrolledAt: e.enrolledAt
      })),
      dailyUsage: {
        sessionCount: dailyUsage?.sessionCount || 0,
        minutesUsed: dailyUsage?.minutesUsed || 0
      }
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

    // Verify ownership
    const enrollment = await db.aITutorEnrollment.findFirst({
      where: {
        id: enrollmentId,
        studentId: session.user.id
      }
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Update allowed fields
    const allowedUpdates: any = {}
    if (updates.status) allowedUpdates.status = updates.status

    const updated = await db.aITutorEnrollment.update({
      where: { id: enrollmentId },
      data: allowedUpdates
    })

    return NextResponse.json({
      enrollment: {
        id: updated.id,
        subjectCode: updated.subjectCode,
        status: updated.status,
        totalSessions: updated.totalSessions,
        totalMinutes: updated.totalMinutes
      }
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
