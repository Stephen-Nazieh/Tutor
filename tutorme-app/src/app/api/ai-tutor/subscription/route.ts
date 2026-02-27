/**
 * AI Tutor Subscription API (Drizzle ORM)
 * Get and manage subscription tier
 */

import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorDailyUsage, aITutorSubscription } from '@/lib/db/schema'

// GET - Get current subscription and usage
export const GET = withAuth(async (req, session) => {
  let [subscription] = await drizzleDb
    .select()
    .from(aITutorSubscription)
    .where(eq(aITutorSubscription.userId, session.user.id))
    .limit(1)

  if (!subscription) {
    const [created] = await drizzleDb
      .insert(aITutorSubscription)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        tier: 'FREE',
        dailySessions: 3,
        dailyMessages: 50,
        isActive: true,
      })
      .returning()
    subscription = created!
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [dailyUsage] = await drizzleDb
    .select()
    .from(aITutorDailyUsage)
    .where(
      and(
        eq(aITutorDailyUsage.userId, session.user.id),
        eq(aITutorDailyUsage.date, today)
      )
    )
    .limit(1)

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

    const [existing] = await drizzleDb
      .select()
      .from(aITutorSubscription)
      .where(eq(aITutorSubscription.userId, session.user.id))
      .limit(1)

    const subscription = existing
      ? (
          await drizzleDb
            .update(aITutorSubscription)
            .set({
              tier: tier as 'FREE' | 'BASIC' | 'PREMIUM',
              dailySessions: limits.dailySessions,
              dailyMessages: limits.dailyMessages,
            })
            .where(eq(aITutorSubscription.id, existing.id))
            .returning()
        )[0]!
      : (
          await drizzleDb
            .insert(aITutorSubscription)
            .values({
              id: crypto.randomUUID(),
              userId: session.user.id,
              tier: tier as 'FREE' | 'BASIC' | 'PREMIUM',
              dailySessions: limits.dailySessions,
              dailyMessages: limits.dailyMessages,
              isActive: true,
            })
            .returning()
        )[0]!

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
