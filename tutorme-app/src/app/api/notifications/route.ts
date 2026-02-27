/**
 * Notifications API
 * GET /api/notifications - Get user's notifications
 * PATCH /api/notifications - Mark notifications as read
 * DELETE /api/notifications - Delete old notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, desc, lt, count, inArray } from 'drizzle-orm'
import { withAuth, parseBoundedInt } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { notification } from '@/lib/db/schema'
import crypto from 'crypto'

// GET - Get notifications
export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  const { searchParams } = new URL(req.url)

  const unreadOnly = searchParams.get('unread') === 'true'
  const limit = parseBoundedInt(searchParams.get('limit'), 50, { min: 1, max: 100 })
  const cursor = searchParams.get('cursor')

  const filters = [eq(notification.userId, userId)]
  if (unreadOnly) filters.push(eq(notification.read, false))
  if (cursor) filters.push(lt(notification.id, cursor)) // Assuming IDs are ordered CUIDs/UUIDs

  const userNotifications = await drizzleDb
    .select()
    .from(notification)
    .where(and(...filters))
    .orderBy(desc(notification.createdAt))
    .limit(limit)

  // Get unread count
  const [unreadResult] = await drizzleDb
    .select({ value: count() })
    .from(notification)
    .where(and(eq(notification.userId, userId), eq(notification.read, false)))

  const unreadCount = Number(unreadResult?.value || 0)

  return NextResponse.json({
    notifications: userNotifications,
    unreadCount,
    nextCursor: userNotifications.length === limit ? userNotifications[userNotifications.length - 1]?.id : null,
  })
})

// POST - Create notification (internal use)
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { userId, type, title, message, data, actionUrl } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [newNotification] = await drizzleDb.insert(notification).values({
      id: crypto.randomUUID(),
      userId,
      type,
      title,
      message,
      data: data || null,
      read: false,
      actionUrl: actionUrl || null,
    }).returning()

    return NextResponse.json({ notification: newNotification }, { status: 201 })
  } catch (error) {
    console.error('Create notification error:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// PATCH - Mark notifications as read
export const PATCH = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id

  try {
    const body = await req.json()
    const { notificationIds, markAll = false } = body

    if (markAll) {
      // Mark all as read
      const result = await drizzleDb
        .update(notification)
        .set({ read: true, readAt: new Date() })
        .where(and(eq(notification.userId, userId), eq(notification.read, false)))

      return NextResponse.json({ marked: 'all' })
    }

    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      await drizzleDb
        .update(notification)
        .set({ read: true, readAt: new Date() })
        .where(
          and(
            inArray(notification.id, notificationIds),
            eq(notification.userId, userId)
          )
        )

      return NextResponse.json({ marked: notificationIds.length })
    }

    return NextResponse.json(
      { error: 'No notifications specified' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Mark notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to mark notifications' },
      { status: 500 }
    )
  }
})

// DELETE - Delete old notifications
export const DELETE = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id

  try {
    // Delete notifications older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const result = await drizzleDb
      .delete(notification)
      .where(
        and(
          eq(notification.userId, userId),
          eq(notification.read, true),
          lt(notification.createdAt, thirtyDaysAgo)
        )
      )

    // Node-postgres dml results don't return count directly in the same way Prisma does, 
    // but we can execute and get the rowCount if needed.
    // Drizzle's delete().where() returns a promise that resolves when complete.

    return NextResponse.json({ deleted: 'completed' })
  } catch (error) {
    console.error('Delete notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
})
