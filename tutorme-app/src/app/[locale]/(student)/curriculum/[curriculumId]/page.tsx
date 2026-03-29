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
import {
  PreferenceEnrollmentDialog,
  type ScheduleItem,
} from '@/components/curriculum/PreferenceEnrollmentDialog'
import {
  BookOpen,
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  Lock,
  Target,
  ArrowLeft,
  GraduationCap,
  Clock4,
  Award,
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'

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
  price?: number | null
  currency?: string | null
  tutorId?: string
  tutorName?: string
  tutorUsername?: string
  rating?: number
  reviewCount?: number
  coursePitch?: string | null
  schedule?: ScheduleItem[]
  isFree?: boolean
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
  expert: 'bg-purple-100 text-purple-800',
}

const SECTION_NAMES: Record<string, string> = {
  introduction: 'Introduction',
  concept: 'Concept',
  example: 'Example',
  practice: 'Practice',
  review: 'Review',
}

const renderMarkdown = (text: string) => {
  return text
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 text-slate-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-800">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-4">$&</ul>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/🎯|📚|👥|🎓|🏆|⭐|📝|🚀/g, '<span class="text-lg">$&</span>')
}

export default function CurriculumDetailPage() {
  const params = useParams()
  const curriculumId = params.curriculumId as string

  const [curriculum, setCurriculum] = useState<CurriculumDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [isFavorited, setIsFavorited] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [showPreferenceDialog, setShowPreferenceDialog] = useState(false)

  useEffect(() => {
    loadCurriculum()
    checkFavorites()
    checkEnrollment()
  }, [curriculumId])

  const checkFavorites = () => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setIsFavorited(parsed.courses?.includes(curriculumId) || false)
      } catch {
        // ignore
      }
    }
  }

  const checkEnrollment = async () => {
    try {
      const res = await fetch(`/api/student/enrollments/check?curriculumId=${curriculumId}`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setIsEnrolled(data.isEnrolled || false)
      }
    } catch {
      // ignore
    }
  }

  const toggleFavorite = () => {
    const saved = localStorage.getItem('tutorme-favorites')
    const parsed = saved ? JSON.parse(saved) : { tutors: [], courses: [] }

    if (isFavorited) {
      parsed.courses = parsed.courses.filter((id: string) => id !== curriculumId)
      toast.success('Removed from favorites')
    } else {
      parsed.courses = [...(parsed.courses || []), curriculumId]
      toast.success('Added to favorites')
    }

    localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
    setIsFavorited(!isFavorited)
  }

  const handleEnroll = () => {
    setShowPreferenceDialog(true)
  }

  const loadCurriculum = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/curriculum/${curriculumId}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCurriculum({
          ...data.curriculum,
          rating: data.curriculum.rating || null,
          reviewCount: data.curriculum.reviewCount || 0,
          price: data.curriculum.price || 0,
          currency: data.curriculum.currency || 'USD',
        })
        // Expand first module by default
        if (data.curriculum.modules && data.curriculum.modules.length > 0) {
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
    if (!curriculum || !curriculum.modules) return null

    for (const module of curriculum.modules) {
      if (!module.lessons) continue
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Course not found</h3>
          <p className="mb-4 text-gray-600">This course does not exist or has been removed.</p>
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
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/curriculum"
            className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to courses
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{curriculum.name}</h1>
                <Badge className={DIFFICULTY_COLORS[curriculum.difficulty]}>
                  {curriculum.difficulty === 'beginner' && 'Beginner'}
                  {curriculum.difficulty === 'intermediate' && 'Intermediate'}
                  {curriculum.difficulty === 'advanced' && 'Advanced'}
                  {curriculum.difficulty === 'expert' && 'Expert'}
                </Badge>
              </div>
              <p className="max-w-2xl text-gray-600">{curriculum.description}</p>

              <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{curriculum.modules?.length || 0} modules</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>{curriculum.progress?.totalLessons || 0} lessons</span>
                </div>
                {curriculum.hasOutline && curriculum.estimatedHours > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock4 className="h-4 w-4" />
                    <span>{curriculum.estimatedHours} hours</span>
                  </div>
                )}
                {curriculum.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>
                      {curriculum.rating.toFixed(1)} ({curriculum.reviewCount} reviews)
                    </span>
                  </div>
                )}
                {curriculum.progress.averageScore && (
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Avg score: {Math.round(curriculum.progress.averageScore)}%</span>
                  </div>
                )}
              </div>

              {curriculum.tutorName && (
                <div className="mt-3">
                  <Link
                    href={curriculum.tutorUsername ? `/u/${curriculum.tutorUsername}` : '#'}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    By {curriculum.tutorName}
                  </Link>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFavorite}
                className={isFavorited ? 'text-red-500' : ''}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500' : ''}`} />
              </Button>

              {isEnrolled ? (
                nextLesson && (
                  <Link href={`/student/feedback`}>
                    <Button size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      {nextLesson.status === 'IN_PROGRESS' ? 'Continue' : 'Start learning'}
                    </Button>
                  </Link>
                )
              ) : (
                <div className="flex flex-col items-end gap-2">
                  {curriculum.isFree ? (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-600">Free</span>
                    </div>
                  ) : (
                    curriculum.price && (
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {curriculum.currency === 'USD' ? '$' : curriculum.currency + ' '}
                          {curriculum.price}
                        </span>
                      </div>
                    )
                  )}
                  {curriculum.isFree && (
                    <div className="text-right">
                      <span className="text-sm text-emerald-700">
                        No payment required to enroll.
                      </span>
                    </div>
                  )}
                  <Button size="lg" className="gap-2" onClick={handleEnroll}>
                    <ShoppingCart className="h-5 w-5" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Overall Progress */}
          {isEnrolled && (
            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overall progress</span>
                <span className="text-sm font-medium text-gray-900">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <p className="mt-2 text-sm text-gray-500">
                Completed {curriculum.progress.lessonsCompleted} /{' '}
                {curriculum.progress.totalLessons} lessons
                {curriculum.progress.startedAt && (
                  <span className="ml-4">
                    Started: {new Date(curriculum.progress.startedAt).toLocaleDateString('en-US')}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </header>

      {curriculum && (
        <PreferenceEnrollmentDialog
          open={showPreferenceDialog}
          onOpenChange={setShowPreferenceDialog}
          curriculumId={curriculum.id}
          curriculumName={curriculum.name}
          availabilitySlots={curriculum.schedule ?? []}
        />
      )}

      {/* Course Pitch */}
      {curriculum.coursePitch && (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                About This Course
              </CardTitle>
              <CardDescription>Everything you need to know before enrolling</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-slate prose-indigo max-w-none"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(curriculum.coursePitch),
                }}
              />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Modules */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {curriculum.modules?.map((module, moduleIndex) => {
            const isExpanded = expandedModules.has(module.id)
            const moduleProgress = module.lessons?.length 
              ? Math.round((module.lessons.filter(l => l.status === 'COMPLETED').length / module.lessons.length) * 100)
              : 0

            return (
              <Card key={module.id} className="overflow-hidden">
                <div
                  className="cursor-pointer bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
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
                          {module.lessons.filter(l => l.status === 'COMPLETED').length} /{' '}
                          {module.lessons.length} lessons
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {module.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 transition-colors hover:bg-gray-50 ${
                          module.lessons && lessonIndex !== module.lessons.length - 1
                            ? 'border-b border-gray-100'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              lesson.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-600'
                                : lesson.status === 'IN_PROGRESS'
                                  ? 'bg-indigo-100 text-indigo-600'
                                  : lesson.isLocked
                                    ? 'bg-gray-100 text-gray-400'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {lesson.status === 'COMPLETED' ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : lesson.isLocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-medium">{lessonIndex + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4
                              className={`font-medium ${
                                lesson.isLocked ? 'text-gray-400' : 'text-gray-900'
                              }`}
                            >
                              {lesson.title}
                            </h4>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration} min
                              </span>
                              {lesson.progress?.currentSection &&
                                lesson.status === 'IN_PROGRESS' && (
                                  <span className="text-indigo-600">
                                    Current:{' '}
                                    {SECTION_NAMES[lesson.progress.currentSection] ||
                                      lesson.progress.currentSection}
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

                        {!lesson.isLocked && isEnrolled && (
                          <Link href={`/student/feedback`}>
                            <Button
                              variant={lesson.status === 'COMPLETED' ? 'outline' : 'default'}
                              size="sm"
                            >
                              {lesson.status === 'COMPLETED'
                                ? 'Review'
                                : lesson.status === 'IN_PROGRESS'
                                  ? 'Continue'
                                  : 'Start'}
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
