/**
 * POST /api/payments/webhooks/airwallex
 * Airwallex webhook handler.
 * - Verifies x-signature (HMAC-SHA256 of x-timestamp + raw body)
 * - Logs to WebhookEvent table
 * - Updates Payment and booking status
 * - Triggers email (stub)
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { webhookEvent, payment, clinicBooking, clinic, user, profile, curriculumEnrollment, curriculum } from '@/lib/db/schema'
import { AirwallexGateway } from '@/lib/payments'
import { sendPaymentConfirmation, sendTutorPaymentReceived } from '@/lib/notifications/payment-email'
import { eq, and, sql } from 'drizzle-orm'

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
    const [existing] = await drizzleDb
      .select()
      .from(webhookEvent)
      .where(and(
        eq(webhookEvent.gateway, 'AIRWALLEX'),
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
      .where(and(eq(payment.gatewayPaymentId, gatewayPaymentId), eq(payment.gateway, 'AIRWALLEX')))
      .limit(1)
    paymentIdForEvent = p?.id ?? null
  }

  const webhookEventId = crypto.randomUUID()
  await drizzleDb.insert(webhookEvent).values({
    id: webhookEventId,
    paymentId: paymentIdForEvent,
    gateway: 'AIRWALLEX',
    eventType: eventName,
    payload: payload as object,
    processed: false
  })

  const result = await gateway.processWebhook(payload)

  if (result.success && result.paymentId && result.status === 'succeeded') {
    const [paymentRow] = await drizzleDb
      .select()
      .from(payment)
      .where(and(eq(payment.gatewayPaymentId, result.paymentId), eq(payment.gateway, 'AIRWALLEX')))
      .limit(1)
    if (paymentRow) {
      const existingMeta = (paymentRow.metadata as Record<string, unknown>) || {}
      const metadata = paymentAttemptId ? { ...existingMeta, payment_attempt_id: paymentAttemptId } : existingMeta
      await drizzleDb
        .update(payment)
        .set({
          status: 'COMPLETED',
          paidAt: new Date(),
          ...(Object.keys(metadata).length > 0 ? { metadata } : {})
        })
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

  if (result.success && (result.status === 'cancelled' || result.eventType?.includes('cancelled'))) {
    const [paymentRow] = await drizzleDb
      .select()
      .from(payment)
      .where(and(eq(payment.gatewayPaymentId, result.paymentId ?? ''), eq(payment.gateway, 'AIRWALLEX')))
      .limit(1)
    if (paymentRow) {
      await drizzleDb
        .update(payment)
        .set({ status: 'CANCELLED' })
        .where(eq(payment.id, paymentRow.id))
    }
  }

  await drizzleDb
    .update(webhookEvent)
    .set({ processed: true, processedAt: new Date() })
    .where(eq(webhookEvent.id, webhookEventId))

  return NextResponse.json({ received: true })
}
