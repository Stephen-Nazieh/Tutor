/**
 * GET /api/reports/students/[studentId]/export
 *
 * Generates a downloadable HTML report (styled for print/PDF).
 * Users can print-to-PDF from the browser or we return text/html for download.
 *
 * This avoids needing heavy deps like puppeteer or @react-pdf/renderer.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getStudentPerformance, getQuestionLevelBreakdown } from '@/lib/performance/student-analytics'

function getStudentId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('students')
    return parts[idx + 1]
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = getStudentId(req)

    // Get performance data
    const perf = await getStudentPerformance(studentId)
    const questionLevel = await getQuestionLevelBreakdown(studentId)

    // Get student name
    const profile = await db.profile.findUnique({
        where: { userId: studentId },
        select: { name: true },
    })
    const studentName = profile?.name ?? `Student ${studentId.slice(-6)}`

    const now = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    })

    // Build the HTML report
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Report – ${studentName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #1f2937; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
    @media print { body { padding: 20px; } .no-print { display: none; } }
    h1 { font-size: 1.75rem; color: #111827; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-bottom: 16px; }
    h2 { font-size: 1.25rem; color: #374151; margin-top: 28px; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .header-info { font-size: 0.875rem; color: #6b7280; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
    .metric { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; text-align: center; }
    .metric-value { font-size: 1.75rem; font-weight: 700; }
    .metric-label { font-size: 0.75rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .green { color: #059669; } .blue { color: #2563eb; } .purple { color: #7c3aed; }
    .amber { color: #d97706; } .red { color: #dc2626; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-amber { background: #fef3c7; color: #92400e; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .list { list-style: none; }
    .list li { padding: 4px 0; font-size: 0.875rem; }
    .list li::before { content: '✓ '; color: #059669; }
    .list-weak li::before { content: '! '; color: #d97706; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 0.8125rem; }
    th, td { border: 1px solid #e5e7eb; padding: 8px 10px; text-align: left; }
    th { background: #f9fafb; font-weight: 600; }
    .correct { color: #059669; font-weight: 600; }
    .incorrect { color: #dc2626; font-weight: 600; }
    .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #9ca3af; text-align: center; }
    .print-btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 0.875rem; margin-bottom: 24px; }
    .print-btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="header">
    <div>
      <h1>${studentName}</h1>
      <div class="header-info">
        Performance Cluster: <span class="badge ${perf.performanceCluster === 'advanced' ? 'badge-green' : perf.performanceCluster === 'struggling' ? 'badge-red' : 'badge-amber'}">${perf.performanceCluster}</span>
        &nbsp;&middot;&nbsp; Learning Pace: ${perf.pace}
        &nbsp;&middot;&nbsp; Style: ${perf.learningStyle ?? 'mixed'}
      </div>
    </div>
    <div class="header-info">Report generated: ${now}</div>
  </div>

  <h2>Key Metrics</h2>
  <div class="metrics">
    <div class="metric">
      <div class="metric-value blue">${perf.overallMetrics.averageScore}%</div>
      <div class="metric-label">Average Score</div>
    </div>
    <div class="metric">
      <div class="metric-value green">${perf.overallMetrics.completionRate}%</div>
      <div class="metric-label">Completion Rate</div>
    </div>
    <div class="metric">
      <div class="metric-value purple">${perf.overallMetrics.engagementScore}%</div>
      <div class="metric-label">Engagement</div>
    </div>
  </div>

  <h2>Strengths</h2>
  ${perf.subjectStrengths.length > 0
            ? `<ul class="list">${perf.subjectStrengths.map((s) => `<li>${s}</li>`).join('')}</ul>`
            : '<p style="font-size:0.875rem;color:#9ca3af">No specific strengths identified yet</p>'}

  <h2>Areas for Improvement</h2>
  ${perf.subjectWeaknesses.length > 0
            ? `<ul class="list list-weak">${perf.subjectWeaknesses.map((w) => `<li>${w}</li>`).join('')}</ul>`
            : '<p style="font-size:0.875rem;color:#9ca3af">No specific weaknesses identified</p>'}

  <h2>Common Mistakes</h2>
  ${perf.commonMistakes.length > 0
            ? `<table>
        <thead><tr><th>Mistake</th><th>Frequency</th><th>Last Occurred</th></tr></thead>
        <tbody>${perf.commonMistakes.map((m) => `<tr><td>${escapeHtml(m.type)}</td><td>${m.frequency}</td><td>${m.lastOccurred.toLocaleDateString()}</td></tr>`).join('')}</tbody>
      </table>`
            : '<p style="font-size:0.875rem;color:#9ca3af">No common mistakes recorded</p>'}

  <h2>Question-Level Detail</h2>
  ${questionLevel.totalQuestions > 0
            ? `<p style="font-size:0.875rem;margin-bottom:8px">${questionLevel.totalCorrect}/${questionLevel.totalQuestions} correct overall</p>
      <table>
        <thead><tr><th>Source</th><th>Question</th><th>Result</th><th>Points</th><th>Date</th></tr></thead>
        <tbody>${questionLevel.bySource
                .flatMap((src) => src.questions.map((q) =>
                    `<tr>
              <td>${src.sourceType}</td>
              <td style="font-family:monospace;font-size:0.75rem">${escapeHtml(q.questionId)}</td>
              <td class="${q.correct ? 'correct' : 'incorrect'}">${q.correct ? 'Correct' : 'Incorrect'}</td>
              <td>${q.pointsEarned}/${q.pointsMax}</td>
              <td>${q.completedAt.toLocaleDateString()}</td>
            </tr>`
                )).join('')}
        </tbody>
      </table>`
            : '<p style="font-size:0.875rem;color:#9ca3af">No per-question data available</p>'}

  <div class="footer">
    TutorMe Report · Generated ${now} · Confidential
  </div>
</body>
</html>`

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Disposition': `inline; filename="report-${studentName.replace(/\s+/g, '_')}.html"`,
        },
    })
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}
