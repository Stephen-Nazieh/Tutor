'use client'

import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CurriculumModule {
  id: string
  lessons: { id: string }[]
}

interface Curriculum {
  id: string
  name: string | null
  description: string | null
  subject: string | null
  price: number | null
  currency: string | null
  modules: CurriculumModule[]
}

interface ValidationItem {
  id: string
  label: string
  check: (course: Curriculum) => boolean
  required: boolean
}

const validations: ValidationItem[] = [
  {
    id: 'name',
    label: 'Course has a name (at least 2 characters)',
    check: (c) => !!c.name && c.name.trim().length >= 2,
    required: true,
  },
  {
    id: 'subject',
    label: 'Subject is selected',
    check: (c) => !!c.subject,
    required: true,
  },
  {
    id: 'module',
    label: 'At least 1 module created',
    check: (c) => c.modules.length > 0,
    required: true,
  },
  {
    id: 'lesson',
    label: 'At least 1 lesson added',
    check: (c) => c.modules.some((m) => m.lessons.length > 0),
    required: true,
  },
  {
    id: 'price',
    label: 'Price is set (use 0 for free courses)',
    check: (c) => c.price !== null && c.price !== undefined,
    required: true,
  },
  {
    id: 'currency',
    label: 'Currency is set (required for paid courses)',
    check: (c) => (c.price ?? 0) === 0 || !!c.currency,
    required: true,
  },
]

interface PublishValidationChecklistProps {
  course: Curriculum
  className?: string
}

export function PublishValidationChecklist({ course, className }: PublishValidationChecklistProps) {
  const results = validations.map((v) => ({
    ...v,
    passed: v.check(course),
  }))

  const passedCount = results.filter((r) => r.passed).length
  const totalRequired = results.filter((r) => r.required).length
  const allPassed = passedCount === results.length

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-slate-900">Publish Requirements</h4>
        <span
          className={cn(
            'text-sm font-medium',
            allPassed ? 'text-green-600' : 'text-slate-500'
          )}
        >
          {passedCount}/{results.length} completed
        </span>
      </div>

      <div className="space-y-2">
        {results.map((result) => (
          <div
            key={result.id}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-3 transition-colors',
              result.passed
                ? 'border-green-200 bg-green-50/50'
                : result.required
                ? 'border-amber-200 bg-amber-50/50'
                : 'border-slate-200 bg-slate-50/50'
            )}
          >
            {result.passed ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
            ) : result.required ? (
              <XCircle className="h-5 w-5 shrink-0 text-amber-600" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-slate-400" />
            )}
            <span
              className={cn(
                'text-sm',
                result.passed
                  ? 'text-green-700'
                  : result.required
                  ? 'text-amber-700'
                  : 'text-slate-600'
              )}
            >
              {result.label}
              {result.required && !result.passed && (
                <span className="ml-1 text-amber-600">*</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {!allPassed && (
        <p className="text-xs text-slate-500">
          Complete all required items (*) to publish your course.
        </p>
      )}
    </div>
  )
}

export function usePublishValidation(course: Curriculum) {
  const results = validations.map((v) => ({
    ...v,
    passed: v.check(course),
  }))

  const canPublish = results.every((r) => !r.required || r.passed)
  const missingRequirements = results
    .filter((r) => r.required && !r.passed)
    .map((r) => r.label)

  return {
    canPublish,
    missingRequirements,
    validationResults: results,
  }
}
