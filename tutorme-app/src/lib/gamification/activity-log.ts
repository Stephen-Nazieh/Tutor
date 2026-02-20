/**
 * Activity Log Service
 * 
 * Tracks user activities for analytics and retention insights
 */

import { db } from '@/lib/db'

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

export type ActivityEvent = typeof ACTIVITY_EVENTS[keyof typeof ACTIVITY_EVENTS]

/**
 * Log a user activity
 */
export async function logActivity(
  userId: string,
  eventType: ActivityEvent | string,
  metadata?: Record<string, any>
) {
  try {
    await db.userActivityLog.create({
      data: {
        userId,
        eventType,
        metadata: metadata || {},
      },
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
  return db.userActivityLog.findMany({
    where: {
      userId,
      ...(eventTypes && { eventType: { in: eventTypes } }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}

/**
 * Get activity counts for analytics
 */
export async function getActivityCounts(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const activities = await db.userActivityLog.groupBy({
    by: ['eventType'],
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      eventType: true,
    },
  })

  const result: Record<string, number> = {}
  activities.forEach((item: any) => {
    result[item.eventType] = item._count.eventType
  })
  return result
}

/**
 * Get user's learning streak history
 */
export async function getStreakHistory(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  const activities = await db.userActivityLog.findMany({
    where: {
      userId,
      eventType: {
        in: ['daily_login', 'streak_updated', 'streak_broken'],
      },
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return activities
}

/**
 * Calculate engagement score (0-100)
 */
export async function calculateEngagementScore(userId: string): Promise<number> {
  const last7Days = new Date()
  last7Days.setDate(last7Days.getDate() - 7)
  
  const activities = await getActivityCounts(userId, last7Days, new Date())
  
  // Simple scoring algorithm
  let score = 0
  
  // Daily login (up to 30 points)
  score += Math.min(30, (activities['daily_login'] || 0) * 5)
  
  // Mission completion (up to 40 points)
  score += Math.min(40, (activities['mission_complete'] || 0) * 10)
  
  // AI sessions (up to 20 points)
  score += Math.min(20, (activities['ai_session_end'] || 0) * 5)
  
  // Skill improvement (up to 10 points)
  score += Math.min(10, (activities['skill_improvement'] || 0) * 2)
  
  return Math.min(100, score)
}
