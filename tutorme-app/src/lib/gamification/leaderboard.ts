/**
 * Leaderboard Service
 * 
 * Manages global, weekly, and class-specific leaderboards
 */

import { db } from '@/lib/db'

export type LeaderboardType = 'global' | 'weekly' | 'monthly' | `class_${string}`

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar?: string
  level: number
  xp: number
  score: number // XP earned in the period
  streakDays: number
  badges: number
}

export interface LeaderboardData {
  type: LeaderboardType
  periodStart?: Date
  periodEnd?: Date
  entries: LeaderboardEntry[]
  userRank?: LeaderboardEntry
  totalParticipants: number
}

/**
 * Get or create leaderboard entry for a user
 */
export async function updateLeaderboardEntry(
  userId: string,
  type: LeaderboardType,
  xpEarned: number,
  periodStart?: Date,
  periodEnd?: Date
) {
  const where: any = { userId, type }
  
  if (periodStart) {
    where.periodStart = periodStart
  }
  
  const existing = await db.leaderboardEntry.findFirst({ where })
  
  if (existing) {
    return await db.leaderboardEntry.update({
      where: { id: existing.id },
      data: {
        score: { increment: xpEarned },
      },
    })
  } else {
    return await db.leaderboardEntry.create({
      data: {
        userId,
        type,
        score: xpEarned,
        periodStart,
        periodEnd,
      },
    })
  }
}

/**
 * Get leaderboard with rankings
 */
export async function getLeaderboard(
  type: LeaderboardType,
  limit: number = 100,
  userId?: string
): Promise<LeaderboardData> {
  const now = new Date()
  let periodStart: Date | undefined
  let periodEnd: Date | undefined
  
  // Calculate period for weekly/monthly leaderboards
  if (type === 'weekly') {
    const dayOfWeek = now.getDay()
    periodStart = new Date(now)
    periodStart.setDate(now.getDate() - dayOfWeek)
    periodStart.setHours(0, 0, 0, 0)
    periodEnd = new Date(periodStart)
    periodEnd.setDate(periodEnd.getDate() + 6)
    periodEnd.setHours(23, 59, 59, 999)
  } else if (type === 'monthly') {
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
    periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  }
  
  // Build where clause
  const where: any = { type }
  if (periodStart) {
    where.periodStart = { gte: periodStart }
  }
  
  // Get entries with user info
  const entries = await db.leaderboardEntry.findMany({
    where,
    orderBy: { score: 'desc' },
    take: limit,
    include: {
      user: {
        include: {
          profile: true,
          gamification: true,
          _count: {
            select: { badges: true },
          },
        },
      },
    },
  })
  
  // Format entries with ranks
  const formattedEntries: LeaderboardEntry[] = entries.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    name: entry.user.profile?.name || `Student ${entry.userId.slice(-6)}`,
    avatar: entry.user.profile?.avatar || undefined,
    level: entry.user.gamification?.level || 1,
    xp: entry.user.gamification?.xp || 0,
    score: entry.score,
    streakDays: entry.user.gamification?.streakDays || 0,
    badges: entry.user._count.badges,
  }))
  
  // Get user's rank if not in top entries
  let userRank: LeaderboardEntry | undefined
  if (userId && !entries.find(e => e.userId === userId)) {
    userRank = await getUserRank(userId, type, periodStart)
  } else if (userId) {
    userRank = formattedEntries.find(e => e.userId === userId)
  }
  
  // Get total participants
  const totalParticipants = await db.leaderboardEntry.count({ where })
  
  return {
    type,
    periodStart,
    periodEnd,
    entries: formattedEntries,
    userRank,
    totalParticipants,
  }
}

/**
 * Get a specific user's rank
 */
async function getUserRank(
  userId: string,
  type: LeaderboardType,
  periodStart?: Date
): Promise<LeaderboardEntry | undefined> {
  const where: any = { type }
  if (periodStart) {
    where.periodStart = { gte: periodStart }
  }
  
  // Get user's entry
  const userEntry = await db.leaderboardEntry.findFirst({
    where: { ...where, userId },
    include: {
      user: {
        include: {
          profile: true,
          gamification: true,
          _count: {
            select: { badges: true },
          },
        },
      },
    },
  })
  
  if (!userEntry) return undefined
  
  // Count users with higher scores
  const higherRankCount = await db.leaderboardEntry.count({
    where: {
      ...where,
      score: { gt: userEntry.score },
    },
  })
  
  return {
    rank: higherRankCount + 1,
    userId: userEntry.userId,
    name: userEntry.user.profile?.name || `Student ${userEntry.userId.slice(-6)}`,
    avatar: userEntry.user.profile?.avatar || undefined,
    level: userEntry.user.gamification?.level || 1,
    xp: userEntry.user.gamification?.xp || 0,
    score: userEntry.score,
    streakDays: userEntry.user.gamification?.streakDays || 0,
    badges: userEntry.user._count.badges,
  }
}

