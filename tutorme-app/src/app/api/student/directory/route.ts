import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  courseEnrollment,
  course,
  profile,
  deployedMaterial,
  studentTaskReport,
} from '@/lib/db/schema'
import { eq, inArray, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export const GET = withAuth(async (request, session) => {
  const studentId = session.user.id

  // Fetch all courses the student is enrolled in, along with the tutor's profile
  const enrollments = await drizzleDb
    .select({
      studentId: courseEnrollment.studentId,
      courseId: course.courseId,
      courseName: course.name,
      tutorId: course.creatorId,
      tutorName: profile.name,
    })
    .from(courseEnrollment)
    .innerJoin(course, eq(courseEnrollment.courseId, course.courseId))
    .leftJoin(profile, eq(course.creatorId, profile.userId))
    .where(eq(courseEnrollment.studentId, studentId))

  if (enrollments.length === 0) {
    return NextResponse.json({ directory: {} })
  }

  const courseIds = enrollments.map(e => e.courseId)

  // Fetch all deployed materials for these courses
  const deployedMaterials = await drizzleDb
    .select()
    .from(deployedMaterial)
    .where(inArray(deployedMaterial.courseId, courseIds))
    .orderBy(deployedMaterial.deployedAt)

  // Fetch individual student reports
  const studentReports = await drizzleDb
    .select()
    .from(studentTaskReport)
    .where(
      and(
        eq(studentTaskReport.studentId, studentId),
        eq(studentTaskReport.status, 'sent'),
        inArray(studentTaskReport.courseId, courseIds)
      )
    )

  // Build the directory tree using courseId as keys to avoid name collisions
  const directory: Record<string, Record<string, any>> = {}

  enrollments.forEach(en => {
    const tutorKey = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'
    const courseKey = en.courseName || 'Unnamed Course'

    if (!directory[tutorKey]) directory[tutorKey] = {}
    if (!directory[tutorKey][courseKey]) {
      directory[tutorKey][courseKey] = {
        courseId: en.courseId,
        tasks: [],
        assessments: [],
        homework: [],
        reports: [],
        recordedSessions: [],
      }
    }
  })

  // Populate materials into their respective folders
  // Sort descending so the last is on top — safely handle null deployedAt
  const sortedMaterials = [...deployedMaterials].sort((a, b) => {
    const aTime = a.deployedAt ? new Date(a.deployedAt).getTime() : 0
    const bTime = b.deployedAt ? new Date(b.deployedAt).getTime() : 0
    return bTime - aTime
  })

  // Populate individual reports
  studentReports.forEach(report => {
    if (!report.courseId) return
    const en = enrollments.find(e => e.courseId === report.courseId)
    if (!en) return

    const tutorKey = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'
    const courseKey = en.courseName || 'Unnamed Course'

    if (!directory[tutorKey]?.[courseKey]) return

    const item = {
      id: report.reportId,
      itemId: report.taskId || report.reportId,
      title: report.title,
      type: 'report',
      deployedAt: report.sentAt || report.updatedAt,
      content: {
        strengths: report.strengths,
        weaknesses: report.weaknesses,
        overallComments: report.overallComments,
        score: report.score,
      },
      sessionId: null,
      courseId: report.courseId,
      courseName: en.courseName,
    }

    directory[tutorKey][courseKey].reports.push(item)
  })

  sortedMaterials.forEach(material => {
    const en = enrollments.find(e => e.courseId === material.courseId)
    if (!en) return

    const tutorKey = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'
    const courseKey = en.courseName || 'Unnamed Course'

    if (!directory[tutorKey]?.[courseKey]) return

    const seqLabel = material.sessionSequence ? ` (s${material.sessionSequence})` : ''
    const formattedTitle = `${material.title}${seqLabel}`

    const item = {
      id: material.id,
      itemId: material.itemId,
      title: formattedTitle,
      type: material.type,
      deployedAt: material.deployedAt,
      content: material.content,
      sessionId: material.sessionId,
      courseId: material.courseId,
      courseName: en.courseName,
    }

    switch (material.type) {
      case 'task':
        directory[tutorKey][courseKey].tasks.push(item)
        break
      case 'assessment':
        directory[tutorKey][courseKey].assessments.push(item)
        break
      case 'homework':
        directory[tutorKey][courseKey].homework.push(item)
        break
      case 'recording':
        directory[tutorKey][courseKey].recordedSessions.push(item)
        break
      case 'report':
        directory[tutorKey][courseKey].reports.push(item)
        break
    }
  })

  return NextResponse.json({ directory })
})
