'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, MessageSquare, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react'

interface AITutorSuggestionProps {
  weakTopics: Array<{
    contentId: string
    contentTitle: string
    subject: string
    currentRetention: number
    lastQuizScore: number | null
  }>
}

export function AITutorSuggestion({ weakTopics }: AITutorSuggestionProps) {
  const router = useRouter()

  // Filter topics with very low retention
  const criticalTopics = weakTopics.filter(t => t.currentRetention < 40).slice(0, 3)

  if (criticalTopics.length === 0) return null

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full bg-purple-100 p-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="font-semibold">AI Tutor Can Help</h3>
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                {criticalTopics.length} topics
              </Badge>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              You're having trouble remembering some key concepts. Our AI Tutor can explain these
              topics in a new way.
            </p>

            <div className="mb-4 space-y-2">
              {criticalTopics.map((topic, idx) => (
                <div
                  key={topic.contentId}
                  className="flex items-center gap-3 rounded-lg bg-white/60 p-2"
                >
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{topic.contentTitle}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={topic.currentRetention} className="h-1 w-16" />
                      <span className="text-xs text-red-600">
                        {topic.currentRetention}% retention
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push('/student/ai-tutor')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Get Help from AI Tutor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
