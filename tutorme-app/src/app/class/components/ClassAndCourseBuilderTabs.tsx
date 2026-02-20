'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

import { Video, Plus, Calendar, Trash2 } from 'lucide-react'

import { ClassRoomContent } from './ClassRoomContent'
import { CreateClassDialog } from '@/app/tutor/dashboard/components/CreateClassDialog'

interface UpcomingClass {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  maxStudents: number
  enrolledStudents: number
  status: string
}

interface ClassAndCourseBuilderTabsProps {
  initialTab: 'class'
  roomId: string | null
  courseId: string | null
}

export function ClassAndCourseBuilderTabs({
  roomId,
}: ClassAndCourseBuilderTabsProps) {
  const [showCreateClassDialog, setShowCreateClassDialog] = useState(false)
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([])
  const [loadingClasses, setLoadingClasses] = useState(true)

  // Load upcoming classes on mount
  useEffect(() => {
    fetch('/api/tutor/classes', { credentials: 'include' })
      .then(res => res.ok ? res.json() : { classes: [] })
      .then(data => setUpcomingClasses(data.classes ?? []))
      .catch(() => setUpcomingClasses([]))
      .finally(() => setLoadingClasses(false))
  }, [])

  const handleClassCreated = (classData?: { id: string; [key: string]: unknown }) => {
    if (classData) {
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
      setUpcomingClasses(prev => [newClass, ...prev])
      toast.success('Class created and added to upcoming classes!')
    }
  }

  const handleRemoveClass = async (classId: string) => {
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
        setUpcomingClasses(prev => prev.filter(c => c.id !== classId))
        toast.success('Class removed successfully')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Failed to remove class')
      }
    } catch {
      toast.error('Failed to remove class')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Header */}
      <div className="shrink-0 bg-slate-800 border-b border-slate-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-slate-300" />
            <span className="text-slate-200 font-medium">Class Room</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {roomId ? (
          <div className="flex-1 min-h-0 overflow-hidden">
            <ClassRoomContent roomId={roomId} embedded />
          </div>
        ) : (
          <div className="flex flex-col h-full p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  My Classes
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Your scheduled classes and quick actions
                </p>
              </div>
              <Button 
                onClick={() => setShowCreateClassDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create New Class
              </Button>
            </div>

            {loadingClasses ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 animate-pulse">
                    <div className="h-4 w-48 bg-slate-700 rounded mb-2" />
                    <div className="h-3 w-32 bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            ) : upcomingClasses.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    No Classes Yet
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Create your first class to get started with teaching.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => setShowCreateClassDialog(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Create New Class
                  </Button>
                  <Button variant="secondary" asChild className="w-full gap-2">
                    <Link href="/tutor/classes">
                      <Calendar className="h-4 w-4" />
                      My Scheduled Classes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {upcomingClasses.map((cls) => (
                  <Card key={cls.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{cls.title}</h3>
                            <p className="text-sm text-slate-400">
                              {cls.subject} • {new Date(cls.scheduledAt).toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500">
                              {cls.enrolledStudents}/{cls.maxStudents} students
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/class/${cls.id}`}>
                              Enter Room
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveClass(cls.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Class Dialog */}
      <CreateClassDialog
        open={showCreateClassDialog}
        onOpenChange={setShowCreateClassDialog}
        onClassCreated={handleClassCreated}
        redirectToClass={false}
      />
    </div>
  )
}
