/**
 * Badge System
 * 
 * Defines all badges, their requirements, and handles badge awarding
 */

import { db } from '@/lib/db'
import { awardXp, XP_REWARDS } from './service'
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
  // === GENERAL BADGES ===
  {
    key: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'footprints',
    color: '#22c55e',
    category: 'general',
    rarity: 'common',
    xpBonus: 50,
    requirement: { type: 'complete_lessons', count: 1 },
    order: 1,
  },
  {
    key: 'quick_learner',
    name: 'Quick Learner',
    description: 'Complete 10 lessons',
    icon: 'zap',
    color: '#3b82f6',
    category: 'general',
    rarity: 'common',
    xpBonus: 100,
    requirement: { type: 'complete_lessons', count: 10 },
    order: 2,
  },
  {
    key: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 50 lessons',
    icon: 'book-open',
    color: '#8b5cf6',
    category: 'general',
    rarity: 'rare',
    xpBonus: 250,
    requirement: { type: 'complete_lessons', count: 50 },
    order: 3,
  },
  {
    key: 'master_scholar',
    name: 'Master Scholar',
    description: 'Complete 100 lessons',
    icon: 'graduation-cap',
    color: '#f59e0b',
    category: 'general',
    rarity: 'epic',
    xpBonus: 500,
    requirement: { type: 'complete_lessons', count: 100 },
    order: 4,
  },
  
  // === STREAK BADGES ===
  {
    key: 'streak_3',
    name: 'On Fire',
    description: 'Maintain a 3-day learning streak',
    icon: 'flame',
    color: '#f97316',
    category: 'streak',
    rarity: 'common',
    xpBonus: 100,
    requirement: { type: 'streak_days', days: 3 },
    order: 10,
  },
  {
    key: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    color: '#ef4444',
    category: 'streak',
    rarity: 'rare',
    xpBonus: 250,
    requirement: { type: 'streak_days', days: 7 },
    order: 11,
  },
  {
    key: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: 'crown',
    color: '#eab308',
    category: 'streak',
    rarity: 'epic',
    xpBonus: 1000,
    requirement: { type: 'streak_days', days: 30 },
    order: 12,
  },
  {
    key: 'streak_100',
    name: 'Centurion',
    description: 'Maintain a 100-day learning streak',
    icon: 'medal',
    color: '#6366f1',
    category: 'streak',
    rarity: 'legendary',
    xpBonus: 5000,
    requirement: { type: 'streak_days', days: 100 },
    order: 13,
  },
  
  // === QUIZ BADGES ===
  {
    key: 'first_quiz',
    name: 'Quiz Taker',
    description: 'Complete your first quiz',
    icon: 'help-circle',
    color: '#10b981',
    category: 'quiz',
    rarity: 'common',
    xpBonus: 50,
    requirement: { type: 'complete_quizzes', count: 1 },
    order: 20,
  },
  {
    key: 'quiz_pro',
    name: 'Quiz Pro',
    description: 'Complete 20 quizzes',
    icon: 'check-circle',
    color: '#3b82f6',
    category: 'quiz',
    rarity: 'common',
    xpBonus: 150,
    requirement: { type: 'complete_quizzes', count: 20 },
    order: 21,
  },
  {
    key: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: 'star',
    color: '#f59e0b',
    category: 'quiz',
    rarity: 'rare',
    xpBonus: 200,
    requirement: { type: 'perfect_quiz', count: 1 },
    order: 22,
  },
  {
    key: 'quiz_master',
    name: 'Quiz Master',
    description: 'Complete 50 quizzes with 80%+ average',
    icon: 'trophy',
    color: '#8b5cf6',
    category: 'quiz',
    rarity: 'epic',
    xpBonus: 500,
    requirement: { type: 'complete_quizzes_expert', count: 50, score: 80 },
    order: 23,
  },
  
  // === SOCIAL BADGES ===
  {
    key: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Join 5 live sessions',
    icon: 'users',
    color: '#ec4899',
    category: 'social',
    rarity: 'common',
    xpBonus: 100,
    requirement: { type: 'join_sessions', count: 5 },
    order: 30,
  },
  {
    key: 'active_participant',
    name: 'Active Participant',
    description: 'Send 50 messages in live sessions',
    icon: 'message-circle',
    color: '#06b6d4',
    category: 'social',
    rarity: 'rare',
    xpBonus: 200,
    requirement: { type: 'send_messages', count: 50 },
    order: 31,
  },
  {
    key: 'study_group_hero',
    name: 'Study Group Hero',
    description: 'Join or create 3 study groups',
    icon: 'users-round',
    color: '#84cc16',
    category: 'social',
    rarity: 'rare',
    xpBonus: 300,
    requirement: { type: 'join_groups', count: 3 },
    order: 32,
  },
  
  // === MASTERY BADGES ===
  {
    key: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: 'rocket',
    color: '#f97316',
    category: 'mastery',
    rarity: 'common',
    xpBonus: 200,
    requirement: { type: 'reach_level', level: 5 },
    order: 40,
  },
  {
    key: 'level_10',
    name: 'Expert Learner',
    description: 'Reach level 10',
    icon: 'award',
    color: '#3b82f6',
    category: 'mastery',
    rarity: 'rare',
    xpBonus: 500,
    requirement: { type: 'reach_level', level: 10 },
    order: 41,
  },
  {
    key: 'level_20',
    name: 'Grandmaster',
    description: 'Reach level 20',
    icon: 'crown',
    color: '#eab308',
    category: 'mastery',
    rarity: 'epic',
    xpBonus: 2000,
    requirement: { type: 'reach_level', level: 20 },
    order: 42,
  },
  {
    key: 'xp_10000',
    name: 'XP Hunter',
    description: 'Earn 10,000 total XP',
    icon: 'target',
    color: '#8b5cf6',
    category: 'mastery',
    rarity: 'rare',
    xpBonus: 500,
    requirement: { type: 'earn_xp', count: 10000 },
    order: 43,
  },
  
  // === SECRET BADGES ===
  {
    key: 'night_owl',
    name: 'Night Owl',
    description: 'Complete a lesson between midnight and 5 AM',
    icon: 'moon',
    color: '#6366f1',
    category: 'general',
    rarity: 'rare',
    xpBonus: 150,
    requirement: { type: 'night_study' },
    isSecret: true,
    order: 50,
  },
  {
    key: 'early_bird',
    name: 'Early Bird',
    description: 'Complete a lesson before 7 AM',
    icon: 'sunrise',
    color: '#f59e0b',
    category: 'general',
    rarity: 'rare',
    xpBonus: 150,
    requirement: { type: 'morning_study' },
    isSecret: true,
    order: 51,
  },
]

