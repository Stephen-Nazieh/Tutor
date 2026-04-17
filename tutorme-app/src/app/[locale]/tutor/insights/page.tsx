'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { CourseBuilderInsightsRoute } from '../courses/components/CourseBuilderInsightsRoute'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Wrench } from 'lucide-react'
import { toast } from 'sonner'
import { useSocket } from '@/hooks/use-socket'
import type { LiveTask } from '@/lib/socket'
import type { LiveStudent, EngagementMetrics } from '@/types/live-session'

interface CourseSummary {
  id: string
  name: string
  updatedAt: string
}

interface InsightsSessionOption {
  id: string
  title: string
  subject: string
  scheduledAt: string
  status: string
}

export default function TutorInsightsPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<CourseSummary[]>([])
  const [courseId, setCourseId] = useState<string | null>(null)
  const [detachedCourseName, setDetachedCourseName] = useState('Course')
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<InsightsSessionOption[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [linkedCourseId, setLinkedCourseId] = useState<string | null>(null)
  const [liveTasks, setLiveTasks] = useState<LiveTask[]>([])
  const [students, setStudents] = useState<LiveStudent[]>([])
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [classDuration, setClassDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDurationSeconds, setRecordingDurationSeconds] = useState(0)
  const courseIdFromQuery = searchParams.get('courseId')

  useEffect(() => {
    if (!isRecording) {
      setRecordingDurationSeconds(0)
      return
    }
    const interval = setInterval(() => {
      setRecordingDurationSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  const persistRecordingState = useCallback(
    async (recording: boolean) => {
      if (!sessionId) return
      await fetch(`/api/tutor/live-sessions/${sessionId}/recording`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          isRecording: recording,
          recordingUrl: null, // Insights only tracks state
        }),
      })
    },
    [sessionId]
  )

  const generateReplayArtifact = useCallback(async () => {
    if (!sessionId) return
    const response = await fetch(`/api/tutor/live-sessions/${sessionId}/replay-artifact/generate`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Replay artifact generation failed')
    }
  }, [sessionId])

  const handleToggleRecording = useCallback(async () => {
    try {
      if (isRecording) {
        setIsRecording(false)
        await persistRecordingState(false)
        toast.success('Recording stopped. Building transcript and AI lesson summary...')
        await generateReplayArtifact()
        toast.success('Replay artifact ready')
        return
      }

      setIsRecording(true)
      setRecordingDurationSeconds(0)
      await persistRecordingState(true)
      toast.success('Recording started')
    } catch (error) {
      setIsRecording(false)
      setRecordingDurationSeconds(0)
      toast.error(error instanceof Error ? error.message : 'Recording action failed')
    }
  }, [generateReplayArtifact, isRecording, persistRecordingState])

  useEffect(() => {
    if (!sessionId) {
      setStudents([])
      setMetrics(null)
      setClassDuration(0)
      return
    }
    // Optional: Fetch live class details (students, metrics) if needed
    // For now, initializing with empty/defaults to satisfy props
  }, [sessionId])

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (!res.ok) {
          // Only set draft if we don't have a session that will give us the courseId
          if (!searchParams.get('sessionId')) {
            setCourseId('insights-draft')
            setDetachedCourseName('Insights Builder')
          }
          return
        }
        const data = await res.json()
        const courseList = (data.courses || []) as CourseSummary[]
        setCourses(courseList)

        // Check if we have a sessionId that will give us a courseId
        const hasSessionInUrl = !!searchParams.get('sessionId')
        const hasCourseInUrl = !!courseIdFromQuery

        if (courseList.length > 0) {
          const sorted = [...courseList].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )

          // Only set a default course if we don't have a specific session
          if (!hasSessionInUrl && !hasCourseInUrl) {
            setCourseId(prev => prev ?? sorted[0].id)
            setDetachedCourseName(sorted[0].name)
          }
        } else if (!hasSessionInUrl) {
          // No courses found and no session, use default
          setCourseId('insights-draft')
          setDetachedCourseName('Insights Builder')
        }
      } catch (error) {
        if (!searchParams.get('sessionId')) {
          setCourseId('insights-draft')
          setDetachedCourseName('Insights Builder')
        }
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [courseIdFromQuery, searchParams])

  useEffect(() => {
    if (!courseIdFromQuery) return
    setCourseId(courseIdFromQuery)
    const match = courses.find(course => course.id === courseIdFromQuery)
    if (match) setDetachedCourseName(match.name)
  }, [courseIdFromQuery, courses])

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const querySessionId = searchParams.get('sessionId')
        // Set sessionId from query immediately if present
        if (querySessionId) {
          setSessionId(querySessionId)
        }

        const res = await fetch('/api/tutor/classes', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load sessions')
        const data = await res.json()
        const classSessions = (data.classes || []) as InsightsSessionOption[]
        setSessions(classSessions)

        const activeSession = classSessions.find(item => item.status === 'active')

        if (querySessionId && classSessions.some(s => s.id === querySessionId)) {
          // Already set, but confirming it exists in the list
          setSessionId(querySessionId)
        } else if (!querySessionId) {
          if (activeSession) {
            setSessionId(prev => prev ?? activeSession.id)
          } else if (classSessions.length > 0) {
            setSessionId(prev => prev ?? classSessions[0].id)
          }
        }
      } catch (error) {
        toast.error('Failed to load live classes')
      }
    }

    loadSessions()
  }, [searchParams])

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    const loadLinkedCourse = async () => {
      try {
        const res = await fetch(`/api/tutor/classes/${sessionId}`, { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setLinkedCourseId(data?.session?.linkedCourseId || null)
      } catch {
        // Ignore; keep existing selection
      }
    }
    loadLinkedCourse()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  useEffect(() => {
    if (!linkedCourseId) return
    const sessionParam = searchParams.get('sessionId')
    if (sessionParam) {
      setCourseId(linkedCourseId)
    } else {
      setCourseId(prev => {
        if (prev && prev !== 'insights-draft' && prev !== linkedCourseId) return prev
        return linkedCourseId
      })
    }
    const match = courses.find(course => course.id === linkedCourseId)
    if (match) setDetachedCourseName(match.name)
  }, [courses, linkedCourseId, searchParams])

  useEffect(() => {
    setLiveTasks([])
  }, [sessionId])

  const socketOptions = useMemo(() => {
    if (!sessionId || !session?.user?.id) return undefined
    return {
      roomId: sessionId,
      userId: session.user.id,
      name: session.user.name || 'Tutor',
      role: 'tutor' as const,
      onRoomState: (state: { tasks?: LiveTask[] }) => {
        if (state.tasks) {
          setLiveTasks(state.tasks)
        }
      },
    }
  }, [session?.user?.id, session?.user?.name, sessionId])

  const { socket } = useSocket(socketOptions)

  useEffect(() => {
    if (!socket) return

    const handleTaskDeployed = (task: LiveTask) => {
      setLiveTasks(prev => {
        const exists = prev.some(item => item.id === task.id)
        if (exists) {
          return prev.map(item => (item.id === task.id ? { ...item, ...task } : item))
        }
        return [...prev, task]
      })
    }

    const handleTaskUpdated = (payload: { task: LiveTask }) => {
      setLiveTasks(prev => prev.map(item => (item.id === payload.task.id ? payload.task : item)))
    }

    socket.on('task:deployed', handleTaskDeployed)
    socket.on('task:updated', handleTaskUpdated)

    return () => {
      socket.off('task:deployed', handleTaskDeployed)
      socket.off('task:updated', handleTaskUpdated)
    }
  }, [socket])

  const handleDeployTask = (task: LiveTask) => {
    if (!socket || !sessionId) return
    socket.emit('task:deploy', { roomId: sessionId, task })
  }

  const handleSendPoll = (payload: { taskId: string; question: string }) => {
    if (!socket || !sessionId) return
    socket.emit('insight:send', {
      roomId: sessionId,
      taskId: payload.taskId,
      type: 'poll',
      prompt: payload.question,
    })
  }

  const handleSendQuestion = (payload: { taskId: string; prompt: string }) => {
    if (!socket || !sessionId) return
    socket.emit('insight:send', {
      roomId: sessionId,
      taskId: payload.taskId,
      type: 'question',
      prompt: payload.prompt,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="mx-auto max-w-xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <Wrench className="h-8 w-8 text-blue-500" />
                <div>
                  <h1 className="text-lg font-semibold">Opening Insights…</h1>
                  <p className="text-muted-foreground text-sm">Loading your latest course.</p>
                </div>
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <Wrench className="h-8 w-8 text-blue-500" />
                <div>
                  <h1 className="text-lg font-semibold">
                    {courses.length > 0 ? 'Select a course' : 'No courses yet'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {courses.length > 0
                      ? 'Pick a course to open the Insights builder.'
                      : 'Create a course to access the Insights builder.'}
                  </p>
                </div>
                {courses.length === 0 ? (
                  <Button onClick={() => (window.location.href = '/tutor/courses/new')}>
                    New session
                  </Button>
                ) : (
                  <div className="mt-4 grid w-full gap-3">
                    {courses.map(course => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => {
                          setCourseId(course.id)
                          setDetachedCourseName(course.name)
                        }}
                        className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{course.name}</p>
                          <p className="text-muted-foreground text-xs">
                            Last updated{' '}
                            {course.updatedAt
                              ? new Date(course.updatedAt).toLocaleString()
                              : 'Unavailable'}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-blue-600">Open</span>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const dataMode = sessionId ? 'default' : 'detached'

  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-gray-50">
      <CourseBuilderInsightsRoute
        courseId={courseId}
        dataMode={dataMode}
        detachedStorageKey={
          dataMode === 'detached' ? `insights-course-builder:${courseId}` : undefined
        }
        detachedCourseName={dataMode === 'detached' ? detachedCourseName : undefined}
        insightsProps={{
          courseId,
          courses: courses.map(course => ({ id: course.id, name: course.name })),
          onCourseChange: value => {
            setCourseId(value)
            const match = courses.find(course => course.id === value)
            if (match) {
              setDetachedCourseName(match.name)
            }
          },
          sessionId,
          sessions,
          onSessionChange: setSessionId,
          liveTasks,
          onDeployTask: handleDeployTask,
          onSendPoll: handleSendPoll,
          onSendQuestion: handleSendQuestion,
          students,
          metrics,
          classDuration,
          isRecording,
          recordingDuration: recordingDurationSeconds,
          onToggleRecording: handleToggleRecording,
          socket,
        }}
      />
    </div>
  )
}
