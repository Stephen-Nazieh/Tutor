/**
 * Curriculum Detail Page
 * View curriculum modules and lessons, track progress
 */

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Play,
  CheckCircle2,
  Lock,
  Target,
  BarChart3,
  ArrowLeft,
  GraduationCap,
  Clock4,
  Award
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  description: string | null
  duration: number
  difficulty: string
  order: number
  prerequisiteLessonIds: string[]
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  progress?: {
    currentSection: string
    completedAt: string | null
    score: number | null
  }
  isLocked: boolean
}

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

interface CurriculumDetail {
  id: string
  name: string
  description: string | null
  subject: string
  difficulty: string
  estimatedHours: number
  hasOutline?: boolean
  progress: {
    lessonsCompleted: number
    totalLessons: number
    averageScore: number | null
    isCompleted: boolean
    startedAt: string | null
  }
  modules: Module[]
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
  expert: 'bg-purple-100 text-purple-800'
}

const SECTION_NAMES: Record<string, string> = {
  introduction: 'Introduction',
  concept: 'Concept',
  example: 'Example',
  practice: 'Practice',
  review: 'Review'
}

export default function CurriculumDetailPage() {
  const params = useParams()
  const curriculumId = params.curriculumId as string
  
  const [curriculum, setCurriculum] = useState<CurriculumDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadCurriculum()
  }, [curriculumId])

  const loadCurriculum = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/curriculum/${curriculumId}`)
      if (res.ok) {
        const data = await res.json()
        setCurriculum(data.curriculum)
        // Expand first module by default
        if (data.curriculum.modules.length > 0) {
          setExpandedModules(new Set([data.curriculum.modules[0].id]))
        }
      }
    } catch (error) {
      console.error('Failed to load curriculum:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const getNextLesson = () => {
    if (!curriculum) return null
    
    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        if (lesson.status === 'NOT_STARTED' && !lesson.isLocked) {
          return lesson
        }
        if (lesson.status === 'IN_PROGRESS') {
          return lesson
        }
      }
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
          <p className="text-gray-600 mb-4">This course does not exist or has been removed.</p>
          <Link href="/curriculum">
            <Button>Back to courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progressPercent = Math.round(
    (curriculum.progress.lessonsCompleted / curriculum.progress.totalLessons) * 100
  )
  const nextLesson = getNextLesson()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/curriculum" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to courses
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{curriculum.name}</h1>
                <Badge className={DIFFICULTY_COLORS[curriculum.difficulty]}>
                  {curriculum.difficulty === 'beginner' && 'Beginner'}
                  {curriculum.difficulty === 'intermediate' && 'Intermediate'}
                  {curriculum.difficulty === 'advanced' && 'Advanced'}
                  {curriculum.difficulty === 'expert' && 'Expert'}
                </Badge>
              </div>
              <p className="text-gray-600 max-w-2xl">{curriculum.description}</p>
              
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{curriculum.modules.length} modules</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>{curriculum.progress.totalLessons} lessons</span>
                </div>
                {curriculum.hasOutline && curriculum.estimatedHours > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock4 className="w-4 h-4" />
                    <span>{curriculum.estimatedHours} hours</span>
                  </div>
                )}
                {curriculum.progress.averageScore && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>Avg score: {Math.round(curriculum.progress.averageScore)}%</span>
                  </div>
                )}
              </div>
            </div>

            {nextLesson && (
              <Link href={`/curriculum/lessons/${nextLesson.id}`}>
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  {nextLesson.status === 'IN_PROGRESS' ? 'Continue' : 'Start learning'}
                </Button>
              </Link>
            )}
          </div>

          {/* Overall Progress */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall progress</span>
              <span className="text-sm font-medium text-gray-900">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">
              Completed {curriculum.progress.lessonsCompleted} / {curriculum.progress.totalLessons} lessons
              {curriculum.progress.startedAt && (
                <span className="ml-4">
                  Started: {new Date(curriculum.progress.startedAt).toLocaleDateString('en-US')}
                </span>
              )}
            </p>
          </div>
        </div>
      </header>

      {/* Modules */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {curriculum.modules.map((module, moduleIndex) => {
            const isExpanded = expandedModules.has(module.id)
            const moduleProgress = Math.round(
              (module.lessons.filter(l => l.status === 'COMPLETED').length / module.lessons.length) * 100
            )

            return (
              <Card key={module.id} className="overflow-hidden">
                <div 
                  className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {moduleIndex + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">{moduleProgress}%</p>
                        <p className="text-xs text-gray-500">
                          {module.lessons.filter(l => l.status === 'COMPLETED').length} / {module.lessons.length} lessons
                        </p>
                      </div>
                      <ChevronRight 
                        className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                          lessonIndex !== module.lessons.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.status === 'COMPLETED' 
                              ? 'bg-green-100 text-green-600' 
                              : lesson.status === 'IN_PROGRESS'
                              ? 'bg-indigo-100 text-indigo-600'
                              : lesson.isLocked
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {lesson.status === 'COMPLETED' ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : lesson.isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-medium">{lessonIndex + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              lesson.isLocked ? 'text-gray-400' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lesson.duration} min
                              </span>
                              {lesson.progress?.currentSection && lesson.status === 'IN_PROGRESS' && (
                                <span className="text-indigo-600">
                                  Current: {SECTION_NAMES[lesson.progress.currentSection] || lesson.progress.currentSection}
                                </span>
                              )}
                              {lesson.progress?.score && (
                                <span className="text-green-600">
                                  Score: {Math.round(lesson.progress.score)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!lesson.isLocked && (
                          <Link href={`/curriculum/lessons/${lesson.id}`}>
                            <Button 
                              variant={lesson.status === 'COMPLETED' ? 'outline' : 'default'}
                              size="sm"
                            >
                              {lesson.status === 'COMPLETED' ? 'Review' : 
                               lesson.status === 'IN_PROGRESS' ? 'Continue' : 'Start'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
