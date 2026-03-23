/**
 * Preference-based enrollment dialog for students.
 */

'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

interface PreferenceEnrollmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  curriculumId: string
  curriculumName: string
  availabilitySlots: ScheduleItem[]
  onSubmitted?: () => void
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 60 + m
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function addMinutesToTime(startTime: string, minutesToAdd: number): string {
  const total = toMinutes(startTime) + minutesToAdd
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

function slotLabel(slot: ScheduleItem): string {
  const start = formatTime(slot.startTime)
  const end = formatTime(addMinutesToTime(slot.startTime, slot.durationMinutes))
  return `${start}–${end}`
}

function getCsrfToken(): Promise<string | null> {
  return fetch('/api/csrf', { credentials: 'include' })
    .then(res => res.json())
    .then(data => data?.token ?? null)
    .catch(() => null)
}

export function PreferenceEnrollmentDialog({
  open,
  onOpenChange,
  curriculumId,
  curriculumName,
  availabilitySlots,
  onSubmitted,
}: PreferenceEnrollmentDialogProps) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [sessionDensity, setSessionDensity] = useState(2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isUnavailable = availabilitySlots.length === 0

  useEffect(() => {
    if (open) {
      setSelectedKeys(new Set())
      setSessionDensity(2)
    }
  }, [open, curriculumId])

  const slotsByDay = useMemo(() => {
    const map = new Map<string, ScheduleItem[]>()
    for (const day of DAY_ORDER) map.set(day, [])
    for (const slot of availabilitySlots) {
      const list = map.get(slot.dayOfWeek) ?? []
      list.push(slot)
      map.set(slot.dayOfWeek, list)
    }
    for (const [day, list] of map.entries()) {
      list.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))
      map.set(day, list)
    }
    return map
  }, [availabilitySlots])

  const toggleSlot = (slot: ScheduleItem) => {
    const key = `${slot.dayOfWeek}-${slot.startTime}-${slot.durationMinutes}`
    setSelectedKeys(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const selectedSlots = useMemo(
    () =>
      availabilitySlots.filter(slot =>
        selectedKeys.has(`${slot.dayOfWeek}-${slot.startTime}-${slot.durationMinutes}`)
      ),
    [availabilitySlots, selectedKeys]
  )

  const handleSubmit = async () => {
    if (isUnavailable) {
      toast.error('Tutor availability has not been published yet.')
      return
    }
    if (selectedSlots.length === 0) {
      toast.error('Select at least one time slot.')
      return
    }

    setIsSubmitting(true)
    try {
      const csrf = await getCsrfToken()
      const res = await fetch(`/api/curriculum/${curriculumId}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        credentials: 'include',
        body: JSON.stringify({
          selectedSlots,
          sessionDensity,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to save preferences.')
        return
      }

      if (data.status === 'MATCHED') {
        toast.success('You have been matched to a group for this course.')
      } else {
        toast.success('Preference submitted. We will notify you once a group is formed.')
      }
      onOpenChange(false)
      onSubmitted?.()
    } catch {
      toast.error('Failed to submit preferences.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Sign up for {curriculumName}</DialogTitle>
          <DialogDescription>
            Select the time slots that work for you and how many sessions you want per week.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Weekly availability</h4>
            <p className="text-xs text-gray-500">Select multiple time slots.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DAY_ORDER.map(day => {
              const slots = slotsByDay.get(day) ?? []
              return (
                <div key={day} className="rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-medium text-gray-900">{day}</p>
                  {slots.length === 0 ? (
                    <p className="mt-2 text-xs text-gray-400">No slots</p>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {slots.map(slot => {
                        const key = `${slot.dayOfWeek}-${slot.startTime}-${slot.durationMinutes}`
                        const isSelected = selectedKeys.has(key)
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => toggleSlot(slot)}
                            className={cn(
                              'rounded-full border px-3 py-1 text-xs transition',
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                            )}
                            aria-pressed={isSelected}
                          >
                            {slotLabel(slot)}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-900" htmlFor="sessionDensity">
              Sessions per week
            </label>
            <Input
              id="sessionDensity"
              type="number"
              min={1}
              max={7}
              value={sessionDensity}
              onChange={e => setSessionDensity(Number(e.target.value))}
              className="w-32"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || isUnavailable}>
              {isSubmitting ? 'Submitting...' : 'Submit preferences'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
