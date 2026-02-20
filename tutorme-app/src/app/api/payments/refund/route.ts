/**
 * POST /api/payments/refund
 * Admin or Tutor can initiate refunds.
 * - Calls gateway refund API
 * - Creates Refund record and updates Payment
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'

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

  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        include: {
          clinic: {
            select: { tutorId: true }
          }
        }
      }
    }
  })

  if (!payment) {
    throw new NotFoundError('Payment not found')
  }

  if (payment.status === 'REFUNDED') {
    throw new ValidationError('Payment is already refunded')
  }

  const isBookingPayment = payment.bookingId != null
  const isTutorOfClinic = payment.booking?.clinic?.tutorId === session.user.id

  if (isBookingPayment) {
    if (role === 'TUTOR' && !isTutorOfClinic) {
      throw new ForbiddenError('You can only refund payments for your own classes')
    }
  } else {
    const meta = payment.metadata as { curriculumId?: string } | null
    const curriculumId = meta?.curriculumId
    if (!curriculumId || typeof curriculumId !== 'string') {
      throw new ForbiddenError('Course payment could not be resolved')
    }
    const curriculum = await db.curriculum.findUnique({
      where: { id: curriculumId },
      select: { creatorId: true }
    })
    if (!curriculum) {
      throw new NotFoundError('Course not found')
    }
    const isCreatorOfCourse = curriculum.creatorId === session.user.id
    if (role === 'TUTOR' && !isCreatorOfCourse) {
      throw new ForbiddenError('You can only refund payments for your own courses')
    }
  }

  const gateway = getPaymentGateway(payment.gateway as GatewayName)
  const refundAmount = amount != null && amount > 0 ? amount : payment.amount
  // Airwallex requires payment_attempt_id for refunds; we store it in metadata on payment_intent.succeeded
  const metadata = payment.metadata as { payment_attempt_id?: string } | null
  const refundPaymentId =
    payment.gateway === 'AIRWALLEX' && metadata?.payment_attempt_id
      ? metadata.payment_attempt_id
      : (payment.gatewayPaymentId ?? payment.id)
  const refundResponse = await gateway.refundPayment(refundPaymentId, refundAmount)

  if (refundResponse.error) {
    return NextResponse.json(
      { error: refundResponse.error, status: refundResponse.status },
      { status: 400 }
    )
  }

  const refund = await db.refund.create({
    data: {
      paymentId: payment.id,
      amount: refundAmount,
      reason: reason ?? 'customer_requested',
      status: refundResponse.status === 'succeeded' || refundResponse.status === 'RECEIVED' ? 'COMPLETED' : 'PENDING',
      gatewayRefundId: refundResponse.refundId,
      processedAt: refundResponse.status === 'succeeded' || refundResponse.status === 'RECEIVED' ? new Date() : null
    }
  })

  const fullRefund = refundAmount >= payment.amount
  await db.payment.update({
    where: { id: payment.id },
    data: {
      status: fullRefund ? 'REFUNDED' : payment.status,
      refundedAt: fullRefund ? new Date() : payment.refundedAt
    }
  })

  return NextResponse.json({
    success: true,
    refundId: refund.id,
    status: refund.status,
    amountRefunded: refundResponse.amountRefunded ?? refundAmount
  })
}))
