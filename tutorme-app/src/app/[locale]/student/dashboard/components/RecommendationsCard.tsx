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
    case 'high':
      return 'border-border bg-primary/10'
    case 'medium':
      return 'border-border bg-accent/50'
    default:
      return 'border-border bg-muted/60'
  }
}

function getTypeIcon(type: string) {
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

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Recommended for you
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center">
            <Lightbulb className="text-muted-foreground/60 mx-auto mb-2 h-12 w-12" />
            <p className="text-foreground text-sm font-medium">No recommendations yet</p>
            <p className="mt-1 text-xs">
              Complete lessons and quizzes to get personalized suggestions.
            </p>
            <Link href="/student/subjects/browse">
              <Button variant="outline" size="sm" className="mt-3">
                Browse subjects
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <div key={idx} className={`rounded-lg border p-4 ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{rec.title}</h4>
                        <span
                          className={`rounded px-2 py-0.5 text-xs ${
                            rec.priority === 'high'
                              ? 'bg-primary/20 text-foreground'
                              : rec.priority === 'medium'
                                ? 'bg-accent/70 text-foreground'
                                : 'bg-muted/70 text-foreground'
                          }`}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                        {rec.description}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {rec.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <Link href="/student/missions">
                    <Button size="sm" variant="ghost" className="shrink-0">
                      <ArrowRight className="h-4 w-4" />
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
