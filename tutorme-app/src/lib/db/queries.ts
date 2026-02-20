/**
 * Optimized Database Queries
 * 
 * Pre-built, optimized queries for common operations with:
 * - Proper select clauses (no over-fetching)
 * - Included relations (no N+1)
 * - Query result caching
 * - Pagination support
 */

import { db, cache } from './index'

// ==================== USER QUERIES ====================

/**
 * Get user by ID with profile - optimized select
 */
export async function getUserById(userId: string) {
  return cache.getOrSet(
    `user:${userId}`,
    () => db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            name: true,
            bio: true,
            avatarUrl: true,
            dateOfBirth: true,
            timezone: true,
            gradeLevel: true,
            subjectsOfInterest: true,
            isOnboarded: true,
            hourlyRate: true,
            specialties: true,
          }
        }
      }
    }),
    300 // 5 minute cache
  )
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      role: true,
      password: true,
      image: true,
      profile: { select: { name: true, avatarUrl: true } }
    }
  })
}

// ==================== TUTOR QUERIES ====================

/**
 * Get tutor dashboard stats - optimized aggregation
 */
export async function getTutorDashboardStats(tutorId: string) {
  return cache.getOrSet(
    `tutor:stats:${tutorId}`,
    async () => {
      const [
        totalClasses,
        upcomingClasses,
        totalStudents,
        recentClasses
      ] = await Promise.all([
        // Total classes count
        db.clinic.count({ where: { tutorId } }),
        
        // Upcoming classes count
        db.clinic.count({
          where: {
            tutorId,
            startTime: { gt: new Date() },
            status: { in: ['SCHEDULED', 'IN_PROGRESS'] }
          }
        }),
        
        // Unique students count
        db.clinicBooking.groupBy({
          by: ['studentId'],
          where: { clinic: { tutorId } },
          _count: { studentId: true }
        }).then(groups => groups.length),
        
        // Recent classes (last 5)
        db.clinic.findMany({
          where: { tutorId },
          orderBy: { startTime: 'desc' },
          take: 5,
          select: {
            id: true,
            title: true,
            startTime: true,
            status: true,
            maxStudents: true,
            _count: { select: { bookings: true } }
          }
        })
      ])
      
      return {
        totalClasses,
        upcomingClasses,
        totalStudents,
        recentClasses
      }
    },
    60 // 1 minute cache
  )
}

/**
 * Get tutor classes with bookings - single query with include
 */
export async function getTutorClasses(tutorId: string, options: {
  status?: string
  upcoming?: boolean
  limit?: number
  offset?: number
} = {}) {
  const { status, upcoming, limit = 20, offset = 0 } = options
  
  const where: any = { tutorId }
  
  if (status) where.status = status
  if (upcoming) where.startTime = { gt: new Date() }
  
  const [classes, total] = await Promise.all([
    db.clinic.findMany({
      where,
      orderBy: { startTime: 'desc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        startTime: true,
        endTime: true,
        status: true,
        maxStudents: true,
        price: true,
        meetingUrl: true,
        roomId: true,
        createdAt: true,
        bookings: {
          select: {
            id: true,
            status: true,
            student: {
              select: {
                id: true,
                email: true,
                profile: { select: { name: true, avatarUrl: true } }
              }
            }
          }
        },
        _count: { select: { bookings: true } }
      }
    }),
    db.clinic.count({ where })
  ])
  
  return { classes, total, hasMore: offset + limit < total }
}

// ==================== STUDENT QUERIES ====================

/**
 * Get student dashboard data - optimized batch query
 */
export async function getStudentDashboardData(studentId: string) {
  return cache.getOrSet(
    `student:dashboard:${studentId}`,
    async () => {
      const [
        enrollments,
        upcomingClasses,
        progress,
        gamification,
        recentAchievements
      ] = await Promise.all([
        // AI Tutor enrollments
        db.aITutorEnrollment.findMany({
          where: { studentId },
          include: {
            subject: true,
            level: true,
          }
        }),
        
        // Upcoming class bookings
        db.clinicBooking.findMany({
          where: {
            studentId,
            clinic: {
              startTime: { gt: new Date() },
              status: { in: ['SCHEDULED', 'IN_PROGRESS'] }
            }
          },
          orderBy: { clinic: { startTime: 'asc' } },
          take: 5,
          include: {
            clinic: {
              select: {
                id: true,
                title: true,
                startTime: true,
                endTime: true,
                meetingUrl: true,
                tutor: {
                  select: {
                    id: true,
                    profile: { select: { name: true, avatarUrl: true } }
                  }
                }
              }
            }
          }
        }),
        
        // Learning progress summary
        db.contentProgress.groupBy({
          by: ['status'],
          where: { userId: studentId },
          _count: { status: true }
        }),
        
        // Gamification stats
        db.userGamification.findUnique({
          where: { userId: studentId }
        }),
        
        // Recent achievements
        db.achievement.findMany({
          where: { userId: studentId },
          orderBy: { earnedAt: 'desc' },
          take: 5
        })
      ])
      
      return {
        enrollments,
        upcomingClasses,
        progressSummary: progress.reduce((acc, p) => ({
          ...acc,
          [p.status]: p._count.status
        }), {}),
        gamification,
        recentAchievements
      }
    },
    60
  )
}

/**
 * Get student learning progress with content details
 */
