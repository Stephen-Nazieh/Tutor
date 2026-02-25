'use client'

import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ClipboardList,
  Bot,
  Loader2,
  BookOpen,
  Calendar,
  TrendingUp,
  CreditCard,
} from 'lucide-react'

interface StudentData {
  id: string
  name: string
  email: string | null
  relation: string
  enrollments: Array<{
    curriculumId: string
    curriculumName: string
    enrolledAt: string
  }>
  level: number | null
  xp: number | null
}

const tabs = [
  { id: 'overview', label: '概览', href: (id: string) => `/parent/students/${id}`, icon: TrendingUp },
  { id: 'assignments', label: '作业与测验', href: (id: string) => `/parent/students/${id}/assignments`, icon: ClipboardList },
  { id: 'ai-tutor', label: 'AI 辅导', href: (id: string) => `/parent/students/${id}/ai-tutor`, icon: Bot },
  { id: 'classes', label: '课程安排', href: (id: string) => `/parent/students/${id}`, icon: Calendar },
  { id: 'financial', label: '财务', href: (id: string) => `/parent/students/${id}`, icon: CreditCard },
]

export default function StudentDetailPage() {
  const params = useParams()
  const pathname = usePathname()
  const studentId = params.studentId as string
  const [student, setStudent] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!studentId) return
    let cancelled = false
    fetch(`/api/parent/students/${studentId}`, { credentials: 'include' })
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.success && json.data) {
          setStudent(json.data)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [studentId])

  const isChildRoute = pathname !== `/parent/students/${studentId}`

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/parent/children">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-gray-500">无法加载学生信息</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/parent/children">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-gray-500 text-sm">
              {student.email && `${student.email} · `}
              {student.relation}
              {student.level != null && ` · 等级 ${student.level}`}
              {student.xp != null && ` · ${student.xp} XP`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const href = tab.href(studentId)
          const isActive = pathname === href || (tab.id !== 'overview' && pathname.startsWith(href))
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              asChild
            >
              <Link href={href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            </Button>
          )
        })}
      </div>

      {!isChildRoute && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                已选课程
              </CardTitle>
            </CardHeader>
            <CardContent>
              {student.enrollments.length === 0 ? (
                <p className="text-gray-500 text-sm">暂无课程</p>
              ) : (
                <ul className="space-y-2">
                  {student.enrollments.map((e) => (
                    <li key={e.curriculumId} className="text-sm">
                      {e.curriculumName}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                快捷入口
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/parent/students/${studentId}/assignments`}>
                  <ClipboardList className="h-4 w-4 mr-2" />
                  作业与测验
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/parent/students/${studentId}/ai-tutor`}>
                  <Bot className="h-4 w-4 mr-2" />
                  AI 辅导
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {isChildRoute && (
        <p className="text-sm text-gray-500">
          请使用上方标签切换不同视图
        </p>
      )}
    </div>
  )
}
