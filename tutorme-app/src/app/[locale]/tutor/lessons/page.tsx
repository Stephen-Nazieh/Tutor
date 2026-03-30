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
          <h1 className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-xl font-semibold">
            <BookOpen className="h-5 w-5" />
            Lesson Bank
          </h1>
          <Button className="gap-2" onClick={() => builderRef.current?.save()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden px-4 py-6 sm:px-6">
        <CourseBuilder
          ref={builderRef}
          courseId="lesson-bank"
          courseName="Lesson Bank"
          initialModules={modules}
          lessonBankMode
          onSave={nextModules => handleSave(nextModules)}
        />
      </div>
    </div>
  )
}
