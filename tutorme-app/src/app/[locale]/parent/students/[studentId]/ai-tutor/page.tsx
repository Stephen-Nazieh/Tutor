'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bot,
  ArrowLeft,
  Loader2,
  MessageSquare,
  BookOpen,
  Lightbulb,
  Calendar,
  BarChart3,
} from 'lucide-react'
import { toast } from 'sonner'

interface SessionSummary {
  id: string
  lessonId: string
  lessonTitle: string | null
  curriculumName: string | null
  status: string
  currentSection: string
  conceptMastery: Record<string, number>
  messageCount: number
  lastMessage: string | null
  lastResponse: string | null
  startedAt: string
  lastActivityAt: string
  completedAt: string | null
}

interface Enrollment {
  subjectCode: string
  enrolledAt: string
  lastSessionAt: string | null
  totalSessions: number
  totalMinutes: number
  status: string
}

interface DailyUsage {
  date: string
  sessionCount: number
  messageCount: number
  minutesUsed: number
}

interface Metrics {
  totalSessions: number
  totalMessages: number
  totalMinutes: number
  avgMessagesPerSession: number
  activeSubjects: number
}

interface AITutorData {
  sessionSummaries: SessionSummary[]
  enrollments: Enrollment[]
  dailyUsage: DailyUsage[]
  recentActivities: Array<{ id: string; action: string; metadata: unknown; createdAt: string }>
  interactionSessions: Array<{
    id: string
    subjectCode: string
    startedAt: string
    endedAt: string | null
    messageCount: number
    topicsCovered: string[]
    summary: string | null
  }>
  metrics: Metrics
  recommendations: string[]
}

export default function StudentAITutorPage() {
  const params = useParams()
  const studentId = params.studentId as string
  const [data, setData] = useState<AITutorData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!studentId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/parent/students/${studentId}/ai-tutor`, {
        credentials: 'include',
      })
      if (res.ok) {
        const json = await res.json()
        setData(json.data ?? null)
      } else {
        const err = await res.json()
        toast.error(err.error ?? 'Failed to load AI tutor data')
      }
    } catch {
      toast.error('Failed to load AI tutor data')
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDateShort = (iso: string) => {
    return new Date(iso).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/parent/students/${studentId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-gray-500">无法加载AI辅导数据</p>
      </div>
    )
  }

  const { sessionSummaries, enrollments, dailyUsage, metrics, recommendations } = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/parent/students/${studentId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">AI 辅导</h1>
            <p className="text-gray-500 text-sm">
              AI互动历史、苏格拉底式对话与学习表现
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总对话次数</p>
                <p className="text-2xl font-bold">{metrics.totalSessions}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总消息数</p>
                <p className="text-2xl font-bold">{metrics.totalMessages}</p>
              </div>
              <Bot className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">使用时长 (分钟)</p>
                <p className="text-2xl font-bold">{metrics.totalMinutes}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">活跃科目</p>
                <p className="text-2xl font-bold">{metrics.activeSubjects}</p>
              </div>
              <BookOpen className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              学习建议
            </CardTitle>
            <CardDescription>
              基于AI辅导数据的个性化建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Session summaries - Socratic conversations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            课程对话记录
          </CardTitle>
          <CardDescription>
            课程中的AI辅导对话，采用苏格拉底式引导
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionSummaries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无课程对话记录</p>
          ) : (
            <div className="space-y-4">
              {sessionSummaries.slice(0, 15).map((s) => (
                <div
                  key={s.id}
                  className="border rounded-lg p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">
                          {s.lessonTitle ?? '未命名课程'}
                        </h3>
                        {s.curriculumName && (
                          <Badge variant="outline" className="text-xs">
                            {s.curriculumName}
                          </Badge>
                        )}
                        <Badge
                          variant={s.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {s.status === 'completed' ? '已完成' : s.currentSection}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {s.messageCount} 条消息 · 最后活动: {formatDate(s.lastActivityAt)}
                      </p>
                      {s.lastMessage && (
                        <div className="mt-2 text-sm bg-gray-50 rounded p-2">
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-700">学生:</span>{' '}
                            {s.lastMessage.length > 100
                              ? s.lastMessage.slice(0, 100) + '...'
                              : s.lastMessage}
                          </p>
                          {s.lastResponse && (
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium text-purple-700">AI:</span>{' '}
                              {s.lastResponse.length > 150
                                ? s.lastResponse.slice(0, 150) + '...'
                                : s.lastResponse}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enrollments */}
      {enrollments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              已注册科目
            </CardTitle>
            <CardDescription>
              AI辅导已注册的科目及使用情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrollments.map((e) => (
                <div
                  key={e.subjectCode}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <span className="font-medium">{e.subjectCode}</span>
                  <p className="text-sm text-gray-500">
                    {e.totalSessions} 次对话 · {e.totalMinutes} 分钟
                  </p>
                  {e.lastSessionAt && (
                    <p className="text-xs text-gray-400">
                      最近: {formatDateShort(e.lastSessionAt)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily usage (last 7 days) */}
      {dailyUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              近期使用
            </CardTitle>
            <CardDescription>
              最近7天的AI辅导使用情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dailyUsage.slice(0, 7).map((u) => (
                <div
                  key={u.date}
                  className="shrink-0 w-24 border rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-gray-500">{formatDateShort(u.date)}</p>
                  <p className="font-semibold">{u.messageCount}</p>
                  <p className="text-xs text-gray-400">条消息</p>
                  <p className="text-xs text-gray-400">{u.minutesUsed} 分钟</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
