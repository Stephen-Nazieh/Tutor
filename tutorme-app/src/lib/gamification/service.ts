/**
 * Gamification Service
 *
 * Handles XP, Level, Streak, and Skill Score calculations (Drizzle ORM)
 * Merged Socratic teaching with Gamified Avatar personalities
 */

import crypto from 'crypto'
import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { userGamification } from '@/lib/db/schema'
import { logActivity } from './activity-log'
import { XP_LEVELS, XP_REWARDS, AVATAR_PERSONALITIES, type AvatarPersonality } from './constants'

export async function getOrCreateGamification(userId: string) {
  const [existing] = await drizzleDb
    .select()
    .from(userGamification)
    .where(eq(userGamification.userId, userId))
    .limit(1)

  if (existing) return existing

  const [created] = await drizzleDb
    .insert(userGamification)
    .values({
      id: crypto.randomUUID(),
      userId,
      level: 1,
      xp: 0,
      streakDays: 0,
      longestStreak: 0,
      totalStudyMinutes: 0,
      grammarScore: 0,
      vocabularyScore: 0,
      speakingScore: 0,
      listeningScore: 0,
      confidenceScore: 0,
      fluencyScore: 0,
      unlockedWorlds: [],
    })
    .returning()

  if (!created) throw new Error('Failed to create user gamification')
  return created
}

export function calculateLevel(xp: number): number {
  let level = 1
  for (let i = 1; i <= 20; i++) {
    if (xp >= XP_LEVELS[i]) {
      level = i
    } else {
      break
    }
  }
  return level
}

export function getXpForNextLevel(currentLevel: number): number {
  return XP_LEVELS[currentLevel + 1] || XP_LEVELS[20] * 2
}

export function getLevelProgress(xp: number, level: number): number {
  const currentLevelXp = XP_LEVELS[level]
  const nextLevelXp = XP_LEVELS[level + 1] || XP_LEVELS[20] * 2
  const xpInLevel = xp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp
  return Math.min(100, Math.round((xpInLevel / xpNeeded) * 100))
}

export async function awardXp(
  userId: string,
  amount: number,
  source: string,
  metadata?: Record<string, unknown>
) {
  const gamification = await getOrCreateGamification(userId)

  const newXp = gamification.xp + amount
  const newLevel = calculateLevel(newXp)
  const leveledUp = newLevel > gamification.level

  const [updated] = await drizzleDb
    .update(userGamification)
    .set({ xp: newXp, level: newLevel })
    .where(eq(userGamification.userId, userId))
    .returning()

  if (!updated) throw new Error('Failed to update gamification')

  await logActivity(userId, 'XP_EARNED', {
    amount,
    source,
    newTotal: newXp,
    leveledUp,
    ...metadata,
  })

  return {
    ...updated,
    xpEarned: amount,
    leveledUp,
    previousLevel: gamification.level,
  }
}

export async function updateStreak(userId: string) {
  const gamification = await getOrCreateGamification(userId)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActive = gamification.lastActiveDate
    ? new Date(gamification.lastActiveDate)
    : null

  let newStreak = gamification.streakDays
  let streakBonus = 0
  let streakContinued = false
  let streakBroken = false

  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0)
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      newStreak += 1
      streakContinued = true

      if (newStreak === 3) streakBonus = XP_REWARDS.STREAK_3_DAYS
      else if (newStreak === 7) streakBonus = XP_REWARDS.STREAK_7_DAYS
      else if (newStreak === 30) streakBonus = XP_REWARDS.STREAK_30_DAYS
    } else if (diffDays === 0) {
      streakContinued = true
    } else {
      streakBroken = true
      newStreak = 1
    }
  } else {
    newStreak = 1
  }

  const longestStreak = Math.max(gamification.longestStreak, newStreak)

  const [updated] = await drizzleDb
    .update(userGamification)
    .set({
      streakDays: newStreak,
      longestStreak,
      lastActiveDate: today,
    })
    .where(eq(userGamification.userId, userId))
    .returning()

  if (!updated) throw new Error('Failed to update streak')

  await logActivity(userId, streakBroken ? 'STREAK_BROKEN' : 'STREAK_UPDATED', {
    streakDays: newStreak,
    previousStreak: gamification.streakDays,
    streakBroken,
    streakContinued,
  })

  return {
    ...updated,
    streakBonus,
    streakContinued,
    streakBroken,
  }
}

