/**
 * Gamification Triggers
 * 
 * Automatically triggers gamification events based on user actions
 * This should be called from various parts of the application
 */

import { db } from '@/lib/db'
import { awardXp, XP_REWARDS, getOrCreateGamification, checkDailyLogin } from './service'
import { checkAndAwardBadges, awardBadge } from './badges'
import { updateLeaderboardEntry } from './leaderboard'

/**
 * Triggered when a user completes a lesson
 */
export async function onLessonComplete(userId: string, lessonId: string) {
  const results: any = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  
  // Award XP
  const xpResult = await awardXp(userId, XP_REWARDS.COMPLETE_LESSON, 'lesson_complete', { lessonId })
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level
  
  // Update leaderboard
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  
  // Check for badges
  const gamification = await getOrCreateGamification(userId)
  const completedLessons = await db.taskSubmission.count({
    where: { studentId: userId },
  })
  
  const badgeResults = await checkAndAwardBadges(userId, {
    lessonsCompleted: completedLessons,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  
  results.badgesEarned = badgeResults
  
  return results
}

/**
 * Triggered when a user completes a quiz
 */
export async function onQuizComplete(
  userId: string, 
  quizId: string, 
  score: number,
  isPerfect: boolean
) {
  const results: any = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  
  // Award XP based on score
  const xpAmount = isPerfect ? XP_REWARDS.PERFECT_QUIZ : Math.round(XP_REWARDS.PERFECT_QUIZ * (score / 100))
  const xpResult = await awardXp(userId, xpAmount, 'quiz_complete', { quizId, score, isPerfect })
  
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level
  
  // Update leaderboard
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  
  // Check for badges
  const gamification = await getOrCreateGamification(userId)
  
  // Get quiz stats
  const quizAttempts = await db.quizAttempt.count({ where: { studentId: userId } })
  const perfectQuizzes = await db.quizAttempt.count({
    where: { studentId: userId, score: 100 },
  })
  const avgScore = await db.quizAttempt.aggregate({
    where: { studentId: userId },
    _avg: { score: true },
  })
  
  const badgeResults = await checkAndAwardBadges(userId, {
    quizzesCompleted: quizAttempts,
    perfectQuizzes,
    quizAverage: avgScore._avg.score || 0,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  
  results.badgesEarned = badgeResults
  
  // Award perfect score badge immediately if applicable
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

/**
 * Triggered when a user logs in (handles streaks)
 */
export async function onUserLogin(userId: string) {
  const results: any = {
    xpEarned: 0,
    badgesEarned: [],
    streakBonus: 0,
    leveledUp: false,
    firstLoginToday: false,
  }
  
  // Check daily login
  const loginResult = await checkDailyLogin(userId)
  
  results.firstLoginToday = loginResult.firstLoginToday
  results.xpEarned = loginResult.xpEarned || 0
  results.streakBonus = loginResult.streakBonus || 0
  results.streakDays = loginResult.streakDays
  results.leveledUp = loginResult.leveledUp
  
  if (loginResult.firstLoginToday) {
    // Update leaderboard
    await updateLeaderboardEntry(userId, 'global', loginResult.xpEarned || 0)
    await updateLeaderboardEntry(userId, 'weekly', loginResult.xpEarned || 0)
    await updateLeaderboardEntry(userId, 'monthly', loginResult.xpEarned || 0)
    
    // Check for streak badges
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

/**
 * Triggered when a user joins a live session
 */
export async function onSessionJoin(userId: string, sessionId: string) {
  const results: any = {
    badgesEarned: [],
  }
  
  // Check for social badges
  const gamification = await getOrCreateGamification(userId)
  const sessionsJoined = await db.sessionParticipant.count({
    where: { studentId: userId },
  })
  
  const badgeResults = await checkAndAwardBadges(userId, {
    sessionsJoined,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  
  results.badgesEarned = badgeResults
  
  return results
}

/**
 * Triggered when a user sends a message in a live session
 */
export async function onMessageSend(userId: string, sessionId: string) {
  const results: any = {
    badgesEarned: [],
  }
  
  // Check for social badges
  const gamification = await getOrCreateGamification(userId)
  const messagesSent = await db.message.count({
    where: { userId },
  })
  
  const badgeResults = await checkAndAwardBadges(userId, {
    messagesSent,
    streakDays: gamification.streakDays,
    currentLevel: gamification.level,
    totalXp: gamification.xp,
  })
  
  results.badgesEarned = badgeResults
  
  return results
}

/**
 * Triggered when a user levels up
 */
export async function onLevelUp(userId: string, newLevel: number) {
  const results: any = {
    badgesEarned: [],
  }
  
  // Check for level-based badges
  const gamification = await getOrCreateGamification(userId)
  const badgeResults = await checkAndAwardBadges(userId, {
    currentLevel: newLevel,
    streakDays: gamification.streakDays,
    totalXp: gamification.xp,
  })
  
  results.badgesEarned = badgeResults
  
  return results
}

/**
 * Triggered when a user completes a mission
 */
export async function onMissionComplete(userId: string, missionId: string, xpReward: number) {
  const results: any = {
    xpEarned: xpReward,
    badgesEarned: [],
    leveledUp: false,
  }
  
  // Award XP
  const xpResult = await awardXp(userId, xpReward, 'mission_complete', { missionId })
  results.leveledUp = xpResult.leveledUp
  results.newLevel = xpResult.level
  
  // Update leaderboard
  await updateLeaderboardEntry(userId, 'global', xpReward)
  await updateLeaderboardEntry(userId, 'weekly', xpReward)
  await updateLeaderboardEntry(userId, 'monthly', xpReward)
  
  return results
}

/**
 * Triggered when a user completes a speaking practice session
 */
export async function onSpeakingPractice(userId: string, duration: number, score?: number) {
  const results: any = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  
  // Award XP based on duration (1 XP per minute, minimum 10)
  const xpAmount = Math.max(10, Math.round(duration / 60))
  const xpResult = await awardXp(userId, xpAmount, 'speaking_practice', { duration, score })
  
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  
  // Update leaderboard
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  
  return results
}

/**
 * Triggered when a user has an AI conversation
 */
export async function onAIConversation(userId: string, messageCount: number) {
  const results: any = {
    xpEarned: 0,
    badgesEarned: [],
    leveledUp: false,
  }
  
  // Award XP for AI conversation
  const xpResult = await awardXp(userId, XP_REWARDS.AI_CONVERSATION, 'ai_conversation', { messageCount })
  
  results.xpEarned = xpResult.xpEarned
  results.leveledUp = xpResult.leveledUp
  
  // Update leaderboard
  await updateLeaderboardEntry(userId, 'global', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'weekly', xpResult.xpEarned)
  await updateLeaderboardEntry(userId, 'monthly', xpResult.xpEarned)
  
  return results
}

/**
 * Check for time-based badges (night owl, early bird)
 */
export async function checkTimeBasedBadges(userId: string) {
  const hour = new Date().getHours()
  const results: any = {
    badgesEarned: [],
  }
  
  // Night Owl: midnight to 5 AM
  if (hour >= 0 && hour < 5) {
    const badge = await awardBadge(userId, 'night_owl')
    if (badge.awarded && badge.badge) {
      results.badgesEarned.push({
        badgeKey: 'night_owl',
        badgeName: badge.badge.name,
        xpBonus: badge.xpBonus,
      })
    }
  }
  
  // Early Bird: before 7 AM
  if (hour >= 5 && hour < 7) {
    const badge = await awardBadge(userId, 'early_bird')
    if (badge.awarded && badge.badge) {
      results.badgesEarned.push({
        badgeKey: 'early_bird',
        badgeName: badge.badge.name,
        xpBonus: badge.xpBonus,
      })
    }
  }
  
  return results
}
