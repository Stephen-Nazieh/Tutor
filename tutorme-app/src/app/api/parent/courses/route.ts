/**
 * Parent Courses API
 * GET /api/parent/courses - List courses shared with this parent
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculumShare } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req: NextRequest, session) => {
    if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only parents can view shared courses' },
        { status: 403 }
      )
    }

    const sharedCourses = await drizzleDb.query.curriculumShare.findMany({
      where: eq(curriculumShare.recipientId, session.user.id),
      orderBy: [desc(curriculumShare.sharedAt)],
      with: {
        curriculum: {
          columns: {
            id: true,
            name: true,
            description: true,
            subject: true,
            gradeLevel: true,
            estimatedHours: true,
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
      shareId: s.id,
      courseId: s.curriculum.id,
      name: s.curriculum.name,
      description: s.curriculum.description,
      subject: s.curriculum.subject,
      gradeLevel: s.curriculum.gradeLevel,
      estimatedHours: s.curriculum.estimatedHours,
      price: s.curriculum.price,
      currency: s.curriculum.currency ?? 'SGD',
      tutorName: s.sharedBy?.profile?.name ?? 'Tutor',
      sharedMessage: s.message,
      sharedAt: s.sharedAt,
    }))

    return NextResponse.json({
      success: true,
      courses,
      totalCount: courses.length,
    })
  },
  {}
)
