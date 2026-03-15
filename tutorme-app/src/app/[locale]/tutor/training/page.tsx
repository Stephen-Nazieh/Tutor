'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, CalendarPlus } from 'lucide-react'

export default function TutorTrainingPage() {
  const router = useRouter()

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
              onClick={() => router.push('/tutor/classes')}
            >
              <Play className="h-4 w-4" />
              Open Live Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
