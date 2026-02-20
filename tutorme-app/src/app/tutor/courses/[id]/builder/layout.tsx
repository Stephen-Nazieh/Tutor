/**
 * Course Builder 2.0 Layout
 * Custom layout without the persistent tutor dashboard nav.
 * Features a builder-specific left nav and back button to dashboard.
 */

'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserNav } from '@/components/user-nav'
import {
  ArrowLeft,
  LayoutDashboard,
  BookOpen,
  Layers,
  FileText,
  Settings,
  Sparkles,
  ChevronLeft,
  Menu,
  X,
  Save,
  Eye,
  Users,
  Plus,
  Copy,
  Link2,
  ChevronDown,
  ChevronRight,
  Loader2,
  Upload,
  CheckCircle2,
  ListOrdered,
  FileText as FileTextIcon,
  Radio,
  Video,
  BarChart3
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTutorCourses } from '@/hooks/use-course-assignments'
import { AssignCourseModal } from '@/app/tutor/courses/components/AssignCourseModal'
import type { CourseGroupAssignment } from '@/types/course-assignment'

interface BuilderNavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const builderNavItems: BuilderNavItem[] = [
  { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
  { id: 'modules', label: 'Modules', icon: Layers },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'ai-assist', label: 'AI Assist', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
]

interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

interface BatchItem {
  id: string
  name: string
  startDate: string | null
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  languageOfInstruction?: string | null
  price?: number | null
  currency?: string | null
  schedule: ScheduleItem[]
  enrollmentCount: number
  /** Whether this group is currently live/online */
  isLive?: boolean
  /** Courses assigned to this batch */
  assignedCourses?: CourseGroupAssignment[]
}

interface EnrollmentItem {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  batchId: string | null
  enrolledAt: string
  lessonsCompleted: number
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const CURRICULUM_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Traditional)' },
  { value: 'ms', label: 'Malay' },
  { value: 'ta', label: 'Tamil' },
]

const CURRENCIES = ['SGD', 'USD', 'CNY', 'MYR', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'INR']

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Traditional)' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
  { value: 'bn', label: 'Bengali' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'tr', label: 'Turkish' },
  { value: 'th', label: 'Thai' },
  { value: 'ms', label: 'Malay' },
  { value: 'id', label: 'Indonesian' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'ur', label: 'Urdu' },
  { value: 'fa', label: 'Persian (Farsi)' },
  { value: 'nl', label: 'Dutch' },
  { value: 'pl', label: 'Polish' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'ro', label: 'Romanian' },
  { value: 'el', label: 'Greek' },
  { value: 'cs', label: 'Czech' },
  { value: 'sv', label: 'Swedish' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'da', label: 'Danish' },
  { value: 'fi', label: 'Finnish' },
  { value: 'no', label: 'Norwegian' },
  { value: 'he', label: 'Hebrew' },
  { value: 'sw', label: 'Swahili' },
]

