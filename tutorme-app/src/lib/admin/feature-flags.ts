/**
 * Feature Flag System
 * Centralized feature flag management with caching
 */

import { prisma } from '@/lib/db'
import { FeatureFlag } from '@prisma/client'
import { AdminSession } from './auth'

// In-memory cache for feature flags (refreshed periodically)
let flagsCache: Map<string, FeatureFlag> | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 60 * 1000 // 1 minute

export interface FlagEvaluationContext {
  userId?: string
  role?: string
  tier?: string
  email?: string
}

/**
 * Get all feature flags (with caching)
 */
export async function getAllFeatureFlags(): Promise<FeatureFlag[]> {
  // Check cache
  if (flagsCache && Date.now() - cacheTimestamp < CACHE_TTL) {
    return Array.from(flagsCache.values())
  }

  // Fetch from database
  const flags = await prisma.featureFlag.findMany({
    where: { deletedAt: null },
    orderBy: { key: 'asc' },
  })

  // Update cache
  flagsCache = new Map(flags.map(f => [f.key, f]))
  cacheTimestamp = Date.now()

  return flags
}

/**
 * Get a specific feature flag by key
 */
export async function getFeatureFlag(key: string): Promise<FeatureFlag | null> {
  // Check cache first
  if (flagsCache && flagsCache.has(key)) {
    return flagsCache.get(key)!
  }

  const flag = await prisma.featureFlag.findUnique({
    where: { key },
  })

  return flag
}

/**
 * Evaluate if a feature flag is enabled for a given context
 */
export async function isFeatureEnabled(
  key: string,
  context?: FlagEvaluationContext
): Promise<boolean> {
  const flag = await getFeatureFlag(key)

  if (!flag) {
    // Default to enabled for unknown flags (safe default)
    return true
  }

  if (!flag.enabled) {
    return false
  }

  // Global scope - enabled for all
  if (flag.scope === 'global') {
    return true
  }

  // No context provided, can't evaluate scoped flags
  if (!context) {
    return flag.enabled
  }

  const targetValue = flag.targetValue as Record<string, unknown> | undefined

  // User-specific flag
  if (flag.scope === 'user' && targetValue?.userId) {
    return targetValue.userId === context.userId
  }

  // Role-specific flag
  if (flag.scope === 'role' && targetValue?.roles) {
    const allowedRoles = targetValue.roles as string[]
    return context.role ? allowedRoles.includes(context.role) : false
  }

  // Tier-specific flag
  if (flag.scope === 'tier' && targetValue?.tiers) {
    const allowedTiers = targetValue.tiers as string[]
    return context.tier ? allowedTiers.includes(context.tier) : false
  }

  return flag.enabled
}

/**
 * Check multiple feature flags at once
 */
export async function checkFeatures(
  keys: string[],
  context?: FlagEvaluationContext
): Promise<Record<string, boolean>> {
  const flags = await getAllFeatureFlags()
  const flagMap = new Map(flags.map(f => [f.key, f]))

  const results: Record<string, boolean> = {}

  for (const key of keys) {
    const flag = flagMap.get(key)
    
    if (!flag) {
      results[key] = true // Default to enabled
      continue
    }

    if (!flag.enabled) {
      results[key] = false
      continue
    }

    if (flag.scope === 'global') {
      results[key] = true
      continue
    }

    // Evaluate scoped flags
    results[key] = await isFeatureEnabled(key, context)
  }

  return results
}

/**
 * Create a new feature flag
 */
export async function createFeatureFlag(
  data: {
    key: string
    name: string
    description?: string
    enabled?: boolean
    scope?: string
    targetValue?: Record<string, unknown>
    config?: Record<string, unknown>
  },
  adminSession: AdminSession
): Promise<FeatureFlag> {
  const flag = await prisma.featureFlag.create({
    data: {
      key: data.key,
      name: data.name,
      description: data.description,
      enabled: data.enabled ?? true,
      scope: data.scope || 'global',
      targetValue: data.targetValue || undefined,
      config: data.config || {},
      createdBy: adminSession.adminId,
    },
  })

  // Invalidate cache
  flagsCache = null

  return flag
}

/**
 * Update a feature flag
 */
export async function updateFeatureFlag(
  id: string,
  data: {
    name?: string
    description?: string
    enabled?: boolean
    scope?: string
    targetValue?: Record<string, unknown>
    config?: Record<string, unknown>
  },
  adminSession: AdminSession,
  changeReason?: string
): Promise<FeatureFlag> {
  // Get previous state for audit
  const previousFlag = await prisma.featureFlag.findUnique({
    where: { id },
  })

  if (!previousFlag) {
    throw new Error('Feature flag not found')
  }

  // Create change record
  await prisma.featureFlagChange.create({
    data: {
      flagId: id,
      changedBy: adminSession.adminId,
      previousValue: previousFlag as unknown as Record<string, unknown>,
      newValue: data as Record<string, unknown>,
      changeReason,
    },
  })

  const flag = await prisma.featureFlag.update({
    where: { id },
    data: {
      ...data,
      updatedBy: adminSession.adminId,
    },
  })

  // Invalidate cache
  flagsCache = null

  return flag
}

