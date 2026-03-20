'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Route,
  BookOpen,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
  Circle,
} from 'lucide-react'

interface LessonEntry {
  lessonId: string
  title: string
  description: string | null
  duration: number
  courseName: string
  courseId: string
  moduleTitle: string
  status: 'completed' | 'in_progress' | 'not_started'
  score: number | null
}

interface FocusArea {
  topic: string
  frequency: number
}

interface LearningPathData {
  currentLesson: LessonEntry | null
  nextLessons: LessonEntry[]
  focusAreas: FocusArea[]
  completedCount: number
  totalCount: number
  progressPercent: number
}

export function LearningPathCard() {
  const [data, setData] = useState<LearningPathData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/student/learning-path')
      .then(r => r.json())
      .then(res => {
        if (res.success) setData(res.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="mb-8 animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-5 w-40 rounded bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-16 rounded bg-gray-100" />
            <div className="h-12 rounded bg-gray-100" />
            <div className="h-12 rounded bg-gray-100" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.totalCount === 0) return null

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-green-500" />
    if (status === 'in_progress') return <PlayCircle className="h-4 w-4 text-blue-500" />
    return <Circle className="h-4 w-4 text-gray-300" />
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Route className="h-5 w-5 text-indigo-500" />
            Your Learning Path
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              {data.completedCount}/{data.totalCount} lessons
            </span>
            <Badge variant="secondary" className="text-xs">
              {data.progressPercent}%
            </Badge>
          </div>
        </div>
        <Progress value={data.progressPercent} className="mt-2 h-1.5" />
      </CardHeader>
      <CardContent>
        {/* Current lesson */}
        {data.currentLesson && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              {data.currentLesson.status === 'in_progress'
                ? 'Continue where you left off'
                : 'Start here'}
            </p>
            <Link href={`/student/learn/${data.currentLesson.lessonId}`}>
              <div className="flex items-center gap-3 rounded-lg border-2 border-blue-200 bg-blue-50/50 p-3 transition-colors hover:bg-blue-50">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium">{data.currentLesson.title}</h4>
                  <p className="text-xs text-gray-500">
                    {data.currentLesson.courseName} · {data.currentLesson.moduleTitle}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {data.currentLesson.duration}m
                </div>
                <ChevronRight className="h-4 w-4 text-blue-400" />
              </div>
            </Link>
          </div>
        )}

        {/* Next lessons */}
        {data.nextLessons.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              Up next
            </p>
            <div className="space-y-1.5">
              {data.nextLessons.map((lesson, idx) => (
                <div
                  key={lesson.lessonId}
                  className="flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-gray-50"
                >
                  <span className="w-5 text-center text-xs font-medium text-gray-400">
                    {idx + 1}
                  </span>
                  {statusIcon(lesson.status)}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{lesson.title}</p>
                    <p className="truncate text-xs text-gray-400">{lesson.courseName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {lesson.duration}m
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Focus areas */}
        {data.focusAreas.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              Focus areas
            </p>
            <div className="flex flex-wrap gap-2">
              {data.focusAreas.map(area => (
                <Badge
                  key={area.topic}
                  variant="outline"
                  className="gap-1 border-orange-200 bg-orange-50 text-xs text-orange-700"
                >
                  <AlertTriangle className="h-3 w-3" />
                  {area.topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
