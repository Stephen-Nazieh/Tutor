'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Video,
  Plus
} from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface ModernHeroSectionProps {
  stats?: {
    totalClasses: number
    totalStudents: number
    upcomingClasses: number
    earnings: number
    currency: string
  }
  loading?: boolean
  onCreateCourse?: () => void
}

interface ClassEvent {
  id: string
  title: string
  time: string
  duration: number
  subject: string
}

export function ModernHeroSection({ stats, loading, onCreateCourse }: ModernHeroSectionProps) {
  const { data: session } = useSession()
  const [greeting, setGreeting] = useState('Good morning')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<{date: Date, events: ClassEvent[]} | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Generate mock class events for the 7-day calendar
  const generateClassEvents = (date: Date): ClassEvent[] => {
    const dayOfWeek = date.getDay()
    const events: ClassEvent[] = []
    
    // Add some scheduled classes based on day
    if (dayOfWeek === 1 || dayOfWeek === 3) {
      events.push({ id: '1', title: 'Mathematics', time: '3:00 PM - 4:00 PM', duration: 60, subject: 'Mathematics' })
    }
    if (dayOfWeek === 2 || dayOfWeek === 4) {
      events.push({ id: '2', title: 'Physics', time: '2:00 PM - 3:30 PM', duration: 90, subject: 'Physics' })
    }
    if (dayOfWeek === 5) {
      events.push({ id: '3', title: 'Chemistry', time: '10:00 AM - 11:00 AM', duration: 60, subject: 'Chemistry' })
    }
    
    return events
  }

  const handleDayClick = (date: Date) => {
    const events = generateClassEvents(date)
    setSelectedDay({ date, events })
  }

  const getDayClasses = (date: Date): ClassEvent[] => {
    return generateClassEvents(date)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-secondary to-card p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted/70 rounded w-1/4" />
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted/60 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-secondary to-card p-8 shadow-2xl border border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-1000 opacity-50" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-secondary/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-2000 opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm font-medium">
                {greeting}, @{session?.user?.name || session?.user?.email?.split('@')[0] || 'Tutor'}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* One Week Calendar Schedule */}
        <div className="grid grid-cols-7 gap-2 mb-8 bg-card/70 backdrop-blur-md border border-border rounded-2xl p-4 shadow-2xl">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentTime);
            d.setDate(currentTime.getDate() + i);
            const dayClasses = getDayClasses(d);
            const hasClasses = dayClasses.length > 0;
            
            return (
              <div 
                key={i} 
                onClick={() => handleDayClick(d)}
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
                {/* Show class times instead of dots */}
                <div className="flex flex-col items-center mt-2 gap-0.5">
                  {dayClasses.slice(0, 1).map((cls, idx) => (
                    <span key={idx} className="text-[10px] text-primary font-medium">
                      {cls.time}
                    </span>
                  ))}
                  {dayClasses.length > 1 && (
                    <span className="text-[8px] text-muted-foreground">+{dayClasses.length - 1} more</span>
                  )}
                  {!hasClasses && (
                    <div className="flex gap-1 h-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Detail Modal */}
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
                    <p className="text-sm text-muted-foreground">{event.time} • {event.duration} min</p>
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

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg border-0"
            onClick={onCreateCourse}
          >
            <Award className="w-4 h-4 mr-2" />
            Create Course
          </Button>
          <Button
            variant="outline"
            className="text-foreground border-border bg-card/60 hover:bg-muted/60"
            onClick={() => toast.info('Coming soon...')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Class
          </Button>
          <Button
            variant="outline"
            className="text-foreground border-border bg-card/60 hover:bg-muted/60"
            onClick={() => toast.info('Coming soon...')}
          >
            <Video className="w-4 h-4 mr-2" />
            Go Live
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Next class in 2h 15m</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: any
  label: string
  value: string | number
  sublabel?: string
  trend?: string
  trendUp?: boolean
  color: string
}

function StatCard({ icon: Icon, label, value, sublabel, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur-md border border-border p-4 hover:bg-muted/60 transition-all cursor-pointer shadow-2xl">
      <div className={cn("absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-20 rounded-bl-full", color)} />
      <div className="relative">
        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3", color)}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <p className="text-muted-foreground text-xs font-medium mb-1">{label}</p>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {sublabel && (
            <p className="text-muted-foreground text-xs">{sublabel}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trendUp ? "text-primary" : "text-destructive"
            )}>
              <TrendingUp className={cn("w-3 h-3 mr-0.5", !trendUp && "rotate-180")} />
              {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
