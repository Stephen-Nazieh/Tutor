/**
 * AI Tutor Usage API
 * Check if user can send messages or start live sessions
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - Check current usage and limits
export const GET = withAuth(async (req, session) => {
  const result = await checkUsage(session.user.id)
  return NextResponse.json(result)
}, { role: 'STUDENT' })

// Helper function to check usage (can be imported by other routes)
export async function checkUsage(userId: string) {
  // Get subscription
  const subscription = await db.aITutorSubscription.findUnique({
    where: { userId }
  })

  if (!subscription || !subscription.isActive) {
    return {
      canSendMessage: false,
      canStartLiveSession: false,
      reason: 'No active subscription',
      remainingMessages: 0,
      remainingSessions: 0
    }
  }

  // Get today's usage
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const dailyUsage = await db.aITutorDailyUsage.upsert({
    where: {
      userId_date: {
        userId,
        date: today
      }
    },
    update: {},
    create: {
      userId,
      date: today,
      sessionCount: 0,
      messageCount: 0,
      minutesUsed: 0
    }
  })

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

  if (type === 'message') {
    await db.aITutorDailyUsage.update({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      },
      data: {
        messageCount: { increment: amount }
      }
    })
  } else if (type === 'session') {
    await db.aITutorDailyUsage.update({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      },
      data: {
        sessionCount: { increment: amount }
      }
    })
  } else if (type === 'minute') {
    await db.aITutorDailyUsage.update({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      },
      data: {
        minutesUsed: { increment: amount }
      }
    })
  }

  // Return updated usage
  const result = await checkUsage(session.user.id)
  return NextResponse.json(result)
}, { role: 'STUDENT' }))
