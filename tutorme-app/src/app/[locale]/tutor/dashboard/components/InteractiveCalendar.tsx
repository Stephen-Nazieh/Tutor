'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// DnD Kit imports
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  MapPin,
  Video,
  MoreVertical,
  Edit,
  Trash2,
  AlertCircle,
  Filter,
  Bell,
  Repeat,
  X,
  CheckCircle2,
  AlertTriangle,
  GripVertical,
  CalendarPlus,
  RefreshCw,
  ExternalLink,
  Copy,
  Layers
} from 'lucide-react'

// Date manipulation
import { 
  addDays, 
  addWeeks, 
  format, 
  isSameDay, 
  startOfWeek,
  eachDayOfInterval,
  isWithinInterval
} from 'date-fns'

interface CalendarEvent {
  id: string
  title: string
  date: Date
  duration: number
  type: 'class' | 'office_hours' | 'personal' | 'deadline'
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  studentCount?: number
  maxStudents?: number
  subject?: string
  location?: string
  isOnline?: boolean
  description?: string
  color?: string
  isRecurring?: boolean
  recurringPattern?: 'daily' | 'weekly' | 'biweekly' | 'monthly'
}

interface AvailabilityBlock {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

interface CalendarConnection {
  id: string
  provider: 'google' | 'outlook' | 'apple'
  connected: boolean
  email?: string
  lastSynced?: Date
  syncEnabled: boolean
}

interface InteractiveCalendarProps {
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onDateClick?: (date: Date) => void
  onCreateClass?: (date: Date) => void
  onEventUpdate?: (event: CalendarEvent) => void
  loading?: boolean
}

const SUBJECTS = [
  { name: 'Mathematics', color: 'bg-blue-500' },
  { name: 'Physics', color: 'bg-purple-500' },
  { name: 'English', color: 'bg-green-500' },
  { name: 'Chemistry', color: 'bg-orange-500' },
  { name: 'Biology', color: 'bg-pink-500' },
  { name: 'History', color: 'bg-red-500' },
  { name: 'Office Hours', color: 'bg-gray-500' }
]

const generateDemoEvents = (): CalendarEvent[] => {
  const today = new Date()
  const events: CalendarEvent[] = []
  
  // Generate recurring weekly classes
  const recurringClasses = [
    { title: 'Advanced Mathematics', subject: 'Mathematics', duration: 60, students: 12, max: 20, day: 1, time: 14, color: 'bg-blue-500', isRecurring: true, pattern: 'weekly' as const },
    { title: 'Physics 101', subject: 'Physics', duration: 90, students: 8, max: 15, day: 2, time: 16, color: 'bg-purple-500', isRecurring: true, pattern: 'weekly' as const },
    { title: 'English Literature', subject: 'English', duration: 60, students: 15, max: 25, day: 3, time: 14, color: 'bg-green-500', isRecurring: true, pattern: 'weekly' as const },
    { title: 'Chemistry Lab', subject: 'Chemistry', duration: 120, students: 6, max: 10, day: 4, time: 15, color: 'bg-orange-500', isRecurring: true, pattern: 'weekly' as const },
    { title: 'Office Hours', subject: 'Office Hours', duration: 60, students: 0, max: 5, day: 5, time: 17, color: 'bg-gray-500', type: 'office_hours' as const, isRecurring: true, pattern: 'weekly' as const },
  ]
  
  // Generate 4 weeks of recurring classes
  for (let week = 0; week < 4; week++) {
    recurringClasses.forEach((cls, idx) => {
      const eventDate = new Date(today)
      eventDate.setDate(today.getDate() - today.getDay() + cls.day + (week * 7))
      eventDate.setHours(cls.time, 0, 0, 0)
      
      if (eventDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        events.push({
          id: `recurring-${week}-${idx}`,
          title: cls.title,
          date: eventDate,
          duration: cls.duration,
          type: cls.type || 'class',
          status: eventDate < today ? 'completed' : 'scheduled',
          studentCount: cls.students,
          maxStudents: cls.max,
          subject: cls.subject,
          isOnline: Math.random() > 0.3,
          description: `Regular ${cls.pattern} class session`,
          color: cls.color,
          isRecurring: cls.isRecurring,
          recurringPattern: cls.pattern
        })
      }
    })
  }
  
  // Add some one-time events
  events.push({
    id: 'special-1',
    title: 'Parent-Teacher Meeting',
    date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    duration: 60,
    type: 'personal',
    status: 'scheduled',
    subject: 'Office Hours',
    color: 'bg-red-500'
  })
  
  return events
}

const generateAvailability = (): AvailabilityBlock[] => [
  { id: '1', dayOfWeek: 1, startTime: '09:00', endTime: '12:00', isAvailable: true },
  { id: '2', dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isAvailable: true },
  { id: '3', dayOfWeek: 2, startTime: '09:00', endTime: '12:00', isAvailable: true },
  { id: '4', dayOfWeek: 2, startTime: '14:00', endTime: '18:00', isAvailable: true },
  { id: '5', dayOfWeek: 3, startTime: '09:00', endTime: '12:00', isAvailable: true },
  { id: '6', dayOfWeek: 3, startTime: '14:00', endTime: '18:00', isAvailable: true },
  { id: '7', dayOfWeek: 4, startTime: '09:00', endTime: '12:00', isAvailable: true },
  { id: '8', dayOfWeek: 4, startTime: '14:00', endTime: '18:00', isAvailable: true },
  { id: '9', dayOfWeek: 5, startTime: '09:00', endTime: '12:00', isAvailable: true },
  { id: '10', dayOfWeek: 5, startTime: '14:00', endTime: '17:00', isAvailable: true },
]

type CalendarView = 'month' | 'week' | 'day' | 'availability'

// Draggable Event Component
function DraggableEvent({ 
  event, 
  onClick, 
  hasConflict,
  style = {}
}: { 
  event: CalendarEvent
  onClick: () => void
  hasConflict?: boolean
  style?: React.CSSProperties
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
    data: { event }
  })

