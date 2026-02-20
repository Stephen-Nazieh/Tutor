/**
 * Worlds and Missions Service
 *
 * Worlds are in-memory (DEFAULT_WORLDS); unlock status from UserGamification.
 * Missions use schema: Mission, MissionProgress (studentId, progress, completed).
 */

import { db } from '@/lib/db'
import {
  awardXp,
  XP_REWARDS,
  canAccessWorld,
  getOrCreateGamification,
} from './service'
import { logActivity } from './activity-log'

export const DEFAULT_WORLDS = [
  {
    id: 'survival',
    name: 'Survival World',
    emoji: '🌍',
    description:
      'Master everyday English for real-life situations',
    storyArc:
      'You have arrived in an English-speaking country. Learn to navigate daily life, from ordering food to asking for directions.',
    unlockLevel: 1,
    difficultyLevel: 1,
  },
  {
    id: 'workplace',
    name: 'Workplace World',
    emoji: '💼',
    description: 'Professional English for career advancement',
    storyArc:
      'You have started a new job. Navigate meetings, emails, and professional conversations with confidence.',
    unlockLevel: 3,
    difficultyLevel: 2,
  },
  {
    id: 'daily_life',
    name: 'Daily Life World',
    emoji: '🏠',
    description: 'Conversations with friends, family, and neighbors',
    storyArc:
      'Build relationships and connect with people around you through natural everyday conversations.',
    unlockLevel: 2,
    difficultyLevel: 1,
  },
  {
    id: 'academic',
    name: 'Academic World',
    emoji: '🧠',
    description: 'Study skills and academic English',
    storyArc:
      'Prepare for academic success with essay writing, presentations, and research skills.',
    unlockLevel: 4,
    difficultyLevel: 3,
  },
  {
    id: 'social',
    name: 'Social & Relationships',
    emoji: '❤️',
    description: 'Make friends and build connections',
    storyArc:
      'Navigate social situations, from casual hangouts to meaningful conversations and dating.',
    unlockLevel: 3,
    difficultyLevel: 2,
  },
  {
    id: 'public_speaking',
    name: 'Public Speaking Arena',
    emoji: '🎤',
    description: 'Speak confidently in front of others',
    storyArc:
      'Face your fears and master the art of presenting to groups, large and small.',
    unlockLevel: 5,
    difficultyLevel: 3,
  },
  {
    id: 'debate',
    name: 'Debate Arena',
    emoji: '🏆',
    description: 'Advanced argumentation and persuasion',
    storyArc:
      'Enter the arena of ideas. Defend your positions and respectfully challenge others.',
    unlockLevel: 8,
    difficultyLevel: 4,
  },
] as const

/**
 * No-op: worlds are in-memory only (no db.world table).
 */
export async function initializeWorlds() {
  // Worlds are defined in DEFAULT_WORLDS; no DB persistence.
}

/**
 * Get all worlds with user unlock status (in-memory).
 */
export async function getWorldsWithStatus(userId: string) {
  const gamification = await getOrCreateGamification(userId)
  const unlocked = gamification.unlockedWorlds ?? []

  return DEFAULT_WORLDS.map((world) => ({
    ...world,
    isUnlocked:
      unlocked.includes(world.id) || gamification.level >= world.unlockLevel,
    canAccess: gamification.level >= world.unlockLevel,
    progress: 0,
  }))
}

/**
 * Get a single world by id (in-memory). Missions from schema have no worldId; return empty list.
 */
export async function getWorldWithMissions(
  worldId: string,
  userId: string
) {
  const world = DEFAULT_WORLDS.find((w) => w.id === worldId)
  if (!world) return null

  const gamification = await getOrCreateGamification(userId)
  const isUnlocked =
    (gamification.unlockedWorlds ?? []).includes(world.id) ||
    gamification.level >= world.unlockLevel

  return {
    ...world,
    isUnlocked,
    canAccess: gamification.level >= world.unlockLevel,
    missions: [], // Mission model has no worldId; no per-world missions in schema
  }
}

