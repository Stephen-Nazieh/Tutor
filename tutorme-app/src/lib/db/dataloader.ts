/**
 * DataLoader Implementation for N+1 Query Prevention
 * 
 * This module provides batch loading utilities to prevent N+1 queries
 * when fetching related data in GraphQL-like or REST API scenarios.
 */

import { db, cache } from './index'

// Batch load users by ID
export async function batchLoadUsers(userIds: string[]) {
  const cacheKey = `users:${userIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const users = await db.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        email: true,
        role: true,
        image: true,
        profile: {
          select: {
            name: true,
            avatarUrl: true,
            gradeLevel: true,
          }
        }
      }
    })
    
    const userMap = new Map(users.map(u => [u.id, u]))
    return userIds.map(id => userMap.get(id) || null)
  }, 300) // 5 minute cache
}

// Batch load profiles by user ID
export async function batchLoadProfiles(userIds: string[]) {
  const cacheKey = `profiles:${userIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const profiles = await db.profile.findMany({
      where: { userId: { in: userIds } },
    })
    
    const profileMap = new Map(profiles.map(p => [p.userId, p]))
    return userIds.map(id => profileMap.get(id) || null)
  }, 300)
}

// Batch load content progress by user and content IDs
export async function batchLoadContentProgress(
  keys: { userId: string; contentId: string }[]
) {
  if (keys.length === 0) return []
  
  const userIds = [...new Set(keys.map(k => k.userId))]
  const contentIds = [...new Set(keys.map(k => k.contentId))]
  
  const cacheKey = `progress:${userIds.join(',')}:${contentIds.join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const progress = await db.contentProgress.findMany({
      where: {
        userId: { in: userIds },
        contentId: { in: contentIds }
      }
    })
    
    const progressMap = new Map(
      progress.map(p => [`${p.userId}:${p.contentId}`, p])
    )
    
    return keys.map(key => progressMap.get(`${key.userId}:${key.contentId}`) || null)
  }, 60) // 1 minute cache for progress
}

// Batch load classes by tutor ID
export async function batchLoadClassesByTutor(tutorIds: string[]) {
  const cacheKey = `classes:tutor:${tutorIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const classes = await db.clinic.findMany({
      where: { tutorId: { in: tutorIds } },
      orderBy: { startTime: 'desc' },
      take: 100, // Limit per tutor
    })
    
    // Group by tutor
    const grouped = new Map<string, typeof classes>()
    for (const cls of classes) {
      if (!grouped.has(cls.tutorId)) {
        grouped.set(cls.tutorId, [])
      }
      grouped.get(cls.tutorId)!.push(cls)
    }
    
    return tutorIds.map(id => grouped.get(id) || [])
  }, 120) // 2 minute cache
}

// Batch load bookings by class ID
export async function batchLoadBookingsByClass(classIds: string[]) {
  const cacheKey = `bookings:class:${classIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const bookings = await db.clinicBooking.findMany({
      where: { clinicId: { in: classIds } },
      include: {
        student: {
          select: {
            id: true,
            email: true,
            profile: { select: { name: true, avatarUrl: true } }
          }
        }
      }
    })
    
    const grouped = new Map<string, typeof bookings>()
    for (const booking of bookings) {
      if (!grouped.has(booking.clinicId)) {
        grouped.set(booking.clinicId, [])
      }
      grouped.get(booking.clinicId)!.push(booking)
    }
    
    return classIds.map(id => grouped.get(id) || [])
  }, 60)
}

// Batch load gamification stats by user ID
export async function batchLoadGamification(userIds: string[]) {
  const cacheKey = `gamification:${userIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const stats = await db.userGamification.findMany({
      where: { userId: { in: userIds } },
    })
    
    const statsMap = new Map(stats.map(s => [s.userId, s]))
    return userIds.map(id => statsMap.get(id) || null)
  }, 60)
}

// Batch load achievements by user ID
export async function batchLoadAchievements(userIds: string[]) {
  const cacheKey = `achievements:${userIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const achievements = await db.achievement.findMany({
      where: { userId: { in: userIds } },
      orderBy: { earnedAt: 'desc' },
    })
    
    const grouped = new Map<string, typeof achievements>()
    for (const achievement of achievements) {
      if (!grouped.has(achievement.userId)) {
        grouped.set(achievement.userId, [])
      }
      grouped.get(achievement.userId)!.push(achievement)
    }
    
    return userIds.map(id => grouped.get(id) || [])
  }, 300)
}

// Batch load AI tutor enrollments by user ID
export async function batchLoadEnrollments(userIds: string[]) {
  const cacheKey = `enrollments:${userIds.sort().join(',')}`
  
  return cache.getOrSet(cacheKey, async () => {
    const enrollments = await db.aITutorEnrollment.findMany({
      where: { studentId: { in: userIds } },
      include: {
        subject: true,
        level: true,
      }
    })
    
    const grouped = new Map<string, typeof enrollments>()
    for (const enrollment of enrollments) {
      if (!grouped.has(enrollment.studentId)) {
        grouped.set(enrollment.studentId, [])
      }
      grouped.get(enrollment.studentId)!.push(enrollment)
    }
    
    return userIds.map(id => grouped.get(id) || [])
  }, 120)
}

// Generic batch loader factory
export function createBatchLoader<T, K>(
  fetchFn: (ids: K[]) => Promise<T[]>,
  getId: (item: T) => K,
  cacheNamespace: string,
  ttlSeconds = 300
) {
  return async (ids: K[]): Promise<(T | null)[]> => {
    if (ids.length === 0) return []
    
    const uniqueIds = [...new Set(ids)]
    const cacheKey = `${cacheNamespace}:${uniqueIds.sort().join(',')}`
    
    return cache.getOrSet(cacheKey, async () => {
      const items = await fetchFn(uniqueIds)
      const itemMap = new Map(items.map(item => [getId(item), item]))
      return ids.map(id => itemMap.get(id) || null)
    }, ttlSeconds)
  }
}

// DataLoader cache invalidation helpers
export const dataloaderCache = {
  async invalidateUser(userId: string) {
    await cache.invalidatePattern(`users:*${userId}*`)
    await cache.invalidatePattern(`profiles:*${userId}*`)
    await cache.invalidatePattern(`gamification:*${userId}*`)
    await cache.invalidatePattern(`achievements:*${userId}*`)
    await cache.invalidatePattern(`enrollments:*${userId}*`)
  },
  
  async invalidateClass(classId: string) {
    await cache.invalidatePattern(`classes:*${classId}*`)
    await cache.invalidatePattern(`bookings:*${classId}*`)
  },
  
  async invalidateContent(contentId: string) {
    await cache.invalidatePattern(`progress:*${contentId}*`)
  },
  
  async invalidateAll() {
    await cache.clear()
  }
}
