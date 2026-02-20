'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Clock,
  Play,
  Brain,
  AlertCircle,
  CheckCircle2,
  Zap,
  Calendar,
  TrendingDown,
  Flame,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react'

interface ReviewItem {
  id: string
  contentId: string
  contentTitle: string
  subjectId: string
  subjectName: string
  subjectColor: string
  currentRetention: number
  estimatedMinutes: number
  priority: 'critical' | 'high' | 'medium' | 'low'
  daysOverdue: number
  lastReviewed: string | null
  difficulty: 'easy' | 'medium' | 'hard'
}

interface SmartReviewQueueProps {
  reviews: ReviewItem[]
  streakDays: number
  onReviewComplete?: () => void
}

export function SmartReviewQueue({ 
  reviews, 
  streakDays = 0,
  onReviewComplete 
}: SmartReviewQueueProps) {
  const router = useRouter()
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set())
  const [isBatchMode, setIsBatchMode] = useState(false)

  // Sort reviews by urgency algorithm
  const sortedReviews = [...reviews].sort((a, b) => {
    // Priority weights
    const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 }
    
    // Calculate urgency score
    const getUrgencyScore = (r: ReviewItem) => {
      let score = priorityWeight[r.priority] * 25
      score += (100 - r.currentRetention) * 0.5 // Lower retention = higher urgency
      score += r.daysOverdue * 10 // Overdue adds urgency
      return score
    }
    
    return getUrgencyScore(b) - getUrgencyScore(a)
  })

  // Calculate totals
  const totalTime = sortedReviews.reduce((sum, r) => sum + r.estimatedMinutes, 0)
  const criticalCount = sortedReviews.filter(r => r.priority === 'critical').length
  const overdueCount = sortedReviews.filter(r => r.daysOverdue > 0).length

  // Toggle selection
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedReviews)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedReviews(newSelected)
  }

  // Select all
  const selectAll = () => {
    if (selectedReviews.size === sortedReviews.length) {
      setSelectedReviews(new Set())
    } else {
      setSelectedReviews(new Set(sortedReviews.map(r => r.id)))
    }
  }

  // Start batch review
  const startBatchReview = () => {
    const selected = sortedReviews.filter(r => selectedReviews.has(r.id))
    if (selected.length === 0) {
      toast.error('Please select at least one review')
      return
    }
    
    // Navigate to batch review page with selected IDs
    const ids = selected.map(r => r.contentId).join(',')
    router.push(`/student/review/batch?ids=${ids}`)
  }

  // Quick review single item
  const quickReview = (review: ReviewItem) => {
    router.push(`/student/review/${review.contentId}?quick=true`)
  }

  // Get priority styles
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200 animate-pulse'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  // Get retention color
  const getRetentionColor = (retention: number) => {
    if (retention >= 80) return 'text-green-600'
    if (retention >= 60) return 'text-yellow-600'
    if (retention >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  // Get retention icon
  const getRetentionIcon = (retention: number) => {
    if (retention >= 80) return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (retention >= 60) return <Brain className="w-4 h-4 text-yellow-500" />
    if (retention >= 40) return <TrendingDown className="w-4 h-4 text-orange-500" />
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }

  // Format time
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  if (sortedReviews.length === 0) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="py-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-medium text-green-900">All Caught Up!</h3>
          <p className="text-sm text-green-700 mt-1">
            You have no reviews due. Great job maintaining your memory!
          </p>
          {streakDays > 0 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">
                {streakDays} day streak!
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-lg">Smart Review Queue</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {streakDays > 0 && (
              <Badge variant="outline" className="gap-1 bg-orange-50">
                <Flame className="w-3 h-3 text-orange-500" />
                {streakDays} day streak
              </Badge>
            )}
            <Badge variant={overdueCount > 0 ? "destructive" : "default"}>
              {sortedReviews.length} due
            </Badge>
          </div>
        </div>
        
        {/* Summary Bar */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(totalTime)} total
            </span>
            {criticalCount > 0 && (
              <span className="flex items-center gap-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                {criticalCount} critical
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsBatchMode(!isBatchMode)}
            >
              {isBatchMode ? 'Done' : 'Select Multiple'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Batch Actions */}
        {isBatchMode && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={selectedReviews.size === sortedReviews.length}
                onCheckedChange={selectAll}
              />
              <span className="text-sm font-medium">
                {selectedReviews.size === 0 
                  ? 'Select all' 
                  : `${selectedReviews.size} selected`
                }
              </span>
            </div>
            <Button 
              size="sm" 
              onClick={startBatchReview}
              disabled={selectedReviews.size === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Batch ({formatTime(
                sortedReviews
                  .filter(r => selectedReviews.has(r.id))
                  .reduce((sum, r) => sum + r.estimatedMinutes, 0)
              )})
            </Button>
          </div>
        )}

        {/* Review List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {sortedReviews.slice(0, 8).map((review, index) => (
            <div 
              key={review.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                review.daysOverdue > 0 
                  ? "bg-red-50 border-red-200" 
                  : "bg-white border-gray-200 hover:border-gray-300",
                index === 0 && !isBatchMode && "ring-2 ring-yellow-400 ring-offset-1"
              )}
            >
              {isBatchMode && (
                <Checkbox 
                  checked={selectedReviews.has(review.id)}
                  onCheckedChange={() => toggleSelection(review.id)}
                />
              )}
              
              {/* Subject Color Indicator */}
              <div 
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: review.subjectColor }}
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{review.contentTitle}</p>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getPriorityStyles(review.priority))}
                  >
                    {review.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{review.subjectName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.estimatedMinutes}m
                  </span>
                  {review.daysOverdue > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-red-600 font-medium">
                        {review.daysOverdue}d overdue
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Retention */}
              <div className="flex items-center gap-2">
                {getRetentionIcon(review.currentRetention)}
                <div className="text-right">
                  <p className={cn("text-sm font-bold", getRetentionColor(review.currentRetention))}>
                    {review.currentRetention}%
                  </p>
                  <Progress 
                    value={review.currentRetention} 
                    className="w-16 h-1"
                  />
                </div>
              </div>

              {/* Action */}
              {!isBatchMode && (
                <Button 
                  size="sm" 
                  variant={index === 0 ? "default" : "outline"}
                  onClick={() => quickReview(review)}
                >
                  {index === 0 ? (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          ))}

          {sortedReviews.length > 8 && (
            <Button variant="ghost" className="w-full">
              <MoreHorizontal className="w-4 h-4 mr-2" />
              View {sortedReviews.length - 8} more reviews
            </Button>
          )}
        </div>

        {/* Start All Button */}
        {!isBatchMode && sortedReviews.length > 0 && (
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => quickReview(sortedReviews[0])}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Top Priority Review
            <span className="ml-2 text-xs opacity-70">
              ({formatTime(sortedReviews[0].estimatedMinutes)})
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
