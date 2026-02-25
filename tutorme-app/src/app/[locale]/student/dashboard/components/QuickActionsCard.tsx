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
              <Video className="w-4 h-4 mr-2" /> Join Class
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/subjects/browse">
              <BookOpen className="w-4 h-4 mr-2" /> Browse
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/ai-tutor">
              <MessageSquare className="w-4 h-4 mr-2" /> AI Tutor
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/missions">
              <Target className="w-4 h-4 mr-2" /> Missions
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-center" asChild>
            <Link href="/student/scores">
              <ChartLine className="w-4 h-4 mr-2" /> Scores
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
