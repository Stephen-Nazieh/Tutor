'use client'

import { useMemo, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import type { ScheduleItem } from '../constants'
import { DAYS, TIME_SLOT_OPTIONS } from '../constants'

interface VariantScheduleEditorProps {
  schedule: ScheduleItem[]
  onScheduleChange: (updater: (prev: ScheduleItem[]) => ScheduleItem[]) => void
  price?: number | null
  weeksToSchedule?: number
  onWeeksChange?: (weeks: number) => void
}

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function formatTime(time: string) {
  if (!time || typeof time !== 'string') return '–'
  const parts = time.split(':')
  const hour = Number(parts[0])
  const minute = Number(parts[1] ?? 0)
  if (Number.isNaN(hour)) return '–'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const period = hour >= 12 ? 'PM' : 'AM'
  return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`
}

function formatTimeRange(startTime: string, durationMinutes: number) {
  if (!startTime || typeof startTime !== 'string') return '–'
  const parts = startTime.split(':')
  const startHour = Number(parts[0])
  const startMinute = Number(parts[1] ?? 0)
  if (Number.isNaN(startHour)) return '–'
  const startTotal = startHour * 60 + startMinute
  const dur = Number(durationMinutes) || 0
  const endTotal = startTotal + dur
  const endHour = Math.floor((endTotal / 60) % 24)
  const endMinute = endTotal % 60
  const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
  return `${formatTime(startTime)}–${formatTime(endTime)}`
}

const timezoneLabel = (() => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local time'
  } catch {
    return 'Local time'
  }
})()

export function VariantScheduleEditor({
  schedule,
  onScheduleChange,
  price,
  weeksToSchedule = 8,
  onWeeksChange,
}: VariantScheduleEditorProps) {
  const [scheduleWeekOffset, setScheduleWeekOffset] = useState(0)
  const [scheduleRepeatWeekly, setScheduleRepeatWeekly] = useState(false)
  const [numberOfWeeks, setNumberOfWeeks] = useState(weeksToSchedule || 8)
  const [totalSessionsDesired, setTotalSessionsDesired] = useState<number | ''>('')

  const scheduleWeekStart = (() => {
    const d = new Date()
    const day = d.getDay()
    const mon = d.getDate() - (day === 0 ? 6 : day - 1) + scheduleWeekOffset * 7
    const start = new Date(d.getFullYear(), d.getMonth(), mon)
    return start
  })()

  const scheduleWeekLabel = (() => {
    const end = new Date(scheduleWeekStart)
    end.setDate(end.getDate() + 6)
    return `${scheduleWeekStart.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
  })()

  const scheduleMonthLabel = scheduleWeekStart.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const weekDates = DAYS.map((_, i) => {
    const d = new Date(scheduleWeekStart)
    d.setDate(scheduleWeekStart.getDate() + i)
    return d
  })

  const formatDateKey = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const effectiveWeeks =
    scheduleRepeatWeekly && Array.isArray(schedule) && schedule.filter(Boolean).length > 0 && totalSessionsDesired !== '' && Number(totalSessionsDesired) > 0
      ? Math.max(1, Math.ceil(Number(totalSessionsDesired) / schedule.filter(Boolean).length))
      : Math.max(1, numberOfWeeks || 8)

  // Safely fallback number of weeks if undefined
  const safeNumberOfWeeks = numberOfWeeks || 8
  useEffect(() => {
    if (effectiveWeeks !== weeksToSchedule) {
      onWeeksChange?.(effectiveWeeks)
    }
  }, [effectiveWeeks, weeksToSchedule, onWeeksChange])

  const scheduleSummary = useMemo(() => {
    if (!Array.isArray(schedule) || schedule.length === 0) return []
    const validSchedule = schedule.filter(Boolean)
    if (scheduleRepeatWeekly) {
      const MAX_WEEKS = 52
      const weeks = Math.min(
        MAX_WEEKS,
        totalSessionsDesired !== '' && Number(totalSessionsDesired) > 0 && validSchedule.length > 0
          ? Math.max(1, Math.ceil(Number(totalSessionsDesired) / validSchedule.length))
          : Math.max(1, safeNumberOfWeeks)
      )
      const expanded: ScheduleItem[] = []
      for (let w = 0; w < weeks; w++) {
        validSchedule.forEach(slot => expanded.push({ ...slot }))
      }
      return expanded
    }
    return [...validSchedule]
  }, [schedule, scheduleRepeatWeekly, safeNumberOfWeeks, totalSessionsDesired])

  const priceNumber = Number(price)
  const scheduleCost = scheduleSummary.reduce((sum, slot) => {
    if (!priceNumber || Number.isNaN(priceNumber)) return sum
    const dur = slot?.durationMinutes ?? 0
    return sum + (dur / 60) * priceNumber
  }, 0)
  const totalRevenue = scheduleCost * 0.7
  const totalSessions = scheduleSummary.length
  const totalDurationMinutes = scheduleSummary.reduce(
    (sum, slot) => sum + (slot.durationMinutes ?? 0),
    0
  )
  const totalDurationHours = (totalDurationMinutes / 60).toFixed(1)

  const scheduleByDay = scheduleSummary.reduce(
    (acc, slot) => {
      const day = slot?.dayOfWeek
      if (!day) return acc
      if (!acc[day]) acc[day] = []
      acc[day].push(slot)
      return acc
    },
    {} as Record<string, ScheduleItem[]>
  )

  const toggleSlot = (day: string, dateKey: string, timeStr: string) => {
    onScheduleChange(prevRaw => {
      const prev = Array.isArray(prevRaw) ? prevRaw.filter(Boolean) : []
      const idx = prev.findIndex(s => {
        if (!s || s.dayOfWeek !== day) return false
        if (!scheduleRepeatWeekly) {
          if (s.date ? s.date !== dateKey : scheduleWeekOffset !== 0) return false
        }
        const [sh, sm] = (s.startTime || '00:00').split(':').map(Number)
        const startM = sh * 60 + sm
        const endM = startM + (s.durationMinutes || 60)
        const [th, tm] = timeStr.split(':').map(Number)
        const slotM = th * 60 + tm
        return slotM >= startM && slotM < endM
      })
      if (idx >= 0) {
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
      }
      return [
        ...prev,
        {
          dayOfWeek: day,
          startTime: timeStr,
          durationMinutes: 60,
          ...(scheduleRepeatWeekly ? {} : { date: dateKey }),
        },
      ]
    })
  }

  return (
    <div className="space-y-6">
      {/* Cost vs Revenue - visible when price and schedule are set */}
      {priceNumber > 0 && Array.isArray(schedule) && schedule.filter(Boolean).length > 0 && (
        <div className="bg-muted/30 grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm">
          <div>
            <div className="text-muted-foreground text-xs">Cost for course</div>
            <div className="font-medium">USD {scheduleCost.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Revenue (after 30% commission)</div>
            <div className="font-medium">USD {totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      )}

      {/* Weekly repeat option */}
      <div className="bg-muted/30 flex flex-wrap items-center gap-4 rounded-lg border p-3">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={scheduleRepeatWeekly}
            onChange={e => setScheduleRepeatWeekly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium">Apply same schedule every week</span>
        </label>
        {scheduleRepeatWeekly && Array.isArray(schedule) && schedule.filter(Boolean).length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Number of weeks</Label>
              <Input
                type="number"
                min={1}
                max={52}
                value={totalSessionsDesired !== '' ? effectiveWeeks : safeNumberOfWeeks}
                onChange={e => {
                  const val = parseInt(e.target.value, 10)
                  const v = Math.max(1, Number.isNaN(val) ? 8 : val)
                  setNumberOfWeeks(v)
                  if (totalSessionsDesired !== '') setTotalSessionsDesired('')
                }}
                disabled={totalSessionsDesired !== ''}
                className="h-8 w-20 text-sm"
              />
              {totalSessionsDesired !== '' && (
                <span className="text-muted-foreground text-xs">
                  = {effectiveWeeks} weeks from {totalSessionsDesired} sessions
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Or total sessions</Label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 20"
                value={totalSessionsDesired}
                onChange={e =>
                  setTotalSessionsDesired(
                    e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value, 10) || 0)
                  )
                }
                className="h-8 w-24 text-sm"
              />
              <span className="text-muted-foreground text-xs">
                sessions (weeks = sessions ÷ slots per week)
              </span>
            </div>
          </>
        )}
      </div>

      {/* Calendar grid */}
      <div
        key={`week-${scheduleWeekStart.getTime()}`}
        className="overflow-hidden rounded-lg border"
      >
        <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-2 border-b px-2 py-2">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setScheduleWeekOffset(o => o - 1)}
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center text-xs font-medium">
              {scheduleWeekLabel}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setScheduleWeekOffset(o => o + 1)}
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-muted-foreground text-xs">{scheduleMonthLabel}</span>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground mr-1 text-[10px]">Month:</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setScheduleWeekOffset(o => o - 4)}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setScheduleWeekOffset(o => o + 4)}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="bg-muted/20 text-muted-foreground border-b px-2 py-1 text-xs">
          Click a time slot to add or remove a 1-hour session.
        </p>
        <div className="bg-muted/30 grid grid-cols-8 border-b">
          <div className="border-r p-2 text-center text-xs font-medium">Time</div>
          {DAYS.map((day, i) => {
            const d = weekDates[i]
            return (
              <div
                key={`${day}-${d.getTime()}`}
                className="border-r p-2 text-center text-xs font-medium"
              >
                <div>{day.slice(0, 3)}</div>
                <div className="text-muted-foreground mt-0.5 text-[10px] font-normal">
                  {d.getDate()}
                </div>
              </div>
            )
          })}
        </div>
        <ScrollArea className="h-[320px]">
          <div className="grid grid-cols-8">
            {TIME_SLOT_OPTIONS.map(timeStr => {
              const hour = parseInt(timeStr.slice(0, 2), 10)
              const endHour = hour + 1
              const startLabel = `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`
              const endLabel = `${endHour % 12 || 12}:00 ${endHour >= 12 ? 'PM' : 'AM'}`
              const displayTime = `${startLabel}-${endLabel}`
              return (
                <div key={timeStr} className="contents">
                  <div className="text-muted-foreground border-b border-r border-dashed p-1 text-center text-[10px]">
                    {displayTime}
                  </div>
                  {DAYS.map((day, dayIndex) => {
                    const dateKey = formatDateKey(weekDates[dayIndex])
                    const validScheduleArray = Array.isArray(schedule) ? schedule.filter(Boolean) : []
                    const matchingSlotIndex = validScheduleArray.findIndex(s => {
                      if (!s || s.dayOfWeek !== day) return false
                      if (!scheduleRepeatWeekly) {
                        if (s.date ? s.date !== dateKey : scheduleWeekOffset !== 0) return false
                      }
                      const [sh, sm] = (s.startTime || '00:00').split(':').map(Number)
                      const startM = sh * 60 + sm
                      const endM = startM + (s.durationMinutes || 60)
                      const [th, tm] = timeStr.split(':').map(Number)
                      const slotM = th * 60 + tm
                      return slotM >= startM && slotM < endM
                    })
                    const inRange = matchingSlotIndex >= 0
                    let sessionNum = 0
                    if (inRange) {
                      const currentSlot = validScheduleArray[matchingSlotIndex]
                      const sortedSessions = [...validScheduleArray].sort((a, b) => {
                        const aDate = a.date || ''
                        const bDate = b.date || ''
                        if (aDate !== bDate) return aDate.localeCompare(bDate)
                        return (a.startTime || '').localeCompare(b.startTime || '')
                      })
                      sessionNum =
                        sortedSessions.findIndex(
                          s =>
                            s &&
                            s.dayOfWeek === currentSlot.dayOfWeek &&
                            s.startTime === currentSlot.startTime &&
                            s.date === currentSlot.date
                        ) + 1
                    }
                    const sessionLabel = inRange ? `Session ${sessionNum}` : ''
                    return (
                      <div
                        key={`${day}-${timeStr}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleSlot(day, dateKey, timeStr)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleSlot(day, dateKey, timeStr)
                          }
                        }}
                        className={`min-h-[28px] w-full cursor-pointer border-b border-r border-dashed p-1 text-left transition-colors hover:bg-blue-50 ${inRange ? 'bg-blue-200 ring-1 ring-blue-400' : 'bg-white hover:bg-slate-50'}`}
                        aria-pressed={inRange}
                        aria-label={`${day} ${displayTime}${inRange ? ', selected' : ''}. Click to ${inRange ? 'remove' : 'add'} session.`}
                      >
                        {inRange && (
                          <span className="inline-flex items-center gap-0.5 text-[8px] font-medium text-blue-800">
                            {sessionLabel}
                            <button
                              type="button"
                              className="rounded-full p-0.5 hover:bg-blue-100"
                              onClick={e => {
                                e.stopPropagation()
                                toggleSlot(day, dateKey, timeStr)
                              }}
                              aria-label="Remove this session"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Schedule Summary */}
      {scheduleSummary.length > 0 && (
        <Card className="border-primary/20 overflow-hidden border-2 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarIcon className="text-primary h-5 w-5" />
              Schedule Summary
            </CardTitle>
            <CardDescription className="text-xs">Times in {timezoneLabel}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {/* Sessions & duration */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                <div className="text-xs font-medium uppercase tracking-wide text-blue-700">
                  Sessions
                </div>
                <div className="mt-0.5 text-2xl font-bold text-blue-900">{totalSessions}</div>
                {scheduleRepeatWeekly && Array.isArray(schedule) && schedule.filter(Boolean).length > 0 && totalSessions > schedule.filter(Boolean).length && (
                  <div className="mt-0.5 text-xs text-blue-600">
                    Over {Math.ceil(totalSessions / schedule.filter(Boolean).length)} weeks
                  </div>
                )}
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Total duration
                </div>
                <div className="mt-0.5 text-2xl font-bold text-emerald-900">
                  {totalDurationHours} h
                </div>
              </div>
              {priceNumber > 0 && (
                <>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
                      Cost
                    </div>
                    <div className="mt-0.5 text-xl font-bold text-slate-900">
                      USD {scheduleCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-amber-700">
                      Revenue (70%)
                    </div>
                    <div className="mt-0.5 text-xl font-bold text-amber-900">
                      USD {totalRevenue.toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* By day - interactive list */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-700">By day</div>
              {dayOrder
                .filter(day => scheduleByDay[day]?.length)
                .map(day => (
                  <div
                    key={day}
                    className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-800">
                      <span>{day}</span>
                      <Badge variant="secondary" className="text-xs">
                        {scheduleByDay[day].length} session
                        {scheduleByDay[day].length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scheduleByDay[day]
                        .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
                        .map((slot, idx) => (
                          <div
                            key={`${day}-${idx}-${slot.startTime || '00:00'}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800"
                          >
                            {slot.date && (
                              <span className="text-xs text-slate-600">
                                {(() => {
                                  try {
                                    const d = new Date(slot.date + 'T00:00:00')
                                    if (Number.isNaN(d.getTime())) return slot.date
                                    return d.toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                    })
                                  } catch {
                                    return slot.date
                                  }
                                })()}
                              </span>
                            )}
                            <span>{formatTimeRange(slot.startTime, slot.durationMinutes)}</span>
                            <span className="text-xs text-slate-500">
                              • {slot.durationMinutes}m
                            </span>
                            <span className="text-xs text-slate-500">• 0 students</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
