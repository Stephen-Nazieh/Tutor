/**
 * Poll Management API
 * 
 * PATCH /api/class/polls/[pollId] - Update poll status (start, end)
 * DELETE /api/class/polls/[pollId] - Delete a poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const updatePollSchema = z.object({
  status: z.enum(['draft', 'active', 'closed']).optional(),
  showResults: z.boolean().optional()
})

// PATCH - Update poll (start/end)
export const PATCH = withAuth(async (req: NextRequest, session) => {
  try {
    const pollId = req.url.split('/').pop()
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 })
    }

    const body = await req.json()
    const data = updatePollSchema.parse(body)

    // Verify poll belongs to this tutor
    const existingPoll = await db.poll.findFirst({
      where: { id: pollId, tutorId: session.user.id }
    })

    if (!existingPoll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    const updateData: any = { ...data }
    
    // Set timestamps based on status change
    if (data.status === 'active' && existingPoll.status === 'draft') {
      updateData.startedAt = new Date()
    } else if (data.status === 'closed' && existingPoll.status === 'active') {
      updateData.endedAt = new Date()
    }

    const poll = await db.poll.update({
      where: { id: pollId },
      data: updateData
    })

    return NextResponse.json({ success: true, poll })
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
export const DELETE = withAuth(async (req: NextRequest, session) => {
  try {
    const pollId = req.url.split('/').pop()
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 })
    }

    // Verify poll belongs to this tutor
    const existingPoll = await db.poll.findFirst({
      where: { id: pollId, tutorId: session.user.id }
    })

    if (!existingPoll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    await db.poll.delete({
      where: { id: pollId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting poll:', error)
    return NextResponse.json(
      { error: 'Failed to delete poll' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
