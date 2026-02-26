/**
 * Daily Quests Service (Drizzle ORM)
 *
 * Uses Mission (type 'daily') as quest templates and UserDailyQuest (userId, missionId, date, completed).
 */

import crypto from 'crypto'
import { eq, and, gte, lte } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { mission, userDailyQuest } from '@/lib/db/schema'
import { awardXp } from './service'
import { logActivity } from './activity-log'

export const QUEST_TYPES = {
  VOCABULARY: 'vocabulary',
  SPEAKING: 'speaking',
  GRAMMAR: 'grammar',
  CONFIDENCE: 'confidence',
  MISSION: 'mission',
  LISTENING: 'listening',
} as const

const DEFAULT_QUESTS = [
  { title: 'Word Master', description: 'Learn 5 new vocabulary words', type: QUEST_TYPES.VOCABULARY, xpReward: 20, requirement: 5 },
  { title: 'Speaking Practice', description: 'Complete a 3-minute speaking exercise', type: QUEST_TYPES.SPEAKING, xpReward: 30, requirement: 1 },
  { title: 'Grammar Check', description: 'Complete a grammar exercise', type: QUEST_TYPES.GRAMMAR, xpReward: 25, requirement: 1 },
  { title: 'Confidence Boost', description: 'Speak without hesitation for 2 minutes', type: QUEST_TYPES.CONFIDENCE, xpReward: 35, requirement: 1 },
  { title: 'Mission Complete', description: 'Complete any mission', type: QUEST_TYPES.MISSION, xpReward: 40, requirement: 1 },
  { title: 'Listening Ear', description: 'Listen to a lesson for 10 minutes', type: QUEST_TYPES.LISTENING, xpReward: 20, requirement: 1 },
] as const

function getQuestTypeFromRequirement(requirement: unknown): string | null {
  if (requirement && typeof requirement === 'object' && 'questType' in requirement) {
    return (requirement as { questType: string }).questType
  }
  return null
}

function startOfDay(d: Date): Date {
  const out = new Date(d)
  out.setHours(0, 0, 0, 0)
  return out
}

function endOfDay(d: Date): Date {
  const out = new Date(d)
  out.setHours(23, 59, 59, 999)
  return out
}

/**
 * Initialize daily quests: ensure Mission records exist for each quest type (type 'daily').
 */
export async function initializeDailyQuests() {
  for (const q of DEFAULT_QUESTS) {
    const [existing] = await drizzleDb
      .select()
      .from(mission)
      .where(and(eq(mission.type, 'daily'), eq(mission.title, q.title)))
      .limit(1)
    if (!existing) {
      await drizzleDb.insert(mission).values({
        id: crypto.randomUUID(),
        title: q.title,
        description: q.description,
        type: 'daily',
        xpReward: q.xpReward,
        requirement: { questType: q.type, requirement: q.requirement },
        isActive: true,
      })
    }
  }
}

/**
 * Generate today's daily quests for user (3 random Mission type 'daily').
 */
export async function generateDailyQuests(userId: string) {
  const today = startOfDay(new Date())

  const existing = await drizzleDb
    .select({
      id: userDailyQuest.id,
      userId: userDailyQuest.userId,
      missionId: userDailyQuest.missionId,
      date: userDailyQuest.date,
      completed: userDailyQuest.completed,
      mId: mission.id,
      mTitle: mission.title,
      mDescription: mission.description,
      mType: mission.type,
      mXpReward: mission.xpReward,
      mRequirement: mission.requirement,
      mIsActive: mission.isActive,
    })
    .from(userDailyQuest)
    .innerJoin(mission, eq(mission.id, userDailyQuest.missionId))
    .where(and(eq(userDailyQuest.userId, userId), gte(userDailyQuest.date, today), lte(userDailyQuest.date, endOfDay(today))))

  if (existing.length > 0) {
    return existing.map((r) => ({
      id: r.id,
      userId: r.userId,
      missionId: r.missionId,
      date: r.date,
      completed: r.completed,
      mission: {
        id: r.mId,
        title: r.mTitle,
        description: r.mDescription,
        type: r.mType,
        xpReward: r.mXpReward,
        requirement: r.mRequirement,
        isActive: r.mIsActive,
      },
    }))
  }

  const dailyMissions = await drizzleDb
    .select()
    .from(mission)
    .where(and(eq(mission.type, 'daily'), eq(mission.isActive, true)))

  if (dailyMissions.length === 0) return []

  const shuffled = [...dailyMissions].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3)

  const userQuests: Array<{
    id: string
    userId: string
    missionId: string
    date: Date
    completed: boolean
    mission: (typeof mission.$inferSelect) & { id: string }
  }> = []
  for (const m of selected) {
    const [row] = await drizzleDb
      .insert(userDailyQuest)
      .values({
        id: crypto.randomUUID(),
        userId,
        missionId: m.id,
        date: today,
        completed: false,
      })
      .returning()
    if (row) userQuests.push({ ...row, mission: m })
  }
  return userQuests
}

