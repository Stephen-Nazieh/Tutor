/**
 * GET /api/reports/students/[studentId]/export
 * Export individual student report in various formats (pdf, csv)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, curriculum } from '@/lib/db/schema'
import { generateStudentReportPDF, generateCSV } from '@/lib/reports/export-service'
import { getStudentPerformance } from '@/lib/performance/student-analytics'
import { eq } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params;
  const { studentId } = await params
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'pdf'
  const classId = searchParams.get('classId')

  try {
    const isOwnRecord = session.user.role === 'STUDENT' && session.user.id === studentId
    const isTutor = session.user.role === 'TUTOR'
    const isAdmin = session.user.role === 'ADMIN'
    if (!isOwnRecord && !isTutor && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    const [studentRow] = await drizzleDb
      .select({
        id: user.id,
        email: user.email,
        name: profile.name,
      })
      .from(user)
      .leftJoin(profile, eq(profile.userId, user.id))
      .where(eq(user.id, studentId))
      .limit(1)

    if (!studentRow) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const performance = await getStudentPerformance(studentId, classId || undefined)

    let classInfo = { title: 'All Classes', subject: 'General' }
    if (classId) {
      const [curriculumRow] = await drizzleDb
        .select({ name: curriculum.name, subject: curriculum.subject })
        .from(curriculum)
        .where(eq(curriculum.id, classId))
        .limit(1)
      if (curriculumRow) {
        classInfo = { title: curriculumRow.name, subject: curriculumRow.subject }
      }
    }

    const studentData = {
      id: studentId,
      name: studentRow.name ?? `Student ${studentId.slice(-6)}`,
      email: studentRow.email,
      averageScore: performance.overallMetrics.averageScore,
      completionRate: performance.overallMetrics.completionRate,
      engagementScore: performance.overallMetrics.engagementScore,
      attendanceRate: performance.overallMetrics.attendanceRate,
      participationRate: performance.overallMetrics.participationRate,
      cluster: performance.performanceCluster,
      strengths: performance.subjectStrengths,
      weaknesses: performance.subjectWeaknesses,
      pace: performance.pace,
      learningStyle: performance.learningStyle,
    }

    switch (format.toLowerCase()) {
      case 'pdf': {
        const pdfBuffer = generateStudentReportPDF(studentData, classInfo)
        return new NextResponse(pdfBuffer as any, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="student-report-${studentId}.pdf"`,
          },
        })
      }

      case 'csv': {
        const csvData = generateCSV([studentData as unknown as Record<string, unknown>])
        return new NextResponse(csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="student-report-${studentId}.csv"`,
          },
        })
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid format. Use pdf or csv' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error generating student export:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate export' },
      { status: 500 }
    )
  }
})
