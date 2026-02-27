/**
 * GET /api/tutor/students
 * List all students linked to this tutor (enrolled in tutor's courses or booked tutor's clinics). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  clinicBooking,
  curriculum,
  clinic
} from '@/lib/db/schema'

export const GET = withAuth(async (req, session) => {
  const tutorId = session?.user?.id
  if (!tutorId) return NextResponse.json({ students: [] })

  try {
    // Students enrolled in curricula created by this tutor
    const enrollments = await drizzleDb.query.curriculumEnrollment.findMany({
      where: (ce, { exists, and }) => exists(
        drizzleDb.select().from(curriculum)
          .where(and(eq(curriculum.id, ce.curriculumId), eq(curriculum.creatorId, tutorId)))
      ),
      with: {
        student: {
          with: {
            profile: {
              columns: { name: true }
            }
          },
          columns: { id: true, email: true }
        },
        curriculum: {
          columns: { id: true, name: true }
        },
        batch: {
          columns: { id: true, name: true }
        },
      }
    })

    // Students who booked this tutor's clinics
    const bookings = await drizzleDb.query.clinicBooking.findMany({
      where: (cb, { exists, and }) => exists(
        drizzleDb.select().from(clinic)
          .where(and(eq(clinic.id, cb.clinicId), eq(clinic.tutorId, tutorId)))
      ),
      with: {
        student: {
          with: {
            profile: {
              columns: { name: true }
            }
          },
          columns: { id: true, email: true }
        },
        clinic: {
          columns: { id: true, title: true, startTime: true }
        },
      }
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

    for (const b of bookings) {
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
  } catch (error) {
    console.error('Failed to fetch tutor students:', error)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}, { role: 'TUTOR' })
