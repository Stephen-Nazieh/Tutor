'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { toast } from 'sonner'
import {
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Loader2,
  Heart,
  Image as ImageIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { format } from 'date-fns'

function CoursesPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-12 animate-pulse rounded bg-gray-200" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  )
}

function CoursesPageContent() {
  const router = useRouter()
  const { status } = useSession()

  const [loading, setLoading] = useState(true)
  const [enrollments, setEnrollments] = useState<any[]>([])
  
  // MODAL STATE
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null)

  // FAVORITES STATE
  const [favoriteCourses, setFavoriteCourses] = useState<any[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  const loadFavorites = useCallback(async () => {
    setFavoritesLoading(true)
    try {
      const saved = localStorage.getItem('tutorme-favorites')
      if (!saved) {
        setFavoritesLoading(false)
        return
      }
      const parsed = JSON.parse(saved)
      const courseIds = parsed.courses || []

      if (courseIds.length > 0) {
        const coursesRes = await fetch('/api/curriculum/batch?ids=' + courseIds.join(','), { cache: 'no-store' })
        if (coursesRes.ok) {
          const data = await coursesRes.json()
          setFavoriteCourses(data.curricula || [])
        }
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setFavoritesLoading(false)
    }
  }, [])

  const removeFavoriteCourse = (courseId: string) => {
    const saved = localStorage.getItem('tutorme-favorites')
    if (saved) {
      const parsed = JSON.parse(saved)
      parsed.courses = (parsed.courses || []).filter((id: string) => id !== courseId)
      localStorage.setItem('tutorme-favorites', JSON.stringify(parsed))
      setFavoriteCourses(prev => prev.filter(c => c.id !== courseId))
      toast.success('Removed from favorites')
    }
  }

  const fetchEnrollments = async () => {
    try {
      const res = await fetch('/api/student/enrollments', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setEnrollments(data.enrollments || [])
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error)
      toast.error('Failed to load your courses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEnrollments()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  const now = new Date()
  const upcomingCourses = enrollments.filter(e => !e.completedAt && e.startDate && new Date(e.startDate) > now)
  const ongoingCourses = enrollments.filter(e => !e.completedAt && (!e.startDate || new Date(e.startDate) <= now))
  const completedCourses = enrollments.filter(e => e.completedAt)

  const renderEnrollmentCard = (enrollment: any, type: 'upcoming' | 'ongoing' | 'completed') => {
    const curriculum = enrollment.curriculum
    if (!curriculum) return null

    return (
      <Card key={enrollment.id} className="overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="bg-slate-100 flex h-48 w-full shrink-0 flex-col items-center justify-center border-r p-6 md:h-auto md:w-48 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/50 dark:to-blue-900/50">
            <BookOpen className="mb-2 h-10 w-10 text-indigo-400" />
            <span className="text-center text-sm font-medium text-indigo-700 dark:text-indigo-300">
              {curriculum.subject || 'Course'}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">{curriculum.name}</h3>
                  {type === 'completed' && <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>}
                  {type === 'upcoming' && <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Upcoming</Badge>}
                  {type === 'ongoing' && <Badge variant="default" className="bg-indigo-600">In Progress</Badge>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {curriculum.description || 'No description available.'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{curriculum.estimatedHours || 0} horas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>{curriculum._count?.modules || 0} modules</span>
              </div>
              {enrollment.startDate && (
                <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                  <Calendar className="h-4 w-4" />
                  <span>Starts: {format(new Date(enrollment.startDate), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <Button variant="outline" onClick={() => setSelectedCourse({ ...curriculum, startDate: enrollment.startDate, completedAt: enrollment.completedAt })}>
                View Details
              </Button>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href={`/student/curriculum/${curriculum.id}`}>
                  Enter Classroom <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const renderCourseSection = (title: string, courses: any[], type: 'upcoming' | 'ongoing' | 'completed') => {
    if (courses.length === 0) return null
    return (
      <div className="space-y-4 mb-10">
        <h3 className="text-xl font-bold text-slate-900 border-b pb-2">{title}</h3>
        <div className="grid gap-6">
          {courses.map(e => renderEnrollmentCard(e, type))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white top-0 z-10 sticky">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard" className="text-xl font-bold tracking-tight text-indigo-600">
              Solocorn
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
            <p className="mt-2 text-slate-600">Manage and track your enrolled courses.</p>
          </div>
        </div>

        <div className="space-y-8">
          {renderCourseSection('Upcoming Courses', upcomingCourses, 'upcoming')}
          {renderCourseSection('Ongoing Courses', ongoingCourses, 'ongoing')}
          {renderCourseSection('Completed Courses', completedCourses, 'completed')}
        </div>

        {/* Favorite Courses Section */}
        {favoriteCourses.length > 0 && (
          <div className="mt-16 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500/20" />
                Favorite Courses
              </h3>
            </div>
            
            {favoritesLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteCourses.map(course => (
                  <Card key={course.id} className="group relative overflow-hidden bg-white hover:shadow-md transition-all">
                    <CardHeader className="p-5 pb-4">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="bg-slate-50">
                          {course.subject || 'Course'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 -mt-2 -mr-2"
                          onClick={() => removeFavoriteCourse(course.id)}
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                      <CardTitle className="mt-3 line-clamp-2 text-lg">
                        {course.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="line-clamp-2 text-sm text-slate-600 mb-4">
                        {course.description || 'No description available.'}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/student/subjects/${encodeURIComponent(course.subject || 'general')}/courses/${course.id}/details`}>
                          View Course
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Course Details Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                {selectedCourse?.subject || 'Subject'}
              </Badge>
            </div>
            <DialogTitle className="text-2xl">{selectedCourse?.name}</DialogTitle>
            <DialogDescription className="text-base mt-2">
              {selectedCourse?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Difficulty</span>
                <span className="font-semibold">{selectedCourse?.difficulty || 'All Levels'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Estimated Time</span>
                <span className="font-semibold">{selectedCourse?.estimatedHours || 0} Hours</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Start Date</span>
                <span className="font-semibold text-indigo-700">
                  {selectedCourse?.startDate ? format(new Date(selectedCourse.startDate), 'PPP') : 'Self-paced'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Status</span>
                <span className="font-semibold capitalize">
                  {selectedCourse?.completedAt ? 'Completed' : (selectedCourse?.startDate && new Date(selectedCourse.startDate) > new Date()) ? 'Upcoming' : 'In Progress'}
                </span>
              </div>
            </div>

            {selectedCourse?.schedule && (
              <div className="mt-4">
                <h4 className="font-semibold text-slate-900 mb-3 border-b pb-2">Class Schedule</h4>
                <div className="bg-indigo-50/50 p-4 rounded-lg text-sm whitespace-pre-wrap font-medium text-slate-700 border border-indigo-100">
                  {typeof selectedCourse.schedule === 'string' 
                    ? selectedCourse.schedule 
                    : JSON.stringify(selectedCourse.schedule, null, 2)}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCourse(null)}>Close</Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href={`/student/curriculum/${selectedCourse?.id}`}>
                Enter Classroom
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function StudentCoursesPage() {
  return (
    <Suspense fallback={<CoursesPageSkeleton />}>
      <CoursesPageContent />
    </Suspense>
  )
}
