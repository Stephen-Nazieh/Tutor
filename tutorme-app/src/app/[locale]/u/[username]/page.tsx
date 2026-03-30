'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import {
  FileText,
  Star,
  UserCheck,
  UserPlus,
  CheckCircle,
  Copy,
  Share2,
  LayoutGrid,
  List,
  PanelsTopLeft,
  CalendarDays,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface PublicTutorResponse {
  tutor: {
    id: string
    name: string
    username: string
    bio: string
    avatarUrl: string | null
    specialties: string[]
    credentials: string
    hourlyRate: number | null
    tutorSince?: string | null
    country?: string | null
    activeCourses?: number | null
    socialLinks?: {
      tiktok?: string | null
      youtube?: string | null
      instagram?: string | null
      facebook?: string | null
    } | null
  }
  courses: Array<{
    id: string
    name: string
    description?: string | null
    subject: string
    gradeLevel?: string | null
    difficulty?: string | null
    estimatedHours?: number | null
    enrollmentCount: number
    lessonCount: number
    price?: number | null
    currency?: string | null
    scheduleSummary?: string | null
    liveSessionsTotal?: number
    liveSessionsCompleted?: number
    enrollmentStatus?: 'ongoing' | 'ended'
  }>
  source?: 'db' | 'mock'
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StarRating({ rating, count }: { rating: number | null; count?: number }) {
  if (rating === null) return null
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && count > 0 && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  )
}

