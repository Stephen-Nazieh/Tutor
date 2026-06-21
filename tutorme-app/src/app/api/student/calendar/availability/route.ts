/**
 * Student weekly availability.
 *  GET    -> { availability: [...], exceptions: [...] }
 *  POST   -> upsert one weekly slot { dayOfWeek, startTime, endTime, timezone, isAvailable }
 *  DELETE -> remove one slot { id }
 *
 * Mirrors /api/tutor/calendar/availability but keyed to the student.
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import crypto from 'crypto'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { studentAvailability, studentAvailabilityException } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export const GET = withAuth(
  async (_req: NextRequest, session) => {
    const studentId = session.user.id
    const [availability, exceptions] = await Promise.all([
      drizzleDb
        .select()
        .from(studentAvailability)
        .where(eq(studentAvailability.studentId, studentId)),
      drizzleDb
        .select()
        .from(studentAvailabilityException)
        .where(eq(studentAvailabilityException.studentId, studentId)),
    ])
    return NextResponse.json({ availability, exceptions })
  },
  { role: 'STUDENT' }
)

export const POST = withCsrf(
  withAuth(
    async (req: NextRequest, session) => {
      const studentId = session.user.id
      const body = await req.json().catch(() => null)
      const dayOfWeek = Number(body?.dayOfWeek)
      const startTime = typeof body?.startTime === 'string' ? body.startTime : ''
      const endTime = typeof body?.endTime === 'string' ? body.endTime : ''
      const timezone = typeof body?.timezone === 'string' && body.timezone ? body.timezone : 'UTC'
      const isAvailable = body?.isAvailable !== false

      if (
        !Number.isInteger(dayOfWeek) ||
        dayOfWeek < 0 ||
        dayOfWeek > 6 ||
        !startTime ||
        !endTime
      ) {
        return NextResponse.json({ error: 'Invalid availability slot' }, { status: 400 })
      }

      const now = new Date()
      await drizzleDb
        .insert(studentAvailability)
        .values({
          availabilityId: crypto.randomUUID(),
          studentId,
          dayOfWeek,
          startTime,
          endTime,
          timezone,
          isAvailable,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            studentAvailability.studentId,
            studentAvailability.dayOfWeek,
            studentAvailability.startTime,
            studentAvailability.endTime,
          ],
          set: { isAvailable, timezone, updatedAt: now },
        })

      return NextResponse.json({ success: true })
    },
    { role: 'STUDENT' }
  )
)

export const DELETE = withCsrf(
  withAuth(
    async (req: NextRequest, session) => {
      const studentId = session.user.id
      const body = await req.json().catch(() => null)
      const id = typeof body?.id === 'string' ? body.id : ''
      if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
      await drizzleDb
        .delete(studentAvailability)
        .where(
          and(
            eq(studentAvailability.availabilityId, id),
            eq(studentAvailability.studentId, studentId)
          )
        )
      return NextResponse.json({ success: true })
    },
    { role: 'STUDENT' }
  )
)
