/**
 * Gamification Triggers (Drizzle ORM)
 *
 * Automatically triggers gamification events based on user actions.
 */

import { eq, and, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { taskSubmission, quizAttempt, sessionParticipant, message } from '@/lib/db/schema'
import { awardXp, XP_REWARDS, getOrCreateGamification, checkDailyLogin } from './service'
import { checkAndAwardBadges, awardBadge } from './badges'
import { updateLeaderboardEntry } from './leaderboard'

async function countTaskSubmissions(studentId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(taskSubmission)
    .where(eq(taskSubmission.studentId, studentId))
  return r?.count ?? 0
}

async function countQuizAttempts(studentId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(quizAttempt)
    .where(eq(quizAttempt.studentId, studentId))
  return r?.count ?? 0
}

async function countPerfectQuizzes(studentId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(quizAttempt)
    .where(and(eq(quizAttempt.studentId, studentId), eq(quizAttempt.score, 100)))
  return r?.count ?? 0
}

async function avgQuizScore(studentId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ avg: sql<number>`coalesce(avg(${quizAttempt.score})::double precision, 0)` })
    .from(quizAttempt)
    .where(eq(quizAttempt.studentId, studentId))
  return Number(r?.avg ?? 0)
}

async function countSessionParticipants(studentId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(sessionParticipant)
    .where(eq(sessionParticipant.studentId, studentId))
  return r?.count ?? 0
}

async function countMessages(userId: string): Promise<number> {
  const [r] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(message)
    .where(eq(message.userId, userId))
  return r?.count ?? 0
}

export async function onLessonComplete(userId: string, lessonId: string) {
  const results: { xpEarned: number; badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }>; leveledUp: boolean; newLevel?: number } = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }

  const xpResult = await awardXp(userId, XP_REWARDS.COMPLETE_LESSON, 'lesson_complete', { lessonId })
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level

  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)

  const gamification = await getOrCreateGamification(userId)
  const completedLessons = await countTaskSubmissions(userId)
  const badgeResults = await checkAndAwardBadges(userId, {
    lessonsCompleted: completedLessons,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  results.badgesEarned = badgeResults

  return results
}

export async function onQuizComplete(userId: string, quizId: string, score: number, isPerfect: boolean) {
  const results: { xpEarned: number; badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }>; leveledUp: boolean; newLevel?: number } = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }

  const xpAmount = isPerfect ? XP_REWARDS.PERFECT_QUIZ : Math.round(XP_REWARDS.PERFECT_QUIZ * (score / 100))
  const xpResult = await awardXp(userId, xpAmount, 'quiz_complete', { quizId, score, isPerfect })
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level

  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)

  const gamification = await getOrCreateGamification(userId)
  const quizAttempts = await countQuizAttempts(userId)
  const perfectQuizzes = await countPerfectQuizzes(userId)
  const avgScore = await avgQuizScore(userId)

  const badgeResults = await checkAndAwardBadges(userId, {
    quizzesCompleted: quizAttempts,
    perfectQuizzes,
    quizAverage: avgScore,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  results.badgesEarned = badgeResults

  if (isPerfect) {
    const perfectBadge = await awardBadge(userId, 'perfect_score')
    if (perfectBadge.awarded && perfectBadge.badge) {
      results.badgesEarned.push({
        badgeKey: 'perfect_score',
        badgeName: perfectBadge.badge.name,
        xpBonus: perfectBadge.xpBonus,
      })
    }
  }

  return results
}

export async function onUserLogin(userId: string) {
  const results: {
    xpEarned: number
    badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }>
    streakBonus: number
    leveledUp: boolean
    firstLoginToday: boolean
    streakDays?: number
  } = {
    xpEarned: 0,
    badgesEarned: [],
    streakBonus: 0,
    leveledUp: false,
    firstLoginToday: false,
  }

  const loginResult = await checkDailyLogin(userId)
  results.firstLoginToday = loginResult.firstLoginToday
  results.xpEarned = loginResult.xpEarned ?? 0
  results.streakBonus = loginResult.streakBonus ?? 0
  results.streakDays = loginResult.streakDays
  results.leveledUp = loginResult.leveledUp ?? false

  if (loginResult.firstLoginToday) {
    await updateLeaderboardEntry(userId, 'global', loginResult.xpEarned ?? 0)
    await updateLeaderboardEntry(userId, 'weekly', loginResult.xpEarned ?? 0)
    await updateLeaderboardEntry(userId, 'monthly', loginResult.xpEarned ?? 0)
    const gamification = await getOrCreateGamification(userId)
    const badgeResults = await checkAndAwardBadges(userId, {
      streakDays: gamification.streakDays,
      currentLevel: gamification.level,
      totalXp: gamification.xp,
    })
    results.badgesEarned = badgeResults
  }

  return results
}

