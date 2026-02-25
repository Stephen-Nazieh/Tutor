'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { toast } from 'sonner'
import { Flame, Settings, AlertCircle, Video } from 'lucide-react'

import {
  DailyQuestsWidget,
  XpAnimation,
  LevelUpAnimation
} from '@/components/gamification'

import {
  StatsOverview,
  // ContinueLearning,  // Moved to DashboardCalendar tabs
  // UpcomingClasses,   // Moved to DashboardCalendar tabs
  SkillRadar,
  StudyGroups,
  DashboardSkeleton,
  QuickActionsCard,
  MyCoursesCard,
  DashboardCalendar,
  LearningPathCard,
  MissedClassesCard,
  PendingAssignmentsCard
} from './components'
import { SpacedRepetitionDashboard } from '@/components/spaced-repetition'
import type { DashboardClass, DashboardData, DailyQuestWithCompletion } from './types'
import { getDashboardStrings } from './dashboard-strings'

export default function StudentDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [showXpAnimation, setShowXpAnimation] = useState(false)
  const [xpGain, setXpGain] = useState<{ amount: number; reason: string } | null>(null)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [bookingClassId, setBookingClassId] = useState<string | null>(null)
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null)
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
        fetch('/api/gamification/quests').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ success: false, data: { quests: [] } }) })),
        fetch('/api/recommendations').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ recommendations: [] }) })),
        fetch('/api/classes?limit=3').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ classes: [] }) })),
        fetch('/api/study-groups?limit=3').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ groups: [] }) })),
        fetch('/api/student/subjects').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ subjects: [] }) })),
        fetch('/api/student/reviews').catch(() => ({ ok: true, status: 200, json: () => Promise.resolve({ success: false, data: null }) }))
      ])

      // Check for auth errors
      const authErrors = responses.filter(r => r.status === 401)
      if (authErrors.length > 0) {
        // User not authenticated, redirect to login
        router.replace('/login')
        return
      }

      const [contentData, gamificationData, worldsData, questsData, recsData, classesData, groupsData, subjectsData, reviewsData] =
        await Promise.all(responses.map(r => r.json()))

      const subjects = subjectsData?.subjects ?? []
      setData({
        contents: contentData?.contents ?? [],
        gamification: gamificationData?.data ?? null,
        worlds: worldsData?.data ?? [],
        dailyQuests: questsData?.data?.quests ?? [],
        recommendations: recsData?.recommendations ?? [],
        classes: classesData?.classes ?? [],
        studyGroups: groupsData?.groups ?? [],
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

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }
  }, [status, router])

  // Fetch dashboard data
  useEffect(() => {
    if (status !== 'authenticated') return
    fetchDashboardData()
  }, [status, fetchDashboardData])

  // Daily login check
  useEffect(() => {
    if (status !== 'authenticated' || !data?.gamification) return

    fetch('/api/gamification/daily-login', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.firstLoginToday) {
          setXpGain({ amount: data.data.xpEarned, reason: 'Daily Login' })
          setShowXpAnimation(true)
          if (data.data.leveledUp) {
            setTimeout(() => setShowLevelUp(true), 2000)
          }
        }
      })
  }, [status, data?.gamification])

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

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroupId(groupId)
    try {
      const response = await fetch('/api/study-groups/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId })
      })
      const result = await response.json()

      if (response.ok) {
        toast.success('Successfully joined study group!')
        setData(prev => prev ? {
          ...prev,
          studyGroups: prev.studyGroups.map(g => g.id === groupId
            ? { ...g, isMember: true, currentMembers: g.currentMembers + 1 }
            : g
          )
        } : null)
      } else {
        toast.error(result.error || 'Failed to join group')
      }
    } catch {
      toast.error('An error occurred while joining')
    } finally {
      setJoiningGroupId(null)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b sticky top-0 z-50 safe-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      {/* Animations */}
      {showXpAnimation && xpGain && (
        <XpAnimation amount={xpGain.amount} reason={xpGain.reason} onComplete={() => setShowXpAnimation(false)} />
      )}
      {showLevelUp && data?.gamification && (
        <LevelUpAnimation level={data.gamification.level} onComplete={() => setShowLevelUp(false)} />
      )}

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/student/dashboard" className="text-xl font-bold text-blue-600">TutorMe</Link>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-busy={loading}>
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
        {/* Welcome */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">{strings.welcomeTitle} {session?.user?.name?.split(' ')[0] || 'Student'}!</h1>
              <p className="text-gray-600 mt-1">{strings.welcomeSubtitle}</p>
            </div>
            <Button asChild>
              <Link href="/student/live/join">
                <Video className="w-4 h-4 mr-2" />
                Join Live Class
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview gamification={data?.gamification || null} />

        {/* Full Width Layout */}
        <div className="space-y-6">
          {/* My courses */}
          <MyCoursesCard courses={data?.courses ?? []} onCourseRemoved={fetchDashboardData} />

          {/* Learning Path — personalized next steps */}
          <LearningPathCard />

          {/* Pending Assignments — urgent due dates */}
          <PendingAssignmentsCard />

          {/* Missed Classes — catch-up recordings */}
          <MissedClassesCard />

          {/* Main Dashboard Tabs - Calendar, Classes, Continue Learning, Upcoming */}
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

          {/* Daily Quests - Full Width */}
          {data?.dailyQuests && data.dailyQuests.length > 0 ? (
            <DailyQuestsWidget
              quests={data.dailyQuests as { id: string; quest: { title: string; description: string; type: string; xpReward: number; requirement: number }; completed: boolean; progress: number }[]}
              completedCount={data.dailyQuests.filter((q: DailyQuestWithCompletion) => q.completed).length}
              totalXp={data.dailyQuests.reduce((acc: number, q: DailyQuestWithCompletion) => acc + (q.completed ? q.quest.xpReward : 0), 0)}
              onQuestClick={(quest) => !(quest as DailyQuestWithCompletion).completed && router.push('/student/missions')}
            />
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{strings.dailyQuests}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-6 text-center text-gray-500">
                  <p className="text-sm font-medium text-gray-700">{strings.noDailyQuests}</p>
                  <p className="text-xs mt-1">{strings.noDailyQuestsHint}</p>
                  <Button variant="outline" size="sm" className="mt-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" onClick={() => router.push('/student/missions')}>
                    {strings.goToMissions}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Spaced Repetition Dashboard - Full Width */}
          <SpacedRepetitionDashboard
            reviewData={reviewData}
            onRefresh={fetchDashboardData}
            fullWidth={true}
          />

          {/* Skills Radar - Full Width */}
          {data?.gamification?.skills && (
            <SkillRadar skills={data.gamification.skills} />
          )}

          {/* Study Groups - Full Width */}
          {data?.studyGroups && data.studyGroups.length > 0 && (
            <StudyGroups
              groups={data.studyGroups}
              joiningGroupId={joiningGroupId}
              onJoinGroup={handleJoinGroup}
            />
          )}

          {/* Quick Actions - At the Bottom */}
          <QuickActionsCard />
        </div>
      </main>
    </div>
  )
}
