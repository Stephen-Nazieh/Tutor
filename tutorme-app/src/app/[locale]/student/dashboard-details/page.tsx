'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { toast } from 'sonner'
import { Flame, Settings, AlertCircle } from 'lucide-react'

import {
  DashboardSkeleton,
  MyCoursesCard,
  DashboardCalendar,
  LearningPathCard,
  MissedClassesCard,
  PendingAssignmentsCard
} from '../dashboard/components'
import { SpacedRepetitionDashboard } from '@/components/spaced-repetition'
import type { DashboardClass, DashboardData } from '../dashboard/types'
import { getDashboardStrings } from '../dashboard/dashboard-strings'

export default function StudentDashboardDetails() {
  const router = useRouter()
  const { status } = useSession()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [bookingClassId, setBookingClassId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [reviewData, setReviewData] = useState<{ subjectCurves: any[]; upcomingReviews: any[]; overdueReviews: any[]; totalDue: number; reviewHistory?: any[] } | null>(null)

  const strings = getDashboardStrings('en')

  const fetchDashboardData = useCallback(async () => {
    if (status !== 'authenticated') return
    setFetchError(null)
    setLoading(true)

    try {
      const responses = await Promise.all([
        fetch('/api/content').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ contents: [] }) })),
        fetch('/api/gamification').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ success: false }) })),
        fetch('/api/gamification/worlds').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ success: false, data: [] }) })),
        fetch('/api/recommendations').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ recommendations: [] }) })),
        fetch('/api/classes?limit=3').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ classes: [] }) })),
        fetch('/api/student/subjects').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ subjects: [] }) })),
        fetch('/api/student/reviews').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ success: false, data: null }) }))
      ])

      const authErrors = responses.filter(r => r.status === 401)
      if (authErrors.length > 0) {
        router.replace('/login')
        return
      }

      const [contentData, gamificationData, worldsData, recsData, classesData, subjectsData, reviewsData] =
        await Promise.all(responses.map(r => r.json()))

      const subjects = subjectsData?.subjects ?? []
      setData({
        contents: contentData?.contents ?? [],
        gamification: gamificationData?.data ?? null,
        worlds: worldsData?.data ?? [],
        dailyQuests: [],
        recommendations: recsData?.recommendations ?? [],
        classes: classesData?.classes ?? [],
        studyGroups: [],
        courses: subjects.map((s: { id: string; name: string; subject: string; description?: string | null; progress: number; completedLessons: number; totalLessons: number; lastStudied?: string | null; enrollmentSource?: string | null }) => ({
          id: s.id,
          name: s.name,
          subject: s.subject,
          description: s.description ?? null,
          progress: s.progress ?? 0,
          completedLessons: s.completedLessons ?? 0,
          totalLessons: s.totalLessons ?? 0,
          lastStudied: s.lastStudied ?? null,
          enrollmentSource: s.enrollmentSource ?? null
        }))
      })
      setReviewData(reviewsData?.data || null)
      setLoading(false)
    } catch (error) {
      console.error('Dashboard fetch error:', error)
      setFetchError('error')
      setLoading(false)
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetchDashboardData()
  }, [status, fetchDashboardData])

  const handleBookClass = async (classId: string) => {
    setBookingClassId(classId)
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId })
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
                    currentBookings: (c.currentBookings ?? 0) + 1
                  }
                  : c
              )
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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b sticky top-0 z-50 safe-top">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-9 w-9 bg-gray-100 rounded animate-pulse" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 safe-top">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/student/dashboard" className="inline-flex items-center" aria-label="Student dashboard">
                <span className="sr-only">Dashboard</span>
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {data?.gamification && (
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{data.gamification.streakDays} day streak</span>
                </div>
              )}
              <NotificationBell />
              <Link href="/student/settings">
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </Link>
              <UserNav />
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8" aria-busy={loading}>
        {fetchError && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
              <p className="text-sm font-medium">{strings.errorLoading}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => fetchDashboardData()} className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              {strings.retry}
            </Button>
          </div>
        )}

        <div className="space-y-6">
          <MyCoursesCard courses={data?.courses ?? []} onCourseRemoved={fetchDashboardData} />
          <LearningPathCard />
          <PendingAssignmentsCard />
          <MissedClassesCard />
          <DashboardCalendar
            onRefresh={fetchDashboardData}
            contents={(data?.contents ?? []) as { id: string; subject: string; topic: string; progress: number; lastStudied?: string }[]}
            upcomingClasses={(data?.classes || []).map((c: DashboardClass & { scheduledAt?: string; tutor?: { name?: string }; _count?: { participants?: number }; type?: string }) => ({
              id: c.id,
              title: c.title,
              subject: c.subject,
              scheduledAt: c.startTime || c.scheduledAt || '',
              duration: c.duration,
              maxStudents: c.maxStudents,
              students: c.currentBookings || c._count?.participants || 0,
              tutorName: c.tutor?.name || 'Unknown Tutor',
              type: (c.type || 'online') as 'online' | 'in-person'
            }))}
            bookingClassId={bookingClassId}
            onBookClass={handleBookClass}
          />
          <SpacedRepetitionDashboard
            reviewData={reviewData}
            onRefresh={fetchDashboardData}
            fullWidth={true}
          />
        </div>
      </main>
    </div>
  )
}
