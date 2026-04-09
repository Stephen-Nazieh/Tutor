'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Settings, AlertCircle } from 'lucide-react'

import {
  // ContinueLearning,  // Moved to DashboardCalendar tabs
  // UpcomingClasses,   // Moved to DashboardCalendar tabs
  DashboardSkeleton,
  DashboardCalendar,
} from './components'
import { StudentHeroSection } from './components/StudentHeroSection'
import type { DashboardClass, DashboardData } from './types'
import { getDashboardStrings } from './dashboard-strings'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'

export default function StudentDashboard() {
  const router = useRouter()
  const { status } = useSession()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [bookingClassId, setBookingClassId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [themeId, setThemeId] = useState('current')

  const strings = getDashboardStrings('en')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  const fetchDashboardData = useCallback(async () => {
    if (status !== 'authenticated') return
    setFetchError(null)
    setLoading(true)

    try {
      const responses = await Promise.all([
        fetch('/api/content').catch(() => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ contents: [] }),
        })),
        fetch('/api/recommendations').catch(() => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ recommendations: [] }),
        })),
        fetch('/api/classes?limit=3').catch(() => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ classes: [] }),
        })),
        fetch('/api/student/subjects').catch(() => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ subjects: [] }),
        })),
      ])

      // Check for auth errors
      const authErrors = responses.filter(r => r.status === 401)
      if (authErrors.length > 0) {
        // User not authenticated, redirect to login
        router.replace('/login')
        return
      }

      const [contentData, recsData, classesData, subjectsData] =
        await Promise.all(responses.map(r => r.json()))

      const subjects = subjectsData?.subjects ?? []
      setData({
        contents: contentData?.contents ?? [],
        gamification: null,
        worlds: [],
        dailyQuests: [],
        recommendations: recsData?.recommendations ?? [],
        classes: classesData?.classes ?? [],
        studyGroups: [],
        courses: subjects.map(
          (s: {
            id: string
            name: string
            subject: string
            description?: string | null
            progress: number
            completedLessons: number
            totalLessons: number
            lastStudied?: string | null
            enrollmentSource?: string | null
          }) => ({
            id: s.id,
            name: s.name,
            subject: s.subject,
            description: s.description ?? null,
            progress: s.progress ?? 0,
            completedLessons: s.completedLessons ?? 0,
            totalLessons: s.totalLessons ?? 0,
            lastStudied: s.lastStudied ?? null,
            enrollmentSource: s.enrollmentSource ?? null,
          })
        ),
      })
      setLoading(false)
    } catch (error) {
      console.error('Dashboard fetch error:', error)
      setFetchError('error')
      setLoading(false)
    }
  }, [status, router])

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('student-dashboard-theme')
      if (stored) setThemeId(stored)
    } catch {}
  }, [])

  // Fetch dashboard data
  useEffect(() => {
    if (status !== 'authenticated') return
    fetchDashboardData()
  }, [status, fetchDashboardData])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
        <nav className="safe-top sticky top-0 z-50 border-b border-border bg-secondary">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-9 w-9 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </nav>
        <DashboardSkeleton loadingLabel={strings.loadingDashboard} />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const handleBookClass = async (classId: string) => {
    setBookingClassId(classId)
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId }),
      })
      const result = await response.json()

      if (response.ok) {
        if (result.checkoutUrl) {
          toast.success('Redirecting to payment...')
          window.location.href = result.checkoutUrl
          return
        }
        toast.success('Successfully booked class!')
        setData(prev =>
          prev
            ? {
                ...prev,
                classes: prev.classes.map(c =>
                  c.id === classId
                    ? {
                        ...c,
                        isBooked: true,
                        bookingId: result.booking?.id,
                        currentBookings: (c.currentBookings ?? 0) + 1,
                      }
                    : c
                ),
              }
            : null
        )
      } else {
        toast.error(result.error || 'Failed to book class')
      }
    } catch {
      toast.error('An error occurred while booking')
    } finally {
      setBookingClassId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
      {/* Navigation */}
      <nav className="safe-top sticky top-0 z-50 border-b border-border bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <Link
                href="/student/dashboard"
                className="inline-flex items-center"
                aria-label="Student dashboard"
              >
                <span className="sr-only">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select
                  value={themeId}
                  onValueChange={value => {
                    setThemeId(value)
                    try {
                      localStorage.setItem('student-dashboard-theme', value)
                    } catch {}
                  }}
                >
                  <SelectTrigger className="h-8 w-[190px] border-border bg-card text-foreground">
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
              <NotificationBell />
              <Link href="/student/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <UserNav />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 py-8 sm:px-6 lg:px-8" aria-busy={loading}>
        {fetchError && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
              <p className="text-sm font-medium">{strings.errorLoading}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchDashboardData()}
              className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {strings.retry}
            </Button>
          </div>
        )}
        {/* Welcome */}
        <div className="mb-8">
          <StudentHeroSection classes={data?.classes ?? []} />
        </div>

        <div className="space-y-6">
          <DashboardCalendar
            onRefresh={fetchDashboardData}
            contents={
              (data?.contents ?? []) as {
                id: string
                subject: string
                topic: string
                progress: number
                lastStudied?: string
              }[]
            }
            upcomingClasses={(data?.classes || []).map(
              (
                c: DashboardClass & {
                  scheduledAt?: string
                  tutor?: { name?: string }
                  _count?: { participants?: number }
                  type?: string
                }
              ) => ({
                id: c.id,
                title: c.title,
                subject: c.subject,
                scheduledAt: c.startTime || c.scheduledAt || '',
                duration: c.duration,
                maxStudents: c.maxStudents,
                students: c.currentBookings || c._count?.participants || 0,
                tutorName: c.tutor?.name || 'Unknown Tutor',
                type: (c.type || 'online') as 'online' | 'in-person',
              })
            )}
            bookingClassId={bookingClassId}
            onBookClass={handleBookClass}
          />
        </div>
      </main>
    </div>
  )
}
