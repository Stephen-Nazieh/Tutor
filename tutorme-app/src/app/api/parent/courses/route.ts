/**
 * Parent Courses API
 * GET /api/parent/courses - List courses shared with this parent
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseShare } from '@/lib/db/schema'

export const GET = withAuth(async (_req: NextRequest, session) => {
  if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only parents can view shared courses' }, { status: 403 })
  }

  const sharedCourses = await drizzleDb.query.courseShare.findMany({
    where: eq(courseShare.recipientId, session.user.id),
    orderBy: [desc(courseShare.sharedAt)],
    with: {
      course: {
        columns: {
          courseId: true,
          name: true,
          description: true,
          categories: true,
          price: true,
          currency: true,
        },
      },
      sharedBy: {
        with: {
          profile: { columns: { name: true } },
        },
      },
    },
  })

  const courses = sharedCourses.map((s: any) => ({
    shareId: s.shareId,
    courseId: s.course.courseId,
    name: s.course.name,
    description: s.course.description,
    categories: s.course.categories,
    price: s.course.price,
    currency: s.course.currency ?? 'SGD',
    tutorName: s.sharedBy?.profile?.name ?? 'Tutor',
    sharedMessage: s.message,
    sharedAt: s.sharedAt,
  }))

  return NextResponse.json({
    success: true,
    courses,
    totalCount: courses.length,
  })
}, {})
