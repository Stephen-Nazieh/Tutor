/**
 * Worlds and Missions Service (Drizzle ORM)
 *
 * Worlds are in-memory (DEFAULT_WORLDS); unlock status from UserGamification.
 * Missions use schema: Mission, MissionProgress (studentId, progress, completed).
 */

import crypto from 'crypto'
import { eq, and, notInArray, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { mission, missionProgress } from '@/lib/db/schema'
import {
  awardXp,
  XP_REWARDS,
  canAccessWorld,
  getOrCreateGamification,
} from './service'
import { logActivity } from './activity-log'

export const DEFAULT_WORLDS = [
  { id: 'survival', name: 'Survival World', emoji: '🌍', description: 'Master everyday English for real-life situations', storyArc: 'You have arrived in an English-speaking country. Learn to navigate daily life, from ordering food to asking for directions.', unlockLevel: 1, difficultyLevel: 1 },
  { id: 'workplace', name: 'Workplace World', emoji: '💼', description: 'Professional English for career advancement', storyArc: 'You have started a new job. Navigate meetings, emails, and professional conversations with confidence.', unlockLevel: 3, difficultyLevel: 2 },
  { id: 'daily_life', name: 'Daily Life World', emoji: '🏠', description: 'Conversations with friends, family, and neighbors', storyArc: 'Build relationships and connect with people around you through natural everyday conversations.', unlockLevel: 2, difficultyLevel: 1 },
  { id: 'academic', name: 'Academic World', emoji: '🧠', description: 'Study skills and academic English', storyArc: 'Prepare for academic success with essay writing, presentations, and research skills.', unlockLevel: 4, difficultyLevel: 3 },
  { id: 'social', name: 'Social & Relationships', emoji: '❤️', description: 'Make friends and build connections', storyArc: 'Navigate social situations, from casual hangouts to meaningful conversations and dating.', unlockLevel: 3, difficultyLevel: 2 },
  { id: 'public_speaking', name: 'Public Speaking Arena', emoji: '🎤', description: 'Speak confidently in front of others', storyArc: 'Face your fears and master the art of presenting to groups, large and small.', unlockLevel: 5, difficultyLevel: 3 },
  { id: 'debate', name: 'Debate Arena', emoji: '🏆', description: 'Advanced argumentation and persuasion', storyArc: 'Enter the arena of ideas. Defend your positions and respectfully challenge others.', unlockLevel: 8, difficultyLevel: 4 },
] as const

export async function initializeWorlds() {
  // Worlds are defined in DEFAULT_WORLDS; no DB persistence.
}

export async function getWorldsWithStatus(userId: string) {
  const gamification = await getOrCreateGamification(userId)
  const unlocked = gamification.unlockedWorlds ?? []

  return DEFAULT_WORLDS.map((world) => ({
    ...world,
    isUnlocked: unlocked.includes(world.id) || gamification.level >= world.unlockLevel,
    canAccess: gamification.level >= world.unlockLevel,
    progress: 0,
  }))
}

export async function getWorldWithMissions(worldId: string, userId: string) {
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
    missions: [],
  }
}

export async function startMission(userId: string, missionId: string) {
  const [missionRow] = await drizzleDb.select().from(mission).where(eq(mission.id, missionId)).limit(1)
  if (!missionRow) throw new Error('Mission not found')

  const canAccess = await canAccessWorld(userId, 1)
  if (!canAccess) throw new Error('World not unlocked yet')

  const [existing] = await drizzleDb
    .select()
    .from(missionProgress)
    .where(and(eq(missionProgress.missionId, missionId), eq(missionProgress.studentId, userId)))
    .limit(1)

  if (existing) {
    if (existing.completed) return existing
    await logActivity(userId, 'MISSION_START', { missionId })
    return existing
  }

  const [progress] = await drizzleDb
    .insert(missionProgress)
    .values({
      id: crypto.randomUUID(),
      missionId,
      studentId: userId,
      progress: 0,
      completed: false,
    })
    .returning()

  if (!progress) throw new Error('Failed to create mission progress')
  await logActivity(userId, 'MISSION_START', { missionId })
  return progress
}

