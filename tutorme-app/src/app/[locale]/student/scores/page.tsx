'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import {
  ChevronLeft,
  Trophy,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
  BarChart3,
  CheckCircle2,
  Circle,
  AlertCircle,
  Brain,
  Zap,
  Users
} from 'lucide-react'
import { SkillRadar, ConfidenceTracker, XpBar, DailyQuestsWidget } from '@/components/gamification'

interface ScoreData {
  id: string
  subject: string
  subjectName: string
  totalScore: number
  maxScore: number
  percentage: number
  grade: string
  assignmentsCompleted: number
  assignmentsTotal: number
  quizzesCompleted: number
  quizzesTotal: number
  lastActivity: string
  trend: 'up' | 'down' | 'stable'
}

interface QuizResult {
  id: string
  quizTitle: string
  subject: string
  score: number
  maxScore: number
  percentage: number
  completedAt: string
  timeSpent: number
  status: 'passed' | 'failed' | 'incomplete'
}

interface AssignmentResult {
  id: string
  assignmentTitle: string
  subject: string
  score: number | null
  maxScore: number
  status: 'submitted' | 'graded' | 'pending'
  submittedAt: string | null
  dueDate: string
}

interface SkillProgress {
  name: string
  level: number
  maxLevel: number
  xp: number
  nextLevelXp: number
}

interface SubjectProgressDetail {
  id: string
  name: string
  subject: string
  description: string
  progress: number
  confidence: number
  xp: number
  level: number
  streakDays: number
  skills: Record<string, number>
  conceptMastery?: { concept: string; score: number; totalQuestions: number; correctAnswers: number }[]
  recentLessons: { id: string; title: string; completed: boolean; score?: number }[]
  totalLessons: number
  completedLessons: number
}

interface SubjectListItem {
  id: string
  name: string
  subject: string
  progress: number
}

