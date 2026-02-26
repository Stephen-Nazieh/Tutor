/**
 * GET /api/reports/class/[classId]/export
 * Export class report in various formats (pdf, excel, csv)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import {
  generateClassReportPDF,
  generateClassReportExcel,
  generateCSV,
  ClassExportData,
  StudentExportData,
} from '@/lib/reports/export-service'
import { getStudentPerformance } from '@/lib/performance/student-analytics'

async function getClassExportData(classId: string): Promise<ClassExportData | null> {
  // Get class/curriculum info
  const curriculum = await db.curriculum.findUnique({
    where: { id: classId },
    select: {
      id: true,
      title: true,
      subject: true,
    },
  })

  if (!curriculum) return null

  // Get enrolled students
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { curriculumId: classId },
    include: {
      student: {
        include: {
          profile: true,
        },
      },
    },
  })

  const students: StudentExportData[] = []
  let totalScore = 0
  let totalEngagement = 0
  let totalAttendance = 0
  let advancedCount = 0
  let intermediateCount = 0
  let strugglingCount = 0

  for (const enrollment of enrollments) {
    const performance = await getStudentPerformance(enrollment.studentId, classId)

    const studentData: StudentExportData = {
      id: enrollment.studentId,
      name: enrollment.student.profile?.name || `Student ${enrollment.studentId.slice(-6)}`,
      email: enrollment.student.email,
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

    students.push(studentData)
    totalScore += studentData.averageScore
    totalEngagement += studentData.engagementScore
    totalAttendance += studentData.attendanceRate

    if (studentData.cluster === 'advanced') advancedCount++
    else if (studentData.cluster === 'intermediate') intermediateCount++
    else strugglingCount++
  }

  const totalStudents = students.length
  const averageScore = totalStudents > 0 ? totalScore / totalStudents : 0
  const avgEngagement = totalStudents > 0 ? totalEngagement / totalStudents : 0
  const avgAttendance = totalStudents > 0 ? totalAttendance / totalStudents : 0

  // Calculate score distribution
  const scoreDistribution = [
    { range: '0-59', count: students.filter(s => s.averageScore < 60).length },
    { range: '60-69', count: students.filter(s => s.averageScore >= 60 && s.averageScore < 70).length },
    { range: '70-79', count: students.filter(s => s.averageScore >= 70 && s.averageScore < 80).length },
    { range: '80-89', count: students.filter(s => s.averageScore >= 80 && s.averageScore < 90).length },
    { range: '90-100', count: students.filter(s => s.averageScore >= 90).length },
  ]

  // Calculate cluster distribution
  const clusterDistribution = [
    { name: '优秀', count: advancedCount, percentage: totalStudents > 0 ? (advancedCount / totalStudents) * 100 : 0 },
    { name: '中等', count: intermediateCount, percentage: totalStudents > 0 ? (intermediateCount / totalStudents) * 100 : 0 },
    { name: '需帮助', count: strugglingCount, percentage: totalStudents > 0 ? (strugglingCount / totalStudents) * 100 : 0 },
  ]

  // Sort for top performers and needs attention
  const sortedStudents = [...students].sort((a, b) => b.averageScore - a.averageScore)
  const topPerformers = sortedStudents.slice(0, 10)
  const needsAttention = sortedStudents.filter(s => s.cluster === 'struggling' || s.averageScore < 60).slice(0, 10)

  return {
    classInfo: {
      id: classId,
      title: curriculum.title,
      subject: curriculum.subject,
      totalStudents,
      averageScore,
      reportDate: new Date().toLocaleDateString(),
    },
    summary: {
      totalStudents,
      averageScore,
      advancedCount,
      intermediateCount,
      strugglingCount,
      avgEngagement,
      avgAttendance,
    },
    students,
    scoreDistribution,
    clusterDistribution,
    topPerformers,
    needsAttention,
  }
}

export const GET = withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params;
  const { classId } = await params
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'pdf'

  try {
    const data = await getClassExportData(classId)

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      )
    }

    switch (format.toLowerCase()) {
      case 'pdf': {
        const pdfBuffer = generateClassReportPDF(data)
        return new NextResponse(pdfBuffer as any, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="class-report-${classId}.pdf"`,
          },
        })
      }

      case 'excel':
      case 'xlsx': {
        const excelBuffer = generateClassReportExcel(data)
        return new NextResponse(excelBuffer as any, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="class-report-${classId}.xlsx"`,
          },
        })
      }

      case 'csv': {
        const csvData = generateCSV(data.students as unknown as Record<string, unknown>[])
        return new NextResponse(csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="class-report-${classId}.csv"`,
          },
        })
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid format. Use pdf, excel, or csv' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error generating export:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate export' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
