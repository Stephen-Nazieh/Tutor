'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Target, BookOpen, TrendingUp } from 'lucide-react'

interface PersonalizedFeedbackCardProps {
  feedback: string
  explanation: string
  nextSteps?: string[]
  relatedStruggles?: string[]
  isPersonalized?: boolean
  score: number
  maxScore: number
}

export function PersonalizedFeedbackCard({
  feedback,
  explanation,
  nextSteps = [],
  relatedStruggles = [],
  isPersonalized = false,
  score,
  maxScore,
}: PersonalizedFeedbackCardProps) {
  const percentage = (score / maxScore) * 100

  return (
    <Card className="relative overflow-hidden border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
      {isPersonalized && (
        <div className="absolute right-3 top-3">
          <Badge
            variant="outline"
            className="gap-1 border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            <Sparkles className="h-3 w-3" />
            Personalized for You
          </Badge>
        </div>
      )}

      <CardContent className="space-y-4 pt-6">
        {/* Feedback */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-700">Feedback</h4>
          </div>
          <p className="text-sm leading-relaxed text-gray-800">{feedback}</p>
        </div>

        {/* Explanation */}
        {explanation && (
          <div>
            <p className="text-xs leading-relaxed text-gray-600">{explanation}</p>
          </div>
        )}

        {/* Next Steps */}
        {nextSteps.length > 0 && (
          <div className="border-t border-blue-100 pt-2">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              <h4 className="text-sm font-semibold text-gray-700">Next Steps</h4>
            </div>
            <ul className="space-y-1.5">
              {nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="mt-0.5 font-bold text-purple-500">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Struggles */}
        {relatedStruggles.length > 0 && (
          <div className="border-t border-blue-100 pt-2">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <h4 className="text-sm font-semibold text-gray-700">Related to Your Progress</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {relatedStruggles.map((struggle, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-amber-200 bg-amber-50 text-xs text-amber-700"
                >
                  {struggle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Performance Indicator */}
        {percentage >= 85 && (
          <div className="pt-2">
            <Badge className="border-green-200 bg-green-100 text-green-700">
              🎉 Excellent Progress!
            </Badge>
          </div>
        )}
        {percentage >= 70 && percentage < 85 && (
          <div className="pt-2">
            <Badge className="border-blue-200 bg-blue-100 text-blue-700">👍 Good Work!</Badge>
          </div>
        )}
        {percentage < 70 && (
          <div className="pt-2">
            <Badge className="border-amber-200 bg-amber-100 text-amber-700">⚠️ Needs Review</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
