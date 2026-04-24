import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseEnrollment, course, profile } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions, request)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  // Fetch all courses the student is enrolled in, along with the tutor's profile
  const enrollments = await drizzleDb
    .select({
      courseId: course.courseId,
      courseName: course.name,
      courseCategory: course.categories, // This is a string[] or string depending on schema
      tutorId: course.creatorId,
      tutorName: profile.name,
    })
    .from(courseEnrollment)
    .innerJoin(course, eq(courseEnrollment.courseId, course.courseId))
    .leftJoin(profile, eq(course.creatorId, profile.userId))
    .where(eq(courseEnrollment.studentId, studentId))

  // Build the directory tree
  const directory: Record<string, Record<string, { courseId: string; name: string }[]>> = {}

  enrollments.forEach(en => {
    // Format tutor username (fallback to generic if null)
    const tutorUsername = en.tutorName ? `Tutor@${en.tutorName.replace(/\s+/g, '')}` : 'Tutor@Unknown'
    
    // Extract category (fallback to General if null/empty)
    let category = 'General'
    if (Array.isArray(en.courseCategory) && en.courseCategory.length > 0) {
      category = en.courseCategory[0]
    } else if (en.courseCategory && typeof en.courseCategory === 'string') {
      try {
        const parsed = JSON.parse(en.courseCategory)
        if (Array.isArray(parsed) && parsed.length > 0) category = parsed[0]
        else category = String(en.courseCategory)
      } catch {
        category = String(en.courseCategory)
      }
    }

    if (!directory[tutorUsername]) {
      directory[tutorUsername] = {}
    }
    if (!directory[tutorUsername][category]) {
      directory[tutorUsername][category] = []
    }
    
    directory[tutorUsername][category].push({
      courseId: en.courseId,
      name: en.courseName || 'Unnamed Course'
    })
  })

  return NextResponse.json({ directory })
}
