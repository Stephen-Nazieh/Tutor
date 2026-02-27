/**
 * POST /api/payments/refund
 * Admin or Tutor can initiate refunds.
 * - Calls gateway refund API
 * - Creates Refund record and updates Payment
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { payment, refund, clinicBooking, clinic, curriculum } from '@/lib/db/schema'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'
import { eq } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const role = session.user.role
  if (role !== 'TUTOR' && role !== 'ADMIN') {
    throw new ForbiddenError('Only tutors or admins can initiate refunds')
  }

  const body = await req.json()
  const { paymentId, amount, reason } = body

  if (!paymentId) {
    throw new ValidationError('paymentId is required')
  }

  const [paymentRow] = await drizzleDb
    .select()
    .from(payment)
    .where(eq(payment.id, paymentId))
    .limit(1)

  if (!paymentRow) {
    throw new NotFoundError('Payment not found')
  }

  if (paymentRow.status === 'REFUNDED') {
    throw new ValidationError('Payment is already refunded')
  }

  const isBookingPayment = paymentRow.bookingId != null
  let isTutorOfClinic = false
  if (isBookingPayment && paymentRow.bookingId) {
    const [bookingWithClinic] = await drizzleDb
      .select({ tutorId: clinic.tutorId })
      .from(clinicBooking)
      .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
      .where(eq(clinicBooking.id, paymentRow.bookingId))
      .limit(1)
    isTutorOfClinic = bookingWithClinic?.tutorId === session.user.id
  }

  if (isBookingPayment) {
    if (role === 'TUTOR' && !isTutorOfClinic) {
      throw new ForbiddenError('You can only refund payments for your own classes')
    }
  } else {
    const meta = paymentRow.metadata as { curriculumId?: string } | null
    const curriculumId = meta?.curriculumId
    if (!curriculumId || typeof curriculumId !== 'string') {
      throw new ForbiddenError('Course payment could not be resolved')
    }
    const [curriculumRow] = await drizzleDb
      .select({ creatorId: curriculum.creatorId })
      .from(curriculum)
      .where(eq(curriculum.id, curriculumId))
      .limit(1)
    if (!curriculumRow) {
      throw new NotFoundError('Course not found')
    }
    const isCreatorOfCourse = curriculumRow.creatorId === session.user.id
    if (role === 'TUTOR' && !isCreatorOfCourse) {
      throw new ForbiddenError('You can only refund payments for your own courses')
    }
  }

  const gateway = getPaymentGateway(paymentRow.gateway as GatewayName)
  const refundAmount = amount != null && amount > 0 ? amount : paymentRow.amount
  // Airwallex requires payment_attempt_id for refunds; we store it in metadata on payment_intent.succeeded
  const metadata = paymentRow.metadata as { payment_attempt_id?: string } | null
  const refundPaymentId =
    paymentRow.gateway === 'AIRWALLEX' && metadata?.payment_attempt_id
      ? metadata.payment_attempt_id
      : (paymentRow.gatewayPaymentId ?? paymentRow.id)
  const refundResponse = await gateway.refundPayment(refundPaymentId, refundAmount)

  if (refundResponse.error) {
    return NextResponse.json(
      { error: refundResponse.error, status: refundResponse.status },
      { status: 400 }
    )
  }

  const refundStatus = refundResponse.status === 'succeeded' || refundResponse.status === 'RECEIVED' ? 'COMPLETED' : 'PENDING'
  const refundId = crypto.randomUUID()
  await drizzleDb.insert(refund).values({
    id: refundId,
    paymentId: paymentRow.id,
    amount: refundAmount,
    reason: reason ?? 'customer_requested',
    status: refundStatus,
    gatewayRefundId: refundResponse.refundId,
    processedAt: refundResponse.status === 'succeeded' || refundResponse.status === 'RECEIVED' ? new Date() : null
  })

  const fullRefund = refundAmount >= paymentRow.amount
  await drizzleDb
    .update(payment)
    .set({
      status: fullRefund ? 'REFUNDED' : paymentRow.status,
      refundedAt: fullRefund ? new Date() : paymentRow.refundedAt
    })
    .where(eq(payment.id, paymentRow.id))

  return NextResponse.json({
    success: true,
    refundId,
    status: refundStatus,
    amountRefunded: refundResponse.amountRefunded ?? refundAmount
  })
}))