/**
 * Initialize badges in the database
 * Call this on app startup or via admin endpoint
 */
export async function initializeBadges() {
  for (const badge of BADGE_DEFINITIONS) {
    await db.badge.upsert({
      where: { key: badge.key },
      update: {
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
        category: badge.category,
        rarity: badge.rarity,
        xpBonus: badge.xpBonus,
        requirement: badge.requirement,
        isSecret: badge.isSecret ?? false,
        order: badge.order,
      },
      create: {
        key: badge.key,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
        category: badge.category,
        rarity: badge.rarity,
        xpBonus: badge.xpBonus,
        requirement: badge.requirement,
        isSecret: badge.isSecret ?? false,
        order: badge.order,
      },
    })
  }
  
  console.log(`[Badges] Initialized ${BADGE_DEFINITIONS.length} badges`)
}

/**
 * Award a badge to a user
 */
export async function awardBadge(userId: string, badgeKey: string) {
  const badge = await db.badge.findUnique({
    where: { key: badgeKey },
  })
  
  if (!badge) {
    throw new Error(`Badge not found: ${badgeKey}`)
  }
  
  // Check if user already has this badge
  const existing = await db.userBadge.findFirst({
    where: {
      userId,
      badgeId: badge.id,
    },
  })
  
  if (existing) {
    return { awarded: false, alreadyHad: true }
  }
  
  // Award the badge
  const userBadge = await db.userBadge.create({
    data: {
      userId,
      badgeId: badge.id,
      earnedAt: new Date(),
    },
    include: {
      badge: true,
    },
  })
  
  // Award XP bonus
  if (badge.xpBonus > 0) {
    await awardXp(userId, badge.xpBonus, 'badge_earned', { badgeKey })
  }
  
  // Log activity
  await logActivity(userId, 'BADGE_EARNED', {
    badgeKey,
    badgeName: badge.name,
    rarity: badge.rarity,
    xpBonus: badge.xpBonus,
  })
  
  return {
    awarded: true,
    badge: userBadge.badge,
    xpBonus: badge.xpBonus,
  }
}

/**
 * Get all badges for a user
 */
export async function getUserBadges(userId: string) {
  const userBadges = await db.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { earnedAt: 'desc' },
  })
  
  return userBadges.map(ub => ({
    ...ub.badge,
    earnedAt: ub.earnedAt,
  }))
}

/**
 * Get all available badges with user's progress
 */
export async function getAllBadgesWithProgress(userId: string) {
  const [allBadges, userBadges] = await Promise.all([
    db.badge.findMany({ orderBy: { order: 'asc' } }),
    db.userBadge.findMany({
      where: { userId },
      select: { badgeId: true, earnedAt: true, progress: true },
    }),
  ])
  
  const earnedBadgeIds = new Set(userBadges.map(ub => ub.badgeId))
  const userBadgeMap = new Map(userBadges.map(ub => [ub.badgeId, ub]))
  
  return allBadges.map(badge => ({
    ...badge,
    earned: earnedBadgeIds.has(badge.id),
    earnedAt: userBadgeMap.get(badge.id)?.earnedAt || null,
    progress: userBadgeMap.get(badge.id)?.progress || 0,
  }))
}

