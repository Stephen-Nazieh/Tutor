/**
 * AI Tutor Usage API (Drizzle ORM)
 * Check if user can send messages or start live sessions
 */

import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorDailyUsage, aITutorSubscription } from '@/lib/db/schema'

// GET - Check current usage and limits
export const GET = withAuth(async (req, session) => {
  const result = await checkUsage(session.user.id)
  return NextResponse.json(result)
}, { role: 'STUDENT' })

export async function checkUsage(userId: string) {
  const [subscription] = await drizzleDb
    .select()
    .from(aITutorSubscription)
    .where(eq(aITutorSubscription.userId, userId))
    .limit(1)

  if (!subscription || !subscription.isActive) {
    return {
      canSendMessage: false,
      canStartLiveSession: false,
      reason: 'No active subscription',
      remainingMessages: 0,
      remainingSessions: 0,
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [existing] = await drizzleDb
    .select()
    .from(aITutorDailyUsage)
    .where(
      and(
        eq(aITutorDailyUsage.userId, userId),
        eq(aITutorDailyUsage.date, today)
      )
    )
    .limit(1)

  let dailyUsage: { messageCount: number; sessionCount: number }
  if (existing) {
    dailyUsage = existing
  } else {
    const [inserted] = await drizzleDb
      .insert(aITutorDailyUsage)
      .values({
        id: crypto.randomUUID(),
        userId,
        date: today,
        sessionCount: 0,
        messageCount: 0,
        minutesUsed: 0,
      })
      .returning()
    dailyUsage = inserted!
  }

  // Check message limit
  const dailyMessages = subscription.dailyMessages
  const canSendMessage = dailyUsage.messageCount < dailyMessages
  const remainingMessages = Math.max(0, dailyMessages - dailyUsage.messageCount)

  // Check session limit
  const dailySessions = subscription.dailySessions
  const canStartLiveSession = dailyUsage.sessionCount < dailySessions
  const remainingSessions = Math.max(0, dailySessions - dailyUsage.sessionCount)

  return {
    canSendMessage,
    canStartLiveSession,
    remainingMessages,
    remainingSessions,
    tier: subscription.tier,
    resetsAt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
  }
}

// POST - Record usage increment
export const POST = withCsrf(withAuth(async (req, session) => {
  const { type, amount = 1 } = await req.json()
  
  if (!['message', 'session', 'minute'].includes(type)) {
    throw new ValidationError('Invalid usage type')
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [row] = await drizzleDb
    .select()
    .from(aITutorDailyUsage)
    .where(
      and(
        eq(aITutorDailyUsage.userId, session.user.id),
        eq(aITutorDailyUsage.date, today)
      )
    )
    .limit(1)

  if (row) {
    if (type === 'message') {
      await drizzleDb
        .update(aITutorDailyUsage)
        .set({ messageCount: row.messageCount + amount })
        .where(eq(aITutorDailyUsage.id, row.id))
    } else if (type === 'session') {
      await drizzleDb
        .update(aITutorDailyUsage)
        .set({ sessionCount: row.sessionCount + amount })
        .where(eq(aITutorDailyUsage.id, row.id))
    } else if (type === 'minute') {
      await drizzleDb
        .update(aITutorDailyUsage)
        .set({ minutesUsed: row.minutesUsed + amount })
        .where(eq(aITutorDailyUsage.id, row.id))
    }
  } else {
    await drizzleDb.insert(aITutorDailyUsage).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      date: today,
      sessionCount: type === 'session' ? amount : 0,
      messageCount: type === 'message' ? amount : 0,
      minutesUsed: type === 'minute' ? amount : 0,
    })
  }

  // Return updated usage
  const result = await checkUsage(session.user.id)
  return NextResponse.json(result)
}, { role: 'STUDENT' }))
