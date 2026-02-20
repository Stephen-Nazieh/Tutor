/**
 * AI Tutor Subscription API
 * Get and manage subscription tier
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - Get current subscription and usage
export const GET = withAuth(async (req, session) => {
  // Get or create subscription
    let subscription = await db.aITutorSubscription.findUnique({
      where: { userId: session.user.id }
    })

    if (!subscription) {
      // Create FREE tier subscription by default
      subscription = await db.aITutorSubscription.create({
        data: {
          userId: session.user.id,
          tier: 'FREE',
          dailySessions: 3,
          dailyMessages: 50,
          isActive: true
        }
      })
    }

    // Get today's usage
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const dailyUsage = await db.aITutorDailyUsage.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      }
    })

  return NextResponse.json({
    subscription: {
      tier: subscription.tier,
      isActive: subscription.isActive,
      limits: {
        dailySessions: subscription.dailySessions,
        dailyMessages: subscription.dailyMessages
      }
    },
    usage: {
      sessionsCount: dailyUsage?.sessionCount || 0,
      messageCount: dailyUsage?.messageCount || 0,
      resetsAt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Tomorrow
    }
  })
}, { role: 'STUDENT' })

// POST - Upgrade/downgrade tier
export const POST = withCsrf(withAuth(async (req, session) => {
  const { tier } = await req.json()
  
  if (!['FREE', 'BASIC', 'PREMIUM'].includes(tier)) {
    throw new ValidationError('Invalid tier')
  }

    // Define limits for each tier
    const tierLimits = {
      FREE: { dailySessions: 3, dailyMessages: 50 },
      BASIC: { dailySessions: 10, dailyMessages: 200 },
      PREMIUM: { dailySessions: 50, dailyMessages: 1000 }
    }

    const limits = tierLimits[tier as keyof typeof tierLimits]

    const subscription = await db.aITutorSubscription.upsert({
      where: { userId: session.user.id },
      update: {
        tier,
        dailySessions: limits.dailySessions,
        dailyMessages: limits.dailyMessages
      },
      create: {
        userId: session.user.id,
        tier,
        dailySessions: limits.dailySessions,
        dailyMessages: limits.dailyMessages,
        isActive: true
      }
    })

  return NextResponse.json({
    subscription: {
      tier: subscription.tier,
      limits: {
        dailySessions: subscription.dailySessions,
        dailyMessages: subscription.dailyMessages
      }
    }
  })
}, { role: 'STUDENT' }))
