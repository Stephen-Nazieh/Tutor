/**
 * Tutor course management page
 * Curriculum/materials source, language, price, shareable link, student count, schedule
 */

'use client'

import { useState, useEffect } from 'react'
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
import { ArrowLeft, BookOpen, Upload, Sparkles, FileText, ListOrdered, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { ScheduleItem } from './constants'
import { DAYS, GRADE_LEVELS, DIFFICULTY_LEVELS } from './constants'
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
  const [uploadStep, setUploadStep] = useState<'curriculum' | 'notes' | 'done'>('curriculum')
  const [uploadText, setUploadText] = useState({ curriculum: '', notes: '', topics: '' })
  const [converting, setConverting] = useState(false)
  const [generatingOutline, setGeneratingOutline] = useState(false)
  const [populatingSchedule, setPopulatingSchedule] = useState(false)
  const [populatingFromContent, setPopulatingFromContent] = useState(false)
  const [editableCurriculum, setEditableCurriculum] = useState('')
  const [editableNotes, setEditableNotes] = useState('')
  const [editableTopics, setEditableTopics] = useState('')
  const [outline, setOutline] = useState<OutlineItem[]>([])
  const [outlineModules, setOutlineModules] = useState<OutlineModuleItem[]>([])
  const [outlineModalOpen, setOutlineModalOpen] = useState(false)
  const [typicalLessonMinutes, setTypicalLessonMinutes] = useState(45)
  const [tutorProfile, setTutorProfile] = useState<{ currency?: string | null } | null>(null)

  useEffect(() => {
    loadCourse()
  }, [id])

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
      if (cm.editableCurriculum || cm.curriculumText) setUploadStep('notes')
      if (cm.editableNotes || cm.notesText) setUploadStep('done')
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

  const loadCourse = async () => {
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
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
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
      if (res.ok) {
        toast.success(data.message ?? 'Settings saved')
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
      } else {
        toast.error(data.error ?? 'Failed to save')
      }
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
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

  const handleUploadConvert = async (type: 'curriculum' | 'notes' | 'topics') => {
    const text = type === 'curriculum' ? uploadText.curriculum : type === 'notes' ? uploadText.notes : uploadText.topics
    if (!text.trim()) {
      toast.error(`Enter or paste ${type} text first`)
      return
    }
    setConverting(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${id}/materials/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ type, text }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message ?? 'Converted')
        if (type === 'curriculum') {
          setEditableCurriculum(data.editable ?? '')
          setUploadStep('notes')
        } else if (type === 'notes') {
          setEditableNotes(data.editable ?? '')
          setUploadStep('done')
        } else {
          setEditableTopics(data.editable ?? '')
        }
        loadCourse()
      } else toast.error(data.error ?? 'Failed to convert')
    } catch {
      toast.error('Failed to convert')
    } finally {
      setConverting(false)
    }
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
          <Button variant="outline" size="sm" asChild>
            <Link href="/tutor/dashboard">Back to dashboard</Link>
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

        {/* Curriculum & materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Curriculum & materials
            </CardTitle>
            <CardDescription>
              Use platform content for review, or upload your own and we’ll guide you step by step. AI converts uploads into editable formats.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Curriculum</Label>
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
              <p className="text-xs text-muted-foreground">
                {curriculumCatalog.length > 0
                  ? 'Choose a curriculum for this subject (e.g. AP Calculus, IELTS). Save settings below to persist.'
                  : 'No catalog for this subject. Edit the course name and save below.'}
              </p>
            </div>

            <div className="space-y-4">
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
                <Label>Grade level</Label>
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
              <p className="text-xs text-muted-foreground">Description and grade level are saved with the rest of the settings below. Groups, schedules, and pricing are managed in the Course Builder.</p>
            </div>

            <div className="space-y-2">
              <Label>Content source</Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="curriculumSource"
                    checked={curriculumSource === 'PLATFORM'}
                    onChange={() => setCurriculumSource('PLATFORM')}
                    className="rounded-full"
                  />
                  <span>Platform-provided curriculum and materials</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="curriculumSource"
                    checked={curriculumSource === 'UPLOADED'}
                    onChange={() => setCurriculumSource('UPLOADED')}
                    className="rounded-full"
                  />
                  <span>Upload my own materials</span>
                </label>
              </div>
            </div>

            {curriculumSource === 'PLATFORM' && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Course content for your review
                </h4>
                <p className="text-sm text-muted-foreground">
                  Below is the platform curriculum. Each topic is sized for a typical lesson. You can edit modules and lessons in the course content page and then set the class schedule.
                </p>
                <div className="space-y-3 max-h-[320px] overflow-y-auto">
                  {course.modules?.map((mod) => (
                    <div key={mod.id} className="border rounded p-3 bg-background">
                      <p className="font-medium">{mod.title}</p>
                      {mod.description && <p className="text-sm text-muted-foreground">{mod.description}</p>}
                      <ul className="mt-2 space-y-1 text-sm">
                        {(mod.lessons ?? []).map((les) => (
                          <li key={les.id} className="flex items-center gap-2">
                            <span className="text-muted-foreground">{les.duration ?? 30} min</span>
                            <span>{les.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/curriculum/${id}`}>Edit course content</Link>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handlePopulateScheduleFromContent}
                    disabled={populatingFromContent || !course.modules?.length}
                  >
                    {populatingFromContent ? 'Populating…' : 'Populate class schedule from course content'}
                  </Button>
                </div>
              </div>
            )}

            {curriculumSource === 'UPLOADED' && (
              <>
                <div className="space-y-2 pl-4 border-l-2 border-muted">
                  <Label>Who creates the outline?</Label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="outlineSource"
                        checked={outlineSource === 'SELF'}
                        onChange={() => setOutlineSource('SELF')}
                        className="rounded-full"
                      />
                      <span>I create the outline myself (we’ll take you through upload steps)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="outlineSource" checked={outlineSource === 'AI'} onChange={() => setOutlineSource('AI')} className="rounded-full" />
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>AI generates outline from my materials</span>
                    </label>
                  </div>
                </div>

                {outlineSource === 'SELF' && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>When to upload what:</strong> First upload your curriculum (syllabus or outline). Then optionally upload notes. If you upload a list of topics, AI will put it in the “Edit Topics” area. If you only upload curriculum, AI can create the course outline from it. The outline is split so each topic fits one lesson—then you can populate the class schedule from it.
                    </p>

                    {/* Step 1: Upload curriculum */}
                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">1</span>
                        <Label className="text-base">Upload curriculum</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Paste or upload your curriculum/syllabus. Supports .txt, .md, .pdf, .doc/.docx, and images (text extracted automatically).</p>
                      <p className="text-sm text-muted-foreground">Upload your curriculum/syllabus. Content is sent to AI to generate the course outline (step 4); it is not displayed.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Input
                          type="file"
                          accept=".txt,.md,.pdf,.doc,.docx,image/*"
                          className="max-w-[200px]"
                          onChange={(e) => handleFileRead('curriculum', e)}
                          disabled={fileExtracting}
                        />
                        {fileExtracting && <span className="text-sm text-muted-foreground">Sending to AI…</span>}
                        {uploadText.curriculum && !fileExtracting && <span className="text-sm text-green-600">Curriculum loaded — generate outline in step 4</span>}
                      </div>
                      {uploadText.curriculum && (
                        <p className="text-xs text-muted-foreground mt-2">Curriculum received. Optionally add notes in step 2, then generate the course outline in step 4.</p>
                      )}
                    </div>

                    {/* Step 2: Upload notes */}
                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">2</span>
                        <Label className="text-base">Upload notes (optional)</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Paste or upload teaching notes. Supports .txt, .md, .pdf, .doc/.docx, and images.</p>
                      <p className="text-sm text-muted-foreground">Optional. Upload teaching notes; they are sent to AI for outline generation (step 4) and are not displayed.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Input type="file" accept=".txt,.md,.pdf,.doc,.docx,image/*" className="max-w-[200px]" onChange={(e) => handleFileRead('notes', e)} disabled={fileExtracting} />
                        {fileExtracting && <span className="text-sm text-muted-foreground">Sending…</span>}
                        {uploadText.notes && !fileExtracting && <span className="text-sm text-green-600">Notes loaded</span>}
                      </div>
                    </div>

                    {/* Topics list → Edit Topics */}
                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">3</span>
                        <ListOrdered className="h-5 w-5" />
                        <Label className="text-base">List of topics (optional)</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">If you have a list of topics (bullets or short lines), paste or upload it. Supports .txt, .md, .pdf, .doc/.docx, and images.</p>
                      <p className="text-sm text-muted-foreground">Optional. Upload a list of topics; content is used by AI and is not displayed.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Input type="file" accept=".txt,.md,.pdf,.doc,.docx,image/*" className="max-w-[200px]" onChange={(e) => handleFileRead('topics', e)} disabled={fileExtracting} />
                        {fileExtracting && <span className="text-sm text-muted-foreground">Sending…</span>}
                        {uploadText.topics && !fileExtracting && <span className="text-sm text-green-600">Topics loaded</span>}
                      </div>
                    </div>

                    {/* Step 4: Generate outline from curriculum (if no topics) or after topics */}
                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">4</span>
                        <FileText className="h-5 w-5" />
                        <Label className="text-base">Course outline</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">If you only uploaded curriculum (no topics list), generate a course outline. Each item is one typical lesson length so it can populate the class schedule.</p>
                      <Button
                        onClick={() => {
                          if (!hasAtLeastOneUpload) {
                            toast.error('Upload at least one of curriculum, notes, or topics before generating the outline.')
                            return
                          }
                          setOutlineModalOpen(true)
                        }}
                        disabled={generatingOutline}
                      >
                        {generatingOutline ? 'Generating…' : 'Generate course outline'}
                      </Button>
                      {(outline.length > 0 || outlineModules.length > 0) && (
                        <div className="mt-3 space-y-2">
                          <Label className="text-xs">Outline (each row = one class)</Label>
                          {outlineModules.length > 0 ? (
                            <div className="space-y-3">
                              {outlineModules.map((mod, mi) => (
                                <div key={mi} className="rounded border p-2">
                                  <div className="font-medium text-sm">{mod.title}</div>
                                  {mod.description && <p className="text-xs text-muted-foreground">{mod.description}</p>}
                                  <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                                    {mod.lessons.map((lesson, li) => (
                                      <li key={li}>{lesson.title} — {lesson.durationMinutes} min</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {outline.map((item, i) => (
                                <li key={i}>{item.title} — {item.durationMinutes} min</li>
                              ))}
                            </ul>
                          )}
                          <Button variant="outline" size="sm" onClick={handlePopulateSchedule} disabled={populatingSchedule}>
                            {populatingSchedule ? 'Populating…' : 'Populate class schedule from outline'}
                          </Button>
                        </div>
                      )}
                    </div>

                    <Dialog open={outlineModalOpen} onOpenChange={setOutlineModalOpen}>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Generate course outline</DialogTitle>
                          <DialogDescription>
                            Set typical lesson length and generate an outline from your materials. Each lesson will be one class slot.
                          </DialogDescription>
                        </DialogHeader>
                        {outline.length > 0 || outlineModules.length > 0 ? (
                          <div className="space-y-4">
                            <Label className="text-xs">Generated outline</Label>
                            {outlineModules.length > 0 ? (
                              <div className="space-y-3">
                                {outlineModules.map((mod, mi) => (
                                  <div key={mi} className="rounded border p-3">
                                    <div className="font-medium">{mod.title}</div>
                                    {mod.description && <p className="text-sm text-muted-foreground">{mod.description}</p>}
                                    {mod.notes && <p className="text-sm text-muted-foreground mt-1">{mod.notes}</p>}
                                    {mod.tasks && mod.tasks.length > 0 && (
                                      <p className="text-xs text-muted-foreground mt-1">Tasks: {mod.tasks.map((t) => t.title).join(', ')}</p>
                                    )}
                                    <ul className="list-disc list-inside text-sm mt-2 space-y-0.5">
                                      {mod.lessons.map((lesson, li) => (
                                        <li key={li}>{lesson.title} — {lesson.durationMinutes} min</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {outline.map((item, i) => (
                                  <li key={i}>{item.title} — {item.durationMinutes} min</li>
                                ))}
                              </ul>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => { setOutlineModalOpen(false); loadCourse() }}>Close</Button>
                              <Button onClick={async () => { await handlePopulateSchedule(); setOutlineModalOpen(false); loadCourse() }} disabled={populatingSchedule}>
                                {populatingSchedule ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                {populatingSchedule ? 'Populating…' : 'Populate class schedule from outline'}
                              </Button>
                            </DialogFooter>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-wrap items-center gap-2">
                              <Label className="text-xs">Typical lesson length (min):</Label>
                              <Input
                                type="number"
                                min={15}
                                max={120}
                                value={typicalLessonMinutes}
                                onChange={(e) => setTypicalLessonMinutes(parseInt(e.target.value, 10) || 45)}
                                className="w-20"
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setOutlineModalOpen(false)}>Cancel</Button>
                              <Button onClick={handleGenerateOutline} disabled={generatingOutline}>
                                {generatingOutline ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                {generatingOutline ? 'Generating…' : 'Generate outline'}
                              </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="secondary" onClick={handleSaveMaterials}>Save materials & outline</Button>
                  </div>
                )}

                {outlineSource === 'AI' && (
                  <p className="text-sm text-muted-foreground">
                    Upload your materials above (curriculum and optionally notes). Then use “Generate course outline” to let AI create the outline from your content. Each outline item will be one lesson length so you can populate the class schedule.
                  </p>
                )}
              </>
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            asChild
          >
            <Link href={`/tutor/courses/${id}/builder`}>
              <Sparkles className="h-4 w-4 mr-2" />
              Open Course Builder
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          To edit modules and lessons, go to{' '}
          <Link href={`/curriculum/${id}`} className="text-primary underline">
            course content
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
