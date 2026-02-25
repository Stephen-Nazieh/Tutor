'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen, Copy, Plus, Sparkles, Video, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatClassTime } from '@/lib/format-class-time'

export interface UpcomingClass {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  maxStudents: number
  enrolledStudents: number
  status: string
}

interface UpcomingClassesCardProps {
  classes: UpcomingClass[]
  formatDate: (dateString: string) => string
  loading?: boolean
  onCreateClassClick?: () => void
  onRemoveClass?: (classId: string) => void
}

function copyJoinLink(classId: string) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/tutor/live-class/${classId}` : ''
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast.success('Join link copied to clipboard'))
  }
}

export function UpcomingClassesCard({ classes, formatDate, loading, onCreateClassClick, onRemoveClass }: UpcomingClassesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2" title="Scheduled and active classes">
          <Clock className="w-5 h-5 text-blue-500" />
          My Classes
        </CardTitle>
        <Link href="/tutor/classes">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-8 px-4 border rounded-lg border-dashed border-gray-300 bg-gray-50/50">
            <p className="text-gray-600 mb-3">No upcoming classes</p>
            {onCreateClassClick && (
              <Button onClick={onCreateClassClick}>
                <Plus className="w-4 h-4 mr-2" /> Schedule a class
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {classes.map((cls) => {
              const time = formatClassTime(cls.scheduledAt)
              return (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{cls.title}</h3>
                    <p className="text-sm text-gray-500">
                      {cls.subject} • {time.formatted}
                      {time.relative && (
                        <span className="text-blue-600 font-medium"> • {time.relative}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      {cls.enrolledStudents}/{cls.maxStudents} students enrolled
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyJoinLink(cls.id)}
                    title="Copy join link"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Link href={`/tutor/live-class/${cls.id}`} title="Enter Live Class">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Video className="w-4 h-4 mr-1" />
                      Enter Room
                    </Button>
                  </Link>
                  {onRemoveClass && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveClass(cls.id)}
                      title="Remove class"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
