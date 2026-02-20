'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  ArrowLeft,
  Download,
  Calendar,
  BookOpen,
  Target,
  Award,
  AlertCircle,
  Loader2,
  FileText,
  BarChart3,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ScoreDistributionChart } from '@/components/analytics/score-distribution-chart'
import { PerformanceTrendChart } from '@/components/analytics/performance-trend-chart'
import { SkillsRadarChart } from '@/components/analytics/skills-radar-chart'
import { TopicMasteryChart } from '@/components/analytics/topic-mastery-chart'

interface QuestionResultRow {
  sourceType: 'quiz' | 'task'
  sourceId: string
  sourceTitle?: string
  questionId: string
  correct: boolean
  pointsEarned: number
  pointsMax: number
  selectedAnswer?: unknown
  completedAt: string
}

interface QuestionLevelBreakdown {
  bySource: Array<{
    sourceType: 'quiz' | 'task'
    sourceId: string
    sourceTitle?: string
    completedAt: string
    questions: QuestionResultRow[]
  }>
  weakQuestionIds: string[]
  totalCorrect: number
  totalQuestions: number
}

interface StudentReportData {
  studentInfo: {
    id: string
    name?: string
    cluster: string
    pace: string
    learningStyle: string
  }
  overallMetrics: {
    averageScore: number
    completionRate: number
    participationRate: number
    attendanceRate: number
    engagementScore: number
    totalTasks: number
    completedTasks: number
  }
  charts: {
    scoreDistribution: { range: string; count: number }[]
    trendData: { date: string; score: number }[]
    skillsData: { skill: string; score: number; fullMark: number }[]
    topicMastery: { topic: string; mastery: number }[]
  }
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  questionLevel?: QuestionLevelBreakdown
}

export default function StudentReportPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params?.studentId as string

  const [isLoading, setIsLoading] = useState(true)
  const [reportData, setReportData] = useState<StudentReportData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!studentId) return

    const fetchReport = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/reports/students/${studentId}?includeQuestionLevel=true`)

        if (res.ok) {
          const result = await res.json()
          if (result.success) {
            setReportData(result.data)
          }
        } else {
          toast.error('Failed to load student report')
        }
      } catch (error) {
        console.error('Error fetching report:', error)
        toast.error('Error loading report')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [studentId])

  const handleExportReport = () => {
    window.open(`/api/reports/students/${studentId}/export`, '_blank')
  }

  const getClusterBadgeColor = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'struggling': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getClusterLabel = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return '优秀'
      case 'intermediate': return '中等'
      case 'struggling': return '需帮助'
      default: return cluster
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Report Not Found</h2>
            <p className="text-gray-500 mb-4">Unable to load student report data</p>
            <Link href="/tutor/reports">
              <Button>Back to Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { studentInfo, overallMetrics, charts, strengths, weaknesses, recommendations } = reportData

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/tutor/reports">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Student Report</h1>
              <p className="text-gray-500">Detailed performance analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportReport}>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Student Profile Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                  {studentInfo.name?.split(' ').map(n => n[0]).join('') || 'ST'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{studentInfo.name || `Student ${studentId.slice(-6)}`}</h2>
                  <Badge className={getClusterBadgeColor(studentInfo.cluster)}>
                    {getClusterLabel(studentInfo.cluster)}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Learning Pace: {studentInfo.pace}
                  </span>
                  <span className="flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    Style: {studentInfo.learningStyle}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{overallMetrics.averageScore}%</p>
                  <p className="text-sm text-gray-500">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{overallMetrics.completionRate}%</p>
                  <p className="text-sm text-gray-500">Completion</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{overallMetrics.engagementScore}%</p>
                  <p className="text-sm text-gray-500">Engagement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Target className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <FileText className="h-4 w-4" />
              Question-level detail
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Tasks</p>
                      <p className="text-3xl font-bold">{overallMetrics.totalTasks}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-3xl font-bold">{overallMetrics.completedTasks}</p>
                    </div>
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Participation</p>
                      <p className="text-3xl font-bold">{overallMetrics.participationRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Attendance</p>
                      <p className="text-3xl font-bold">{overallMetrics.attendanceRate}%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Performance across score ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScoreDistributionChart data={charts.scoreDistribution} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Score progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceTrendChart
                    data={charts.trendData.map(d => ({
                      date: d.date,
                      score: d.score,
                      classAverage: d.score - 5 // Simulate class average
                    }))}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Topic Mastery */}
            <Card>
              <CardHeader>
                <CardTitle>Topic Mastery</CardTitle>
                <CardDescription>Mastery level by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <TopicMasteryChart data={charts.topicMastery} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Radar</CardTitle>
                  <CardDescription>Multi-dimensional skill analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillsRadarChart data={charts.skillsData.map(s => ({
                    skill: s.skill,
                    score: s.score
                  }))} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                  <CardDescription>Areas of excellence and improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {strengths.length > 0 ? strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{strength}</span>
                        </li>
                      )) : (
                        <li className="text-sm text-gray-500">No specific strengths identified yet</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {weaknesses.length > 0 ? weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-0.5">!</span>
                          <span>{weakness}</span>
                        </li>
                      )) : (
                        <li className="text-sm text-gray-500">No specific weaknesses identified</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated suggestions based on performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-800">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Suggested Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>Review materials for {weaknesses[0] || 'core concepts'}</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span>Practice exercises at {studentInfo.pace} pace</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span>Advanced challenges in {strengths[0] || 'strong areas'}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center">1</span>
                      <span>Complete pending assignments</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center">2</span>
                      <span>Schedule class session for weak areas</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center">3</span>
                      <span>Join study group for peer learning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Question-level detail Tab */}
          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Question-level detail
                </CardTitle>
                <CardDescription>
                  How this student did on each question in quizzes and tasks. Use this for targeted decisions and support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reportData.questionLevel && reportData.questionLevel.bySource.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Total: {reportData.questionLevel.totalCorrect}/{reportData.questionLevel.totalQuestions} correct</span>
                      {reportData.questionLevel.weakQuestionIds.length > 0 && (
                        <span>Questions to review: {reportData.questionLevel.weakQuestionIds.length}</span>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="text-left p-3 font-medium">Source</th>
                            <th className="text-left p-3 font-medium">Question ID</th>
                            <th className="text-left p-3 font-medium">Result</th>
                            <th className="text-left p-3 font-medium">Points</th>
                            <th className="text-left p-3 font-medium">Completed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.questionLevel.bySource.flatMap((src) =>
                            src.questions.map((q) => (
                              <tr key={`${src.sourceId}-${q.questionId}`} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <span className="font-medium">{src.sourceType === 'quiz' ? 'Quiz' : 'Task'}</span>
                                  <span className="text-gray-500 ml-1 truncate max-w-[120px] inline-block align-bottom" title={src.sourceId}>{src.sourceId}</span>
                                </td>
                                <td className="p-3 font-mono text-xs">{q.questionId}</td>
                                <td className="p-3">
                                  {q.correct ? (
                                    <span className="text-green-600 font-medium">Correct</span>
                                  ) : (
                                    <span className="text-red-600 font-medium">Incorrect</span>
                                  )}
                                </td>
                                <td className="p-3">{q.pointsEarned}/{q.pointsMax}</td>
                                <td className="p-3 text-gray-500">{new Date(q.completedAt).toLocaleDateString()}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No per-question data yet. Data appears when students complete quizzes or tasks that record question-level results.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