export async function getStudentProgress(studentId: string, options: {
  subject?: string
  limit?: number
  offset?: number
} = {}) {
  const { subject, limit = 20, offset = 0 } = options
  
  const where: any = { userId: studentId }
  if (subject) where.content = { subject }
  
  const [progress, total] = await Promise.all([
    db.contentProgress.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: offset,
      take: limit,
      include: {
        content: {
          select: {
            id: true,
            title: true,
            subject: true,
            type: true,
            duration: true,
            thumbnailUrl: true,
          }
        }
      }
    }),
    db.contentProgress.count({ where })
  ])
  
  return { progress, total, hasMore: offset + limit < total }
}

// ==================== CLASS QUERIES ====================

/**
 * Get available classes for students with booking status
 */
export async function getAvailableClasses(studentId: string, options: {
  subject?: string
  upcoming?: boolean
  limit?: number
  offset?: number
} = {}) {
  const { subject, upcoming = true, limit = 20, offset = 0 } = options
  
  const where: any = {
    status: { in: ['SCHEDULED', 'IN_PROGRESS'] }
  }
  
  if (upcoming) where.startTime = { gt: new Date() }
  if (subject) where.subject = subject
  
  const [classes, total] = await Promise.all([
    db.clinic.findMany({
      where,
      orderBy: { startTime: 'asc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        subject: true,
        startTime: true,
        endTime: true,
        maxStudents: true,
        price: true,
        tutor: {
          select: {
            id: true,
            profile: { select: { name: true, avatarUrl: true, specialties: true } }
          }
        },
        bookings: {
          where: { studentId },
          select: { id: true, status: true }
        },
        _count: { select: { bookings: true } }
      }
    }),
    db.clinic.count({ where })
  ])
  
  // Transform to include booking status
  const transformed = classes.map(cls => ({
    ...cls,
    isBooked: cls.bookings.length > 0,
    bookingStatus: cls.bookings[0]?.status || null,
    spotsLeft: cls.maxStudents - cls._count.bookings
  }))
  
  return { classes: transformed, total, hasMore: offset + limit < total }
}

/**
 * Get class details with all bookings
 */
export async function getClassDetails(classId: string) {
  return cache.getOrSet(
    `class:${classId}`,
    () => db.clinic.findUnique({
      where: { id: classId },
      include: {
        tutor: {
          select: {
            id: true,
            profile: {
              select: {
                name: true,
                avatarUrl: true,
                bio: true,
                specialties: true,
                hourlyRate: true
              }
            }
          }
        },
        bookings: {
          include: {
            student: {
              select: {
                id: true,
                email: true,
                profile: { select: { name: true, avatarUrl: true } }
              }
            }
          }
        },
        _count: { select: { bookings: true } }
      }
    }),
    120 // 2 minute cache
  )
}

// ==================== GAMIFICATION QUERIES ====================

/**
 * Get leaderboard - optimized with caching
 */
export async function getLeaderboard(options: {
  type?: 'XP' | 'STREAK' | 'ACHIEVEMENTS'
  limit?: number
  period?: 'WEEK' | 'MONTH' | 'ALL_TIME'
} = {}) {
  const { type = 'XP', limit = 20, period = 'ALL_TIME' } = options
  const cacheKey = `leaderboard:${type}:${period}:${limit}`
  
  return cache.getOrSet(cacheKey, async () => {
    const orderBy: any = {}
    
    switch (type) {
      case 'STREAK':
        orderBy.currentStreak = 'desc'
        break
      case 'ACHIEVEMENTS':
        orderBy.totalAchievements = 'desc'
        break
      case 'XP':
      default:
        orderBy.totalXp = 'desc'
    }
    
    return db.userGamification.findMany({
      orderBy,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            profile: { select: { name: true, avatarUrl: true } }
          }
        }
      }
    })
  }, 300) // 5 minute cache
}

// ==================== CONTENT QUERIES ====================

/**
 * Get content library with filters
 */
export async function getContentLibrary(options: {
  subject?: string
  type?: string
  difficulty?: string
  search?: string
  limit?: number
  offset?: number
} = {}) {
  const { subject, type, difficulty, search, limit = 20, offset = 0 } = options
  
  const where: any = { published: true }
  
  if (subject) where.subject = subject
  if (type) where.type = type
  if (difficulty) where.difficulty = difficulty
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  const [content, total] = await Promise.all([
    db.content.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        subject: true,
        type: true,
        difficulty: true,
        duration: true,
        thumbnailUrl: true,
        author: {
          select: {
            id: true,
            profile: { select: { name: true } }
          }
        },
        _count: { select: { progress: true, quizzes: true } }
      }
    }),
    db.content.count({ where })
  ])
  
  return { content, total, hasMore: offset + limit < total }
}

// ==================== CACHE INVALIDATION ====================

/**
 * Invalidate user-related caches
 */
export async function invalidateUserCache(userId: string) {
  await Promise.all([
    cache.delete(`user:${userId}`),
    cache.delete(`student:dashboard:${userId}`),
    cache.delete(`tutor:stats:${userId}`),
    cache.invalidatePattern(`*:${userId}:*`)
  ])
}

/**
 * Invalidate class-related caches
 */
export async function invalidateClassCache(classId: string) {
  await cache.delete(`class:${classId}`)
}

/**
 * Invalidate leaderboard cache
 */
export async function invalidateLeaderboardCache() {
  await cache.invalidatePattern('leaderboard:*')
}