/**
 * Get leaderboard around a user (for "near me" view)
 */
export async function getLeaderboardAroundUser(
  userId: string,
  type: LeaderboardType,
  range: number = 5
): Promise<LeaderboardEntry[]> {
  const now = new Date()
  let periodStart: Date | undefined
  
  if (type === 'weekly') {
    const dayOfWeek = now.getDay()
    periodStart = new Date(now)
    periodStart.setDate(now.getDate() - dayOfWeek)
    periodStart.setHours(0, 0, 0, 0)
  } else if (type === 'monthly') {
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
  }
  
  const where: any = { type }
  if (periodStart) {
    where.periodStart = { gte: periodStart }
  }
  
  // Get user's entry
  const userEntry = await db.leaderboardEntry.findFirst({
    where: { ...where, userId },
  })
  
  if (!userEntry) {
    // User has no entry, return top entries
    const leaderboard = await getLeaderboard(type, range * 2 + 1, userId)
    return leaderboard.entries
  }
  
  // Get users with higher scores (rank above)
  const aboveEntries = await db.leaderboardEntry.findMany({
    where: {
      ...where,
      score: { gte: userEntry.score },
      userId: { not: userId },
    },
    orderBy: { score: 'asc' },
    take: range,
    include: {
      user: {
        include: {
          profile: true,
          gamification: true,
          _count: {
            select: { badges: true },
          },
        },
      },
    },
  })
  
  // Get users with lower scores (rank below)
  const belowEntries = await db.leaderboardEntry.findMany({
    where: {
      ...where,
      score: { lt: userEntry.score },
    },
    orderBy: { score: 'desc' },
    take: range,
    include: {
      user: {
        include: {
          profile: true,
          gamification: true,
          _count: {
            select: { badges: true },
          },
        },
      },
    },
  })
  
  // Combine and calculate ranks
  const allEntries = [...aboveEntries.reverse(), userEntry, ...belowEntries]
  
  // Find user's rank
  const userRank = await db.leaderboardEntry.count({
    where: {
      ...where,
      score: { gt: userEntry.score },
    },
  })
  
  return allEntries.map((entry, index) => ({
    rank: userRank - aboveEntries.length + index + 1,
    userId: entry.userId,
    name: entry.user.profile?.name || `Student ${entry.userId.slice(-6)}`,
    avatar: entry.user.profile?.avatar || undefined,
    level: entry.user.gamification?.level || 1,
    xp: entry.user.gamification?.xp || 0,
    score: entry.score,
    streakDays: entry.user.gamification?.streakDays || 0,
    badges: entry.user._count.badges,
  }))
}

/**
 * Reset weekly leaderboard
 * Call this via cron job every Sunday at midnight
 */
export async function resetWeeklyLeaderboard() {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  // Archive old entries or just delete them
  // For now, we'll keep them for historical tracking
  
  console.log('[Leaderboard] Weekly leaderboard period ended')
}

/**
 * Reset monthly leaderboard
 * Call this via cron job on the 1st of each month
 */
export async function resetMonthlyLeaderboard() {
  console.log('[Leaderboard] Monthly leaderboard period ended')
}

/**
 * Get user's leaderboard stats
 */
export async function getUserLeaderboardStats(userId: string) {
  const [globalEntry, weeklyEntry, monthlyEntry] = await Promise.all([
    db.leaderboardEntry.findFirst({
      where: { userId, type: 'global' },
    }),
    db.leaderboardEntry.findFirst({
      where: { userId, type: 'weekly' },
    }),
    db.leaderboardEntry.findFirst({
      where: { userId, type: 'monthly' },
    }),
  ])
  
  const globalRank = globalEntry 
    ? await db.leaderboardEntry.count({
        where: { type: 'global', score: { gt: globalEntry.score } },
      }) + 1
    : null
  
  const weeklyRank = weeklyEntry
    ? await db.leaderboardEntry.count({
        where: { type: 'weekly', score: { gt: weeklyEntry.score } },
      }) + 1
    : null
  
  const monthlyRank = monthlyEntry
    ? await db.leaderboardEntry.count({
        where: { type: 'monthly', score: { gt: monthlyEntry.score } },
      }) + 1
    : null
  
  return {
    global: {
      rank: globalRank,
      score: globalEntry?.score || 0,
    },
    weekly: {
      rank: weeklyRank,
      score: weeklyEntry?.score || 0,
    },
    monthly: {
      rank: monthlyRank,
      score: monthlyEntry?.score || 0,
    },
  }
}

/**
 * Initialize global leaderboard entry for a new user
 */
export async function initializeUserLeaderboard(userId: string) {
  await db.leaderboardEntry.create({
    data: {
      userId,
      type: 'global',
      score: 0,
    },
  })
}