export async function checkDailyLogin(userId: string) {
  const gamification = await getOrCreateGamification(userId)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActive = gamification.lastActiveDate
    ? new Date(gamification.lastActiveDate)
    : null

  if (!lastActive || lastActive.getTime() !== today.getTime()) {
    const streakResult = await updateStreak(userId)
    const xpResult = await awardXp(userId, XP_REWARDS.DAILY_LOGIN, 'daily_login')

    return {
      firstLoginToday: true,
      xpEarned: xpResult.xpEarned + streakResult.streakBonus,
      streakBonus: streakResult.streakBonus,
      streakDays: streakResult.streakDays,
      leveledUp: xpResult.leveledUp,
    }
  }

  return {
    firstLoginToday: false,
    streakDays: gamification.streakDays,
  }
}

export async function updateSkillScores(
  userId: string,
  scores: {
    grammar?: number
    vocabulary?: number
    speaking?: number
    listening?: number
    confidence?: number
    fluency?: number
  }
) {
  const gamification = await getOrCreateGamification(userId)

  const calculateScore = (existing: number, newScore?: number) => {
    if (newScore === undefined) return existing
    return Math.round(existing * 0.7 + newScore * 0.3)
  }

  const [updated] = await drizzleDb
    .update(userGamification)
    .set({
      grammarScore: calculateScore(gamification.grammarScore, scores.grammar),
      vocabularyScore: calculateScore(gamification.vocabularyScore, scores.vocabulary),
      speakingScore: calculateScore(gamification.speakingScore, scores.speaking),
      listeningScore: calculateScore(gamification.listeningScore, scores.listening),
      confidenceScore: calculateScore(gamification.confidenceScore, scores.confidence),
      fluencyScore: calculateScore(gamification.fluencyScore, scores.fluency),
    })
    .where(eq(userGamification.userId, userId))
    .returning()

  if (!updated) throw new Error('Failed to update skill scores')

  if (scores.confidence && scores.confidence > gamification.confidenceScore + 5) {
    await logActivity(userId, 'CONFIDENCE_MILESTONE', {
      previousScore: gamification.confidenceScore,
      newScore: updated.confidenceScore,
      delta: updated.confidenceScore - gamification.confidenceScore,
    })
  }

  return updated
}

export async function getGamificationSummary(userId: string) {
  const gamification = await getOrCreateGamification(userId)
  const nextLevelXp = getXpForNextLevel(gamification.level)
  const currentLevelXp = XP_LEVELS[gamification.level]
  const progress = getLevelProgress(gamification.xp, gamification.level)

  return {
    level: gamification.level,
    xp: gamification.xp,
    nextLevelXp,
    currentLevelXp,
    progress,
    xpToNextLevel: nextLevelXp - gamification.xp,
    streakDays: gamification.streakDays,
    longestStreak: gamification.longestStreak,
    skills: {
      grammar: gamification.grammarScore,
      vocabulary: gamification.vocabularyScore,
      speaking: gamification.speakingScore,
      listening: gamification.listeningScore,
      confidence: gamification.confidenceScore,
      fluency: gamification.fluencyScore,
    },
    unlockedWorlds: gamification.unlockedWorlds,
  }
}

export async function unlockWorld(userId: string, worldId: string) {
  const gamification = await getOrCreateGamification(userId)

  const current = gamification.unlockedWorlds ?? []
  if (!current.includes(worldId)) {
    const [updated] = await drizzleDb
      .update(userGamification)
      .set({ unlockedWorlds: [...current, worldId] })
      .where(eq(userGamification.userId, userId))
      .returning()

    if (updated) {
      await logActivity(userId, 'WORLD_UNLOCK', { worldId })
      return { unlocked: true, updated }
    }
  }

  return { unlocked: false }
}

export async function canAccessWorld(userId: string, requiredLevel: number) {
  const gamification = await getOrCreateGamification(userId)
  return gamification.level >= requiredLevel
}
