/**
 * GET /api/gamification/dashboard
 * Get complete gamification dashboard data for the current user
 */

import { NextResponse } from 'next/server'
import { eq, gte, desc, and } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getOrCreateGamification, getGamificationSummary } from '@/lib/gamification/service'
import { getAllBadgesWithProgress, getBadgeStats } from '@/lib/gamification/badges'
import { getUserLeaderboardStats } from '@/lib/gamification/leaderboard'
import { drizzleDb } from '@/lib/db/drizzle'
import { userDailyQuest, mission, userBadge, badge, userActivityLog } from '@/lib/db/schema'

export const GET = withAuth(async (req, session) => {
  try {
    const userId = session.user.id

    // Get or create gamification profile
    const gamification = await getOrCreateGamification(userId)

    // Get summary
    const summary = await getGamificationSummary(userId)

    // Get badges with progress
    const badges = await getAllBadgesWithProgress(userId)

    // Get badge stats
    const badgeStats = await getBadgeStats(userId)

    // Get leaderboard stats
    const leaderboardStats = await getUserLeaderboardStats(userId)

    // Get daily quests (Drizzle)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dailyQuestsRows = await drizzleDb
      .select({
        id: userDailyQuest.id,
        title: mission.title,
        description: mission.description,
        xpReward: mission.xpReward,
        completed: userDailyQuest.completed,
        requirement: mission.requirement,
      })
      .from(userDailyQuest)
      .innerJoin(mission, eq(mission.id, userDailyQuest.missionId))
      .where(and(eq(userDailyQuest.userId, userId), gte(userDailyQuest.date, today)))

    const dailyQuests = dailyQuestsRows.map((dq) => ({
      id: dq.id,
      title: dq.title,
      description: dq.description,
      xpReward: dq.xpReward,
      completed: dq.completed,
      requirement: dq.requirement,
    }))

    // Get recent achievements (badges earned) (Drizzle)
    const userBadgesRows = await drizzleDb
      .select({
        id: userBadge.id,
        name: badge.name,
        description: badge.description,
        xpBonus: badge.xpBonus,
        earnedAt: userBadge.earnedAt,
      })
      .from(userBadge)
      .innerJoin(badge, eq(badge.id, userBadge.badgeId))
      .where(eq(userBadge.userId, userId))
      .orderBy(desc(userBadge.earnedAt))
      .limit(5)

    const userBadges = userBadgesRows.map((ub) => ({
      id: ub.id,
      title: ub.name,
      description: ub.description,
      xpAwarded: ub.xpBonus,
      unlockedAt: ub.earnedAt,
    }))

    // Get recent activity (Drizzle)
    const recentActivityRows = await drizzleDb
      .select()
      .from(userActivityLog)
      .where(eq(userActivityLog.userId, userId))
      .orderBy(desc(userActivityLog.createdAt))
      .limit(10)

    const recentActivity = recentActivityRows.map((a) => ({
      id: a.id,
      type: a.action,
      metadata: a.metadata,
      createdAt: a.createdAt,
    }))

    return NextResponse.json({
      success: true,
      data: {
        profile: {
          level: gamification.level,
          xp: gamification.xp,
          xpToNextLevel: summary.xpToNextLevel,
          progress: summary.progress,
          streakDays: gamification.streakDays,
          longestStreak: gamification.longestStreak,
          skills: summary.skills,
        },
        badges: {
          all: badges,
          stats: badgeStats,
        },
        leaderboard: leaderboardStats,
        dailyQuests,
        recentAchievements: userBadges,
        recentActivity,
      },
    })
  } catch (error) {
    console.error('Error fetching gamification dashboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}, { role: 'STUDENT' })
