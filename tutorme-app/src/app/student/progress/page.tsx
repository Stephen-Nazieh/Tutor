'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Clock,
  Award,
  Zap,
  Flame,
  Star,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'

interface CourseProgress {
  id: string
  name: string
  totalLessons: number
  completedLessons: number
  inProgressLessons: number
  progress: number
  averageScore: number | null
  studyMinutes: number
}

interface TopicFrequency {
  topic: string
  count: number
}

interface ScoreTrendPoint {
  date: string
  score: number
}

interface AchievementItem {
  id: string
  type: string
  title: string
  description: string
  unlockedAt: string
  xpAwarded: number
}

interface ProgressData {
  overview: {
    lessonsCompleted: number
    totalLessons: number
    studyHours: number
    averageScore: number | null
    achievementCount: number
    submissionCount: number
    level: number
    xp: number
    streakDays: number
  }
  courses: CourseProgress[]
  strengths: TopicFrequency[]
  weaknesses: TopicFrequency[]
  scoreTrend: ScoreTrendPoint[]
  achievements: AchievementItem[]
  skillBreakdown: Record<string, number>
}

export default function StudentProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/student/progress')
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}><CardContent className="pt-6"><Skeleton className="h-16" /></CardContent></Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card><CardContent className="pt-6"><Skeleton className="h-64" /></CardContent></Card>
          <Card><CardContent className="pt-6"><Skeleton className="h-64" /></CardContent></Card>
        </div>
      </div>
    )
  }

  const overview = data?.overview
  const courses = data?.courses ?? []
  const strengths = data?.strengths ?? []
  const weaknesses = data?.weaknesses ?? []
  const scoreTrend = data?.scoreTrend ?? []
  const achievements = data?.achievements ?? []
  const skillBreakdown = data?.skillBreakdown ?? {}

  // Prepare skill radar data
  const radarData = Object.entries(skillBreakdown).map(([name, value]) => ({
    subject: name,
    score: value as number,
    fullMark: 100,
  }))

  // Format trend dates
  const trendData = scoreTrend.map((pt) => ({
    date: new Date(pt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: Math.round(pt.score),
  }))

  const achievementIcons: Record<string, typeof Trophy> = {
    streak: Flame,
    score: Star,
    completion: CheckCircle2,
    default: Trophy,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          My Progress
        </h1>
        <p className="text-gray-600 mt-1">
          Track your learning journey across all courses
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lessons Completed</p>
                <p className="text-2xl font-bold">
                  {overview?.lessonsCompleted ?? 0}
                  <span className="text-sm font-normal text-gray-400">
                    /{overview?.totalLessons ?? 0}
                  </span>
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Study Hours</p>
                <p className="text-2xl font-bold">{overview?.studyHours ?? 0}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold">
                  {overview?.averageScore != null ? `${overview.averageScore}%` : '—'}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Achievements</p>
                <p className="text-2xl font-bold">{overview?.achievementCount ?? 0}</p>
              </div>
              <Trophy className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-Course Progress */}
      {courses.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your completion and scores by course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {courses.map((course) => (
              <div key={course.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{course.name}</span>
                    {course.averageScore != null && (
                      <Badge variant="secondary" className="text-xs">
                        Avg: {course.averageScore}%
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <Progress value={course.progress} className="h-3" />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{course.progress}% complete</span>
                  <span className="text-xs text-gray-400">
                    {Math.round(course.studyMinutes / 60 * 10) / 10}h studied
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Score Trend Chart */}
        {trendData.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Score Trend
              </CardTitle>
              <CardDescription>Your performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#888' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: '#888' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Score']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#3b82f6' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Skill Radar */}
        {radarData.length >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Skill Breakdown
              </CardTitle>
              <CardDescription>Your strengths across different skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#666' }} />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#999' }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Strengths
            </CardTitle>
            <CardDescription>Topics you excel at</CardDescription>
          </CardHeader>
          <CardContent>
            {strengths.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                Complete more tasks to discover your strengths
              </p>
            ) : (
              <div className="space-y-3">
                {strengths.map((s) => (
                  <div key={s.topic} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">{s.topic}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">{s.count} tasks</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-500" />
              Areas to Improve
            </CardTitle>
            <CardDescription>Topics that need more practice</CardDescription>
          </CardHeader>
          <CardContent>
            {weaknesses.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No weak areas identified yet — keep it up!
              </p>
            ) : (
              <div className="space-y-3">
                {weaknesses.map((w) => (
                  <div key={w.topic} className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">{w.topic}</span>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">{w.count} tasks</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Achievements
          </CardTitle>
          <CardDescription>Milestones and badges you&apos;ve earned</CardDescription>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-gray-700">No achievements yet</p>
              <p className="text-sm mt-1">Complete tasks and quizzes to earn badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const IconComponent = achievementIcons[achievement.type] || achievementIcons.default
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 truncate">{achievement.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          +{achievement.xpAwarded} XP
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