export async function completeMission(
  userId: string,
  missionId: string,
  score: number,
  _confidenceDelta: number = 0
) {
  const [missionRow] = await drizzleDb.select().from(mission).where(eq(mission.id, missionId)).limit(1)
  if (!missionRow) throw new Error('Mission not found')

  let xpEarned = missionRow.xpReward
  if (score >= 90) xpEarned += XP_REWARDS.PERFECT_QUIZ

  const [existing] = await drizzleDb
    .select()
    .from(missionProgress)
    .where(and(eq(missionProgress.missionId, missionId), eq(missionProgress.studentId, userId)))
    .limit(1)

  if (!existing || !existing.completed) {
    xpEarned += XP_REWARDS.FIRST_MISSION
  }

  const progressValue = Math.round(score)
  const completedAt = new Date()

  if (existing) {
    const [updated] = await drizzleDb
      .update(missionProgress)
      .set({ progress: progressValue, completed: true, completedAt })
      .where(eq(missionProgress.id, existing.id))
      .returning()
    if (!updated) throw new Error('Failed to update mission progress')

    await awardXp(userId, xpEarned, 'mission_complete', { missionId, score })
    await logActivity(userId, 'MISSION_COMPLETE', { missionId, score, xpEarned })
    return { progress: updated, xpEarned }
  }

  const [created] = await drizzleDb
    .insert(missionProgress)
    .values({
      id: crypto.randomUUID(),
      missionId,
      studentId: userId,
      progress: progressValue,
      completed: true,
      completedAt,
    })
    .returning()

  if (!created) throw new Error('Failed to create mission progress')
  await awardXp(userId, xpEarned, 'mission_complete', { missionId, score })
  await logActivity(userId, 'MISSION_COMPLETE', { missionId, score, xpEarned })
  return { progress: created, xpEarned }
}

export async function getMissionSummary(userId: string) {
  const [totalResult] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(mission)
    .where(eq(mission.isActive, true))
  const totalMissions = totalResult?.count ?? 0

  const [completedResult] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(missionProgress)
    .where(and(eq(missionProgress.studentId, userId), eq(missionProgress.completed, true)))
  const completed = completedResult?.count ?? 0

  const [inProgressResult] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(missionProgress)
    .where(and(eq(missionProgress.studentId, userId), eq(missionProgress.completed, false)))
  const inProgress = inProgressResult?.count ?? 0

  const notStarted = Math.max(0, totalMissions - completed - inProgress)

  const progressRecords = await drizzleDb
    .select()
    .from(missionProgress)
    .where(eq(missionProgress.studentId, userId))
  const totalXpEarned = progressRecords.length * 50

  return {
    total: totalMissions,
    completed,
    inProgress,
    notStarted,
    totalXpEarned,
    completionRate: totalMissions > 0 ? Math.round((completed / totalMissions) * 100) : 0,
  }
}

export async function getRecommendedMission(userId: string) {
  const [inProgress] = await drizzleDb
    .select({
      mId: mission.id,
      mTitle: mission.title,
      mDescription: mission.description,
      mType: mission.type,
      mXpReward: mission.xpReward,
      mRequirement: mission.requirement,
      mIsActive: mission.isActive,
    })
    .from(missionProgress)
    .innerJoin(mission, eq(mission.id, missionProgress.missionId))
    .where(and(eq(missionProgress.studentId, userId), eq(missionProgress.completed, false)))
    .limit(1)

  if (inProgress) {
    return {
      id: inProgress.mId,
      title: inProgress.mTitle,
      description: inProgress.mDescription,
      type: inProgress.mType,
      xpReward: inProgress.mXpReward,
      requirement: inProgress.mRequirement,
      isActive: inProgress.mIsActive,
    }
  }

  const completedRows = await drizzleDb
    .select({ missionId: missionProgress.missionId })
    .from(missionProgress)
    .where(and(eq(missionProgress.studentId, userId), eq(missionProgress.completed, true)))
  const completedMissionIds = completedRows.map((r) => r.missionId)

  if (completedMissionIds.length > 0) {
    const [next] = await drizzleDb
      .select()
      .from(mission)
      .where(and(eq(mission.isActive, true), notInArray(mission.id, completedMissionIds)))
      .limit(1)
    return next ?? null
  }

  const [next] = await drizzleDb
    .select()
    .from(mission)
    .where(eq(mission.isActive, true))
    .limit(1)
  return next ?? null
}
