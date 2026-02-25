/**
 * GET /api/reports/students/[studentId]/export
 * Export individual student report in various formats (pdf, csv)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { generateStudentReportPDF, generateCSV } from '@/lib/reports/export-service'
import { getStudentPerformance } from '@/lib/performance/student-analytics'

export const GET = withAuth(async (req: NextRequest, session, { params }) => {
  const { studentId } = await params
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'pdf'
  const classId = searchParams.get('classId')

  try {
    // Access policy: tutor + student(self) + admin
    const isOwnRecord = session.user.role === 'STUDENT' && session.user.id === studentId
    const isTutor = session.user.role === 'TUTOR'
    const isAdmin = session.user.role === 'ADMIN'
    if (!isOwnRecord && !isTutor && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    // Get student info
    const student = await db.user.findUnique({
      where: { id: studentId },
      include: { profile: true },
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    // Get performance data
    const performance = await getStudentPerformance(studentId, classId || undefined)

    // Get class info if provided
    let classInfo = { title: 'All Classes', subject: 'General' }
    if (classId) {
      const curriculum = await db.curriculum.findUnique({
        where: { id: classId },
        select: { title: true, subject: true },
      })
      if (curriculum) {
        classInfo = { title: curriculum.title, subject: curriculum.subject }
      }
    }

    const studentData = {
      id: studentId,
      name: student.profile?.name || `Student ${studentId.slice(-6)}`,
      email: student.email,
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
        return new NextResponse(pdfBuffer, {
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
