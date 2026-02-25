'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  CalendarDays, Clock, BookOpen, MapPin, Video, Users, Play, ChevronRight, Loader2
} from 'lucide-react'
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
  contents?: { id: string; subject: string; topic: string; progress: number; lastStudied?: string }[]
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
  gradeLevel?: string
  isBooked?: boolean
  requiresPayment?: boolean
  price?: number | null
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export function DashboardCalendar({
  initialEvents,
  onRefresh,
  contents = [],
  upcomingClasses = [],
  bookingClassId,
  onBookClass
}: DashboardCalendarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('calendar')
  const [month, setMonth] = useState<Date>(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
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
    fetch(`/api/student/calendar/events?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`, { credentials: 'include' })
      .then(r => r.json())
      .then((data) => {
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
    return () => { cancelled = true }
  }, [monthStart, monthEnd, onRefresh])

  // Fetch classes for My Classes tab
  useEffect(() => {
    let cancelled = false
    setClassesLoading(true)
    fetch('/api/classes?myBookings=true', { credentials: 'include' })
      .then(r => r.json())
      .then((data) => {
        if (cancelled) return
        const list: ClassItem[] = Array.isArray(data?.classes) ? data.classes.map((c: any) => ({
          id: c.id,
          title: c.title,
          subject: c.subject,
          tutorName: c.tutor?.name || 'Unknown Tutor',
          scheduledAt: c.scheduledAt,
          duration: c.duration || 60,
          type: c.type || 'online',
          students: c._count?.participants || 0,
          maxStudents: c.maxStudents || 50,
          gradeLevel: c.gradeLevel,
          isBooked: c.isBooked,
          requiresPayment: c.requiresPayment,
          price: c.price
        })) : []
        setClasses(list)
        setClassesLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setClasses([])
        setClassesLoading(false)
      })
    return () => { cancelled = true }
  }, [onRefresh])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const ev of events) {
      const key = toDateKey(new Date(ev.start))
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(ev)
    }
    return map
  }, [events])

  const eventsForMonth = useMemo(() => {
    return events.filter(ev => {
      const d = new Date(ev.start)
      return d >= monthStart && d <= monthEnd
    }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }, [events, monthStart, monthEnd])

  const selectedKey = selectedDate ? toDateKey(selectedDate) : null
  const eventsForSelectedDay = selectedKey ? (eventsByDay.get(selectedKey) || []).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()) : []

  const modifiers = useMemo(() => {
    const m: Record<string, Date[]> = {}
    for (const [key, list] of eventsByDay.entries()) {
      if (list.length > 0) {
        m[`day-${list.length}`] = m[`day-${list.length}`] || []
        m[`day-${list.length}`].push(new Date(key + 'T00:00:00'))
      }
    }
    return m
  }, [eventsByDay])

  const modifiersClassNames = useMemo(() => {
    const mc: Record<string, string> = {}
    for (let i = 1; i <= 5; i++) {
      mc[`day-${i}`] = 'bg-blue-100 text-blue-700 font-semibold rounded-full'
    }
    return mc
  }, [])

  const calendarClassNames = useMemo(() => ({
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse",
    head_row: "flex w-full mb-2",
    head_cell: "flex-1 h-8 flex items-center justify-center text-[0.7rem] font-medium text-muted-foreground",
    row: "flex w-full mt-1",
    cell: "flex-1 h-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    day: "w-9 h-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md mx-auto",
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "text-muted-foreground opacity-50",
    day_disabled: "text-muted-foreground opacity-50",
  }), [])

  // Continue Learning filtered data
  const inProgressContent = contents.filter(c => c.progress > 0 && c.progress < 100)

  return (
    <Card className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="pb-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">My Calendar</span>
              <span className="sm:hidden">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">My Classes</span>
              <span className="sm:hidden">Classes</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Continue</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Upcoming</span>
              <span className="sm:hidden">Soon</span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          {/* My Calendar Tab */}
          <TabsContent value="calendar" className="mt-0 space-y-4">
            <div className="calendar-single-letter-weekdays">
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="rounded-md border w-full p-4"
                classNames={calendarClassNames}
                disabled={loading}
                showOutsideDays={false}
                weekStartsOn={0}
              />
            </div>
            <style>{`
              .calendar-single-letter-weekdays .rdp-head_cell {
                font-size: 0.7rem;
                text-transform: uppercase;
              }
              .calendar-single-letter-weekdays .rdp-head_cell abbr {
                text-decoration: none;
              }
            `}</style>

            {/* Events List */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedDate
                  ? `Classes on ${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
                  : 'Classes this month'}
              </p>
              {loading ? (
                <p className="text-sm text-gray-500">Loading…</p>
              ) : (selectedDate ? eventsForSelectedDay : eventsForMonth).length === 0 ? (
                <p className="text-sm text-gray-500">
                  {selectedDate ? 'No classes on this day.' : 'No classes this month.'} Book a class from the classes page.
                </p>
              ) : (
                <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                  {(selectedDate ? eventsForSelectedDay : eventsForMonth).map((ev) => (
                    <li key={ev.id}>
                      <Link
                        href="/student/courses"
                        className="block p-3 rounded-lg border bg-gray-50/80 hover:bg-gray-100 transition-colors text-sm"
                      >
                        <span className="font-medium text-gray-900">{ev.title}</span>
                        <span className="text-gray-500 ml-1">· {ev.subject}</span>
                        <span className="text-gray-500 block text-xs mt-0.5">
                          {formatEventTime(ev.start)} – {formatEventTime(ev.end)}
                          {ev.tutorName ? ` · ${ev.tutorName}` : ''}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>

          {/* My Classes Tab */}
          <TabsContent value="classes" className="mt-0">
            {classesLoading ? (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">Loading your classes...</p>
              </div>
            ) : classes.length === 0 ? (
              <div className="py-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">You haven&apos;t booked any classes yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/student/courses">Browse Classes</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{cls.title}</h4>
                        <p className="text-sm text-gray-500">{cls.subject}</p>

                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {formatDate(cls.scheduledAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatEventTime(cls.scheduledAt)}
                          </span>
                          <span className={cn(
                            "flex items-center gap-1",
                            cls.type === 'online' ? 'text-green-600' : 'text-blue-600'
                          )}>
                            {cls.type === 'online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                            {cls.type === 'online' ? 'Online' : 'In-Person'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
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

          {/* Continue Learning Tab */}
          <TabsContent value="learning" className="mt-0">
            {inProgressContent.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-gray-700">No courses in progress</p>
                <p className="text-sm mt-1">Browse subjects and start learning.</p>
                <Link href="/student/courses?tab=browse">
                  <Button className="mt-4">Browse subjects</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {inProgressContent.slice(0, 5).map(content => (
                  <Link key={content.id} href={`/student/learn/${content.id}`}>
                    <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{content.topic}</h3>
                        <p className="text-sm text-gray-500">{content.subject}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={content.progress} className="h-2 flex-1" />
                          <span className="text-xs text-gray-500 w-10 text-right">{content.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
                {inProgressContent.length > 5 && (
                  <div className="text-center">
                    <Link href="/student/courses?tab=browse">
                      <Button variant="outline" size="sm">View all {inProgressContent.length} courses</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Classes Tab */}
          <TabsContent value="upcoming" className="mt-0">
            {upcomingClasses.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-gray-700">No upcoming classes</p>
                <p className="text-sm mt-1">View available classes to book.</p>
                <Link href="/student/courses">
                  <Button className="mt-4">View classes</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {upcomingClasses.map(cls => (
                  <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{cls.title}</h4>
                        {cls.isBooked && (
                          <Badge className="bg-green-100 text-green-800">Booked</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {cls.subject} • {formatDate(cls.scheduledAt)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <Users className="w-3 h-3" />
                        {cls.students}/{cls.maxStudents} students
                        {cls.price != null && cls.price > 0 && (
                          <span className="text-green-600 font-medium">SGD {cls.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    {!cls.isBooked && onBookClass && (
                      <Button
                        size="sm"
                        disabled={bookingClassId === cls.id || cls.students >= cls.maxStudents}
                        onClick={() => onBookClass(cls.id)}
                      >
                        {bookingClassId === cls.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : cls.students >= cls.maxStudents ? (
                          'Full'
                        ) : (
                          'Book'
                        )}
                      </Button>
                    )}
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
