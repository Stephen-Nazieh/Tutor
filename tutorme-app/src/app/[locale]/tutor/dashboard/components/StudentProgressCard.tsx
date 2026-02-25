'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { TrendingUp, Search, ExternalLink, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TutorStudent {
  id: string
  name: string
  email: string
  courseCount: number
  classCount: number
}

interface StudentProgressRow {
  studentId: string
  overallProgress: number
  engagementRate: number
  assignmentCompletion: number
  averageScore: number
  recentRisk: 'low' | 'medium' | 'high'
}

interface StudentProgressCardProps {
  students?: TutorStudent[]
  loading?: boolean
}

const getRiskBadge = (risk: StudentProgressRow['recentRisk']) => {
  if (risk === 'high') return <Badge variant="destructive">Needs attention</Badge>
  if (risk === 'medium') return <Badge variant="secondary">Watch</Badge>
  return <Badge variant="outline">Stable</Badge>
}

export function StudentProgressCard({ students = [], loading }: StudentProgressCardProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [progressRows, setProgressRows] = useState<Record<string, StudentProgressRow>>({})
  const [loadingProgress, setLoadingProgress] = useState(false)

  useEffect(() => {
    let active = true
    const loadProgress = async () => {
      if (students.length === 0) {
        setProgressRows({})
        return
      }

      setLoadingProgress(true)
      try {
        const res = await fetch('/api/tutor/dashboard/student-progress', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        const rows = Array.isArray(data.students) ? data.students : []
        if (!active) return
        const next: Record<string, StudentProgressRow> = {}
        for (const row of rows) {
          if (typeof row?.studentId !== 'string') continue
          next[row.studentId] = row as StudentProgressRow
        }
        setProgressRows(next)
      } catch {
        // Non-fatal: base roster still renders.
      } finally {
        if (active) setLoadingProgress(false)
      }
    }

    loadProgress()
    return () => {
      active = false
    }
  }, [students])

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return students
    return students.filter((s) => s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query))
  }, [searchQuery, students])

  const summary = useMemo(() => {
    const rows = students
      .map((s) => progressRows[s.id])
      .filter((r): r is StudentProgressRow => Boolean(r))
    if (rows.length === 0) {
      return { avgProgress: 0, avgEngagement: 0, riskCount: 0 }
    }
    return {
      avgProgress: Math.round(rows.reduce((sum, r) => sum + r.overallProgress, 0) / rows.length),
      avgEngagement: Math.round(rows.reduce((sum, r) => sum + r.engagementRate, 0) / rows.length),
      riskCount: rows.filter((r) => r.recentRisk === 'high').length,
    }
  }, [students, progressRows])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Student Progress
          </CardTitle>
          {summary.riskCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="w-3 h-3" />
              {summary.riskCount} at risk
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-blue-50 p-2">
            <p className="text-lg font-bold text-blue-700">{summary.avgProgress}%</p>
            <p className="text-xs text-blue-600">Avg progress</p>
          </div>
          <div className="rounded-lg bg-green-50 p-2">
            <p className="text-lg font-bold text-green-700">{summary.avgEngagement}%</p>
            <p className="text-xs text-green-600">Engagement</p>
          </div>
          <div className="rounded-lg bg-purple-50 p-2">
            <p className="text-lg font-bold text-purple-700">{students.length}</p>
            <p className="text-xs text-purple-600">Students</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students"
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No students found.</p>
        ) : (
          filtered.map((student) => {
            const row = progressRows[student.id]
            return (
              <div key={student.id} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                  </div>
                  {row ? getRiskBadge(row.recentRisk) : <Badge variant="outline">No metrics yet</Badge>}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{row?.overallProgress ?? 0}%</span>
                  </div>
                  <Progress value={row?.overallProgress ?? 0} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Courses: {student.courseCount}</span>
                  <span>Classes: {student.classCount}</span>
                  <span>Score: {row?.averageScore ?? 0}%</span>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/tutor/reports/${student.id}`)}>
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Open Report
                  </Button>
                </div>
              </div>
            )
          })
        )}
        {loadingProgress && <p className="text-xs text-muted-foreground">Refreshing metrics…</p>}
      </CardContent>
    </Card>
  )
}
