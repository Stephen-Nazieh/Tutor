/**
 * Leaderboard Service (Drizzle)
 * Manages global, weekly, and class-specific leaderboards
 */

import crypto from 'crypto'
import { eq, and, gte, gt, lt, desc, asc, sql, ne, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { leaderboardEntry, user, profile, userGamification, userBadge } from '@/lib/db/schema'

export type LeaderboardType = 'global' | 'weekly' | 'monthly' | `class_${string}`

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar?: string
  level: number
  xp: number
  score: number
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

async function enrichEntriesWithUser(
  entries: { id: string; userId: string; type: string; score: number; periodStart: Date | null; periodEnd: Date | null; rank: number | null }[]
): Promise<LeaderboardEntry[]> {
  if (entries.length === 0) return []
  const userIds = [...new Set(entries.map((e) => e.userId))]
  const [profiles, gamifications, badgeCounts] = await Promise.all([
    drizzleDb.select().from(profile).where(inArray(profile.userId, userIds)),
    drizzleDb.select().from(userGamification).where(inArray(userGamification.userId, userIds)),
    drizzleDb
      .select({ userId: userBadge.userId, count: sql<number>`count(*)::int` })
      .from(userBadge)
      .where(inArray(userBadge.userId, userIds))
      .groupBy(userBadge.userId),
  ])
  const profileMap = new Map(profiles.map((p) => [p.userId, p]))
  const gamificationMap = new Map(gamifications.map((g) => [g.userId, g]))
  const badgeMap = new Map(badgeCounts.map((b) => [b.userId, b.count]))
  return entries.map((entry, index) => {
    const prof = profileMap.get(entry.userId)
    const gam = gamificationMap.get(entry.userId)
    const badges = badgeMap.get(entry.userId) ?? 0
    return {
      rank: index + 1,
      userId: entry.userId,
      name: prof?.name ?? `Student ${entry.userId.slice(-6)}`,
      avatar: prof?.avatarUrl ?? undefined,
      level: gam?.level ?? 1,
      xp: gam?.xp ?? 0,
      score: entry.score,
      streakDays: gam?.streakDays ?? 0,
      badges,
    }
  })
}

export async function updateLeaderboardEntry(
  userId: string,
  type: LeaderboardType,
  xpEarned: number,
  periodStart?: Date,
  periodEnd?: Date
) {
  const conditions = [eq(leaderboardEntry.userId, userId), eq(leaderboardEntry.type, type)]
  if (periodStart) conditions.push(eq(leaderboardEntry.periodStart, periodStart))
  const [existing] = await drizzleDb
    .select()
    .from(leaderboardEntry)
    .where(and(...conditions))
    .limit(1)
  if (existing) {
    const [updated] = await drizzleDb
      .update(leaderboardEntry)
      .set({ score: sql`${leaderboardEntry.score} + ${xpEarned}` })
      .where(eq(leaderboardEntry.id, existing.id))
      .returning()
    return updated ?? existing
  }
  const [created] = await drizzleDb
    .insert(leaderboardEntry)
    .values({
      id: crypto.randomUUID(),
      userId,
      type,
      score: xpEarned,
      periodStart: periodStart ?? null,
      periodEnd: periodEnd ?? null,
    })
    .returning()
  if (!created) throw new Error('Failed to create leaderboard entry')
  return created
}

export async function getLeaderboard(
  type: LeaderboardType,
  limit = 100,
  userId?: string
): Promise<LeaderboardData> {
  const now = new Date()
  let periodStart: Date | undefined
  let periodEnd: Date | undefined
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
  const conditions = [eq(leaderboardEntry.type, type)]
  if (periodStart) conditions.push(gte(leaderboardEntry.periodStart, periodStart))
  const entries = await drizzleDb
    .select()
    .from(leaderboardEntry)
    .where(and(...conditions))
    .orderBy(desc(leaderboardEntry.score))
    .limit(limit)
  const formattedEntries = await enrichEntriesWithUser(entries)
  let userRank: LeaderboardEntry | undefined
  if (userId) {
    const inTop = formattedEntries.find((e) => e.userId === userId)
    if (inTop) userRank = inTop
    else userRank = await getUserRank(userId, type, periodStart)
  }
  const [countRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(leaderboardEntry)
    .where(and(...conditions))
  return {
    type,
    periodStart,
    periodEnd,
    entries: formattedEntries,
    userRank,
    totalParticipants: countRow?.count ?? 0,
  }
}

async function getUserRank(
  userId: string,
  type: LeaderboardType,
  periodStart?: Date
): Promise<LeaderboardEntry | undefined> {
  const conditions = [eq(leaderboardEntry.type, type), eq(leaderboardEntry.userId, userId)]
  if (periodStart) conditions.push(gte(leaderboardEntry.periodStart, periodStart))
  const [userEntry] = await drizzleDb
    .select()
    .from(leaderboardEntry)
    .where(and(...conditions))
    .limit(1)
  if (!userEntry) return undefined
  const countConditions = [eq(leaderboardEntry.type, type), gt(leaderboardEntry.score, userEntry.score)]
  if (periodStart) countConditions.push(gte(leaderboardEntry.periodStart, periodStart))
  const [higher] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(leaderboardEntry)
    .where(and(...countConditions))
  const rank = (higher?.count ?? 0) + 1
  const enriched = await enrichEntriesWithUser([userEntry])
  if (enriched.length === 0) return undefined
  return { ...enriched[0], rank }
}

export async function getLeaderboardAroundUser(
  userId: string,
  type: LeaderboardType,
  range = 5
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
  const conditions = [eq(leaderboardEntry.type, type), eq(leaderboardEntry.userId, userId)]
  if (periodStart) conditions.push(gte(leaderboardEntry.periodStart, periodStart))
  const [userEntry] = await drizzleDb
    .select()
    .from(leaderboardEntry)
    .where(and(...conditions))
    .limit(1)
  if (!userEntry) {
    const leaderboard = await getLeaderboard(type, range * 2 + 1, userId)
    return leaderboard.entries
  }
  const whereBase = [eq(leaderboardEntry.type, type)]
  if (periodStart) whereBase.push(gte(leaderboardEntry.periodStart, periodStart))
  const [aboveEntries, belowEntries, rankCount] = await Promise.all([
    drizzleDb
      .select()
      .from(leaderboardEntry)
      .where(and(...whereBase, gte(leaderboardEntry.score, userEntry.score), ne(leaderboardEntry.userId, userId)))
      .orderBy(asc(leaderboardEntry.score))
      .limit(range),
    drizzleDb
      .select()
      .from(leaderboardEntry)
      .where(and(...whereBase, lt(leaderboardEntry.score, userEntry.score)))
      .orderBy(desc(leaderboardEntry.score))
      .limit(range),
    drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(leaderboardEntry)
      .where(and(...whereBase, gt(leaderboardEntry.score, userEntry.score))),
  ])
  const userRank = (rankCount[0]?.count ?? 0) + 1
  const aboveReversed = [...aboveEntries].reverse()
  const allEntries = [...aboveReversed, userEntry, ...belowEntries]
  const enriched = await enrichEntriesWithUser(allEntries)
  return enriched.map((e, index) => ({ ...e, rank: userRank - aboveReversed.length + index + 1 }))
}

export async function resetWeeklyLeaderboard() {
  console.log('[Leaderboard] Weekly leaderboard period ended')
}

export async function resetMonthlyLeaderboard() {
  console.log('[Leaderboard] Monthly leaderboard period ended')
}

export async function getUserLeaderboardStats(userId: string) {
  const [globalEntry, weeklyEntry, monthlyEntry] = await Promise.all([
    drizzleDb.select().from(leaderboardEntry).where(and(eq(leaderboardEntry.userId, userId), eq(leaderboardEntry.type, 'global'))).limit(1),
    drizzleDb.select().from(leaderboardEntry).where(and(eq(leaderboardEntry.userId, userId), eq(leaderboardEntry.type, 'weekly'))).limit(1),
    drizzleDb.select().from(leaderboardEntry).where(and(eq(leaderboardEntry.userId, userId), eq(leaderboardEntry.type, 'monthly'))).limit(1),
  ])
  const countHigher = async (type: string, score: number) => {
    const [r] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(leaderboardEntry)
      .where(and(eq(leaderboardEntry.type, type), gt(leaderboardEntry.score, score)))
    return (r?.count ?? 0) + 1
  }
  return {
    global: {
      rank: globalEntry[0] ? await countHigher('global', globalEntry[0].score) : null,
      score: globalEntry[0]?.score ?? 0,
    },
    weekly: {
      rank: weeklyEntry[0] ? await countHigher('weekly', weeklyEntry[0].score) : null,
      score: weeklyEntry[0]?.score ?? 0,
    },
    monthly: {
      rank: monthlyEntry[0] ? await countHigher('monthly', monthlyEntry[0].score) : null,
      score: monthlyEntry[0]?.score ?? 0,
    },
  }
}

export async function initializeUserLeaderboard(userId: string) {
  await drizzleDb.insert(leaderboardEntry).values({
    id: crypto.randomUUID(),
    userId,
    type: 'global',
    score: 0,
  })
}
