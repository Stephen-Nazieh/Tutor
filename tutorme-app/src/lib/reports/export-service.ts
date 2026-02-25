/**
 * Report Export Service
 * Handles PDF and Excel export generation for student and class reports
 */

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

// Type definitions for export data
export interface StudentExportData {
  id: string
  name: string
  email?: string
  averageScore: number
  completionRate: number
  engagementScore: number
  attendanceRate: number
  participationRate: number
  cluster: 'advanced' | 'intermediate' | 'struggling'
  strengths: string[]
  weaknesses: string[]
  pace: string
  learningStyle?: string
}

export interface ClassExportData {
  classInfo: {
    id: string
    title: string
    subject: string
    totalStudents: number
    averageScore: number
    reportDate: string
  }
  summary: {
    totalStudents: number
    averageScore: number
    advancedCount: number
    intermediateCount: number
    strugglingCount: number
    avgEngagement: number
    avgAttendance: number
  }
  students: StudentExportData[]
  scoreDistribution: { range: string; count: number }[]
  clusterDistribution: { name: string; count: number; percentage: number }[]
  topPerformers: StudentExportData[]
  needsAttention: StudentExportData[]
}

export interface EngagementMetrics {
  classId: string
  period: { start: Date; end: Date }
  overallEngagement: number
  metrics: {
    attendance: number
    participation: number
    assignmentCompletion: number
    quizParticipation: number
    discussionActivity: number
  }
  dailyTrend: { date: string; engagement: number; attendance: number }[]
  hourlyPattern: { hour: number; activity: number }[]
  studentsAtRisk: string[]
}

// ============================================
// PDF Export Functions
// ============================================

export function generateClassReportPDF(data: ClassExportData): Buffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(20)
  doc.setTextColor(37, 99, 235) // Blue-600
  doc.text('Class Performance Report', 14, 20)
  
  doc.setFontSize(12)
  doc.setTextColor(107, 114, 128) // Gray-500
  doc.text(`${data.classInfo.title} - ${data.classInfo.subject}`, 14, 28)
  doc.text(`Generated: ${data.classInfo.reportDate}`, 14, 34)
  
  // Summary Section
  doc.setFontSize(14)
  doc.setTextColor(31, 41, 55) // Gray-800
  doc.text('Summary Statistics', 14, 45)
  
  const summaryData = [
    ['Total Students', String(data.summary.totalStudents)],
    ['Class Average', `${data.summary.averageScore.toFixed(1)}%`],
    ['Advanced Students', String(data.summary.advancedCount)],
    ['Intermediate Students', String(data.summary.intermediateCount)],
    ['Struggling Students', String(data.summary.strugglingCount)],
    ['Avg Engagement', `${data.summary.avgEngagement.toFixed(1)}%`],
    ['Avg Attendance', `${data.summary.avgAttendance.toFixed(1)}%`],
  ]
  
  autoTable(doc, {
    startY: 50,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 40 },
    },
  })
  
  // Score Distribution
  const summaryEndY = (doc as any).lastAutoTable.finalY || 80
  doc.setFontSize(14)
  doc.text('Score Distribution', 14, summaryEndY + 15)
  
  const distributionData = data.scoreDistribution.map(d => [
    d.range,
    String(d.count),
    `${((d.count / data.summary.totalStudents) * 100).toFixed(1)}%`,
  ])
  
  autoTable(doc, {
    startY: summaryEndY + 20,
    head: [['Score Range', 'Count', 'Percentage']],
    body: distributionData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10 },
  })
  
  // Student Performance Table
  const distributionEndY = (doc as any).lastAutoTable.finalY || 120
  doc.setFontSize(14)
  doc.text('Student Performance Details', 14, distributionEndY + 15)
  
  const studentData = data.students.map(s => [
    s.name,
    `${s.averageScore.toFixed(1)}%`,
    `${s.completionRate.toFixed(1)}%`,
    s.cluster.charAt(0).toUpperCase() + s.cluster.slice(1),
    `${s.engagementScore.toFixed(1)}%`,
    `${s.attendanceRate.toFixed(1)}%`,
  ])
  
  autoTable(doc, {
    startY: distributionEndY + 20,
    head: [['Name', 'Avg Score', 'Completion', 'Level', 'Engagement', 'Attendance']],
    body: studentData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 30, halign: 'center' },
      4: { cellWidth: 28, halign: 'center' },
      5: { cellWidth: 28, halign: 'center' },
    },
  })
  
  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(156, 163, 175)
    doc.text(
      `Page ${i} of ${pageCount} | TutorMe Reports`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }
  
  return Buffer.from(doc.output('arraybuffer'))
}

