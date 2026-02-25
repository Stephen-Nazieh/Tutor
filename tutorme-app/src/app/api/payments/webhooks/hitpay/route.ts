/**
 * POST /api/payments/webhooks/hitpay
 * Hitpay webhook handler.
 * - Verifies Hitpay-Signature (HMAC-SHA256 with salt)
 * - Logs to WebhookEvent table
 * - Updates Payment and booking status
 * - Triggers email (stub)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { HitpayGateway } from '@/lib/payments'
import { sendPaymentConfirmation, sendTutorPaymentReceived } from '@/lib/notifications/payment-email'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('hitpay-signature') ?? ''

  const gateway = new HitpayGateway()
  const isValid = gateway.verifyWebhook(rawBody, signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const body = payload as { id?: string; status?: string; payment_request_id?: string }
  const gatewayPaymentId = body?.id ?? body?.payment_request_id ?? ''
  const eventId = body?.id

  if (eventId) {
    const existing = await db.webhookEvent.findFirst({
      where: { gateway: 'HITPAY', processed: true, payload: { path: ['id'], equals: eventId } }
    })
    if (existing) return NextResponse.json({ received: true })
  }

  let paymentId: string | null = null
  if (gatewayPaymentId) {
    const payment = await db.payment.findFirst({
      where: { gatewayPaymentId, gateway: 'HITPAY' }
    })
    paymentId = payment?.id ?? null
  }

  const webhookEvent = await db.webhookEvent.create({
    data: {
      paymentId,
      gateway: 'HITPAY',
      eventType: 'payment_request.completed',
      payload: payload as object
    }
  })

  const result = await gateway.processWebhook(payload)

  if (result.success && (result.status === 'completed' || result.status === 'succeeded')) {
    const payment = await db.payment.findFirst({
      where: {
        gateway: 'HITPAY',
        OR: [
          { gatewayPaymentId: result.paymentId ?? '' },
          { gatewayPaymentId: body?.id },
          { gatewayPaymentId: body?.payment_request_id }
        ]
      },
      include: {
        booking: {
          include: {
            student: { select: { email: true, profile: { select: { name: true } } } },
            clinic: { include: { tutor: { select: { email: true, profile: { select: { name: true } } } } } }
          }
        }
      }
    })
    if (payment) {
      await db.payment.update({
        where: { id: payment.id },
        data: { status: 'COMPLETED', paidAt: new Date() }
      })
      const meta = payment.metadata as Record<string, unknown> | null
      if (!payment.bookingId && meta?.type === 'course' && typeof meta.curriculumId === 'string' && typeof meta.studentId === 'string') {
        const { enrollStudentInCurriculum } = await import('@/lib/enrollment')
        enrollStudentInCurriculum(meta.studentId as string, meta.curriculumId)
          .then(async () => {
            const enrollment = await db.curriculumEnrollment.findUnique({
              where: {
                studentId_curriculumId: {
                  studentId: meta.studentId as string,
                  curriculumId: meta.curriculumId as string,
                },
              },
              select: { id: true, curriculum: { select: { creatorId: true } } },
            })
            if (enrollment) {
              await db.payment.update({
                where: { id: payment.id },
                data: {
                  enrollmentId: enrollment.id,
                  tutorId: enrollment.curriculum.creatorId || payment.tutorId,
                },
              })
            }
          })
          .catch(() => {})
        const user = await db.user.findUnique({
          where: { id: meta.studentId as string },
          select: { email: true, profile: { select: { name: true } } }
        })
        const description = 'Course enrollment'
        if (user?.email) {
          sendPaymentConfirmation({
            paymentId: payment.id,
            studentEmail: user.email,
            studentName: user.profile?.name,
            amount: payment.amount,
            currency: payment.currency,
            description
          }).catch(() => {})
        }
      } else if (payment.booking) {
        const student = payment.booking.student as { email: string; profile?: { name?: string } }
        const tutor = payment.booking.clinic.tutor as { email: string; profile?: { name?: string } }
        const description = `${payment.booking.clinic.title} – ${payment.booking.clinic.subject}`
        sendPaymentConfirmation({
          paymentId: payment.id,
          studentEmail: student.email,
          studentName: student.profile?.name,
          amount: payment.amount,
          currency: payment.currency,
          description
        }).catch(() => {})
        sendTutorPaymentReceived({
          paymentId: payment.id,
          tutorEmail: tutor.email,
          tutorName: tutor.profile?.name,
          amount: payment.amount,
          currency: payment.currency,
          description
        }).catch(() => {})
      }
    }
  }

  await db.webhookEvent.update({
    where: { id: webhookEvent.id },
    data: { processed: true, processedAt: new Date() }
  })

  return NextResponse.json({ received: true })
}
