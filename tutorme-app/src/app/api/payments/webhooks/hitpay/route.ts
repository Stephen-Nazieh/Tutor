/**
 * POST /api/payments/webhooks/hitpay
 * Hitpay webhook handler.
 * - Verifies Hitpay-Signature (HMAC-SHA256 with salt)
 * - Logs to WebhookEvent table
 * - Updates Payment and booking status
 * - Triggers email (stub)
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { webhookEvent, payment, clinicBooking, clinic, user, profile, curriculumEnrollment, curriculum } from '@/lib/db/schema'
import { HitpayGateway } from '@/lib/payments'
import { sendPaymentConfirmation, sendTutorPaymentReceived } from '@/lib/notifications/payment-email'
import { eq, and, or, sql } from 'drizzle-orm'

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
    const [existing] = await drizzleDb
      .select()
      .from(webhookEvent)
      .where(and(
        eq(webhookEvent.gateway, 'HITPAY'),
        eq(webhookEvent.processed, true),
        sql`${webhookEvent.payload}->>'id' = ${eventId}`
      ))
      .limit(1)
    if (existing) return NextResponse.json({ received: true })
  }

  let paymentIdForEvent: string | null = null
  if (gatewayPaymentId) {
    const [p] = await drizzleDb
      .select()
      .from(payment)
      .where(and(eq(payment.gatewayPaymentId, gatewayPaymentId), eq(payment.gateway, 'HITPAY')))
      .limit(1)
    paymentIdForEvent = p?.id ?? null
  }

  const webhookEventId = crypto.randomUUID()
  await drizzleDb.insert(webhookEvent).values({
    id: webhookEventId,
    paymentId: paymentIdForEvent,
    gateway: 'HITPAY',
    eventType: 'payment_request.completed',
    payload: payload as object,
    processed: false
  })

  const result = await gateway.processWebhook(payload)

  if (result.success && (result.status === 'completed' || result.status === 'succeeded')) {
    const ids = [result.paymentId ?? '', body?.id, body?.payment_request_id].filter(Boolean) as string[]
    let paymentRow: { id: string; bookingId: string | null; metadata: unknown; amount: number; currency: string } | undefined
    if (ids.length > 0) {
      [paymentRow] = await drizzleDb
        .select()
        .from(payment)
        .where(and(
          eq(payment.gateway, 'HITPAY'),
          or(...ids.map((id) => eq(payment.gatewayPaymentId, id)))
        ))
        .limit(1)
    }

    if (paymentRow) {
      await drizzleDb
        .update(payment)
        .set({ status: 'COMPLETED', paidAt: new Date() })
        .where(eq(payment.id, paymentRow.id))

      const meta = paymentRow.metadata as Record<string, unknown> | null
      if (!paymentRow.bookingId && meta?.type === 'course' && typeof meta.curriculumId === 'string' && typeof meta.studentId === 'string') {
        const { enrollStudentInCurriculum } = await import('@/lib/enrollment')
        enrollStudentInCurriculum(meta.studentId as string, meta.curriculumId)
          .then(async () => {
            const [enrollment] = await drizzleDb
              .select({
                id: curriculumEnrollment.id,
                creatorId: curriculum.creatorId
              })
              .from(curriculumEnrollment)
              .innerJoin(curriculum, eq(curriculum.id, curriculumEnrollment.curriculumId))
              .where(and(
                eq(curriculumEnrollment.studentId, meta.studentId as string),
                eq(curriculumEnrollment.curriculumId, meta.curriculumId as string)
              ))
              .limit(1)
            if (enrollment) {
              await drizzleDb
                .update(payment)
                .set({
                  enrollmentId: enrollment.id,
                  tutorId: enrollment.creatorId ?? paymentRow.tutorId
                })
                .where(eq(payment.id, paymentRow.id))
            }
          })
          .catch(() => {})
        const [userRow] = await drizzleDb
          .select({
            email: user.email,
            name: profile.name
          })
          .from(user)
          .leftJoin(profile, eq(profile.userId, user.id))
          .where(eq(user.id, meta.studentId as string))
          .limit(1)
        const description = 'Course enrollment'
        if (userRow?.email) {
          sendPaymentConfirmation({
            paymentId: paymentRow.id,
            studentEmail: userRow.email,
            studentName: userRow.name ?? undefined,
            amount: paymentRow.amount,
            currency: paymentRow.currency,
            description
          }).catch(() => {})
        }
      } else if (paymentRow.bookingId) {
        const [bookingClinic] = await drizzleDb
          .select({
            clinicTitle: clinic.title,
            clinicSubject: clinic.subject,
            studentId: clinicBooking.studentId,
            tutorId: clinic.tutorId
          })
          .from(clinicBooking)
          .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
          .where(eq(clinicBooking.id, paymentRow.bookingId))
          .limit(1)
        if (bookingClinic) {
          const [studentRow] = await drizzleDb
            .select({ email: user.email, name: profile.name })
            .from(user)
            .leftJoin(profile, eq(profile.userId, user.id))
            .where(eq(user.id, bookingClinic.studentId))
            .limit(1)
          const [tutorRow] = await drizzleDb
            .select({ email: user.email, name: profile.name })
            .from(user)
            .leftJoin(profile, eq(profile.userId, user.id))
            .where(eq(user.id, bookingClinic.tutorId))
            .limit(1)
          const description = `${bookingClinic.clinicTitle} – ${bookingClinic.clinicSubject}`
          if (studentRow?.email) {
            sendPaymentConfirmation({
              paymentId: paymentRow.id,
              studentEmail: studentRow.email,
              studentName: studentRow.name ?? undefined,
              amount: paymentRow.amount,
              currency: paymentRow.currency,
              description
            }).catch(() => {})
          }
          if (tutorRow?.email) {
            sendTutorPaymentReceived({
              paymentId: paymentRow.id,
              tutorEmail: tutorRow.email,
              tutorName: tutorRow.name ?? undefined,
              amount: paymentRow.amount,
              currency: paymentRow.currency,
              description
            }).catch(() => {})
          }
        }
      }
    }
  }

  await drizzleDb
    .update(webhookEvent)
    .set({ processed: true, processedAt: new Date() })
    .where(eq(webhookEvent.id, webhookEventId))

  return NextResponse.json({ received: true })
}
