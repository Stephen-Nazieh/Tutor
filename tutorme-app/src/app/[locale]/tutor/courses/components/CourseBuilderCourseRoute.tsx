/**
 * Per-course builder UI for `/tutor/courses/[id]/builder` only.
 * Structural changes here do not affect Insights or Lesson Bank routes.
 */

'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Loader2, Save, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { CourseBuilder } from '../../dashboard/components/CourseBuilder'
import { toast } from 'sonner'
import { DASHBOARD_THEMES } from '@/components/dashboard-theme'

interface Course {
  id: string
  name: string
  subject?: string | null
  gradeLevel?: string | null
}

export function CourseBuilderCourseRoute({ courseId }: { courseId: string | null }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [courseName, setCourseName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadedModules, setLoadedModules] = useState<any[] | null>(null)
  const [themeId, setThemeId] = useState('current')
  const [savedVariants, setSavedVariants] = useState<any[]>([])
  const courseBuilderRef = useRef<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCourseName, setNewCourseName] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch all tutor courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          const coursesList = data.courses || []
          setCourses(coursesList)

          // If courseId is provided, find and set the current course
          if (courseId) {
            const current = coursesList.find((c: Course) => c.id === courseId)
            if (current) {
              setCurrentCourse(current)
              setCourseName(current.name)
            }
          } else if (coursesList.length > 0) {
            // Default to first course if no courseId
            setCurrentCourse(coursesList[0])
            setCourseName(coursesList[0].name)
          }
        }
      } catch (error) {
        toast.error('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [courseId])

  // Fetch course curriculum when course changes
  useEffect(() => {
    if (!currentCourse?.id) return

    const fetchCurriculum = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/tutor/courses/${currentCourse.id}/curriculum`, {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setLoadedModules(data.modules || [])
        }
      } catch (error) {
        toast.error('Failed to load curriculum')
      } finally {
        setLoading(false)
      }
    }

    fetchCurriculum()
  }, [currentCourse?.id])

  const handleCourseSelect = useCallback(
    (selectedCourseId: string) => {
      const selected = courses.find(c => c.id === selectedCourseId)
      if (selected) {
        setCurrentCourse(selected)
        setCourseName(selected.name)
        // Update URL without full page reload
        window.history.replaceState({}, '', `/tutor/courses/${selected.id}/builder`)
      }
    },
    [courses]
  )

  const handleCourseNameChange = useCallback(
    async (newName: string) => {
      setCourseName(newName)
      if (currentCourse && newName.trim() && newName !== currentCourse.name) {
        try {
          const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
          const csrfData = await csrfRes.json().catch(() => ({}))
          const csrfToken = csrfData?.token ?? null

          const res = await fetch(`/api/tutor/courses/${currentCourse.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
            },
            credentials: 'include',
            body: JSON.stringify({ name: newName.trim() }),
          })

          if (res.ok) {
            setCurrentCourse(prev => (prev ? { ...prev, name: newName.trim() } : null))
            setCourses(prev =>
              prev.map(c => (c.id === currentCourse.id ? { ...c, name: newName.trim() } : c))
            )
          }
        } catch {
          // Silent fail - name will be saved when user clicks Save Course
        }
      }
    },
    [currentCourse]
  )

  const handleCreateNewCourse = useCallback(async () => {
    if (!newCourseName.trim()) {
      toast.error('Please enter a course name')
      return
    }

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
          title: newCourseName.trim(),
          subject: 'general',
          categories: [],
          schedule: [],
          isLiveOnline: false,
        }),
      })

      const data = await res.json()
      if (res.ok && data.course) {
        const newCourse = data.course
        setCourses(prev => [...prev, newCourse])
        setCurrentCourse(newCourse)
        setCourseName(newCourse.name)
        setLoadedModules([])
        setNewCourseName('')
        setIsCreateDialogOpen(false)
        toast.success(`Created course "${newCourse.name}"`)
        // Navigate to the new course builder
        window.history.replaceState({}, '', `/tutor/courses/${newCourse.id}/builder`)
      } else {
        toast.error(data.error || 'Failed to create course')
      }
    } catch {
      toast.error('Failed to create course')
    }
  }, [newCourseName])

  const handleDeleteCourse = useCallback(async () => {
    if (!currentCourse) return
    if (courses.length <= 1) {
      toast.error('Cannot delete the last course')
      setIsDeleteDialogOpen(false)
      return
    }

    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${currentCourse.id}`, {
        method: 'DELETE',
        headers: {
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
      })

      if (res.ok) {
        const remainingCourses = courses.filter(c => c.id !== currentCourse.id)
        setCourses(remainingCourses)
        setCurrentCourse(remainingCourses[0])
        setCourseName(remainingCourses[0].name)
        setIsDeleteDialogOpen(false)
        toast.success('Course deleted')
        // Navigate to another course
        window.history.replaceState({}, '', `/tutor/courses/${remainingCourses[0].id}/builder`)
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to delete course')
      }
    } catch {
      toast.error('Failed to delete course')
    }
  }, [currentCourse, courses])

  const handleSave = useCallback(
    async (modules: any[], options?: any) => {
      if (!currentCourse?.id) return
      setSaving(true)
      try {
        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        const csrfToken = csrfData?.token ?? null

        const res = await fetch(`/api/tutor/courses/${currentCourse.id}/curriculum`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          },
          credentials: 'include',
          body: JSON.stringify({ modules }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          toast.error(data.error || 'Failed to save curriculum')
        } else {
          toast.success('Course saved successfully')
        }
      } catch {
        toast.error('Failed to save course')
      } finally {
        setSaving(false)
      }
    },
    [currentCourse?.id]
  )

  const selectedTheme = DASHBOARD_THEMES.find(t => t.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = selectedTheme.tokens
    ? {
        ['--dashboard-bg' as string]: selectedTheme.tokens.background,
        ['--dashboard-panel' as string]: selectedTheme.tokens.panel,
        ['--dashboard-accent' as string]: selectedTheme.tokens.accent,
      }
    : {}

  if (!currentCourse && !loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground"
        style={themeStyle}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Builder
            </CardTitle>
            <CardDescription>
              You don&apos;t have any courses yet. Create a course to start building your
              curriculum.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full">
              Create Your First Course
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-stretch overflow-hidden bg-[#fafafc] text-foreground"
      data-tutor-route="course-builder"
      style={themeStyle}
    >
      <div className="flex w-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Course Builder
        </h1>

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <CourseBuilder
            ref={courseBuilderRef}
            courseId={currentCourse?.id ?? ''}
            courseName={courseName}
            initialModules={loadedModules ?? undefined}
            onSave={handleSave}
            hideCourseNameInTabs
          />
        )}
      </div>

      {/* Create New Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>Enter a name for your new course.</DialogDescription>
          </DialogHeader>
          <Input
            value={newCourseName}
            onChange={e => setNewCourseName(e.target.value)}
            placeholder="Course name"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCreateNewCourse()
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewCourse}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{courseName}&quot;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
