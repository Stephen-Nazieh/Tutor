/**
 * Public API to get a single tutor by username
 * GET /api/public/tutors/[username]
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, user, profile } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params
    const normalizedUsername = username.toLowerCase().trim()

    if (!normalizedUsername) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    // Find tutor by username (from profile)
    let profileData = await drizzleDb
      .select({
        userId: profile.userId,
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        specialties: profile.specialties,
        hourlyRate: profile.hourlyRate,
        oneOnOneEnabled: profile.oneOnOneEnabled,
        credentials: profile.credentials,
      })
      .from(profile)
      .where(eq(profile.username, normalizedUsername))
      .limit(1)
      .then(rows => rows[0] || null)

    // If not found by username, try by userId
    if (!profileData) {
      profileData = await drizzleDb
        .select({
          userId: profile.userId,
          name: profile.name,
          username: profile.username,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
          specialties: profile.specialties,
          hourlyRate: profile.hourlyRate,
          oneOnOneEnabled: profile.oneOnOneEnabled,
          credentials: profile.credentials,
        })
        .from(profile)
        .where(eq(profile.userId, normalizedUsername))
        .limit(1)
        .then(rows => rows[0] || null)
    }

    if (!profileData) {
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
    }

    const tutorId = profileData.userId

    // Verify the user is a tutor
    const tutorUser = await drizzleDb
      .select({
        userId: user.userId,
        email: user.email,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(and(eq(user.userId, tutorId), eq(user.role, 'TUTOR')))
      .limit(1)

    if (tutorUser.length === 0) {
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
    }

    // Get published courses for this tutor
    const publishedCourses = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        price: course.price,
        currency: course.currency,
        isFree: course.isFree,

        updatedAt: course.updatedAt,
        categories: course.categories,
      })
      .from(course)
      .where(and(eq(course.creatorId, tutorId), eq(course.isPublished, true)))

    // Build tutor response
    const tutorResponse = {
      id: tutorId,
      name: profileData.name || 'Anonymous Tutor',
      username: profileData.username || normalizedUsername,
      bio: profileData.bio || 'Experienced tutor ready to help you improve quickly.',
      avatarUrl: profileData.avatarUrl,
      specialties: profileData.specialties || [],
      credentials: profileData.credentials || '',
      hourlyRate: profileData.hourlyRate,
      oneOnOneEnabled: profileData.oneOnOneEnabled ?? true, // Default to true
      tutorSince: tutorUser[0].createdAt?.toISOString() || null,
      country: null,
      activeCourses: publishedCourses.length,
      socialLinks: {
        tiktok: null,
        youtube: null,
        instagram: null,
        facebook: null,
      },
    }

    // Transform courses to expected format
    const coursesResponse = publishedCourses.map(c => ({
      id: c.courseId,
      name: c.name,
      description: c.description,
      categories: c.categories || [],

      enrollmentCount: 0, // Placeholder
      lessonCount: 1, // Simplified
      price: c.isFree ? 0 : c.price,
      currency: c.currency || 'USD',
      scheduleSummary: null,
      liveSessionsTotal: 0,
      liveSessionsCompleted: 0,
      enrollmentStatus: 'ongoing' as const,
    }))

    return NextResponse.json({
      tutor: tutorResponse,
      courses: coursesResponse,
      source: 'db',
    })
  } catch (error) {
    console.error('[GET /api/public/tutors/[username]] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tutor', tutor: null, courses: [] },
      { status: 500 }
    )
  }
}
