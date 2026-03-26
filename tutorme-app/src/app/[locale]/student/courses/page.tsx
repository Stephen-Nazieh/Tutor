/**
 * Curriculum Listing Page
 * Browse and enroll in available curriculums
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
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
  Trophy,
  Target,
  GraduationCap,
  Code,
  Calculator,
  FlaskConical,
  Globe,
  ArrowLeft,
  Heart,
} from 'lucide-react'

interface Curriculum {
  id: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  hasOutline?: boolean
  _count: {
    modules: number
    lessons: number
    batches: number
  }
  availability: {
    summary: string | null
    slots: ScheduleItem[]
  }
  progress?: {
    lessonsCompleted: number
    totalLessons: number
    averageScore: number | null
    isCompleted: boolean
  }
  enrollment?: {
    startDate: string | null
  }
}

const SUBJECT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mathematics: Calculator,
  programming: Code,
  science: FlaskConical,
  language: Globe,
  default: BookOpen,
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
  expert: 'bg-purple-100 text-purple-800 border-purple-200',
}

export default function CurriculumPage() {
  const { data: session } = useSession()
  const isTutor = session?.user?.role === 'TUTOR'
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'in-progress' | 'favorites' | 'completed'
  >('all')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Curriculum | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('tutorme-favorites')
      if (saved) {
        const parsed = JSON.parse(saved)
        setFavoriteIds(parsed.courses || [])
      }
    } catch {
      // Ignore
    }
  }

  const toggleFavorite = (courseId: string) => {
    try {
      const saved = localStorage.getItem('tutorme-favorites')
      let parsed = { courses: [] as string[] }
      if (saved) {
        parsed = JSON.parse(saved)
      }
      if (parsed.courses.includes(courseId)) {
        parsed.courses = parsed.courses.filter(id => id !== courseId)
      } else {
        parsed.courses.push(courseId)
      }
      localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
      setFavoriteIds(parsed.courses)
      // Manually dispatch storage event to hit other tabs if needed, though state is updated locally!
      window.dispatchEvent(new Event('storage'))
    } catch {
      // Ignore
    }
  }

  useEffect(() => {
    loadFavorites()
    window.addEventListener('storage', loadFavorites)
    return () => window.removeEventListener('storage', loadFavorites)
  }, [])

  useEffect(() => {
    loadCurriculums()
  }, [activeTab])

  const loadCurriculums = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/curriculum?filter=${activeTab}`)
      if (res.ok) {
        const data = await res.json()
        setCurriculums(data.curriculums)
      }
    } catch (error) {
      console.error('Failed to load curriculums:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCurriculums = curriculums.filter(c => {
    const now = new Date()
    if (activeTab === 'favorites') return favoriteIds.includes(c.id)
    if (activeTab === 'pending') {
      return (
        c.progress &&
        !c.progress.isCompleted &&
        c.enrollment?.startDate &&
        new Date(c.enrollment.startDate) > now
      )
    }
    if (activeTab === 'in-progress') {
      return (
        c.progress &&
        !c.progress.isCompleted &&
        (!c.enrollment?.startDate || new Date(c.enrollment.startDate) <= now)
      )
    }
    if (activeTab === 'completed') return c.progress?.isCompleted
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {isTutor && (
            <Link
              href="/tutor/dashboard"
              className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to dashboard
            </Link>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Course catalog</h1>
              <p className="mt-1 text-gray-600">
                Choose a course and start learning with AI tutoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Overall progress</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {curriculums.filter(c => c.progress).length} / {curriculums.length}
                </p>
              </div>
              <div className="rounded-full bg-indigo-100 p-3">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            All courses
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </Button>
          <Button
            variant={activeTab === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setActiveTab('in-progress')}
          >
            In progress
          </Button>
          <Button
            variant={activeTab === 'favorites' ? 'default' : 'outline'}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </Button>
        </div>

        {/* Curriculum Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200" />
                <CardContent className="space-y-3 pt-4">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCurriculums.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No courses</h3>
            <p className="text-gray-600">
              {activeTab === 'all'
                ? 'No courses available yet.'
                : activeTab === 'pending'
                  ? "You don't have any upcoming courses."
                  : activeTab === 'favorites'
                    ? "You haven't favorited any courses yet."
                    : activeTab === 'in-progress'
                      ? "You haven't started any courses."
                      : "You haven't completed any courses."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCurriculums.map(curriculum => {
              const SubjectIcon = SUBJECT_ICONS[curriculum.subject] || SUBJECT_ICONS.default
              const progress = curriculum.progress
              const progressPercent = progress
                ? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
                : 0

              return (
                <Card key={curriculum.id} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-indigo-100 p-3">
                        <SubjectIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge
                          variant="outline"
                          className={
                            DIFFICULTY_COLORS[curriculum.difficulty] || DIFFICULTY_COLORS.beginner
                          }
                        >
                          {curriculum.difficulty === 'beginner' && 'Beginner'}
                          {curriculum.difficulty === 'intermediate' && 'Intermediate'}
                          {curriculum.difficulty === 'advanced' && 'Advanced'}
                          {curriculum.difficulty === 'expert' && 'Expert'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(curriculum.id)}
                          className="-mr-2 -mt-2 h-8 w-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Heart
                            className={`h-4 w-4 ${favoriteIds.includes(curriculum.id) ? 'fill-current' : ''}`}
                          />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="mt-4">{curriculum.name}</CardTitle>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      {curriculum.gradeLevel && (
                        <span className="font-medium text-gray-700">{curriculum.gradeLevel}</span>
                      )}
                      {curriculum._count.batches > 0 && (
                        <span className="text-gray-500">
                          {curriculum._count.batches} group
                          {curriculum._count.batches !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">
                      {curriculum.description || 'No description'}
                    </CardDescription>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {curriculum.availability?.summary
                          ? curriculum.availability.summary
                          : 'Schedule TBD'}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{curriculum._count.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{curriculum._count.lessons} lessons</span>
                      </div>
                      {curriculum.hasOutline && curriculum.estimatedHours > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{curriculum.estimatedHours} hours</span>
                        </div>
                      )}
                    </div>

                    {progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        <p className="text-xs text-gray-500">
                          Completed {progress.lessonsCompleted} / {progress.totalLessons} lessons
                          {progress.averageScore && (
                            <span className="ml-2">
                              Avg score: {Math.round(progress.averageScore)}%
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    {progress ? (
                      <Link href={`/curriculum/${curriculum.id}`} className="w-full">
                        <Button
                          className="w-full"
                          variant={progress.isCompleted ? 'outline' : 'default'}
                        >
                          {progress.isCompleted ? (
                            <>
                              <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                              View results
                            </>
                          ) : progressPercent > 0 ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Start learning
                            </>
                          )}
                        </Button>
                      </Link>
                    ) : isTutor ? (
                      <Link href={`/tutor/courses/${curriculum.id}/builder`} className="w-full">
                        <Button className="w-full" variant="outline">
                          <ChevronRight className="mr-2 h-4 w-4" />
                          Manage course
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setSelectedEnrollment(curriculum)}
                      >
                        Sign Up
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {selectedEnrollment && (
        <PreferenceEnrollmentDialog
          open={!!selectedEnrollment}
          onOpenChange={open => {
            if (!open) setSelectedEnrollment(null)
          }}
          curriculumId={selectedEnrollment.id}
          curriculumName={selectedEnrollment.name}
          availabilitySlots={selectedEnrollment.availability?.slots ?? []}
          onSubmitted={() => {
            setSelectedEnrollment(null)
          }}
        />
      )}
    </div>
  )
}