/**
 * Delete (soft delete) a feature flag
 */
export async function deleteFeatureFlag(
  id: string,
  adminSession: AdminSession
): Promise<void> {
  await prisma.featureFlag.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      updatedBy: adminSession.adminId,
    },
  })

  // Invalidate cache
  flagsCache = null
}

/**
 * Get feature flag change history
 */
export async function getFeatureFlagHistory(flagId: string) {
  return prisma.featureFlagChange.findMany({
    where: { flagId },
    include: {
      user: {
        select: {
          email: true,
          profile: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Toggle a feature flag on/off
 */
export async function toggleFeatureFlag(
  id: string,
  enabled: boolean,
  adminSession: AdminSession,
  changeReason?: string
): Promise<FeatureFlag> {
  return updateFeatureFlag(
    id,
    { enabled },
    adminSession,
    changeReason || `Feature ${enabled ? 'enabled' : 'disabled'}`
  )
}

/**
 * Invalidate the feature flag cache
 */
export function invalidateFeatureFlagCache(): void {
  flagsCache = null
  cacheTimestamp = 0
}

// Predefined feature flags for the platform
export const DefaultFeatureFlags = {
  // AI Features
  AI_TUTOR_ENABLED: 'ai_tutor_enabled',
  AI_TUTOR_SOCRATIC_MODE: 'ai_tutor_socratic_mode',
  AI_TUTOR_REAL_TIME_FEEDBACK: 'ai_tutor_real_time_feedback',
  AI_TUTOR_VOICE_INPUT: 'ai_tutor_voice_input',
  
  // Live Session Features
  LIVE_WHITEBOARD: 'live_whiteboard',
  LIVE_BREAKOUT_ROOMS: 'live_breakout_rooms',
  LIVE_SCREEN_SHARE: 'live_screen_share',
  LIVE_RECORDING: 'live_recording',
  LIVE_AI_MONITORING: 'live_ai_monitoring',
  
  // Content Features
  CONTENT_QUIZZES: 'content_quizzes',
  CONTENT_TRANSCRIPTS: 'content_transcripts',
  CONTENT_BOOKMARKS: 'content_bookmarks',
  CONTENT_NOTES: 'content_notes',
  
  // Gamification
  GAMIFICATION_ENABLED: 'gamification_enabled',
  GAMIFICATION_ACHIEVEMENTS: 'gamification_achievements',
  GAMIFICATION_LEADERBOARD: 'gamification_leaderboard',
  
  // Social Features
  STUDY_GROUPS: 'study_groups',
  PEER_COLLABORATION: 'peer_collaboration',
  TUTOR_REVIEWS: 'tutor_reviews',
  
  // Payment Features
  PAYMENTS_ENABLED: 'payments_enabled',
  SUBSCRIPTIONS_ENABLED: 'subscriptions_enabled',
  
  // Admin Features
  ADMIN_ANALYTICS_ADVANCED: 'admin_analytics_advanced',
  ADMIN_USER_IMPERSONATION: 'admin_user_impersonation',
  ADMIN_CONTENT_MODERATION: 'admin_content_moderation',
} as const

/**
 * Initialize default feature flags
 */
export async function initializeDefaultFeatureFlags(adminId: string): Promise<void> {
  const defaults = [
    { key: DefaultFeatureFlags.AI_TUTOR_ENABLED, name: 'AI Tutor', description: 'Enable AI tutoring features', enabled: true },
    { key: DefaultFeatureFlags.AI_TUTOR_SOCRATIC_MODE, name: 'Socratic Mode', description: 'Use Socratic questioning method', enabled: true },
    { key: DefaultFeatureFlags.AI_TUTOR_REAL_TIME_FEEDBACK, name: 'Real-time Feedback', description: 'Provide instant feedback during AI tutoring', enabled: true },
    { key: DefaultFeatureFlags.LIVE_WHITEBOARD, name: 'Live Whiteboard', description: 'Enable whiteboard in live sessions', enabled: true },
    { key: DefaultFeatureFlags.LIVE_BREAKOUT_ROOMS, name: 'Breakout Rooms', description: 'Enable breakout rooms for group work', enabled: true },
    { key: DefaultFeatureFlags.CONTENT_QUIZZES, name: 'Content Quizzes', description: 'Enable quizzes in video content', enabled: true },
    { key: DefaultFeatureFlags.GAMIFICATION_ENABLED, name: 'Gamification', description: 'Enable gamification features', enabled: true },
    { key: DefaultFeatureFlags.STUDY_GROUPS, name: 'Study Groups', description: 'Enable study group features', enabled: true },
    { key: DefaultFeatureFlags.PAYMENTS_ENABLED, name: 'Payments', description: 'Enable payment processing', enabled: false },
    { key: DefaultFeatureFlags.SUBSCRIPTIONS_ENABLED, name: 'Subscriptions', description: 'Enable subscription plans', enabled: false },
  ]

  for (const flag of defaults) {
    const existing = await prisma.featureFlag.findUnique({
      where: { key: flag.key },
    })

    if (!existing) {
      await prisma.featureFlag.create({
        data: {
          ...flag,
          createdBy: adminId,
        },
      })
    }
  }
}
