/**
 * Parent Courses API
 * GET /api/parent/courses - List courses shared with this parent
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(
  async (_req: NextRequest, session) => {
    if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only parents can view shared courses' },
        { status: 403 }
      )
    }
    const sharedCourses = await db.curriculumShare.findMany({
      where: { recipientId: session.user.id },
      orderBy: { sharedAt: 'desc' },
      include: {
        curriculum: {
          select: {
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
          select: {
            profile: { select: { name: true } },
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
