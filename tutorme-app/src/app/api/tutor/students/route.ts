/**
 * GET /api/tutor/students
 * List all students linked to this tutor (enrolled in tutor's courses or booked tutor's clinics). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseEnrollment, clinicBooking, course, clinic } from '@/lib/db/schema'

export const GET = withAuth(
  async (req, session) => {
    const tutorId = session?.user?.id
    if (!tutorId) return NextResponse.json({ students: [] })

    try {
      // Students enrolled in courses created by this tutor
      const enrollments = await drizzleDb.query.courseEnrollment.findMany({
        where: (ce, { exists, and }) =>
          exists(
            drizzleDb
              .select()
              .from(course)
              .where(and(eq(course.courseId, ce.courseId), eq(course.creatorId, tutorId)))
          ),
        with: {
          student: {
            with: {
              profile: {
                columns: { name: true },
              },
            },
            columns: { userId: true, email: true },
          },
          course: {
            columns: { courseId: true, name: true },
          },
        },
      })

      // Students who booked this tutor's clinics
      const bookings = await drizzleDb.query.clinicBooking.findMany({
        where: (cb, { exists, and }) =>
          exists(
            drizzleDb
              .select()
              .from(clinic)
              .where(and(eq(clinic.clinicId, cb.clinicId), eq(clinic.tutorId, tutorId)))
          ),
        with: {
          student: {
            with: {
              profile: {
                columns: { name: true },
              },
            },
            columns: { userId: true, email: true },
          },
          clinic: {
            columns: { clinicId: true, title: true, startTime: true },
          },
        },
      })

      const byStudentId = new Map<
        string,
        {
          id: string
          name: string
          email: string
          courses: {
            courseId: string
            courseName: string
            enrolledAt: Date
          }[]
          classes: { clinicId: string; clinicTitle: string; startTime: Date }[]
        }
      >()

      for (const e of enrollments) {
        const sid = e.student.userId
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
          courseId: e.course.courseId,
          courseName: e.course.name,
          enrolledAt: e.enrolledAt,
        })
      }

      for (const b of bookings) {
        const sid = b.student.userId
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
          clinicId: b.clinic.clinicId,
          clinicTitle: b.clinic.title,
          startTime: b.clinic.startTime,
        })
      }

      const students = Array.from(byStudentId.values()).map(s => ({
        ...s,
        courseCount: s.courses.length,
        classCount: s.classes.length,
      }))

      return NextResponse.json({ students })
    } catch (error) {
      console.error('Failed to fetch tutor students:', error)
      return handleApiError(error, 'Failed to fetch students', 'api/tutor/students/route.ts')
    }
  },
  { role: 'TUTOR' }
)
