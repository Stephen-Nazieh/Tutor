/**
 * Individual Notification API
 * DELETE /api/notifications/[id] - Delete a notification
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const DELETE = withAuth(async (req: NextRequest, session, { params }) => {
  const { id } = await params
  const userId = session.user.id
  
  try {
    // Verify notification belongs to user
    const notification = await db.notification.findFirst({
      where: { id, userId },
    })
    
    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }
    
    await db.notification.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete notification error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
}) // Any authenticated user can delete their own notification
