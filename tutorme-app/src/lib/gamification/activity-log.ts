/**
 * Activity Log Service
 *
 * Tracks user activities for analytics and retention insights (Drizzle ORM)
 */

import crypto from 'crypto'
import { eq, and, gte, lte, inArray, desc, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { userActivityLog } from '@/lib/db/schema'

export const ACTIVITY_EVENTS = {
  // XP & Leveling
  XP_EARNED: 'xp_earned',
  LEVEL_UP: 'level_up',

  // Streaks
  STREAK_UPDATED: 'streak_updated',
  STREAK_BROKEN: 'streak_broken',

  // Worlds & Missions
  WORLD_UNLOCK: 'world_unlock',
  MISSION_START: 'mission_start',
  MISSION_COMPLETE: 'mission_complete',
  MISSION_ABANDON: 'mission_abandon',

  // Skills
  CONFIDENCE_MILESTONE: 'confidence_milestone',
  SKILL_IMPROVEMENT: 'skill_improvement',

  // AI Tutor
  AI_SESSION_START: 'ai_session_start',
  AI_SESSION_END: 'ai_session_end',
  PERSONALITY_SWITCH: 'personality_switch',

  // Learning
  LESSON_COMPLETE: 'lesson_complete',
  QUIZ_COMPLETE: 'quiz_complete',

  // Subscription
  SUBSCRIPTION_UPGRADE: 'subscription_upgrade',
  SUBSCRIPTION_DOWNGRADE: 'subscription_downgrade',

  // Engagement
  DAILY_LOGIN: 'daily_login',
  QUEST_COMPLETE: 'quest_complete',
} as const

export type ActivityEvent = (typeof ACTIVITY_EVENTS)[keyof typeof ACTIVITY_EVENTS]

/**
 * Log a user activity (stored in action column)
 */
export async function logActivity(
  userId: string,
  eventType: ActivityEvent | string,
  metadata?: Record<string, unknown>
) {
  try {
    await drizzleDb.insert(userActivityLog).values({
      id: crypto.randomUUID(),
      userId,
      action: eventType,
      metadata: metadata ?? {},
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}

/**
 * Get user's recent activities
 */
export async function getRecentActivities(
  userId: string,
  limit: number = 20,
  eventTypes?: string[]
) {
  return drizzleDb
    .select()
    .from(userActivityLog)
    .where(
      eventTypes?.length
        ? and(eq(userActivityLog.userId, userId), inArray(userActivityLog.action, eventTypes))
        : eq(userActivityLog.userId, userId)
    )
    .orderBy(desc(userActivityLog.createdAt))
    .limit(limit)
}

/**
 * Get activity counts for analytics
 */
export async function getActivityCounts(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const rows = await drizzleDb
    .select({
      action: userActivityLog.action,
      count: sql<number>`count(*)::int`,
    })
    .from(userActivityLog)
    .where(
      and(
        eq(userActivityLog.userId, userId),
        gte(userActivityLog.createdAt, startDate),
        lte(userActivityLog.createdAt, endDate)
      )
    )
    .groupBy(userActivityLog.action)

  const result: Record<string, number> = {}
  for (const row of rows) {
    result[row.action] = row.count
  }
  return result
}

/**
 * Get user's learning streak history
 */
export async function getStreakHistory(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  return drizzleDb
    .select()
    .from(userActivityLog)
    .where(
      and(
        eq(userActivityLog.userId, userId),
        inArray(userActivityLog.action, ['daily_login', 'streak_updated', 'streak_broken']),
        gte(userActivityLog.createdAt, startDate)
      )
    )
    .orderBy(userActivityLog.createdAt)
}

/**
 * Calculate engagement score (0-100)
 */
export async function calculateEngagementScore(userId: string): Promise<number> {
  const last7Days = new Date()
  last7Days.setDate(last7Days.getDate() - 7)

  const activities = await getActivityCounts(userId, last7Days, new Date())

  let score = 0
  score += Math.min(30, (activities['daily_login'] || 0) * 5)
  score += Math.min(40, (activities['mission_complete'] || 0) * 10)
  score += Math.min(20, (activities['ai_session_end'] || 0) * 5)
  score += Math.min(10, (activities['skill_improvement'] || 0) * 2)

  return Math.min(100, score)
}
