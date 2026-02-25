/**
 * GET /api/gamification/dashboard
 * Get complete gamification dashboard data for the current user
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getOrCreateGamification, getGamificationSummary } from '@/lib/gamification/service'
import { getAllBadgesWithProgress, getBadgeStats } from '@/lib/gamification/badges'
import { getUserLeaderboardStats } from '@/lib/gamification/leaderboard'
import { db } from '@/lib/db'

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
    
    // Get daily quests
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const dailyQuests = await db.userDailyQuest.findMany({
      where: {
        userId,
        date: { gte: today },
      },
      include: {
        mission: true,
      },
    })
    
    // Get recent achievements (badges earned)
    const userBadges = await db.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
      take: 5,
    })
    
    // Get recent activity
    const recentActivity = await db.userActivityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    
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
        dailyQuests: dailyQuests.map(dq => ({
          id: dq.id,
          title: dq.mission.title,
          description: dq.mission.description,
          xpReward: dq.mission.xpReward,
          completed: dq.completed,
          requirement: dq.mission.requirement,
        })),
        recentAchievements: userBadges.map(ub => ({
          id: ub.id,
          title: ub.badge.name,
          description: ub.badge.description,
          xpAwarded: ub.badge.xpBonus,
          unlockedAt: ub.earnedAt,
        })),
        recentActivity: recentActivity.map(a => ({
          id: a.id,
          type: a.action,
          metadata: a.metadata,
          createdAt: a.createdAt,
        })),
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
