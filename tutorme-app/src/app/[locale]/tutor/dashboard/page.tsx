'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Plus,
  Settings,
  BookOpen,
  Library,
  ChevronRight,
  Sparkles,
  Video,
  Info,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

import {
  CreateClassDialog,
  StatsCards,
  UpcomingClassesCard,
  InteractiveCalendar,
  type UpcomingClass,
  type StudentNeedingAttention,
} from './components'
import { ModernHeroSection } from './components/ModernHeroSection'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full space-y-6">
        <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-64 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

const defaultStats = {
  totalClasses: 0,
  totalStudents: 0,
  upcomingClasses: 0,
  earnings: 0,
  currency: 'SGD' as string,
}

type EnrolledCourse = {
  id: string
  name: string
  subject: string
  gradeLevel?: string | null
  isPublished?: boolean | null
  price?: number | null
  currency?: string | null
  enrollmentCount: number
}

// Inner component that uses searchParams
function TutorDashboardContent() {
  const { data: session } = useSession()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const hasLocalePrefix = pathname.startsWith(`/${locale}/`)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null)
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  useEffect(() => {
    if (searchParams.get('create') === '1') setShowCreateDialog(true)
    if (searchParams.get('course') === '1') router.push('/tutor/courses/new')
  }, [searchParams, router])
  const [stats, setStats] = useState(defaultStats)
  const [classes, setClasses] = useState<UpcomingClass[]>([])
  const [students, setStudents] = useState<StudentNeedingAttention[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [allStudents, setAllStudents] = useState<
    Array<{ id: string; name: string; email: string; courseCount: number; classCount: number }>
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [launchingCourseId, setLaunchingCourseId] = useState<string | null>(null)
  const [oneAccountTipDismissed, setOneAccountTipDismissed] = useState(true)
  useEffect(() => {
    try {
      setOneAccountTipDismissed(
        localStorage.getItem('tutor-dashboard-one-account-tip-dismissed') === '1'
      )
    } catch {
      setOneAccountTipDismissed(false)
    }
  }, [])
  const showOneAccountTip = !oneAccountTipDismissed
  const dismissOneAccountTip = () => {
    setOneAccountTipDismissed(true)
    try {
      localStorage.setItem('tutor-dashboard-one-account-tip-dismissed', '1')
    } catch {}
  }

  const fetchData = useCallback(async () => {
    if (!session?.user?.id) return
    setError(null)
    try {
      const [statsRes, classesRes, studentsRes, allStudentsRes, enrolledRes] =
        await Promise.allSettled([
          fetch('/api/tutor/stats', { credentials: 'include' }),
          fetch('/api/tutor/classes', { credentials: 'include' }),
          fetch('/api/tutor/students-needing-attention', { credentials: 'include' }),
          fetch('/api/tutor/students', { credentials: 'include' }),
          fetch('/api/tutor/courses/enrolled', { credentials: 'include' }),
        ])

      const failures: string[] = []

      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const d = await statsRes.value.json()
        setStats({
          totalClasses: d.totalClasses ?? 0,
          totalStudents: d.totalStudents ?? 0,
          upcomingClasses: d.upcomingClasses ?? 0,
          earnings: d.earnings ?? 0,
          currency: d.currency ?? 'SGD',
        })
      } else {
        failures.push('stats')
      }

      if (classesRes.status === 'fulfilled' && classesRes.value.ok) {
        const d = await classesRes.value.json()
        setClasses(d.classes ?? [])
      } else {
        failures.push('classes')
      }

      if (studentsRes.status === 'fulfilled' && studentsRes.value.ok) {
        const d = await studentsRes.value.json()
        setStudents(d.students ?? [])
      } else {
        failures.push('students-needing-attention')
      }

      if (allStudentsRes.status === 'fulfilled' && allStudentsRes.value.ok) {
        const d = await allStudentsRes.value.json()
        setAllStudents(d.students ?? [])
      } else {
        failures.push('students')
      }

      if (enrolledRes.status === 'fulfilled' && enrolledRes.value.ok) {
        const d = await enrolledRes.value.json()
        setEnrolledCourses(d.courses ?? [])
      } else {
        failures.push('enrolled-courses')
      }

      if (failures.length >= 2) {
        setError('Failed to load dashboard data')
      }
    } catch {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [session?.user?.id, fetchData])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tutor-dashboard-theme')
      if (stored) setThemeId(stored)
    } catch {}
  }, [])

  const handleClassCreated = useCallback(
    (classData?: { id: string; [key: string]: unknown }) => {
      if (classData) {
        // Add the new class to the list immediately
        const newClass: UpcomingClass = {
          id: classData.id,
          title: (classData.title as string) || 'New Class',
          subject: (classData.subject as string) || '',
          scheduledAt: (classData.scheduledAt as string) || new Date().toISOString(),
          duration: (classData.durationMinutes as number) || 60,
          maxStudents: (classData.maxStudents as number) || 50,
          enrolledStudents: 0,
          status: (classData.status as string) || 'scheduled',
        }
        setClasses(prev => [newClass, ...prev])
        // Update stats
        setStats(prev => ({
          ...prev,
          totalClasses: prev.totalClasses + 1,
          upcomingClasses: prev.upcomingClasses + 1,
        }))
      } else {
        fetchData()
      }
    },
    [fetchData]
  )

  const handleRemoveClass = useCallback(async (classId: string) => {
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
      })

      if (res.ok) {
        setClasses(prev => prev.filter(c => c.id !== classId))
        setStats(prev => ({
          ...prev,
          totalClasses: Math.max(0, prev.totalClasses - 1),
          upcomingClasses: Math.max(0, prev.upcomingClasses - 1),
        }))
        toast.success('Class removed successfully')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to remove class')
      }
    } catch {
      toast.error('Failed to remove class')
    }
  }, [])

  const handleEnterCourseClassroom = useCallback(
    async (course: EnrolledCourse) => {
      if (launchingCourseId) return
      setLaunchingCourseId(course.id)
      try {
        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        const csrfToken = csrfData?.token ?? null

        const res = await fetch('/api/class/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({
            curriculumId: course.id,
            title: course.name,
            subject: course.subject,
            gradeLevel: course.gradeLevel || undefined,
            maxStudents: 50,
            durationMinutes: 60,
          }),
        })

        const result = await res.json().catch(() => ({}))
        if (!res.ok) {
          toast.error(result?.error || 'Failed to launch classroom')
          return
        }

        const sessionId = result?.room?.id || result?.session?.roomId || result?.session?.id
        if (!sessionId) {
          toast.error('Classroom created but no session ID returned')
          return
        }
        router.push(`/tutor/insights?sessionId=${sessionId}`)
      } catch {
        toast.error('Failed to launch classroom')
      } finally {
        setLaunchingCourseId(null)
      }
    },
    [launchingCourseId, router]
  )

  const withLocalePath = useCallback(
    (path: string) => {
      if (path.startsWith('http')) return path
      if (hasLocalePrefix) {
        if (path.startsWith(`/${locale}/`)) return path
        if (path.startsWith('/')) return `/${locale}${path}`
        return `/${locale}/${path}`
      }
      if (path.startsWith('/')) return path
      return `/${path}`
    },
    [hasLocalePrefix, locale]
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-center lg:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Theme</span>
            <Select
              value={themeId}
              onValueChange={value => {
                setThemeId(value)
                try {
                  localStorage.setItem('tutor-dashboard-theme', value)
                } catch {}
              }}
            >
              <SelectTrigger className="h-8 w-[200px] border-border bg-card text-foreground">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {DASHBOARD_THEMES.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Modern Hero Section */}
        <div className="mb-8">
          <ModernHeroSection
            stats={stats}
            loading={loading}
            onCreateCourse={() => router.push('/tutor/courses/new')}
          />
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => {
                setLoading(true)
                fetchData()
              }}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="mb-8 space-y-4">
          <Card className="border border-border bg-card/95 shadow-xl backdrop-blur-md">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="py-2 text-center md:py-0">
                  <h3 className="text-lg font-medium text-gray-500">Active Courses</h3>
                  <p className="mt-2 text-4xl font-bold text-blue-600">{stats.totalClasses}</p>
                </div>
                <div className="py-2 text-center md:px-6 md:py-0">
                  <h3 className="text-lg font-medium text-gray-500">Active Students</h3>
                  <p className="mt-2 text-4xl font-bold text-green-600">{stats.totalStudents}</p>
                </div>
                <div className="py-2 text-center md:px-6 md:py-0">
                  <h3 className="text-lg font-medium text-gray-500">Engagement Rate</h3>
                  <p className="mt-2 text-4xl font-bold text-purple-600">85%</p>
                  <p className="mt-1 text-sm text-gray-400">Task/Assessment completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <InteractiveCalendar
                initialView="week"
                dayClickMode="availability"
                loading={loading}
              />
            </TabsContent>
            <TabsContent value="enrolled">
              <Card className="border border-border bg-card/95 shadow-xl backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Courses With Enrolled Students</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {enrolledCourses.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No courses have enrolled students yet.
                    </div>
                  ) : (
                    enrolledCourses.map(course => (
                      <div
                        key={course.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4"
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-semibold text-slate-900">{course.name}</p>
                            {course.isPublished ? (
                              <Badge variant="secondary">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{course.subject}</span>
                            {course.gradeLevel ? <span>• {course.gradeLevel}</span> : null}
                            {course.price ? (
                              <span>
                                • {course.currency ?? 'USD'} {course.price}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge>{course.enrollmentCount} students</Badge>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleEnterCourseClassroom(course)}
                            disabled={launchingCourseId === course.id}
                          >
                            {launchingCourseId === course.id ? 'Launching…' : 'Enter Classroom'}
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={withLocalePath(`/tutor/courses/${course.id}/enrollments`)}>
                              View Enrollments
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Class Dialog */}
        <CreateClassDialog
          open={showCreateDialog}
          onOpenChange={open => {
            setShowCreateDialog(open)
            if (!open) setScheduleDate(null)
          }}
          onClassCreated={handleClassCreated}
          redirectToClass={false}
          initialDate={scheduleDate}
        />
      </div>
    </div>
  )
}

// Main export wrapped in Suspense
export default function TutorDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <TutorDashboardContent />
    </Suspense>
  )
}
