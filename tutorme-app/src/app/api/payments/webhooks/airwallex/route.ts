/**
 * POST /api/payments/webhooks/airwallex
 * Airwallex webhook handler.
 * - Verifies x-signature (HMAC-SHA256 of x-timestamp + raw body)
 * - Logs to WebhookEvent table
 * - Updates Payment and booking status
 * - Triggers email (stub)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { AirwallexGateway } from '@/lib/payments'
import { sendPaymentConfirmation, sendTutorPaymentReceived } from '@/lib/notifications/payment-email'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const timestamp = req.headers.get('x-timestamp') ?? ''
  const signature = req.headers.get('x-signature') ?? ''

  const gateway = new AirwallexGateway()
  const isValid = gateway.verifyWebhook({ rawBody, timestamp }, signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const body = payload as { id?: string; name?: string; data?: { id?: string; status?: string; payment_attempt_id?: string } }
  const eventName = body?.name ?? 'unknown'
  const gatewayPaymentId = body?.data?.id
  const paymentAttemptId = body?.data?.payment_attempt_id
  const eventId = body?.id

  if (eventId) {
    const existing = await db.webhookEvent.findFirst({
      where: { gateway: 'AIRWALLEX', processed: true, payload: { path: ['id'], equals: eventId } }
    })
    if (existing) return NextResponse.json({ received: true })
  }

  let paymentId: string | null = null
  if (gatewayPaymentId) {
    const payment = await db.payment.findFirst({
      where: { gatewayPaymentId, gateway: 'AIRWALLEX' }
    })
    paymentId = payment?.id ?? null
  }

  const webhookEvent = await db.webhookEvent.create({
    data: {
      paymentId,
      gateway: 'AIRWALLEX',
      eventType: eventName,
      payload: payload as object
    }
  })

  const result = await gateway.processWebhook(payload)

  if (result.success && result.paymentId && result.status === 'succeeded') {
    const payment = await db.payment.findFirst({
      where: { gatewayPaymentId: result.paymentId, gateway: 'AIRWALLEX' },
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
      const existingMeta = (payment.metadata as Record<string, unknown>) || {}
      const metadata = paymentAttemptId ? { ...existingMeta, payment_attempt_id: paymentAttemptId } : existingMeta
      await db.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          ...(Object.keys(metadata).length > 0 ? { metadata } : {})
        }
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

  if (result.success && (result.status === 'cancelled' || result.eventType.includes('cancelled'))) {
    const payment = await db.payment.findFirst({
      where: { gatewayPaymentId: result.paymentId, gateway: 'AIRWALLEX' }
    })
    if (payment) {
      await db.payment.update({
        where: { id: payment.id },
        data: { status: 'CANCELLED' }
      })
    }
  }

  await db.webhookEvent.update({
    where: { id: webhookEvent.id },
    data: { processed: true, processedAt: new Date() }
  })

  return NextResponse.json({ received: true })
}
