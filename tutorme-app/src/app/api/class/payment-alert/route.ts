/**
 * POST /api/class/payment-alert
 * Secure payment authorization - child cannot join without parent approval/payment.
 * Only students can trigger payment alerts to notify their linked parent.
 * Global compliance: English messages, role-based security, audit logging.
 */

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

const bodySchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
})

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== 'STUDENT') {
    return NextResponse.json(
      { error: 'Only students can alert parents for course payment' },
      { status: 403 }
    )
  }

  let body: z.infer<typeof bodySchema>
  try {
    const parsed = await request.json()
    body = bodySchema.parse(parsed)
  } catch (err) {
    const message = err instanceof z.ZodError
      ? err.errors.map((e) => e.message).join(', ')
      : 'Invalid request body'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    // Verify student has valid parent linkage via FamilyMember
    const familyMember = await db.familyMember.findFirst({
      where: {
        userId: session.user.id,
        relation: { in: ['child', 'children', 'CHILD', 'CHILDREN'] },
      },
      include: { familyAccount: true },
    })

    if (!familyMember?.familyAccount) {
      return NextResponse.json(
        { error: 'No parent linkage found. Please link your account to a parent.' },
        { status: 400 }
      )
    }

    const familyId = familyMember.familyAccountId

    // Verify curriculum exists and check if it requires payment
    const curriculum = await db.curriculum.findUnique({
      where: { id: body.courseId },
    })

    if (!curriculum) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    const isPaidCourse = (curriculum.price ?? 0) > 0
    const amount = curriculum.price ?? 0
    const currency = curriculum.currency ?? 'SGD'

    // Free course: student can join without payment check
    if (!isPaidCourse) {
      return NextResponse.json({
        success: true,
        message: 'Course payment confirmed',
        canJoin: true,
      })
    }

    // Check for completed payment (via Payment metadata or enrollmentId)
    const completedPayments = await db.payment.findMany({
      where: {
        status: 'COMPLETED',
        OR: [
          {
            metadata: {
              path: ['curriculumId'],
              equals: body.courseId,
            },
          },
          {
            enrollment: {
              curriculumId: body.courseId,
              studentId: session.user.id,
            },
          },
        ],
      },
      include: { enrollment: true },
    })

    const isPaid = completedPayments.some((p) => {
      const meta = p.metadata as Record<string, unknown> | null
      return meta?.studentId === session.user.id || p.enrollment?.studentId === session.user.id
    })

    if (isPaid) {
      return NextResponse.json({
        success: true,
        message: 'Course payment confirmed',
        canJoin: true,
      })
    }

    // Payment required: create notification for parent
    const studentName = session.user.name ?? session.user.email ?? 'Your child'
    const paymentUrl = `/parent/payments?courseId=${encodeURIComponent(body.courseId)}&studentId=${encodeURIComponent(session.user.id)}`

    await db.familyNotification.create({
      data: {
        parentId: familyId,
        title: 'Payment Required for Course',
        message: `${studentName} wants to join a paid course (${curriculum.name}). Please complete payment of ${currency} ${amount.toFixed(2)}. Go to: ${paymentUrl}`,
      },
    })

    // Audit log for security compliance
    await logAudit(session.user.id, AUDIT_ACTIONS.PAYMENT_ALERT, {
      resource: 'payment-alert',
      resourceId: body.courseId,
      roomId: body.roomId,
      curriculumId: body.courseId,
      familyAccountId: familyId,
    })

    return NextResponse.json(
      {
        error: 'Payment required for this course. Parent has been notified.',
        paymentRequired: true,
        parentNotified: true,
      },
      { status: 402 }
    )
  } catch (error) {
    console.error('Payment alert error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process payment alert',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
