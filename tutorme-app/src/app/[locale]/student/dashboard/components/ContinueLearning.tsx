'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, BookOpen, ChevronRight } from 'lucide-react'

interface Content {
  id: string
  subject: string
  topic: string
  progress: number
  lastStudied?: string
}

interface ContinueLearningProps {
  contents: Content[]
}

export function ContinueLearning({ contents }: ContinueLearningProps) {
  const inProgressContent = contents.filter(c => c.progress > 0 && c.progress < 100)

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-500" />
            Continue Learning
          </CardTitle>
          <Link href="/student/subjects/browse">
            <Button variant="ghost" size="sm">Browse subjects</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {inProgressContent.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-700">No courses in progress</p>
            <p className="text-sm mt-1">Browse subjects and start learning.</p>
            <Link href="/student/subjects/browse">
              <Button className="mt-4">Browse subjects</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {inProgressContent.slice(0, 3).map(content => (
              <Link key={content.id} href={`/student/learn/${content.id}`}>
                <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{content.topic}</h3>
                    <p className="text-sm text-gray-500">{content.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={content.progress} className="h-2 flex-1" />
                      <span className="text-xs text-gray-500 w-10 text-right">{content.progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
