/**
 * Notifications API
 * GET /api/notifications - Get user's notifications
 * PATCH /api/notifications - Mark notifications as read
 * DELETE /api/notifications - Delete old notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { withAuth, parseBoundedInt } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - Get notifications
export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const unreadOnly = searchParams.get('unread') === 'true'
  const limit = parseBoundedInt(searchParams.get('limit'), 50, { min: 1, max: 100 })
  const cursor = searchParams.get('cursor')
  
  const where: Prisma.NotificationWhereInput = { userId }
  if (unreadOnly) where.read = false
  
  const notifications = await db.notification.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
  })
  
  // Get unread count
  const unreadCount = await db.notification.count({
    where: { userId, read: false },
  })
  
  return NextResponse.json({
    notifications,
    unreadCount,
    nextCursor: notifications.length === limit ? notifications[notifications.length - 1]?.id : null,
  })
}) // Any authenticated user (STUDENT or TUTOR) can read their own notifications

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
    
    const notification = await db.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data,
        actionUrl,
      },
    })
    
    return NextResponse.json({ notification }, { status: 201 })
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
      await db.notification.updateMany({
        where: { userId, read: false },
        data: { read: true, readAt: new Date() },
      })
      
      return NextResponse.json({ marked: 'all' })
    }
    
    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      await db.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId,
        },
        data: { read: true, readAt: new Date() },
      })
      
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
}) // Any authenticated user can mark their own as read

// DELETE - Delete old notifications
export const DELETE = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  
  try {
    // Delete notifications older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const result = await db.notification.deleteMany({
      where: {
        userId,
        read: true,
        createdAt: { lt: thirtyDaysAgo },
      },
    })
    
    return NextResponse.json({ deleted: result.count })
  } catch (error) {
    console.error('Delete notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
}) // Any authenticated user can delete their own
