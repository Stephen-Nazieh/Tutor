import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, course, courseLesson, courseEnrollment } from '@/lib/db/schema'
import { MOCK_TUTORS, shouldUseMockPublicTutors } from '@/lib/public/mock-tutors'

interface PublicCourseSummary {
  id: string
  name: string
  categories: string[] | null
  enrollmentCount: number
  moduleCount: number
  lessonCount: number
  updatedAt: Date
}

interface PublicTutorSummary {
  id: string
  name: string
  username: string
  bio: string
  avatarUrl: string | null
  specialties: string[]
  hourlyRate: number | null
  courseCount: number
  totalEnrollments: number
  subjects: string[]
  latestCourseUpdatedAt: string | null
  coursePreview: Array<Omit<PublicCourseSummary, 'updatedAt'> & { updatedAt: string }>
}

function normalizeSearch(value: string | null): string {
  return (value || '').trim().toLowerCase()
}

export async function GET(request: NextRequest) {
  const search = normalizeSearch(request.nextUrl.searchParams.get('q'))
  const subject = normalizeSearch(request.nextUrl.searchParams.get('subject'))
  const sort = normalizeSearch(request.nextUrl.searchParams.get('sort')) || 'popular'
  const useMock = shouldUseMockPublicTutors() || request.nextUrl.searchParams.get('mock') === '1'

  const tutorsWithProfile = await drizzleDb
    .select({
      userId: user.userId,
      name: profile.name,
      username: profile.username,
      handle: user.handle,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      specialties: profile.specialties,
      hourlyRate: profile.hourlyRate,
    })
    .from(user)
    .innerJoin(profile, eq(profile.userId, user.userId))
    .where(
      and(
        eq(user.role, 'TUTOR'),
        sql`${user.handle} IS NOT NULL OR ${profile.username} IS NOT NULL`
      )
    )
    .limit(300)

  const tutorIds = tutorsWithProfile.map((t) => t.userId)
  if (tutorIds.length === 0) {
    const filtered: PublicTutorSummary[] = []
    return NextResponse.json({
      tutors: filtered,
      total: 0,
      availableSubjects: [],
      source: 'db',
    })
  }

  const publishedCourses = await drizzleDb
    .select()
    .from(course)
    .where(
      and(
        eq(course.isPublished, true),
        sql`${course.creatorId} IS NOT NULL`,
        inArray(course.creatorId, tutorIds)
      )
    )
    .orderBy(desc(course.updatedAt))

  const courseIds = publishedCourses.map((c) => c.courseId)
  const coursesByCreator = new Map<string, typeof publishedCourses>()
  for (const c of publishedCourses) {
    if (!c.creatorId) continue
    const list = coursesByCreator.get(c.creatorId) ?? []
    if (list.length < 100) list.push(c)
    coursesByCreator.set(c.creatorId, list)
  }

  const moduleCounts = new Map<string, number>()
  const enrollmentCounts = new Map<string, number>()
  const lessonCountsByCourse = new Map<string, number>()
  let modules: { courseId: string; moduleId: string }[] = []
  if (courseIds.length > 0) {
    modules = await drizzleDb
      .select({ courseId: curriculumModule.curriculumId, moduleId: curriculumModule.moduleId })
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, courseIds))
    for (const m of modules) {
      moduleCounts.set(m.courseId, (moduleCounts.get(m.courseId) ?? 0) + 1)
    }
    const enrollments = await drizzleDb
      .select({ courseId: courseEnrollment.courseId })
      .from(courseEnrollment)
      .where(inArray(courseEnrollment.courseId, courseIds))
    for (const e of enrollments) {
      enrollmentCounts.set(e.courseId, (enrollmentCounts.get(e.courseId) ?? 0) + 1)
    }
    const lessons = await drizzleDb
      .select({ courseId: courseLesson.courseId })
      .from(courseLesson)
      .where(inArray(courseLesson.courseId, courseIds))
    for (const l of lessons) {
      if (l.courseId) {
        lessonCountsByCourse.set(l.courseId, (lessonCountsByCourse.get(l.courseId) ?? 0) + 1)
      }
    }
  }
  const lessonCountByCourse = new Map<string, number>()
  for (const cid of courseIds) {
    const total = lessonCountsByCourse.get(cid) ?? 0
    lessonCountByCourse.set(cid, total)
  }

  const mapped: PublicTutorSummary[] = tutorsWithProfile
    .map((tutor) => {
      const username = tutor.handle ?? tutor.username ?? ''
      if (!username) return null
      const coursesList = coursesByCreator.get(tutor.userId) ?? []
      const courses: PublicCourseSummary[] = coursesList.map((courseRow) => ({
        id: courseRow.courseId,
        name: courseRow.name,
        categories: courseRow.categories,
        enrollmentCount: enrollmentCounts.get(courseRow.courseId) ?? 0,
        moduleCount: moduleCounts.get(courseRow.courseId) ?? 0,
        lessonCount: lessonCountByCourse.get(courseRow.courseId) ?? 0,
        updatedAt: courseRow.updatedAt,
      }))

      const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollmentCount, 0)
      const subjects = Array.from(new Set(courses.flatMap((course) => course.categories ?? []))).sort((a, b) =>
        a.localeCompare(b)
      )
      const latestCourseUpdatedAt = courses[0]?.updatedAt ? courses[0].updatedAt.toISOString() : null

      return {
        id: tutor.userId,
        name: tutor.name ?? 'Tutor',
        username,
        bio: tutor.bio ?? '',
        avatarUrl: tutor.avatarUrl ?? null,
        specialties: tutor.specialties ?? [],
        hourlyRate: tutor.hourlyRate ?? null,
        courseCount: courses.length,
        totalEnrollments,
        subjects,
        latestCourseUpdatedAt,
        coursePreview: courses.slice(0, 4).map((course) => ({
          ...course,
          updatedAt: course.updatedAt.toISOString(),
        })),
      }
    })
    .filter((item: any): item is PublicTutorSummary => Boolean(item))

  const filtered = mapped.filter((tutor) => {
    const searchMatch =
      !search ||
      tutor.name.toLowerCase().includes(search) ||
      tutor.username.toLowerCase().includes(search) ||
      tutor.bio.toLowerCase().includes(search) ||
      tutor.subjects.some((s) => s.toLowerCase().includes(search)) ||
      tutor.specialties.some((s) => s.toLowerCase().includes(search))
    const subjectMatch = !subject || tutor.subjects.some((s) => s.toLowerCase() === subject)
    return searchMatch && subjectMatch
  })

  if (filtered.length === 0 && useMock) {
    const mockMapped: PublicTutorSummary[] = MOCK_TUTORS.map((tutor) => {
      const totalEnrollments = tutor.courses.reduce((sum, course) => sum + course.enrollmentCount, 0)
      const subjects = Array.from(new Set(tutor.courses.map((course) => course.subject)))
      return {
        id: tutor.id,
        name: tutor.name,
        username: tutor.username,
        bio: tutor.bio,
        avatarUrl: tutor.avatarUrl,
        specialties: tutor.specialties,
        hourlyRate: tutor.hourlyRate,
        courseCount: tutor.courses.length,
        totalEnrollments,
        subjects,
        latestCourseUpdatedAt: tutor.courses[0]?.updatedAt || null,
        coursePreview: tutor.courses.slice(0, 4).map((course) => ({
          id: course.id,
          name: course.name,
          categories: [course.subject],
          enrollmentCount: course.enrollmentCount,
          moduleCount: course.moduleCount,
          lessonCount: course.lessonCount,
          updatedAt: course.updatedAt,
        })),
      }
    })

    return NextResponse.json({
      tutors: mockMapped,
      total: mockMapped.length,
      availableSubjects: Array.from(new Set(mockMapped.flatMap((tutor) => tutor.subjects))).sort((a, b) =>
        a.localeCompare(b)
      ),
      source: 'mock',
    })
  }

  filtered.sort((a, b) => {
    if (sort === 'newest') {
      return (Date.parse(b.latestCourseUpdatedAt || '1970-01-01') - Date.parse(a.latestCourseUpdatedAt || '1970-01-01'))
    }
    if (sort === 'courses') {
      return b.courseCount - a.courseCount || b.totalEnrollments - a.totalEnrollments
    }
    if (sort === 'rate') {
      return (a.hourlyRate ?? Number.MAX_SAFE_INTEGER) - (b.hourlyRate ?? Number.MAX_SAFE_INTEGER)
    }
    return b.totalEnrollments - a.totalEnrollments || b.courseCount - a.courseCount
  })

  return NextResponse.json({
    tutors: filtered,
    total: filtered.length,
    availableSubjects: Array.from(new Set(filtered.flatMap((tutor) => tutor.subjects))).sort((a, b) =>
      a.localeCompare(b)
    ),
    source: 'db',
  })
}
