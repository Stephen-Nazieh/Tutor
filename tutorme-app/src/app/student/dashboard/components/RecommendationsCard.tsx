'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, Clock, ArrowRight } from 'lucide-react'

export interface Recommendation {
  type: string
  title: string
  description: string
  priority: string
  estimatedTime: string
}

interface RecommendationsCardProps {
  recommendations: Recommendation[]
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high': return 'border-red-300 bg-red-50'
    case 'medium': return 'border-yellow-300 bg-yellow-50'
    default: return 'border-blue-300 bg-blue-50'
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'review': return '🔄'
    case 'practice': return '✏️'
    case 'new_topic': return '📚'
    default: return '💡'
  }
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Recommended for you
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">No recommendations yet</p>
            <p className="text-xs mt-1">Complete lessons and quizzes to get personalized suggestions.</p>
            <Link href="/student/subjects/browse">
              <Button variant="outline" size="sm" className="mt-3">Browse subjects</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{rec.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{rec.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {rec.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <Link href="/student/missions">
                    <Button size="sm" variant="ghost" className="shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
