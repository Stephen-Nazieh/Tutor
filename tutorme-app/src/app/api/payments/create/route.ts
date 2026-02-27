/**
 * POST /api/payments/create
 * Creates a payment and returns checkout URL.
 * - Booking: body.bookingId — for clinic booking (amount from tutor hourly rate × duration).
 * - Course: body.curriculumId — for course purchase (amount from curriculum.price).
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError, withRateLimitPreset } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumProgress, user, profile, payment, clinicBooking, clinic } from '@/lib/db/schema'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'
import { eq, and, isNull } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'paymentCreate')
  if (rateLimitResponse) return rateLimitResponse

  const body = await req.json()
  const { bookingId, curriculumId, studentId, gateway: requestedGateway } = body

  let payerStudentId = session.user.id
  const userRole = (session.user.role || '').toUpperCase()

  if (userRole === 'PARENT') {
    if (!studentId || typeof studentId !== 'string') {
      throw new ValidationError('studentId is required when parent creates payment')
    }
    const family = await getFamilyAccountForParent(session)
    if (!family || !family.studentIds.includes(studentId)) {
      throw new ForbiddenError('You can only create payments for your linked children')
    }
    payerStudentId = studentId
  } else if (userRole === 'ADMIN') {
    if (studentId && typeof studentId === 'string') {
      payerStudentId = studentId
    }
  } else if (userRole !== 'STUDENT') {
    throw new ForbiddenError('Only students, parents, or admins can create payments')
  }

  // --- Course payment ---
  if (curriculumId) {
    const [curriculumRow] = await drizzleDb
      .select()
      .from(curriculum)
      .where(and(eq(curriculum.id, curriculumId), eq(curriculum.isPublished, true)))
      .limit(1)
    if (!curriculumRow) throw new NotFoundError('Curriculum not found')
    const amount = curriculumRow.price != null ? Number(curriculumRow.price) : 0
    if (amount <= 0) throw new ValidationError('This course is free; use Enroll instead')

    const [existingEnrollment] = await drizzleDb
      .select()
      .from(curriculumProgress)
      .where(and(eq(curriculumProgress.studentId, payerStudentId), eq(curriculumProgress.curriculumId, curriculumId)))
      .limit(1)
    if (existingEnrollment) {
      throw new ValidationError('You are already enrolled in this course')
    }

    const [userRow] = await drizzleDb
      .select({
        email: user.email,
        paymentGatewayPreference: profile.paymentGatewayPreference,
      })
      .from(user)
      .leftJoin(profile, eq(profile.userId, user.id))
      .where(eq(user.id, payerStudentId))
      .limit(1)
    const studentEmail = userRow?.email ?? ''
    const currency = (curriculumRow.currency as string) || 'SGD'

    // Determine gateway: frontend preference > user profile > environment default
    let gatewayName: GatewayName
    if (requestedGateway && (requestedGateway === 'HITPAY' || requestedGateway === 'AIRWALLEX')) {
      gatewayName = requestedGateway
    } else if (userRow?.paymentGatewayPreference) {
      gatewayName = userRow.paymentGatewayPreference as GatewayName
    } else {
      gatewayName = (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY') as GatewayName
    }

    const gateway = getPaymentGateway(gatewayName)

    const pendingCoursePayments = await drizzleDb
      .select()
      .from(payment)
      .where(and(
        isNull(payment.bookingId),
        eq(payment.status, 'PENDING'),
        eq(payment.gateway, gatewayName)
      ))
      .limit(50)
    const existingPayment = pendingCoursePayments.find((p) => {
      const m = p.metadata as Record<string, unknown> | null
      return m?.type === 'course' && m?.curriculumId === curriculumId && m?.studentId === payerStudentId
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
      description: `${curriculumRow.name} (${curriculumRow.subject})`,
      metadata: { type: 'course', curriculumId, studentId: payerStudentId, payerId: session.user.id, payerRole: session.user.role },
      successUrl: `${baseUrl}/payment/success?type=course&curriculumId=${encodeURIComponent(curriculumId)}`,
      cancelUrl: `${baseUrl}/payment/cancel?type=course&curriculumId=${encodeURIComponent(curriculumId)}`
    })

    const paymentId = crypto.randomUUID()
    await drizzleDb.insert(payment).values({
      id: paymentId,
      bookingId: null,
      amount,
      currency,
      status: 'PENDING',
      gateway: gatewayName,
      tutorId: curriculumRow.creatorId ?? null,
      gatewayPaymentId: paymentResponse.paymentId,
      gatewayCheckoutUrl: paymentResponse.checkoutUrl,
      metadata: { type: 'course', curriculumId, studentId: payerStudentId, payerId: session.user.id, payerRole: session.user.role }
    })

    return NextResponse.json({
      checkoutUrl: paymentResponse.checkoutUrl,
      paymentId
    })
  }

  // --- Booking payment ---
  if (!bookingId) {
    throw new ValidationError('bookingId or curriculumId is required')
  }

  const [bookingRow] = await drizzleDb
    .select({
      booking: clinicBooking,
      clinic: clinic,
      tutorId: clinic.tutorId,
      clinicTitle: clinic.title,
      clinicSubject: clinic.subject,
      clinicDuration: clinic.duration,
      studentId: clinicBooking.studentId,
    })
    .from(clinicBooking)
    .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
    .where(eq(clinicBooking.id, bookingId))
    .limit(1)

  if (!bookingRow) {
    throw new NotFoundError('Booking not found')
  }

  const booking = bookingRow.booking
  if (booking.studentId !== payerStudentId) {
    throw new ForbiddenError('You can only create payment for your own booking or your linked child booking')
  }

  // Fetch tutor profile for hourly rate and payment preference
  const [tutorUser] = await drizzleDb
    .select({
      userId: user.id,
      hourlyRate: profile.hourlyRate,
      currency: profile.currency,
      paymentGatewayPreference: profile.paymentGatewayPreference,
    })
    .from(user)
    .innerJoin(profile, eq(profile.userId, user.id))
    .where(eq(user.id, bookingRow.tutorId))
    .limit(1)

  // Existing payment for this booking
  const [existingPaymentRow] = await drizzleDb
    .select()
    .from(payment)
    .where(eq(payment.bookingId, bookingId))
    .limit(1)

  if (existingPaymentRow) {
    if (existingPaymentRow.status === 'COMPLETED') {
      throw new ValidationError('This booking is already paid')
    }
    if (existingPaymentRow.status === 'PENDING' && existingPaymentRow.gatewayCheckoutUrl) {
      return NextResponse.json({
        checkoutUrl: existingPaymentRow.gatewayCheckoutUrl,
        paymentId: existingPaymentRow.id
      })
    }
  }

  const tutorProfile = tutorUser
  const hourlyRate = tutorProfile?.hourlyRate ?? 0
  if (hourlyRate <= 0) {
    throw new ValidationError('This class has no payment amount set')
  }

  const durationHours = bookingRow.clinicDuration / 60
  const amount = Math.round(hourlyRate * durationHours * 100) / 100
  const currency = (tutorProfile?.currency as string) || 'SGD'
  const preferredGateway = tutorProfile?.paymentGatewayPreference
  const gatewayName = (preferredGateway === 'AIRWALLEX' || preferredGateway === 'HITPAY'
    ? preferredGateway
    : (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY')) as GatewayName
  const gateway = getPaymentGateway(gatewayName)

  const [studentRow] = await drizzleDb
    .select({ email: user.email })
    .from(user)
    .where(eq(user.id, booking.studentId))
    .limit(1)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const paymentResponse = await gateway.createPayment({
    amount,
    currency,
    bookingId: booking.id,
    studentEmail: studentRow?.email ?? '',
    description: `${bookingRow.clinicTitle} - ${bookingRow.clinicSubject}`,
    metadata: { clinicId: bookingRow.clinic.id, clinicTitle: bookingRow.clinicTitle },
    successUrl: `${baseUrl}/payment/success?type=booking`,
    cancelUrl: `${baseUrl}/payment/cancel?type=booking`
  })

  let paymentId: string
  if (existingPaymentRow) {
    await drizzleDb
      .update(payment)
      .set({
        tutorId: bookingRow.tutorId,
        gatewayPaymentId: paymentResponse.paymentId,
        gatewayCheckoutUrl: paymentResponse.checkoutUrl,
        status: 'PENDING'
      })
      .where(eq(payment.id, existingPaymentRow.id))
    paymentId = existingPaymentRow.id
  } else {
    paymentId = crypto.randomUUID()
    await drizzleDb.insert(payment).values({
      id: paymentId,
      bookingId: booking.id,
      amount,
      currency,
      status: 'PENDING',
      gateway: gatewayName,
      tutorId: bookingRow.tutorId,
      gatewayPaymentId: paymentResponse.paymentId,
      gatewayCheckoutUrl: paymentResponse.checkoutUrl
    })
  }

  return NextResponse.json({
    checkoutUrl: paymentResponse.checkoutUrl,
    paymentId
  })
}))