export function generateStudentReportPDF(
  student: StudentExportData,
  classInfo: { title: string; subject: string }
): Buffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(20)
  doc.setTextColor(37, 99, 235)
  doc.text('Student Performance Report', 14, 20)
  
  doc.setFontSize(12)
  doc.setTextColor(107, 114, 128)
  doc.text(`${student.name}`, 14, 28)
  doc.text(`${classInfo.title} - ${classInfo.subject}`, 14, 34)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 40)
  
  // Performance Overview
  doc.setFontSize(14)
  doc.setTextColor(31, 41, 55)
  doc.text('Performance Overview', 14, 52)
  
  const metricsData = [
    ['Average Score', `${student.averageScore.toFixed(1)}%`],
    ['Completion Rate', `${student.completionRate.toFixed(1)}%`],
    ['Engagement Score', `${student.engagementScore.toFixed(1)}%`],
    ['Attendance Rate', `${student.attendanceRate.toFixed(1)}%`],
    ['Participation Rate', `${student.participationRate.toFixed(1)}%`],
    ['Learning Pace', student.pace.charAt(0).toUpperCase() + student.pace.slice(1)],
    ['Performance Level', student.cluster.charAt(0).toUpperCase() + student.cluster.slice(1)],
  ]
  
  if (student.learningStyle) {
    metricsData.push(['Learning Style', student.learningStyle.charAt(0).toUpperCase() + student.learningStyle.slice(1)])
  }
  
  autoTable(doc, {
    startY: 58,
    head: [['Metric', 'Value']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10 },
  })
  
  // Strengths
  const metricsEndY = (doc as any).lastAutoTable.finalY || 90
  doc.setFontSize(14)
  doc.text('Strengths', 14, metricsEndY + 15)
  
  const strengthsData = student.strengths.length > 0 
    ? student.strengths.map((s, i) => [String(i + 1), s])
    : [['1', 'No specific strengths identified yet']]
  
  autoTable(doc, {
    startY: metricsEndY + 20,
    head: [['#', 'Area']],
    body: strengthsData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255 }, // Green
    styles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 15, halign: 'center' } },
  })
  
  // Areas for Improvement
  const strengthsEndY = (doc as any).lastAutoTable.finalY || 120
  doc.setFontSize(14)
  doc.text('Areas for Improvement', 14, strengthsEndY + 15)
  
  const weaknessesData = student.weaknesses.length > 0
    ? student.weaknesses.map((w, i) => [String(i + 1), w])
    : [['1', 'No specific areas identified yet']]
  
  autoTable(doc, {
    startY: strengthsEndY + 20,
    head: [['#', 'Area']],
    body: weaknessesData,
    theme: 'grid',
    headStyles: { fillColor: [239, 68, 68], textColor: 255 }, // Red
    styles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 15, halign: 'center' } },
  })
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(156, 163, 175)
  doc.text(
    'TutorMe Student Report',
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  )
  
  return Buffer.from(doc.output('arraybuffer'))
}

// ============================================
// Excel Export Functions
// ============================================

