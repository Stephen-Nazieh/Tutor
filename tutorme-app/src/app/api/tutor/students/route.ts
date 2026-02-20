/**
 * GET /api/tutor/students
 * List all students linked to this tutor (enrolled in tutor's courses or booked tutor's clinics). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session) => {
  const tutorId = session?.user?.id
  if (!tutorId) return NextResponse.json({ students: [] })

  // Students enrolled in curricula created by this tutor
  const enrollments = await db.curriculumEnrollment.findMany({
    where: {
      curriculum: { creatorId: tutorId },
    },
    include: {
      student: {
        select: {
          id: true,
          email: true,
          profile: { select: { name: true } },
        },
      },
      curriculum: { select: { id: true, name: true } },
      batch: { select: { id: true, name: true } },
    },
  })

  // Students who booked this tutor's clinics
  const clinicBookings = await db.clinicBooking.findMany({
    where: { clinic: { tutorId } },
    include: {
      student: {
        select: {
          id: true,
          email: true,
          profile: { select: { name: true } },
        },
      },
      clinic: { select: { id: true, title: true, startTime: true } },
    },
  })

  const byStudentId = new Map<
    string,
    {
      id: string
      name: string
      email: string
      courses: { curriculumId: string; curriculumName: string; batchName: string | null; enrolledAt: Date }[]
      classes: { clinicId: string; clinicTitle: string; startTime: Date }[]
    }
  >()

  for (const e of enrollments) {
    const sid = e.student.id
    const name = e.student.profile?.name ?? e.student.email ?? 'Unknown'
    if (!byStudentId.has(sid)) {
      byStudentId.set(sid, {
        id: sid,
        name,
        email: e.student.email,
        courses: [],
        classes: [],
      })
    }
    byStudentId.get(sid)!.courses.push({
      curriculumId: e.curriculum.id,
      curriculumName: e.curriculum.name,
      batchName: e.batch?.name ?? null,
      enrolledAt: e.enrolledAt,
    })
  }

  for (const b of clinicBookings) {
    const sid = b.student.id
    const name = b.student.profile?.name ?? b.student.email ?? 'Unknown'
    if (!byStudentId.has(sid)) {
      byStudentId.set(sid, {
        id: sid,
        name,
        email: b.student.email,
        courses: [],
        classes: [],
      })
    }
    byStudentId.get(sid)!.classes.push({
      clinicId: b.clinic.id,
      clinicTitle: b.clinic.title,
      startTime: b.clinic.startTime,
    })
  }

  const students = Array.from(byStudentId.values()).map((s) => ({
    ...s,
    courseCount: s.courses.length,
    classCount: s.classes.length,
  }))

  return NextResponse.json({ students })
}, { role: 'TUTOR' })
