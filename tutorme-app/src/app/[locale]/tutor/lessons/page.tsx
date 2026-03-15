'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, BookOpen, Save } from 'lucide-react'
import { CourseBuilder } from '../dashboard/components/CourseBuilder'
import type { CourseBuilderRef, Module } from '../dashboard/components/CourseBuilder'

const STORAGE_KEY = 'lesson-bank-modules-v1'

export default function LessonBankPage() {
  const [loading, setLoading] = useState(true)
  const [modules, setModules] = useState<Module[]>([])
  const [saving, setSaving] = useState(false)
  const builderRef = useRef<CourseBuilderRef>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setModules(parsed as Module[])
        }
      }
    } catch {
      setModules([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSave = (nextModules: Module[]) => {
    setSaving(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextModules))
      setModules(nextModules)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tutor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Lesson Bank
            </h1>
            <p className="text-sm text-muted-foreground">
              Build reusable lessons, tasks, assessments, and homework for import into courses.
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => builderRef.current?.save()}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Library
          </Button>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 py-6">
        <CourseBuilder
          ref={builderRef}
          courseId="lesson-bank"
          courseName="Lesson Bank"
          initialModules={modules}
          lessonBankMode
          onSave={(nextModules) => handleSave(nextModules)}
        />
      </div>
    </div>
  )
}
