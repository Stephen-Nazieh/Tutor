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
        fetch('/api/student/assignments')
            .then((r) => r.json())
            .then((res) => {
                const pending = (res.assignments || [])
                    .filter((a: any) => a.status === 'pending')
                    .sort((a: any, b: any) => {
                        if (!a.dueDate) return 1
                        if (!b.dueDate) return -1
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                    })
                setAssignments(pending)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Card className="mb-8 animate-pulse">
                <CardHeader className="pb-3">
                    <div className="h-5 bg-gray-200 rounded w-44" />
                </CardHeader>
                <CardContent>
                    <div className="h-16 bg-gray-100 rounded" />
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
                    <CardTitle className="text-lg flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-blue-500" />
                        Pending Assignments
                        {assignments.length > 0 && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs ml-1">
                                {assignments.length}
                            </Badge>
                        )}
                    </CardTitle>
                    <Link href="/student/assignments">
                        <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                {assignments.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">
                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <p className="text-sm font-medium text-gray-700">All done!</p>
                        <p className="text-xs mt-0.5">No pending assignments</p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {assignments.slice(0, 3).map((assignment) => {
                            const countdown = assignment.dueDate ? getCountdown(assignment.dueDate) : null
                            return (
                                <Link key={assignment.id} href="/student/assignments">
                                    <div className="flex items-center justify-between p-2.5 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{assignment.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Badge variant="secondary" className="text-xs capitalize">
                                                    {assignment.type}
                                                </Badge>
                                                <span className="text-xs text-gray-400">{assignment.maxScore} pts</span>
                                            </div>
                                        </div>
                                        {countdown && (
                                            <Badge
                                                variant={countdown.urgent ? 'destructive' : 'outline'}
                                                className="text-xs gap-1 flex-shrink-0"
                                            >
                                                {countdown.urgent ? (
                                                    <AlertCircle className="w-3 h-3" />
                                                ) : (
                                                    <Clock className="w-3 h-3" />
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
