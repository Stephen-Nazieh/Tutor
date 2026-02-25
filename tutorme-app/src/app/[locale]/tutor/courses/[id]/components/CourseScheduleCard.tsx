'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ScheduleItem } from '../constants'
import { DAYS } from '../constants'
import { ScheduleSlotEditor } from './ScheduleSlotEditor'
import { Calendar } from 'lucide-react'

interface CourseScheduleCardProps {
  schedule: ScheduleItem[]
  onScheduleChange: (updater: (prev: ScheduleItem[]) => ScheduleItem[]) => void
  /** Optional subtitle, e.g. "for Group A" */
  subtitle?: string
}

export function CourseScheduleCard({
  schedule,
  onScheduleChange,
  subtitle,
}: CourseScheduleCardProps) {
  const addSlot = () => {
    onScheduleChange((prev) => [
      ...prev,
      { dayOfWeek: DAYS[0], startTime: '09:00', durationMinutes: 60 },
    ])
  }

  const updateSlot = (index: number, field: keyof ScheduleItem, value: string | number) => {
    onScheduleChange((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const removeSlot = (index: number) => {
    onScheduleChange((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card id="course-schedule">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Class schedule
          {subtitle && (
            <span className="text-sm font-normal text-muted-foreground">
              ({subtitle})
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Set recurring slots for this course. Save with &quot;Save settings only&quot; or &quot;Save all&quot; below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((slot, index) => (
          <ScheduleSlotEditor
            key={index}
            slot={slot}
            index={index}
            onUpdate={updateSlot}
            onRemove={removeSlot}
          />
        ))}
        <Button type="button" variant="outline" onClick={addSlot}>
          Add class slot
        </Button>
      </CardContent>
    </Card>
  )
}
