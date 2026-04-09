'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
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
import { ArrowLeft, Loader2, BookOpen, Save, Plus, Trash2 } from 'lucide-react'
import { CourseBuilder } from '../dashboard/components/CourseBuilder'
import type { CourseBuilderRef, Module } from '../dashboard/components/CourseBuilder'
import { toast } from 'sonner'

const STORAGE_KEY = 'lesson-bank-courses-v1'

interface SavedCourse {
  id: string
  name: string
  modules: Module[]
  updatedAt: string
}

export default function LessonBankPage() {
  const [loading, setLoading] = useState(true)
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([])
  const [currentCourseId, setCurrentCourseId] = useState<string>('')
  const [currentCourseName, setCurrentCourseName] = useState<string>('Untitled Course')
  const [modules, setModules] = useState<Module[]>([])
  const [saving, setSaving] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCourseName, setNewCourseName] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const builderRef = useRef<CourseBuilderRef>(null)

  // Load saved courses from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedCourses(parsed as SavedCourse[])
          // Load the most recently updated course
          const mostRecent = parsed.reduce((latest: SavedCourse, current: SavedCourse) =>
            new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest
          )
          setCurrentCourseId(mostRecent.id)
          setCurrentCourseName(mostRecent.name)
          setModules(mostRecent.modules)
        } else {
          // Initialize with default course
          createDefaultCourse()
        }
      } else {
        // Initialize with default course
        createDefaultCourse()
      }
    } catch {
      createDefaultCourse()
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createDefaultCourse = () => {
    const defaultCourse: SavedCourse = {
      id: `course-${Date.now()}`,
      name: 'My First Course',
      modules: [],
      updatedAt: new Date().toISOString(),
    }
    setSavedCourses([defaultCourse])
    setCurrentCourseId(defaultCourse.id)
    setCurrentCourseName(defaultCourse.name)
    setModules([])
    localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultCourse]))
  }

  const handleCourseSelect = useCallback(
    (courseId: string) => {
      const selected = savedCourses.find(c => c.id === courseId)
      if (selected) {
        setCurrentCourseId(selected.id)
        setCurrentCourseName(selected.name)
        setModules(selected.modules)
        toast.success(`Loaded "${selected.name}"`)
      }
    },
    [savedCourses]
  )

  const handleCourseNameChange = useCallback(
    (newName: string) => {
      setCurrentCourseName(newName)
      // Auto-save the name change
      setSavedCourses(prev => {
        const updated = prev.map(c =>
          c.id === currentCourseId
            ? { ...c, name: newName, updatedAt: new Date().toISOString() }
            : c
        )
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    },
    [currentCourseId]
  )

  const handleCreateNewCourse = useCallback(() => {
    if (!newCourseName.trim()) {
      toast.error('Please enter a course name')
      return
    }

    const newCourse: SavedCourse = {
      id: `course-${Date.now()}`,
      name: newCourseName.trim(),
      modules: [],
      updatedAt: new Date().toISOString(),
    }

    setSavedCourses(prev => {
      const updated = [...prev, newCourse]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    setCurrentCourseId(newCourse.id)
    setCurrentCourseName(newCourse.name)
    setModules([])
    setNewCourseName('')
    setIsCreateDialogOpen(false)
    toast.success(`Created new course "${newCourse.name}"`)
  }, [newCourseName])

  const handleDeleteCourse = useCallback(() => {
    if (savedCourses.length <= 1) {
      toast.error('Cannot delete the last course')
      setIsDeleteDialogOpen(false)
      return
    }

    setSavedCourses(prev => {
      const updated = prev.filter(c => c.id !== currentCourseId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

      // Switch to another course
      const nextCourse = updated[0]
      setCurrentCourseId(nextCourse.id)
      setCurrentCourseName(nextCourse.name)
      setModules(nextCourse.modules)

      return updated
    })
    setIsDeleteDialogOpen(false)
    toast.success('Course deleted')
  }, [currentCourseId, savedCourses.length])

  const handleSave = useCallback(
    (nextModules: Module[], options?: any) => {
      if (!options?.isAutoSave) setSaving(true)
      try {
        setModules(nextModules)
        setSavedCourses(prev => {
          const updated = prev.map(c =>
            c.id === currentCourseId
              ? { ...c, modules: nextModules, updatedAt: new Date().toISOString() }
              : c
          )
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
          return updated
        })
        if (!options?.isAutoSave) toast.success('Course saved successfully')
      } finally {
        if (!options?.isAutoSave) setSaving(false)
      }
    },
    [currentCourseId]
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50" data-tutor-route="lesson-bank">
      <div className="relative z-10 flex-shrink-0 border-b bg-white">
        <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tutor/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {/* Course Selector Dropdown */}
            <Select value={currentCourseId} onValueChange={handleCourseSelect}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {savedCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Editable Course Name */}
            <Input
              value={currentCourseName}
              onChange={e => handleCourseNameChange(e.target.value)}
              className="w-[250px] text-center font-semibold"
              placeholder="Course name"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCreateDialogOpen(true)}
              title="Create new course"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              title="Delete current course"
              disabled={savedCourses.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2" onClick={() => builderRef.current?.save()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden px-4 py-6 sm:px-6">
        <CourseBuilder
          ref={builderRef}
          courseId={currentCourseId}
          courseName={currentCourseName}
          initialLessons={modules}
          lessonBankMode
          onSave={handleSave}
        />
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
              Are you sure you want to delete &quot;{currentCourseName}&quot;? This action cannot be
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
