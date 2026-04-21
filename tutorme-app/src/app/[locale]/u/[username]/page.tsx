'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  Video,
  Search,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { format, parseISO, addDays, startOfWeek, isSameDay } from 'date-fns'

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
    categories: string[]
    estimatedHours?: number | null
    enrollmentCount: number
    lessonCount: number
    price?: number | null
    isFree?: boolean
    currency?: string | null
    scheduleSummary?: string | null
    country?: string | null
    schedule?: any[]
    liveSessionsTotal?: number
    liveSessionsCompleted?: number
    enrollmentStatus?: 'ongoing' | 'ended'
  }>
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
        <span className="text-muted-foreground text-sm">({count})</span>
      )}
    </div>
  )
}

interface TimeSlot {
  date: string
  startTime: string
  endTime: string
  dayOfWeek: number
  timezone: string
}

interface AvailabilityData {
  available: boolean
  hourlyRate: number
  pricingIncomplete?: boolean
  reason?: string
  currency: string
  timezone: string
  slots: TimeSlot[]
}

// Book 1 on 1 Dialog Component
function Book1on1Dialog({
  open,
  onOpenChange,
  tutor,
  username,
  locale,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  tutor: PublicTutorResponse['tutor']
  username: string
  locale: string
}) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)
  const [activeRequest, setActiveRequest] = useState<{ id: string; status: string } | null>(null)

  useEffect(() => {
    if (open && tutor.id) {
      loadAvailability()
      checkExistingRequest()
    }
  }, [open, tutor.id])

  const loadAvailability = async () => {
    setLoading(true)
    setAvailabilityError(null)
    setAvailability(null)
    try {
      const start = new Date().toISOString()
      const end = addDays(new Date(), 21).toISOString() // 3 weeks
      const res = await fetch(
        `/api/public/tutors/${encodeURIComponent(username)}/availability?start=${start}&end=${end}`
      )
      if (res.ok) {
        const data = await res.json()
        setAvailability(data)
        if (data.pricingIncomplete) {
          setAvailabilityError('Pricing not set')
        }
      } else {
        const error = await res.json().catch(() => ({}))
        setAvailabilityError(error.error || 'Failed to load availability')
        toast.error(error.error || 'Failed to load availability')
      }
    } catch {
      setAvailabilityError('Failed to load availability')
      toast.error('Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  const checkExistingRequest = async () => {
    if (!session?.user) return
    try {
      const res = await fetch(`/api/one-on-one/status?tutorId=${encodeURIComponent(tutor.id)}`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setHasPendingRequest(data.hasActiveRequest)
        setActiveRequest(data.request)
      }
    } catch {
      // ignore
    }
  }

  const handleSubmit = async () => {
    if (!selectedSlot || !session?.user) {
      toast.error('Please select a time slot')
      return
    }

    setSubmitting(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/one-on-one/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          tutorId: tutor.id,
          proposedSlots: [
            {
              date: selectedSlot.date,
              startTime: selectedSlot.startTime,
              endTime: selectedSlot.endTime,
            },
          ],
          duration: 60,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Booking request sent! The tutor will review and confirm.')
        setHasPendingRequest(true)
        setActiveRequest({ id: data.request.id, status: data.request.status })
        onOpenChange(false)
      } else if (res.status === 409) {
        toast.info('You already have a pending request with this tutor')
        setHasPendingRequest(true)
        if (data.existingRequestId) {
          setActiveRequest({ id: data.existingRequestId, status: data.status })
        }
      } else {
        toast.error(data.error || 'Failed to send request')
      }
    } catch {
      toast.error('Failed to send request')
    } finally {
      setSubmitting(false)
    }
  }

  // Group slots by date
  const slotsByDate = useMemo(() => {
    if (!availability?.slots) return {}
    const grouped: Record<string, TimeSlot[]> = {}
    availability.slots.forEach(slot => {
      if (!grouped[slot.date]) grouped[slot.date] = []
      grouped[slot.date].push(slot)
    })
    return grouped
  }, [availability])

  const dates = useMemo(() => Object.keys(slotsByDate).sort(), [slotsByDate])

  if (!session?.user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book 1 on 1 Session</DialogTitle>
            <DialogDescription>Please log in to book a session with {tutor.name}</DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center">
            <Button asChild>
              <Link href={`/${locale}/login`}>Log In</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (hasPendingRequest && activeRequest) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Request Pending</DialogTitle>
            <DialogDescription>
              You already have a pending booking request with {tutor.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
              <p className="font-medium">Status: {activeRequest.status}</p>
              <p className="mt-2 text-sm">
                Please wait for the tutor to respond. You will receive a notification once they
                accept or reject your request.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Book 1 on 1 Session with {tutor.name}
          </DialogTitle>
          <DialogDescription>
            Select an available time slot for your one-hour session.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : availabilityError ? (
          <div className="py-6 text-center">
            {availabilityError === 'Pricing not set' ? (
              <div className="space-y-2">
                <p className="font-medium text-amber-700">
                  This tutor is available for one-on-one sessions but has not set a price yet.
                </p>
                <p className="text-sm text-amber-600">
                  Please check back later or contact the tutor directly.
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {availability?.reason === 'disabled'
                  ? 'This tutor is not currently offering one-on-one sessions.'
                  : availabilityError}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Price info */}
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-blue-800">
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">
                {availability?.currency} {availability?.hourlyRate} per session (1 hour)
              </span>
            </div>

            {/* Timezone info */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Times shown in: {availability?.timezone}</span>
            </div>

            {/* Calendar slots */}
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-4 pr-4">
                {dates.length === 0 ? (
                  <div className="text-muted-foreground py-6 text-center">
                    No available slots in the next 3 weeks.
                  </div>
                ) : (
                  dates.map(date => {
                    const dateObj = parseISO(date)
                    const daySlots = slotsByDate[date]
                    return (
                      <div key={date} className="space-y-2">
                        <h4 className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          {format(dateObj, 'EEEE, MMMM d, yyyy')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {daySlots.map((slot, idx) => (
                            <Button
                              key={`${slot.date}-${slot.startTime}-${idx}`}
                              variant={
                                selectedSlot?.date === slot.date &&
                                selectedSlot?.startTime === slot.startTime
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => setSelectedSlot(slot)}
                            >
                              {slot.startTime} - {slot.endTime}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </ScrollArea>

            {selectedSlot && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-800">
                <p className="font-medium">Selected:</p>
                <p className="text-sm">
                  {format(parseISO(selectedSlot.date), 'EEEE, MMMM d, yyyy')} at{' '}
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedSlot || submitting || loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Confirm Booking Request'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  const [courseSearchQuery, setCourseSearchQuery] = useState('')
  const [courseCountryFilter, setCourseCountryFilter] = useState('global')
  const [courseCountryOptions, setCourseCountryOptions] = useState<string[]>([])
  const [courseSortOrder, setCourseSortOrder] = useState<'newest' | 'price_asc' | 'price_desc'>(
    'newest'
  )
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set())
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null)
  const [scheduleCourse, setScheduleCourse] = useState<
    PublicTutorResponse['courses'][number] | null
  >(null)
  const [detailsCourse, setDetailsCourse] = useState<PublicTutorResponse['courses'][number] | null>(
    null
  )
  const [classroomPickerCourse, setClassroomPickerCourse] = useState<
    PublicTutorResponse['courses'][number] | null
  >(null)
  const [classroomPickerSessions, setClassroomPickerSessions] = useState<
    Array<{
      id?: string
      sessionId?: string
      courseId?: string | null
      status?: string
      scheduledAt?: string | Date | null
    }>
  >([])

  useEffect(() => {
    loadTutorData()
  }, [username])

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const res = await fetch('/api/public/countries', { cache: 'no-store' })
        const json = await res.json().catch(() => ({}))
        const countries = Array.isArray(json?.countries)
          ? (json.countries as string[]).filter(c => typeof c === 'string' && !!c.trim())
          : []
        setCourseCountryOptions(countries)
      } catch {
        setCourseCountryOptions([])
      }
    }
    loadCountries()
  }, [])

  useEffect(() => {
    if (!data?.tutor?.id) return
    loadFollowState(data.tutor.id)
  }, [data?.tutor?.id])

  useEffect(() => {
    if (session?.user?.role === 'STUDENT') {
      loadStudentEnrollments()
    }
  }, [session?.user?.role])

  const loadStudentEnrollments = async () => {
    try {
      const res = await fetch('/api/student/enrollments', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        const ids = new Set<string>((data.enrollments || []).map((e: any) => e.courseId))
        setEnrolledCourseIds(ids)
      }
    } catch {
      // ignore
    }
  }

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

  const filteredCourses = useMemo(() => {
    let result = data?.courses ?? []

    if (courseSearchQuery) {
      const q = courseSearchQuery.toLowerCase()
      result = result.filter(
        c =>
          c.name?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.categories?.some((cat: string) => cat.toLowerCase().includes(q))
      )
    }

    if (courseCountryFilter !== 'global') {
      result = result.filter(c => c.country === courseCountryFilter)
    }

    if (courseSortOrder === 'price_asc') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (courseSortOrder === 'price_desc') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0))
    }

    return result
  }, [data?.courses, courseSearchQuery, courseCountryFilter, courseSortOrder])

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="bg-muted h-8 w-1/3 rounded" />
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

  const tutor = data?.tutor
  const isTutorOwner = session?.user?.role === 'TUTOR' && session?.user?.id === tutor?.id

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
          courseId: course.id,
          title: course.name,
          subject: course.categories[0] || 'general',
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
      if (!enrolledCourseIds.has(course.id)) {
        toast.info('Please enroll in the course first.')
        router.push(`/${locale}/courses/${course.id}`)
        return
      }

      const roomsRes = await fetch(
        `/api/class/rooms?courseId=${encodeURIComponent(course.id)}&includeScheduled=1`,
        { credentials: 'include' }
      )
      const roomsData = await roomsRes.json().catch(() => ({}))
      const sessions = (roomsData?.sessions ?? []) as Array<{
        id?: string
        sessionId?: string
        courseId?: string | null
        status?: string
        scheduledAt?: string | Date | null
      }>

      const matching = sessions.filter(s => s.courseId === course.id && (s.id || s.sessionId))

      if (matching.length === 0) {
        toast.info('No upcoming sessions are scheduled yet.')
        return
      }

      setClassroomPickerCourse(course)
      setClassroomPickerSessions(matching)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Unable to join classroom')
    } finally {
      setStudentJoiningCourseId(null)
    }
  }

  const sortedClassroomPickerSessions = useMemo(() => {
    const now = Date.now()
    const sessions = [...classroomPickerSessions]
    sessions.sort((a, b) => {
      const aStart = new Date(a.scheduledAt ?? 0).getTime()
      const bStart = new Date(b.scheduledAt ?? 0).getTime()
      const aOngoing = a.status === 'active' && aStart <= now
      const bOngoing = b.status === 'active' && bStart <= now
      if (aOngoing !== bOngoing) return aOngoing ? -1 : 1
      const aUpcoming = aStart >= now
      const bUpcoming = bStart >= now
      if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1
      if (aUpcoming && bUpcoming) return aStart - bStart
      return bStart - aStart
    })
    return sessions
  }, [classroomPickerSessions])

  const handleEnrollClick = (course: PublicTutorResponse['courses'][number]) => {
    if (!session?.user) {
      toast.info('Please log in to enroll')
      router.push(`/${locale}/login`)
      return
    }
    const subject = course.categories?.[0] || 'general'
    router.push(`/${locale}/student/subjects/${encodeURIComponent(subject)}/courses/${encodeURIComponent(course.id)}`)
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
                  {typeof tutor.activeCourses === 'number'
                    ? tutor.activeCourses
                    : (data?.courses?.length ?? 0)}
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
            <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-[#1F2933]">
              <Button
                size="lg"
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
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => setBookDialogOpen(true)}
              >
                <Video className="h-4 w-4" />
                Book 1 on 1
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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Course Catalog</CardTitle>
              <CardDescription>Published courses by @{tutor.username}</CardDescription>
            </div>

            <div className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-end">
              <div className="relative flex w-full max-w-lg items-center gap-2">
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search course..."
                    className="h-9 w-full pl-9"
                    value={courseSearchQuery}
                    onChange={e => setCourseSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={courseCountryFilter}
                  onValueChange={(val: any) => setCourseCountryFilter(val)}
                >
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    {courseCountryOptions.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={courseSortOrder}
                  onValueChange={(val: any) => setCourseSortOrder(val)}
                >
                  <SelectTrigger className="h-9 w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className="inline-flex shrink-0 rounded-lg border border-slate-200 bg-slate-50 p-1 shadow-sm"
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
          </div>
        </CardHeader>
        <CardContent>
          {filteredCourses.length === 0 ? (
            <p className="text-muted-foreground text-sm">No published courses found.</p>
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
              {filteredCourses.map(
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
                        'bg-card flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 text-left shadow-sm',
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
                            {course.categories[0] || 'general'}
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
                            <dd className="text-slate-800">{course.lessonCount} lessons</dd>
                          </div>
                          <div className="flex items-start gap-1">
                            <dt className="flex shrink-0 items-center gap-0.5 font-medium text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              Schedule
                            </dt>
                            <dd className="min-w-0 text-slate-800">
                              {course.scheduleSummary ? (
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.preventDefault()
                                    setScheduleCourse(course)
                                  }}
                                  className="inline-flex items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                                >
                                  {course.scheduleSummary} <ExternalLink className="h-3 w-3" />
                                </button>
                              ) : (
                                'Schedule to be announced'
                              )}
                            </dd>
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
                        {course.isFree ? (
                          <span className="text-sm font-bold text-emerald-600">Free</span>
                        ) : course.price != null && course.price > 0 ? (
                          <span className="text-sm font-bold text-slate-900">
                            ${course.price}{' '}
                            <span className="text-[10px] font-normal text-slate-500">
                              / 1h session
                            </span>
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-emerald-600">Free</span>
                        )}
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
                            <>
                              {session?.user?.role === 'STUDENT' &&
                                course.enrollmentStatus !== 'ended' && (
                                  <>
                                    {enrolledCourseIds.has(course.id) ? (
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className={cn(isCompact && 'h-7 text-xs')}
                                        disabled
                                      >
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Enrolled
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="default"
                                        className={cn(isCompact && 'h-7 text-xs')}
                                        onClick={() => handleEnrollClick(course)}
                                        disabled={enrollingCourseId === course.id}
                                      >
                                        {enrollingCourseId === course.id ? (
                                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                        ) : (
                                          <UserPlus className="mr-1 h-3 w-3" />
                                        )}
                                        {enrollingCourseId === course.id ? 'Enrolling…' : 'Enroll'}
                                      </Button>
                                    )}
                                  </>
                                )}
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
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(isCompact && 'h-7 text-xs')}
                            onClick={() => setDetailsCourse(course)}
                          >
                            <FileText className="mr-1 h-3 w-3" />
                            Details
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

      {/* Book 1 on 1 Dialog */}
      <Book1on1Dialog
        open={bookDialogOpen}
        onOpenChange={setBookDialogOpen}
        tutor={tutor}
        username={normalizedUsername}
        locale={locale}
      />

      <Dialog open={!!detailsCourse} onOpenChange={open => !open && setDetailsCourse(null)}>
        <DialogContent className="h-[80vh] w-[80vw] max-w-none overflow-auto">
          <DialogHeader>
            <DialogTitle>{detailsCourse?.name}</DialogTitle>
            <DialogDescription>{detailsCourse?.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-500">Category</div>
                <div className="text-sm text-slate-900">
                  {detailsCourse?.categories?.[0] || 'general'}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-500">Sessions</div>
                <div className="text-sm text-slate-900">{detailsCourse?.lessonCount} lessons</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-500">Price</div>
                <div className="text-sm text-slate-900">
                  {detailsCourse?.isFree
                    ? 'Free'
                    : detailsCourse?.price != null
                      ? `$${detailsCourse.price} / 1h session`
                      : 'Free'}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-500">Schedule</div>
                <div className="text-sm text-slate-900">
                  {detailsCourse?.scheduleSummary?.trim() || 'Schedule to be announced'}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setDetailsCourse(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!scheduleCourse} onOpenChange={open => !open && setScheduleCourse(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{scheduleCourse?.name}</DialogTitle>
            <DialogDescription>{scheduleCourse?.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="mb-2 text-sm font-semibold">Weekly Schedule</h4>
            {scheduleCourse?.schedule && scheduleCourse.schedule.length > 0 ? (
              <div className="space-y-2">
                {scheduleCourse.schedule.map((slot: any, idx: number) => (
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
          <div className="flex justify-end">
            <Button onClick={() => setScheduleCourse(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!classroomPickerCourse}
        onOpenChange={open => {
          if (!open) {
            setClassroomPickerCourse(null)
            setClassroomPickerSessions([])
          }
        }}
      >
        <DialogContent className="h-[80vh] w-[80vw] max-w-none overflow-auto">
          <DialogHeader>
            <DialogTitle>Choose a session</DialogTitle>
            <DialogDescription>{classroomPickerCourse?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {sortedClassroomPickerSessions.map(s => {
              const id = (s.id || s.sessionId) as string
              const scheduledAtMs = new Date(s.scheduledAt ?? 0).getTime()
              const enterOpensAtMs = scheduledAtMs - 20 * 60 * 1000
              const nowMs = Date.now()
              const canEnter = nowMs >= enterOpensAtMs
              return (
                <div
                  key={id}
                  className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {new Date(scheduledAtMs).toLocaleString()}
                      </div>
                      <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>
                        {s.status === 'active' ? 'Live' : 'Scheduled'}
                      </Badge>
                    </div>
                    {!canEnter && (
                      <div className="mt-1 text-xs text-slate-500">
                        You can enter 20 minutes before start. Please come back at{' '}
                        {new Date(enterOpensAtMs).toLocaleTimeString()}.
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!canEnter) {
                        toast.info(
                          `Please wait until ${new Date(enterOpensAtMs).toLocaleTimeString()} to enter.`
                        )
                        return
                      }
                      setClassroomPickerCourse(null)
                      setClassroomPickerSessions([])
                      router.push(`/student/feedback?sessionId=${encodeURIComponent(id)}`)
                    }}
                    disabled={!canEnter}
                  >
                    Enter
                  </Button>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
