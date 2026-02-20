'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  ForgettingCurveGraph,
  SmartReviewQueue,
  AITutorSuggestion,
  ReviewHeatmap,
  SubjectRetentionRadar,
  ReviewImpactViz,
  ReviewStreakCard,
  CalendarExport,
  ReviewNodeModal
} from './'
import { Brain, LayoutGrid, List, CalendarDays, Trophy, Sparkles } from 'lucide-react'

interface SpacedRepetitionDashboardProps {
  reviewData: {
    subjectCurves: any[]
    upcomingReviews: any[]
    overdueReviews: any[]
    totalDue: number
    reviewHistory?: any[]
  } | null
  onRefresh?: () => void
  fullWidth?: boolean
}

// MOCK DATA GENERATOR
const generateMockData = () => {
  const subjects = [
    { id: 'math', name: 'Mathematics', color: '#3B82F6' },
    { id: 'english', name: 'English', color: '#10B981' },
    { id: 'science', name: 'Science', color: '#8B5CF6' },
    { id: 'history', name: 'History', color: '#F59E0B' }
  ]

  // Generate subject curves with forgetting curves
  const subjectCurves = subjects.map(subject => {
    const dataPoints = []
    for (let day = 0; day <= 30; day++) {
      // Simulate exponential decay with occasional review spikes
      let retention = 100 * Math.exp(-day / 8)
      
      // Add review points that reset retention
      if (day === 0 || day === 7 || day === 14) {
        retention = 95
      }
      
      dataPoints.push({
        day,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toISOString(),
        retention: Math.round(retention),
        isReviewPoint: day === 0 || day === 7 || day === 14,
        reviewId: day === 0 || day === 7 || day === 14 ? `review-${subject.id}-${day}` : undefined,
        contentTitle: day === 0 ? `${subject.name} - Chapter 1` : 
                      day === 7 ? `${subject.name} - Chapter 2` : 
                      day === 14 ? `${subject.name} - Chapter 3` : undefined,
        contentId: day === 0 || day === 7 || day === 14 ? `content-${subject.id}-${day}` : undefined
      })
    }
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      color: subject.color,
      dataPoints
    }
  })

  // Generate upcoming reviews
  const upcomingReviews = [
    {
      id: 'review-1',
      contentId: 'content-math-1',
      contentTitle: 'Quadratic Equations',
      subjectId: 'math',
      subjectName: 'Mathematics',
      subjectColor: '#3B82F6',
      scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 1,
      currentRetention: 35,
      repetitionCount: 2,
      priority: 'high'
    },
    {
      id: 'review-2',
      contentId: 'content-english-1',
      contentTitle: 'Shakespeare Sonnets',
      subjectId: 'english',
      subjectName: 'English',
      subjectColor: '#10B981',
      scheduledFor: new Date().toISOString(),
      isOverdue: true,
      daysUntilDue: 0,
      daysOverdue: 1,
      currentRetention: 28,
      repetitionCount: 1,
      priority: 'critical'
    },
    {
      id: 'review-3',
      contentId: 'content-science-1',
      contentTitle: 'Cell Biology',
      subjectId: 'science',
      subjectName: 'Science',
      subjectColor: '#8B5CF6',
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 2,
      currentRetention: 62,
      repetitionCount: 3,
      priority: 'medium'
    },
    {
      id: 'review-4',
      contentId: 'content-history-1',
      contentTitle: 'World War II',
      subjectId: 'history',
      subjectName: 'History',
      subjectColor: '#F59E0B',
      scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 3,
      currentRetention: 78,
      repetitionCount: 4,
      priority: 'low'
    },
    {
      id: 'review-5',
      contentId: 'content-math-2',
      contentTitle: 'Linear Algebra',
      subjectId: 'math',
      subjectName: 'Mathematics',
      subjectColor: '#3B82F6',
      scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      daysUntilDue: 5,
      currentRetention: 85,
      repetitionCount: 5,
      priority: 'low'
    }
  ]

  // Generate overdue reviews
  const overdueReviews = upcomingReviews.filter(r => r.isOverdue)

  // Generate review history for heatmap
  const reviewHistory = Array.from({ length: 365 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (364 - i))
    const recency = i / 365
    const probability = 0.3 + recency * 0.4
    const count = Math.random() < probability ? Math.floor(Math.random() * 4) + 1 : 0
    return {
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count < 4 ? 3 : 4
    }
  })

  return {
    subjectCurves,
    upcomingReviews,
    overdueReviews,
    totalDue: upcomingReviews.length,
    reviewHistory
  }
}