  const cssTransform = CSS.Transform.toString(transform)

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        transform: cssTransform,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab'
      }}
      className={cn(
        "absolute left-1 right-1 rounded p-2 cursor-pointer text-xs overflow-hidden group",
        event.color || 'bg-blue-500',
        event.status === 'cancelled' && "opacity-50",
        hasConflict && "ring-2 ring-red-500 ring-offset-1"
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{event.title}</p>
          <p className="text-white/80">
            {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <GripVertical className="w-3 h-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {hasConflict && (
        <AlertTriangle className="w-3 h-3 text-white absolute top-1 right-1" />
      )}
    </div>
  )
}

export function InteractiveCalendar({ 
  events: initialEvents, 
  onEventClick,
  onDateClick,
  onCreateClass,
  onEventUpdate,
  loading 
}: InteractiveCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents || generateDemoEvents())
  const [availability, setAvailability] = useState<AvailabilityBlock[]>(generateAvailability())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<CalendarView>('month')
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showConflictWarning, setShowConflictWarning] = useState<CalendarEvent[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  
  // New feature states
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [showCalendarIntegrations, setShowCalendarIntegrations] = useState(false)
  const [activeDragEvent, setActiveDragEvent] = useState<CalendarEvent | null>(null)
  const [calendarConnections, setCalendarConnections] = useState<CalendarConnection[]>([
    { id: '1', provider: 'google', connected: false, syncEnabled: true },
    { id: '2', provider: 'outlook', connected: false, syncEnabled: true },
    { id: '3', provider: 'apple', connected: false, syncEnabled: false },
  ])

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event: { active: { rect: { current: { translated: { left: number; top: number } | null } | null } | null } }) => {
        const { active } = event
        const node = active?.rect?.current?.translated
        return node ? { x: node.left, y: node.top } : { x: 0, y: 0 }
      },
    })
  )

  // Check for conflicts
  useEffect(() => {
    const conflicts: CalendarEvent[] = []
    events.forEach((event1, i) => {
      events.forEach((event2, j) => {
        if (i >= j) return
        if (event1.date.toDateString() === event2.date.toDateString()) {
          const start1 = event1.date.getTime()
          const end1 = start1 + event1.duration * 60000
          const start2 = event2.date.getTime()
          const end2 = start2 + event2.duration * 60000
          
          if ((start1 < end2 && end1 > start2)) {
            conflicts.push(event1, event2)
          }
        }
      })
    })
    
    const uniqueConflicts = Array.from(new Set(conflicts))
    if (uniqueConflicts.length > 0) {
      setShowConflictWarning(uniqueConflicts)
    }
  }, [events])

  // Upcoming notifications
  useEffect(() => {
    const upcoming = events.filter(e => {
      const timeDiff = e.date.getTime() - new Date().getTime()
      return timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000 && e.status === 'scheduled'
    })
    
    if (upcoming.length > 0) {
      setNotifications(upcoming.map(e => `${e.title} at ${e.date.toLocaleTimeString()}`))
    }
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSubject = subjectFilter === 'all' || event.subject === subjectFilter
      const matchesType = typeFilter === 'all' || event.type === typeFilter
      return matchesSubject && matchesType
    })
  }, [events, subjectFilter, typeFilter])

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December']

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days: (Date | null)[] = []
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }, [currentDate])

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    }).sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onDateClick?.(date)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    onEventClick?.(event)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString()
  }

  const toggleAvailability = (id: string) => {
    setAvailability(prev => prev.map(block => 
      block.id === id ? { ...block, isAvailable: !block.isAvailable } : block
    ))
  }

  // DnD Handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const draggedEvent = events.find(e => e.id === active.id)
    if (draggedEvent) {
      setActiveDragEvent(draggedEvent)
    }
  }, [events])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const draggedEvent = events.find(e => e.id === active.id)
      const dropData = over.data.current as { date?: Date; hour?: number } | undefined
      
      if (draggedEvent && dropData?.date) {
        const newDate = new Date(dropData.date)
        if (dropData.hour !== undefined) {
          newDate.setHours(dropData.hour, draggedEvent.date.getMinutes(), 0, 0)
        } else {
          newDate.setHours(draggedEvent.date.getHours(), draggedEvent.date.getMinutes(), 0, 0)
        }
        
        const updatedEvent = { ...draggedEvent, date: newDate }
        
        setEvents(prev => prev.map(e => e.id === draggedEvent.id ? updatedEvent : e))
        onEventUpdate?.(updatedEvent)
        toast.success(`Rescheduled: ${draggedEvent.title} to ${format(newDate, 'MMM d, h:mm a')}`)
      }
    }
    
    setActiveDragEvent(null)
  }, [events, onEventUpdate])

  // Calendar Integration Handlers
  const connectCalendar = (provider: 'google' | 'outlook' | 'apple') => {
    // In real implementation, this would open OAuth flow
    toast.loading(`Connecting to ${provider} calendar...`)
    
    // Simulate connection
    setTimeout(() => {
      setCalendarConnections(prev => prev.map(conn => 
        conn.provider === provider 
          ? { ...conn, connected: true, email: `tutor@${provider}.com`, lastSynced: new Date() }
          : conn
      ))
      toast.success(`Connected to ${provider} calendar!`)
    }, 1500)
  }

  const disconnectCalendar = (provider: string) => {
    setCalendarConnections(prev => prev.map(conn => 
      conn.provider === provider 
        ? { ...conn, connected: false, email: undefined, lastSynced: undefined }
        : conn
    ))
    toast.success(`Disconnected from ${provider}`)
  }

  const syncCalendars = () => {
    toast.loading('Syncing calendars...')
    setTimeout(() => {
      setCalendarConnections(prev => prev.map(conn => 
        conn.connected ? { ...conn, lastSynced: new Date() } : conn
      ))
      toast.success('Calendars synced!')
    }, 2000)
  }

  if (loading) {
    return (
      <Card className="h-[600px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                Calendar
                {notifications.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    <Bell className="w-3 h-3 mr-1" />
                    {notifications.length}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold min-w-[150px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Calendar Integrations */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCalendarIntegrations(true)}
              >
                <RefreshCw className={cn(
                  "w-4 h-4 mr-2",
                  calendarConnections.some(c => c.connected) && "text-green-500"
                )} />
                Sync
              </Button>

              {/* Batch Create */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowBatchModal(true)}
              >
                <Layers className="w-4 h-4 mr-2" />
                Batch
              </Button>

              {/* Filters */}
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-36">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {SUBJECTS.map(s => (
                    <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['month', 'week', 'day', 'availability'] as CalendarView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize",
                      view === v ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {v === 'availability' ? 'My Availability' : v}
                  </button>
                ))}
              </div>

              <Button onClick={() => onCreateClass?.(selectedDate || new Date())}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Conflict Warning Banner */}
          {showConflictWarning.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  {showConflictWarning.length / 2} scheduling conflicts detected
                </p>
                <p className="text-xs text-red-600">
                  Some classes overlap in time. Drag events to reschedule or click &quot;View&quot; to see conflicts.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setView('week')}>
                View
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowConflictWarning([])}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-sm flex-wrap">
            {SUBJECTS.map((subject) => (
              <button
                key={subject.name}
                onClick={() => setSubjectFilter(subjectFilter === subject.name ? 'all' : subject.name)}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full transition-colors",
                  subjectFilter === subject.name ? "bg-gray-200" : "hover:bg-gray-100"
                )}
              >
                <div className={cn("w-3 h-3 rounded-full", subject.color)} />
                <span>{subject.name}</span>
              </button>
            ))}
            {subjectFilter !== 'all' && (
              <Button variant="ghost" size="sm" onClick={() => setSubjectFilter('all')}>
                Clear Filter
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {view === 'month' && (
            <MonthView 
              days={calendarDays} 
              events={filteredEvents}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              isToday={isToday}
              getEventsForDate={getEventsForDate}
              conflicts={showConflictWarning}
            />
          )}

          {view === 'week' && (
            <WeekView 
              currentDate={currentDate} 
              events={filteredEvents} 
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              conflicts={showConflictWarning}
            />
          )}

          {view === 'day' && (
            <DayView 
              currentDate={currentDate} 
              events={filteredEvents}
              onEventClick={handleEventClick}
              conflicts={showConflictWarning}
            />
          )}

          {view === 'availability' && (
            <AvailabilityView 
              availability={availability}
              onToggle={toggleAvailability}
              onSave={() => {
                toast.success('Availability updated!')
                setView('month')
              }}
            />
          )}
        </CardContent>

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-lg">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                      <DialogDescription className="mt-1">
                        {selectedEvent.subject} • {selectedEvent.duration} minutes
                      </DialogDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn(selectedEvent.color || 'bg-blue-500')}>
                        {selectedEvent.type}
                      </Badge>
                      {selectedEvent.isRecurring && (
                        <Badge variant="outline" className="gap-1">
                          <Repeat className="w-3 h-3" />
                          {selectedEvent.recurringPattern}
                        </Badge>
                      )}
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        {selectedEvent.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedEvent.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(selectedEvent.date.getTime() + selectedEvent.duration * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.type === 'class' && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {selectedEvent.studentCount} / {selectedEvent.maxStudents} students enrolled
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedEvent.maxStudents && selectedEvent.studentCount && 
                           selectedEvent.maxStudents - selectedEvent.studentCount} spots remaining
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {selectedEvent.isOnline ? (
                      <Video className="w-5 h-5 text-gray-500" />
                    ) : (
                      <MapPin className="w-5 h-5 text-gray-500" />
                    )}
                    <p className="font-medium">
                      {selectedEvent.isOnline ? 'Online Class' : 'In-Person'}
                    </p>
                  </div>

                  {/* Conflict Warning in Detail */}
                  {showConflictWarning.find(e => e.id === selectedEvent.id) && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                      <AlertTriangle className="w-5 h-5" />
                      <span>This class has a scheduling conflict!</span>
                    </div>
                  )}
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                  {selectedEvent.isRecurring && (
                    <Button variant="outline">
                      <Repeat className="w-4 h-4 mr-2" />
                      Edit Series
                    </Button>
                  )}
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                    onClick={() => {
                      toast.success('Joining class...')
                      setSelectedEvent(null)
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Class
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Date Selection Dialog */}
        <Dialog open={!!selectedDate && !selectedEvent} onOpenChange={() => setSelectedDate(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </DialogTitle>
              <DialogDescription>
                {getEventsForDate(selectedDate || new Date()).length} events scheduled
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4">
              {getEventsForDate(selectedDate || new Date()).map((event) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedDate(null)
                    handleEventClick(event)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", event.color || 'bg-blue-500')} />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {showConflictWarning.find(e => e.id === event.id) && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
              
              {getEventsForDate(selectedDate || new Date()).length === 0 && (
                <p className="text-center text-gray-500 py-4">No events scheduled for this day</p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDate(null)}>
                Close
              </Button>
              <Button onClick={() => {
                onCreateClass?.(selectedDate || new Date())
                setSelectedDate(null)
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Calendar Integrations Modal */}
        <Dialog open={showCalendarIntegrations} onOpenChange={setShowCalendarIntegrations}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Calendar Integrations
              </DialogTitle>
              <DialogDescription>
                Sync your schedule with external calendars
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {calendarConnections.map((connection) => (
                <div 
                  key={connection.id}
                  className={cn(
                    "p-4 border rounded-lg transition-colors",
                    connection.connected ? "border-green-200 bg-green-50/50" : "border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        connection.provider === 'google' && "bg-blue-100 text-blue-600",
                        connection.provider === 'outlook' && "bg-blue-600 text-white",
                        connection.provider === 'apple' && "bg-gray-900 text-white"
                      )}>
                        {connection.provider === 'google' && <CalendarIcon className="w-5 h-5" />}
                        {connection.provider === 'outlook' && <ExternalLink className="w-5 h-5" />}
                        {connection.provider === 'apple' && <CalendarIcon className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{connection.provider} Calendar</p>
                        {connection.connected ? (
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected{connection.email && ` • ${connection.email}`}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">Not connected</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {connection.connected ? (
                        <>
                          <Switch 
                            checked={connection.syncEnabled}
                            onCheckedChange={(checked) => {
                              setCalendarConnections(prev => prev.map(c => 
                                c.id === connection.id ? { ...c, syncEnabled: checked } : c
                              ))
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => disconnectCalendar(connection.provider)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => connectCalendar(connection.provider)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {connection.connected && connection.lastSynced && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last synced: {format(connection.lastSynced, 'MMM d, h:mm a')}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowCalendarIntegrations(false)}>
                Close
              </Button>
              <Button onClick={syncCalendars} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Sync All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Batch Class Creation Modal */}
        <BatchClassModal 
          open={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          onCreate={(newEvents) => {
            setEvents(prev => [...prev, ...newEvents])
            toast.success(`Created ${newEvents.length} classes!`)
          }}
        />

        {/* Drag Overlay */}
        <DragOverlay>
          {activeDragEvent ? (
            <div className={cn(
              "p-2 rounded text-xs opacity-90 shadow-lg",
              activeDragEvent.color || 'bg-blue-500'
            )}>
              <p className="font-medium text-white">{activeDragEvent.title}</p>
            </div>
          ) : null}
        </DragOverlay>
      </Card>
    </DndContext>
  )
}

// Sub-components

function DroppableDay({ date, children, className }: { date: Date; children: React.ReactNode; className?: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${format(date, 'yyyy-MM-dd')}`,
    data: { date }
  })

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        className,
        isOver && "bg-blue-50 ring-2 ring-blue-400 ring-inset"
      )}
    >
      {children}
    </div>
  )
}

function DroppableHour({ date, hour, children, className }: { date: Date; hour: number; children?: React.ReactNode; className?: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `hour-${format(date, 'yyyy-MM-dd')}-${hour}`,
    data: { date, hour }
  })

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        className,
        isOver && "bg-blue-50/50"
      )}
    >
      {children}
    </div>
  )
}

function MonthView({ days, events, onDateClick, onEventClick, isToday, getEventsForDate, conflicts }: any) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {days.map((date: Date | null, index: number) => (
          <DroppableDay 
            key={index} 
            date={date || new Date()}
            className={cn(
              "min-h-[100px] p-2 border-r border-b last:border-r-0",
              !date && "bg-gray-50/50",
              date && "hover:bg-gray-50 cursor-pointer"
            )}
          >
            {date && (
              <div onClick={() => onDateClick(date)}>
                <div className={cn(
                  "text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full",
                  isToday(date) && "bg-blue-600 text-white"
                )}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {getEventsForDate(date).slice(0, 3).map((event: CalendarEvent) => {
                    const hasConflict = conflicts.find((e: CalendarEvent) => e.id === event.id)
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs p-1.5 rounded cursor-pointer truncate",
                          event.color || 'bg-blue-100',
                          event.status === 'cancelled' && "opacity-50 line-through",
                          hasConflict && "ring-1 ring-red-400"
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventClick(event)
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <div className={cn("w-1.5 h-1.5 rounded-full", event.color?.replace('bg-', 'bg-opacity-100 ') || 'bg-blue-500')} />
                          <span className="font-medium truncate">
                            {event.date.getHours()}:{event.date.getMinutes().toString().padStart(2, '0')} {event.title}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  {getEventsForDate(date).length > 3 && (
                    <p className="text-xs text-gray-500 pl-1">
                      +{getEventsForDate(date).length - 3} more
                    </p>
                  )}
                </div>
              </div>
            )}
          </DroppableDay>
        ))}
      </div>
    </div>
  )
}

function WeekView({ currentDate, events, onEventClick, onDateClick, conflicts }: any) {
  const weekStart = new Date(currentDate)
  weekStart.setDate(currentDate.getDate() - currentDate.getDay())
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + i)
    return day
  })

  const hours = Array.from({ length: 12 }, (_, i) => i + 8)

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <div className="w-16 border-r bg-gray-50">
        <div className="h-12 border-b" />
        {hours.map((hour) => (
          <div key={hour} className="h-16 border-b text-xs text-gray-500 text-center pt-2">
            {hour}:00
          </div>
        ))}
      </div>
      
      <div className="flex-1 grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div key={index} className="border-r last:border-r-0">
            <div 
              className="h-12 border-b p-2 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => onDateClick(day)}
            >
              <p className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <p className={cn("text-sm font-medium", day.toDateString() === new Date().toDateString() && "text-blue-600")}>
                {day.getDate()}
              </p>
            </div>
            <div className="relative">
              {hours.map((hour) => (
                <DroppableHour 
                  key={hour} 
                  date={day} 
                  hour={hour}
                  className="h-16 border-b"
                />
              ))}
              
              {events
                .filter((event: CalendarEvent) => event.date.toDateString() === day.toDateString())
                .map((event: CalendarEvent) => {
                  const hour = event.date.getHours()
                  const minute = event.date.getMinutes()
                  const top = (hour - 8) * 64 + (minute / 60) * 64
                  const height = (event.duration / 60) * 64
                  const hasConflict = conflicts.find((e: CalendarEvent) => e.id === event.id)
                  
                  return (
                    <DraggableEvent
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick(event)}
                      hasConflict={hasConflict}
                      style={{ top: `${top}px`, height: `${Math.max(height, 32)}px`, position: 'absolute' }}
                    />
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DayView({ currentDate, events, onEventClick, conflicts }: any) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7)
  
  const dayEvents = events.filter(
    (event: CalendarEvent) => event.date.toDateString() === currentDate.toDateString()
  ).sort((a: CalendarEvent, b: CalendarEvent) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <div className="w-20 border-r bg-gray-50">
        {hours.map((hour) => (
          <div key={hour} className="h-20 border-b px-2 py-2 text-sm text-gray-600 text-right">
            {hour}:00
          </div>
        ))}
      </div>
      
      <div className="flex-1 relative">
        {hours.map((hour) => (
          <DroppableHour 
            key={hour} 
            date={currentDate} 
            hour={hour}
            className="h-20 border-b"
          />
        ))}
        
        {dayEvents.map((event: CalendarEvent) => {
          const hour = event.date.getHours()
          const minute = event.date.getMinutes()
          const top = (hour - 7) * 80 + (minute / 60) * 80
          const height = (event.duration / 60) * 80
          const hasConflict = conflicts.find((e: CalendarEvent) => e.id === event.id)
          
          return (
            <DraggableEvent
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
              hasConflict={hasConflict}
              style={{ top: `${top}px`, height: `${Math.max(height, 40)}px`, position: 'absolute', left: '8px', right: '8px' }}
            />
          )
        })}
        
        {dayEvents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>No events scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AvailabilityView({ availability, onToggle, onSave }: any) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Set Your Availability</h3>
        <p className="text-sm text-blue-700">
          Mark when you&apos;re available for classes. Students will only be able to book during these times.
        </p>
      </div>
      
      <div className="space-y-4">
        {days.map((day, dayIndex) => (
          <div key={day} className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">{day}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availability
                .filter((block: AvailabilityBlock) => block.dayOfWeek === dayIndex + 1)
                .map((block: AvailabilityBlock) => (
                  <div
                    key={block.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      block.isAvailable 
                        ? "bg-green-50 border-green-200" 
                        : "bg-gray-50 border-gray-200 opacity-50"
                    )}
                    onClick={() => onToggle(block.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{block.startTime} - {block.endTime}</span>
                      {block.isAvailable ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onSave} className="bg-gradient-to-r from-green-600 to-emerald-600">
          Save Availability
        </Button>
      </div>
    </div>
  )
}

// Batch Class Creation Modal Component
interface BatchClassModalProps {
  open: boolean
  onClose: () => void
  onCreate: (events: CalendarEvent[]) => void
}

function BatchClassModal({ open, onClose, onCreate }: BatchClassModalProps) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('Mathematics')
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [startTime, setStartTime] = useState('14:00')
  const [duration, setDuration] = useState(60)
  const [recurringPattern, setRecurringPattern] = useState<'daily' | 'weekly' | 'biweekly'>('weekly')
  const [occurrences, setOccurrences] = useState(4)
  const [maxStudents, setMaxStudents] = useState(20)
  const [isOnline, setIsOnline] = useState(true)

  const handleCreate = () => {
    const newEvents: CalendarEvent[] = []
    const baseDate = new Date(startDate)
    const [hours, minutes] = startTime.split(':').map(Number)
    
    for (let i = 0; i < occurrences; i++) {
      const eventDate = new Date(baseDate)
      
      if (recurringPattern === 'daily') {
        eventDate.setDate(baseDate.getDate() + i)
      } else if (recurringPattern === 'weekly') {
        eventDate.setDate(baseDate.getDate() + (i * 7))
      } else if (recurringPattern === 'biweekly') {
        eventDate.setDate(baseDate.getDate() + (i * 14))
      }
      
      eventDate.setHours(hours, minutes, 0, 0)
      
      const subjectColor = SUBJECTS.find(s => s.name === subject)?.color || 'bg-blue-500'
      
      newEvents.push({
        id: `batch-${Date.now()}-${i}`,
        title: title || `${subject} Class`,
        date: eventDate,
        duration,
        type: 'class',
        status: 'scheduled',
        subject,
        maxStudents,
        studentCount: 0,
        isOnline,
        color: subjectColor,
        isRecurring: occurrences > 1,
        recurringPattern: occurrences > 1 ? recurringPattern : undefined
      })
    }
    
    onCreate(newEvents)
    onClose()
    
    // Reset form
    setTitle('')
    setOccurrences(4)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5" />
            Batch Create Classes
          </DialogTitle>
          <DialogDescription>
            Create multiple recurring classes at once
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class Title</Label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Advanced Math"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.filter(s => s.name !== 'Office Hours').map(s => (
                    <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Duration (min)</Label>
              <Input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={15}
                step={15}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Students</Label>
              <Input 
                type="number"
                value={maxStudents}
                onChange={(e) => setMaxStudents(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Occurrences</Label>
              <Input 
                type="number"
                value={occurrences}
                onChange={(e) => setOccurrences(Number(e.target.value))}
                min={1}
                max={52}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recurring Pattern</Label>
            <div className="flex gap-2">
              {(['weekly', 'biweekly', 'daily'] as const).map((pattern) => (
                <Button
                  key={pattern}
                  type="button"
                  variant={recurringPattern === pattern ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRecurringPattern(pattern)}
                  className="flex-1 capitalize"
                >
                  {pattern === 'biweekly' ? 'Bi-weekly' : pattern}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Online Class</span>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>

          <div className="p-3 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-900">Preview</p>
            <p className="text-blue-700">
              Will create <strong>{occurrences}</strong> {recurringPattern} classes 
              starting <strong>{format(new Date(startDate), 'MMM d, yyyy')}</strong>
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} className="gap-2">
            <Copy className="w-4 h-4" />
            Create {occurrences} Classes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
