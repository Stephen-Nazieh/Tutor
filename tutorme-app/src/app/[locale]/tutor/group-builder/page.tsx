'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Users,
  Plus,
  Copy,
  Loader2,
  ArrowLeft,
  Radio,
  Video,
  BarChart3,
  Link as LinkIcon,
  Calendar,
  Trash2,
  Signal,
  SignalHigh,
  SignalLow,
  CheckCircle2,
  Clock,
  Globe,
  DollarSign,
  Save,
  BookOpen,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { AssignCourseModal } from '../courses/components/AssignCourseModal'
import type { CourseWithAssignments } from '@/types/course-assignment'

// Types
interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

interface AssignedCourse {
  courseId: string
  name: string
  description: string | null
  subject: string
  difficulty: string
  assignedAt: string
}

interface BatchItem {
  id: string
  name: string
  startDate: string | null
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  languageOfInstruction: string
  price?: number | null
  currency?: string | null
  schedule: ScheduleItem[]
  enrollmentCount: number
  isLive: boolean
  assignedCourses?: AssignedCourse[]
}

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const CURRENCIES = [
  'SGD',
  'USD',
  'CNY',
  'MYR',
  'EUR',
  'GBP',
  'AUD',
  'CAD',
  'JPY',
  'INR',
  'KRW',
  'HKD',
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Traditional)' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ms', label: 'Malay' },
  { value: 'ta', label: 'Tamil' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Mock data - in real app, fetch from API
const MOCK_BATCHES: BatchItem[] = [
  {
    id: 'batch-1',
    name: 'January 2025 - Beginner',
    startDate: '2025-01-15',
    order: 1,
    difficulty: 'beginner',
    languageOfInstruction: 'en',
    price: 99,
    currency: 'USD',
    schedule: [
      { dayOfWeek: 'Monday', startTime: '10:00', durationMinutes: 60 },
      { dayOfWeek: 'Wednesday', startTime: '10:00', durationMinutes: 60 },
    ],
    enrollmentCount: 15,
    isLive: true,
    assignedCourses: [],
  },
  {
    id: 'batch-2',
    name: 'February 2025 - Intermediate',
    startDate: '2025-02-01',
    order: 2,
    difficulty: 'intermediate',
    languageOfInstruction: 'en',
    price: 149,
    currency: 'USD',
    schedule: [{ dayOfWeek: 'Tuesday', startTime: '14:00', durationMinutes: 90 }],
    enrollmentCount: 12,
    isLive: false,
    assignedCourses: [],
  },
]

export default function GroupBuilderPage() {
  const [batches, setBatches] = useState<BatchItem[]>(MOCK_BATCHES)
  const [activeTab, setActiveTab] = useState<string>(MOCK_BATCHES[0]?.id || '')
  const [newBatchName, setNewBatchName] = useState('')
  const [creatingBatch, setCreatingBatch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Course assignment modal state
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedBatchForAssign, setSelectedBatchForAssign] = useState<string | null>(null)
  const [courses, setCourses] = useState<CourseWithAssignments[]>([])
  const [loadingCourses, setLoadingCourses] = useState(false)

  // Load batches on mount
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const storedGroups = localStorage.getItem('tutor_groups')
      if (storedGroups) {
        try {
          const parsed = JSON.parse(storedGroups)
          setBatches(prev => [
            ...parsed,
            ...prev.filter(b => !parsed.find((pg: BatchItem) => pg.id === b.id)),
          ])
          if (!activeTab && parsed.length > 0) {
            setActiveTab(parsed[0].id)
          }
        } catch {
          setBatches(MOCK_BATCHES)
        }
      } else {
        setBatches(MOCK_BATCHES)
        if (MOCK_BATCHES.length > 0) {
          setActiveTab(MOCK_BATCHES[0].id)
        }
      }
      setLoading(false)
    }, 500)
  }, [])

  // Load courses for assignment
  useEffect(() => {
    if (assignModalOpen) {
      setLoadingCourses(true)
      fetch('/api/tutor/courses', { credentials: 'include' })
        .then(res => (res.ok ? res.json() : { courses: [] }))
        .then(data => {
          const formattedCourses: CourseWithAssignments[] = (data.courses || []).map((c: any) => ({
            id: c.id,
            name: c.name,
            description: c.description,
            subject: c.subject,
            difficulty: c.difficulty,
            stats: {
              moduleCount: c._count?.modules || 0,
              lessonCount: c._count?.lessons || 0,
              quizCount: 0,
              studentCount: c._count?.enrollments || 0,
            },
            assignments: {
              total: 0,
              groups: [],
            },
          }))
          setCourses(formattedCourses)
        })
        .catch(() => setCourses([]))
        .finally(() => setLoadingCourses(false))
    }
  }, [assignModalOpen])

  const handleCreateBatch = async () => {
    if (!newBatchName.trim()) return
    setCreatingBatch(true)

    const newBatch: BatchItem = {
      id: `batch-${Date.now()}`,
      name: newBatchName.trim(),
      startDate: null,
      order: batches.length + 1,
      difficulty: 'beginner',
      languageOfInstruction: 'en',
      price: null,
      currency: 'USD',
      schedule: [],
      enrollmentCount: 0,
      isLive: false,
      assignedCourses: [],
    }

    setBatches(prev => [...prev, newBatch])
    setActiveTab(newBatch.id)
    setNewBatchName('')
    setHasUnsavedChanges(true)

    toast.success('Group created. Click Save to persist changes.')
    setCreatingBatch(false)
  }

  const handleUpdateBatch = (batchId: string, updates: Partial<BatchItem>) => {
    setBatches(prev => prev.map(b => (b.id === batchId ? { ...b, ...updates } : b)))
    setHasUnsavedChanges(true)
  }

  const handleSaveGroup = async (batchId: string) => {
    setSaving(true)

    const batch = batches.find(b => b.id === batchId)
    if (!batch) {
      toast.error('Group not found')
      setSaving(false)
      return
    }

    // Save to localStorage
    const storedGroups = localStorage.getItem('tutor_groups')
    const existingGroups: BatchItem[] = storedGroups ? JSON.parse(storedGroups) : []
    const updatedGroups = [batch, ...existingGroups.filter(g => g.id !== batch.id)]
    localStorage.setItem('tutor_groups', JSON.stringify(updatedGroups))

    setHasUnsavedChanges(false)
    toast.success('Group saved successfully')
    setSaving(false)
  }

  const handleSaveAllGroups = async () => {
    setSaving(true)
    localStorage.setItem('tutor_groups', JSON.stringify(batches))
    setHasUnsavedChanges(false)
    toast.success('All groups saved successfully')
    setSaving(false)
  }

  const handleToggleLive = (batchId: string, isLive: boolean) => {
    setBatches(prev => prev.map(b => (b.id === batchId ? { ...b, isLive } : b)))
    toast.success(isLive ? 'Group is now online' : 'Group is now offline')
  }

  const copyGroupLink = (batchId: string) => {
    const url = `${window.location.origin}/curriculum/enroll?group=${batchId}`
    navigator.clipboard.writeText(url)
    toast.success('Group enrollment link copied')
  }

  const addScheduleSlot = (batchId: string) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b
        return {
          ...b,
          schedule: [
            ...b.schedule,
            { dayOfWeek: 'Monday', startTime: '09:00', durationMinutes: 60 },
          ],
        }
      })
    )
    setHasUnsavedChanges(true)
  }

  const updateScheduleSlot = (batchId: string, index: number, updates: Partial<ScheduleItem>) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b
        const newSchedule = [...b.schedule]
        newSchedule[index] = { ...newSchedule[index], ...updates }
        return { ...b, schedule: newSchedule }
      })
    )
    setHasUnsavedChanges(true)
  }

  const removeScheduleSlot = (batchId: string, index: number) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b
        return { ...b, schedule: b.schedule.filter((_, i) => i !== index) }
      })
    )
    setHasUnsavedChanges(true)
  }

  const openAssignCourse = (batchId: string) => {
    setSelectedBatchForAssign(batchId)
    setAssignModalOpen(true)
  }

  const handleAssignCourse = async (courseId: string, batchId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b
        const existingAssignments = b.assignedCourses || []
        if (existingAssignments.some(ac => ac.courseId === courseId)) {
          return b // Course already assigned
        }
        return {
          ...b,
          assignedCourses: [
            ...existingAssignments,
            {
              courseId: course.id,
              name: course.name,
              description: course.description || null,
              subject: course.subject,
              difficulty: (course as any).difficulty || 'beginner',
              assignedAt: new Date().toISOString(),
            },
          ],
        }
      })
    )

    setHasUnsavedChanges(true)
    toast.success(`Course "${course.name}" assigned to group`)
  }

  const handleRemoveCourse = (batchId: string, courseId: string) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b
        return {
          ...b,
          assignedCourses: (b.assignedCourses || []).filter(c => c.courseId !== courseId),
        }
      })
    )
    setHasUnsavedChanges(true)
    toast.success('Course removed from group')
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const currentBatch = batches.find(b => b.id === activeTab)

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tutor/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Users className="h-6 w-6 text-blue-500" />
              Group Builder
            </h1>
            <p className="text-muted-foreground">
              Create and manage your teaching groups and schedules
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Button
              variant="default"
              onClick={handleSaveAllGroups}
              disabled={saving}
              className="gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save All Changes
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/tutor/groups">View My Groups</Link>
          </Button>
        </div>
      </div>

      {batches.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <p className="mb-4 text-muted-foreground">No groups created yet.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Group name (e.g. Batch 1, Jan 2025)"
                value={newBatchName}
                onChange={e => setNewBatchName(e.target.value)}
                className="max-w-[300px]"
              />
              <Button onClick={handleCreateBatch} disabled={creatingBatch || !newBatchName.trim()}>
                {creatingBatch ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Create Group
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
              {batches.map(batch => (
                <TabsTrigger
                  key={batch.id}
                  value={batch.id}
                  className="rounded-lg border px-4 py-2 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-50"
                >
                  <div className="flex items-center gap-2">
                    <span>{batch.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {String(batch.enrollmentCount)}
                    </Badge>
                    {batch.isLive && <Radio className="h-3 w-3 animate-pulse text-green-500" />}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2 border-l pl-4">
              <Input
                placeholder="New group name"
                value={newBatchName}
                onChange={e => setNewBatchName(e.target.value)}
                className="w-[180px]"
              />
              <Button
                size="sm"
                onClick={handleCreateBatch}
                disabled={creatingBatch || !newBatchName.trim()}
              >
                {creatingBatch ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {batches.map(batch => (
            <TabsContent key={batch.id} value={batch.id} className="space-y-6">
              {/* Group Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{batch.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {String(batch.enrollmentCount)} student{batch.enrollmentCount !== 1 ? 's' : ''}{' '}
                    enrolled
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveGroup(batch.id)}
                    disabled={saving}
                    className="gap-2"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Group
                  </Button>
                  <Button
                    variant={batch.isLive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleLive(batch.id, !batch.isLive)}
                    className={cn('gap-2', batch.isLive && 'bg-green-600 hover:bg-green-700')}
                  >
                    <Radio className={cn('h-4 w-4', batch.isLive && 'animate-pulse')} />
                    {batch.isLive ? 'Online' : 'Offline'}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Video className="h-4 w-4" />
                    Enter Classroom
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyGroupLink(batch.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>

              {/* Settings Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Difficulty & Language */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart3 className="h-4 w-4" />
                      Group Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <div className="flex gap-2">
                        {DIFFICULTY_LEVELS.map(level => (
                          <button
                            key={level.value}
                            onClick={() =>
                              handleUpdateBatch(batch.id, { difficulty: level.value as any })
                            }
                            className={cn(
                              'flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                              batch.difficulty === level.value
                                ? level.value === 'beginner'
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : level.value === 'intermediate'
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : 'border-purple-500 bg-purple-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            )}
                          >
                            {level.value === 'beginner' && <SignalLow className="h-4 w-4" />}
                            {level.value === 'intermediate' && <Signal className="h-4 w-4" />}
                            {level.value === 'advanced' && <SignalHigh className="h-4 w-4" />}
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Language of Instruction
                      </Label>
                      <Select
                        value={batch.languageOfInstruction}
                        onValueChange={v =>
                          handleUpdateBatch(batch.id, { languageOfInstruction: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map(l => (
                            <SelectItem key={l.value} value={l.value}>
                              {l.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <DollarSign className="h-4 w-4" />
                      Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Group Price</Label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          placeholder="0.00"
                          value={batch.price ?? ''}
                          onChange={e => {
                            const price = e.target.value === '' ? null : Number(e.target.value)
                            handleUpdateBatch(batch.id, { price })
                          }}
                        />
                        <Select
                          value={batch.currency || 'USD'}
                          onValueChange={v => handleUpdateBatch(batch.id, { currency: v })}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCIES.map(c => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Set a custom price for this group. Leave empty to use the default course
                        price.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assigned Courses Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BookOpen className="h-4 w-4" />
                    Assigned Courses
                  </CardTitle>
                  <Button size="sm" onClick={() => openAssignCourse(batch.id)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Assign Course
                  </Button>
                </CardHeader>
                <CardContent>
                  {!batch.assignedCourses || batch.assignedCourses.length === 0 ? (
                    <div className="py-8 text-center">
                      <BookOpen className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                      <p className="mb-4 text-muted-foreground">
                        No courses assigned to this group yet.
                      </p>
                      <Button size="sm" onClick={() => openAssignCourse(batch.id)}>
                        <Plus className="mr-1 h-4 w-4" />
                        Assign Your First Course
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {batch.assignedCourses.map(course => (
                        <div
                          key={course.courseId}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="truncate font-medium">{course.name}</h4>
                              <Badge variant="outline" className="text-xs capitalize">
                                {course.difficulty}
                              </Badge>
                            </div>
                            <p className="line-clamp-1 text-sm text-muted-foreground">
                              {course.description || 'No description'}
                            </p>
                            <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Subject: {course.subject}</span>
                              <span>
                                Assigned: {new Date(course.assignedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleRemoveCourse(batch.id, course.courseId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Schedule Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-4 w-4" />
                    Class Schedule
                  </CardTitle>
                  <Button size="sm" onClick={() => addScheduleSlot(batch.id)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Class Slot
                  </Button>
                </CardHeader>
                <CardContent>
                  {batch.schedule.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No schedule set. Add class slots to define when this group meets.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {batch.schedule.map((slot, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                        >
                          <Select
                            value={slot.dayOfWeek}
                            onValueChange={v => updateScheduleSlot(batch.id, idx, { dayOfWeek: v })}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DAYS.map(d => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="time"
                            value={slot.startTime}
                            onChange={e =>
                              updateScheduleSlot(batch.id, idx, { startTime: e.target.value })
                            }
                            className="w-[120px]"
                          />
                          <div className="flex flex-1 items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              min={15}
                              max={240}
                              step={15}
                              value={slot.durationMinutes}
                              onChange={e =>
                                updateScheduleSlot(batch.id, idx, {
                                  durationMinutes: parseInt(e.target.value) || 60,
                                })
                              }
                              className="w-[80px]"
                            />
                            <span className="text-sm text-muted-foreground">minutes</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => removeScheduleSlot(batch.id, idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share & Enrollment */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <LinkIcon className="h-4 w-4 text-blue-500" />
                    Share & Enrollment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Share this group link for students to join this specific group.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/curriculum/enroll?group=${batch.id}`}
                      className="flex-1 bg-white font-mono text-sm"
                    />
                    <Button variant="outline" onClick={() => copyGroupLink(batch.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>
                      <strong>{String(batch.enrollmentCount)}</strong> students enrolled in this
                      group
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Assign Course Modal */}
      <AssignCourseModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        onAssign={handleAssignCourse}
        courses={courses}
        batches={
          currentBatch && selectedBatchForAssign === currentBatch.id ? [currentBatch as any] : []
        }
        preselectedBatchId={selectedBatchForAssign || undefined}
      />
    </div>
  )
}
