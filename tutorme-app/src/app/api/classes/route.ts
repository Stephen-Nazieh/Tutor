/**
 * Classes API
 * GET /api/classes — list upcoming classes / my bookings (withAuth)
 * POST /api/classes — book a class (withAuth + CSRF)
 * DELETE /api/classes — cancel booking (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf, withRateLimitPreset } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { getPaymentGateway, type GatewayName } from '@/lib/payments'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const myBookings = searchParams.get('myBookings') === 'true'
    const limit = parseInt(searchParams.get('limit') || '10')
    const subjectParam = searchParams.get('subject')?.trim() || null

    let classes

    if (myBookings) {
      // Get classes the user has booked (optionally filtered by subject)
      const bookingsWhere: { studentId: string; clinic?: { subject: { equals: string; mode: 'insensitive' } } } = {
        studentId: session.user.id
      }
      if (subjectParam) {
        bookingsWhere.clinic = { subject: { equals: subjectParam, mode: 'insensitive' } }
      }
      const bookings = await db.clinicBooking.findMany({
        where: bookingsWhere,
        include: {
          payment: { select: { id: true, status: true, gatewayCheckoutUrl: true } },
          clinic: {
            include: {
              tutor: {
                select: {
                  id: true,
                  profile: {
                    select: {
                      name: true,
                      avatarUrl: true,
                      hourlyRate: true
                    }
                  }
                }
              },
              _count: {
                select: { bookings: true }
              }
            }
          }
        },
        orderBy: {
          clinic: { startTime: 'asc' }
        },
        take: limit
      })

      classes = bookings.map((booking: any) => {
        const clinic = booking.clinic
        const hourlyRate = clinic.tutor?.profile?.hourlyRate ?? 0
        const price =
          clinic.requiresPayment && hourlyRate > 0
            ? Math.round(hourlyRate * (clinic.duration / 60) * 100) / 100
            : null
        const paymentStatus = booking.payment?.status ?? null
        return {
          ...clinic,
          isBooked: true,
          bookingId: booking.id,
          currentBookings: clinic._count.bookings,
          price,
          requiresPayment: clinic.requiresPayment ?? false,
          paymentStatus,
          paymentCheckoutUrl: booking.payment?.gatewayCheckoutUrl ?? null
        }
      })
    } else {
      // Get upcoming classes (optionally filtered by subject)
      const now = new Date()
      const where: { startTime: { gte: Date }; status: { in: string[] }; subject?: { equals: string; mode: 'insensitive' } } = {
        startTime: { gte: now },
        status: { in: ['scheduled', 'live'] }
      }
      if (subjectParam) {
        where.subject = { equals: subjectParam, mode: 'insensitive' }
      }
      classes = await db.clinic.findMany({
        where,
        include: {
          tutor: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  avatarUrl: true,
                  hourlyRate: true
                }
              }
            }
          },
          _count: {
            select: { bookings: true }
          },
          bookings: {
            where: { studentId: session.user.id },
            select: { id: true }
          }
        },
        orderBy: { startTime: 'asc' },
        take: limit
      })

      classes = classes.map((cls: any) => {
        const hourlyRate = cls.tutor?.profile?.hourlyRate ?? 0
        const price =
          cls.requiresPayment && hourlyRate > 0
            ? Math.round(hourlyRate * (cls.duration / 60) * 100) / 100
            : null
        return {
          ...cls,
          isBooked: cls.bookings.length > 0,
          currentBookings: cls._count.bookings,
          price
        }
      })
    }

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

    // Check if class exists and has space
    const classItem = await db.clinic.findUnique({
      where: { id: classId },
      include: {
        tutor: {
          include: {
            profile: true
          }
        },
        _count: {
          select: { bookings: true }
        }
      }
    })

    if (!classItem) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    if (classItem.status !== 'scheduled') {
      return NextResponse.json({ error: 'Class is not open for booking' }, { status: 400 })
    }

    if (classItem._count.bookings >= classItem.maxStudents) {
      return NextResponse.json({ error: 'Class is full' }, { status: 400 })
    }

    // Check if already booked
    const existingBooking = await db.clinicBooking.findFirst({
      where: {
        clinicId: classId,
        studentId: session.user.id
      }
    })

    if (existingBooking) {
      return NextResponse.json({ error: 'Already booked this class' }, { status: 400 })
    }

    const requiresPayment = Boolean(classItem.requiresPayment)

    // Create booking
    const booking = await db.clinicBooking.create({
      data: {
        clinicId: classId,
        studentId: session.user.id,
        requiresPayment
      },
      include: {
        clinic: {
          include: {
            tutor: {
              select: {
                profile: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!requiresPayment) {
      return NextResponse.json({
        success: true,
        booking,
        message: `Booked ${classItem.title} with ${booking.clinic.tutor.profile?.name || 'Tutor'}`
      })
    }

    // Paid class: create payment and return checkout URL
    const hourlyRate = classItem.tutor.profile?.hourlyRate ?? 0
    if (hourlyRate <= 0) {
      await db.clinicBooking.update({
        where: { id: booking.id },
        data: { requiresPayment: false }
      })
      return NextResponse.json({
        success: true,
        booking,
        message: `Booked ${classItem.title} with ${booking.clinic.tutor.profile?.name || 'Tutor'}`
      })
    }

    const durationHours = classItem.duration / 60
    const amount = Math.round(hourlyRate * durationHours * 100) / 100
    const tutorProfile = classItem.tutor.profile
    const currency = (tutorProfile?.currency as string) || 'SGD'
    const preferredGateway = tutorProfile?.paymentGatewayPreference
    const gatewayName = (preferredGateway === 'AIRWALLEX' || preferredGateway === 'HITPAY'
      ? preferredGateway
      : (process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY')) as GatewayName
    const gateway = getPaymentGateway(gatewayName)
    const studentEmail = (session.user as { email?: string }).email ?? ''

    const paymentResponse = await gateway.createPayment({
      amount,
      currency,
      bookingId: booking.id,
      studentEmail: studentEmail || '',
      description: `${classItem.title} - ${classItem.subject}`,
      metadata: { clinicId: classItem.id, clinicTitle: classItem.title }
    })

    await db.payment.create({
      data: {
        bookingId: booking.id,
        amount,
        currency,
        status: 'PENDING',
        gateway: gatewayName,
        gatewayPaymentId: paymentResponse.paymentId,
        gatewayCheckoutUrl: paymentResponse.checkoutUrl
      }
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

    // Verify the booking belongs to this user
    const booking = await db.clinicBooking.findFirst({
      where: {
        id: bookingId,
        studentId: session.user.id
      },
      include: { clinic: true }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if class is in the past
    if (new Date(booking.clinic.startTime) < new Date()) {
      return NextResponse.json({ error: 'Cannot cancel past class' }, { status: 400 })
    }

    await db.clinicBooking.delete({
      where: { id: bookingId }
    })

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
