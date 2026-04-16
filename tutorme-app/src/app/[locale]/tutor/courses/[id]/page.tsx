/**
 * Tutor course management page
 * Course/materials source, language, price, shareable link, student count, schedule
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  BookOpen,
  FileText,
  ListOrdered,
  CheckCircle2,
  Loader2,
  Radio,
  DollarSign,
  X,
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Globe,
  Award,
  GraduationCap,
  School,
  Flag,
  MapPin,
  Search,
} from 'lucide-react'
import { toast } from 'sonner'
import { BackButton } from '@/components/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ScheduleItem } from './constants'
import { DAYS, TIME_SLOT_OPTIONS } from './constants'
import {
  REGIONS,
  GLOBAL_EXAMS_CATEGORIES,
  AP_CATEGORIES,
  A_LEVEL_CATEGORIES,
  IB_CATEGORIES,
  IGCSE_CATEGORIES,
  type CountryData,
  type ExamCategory,
} from '@/lib/data/tutor-categories'
import { VariantManager } from './components/VariantManager'

// Flatten all categories into a single list
const ALL_CATEGORIES = [
  ...GLOBAL_EXAMS_CATEGORIES.flatMap(c => c.exams),
  ...AP_CATEGORIES.flatMap(c => c.exams),
  ...A_LEVEL_CATEGORIES.flatMap(c => c.exams),
  ...IB_CATEGORIES.flatMap(c => c.exams),
  ...IGCSE_CATEGORIES.flatMap(c => c.exams),
]

interface OutlineItem {
  title: string
  durationMinutes: number
}

interface OutlineModuleItem {
  title: string
  description?: string
  notes?: string
  tasks?: { title: string }[]
  lessons: { title: string; durationMinutes: number }[]
}

// CourseMaterials interface removed - using simplified course model

interface Lesson {
  id: string
  title: string
  description: string | null
  order: number
  duration: number
}

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

interface CourseData {
  id: string
  name: string
  description: string | null
  categories?: string[]
  isPublished: boolean
  languageOfInstruction: string | null
  price: number | null
  currency: string | null
  isFree: boolean
  schedule: ScheduleItem[]
  studentCount: number
  modules: Module[]
}

export default function TutorCoursePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const locale = (params.locale as string) || 'en'

  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
  const [languageOfInstruction, setLanguageOfInstruction] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [isFree, setIsFree] = useState(false)
  const [currency, setCurrency] = useState<string>('SGD')
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [launchingLiveClass, setLaunchingLiveClass] = useState(false)
  const [tutorProfile, setTutorProfile] = useState<{
    currency?: string | null
    categories?: string[]
  } | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [categoryTab, setCategoryTab] = useState('global')
  const [categorySearch, setCategorySearch] = useState('')
  const [scheduleSummary, setScheduleSummary] = useState<ScheduleItem[]>([])

  // Available countries based on selected regions
  const availableCountries = useMemo<CountryData[]>(() => {
    if (selectedRegions.length === 0) return []
    const countries: CountryData[] = []
    selectedRegions.forEach(regionId => {
      const region = REGIONS.find(r => r.id === regionId)
      if (region) {
        countries.push(...region.countries)
      }
    })
    return countries
  }, [selectedRegions])

  // National exams based on selected countries
  const nationalExams = useMemo<ExamCategory[]>(() => {
    if (selectedCountries.length === 0) return []
    const exams: ExamCategory[] = []
    selectedCountries.forEach(countryCode => {
      const country = availableCountries.find(c => c.code === countryCode)
      if (country && country.nationalExams.length > 0) {
        exams.push(...country.nationalExams)
      }
    })
    return exams
  }, [selectedCountries, availableCountries])
  const [scheduleWeekOffset, setScheduleWeekOffset] = useState(0)
  const [scheduleRepeatWeekly, setScheduleRepeatWeekly] = useState(false)
  const [numberOfWeeks, setNumberOfWeeks] = useState(4)
  const [totalSessionsDesired, setTotalSessionsDesired] = useState<number | ''>('')

  const scheduleWeekStart = (() => {
    const d = new Date()
    const day = d.getDay()
    const mon = d.getDate() - (day === 0 ? 6 : day - 1) + scheduleWeekOffset * 7
    const start = new Date(d.getFullYear(), d.getMonth(), mon)
    return start
  })()

  const scheduleWeekLabel = (() => {
    const end = new Date(scheduleWeekStart)
    end.setDate(end.getDate() + 6)
    return `${scheduleWeekStart.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
  })()

  const scheduleMonthLabel = scheduleWeekStart.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  /** For the grid: date for each day of the displayed week (Mon = index 0, Sun = index 6) */
  const weekDates = DAYS.map((_, i) => {
    const d = new Date(scheduleWeekStart)
    d.setDate(scheduleWeekStart.getDate() + i)
    return d
  })

  const formatDateKey = (date: Date) => date.toLocaleDateString('en-CA')

  const loadCourse = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const res = await fetch(`/api/tutor/courses/${id}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCourse(data.course)
      } else {
        toast.error('Course not found')
        router.push(`/${locale}/tutor/courses`)
      }
    } catch {
      toast.error('Failed to load course')
      router.push(`/${locale}/tutor/courses`)
    } finally {
      setLoading(false)
    }
  }, [id, router, locale])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  useEffect(() => {
    fetch('/api/user/profile', { credentials: 'include' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.profile) {
          setTutorProfile(data.profile)
          // Load tutor's categories from profile if available
          if (data.profile.categories && Array.isArray(data.profile.categories)) {
            setSelectedCategories(data.profile.categories)
          }
        }
      })
      .catch(err => console.error('[Course Page] Failed to load profile:', err))
  }, [])

  useEffect(() => {
    if (!course) return
    setCourseName(course.name ?? '')
    setDescription(course.description ?? '')
    setLanguageOfInstruction(course.languageOfInstruction ?? '')
    setIsFree(course.isFree ?? false)
    setPrice(course.isFree ? '' : course.price != null ? String(course.price) : '')
    setCurrency('USD') // Fixed to USD
    setSchedule(Array.isArray(course.schedule) ? [...course.schedule] : [])
    // Load categories from course if available, otherwise use tutor profile categories
    if (course.categories && Array.isArray(course.categories)) {
      setSelectedCategories(course.categories)
    }
  }, [course, tutorProfile])

  // Load course catalog based on first category if available
  useEffect(() => {
    const categories = course?.categories
    if (!categories || categories.length === 0) {
      return
    }
    // Course catalog loading removed - using simplified course model
  }, [course?.categories])

  // Schedule summary: generate + sync (hooks must run unconditionally before any early return)
  const generateScheduleSummary = useCallback(() => {
    if (schedule.length === 0) {
      toast.error('Please add schedule items first')
      return
    }
    if (scheduleRepeatWeekly) {
      const requestedSessions = totalSessionsDesired !== '' ? Number(totalSessionsDesired) : null
      const weeks =
        requestedSessions != null
          ? Math.max(1, Math.ceil(requestedSessions / schedule.length))
          : numberOfWeeks
      const expanded: ScheduleItem[] = []
      for (let w = 0; w < weeks; w++) {
        schedule.forEach(slot => expanded.push({ ...slot }))
      }
      setScheduleSummary(
        requestedSessions != null ? expanded.slice(0, requestedSessions) : expanded
      )
    } else {
      setScheduleSummary([...schedule])
    }
    toast.success('Schedule summary generated')
  }, [schedule, scheduleRepeatWeekly, numberOfWeeks, totalSessionsDesired])

  useEffect(() => {
    if (schedule.length === 0) {
      setScheduleSummary([])
      return
    }
    if (scheduleRepeatWeekly) {
      const MAX_WEEKS = 52
      const weeks = Math.min(
        MAX_WEEKS,
        totalSessionsDesired !== ''
          ? Math.max(1, Math.ceil(Number(totalSessionsDesired) / schedule.length))
          : numberOfWeeks
      )
      const expanded: ScheduleItem[] = []
      for (let w = 0; w < weeks; w++) {
        schedule.forEach(slot => expanded.push({ ...slot }))
      }
      setScheduleSummary(expanded)
    } else {
      setScheduleSummary([...schedule])
    }
  }, [schedule, scheduleRepeatWeekly, numberOfWeeks, totalSessionsDesired])

  // Materials upload removed - using simplified course model

  const handleOpenInLiveClass = async () => {
    if (!course) return
    setLaunchingLiveClass(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const durationFromSchedule =
        Array.isArray(schedule) && schedule.length > 0
          ? Number(schedule[0]?.durationMinutes) || 60
          : 60

      const normalizedDescription = (description?.trim() || course.description || '').trim()
      const payload: Record<string, unknown> = {
        title: (courseName || course.name || '').trim(),
        category: (course.categories || [])[0] || 'general',
        courseId: course.id,
        maxStudents: 50,
        durationMinutes: Math.max(15, Math.min(480, durationFromSchedule)),
      }
      if (normalizedDescription) payload.description = normalizedDescription

      const res = await fetch('/api/class/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData?.error || 'Failed to create live class')
      }

      const data = await res.json()
      const sessionId = data?.session?.id
      if (!sessionId) throw new Error('Live class created but session ID is missing')

      toast.success('Live class created. Redirecting…')
      router.push(`/tutor/insights?sessionId=${sessionId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to open live class')
    } finally {
      setLaunchingLiveClass(false)
    }
  }

  const handleSaveAll = async (): Promise<boolean> => {
    if (!id) {
      toast.error('Course ID is missing')
      return false
    }

    setSaving(true)
    try {
      const csrf = await getCsrf()

      // Build payload, excluding null name (name is required)
      const payload: Record<string, unknown> = {
        description: description.trim() || null,
        languageOfInstruction: languageOfInstruction || null,
        price: isFree ? 0 : price === '' ? null : Number(price),
        currency: 'USD',
        isFree,
        categories: selectedCategories,
        schedule: schedule.length ? schedule : null,
      }

      // Only include name if it has a value (required field)
      const trimmedName = courseName.trim()
      if (trimmedName) {
        payload.name = trimmedName
      }

      const res = await fetch(`/api/tutor/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? 'Failed to save')
        return false
      }
      setCourse(prev =>
        prev
          ? {
              ...prev,
              name: courseName.trim() || prev.name,
              description: description.trim() || prev.description,
              languageOfInstruction: languageOfInstruction || null,
              price: isFree ? 0 : price === '' ? null : Number(price),
              currency: 'USD',
              isFree,
              categories: selectedCategories,
              schedule,
            }
          : null
      )
      toast.success('All changes saved')
      loadCourse()
      return true
    } catch (err) {
      console.error('[SaveAll] Error:', err)
      toast.error('Failed to save')
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleCourseSelect = async (name: string) => {
    setCourseName(name)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        setCourse(prev => (prev ? { ...prev, name } : null))
        toast.success('Course name updated')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update name')
      }
    } catch {
      toast.error('Failed to update course name')
    }
  }

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  // Materials, outline, and course upload functions removed - using simplified course model

  if (loading || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">Loading course…</p>
      </div>
    )
  }

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  // Toggle region selection
  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev =>
      prev.includes(regionId) ? prev.filter(r => r !== regionId) : [...prev, regionId]
    )
    // Clear countries when region is deselected
    if (selectedRegions.includes(regionId)) {
      const region = REGIONS.find(r => r.id === regionId)
      if (region) {
        setSelectedCountries(prev => prev.filter(c => !region.countries.some(rc => rc.code === c)))
      }
    }
  }

  // Toggle country selection
  const toggleCountry = (countryCode: string) => {
    setSelectedCountries(prev =>
      prev.includes(countryCode) ? prev.filter(c => c !== countryCode) : [...prev, countryCode]
    )
  }

  /** Effective number of weeks when "repeat weekly" is on: from numberOfWeeks or derived from totalSessionsDesired */
  const effectiveWeeks =
    schedule.length > 0 && scheduleRepeatWeekly
      ? totalSessionsDesired !== ''
        ? Math.max(1, Math.ceil(Number(totalSessionsDesired) / schedule.length))
        : numberOfWeeks
      : 1

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const formatTime = (time: string) => {
    if (!time || typeof time !== 'string') return '–'
    const parts = time.split(':')
    const hour = Number(parts[0])
    const minute = Number(parts[1] ?? 0)
    if (Number.isNaN(hour)) return '–'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    const period = hour >= 12 ? 'PM' : 'AM'
    return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`
  }
  const formatTimeRange = (startTime: string, durationMinutes: number) => {
    if (!startTime || typeof startTime !== 'string') return '–'
    const parts = startTime.split(':')
    const startHour = Number(parts[0])
    const startMinute = Number(parts[1] ?? 0)
    if (Number.isNaN(startHour)) return '–'
    const startTotal = startHour * 60 + startMinute
    const dur = Number(durationMinutes) || 0
    const endTotal = startTotal + dur
    const endHour = Math.floor((endTotal / 60) % 24)
    const endMinute = endTotal % 60
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
    return `${formatTime(startTime)}–${formatTime(endTime)}`
  }
  const timezoneLabel = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local time'
    } catch {
      return 'Local time'
    }
  })()
  const scheduleByDay = scheduleSummary.reduce(
    (acc, slot) => {
      const day = slot?.dayOfWeek
      if (!day) return acc
      if (!acc[day]) acc[day] = []
      acc[day].push(slot)
      return acc
    },
    {} as Record<string, ScheduleItem[]>
  )
  const priceNumber = Number(price)
  const scheduleCost = scheduleSummary.reduce((sum, slot) => {
    if (!priceNumber || Number.isNaN(priceNumber)) return sum
    const dur = slot?.durationMinutes ?? 0
    return sum + (dur / 60) * priceNumber
  }, 0)
  const totalRevenue = scheduleCost * 0.7
  const totalSessions = scheduleSummary.length
  const totalDurationMinutes = scheduleSummary.reduce(
    (sum, slot) => sum + (slot.durationMinutes ?? 0),
    0
  )
  const totalDurationHours = (totalDurationMinutes / 60).toFixed(1)

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-muted-foreground text-center">
          <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
          <p>Loading course…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full space-y-6 p-4 sm:p-6">
        {/* Back to Course Builder */}
        <div className="flex items-center gap-2">
          <BackButton href={`/tutor/courses/${id}/builder`} />
        </div>

        {/* Course Details */}
        <Card className="border-2 border-gray-400 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Course Name</Label>
              <Input
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                placeholder="Course name"
              />
            </div>

            <div className="space-y-2">
              <Label>Course Description</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What will students learn in this course?"
                rows={3}
                className="resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              {/* Profile Settings Style Category Selector */}
              <div className="flex flex-col gap-4 rounded-lg border lg:flex-row lg:items-start">
                {/* Left Panel - Region & Country Selection */}
                <div className="w-full space-y-4 border-b p-4 lg:w-[240px] lg:border-b-0 lg:border-r">
                  {/* Region Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-xs font-medium">
                      <Globe className="h-3.5 w-3.5 text-[#4FD1C5]" />
                      Region
                    </Label>
                    <div className="space-y-1.5">
                      {REGIONS.map(region => (
                        <label
                          key={region.id}
                          className="flex cursor-pointer items-center gap-2 rounded-md p-1.5 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRegions.includes(region.id)}
                            onChange={() => toggleRegion(region.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{region.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Country Selection */}
                  <div className="space-y-2 border-t pt-4">
                    <Label className="flex items-center gap-2 text-xs font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#F17623]" />
                      Country
                    </Label>
                    {selectedRegions.length === 0 ? (
                      <p className="text-xs text-gray-400">Select a region to view countries</p>
                    ) : availableCountries.length === 0 ? (
                      <p className="text-xs text-gray-400">No countries available</p>
                    ) : (
                      <div className="max-h-[200px] space-y-1 overflow-y-auto">
                        {availableCountries.map(country => (
                          <label
                            key={country.code}
                            className="flex cursor-pointer items-center gap-2 rounded-md p-1.5 hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCountries.includes(country.code)}
                              onChange={() => toggleCountry(country.code)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{country.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">{selectedCountries.length} selected</p>
                  </div>
                </div>

                {/* Right Panel - Category Tabs */}
                <div className="flex-1 overflow-hidden">
                  <Tabs
                    value={categoryTab}
                    onValueChange={setCategoryTab}
                    className="flex h-full flex-col"
                  >
                    <div className="border-b px-4 pt-2">
                      <TabsList className="grid h-9 w-full grid-cols-6">
                        <TabsTrigger value="global" className="px-1 text-xs">
                          <Globe className="mr-1 h-3 w-3" />
                          Global
                        </TabsTrigger>
                        <TabsTrigger value="ap" className="px-1 text-xs">
                          <Award className="mr-1 h-3 w-3" />
                          AP
                        </TabsTrigger>
                        <TabsTrigger value="alevel" className="px-1 text-xs">
                          <GraduationCap className="mr-1 h-3 w-3" />A Level
                        </TabsTrigger>
                        <TabsTrigger value="ib" className="px-1 text-xs">
                          <BookOpen className="mr-1 h-3 w-3" />
                          IB
                        </TabsTrigger>
                        <TabsTrigger value="igcse" className="px-1 text-xs">
                          <School className="mr-1 h-3 w-3" />
                          IGCSE
                        </TabsTrigger>
                        <TabsTrigger
                          value="national"
                          className="px-1 text-xs"
                          disabled={nationalExams.length === 0}
                        >
                          <Flag className="mr-1 h-3 w-3" />
                          National
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Search */}
                    <div className="border-b px-4 py-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search categories..."
                          value={categorySearch}
                          onChange={e => setCategorySearch(e.target.value)}
                          className="h-8 pl-9"
                        />
                      </div>
                    </div>

                    {/* Tab Contents */}
                    <div className="max-h-[300px] flex-1 overflow-hidden">
                      <ScrollArea className="h-full p-4">
                        {/* Global Tab */}
                        <TabsContent value="global" className="mt-0">
                          <div className="space-y-4">
                            {GLOBAL_EXAMS_CATEGORIES.filter(
                              cat =>
                                !categorySearch ||
                                cat.exams.some(e =>
                                  e.toLowerCase().includes(categorySearch.toLowerCase())
                                )
                            ).map(category => (
                              <div key={category.id} className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                  <BookOpen className="h-4 w-4 text-[#1D4ED8]" />
                                  {category.label}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                  {category.exams
                                    .filter(
                                      exam =>
                                        !categorySearch ||
                                        exam.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map(exam => (
                                      <label
                                        key={exam}
                                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedCategories.includes(exam)}
                                          onChange={() => toggleCategory(exam)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{exam}</span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* AP Tab */}
                        <TabsContent value="ap" className="mt-0">
                          <div className="space-y-4">
                            {AP_CATEGORIES.filter(
                              cat =>
                                !categorySearch ||
                                cat.exams.some(e =>
                                  e.toLowerCase().includes(categorySearch.toLowerCase())
                                )
                            ).map(category => (
                              <div key={category.id} className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                  <Award className="h-4 w-4 text-[#1D4ED8]" />
                                  {category.label}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                  {category.exams
                                    .filter(
                                      exam =>
                                        !categorySearch ||
                                        exam.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map(exam => (
                                      <label
                                        key={exam}
                                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedCategories.includes(exam)}
                                          onChange={() => toggleCategory(exam)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{exam}</span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* A Level Tab */}
                        <TabsContent value="alevel" className="mt-0">
                          <div className="space-y-4">
                            {A_LEVEL_CATEGORIES.filter(
                              cat =>
                                !categorySearch ||
                                cat.exams.some(e =>
                                  e.toLowerCase().includes(categorySearch.toLowerCase())
                                )
                            ).map(category => (
                              <div key={category.id} className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                  <GraduationCap className="h-4 w-4 text-[#1D4ED8]" />
                                  {category.label}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                  {category.exams
                                    .filter(
                                      exam =>
                                        !categorySearch ||
                                        exam.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map(exam => (
                                      <label
                                        key={exam}
                                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedCategories.includes(exam)}
                                          onChange={() => toggleCategory(exam)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{exam}</span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* IB Tab */}
                        <TabsContent value="ib" className="mt-0">
                          <div className="space-y-4">
                            {IB_CATEGORIES.filter(
                              cat =>
                                !categorySearch ||
                                cat.exams.some(e =>
                                  e.toLowerCase().includes(categorySearch.toLowerCase())
                                )
                            ).map(category => (
                              <div key={category.id} className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                  <BookOpen className="h-4 w-4 text-[#1D4ED8]" />
                                  {category.label}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                  {category.exams
                                    .filter(
                                      exam =>
                                        !categorySearch ||
                                        exam.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map(exam => (
                                      <label
                                        key={exam}
                                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedCategories.includes(exam)}
                                          onChange={() => toggleCategory(exam)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{exam}</span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* IGCSE Tab */}
                        <TabsContent value="igcse" className="mt-0">
                          <div className="space-y-4">
                            {IGCSE_CATEGORIES.filter(
                              cat =>
                                !categorySearch ||
                                cat.exams.some(e =>
                                  e.toLowerCase().includes(categorySearch.toLowerCase())
                                )
                            ).map(category => (
                              <div key={category.id} className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                  <School className="h-4 w-4 text-[#1D4ED8]" />
                                  {category.label}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                  {category.exams
                                    .filter(
                                      exam =>
                                        !categorySearch ||
                                        exam.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .map(exam => (
                                      <label
                                        key={exam}
                                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedCategories.includes(exam)}
                                          onChange={() => toggleCategory(exam)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{exam}</span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* National Tab */}
                        <TabsContent value="national" className="mt-0">
                          <div className="space-y-4">
                            {nationalExams.length === 0 ? (
                              <div className="py-8 text-center text-gray-500">
                                <Flag className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                <p>Select countries to view national exams</p>
                              </div>
                            ) : (
                              nationalExams
                                .filter(
                                  cat =>
                                    !categorySearch ||
                                    cat.exams.some(e =>
                                      e.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                )
                                .map(category => (
                                  <div key={category.id} className="space-y-2">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                      <Flag className="h-4 w-4 text-[#F17623]" />
                                      {category.label}
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                      {category.exams
                                        .filter(
                                          exam =>
                                            !categorySearch ||
                                            exam
                                              .toLowerCase()
                                              .includes(categorySearch.toLowerCase())
                                        )
                                        .map(exam => (
                                          <label
                                            key={exam}
                                            className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={selectedCategories.includes(exam)}
                                              onChange={() => toggleCategory(exam)}
                                              className="rounded border-gray-300"
                                            />
                                            <span className="text-sm">{exam}</span>
                                          </label>
                                        ))}
                                    </div>
                                  </div>
                                ))
                            )}
                          </div>
                        </TabsContent>
                      </ScrollArea>
                    </div>
                  </Tabs>
                </div>
              </div>

              {/* Selected Categories Summary */}
              {selectedCategories.length > 0 && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>
                    {selectedCategories.length} categor
                    {selectedCategories.length === 1 ? 'y' : 'ies'} selected
                  </span>
                </div>
              )}
            </div>

            {/* Pricing Section - Combined with Course Details */}
            <div className="border-t pt-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <DollarSign className="h-5 w-5" />
                Pricing
              </h3>
              <div className="space-y-6">
                <div className="bg-muted/30 flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label htmlFor="isFree" className="text-sm font-medium">
                      Free course
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      Students can enroll without payment.
                    </p>
                  </div>
                  <Switch
                    id="isFree"
                    checked={isFree}
                    onCheckedChange={checked => {
                      setIsFree(checked)
                      if (checked) setPrice('')
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Cost per 1 hour session</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="$"
                      disabled={isFree}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" value="USD" disabled className="bg-muted" />
                  </div>
                </div>
                {!isFree && price && Number(price) > 0 && (
                  <div className="bg-muted/30 rounded-lg border p-3">
                    <p className="text-sm">
                      <span className="font-medium">Cost per session:</span> USD{' '}
                      {Number(price).toFixed(2)}
                    </p>
                  </div>
                )}
                {isFree && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                    This course will be listed as free.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Schedule */}
        <Card id="course-schedule" className="border-2 border-gray-400 shadow-sm">
          <CardHeader>
            <CardTitle>Course Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cost vs Revenue - visible when price and schedule are set */}
            {!isFree &&
              Number(price) > 0 &&
              schedule.length > 0 &&
              (() => {
                const p = Number(price)
                const cost = schedule.reduce(
                  (sum, slot) => sum + (slot.durationMinutes / 60) * p,
                  0
                )
                const revenue = cost * 0.7
                return (
                  <div className="bg-muted/30 grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Cost for course</div>
                      <div className="font-medium">USD {cost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">
                        Revenue (after 30% commission)
                      </div>
                      <div className="font-medium">USD {revenue.toFixed(2)}</div>
                    </div>
                  </div>
                )
              })()}

            {/* Weekly repeat option */}
            <div className="bg-muted/30 flex flex-wrap items-center gap-4 rounded-lg border p-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={scheduleRepeatWeekly}
                  onChange={e => setScheduleRepeatWeekly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium">Apply same schedule every week</span>
              </label>
              {scheduleRepeatWeekly && schedule.length > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Number of weeks</Label>
                    <Input
                      type="number"
                      min={1}
                      max={52}
                      value={totalSessionsDesired !== '' ? effectiveWeeks : numberOfWeeks}
                      onChange={e => {
                        const v = Math.max(1, parseInt(e.target.value, 10) || 1)
                        setNumberOfWeeks(v)
                        if (totalSessionsDesired !== '') setTotalSessionsDesired('')
                      }}
                      disabled={totalSessionsDesired !== ''}
                      className="h-8 w-20 text-sm"
                    />
                    {totalSessionsDesired !== '' && (
                      <span className="text-muted-foreground text-xs">
                        = {effectiveWeeks} weeks from {totalSessionsDesired} sessions
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Or total sessions</Label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 20"
                      value={totalSessionsDesired}
                      onChange={e =>
                        setTotalSessionsDesired(
                          e.target.value === ''
                            ? ''
                            : Math.max(1, parseInt(e.target.value, 10) || 0)
                        )
                      }
                      className="h-8 w-24 text-sm"
                    />
                    <span className="text-muted-foreground text-xs">
                      sessions (weeks = sessions ÷ slots per week)
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Calendar grid: click cells to select 1-hour slots; key by week so header dates update when week/month changes */}
            <div
              key={`week-${scheduleWeekStart.getTime()}`}
              className="overflow-hidden rounded-lg border"
            >
              <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-2 border-b px-2 py-2">
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setScheduleWeekOffset(o => o - 1)}
                    aria-label="Previous week"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[140px] text-center text-xs font-medium">
                    {scheduleWeekLabel}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setScheduleWeekOffset(o => o + 1)}
                    aria-label="Next week"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-muted-foreground text-xs">{scheduleMonthLabel}</span>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground mr-1 text-[10px]">Month:</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setScheduleWeekOffset(o => o - 4)}
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setScheduleWeekOffset(o => o + 4)}
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="bg-muted/20 text-muted-foreground border-b px-2 py-1 text-xs">
                Click a time slot to add or remove a 1-hour session.
              </p>
              <div className="bg-muted/30 grid grid-cols-8 border-b">
                <div className="border-r p-2 text-center text-xs font-medium">Time</div>
                {DAYS.map((day, i) => {
                  const d = weekDates[i]
                  return (
                    <div
                      key={`${day}-${d.getTime()}`}
                      className="border-r p-2 text-center text-xs font-medium"
                    >
                      <div>{day.slice(0, 3)}</div>
                      <div className="text-muted-foreground mt-0.5 text-[10px] font-normal">
                        {d.getDate()}
                      </div>
                    </div>
                  )
                })}
              </div>
              <ScrollArea className="h-[320px]">
                <div className="grid grid-cols-8">
                  {TIME_SLOT_OPTIONS.map(timeStr => {
                    const hour = parseInt(timeStr.slice(0, 2), 10)
                    const endHour = hour + 1
                    const startLabel = `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`
                    const endLabel = `${endHour % 12 || 12}:00 ${endHour >= 12 ? 'PM' : 'AM'}`
                    const displayTime = `${startLabel}-${endLabel}`
                    return (
                      <div key={timeStr} className="contents">
                        <div className="text-muted-foreground border-b border-r border-dashed p-1 text-center text-[10px]">
                          {displayTime}
                        </div>
                        {DAYS.map((day, dayIndex) => {
                          const dateKey = formatDateKey(weekDates[dayIndex])
                          const matchingSlotIndex = schedule.findIndex(s => {
                            if (s.dayOfWeek !== day) return false
                            if (!scheduleRepeatWeekly) {
                              if (s.date ? s.date !== dateKey : scheduleWeekOffset !== 0)
                                return false
                            }
                            const [sh, sm] = s.startTime.split(':').map(Number)
                            const startM = sh * 60 + sm
                            const endM = startM + s.durationMinutes
                            const [th, tm] = timeStr.split(':').map(Number)
                            const slotM = th * 60 + tm
                            return slotM >= startM && slotM < endM
                          })
                          const inRange = matchingSlotIndex >= 0
                          // Calculate chronological session number
                          // Sort all sessions by date and start time, then find position
                          let sessionNum = 0
                          if (inRange) {
                            const currentSlot = schedule[matchingSlotIndex]
                            // Create a sortable key for each session: date_startTime
                            const sortedSessions = [...schedule].sort((a, b) => {
                              const aDate = a.date || ''
                              const bDate = b.date || ''
                              if (aDate !== bDate) return aDate.localeCompare(bDate)
                              return a.startTime.localeCompare(b.startTime)
                            })
                            sessionNum =
                              sortedSessions.findIndex(
                                s =>
                                  s.dayOfWeek === currentSlot.dayOfWeek &&
                                  s.startTime === currentSlot.startTime &&
                                  s.date === currentSlot.date
                              ) + 1
                          }
                          const sessionLabel = inRange ? `Session ${sessionNum}` : ''
                          const toggleSlot = () => {
                            setSchedule(prev => {
                              const idx = prev.findIndex(s => {
                                if (s.dayOfWeek !== day) return false
                                if (!scheduleRepeatWeekly) {
                                  if (s.date ? s.date !== dateKey : scheduleWeekOffset !== 0)
                                    return false
                                }
                                const [sh, sm] = s.startTime.split(':').map(Number)
                                const startM = sh * 60 + sm
                                const endM = startM + s.durationMinutes
                                const [th, tm] = timeStr.split(':').map(Number)
                                const slotM = th * 60 + tm
                                return slotM >= startM && slotM < endM
                              })
                              if (idx >= 0) {
                                // Remove the schedule block that covers this hour
                                return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
                              }
                              // Add a new 1-hour session starting at this time
                              return [
                                ...prev,
                                {
                                  dayOfWeek: day,
                                  startTime: timeStr,
                                  durationMinutes: 60,
                                  ...(scheduleRepeatWeekly ? {} : { date: dateKey }),
                                },
                              ]
                            })
                          }
                          return (
                            <div
                              key={`${day}-${timeStr}`}
                              role="button"
                              tabIndex={0}
                              onClick={toggleSlot}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  toggleSlot()
                                }
                              }}
                              className={`min-h-[28px] w-full cursor-pointer border-b border-r border-dashed p-1 text-left transition-colors hover:bg-blue-50 ${inRange ? 'bg-blue-200 ring-1 ring-blue-400' : 'bg-white hover:bg-slate-50'}`}
                              aria-pressed={inRange}
                              aria-label={`${day} ${displayTime}${inRange ? ', selected' : ''}. Click to ${inRange ? 'remove' : 'add'} session.`}
                            >
                              {inRange && (
                                <span className="inline-flex items-center gap-0.5 text-[8px] font-medium text-blue-800">
                                  {sessionLabel}
                                  <button
                                    type="button"
                                    className="rounded-full p-0.5 hover:bg-blue-100"
                                    onClick={e => {
                                      e.stopPropagation()
                                      toggleSlot()
                                    }}
                                    aria-label="Remove this session"
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </button>
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Schedule Summary - sessions, duration, cost/revenue, interactive by day */}
            {scheduleSummary.length > 0 && (
              <Card className="border-primary/20 overflow-hidden border-2 shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50/50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="text-primary h-5 w-5" />
                    Schedule Summary
                  </CardTitle>
                  <CardDescription className="text-xs">Times in {timezoneLabel}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {/* Sessions & duration */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-blue-700">
                        Sessions
                      </div>
                      <div className="mt-0.5 text-2xl font-bold text-blue-900">{totalSessions}</div>
                      {scheduleRepeatWeekly &&
                        schedule.length > 0 &&
                        totalSessions > schedule.length && (
                          <div className="mt-0.5 text-xs text-blue-600">
                            Over {Math.ceil(totalSessions / schedule.length)} weeks
                          </div>
                        )}
                    </div>
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                        Total duration
                      </div>
                      <div className="mt-0.5 text-2xl font-bold text-emerald-900">
                        {totalDurationHours} h
                      </div>
                    </div>
                    {priceNumber > 0 && (
                      <>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
                            Cost
                          </div>
                          <div className="mt-0.5 text-xl font-bold text-slate-900">
                            USD {scheduleCost.toFixed(2)}
                          </div>
                        </div>
                        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                          <div className="text-xs font-medium uppercase tracking-wide text-amber-700">
                            Revenue (70%)
                          </div>
                          <div className="mt-0.5 text-xl font-bold text-amber-900">
                            USD {totalRevenue.toFixed(2)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* By day - interactive list */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-700">By day</div>
                    {dayOrder
                      .filter(day => scheduleByDay[day]?.length)
                      .map(day => (
                        <div
                          key={day}
                          className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-800">
                            <span>{day}</span>
                            <Badge variant="secondary" className="text-xs">
                              {scheduleByDay[day].length} session
                              {scheduleByDay[day].length !== 1 ? 's' : ''}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {scheduleByDay[day]
                              .sort((a, b) => a.startTime.localeCompare(b.startTime))
                              .map((slot, idx) => (
                                <div
                                  key={`${day}-${idx}-${slot.startTime}`}
                                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800"
                                >
                                  {slot.date && (
                                    <span className="text-xs text-slate-600">
                                      {new Date(slot.date + 'T00:00:00').toLocaleDateString(
                                        'en-US',
                                        {
                                          month: 'short',
                                          day: 'numeric',
                                        }
                                      )}
                                    </span>
                                  )}
                                  <span>
                                    {formatTimeRange(slot.startTime, slot.durationMinutes)}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    • {slot.durationMinutes}m
                                  </span>
                                  <span className="text-xs text-slate-500">• 0 students</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Variant Manager */}
        <Card className="border-2 border-gray-400 shadow-sm">
          <CardHeader>
            <CardTitle>Publish Variants</CardTitle>
            <CardDescription>
              Configure and publish course variants for each category and country combination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VariantManager
              templateCourseId={id}
              selectedCategories={selectedCategories}
              selectedCountryCodes={selectedCountries.length > 0 ? selectedCountries : ['GL']}
              defaultPrice={price === '' ? null : Number(price)}
              defaultCurrency="USD"
              defaultLanguage={languageOfInstruction || 'English'}
              defaultSchedule={schedule}
              onSaved={() => {
                // Optionally refresh course data after variants are saved
              }}
            />
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3">
          <Button size="sm" variant="outline" onClick={handleSaveAll} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {saving ? 'Saving…' : 'Save Template'}
          </Button>
        </div>
      </div>
    </div>
  )
}
