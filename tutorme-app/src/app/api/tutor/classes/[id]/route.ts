/**
 * DELETE /api/tutor/classes/:id
 * Cancels/deletes a class session. Only the tutor who created the class can delete it.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const DELETE = withAuth(async (req, session, { params }: { params: { id: string } }) => {
  const tutorId = session.user.id
  const classId = params.id

  try {
    // Check if the class exists and belongs to this tutor
    const liveSession = await db.liveSession.findFirst({
      where: {
        id: classId,
        tutorId,
      },
    })

    if (!liveSession) {
      return NextResponse.json(
        { error: 'Class not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    // Check if class is already active or completed
    if (liveSession.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'Cannot delete an active class. Please end the class first.' },
        { status: 400 }
      )
    }

    if (liveSession.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot delete a completed class' },
        { status: 400 }
      )
    }

    // Delete the class (cascade will handle related records)
    await db.liveSession.delete({
      where: { id: classId },
    })

    return NextResponse.json({ message: 'Class deleted successfully' })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
