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
  BookOpen,
  Users,
  Clock3,
  GraduationCap,
  Compass,
  FileText,
  Star,
  UserCheck,
  UserPlus,
  CheckCircle,
  Copy,
  Share2,
} from 'lucide-react'
import { toast } from 'sonner'

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
  const [followState, setFollowState] = useState({
    isFollowing: false,
    followerCount: 0,
    loading: true,
  })

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

  // Calculate aggregated tutor rating from courses
  const ratedCourses = data?.courses?.filter((c: any) => c.rating !== null) || []
  const tutorRating = ratedCourses.length
    ? ratedCourses.reduce((sum, c: any) => sum + (c.rating || 0), 0) / ratedCourses.length
    : null
  const totalReviews = data?.courses?.reduce((sum, c: any) => sum + (c.reviewCount || 0), 0) || 0

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
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollmentCount, 0)

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

  return (
    <div className="w-full space-y-6 p-4 sm:p-6">
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[280px,1fr,1fr] lg:items-start">
            {/* Left: avatar + name + verification + profile stats */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border shadow-sm">
                  <AvatarImage src={tutor.avatarUrl || undefined} alt={`${tutor.name} avatar`} />
                  <AvatarFallback>{getInitials(tutor.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tutor.name}</h1>
                  <p className="text-sm font-medium text-slate-600">@{tutor.username}</p>
                  {source === 'mock' ? <Badge variant="outline">Demo Data</Badge> : null}
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/70 bg-white/70 p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    Tutor since
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {tutor.tutorSince ? new Date(tutor.tutorSince).toLocaleDateString() : '—'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/70 p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    Active courses
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {typeof tutor.activeCourses === 'number' ? tutor.activeCourses : courses.length}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/70 p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Country</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {tutor.country || '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Bio */}
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
              <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Bio</div>
              <Textarea
                value={tutor.bio || ''}
                readOnly
                rows={6}
                className="mt-2 min-h-[140px] resize-none border-[#E2E8F0] bg-white focus-visible:ring-[#4FD1C5]"
              />
            </div>

            {/* Right: Public URL/handles + Social Media + follow actions */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Public URL</div>
                {publicUrl ? (
                  <>
                    <div className="mt-2 break-all text-sm font-medium text-slate-900">
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
                      >
                        <Copy className="mr-1 h-3.5 w-3.5" />
                        Copy link
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-[#1D4ED8]"
                        onClick={() => void handleSharePublicUrl()}
                        disabled={!canShare}
                      >
                        <Share2 className="mr-1 h-3.5 w-3.5" />
                        Share
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="mt-2 rounded-2xl border border-dashed border-[#CBD5F5] p-4 text-sm text-[#64748B]">
                    Add a username below to generate your public link.
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Social Media Accounts
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="text-sm text-slate-900">
                    <span className="font-semibold text-slate-700">TikTok:</span>{' '}
                    {tutor.socialLinks?.tiktok ? `@${stripAt(tutor.socialLinks.tiktok)}` : '—'}
                  </div>
                  <div className="text-sm text-slate-900">
                    <span className="font-semibold text-slate-700">YouTube:</span>{' '}
                    {tutor.socialLinks?.youtube ? `@${stripAt(tutor.socialLinks.youtube)}` : '—'}
                  </div>
                  <div className="text-sm text-slate-900">
                    <span className="font-semibold text-slate-700">Instagram:</span>{' '}
                    {tutor.socialLinks?.instagram
                      ? `@${stripAt(tutor.socialLinks.instagram)}`
                      : '—'}
                  </div>
                  <div className="text-sm text-slate-900">
                    <span className="font-semibold text-slate-700">Facebook:</span>{' '}
                    {tutor.socialLinks?.facebook ? `@${stripAt(tutor.socialLinks.facebook)}` : '—'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={followState.isFollowing ? 'default' : 'outline'}
                  onClick={toggleFollow}
                  className={followState.isFollowing ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                  disabled={followState.loading}
                >
                  {followState.isFollowing ? (
                    <UserCheck className="mr-2 h-4 w-4" />
                  ) : (
                    <UserPlus className="mr-2 h-4 w-4" />
                  )}
                  {followState.isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button asChild>
                  <Link href={`/${locale}/tutors`}>
                    <Compass className="mr-2 h-4 w-4" />
                    Discover Tutors
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/70 bg-white/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Expertise & Credentials</h3>
                <p className="text-xs text-slate-600">
                  Specialties, exams, and verified qualifications
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tutor.specialties.length > 0 ? (
                tutor.specialties.map(specialty => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">General Tutoring</Badge>
              )}
            </div>
            {tutor.credentials ? (
              <div className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm text-slate-700">
                <p className="mb-1.5 font-medium text-slate-900">Credentials</p>
                <p>{tutor.credentials}</p>
              </div>
            ) : null}
          </div>
        </div>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Published Courses</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{courses.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Students</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{totalEnrollments}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Rating</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {tutorRating !== null && tutorRating > 0 ? tutorRating.toFixed(1) : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
          <CardDescription>Published courses by @{tutor.username}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published courses yet.</p>
          ) : (
            courses.map((course: any) => (
              <div key={course.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">{course.name}</h3>
                    <p className="text-sm text-slate-600">
                      {course.description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{course.subject}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {course.gradeLevel ? (
                    <Badge variant="outline">
                      <GraduationCap className="mr-1 h-3 w-3" />
                      {course.gradeLevel}
                    </Badge>
                  ) : null}
                  {course.difficulty ? <Badge variant="outline">{course.difficulty}</Badge> : null}
                  {course.estimatedHours ? (
                    <Badge variant="outline">
                      <Clock3 className="mr-1 h-3 w-3" />
                      {course.estimatedHours}h
                    </Badge>
                  ) : null}
                  <Badge variant="outline">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {course.lessonCount} lessons
                  </Badge>
                  <Badge variant="outline">
                    <Users className="mr-1 h-3 w-3" />
                    {course.enrollmentCount} enrolled
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-4">
                    <StarRating rating={course.rating || 0} count={course.reviewCount} />
                    {course.price && (
                      <span className="font-bold text-slate-900">${course.price}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isTutorOwner ? (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleEnterClassroom(course)}
                        disabled={launchingCourseId === course.id}
                      >
                        <FileText className="mr-1 h-3 w-3" />
                        {launchingCourseId === course.id ? 'Launching…' : 'Enter Classroom'}
                      </Button>
                    ) : null}
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/${locale}/curriculum/${course.id}`}>
                        <FileText className="mr-1 h-3 w-3" />
                        View Outline
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
