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
  const criticalTopics = weakTopics
    .filter(t => t.currentRetention < 40)
    .slice(0, 3)

  if (criticalTopics.length === 0) return null

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">AI Tutor Can Help</h3>
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                {criticalTopics.length} topics
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              You're having trouble remembering some key concepts. 
              Our AI Tutor can explain these topics in a new way.
            </p>

            <div className="space-y-2 mb-4">
              {criticalTopics.map((topic, idx) => (
                <div 
                  key={topic.contentId}
                  className="flex items-center gap-3 p-2 bg-white/60 rounded-lg"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{topic.contentTitle}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={topic.currentRetention} className="w-16 h-1" />
                      <span className="text-xs text-red-600">{topic.currentRetention}% retention</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => router.push('/student/ai-tutor')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Get Help from AI Tutor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
