'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, Clock, ArrowRight } from 'lucide-react'

interface Recommendation {
  type: string
  title: string
  description: string
  priority: string
  estimatedTime: string
}

export function StudyRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recommendations')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.recommendations || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-300 bg-red-50'
      case 'medium':
        return 'border-yellow-300 bg-yellow-50'
      default:
        return 'border-blue-300 bg-blue-50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return '🔄'
      case 'practice':
        return '✏️'
      case 'new_topic':
        return '📚'
      default:
        return '💡'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Study Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className={`rounded-lg border p-4 ${getPriorityColor(rec.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <span
                        className={`rounded px-2 py-0.5 text-xs ${
                          rec.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : rec.priority === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{rec.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {rec.estimatedTime}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
