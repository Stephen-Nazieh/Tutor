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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

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
  Trash2,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  Ban,
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
  isPublished?: boolean | null
  price?: number | null
  currency?: string | null
  enrollmentCount: number
  sessionCount?: number
}

type CourseSession = {
  id: string
  title: string
  subject: string
  description?: string | null
  scheduledAt: string | null
  startedAt: string | null
  endedAt: string | null
  maxStudents: number
  enrolledStudents: number
  status: string
  roomUrl?: string | null
}

type OneOnOneRequest = {
  requestId: string
  studentId: string
  requestedDate: string
  startTime: string
  endTime: string
  timezone: string
  costPerSession: number
  status: string
  student?: {
    userId?: string | null
    handle?: string | null
    email?: string | null
    image?: string | null
  } | null
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
  const [oneOnOneRequests, setOneOnOneRequests] = useState<OneOnOneRequest[]>([])
  const [respondingRequestId, setRespondingRequestId] = useState<string | null>(null)

  // Cancel Course Modal State
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedCourseForCancel, setSelectedCourseForCancel] = useState<EnrolledCourse | null>(
    null
  )
  const [courseSessions, setCourseSessions] = useState<CourseSession[]>([])
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [cancellingSessionId, setCancellingSessionId] = useState<string | null>(null)
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
      const [statsRes, classesRes, studentsRes, allStudentsRes, enrolledRes, oneOnOneRes] =
        await Promise.allSettled([
          fetch('/api/tutor/stats', { credentials: 'include' }),
          fetch('/api/tutor/classes', { credentials: 'include' }),
          fetch('/api/tutor/students-needing-attention', { credentials: 'include' }),
          fetch('/api/tutor/students', { credentials: 'include' }),
          fetch('/api/tutor/courses/enrolled', { credentials: 'include' }),
          fetch('/api/one-on-one/request?role=received', { credentials: 'include' }),
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
      } else if (studentsRes.status === 'fulfilled' && studentsRes.value.status === 410) {
        // Legacy feature removed - ignore this error silently
        setStudents([])
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

      if (oneOnOneRes.status === 'fulfilled' && oneOnOneRes.value.ok) {
        const d = await oneOnOneRes.value.json()
        const pending = (d.requests ?? []).filter(
          (req: OneOnOneRequest) => req.status === 'PENDING'
        )
        setOneOnOneRequests(pending)
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

  const handleOneOnOneResponse = useCallback(
    async (requestId: string, action: 'accept' | 'reject') => {
      setRespondingRequestId(requestId)
      try {
        const res = await fetch('/api/one-on-one/respond', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ requestId, action }),
        })
        if (res.ok) {
          setOneOnOneRequests(prev => prev.filter(r => r.requestId !== requestId))
          toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'}`)
        } else {
          const data = await res.json().catch(() => ({}))
          toast.error(data.error || 'Unable to respond to request')
        }
      } catch {
        toast.error('Unable to respond to request')
      } finally {
        setRespondingRequestId(null)
      }
    },
    []
  )

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
            courseId: course.id,
            title: course.name,
            subject: course.subject,
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
        // Navigate directly to live classroom
        router.push(`/tutor/live-class/${sessionId}`)
      } catch {
        toast.error('Failed to launch classroom')
      } finally {
        setLaunchingCourseId(null)
      }
    },
    [launchingCourseId, router]
  )

  const handleOpenCancelModal = useCallback(
    async (course: EnrolledCourse) => {
      if (loadingSessions) return
      setSelectedCourseForCancel(course)
      setCancelModalOpen(true)
      setCourseSessions([])
      setLoadingSessions(true)

      try {
        const res = await fetch(`/api/tutor/courses/${course.id}/sessions`, {
          credentials: 'include',
        })

        if (res.ok) {
          const data = await res.json()
          setCourseSessions(data.sessions || [])
        } else {
          toast.error('Failed to load course sessions')
          setCourseSessions([])
        }
      } catch {
        toast.error('Failed to load course sessions')
        setCourseSessions([])
      } finally {
        setLoadingSessions(false)
      }
    },
    [loadingSessions]
  )

  const handleCancelSession = useCallback(async (sessionId: string, reason?: string) => {
    setCancellingSessionId(sessionId)

    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'cancel', reason }),
      })

      if (res.ok) {
        setCourseSessions(prev =>
          prev.map(s =>
            s.id === sessionId ? { ...s, status: 'ENDED', endedAt: new Date().toISOString() } : s
          )
        )
        toast.success('Session cancelled successfully')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to cancel session')
      }
    } catch {
      toast.error('Failed to cancel session')
    } finally {
      setCancellingSessionId(null)
    }
  }, [])

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

        {/* 1-on-1 Requests */}
        <div className="mb-8">
          <Card className="border border-border bg-card/95 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>1-on-1 Requests</CardTitle>
                <p className="text-xs text-muted-foreground">Pending requests from students</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={withLocalePath('/tutor/notifications')}>View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {oneOnOneRequests.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No pending 1-on-1 requests.
                </div>
              ) : (
                oneOnOneRequests.slice(0, 3).map(request => (
                  <div
                    key={request.requestId}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-semibold text-slate-900">
                        @{request.student?.handle || 'student'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {new Date(request.requestedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {request.startTime} - {request.endTime}
                        </span>
                        <span>•</span>
                        <span>{request.timezone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={respondingRequestId === request.requestId}
                        onClick={() => handleOneOnOneResponse(request.requestId, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        disabled={respondingRequestId === request.requestId}
                        onClick={() => handleOneOnOneResponse(request.requestId, 'reject')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              )}
              {oneOnOneRequests.length > 3 ? (
                <p className="text-xs text-muted-foreground">
                  +{oneOnOneRequests.length - 3} more pending requests
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="courses">Active Courses</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="availability">My Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <InteractiveCalendar initialView="day" dayClickMode="create" loading={loading} />
            </TabsContent>
            <TabsContent value="availability">
              <InteractiveCalendar
                initialView="availability"
                dayClickMode="availability"
                loading={loading}
              />
            </TabsContent>
            <TabsContent value="courses">
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
                            {course.price ? (
                              <span>
                                • {course.currency ?? 'USD'} {course.price}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">{course.sessionCount ?? 0} sessions</Badge>
                            <Badge variant="secondary">{course.enrollmentCount} enrolled</Badge>
                          </div>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleEnterCourseClassroom(course)}
                            disabled={launchingCourseId === course.id}
                          >
                            {launchingCourseId === course.id ? 'Launching…' : 'Open Session'}
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={withLocalePath(`/tutor/courses/${course.id}/builder`)}>
                              Edit
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={withLocalePath(`/tutor/courses/${course.id}/enrollments`)}>
                              Enrollment
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenCancelModal(course)}
                            className="text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                          >
                            <Ban className="mr-1 h-4 w-4" />
                            Cancel session
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

        {/* Cancel Course Modal */}
        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-orange-500" />
                Cancel Course Sessions
              </DialogTitle>
              <DialogDescription>
                {selectedCourseForCancel && (
                  <>
                    Manage sessions for <strong>{selectedCourseForCancel.name}</strong>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {loadingSessions ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : courseSessions.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p>No sessions found for this course.</p>
                </div>
              ) : (
                <ScrollArea className="max-h-[400px]">
                  <div className="space-y-3 pr-4">
                    {courseSessions.map(session => {
                      const isScheduled = session.status === 'SCHEDULED'
                      const isActive = session.status === 'ACTIVE'
                      const isEnded = session.status === 'ENDED'
                      const canCancel = isScheduled || isActive

                      return (
                        <div
                          key={session.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate font-medium">{session.title}</p>
                              <Badge
                                variant={isEnded ? 'secondary' : isActive ? 'default' : 'outline'}
                                className={
                                  isActive ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''
                                }
                              >
                                {session.status}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                              {session.scheduledAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              )}
                              {session.scheduledAt && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(session.scheduledAt).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {session.enrolledStudents} / {session.maxStudents}
                              </span>
                            </div>
                            {session.description && (
                              <p className="truncate text-xs text-gray-500">
                                {session.description}
                              </p>
                            )}
                          </div>
                          <div className="ml-4">
                            {canCancel ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (
                                    confirm(
                                      'Are you sure you want to cancel this session? Students will be notified.'
                                    )
                                  ) {
                                    handleCancelSession(session.id, 'Cancelled by tutor')
                                  }
                                }}
                                disabled={cancellingSessionId === session.id}
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                {cancellingSessionId === session.id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                  <Ban className="h-4 w-4" />
                                )}
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" disabled>
                                {isEnded ? 'Ended' : 'N/A'}
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>

            <Separator className="my-4" />

            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Cancelling a session will notify enrolled students</span>
              </div>
              <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
