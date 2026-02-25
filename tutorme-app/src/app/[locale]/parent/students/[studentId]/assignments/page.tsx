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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileQuestion,
  Loader2,
  ArrowLeft,
  Trophy,
  Bot,
  User,
} from 'lucide-react'
import { toast } from 'sonner'

interface AssignmentItem {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  dueDate: string | null
  assignedAt: string | null
  maxScore: number
  status: 'pending' | 'submitted' | 'overdue'
  score: number | null
  submittedAt: string | null
  gradedAt: string | null
  questionCount: number
  lessonTitle: string | null
  curriculumName: string | null
  tutorName: string | null
  timeSpent: number | null
  attempts: number
  maxAttempts: number
  aiGraded: boolean
  aiScore: number | null
  aiComments: string | null
  aiStrengths: string[]
  aiImprovements: string[]
  tutorFeedback: string | null
  tutorApproved: boolean
}

interface Stats {
  pending: number
  submitted: number
  overdue: number
  total: number
}

export default function StudentAssignmentsPage() {
  const params = useParams()
  const studentId = params.studentId as string
  const [assignments, setAssignments] = useState<AssignmentItem[]>([])
  const [stats, setStats] = useState<Stats>({
    pending: 0,
    submitted: 0,
    overdue: 0,
    total: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  const loadAssignments = useCallback(async () => {
    if (!studentId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/parent/students/${studentId}/assignments`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setAssignments(data.assignments ?? [])
        setStats(data.stats ?? { pending: 0, submitted: 0, overdue: 0, total: 0 })
      } else {
        const err = await res.json()
        toast.error(err.error ?? 'Failed to load assignments')
      }
    } catch {
      toast.error('Failed to load assignments')
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    loadAssignments()
  }, [loadAssignments])

  const formatDate = (iso: string | null) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            已提交
          </Badge>
        )
      case 'overdue':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            已逾期
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            待完成
          </Badge>
        )
    }
  }

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      quiz: '测验',
      assignment: '作业',
      practice: '练习',
      assessment: '评估',
      project: '项目',
    }
    return map[type] ?? type
  }

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
            <h1 className="text-2xl font-bold">作业与测验</h1>
            <p className="text-gray-500 text-sm">
              查看孩子的作业完成情况、AI评分和教师反馈
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总计</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">待完成</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">已提交</p>
                <p className="text-2xl font-bold">{stats.submitted}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">已逾期</p>
                <p className="text-2xl font-bold">{stats.overdue}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments list */}
      <Card>
        <CardHeader>
          <CardTitle>全部作业</CardTitle>
          <CardDescription>
            包含作业、测验、练习等，支持AI评分与教师反馈
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">全部 ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">待完成 ({stats.pending})</TabsTrigger>
                <TabsTrigger value="submitted">已提交 ({stats.submitted})</TabsTrigger>
                <TabsTrigger value="overdue">已逾期 ({stats.overdue})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-4">
                  {assignments
                    .filter((a) =>
                      activeTab === 'all'
                        ? true
                        : a.status === activeTab
                    )
                    .map((a) => (
                      <Card key={a.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold truncate">{a.title}</h3>
                                {getStatusBadge(a.status)}
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(a.type)}
                                </Badge>
                                {a.difficulty && (
                                  <Badge variant="outline" className="text-xs">
                                    {a.difficulty}
                                  </Badge>
                                )}
                              </div>
                              {a.description && (
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {a.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                                {a.lessonTitle && (
                                  <span>{a.lessonTitle}</span>
                                )}
                                {a.curriculumName && (
                                  <span>· {a.curriculumName}</span>
                                )}
                                {a.tutorName && (
                                  <span>· 教师: {a.tutorName}</span>
                                )}
                                {a.dueDate && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    截止: {formatDate(a.dueDate)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              {a.status === 'submitted' && a.score != null && (
                                <div className="flex items-center gap-1">
                                  <Trophy className="h-4 w-4 text-amber-500" />
                                  <span className="font-semibold">
                                    {Math.round(a.score)}%
                                  </span>
                                </div>
                              )}
                              <div className="text-sm text-gray-500">
                                <FileQuestion className="h-4 w-4 inline mr-1" />
                                {a.questionCount} 题
                              </div>
                            </div>
                          </div>

                          {/* AI & Teacher feedback */}
                          {(a.aiGraded || a.tutorFeedback) && (
                            <div className="border-t bg-gray-50/50 px-4 py-3 space-y-2">
                              {a.aiGraded && (
                                <div className="flex gap-2 items-start">
                                  <Bot className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-700">
                                      AI 评分
                                      {a.aiScore != null && `: ${Math.round(a.aiScore)}%`}
                                    </span>
                                    {a.aiComments && (
                                      <p className="text-gray-600 mt-1">{a.aiComments}</p>
                                    )}
                                    {a.aiStrengths.length > 0 && (
                                      <p className="text-green-700 mt-1">
                                        优点: {a.aiStrengths.join('、')}
                                      </p>
                                    )}
                                    {a.aiImprovements.length > 0 && (
                                      <p className="text-amber-700 mt-1">
                                        改进: {a.aiImprovements.join('、')}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                              {a.tutorFeedback && (
                                <div className="flex gap-2 items-start">
                                  <User className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-700">
                                      教师反馈
                                      {a.tutorApproved && (
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                          已批阅
                                        </Badge>
                                      )}
                                    </span>
                                    <p className="text-gray-600 mt-1">{a.tutorFeedback}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {a.status === 'submitted' && a.submittedAt && (
                            <div className="border-t px-4 py-2 text-xs text-gray-500">
                              提交于 {formatDate(a.submittedAt)}
                              {a.timeSpent != null && ` · 用时 ${Math.round(a.timeSpent / 60)} 分钟`}
                              {a.attempts > 0 && ` · 第 ${a.attempts}/${a.maxAttempts} 次尝试`}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  {assignments.filter((a) =>
                    activeTab === 'all' ? true : a.status === activeTab
                  ).length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      暂无作业
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