export default function CourseBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const courseId = (params?.id as string) ?? ''
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('curriculum')
  
  // Groups & Schedules Modal State
  const [groupsModalOpen, setGroupsModalOpen] = useState(false)
  const [batches, setBatches] = useState<BatchItem[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([])
  const [loadingBatches, setLoadingBatches] = useState(false)
  const [newBatchName, setNewBatchName] = useState('')
  const [creatingBatch, setCreatingBatch] = useState(false)
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  // Curriculum & Materials Modal State
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false)
  const [course, setCourse] = useState<{
    id: string
    name: string
    subject: string
    description: string | null
    modules: { id: string; title: string; description: string | null; lessons: { id: string; title: string; duration: number }[] }[]
  } | null>(null)
  const [loadingCourse, setLoadingCourse] = useState(false)
  const [curriculumSource, setCurriculumSource] = useState<'PLATFORM' | 'UPLOADED'>('PLATFORM')
  const [outlineSource, setOutlineSource] = useState<'SELF' | 'AI'>('SELF')
  const [curriculumCatalog, setCurriculumCatalog] = useState<{ id: string; name: string }[]>([])
  const [loadingCatalog, setLoadingCatalog] = useState(false)
  const [uploadText, setUploadText] = useState({ curriculum: '', notes: '', topics: '' })
  const [fileExtracting, setFileExtracting] = useState(false)
  const [editableCurriculum, setEditableCurriculum] = useState('')
  const [editableNotes, setEditableNotes] = useState('')
  const [outline, setOutline] = useState<{ title: string; durationMinutes: number }[]>([])
  const [typicalLessonMinutes, setTypicalLessonMinutes] = useState(45)
  const [generatingOutline, setGeneratingOutline] = useState(false)
  const [savingMaterials, setSavingMaterials] = useState(false)

  // Determine active section based on URL or default
  const getActiveSection = () => {
    if (pathname.includes('/builder')) return 'curriculum'
    return activeSection
  }

  const currentSection = getActiveSection()

  const loadBatches = useCallback(async () => {
    if (!courseId) return
    setLoadingBatches(true)
    try {
      const res = await fetch(`/api/tutor/courses/${courseId}/batches`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        const loadedBatches = data.batches ?? []
        setBatches(loadedBatches)
        if (loadedBatches.length > 0 && !activeTab) {
          setActiveTab(loadedBatches[0].id)
        }
      }
    } catch {
      toast.error('Failed to load groups')
    } finally {
      setLoadingBatches(false)
    }
  }, [courseId, activeTab])

  const loadEnrollments = useCallback(async () => {
    if (!courseId) return
    try {
      const res = await fetch(`/api/tutor/courses/${courseId}/enrollments`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setEnrollments(data.enrollments ?? [])
      }
    } catch { /* ignore */ }
  }, [courseId])

  useEffect(() => {
    if (groupsModalOpen) {
      loadBatches()
      loadEnrollments()
    }
  }, [groupsModalOpen, loadBatches, loadEnrollments])

  // Load course data for Curriculum modal
  const loadCourse = useCallback(async () => {
    if (!courseId) return
    setLoadingCourse(true)
    try {
      const res = await fetch(`/api/tutor/courses/${courseId}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setCourse(data.course)
        setCurriculumSource((data.course?.curriculumSource as 'PLATFORM' | 'UPLOADED') ?? 'PLATFORM')
        setOutlineSource((data.course?.outlineSource as 'SELF' | 'AI') ?? 'SELF')
        
        // Load curriculum catalog for subject
        if (data.course?.subject) {
          setLoadingCatalog(true)
          fetch(`/api/curriculums/catalog?subject=${encodeURIComponent(data.course.subject)}`, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setCurriculumCatalog(data.curriculums ?? []))
            .catch(() => setCurriculumCatalog([]))
            .finally(() => setLoadingCatalog(false))
        }
      }
    } catch {
      toast.error('Failed to load course')
    } finally {
      setLoadingCourse(false)
    }
  }, [courseId])

  useEffect(() => {
    if (curriculumModalOpen) {
      loadCourse()
    }
  }, [curriculumModalOpen, loadCourse])

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  // Curriculum & Materials handlers
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
      toast.info(t ? 'File loaded. Generate the course outline in step 4.' : 'File loaded but no text was extracted.')
    } catch {
      toast.error('Could not read file. Try a .txt or .md file, or paste text.')
    } finally {
      setFileExtracting(false)
    }
  }

  const handleGenerateOutline = async () => {
    const hasContent = uploadText.curriculum.trim() || uploadText.notes.trim() || uploadText.topics.trim() || editableCurriculum.trim()
    if (!hasContent) {
      toast.error('Upload at least one of curriculum, notes, or topics before generating the outline.')
      return
    }
    setGeneratingOutline(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/materials/outline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({
          typicalLessonMinutes,
          curriculumText: uploadText.curriculum.trim() || editableCurriculum || undefined,
          notesText: uploadText.notes.trim() || editableNotes || undefined,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setOutline(data.outline ?? [])
        toast.success(data.message ?? 'Outline generated')
      } else toast.error(data.error ?? 'Failed to generate outline')
    } catch {
      toast.error('Failed to generate outline')
    } finally {
      setGeneratingOutline(false)
    }
  }

  const handleSaveMaterials = async () => {
    setSavingMaterials(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/materials`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({
          editableCurriculum: editableCurriculum || undefined,
          editableNotes: editableNotes || undefined,
          outline: outline.length ? outline : undefined,
        }),
      })
      if (res.ok) {
        toast.success('Materials saved')
        loadCourse()
      } else toast.error('Failed to save materials')
    } catch {
      toast.error('Failed to save materials')
    } finally {
      setSavingMaterials(false)
    }
  }

  const handleCreateBatch = async () => {
    if (!newBatchName.trim()) return
    setCreatingBatch(true)
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ name: newBatchName.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        const newBatch: BatchItem = { 
          ...data.batch, 
          difficulty: 'beginner', 
          schedule: [], 
          enrollmentCount: 0,
          assignedCourses: [],
          courseCount: 0,
          isLive: false
        }
        setBatches((prev) => [...prev, newBatch])
        setNewBatchName('')
        setActiveTab(newBatch.id)
        
        // Also save to localStorage for My Groups page
        const storedGroups = localStorage.getItem('tutor_groups')
        const existingGroups: BatchItem[] = storedGroups ? JSON.parse(storedGroups) : []
        localStorage.setItem('tutor_groups', JSON.stringify([newBatch, ...existingGroups]))
        
        toast.success(data.message ?? 'Group created')
      } else toast.error(data.error ?? 'Failed to create group')
    } catch {
      toast.error('Failed to create group')
    } finally {
      setCreatingBatch(false)
    }
  }

  const handleUpdateBatchDifficulty = async (batchId: string, difficulty: string) => {
    setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, difficulty } : b)))
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches/${batchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ difficulty }),
      })
      if (res.ok) toast.success('Difficulty updated')
      else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update')
      }
    } catch {
      toast.error('Failed to update difficulty')
    }
  }

  const handleUpdateBatchLanguage = async (batchId: string, languageOfInstruction: string) => {
    setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, languageOfInstruction } : b)))
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches/${batchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ languageOfInstruction }),
      })
      if (res.ok) toast.success('Language updated')
      else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update language')
      }
    } catch {
      toast.error('Failed to update language')
    }
  }

  const handleUpdateBatchPrice = async (batchId: string, price: number | null, currency: string) => {
    setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, price, currency } : b)))
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches/${batchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ price, currency }),
      })
      if (res.ok) toast.success('Price updated')
      else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update price')
      }
    } catch {
      toast.error('Failed to update price')
    }
  }

  const handleUpdateBatchSchedule = async (batchId: string, schedule: ScheduleItem[]) => {
    setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, schedule } : b)))
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches/${batchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ schedule }),
      })
      if (res.ok) toast.success('Schedule saved')
      else toast.error('Failed to save schedule')
    } catch {
      toast.error('Failed to save schedule')
    }
  }

  const handleToggleGroupLive = async (batchId: string, isLive: boolean) => {
    setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, isLive } : b)))
    try {
      const csrf = await getCsrf()
      const res = await fetch(`/api/tutor/courses/${courseId}/batches/${batchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(csrf && { 'X-CSRF-Token': csrf }) },
        credentials: 'include',
        body: JSON.stringify({ isLive }),
      })
      if (res.ok) {
        toast.success(isLive ? 'Group is now online' : 'Group is now offline')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Failed to update status')
      }
    } catch {
      toast.error('Failed to update live status')
    }
  }

  const handleEnterClassroom = (batchId: string) => {
    // TODO: Navigate to classroom page
    toast.info('Classroom feature coming soon')
    console.log('Enter classroom for batch:', batchId)
  }

  const addScheduleSlot = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? { ...b, schedule: [...b.schedule, { dayOfWeek: DAYS[0], startTime: '09:00', durationMinutes: 60 }] }
          : b
      )
    )
  }

  const updateScheduleSlot = (batchId: string, index: number, field: keyof ScheduleItem, value: string | number) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id !== batchId) return b
        const next = [...b.schedule]
        next[index] = { ...next[index], [field]: value }
        return { ...b, schedule: next }
      })
    )
  }

  const removeScheduleSlot = (batchId: string, index: number) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId ? { ...b, schedule: b.schedule.filter((_, i) => i !== index) } : b
      )
    )
  }

  const copyGroupLink = (batchId: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/curriculum/${courseId}?batch=${batchId}` : ''
    if (url) {
      navigator.clipboard.writeText(url).then(() => toast.success('Group link copied'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Builder Left Navigation - Desktop */}
      <aside className="w-64 bg-white border-r sticky top-0 h-screen hidden lg:flex flex-col z-40">
        {/* Back to Dashboard Button */}
        <div className="p-4 border-b">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
            asChild
          >
            <Link href="/tutor/dashboard">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Course Info */}
        <div className="p-4 border-b bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Editing Course
          </p>
          <h2 className="font-medium text-gray-900 truncate" title={`Course ${courseId.slice(0, 8)}`}>
            Course {courseId.slice(0, 8)}...
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Course Builder 2.0
          </p>
        </div>
        
        {/* Builder Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {builderNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            const handleClick = () => {
              if (item.id === 'curriculum') {
                setCurriculumModalOpen(true)
              } else {
                setActiveSection(item.id)
              }
            }
            return (
              <button
                key={item.id}
                onClick={handleClick}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-medium" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}
        </nav>
        
        {/* Quick Actions Section */}
        <div className="px-4 py-3 border-t bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            Quick Actions
          </p>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-sm"
              asChild
            >
              <Link href={`/tutor/courses/${courseId}`}>
                <Eye className="h-4 w-4" />
                Preview Course
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-sm"
              asChild
            >
              <Link href="/tutor/group-builder">
                <Users className="h-4 w-4" />
                Group Builder
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-sm"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/tutor/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 text-gray-500" />
              <span className="font-semibold text-gray-900">Builder</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/tutor/group-builder">
                <Users className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Save className="h-5 w-5" />
            </Button>
            <UserNav />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4 overflow-y-auto">
          {/* Back to Dashboard - Mobile */}
          <div className="mb-4 pb-4 border-b">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/tutor/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Builder Sections
          </p>
          <nav className="space-y-1">
            {builderNavItems.map((item) => {
              const Icon = item.icon
              const isActive = currentSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left",
                    isActive 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Quick Actions - Mobile */}
          <div className="mt-6 pt-6 border-t space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Quick Actions
            </p>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={`/tutor/courses/${courseId}`} onClick={() => setMobileMenuOpen(false)}>
                <Eye className="h-4 w-4" />
                Preview Course
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/tutor/group-builder" onClick={() => setMobileMenuOpen(false)}>
                <Users className="h-4 w-4" />
                Group Builder
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>

      {/* Groups & Schedules Modal - 90% width/height */}
      <Dialog open={groupsModalOpen} onOpenChange={setGroupsModalOpen}>
        <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] max-h-[90vh] p-0 flex flex-col overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Builder
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            {loadingBatches ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : batches.length === 0 ? (
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground">No groups created yet.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Group name (e.g. Batch 1, Jan 2025)"
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    className="max-w-[300px]"
                  />
                  <Button onClick={handleCreateBatch} disabled={creatingBatch || !newBatchName.trim()}>
                    {creatingBatch ? 'Creating…' : <><Plus className="h-4 w-4 mr-1" /> Create Group</>}
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="border-b px-6 pt-2 bg-gray-50/50 shrink-0">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <TabsList className="bg-transparent h-10">
                      {batches.map((batch) => (
                        <TabsTrigger 
                          key={batch.id} 
                          value={batch.id}
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          {batch.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({batch.enrollmentCount})
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <div className="flex items-center gap-2 pl-2 border-l ml-2">
                      <Input
                        placeholder="New group name"
                        value={newBatchName}
                        onChange={(e) => setNewBatchName(e.target.value)}
                        className="w-[150px] h-8 text-sm"
                      />
                      <Button 
                        size="sm" 
                        onClick={handleCreateBatch} 
                        disabled={creatingBatch || !newBatchName.trim()}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {batches.map((batch) => (
                  <TabsContent 
                    key={batch.id} 
                    value={batch.id} 
                    className="flex-1 overflow-auto m-0 p-6"
                  >
                    <div className="max-w-4xl mx-auto space-y-6">
                      {/* Group Header */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{batch.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {batch.enrollmentCount} student{batch.enrollmentCount !== 1 ? 's' : ''} enrolled
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Online/Offline Toggle */}
                          <Button
                            variant={batch.isLive ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleGroupLive(batch.id, !batch.isLive)}
                            className={cn(
                              "gap-2",
                              batch.isLive && "bg-green-600 hover:bg-green-700"
                            )}
                          >
                            <Radio className={cn("h-4 w-4", batch.isLive && "animate-pulse")} />
                            {batch.isLive ? 'Online' : 'Offline'}
                          </Button>
                          {/* Enter Classroom Button */}
                          <Button
                            variant="default"
                            size="sm"
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleEnterClassroom(batch.id)}
                          >
                            <Video className="h-4 w-4" />
                            Enter Classroom
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => copyGroupLink(batch.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Group Link
                          </Button>
                        </div>
                      </div>

                      {/* Difficulty & Language Settings */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <Label className="text-sm font-medium">Difficulty Level</Label>
                          <Select
                            value={batch.difficulty ?? 'intermediate'}
                            onValueChange={(v) => handleUpdateBatchDifficulty(batch.id, v)}
                          >
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DIFFICULTY_LEVELS.map((d) => (
                                <SelectItem key={d.value} value={d.value}>
                                  {d.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <Label className="text-sm font-medium">Language of Instruction</Label>
                          <Select
                            value={batch.languageOfInstruction ?? 'en'}
                            onValueChange={(v) => handleUpdateBatchLanguage(batch.id, v)}
                          >
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {LANGUAGES.map((l) => (
                                <SelectItem key={l.value} value={l.value}>
                                  {l.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Price Setting */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <Label className="text-sm font-medium">Group Price</Label>
                        <div className="flex gap-3 flex-wrap">
                          <div className="flex-1 min-w-[150px]">
                            <Input
                              type="number"
                              min={0}
                              step={0.01}
                              placeholder="0.00"
                              value={batch.price ?? ''}
                              onChange={(e) => {
                                const price = e.target.value === '' ? null : Number(e.target.value)
                                handleUpdateBatchPrice(batch.id, price, batch.currency ?? 'SGD')
                              }}
                              className="bg-white"
                            />
                          </div>
                          <Select
                            value={batch.currency ?? 'SGD'}
                            onValueChange={(v) => handleUpdateBatchPrice(batch.id, batch.price ?? null, v)}
                          >
                            <SelectTrigger className="w-[100px] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CURRENCIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Set a custom price for this group. Leave empty to use the default course price.
                        </p>
                      </div>

                      {/* Share & Enrollment - Per Group */}
                      <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-blue-500" />
                          Share & Enrollment
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Share this group link for students to join this specific group.
                        </p>
                        <div className="flex gap-2">
                          <Input 
                            readOnly 
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/curriculum/${courseId}?batch=${batch.id}`} 
                            className="font-mono text-sm bg-white flex-1"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/curriculum/${courseId}?batch=${batch.id}`
                              if (url) navigator.clipboard.writeText(url).then(() => toast.success('Group link copied'))
                            }} 
                            title="Copy link"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>
                            <strong>{batch.enrollmentCount}</strong> students enrolled in this group
                          </span>
                        </div>
                      </div>

                      {/* Course Assignment Section */}
                      <CourseAssignmentSection 
                        batch={batch} 
                        courseId={courseId}
                      />

                      {/* Schedule Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2">
                            Class Schedule
                          </h4>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addScheduleSlot(batch.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Class Slot
                          </Button>
                        </div>

                        {batch.schedule.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No schedule set. Add class slots for this group.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {batch.schedule.map((slot, index) => (
                              <div
                                key={index}
                                className="flex flex-wrap items-end gap-2 p-3 rounded-lg border bg-gray-50"
                              >
                                <div className="space-y-1 min-w-[140px]">
                                  <Label className="text-xs">Day</Label>
                                  <Select
                                    value={slot.dayOfWeek}
                                    onValueChange={(v) => updateScheduleSlot(batch.id, index, 'dayOfWeek', v)}
                                  >
                                    <SelectTrigger className="bg-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {DAYS.map((d) => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1 w-[100px]">
                                  <Label className="text-xs">Start</Label>
                                  <Input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) => updateScheduleSlot(batch.id, index, 'startTime', e.target.value)}
                                    className="bg-white"
                                  />
                                </div>
                                <div className="space-y-1 w-[120px]">
                                  <Label className="text-xs">Duration (min)</Label>
                                  <Input
                                    type="number"
                                    min={5}
                                    max={480}
                                    value={slot.durationMinutes}
                                    onChange={(e) =>
                                      updateScheduleSlot(batch.id, index, 'durationMinutes', parseInt(e.target.value, 10) || 60)
                                    }
                                    className="bg-white"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeScheduleSlot(batch.id, index)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {batch.schedule.length > 0 && (
                          <Button 
                            onClick={() => handleUpdateBatchSchedule(batch.id, batch.schedule)}
                          >
                            Save Schedule
                          </Button>
                        )}
                      </div>

                      {/* Students in Group */}
                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                          Students in this Group
                        </h4>
                        {(() => {
                          const studentsInBatch = enrollments.filter((e) => e.batchId === batch.id)
                          return studentsInBatch.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No students assigned to this group yet.
                            </p>
                          ) : (
                            <div className="rounded-lg border divide-y">
                              {studentsInBatch.map((e) => (
                                <div key={e.id} className="p-3 flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-sm">{e.studentName}</p>
                                    <p className="text-xs text-muted-foreground">{e.studentEmail}</p>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {e.lessonsCompleted} lessons completed
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Curriculum & Materials Modal - 90% width/height */}
      <Dialog open={curriculumModalOpen} onOpenChange={setCurriculumModalOpen}>
        <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] max-h-[90vh] p-0 flex flex-col overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Curriculum & Materials
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-6">
            {loadingCourse ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : !course ? (
              <p className="text-muted-foreground">Failed to load course data.</p>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Course Name */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <Label className="text-sm font-medium">Course Name</Label>
                  <Input
                    value={course.name}
                    readOnly
                    className="bg-white"
                  />
                  <p className="text-xs text-muted-foreground">
                    Course name is set based on the selected subject curriculum.
                  </p>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    value={course.description ?? ''}
                    readOnly
                    rows={3}
                    className="bg-white resize-none"
                  />
                </div>

                {/* Content Source */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <Label className="text-sm font-medium">Content Source</Label>
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
                      Below is the platform curriculum. Each topic is sized for a typical lesson. You can edit modules and lessons in the course content page.
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
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/curriculum/${courseId}`}>Edit course content</Link>
                    </Button>
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
                          <span>I create the outline myself</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="outlineSource"
                            checked={outlineSource === 'AI'}
                            onChange={() => setOutlineSource('AI')}
                            className="rounded-full"
                          />
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          <span>AI generates outline from my materials</span>
                        </label>
                      </div>
                    </div>

                    {outlineSource === 'SELF' && (
                      <div className="space-y-6">
                        <p className="text-sm text-muted-foreground">
                          <strong>When to upload what:</strong> First upload your curriculum (syllabus or outline). Then optionally upload notes. If you upload a list of topics, AI will put it in the "Edit Topics" area.
                        </p>

                        {/* Step 1: Upload curriculum */}
                        <div className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">1</span>
                            <Label className="text-base">Upload curriculum</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">Paste or upload your curriculum/syllabus. Supports .txt, .md, .pdf, .doc/.docx, and images.</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Input
                              type="file"
                              accept=".txt,.md,.pdf,.doc,.docx,image/*"
                              className="max-w-[200px]"
                              onChange={(e) => handleFileRead('curriculum', e)}
                              disabled={fileExtracting}
                            />
                            {fileExtracting && <span className="text-sm text-muted-foreground">Sending to AI…</span>}
                            {uploadText.curriculum && !fileExtracting && <span className="text-sm text-green-600">Curriculum loaded</span>}
                          </div>
                        </div>

                        {/* Step 2: Upload notes */}
                        <div className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">2</span>
                            <Label className="text-base">Upload notes (optional)</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">Paste or upload teaching notes. Supports .txt, .md, .pdf, .doc/.docx, and images.</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Input
                              type="file"
                              accept=".txt,.md,.pdf,.doc,.docx,image/*"
                              className="max-w-[200px]"
                              onChange={(e) => handleFileRead('notes', e)}
                              disabled={fileExtracting}
                            />
                            {fileExtracting && <span className="text-sm text-muted-foreground">Sending…</span>}
                            {uploadText.notes && !fileExtracting && <span className="text-sm text-green-600">Notes loaded</span>}
                          </div>
                        </div>

                        {/* Step 3: List of topics */}
                        <div className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">3</span>
                            <ListOrdered className="h-5 w-5" />
                            <Label className="text-base">List of topics (optional)</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">If you have a list of topics (bullets or short lines), paste or upload it.</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Input
                              type="file"
                              accept=".txt,.md,.pdf,.doc,.docx,image/*"
                              className="max-w-[200px]"
                              onChange={(e) => handleFileRead('topics', e)}
                              disabled={fileExtracting}
                            />
                            {fileExtracting && <span className="text-sm text-muted-foreground">Sending…</span>}
                            {uploadText.topics && !fileExtracting && <span className="text-sm text-green-600">Topics loaded</span>}
                          </div>
                        </div>

                        {/* Step 4: Generate outline */}
                        <div className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">4</span>
                            <FileTextIcon className="h-5 w-5" />
                            <Label className="text-base">Course outline</Label>
                          </div>
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
                          <Button
                            onClick={handleGenerateOutline}
                            disabled={generatingOutline}
                          >
                            {generatingOutline ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                            {generatingOutline ? 'Generating…' : 'Generate course outline'}
                          </Button>
                          {outline.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <Label className="text-xs">Generated outline</Label>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {outline.map((item, i) => (
                                  <li key={i}>{item.title} — {item.durationMinutes} min</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="secondary"
                          onClick={handleSaveMaterials}
                          disabled={savingMaterials}
                        >
                          {savingMaterials ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                          Save materials & outline
                        </Button>
                      </div>
                    )}

                    {outlineSource === 'AI' && (
                      <p className="text-sm text-muted-foreground">
                        Upload your materials above (curriculum and optionally notes). Then use "Generate course outline" to let AI create the outline from your content.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Course Assignment Section Component
interface CourseAssignmentSectionProps {
  batch: BatchItem
  courseId: string
}

function CourseAssignmentSection({ batch, courseId }: CourseAssignmentSectionProps) {
  const { courses } = useTutorCourses()
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [assignedCourses, setAssignedCourses] = useState<CourseGroupAssignment[]>(
    batch.assignedCourses || []
  )

  const handleAssign = async (courseId: string, batchId: string) => {
    // In real implementation, call API
    const newAssignment: CourseGroupAssignment = {
      id: `assignment-${Date.now()}`,
      courseId,
      batchId,
      assignedAt: new Date().toISOString(),
      assignedBy: 'current-user',
      groupDifficulty: batch.difficulty || 'beginner',
      resolutionStrategy: 'adaptive',
      status: 'active',
      enrollmentCount: 0,
      completionCount: 0,
      courseSnapshot: {
        title: courses.find(c => c.id === courseId)?.name || 'Course',
        description: courses.find(c => c.id === courseId)?.description || '',
        moduleCount: courses.find(c => c.id === courseId)?.stats.moduleCount || 0,
        lessonCount: courses.find(c => c.id === courseId)?.stats.lessonCount || 0
      }
    }
    
    setAssignedCourses(prev => [...prev, newAssignment])
    toast.success('Course assigned successfully!')
  }

  const handleUnassign = (assignmentId: string) => {
    setAssignedCourses(prev => prev.filter(a => a.id !== assignmentId))
    toast.success('Course unassigned')
  }

  const availableCourses = courses.filter(c => 
    !assignedCourses.some(a => a.courseId === c.id)
  )

  const DIFFICULTY_COLORS = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
    advanced: 'bg-purple-100 text-purple-700 border-purple-200'
  }

  return (
    <div className="space-y-4">
      {/* Assigned Courses */}
      <div className="bg-purple-50 rounded-lg p-4 space-y-3 border border-purple-200">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-500" />
            Assigned Courses
          </Label>
          <Button size="sm" onClick={() => setAssignModalOpen(true)} className="gap-1">
            <Plus className="h-3 w-3" />
            Assign Course
          </Button>
        </div>

        {assignedCourses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No courses assigned to this group yet. Assign a course to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {assignedCourses.map(assignment => (
              <div 
                key={assignment.id} 
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{assignment.courseSnapshot.title}</p>
                    <Badge className={cn(
                      'text-[10px]',
                      DIFFICULTY_COLORS[assignment.groupDifficulty]
                    )}>
                      {assignment.resolutionStrategy === 'adaptive' ? '🔄 Adaptive' : '🎯 Fixed'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Assigned {new Date(assignment.assignedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {assignment.status}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleUnassign(assignment.id)}
                  >
                    Unassign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
          <Label className="text-sm font-medium">Available Courses</Label>
          <div className="space-y-2">
            {availableCourses.slice(0, 3).map(course => (
              <div 
                key={course.id} 
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{course.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Will adapt to {batch.difficulty} level
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAssign(course.id, batch.id)}
                >
                  Assign
                </Button>
              </div>
            ))}
            {availableCourses.length > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => setAssignModalOpen(true)}
              >
                View {availableCourses.length - 3} more courses
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Difficulty Note */}
      <Alert className="bg-blue-50 border-blue-200">
        <BarChart3 className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700 text-sm">
          This group is set to <strong>{DIFFICULTY_LABELS[batch.difficulty]}</strong> level. 
          Assigned courses will automatically adapt their content to match this difficulty level.
        </AlertDescription>
      </Alert>

      {/* Assign Course Modal */}
      <AssignCourseModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        onAssign={handleAssign}
        courses={availableCourses}
        batches={[batch]}
        preselectedBatchId={batch.id}
      />
    </div>
  )
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
}
