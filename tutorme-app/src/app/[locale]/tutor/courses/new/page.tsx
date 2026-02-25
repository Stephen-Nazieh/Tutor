'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, BookOpen } from 'lucide-react'

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

export default function CreateCoursePage() {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [subject, setSubject] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')

  const subjectLabel = SUBJECTS.find((s) => s.value === subject)?.label ?? subject

  const handleSubmit = async () => {
    if (!subject) {
      toast.error('Please select a subject')
      return
    }

    const title = subjectLabel
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
          title,
          subject,
          gradeLevel: gradeLevel || undefined,
          isLiveOnline: false,
        }),
      })

      const data = await res.json()
      if (res.ok && data.course?.id) {
        toast.success('Course created! Opening builder...')
        router.push(`/tutor/courses/${data.course.id}/builder`)
      } else {
        const message = data.error || 'Failed to create course. Please try again.'
        toast.error(message)
        setCreating(false)
      }
    } catch {
      toast.error('An error occurred. Please check your connection and try again.')
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/tutor/my-page">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Page
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Create New Course
            </CardTitle>
            <CardDescription>
              Select a subject to create your course. You&apos;ll be taken to the Course Builder to add modules and lessons.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Selection */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={subject} onValueChange={setSubject} disabled={creating}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grade Level Selection */}
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level (Optional)</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel} disabled={creating}>
                <SelectTrigger id="gradeLevel">
                  <SelectValue placeholder="Select a grade level" />
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

            {/* Preview */}
            {subject && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 font-medium">Course will be created as:</p>
                <p className="text-lg font-semibold text-blue-900 mt-1">{subjectLabel}</p>
                {gradeLevel && (
                  <p className="text-sm text-blue-700 mt-1">Grade: {gradeLevel}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" asChild disabled={creating}>
                <Link href="/tutor/my-page">Cancel</Link>
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={creating || !subject}
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create & Open Builder'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