export default function PublicTutorPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const username = typeof params?.username === 'string' ? params.username : ''
  const normalizedUsername = useMemo(() => username.trim().replace(/^@+/, ''), [username])
  const publicPath = useMemo(() => {
    if (!normalizedUsername) return ''
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
    return `${prefix}/u/${normalizedUsername}`
  }, [locale, normalizedUsername])
  const publicUrl = useMemo(
    () =>
      typeof window !== 'undefined' && publicPath
        ? `${window.location.origin}${publicPath}`
        : publicPath,
    [publicPath]
  )

  const canShare =
    typeof navigator !== 'undefined' &&
    typeof (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share ===
      'function'

  const handleCopyPublicUrl = async () => {
    if (!publicUrl) return
    try {
      await navigator.clipboard.writeText(publicUrl)
      toast.success('Public URL copied')
    } catch {
      toast.error('Unable to copy public URL')
    }
  }

  const handleSharePublicUrl = async () => {
    if (!publicUrl || !normalizedUsername || !canShare) return
    try {
      await (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
        title: `Tutor profile @${normalizedUsername}`,
        url: publicUrl,
      })
    } catch {
      // ignore share cancel
    }
  }

  const stripAt = (value: unknown): string => {
    if (typeof value !== 'string') return ''
    return value.replace(/^@+/, '').trim()
  }

  const [data, setData] = useState<PublicTutorResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [launchingCourseId, setLaunchingCourseId] = useState<string | null>(null)
  const [studentJoiningCourseId, setStudentJoiningCourseId] = useState<string | null>(null)
  const [followState, setFollowState] = useState({
    isFollowing: false,
    followerCount: 0,
    loading: true,
  })
  const [catalogLayout, setCatalogLayout] = useState<'grid' | 'list' | 'compact'>('compact')

  useEffect(() => {
    loadTutorData()
  }, [username])

  useEffect(() => {
    if (!data?.tutor?.id) return
    loadFollowState(data.tutor.id)
  }, [data?.tutor?.id])

  const loadTutorData = async () => {
    setLoading(true)
    try {
      const normalized = username.replace(/^@+/, '').toLowerCase()
      const res = await fetch(`/api/public/tutors/${encodeURIComponent(normalized)}`, {
        cache: 'no-store',
      })

      if (!res.ok) throw new Error('Not found')

      const tutorData = await res.json()

      // Use real database data
      setData({
        ...tutorData,
        courses: tutorData.courses.map((course: any) => ({
          ...course,
          rating: course.rating || null,
          reviewCount: course.reviewCount || 0,
          price: course.price || 0,
        })),
      })
    } catch {
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  const loadFollowState = async (tutorId: string) => {
    setFollowState(prev => ({ ...prev, loading: true }))
    try {
      const res = await fetch(`/api/follows?tutorId=${encodeURIComponent(tutorId)}`, {
        cache: 'no-store',
      })
      if (!res.ok) {
        setFollowState(prev => ({ ...prev, loading: false }))
        return
      }
      const followData = await res.json()
      setFollowState({
        isFollowing: Boolean(followData?.isFollowing),
        followerCount: Number(followData?.followerCount ?? 0),
        loading: false,
      })
    } catch {
      setFollowState(prev => ({ ...prev, loading: false }))
    }
  }

  const toggleFollow = async () => {
    if (!data?.tutor?.id || followState.loading) return

    setFollowState(prev => ({ ...prev, loading: true }))
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/follows', {
        method: followState.isFollowing ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ tutorId: data.tutor.id }),
      })

      const result = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 401) {
          toast.info('Please log in to follow tutors')
        } else {
          toast.error(result?.error || 'Unable to update follow status')
        }
        setFollowState(prev => ({ ...prev, loading: false }))
        return
      }

      setFollowState({
        isFollowing: Boolean(result?.isFollowing),
        followerCount: Number(result?.followerCount ?? followState.followerCount),
        loading: false,
      })
      toast.success(result?.isFollowing ? 'You are now following this tutor' : 'Unfollowed tutor')
    } catch {
      toast.error('Unable to update follow status')
      setFollowState(prev => ({ ...prev, loading: false }))
    }
  }

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 w-1/3 rounded bg-muted" />
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="w-full p-4 sm:p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-bold">Tutor not found</h2>
            <Button asChild className="mt-4">
              <Link href={`/${locale}/tutors`}>Browse Tutors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { tutor, courses, source } = data
  const isTutorOwner = session?.user?.role === 'TUTOR' && session?.user?.id === tutor.id

  const handleEnterClassroom = async (course: PublicTutorResponse['courses'][number]) => {
    if (!isTutorOwner) return
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
          description: course.description || undefined,
          maxStudents: 50,
          durationMinutes: 60,
        }),
      })

      const result = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 401) {
          toast.info('Please log in as the course tutor to enter the classroom')
        } else {
          toast.error(result?.error || 'Unable to launch classroom')
        }
        return
      }

      const sessionId = result?.room?.id || result?.session?.roomId || result?.session?.id
      if (!sessionId) {
        toast.error('Classroom created but no session ID returned')
        return
      }
      router.push(`/tutor/insights?sessionId=${sessionId}&courseId=${course.id}`)
    } catch {
      toast.error('Unable to launch classroom')
    } finally {
      setLaunchingCourseId(null)
    }
  }

  const handleStudentEnterClassroom = async (course: PublicTutorResponse['courses'][number]) => {
    if (isTutorOwner) return
    if (!session?.user || session.user.role !== 'STUDENT') {
      toast.info('Please log in as a student to join classrooms')
      return
    }
    if (studentJoiningCourseId) return

    setStudentJoiningCourseId(course.id)
    try {
      // 1) Ensure enrollment
      const checkRes = await fetch(
        `/api/student/enrollments/check?curriculumId=${encodeURIComponent(course.id)}`,
        { credentials: 'include' }
      )

      if (checkRes.status === 401) {
        toast.info('Please log in to enroll')
        return
      }

      if (!checkRes.ok) throw new Error('Failed to check enrollment status')

      const checkData = (await checkRes.json().catch(() => ({}))) as {
        isEnrolled?: boolean
      }

      if (!checkData?.isEnrolled) {
        toast.info('Enrolling to unlock classroom access…')

        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        const csrfToken = csrfData?.token ?? null

        const enrollRes = await fetch(`/api/curriculum/${encodeURIComponent(course.id)}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({
            startDate: new Date().toISOString(),
          }),
        })

        const enrollData = await enrollRes.json().catch(() => ({}))
        if (!enrollRes.ok) {
          toast.error(enrollData?.error || 'Failed to enroll')
          return
        }

        toast.success(enrollData?.message || 'Enrolled successfully')
      }

      // 2) Join latest active session for this curriculum
      const roomsRes = await fetch('/api/class/rooms', { credentials: 'include' })
      const roomsData = await roomsRes.json().catch(() => ({}))
      const sessions = (roomsData?.sessions ?? []) as Array<{
        id?: string
        curriculumId?: string
        scheduledAt?: string
      }>

      const matching = sessions
        .filter(s => s.curriculumId === course.id && typeof s.id === 'string')
        .sort(
          (a, b) => new Date(b.scheduledAt ?? 0).getTime() - new Date(a.scheduledAt ?? 0).getTime()
        )

      if (matching.length === 0) {
        toast.info('Enrolled! A live session will appear when it starts.')
        router.push(`/${locale}/student/courses?tab=mine`)
        return
      }

      router.push(`/student/feedback?sessionId=${encodeURIComponent(matching[0].id as string)}`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Unable to join classroom')
    } finally {
      setStudentJoiningCourseId(null)
    }
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6">
      <section className="relative overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white/95 p-8 shadow-lg">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#1D4ED8]/10 via-[#4FD1C5]/10 to-[#F17623]/10" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-shrink-0 flex-col items-center gap-3 text-center lg:w-[260px]">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-white shadow-lg">
                <AvatarImage src={tutor.avatarUrl || undefined} alt="Tutor avatar" />
                <AvatarFallback className="text-lg font-semibold">
                  {tutor.name ? tutor.name.slice(0, 2).toUpperCase() : 'TU'}
                </AvatarFallback>
              </Avatar>
            </div>

            <div>
              <div className="text-lg font-semibold text-[#0F172A]">{tutor.name || '@'}</div>
              <div className="text-xs text-[#64748B]">Solocorn Tutor</div>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5" />
                Verified
              </div>

              <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                  Tutor since
                </div>
                <div className="mt-1 text-sm font-medium text-[#0F172A]">
                  {tutor.tutorSince ? new Date(tutor.tutorSince).toLocaleDateString() : '—'}
                </div>
              </div>

              <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                  Active Courses
                </div>
                <div className="mt-1 text-sm font-medium text-[#0F172A]">
                  {typeof tutor.activeCourses === 'number' ? tutor.activeCourses : courses.length}
                </div>
              </div>

              <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Country</div>
                <div className="mt-1 text-sm font-medium text-[#0F172A]">
                  {tutor.country || '—'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#1F2933]">
              <Button
                size="sm"
                className={
                  followState.isFollowing
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-[#1D4ED8] text-white hover:bg-[#1B45C2]'
                }
                onClick={() => void toggleFollow()}
                disabled={followState.loading}
              >
                {followState.isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2 lg:items-stretch">
              <div className="flex min-h-[220px] flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 lg:min-h-0">
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Bio</div>
                <Textarea
                  value={tutor.bio || ''}
                  readOnly
                  className="mt-2 min-h-0 flex-1 resize-none border-[#E2E8F0] bg-white focus-visible:ring-[#4FD1C5]"
                />
              </div>

              <div className="flex min-h-0 flex-col gap-4">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                    Public URL
                  </div>
                  {publicUrl ? (
                    <>
                      <div className="mt-2 break-all text-sm font-medium text-[#1F2933]">
                        {publicUrl}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#F17623]">
                        @{tutor.username}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-[#1D4ED8]"
                          onClick={() => void handleCopyPublicUrl()}
                          disabled={!publicUrl}
                        >
                          <Copy className="mr-1 h-3.5 w-3.5" />
                          Copy link
                        </Button>
                        {canShare ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-[#1D4ED8]"
                            onClick={() => void handleSharePublicUrl()}
                          >
                            <Share2 className="mr-1 h-3.5 w-3.5" />
                            Share
                          </Button>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 rounded-2xl border border-dashed border-[#CBD5F5] p-4 text-sm text-[#64748B]">
                      Add a username below to generate your public link.
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                    Social Media Accounts
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="text-sm text-[#1F2933]">
                      <span className="font-semibold text-[#64748B]">TikTok:</span>{' '}
                      {tutor.socialLinks?.tiktok ? `@${stripAt(tutor.socialLinks.tiktok)}` : '—'}
                    </div>
                    <div className="text-sm text-[#1F2933]">
                      <span className="font-semibold text-[#64748B]">YouTube:</span>{' '}
                      {tutor.socialLinks?.youtube ? `@${stripAt(tutor.socialLinks.youtube)}` : '—'}
                    </div>
                    <div className="text-sm text-[#1F2933]">
                      <span className="font-semibold text-[#64748B]">Instagram:</span>{' '}
                      {tutor.socialLinks?.instagram
                        ? `@${stripAt(tutor.socialLinks.instagram)}`
                        : '—'}
                    </div>
                    <div className="text-sm text-[#1F2933]">
                      <span className="font-semibold text-[#64748B]">Facebook:</span>{' '}
                      {tutor.socialLinks?.facebook
                        ? `@${stripAt(tutor.socialLinks.facebook)}`
                        : '—'}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                    Categories
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tutor.specialties.length > 0 ? (
                      tutor.specialties.map((s, i) => (
                        <span
                          key={`${s}-${i}`}
                          className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-[#0F172A] shadow-sm ring-1 ring-[#E2E8F0]"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[#64748B]">General tutoring</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>Course Catalog</CardTitle>
              <CardDescription>Published courses by @{tutor.username}</CardDescription>
            </div>
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 shadow-sm"
              role="group"
              aria-label="Course layout"
            >
              <Button
                type="button"
                variant={catalogLayout === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="h-9 gap-1 px-3"
                onClick={() => setCatalogLayout('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                type="button"
                variant={catalogLayout === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="h-9 gap-1 px-3"
                onClick={() => setCatalogLayout('list')}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                type="button"
                variant={catalogLayout === 'compact' ? 'default' : 'ghost'}
                size="sm"
                className="h-9 gap-1 px-3"
                onClick={() => setCatalogLayout('compact')}
              >
                <PanelsTopLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Compact</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published courses yet.</p>
          ) : (
            <div
              className={cn(
                catalogLayout === 'grid' &&
                  'grid gap-4 sm:grid-cols-2 xl:grid-cols-3 [&>*]:aspect-square',
                catalogLayout === 'compact' &&
                  'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 [&>*]:aspect-square',
                catalogLayout === 'list' && 'flex flex-col gap-4'
              )}
            >
              {courses.map(
                (
                  course: PublicTutorResponse['courses'][number] & {
                    rating?: number | null
                    reviewCount?: number
                  }
                ) => {
                  const scheduleText = course.scheduleSummary?.trim() || 'Schedule to be announced'
                  const enrollmentStatus = course.enrollmentStatus ?? 'ongoing'
                  const liveTotal = course.liveSessionsTotal ?? 0
                  const liveDone = course.liveSessionsCompleted ?? 0
                  const liveLine =
                    liveTotal > 0
                      ? `${liveDone} of ${liveTotal} live sessions completed`
                      : liveDone > 0
                        ? `${liveDone} live session(s) completed`
                        : 'No live sessions on record yet'
                  const desc =
                    course.description?.trim() || 'No description provided for this course yet.'
                  const isList = catalogLayout === 'list'
                  const isCompact = catalogLayout === 'compact'

                  return (
                    <div
                      key={course.id}
                      className={cn(
                        'flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-card text-left shadow-sm',
                        isList &&
                          'aspect-auto min-h-0 flex-row items-stretch sm:min-h-[148px] [&>*]:first:shrink-0',
                        isCompact && 'text-xs'
                      )}
                    >
                      <div
                        className={cn(
                          'flex flex-1 flex-col p-4',
                          isList && 'min-w-0 pr-3',
                          isCompact && 'p-3'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={cn(
                              'line-clamp-2 font-semibold text-slate-900',
                              isCompact ? 'text-sm' : 'text-base'
                            )}
                          >
                            {course.name}
                          </h3>
                          <Badge variant="secondary" className="shrink-0 text-[10px] sm:text-xs">
                            {course.subject}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                          @{tutor.username}
                        </p>
                        <p
                          className={cn(
                            'mt-2 line-clamp-3 text-slate-600',
                            isCompact ? 'line-clamp-2 text-[11px]' : 'text-sm'
                          )}
                        >
                          {desc}
                        </p>
                        <dl
                          className={cn(
                            'mt-auto space-y-1.5 pt-3 text-slate-600',
                            isCompact ? 'text-[11px]' : 'text-xs sm:text-sm'
                          )}
                        >
                          <div className="flex gap-1">
                            <dt className="font-medium text-slate-500">Sessions</dt>
                            <dd className="text-slate-800">{course.lessonCount} in curriculum</dd>
                          </div>
                          <div className="flex items-start gap-1">
                            <dt className="flex shrink-0 items-center gap-0.5 font-medium text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              Schedule
                            </dt>
                            <dd className="min-w-0 text-slate-800">{scheduleText}</dd>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant={enrollmentStatus === 'ended' ? 'outline' : 'default'}
                              className={cn(
                                'text-[10px] font-semibold sm:text-xs',
                                enrollmentStatus === 'ongoing' &&
                                  'bg-emerald-600 hover:bg-emerald-600'
                              )}
                            >
                              {enrollmentStatus === 'ended'
                                ? 'Enrollment ended'
                                : 'Enrollment ongoing'}
                            </Badge>
                            <span className="text-slate-500">{liveLine}</span>
                          </div>
                        </dl>
                      </div>
                      <div
                        className={cn(
                          'flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3',
                          isList &&
                            'w-full min-w-[200px] max-w-full flex-col border-l border-t-0 sm:w-52',
                          isCompact && 'px-3 py-2'
                        )}
                      >
                        <StarRating rating={course.rating ?? null} count={course.reviewCount} />
                        {course.price ? (
                          <span className="text-sm font-bold text-slate-900">${course.price}</span>
                        ) : null}
                        <div className={cn('flex w-full flex-wrap gap-2', isList && 'justify-end')}>
                          {isTutorOwner ? (
                            <Button
                              size="sm"
                              variant="default"
                              className={cn(isCompact && 'h-7 text-xs')}
                              onClick={() => handleEnterClassroom(course)}
                              disabled={launchingCourseId === course.id}
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              {launchingCourseId === course.id ? 'Launching…' : 'Classroom'}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="default"
                              className={cn(isCompact && 'h-7 text-xs')}
                              onClick={() => void handleStudentEnterClassroom(course)}
                              disabled={studentJoiningCourseId === course.id}
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              {studentJoiningCourseId === course.id ? 'Enrolling…' : 'Classroom'}
                            </Button>
                          )}
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className={cn(isCompact && 'h-7 text-xs')}
                          >
                            <Link href={`/${locale}/curriculum/${course.id}`}>
                              <FileText className="mr-1 h-3 w-3" />
                              Outline
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
