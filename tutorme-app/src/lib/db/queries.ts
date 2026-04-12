/**
 * Optimized Database Queries (Drizzle)
 * Legacy clinic/gamification queries removed.
 */

import { eq } from 'drizzle-orm'
import { drizzleDb } from './drizzle'
import { cache } from './index'
import cacheManager from '@/lib/cache-manager'
import { user, profile, contentItem, contentProgress } from '@/lib/db/schema'

// ==================== USER QUERIES ====================

export async function getUserById(userId: string) {
  return cache.getOrSet(
    `user:${userId}`,
    async () => {
      const [userRow] = await drizzleDb.select().from(user).where(eq(user.userId, userId)).limit(1)
      if (!userRow) return null
      const [profileRow] = await drizzleDb
        .select()
        .from(profile)
        .where(eq(profile.userId, userId))
        .limit(1)
      return {
        ...userRow,
        profile: profileRow
          ? {
              userId: profileRow.userId,
              name: profileRow.name,
              bio: profileRow.bio,
              avatarUrl: profileRow.avatarUrl,
              dateOfBirth: profileRow.dateOfBirth,
              timezone: profileRow.timezone,
              subjectsOfInterest: profileRow.subjectsOfInterest,
              isOnboarded: profileRow.isOnboarded,
              hourlyRate: profileRow.hourlyRate,
              specialties: profileRow.specialties,
            }
          : null,
      }
    },
    300
  )
}

export async function getUserByEmail(email: string) {
  const [userRow] = await drizzleDb
    .select()
    .from(user)
    .where(eq(user.email, email.toLowerCase()))
    .limit(1)
  if (!userRow) return null
  const [profileRow] = await drizzleDb
    .select()
    .from(profile)
    .where(eq(profile.userId, userRow.userId))
    .limit(1)
  return {
    ...userRow,
    profile: profileRow ? { name: profileRow.name, avatarUrl: profileRow.avatarUrl } : null,
  }
}

// ==================== QUERIES END ====================
