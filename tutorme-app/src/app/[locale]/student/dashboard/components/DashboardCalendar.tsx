'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveCalendar } from '@/app/[locale]/tutor/dashboard/components/InteractiveCalendar'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, BookOpen, MapPin, Video, Users, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CalendarEvent {
  id: string
  bookingId: string
  title: string
  subject: string
  start: string
  end: string
  duration: number
  type: 'class'
  tutorName: string | null
}

interface DashboardCalendarProps {
  /** Optional initial data from dashboard fetch (classes from /api/classes?myBookings=true) */
  initialEvents?: CalendarEvent[]
  onRefresh?: () => void
  /** Continue Learning contents */
  contents?: {
    id: string
    subject: string
    topic: string
    progress: number
    lastStudied?: string
  }[]
  /** Upcoming Classes data */
  upcomingClasses?: ClassItem[]
  bookingClassId?: string | null
  onBookClass?: (classId: string) => void
}

interface ClassItem {
  id: string
  title: string
  subject: string
  tutorName: string
  scheduledAt: string
  duration: number
  type: 'online' | 'in-person'
  students: number
  maxStudents: number
  isBooked?: boolean
  requiresPayment?: boolean
  price?: number | null
}

function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function DashboardCalendar({
  initialEvents,
  onRefresh,
  contents = [],
  upcomingClasses = [],
  bookingClassId,
  onBookClass,
}: DashboardCalendarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('classes')
  const [month, setMonth] = useState<Date>(() => new Date())
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents ?? [])
  const [loading, setLoading] = useState(!initialEvents?.length)
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classesLoading, setClassesLoading] = useState(true)

  const monthStart = useMemo(() => new Date(month.getFullYear(), month.getMonth(), 1), [month])
  const monthEnd = useMemo(() => new Date(month.getFullYear(), month.getMonth() + 1, 0), [month])

  // Fetch calendar events
  useEffect(() => {
    let cancelled = false
    const start = monthStart.toISOString()
    const end = monthEnd.toISOString()
    setLoading(true)
    fetch(
      `/api/student/calendar/events?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
      { credentials: 'include' }
    )
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const list: CalendarEvent[] = Array.isArray(data?.events) ? data.events : []
        setEvents(list)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setEvents([])
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [monthStart, monthEnd, onRefresh])

  // Fetch classes for My Classes tab
  useEffect(() => {
    let cancelled = false
    setClassesLoading(true)
    fetch('/api/classes?myBookings=true', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const list: ClassItem[] = Array.isArray(data?.classes)
          ? data.classes.map((c: any) => ({
              id: c.id,
              title: c.title,
              subject: c.subject,
              tutorName: c.tutor?.name || 'Unknown Tutor',
              scheduledAt: c.scheduledAt,
              duration: c.duration || 60,
              type: c.type || 'online',
              students: c._count?.participants || 0,
              maxStudents: c.maxStudents || 50,
              isBooked: c.isBooked,
              requiresPayment: c.requiresPayment,
              price: c.price,
            }))
          : []
        setClasses(list)
        setClassesLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setClasses([])
        setClassesLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [onRefresh])

  const interactiveEvents = useMemo(() => {
    return events.map(ev => ({
      id: ev.id,
      title: ev.title,
      date: new Date(ev.start),
      duration: ev.duration,
      type: 'class' as const,
      status: 'scheduled' as const,
      subject: ev.subject,
      isOnline: true,
      description: ev.tutorName ? `Tutor: ${ev.tutorName}` : undefined,
      color: 'bg-blue-500',
    }))
  }, [events])

  return (
    <Card className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="pb-3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Sessions</span>
              <span className="sm:hidden">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
              <span className="sm:hidden">Calendar</span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          {/* My Calendar Tab */}
          <TabsContent value="calendar" className="mt-0 space-y-4">
            <InteractiveCalendar events={interactiveEvents} loading={loading} mode="student" />
          </TabsContent>

          {/* My Classes Tab */}
          <TabsContent value="classes" className="mt-0">
            {classesLoading ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Loading your classes...</p>
              </div>
            ) : classes.length === 0 ? (
              <div className="py-8 text-center">
                <BookOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground/60" />
                <p className="text-muted-foreground">You haven&apos;t booked any classes yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/student/courses">Browse Classes</Link>
                </Button>
              </div>
            ) : (
              <div className="max-h-[400px] space-y-3 overflow-y-auto">
                {classes.map(cls => (
                  <div
                    key={cls.id}
                    className="rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/70"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{cls.title}</h4>
                        <p className="text-sm text-muted-foreground">{cls.subject}</p>

                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {formatDate(cls.scheduledAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatEventTime(cls.scheduledAt)}
                          </span>
                          <span className={cn('flex items-center gap-1', 'text-primary')}>
                            {cls.type === 'online' ? (
                              <Video className="h-3 w-3" />
                            ) : (
                              <MapPin className="h-3 w-3" />
                            )}
                            {cls.type === 'online' ? 'Online' : 'In-Person'}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {cls.students}/{cls.maxStudents} students
                          </span>
                          <span>Tutor: {cls.tutorName}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/student/courses/${cls.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
