/**
 * Classes API
 * GET /api/classes — list upcoming classes / my bookings (withAuth)
 * POST /api/classes — book a class (withAuth + CSRF)
 * DELETE /api/classes — cancel booking (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf, withRateLimitPreset } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { clinic, clinicBooking, payment, user, profile } from '@/lib/db/schema'
import { eq, and, gte, inArray, asc, ilike, sql } from 'drizzle-orm'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'
import crypto from 'crypto'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const myBookings = searchParams.get('myBookings') === 'true'
    const limit = parseInt(searchParams.get('limit') || '10')
    const subjectParam = searchParams.get('subject')?.trim() || null
    const studentId = session.user.id

    if (myBookings) {
      const bookingsWhere = subjectParam
        ? and(
            eq(clinicBooking.studentId, studentId),
            ilike(clinic.subject, subjectParam)
          )
        : eq(clinicBooking.studentId, studentId)

      const bookings = await drizzleDb
        .select({
          bookingId: clinicBooking.id,
          clinicId: clinicBooking.clinicId,
          studentId: clinicBooking.studentId,
          bookedAt: clinicBooking.bookedAt,
          attended: clinicBooking.attended,
          requiresPayment: clinicBooking.requiresPayment,
          clinicTitle: clinic.title,
          clinicSubject: clinic.subject,
          clinicDescription: clinic.description,
          tutorId: clinic.tutorId,
          startTime: clinic.startTime,
          duration: clinic.duration,
          maxStudents: clinic.maxStudents,
          status: clinic.status,
          roomUrl: clinic.roomUrl,
          roomId: clinic.roomId,
          clinicRequiresPayment: clinic.requiresPayment,
          paymentId: payment.id,
          paymentStatus: payment.status,
          gatewayCheckoutUrl: payment.gatewayCheckoutUrl,
          tutorName: profile.name,
          avatarUrl: profile.avatarUrl,
          hourlyRate: profile.hourlyRate,
        })
        .from(clinicBooking)
        .innerJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
        .leftJoin(payment, eq(payment.bookingId, clinicBooking.id))
        .leftJoin(user, eq(clinic.tutorId, user.id))
        .leftJoin(profile, eq(profile.userId, user.id))
        .where(bookingsWhere)
        .orderBy(asc(clinic.startTime))
        .limit(limit)

      const clinicIds = [...new Set(bookings.map((b) => b.clinicId))]
      const bookingCounts =
        clinicIds.length > 0
          ? await Promise.all(
              clinicIds.map(async (cId) => {
                const [row] = await drizzleDb
                  .select({ count: sql<number>`count(*)::int` })
                  .from(clinicBooking)
                  .where(eq(clinicBooking.clinicId, cId))
                return { clinicId: cId, count: row?.count ?? 0 }
              })
            )
          : []
      const countMap = new Map(bookingCounts.map((r) => [r.clinicId, r.count]))

      const classes = bookings.map((booking) => {
        const hourlyRate = booking.hourlyRate ?? 0
        const price =
          booking.clinicRequiresPayment && hourlyRate > 0
            ? Math.round(hourlyRate * (booking.duration / 60) * 100) / 100
            : null
        return {
          id: booking.clinicId,
          title: booking.clinicTitle,
          subject: booking.clinicSubject,
          description: booking.clinicDescription,
          tutorId: booking.tutorId,
          startTime: booking.startTime,
          duration: booking.duration,
          maxStudents: booking.maxStudents,
          status: booking.status,
          roomUrl: booking.roomUrl,
          roomId: booking.roomId,
          requiresPayment: booking.clinicRequiresPayment ?? false,
          isBooked: true,
          bookingId: booking.bookingId,
          currentBookings: countMap.get(booking.clinicId) ?? 0,
          price,
          paymentStatus: booking.paymentStatus ?? null,
          paymentCheckoutUrl: booking.gatewayCheckoutUrl ?? null,
          tutor: {
            id: booking.tutorId,
            profile: {
              name: booking.tutorName,
              avatarUrl: booking.avatarUrl,
              hourlyRate: booking.hourlyRate,
            },
          },
        }
      })

      return NextResponse.json({ classes })
    }

    const now = new Date()
    const clinicsWhere = subjectParam
      ? and(
          gte(clinic.startTime, now),
          inArray(clinic.status, ['scheduled', 'live']),
          ilike(clinic.subject, subjectParam)
        )
      : and(
          gte(clinic.startTime, now),
          inArray(clinic.status, ['scheduled', 'live'])
        )

    const clinics = await drizzleDb
      .select({
        id: clinic.id,
        title: clinic.title,
        subject: clinic.subject,
        description: clinic.description,
        tutorId: clinic.tutorId,
        startTime: clinic.startTime,
        duration: clinic.duration,
        maxStudents: clinic.maxStudents,
        status: clinic.status,
        roomUrl: clinic.roomUrl,
        roomId: clinic.roomId,
        requiresPayment: clinic.requiresPayment,
        tutorName: profile.name,
        avatarUrl: profile.avatarUrl,
        hourlyRate: profile.hourlyRate,
      })
      .from(clinic)
      .leftJoin(user, eq(clinic.tutorId, user.id))
      .leftJoin(profile, eq(profile.userId, user.id))
      .where(clinicsWhere)
      .orderBy(asc(clinic.startTime))
      .limit(limit)

    const clinicIds = clinics.map((c) => c.id)
    const bookingCounts =
      clinicIds.length > 0
        ? await Promise.all(
            clinicIds.map(async (cId) => {
              const [row] = await drizzleDb
                .select({ count: sql<number>`count(*)::int` })
                .from(clinicBooking)
                .where(eq(clinicBooking.clinicId, cId))
              return { clinicId: cId, count: row?.count ?? 0 }
            })
          )
        : []
    const countMap = new Map(bookingCounts.map((r) => [r.clinicId, r.count]))

    const myBookingClinicIds =
      clinicIds.length > 0
        ? (
            await drizzleDb
              .select({ clinicId: clinicBooking.clinicId })
              .from(clinicBooking)
              .where(
                and(
                  eq(clinicBooking.studentId, studentId),
                  inArray(clinicBooking.clinicId, clinicIds)
                )
              )
          ).map((r) => r.clinicId)
        : []
    const myBookingSet = new Set(myBookingClinicIds)

    const classes = clinics.map((cls) => {
      const hourlyRate = cls.hourlyRate ?? 0
      const price =
        cls.requiresPayment && hourlyRate > 0
          ? Math.round(hourlyRate * (cls.duration / 60) * 100) / 100
          : null
      return {
        ...cls,
        isBooked: myBookingSet.has(cls.id),
        currentBookings: countMap.get(cls.id) ?? 0,
        price,
        tutor: {
          id: cls.tutorId,
          profile: {
            name: cls.tutorName,
            avatarUrl: cls.avatarUrl,
            hourlyRate: cls.hourlyRate,
          },
        },
      }
    })

    return NextResponse.json({ classes })
  } catch (error) {
    console.error('Failed to fetch classes:', error)
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 })
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'booking')
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await req.json().catch(() => ({}))
    const classId = typeof body.classId === 'string' ? body.classId.trim() : ''

    if (!classId) {
      return NextResponse.json({ error: 'Class ID required' }, { status: 400 })
    }

    const [classRow] = await drizzleDb
      .select()
      .from(clinic)
      .where(eq(clinic.id, classId))
      .limit(1)

    if (!classRow) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    const [bookingsCountRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(clinicBooking)
      .where(eq(clinicBooking.clinicId, classId))

    const bookingsCount = bookingsCountRow?.count ?? 0

    if (classRow.status !== 'scheduled') {
      return NextResponse.json({ error: 'Class is not open for booking' }, { status: 400 })
    }

    if (bookingsCount >= classRow.maxStudents) {
      return NextResponse.json({ error: 'Class is full' }, { status: 400 })
    }

    const [existingBooking] = await drizzleDb
      .select()
      .from(clinicBooking)
      .where(
        and(
          eq(clinicBooking.clinicId, classId),
          eq(clinicBooking.studentId, session.user.id)
        )
      )
      .limit(1)

    if (existingBooking) {
      return NextResponse.json({ error: 'Already booked this class' }, { status: 400 })
    }

    const [tutorProfile] = await drizzleDb
      .select()
      .from(profile)
      .where(eq(profile.userId, classRow.tutorId))
      .limit(1)

    const requiresPayment = Boolean(classRow.requiresPayment)
    const bookingId = crypto.randomUUID()

    await drizzleDb.insert(clinicBooking).values({
      id: bookingId,
      clinicId: classId,
      studentId: session.user.id,
      attended: false,
      requiresPayment,
    })

    const booking = {
      id: bookingId,
      clinicId: classId,
      studentId: session.user.id,
      requiresPayment,
      clinic: {
        ...classRow,
        tutor: { profile: tutorProfile ?? null },
      },
    }

    if (!requiresPayment) {
      return NextResponse.json({
        success: true,
        booking,
        message: `Booked ${classRow.title} with ${tutorProfile?.name ?? 'Tutor'}`,
      })
    }

    const hourlyRate = tutorProfile?.hourlyRate ?? 0
    if (hourlyRate <= 0) {
      await drizzleDb
        .update(clinicBooking)
        .set({ requiresPayment: false })
        .where(eq(clinicBooking.id, bookingId))
      return NextResponse.json({
        success: true,
        booking,
        message: `Booked ${classRow.title} with ${tutorProfile?.name ?? 'Tutor'}`,
      })
    }

    const durationHours = classRow.duration / 60
    const amount = Math.round(hourlyRate * durationHours * 100) / 100
    const currency = tutorProfile?.currency ?? 'SGD'
    const preferredGateway = tutorProfile?.paymentGatewayPreference
    const gatewayName = (
      preferredGateway === 'AIRWALLEX' || preferredGateway === 'HITPAY'
        ? preferredGateway
        : (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY')
    ) as GatewayName
    const gateway = getPaymentGateway(gatewayName)
    const studentEmail = (session.user as { email?: string }).email ?? ''

    const paymentResponse = await gateway.createPayment({
      amount,
      currency,
      bookingId,
      studentEmail: studentEmail || '',
      description: `${classRow.title} - ${classRow.subject}`,
      metadata: { clinicId: classRow.id, clinicTitle: classRow.title },
    })

    const paymentId = crypto.randomUUID()
    await drizzleDb.insert(payment).values({
      id: paymentId,
      bookingId,
      amount,
      currency,
      status: 'PENDING',
      gateway: gatewayName,
      gatewayPaymentId: paymentResponse.paymentId,
      gatewayCheckoutUrl: paymentResponse.checkoutUrl,
    })

    return NextResponse.json({
      success: true,
      requiresPayment: true,
      booking,
      checkoutUrl: paymentResponse.checkoutUrl,
      message: 'Booking created. Complete payment to confirm your spot.',
    })
  } catch (error) {
    console.error('Failed to book class:', error)
    return NextResponse.json({ error: 'Failed to book class' }, { status: 500 })
  }
}

async function deleteHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const bookingId = typeof body.bookingId === 'string' ? body.bookingId.trim() : ''

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    const [booking] = await drizzleDb
      .select({
        bookingId: clinicBooking.id,
        clinicId: clinic.id,
        startTime: clinic.startTime,
      })
      .from(clinicBooking)
      .innerJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
      .where(
        and(
          eq(clinicBooking.id, bookingId),
          eq(clinicBooking.studentId, session.user.id)
        )
      )
      .limit(1)

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (new Date(booking.startTime) < new Date()) {
      return NextResponse.json({ error: 'Cannot cancel past class' }, { status: 400 })
    }

    await drizzleDb.delete(clinicBooking).where(eq(clinicBooking.id, bookingId))

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled',
    })
  } catch (error) {
    console.error('Failed to cancel booking:', error)
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
export const DELETE = withAuth(deleteHandler)
