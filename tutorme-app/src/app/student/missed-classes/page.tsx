'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Video,
    Calendar,
    Clock,
    User,
    Play,
    ExternalLink,
    AlertCircle,
    PartyPopper,
} from 'lucide-react'

interface MissedSession {
    id: string
    title: string
    subject: string
    tutorName: string
    scheduledAt: string
    endedAt: string | null
    duration: number | null
    recordingUrl: string | null
    hasRecording: boolean
    leftEarly: boolean
}

type FilterType = 'all' | 'week' | 'month'

export default function MissedClassesPage() {
    const [sessions, setSessions] = useState<MissedSession[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<FilterType>('all')

    useEffect(() => {
        setLoading(true)
        fetch(`/api/student/missed-classes?filter=${filter}`)
            .then((r) => r.json())
            .then((res) => {
                if (res.success) setSessions(res.data.sessions)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [filter])

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Video className="h-6 w-6" />
                    Missed Classes
                </h1>
                <p className="text-gray-600 mt-1">
                    Catch up on classes you missed with recordings
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {(['all', 'week', 'month'] as FilterType[]).map((f) => (
                    <Button
                        key={f}
                        variant={filter === f ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter(f)}
                        className="capitalize"
                    >
                        {f === 'all' ? 'All Time' : f === 'week' ? 'This Week' : 'This Month'}
                    </Button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="pt-6">
                                <Skeleton className="h-20" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : sessions.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <PartyPopper className="w-12 h-12 mx-auto mb-3 text-green-400" />
                        <h3 className="font-semibold text-gray-900">No missed classes!</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Great job — you&apos;ve been attending all your classes.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {sessions.map((session) => (
                        <Card key={session.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="pt-5 pb-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium truncate">{session.title}</h3>
                                            {session.leftEarly && (
                                                <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                                                    Left early
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3.5 h-3.5" />
                                                {session.tutorName}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(session.scheduledAt)}
                                            </span>
                                            {session.duration && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {session.duration} min
                                                </span>
                                            )}
                                        </div>
                                        <Badge variant="secondary" className="mt-2 text-xs">{session.subject}</Badge>
                                    </div>

                                    <div className="flex-shrink-0">
                                        {session.hasRecording ? (
                                            <a href={session.recordingUrl!} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" className="gap-1.5">
                                                    <Play className="w-3.5 h-3.5" />
                                                    Watch Recording
                                                    <ExternalLink className="w-3 h-3" />
                                                </Button>
                                            </a>
                                        ) : (
                                            <Badge variant="outline" className="text-xs text-gray-400 gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                No recording
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
