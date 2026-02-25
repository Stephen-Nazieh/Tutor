import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
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

  const tutors = await db.user.findMany({
    where: {
      role: 'TUTOR',
      profile: {
        username: { not: null },
      },
    },
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          username: true,
          bio: true,
          avatarUrl: true,
          specialties: true,
          hourlyRate: true,
        },
      },
      createdCurricula: {
        where: { isPublished: true },
        include: {
          _count: { select: { modules: true, enrollments: true } },
          modules: {
            select: { _count: { select: { lessons: true } } },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 100,
      },
    },
    take: 300,
  })

  const mapped: PublicTutorSummary[] = tutors
    .map((tutor) => {
      const username = tutor.profile?.username || ''
      if (!username) return null

      const courses: PublicCourseSummary[] = tutor.createdCurricula.map((course) => ({
        id: course.id,
        name: course.name,
        subject: course.subject,
        gradeLevel: course.gradeLevel,
        difficulty: course.difficulty,
        enrollmentCount: course._count.enrollments,
        moduleCount: course._count.modules,
        lessonCount: course.modules.reduce((sum, mod) => sum + mod._count.lessons, 0),
        updatedAt: course.updatedAt,
      }))

      const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollmentCount, 0)
      const subjects = Array.from(new Set(courses.map((course) => course.subject))).sort((a, b) =>
        a.localeCompare(b)
      )
      const latestCourseUpdatedAt = courses[0]?.updatedAt ? courses[0].updatedAt.toISOString() : null

      return {
        id: tutor.id,
        name: tutor.profile?.name || 'Tutor',
        username,
        bio: tutor.profile?.bio || '',
        avatarUrl: tutor.profile?.avatarUrl || null,
        specialties: tutor.profile?.specialties || [],
        hourlyRate: tutor.profile?.hourlyRate || null,
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
    .filter((item): item is PublicTutorSummary => Boolean(item))

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
