/**
 * Individual Notification API
 * DELETE /api/notifications/[id] - Delete a notification
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { notification } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'

export const DELETE = withAuth(async (_req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Notification ID required' }, { status: 400 })
  }
  const userId = session.user.id

  try {
    const [existing] = await drizzleDb
      .select()
      .from(notification)
      .where(and(eq(notification.id, id), eq(notification.userId, userId)))
      .limit(1)

    if (!existing) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    await drizzleDb.delete(notification).where(eq(notification.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete notification error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
})
