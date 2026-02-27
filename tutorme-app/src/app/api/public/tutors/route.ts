import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, curriculum, curriculumModule, curriculumLesson, curriculumEnrollment } from '@/lib/db/schema'
import { MOCK_TUTORS, shouldUseMockPublicTutors } from '@/lib/public/mock-tutors'

interface PublicCourseSummary {
  id: string
  name: string
  subject: string
  gradeLevel: string | null
  difficulty: string | null
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
      id: user.id,
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      specialties: profile.specialties,
      hourlyRate: profile.hourlyRate,
    })
    .from(user)
    .innerJoin(profile, eq(profile.userId, user.id))
    .where(and(eq(user.role, 'TUTOR'), sql`${profile.username} IS NOT NULL`))
    .limit(300)

  const tutorIds = tutorsWithProfile.map((t) => t.id)
  if (tutorIds.length === 0) {
    const filtered: PublicTutorSummary[] = []
    return NextResponse.json({
      tutors: filtered,
      total: 0,
      availableSubjects: [],
      source: 'db',
    })
  }

  const publishedCurricula = await drizzleDb
    .select()
    .from(curriculum)
    .where(
    and(
      eq(curriculum.isPublished, true),
      sql`${curriculum.creatorId} IS NOT NULL`,
      inArray(curriculum.creatorId, tutorIds)
    )
  )
    .orderBy(desc(curriculum.updatedAt))

  const curriculumIds = publishedCurricula.map((c) => c.id)
  const curriculaByCreator = new Map<string, typeof publishedCurricula>()
  for (const c of publishedCurricula) {
    if (!c.creatorId) continue
    const list = curriculaByCreator.get(c.creatorId) ?? []
    if (list.length < 100) list.push(c)
    curriculaByCreator.set(c.creatorId, list)
  }

  let moduleCounts = new Map<string, number>()
  let enrollmentCounts = new Map<string, number>()
  let lessonCountsByModule = new Map<string, number>()
  let modules: { curriculumId: string; id: string }[] = []
  if (curriculumIds.length > 0) {
    modules = await drizzleDb
      .select({ curriculumId: curriculumModule.curriculumId, id: curriculumModule.id })
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, curriculumIds))
    for (const m of modules) {
      moduleCounts.set(m.curriculumId, (moduleCounts.get(m.curriculumId) ?? 0) + 1)
    }
    const enrollments = await drizzleDb
      .select({ curriculumId: curriculumEnrollment.curriculumId })
      .from(curriculumEnrollment)
      .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
    for (const e of enrollments) {
      enrollmentCounts.set(e.curriculumId, (enrollmentCounts.get(e.curriculumId) ?? 0) + 1)
    }
    const lessons = await drizzleDb
      .select({ moduleId: curriculumLesson.moduleId })
      .from(curriculumLesson)
      .where(inArray(curriculumLesson.moduleId, modules.map((m) => m.id)))
    for (const l of lessons) {
      lessonCountsByModule.set(l.moduleId, (lessonCountsByModule.get(l.moduleId) ?? 0) + 1)
    }
  }
  const lessonCountByCurriculum = new Map<string, number>()
  for (const cid of curriculumIds) {
    const modIds = modules.filter((m) => m.curriculumId === cid).map((m) => m.id)
    const total = modIds.reduce((s, mid) => s + (lessonCountsByModule.get(mid) ?? 0), 0)
    lessonCountByCurriculum.set(cid, total)
  }

  const mapped: PublicTutorSummary[] = tutorsWithProfile
    .map((tutor) => {
      const username = tutor.username ?? ''
      if (!username) return null
      const coursesList = curriculaByCreator.get(tutor.id) ?? []
      const courses: PublicCourseSummary[] = coursesList.map((course) => ({
        id: course.id,
        name: course.name,
        subject: course.subject,
        gradeLevel: course.gradeLevel,
        difficulty: course.difficulty,
        enrollmentCount: enrollmentCounts.get(course.id) ?? 0,
        moduleCount: moduleCounts.get(course.id) ?? 0,
        lessonCount: lessonCountByCurriculum.get(course.id) ?? 0,
        updatedAt: course.updatedAt,
      }))

      const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollmentCount, 0)
      const subjects = Array.from(new Set(courses.map((course) => course.subject))).sort((a, b) =>
        a.localeCompare(b)
      )
      const latestCourseUpdatedAt = courses[0]?.updatedAt ? courses[0].updatedAt.toISOString() : null

      return {
        id: tutor.id,
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
          subject: course.subject,
          gradeLevel: course.gradeLevel,
          difficulty: course.difficulty,
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
    availableSubjects: Array.from(new Set(mapped.flatMap((tutor) => tutor.subjects))).sort((a, b) =>
      a.localeCompare(b)
    ),
    source: 'db',
  })
}