function ProgressTabContent({
  subjectList,
  selectedSubjectCode,
  setSelectedSubjectCode,
  subjectDetail,
  progressTabLoading,
  onLoadSubjectList
}: {
  subjectList: SubjectListItem[]
  selectedSubjectCode: string | null
  setSelectedSubjectCode: (code: string | null) => void
  subjectDetail: SubjectProgressDetail | null
  progressTabLoading: boolean
  onLoadSubjectList: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    if (subjectList.length === 0) onLoadSubjectList()
  }, [subjectList.length, onLoadSubjectList])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (subjectList.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No courses yet</h3>
          <p className="text-sm text-gray-500 mt-1">Enroll in a course to see your progress here</p>
          <Button className="mt-4" asChild>
            <Link href="/student/subjects/browse">Browse subjects</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Course:</span>
        <Select
          value={selectedSubjectCode ?? ''}
          onValueChange={(v) => setSelectedSubjectCode(v || null)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {subjectList.map((s) => (
              <SelectItem key={s.id} value={s.subject}>
                {s.name} ({s.progress}%)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {progressTabLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-pulse text-gray-500">Loading progress…</div>
          </CardContent>
        </Card>
      ) : !subjectDetail ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Select a course to view progress
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Progress</span>
                </div>
                <p className="text-3xl font-bold mt-2">{subjectDetail.progress}%</p>
                <Progress value={subjectDetail.progress} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Confidence</span>
                </div>
                <p className="text-3xl font-bold mt-2">{subjectDetail.confidence}%</p>
                <p className="text-xs text-gray-500 mt-1">Based on quiz performance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Level</span>
                </div>
                <p className="text-3xl font-bold mt-2">{subjectDetail.level}</p>
                <p className="text-xs text-gray-500 mt-1">{subjectDetail.xp} XP earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Streak</span>
                </div>
                <p className="text-3xl font-bold mt-2">{subjectDetail.streakDays} days</p>
                <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <XpBar
              level={subjectDetail.level}
              xp={subjectDetail.xp}
              xpToNextLevel={Math.floor(subjectDetail.xp * 0.2)}
              progress={(subjectDetail.xp % 1000) / 10}
              streakDays={subjectDetail.streakDays}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Skills Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SkillRadar skills={subjectDetail.skills} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Confidence Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ConfidenceTracker score={subjectDetail.confidence} weeklyChange={5} />
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Skill confidence</p>
                  {Object.entries(subjectDetail.skills).slice(0, 4).map(([skill, score]) => (
                    <div key={skill} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm capitalize">{skill.replace('_', ' ')}</span>
                      <Badge variant={score >= 70 ? 'default' : score >= 50 ? 'secondary' : 'outline'}>
                        {score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {subjectDetail.subject.toLowerCase() === 'math' && subjectDetail.conceptMastery && subjectDetail.conceptMastery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Concept Mastery
                </CardTitle>
                <CardDescription>Track your understanding of key mathematical concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectDetail.conceptMastery.map((concept) => (
                    <div key={concept.concept} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{concept.concept}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {concept.correctAnswers}/{concept.totalQuestions} correct
                          </span>
                          <span className={`px-2 py-1 rounded text-sm font-semibold ${getScoreColor(concept.score)}`}>
                            {concept.score}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(concept.score)}`}
                          style={{ width: `${concept.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjectDetail.recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={lesson.completed ? 'text-gray-900' : 'text-gray-500'}>{lesson.title}</span>
                    </div>
                    {lesson.score != null && (
                      <Badge variant={lesson.score >= 80 ? 'default' : 'secondary'}>{lesson.score}%</Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/student/subjects/${encodeURIComponent(subjectDetail.subject)}/chat`}>Ask AI Tutor</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/student/classes?subject=${encodeURIComponent(subjectDetail.subject)}`}>View classes</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/student/study-groups">Study groups</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <DailyQuestsWidget
              quests={[]}
              completedCount={0}
              totalXp={0}
              onQuestClick={() => router.push('/student/missions')}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default function ScoresPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState<ScoreData[]>([])
  const [quizzes, setQuizzes] = useState<QuizResult[]>([])
  const [assignments, setAssignments] = useState<AssignmentResult[]>([])
  const [skills, setSkills] = useState<SkillProgress[]>([])
  const [overallStats, setOverallStats] = useState({
    totalSubjects: 0,
    averageScore: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
    studyHours: 0
  })
  const [subjectList, setSubjectList] = useState<SubjectListItem[]>([])
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null)
  const [subjectDetail, setSubjectDetail] = useState<SubjectProgressDetail | null>(null)
  const [progressTabLoading, setProgressTabLoading] = useState(false)

  useEffect(() => {
    fetchScoresData()
  }, [])

  useEffect(() => {
    if (selectedSubjectCode) {
      fetchSubjectDetail(selectedSubjectCode)
    } else {
      setSubjectDetail(null)
    }
  }, [selectedSubjectCode])

  const fetchSubjectList = async () => {
    try {
      const res = await fetch('/api/student/subjects')
      const data = await res.json()
      if (data.subjects) {
        setSubjectList(data.subjects.map((s: SubjectListItem) => ({ id: s.id, name: s.name, subject: s.subject, progress: s.progress })))
        if (data.subjects.length > 0 && !selectedSubjectCode) {
          setSelectedSubjectCode(data.subjects[0].subject)
        }
      }
    } catch {
      // ignore
    }
  }

  const fetchSubjectDetail = async (subjectCode: string) => {
    try {
      setProgressTabLoading(true)
      const res = await fetch(`/api/student/subjects/${encodeURIComponent(subjectCode)}`)
      const data = await res.json()
      if (data.subject) {
        setSubjectDetail(data.subject)
      } else {
        setSubjectDetail(null)
      }
    } catch {
      setSubjectDetail(null)
    } finally {
      setProgressTabLoading(false)
    }
  }

  const fetchScoresData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/student/scores')
      const data = await res.json()

      if (data.success) {
        setScores(data.scores || [])
        setQuizzes(data.quizzes || [])
        setAssignments(data.assignments || [])
        setSkills(data.skills || [])
        setOverallStats(data.overallStats || {
          totalSubjects: 0,
          averageScore: 0,
          totalQuizzes: 0,
          totalAssignments: 0,
          studyHours: 0
        })
      } else {
        toast.error(data.error || 'Failed to load scores')
      }
    } catch (error) {
      console.error('Error fetching scores:', error)
      toast.error('Failed to load scores data')
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A': return 'bg-green-500 hover:bg-green-600'
      case 'B': return 'bg-blue-500 hover:bg-blue-600'
      case 'C': return 'bg-yellow-500 hover:bg-yellow-600'
      case 'D': return 'bg-orange-500 hover:bg-orange-600'
      case 'F': return 'bg-red-500 hover:bg-red-600'
      default: return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default: return <div className="w-4 h-4 rounded-full bg-gray-300" />
    }
  }

  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push('/student/dashboard')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">My Scores</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-32" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push('/student/dashboard')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h1 className="text-2xl font-bold">My Scores</h1>
              <p className="text-gray-500 text-sm">View your performance across all subjects</p>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Subjects</p>
                  <p className="text-2xl font-bold">{overallStats.totalSubjects}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <BookOpen className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Quizzes</p>
                  <p className="text-2xl font-bold">{overallStats.totalQuizzes}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Assignments</p>
                  <p className="text-2xl font-bold">{overallStats.totalAssignments}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Study Hours</p>
                  <p className="text-2xl font-bold">{overallStats.studyHours}h</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="subjects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-[500px]">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-4">
            {scores.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No scores yet</h3>
                  <p className="text-sm text-gray-500 mt-1">Complete quizzes and assignments to see your scores</p>
                  <Button className="mt-4" asChild>
                    <Link href="/student/subjects/browse">Start Learning</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scores.map((score) => (
                  <Card key={score.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{score.subjectName}</CardTitle>
                          <CardDescription>Last activity: {new Date(score.lastActivity).toLocaleDateString()}</CardDescription>
                        </div>
                        <Badge className={getGradeColor(score.grade)}>{score.grade}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-500">Overall Score</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{score.percentage}%</span>
                            {getTrendIcon(score.trend)}
                          </div>
                        </div>
                        <Progress value={score.percentage} className="h-2" />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-purple-500" />
                          <div className="text-sm">
                            <span className="text-gray-500">Quizzes: </span>
                            <span className="font-medium">{score.quizzesCompleted}/{score.quizzesTotal}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <div className="text-sm">
                            <span className="text-gray-500">Assignments: </span>
                            <span className="font-medium">{score.assignmentsCompleted}/{score.assignmentsTotal}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Progress Tab (course progress, skills, recent lessons - moved from Enter classroom page) */}
          <TabsContent value="progress" className="space-y-4">
            <ProgressTabContent
              subjectList={subjectList}
              selectedSubjectCode={selectedSubjectCode}
              setSelectedSubjectCode={setSelectedSubjectCode}
              subjectDetail={subjectDetail}
              progressTabLoading={progressTabLoading}
              onLoadSubjectList={fetchSubjectList}
            />
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            {quizzes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No quizzes completed yet</h3>
                  <p className="text-sm text-gray-500 mt-1">Take quizzes to test your knowledge and track your progress</p>
                  <Button className="mt-4" asChild>
                    <Link href="/student/subjects/browse">Browse Subjects</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{quiz.quizTitle}</h4>
                            <Badge variant="outline">{quiz.subject}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Completed {new Date(quiz.completedAt).toLocaleDateString()} • {formatTimeSpent(quiz.timeSpent)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-lg font-bold ${quiz.status === 'passed' ? 'text-green-600' : quiz.status === 'failed' ? 'text-red-600' : 'text-gray-600'}`}>
                              {quiz.score}/{quiz.maxScore}
                            </p>
                            <p className="text-xs text-gray-500">{quiz.percentage}%</p>
                          </div>
                          {quiz.status === 'passed' ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : quiz.status === 'failed' ? (
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            {assignments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No assignments yet</h3>
                  <p className="text-sm text-gray-500 mt-1">Complete assignments to track your progress</p>
                  <Button className="mt-4" asChild>
                    <Link href="/student/subjects/browse">Find Assignments</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{assignment.assignmentTitle}</h4>
                            <Badge variant="outline">{assignment.subject}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          {assignment.status === 'graded' && assignment.score !== null ? (
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">
                                {assignment.score}/{assignment.maxScore}
                              </p>
                              <p className="text-xs text-gray-500">Graded</p>
                            </div>
                          ) : (
                            <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'}>
                              {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                            </Badge>
                          )}
                          {assignment.status === 'graded' ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : assignment.status === 'submitted' ? (
                            <Clock className="w-6 h-6 text-yellow-500" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            {skills.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No skills data yet</h3>
                  <p className="text-sm text-gray-500 mt-1">Practice and learn to develop your skills</p>
                  <Button className="mt-4" asChild>
                    <Link href="/student/ai-tutor">Start with AI Tutor</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <Card key={skill.name}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline">Level {skill.level}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={(skill.xp / skill.nextLevelXp) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{skill.xp} XP</span>
                          <span>{skill.nextLevelXp} XP to next level</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
