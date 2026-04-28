import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
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

  // Build the directory tree
  // Structure: Tutor@username -> CourseName -> Folders (tasks, assessments, homework, etc) -> items
  const directory: Record<string, Record<string, any>> = {}

  enrollments.forEach(en => {
    const tutorUsername = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'

    const courseName = en.courseName || 'Unnamed Course'

    if (!directory[tutorUsername]) directory[tutorUsername] = {}
    if (!directory[tutorUsername][courseName]) {
      directory[tutorUsername][courseName] = {
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
  // Sort descending so the last is on top
  const sortedMaterials = [...deployedMaterials].sort(
    (a, b) => b.deployedAt.getTime() - a.deployedAt.getTime()
  )

  // Populate individual reports
  studentReports.forEach(report => {
    if (!report.courseId) return
    const en = enrollments.find(e => e.courseId === report.courseId)
    if (!en) return

    const tutorUsername = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'

    const courseName = en.courseName || 'Unnamed Course'

    if (!directory[tutorUsername]?.[courseName]) return

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

    directory[tutorUsername][courseName].reports.push(item)
  })

  sortedMaterials.forEach(material => {
    // Find the enrollment to know the tutor and category
    const en = enrollments.find(e => e.courseId === material.courseId)
    if (!en) return

    const tutorUsername = en.tutorName
      ? `Tutor@${en.tutorName.replace(/\s+/g, '')}`
      : 'Tutor@Unknown'
    const courseName = en.courseName || 'Unnamed Course'

    // Ensure the structure exists
    if (!directory[tutorUsername]?.[courseName]) return

    // Format title with session sequence (e.g. "Task Title (s1)")
    const formattedTitle = `${material.title} (s${material.sessionSequence})`

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
        directory[tutorUsername][courseName].tasks.push(item)
        break
      case 'assessment':
        directory[tutorUsername][courseName].assessments.push(item)
        break
      case 'homework':
        directory[tutorUsername][courseName].homework.push(item)
        break
      case 'recording':
        directory[tutorUsername][courseName].recordedSessions.push(item)
        break
      case 'report':
        directory[tutorUsername][courseName].reports.push(item)
        break
    }
  })

  return NextResponse.json({ directory })
}