export function SpacedRepetitionDashboard({ reviewData: propReviewData, onRefresh, fullWidth = false }: SpacedRepetitionDashboardProps) {
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeView, setActiveView] = useState<'overview' | 'queue' | 'stats'>('overview')
  const [useMockData, setUseMockData] = useState(false)

  // Use mock data if no real data is provided or user toggles it
  const reviewData = propReviewData || (useMockData ? generateMockData() : null)

  // Handle opening review modal from any component
  const handleOpenReviewModal = (review: any) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  // Show demo button if no data
  if (!reviewData) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="py-12 text-center">
          <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-sm">
            <Brain className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Spaced Repetition System</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Optimize your learning with scientifically-backed review scheduling. 
            Reviews are scheduled based on the forgetting curve to maximize retention.
          </p>
          <Button 
            size="lg" 
            onClick={() => setUseMockData(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            See Demo with Mock Data
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            Start learning and completing quizzes to generate your own review schedule
          </p>
        </CardContent>
      </Card>
    )
  }

  // Check if there are critical topics (retention < 40%)
  const criticalTopics = reviewData.upcomingReviews
    ?.filter((r: any) => r.currentRetention < 40)
    .map((r: any) => ({
      contentId: r.contentId,
      contentTitle: r.contentTitle,
      subject: r.subjectName,
      currentRetention: r.currentRetention,
      lastQuizScore: null
    })) || []

  // Use provided review history or empty array
  const mockReviewHistory = reviewData.reviewHistory || []

  // Mock achievements
  const mockAchievements = [
    { id: '1', title: 'First Review', description: 'Complete your first review', icon: 'star', unlocked: true, progress: 1, maxProgress: 1 },
    { id: '2', title: 'Week Warrior', description: '7-day streak', icon: 'flame', unlocked: true, progress: 7, maxProgress: 7 },
    { id: '3', title: 'Memory Master', description: '50 reviews completed', icon: 'brain', unlocked: false, progress: 12, maxProgress: 50 },
    { id: '4', title: 'Quick Learner', description: '10 reviews in a week', icon: 'zap', unlocked: true, progress: 10, maxProgress: 10 },
    { id: '5', title: 'Consistency King', description: '14-day streak', icon: 'crown', unlocked: false, progress: 5, maxProgress: 14 },
    { id: '6', title: 'Century Club', description: '100 reviews completed', icon: 'award', unlocked: false, progress: 12, maxProgress: 100 },
  ]

  // Subject data for radar
  const subjectData = reviewData.subjectCurves.map(curve => ({
    subjectId: curve.subjectId,
    subjectName: curve.subjectName,
    color: curve.color,
    currentRetention: curve.dataPoints[0]?.retention || 70,
    averageRetention: Math.round(curve.dataPoints.reduce((sum: number, p: any) => sum + p.retention, 0) / curve.dataPoints.length),
    trend: Math.random() > 0.5 ? 'up' : 'stable' as 'up' | 'down' | 'stable',
    reviewsCount: Math.floor(Math.random() * 20) + 5
  }))

  // Calculate stats
  const dueNow = reviewData.upcomingReviews?.filter((r: any) => r.daysUntilDue === 0).length || 0
  const thisWeek = reviewData.upcomingReviews?.filter((r: any) => r.daysUntilDue <= 7).length || 0

  // Full width layout - simplified horizontal layout
  if (fullWidth) {
    return (
      <div className="space-y-4">
        {/* Demo Banner */}
        {useMockData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <Sparkles className="w-4 h-4" />
              <span>Viewing demo data. Start learning to see your own review schedule!</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setUseMockData(false)}>
              Hide Demo
            </Button>
          </div>
        )}

        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className={cn(
            reviewData.totalDue > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
          )}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Due Now</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    reviewData.totalDue > 0 ? "text-red-600" : "text-green-600"
                  )}>
                    {dueNow}
                  </p>
                </div>
                <Brain className={cn(
                  "w-8 h-8",
                  reviewData.totalDue > 0 ? "text-red-400" : "text-green-400"
                )} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">{thisWeek}</p>
                </div>
                <CalendarDays className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Streak</p>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
                <Trophy className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Subjects</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {reviewData.subjectCurves?.length || 0}
                  </p>
                </div>
                <LayoutGrid className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tutor Suggestion for weak topics */}
        {criticalTopics.length > 0 && (
          <AITutorSuggestion weakTopics={criticalTopics} />
        )}

        {/* View Tabs - Full Width */}
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Queue</span>
              {reviewData.totalDue > 0 && (
                <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                  {reviewData.totalDue}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Forgetting Curve Graph - Full Width */}
            <ForgettingCurveGraph
              subjectCurves={reviewData.subjectCurves}
              upcomingReviews={reviewData.upcomingReviews}
              overdueReviews={reviewData.overdueReviews}
              totalDue={reviewData.totalDue}
              onReviewClick={handleOpenReviewModal}
              onContentClick={(contentId, contentTitle) => {
                const review = reviewData.upcomingReviews.find((r: any) => r.contentId === contentId)
                if (review) {
                  handleOpenReviewModal(review)
                } else {
                  handleOpenReviewModal({
                    id: `temp-${contentId}`,
                    contentId,
                    contentTitle: contentTitle || 'Review Item',
                    subjectName: 'General',
                    subjectColor: '#3B82F6',
                    currentRetention: 50,
                    daysUntilDue: 0,
                    priority: 'medium'
                  })
                }
              }}
            />

            {/* Subject Retention (Memory Retention) - Full Width */}
            <SubjectRetentionRadar subjects={subjectData} />

            {/* Calendar Sync - Full Width */}
            <CalendarExport upcomingReviews={reviewData.upcomingReviews} />
          </TabsContent>

          {/* Queue Tab */}
          <TabsContent value="queue" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SmartReviewQueue
                  reviews={reviewData.upcomingReviews.map((r: any) => ({
                    id: r.id,
                    contentId: r.contentId,
                    contentTitle: r.contentTitle,
                    subjectId: r.subjectId,
                    subjectName: r.subjectName,
                    subjectColor: r.subjectColor,
                    currentRetention: r.currentRetention,
                    estimatedMinutes: r.currentRetention < 40 ? 20 : r.currentRetention < 70 ? 15 : 10,
                    priority: r.priority,
                    daysOverdue: r.daysOverdue || 0,
                    lastReviewed: null,
                    difficulty: r.currentRetention > 70 ? 'easy' : r.currentRetention > 40 ? 'medium' : 'hard'
                  }))}
                  streakDays={5}
                />
              </div>
              <div>
                <ReviewImpactViz
                  contentTitle="Example: Cell Biology Review"
                  beforeRetention={45}
                  afterRetention={95}
                  nextReviewDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                  intervalDays={7}
                  previousInterval={3}
                />
              </div>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReviewHeatmap
                reviewHistory={mockReviewHistory}
                streakDays={5}
                longestStreak={12}
                totalReviews={156}
              />
              <ReviewStreakCard
                streakDays={5}
                longestStreak={12}
                totalReviews={156}
                weeklyReviews={8}
                achievements={mockAchievements}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Modal */}
        <ReviewNodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          review={selectedReview}
          onMarkKnown={() => {
            onRefresh?.()
          }}
          onSnooze={() => {
            onRefresh?.()
          }}
        />
      </div>
    )
  }

  // Default layout with tabs (used in sidebar/column layout)
  return (
    <div className="space-y-4">
      {/* Demo Banner */}
      {useMockData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-yellow-800">
            <Sparkles className="w-4 h-4" />
            <span>Viewing demo data. Start learning to see your own review schedule!</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setUseMockData(false)}>
            Hide Demo
          </Button>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className={cn(
          reviewData.totalDue > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
        )}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Due Now</p>
                <p className={cn(
                  "text-2xl font-bold",
                  reviewData.totalDue > 0 ? "text-red-600" : "text-green-600"
                )}>
                  {dueNow}
                </p>
              </div>
              <Brain className={cn(
                "w-8 h-8",
                reviewData.totalDue > 0 ? "text-red-400" : "text-green-400"
              )} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-blue-600">{thisWeek}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Streak</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Trophy className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Subjects</p>
                <p className="text-2xl font-bold text-purple-600">
                  {reviewData.subjectCurves?.length || 0}
                </p>
              </div>
              <LayoutGrid className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Tutor Suggestion for weak topics */}
      {criticalTopics.length > 0 && (
        <AITutorSuggestion weakTopics={criticalTopics} />
      )}

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Queue</span>
            {reviewData.totalDue > 0 && (
              <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                {reviewData.totalDue}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Forgetting Curve Graph - Full Width */}
          <ForgettingCurveGraph
            subjectCurves={reviewData.subjectCurves}
            upcomingReviews={reviewData.upcomingReviews}
            overdueReviews={reviewData.overdueReviews}
            totalDue={reviewData.totalDue}
            onReviewClick={handleOpenReviewModal}
            onContentClick={(contentId, contentTitle) => {
              const review = reviewData.upcomingReviews.find((r: any) => r.contentId === contentId)
              if (review) {
                handleOpenReviewModal(review)
              }
            }}
          />

          {/* Subject Retention (Memory Retention) - Full Width */}
          <SubjectRetentionRadar subjects={subjectData} />

          {/* Calendar Sync - Full Width */}
          <CalendarExport upcomingReviews={reviewData.upcomingReviews} />
        </TabsContent>

        {/* Queue Tab */}
        <TabsContent value="queue" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <SmartReviewQueue
                reviews={reviewData.upcomingReviews.map((r: any) => ({
                  id: r.id,
                  contentId: r.contentId,
                  contentTitle: r.contentTitle,
                  subjectId: r.subjectId,
                  subjectName: r.subjectName,
                  subjectColor: r.subjectColor,
                  currentRetention: r.currentRetention,
                  estimatedMinutes: r.currentRetention < 40 ? 20 : r.currentRetention < 70 ? 15 : 10,
                  priority: r.priority,
                  daysOverdue: r.daysOverdue || 0,
                  lastReviewed: null,
                  difficulty: r.currentRetention > 70 ? 'easy' : r.currentRetention > 40 ? 'medium' : 'hard'
                }))}
                streakDays={5}
              />
            </div>
            <div>
              <ReviewImpactViz
                contentTitle="Example: Cell Biology Review"
                beforeRetention={45}
                afterRetention={95}
                nextReviewDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                intervalDays={7}
                previousInterval={3}
              />
            </div>
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReviewHeatmap
              reviewHistory={mockReviewHistory}
              streakDays={5}
              longestStreak={12}
              totalReviews={156}
            />
            <ReviewStreakCard
              streakDays={5}
              longestStreak={12}
              totalReviews={156}
              weeklyReviews={8}
              achievements={mockAchievements}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <ReviewNodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
        onMarkKnown={() => {
          onRefresh?.()
        }}
        onSnooze={() => {
          onRefresh?.()
        }}
      />
    </div>
  )
}
