/**
 * GET /api/tutor/courses/[id]/enrollments
 * List students enrolled in this course with details. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export const GET = withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({
    where: { id },
    select: { id: true, creatorId: true },
  })
  if (!curriculum) throw new NotFoundError('Course not found')
  // Optional: restrict to creator only: if (curriculum.creatorId && curriculum.creatorId !== session.user.id) return 403

  const enrollments = await db.curriculumEnrollment.findMany({
    where: { curriculumId: id },
    include: {
      student: {
        select: { id: true, email: true, profile: { select: { name: true } } },
      },
      batch: { select: { id: true, name: true, startDate: true } },
    },
    orderBy: { enrolledAt: 'desc' },
  })

  const list = enrollments.map((e: Prisma.CurriculumEnrollmentGetPayload<{
    include: {
      student: {
        select: { id: true; email: true; profile: { select: { name: true } } }
      }
      batch: { select: { id: true; name: true; startDate: true } }
    }
  }>) => ({
    id: e.id,
    studentId: e.studentId,
    studentName: e.student.profile?.name ?? e.student.email ?? 'Unknown',
    studentEmail: e.student.email,
    batchId: e.batchId,
    batchName: e.batch?.name ?? null,
    enrolledAt: e.enrolledAt,
    lastActivity: e.lastActivity,
    lessonsCompleted: e.lessonsCompleted,
    completedAt: e.completedAt,
  }))

  return NextResponse.json({ enrollments: list })
}, { role: 'TUTOR' })
