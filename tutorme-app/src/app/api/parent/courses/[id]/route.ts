/**
 * Parent Course Viewing API
 * GET /api/parent/courses/[id] - View shared course by CurriculumShare.id
 * Only parents who are recipients can view
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await (await import('next-auth')).getServerSession(
    (await import('@/lib/auth')).authOptions
  )

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Only parents can view shared courses' },
      { status: 403 }
    )
  }

  const { id: shareId } = await context.params
  if (!shareId) {
    return NextResponse.json({ error: 'Share ID required' }, { status: 400 })
  }

  const shareRecord = await db.curriculumShare.findUnique({
    where: { id: shareId },
    include: {
      curriculum: {
        include: {
          modules: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' },
                select: {
                  id: true,
                  title: true,
                  description: true,
                  duration: true,
                  order: true,
                  learningObjectives: true,
                },
              },
            },
          },
        },
      },
      sharedBy: {
        select: {
          id: true,
          profile: { select: { name: true } },
        },
      },
    },
  })

  if (!shareRecord) {
    return NextResponse.json({ error: 'Course share not found' }, { status: 404 })
  }

  if (shareRecord.recipientId !== session.user.id) {
    return NextResponse.json(
      { error: 'You do not have access to this shared course' },
      { status: 403 }
    )
  }

  const course = shareRecord.curriculum
  const tutorName = shareRecord.sharedBy?.profile?.name ?? 'Tutor'

  const courseData = {
    shareId: shareRecord.id,
    courseId: course.id,
    name: course.name,
    description: course.description,
    subject: course.subject,
    gradeLevel: course.gradeLevel,
    difficulty: course.difficulty,
    estimatedHours: course.estimatedHours,
    price: course.price,
    currency: course.currency ?? 'SGD',
    languageOfInstruction: course.languageOfInstruction,
    tutorName,
    sharedMessage: shareRecord.message,
    sharedAt: shareRecord.sharedAt,
    modules: course.modules.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: m.order,
      lessons: m.lessons,
    })),
  }

  return NextResponse.json({
    success: true,
    course: courseData,
  })
}
