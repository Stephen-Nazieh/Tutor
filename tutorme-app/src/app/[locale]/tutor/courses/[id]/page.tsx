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
import { ArrowLeft, BookOpen, FileText, ListOrdered, CheckCircle2, Loader2, Radio, DollarSign, X, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import type { ScheduleItem } from './constants'
import { DAYS } from './constants'

// Categories from tutor registration - flattened list of all exam categories
interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

const GLOBAL_EXAMS_CATEGORIES: ExamCategory[] = [
  { id: 'admission-exams', label: 'Admission Exams', exams: ['SAT', 'ACT'] },
  { id: 'english-proficiency', label: 'English Proficiency', exams: ['IELTS Academic', 'IELTS General', 'TOEFL iBT', 'PTE Academic', 'Duolingo English Test', 'CPE', 'CAE', 'Cambridge B2', 'International ESOL', 'Oxford Test of English', 'iTEP Academic', 'TOEIC', 'MET', 'EIKEN'] },
  { id: 'postgraduate-exams', label: 'Postgraduate Exams', exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT'] }
]

const AP_CATEGORIES: ExamCategory[] = [
  { id: 'ap-stem', label: 'AP - STEM', exams: ['AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Biology', 'AP Chemistry', 'AP Physics 1', 'AP Physics 2', 'AP Physics C: Mechanics', 'AP Physics C: Electricity and Magnetism', 'AP Environmental Science', 'AP Computer Science A', 'AP Computer Science Principles'] },
  { id: 'ap-humanities', label: 'AP - Humanities', exams: ['AP English & Composition', 'AP Literature & Composition', 'AP Seminar', 'AP Research', 'AP World History: Modern', 'AP United States History', 'AP European History', 'AP Human Geography', 'AP Psychology', 'AP Macroeconomics', 'AP Microeconomics', 'AP Comparative Government and Politics', 'AP United States Government and Politics'] },
  { id: 'ap-languages', label: 'AP - Languages', exams: ['AP Chinese Language and Culture', 'AP French Language and Culture', 'AP German Language and Culture', 'AP Italian Language and Culture', 'AP Japanese Language and Culture', 'AP Latin', 'AP Spanish Language and Culture', 'AP Spanish Literature and Culture'] },
  { id: 'ap-art', label: 'AP - Art', exams: ['AP Art History', 'AP Music Theory', 'AP Studio Art: 2-D Art and Design', 'AP Studio Art: 3-D Art and Design', 'AP Drawing'] }
]

const A_LEVEL_CATEGORIES: ExamCategory[] = [
  { id: 'as-courses', label: 'AS Level Courses', exams: ['AS Level Mathematics', 'AS Level Further Mathematics', 'AS Level Physics', 'AS Level Chemistry', 'AS Level Biology', 'AS Level Computer Science', 'AS Level Information Technology', 'AS Level Economics', 'AS Level Business', 'AS Level Accounting', 'AS Level Psychology', 'AS Level Sociology', 'AS Level History', 'AS Level Geography', 'AS Level English Language', 'AS Level English Literature', 'AS Level Global Perspectives & Research', 'AS Level Art and Design', 'AS Level Media Studies'] },
  { id: 'a-level-courses', label: 'A Level Courses', exams: ['A Level Mathematics', 'A Level Further Mathematics', 'A Level Physics', 'A Level Chemistry', 'A Level Biology', 'A Level Computer Science', 'A Level Information Technology', 'A Level Economics', 'A Level Business', 'A Level Accounting', 'A Level Psychology', 'A Level Sociology', 'A Level History', 'A Level Geography', 'A Level English Language', 'A Level English Literature', 'A Level Global Perspectives & Research', 'A Level Art and Design', 'A Level Media Studies'] }
]

const IB_CATEGORIES: ExamCategory[] = [
  { id: 'ib-courses', label: 'IB Courses', exams: ['IB Mathematics: Analysis and Approaches', 'IB Mathematics: Applications and Interpretation', 'IB Physics', 'IB Chemistry', 'IB Biology', 'IB Computer Science', 'IB Economics', 'IB Business Management', 'IB Psychology', 'IB History', 'IB Geography', 'IB English A: Language and Literature', 'IB English A: Literature', 'IB Language B Courses', 'IB Visual Arts', 'IB Theory of Knowledge (TOK)', 'IB Extended Essay (EE)'] }
]

const IGCSE_CATEGORIES: ExamCategory[] = [
  { id: 'igcse-mathematics', label: 'IGCSE Mathematics', exams: ['IGCSE Mathematics', 'IGCSE Additional Mathematics', 'IGCSE International Mathematics'] },
  { id: 'igcse-sciences', label: 'IGCSE Sciences', exams: ['IGCSE Physics', 'IGCSE Chemistry', 'IGCSE Biology', 'IGCSE Combined Science', 'IGCSE Coordinated Sciences', 'IGCSE Environmental Management'] },
  { id: 'igcse-english', label: 'IGCSE English', exams: ['IGCSE English Language', 'IGCSE English Literature', 'IGCSE English as a Second Language'] },
  { id: 'igcse-humanities', label: 'IGCSE Humanities', exams: ['IGCSE History', 'IGCSE Geography', 'IGCSE Economics', 'IGCSE Business Studies', 'IGCSE Accounting', 'IGCSE Sociology', 'IGCSE Global Perspectives'] },
  { id: 'igcse-languages', label: 'IGCSE Languages', exams: ['IGCSE French', 'IGCSE Spanish', 'IGCSE German', 'IGCSE Chinese', 'IGCSE Arabic', 'IGCSE Hindi'] },
  { id: 'igcse-arts', label: 'IGCSE Arts', exams: ['IGCSE Art & Design', 'IGCSE Music', 'IGCSE Drama', 'IGCSE Physical Education', 'IGCSE Travel & Tourism'] },
  { id: 'igcse-technical', label: 'IGCSE Technical', exams: ['IGCSE Computer Science', 'IGCSE Information & Communication Technology', 'IGCSE Design & Technology'] }
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
  const [tutorProfile, setTutorProfile] = useState<{ currency?: string | null; categories?: string[] } | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [scheduleSummary, setScheduleSummary] = useState<ScheduleItem[]>([])

  const loadCourse = useCallback(async () => {
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
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.profile) {
          setTutorProfile(data.profile)
          // Load tutor's categories from profile if available
          if (data.profile.categories && Array.isArray(data.profile.categories)) {
            setSelectedCategories(data.profile.categories)
          }
        }
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (!course) return
    setCourseName(course.name ?? '')
    setDescription(course.description ?? '')
    setGradeLevel(course.gradeLevel ?? '')
    setDifficulty(course.difficulty ?? 'intermediate')
    setLanguageOfInstruction(course.languageOfInstruction ?? '')
    setPrice(course.price != null ? String(course.price) : '')
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
      .then((res) => res.json())
      .then((data) => setCurriculumCatalog(data.curriculums ?? []))
      .catch(() => setCurriculumCatalog([]))
      .finally(() => setLoadingCatalog(false))
  }, [course?.subject])

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
        enableRecording: false,
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
          price: price === '' ? null : Number(price),
          currency: 'USD',
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
      setCourse((prev) =>
        prev
          ? {
            ...prev,
            name: courseName.trim() || prev.name,
            description: description.trim() || prev.description,
            gradeLevel: gradeLevel || prev.gradeLevel,
            difficulty: difficulty || prev.difficulty,
            languageOfInstruction: languageOfInstruction || null,
            price: price === '' ? null : Number(price),
            currency: 'USD',
            curriculumSource,
            outlineSource: curriculumSource === 'UPLOADED' ? outlineSource : null,
            schedule,
          }
          : null
      )
      if (curriculumSource === 'UPLOADED' && (editableCurriculum || editableNotes || editableTopics || outline.length > 0)) {
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
        setCourse((prev) => (prev ? { ...prev, name } : null))
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
      toast.error('Upload at least one of curriculum, notes, or topics before generating the outline.')
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
          curriculumText: uploadText.curriculum.trim() || materials.curriculumText || materials.editableCurriculum || undefined,
          notesText: uploadText.notes.trim() || materials.notesText || materials.editableNotes || undefined,
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
  const handleFileRead = async (type: 'curriculum' | 'notes' | 'topics', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const isPlainText = /\.(txt|md|markdown)$/i.test(file.name) || file.type.startsWith('text/')
    if (!isPlainText) setFileExtracting(true)
    try {
      const { extractTextFromFile } = await import('@/lib/extract-file-text')
      const t = await extractTextFromFile(file)
      if (type === 'curriculum') setUploadText((p) => ({ ...p, curriculum: t }))
      else if (type === 'notes') setUploadText((p) => ({ ...p, notes: t }))
      else setUploadText((p) => ({ ...p, topics: t }))
      toast.info(t ? 'File loaded. Generate the course outline in step 4.' : 'File loaded but no text was extracted. Try another file.')
    } catch (err) {
      console.error(err)
      toast.error('Could not read file. Try a .txt or .md file, or paste text.')
    } finally {
      setFileExtracting(false)
    }
  }

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-muted-foreground">Loading course…</p>
      </div>
    )
  }

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Generate schedule summary
  const generateScheduleSummary = () => {
    if (schedule.length === 0) {
      toast.error('Please add schedule items first')
      return
    }
    setScheduleSummary(schedule)
    toast.success('Schedule summary generated')
  }

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const formatTime = (time: string) => {
    const [hourStr, minuteStr] = time.split(':')
    const hour = Number(hourStr)
    const minute = Number(minuteStr)
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    const period = hour >= 12 ? 'PM' : 'AM'
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }
  const formatTimeRange = (startTime: string, durationMinutes: number) => {
    const [hourStr, minuteStr] = startTime.split(':')
    const startHour = Number(hourStr)
    const startMinute = Number(minuteStr)
    const startTotal = startHour * 60 + startMinute
    const endTotal = startTotal + durationMinutes
    const endHour = Math.floor((endTotal / 60) % 24)
    const endMinute = endTotal % 60
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
    return `${formatTime(startTime)}–${formatTime(endTime)}`
  }
  const timezoneLabel = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local time'
  const scheduleByDay = scheduleSummary.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) acc[slot.dayOfWeek] = []
    acc[slot.dayOfWeek].push(slot)
    return acc
  }, {} as Record<string, ScheduleItem[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-4 sm:p-6 space-y-6">
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
          <Card className="border-dashed">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Quick setup</CardTitle>
              <CardDescription className="text-xs">Complete this to finish setting up your course.</CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li><a href="#course-schedule" className="text-primary underline">Add schedule (or populate from content/outline above)</a></li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Course Details */}
        <Card>
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
                    {courseName && !curriculumCatalog.some((c) => c.name === courseName) && (
                      <SelectItem value={courseName}>Current: {courseName}</SelectItem>
                    )}
                    {curriculumCatalog.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Course name"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Course Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will students learn in this course?"
                rows={3}
                className="resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <Card className="border-dashed">
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No categories selected</p>
                    ) : (
                      selectedCategories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="cursor-pointer bg-[#4FD1C5]/20 text-[#1F2933] hover:bg-[#4FD1C5]/30 pr-1"
                        >
                          {cat}
                          <button
                            onClick={() => toggleCategory(cat)}
                            className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                            type="button"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <Select
                    onValueChange={(value) => {
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
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Global Exams</p>
                          {GLOBAL_EXAMS_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="mb-2">
                              <p className="text-xs text-muted-foreground ml-2">{cat.label}</p>
                              {cat.exams.map((exam) => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="text-xs font-semibold text-muted-foreground mb-2 mt-4">AP</p>
                          {AP_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="mb-2">
                              <p className="text-xs text-muted-foreground ml-2">{cat.label}</p>
                              {cat.exams.map((exam) => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="text-xs font-semibold text-muted-foreground mb-2 mt-4">A Level</p>
                          {A_LEVEL_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="mb-2">
                              <p className="text-xs text-muted-foreground ml-2">{cat.label}</p>
                              {cat.exams.map((exam) => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="text-xs font-semibold text-muted-foreground mb-2 mt-4">IB</p>
                          {IB_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="mb-2">
                              <p className="text-xs text-muted-foreground ml-2">{cat.label}</p>
                              {cat.exams.map((exam) => (
                                <SelectItem key={exam} value={exam}>
                                  {exam}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                          <p className="text-xs font-semibold text-muted-foreground mb-2 mt-4">IGCSE</p>
                          {IGCSE_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="mb-2">
                              <p className="text-xs text-muted-foreground ml-2">{cat.label}</p>
                              {cat.exams.map((exam) => (
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value="USD"
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            {price && Number(price) > 0 && (
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm">
                  <span className="font-medium">Price preview:</span>{' '}
                  USD {Number(price).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course Schedule */}
        <Card id="course-schedule">
          <CardHeader>
            <CardTitle>Course Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Weekly Calendar with 30-min intervals */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-8 border-b bg-muted/30">
                <div className="p-2 text-xs font-medium text-center border-r">Time</div>
                {DAYS.map(day => (
                  <div key={day} className="p-2 text-xs font-medium text-center">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-8">
                  {/* Time slots - 30 minute intervals from 6:00 to 22:00 */}
                  {Array.from({ length: 32 }, (_, i) => {
                    const hour = Math.floor(i / 2) + 6
                    const minute = (i % 2) * 30
                    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                    const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
                    
                    return (
                      <div key={timeStr} className="contents">
                        <div className="p-1 text-[10px] text-muted-foreground text-center border-r border-b border-dashed">
                          {i % 2 === 0 ? displayTime : ''}
                        </div>
                        {DAYS.map(day => {
                          const existingSlot = schedule.find(s => 
                            s.dayOfWeek === day && s.startTime === timeStr
                          )
                          return (
                            <div
                              key={`${day}-${timeStr}`}
                              className={`p-1 border-b border-dashed border-r min-h-[25px] cursor-pointer transition-colors ${
                                existingSlot 
                                  ? 'bg-blue-100 hover:bg-blue-200' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => {
                                if (existingSlot) {
                                  setSchedule(schedule.filter(s => !(s.dayOfWeek === day && s.startTime === timeStr)))
                                } else {
                                  setSchedule([...schedule, { 
                                    dayOfWeek: day, 
                                    startTime: timeStr, 
                                    durationMinutes: 60 
                                  }])
                                }
                              }}
                              title={existingSlot ? `${existingSlot.durationMinutes} min` : 'Click to add 60 min session'}
                            >
                              {existingSlot && (
                                <div className="text-[8px] bg-blue-500 text-white rounded px-1 py-0.5 text-center truncate">
                                  {existingSlot.durationMinutes}m
                                </div>
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
            
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded" />
                <span>Scheduled</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border border-dashed rounded" />
                <span>Click to add/remove</span>
              </div>
            </div>

            {/* Set Schedule Button */}
            <Button
              onClick={generateScheduleSummary}
              variant="outline"
              className="w-full"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Set Schedule
            </Button>

            {/* Schedule Summary */}
            {scheduleSummary.length > 0 && (
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Schedule Summary</CardTitle>
                  <CardDescription className="text-xs">Times shown in {timezoneLabel}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dayOrder
                      .filter((day) => scheduleByDay[day]?.length)
                      .map((day) => (
                        <div key={day} className="rounded border bg-white p-3">
                          <div className="text-sm font-semibold text-slate-800">{day}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {scheduleByDay[day]
                              .sort((a, b) => a.startTime.localeCompare(b.startTime))
                              .map((slot, idx) => (
                                <div
                                  key={`${day}-${idx}-${slot.startTime}`}
                                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                                >
                                  {formatTimeRange(slot.startTime, slot.durationMinutes)} • {slot.durationMinutes} min
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
          <Button
            size="sm"
            variant="outline"
            onClick={handleSaveAll}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              await handleSaveAll()
              // Publish the course
              try {
                const csrf = await getCsrf()
                const res = await fetch(`/api/tutor/courses/${id}/publish`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
                  credentials: 'include',
                })
                if (res.ok) {
                  setCourse(prev => prev ? { ...prev, isPublished: true } : null)
                  toast.success('Course published successfully!')
                } else {
                  const data = await res.json()
                  toast.error(data.error || 'Failed to publish course')
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
