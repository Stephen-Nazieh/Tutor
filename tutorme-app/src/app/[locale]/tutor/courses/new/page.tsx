'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { ArrowLeft, BookOpen, CalendarDays, Loader2, Plus, X } from 'lucide-react'
import { AGGREGATED_CATEGORIES } from '@/lib/tutoring/categories'
import type { ScheduleItem } from '../[id]/constants'
import { DAYS } from '../[id]/constants'

const SUBJECTS = [
  { value: 'math', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'cs', label: 'Computer Science' },
]

const DESCRIPTION_LIMIT = 500

export default function CreateCoursePage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [creating, setCreating] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [subject, setSubject] = useState('')
  const [courseName, setCourseName] = useState('')
  // Grade level removed as per requirements
  const [description, setDescription] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [categoryDraft, setCategoryDraft] = useState<string[]>([])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState('09:00')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])

  useEffect(() => {
    let mounted = true
    const loadProfile = async () => {
      try {
        const res = await fetch('/api/user/profile', { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        if (!mounted) return
        const specialties = Array.isArray(data?.profile?.specialties)
          ? data.profile.specialties
          : []
        setSelectedCategories(specialties)
      } catch {
        // ignore profile fetch errors; still allow manual category selection
      } finally {
        if (mounted) setLoadingProfile(false)
      }
    }
    loadProfile()
    return () => {
      mounted = false
    }
  }, [])

  const descriptionCount = useMemo(() => description.length, [description])

  const openCategoryDialog = () => {
    setCategoryDraft(selectedCategories)
    setCategoryDialogOpen(true)
  }

  const toggleDraftCategory = (category: string) => {
    setCategoryDraft(prev =>
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    )
  }

  const applyCategories = () => {
    setSelectedCategories(Array.from(new Set(categoryDraft)))
    setCategoryDialogOpen(false)
  }

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(item => item !== category))
  }

  const validateDetailsStep = () => {
    if (!courseName.trim()) {
      toast.error('Course name is required')
      return false
    }
    if (!subject) {
      toast.error('Please select a subject')
      return false
    }
    if (selectedCategories.length === 0) {
      toast.error('Select at least one category')
      return false
    }
    if (descriptionCount > DESCRIPTION_LIMIT) {
      toast.error('Description exceeds 500 characters')
      return false
    }
    return true
  }

  const getDayOfWeek = (date: Date) => {
    const dayIndex = (date.getDay() + 6) % 7 // shift so Monday=0
    return DAYS[dayIndex] ?? 'Monday'
  }

  const addScheduleSlot = () => {
    if (!selectedDate) {
      toast.error('Select a date on the calendar')
      return
    }
    if (!startTime) {
      toast.error('Start time is required')
      return
    }
    const dayOfWeek = getDayOfWeek(selectedDate)
    const next: ScheduleItem = {
      dayOfWeek,
      startTime,
      durationMinutes: Math.max(15, Math.min(480, durationMinutes || 60)),
    }
    setSchedule(prev => [...prev, next])
  }

  const removeScheduleSlot = (index: number) => {
    setSchedule(prev => prev.filter((_, i) => i !== index))
  }

  const handleConfirm = async () => {
    setCreating(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/tutor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: courseName.trim(),
          description: description.trim() || undefined,
          subject,
          // gradeLevel removed as per requirements
          categories: selectedCategories,
          schedule,
          isLiveOnline: false,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.course?.id) {
        toast.success('Course created! Opening builder...')
        router.push(`/tutor/courses/${data.course.id}/builder`)
      } else {
        const message = data.error || 'Failed to create course. Please try again.'
        toast.error(message)
      }
    } catch {
      toast.error('An error occurred. Please check your connection and try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/tutor/my-page">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Page
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Create New Course
            </CardTitle>
            <CardDescription>
              Set your course details and continue to the Course Builder to design your curriculum.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    value={courseName}
                    onChange={e => setCourseName(e.target.value)}
                    placeholder="e.g. AP Calculus Mastery"
                    disabled={creating}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Subject Categories *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={openCategoryDialog}
                      disabled={creating || loadingProfile}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      New
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.length === 0 && (
                      <p className="text-sm text-gray-500">No categories selected yet.</p>
                    )}
                    {selectedCategories.map(category => (
                      <span
                        key={category}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="text-blue-400 hover:text-blue-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Select Subject *</Label>
                  <Select value={subject} onValueChange={setSubject} disabled={creating}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(s => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description (no AI generation)</Label>
                    <span
                      className={`text-xs ${descriptionCount > DESCRIPTION_LIMIT ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      {descriptionCount}/{DESCRIPTION_LIMIT}
                    </span>
                  </div>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))}
                    placeholder="Describe the course focus, expected outcomes, and who it is for."
                    rows={5}
                    disabled={creating}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" asChild disabled={creating}>
                    <Link href="/tutor/my-page">Cancel</Link>
                  </Button>
                  <Button
                className="flex-1"
                onClick={() => validateDetailsStep() && setStep(2)}
                disabled={creating}
              >
                Next
              </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-lg border border-dashed border-gray-200 bg-white p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CalendarDays className="h-4 w-4" />
                    Schedule lessons
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="space-y-1">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            disabled={creating}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input
                            id="duration"
                            type="number"
                            min={15}
                            max={480}
                            value={durationMinutes}
                            onChange={e => setDurationMinutes(Number(e.target.value))}
                            disabled={creating}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addScheduleSlot}
                            disabled={creating}
                          >
                            Add Slot
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Schedule</Label>
                        {schedule.length === 0 ? (
                          <p className="text-sm text-gray-500">No lessons scheduled yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {schedule.map((slot, index) => (
                              <div
                                key={`${slot.dayOfWeek}-${slot.startTime}-${index}`}
                                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                              >
                                <div>
                                  <span className="font-medium">{slot.dayOfWeek}</span>
                                  <span className="text-gray-500">
                                    {' '}
                                    · {slot.startTime} · {slot.durationMinutes} mins
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeScheduleSlot(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                    disabled={creating}
                  >
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleConfirm} disabled={creating}>
                    {creating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Categories</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-3 overflow-y-auto">
            {AGGREGATED_CATEGORIES.map(category => (
              <label key={category} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={categoryDraft.includes(category)}
                  onCheckedChange={() => toggleDraftCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={applyCategories}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
