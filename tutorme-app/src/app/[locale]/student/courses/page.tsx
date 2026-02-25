'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  X,
  Loader2,
  ArrowLeft,
  BookOpen,
  Video,
  Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  PlayCircle,
  Calculator,
  Languages,
  Music,
  Palette,
  Globe,
  Plus,
  Search,
  MessageCircle
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Loading fallback for Suspense
function CoursesPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

interface Class {
  id: string
  title: string
  subject: string
  description?: string
  startTime: string
  duration: number
  maxStudents: number
  currentBookings: number
  status: string
  roomUrl?: string
  isBooked: boolean
  bookingId?: string
  requiresPayment?: boolean
  price?: number | null
  paymentStatus?: string | null
  paymentCheckoutUrl?: string | null
  tutor: {
    id: string
    profile?: {
      name?: string
    }
  }
}

// --- TYPES & DATA FROM BROWSE PAGE ---
interface Subject {
  id: string
  name: string
  code: string
  category: string
  description: string
  level: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'AP'
  estimatedHours: number
  prerequisites?: string[]
  isEnrolled?: boolean
}

const subjectIcons: Record<string, React.ReactNode> = {
  english: <Languages className="w-6 h-6" />,
  math: <Calculator className="w-6 h-6" />,
  precalculus: <Calculator className="w-6 h-6" />,
  'ap-calculus-ab': <Calculator className="w-6 h-6" />,
  'ap-calculus-bc': <Calculator className="w-6 h-6" />,
  'ap-statistics': <Calculator className="w-6 h-6" />,
  ielts: <GraduationCap className="w-6 h-6" />,
  toefl: <GraduationCap className="w-6 h-6" />,
  'sat-math': <Calculator className="w-6 h-6" />,
  'sat-english': <BookOpen className="w-6 h-6" />,
  'ib-math': <Calculator className="w-6 h-6" />,
  'ib-english': <BookOpen className="w-6 h-6" />,
  music: <Music className="w-6 h-6" />,
  art: <Palette className="w-6 h-6" />,
  geography: <Globe className="w-6 h-6" />,
}

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  english: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
  math: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
  precalculus: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' },
  'ap-calculus-ab': { bg: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-200' },
  'ap-calculus-bc': { bg: 'bg-fuchsia-500', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
  'ap-statistics': { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  ielts: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-200' },
  toefl: { bg: 'bg-blue-700', text: 'text-blue-700', border: 'border-blue-200' },
  'sat-math': { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200' },
  'sat-english': { bg: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-200' },
  'ib-math': { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-200' },
  'ib-english': { bg: 'bg-teal-600', text: 'text-teal-700', border: 'border-teal-200' },
  music: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200' },
  art: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
  geography: { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-200' },
}

const allSubjects: Subject[] = [
  {
    id: '1', name: 'English', code: 'english', category: 'Language Arts', description: 'Language arts, writing, grammar, and literature analysis', level: 'Middle School - High School', difficulty: 'Intermediate', estimatedHours: 120,
  },
  {
    id: '2', name: 'Mathematics', code: 'math', category: 'Mathematics', description: 'Algebra, geometry, and foundational problem solving', level: 'Middle School - High School', difficulty: 'Intermediate', estimatedHours: 150,
  },
  {
    id: '3', name: 'Pre-calculus', code: 'precalculus', category: 'Mathematics', description: 'Functions, trigonometry, and preparation for calculus', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['Mathematics'],
  },
  {
    id: '4', name: 'AP Calculus AB', code: 'ap-calculus-ab', category: 'Mathematics', description: 'Limits, derivatives, integrals, and the Fundamental Theorem', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 140, prerequisites: ['Pre-calculus'],
  },
  {
    id: '5', name: 'AP Calculus BC', code: 'ap-calculus-bc', category: 'Mathematics', description: 'All AB topics plus series, parametric, and polar calculus', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 160, prerequisites: ['Pre-calculus', 'AP Calculus AB (recommended)'],
  },
  {
    id: '6', name: 'AP Statistics', code: 'ap-statistics', category: 'Mathematics', description: 'Data analysis, probability, and statistical inference', level: 'High School (AP)', difficulty: 'AP', estimatedHours: 120, prerequisites: ['Mathematics'],
  },
  {
    id: '10', name: 'IELTS', code: 'ielts', category: 'Test Preparation', description: 'International English Language Testing System preparation', level: 'High School - Adult', difficulty: 'Advanced', estimatedHours: 80, prerequisites: ['English'],
  },
  {
    id: '11', name: 'TOEFL', code: 'toefl', category: 'Test Preparation', description: 'Test of English as a Foreign Language preparation', level: 'High School - Adult', difficulty: 'Advanced', estimatedHours: 80, prerequisites: ['English'],
  },
  {
    id: '13', name: 'SAT Math', code: 'sat-math', category: 'Test Preparation', description: 'SAT Mathematics preparation covering algebra, problem solving, and data analysis', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['Mathematics'],
  },
  {
    id: '14', name: 'SAT English', code: 'sat-english', category: 'Test Preparation', description: 'SAT Reading and Writing preparation with grammar and comprehension focus', level: 'High School', difficulty: 'Advanced', estimatedHours: 100, prerequisites: ['English'],
  },
  {
    id: '15', name: 'IB Math', code: 'ib-math', category: 'International Baccalaureate', description: 'International Baccalaureate Mathematics at Standard and Higher Levels', level: 'High School (IB)', difficulty: 'Advanced', estimatedHours: 180, prerequisites: ['Mathematics'],
  },
  {
    id: '16', name: 'IB English', code: 'ib-english', category: 'International Baccalaureate', description: 'International Baccalaureate English Language and Literature', level: 'High School (IB)', difficulty: 'Advanced', estimatedHours: 160, prerequisites: ['English'],
  },
]

const FILTER_SUBJECTS = ['all', 'math', 'physics', 'chemistry', 'english'] as const
type FilterSubject = (typeof FILTER_SUBJECTS)[number]

// Inner component that uses searchParams
function CoursesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subjectFromUrl = searchParams.get('subject')?.toLowerCase().trim() || null
  const tabFromUrl = searchParams.get('tab')
  const { data: session, status } = useSession()

  const [activeTab, setActiveTab] = useState(tabFromUrl || 'upcoming')
  const [classes, setClasses] = useState<Class[]>([])
  const [myBookings, setMyBookings] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingClassId, setBookingClassId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterSubject>(
    subjectFromUrl && FILTER_SUBJECTS.includes(subjectFromUrl as FilterSubject) ? subjectFromUrl as FilterSubject : 'all'
  )

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  // --- BROWSE STATE ---
  const [subjects, setSubjects] = useState<Subject[]>(allSubjects)
  const [enrolledIds, setEnrolledIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [enrolling, setEnrolling] = useState(false)
  const [removingSubjectCode, setRemovingSubjectCode] = useState<string | null>(null)

  // Derived state for My Courses tab
  const myCourses = subjects.filter(s => enrolledIds.includes(s.id))

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  useEffect(() => {
    if (subjectFromUrl && FILTER_SUBJECTS.includes(subjectFromUrl as FilterSubject)) {
      setFilter(subjectFromUrl as FilterSubject)
    } else if (!subjectFromUrl) {
      setFilter('all')
    }
  }, [subjectFromUrl])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchClasses()
      fetchMyBookings()
      fetchEnrolledSubjects()
    }
  }, [status, subjectFromUrl])

  const fetchEnrolledSubjects = async () => {
    try {
      const res = await fetch('/api/student/subjects')
      if (res.ok) {
        const data = await res.json()
        const enrolled = data.subjects?.map((s: Subject) => s.id) || []
        setEnrolledIds(enrolled)
      }
    } catch (error) {
      console.error('Failed to fetch enrolled subjects')
    }
  }

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleEnroll = async (subject: Subject) => {
    setEnrolling(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/student/subjects/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        credentials: 'include',
        body: JSON.stringify({ subjectCode: subject.code }),
      })

      if (res.ok) {
        toast.success(`Enrolled in ${subject.name}!`)
        setEnrolledIds([...enrolledIds, subject.id])
        setSelectedSubject(null)
      } else {
        const error = await res.json().catch(() => ({}))
        toast.error(error.message || error.error || 'Failed to enroll')
      }
    } catch (error) {
      toast.error('Failed to enroll in subject')
    } finally {
      setEnrolling(false)
    }
  }

  const handleUnenroll = async (subject: Subject) => {
    setRemovingSubjectCode(subject.code)
    try {
      const csrf = await getCsrf()
      const res = await fetch('/api/student/subjects/unenroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        credentials: 'include',
        body: JSON.stringify({ subjectCode: subject.code }),
      })
      if (res.ok) {
        toast.success(`Removed ${subject.name}`)
        setEnrolledIds(prev => prev.filter(id => id !== subject.id))
      } else {
        const error = await res.json().catch(() => ({}))
        toast.error(error.message || error.error || 'Failed to remove subject')
      }
    } catch {
      toast.error('Failed to remove subject')
    } finally {
      setRemovingSubjectCode(null)
    }
  }

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || subject.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || subject.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Helper functions
  const getSubjectIcon = (code: string) => subjectIcons[code.toLowerCase()] || <BookOpen className="w-6 h-6" />

  const getSubjectColors = (code: string) => subjectColors[code.toLowerCase()] || {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200'
  }

  const categories = ['all', ...Array.from(new Set(subjects.map(s => s.category)))]
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'AP']

  const fetchClasses = async () => {
    try {
      const params = new URLSearchParams({ limit: '20' })
      if (subjectFromUrl) params.set('subject', subjectFromUrl)
      const res = await fetch(`/api/classes?${params.toString()}`)
      const data = await res.json()
      if (data.classes) {
        setClasses(data.classes)
      }
    } catch (error) {
      toast.error(`Error`, {
        description: "Failed to load classes",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMyBookings = async () => {
    try {
      const params = new URLSearchParams({ myBookings: 'true' })
      if (subjectFromUrl) params.set('subject', subjectFromUrl)
      const res = await fetch(`/api/classes?${params.toString()}`)
      const data = await res.json()
      if (data.classes) {
        setMyBookings(data.classes)
      }
    } catch (error) {
      console.error('Failed to fetch bookings')
    }
  }

  const handleBookClass = async (classId: string) => {
    setBookingClassId(classId)
    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId })
      })
      const data = await res.json()

      if (data.success) {
        if (data.checkoutUrl) {
          toast.success('Redirecting to payment...', {
            description: 'Complete payment to confirm your spot.',
          })
          window.location.href = data.checkoutUrl
          return
        }
        toast.success(`Class Booked! 📅`, {
          description: data.message,
        })
        fetchClasses()
        fetchMyBookings()
      } else {
        toast.error(`Booking Failed`, {
          description: data.error || 'Failed to book class',
        })
      }
    } catch (error) {
      toast.error(`Error`, {
        description: 'Failed to book class. Please try again.',
      })
    } finally {
      setBookingClassId(null)
    }
  }

  const [payingBookingId, setPayingBookingId] = useState<string | null>(null)

  const handlePayNow = async (cls: Class) => {
    if (!cls.bookingId) return
    setPayingBookingId(cls.bookingId)
    try {
      if (cls.paymentCheckoutUrl) {
        window.location.href = cls.paymentCheckoutUrl
        return
      }
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: cls.bookingId })
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        toast.error(data.error || 'Could not start payment')
      }
    } catch {
      toast.error('Failed to start payment')
    } finally {
      setPayingBookingId(null)
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch('/api/classes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      })
      const data = await res.json()

      if (data.success) {
        toast.success(`Booking Cancelled`, {
          description: data.message,
        })
        // Refresh both lists
        fetchClasses()
        fetchMyBookings()
      } else {
        toast.error(`Failed to Cancel`, {
          description: data.error || 'Failed to cancel booking',
        })
      }
    } catch (error) {
      toast.error(`Error`, {
        description: 'Failed to cancel booking. Please try again.',
      })
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday = date.toDateString() === now.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()

    const dateStr_formatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })

    if (isToday) return `Today at ${timeStr}`
    if (isTomorrow) return `Tomorrow at ${timeStr}`
    return `${dateStr_formatted} at ${timeStr}`
  }

  const isPast = (dateStr: string) => {
    return new Date(dateStr) < new Date()
  }

  // When we have subject from URL, API already returned only that subject; otherwise filter client-side
  const filteredClasses = subjectFromUrl
    ? classes
    : filter === 'all'
      ? classes
      : classes.filter(c => c.subject.toLowerCase().includes(filter))

  const upcomingClasses = filteredClasses.filter(c => !isPast(c.startTime))
  const pastClasses = filteredClasses.filter(c => isPast(c.startTime))

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading classes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">TutorMe</h1>
          </div>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Live Classes
            {subjectFromUrl && (
              <span className="text-xl font-normal text-gray-600 ml-2">
                — {subjectFromUrl.charAt(0).toUpperCase() + subjectFromUrl.slice(1)}
              </span>
            )}
          </h2>
          <p className="text-gray-600 mt-1">
            {subjectFromUrl
              ? `Human tutor classes for ${subjectFromUrl.charAt(0).toUpperCase() + subjectFromUrl.slice(1)} only`
              : 'Join interactive sessions with expert tutors'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => {
          setActiveTab(val)
          // Optional: update URL
          const params = new URLSearchParams(searchParams.toString())
          params.set('tab', val)
          router.replace(`/student/courses?${params.toString()}`)
        }} className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="browse">Browse Subjects</TabsTrigger>
            <TabsTrigger value="my-bookings">Live Class Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {/* Filter buttons — when subject in URL, "View all subjects" clears filter and refetches */}
            <div className="flex flex-wrap gap-2">
              {FILTER_SUBJECTS.map((f) => (
                <Button
                  key={f}
                  variant={filter === f && !subjectFromUrl ? 'default' : subjectFromUrl === f ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (f === 'all') {
                      router.push('/student/courses')
                      setFilter('all')
                      return
                    }
                    setFilter(f)
                    router.push(`/student/courses?subject=${encodeURIComponent(f)}`)
                  }}
                >
                  {f === 'all' ? (subjectFromUrl ? 'View all subjects' : 'All Subjects') : f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>

            {upcomingClasses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingClasses.map((cls) => (
                  <Card key={cls.id} className={cls.isBooked ? 'border-green-300 bg-green-50/50' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {cls.subject}
                          </Badge>
                          <CardTitle className="text-lg">{cls.title}</CardTitle>
                        </div>
                        {cls.isBooked && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Booked
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(cls.startTime)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {cls.duration} minutes
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {cls.currentBookings}/{cls.maxStudents} students
                        </div>
                        {cls.price != null && cls.price > 0 && (
                          <div className="flex items-center gap-2 text-green-600 font-medium">
                            SGD {cls.price.toFixed(2)}
                          </div>
                        )}
                        {cls.tutor.profile?.name && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Tutor: {cls.tutor.profile.name}
                          </div>
                        )}
                      </div>

                      {cls.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {cls.description}
                        </p>
                      )}

                      <div className="pt-2">
                        {cls.isBooked ? (
                          <div className="flex gap-2">
                            {cls.roomUrl && (
                              <Button className="flex-1" asChild>
                                <a href={cls.roomUrl} target="_blank" rel="noopener noreferrer">
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Room
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleCancelBooking(cls.bookingId!)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="w-full"
                            disabled={bookingClassId === cls.id || cls.currentBookings >= cls.maxStudents}
                            onClick={() => handleBookClass(cls.id)}
                          >
                            {bookingClassId === cls.id ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {cls.currentBookings >= cls.maxStudents ? 'Full' : 'Book Now'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">No upcoming classes</h3>
                  <p className="text-gray-500 mt-1">Check back later for new sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-bookings">
            {myBookings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myBookings.map((cls) => (
                  <Card key={cls.id} className={isPast(cls.startTime) ? 'opacity-70' : 'border-green-300'}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {cls.subject}
                          </Badge>
                          <CardTitle className="text-lg">{cls.title}</CardTitle>
                        </div>
                        <Badge className={isPast(cls.startTime) ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-800'}>
                          {isPast(cls.startTime) ? 'Completed' : 'Upcoming'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(cls.startTime)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {cls.duration} minutes
                        </div>
                      </div>

                      {!isPast(cls.startTime) && (
                        <div className="flex flex-col gap-2 pt-2">
                          {cls.requiresPayment && cls.paymentStatus !== 'COMPLETED' && (
                            <Button
                              className="w-full"
                              disabled={payingBookingId === cls.bookingId}
                              onClick={() => handlePayNow(cls)}
                            >
                              {payingBookingId === cls.bookingId ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              ) : null}
                              Pay now
                            </Button>
                          )}
                          <div className="flex gap-2">
                            {cls.roomUrl && (
                              <Button className="flex-1" asChild>
                                <a href={cls.roomUrl} target="_blank" rel="noopener noreferrer">
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Room
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              onClick={() => handleCancelBooking(cls.bookingId!)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">No bookings yet</h3>
                  <p className="text-gray-500 mt-1">Book your first class session above</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastClasses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastClasses.map((cls) => (
                  <Card key={cls.id} className="opacity-70">
                    <CardHeader>
                      <Badge variant="secondary" className="mb-2">
                        {cls.subject}
                      </Badge>
                      <CardTitle className="text-lg">{cls.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(cls.startTime)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {cls.duration} minutes
                      </div>
                      <Badge variant="outline" className="mt-2">
                        Completed
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">No past sessions</h3>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="font-semibold text-sm text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const dayNum = (i % 31) + 1
                        // Simple check to identify today (approximate logic from original)
                        const isToday = dayNum === new Date().getDate() &&
                          currentDate.getMonth() === new Date().getMonth() &&
                          currentDate.getFullYear() === new Date().getFullYear();

                        return (
                          <div
                            key={i}
                            className={`aspect-square border rounded-lg flex items-center justify-center text-sm hover:bg-gray-50 cursor-pointer ${isToday ? 'bg-blue-50 border-blue-200 font-bold' : ''}`}
                          >
                            {dayNum}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Today's Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // Filter classes for today
                      const today = new Date();
                      const todayClasses = myBookings.filter(c => {
                        const cDate = new Date(c.startTime);
                        return cDate.getDate() === today.getDate() &&
                          cDate.getMonth() === today.getMonth() &&
                          cDate.getFullYear() === today.getFullYear();
                      });

                      if (todayClasses.length === 0) {
                        return <p className="text-gray-500 text-sm">No classes scheduled for today</p>;
                      }

                      return (
                        <div className="space-y-3">
                          {todayClasses.map(c => (
                            <div key={c.id} className="p-3 bg-gray-50 rounded-lg text-sm border">
                              <div className="font-medium">{c.title}</div>
                              <div className="text-gray-500 text-xs mt-1">
                                {formatDate(c.startTime).split(' at ')[1]} • {c.duration} min
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 text-sm">No upcoming deadlines</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="my-courses">
            {myCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((subject) => {
                  const colors = getSubjectColors(subject.code)
                  return (
                    <Card key={subject.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${colors.bg}`}>
                            {getSubjectIcon(subject.code)}
                          </div>
                          {/* Placeholder progress for now */}
                          <Badge variant="outline">Enrolled</Badge>
                        </div>
                        <CardTitle className="text-lg mt-3">{subject.name}</CardTitle>
                        <CardDescription>{subject.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                            {subject.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Button asChild className="w-full gap-2" variant="default">
                            <Link href={`/student/subjects/${subject.code}`}>
                              <PlayCircle className="h-4 w-4" />
                              Continue Learning
                            </Link>
                          </Button>

                          <div className="grid grid-cols-2 gap-2">
                            <Button asChild variant="outline" size="sm" className="w-full">
                              <Link href={`/student/courses?subject=${subject.code}`}>
                                <Users className="w-3 h-3 mr-2" />
                                Human Tutor
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="w-full">
                              <Link href={`/student/subjects/${subject.code}/chat`}>
                                <MessageCircle className="w-3 h-3 mr-2" />
                                AI Tutor
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600">No courses yet</h3>
                  <p className="text-gray-500 mt-2 mb-6">Enroll in subjects to start your learning journey</p>
                  <Button onClick={() => setActiveTab('browse')}>
                    Browse Subjects
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff === 'all' ? 'All Levels' : diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map(subject => {
                const colors = getSubjectColors(subject.code)
                const isEnrolled = enrolledIds.includes(subject.id)

                return (
                  <Card
                    key={subject.id}
                    className={`hover:shadow-md transition-all ${colors.border} ${isEnrolled ? 'opacity-70' : ''}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-white ${colors.bg}`}>
                            {getSubjectIcon(subject.code)}
                          </div>
                          <div>
                            <CardTitle className="text-base">{subject.name}</CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {subject.difficulty}
                            </Badge>
                          </div>
                        </div>
                        {isEnrolled && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        {subject.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>{subject.level}</span>
                      </div>
                      {subject.prerequisites && (
                        <p className="text-xs text-orange-600 mb-3">
                          Requires: {subject.prerequisites.join(', ')}
                        </p>
                      )}
                      <div className="flex flex-col gap-2">
                        {isEnrolled ? (
                          <>
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => router.push(`/student/subjects/${subject.code}`)}
                            >
                              Continue Learning
                            </Button>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                                onClick={() => router.push(`/student/courses?subject=${subject.code}`)}
                              >
                                <Users className="w-3 h-3 mr-1" />
                                Human tutor
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/student/subjects/${subject.code}/chat`)}
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                AI tutor
                              </Button>
                            </div>
                            <Button
                              className="w-full"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnenroll(subject)}
                              disabled={removingSubjectCode === subject.code}
                            >
                              {removingSubjectCode === subject.code ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : null}
                              Remove
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => setSelectedSubject(subject)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Subject
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Enroll Dialog */}
          <Dialog open={!!selectedSubject} onOpenChange={(open) => !open && setSelectedSubject(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll in {selectedSubject?.name}</DialogTitle>
                <DialogDescription>
                  Are you sure you want to add this subject to your learning path?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedSubject(null)}>Cancel</Button>
                <Button onClick={() => selectedSubject && handleEnroll(selectedSubject)} disabled={enrolling}>
                  {enrolling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Confirm Enrollment'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Tabs>
      </main>
    </div >
  )
}


// Main export wrapped in Suspense
export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesPageSkeleton />}>
      <CoursesPageContent />
    </Suspense>
  )
}
