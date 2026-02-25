'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, 
  Copy, 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Video,
  Play,
  Clock,
  Users,
  Calendar,
  CalendarDays,
  List,
  Zap,
  ChevronRight,
  MoreVertical
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { formatClassTime } from '@/lib/format-class-time'
import { cn } from '@/lib/utils'

interface TutorClass {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  maxStudents: number
  enrolledStudents: number
  status: 'scheduled' | 'live' | 'completed' | 'cancelled' | 'upcoming' | 'active'
}

type FilterStatus = 'all' | 'live' | 'upcoming' | 'scheduled' | 'past'

function copyJoinLink(classId: string) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/tutor/live-class/${classId}` : ''
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast.success('Join link copied to clipboard'))
  }
}

function getTimeRemaining(scheduledAt: string): string {
  const now = new Date()
  const scheduled = new Date(scheduledAt)
  const diffMs = scheduled.getTime() - now.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 0) return 'Started'
  if (diffMins < 60) return `in ${diffMins} min`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `in ${diffHours} hr`
  const diffDays = Math.floor(diffHours / 24)
  return `in ${diffDays} days`
}

export default function TutorClassesPage() {
  const router = useRouter()
  const [classes, setClasses] = useState<TutorClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarEvents, setCalendarEvents] = useState<Array<{
    id: string
    title: string
    subject: string
    scheduledAt: string
    duration: number
    status: string
  }>>([])

  useEffect(() => {
    fetch('/api/tutor/classes', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load classes')
        return res.json()
      })
      .then((data) => {
        setClasses(data.classes ?? [])
        setError(null)
      })
      .catch(() => setError('Failed to load classes'))
      .finally(() => setLoading(false))
  }, [])

  // Fetch calendar events when month changes
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const start = new Date(year, month, 1).toISOString()
      const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString()
      
      try {
        const res = await fetch(`/api/tutor/calendar/events?start=${start}&end=${end}`, {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setCalendarEvents(data.events || [])
        }
      } catch {
        // Silent fail for calendar
      }
    }
    fetchCalendarEvents()
  }, [currentDate])

  // Categorize classes
  const categorizedClasses = useMemo(() => {
    const now = new Date()
    
    return classes.reduce((acc, cls) => {
      const scheduled = new Date(cls.scheduledAt)
      const isLive = cls.status === 'live' || (scheduled <= now && scheduled.getTime() + (cls.duration * 60000) > now.getTime())
      const isPast = scheduled.getTime() + (cls.duration * 60000) < now.getTime() || cls.status === 'completed'
      const isUpcoming = scheduled > now && scheduled.getTime() - now.getTime() < 24 * 60 * 60 * 1000 // Within 24 hours
      
      if (isLive) {
        acc.live.push(cls)
      } else if (isPast) {
        acc.past.push(cls)
      } else if (isUpcoming) {
        acc.upcoming.push(cls)
      } else {
        acc.scheduled.push(cls)
      }
      return acc
    }, {
      live: [] as TutorClass[],
      upcoming: [] as TutorClass[],
      scheduled: [] as TutorClass[],
      past: [] as TutorClass[]
    })
  }, [classes])

  // Filter classes based on search and status filter
  const filteredClasses = useMemo(() => {
    let filtered = classes
    
    if (filterStatus !== 'all') {
      const categoryMap: Record<string, TutorClass[]> = {
        live: categorizedClasses.live,
        upcoming: categorizedClasses.upcoming,
        scheduled: categorizedClasses.scheduled,
        past: categorizedClasses.past
      }
      filtered = categoryMap[filterStatus] || classes
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(cls => 
        cls.title.toLowerCase().includes(query) ||
        cls.subject.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [classes, filterStatus, categorizedClasses, searchQuery])

  const handleCreateInstantClass = async () => {
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/class/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: 'Instant Live Class',
          subject: 'General',
          gradeLevel: 'mixed',
          maxStudents: 50,
          duration: 60,
          scheduledAt: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Instant class created!')
        router.push(`/tutor/live-class/${data.room.id}`)
      } else {
        toast.error('Failed to create instant class')
      }
    } catch (error) {
      toast.error('Failed to create instant class')
    }
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()
    
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const getEventsForDay = (day: number) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.scheduledAt)
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderClassCard = (cls: TutorClass, isLive: boolean = false, isUpcoming: boolean = false) => {
    const time = formatClassTime(cls.scheduledAt)
    const timeRemaining = getTimeRemaining(cls.scheduledAt)
    
    return (
      <div
        key={cls.id}
        className={cn(
          "flex items-center justify-between p-4 border rounded-lg transition-colors",
          isLive ? "bg-red-50 border-red-200" : "hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            isLive ? "bg-red-100" : isUpcoming ? "bg-yellow-100" : "bg-blue-100"
          )}>
            {isLive ? (
              <Video className="w-6 h-6 text-red-600" />
            ) : (
              <BookOpen className={cn(
                "w-6 h-6",
                isUpcoming ? "text-yellow-600" : "text-blue-600"
              )} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{cls.title}</h3>
              {isLive && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  🔴 LIVE
                </Badge>
              )}
              {isUpcoming && !isLive && (
                <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                  ⏰ {timeRemaining}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {cls.subject} • {time.formatted}
              {time.relative && !isLive && !isUpcoming && (
                <span className="text-blue-600 font-medium"> • {time.relative}</span>
              )}
            </p>
            <p className="text-xs text-gray-400">
              <Users className="w-3 h-3 inline mr-1" />
              {cls.enrolledStudents}/{cls.maxStudents} students
              {cls.duration > 0 && (
                <>
                  <Clock className="w-3 h-3 inline mx-1" />
                  {cls.duration} min
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyJoinLink(cls.id)}
            title="Copy join link"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Link href={`/tutor/live-class/${cls.id}`}>
            <Button 
              size="sm" 
              className={cn(
                isLive && "bg-red-600 hover:bg-red-700"
              )}
            >
              {isLive ? (
                <>
                  <Play className="w-4 h-4 mr-1" /> Enter
                </>
              ) : isUpcoming ? (
                <>
                  <Zap className="w-4 h-4 mr-1" /> Prepare
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-1" /> View
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600">
                TutorMe
              </Link>
              <Button variant="ghost" size="sm" onClick={() => router.push('/tutor/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
              </Button>
            </div>
            <div className="flex items-center">
              <UserNav />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Classes</h1>
            <p className="text-sm text-gray-500">
              Manage your classes and start live sessions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateInstantClass}>
              <Zap className="w-4 h-4 mr-2" /> Instant Class
            </Button>
            <Link href="/tutor/dashboard?create=1">
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Create Class
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center justify-between">
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'calendar')} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list" className="gap-2">
                <List className="w-4 h-4" /> List
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2">
                <CalendarDays className="w-4 h-4" /> Calendar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'live', 'upcoming', 'scheduled', 'past'] as FilterStatus[]).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === 'live' && categorizedClasses.live.length > 0 && (
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />
                )}
                {status}
                {status !== 'all' && (
                  <span className="ml-1 text-xs opacity-70">
                    ({categorizedClasses[status]?.length || 0})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : classes.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No classes yet</h3>
                <p className="text-sm text-gray-500 mb-4">Create your first class to get started</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={handleCreateInstantClass}>
                    <Zap className="w-4 h-4 mr-2" /> Start Instant Class
                  </Button>
                  <Link href="/tutor/dashboard?create=1">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" /> Schedule Class
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* LIVE NOW Section */}
            {categorizedClasses.live.length > 0 && filterStatus !== 'scheduled' && filterStatus !== 'past' && (
              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    🔴 Live Now ({categorizedClasses.live.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categorizedClasses.live.map((cls) => renderClassCard(cls, true))}
                </CardContent>
              </Card>
            )}

            {/* UPCOMING Section */}
            {categorizedClasses.upcoming.length > 0 && filterStatus !== 'live' && filterStatus !== 'past' && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    ⏰ Starting Soon ({categorizedClasses.upcoming.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categorizedClasses.upcoming.map((cls) => renderClassCard(cls, false, true))}
                </CardContent>
              </Card>
            )}

            {/* SCHEDULED Section */}
            {(filterStatus === 'all' || filterStatus === 'scheduled') && categorizedClasses.scheduled.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    📅 Scheduled ({categorizedClasses.scheduled.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categorizedClasses.scheduled.map((cls) => renderClassCard(cls))}
                </CardContent>
              </Card>
            )}

            {/* PAST Section */}
            {(filterStatus === 'all' || filterStatus === 'past') && categorizedClasses.past.length > 0 && (
              <Card className="opacity-75">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-5 h-5" />
                    Past Classes ({categorizedClasses.past.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categorizedClasses.past.map((cls) => renderClassCard(cls))}
                </CardContent>
              </Card>
            )}

            {/* Empty State for Filtered Results */}
            {filteredClasses.length === 0 && classes.length > 0 && (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No classes match your filter</p>
                <Button variant="outline" className="mt-2" onClick={() => {setFilterStatus('all'); setSearchQuery('')}}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                ← Prev
              </Button>
              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                Next →
              </Button>
            </div>

            {/* Calendar Grid */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="h-24" />
                    }
                    const dayEvents = getEventsForDay(day)
                    const isToday = new Date().getDate() === day && 
                                    new Date().getMonth() === currentDate.getMonth() &&
                                    new Date().getFullYear() === currentDate.getFullYear()
                    return (
                      <div 
                        key={day} 
                        className={cn(
                          "h-24 border rounded-lg p-2 overflow-hidden",
                          isToday && "bg-blue-50 border-blue-300"
                        )}
                      >
                        <div className={cn(
                          "text-sm font-medium mb-1",
                          isToday && "text-blue-600"
                        )}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <Link 
                              key={event.id} 
                              href={`/tutor/live-class/${event.id}`}
                              className="block text-xs p-1 bg-blue-100 rounded truncate hover:bg-blue-200"
                            >
                              {event.title}
                            </Link>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events List */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {calendarEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No classes scheduled this month</p>
                ) : (
                  calendarEvents.slice(0, 5).map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.scheduledAt).toLocaleDateString()} • {event.subject}
                        </p>
                      </div>
                      <Link href={`/tutor/live-class/${event.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
