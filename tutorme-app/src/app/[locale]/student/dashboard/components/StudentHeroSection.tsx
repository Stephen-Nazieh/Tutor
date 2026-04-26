'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BookOpen, Calendar, Sparkles } from 'lucide-react'

interface StudentHeroSectionProps {
  classes?: Array<{
    id: string
    title: string
    subject: string
    startTime: string
  }>
}

interface DayEvent {
  id: string
  title: string
  timeLabel: string
  duration: number
}

export function StudentHeroSection({ classes = [] }: StudentHeroSectionProps) {
  const { data: session } = useSession()
  const [greeting, setGreeting] = useState('Good morning')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<{ date: Date; events: DayEvent[] } | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, DayEvent[]>()
    classes.forEach(cls => {
      const date = new Date(cls.startTime)
      const key = date.toDateString()
      const duration = 60
      const end = new Date(date.getTime() + duration * 60000)
      const timeLabel = `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
      const list = map.get(key) ?? []
      list.push({ id: cls.id, title: cls.title, timeLabel, duration })
      map.set(key, list)
    })
    return map
  }, [classes])

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.05)] bg-[#FFFFFF] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              <span className="text-slate-500 text-sm font-medium">
                {greeting}, {session?.user?.name?.split(' ')[0] || 'Student'}
              </span>
            </div>
            <h1 className="text-slate-800 mb-2 text-4xl font-bold">Welcome Back!</h1>
            <p className="text-slate-500">
              {formatDate(currentTime)} •{' '}
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="text-slate-500 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            {classes.length > 0
              ? `${classes.length} upcoming class${classes.length > 1 ? 'es' : ''}`
              : 'No upcoming classes'}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-7 gap-2 rounded-[14px] border border-[rgba(0,0,0,0.04)] bg-[#FFFFFF] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentTime)
            d.setDate(currentTime.getDate() + i)
            const dayEvents = eventsByDay.get(d.toDateString()) ?? []
            const hasClasses = dayEvents.length > 0

            return (
              <div
                key={i}
                onClick={() => setSelectedDay({ date: d, events: dayEvents })}
                className="hover:bg-slate-50 group flex cursor-pointer flex-col items-center justify-center rounded-xl p-2 transition-colors"
              >
                <span className="text-slate-500 mb-1 text-xs font-medium">
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span
                  className={cn(
                    'mt-1 flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold',
                    i === 0
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-700 group-hover:bg-indigo-50'
                  )}
                >
                  {d.getDate()}
                </span>
                <div className="mt-2 flex flex-col items-center gap-0.5">
                  {dayEvents.slice(0, 1).map(evt => (
                    <span key={evt.id} className="text-indigo-600 text-[10px] font-medium">
                      {evt.timeLabel}
                    </span>
                  ))}
                  {dayEvents.length > 1 && (
                    <span className="text-slate-500 text-[8px]">
                      +{dayEvents.length - 1} more
                    </span>
                  )}
                  {!hasClasses && (
                    <div className="flex h-1.5 gap-1">
                      <div className="bg-slate-200 h-1.5 w-1.5 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent theme="default" className="border-slate-200 bg-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-slate-800">
                {selectedDay?.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                {selectedDay && selectedDay.events.length > 0
                  ? `${selectedDay.events.length} class${selectedDay.events.length > 1 ? 'es' : ''} scheduled`
                  : 'No classes scheduled'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              {selectedDay?.events.map(event => (
                <div key={event.id} className="bg-slate-50 flex items-center gap-3 rounded-lg p-3 border border-slate-100">
                  <div className="bg-indigo-50 flex h-10 w-10 items-center justify-center rounded-lg">
                    <BookOpen className="text-indigo-600 h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">{event.title}</p>
                    <p className="text-slate-500 text-sm">
                      {event.timeLabel} • {event.duration} min
                    </p>
                  </div>
                </div>
              ))}

              {(!selectedDay || selectedDay.events.length === 0) && (
                <div className="text-slate-500 py-8 text-center">
                  <Calendar className="text-slate-300 mx-auto mb-3 h-12 w-12" />
                  <p>No classes scheduled for this day</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
