/**
 * Optimized Database Queries (Drizzle)
 * Replaces Prisma with Drizzle ORM; uses cache and drizzleDb.
 */

import { eq, and, inArray, gt, desc, asc, sql } from 'drizzle-orm'
import { drizzleDb } from './drizzle'
import { cache } from './index'
import cacheManager from '@/lib/cache-manager'
import {
  user,
  profile,
  clinic,
  clinicBooking,
  contentItem,
  contentProgress,
  userGamification,
  achievement,
  aITutorEnrollment,
} from '@/lib/db/schema'

// ==================== USER QUERIES ====================

export async function getUserById(userId: string) {
  return cache.getOrSet(
    `user:${userId}`,
    async () => {
      const [userRow] = await drizzleDb.select().from(user).where(eq(user.id, userId)).limit(1)
      if (!userRow) return null
      const [profileRow] = await drizzleDb.select().from(profile).where(eq(profile.userId, userId)).limit(1)
      return {
        ...userRow,
        profile: profileRow
          ? {
              id: profileRow.id,
              name: profileRow.name,
              bio: profileRow.bio,
              avatarUrl: profileRow.avatarUrl,
              dateOfBirth: profileRow.dateOfBirth,
              timezone: profileRow.timezone,
              gradeLevel: profileRow.gradeLevel,
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
  const [profileRow] = await drizzleDb.select().from(profile).where(eq(profile.userId, userRow.id)).limit(1)
  return {
    ...userRow,
    profile: profileRow ? { name: profileRow.name, avatarUrl: profileRow.avatarUrl } : null,
  }
}

// ==================== TUTOR QUERIES ====================

export async function getTutorDashboardStats(tutorId: string) {
  return cache.getOrSet(
    `tutor:stats:${tutorId}`,
    async () => {
      const now = new Date()
      const [totalResult] = await drizzleDb.select({ count: sql<number>`count(*)::int` }).from(clinic).where(eq(clinic.tutorId, tutorId))
      const totalClasses = totalResult?.count ?? 0

      const [upcomingResult] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(clinic)
        .where(and(eq(clinic.tutorId, tutorId), gt(clinic.startTime, now), inArray(clinic.status, ['SCHEDULED', 'IN_PROGRESS'])))
      const upcomingClasses = upcomingResult?.count ?? 0

      const uniqueStudents = await drizzleDb
        .select({ studentId: clinicBooking.studentId })
        .from(clinicBooking)
        .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
        .where(eq(clinic.tutorId, tutorId))
        .groupBy(clinicBooking.studentId)
      const totalStudents = uniqueStudents.length

      const recentClasses = await drizzleDb
        .select({
          id: clinic.id,
          title: clinic.title,
          startTime: clinic.startTime,
          status: clinic.status,
          maxStudents: clinic.maxStudents,
        })
        .from(clinic)
        .where(eq(clinic.tutorId, tutorId))
        .orderBy(desc(clinic.startTime))
        .limit(5)

      const bookingCounts = await drizzleDb
        .select({ clinicId: clinicBooking.clinicId, count: sql<number>`count(*)::int` })
        .from(clinicBooking)
        .where(inArray(clinicBooking.clinicId, recentClasses.map((c) => c.id)))
        .groupBy(clinicBooking.clinicId)
      const countMap = new Map(bookingCounts.map((b) => [b.clinicId, b.count]))

      return {
        totalClasses,
        upcomingClasses,
        totalStudents,
        recentClasses: recentClasses.map((c) => ({ ...c, _count: { bookings: countMap.get(c.id) ?? 0 } })),
      }
    },
    60
  )
}

export async function getTutorClasses(
  tutorId: string,
  options: { status?: string; upcoming?: boolean; limit?: number; offset?: number } = {}
) {
  const { status, upcoming, limit = 20, offset = 0 } = options
  const conditions = [eq(clinic.tutorId, tutorId)]
  if (status) conditions.push(eq(clinic.status, status))
  if (upcoming) conditions.push(gt(clinic.startTime, new Date()))

  const [classes, totalResult] = await Promise.all([
    drizzleDb
      .select()
      .from(clinic)
      .where(and(...conditions))
      .orderBy(desc(clinic.startTime))
      .limit(limit)
      .offset(offset),
    drizzleDb.select({ count: sql<number>`count(*)::int` }).from(clinic).where(and(...conditions)),
  ])
  const total = totalResult[0]?.count ?? 0

  const clinicIds = classes.map((c) => c.id)
  const bookings =
    clinicIds.length > 0
      ? await drizzleDb
          .select()
          .from(clinicBooking)
          .where(inArray(clinicBooking.clinicId, clinicIds))
      : []
  const bookingsByClinic = new Map<string, typeof bookings>()
  for (const b of bookings) {
    if (!bookingsByClinic.has(b.clinicId)) bookingsByClinic.set(b.clinicId, [])
    bookingsByClinic.get(b.clinicId)!.push(b)
  }

  const userIds = [...new Set(bookings.map((b) => b.studentId))]
  const profiles =
    userIds.length > 0
      ? await drizzleDb.select().from(profile).where(inArray(profile.userId, userIds))
      : []
  const profileMap = new Map(profiles.map((p) => [p.userId, p]))

  const classesWithBookings = classes.map((c) => {
    const clsBookings = bookingsByClinic.get(c.id) ?? []
    return {
      ...c,
      price: (c as { price?: number })?.price ?? null,
      meetingUrl: c.roomUrl ?? null,
      bookings: clsBookings.map((b) => ({
        id: b.id,
        status: (b as { status?: string })?.status ?? null,
        student: profileMap.get(b.studentId)
          ? {
              id: b.studentId,
              email: '',
              profile: { name: profileMap.get(b.studentId)!.name, avatarUrl: profileMap.get(b.studentId)!.avatarUrl },
            }
          : null,
      })),
      _count: { bookings: clsBookings.length },
    }
  })

  return { classes: classesWithBookings, total, hasMore: offset + limit < total }
}

// ==================== STUDENT QUERIES ====================

export async function getStudentDashboardData(studentId: string) {
  return cache.getOrSet(
    `student:dashboard:${studentId}`,
    async () => {
      const [enrollments, bookingsWithClinic, progressRows, gamificationRow, achievements] = await Promise.all([
        drizzleDb.select().from(aITutorEnrollment).where(eq(aITutorEnrollment.studentId, studentId)),
        drizzleDb
          .select({
            booking: clinicBooking,
            clinic: clinic,
          })
          .from(clinicBooking)
          .innerJoin(clinic, eq(clinic.id, clinicBooking.clinicId))
          .where(
            and(
              eq(clinicBooking.studentId, studentId),
              gt(clinic.startTime, new Date()),
              inArray(clinic.status, ['SCHEDULED', 'IN_PROGRESS'])
            )
          )
          .orderBy(asc(clinic.startTime))
          .limit(5),
        drizzleDb
          .select({ completed: contentProgress.completed, count: sql<number>`count(*)::int` })
          .from(contentProgress)
          .where(eq(contentProgress.studentId, studentId))
          .groupBy(contentProgress.completed),
        drizzleDb.select().from(userGamification).where(eq(userGamification.userId, studentId)).limit(1),
        drizzleDb
          .select()
          .from(achievement)
          .where(eq(achievement.userId, studentId))
          .orderBy(desc(achievement.unlockedAt))
          .limit(5),
      ])

      const progressSummary = progressRows.reduce(
        (acc, p) => ({ ...acc, [String(p.completed)]: p.count }),
        {} as Record<string, number>
      )

      return {
        enrollments,
        upcomingClasses: bookingsWithClinic.map(({ booking, clinic: c }) => ({
          ...booking,
          clinic: {
            id: c.id,
            title: c.title,
            startTime: c.startTime,
            endTime: new Date(c.startTime.getTime() + (c.duration || 60) * 60 * 1000),
            meetingUrl: c.roomUrl,
            tutor: { id: c.tutorId, profile: {} },
          },
        })),
        progressSummary,
        gamification: gamificationRow[0] ?? null,
        recentAchievements: achievements,
      }
    },
    60
  )
}

export async function getStudentProgress(
  studentId: string,
  options: { subject?: string; limit?: number; offset?: number } = {}
) {
  const { subject, limit = 20, offset = 0 } = options
  const progressWhere = eq(contentProgress.studentId, studentId)
  const [progressRows, totalResult] = await Promise.all([
    drizzleDb
      .select()
      .from(contentProgress)
      .where(progressWhere)
      .orderBy(desc(contentProgress.updatedAt))
      .limit(limit)
      .offset(offset),
    drizzleDb.select({ count: sql<number>`count(*)::int` }).from(contentProgress).where(progressWhere),
  ])
  const total = totalResult[0]?.count ?? 0
  const contentIds = progressRows.map((p) => p.contentId)
  const contents =
    contentIds.length > 0
      ? await drizzleDb.select().from(contentItem).where(inArray(contentItem.id, contentIds))
      : []
  const contentMap = new Map(contents.map((c) => [c.id, c]))
  const progress = progressRows.map((p) => ({
    ...p,
    content: contentMap.get(p.contentId)
      ? {
          id: p.contentId,
          title: contentMap.get(p.contentId)!.title,
          subject: contentMap.get(p.contentId)!.subject,
          type: contentMap.get(p.contentId)!.type,
          duration: contentMap.get(p.contentId)!.duration,
          thumbnailUrl: contentMap.get(p.contentId)!.thumbnailUrl,
        }
      : null,
  }))
  return { progress, total, hasMore: offset + limit < total }
}

// ==================== CLASS QUERIES ====================

export async function getAvailableClasses(
  studentId: string,
  options: { subject?: string; upcoming?: boolean; limit?: number; offset?: number } = {}
) {
  const { subject, upcoming = true, limit = 20, offset = 0 } = options
  const conditions = [inArray(clinic.status, ['SCHEDULED', 'IN_PROGRESS'])]
  if (upcoming) conditions.push(gt(clinic.startTime, new Date()))
  if (subject) conditions.push(eq(clinic.subject, subject))

  const [classes, totalResult, studentBookings] = await Promise.all([
    drizzleDb.select().from(clinic).where(and(...conditions)).orderBy(asc(clinic.startTime)).limit(limit).offset(offset),
    drizzleDb.select({ count: sql<number>`count(*)::int` }).from(clinic).where(and(...conditions)),
    drizzleDb.select().from(clinicBooking).where(eq(clinicBooking.studentId, studentId)),
  ])
  const total = totalResult[0]?.count ?? 0
  const bookingByClinic = new Map(studentBookings.map((b) => [b.clinicId, b]))
  const clinicIds = classes.map((c) => c.id)
  const bookingCounts =
    clinicIds.length > 0
      ? await drizzleDb
          .select({ clinicId: clinicBooking.clinicId, count: sql<number>`count(*)::int` })
          .from(clinicBooking)
          .where(inArray(clinicBooking.clinicId, clinicIds))
          .groupBy(clinicBooking.clinicId)
      : []
  const countMap = new Map(bookingCounts.map((b) => [b.clinicId, b.count]))

  const tutorIds = [...new Set(classes.map((c) => c.tutorId))]
  const profiles = tutorIds.length > 0 ? await drizzleDb.select().from(profile).where(inArray(profile.userId, tutorIds)) : []
  const profileMap = new Map(profiles.map((p) => [p.userId, p]))

  const transformed = classes.map((c) => {
    const b = bookingByClinic.get(c.id)
    const spots = (c.maxStudents ?? 50) - (countMap.get(c.id) ?? 0)
    return {
      ...c,
      meetingUrl: c.roomUrl,
      tutor: profileMap.get(c.tutorId)
        ? { id: c.tutorId, profile: { name: profileMap.get(c.tutorId)!.name, avatarUrl: profileMap.get(c.tutorId)!.avatarUrl, specialties: profileMap.get(c.tutorId)!.specialties } }
        : null,
      bookings: b ? [{ id: b.id, status: (b as { status?: string })?.status }] : [],
      isBooked: !!b,
      bookingStatus: b ? (b as { status?: string })?.status ?? null : null,
      spotsLeft: spots,
      _count: { bookings: countMap.get(c.id) ?? 0 },
    }
  })
  return { classes: transformed, total, hasMore: offset + limit < total }
}

export async function getClassDetails(classId: string) {
  return cache.getOrSet(
    `class:${classId}`,
    async () => {
      const [c] = await drizzleDb.select().from(clinic).where(eq(clinic.id, classId)).limit(1)
      if (!c) return null
      const [bookings, tutorProfile] = await Promise.all([
        drizzleDb.select().from(clinicBooking).where(eq(clinicBooking.clinicId, classId)),
        drizzleDb.select().from(profile).where(eq(profile.userId, c.tutorId)).limit(1),
      ])
      const studentIds = bookings.map((b) => b.studentId)
      const studentProfiles =
        studentIds.length > 0 ? await drizzleDb.select().from(profile).where(inArray(profile.userId, studentIds)) : []
      const studentProfileMap = new Map(studentProfiles.map((p) => [p.userId, p]))
      const usersForStudents = studentIds.length > 0 ? await drizzleDb.select().from(user).where(inArray(user.id, studentIds)) : []
      const userMap = new Map(usersForStudents.map((u) => [u.id, u]))
      return {
        ...c,
        meetingUrl: c.roomUrl,
        tutor: {
          id: c.tutorId,
          profile: tutorProfile[0]
            ? {
                name: tutorProfile[0].name,
                avatarUrl: tutorProfile[0].avatarUrl,
                bio: tutorProfile[0].bio,
                specialties: tutorProfile[0].specialties,
                hourlyRate: tutorProfile[0].hourlyRate,
              }
            : null,
        },
        bookings: bookings.map((b) => ({
          ...b,
          student: userMap.get(b.studentId)
            ? {
                id: b.studentId,
                email: userMap.get(b.studentId)!.email,
                profile: studentProfileMap.get(b.studentId)
                  ? { name: studentProfileMap.get(b.studentId)!.name, avatarUrl: studentProfileMap.get(b.studentId)!.avatarUrl }
                  : null,
              }
            : null,
        })),
        _count: { bookings: bookings.length },
      }
    },
    120
  )
}

// ==================== GAMIFICATION QUERIES ====================

export async function getLeaderboard(
  options: { type?: 'XP' | 'STREAK' | 'ACHIEVEMENTS'; limit?: number; period?: 'WEEK' | 'MONTH' | 'ALL_TIME' } = {}
) {
  const { type = 'XP', limit = 20 } = options
  const cacheKey = `leaderboard:${type}:${options.period ?? 'ALL_TIME'}:${limit}`

  return cache.getOrSet(
    cacheKey,
    async () => {
      const orderColumn = type === 'STREAK' ? userGamification.streakDays : userGamification.xp
      const rows = await drizzleDb
        .select()
        .from(userGamification)
        .orderBy(desc(orderColumn))
        .limit(limit)

      const userIds = rows.map((r) => r.userId)
      const profiles = userIds.length > 0 ? await drizzleDb.select().from(profile).where(inArray(profile.userId, userIds)) : []
      const profileMap = new Map(profiles.map((p) => [p.userId, p]))

      return rows.map((r) => ({
        ...r,
        user: {
          id: r.userId,
          profile: profileMap.get(r.userId) ? { name: profileMap.get(r.userId)!.name, avatarUrl: profileMap.get(r.userId)!.avatarUrl } : null,
        },
      }))
    },
    300
  )
}

// ==================== CONTENT QUERIES ====================

export async function getContentLibrary(options: {
  subject?: string
  type?: string
  difficulty?: string
  search?: string
  limit?: number
  offset?: number
} = {}) {
  const { subject, type, difficulty, search, limit = 20, offset = 0 } = options
  const conditions = [eq(contentItem.isPublished, true)]
  if (subject) conditions.push(eq(contentItem.subject, subject))
  if (type) conditions.push(eq(contentItem.type, type))
  if (difficulty) conditions.push(eq(contentItem.difficulty, difficulty))
  if (search) {
    const term = `%${search}%`
    conditions.push(sql`(${contentItem.title} ilike ${term} or coalesce(${contentItem.description}, '')::text ilike ${term})`)
  }

  const [content, totalResult] = await Promise.all([
    drizzleDb
      .select()
      .from(contentItem)
      .where(and(...conditions))
      .orderBy(desc(contentItem.createdAt))
      .limit(limit)
      .offset(offset),
    drizzleDb.select({ count: sql<number>`count(*)::int` }).from(contentItem).where(and(...conditions)),
  ])
  const total = totalResult[0]?.count ?? 0
  return {
    content: content.map((c) => ({ ...c, author: null, _count: { progress: 0, quizzes: 0 } })),
    total,
    hasMore: offset + limit < total,
  }
}

// ==================== CACHE INVALIDATION ====================

export async function invalidateUserCache(userId: string) {
  await Promise.all([
    cache.delete(`user:${userId}`),
    cache.delete(`student:dashboard:${userId}`),
    cache.delete(`tutor:stats:${userId}`),
    cache.invalidatePattern(`*:${userId}:*`),
    cacheManager.invalidateTag(`student:${userId}`),
  ])
}

export async function invalidateClassCache(classId: string) {
  await cache.delete(`class:${classId}`)
}

export async function invalidateLeaderboardCache() {
  await cache.invalidatePattern('leaderboard:*')
}
