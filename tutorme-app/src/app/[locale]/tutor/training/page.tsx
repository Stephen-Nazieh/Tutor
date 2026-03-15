'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, CalendarPlus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function TutorTrainingPage() {
  const router = useRouter()
  const [starting, setStarting] = useState(false)

  const handleStartTraining = async () => {
    setStarting(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/class/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: 'Training Session',
          subject: 'Training',
          gradeLevel: 'mixed',
          maxStudents: 50,
          duration: 60,
          scheduledAt: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/tutor/live-class/${data.room.id}`)
        return
      }
      toast.error('Failed to start training session')
    } catch {
      toast.error('Failed to start training session')
    } finally {
      setStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Training Sessions</CardTitle>
            <CardDescription>
              Run live training sessions for tutors, staff, or cohorts. Schedule a session or jump into a live room.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="gap-2"
              onClick={() => router.push('/tutor/classes/new')}
            >
              <CalendarPlus className="h-4 w-4" />
              Schedule Training
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleStartTraining}
              disabled={starting}
            >
              {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Open Live Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
