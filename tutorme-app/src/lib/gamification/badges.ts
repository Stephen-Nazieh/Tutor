/**
 * Badge System (Drizzle ORM)
 *
 * Defines all badges, their requirements, and handles badge awarding
 */

import crypto from 'crypto'
import { eq, and, desc, asc } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { badge, userBadge } from '@/lib/db/schema'
import { awardXp } from './service'
import { logActivity } from './activity-log'

export interface BadgeDefinition {
  key: string
  name: string
  description: string
  icon: string
  color: string
  category: 'general' | 'streak' | 'quiz' | 'social' | 'mastery'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpBonus: number
  requirement: {
    type: string
    count?: number
    score?: number
    days?: number
    level?: number
  }
  isSecret?: boolean
  order: number
}

// Badge definitions - all available badges in the system
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { key: 'first_steps', name: 'First Steps', description: 'Complete your first lesson', icon: 'footprints', color: '#22c55e', category: 'general', rarity: 'common', xpBonus: 50, requirement: { type: 'complete_lessons', count: 1 }, order: 1 },
  { key: 'quick_learner', name: 'Quick Learner', description: 'Complete 10 lessons', icon: 'zap', color: '#3b82f6', category: 'general', rarity: 'common', xpBonus: 100, requirement: { type: 'complete_lessons', count: 10 }, order: 2 },
  { key: 'knowledge_seeker', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: 'book-open', color: '#8b5cf6', category: 'general', rarity: 'rare', xpBonus: 250, requirement: { type: 'complete_lessons', count: 50 }, order: 3 },
  { key: 'master_scholar', name: 'Master Scholar', description: 'Complete 100 lessons', icon: 'graduation-cap', color: '#f59e0b', category: 'general', rarity: 'epic', xpBonus: 500, requirement: { type: 'complete_lessons', count: 100 }, order: 4 },
  { key: 'streak_3', name: 'On Fire', description: 'Maintain a 3-day learning streak', icon: 'flame', color: '#f97316', category: 'streak', rarity: 'common', xpBonus: 100, requirement: { type: 'streak_days', days: 3 }, order: 10 },
  { key: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day learning streak', icon: 'flame', color: '#ef4444', category: 'streak', rarity: 'rare', xpBonus: 250, requirement: { type: 'streak_days', days: 7 }, order: 11 },
  { key: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day learning streak', icon: 'crown', color: '#eab308', category: 'streak', rarity: 'epic', xpBonus: 1000, requirement: { type: 'streak_days', days: 30 }, order: 12 },
  { key: 'streak_100', name: 'Centurion', description: 'Maintain a 100-day learning streak', icon: 'medal', color: '#6366f1', category: 'streak', rarity: 'legendary', xpBonus: 5000, requirement: { type: 'streak_days', days: 100 }, order: 13 },
  { key: 'first_quiz', name: 'Quiz Taker', description: 'Complete your first quiz', icon: 'help-circle', color: '#10b981', category: 'quiz', rarity: 'common', xpBonus: 50, requirement: { type: 'complete_quizzes', count: 1 }, order: 20 },
  { key: 'quiz_pro', name: 'Quiz Pro', description: 'Complete 20 quizzes', icon: 'check-circle', color: '#3b82f6', category: 'quiz', rarity: 'common', xpBonus: 150, requirement: { type: 'complete_quizzes', count: 20 }, order: 21 },
  { key: 'perfect_score', name: 'Perfect Score', description: 'Score 100% on a quiz', icon: 'star', color: '#f59e0b', category: 'quiz', rarity: 'rare', xpBonus: 200, requirement: { type: 'perfect_quiz', count: 1 }, order: 22 },
  { key: 'quiz_master', name: 'Quiz Master', description: 'Complete 50 quizzes with 80%+ average', icon: 'trophy', color: '#8b5cf6', category: 'quiz', rarity: 'epic', xpBonus: 500, requirement: { type: 'complete_quizzes_expert', count: 50, score: 80 }, order: 23 },
  { key: 'social_butterfly', name: 'Social Butterfly', description: 'Join 5 live sessions', icon: 'users', color: '#ec4899', category: 'social', rarity: 'common', xpBonus: 100, requirement: { type: 'join_sessions', count: 5 }, order: 30 },
  { key: 'active_participant', name: 'Active Participant', description: 'Send 50 messages in live sessions', icon: 'message-circle', color: '#06b6d4', category: 'social', rarity: 'rare', xpBonus: 200, requirement: { type: 'send_messages', count: 50 }, order: 31 },
  { key: 'study_group_hero', name: 'Study Group Hero', description: 'Join or create 3 study groups', icon: 'users-round', color: '#84cc16', category: 'social', rarity: 'rare', xpBonus: 300, requirement: { type: 'join_groups', count: 3 }, order: 32 },
  { key: 'level_5', name: 'Rising Star', description: 'Reach level 5', icon: 'rocket', color: '#f97316', category: 'mastery', rarity: 'common', xpBonus: 200, requirement: { type: 'reach_level', level: 5 }, order: 40 },
  { key: 'level_10', name: 'Expert Learner', description: 'Reach level 10', icon: 'award', color: '#3b82f6', category: 'mastery', rarity: 'rare', xpBonus: 500, requirement: { type: 'reach_level', level: 10 }, order: 41 },
  { key: 'level_20', name: 'Grandmaster', description: 'Reach level 20', icon: 'crown', color: '#eab308', category: 'mastery', rarity: 'epic', xpBonus: 2000, requirement: { type: 'reach_level', level: 20 }, order: 42 },
  { key: 'xp_10000', name: 'XP Hunter', description: 'Earn 10,000 total XP', icon: 'target', color: '#8b5cf6', category: 'mastery', rarity: 'rare', xpBonus: 500, requirement: { type: 'earn_xp', count: 10000 }, order: 43 },
  { key: 'night_owl', name: 'Night Owl', description: 'Complete a lesson between midnight and 5 AM', icon: 'moon', color: '#6366f1', category: 'general', rarity: 'rare', xpBonus: 150, requirement: { type: 'night_study' }, isSecret: true, order: 50 },
  { key: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 7 AM', icon: 'sunrise', color: '#f59e0b', category: 'general', rarity: 'rare', xpBonus: 150, requirement: { type: 'morning_study' }, isSecret: true, order: 51 },
]

export async function initializeBadges() {
  for (const b of BADGE_DEFINITIONS) {
    const [existing] = await drizzleDb.select().from(badge).where(eq(badge.key, b.key)).limit(1)
    if (existing) {
      await drizzleDb
        .update(badge)
        .set({
          name: b.name,
          description: b.description,
          icon: b.icon,
          color: b.color,
          category: b.category,
          rarity: b.rarity,
          xpBonus: b.xpBonus,
          requirement: b.requirement as unknown as typeof badge.$inferInsert.requirement,
          isSecret: b.isSecret ?? false,
          order: b.order,
        })
        .where(eq(badge.id, existing.id))
    } else {
      await drizzleDb.insert(badge).values({
        id: crypto.randomUUID(),
        key: b.key,
        name: b.name,
        description: b.description,
        icon: b.icon,
        color: b.color,
        category: b.category,
        rarity: b.rarity,
        xpBonus: b.xpBonus,
        requirement: b.requirement as unknown as typeof badge.$inferInsert.requirement,
        isSecret: b.isSecret ?? false,
        order: b.order,
      })
    }
  }
  console.log(`[Badges] Initialized ${BADGE_DEFINITIONS.length} badges`)
}

export async function awardBadge(userId: string, badgeKey: string) {
  const [badgeRow] = await drizzleDb.select().from(badge).where(eq(badge.key, badgeKey)).limit(1)
  if (!badgeRow) throw new Error(`Badge not found: ${badgeKey}`)

  const [existing] = await drizzleDb
    .select()
    .from(userBadge)
    .where(and(eq(userBadge.userId, userId), eq(userBadge.badgeId, badgeRow.id)))
    .limit(1)
  if (existing) return { awarded: false, alreadyHad: true }

  await drizzleDb.insert(userBadge).values({
    id: crypto.randomUUID(),
    userId,
    badgeId: badgeRow.id,
    progress: 0,
  })

  if (badgeRow.xpBonus > 0) {
    await awardXp(userId, badgeRow.xpBonus, 'badge_earned', { badgeKey })
  }
  await logActivity(userId, 'BADGE_EARNED', {
    badgeKey,
    badgeName: badgeRow.name,
    rarity: badgeRow.rarity,
    xpBonus: badgeRow.xpBonus,
  })

  return {
    awarded: true,
    badge: badgeRow,
    xpBonus: badgeRow.xpBonus,
  }
}

export async function getUserBadges(userId: string) {
  const rows = await drizzleDb
    .select({
      id: badge.id,
      key: badge.key,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      color: badge.color,
      category: badge.category,
      rarity: badge.rarity,
      xpBonus: badge.xpBonus,
      requirement: badge.requirement,
      isSecret: badge.isSecret,
      order: badge.order,
      earnedAt: userBadge.earnedAt,
    })
    .from(userBadge)
    .innerJoin(badge, eq(badge.id, userBadge.badgeId))
    .where(eq(userBadge.userId, userId))
    .orderBy(desc(userBadge.earnedAt))

  return rows.map((r) => ({ ...r, earnedAt: r.earnedAt }))
}

export async function getAllBadgesWithProgress(userId: string) {
  const [allBadges, userBadgesRows] = await Promise.all([
    drizzleDb.select().from(badge).orderBy(asc(badge.order)),
    drizzleDb.select({ badgeId: userBadge.badgeId, earnedAt: userBadge.earnedAt, progress: userBadge.progress }).from(userBadge).where(eq(userBadge.userId, userId)),
  ])

  const earnedBadgeIds = new Set(userBadgesRows.map((ub) => ub.badgeId))
  const userBadgeMap = new Map(userBadgesRows.map((ub) => [ub.badgeId, ub]))

  return allBadges.map((b) => ({
    ...b,
    earned: earnedBadgeIds.has(b.id),
    earnedAt: userBadgeMap.get(b.id)?.earnedAt ?? null,
    progress: userBadgeMap.get(b.id)?.progress ?? 0,
  }))
}

export async function checkAndAwardBadges(
  userId: string,
  stats: {
    lessonsCompleted?: number
    quizzesCompleted?: number
    streakDays?: number
    currentLevel?: number
    totalXp?: number
    sessionsJoined?: number
    messagesSent?: number
    perfectQuizzes?: number
    quizAverage?: number
  }
) {
  const badgesToCheck: string[] = []
  if (stats.lessonsCompleted !== undefined) {
    if (stats.lessonsCompleted >= 1) badgesToCheck.push('first_steps')
    if (stats.lessonsCompleted >= 10) badgesToCheck.push('quick_learner')
    if (stats.lessonsCompleted >= 50) badgesToCheck.push('knowledge_seeker')
    if (stats.lessonsCompleted >= 100) badgesToCheck.push('master_scholar')
  }
  if (stats.streakDays !== undefined) {
    if (stats.streakDays >= 3) badgesToCheck.push('streak_3')
    if (stats.streakDays >= 7) badgesToCheck.push('streak_7')
    if (stats.streakDays >= 30) badgesToCheck.push('streak_30')
    if (stats.streakDays >= 100) badgesToCheck.push('streak_100')
  }
  if (stats.quizzesCompleted !== undefined) {
    if (stats.quizzesCompleted >= 1) badgesToCheck.push('first_quiz')
    if (stats.quizzesCompleted >= 20) badgesToCheck.push('quiz_pro')
  }
  if (stats.perfectQuizzes && stats.perfectQuizzes >= 1) badgesToCheck.push('perfect_score')
  if (stats.quizzesCompleted && stats.quizAverage && stats.quizzesCompleted >= 50 && stats.quizAverage >= 80) badgesToCheck.push('quiz_master')
  if (stats.sessionsJoined !== undefined && stats.sessionsJoined >= 5) badgesToCheck.push('social_butterfly')
  if (stats.messagesSent !== undefined && stats.messagesSent >= 50) badgesToCheck.push('active_participant')
  if (stats.currentLevel !== undefined) {
    if (stats.currentLevel >= 5) badgesToCheck.push('level_5')
    if (stats.currentLevel >= 10) badgesToCheck.push('level_10')
    if (stats.currentLevel >= 20) badgesToCheck.push('level_20')
  }
  if (stats.totalXp !== undefined && stats.totalXp >= 10000) badgesToCheck.push('xp_10000')

  const awarded: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> = []
  for (const badgeKey of badgesToCheck) {
    const result = await awardBadge(userId, badgeKey)
    if (result.awarded && result.badge) {
      awarded.push({ badgeKey, badgeName: result.badge.name, xpBonus: result.xpBonus })
    }
  }
  return awarded
}

export async function getBadgeStats(userId: string) {
  const [earnedRows, allBadges] = await Promise.all([
    drizzleDb
      .select({ badgeId: userBadge.badgeId, bRarity: badge.rarity, bCategory: badge.category, bXpBonus: badge.xpBonus })
      .from(userBadge)
      .innerJoin(badge, eq(badge.id, userBadge.badgeId))
      .where(eq(userBadge.userId, userId)),
    drizzleDb.select().from(badge),
  ])

  const byRarity = {
    common: earnedRows.filter((r) => r.bRarity === 'common').length,
    rare: earnedRows.filter((r) => r.bRarity === 'rare').length,
    epic: earnedRows.filter((r) => r.bRarity === 'epic').length,
    legendary: earnedRows.filter((r) => r.bRarity === 'legendary').length,
  }
  const byCategory = {
    general: earnedRows.filter((r) => r.bCategory === 'general').length,
    streak: earnedRows.filter((r) => r.bCategory === 'streak').length,
    quiz: earnedRows.filter((r) => r.bCategory === 'quiz').length,
    social: earnedRows.filter((r) => r.bCategory === 'social').length,
    mastery: earnedRows.filter((r) => r.bCategory === 'mastery').length,
  }

  return {
    totalEarned: earnedRows.length,
    totalAvailable: allBadges.length,
    completionPercentage: allBadges.length ? Math.round((earnedRows.length / allBadges.length) * 100) : 0,
    byRarity,
    byCategory,
    totalXpFromBadges: earnedRows.reduce((sum, r) => sum + r.bXpBonus, 0),
  }
}
