'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, BookOpen } from 'lucide-react'

const SUBJECTS = [
  { value: 'math', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'cs', label: 'Computer Science' },
]

const GRADE_LEVELS = [
  { value: 'Grade 1', label: 'Grade 1' },
  { value: 'Grade 2', label: 'Grade 2' },
  { value: 'Grade 3', label: 'Grade 3' },
  { value: 'Grade 4', label: 'Grade 4' },
  { value: 'Grade 5', label: 'Grade 5' },
  { value: 'Grade 6', label: 'Grade 6' },
  { value: 'Grade 7', label: 'Grade 7' },
  { value: 'Grade 8', label: 'Grade 8' },
  { value: 'Grade 9', label: 'Grade 9' },
  { value: 'Grade 10', label: 'Grade 10' },
  { value: 'Grade 11', label: 'Grade 11' },
  { value: 'Grade 12', label: 'Grade 12' },
  { value: 'College', label: 'College' },
  { value: 'Adult Education', label: 'Adult Education' },
]

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

interface CreateCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCourseCreated?: () => void
}

export function CreateCourseDialog({ open, onOpenChange, onCourseCreated }: CreateCourseDialogProps) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [form, setForm] = useState({
    subject: '',
    description: '',
    gradeLevel: '',
    difficulty: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    isLiveOnline: false,
  })
  const [generatingDescription, setGeneratingDescription] = useState(false)

  const subjectLabel = SUBJECTS.find((s) => s.value === form.subject)?.label ?? (form.subject || 'Course')

  const handleSubmit = async () => {
    if (!form.subject) {
      toast.error('Please select a subject')
      return
    }

    const title = subjectLabel
    setCreating(true)
    setApiError(null)
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
          title,
          description: form.description.trim() || undefined,
          subject: form.subject,
          gradeLevel: form.gradeLevel || undefined,
          difficulty: form.difficulty,
          isLiveOnline: form.isLiveOnline,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(data.message ?? 'Course created successfully')
        onOpenChange(false)
        onCourseCreated?.()
        setForm({
          subject: '',
          description: '',
          gradeLevel: '',
          difficulty: 'intermediate',
          isLiveOnline: false,
        })
        if (data.course?.id) {
          router.push(`/tutor/courses/${data.course.id}/builder`)
        }
      } else {
        const message = data.error || 'Failed to create course. Please try again.'
        setApiError(message)
        toast.error(message)
      }
    } catch {
      const message = 'An error occurred. Please check your connection and try again.'
      setApiError(message)
      toast.error(message)
    } finally {
      setCreating(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (creating) return
    if (!next) setApiError(null)
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-busy={creating} aria-describedby={apiError ? 'create-course-api-error' : undefined}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Create New Course
          </DialogTitle>
          <DialogDescription>
            Create a whole course (curriculum) with modules and lessons. You can add more modules and lessons after creation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {apiError && (
            <p id="create-course-api-error" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">
              {apiError}
            </p>
          )}

          <div>
            <Label>Subject *</Label>
            <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
              <SelectTrigger disabled={creating}>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Choose Mathematics or English to pick a specific curriculum (e.g. AP Calculus, IELTS) on the course configuration page after creation.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Grade</Label>
              <Select value={form.gradeLevel} onValueChange={(v) => setForm({ ...form, gradeLevel: v })}>
                <SelectTrigger disabled={creating}>
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
            <div>
              <Label>Difficulty</Label>
              <Select
                value={form.difficulty}
                onValueChange={(v) => setForm({ ...form, difficulty: v as 'beginner' | 'intermediate' | 'advanced' })}
              >
                <SelectTrigger disabled={creating}>
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
          </div>

          <div>
            <Label>Description</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={creating || generatingDescription || !form.subject}
                onClick={async () => {
                  setGeneratingDescription(true)
                  try {
                    const res = await fetch('/api/curriculums/generate-description', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify({
                        subject: form.subject,
                        gradeLevel: form.gradeLevel || undefined,
                        difficulty: form.difficulty,
                      }),
                    })
                    const data = await res.json()
                    if (res.ok && data.description) {
                      setForm((f) => ({ ...f, description: data.description }))
                      toast.success('Description generated')
                    } else {
                      toast.error(data.error ?? 'Failed to generate description')
                    }
                  } catch {
                    toast.error('Failed to generate description')
                  } finally {
                    setGeneratingDescription(false)
                  }
                }}
              >
                {generatingDescription && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                Generate description
              </Button>
            </div>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="AI-generated or write your own. What will students learn?"
              disabled={creating}
              rows={3}
              className="mt-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isLiveOnline"
              checked={form.isLiveOnline}
              onChange={(e) => setForm({ ...form, isLiveOnline: e.target.checked })}
              disabled={creating}
              className="rounded"
            />
            <Label htmlFor="isLiveOnline">Make course live/online so students can join now (uncheck to keep offline for later)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={creating}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={creating} aria-busy={creating}>
            {creating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
