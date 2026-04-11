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
    const categoryFilter = searchParams.get('subject')?.toLowerCase() || ''
    const sortBy = searchParams.get('sort') || 'popular'

    // Get all published courses with their creators
    const publishedCourses = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
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
        availableCategories: [],
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
        availableCategories: [],
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
        availableCategories: [],
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
        hourlyRate: profile.hourlyRate,
        oneOnOneEnabled: profile.oneOnOneEnabled,
      })
      .from(profile)
      .where(inArray(profile.userId, validTutorIds))

    // Build tutor map with their courses
    const tutorMap = new Map()

    for (const profileData of tutorProfiles) {
      const tutorCourses = publishedCourses.filter(c => c.creatorId === profileData.userId)

      // Apply category filter if specified
      if (categoryFilter && categoryFilter !== 'all') {
        const hasMatchingCategory = tutorCourses.some(
          c => c.categories?.some((cat: string) => cat.toLowerCase().includes(categoryFilter))
        )
        if (!hasMatchingCategory) continue
      }

      // Apply search filter if specified
      if (searchQuery) {
        const matchesSearch =
          profileData.name?.toLowerCase().includes(searchQuery) ||
          profileData.bio?.toLowerCase().includes(searchQuery) ||
          tutorCourses.some(
            c =>
              c.name?.toLowerCase().includes(searchQuery) ||
              c.categories?.some((cat: string) => cat.toLowerCase().includes(searchQuery))
          )
        if (!matchesSearch) continue
      }

      // Get unique categories from courses (flatten all categories arrays)
      const allCategories = tutorCourses.flatMap(c => c.categories || [])
      const categories = [...new Set(allCategories)]

      // Calculate total enrollments (placeholder - would come from actual enrollment data)
      const totalEnrollments = 0

      tutorMap.set(profileData.userId, {
        id: profileData.userId,
        name: profileData.name || 'Anonymous Tutor',
        username: profileData.username || profileData.userId.slice(0, 8),
        bio: profileData.bio || 'Experienced tutor ready to help you improve quickly.',
        avatarUrl: profileData.avatarUrl,
        specialties: profileData.specialties || [],
        hourlyRate: profileData.hourlyRate,
        oneOnOneEnabled: profileData.oneOnOneEnabled ?? true, // Default to true if not set
        courseCount: tutorCourses.length,
        totalEnrollments,
        categories,
        latestCourseUpdatedAt:
          tutorCourses.length > 0
            ? tutorCourses.sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              )[0].updatedAt?.toISOString()
            : null,
        coursePreview: tutorCourses.map(c => ({
          id: c.courseId,
          name: c.name,
          categories: c.categories || [],
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

    const tutors = Array.from(tutorMap.values())

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

    // Get all unique categories for filter dropdown
    const allCategories = [
      ...new Set(publishedCourses.flatMap(c => c.categories || [])),
    ].filter(Boolean)

    return NextResponse.json({
      tutors,
      availableCategories: allCategories,
      source: 'db',
    })
  } catch (error) {
    console.error('[GET /api/public/tutors] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tutors', tutors: [], availableCategories: [] },
      { status: 500 }
    )
  }
}
