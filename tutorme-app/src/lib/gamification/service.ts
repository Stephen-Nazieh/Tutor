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

// XP required for each level (exponential growth)
const XP_LEVELS: Record<number, number> = {
  1: 0,
  2: 200,
  3: 500,
  4: 1000,
  5: 1800,
  6: 3000,
  7: 4600,
  8: 6600,
  9: 9100,
  10: 12100,
  11: 15600,
  12: 19600,
  13: 24100,
  14: 29100,
  15: 34600,
  16: 40600,
  17: 47100,
  18: 54100,
  19: 61600,
  20: 69600,
}

// XP rewards for different actions
export const XP_REWARDS = {
  COMPLETE_MISSION: 50,
  PERFECT_QUIZ: 20,
  DAILY_LOGIN: 10,
  STREAK_3_DAYS: 50,
  STREAK_7_DAYS: 150,
  STREAK_30_DAYS: 500,
  SPEAKING_PRACTICE: 30,
  AI_CONVERSATION: 40,
  COMPLETE_LESSON: 40,
  FIRST_MISSION: 100,
}

// Avatar personalities with Socratic balance
export const AVATAR_PERSONALITIES = {
  friendly_mentor: {
    id: 'friendly_mentor',
    name: 'Friendly Mentor',
    description: 'Warm, supportive, and encouraging',
    tone: 'warm and supportive',
    usesEmojis: true,
    correctionStyle: 'gentle',
    encouragement: 'frequent',
    socraticBalance: 0.6,
    voiceStyle: 'encouraging',
    examplePhrases: {
      greeting: "Hey there! I'm so excited to learn with you today!",
      correction: "Almost perfect! Here's a slightly smoother way to say that:",
      encouragement: "You're doing amazing! I can see your confidence growing!",
      socraticPrompt: "That's a great start! What do you think would happen if...?",
    },
  },
  strict_coach: {
    id: 'strict_coach',
    name: 'Strict Coach',
    description: 'Professional, direct, and disciplined',
    tone: 'professional and direct',
    usesEmojis: false,
    correctionStyle: 'immediate',
    encouragement: 'achievement-based',
    socraticBalance: 0.4,
    voiceStyle: 'authoritative',
    examplePhrases: {
      greeting: "Let's begin. Today's focus is clear communication.",
      correction: "Correction: Use present perfect with 'for' + duration.",
      encouragement: "Good. Your accuracy improved by 15% this week.",
      socraticPrompt: "Consider this: what is the core issue in your sentence?",
    },
  },
  corporate_trainer: {
    id: 'corporate_trainer',
    name: 'Corporate Trainer',
    description: 'Business-focused and performance-oriented',
    tone: 'business professional',
    usesEmojis: false,
    correctionStyle: 'constructive',
    encouragement: 'performance-focused',
    socraticBalance: 0.5,
    voiceStyle: 'professional',
    examplePhrases: {
      greeting: "Welcome. Let's work on your professional communication skills.",
      correction: "In a business context, consider this phrasing instead:",
      encouragement: "Your professional articulation is showing measurable improvement.",
      socraticPrompt: "From a stakeholder perspective, how would you frame this?",
    },
  },
  funny_teacher: {
    id: 'funny_teacher',
    name: 'Funny Teacher',
    description: 'Light, humorous, and engaging',
    tone: 'light and humorous',
    usesEmojis: true,
    correctionStyle: 'playful',
    encouragement: 'enthusiastic',
    socraticBalance: 0.7,
    voiceStyle: 'friendly',
    examplePhrases: {
      greeting: "Ready to level up your English? Let's make some grammar magic!",
      correction: "Oops! Let's give that sentence a little makeover!",
      encouragement: "Boom! You're crushing it! High five!",
      socraticPrompt: "Ooh, interesting! But what if we looked at it this way...?",
    },
  },
  calm_professor: {
    id: 'calm_professor',
    name: 'Calm Professor',
    description: 'Patient, thoughtful, and explanatory',
    tone: 'patient and thoughtful',
    usesEmojis: false,
    correctionStyle: 'explanatory',
    encouragement: 'steady',
    socraticBalance: 0.8,
    voiceStyle: 'calm',
    examplePhrases: {
      greeting: "Welcome. Take your time, and let's explore this together.",
      correction: "I see your thought process. Let's refine it gently:",
      encouragement: "Your progress is steady and meaningful. Well done.",
      socraticPrompt: "That's an interesting approach. What led you to that conclusion?",
    },
  },
} as const

export type AvatarPersonality = keyof typeof AVATAR_PERSONALITIES

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
