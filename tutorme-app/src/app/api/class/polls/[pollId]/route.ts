/**
 * Poll Management API
 * 
 * PATCH /api/class/polls/[pollId] - Update poll status (start, end)
 * DELETE /api/class/polls/[pollId] - Delete a poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { poll } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

const updatePollSchema = z.object({
  status: z.enum(['draft', 'active', 'closed']).optional(),
  showResults: z.boolean().optional()
})

// PATCH - Update poll (start/end)
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  try {
    const pollId = await getParamAsync(context?.params, 'pollId')
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 })
    }

    const body = await req.json()
    const data = updatePollSchema.parse(body)

    const [existingPoll] = await drizzleDb
      .select()
      .from(poll)
      .where(and(eq(poll.id, pollId), eq(poll.tutorId, session.user.id)))
      .limit(1)

    if (!existingPoll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    const set: Partial<typeof poll.$inferInsert> = { showResults: data.showResults }
    if (data.status === 'active' && existingPoll.status === 'DRAFT') {
      set.startedAt = new Date()
      set.status = 'ACTIVE'
    } else if (data.status === 'closed' && existingPoll.status === 'ACTIVE') {
      set.endedAt = new Date()
      set.status = 'CLOSED'
    } else if (data.status) {
      set.status = (data.status.toUpperCase() === 'ACTIVE' ? 'ACTIVE' : data.status.toUpperCase() === 'CLOSED' ? 'CLOSED' : 'DRAFT') as 'DRAFT' | 'ACTIVE' | 'CLOSED'
    }

    await drizzleDb.update(poll).set(set).where(eq(poll.id, pollId))
    const [updated] = await drizzleDb.select().from(poll).where(eq(poll.id, pollId)).limit(1)

    return NextResponse.json({ success: true, poll: updated })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating poll:', error)
    return NextResponse.json(
      { error: 'Failed to update poll' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Delete a poll
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  try {
    const pollId = await getParamAsync(context?.params, 'pollId')
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 })
    }

    const [existingPoll] = await drizzleDb
      .select()
      .from(poll)
      .where(and(eq(poll.id, pollId), eq(poll.tutorId, session.user.id)))
      .limit(1)

    if (!existingPoll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    await drizzleDb.delete(poll).where(eq(poll.id, pollId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting poll:', error)
    return NextResponse.json(
      { error: 'Failed to delete poll' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
