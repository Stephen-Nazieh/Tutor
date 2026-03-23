/**
 * Tutor course management page
 * Curriculum/materials source, language, price, shareable link, student count, schedule
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
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
} from 'lucide-react'
import { toast } from 'sonner'
import type { ScheduleItem } from './constants'
import { DAYS, TIME_SLOT_OPTIONS } from './constants'

// Categories from tutor registration - flattened list of all exam categories
interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

const GLOBAL_EXAMS_CATEGORIES: ExamCategory[] = [
  { id: 'admission-exams', label: 'Admission Exams', exams: ['SAT', 'ACT'] },
  {
    id: 'english-proficiency',
    label: 'English Proficiency',
    exams: [
      'IELTS Academic',
      'IELTS General',
      'TOEFL iBT',
      'PTE Academic',
      'Duolingo English Test',
      'CPE',
      'CAE',
      'Cambridge B2',
      'International ESOL',
      'Oxford Test of English',
      'iTEP Academic',
      'TOEIC',
      'MET',
      'EIKEN',
    ],
  },
  {
    id: 'postgraduate-exams',
    label: 'Postgraduate Exams',
    exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT'],
  },
]

const AP_CATEGORIES: ExamCategory[] = [
  {
    id: 'ap-stem',
    label: 'AP - STEM',
    exams: [
      'AP Calculus AB',
      'AP Calculus BC',
      'AP Statistics',
      'AP Biology',
      'AP Chemistry',
      'AP Physics 1',
      'AP Physics 2',
      'AP Physics C: Mechanics',
      'AP Physics C: Electricity and Magnetism',
      'AP Environmental Science',
      'AP Computer Science A',
      'AP Computer Science Principles',
    ],
  },
  {
    id: 'ap-humanities',
    label: 'AP - Humanities',
    exams: [
      'AP English & Composition',
      'AP Literature & Composition',
      'AP Seminar',
      'AP Research',
      'AP World History: Modern',
      'AP United States History',
      'AP European History',
      'AP Human Geography',
      'AP Psychology',
      'AP Macroeconomics',
      'AP Microeconomics',
      'AP Comparative Government and Politics',
      'AP United States Government and Politics',
    ],
  },
  {
    id: 'ap-languages',
    label: 'AP - Languages',
    exams: [
      'AP Chinese Language and Culture',
      'AP French Language and Culture',
      'AP German Language and Culture',
      'AP Italian Language and Culture',
      'AP Japanese Language and Culture',
      'AP Latin',
      'AP Spanish Language and Culture',
      'AP Spanish Literature and Culture',
    ],
  },
  {
    id: 'ap-art',
    label: 'AP - Art',
    exams: [
      'AP Art History',
      'AP Music Theory',
      'AP Studio Art: 2-D Art and Design',
      'AP Studio Art: 3-D Art and Design',
      'AP Drawing',
    ],
  },
]

const A_LEVEL_CATEGORIES: ExamCategory[] = [
  {
    id: 'as-courses',
    label: 'AS Level Courses',
    exams: [
      'AS Level Mathematics',
      'AS Level Further Mathematics',
      'AS Level Physics',
      'AS Level Chemistry',
      'AS Level Biology',
      'AS Level Computer Science',
      'AS Level Information Technology',
      'AS Level Economics',
      'AS Level Business',
      'AS Level Accounting',
      'AS Level Psychology',
      'AS Level Sociology',
      'AS Level History',
      'AS Level Geography',
      'AS Level English Language',
      'AS Level English Literature',
      'AS Level Global Perspectives & Research',
      'AS Level Art and Design',
      'AS Level Media Studies',
    ],
  },
  {
    id: 'a-level-courses',
    label: 'A Level Courses',
    exams: [
      'A Level Mathematics',
      'A Level Further Mathematics',
      'A Level Physics',
      'A Level Chemistry',
      'A Level Biology',
      'A Level Computer Science',
      'A Level Information Technology',
      'A Level Economics',
      'A Level Business',
      'A Level Accounting',
      'A Level Psychology',
      'A Level Sociology',
      'A Level History',
      'A Level Geography',
      'A Level English Language',
      'A Level English Literature',
      'A Level Global Perspectives & Research',
      'A Level Art and Design',
      'A Level Media Studies',
    ],
  },
]

const IB_CATEGORIES: ExamCategory[] = [
  {
    id: 'ib-courses',
    label: 'IB Courses',
    exams: [
      'IB Mathematics: Analysis and Approaches',
      'IB Mathematics: Applications and Interpretation',
      'IB Physics',
      'IB Chemistry',
      'IB Biology',
      'IB Computer Science',
      'IB Economics',
      'IB Business Management',
      'IB Psychology',
      'IB History',
      'IB Geography',
      'IB English A: Language and Literature',
      'IB English A: Literature',
      'IB Language B Courses',
      'IB Visual Arts',
      'IB Theory of Knowledge (TOK)',
      'IB Extended Essay (EE)',
    ],
  },
]

const IGCSE_CATEGORIES: ExamCategory[] = [
  {
    id: 'igcse-mathematics',
    label: 'IGCSE Mathematics',
    exams: ['IGCSE Mathematics', 'IGCSE Additional Mathematics', 'IGCSE International Mathematics'],
  },
  {
    id: 'igcse-sciences',
    label: 'IGCSE Sciences',
    exams: [
      'IGCSE Physics',
      'IGCSE Chemistry',
      'IGCSE Biology',
      'IGCSE Combined Science',
      'IGCSE Coordinated Sciences',
      'IGCSE Environmental Management',
    ],
  },
  {
    id: 'igcse-english',
    label: 'IGCSE English',
    exams: [
      'IGCSE English Language',
      'IGCSE English Literature',
      'IGCSE English as a Second Language',
    ],
  },
  {
    id: 'igcse-humanities',
    label: 'IGCSE Humanities',
    exams: [
      'IGCSE History',
      'IGCSE Geography',
      'IGCSE Economics',
      'IGCSE Business Studies',
      'IGCSE Accounting',
      'IGCSE Sociology',
      'IGCSE Global Perspectives',
    ],
  },
  {
    id: 'igcse-languages',
    label: 'IGCSE Languages',
    exams: [
      'IGCSE French',
      'IGCSE Spanish',
      'IGCSE German',
      'IGCSE Chinese',
      'IGCSE Arabic',
      'IGCSE Hindi',
    ],
  },
  {
    id: 'igcse-arts',
    label: 'IGCSE Arts',
    exams: [
      'IGCSE Art & Design',
      'IGCSE Music',
      'IGCSE Drama',
      'IGCSE Physical Education',
      'IGCSE Travel & Tourism',
    ],
  },
  {
    id: 'igcse-technical',
    label: 'IGCSE Technical',
    exams: [
      'IGCSE Computer Science',
      'IGCSE Information & Communication Technology',
      'IGCSE Design & Technology',
    ],
  },
]

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

interface CourseMaterials {
  curriculumText?: string
  notesText?: string
  editableCurriculum?: string
  editableNotes?: string
  editableTopics?: string
  outline?: OutlineItem[]
  outlineModules?: { modules: OutlineModuleItem[] }
}

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
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  isPublished: boolean
  languageOfInstruction: string | null
  price: number | null
  currency: string | null
  isFree: boolean
  curriculumSource: string | null
  outlineSource: string | null
  schedule: ScheduleItem[]
  studentCount: number
  modules: Module[]
  courseMaterials?: CourseMaterials
}

export default function TutorCoursePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [difficulty, setDifficulty] = useState('intermediate')
  const [languageOfInstruction, setLanguageOfInstruction] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [isFree, setIsFree] = useState(false)
  const [currency, setCurrency] = useState<string>('SGD')
  const [curriculumSource, setCurriculumSource] = useState<'PLATFORM' | 'UPLOADED'>('PLATFORM')
  const [curriculumCatalog, setCurriculumCatalog] = useState<{ id: string; name: string }[]>([])
  const [loadingCatalog, setLoadingCatalog] = useState(false)
  const [outlineSource, setOutlineSource] = useState<'SELF' | 'AI'>('SELF')
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [materials, setMaterials] = useState<CourseMaterials>({})
  const [uploadText, setUploadText] = useState({ curriculum: '', notes: '', topics: '' })
  const [generatingOutline, setGeneratingOutline] = useState(false)
  const [populatingSchedule, setPopulatingSchedule] = useState(false)
  const [populatingFromContent, setPopulatingFromContent] = useState(false)
  const [launchingLiveClass, setLaunchingLiveClass] = useState(false)
  const [editableCurriculum, setEditableCurriculum] = useState('')
  const [editableNotes, setEditableNotes] = useState('')
  const [editableTopics, setEditableTopics] = useState('')
  const [outline, setOutline] = useState<OutlineItem[]>([])
  const [outlineModules, setOutlineModules] = useState<OutlineModuleItem[]>([])
  const [outlineModalOpen, setOutlineModalOpen] = useState(false)
  const [typicalLessonMinutes, setTypicalLessonMinutes] = useState(45)
  const [tutorProfile, setTutorProfile] = useState<{
    currency?: string | null
    categories?: string[]
  } | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [scheduleSummary, setScheduleSummary] = useState<ScheduleItem[]>([])
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
        router.push('/curriculum')
      }
    } catch {
      toast.error('Failed to load course')
      router.push('/curriculum')
    } finally {
      setLoading(false)
    }
  }, [id, router])

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
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!course) return
    setCourseName(course.name ?? '')
    setDescription(course.description ?? '')
    setGradeLevel(course.gradeLevel ?? '')
    setDifficulty(course.difficulty ?? 'intermediate')
    setLanguageOfInstruction(course.languageOfInstruction ?? '')
    setIsFree(course.isFree ?? false)
    setPrice(course.isFree ? '' : course.price != null ? String(course.price) : '')
    setCurrency('USD') // Fixed to USD
    setCurriculumSource((course.curriculumSource as 'PLATFORM' | 'UPLOADED') ?? 'PLATFORM')
    setOutlineSource((course.outlineSource as 'SELF' | 'AI') ?? 'SELF')
    setSchedule(Array.isArray(course.schedule) ? [...course.schedule] : [])
    // Load categories from course if available, otherwise use tutor profile categories
    if ((course as unknown as { categories?: string[] }).categories) {
      setSelectedCategories((course as unknown as { categories: string[] }).categories)
    }
    const cm = course.courseMaterials
    if (cm) {
      setMaterials(cm)
      setEditableCurriculum(cm.editableCurriculum ?? '')
      setEditableNotes(cm.editableNotes ?? '')
      setEditableTopics(cm.editableTopics ?? '')
      setOutline(cm.outline ?? [])
      setOutlineModules(cm.outlineModules?.modules ?? [])
    }
  }, [course, tutorProfile])

  useEffect(() => {
    const sub = course?.subject
    if (!sub) {
      setCurriculumCatalog([])
      return
    }
    setLoadingCatalog(true)
    fetch(`/api/curriculums/catalog?subject=${encodeURIComponent(sub)}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCurriculumCatalog(data.curriculums ?? []))
      .catch(() => setCurriculumCatalog([]))
      .finally(() => setLoadingCatalog(false))
  }, [course?.subject])

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

  const hasAtLeastOneUpload = !!(
    uploadText.curriculum.trim() ||
    uploadText.notes.trim() ||
    uploadText.topics.trim() ||
    materials.curriculumText ||
    materials.editableCurriculum
  )

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
      const normalizedGradeLevel = (gradeLevel || course.gradeLevel || '').trim()
      const payload: Record<string, unknown> = {
        title: (courseName || course.name || '').trim(),
        subject: course.subject || 'General',
        curriculumId: course.id,
        maxStudents: 50,
        durationMinutes: Math.max(15, Math.min(480, durationFromSchedule)),
      }
      if (normalizedDescription) payload.description = normalizedDescription
      if (normalizedGradeLevel) payload.gradeLevel = normalizedGradeLevel

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
      router.push(`/tutor/live-class/${sessionId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to open live class')
    } finally {
      setLaunchingLiveClass(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({
          name: courseName.trim() || null,
          description: description.trim() || null,
          gradeLevel: gradeLevel || null,
          difficulty: difficulty || null,
          languageOfInstruction: languageOfInstruction || null,
          price: isFree ? 0 : price === '' ? null : Number(price),
          currency: 'USD',
          isFree,
          categories: selectedCategories,
          curriculumSource,
          outlineSource: curriculumSource === 'UPLOADED' ? outlineSource : null,
          schedule: schedule.length ? schedule : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? 'Failed to save')
        return
      }
      setCourse(prev =>
        prev
          ? {
              ...prev,
              name: courseName.trim() || prev.name,
              description: description.trim() || prev.description,
              gradeLevel: gradeLevel || prev.gradeLevel,
              difficulty: difficulty || prev.difficulty,
              languageOfInstruction: languageOfInstruction || null,
              price: isFree ? 0 : price === '' ? null : Number(price),
              currency: 'USD',
              isFree,
              curriculumSource,
              outlineSource: curriculumSource === 'UPLOADED' ? outlineSource : null,
              schedule,
            }
          : null
      )
      if (
        curriculumSource === 'UPLOADED' &&
        (editableCurriculum || editableNotes || editableTopics || outline.length > 0)
      ) {
        const matRes = await fetch(`/api/tutor/courses/${id}/materials`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
          credentials: 'include',
          body: JSON.stringify({
            editableCurriculum: editableCurriculum || undefined,
            editableNotes: editableNotes || undefined,
            editableTopics: editableTopics || undefined,
            outline: outline.length ? outline : undefined,
          }),
        })
        if (matRes.ok) loadCourse()
      }
      toast.success('All changes saved')
      loadCourse()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleCurriculumSelect = async (name: string) => {
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
        toast.success('Curriculum name updated')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update name')
      }
    } catch {
      toast.error('Failed to update curriculum name')
    }
  }

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleGenerateOutline = async () => {
    if (!hasAtLeastOneUpload) {
      toast.error(
        'Upload at least one of curriculum, notes, or topics before generating the outline.'
      )
      return
    }
    setGeneratingOutline(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}/materials/outline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({
          typicalLessonMinutes,
          curriculumText:
            uploadText.curriculum.trim() ||
            materials.curriculumText ||
            materials.editableCurriculum ||
            undefined,
          notesText:
            uploadText.notes.trim() || materials.notesText || materials.editableNotes || undefined,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setOutline(data.outline ?? [])
        setOutlineModules(data.outlineModules?.modules ?? [])
        toast.success(data.message ?? 'Outline generated')
        if (!outlineModalOpen) loadCourse()
      } else toast.error(data.error ?? 'Failed to generate outline')
    } catch {
      toast.error('Failed to generate outline')
    } finally {
      setGeneratingOutline(false)
    }
  }

  const handlePopulateSchedule = async () => {
    setPopulatingSchedule(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}/schedule/populate-from-outline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ firstDay: DAYS[0], startTime: '09:00' }),
      })
      const data = await res.json()
      if (res.ok) {
        setSchedule(data.schedule ?? [])
        toast.success(data.message ?? 'Schedule populated')
        loadCourse()
      } else toast.error(data.error ?? 'Failed to populate schedule')
    } catch {
      toast.error('Failed to populate schedule')
    } finally {
      setPopulatingSchedule(false)
    }
  }

  const handlePopulateScheduleFromContent = async () => {
    setPopulatingFromContent(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}/schedule/populate-from-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ firstDay: DAYS[0], startTime: '09:00' }),
      })
      const data = await res.json()
      if (res.ok) {
        setSchedule(data.schedule ?? [])
        toast.success(data.message ?? 'Schedule populated')
        loadCourse()
      } else toast.error(data.error ?? 'Failed to populate schedule')
    } catch {
      toast.error('Failed to populate schedule')
    } finally {
      setPopulatingFromContent(false)
    }
  }

  const handleSaveMaterials = async () => {
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}/materials`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({
          editableCurriculum: editableCurriculum || undefined,
          editableNotes: editableNotes || undefined,
          editableTopics: editableTopics || undefined,
          outline: outline.length ? outline : undefined,
        }),
      })
      if (res.ok) {
        toast.success('Materials saved')
        loadCourse()
      } else toast.error('Failed to save materials')
    } catch {
      toast.error('Failed to save materials')
    }
  }

  const [fileExtracting, setFileExtracting] = useState(false)
  const handleFileRead = async (
    type: 'curriculum' | 'notes' | 'topics',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const isPlainText = /\.(txt|md|markdown)$/i.test(file.name) || file.type.startsWith('text/')
    if (!isPlainText) setFileExtracting(true)
    try {
      const { extractTextFromFile } = await import('@/lib/extract-file-text')
      const t = await extractTextFromFile(file)
      if (type === 'curriculum') setUploadText(p => ({ ...p, curriculum: t }))
      else if (type === 'notes') setUploadText(p => ({ ...p, notes: t }))
      else setUploadText(p => ({ ...p, topics: t }))
      toast.info(
        t
          ? 'File loaded. Generate the course outline in step 4.'
          : 'File loaded but no text was extracted. Try another file.'
      )
    } catch (err) {
      console.error(err)
      toast.error('Could not read file. Try a .txt or .md file, or paste text.')
    } finally {
      setFileExtracting(false)
    }
  }

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
        <div className="text-center text-muted-foreground">
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
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href={`/tutor/courses/${id}/builder`}>
              <ArrowLeft className="h-4 w-4" />
              Back to Course Builder
            </Link>
          </Button>
        </div>

        {/* Quick setup checklist - show when schedule is missing */}
        {schedule.length === 0 && (
          <Card className="border-2 border-gray-400 shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Quick setup</CardTitle>
              <CardDescription className="text-xs">
                Complete this to finish setting up your course.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>
                  <a href="#course-schedule" className="text-primary underline">
                    Add schedule (or populate from content/outline above)
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

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
              {curriculumCatalog.length > 0 ? (
                <Select
                  value={courseName}
                  onValueChange={handleCurriculumSelect}
                  disabled={loadingCatalog}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingCatalog ? 'Loading…' : 'Select curriculum'} />
                  </SelectTrigger>
                  <SelectContent>
                    {courseName && !curriculumCatalog.some(c => c.name === courseName) && (
                      <SelectItem value={courseName}>Current: {courseName}</SelectItem>
                    )}
                    {curriculumCatalog.map(c => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  placeholder="Course name"
                />
              )}
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
              <Card className="border-2 border-gray-400 shadow-sm">
                <CardContent className="pt-4">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedCategories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No categories selected</p>
                    ) : (
                      selectedCategories.map(cat => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="cursor-pointer bg-[#4FD1C5]/20 pr-1 text-[#1F2933] hover:bg-[#4FD1C5]/30"
                        >
                          {cat}
                          <button
                            onClick={() => toggleCategory(cat)}
                            className="ml-1 rounded-full p-0.5 hover:bg-red-100"
                            type="button"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <Select
                    onValueChange={value => {
                      if (!selectedCategories.includes(value)) {
                        setSelectedCategories([...selectedCategories, value])
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add a category..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <ScrollArea className="h-80">
                        <div className="p-2">
                          <p className="mb-2 text-xs font-semibold text-muted-foreground">
                            Global Exams
                          </p>
                          {GLOBAL_EXAMS_CATEGORIES.map(cat => (
                            <div key={cat.id} className="mb-2">
                              <p className="ml-2 text-xs text-muted-foreground">{cat.label}</p>
                              {cat.exams.map(exam => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">
                            AP
                          </p>
                          {AP_CATEGORIES.map(cat => (
                            <div key={cat.id} className="mb-2">
                              <p className="ml-2 text-xs text-muted-foreground">{cat.label}</p>
                              {cat.exams.map(exam => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">
                            A Level
                          </p>
                          {A_LEVEL_CATEGORIES.map(cat => (
                            <div key={cat.id} className="mb-2">
                              <p className="ml-2 text-xs text-muted-foreground">{cat.label}</p>
                              {cat.exams.map(exam => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">
                            IB
                          </p>
                          {IB_CATEGORIES.map(cat => (
                            <div key={cat.id} className="mb-2">
                              <p className="ml-2 text-xs text-muted-foreground">{cat.label}</p>
                              {cat.exams.map(exam => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">
                            IGCSE
                          </p>
                          {IGCSE_CATEGORIES.map(cat => (
                            <div key={cat.id} className="mb-2">
                              <p className="ml-2 text-xs text-muted-foreground">{cat.label}</p>
                              {cat.exams.map(exam => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-2 border-gray-400 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost per 1 hour session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
              <div>
                <Label htmlFor="isFree" className="text-sm font-medium">
                  Free course
                </Label>
                <p className="text-xs text-muted-foreground">
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
              <div className="rounded-lg border bg-muted/30 p-3">
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
                  <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Cost for course</div>
                      <div className="font-medium">USD {cost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Revenue (after 30% commission)
                      </div>
                      <div className="font-medium">USD {revenue.toFixed(2)}</div>
                    </div>
                  </div>
                )
              })()}

            {/* Weekly repeat option */}
            <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/30 p-3">
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
                      <span className="text-xs text-muted-foreground">
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
                    <span className="text-xs text-muted-foreground">
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
              <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-2 py-2">
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
                <span className="text-xs text-muted-foreground">{scheduleMonthLabel}</span>
                <div className="flex items-center gap-1">
                  <span className="mr-1 text-[10px] text-muted-foreground">Month:</span>
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
              <p className="border-b bg-muted/20 px-2 py-1 text-xs text-muted-foreground">
                Click a time slot to add or remove a 1-hour session.
              </p>
              <div className="grid grid-cols-8 border-b bg-muted/30">
                <div className="border-r p-2 text-center text-xs font-medium">Time</div>
                {DAYS.map((day, i) => {
                  const d = weekDates[i]
                  return (
                    <div
                      key={`${day}-${d.getTime()}`}
                      className="border-r p-2 text-center text-xs font-medium"
                    >
                      <div>{day.slice(0, 3)}</div>
                      <div className="mt-0.5 text-[10px] font-normal text-muted-foreground">
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
                        <div className="border-b border-r border-dashed p-1 text-center text-[10px] text-muted-foreground">
                          {displayTime}
                        </div>
                        {DAYS.map(day => {
                          const inRange = schedule.some(
                            s =>
                              s.dayOfWeek === day &&
                              (() => {
                                const [sh, sm] = s.startTime.split(':').map(Number)
                                const startM = sh * 60 + sm
                                const endM = startM + s.durationMinutes
                                const [th, tm] = timeStr.split(':').map(Number)
                                const slotM = th * 60 + tm
                                return slotM >= startM && slotM < endM
                              })()
                          )
                          const toggleSlot = () => {
                            setSchedule(prev => {
                              const idx = prev.findIndex(s => {
                                if (s.dayOfWeek !== day) return false
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
                                { dayOfWeek: day, startTime: timeStr, durationMinutes: 60 },
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
                                  1h
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

            {/* Set Schedule Button */}
            <Button onClick={generateScheduleSummary} variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Set Schedule
            </Button>

            {/* Schedule Summary - sessions, duration, cost/revenue, interactive by day */}
            {scheduleSummary.length > 0 && (
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50/50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="h-5 w-5 text-primary" />
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

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3">
          <Button size="sm" variant="outline" onClick={handleSaveAll} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              await handleSaveAll()
              // Publish the course (toggle isPublished via PATCH)
              try {
                const csrf = await getCsrf()
                const res = await fetch(`/api/tutor/courses/${id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(csrf && { 'X-CSRF-Token': csrf }),
                  },
                  credentials: 'include',
                  body: JSON.stringify({ isPublished: true }),
                })
                if (res.ok) {
                  const data = await res.json()
                  setCourse(prev => (prev ? { ...prev, isPublished: true } : (data.course ?? prev)))
                  toast.success('Course published successfully!')
                } else {
                  const data = await res.json().catch(() => null)
                  toast.error(data?.error || 'Failed to publish course')
                }
              } catch {
                toast.error('Failed to publish course')
              }
            }}
            disabled={saving}
            className="bg-[#F17623] hover:bg-[#e06613]"
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
