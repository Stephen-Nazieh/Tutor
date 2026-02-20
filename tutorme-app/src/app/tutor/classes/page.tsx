'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Copy, BookOpen, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { formatClassTime } from '@/lib/format-class-time'

interface TutorClass {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  maxStudents: number
  enrolledStudents: number
  status: string
}

function copyJoinLink(classId: string) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/class/${classId}` : ''
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast.success('Link copied to clipboard'))
  }
}

export default function TutorClassesPage() {
  const router = useRouter()
  const [classes, setClasses] = useState<TutorClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/tutor/classes', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load classes')
        return res.json()
      })
      .then((data) => {
        setClasses(data.classes ?? [])
        setError(null)
      })
      .catch(() => setError('Failed to load classes'))
      .finally(() => setLoading(false))
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600">
                TutorMe
              </Link>
              <Button variant="ghost" size="sm" onClick={() => router.push('/tutor/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
              </Button>
            </div>
            <div className="flex items-center">
              <UserNav />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Classes</h1>
          <Link href="/tutor/dashboard?create=1">
            <Button>
            <Plus className="w-4 h-4 mr-2" /> Create Class
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center justify-between">
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true)
                setError(null)
                fetch('/api/tutor/classes', { credentials: 'include' })
                  .then((res) => res.json())
                  .then((data) => setClasses(data.classes ?? []))
                  .catch(() => setError('Failed to load classes'))
                  .finally(() => setLoading(false))
              }}
            >
              Retry
            </Button>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Upcoming & active</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4" aria-busy="true">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center py-12 px-4 border rounded-lg border-dashed border-gray-300 bg-gray-50/50">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No classes yet</p>
                <Button onClick={() => router.push('/tutor/dashboard')}>
                  <Plus className="w-4 h-4 mr-2" /> Go to dashboard to create a class
                </Button>
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
                          {cls.enrolledStudents}/{cls.maxStudents} students • {cls.status}
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
                      <Link href={`/class/${cls.id}`} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                        <Button size="sm">Enter Room</Button>
                      </Link>
                    </div>
                  </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
