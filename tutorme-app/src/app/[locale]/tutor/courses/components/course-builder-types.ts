import type { LiveTask } from '@/lib/socket'
import type { LiveStudent, EngagementMetrics } from '@/types/live-session'

export interface InsightsSessionOption {
  id: string
  title: string
  subject: string
  scheduledAt: string
  status: string
}

export interface CourseBuilderInsightsProps {
  courseId?: string | null
  courses?: Array<{ id: string; name: string }>
  onCourseChange?: (courseId: string) => void
  sessionId: string | null
  sessions: InsightsSessionOption[]
  onSessionChange: (sessionId: string) => void
  liveTasks: LiveTask[]
  onDeployTask: (task: LiveTask) => void
  onSendPoll: (payload: { taskId: string; question: string }) => void
  onSendQuestion: (payload: { taskId: string; prompt: string }) => void
  students?: LiveStudent[]
  metrics?: EngagementMetrics | null
  classDuration?: number
  isRecording?: boolean
  recordingDuration?: number
  onToggleRecording?: () => void
}
