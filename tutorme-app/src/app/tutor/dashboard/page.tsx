'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Plus, Settings, BookOpen, Library, ChevronRight, Sparkles, Video } from 'lucide-react'
import { toast } from 'sonner'

import {
  CreateClassDialog,
  CreateCourseDialog,
  StatsCards,
  UpcomingClassesCard,
  StudentsNeedingAttentionCard,
  InteractiveCalendar,
  type UpcomingClass,
  type StudentNeedingAttention,
} from './components'
import { StudentProgressCard } from './components/StudentProgressCard'
import { ModernHeroSection } from './components/ModernHeroSection'
import { GlassCard } from './components/GlassCard'

// Loading fallback for Suspense
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

const defaultStats = {
  totalClasses: 0,
  totalStudents: 0,
  upcomingClasses: 0,
  earnings: 0,
  currency: 'SGD' as string,
}

// Inner component that uses searchParams
function TutorDashboardContent() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false)
  
  useEffect(() => {
    if (searchParams.get('create') === '1') setShowCreateDialog(true)
    if (searchParams.get('course') === '1') setShowCreateCourseDialog(true)
  }, [searchParams])
  const [stats, setStats] = useState(defaultStats)
  const [classes, setClasses] = useState<UpcomingClass[]>([])
  const [students, setStudents] = useState<StudentNeedingAttention[]>([])
  const [allStudents, setAllStudents] = useState<Array<{ id: string; name: string; email: string; courseCount: number; classCount: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!session?.user?.id) return
    setError(null)
    try {
      const [statsRes, classesRes, studentsRes, allStudentsRes] = await Promise.all([
        fetch('/api/tutor/stats', { credentials: 'include' }),
        fetch('/api/tutor/classes', { credentials: 'include' }),
        fetch('/api/tutor/students-needing-attention', { credentials: 'include' }),
        fetch('/api/tutor/students', { credentials: 'include' }),
      ])
      if (statsRes.ok) {
        const d = await statsRes.json()
        setStats({
          totalClasses: d.totalClasses ?? 0,
          totalStudents: d.totalStudents ?? 0,
          upcomingClasses: d.upcomingClasses ?? 0,
          earnings: d.earnings ?? 0,
          currency: d.currency ?? 'SGD',
        })
      }
      if (classesRes.ok) {
        const d = await classesRes.json()
        setClasses(d.classes ?? [])
      }
      if (studentsRes.ok) {
        const d = await studentsRes.json()
        setStudents(d.students ?? [])
      }
      if (allStudentsRes.ok) {
        const d = await allStudentsRes.json()
        setAllStudents(d.students ?? [])
      }
      if (!statsRes.ok || !classesRes.ok) {
        setError('Failed to load dashboard data')
      }
    } catch {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [session?.user?.id, fetchData])

  const handleClassCreated = useCallback((classData?: { id: string; [key: string]: unknown }) => {
    if (classData) {
      // Add the new class to the list immediately
      const newClass: UpcomingClass = {
        id: classData.id,
        title: (classData.title as string) || 'New Class',
        subject: (classData.subject as string) || '',
        scheduledAt: (classData.scheduledAt as string) || new Date().toISOString(),
        duration: (classData.durationMinutes as number) || 60,
        maxStudents: (classData.maxStudents as number) || 50,
        enrolledStudents: 0,
        status: (classData.status as string) || 'scheduled',
      }
      setClasses(prev => [newClass, ...prev])
      // Update stats
      setStats(prev => ({
        ...prev,
        totalClasses: prev.totalClasses + 1,
        upcomingClasses: prev.upcomingClasses + 1,
      }))
    } else {
      fetchData()
    }
  }, [fetchData])

  const handleRemoveClass = useCallback(async (classId: string) => {
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
      })

      if (res.ok) {
        setClasses(prev => prev.filter(c => c.id !== classId))
        setStats(prev => ({
          ...prev,
          totalClasses: Math.max(0, prev.totalClasses - 1),
          upcomingClasses: Math.max(0, prev.upcomingClasses - 1),
        }))
        toast.success('Class removed successfully')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to remove class')
      }
    } catch {
      toast.error('Failed to remove class')
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Hero Section */}
        <div className="mb-8">
          <ModernHeroSection 
            stats={stats} 
            loading={loading} 
            onScheduleClass={() => setShowCreateDialog(true)}
            onCreateCourse={() => setShowCreateCourseDialog(true)}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
            {error}
            <Button variant="outline" size="sm" className="ml-2" onClick={() => { setLoading(true); fetchData(); }}>
              Retry
            </Button>
          </div>
        )}

        {/* Modern Grid Layout - Full Width */}
        <div className="space-y-6">
            <UpcomingClassesCard
              classes={classes}
              formatDate={formatDate}
              loading={loading}
              onCreateClassClick={() => setShowCreateDialog(true)}
              onRemoveClass={handleRemoveClass}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <GlassCard 
                  title="Course Catalogue" 
                  icon={Library}
                  gradient="blue"
                  action={
                    <Link href="/curriculum">
                      <Button variant="ghost" size="sm">
                        View
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  }
                >
                  <p className="text-sm text-gray-600 mb-4">
                    Browse and manage your courses. Create new courses, then configure curriculum, groups, and schedule for each.
                  </p>
                  <Link href="/curriculum">
                    <Button variant="outline" className="w-full">
                      <Library className="w-4 h-4 mr-2" />
                      Open Course Catalogue
                    </Button>
                  </Link>
                </GlassCard>
              </div>

              <div className="lg:col-span-2">
                <StudentsNeedingAttentionCard students={students} loading={loading} />
              </div>
            </div>

            <StudentProgressCard loading={loading} />
            
            {/* Interactive Calendar */}
            <InteractiveCalendar 
              onEventClick={(event) => console.log('Event clicked:', event)}
              onDateClick={(date) => console.log('Date clicked:', date)}
              onCreateClass={(date) => setShowCreateDialog(true)}
              loading={loading}
            />

        {/* Create Class Dialog */}
        <CreateClassDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onClassCreated={handleClassCreated}
          redirectToClass={false}
        />

        {/* Create Course Dialog */}
        <CreateCourseDialog
          open={showCreateCourseDialog}
          onOpenChange={setShowCreateCourseDialog}
        />
      </div>
    </div>
  )
}

// Main export wrapped in Suspense
export default function TutorDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <TutorDashboardContent />
    </Suspense>
  )
}