/**
 * Get user's daily quests for today.
 */
export async function getTodayQuests(userId: string) {
  const today = startOfDay(new Date())

  const quests = await drizzleDb
    .select({
      id: userDailyQuest.id,
      userId: userDailyQuest.userId,
      missionId: userDailyQuest.missionId,
      date: userDailyQuest.date,
      completed: userDailyQuest.completed,
      mId: mission.id,
      mTitle: mission.title,
      mDescription: mission.description,
      mType: mission.type,
      mXpReward: mission.xpReward,
      mRequirement: mission.requirement,
      mIsActive: mission.isActive,
    })
    .from(userDailyQuest)
    .innerJoin(mission, eq(mission.id, userDailyQuest.missionId))
    .where(and(eq(userDailyQuest.userId, userId), gte(userDailyQuest.date, today), lte(userDailyQuest.date, endOfDay(today))))

  if (quests.length === 0) return generateDailyQuests(userId)

  return quests.map((r) => ({
    id: r.id,
    userId: r.userId,
    missionId: r.missionId,
    date: r.date,
    completed: r.completed,
    mission: {
      id: r.mId,
      title: r.mTitle,
      description: r.mDescription,
      type: r.mType,
      xpReward: r.mXpReward,
      requirement: r.mRequirement,
      isActive: r.mIsActive,
    },
  }))
}

/**
 * Update quest progress: mark the matching daily quest (by questType) as completed.
 */
export async function updateQuestProgress(
  userId: string,
  questType: string,
  _progressAmount: number = 1
) {
  const today = startOfDay(new Date())

  const userQuests = await drizzleDb
    .select({
      id: userDailyQuest.id,
      completed: userDailyQuest.completed,
      mId: mission.id,
      mTitle: mission.title,
      mXpReward: mission.xpReward,
      mRequirement: mission.requirement,
    })
    .from(userDailyQuest)
    .innerJoin(mission, eq(mission.id, userDailyQuest.missionId))
    .where(
      and(
        eq(userDailyQuest.userId, userId),
        gte(userDailyQuest.date, today),
        lte(userDailyQuest.date, endOfDay(today)),
        eq(userDailyQuest.completed, false)
      )
    )

  const matching = userQuests.find((q) => getQuestTypeFromRequirement(q.mRequirement) === questType)
  if (!matching) return null

  const [updated] = await drizzleDb
    .update(userDailyQuest)
    .set({ completed: true })
    .where(eq(userDailyQuest.id, matching.id))
    .returning()

  if (!updated) return null

  await awardXp(userId, matching.mXpReward, 'quest_complete', {
    questId: matching.mId,
    questTitle: matching.mTitle,
  })
  await logActivity(userId, 'QUEST_COMPLETE', {
    questId: matching.mId,
    questTitle: matching.mTitle,
    xpEarned: matching.mXpReward,
  })

  return { ...updated, mission: { id: matching.mId, title: matching.mTitle, xpReward: matching.mXpReward, requirement: matching.mRequirement } }
}

/**
 * Get quest completion summary for today.
 */
export async function getQuestSummary(userId: string) {
  const today = startOfDay(new Date())

  const todayQuests = await drizzleDb
    .select({
      id: userDailyQuest.id,
      userId: userDailyQuest.userId,
      missionId: userDailyQuest.missionId,
      date: userDailyQuest.date,
      completed: userDailyQuest.completed,
      mId: mission.id,
      mTitle: mission.title,
      mDescription: mission.description,
      mType: mission.type,
      mXpReward: mission.xpReward,
      mRequirement: mission.requirement,
      mIsActive: mission.isActive,
    })
    .from(userDailyQuest)
    .innerJoin(mission, eq(mission.id, userDailyQuest.missionId))
    .where(
      and(
        eq(userDailyQuest.userId, userId),
        gte(userDailyQuest.date, today),
        lte(userDailyQuest.date, endOfDay(today))
      )
    )

  const completed = todayQuests.filter((q) => q.completed).length
  const total = todayQuests.length
  const totalXp = todayQuests.filter((q) => q.completed).reduce((sum, q) => sum + q.mXpReward, 0)

  const quests = todayQuests.map((q) => ({
    id: q.id,
    userId: q.userId,
    missionId: q.missionId,
    date: q.date,
    completed: q.completed,
    mission: {
      id: q.mId,
      title: q.mTitle,
      description: q.mDescription,
      type: q.mType,
      xpReward: q.mXpReward,
      requirement: q.mRequirement,
      isActive: q.mIsActive,
    },
  }))

  return {
    completed,
    total,
    totalXp,
    allCompleted: total > 0 && completed === total,
    quests,
  }
}
