/**
 * Reserve or release a seat in a group session.
 *
 * POST   → a student claims a seat (RESERVED). Returns { participantId }; the
 *          client then starts checkout via /api/payments/create with
 *          `groupSessionParticipantId`. The seat isn't confirmed until the
 *          payment webhook flips it to PAID.
 * DELETE → the student releases their seat. A PAID seat is refunded (85%, 15%
 *          fee); the freed seat re-opens the session and pings the waitlist.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { drizzleDb } from '@/lib/db/drizzle'
import { groupSession, groupSessionParticipant, sessionParticipant } from '@/lib/db/schema'
import { notify } from '@/lib/notifications/notify'
import { refundGroupSeat } from '@/lib/payments/refund-group-session'
import { countActiveSeats } from '@/lib/group-session/seats'
import { notifyWaitlistOfOpening } from '@/lib/one-on-one/waitlist'
import { bookingInstants } from '@/lib/one-on-one/time'

async function load(id: string) {
  const [gs] = await drizzleDb
    .select()
    .from(groupSession)
    .where(eq(groupSession.groupSessionId, id))
    .limit(1)
  return gs ?? null
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions, req)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can book a seat' }, { status: 403 })
    }
    const { id } = await params

    const gs = await load(id)
    if (!gs) return NextResponse.json({ error: 'Group session not found' }, { status: 404 })
    if (gs.status === 'CANCELLED') {
      return NextResponse.json({ error: 'This session was cancelled' }, { status: 400 })
    }
    const { start } = bookingInstants(gs)
    if (start.getTime() <= Date.now()) {
      return NextResponse.json({ error: 'This session has already started' }, { status: 400 })
    }

    // Re-use an existing seat if the student already holds one.
    const [existing] = await drizzleDb
      .select()
      .from(groupSessionParticipant)
      .where(
        and(
          eq(groupSessionParticipant.groupSessionId, id),
          eq(groupSessionParticipant.studentId, session.user.id)
        )
      )
      .limit(1)

    if (existing && existing.status === 'PAID') {
      return NextResponse.json(
        { error: 'You already have a seat in this session' },
        { status: 409 }
      )
    }
    if (existing && existing.status === 'RESERVED') {
      return NextResponse.json({ success: true, participantId: existing.participantId })
    }

    // Capacity gate — count seats that are still held.
    if ((await countActiveSeats(id)) >= gs.capacity) {
      return NextResponse.json({ error: 'This session is full' }, { status: 409 })
    }

    const participantId = nanoid()
    if (existing) {
      // A previously cancelled seat — revive it (keeps the unique row).
      await drizzleDb
        .update(groupSessionParticipant)
        .set({ status: 'RESERVED', reservedAt: new Date(), paidAt: null, paymentId: null })
        .where(eq(groupSessionParticipant.participantId, existing.participantId))
      return NextResponse.json({ success: true, participantId: existing.participantId })
    }
    await drizzleDb.insert(groupSessionParticipant).values({
      participantId,
      groupSessionId: id,
      studentId: session.user.id,
      status: 'RESERVED',
    })
    return NextResponse.json({ success: true, participantId })
  } catch (err) {
    console.error('group seat reserve failed:', err)
    return NextResponse.json({ error: 'Failed to reserve a seat' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const gs = await load(id)
  if (!gs) return NextResponse.json({ error: 'Group session not found' }, { status: 404 })

  const [seat] = await drizzleDb
    .select()
    .from(groupSessionParticipant)
    .where(
      and(
        eq(groupSessionParticipant.groupSessionId, id),
        eq(groupSessionParticipant.studentId, session.user.id)
      )
    )
    .limit(1)
  if (!seat || seat.status === 'CANCELLED') {
    return NextResponse.json({ error: 'You have no seat to release' }, { status: 404 })
  }

  let refundResult = null
  if (seat.status === 'PAID') {
    refundResult = await refundGroupSeat(seat.participantId, 'Seat released by student')
    // Remove them from the shared room roster.
    if (gs.liveSessionId) {
      await drizzleDb
        .delete(sessionParticipant)
        .where(
          and(
            eq(sessionParticipant.sessionId, gs.liveSessionId),
            eq(sessionParticipant.studentId, session.user.id)
          )
        )
    }
  }

  await drizzleDb
    .update(groupSessionParticipant)
    .set({ status: 'CANCELLED', updatedAt: new Date() })
    .where(eq(groupSessionParticipant.participantId, seat.participantId))

  // A freed seat re-opens a FULL session and may interest the waitlist.
  if (gs.status === 'FULL') {
    await drizzleDb
      .update(groupSession)
      .set({ status: 'OPEN', updatedAt: new Date() })
      .where(eq(groupSession.groupSessionId, id))
  }
  if (gs.status !== 'CANCELLED') void notifyWaitlistOfOpening(gs.tutorId)

  if (seat.status === 'PAID') {
    notify({
      userId: gs.tutorId,
      type: 'class',
      title: 'Group seat released',
      message: `A student released their seat in “${gs.title}”.`,
      data: { groupSessionId: id, type: 'group-seat-released' },
    }).catch(() => {})
  }

  return NextResponse.json({
    success: true,
    refunded: refundResult?.refunded ?? false,
    refundAmount: refundResult?.amount,
    refundFee: refundResult?.fee,
  })
}
