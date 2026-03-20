'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, MessageSquare, Target, ChartLine, Video } from 'lucide-react'

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/live/join">
              <Video className="mr-2 h-4 w-4" /> Join Class
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/subjects/browse">
              <BookOpen className="mr-2 h-4 w-4" /> Browse
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/ai-tutor">
              <MessageSquare className="mr-2 h-4 w-4" /> AI Tutor
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/missions">
              <Target className="mr-2 h-4 w-4" /> Missions
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/scores">
              <ChartLine className="mr-2 h-4 w-4" /> Scores
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
