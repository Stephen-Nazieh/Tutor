'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { ScheduleItem } from '../constants'
import { DAYS } from '../constants'

interface ScheduleSlotEditorProps {
  slot: ScheduleItem
  index: number
  onUpdate: (index: number, field: keyof ScheduleItem, value: string | number) => void
  onRemove: (index: number) => void
}

export function ScheduleSlotEditor({ slot, index, onUpdate, onRemove }: ScheduleSlotEditorProps) {
  return (
    <div className="flex flex-wrap items-end gap-2 p-3 rounded-lg border bg-muted/30">
      <div className="space-y-1 min-w-[120px]">
        <Label className="text-xs">Day</Label>
        <Select
          value={slot.dayOfWeek}
          onValueChange={(v) => onUpdate(index, 'dayOfWeek', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DAYS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 w-[90px]">
        <Label className="text-xs">Start</Label>
        <Input
          type="time"
          value={slot.startTime}
          onChange={(e) => onUpdate(index, 'startTime', e.target.value)}
        />
      </div>
      <div className="space-y-1 w-[100px]">
        <Label className="text-xs">Duration (min)</Label>
        <Input
          type="number"
          min={5}
          max={480}
          value={slot.durationMinutes}
          onChange={(e) =>
            onUpdate(index, 'durationMinutes', parseInt(e.target.value, 10) || 60)
          }
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
        className="text-destructive hover:text-destructive"
        aria-label="Remove slot"
      >
        Remove
      </Button>
    </div>
  )
}
