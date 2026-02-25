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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ArrowLeft, BookOpen, FileText, ListOrdered, CheckCircle2, Loader2, Radio, DollarSign } from 'lucide-react'
import { PublishButton, PublishStatusBadge } from '@/components/tutor/PublishButton'
import { toast } from 'sonner'
import type { ScheduleItem } from './constants'
import { DAYS, GRADE_LEVELS } from './constants'
import { CourseScheduleCard } from './components/CourseScheduleCard'

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
  const [tutorProfile, setTutorProfile] = useState<{ currency?: string | null } | null>(null)

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
      .then((data) => data?.profile && setTutorProfile(data.profile))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!course) return
    setCourseName(course.name ?? '')
    setDescription(course.description ?? '')
    setGradeLevel(course.gradeLevel ?? '')
    setDifficulty(course.difficulty ?? 'intermediate')
    setLanguageOfInstruction(course.languageOfInstruction ?? '')
    setPrice(course.price != null ? String(course.price) : '')
    setCurrency(course.currency ?? tutorProfile?.currency ?? 'SGD')
    setCurriculumSource((course.curriculumSource as 'PLATFORM' | 'UPLOADED') ?? 'PLATFORM')
    setOutlineSource((course.outlineSource as 'SELF' | 'AI') ?? 'SELF')
    setSchedule(Array.isArray(course.schedule) ? [...course.schedule] : [])
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
          currency: currency || null,
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
              currency: currency || null,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/curriculum">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold truncate">{course.name}</h1>
            {gradeLevel && (
              <span className="text-sm text-muted-foreground font-normal">({gradeLevel})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <PublishStatusBadge isPublished={course.isPublished} />
            <PublishButton
              course={{
                id: course.id,
                name: course.name,
                description: course.description,
                subject: course.subject,
                price: course.price,
                currency: course.currency,
                isPublished: course.isPublished,
                modules: course.modules,
              }}
              onPublishChange={(isPublished) => {
                setCourse((prev) => (prev ? { ...prev, isPublished } : null))
              }}
              size="sm"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleOpenInLiveClass}
              disabled={launchingLiveClass}
            >
              {launchingLiveClass ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Opening…
                </>
              ) : (
                <>
                  <Radio className="h-4 w-4 mr-2" />
                  Open in Live Class
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tutor/dashboard">Back to dashboard</Link>
            </Button>
          </div>
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
            <CardDescription>
              Basic information about your course.
            </CardDescription>
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
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will students learn in this course?"
                rows={3}
                className="resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label>Grade Level</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_LEVELS.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <CardDescription>
              Set the price for your course. You need to set a price before publishing.
            </CardDescription>
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
                  placeholder="e.g. 99"
                />
                <p className="text-xs text-muted-foreground">Leave empty for free courses</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {price && Number(price) > 0 && (
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm">
                  <span className="font-medium">Price preview:</span>{' '}
                  {currency} {Number(price).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <CourseScheduleCard
          schedule={schedule}
          onScheduleChange={setSchedule}
        />

        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSaveAll}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