/**
 * Start a mission (uses MissionProgress: studentId, progress, completed).
 */
export async function startMission(userId: string, missionId: string) {
  const mission = await db.mission.findUnique({
    where: { id: missionId },
  })

  if (!mission) {
    throw new Error('Mission not found')
  }

  const canAccess = await canAccessWorld(userId, 1) // requirement level 1 for any mission
  if (!canAccess) {
    throw new Error('World not unlocked yet')
  }

  const existing = await db.missionProgress.findUnique({
    where: {
      missionId_studentId: { missionId, studentId: userId },
    },
  })

  if (existing) {
    if (existing.completed) {
      return existing
    }
    await logActivity(userId, 'MISSION_START', { missionId })
    return existing
  }

  const progress = await db.missionProgress.create({
    data: {
      missionId,
      studentId: userId,
      progress: 0,
      completed: false,
    },
  })

  await logActivity(userId, 'MISSION_START', { missionId })
  return progress
}

/**
 * Complete a mission and award XP. Stores score in progress field.
 */
export async function completeMission(
  userId: string,
  missionId: string,
  score: number,
  _confidenceDelta: number = 0
) {
  const mission = await db.mission.findUnique({
    where: { id: missionId },
  })

  if (!mission) {
    throw new Error('Mission not found')
  }

  let xpEarned = mission.xpReward
  if (score >= 90) xpEarned += XP_REWARDS.PERFECT_QUIZ

  const existing = await db.missionProgress.findUnique({
    where: {
      missionId_studentId: { missionId, studentId: userId },
    },
  })

  if (!existing || !existing.completed) {
    xpEarned += XP_REWARDS.FIRST_MISSION
  }

  const progress = await db.missionProgress.upsert({
    where: {
      missionId_studentId: { missionId, studentId: userId },
    },
    update: {
      progress: Math.round(score),
      completed: true,
      completedAt: new Date(),
    },
    create: {
      missionId,
      studentId: userId,
      progress: Math.round(score),
      completed: true,
      completedAt: new Date(),
    },
  })

  await awardXp(userId, xpEarned, 'mission_complete', {
    missionId,
    score,
  })

  await logActivity(userId, 'MISSION_COMPLETE', {
    missionId,
    score,
    xpEarned,
  })

  return {
    progress,
    xpEarned,
  }
}

/**
 * Get user's mission progress summary (schema: MissionProgress.studentId, .completed).
 */
export async function getMissionSummary(userId: string) {
  const totalMissions = await db.mission.count({ where: { isActive: true } })

  const completed = await db.missionProgress.count({
    where: { studentId: userId, completed: true },
  })

  const inProgress = await db.missionProgress.count({
    where: { studentId: userId, completed: false },
  })

  const notStarted = Math.max(
    0,
    totalMissions - completed - inProgress
  )

  const progressRecords = await db.missionProgress.findMany({
    where: { studentId: userId },
  })
  const totalXpEarned = progressRecords.length * 50 // approximate; schema has no xpEarned on MissionProgress

  return {
    total: totalMissions,
    completed,
    inProgress,
    notStarted,
    totalXpEarned,
    completionRate:
      totalMissions > 0 ? Math.round((completed / totalMissions) * 100) : 0,
  }
}

/**
 * Get recommended next mission (any active mission user has not completed).
 */
export async function getRecommendedMission(userId: string) {
  const inProgress = await db.missionProgress.findFirst({
    where: { studentId: userId, completed: false },
    include: { mission: true },
  })

  if (inProgress) {
    return inProgress.mission
  }

  const completedMissionIds = (
    await db.missionProgress.findMany({
      where: { studentId: userId, completed: true },
      select: { missionId: true },
    })
  ).map((p) => p.missionId)

  const next = await db.mission.findFirst({
    where: {
      isActive: true,
      id: { notIn: completedMissionIds },
    },
  })

  return next ?? null
}