export async function onSessionJoin(userId: string, _sessionId: string) {
  const results: { badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> } = { badgesEarned: [] }
  const gamification = await getOrCreateGamification(userId)
  const sessionsJoined = await countSessionParticipants(userId)
  const badgeResults = await checkAndAwardBadges(userId, {
    sessionsJoined,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  results.badgesEarned = badgeResults
  return results
}

export async function onMessageSend(userId: string, _sessionId: string) {
  const results: { badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> } = { badgesEarned: [] }
  const gamification = await getOrCreateGamification(userId)
  const messagesSent = await countMessages(userId)
  const badgeResults = await checkAndAwardBadges(userId, {
    messagesSent,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  results.badgesEarned = badgeResults
  return results
}

export async function onLevelUp(userId: string, newLevel: number) {
  const results: { badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> } = { badgesEarned: [] }
  const gamification = await getOrCreateGamification(userId)
  const badgeResults = await checkAndAwardBadges(userId, {
    currentLevel: newLevel,
    streakDays: gamification.streakDays,
    totalXp: gamification.xp,
  })
  results.badgesEarned = badgeResults
  return results
}

export async function onMissionComplete(userId: string, missionId: string, xpReward: number) {
  const results: { xpEarned: number; badgesEarned: unknown[]; leveledUp: boolean; newLevel?: number } = {
    xpEarned: xpReward,
    badgesEarned: [],
    leveledUp: false,
  }
  const xpResult = await awardXp(userId, xpReward, 'mission_complete', { missionId })
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level
  await updateLeaderboardEntry(userId, 'global', xpReward)
  await updateLeaderboardEntry(userId, 'weekly', xpReward)
  await updateLeaderboardEntry(userId, 'monthly', xpReward)
  return results
}

export async function onSpeakingPractice(userId: string, duration: number, score?: number) {
  const results: { xpEarned: number; badgesEarned: unknown[]; leveledUp: boolean } = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  const xpAmount = Math.max(10, Math.round(duration / 60))
  const xpResult = await awardXp(userId, xpAmount, 'speaking_practice', { duration, score })
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  return results
}

export async function onAIConversation(userId: string, messageCount: number) {
  const results: { xpEarned: number; badgesEarned: unknown[]; leveledUp: boolean } = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  const xpResult = await awardXp(userId, XP_REWARDS.AI_CONVERSATION, 'ai_conversation', { messageCount })
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  return results
}

export async function checkTimeBasedBadges(userId: string) {
  const hour = new Date().getHours()
  const results: { badgesEarned: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> } = { badgesEarned: [] }
  if (hour >= 0 && hour < 5) {
    const badge = await awardBadge(userId, 'night_owl')
    if (badge.awarded && badge.badge) {
      results.badgesEarned.push({ badgeKey: 'night_owl', badgeName: badge.badge.name, xpBonus: badge.xpBonus })
    }
  }
  if (hour >= 5 && hour < 7) {
    const badge = await awardBadge(userId, 'early_bird')
    if (badge.awarded && badge.badge) {
      results.badgesEarned.push({ badgeKey: 'early_bird', badgeName: badge.badge.name, xpBonus: badge.xpBonus })
    }
  }
  return results
}
