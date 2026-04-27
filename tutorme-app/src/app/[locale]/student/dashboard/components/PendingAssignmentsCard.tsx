'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

interface PendingAssignment {
  id: string
  title: string
  type: string
  dueDate: string | null
  maxScore: number
}

export function PendingAssignmentsCard() {
  const [assignments, setAssignments] = useState<PendingAssignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Legacy endpoint removed; show empty state
    setAssignments([])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Card className="mb-8 animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-5 w-44 rounded bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="h-16 rounded bg-gray-100" />
        </CardContent>
      </Card>
    )
  }

  const getCountdown = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - Date.now()
    if (diff <= 0) return { text: 'Overdue', urgent: true }
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (days > 0) return { text: `${days}d left`, urgent: days <= 1 }
    return { text: `${hours}h left`, urgent: hours <= 6 }
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="h-5 w-5 text-blue-500" />
            Pending Assignments
            {assignments.length > 0 && (
              <Badge className="ml-1 bg-blue-100 text-xs text-blue-800">{assignments.length}</Badge>
            )}
          </CardTitle>
          <Link href="/student/assignments">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {assignments.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-400" />
            <p className="text-sm font-medium text-gray-700">All done!</p>
            <p className="mt-0.5 text-xs">No pending assignments</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {assignments.slice(0, 3).map(assignment => {
              const countdown = assignment.dueDate ? getCountdown(assignment.dueDate) : null
              return (
                <Link key={assignment.id} href="/student/assignments">
                  <div className="flex items-center justify-between rounded-lg border p-2.5 transition-colors hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{assignment.title}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {assignment.type}
                        </Badge>
                        <span className="text-xs text-gray-400">{assignment.maxScore} pts</span>
                      </div>
                    </div>
                    {countdown && (
                      <Badge
                        variant={countdown.urgent ? 'destructive' : 'outline'}
                        className="flex-shrink-0 gap-1 text-xs"
                      >
                        {countdown.urgent ? (
                          <AlertCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {countdown.text}
                      </Badge>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