/**
 * Check and award badges based on user stats
 */
export async function checkAndAwardBadges(userId: string, stats: {
  lessonsCompleted?: number
  quizzesCompleted?: number
  streakDays?: number
  currentLevel?: number
  totalXp?: number
  sessionsJoined?: number
  messagesSent?: number
  perfectQuizzes?: number
  quizAverage?: number
}) {
  const badgesToCheck: string[] = []
  
  // Check lesson badges
  if (stats.lessonsCompleted !== undefined) {
    if (stats.lessonsCompleted >= 1) badgesToCheck.push('first_steps')
    if (stats.lessonsCompleted >= 10) badgesToCheck.push('quick_learner')
    if (stats.lessonsCompleted >= 50) badgesToCheck.push('knowledge_seeker')
    if (stats.lessonsCompleted >= 100) badgesToCheck.push('master_scholar')
  }
  
  // Check streak badges
  if (stats.streakDays !== undefined) {
    if (stats.streakDays >= 3) badgesToCheck.push('streak_3')
    if (stats.streakDays >= 7) badgesToCheck.push('streak_7')
    if (stats.streakDays >= 30) badgesToCheck.push('streak_30')
    if (stats.streakDays >= 100) badgesToCheck.push('streak_100')
  }
  
  // Check quiz badges
  if (stats.quizzesCompleted !== undefined) {
    if (stats.quizzesCompleted >= 1) badgesToCheck.push('first_quiz')
    if (stats.quizzesCompleted >= 20) badgesToCheck.push('quiz_pro')
  }
  
  if (stats.perfectQuizzes && stats.perfectQuizzes >= 1) {
    badgesToCheck.push('perfect_score')
  }
  
  if (stats.quizzesCompleted && stats.quizAverage && 
      stats.quizzesCompleted >= 50 && stats.quizAverage >= 80) {
    badgesToCheck.push('quiz_master')
  }
  
  // Check social badges
  if (stats.sessionsJoined !== undefined) {
    if (stats.sessionsJoined >= 5) badgesToCheck.push('social_butterfly')
  }
  
  if (stats.messagesSent !== undefined) {
    if (stats.messagesSent >= 50) badgesToCheck.push('active_participant')
  }
  
  // Check mastery badges
  if (stats.currentLevel !== undefined) {
    if (stats.currentLevel >= 5) badgesToCheck.push('level_5')
    if (stats.currentLevel >= 10) badgesToCheck.push('level_10')
    if (stats.currentLevel >= 20) badgesToCheck.push('level_20')
  }
  
  if (stats.totalXp !== undefined) {
    if (stats.totalXp >= 10000) badgesToCheck.push('xp_10000')
  }
  
  // Award badges
  const awarded: Array<{ badgeKey: string; badgeName: string; xpBonus: number }> = []
  
  for (const badgeKey of badgesToCheck) {
    const result = await awardBadge(userId, badgeKey)
    if (result.awarded && result.badge) {
      awarded.push({
        badgeKey,
        badgeName: result.badge.name,
        xpBonus: result.xpBonus,
      })
    }
  }
  
  return awarded
}

/**
 * Get badge statistics for a user
 */
export async function getBadgeStats(userId: string) {
  const [earnedBadges, allBadges] = await Promise.all([
    db.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    }),
    db.badge.findMany(),
  ])
  
  const byRarity = {
    common: earnedBadges.filter(b => b.badge.rarity === 'common').length,
    rare: earnedBadges.filter(b => b.badge.rarity === 'rare').length,
    epic: earnedBadges.filter(b => b.badge.rarity === 'epic').length,
    legendary: earnedBadges.filter(b => b.badge.rarity === 'legendary').length,
  }
  
  const byCategory = {
    general: earnedBadges.filter(b => b.badge.category === 'general').length,
    streak: earnedBadges.filter(b => b.badge.category === 'streak').length,
    quiz: earnedBadges.filter(b => b.badge.category === 'quiz').length,
    social: earnedBadges.filter(b => b.badge.category === 'social').length,
    mastery: earnedBadges.filter(b => b.badge.category === 'mastery').length,
  }
  
  return {
    totalEarned: earnedBadges.length,
    totalAvailable: allBadges.length,
    completionPercentage: Math.round((earnedBadges.length / allBadges.length) * 100),
    byRarity,
    byCategory,
    totalXpFromBadges: earnedBadges.reduce((sum, b) => sum + b.badge.xpBonus, 0),
  }
}
