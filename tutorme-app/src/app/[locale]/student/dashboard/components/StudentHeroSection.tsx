'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
    classes.forEach((cls) => {
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-secondary to-card p-8 shadow-2xl border border-border">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-1000 opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-2000 opacity-50" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm font-medium">
                {greeting}, {session?.user?.name?.split(' ')[0] || 'Student'}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              {formatDate(currentTime)} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            {classes.length > 0 ? `${classes.length} upcoming class${classes.length > 1 ? 'es' : ''}` : 'No upcoming classes'}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-8 bg-card/70 backdrop-blur-md border border-border rounded-2xl p-4 shadow-2xl">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentTime)
            d.setDate(currentTime.getDate() + i)
            const dayEvents = eventsByDay.get(d.toDateString()) ?? []
            const hasClasses = dayEvents.length > 0

            return (
              <div
                key={i}
                onClick={() => setSelectedDay({ date: d, events: dayEvents })}
                className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-accent/40 transition-colors cursor-pointer group"
              >
                <span className="text-muted-foreground text-xs font-medium mb-1">
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={cn(
                  "text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full mt-1",
                  i === 0 ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-foreground group-hover:bg-accent/30"
                )}>
                  {d.getDate()}
                </span>
                <div className="flex flex-col items-center mt-2 gap-0.5">
                  {dayEvents.slice(0, 1).map((evt) => (
                    <span key={evt.id} className="text-[10px] text-primary font-medium">
                      {evt.timeLabel}
                    </span>
                  ))}
                  {dayEvents.length > 1 && (
                    <span className="text-[8px] text-muted-foreground">+{dayEvents.length - 1} more</span>
                  )}
                  {!hasClasses && (
                    <div className="flex gap-1 h-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-md border border-border bg-card">
            <DialogHeader>
              <DialogTitle>
                {selectedDay?.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </DialogTitle>
              <DialogDescription>
                {selectedDay && selectedDay.events.length > 0
                  ? `${selectedDay.events.length} class${selectedDay.events.length > 1 ? 'es' : ''} scheduled`
                  : 'No classes scheduled'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              {selectedDay?.events.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/60 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.timeLabel} • {event.duration} min</p>
                  </div>
                </div>
              ))}

              {(!selectedDay || selectedDay.events.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/60" />
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
