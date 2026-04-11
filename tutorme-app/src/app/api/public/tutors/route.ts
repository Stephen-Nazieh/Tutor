/**
 * Public API to get tutors with published courses
 * GET /api/public/tutors?q=&subject=&sort=
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, user, profile } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('q')?.toLowerCase() || ''
    const subjectFilter = searchParams.get('subject')?.toLowerCase() || ''
    const sortBy = searchParams.get('sort') || 'popular'

    // Get all published courses with their creators
    const publishedCourses = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        subject: course.subject,
        gradeLevel: course.gradeLevel,
        difficulty: course.difficulty,
        price: course.price,
        currency: course.currency,
        isFree: course.isFree,
        updatedAt: course.updatedAt,
        creatorId: course.creatorId,
        categories: course.categories,
      })
      .from(course)
      .where(eq(course.isPublished, true))

    if (publishedCourses.length === 0) {
      return NextResponse.json({
        tutors: [],
        availableSubjects: [],
        source: 'db',
      })
    }

    // Get unique tutor IDs from published courses (filter out nulls)
    const tutorIds = publishedCourses
      .map(c => c.creatorId)
      .filter((id): id is string => id !== null && id !== undefined)
    const uniqueTutorIds = [...new Set(tutorIds)]

    if (uniqueTutorIds.length === 0) {
      return NextResponse.json({
        tutors: [],
        availableSubjects: [],
        source: 'db',
      })
    }

    // Get tutor user data
    const tutorUsers = await drizzleDb
      .select({
        userId: user.userId,
        email: user.email,
      })
      .from(user)
      .where(and(eq(user.role, 'TUTOR'), inArray(user.userId, uniqueTutorIds)))

    const validTutorIds = tutorUsers.map(u => u.userId)

    if (validTutorIds.length === 0) {
      return NextResponse.json({
        tutors: [],
        availableSubjects: [],
        source: 'db',
      })
    }

    // Get tutor profiles
    const tutorProfiles = await drizzleDb
      .select({
        userId: profile.userId,
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        specialties: profile.specialties,
      })
      .from(profile)
      .where(inArray(profile.userId, validTutorIds))

    // Build tutor map with their courses
    const tutorMap = new Map()

    for (const profileData of tutorProfiles) {
      const tutorCourses = publishedCourses.filter(c => c.creatorId === profileData.userId)

      // Apply subject filter if specified
      if (subjectFilter && subjectFilter !== 'all') {
        const hasMatchingSubject = tutorCourses.some(
          c =>
            c.subject?.toLowerCase().includes(subjectFilter) ||
            c.categories?.some((cat: string) => cat.toLowerCase().includes(subjectFilter))
        )
        if (!hasMatchingSubject) continue
      }

      // Apply search filter if specified
      if (searchQuery) {
        const matchesSearch =
          profileData.name?.toLowerCase().includes(searchQuery) ||
          profileData.bio?.toLowerCase().includes(searchQuery) ||
          tutorCourses.some(
            c =>
              c.name?.toLowerCase().includes(searchQuery) ||
              c.subject?.toLowerCase().includes(searchQuery) ||
              c.categories?.some((cat: string) => cat.toLowerCase().includes(searchQuery))
          )
        if (!matchesSearch) continue
      }

      // Get unique subjects from courses
      const subjects = [...new Set(tutorCourses.map(c => c.subject).filter(Boolean))]

      // Calculate total enrollments (placeholder - would come from actual enrollment data)
      const totalEnrollments = 0

      tutorMap.set(profileData.userId, {
        id: profileData.userId,
        name: profileData.name || 'Anonymous Tutor',
        username: profileData.username || profileData.userId.slice(0, 8),
        bio: profileData.bio || 'Experienced tutor ready to help you improve quickly.',
        avatarUrl: profileData.avatarUrl,
        specialties: profileData.specialties || [],
        hourlyRate: null,
        courseCount: tutorCourses.length,
        totalEnrollments,
        subjects,
        latestCourseUpdatedAt:
          tutorCourses.length > 0
            ? tutorCourses.sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              )[0].updatedAt?.toISOString()
            : null,
        coursePreview: tutorCourses.map(c => ({
          id: c.courseId,
          name: c.name,
          subject: c.subject || 'General',
          gradeLevel: c.gradeLevel,
          difficulty: c.difficulty,
          enrollmentCount: 0, // Placeholder
          moduleCount: 1, // Simplified
          lessonCount: 1, // Would need to fetch from courseLesson
          updatedAt: c.updatedAt?.toISOString() || new Date().toISOString(),
          price: c.isFree ? 0 : c.price,
          currency: c.currency || 'USD',
          rating: 0, // Placeholder
          reviewCount: 0, // Placeholder
        })),
        averageRating: 0, // Placeholder
        totalReviewCount: 0, // Placeholder
      })
    }

    let tutors = Array.from(tutorMap.values())

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        tutors.sort((a, b) => {
          const dateA = a.latestCourseUpdatedAt ? new Date(a.latestCourseUpdatedAt).getTime() : 0
          const dateB = b.latestCourseUpdatedAt ? new Date(b.latestCourseUpdatedAt).getTime() : 0
          return dateB - dateA
        })
        break
      case 'courses':
        tutors.sort((a, b) => b.courseCount - a.courseCount)
        break
      case 'rate':
        tutors.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        break
      case 'popular':
      default:
        tutors.sort((a, b) => b.totalEnrollments - a.totalEnrollments)
        break
    }

    // Get all unique subjects for filter dropdown
    const allSubjects = [...new Set(publishedCourses.map(c => c.subject).filter(Boolean))]

    return NextResponse.json({
      tutors,
      availableSubjects: allSubjects,
      source: 'db',
    })
  } catch (error) {
    console.error('[GET /api/public/tutors] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tutors', tutors: [], availableSubjects: [] },
      { status: 500 }
    )
  }
}