export function generateClassReportExcel(data: ClassExportData): Buffer {
  const workbook = XLSX.utils.book_new()
  
  // Sheet 1: Summary
  const summaryData = [
    ['Class Performance Report'],
    [''],
    ['Class Information'],
    ['Title', data.classInfo.title],
    ['Subject', data.classInfo.subject],
    ['Report Date', data.classInfo.reportDate],
    [''],
    ['Summary Statistics'],
    ['Total Students', data.summary.totalStudents],
    ['Class Average', `${data.summary.averageScore.toFixed(1)}%`],
    ['Advanced Students', data.summary.advancedCount],
    ['Intermediate Students', data.summary.intermediateCount],
    ['Struggling Students', data.summary.strugglingCount],
    ['Average Engagement', `${data.summary.avgEngagement.toFixed(1)}%`],
    ['Average Attendance', `${data.summary.avgAttendance.toFixed(1)}%`],
    [''],
    ['Score Distribution'],
    ['Range', 'Count', 'Percentage'],
    ...data.scoreDistribution.map(d => [
      d.range,
      d.count,
      `${((d.count / data.summary.totalStudents) * 100).toFixed(1)}%`,
    ]),
    [''],
    ['Cluster Distribution'],
    ['Level', 'Count', 'Percentage'],
    ...data.clusterDistribution.map(d => [
      d.name,
      d.count,
      `${d.percentage.toFixed(1)}%`,
    ]),
  ]
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')
  
  // Sheet 2: All Students
  const studentHeaders = [
    'Name',
    'Email',
    'Average Score (%)',
    'Completion Rate (%)',
    'Engagement Score (%)',
    'Attendance Rate (%)',
    'Participation Rate (%)',
    'Performance Level',
    'Learning Pace',
    'Learning Style',
    'Strengths',
    'Weaknesses',
  ]
  
  const studentData = data.students.map(s => [
    s.name,
    s.email || '',
    s.averageScore,
    s.completionRate,
    s.engagementScore,
    s.attendanceRate,
    s.participationRate,
    s.cluster.charAt(0).toUpperCase() + s.cluster.slice(1),
    s.pace.charAt(0).toUpperCase() + s.pace.slice(1),
    s.learningStyle ? s.learningStyle.charAt(0).toUpperCase() + s.learningStyle.slice(1) : '',
    s.strengths.join('; '),
    s.weaknesses.join('; '),
  ])
  
  const studentsSheet = XLSX.utils.aoa_to_sheet([studentHeaders, ...studentData])
  XLSX.utils.book_append_sheet(workbook, studentsSheet, 'All Students')
  
  // Sheet 3: Top Performers
  const topHeaders = ['Rank', 'Name', 'Average Score (%)', 'Completion Rate (%)', 'Performance Level']
  const topData = data.topPerformers.map((s, i) => [
    i + 1,
    s.name,
    s.averageScore,
    s.completionRate,
    s.cluster.charAt(0).toUpperCase() + s.cluster.slice(1),
  ])
  
  const topSheet = XLSX.utils.aoa_to_sheet([topHeaders, ...topData])
  XLSX.utils.book_append_sheet(workbook, topSheet, 'Top Performers')
  
  // Sheet 4: Needs Attention
  const attentionHeaders = ['Name', 'Average Score (%)', 'Performance Level', 'Areas of Concern']
  const attentionData = data.needsAttention.map(s => [
    s.name,
    s.averageScore,
    s.cluster.charAt(0).toUpperCase() + s.cluster.slice(1),
    s.weaknesses.slice(0, 3).join('; '),
  ])
  
  const attentionSheet = XLSX.utils.aoa_to_sheet([attentionHeaders, ...attentionData])
  XLSX.utils.book_append_sheet(workbook, attentionSheet, 'Needs Attention')
  
  // Generate buffer
  return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }))
}

export function generateEngagementReportExcel(
  data: EngagementMetrics,
  classTitle: string
): Buffer {
  const workbook = XLSX.utils.book_new()
  
  // Sheet 1: Overview
  const overviewData = [
    ['Class Engagement Report'],
    [''],
    ['Class', classTitle],
    ['Report Period', `${data.period.start.toLocaleDateString()} - ${data.period.end.toLocaleDateString()}`],
    [''],
    ['Overall Engagement Score', `${data.overallEngagement.toFixed(1)}%`],
    [''],
    ['Engagement Metrics Breakdown'],
    ['Metric', 'Score (%)'],
    ['Attendance', data.metrics.attendance],
    ['Participation', data.metrics.participation],
    ['Assignment Completion', data.metrics.assignmentCompletion],
    ['Quiz Participation', data.metrics.quizParticipation],
    ['Discussion Activity', data.metrics.discussionActivity],
    [''],
    ['Students At Risk', data.studentsAtRisk.length],
    ...data.studentsAtRisk.map((id, i) => [`Student ${i + 1}`, id]),
  ]
  
  const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData)
  XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview')
  
  // Sheet 2: Daily Trend
  const dailyHeaders = ['Date', 'Engagement Score (%)', 'Attendance Rate (%)']
  const dailyData = data.dailyTrend.map(d => [d.date, d.engagement, d.attendance])
  
  const dailySheet = XLSX.utils.aoa_to_sheet([dailyHeaders, ...dailyData])
  XLSX.utils.book_append_sheet(workbook, dailySheet, 'Daily Trend')
  
  // Sheet 3: Hourly Pattern
  const hourlyHeaders = ['Hour', 'Activity Level']
  const hourlyData = data.hourlyPattern.map(h => [
    `${h.hour}:00`,
    h.activity,
  ])
  
  const hourlySheet = XLSX.utils.aoa_to_sheet([hourlyHeaders, ...hourlyData])
  XLSX.utils.book_append_sheet(workbook, hourlySheet, 'Hourly Pattern')
  
  return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }))
}

// ============================================
// CSV Export Functions
// ============================================

export function generateCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers
        .map(header => {
          const value = row[header]
          const stringValue =
            typeof value === 'object' && value !== null
              ? JSON.stringify(value)
              : String(value ?? '')
          // Escape quotes and wrap in quotes if needed
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        })
        .join(',')
    ),
  ]
  
  return csvRows.join('\n')
}
