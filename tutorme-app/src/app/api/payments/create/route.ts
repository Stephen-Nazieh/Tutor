/**
 * POST /api/payments/create
 * Creates a payment and returns checkout URL.
 * - Booking: body.bookingId — for clinic booking (amount from tutor hourly rate × duration).
 * - Course: body.curriculumId — for course purchase (amount from curriculum.price).
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError, withRateLimitPreset } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'paymentCreate')
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json()
  const { bookingId, curriculumId } = body

  // --- Course payment ---
  if (curriculumId) {
    const curriculum = await db.curriculum.findFirst({
      where: { id: curriculumId, isPublished: true }
    })
    if (!curriculum) throw new NotFoundError('Curriculum not found')
    const amount = curriculum.price != null ? Number(curriculum.price) : 0
    if (amount <= 0) throw new ValidationError('This course is free; use Enroll instead')

    const existingEnrollment = await db.curriculumProgress.findUnique({
      where: {
        studentId_curriculumId: { studentId: session.user.id, curriculumId }
      }
    })
    if (existingEnrollment) {
      throw new ValidationError('You are already enrolled in this course')
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { email: true }
    })
    const studentEmail = user?.email ?? ''
    const currency = (curriculum.currency as string) || 'SGD'
    const gatewayName = (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY') as GatewayName
    const gateway = getPaymentGateway(gatewayName)

    const pendingCoursePayments = await db.payment.findMany({
      where: { bookingId: null, status: 'PENDING', gateway: gatewayName },
      take: 50
    })
    const existingPayment = pendingCoursePayments.find((p: { metadata: unknown; gatewayCheckoutUrl: string | null; id: string }) => {
      const m = p.metadata as Record<string, unknown> | null
      return m?.type === 'course' && m?.curriculumId === curriculumId && m?.studentId === session.user.id
    })
    if (existingPayment?.gatewayCheckoutUrl) {
      return NextResponse.json({
        checkoutUrl: existingPayment.gatewayCheckoutUrl,
        paymentId: existingPayment.id
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    const paymentResponse = await gateway.createPayment({
      amount,
      currency,
      curriculumId,
      studentEmail,
      description: `${curriculum.name} (${curriculum.subject})`,
      metadata: { type: 'course', curriculumId, studentId: session.user.id },
      successUrl: `${baseUrl}/payment/success?type=course&curriculumId=${encodeURIComponent(curriculumId)}`,
      cancelUrl: `${baseUrl}/payment/cancel?type=course&curriculumId=${encodeURIComponent(curriculumId)}`
    })

    const payment = await db.payment.create({
      data: {
        bookingId: null,
        amount,
        currency,
        status: 'PENDING',
        gateway: gatewayName,
        gatewayPaymentId: paymentResponse.paymentId,
        gatewayCheckoutUrl: paymentResponse.checkoutUrl,
        metadata: { type: 'course', curriculumId, studentId: session.user.id }
      }
    })

    return NextResponse.json({
      checkoutUrl: paymentResponse.checkoutUrl,
      paymentId: payment.id
    })
  }

  // --- Booking payment ---
  if (!bookingId) {
    throw new ValidationError('bookingId or curriculumId is required')
  }

  const booking = await db.clinicBooking.findUnique({
    where: { id: bookingId },
    include: {
      clinic: {
        include: {
          tutor: {
            include: {
              profile: true
            }
          }
        }
      },
      student: {
        select: { email: true, id: true }
      },
      payment: true
    }
  })

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  if (booking.studentId !== session.user.id) {
    throw new ForbiddenError('You can only create payment for your own booking')
  }

  if (booking.payment) {
    if (booking.payment.status === 'COMPLETED') {
      throw new ValidationError('This booking is already paid')
    }
    if (booking.payment.status === 'PENDING' && booking.payment.gatewayCheckoutUrl) {
      return NextResponse.json({
        checkoutUrl: booking.payment.gatewayCheckoutUrl,
        paymentId: booking.payment.id
      })
    }
  }

  const clinic = booking.clinic
  const tutorProfile = clinic.tutor.profile
  const hourlyRate = tutorProfile?.hourlyRate ?? 0
  if (hourlyRate <= 0) {
    throw new ValidationError('This class has no payment amount set')
  }

  const durationHours = clinic.duration / 60
  const amount = Math.round(hourlyRate * durationHours * 100) / 100
  const currency = (tutorProfile?.currency as string) || 'SGD'
  const preferredGateway = tutorProfile?.paymentGatewayPreference
  const gatewayName = (preferredGateway === 'AIRWALLEX' || preferredGateway === 'HITPAY'
    ? preferredGateway
    : (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY')) as GatewayName
  const gateway = getPaymentGateway(gatewayName)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const paymentResponse = await gateway.createPayment({
    amount,
    currency,
    bookingId: booking.id,
    studentEmail: booking.student.email,
    description: `${clinic.title} - ${clinic.subject}`,
    metadata: { clinicId: clinic.id, clinicTitle: clinic.title },
    successUrl: `${baseUrl}/payment/success?type=booking`,
    cancelUrl: `${baseUrl}/payment/cancel?type=booking`
  })

  const payment = await db.payment.upsert({
    where: { bookingId: booking.id },
    create: {
      bookingId: booking.id,
      amount,
      currency,
      status: 'PENDING',
      gateway: gatewayName,
      gatewayPaymentId: paymentResponse.paymentId,
      gatewayCheckoutUrl: paymentResponse.checkoutUrl
    },
    update: {
      gatewayPaymentId: paymentResponse.paymentId,
      gatewayCheckoutUrl: paymentResponse.checkoutUrl,
      status: 'PENDING'
    }
  })

  return NextResponse.json({
    checkoutUrl: paymentResponse.checkoutUrl,
    paymentId: payment.id
  })
}))
