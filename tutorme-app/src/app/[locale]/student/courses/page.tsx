/**
 * Curriculum Listing Page
 * Browse and enroll in available curriculums
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
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
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

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
  const searchParams = useSearchParams()
  const isTutor = session?.user?.role === 'TUTOR'
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'mine' | 'pending' | 'completed' | 'favorites' | 'following'
  >((searchParams.get('tab') as any) || 'mine')
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

  const [followingTutors, setFollowingTutors] = useState<any[]>([])
  const [isFollowingLoading, setIsFollowingLoading] = useState(false)

  const loadFollowing = async () => {
    setIsFollowingLoading(true)
    try {
      const res = await fetch('/api/follows/list')
      if (res.ok) {
        const data = await res.json()
        setFollowingTutors(data.following || [])
      }
    } catch (error) {
      console.error('Failed to load following tutors:', error)
    } finally {
      setIsFollowingLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
    window.addEventListener('storage', loadFavorites)
    return () => window.removeEventListener('storage', loadFavorites)
  }, [])

  useEffect(() => {
    if (activeTab === 'following') {
      loadFollowing()
    } else {
      loadCurriculums()
    }
  }, [activeTab])

  const loadCurriculums = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/curriculum?filter=all`)
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

  const now = new Date()
  const myCourses = curriculums.filter(c => c.enrollment || c.progress)

  const ongoing = myCourses.filter(
    c =>
      (!c.progress || !c.progress.isCompleted) &&
      c.enrollment?.startDate &&
      new Date(c.enrollment.startDate) <= now
  )

  const upcoming = myCourses.filter(
    c => !c.enrollment?.startDate || new Date(c.enrollment.startDate) > now
  )

  const completed = myCourses.filter(c => c.progress?.isCompleted)
  const favorites = curriculums.filter(
    c => favoriteIds.includes(c.id) && !myCourses.some(mc => mc.id === c.id)
  )

  const [detailCourse, setDetailCourse] = useState<Curriculum | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
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
              <h1 className="text-2xl font-bold text-gray-900">My courses</h1>
              <p className="mt-1 text-gray-600">
                Track your progress and continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total enrolled</p>
                <p className="text-2xl font-bold text-indigo-600">{myCourses.length}</p>
              </div>
              <div className="rounded-full bg-indigo-100 p-3">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Detail Modal */}
      <Dialog open={!!detailCourse} onOpenChange={open => !open && setDetailCourse(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{detailCourse?.name}</DialogTitle>
            <DialogDescription>{detailCourse?.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="mb-2 text-sm font-semibold">Weekly Schedule</h4>
            {detailCourse?.availability?.slots && detailCourse.availability.slots.length > 0 ? (
              <div className="space-y-2">
                {detailCourse.availability.slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border bg-gray-50 p-2 text-sm"
                  >
                    <span className="font-medium">{slot.dayOfWeek}</span>
                    <span>
                      {slot.startTime} ({slot.durationMinutes} mins)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No fixed schedule for this course.</p>
            )}
          </div>
          <CardFooter className="px-0 pb-0 pt-4">
            <Button className="w-full" onClick={() => setDetailCourse(null)}>
              Close
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="scrollbar-hide mb-8 flex overflow-x-auto border-b border-gray-200">
          <button
            className={cn(
              'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'mine'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setActiveTab('mine')}
          >
            Ongoing ({ongoing.length})
          </button>
          <button
            className={cn(
              'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'pending'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({upcoming.length})
          </button>
          <button
            className={cn(
              'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'completed'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completed.length})
          </button>
          <button
            className={cn(
              'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'favorites'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites ({favorites.length})
          </button>
          <button
            className={cn(
              'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'following'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setActiveTab('following')}
          >
            Following ({followingTutors.length})
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-48 bg-gray-200" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {activeTab === 'mine' && (
              <CourseSection
                title="Ongoing Courses"
                courses={ongoing}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
                onDetails={setDetailCourse}
              />
            )}
            {activeTab === 'pending' && (
              <CourseSection
                title="Pending Courses"
                courses={upcoming}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
                onDetails={setDetailCourse}
              />
            )}
            {activeTab === 'completed' && (
              <CourseSection
                title="Completed Courses"
                courses={completed}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
                onDetails={setDetailCourse}
              />
            )}
            {activeTab === 'favorites' && (
              <CourseSection
                title="Favorite Courses"
                courses={favorites}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
                onDetails={setDetailCourse}
              />
            )}
            {activeTab === 'following' && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Following tutors</h2>
                  <Badge variant="outline">{followingTutors.length} tutors</Badge>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isFollowingLoading ? (
                    [1, 2, 3].map(i => (
                      <Card key={i} className="animate-pulse border-border bg-card">
                        <CardHeader className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-3/4 rounded bg-muted" />
                              <div className="h-3 w-1/2 rounded bg-muted" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="h-4 rounded bg-muted" />
                          <div className="h-4 rounded bg-muted" />
                        </CardContent>
                      </Card>
                    ))
                  ) : followingTutors.length === 0 ? (
                    <Card className="col-span-full border-border bg-card px-4 py-8 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Heart className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <CardTitle className="mb-1 text-lg">No followed tutors</CardTitle>
                      <CardDescription className="mb-4">
                        Follow tutors from the directory to see them here.
                      </CardDescription>
                      <Link href="/student/tutors">
                        <Button variant="outline" size="sm">
                          Browse Tutors
                        </Button>
                      </Link>
                    </Card>
                  ) : (
                    followingTutors.map(tutor => (
                      <Card
                        key={tutor.id}
                        className="relative overflow-hidden border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-start gap-3">
                            {tutor.avatarUrl ? (
                              <img
                                src={tutor.avatarUrl}
                                alt={tutor.name}
                                className="h-12 w-12 shrink-0 rounded-full border border-border object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-lg font-bold">
                                {tutor.name?.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <CardTitle className="truncate text-lg text-foreground">
                                {tutor.name}
                              </CardTitle>
                              <CardDescription>@{tutor.username}</CardDescription>
                            </div>
                          </div>
                          {tutor.bio && (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {tutor.bio}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {tutor.specialties?.slice(0, 3).map((specialty: string) => (
                              <Badge key={specialty} variant="secondary" className="bg-muted">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button
                            asChild
                            size="sm"
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Link href={`/student/tutors?tutorId=${tutor.id}`}>View Profile</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={`/curriculum`}>View Courses</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </section>
            )}

            {((activeTab === 'mine' && ongoing.length === 0) ||
              (activeTab === 'pending' && upcoming.length === 0) ||
              (activeTab === 'completed' && completed.length === 0) ||
              (activeTab === 'favorites' && favorites.length === 0)) && (
              <div className="py-20 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No courses in this section
                </h3>
                <p className="mb-6 text-gray-600">
                  {activeTab === 'favorites'
                    ? "You haven't added any favorites yet."
                    : 'Enroll in courses from the catalog to start your journey.'}
                </p>
                <Link href="/student/subjects">
                  <Button variant="default">Browse Available Subjects</Button>
                </Link>
              </div>
            )}
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
            loadCurriculums()
          }}
        />
      )}
    </div>
  )
}

function CourseSection({
  title,
  courses,
  favoriteIds,
  toggleFavorite,
  onDetails,
}: {
  title: string
  courses: Curriculum[]
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
  onDetails: (c: Curriculum) => void
}) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Badge variant="outline">{courses.length} courses</Badge>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(curriculum => (
          <CourseCard
            key={curriculum.id}
            curriculum={curriculum}
            isFavorite={favoriteIds.includes(curriculum.id)}
            onFavorite={() => toggleFavorite(curriculum.id)}
            onDetails={() => onDetails(curriculum)}
          />
        ))}
      </div>
    </section>
  )
}

function CourseCard({
  curriculum,
  isFavorite,
  onFavorite,
  onDetails,
}: {
  curriculum: Curriculum
  isFavorite: boolean
  onFavorite: () => void
  onDetails: () => void
}) {
  const SubjectIcon = SUBJECT_ICONS[curriculum.subject] || SUBJECT_ICONS.default
  const progress = curriculum.progress
  const progressPercent = progress
    ? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
    : 0
  const isPending =
    curriculum.enrollment?.startDate && new Date(curriculum.enrollment.startDate) > new Date()
  const isOngoing = !isPending && (!progress || !progress.isCompleted)

  return (
    <Card
      className="flex h-full cursor-pointer flex-col transition-shadow hover:shadow-lg"
      onClick={onDetails}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="rounded-lg bg-indigo-100 p-3">
            <SubjectIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex items-start gap-2">
            <Badge
              variant="outline"
              className={DIFFICULTY_COLORS[curriculum.difficulty] || DIFFICULTY_COLORS.beginner}
            >
              {curriculum.difficulty}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={e => {
                e.stopPropagation()
                onFavorite()
              }}
              className="-mr-2 -mt-2 h-8 w-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
            </Button>
          </div>
        </div>
        <CardTitle className="mt-4">{curriculum.name}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {curriculum.description || 'No description available'}
        </CardDescription>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>{curriculum.availability?.summary || 'Flexible Schedule'}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{curriculum._count.modules} modules</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>{curriculum._count.lessons} lessons</span>
          </div>
        </div>

        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}

        {curriculum.enrollment?.startDate && (
          <div className="rounded-md bg-blue-50 p-2 text-xs text-blue-700">
            Commence{isPending ? 's' : 'd'} on:{' '}
            {new Date(curriculum.enrollment.startDate).toLocaleDateString()}
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        {(isOngoing || isPending) && (
          <Link href={`/student/feedback`} className="flex-1" onClick={e => e.stopPropagation()}>
            <Button className="h-9 w-full" variant="default">
              {progressPercent > 0 ? 'Continue' : 'Enter Classroom'}
            </Button>
          </Link>
        )}
        {progress?.isCompleted && (
          <Link href={`/student/feedback`} className="flex-1" onClick={e => e.stopPropagation()}>
            <Button className="h-9 w-full" variant="outline">
              <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
              View Results
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3"
          onClick={e => {
            e.stopPropagation()
            onDetails()
          }}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}
