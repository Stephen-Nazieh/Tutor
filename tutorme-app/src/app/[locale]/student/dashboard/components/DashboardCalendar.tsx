'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveCalendar } from '@/app/[locale]/tutor/dashboard/components/InteractiveCalendar'
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

  const interactiveEvents = useMemo(() => {
    return events.map((ev) => ({
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
            <InteractiveCalendar
              events={interactiveEvents}
              loading={loading}
              mode="student"
            />
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
