/**
 * Daily Quests Service
 *
 * Uses Mission (type 'daily') as quest templates and UserDailyQuest (userId, missionId, date, completed).
 * No DailyQuest table; requirement JSON holds { questType, requirement }.
 */

import { db } from '@/lib/db'
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
  {
    title: 'Word Master',
    description: 'Learn 5 new vocabulary words',
    type: QUEST_TYPES.VOCABULARY,
    xpReward: 20,
    requirement: 5,
  },
  {
    title: 'Speaking Practice',
    description: 'Complete a 3-minute speaking exercise',
    type: QUEST_TYPES.SPEAKING,
    xpReward: 30,
    requirement: 1,
  },
  {
    title: 'Grammar Check',
    description: 'Complete a grammar exercise',
    type: QUEST_TYPES.GRAMMAR,
    xpReward: 25,
    requirement: 1,
  },
  {
    title: 'Confidence Boost',
    description: 'Speak without hesitation for 2 minutes',
    type: QUEST_TYPES.CONFIDENCE,
    xpReward: 35,
    requirement: 1,
  },
  {
    title: 'Mission Complete',
    description: 'Complete any mission',
    type: QUEST_TYPES.MISSION,
    xpReward: 40,
    requirement: 1,
  },
  {
    title: 'Listening Ear',
    description: 'Listen to a lesson for 10 minutes',
    type: QUEST_TYPES.LISTENING,
    xpReward: 20,
    requirement: 1,
  },
] as const

function getQuestTypeFromRequirement(requirement: unknown): string | null {
  if (requirement && typeof requirement === 'object' && 'questType' in requirement) {
    return (requirement as { questType: string }).questType
  }
  return null
}

/**
 * Initialize daily quests: ensure Mission records exist for each quest type (type 'daily').
 */
export async function initializeDailyQuests() {
  for (const q of DEFAULT_QUESTS) {
    const existing = await db.mission.findFirst({
      where: {
        type: 'daily',
        title: q.title,
      },
    })
    if (!existing) {
      await db.mission.create({
        data: {
          title: q.title,
          description: q.description,
          type: 'daily',
          xpReward: q.xpReward,
          requirement: { questType: q.type, requirement: q.requirement },
          isActive: true,
        },
      })
    }
  }
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
 * Generate today's daily quests for user (3 random Mission type 'daily').
 */
export async function generateDailyQuests(userId: string) {
  const today = startOfDay(new Date())

  const existing = await db.userDailyQuest.findMany({
    where: {
      userId,
      date: { gte: today, lte: endOfDay(today) },
    },
    include: { mission: true },
  })

  if (existing.length > 0) return existing

  const dailyMissions = await db.mission.findMany({
    where: { type: 'daily', isActive: true },
  })

  if (dailyMissions.length === 0) return []

  const shuffled = [...dailyMissions].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3)

  const userQuests = await Promise.all(
    selected.map((mission) =>
      db.userDailyQuest.create({
        data: {
          userId,
          missionId: mission.id,
          date: today,
          completed: false,
        },
        include: { mission: true },
      })
    )
  )

  return userQuests
}

/**
 * Get user's daily quests for today.
 */
export async function getTodayQuests(userId: string) {
  const today = startOfDay(new Date())

  const quests = await db.userDailyQuest.findMany({
    where: {
      userId,
      date: { gte: today, lte: endOfDay(today) },
    },
    include: { mission: true },
  })

  if (quests.length === 0) {
    return generateDailyQuests(userId)
  }

  return quests
}

/**
 * Update quest progress: mark the matching daily quest (by questType) as completed.
 * UserDailyQuest has no progress field; we set completed true and award XP.
 */
export async function updateQuestProgress(
  userId: string,
  questType: string,
  _progressAmount: number = 1
) {
  const today = startOfDay(new Date())

  const userQuests = await db.userDailyQuest.findMany({
    where: {
      userId,
      date: { gte: today, lte: endOfDay(today) },
      completed: false,
    },
    include: { mission: true },
  })

  const matching = userQuests.find(
    (q) => getQuestTypeFromRequirement(q.mission.requirement) === questType
  )

  if (!matching) return null

  const updated = await db.userDailyQuest.update({
    where: { id: matching.id },
    data: { completed: true },
    include: { mission: true },
  })

  await awardXp(userId, matching.mission.xpReward, 'quest_complete', {
    questId: matching.mission.id,
    questTitle: matching.mission.title,
  })

  await logActivity(userId, 'QUEST_COMPLETE', {
    questId: matching.mission.id,
    questTitle: matching.mission.title,
    xpEarned: matching.mission.xpReward,
  })

  return updated
}

/**
 * Get quest completion summary for today.
 */
export async function getQuestSummary(userId: string) {
  const today = startOfDay(new Date())

  const todayQuests = await db.userDailyQuest.findMany({
    where: {
      userId,
      date: { gte: today, lte: endOfDay(today) },
    },
    include: { mission: true },
  })

  const completed = todayQuests.filter((q) => q.completed).length
  const total = todayQuests.length
  const totalXp = todayQuests
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + q.mission.xpReward, 0)

  return {
    completed,
    total,
    totalXp,
    allCompleted: total > 0 && completed === total,
    quests: todayQuests,
  }
}
