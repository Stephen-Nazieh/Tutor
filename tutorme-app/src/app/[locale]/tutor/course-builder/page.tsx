'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react'

const DESCRIPTION_LIMIT = 500

export default function CourseBuilderPage() {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [subject, setSubject] = useState('general')
  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    // Component is mounted
  }, [])

  const descriptionCount = useMemo(() => description.length, [description])

  const validateDetailsStep = () => {
    if (!courseName.trim()) {
      toast.error('Course name is required')
      return false
    }
    if (descriptionCount > DESCRIPTION_LIMIT) {
      toast.error('Description exceeds 500 characters')
      return false
    }
    return true
  }

  const handleConfirm = async () => {
    if (!validateDetailsStep()) return
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
          categories: [],
          schedule: [],
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
          <Link href="/tutor/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
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
            <>
              <div className="space-y-2">
                <Label htmlFor="course-name">Course Name *</Label>
                <Input
                  id="course-name"
                  placeholder="e.g., Algebra 101, Introduction to Python"
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  className="mt-1 shadow-sm focus-visible:ring-blue-600"
                  disabled={creating}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description (Max {DESCRIPTION_LIMIT} chars)</Label>
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
                  className="mt-1 shadow-sm focus-visible:ring-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" asChild disabled={creating}>
                  <Link href="/tutor/dashboard">Cancel</Link>
                </Button>
                <Button className="flex-1" onClick={handleConfirm} disabled={creating}>
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Course'
                  )}
                </Button>
              </div>
            </>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
