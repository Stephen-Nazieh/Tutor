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
            .then((r) => r.json())
            .then((res) => {
                if (res.success) setData(res.data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Card className="mb-8 animate-pulse">
                <CardHeader className="pb-3">
                    <div className="h-5 bg-gray-200 rounded w-40" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="h-16 bg-gray-100 rounded" />
                        <div className="h-12 bg-gray-100 rounded" />
                        <div className="h-12 bg-gray-100 rounded" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!data || data.totalCount === 0) return null

    const statusIcon = (status: string) => {
        if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-500" />
        if (status === 'in_progress') return <PlayCircle className="w-4 h-4 text-blue-500" />
        return <Circle className="w-4 h-4 text-gray-300" />
    }

    return (
        <Card className="mb-8">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Route className="w-5 h-5 text-indigo-500" />
                        Your Learning Path
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{data.completedCount}/{data.totalCount} lessons</span>
                        <Badge variant="secondary" className="text-xs">{data.progressPercent}%</Badge>
                    </div>
                </div>
                <Progress value={data.progressPercent} className="h-1.5 mt-2" />
            </CardHeader>
            <CardContent>
                {/* Current lesson */}
                {data.currentLesson && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            {data.currentLesson.status === 'in_progress' ? 'Continue where you left off' : 'Start here'}
                        </p>
                        <Link href={`/student/learn/${data.currentLesson.lessonId}`}>
                            <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <PlayCircle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{data.currentLesson.title}</h4>
                                    <p className="text-xs text-gray-500">
                                        {data.currentLesson.courseName} · {data.currentLesson.moduleTitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    {data.currentLesson.duration}m
                                </div>
                                <ChevronRight className="w-4 h-4 text-blue-400" />
                            </div>
                        </Link>
                    </div>
                )}

                {/* Next lessons */}
                {data.nextLessons.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Up next</p>
                        <div className="space-y-1.5">
                            {data.nextLessons.map((lesson, idx) => (
                                <div
                                    key={lesson.lessonId}
                                    className="flex items-center gap-3 p-2.5 rounded-lg border hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-xs font-medium text-gray-400 w-5 text-center">{idx + 1}</span>
                                    {statusIcon(lesson.status)}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm truncate">{lesson.title}</p>
                                        <p className="text-xs text-gray-400 truncate">{lesson.courseName}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
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
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            Focus areas
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {data.focusAreas.map((area) => (
                                <Badge
                                    key={area.topic}
                                    variant="outline"
                                    className="text-xs border-orange-200 text-orange-700 bg-orange-50 gap-1"
                                >
                                    <AlertTriangle className="w-3 h-3" />
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
