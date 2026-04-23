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
          maxStudents: 50,
          duration: 60,
          scheduledAt: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/tutor/insights?sessionId=${data.room.id}`)
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
      <div className="space-y-6">
        <div className="min-h-[52px] shrink-0 mb-6">
          <div className="flex items-center justify-between w-full h-full gap-2 rounded-2xl border border-[#D8E0EA] bg-[linear-gradient(to_bottom,_#F8FAFC,_#F1F5F9)] p-1.5 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#2563EB]" />
              <h1 className="text-[#1F2933] text-sm font-semibold">Training Sessions</h1>
            </div>
            <p className="text-xs text-[#667085] hidden sm:block">Run live training sessions for tutors, staff, or cohorts.</p>
          </div>
        </div>
        <Card>
          <CardHeader className="hidden">
            <CardTitle className="text-2xl">Training Sessions</CardTitle>
            <CardDescription>
              Run live training sessions for tutors, staff, or cohorts. Schedule a session or jump
              into a live room.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2" onClick={() => router.push('/tutor/classes')}>
              {starting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Open Live Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
