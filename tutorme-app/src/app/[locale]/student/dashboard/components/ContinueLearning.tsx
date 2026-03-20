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
          <CardTitle className="flex items-center gap-2 text-lg">
            <Play className="h-5 w-5 text-blue-500" />
            Continue Learning
          </CardTitle>
          <Link href="/student/subjects/browse">
            <Button variant="ghost" size="sm">
              Browse subjects
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {inProgressContent.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <BookOpen className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="font-medium text-gray-700">No courses in progress</p>
            <p className="mt-1 text-sm">Browse subjects and start learning.</p>
            <Link href="/student/subjects/browse">
              <Button className="mt-4">Browse subjects</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {inProgressContent.slice(0, 3).map(content => (
              <Link key={content.id} href={`/student/learn/${content.id}`}>
                <div className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-gray-50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium">{content.topic}</h3>
                    <p className="text-sm text-gray-500">{content.subject}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={content.progress} className="h-2 flex-1" />
                      <span className="w-10 text-right text-xs text-gray-500">
                        {content.progress}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
