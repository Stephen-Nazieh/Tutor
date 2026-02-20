/**
 * Post-Session Auto-Generated Insights
 * AI-generated lesson summaries, engagement reports, and follow-up tasks
 */

'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  FileText, 
  BarChart3, 
  Users, 
  Clock, 
  MessageSquare,
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Bookmark,
  Send,
  ChevronRight,
  Calendar,
  BookOpen,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SessionInsights {
  sessionId: string
  sessionTitle: string
  date: Date
  duration: number  // minutes
  
  // AI Summary
  aiSummary: {
    keyConcepts: string[]
    mainTopics: string[]
    studentQuestions: string[]
    challengingConcepts: string[]
    overallAssessment: string
  }
  
  // Engagement Metrics
  engagement: {
    averageEngagement: number
    peakEngagement: number
    lowEngagement: number
    participationRate: number
    chatActivity: number
    handRaises: number
    timeOnTask: number  // percentage
  }
  
  // Student Breakdown
  studentPerformance: {
    studentId: string
    name: string
    engagement: number
    participation: number
    questionsAsked: number
    timeAway: number  // minutes
    flaggedForFollowUp: boolean
  }[]
  
  // Timeline bookmarks
  bookmarks: {
    timestamp: number  // seconds from start
    type: 'key_moment' | 'question' | 'struggle' | 'breakthrough' | 'technical'
    description: string
    aiNote?: string
  }[]
  
  // Follow-up recommendations
  followUp: {
    studentsNeedingHelp: string[]
    suggestedReviewTopics: string[]
    recommendedAssignments: {
      title: string
      type: string
      assignedTo: string[]
      rationale: string
    }[]
    nextSessionSuggestions: string[]
  }
}

interface PostSessionInsightsProps {
  insights: SessionInsights
  onDownloadReport: () => void
  onShareReport: () => void
  onCreateAssignments: () => void
  onScheduleFollowUp: (studentIds: string[]) => void
}

export function PostSessionInsights({ 
  insights, 
  onDownloadReport,
  onShareReport,
  onCreateAssignments,
  onScheduleFollowUp
}: PostSessionInsightsProps) {
  const [activeTab, setActiveTab] = useState('summary')

  // Calculate statistics
  const stats = useMemo(() => {
    const totalStudents = insights.studentPerformance.length
    const highlyEngaged = insights.studentPerformance.filter(s => s.engagement >= 75).length
    const struggling = insights.studentPerformance.filter(s => s.engagement < 50).length
    const flagged = insights.studentPerformance.filter(s => s.flaggedForFollowUp).length
    
    return { totalStudents, highlyEngaged, struggling, flagged }
  }, [insights])

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-600">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Generated
              </Badge>
              <span className="text-slate-400 text-sm">
                {insights.date.toLocaleDateString()} • {Math.floor(insights.duration / 60)}h {insights.duration % 60}m
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{insights.sessionTitle}</h1>
            <p className="text-slate-400 mt-1">Session Insights & Analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDownloadReport}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onShareReport}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard
            label="Avg Engagement"
            value={`${insights.engagement.averageEngagement}%`}
            icon={<BarChart3 className="h-5 w-5" />}
            color={insights.engagement.averageEngagement >= 70 ? 'green' : insights.engagement.averageEngagement >= 50 ? 'yellow' : 'red'}
          />
          <StatCard
            label="Participation"
            value={`${insights.engagement.participationRate}%`}
            icon={<Users className="h-5 w-5" />}
            color="blue"
          />
          <StatCard
            label="Time on Task"
            value={`${insights.engagement.timeOnTask}%`}
            icon={<Clock className="h-5 w-5" />}
            color="purple"
          />
          <StatCard
            label="Need Follow-up"
            value={stats.flagged.toString()}
            icon={<AlertCircle className="h-5 w-5" />}
            color={stats.flagged > 0 ? 'red' : 'green'}
          />
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="px-6 border-b border-slate-700">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="summary" className="data-[state=active]:bg-slate-700">
              <FileText className="h-4 w-4 mr-1" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-1" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-1" />
              Students
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
              <Clock className="h-4 w-4 mr-1" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="followup" className="data-[state=active]:bg-slate-700">
              <Target className="h-4 w-4 mr-1" />
              Follow-up
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          {/* Summary Tab */}
          <TabsContent value="summary" className="m-0">
            <div className="grid grid-cols-2 gap-6">
              {/* AI Summary */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    AI Session Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {insights.aiSummary.overallAssessment}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Key Concepts Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {insights.aiSummary.keyConcepts.map((concept, i) => (
                        <Badge key={i} variant="secondary" className="bg-blue-900/30 text-blue-400">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {insights.aiSummary.challengingConcepts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Concepts Needing Review</h4>
                      <div className="flex flex-wrap gap-2">
                        {insights.aiSummary.challengingConcepts.map((concept, i) => (
                          <Badge key={i} variant="secondary" className="bg-yellow-900/30 text-yellow-400">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Student Questions */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                    Key Questions Asked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {insights.aiSummary.studentQuestions.map((question, i) => (
                        <div key={i} className="p-3 bg-slate-700/50 rounded-lg">
                          <p className="text-sm text-slate-300">"{question}"</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="m-0">
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700 col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Engagement Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <EngagementChart insights={insights} />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base">Activity Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ActivityBar 
                    label="Chat Messages"
                    value={insights.engagement.chatActivity}
                    max={100}
                    icon={<MessageSquare className="h-4 w-4" />}
                  />
                  <ActivityBar 
                    label="Hand Raises"
                    value={insights.engagement.handRaises}
                    max={20}
                    icon={<Target className="h-4 w-4" />}
                  />
                  <ActivityBar 
                    label="Time on Task"
                    value={insights.engagement.timeOnTask}
                    max={100}
                    icon={<Clock className="h-4 w-4" />}
                    suffix="%"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="m-0">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Student Performance</CardTitle>
                  <Button size="sm" onClick={() => onScheduleFollowUp(
                    insights.studentPerformance.filter(s => s.flaggedForFollowUp).map(s => s.studentId)
                  )}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule Follow-ups
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {insights.studentPerformance
                      .sort((a, b) => b.engagement - a.engagement)
                      .map(student => (
                        <StudentPerformanceRow 
                          key={student.studentId} 
                          student={student}
                          onScheduleFollowUp={() => onScheduleFollowUp([student.studentId])}
                        />
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="m-0">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Session Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {insights.bookmarks.map((bookmark, i) => (
                    <TimelineItem 
                      key={i} 
                      bookmark={bookmark} 
                      isLast={i === insights.bookmarks.length - 1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Follow-up Tab */}
          <TabsContent value="followup" className="m-0">
            <div className="grid grid-cols-2 gap-6">
              {/* Suggested Actions */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.followUp.recommendedAssignments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Suggested Assignments</h4>
                      <div className="space-y-2">
                        {insights.followUp.recommendedAssignments.map((assignment, i) => (
                          <div key={i} className="p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-white text-sm">{assignment.title}</span>
                              <Badge variant="outline" className="text-[10px]">{assignment.type}</Badge>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">{assignment.rationale}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">
                                {assignment.assignedTo.length} students
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button size="sm" className="w-full mt-3" onClick={onCreateAssignments}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Create Assignments
                      </Button>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Topics for Next Session</h4>
                    <ul className="space-y-1">
                      {insights.followUp.nextSessionSuggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Review Topics */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-yellow-400" />
                    Topics Needing Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.followUp.suggestedReviewTopics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0" />
                        <span className="text-sm text-white">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {insights.followUp.studentsNeedingHelp.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-700">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">
                        Students Needing Additional Help
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {insights.followUp.studentsNeedingHelp.map((name, i) => (
                          <Badge key={i} variant="secondary" className="bg-red-900/30 text-red-400">
                            {name}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => onScheduleFollowUp([])}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Help Sessions
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

// Stat Card Component
function StatCard({ label, value, icon, color }: { 
  label: string
  value: string
  icon: React.ReactNode
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple'
}) {
  const colorClasses = {
    green: 'bg-green-900/30 text-green-400',
    yellow: 'bg-yellow-900/30 text-yellow-400',
    red: 'bg-red-900/30 text-red-400',
    blue: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400'
  }

  return (
    <div className="bg-slate-700/50 rounded-lg p-4">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", colorClasses[color])}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

// Activity Bar Component
function ActivityBar({ label, value, max, icon, suffix = '' }: {
  label: string
  value: number
  max: number
  icon: React.ReactNode
  suffix?: string
}) {
  const percentage = (value / max) * 100
  
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="flex items-center gap-2 text-slate-400">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-white font-medium">{value}{suffix}</span>
      </div>
      <Progress value={percentage} className="h-2 bg-slate-700">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </Progress>
    </div>
  )
}

// Student Performance Row
function StudentPerformanceRow({ student, onScheduleFollowUp }: {
  student: SessionInsights['studentPerformance'][0]
  onScheduleFollowUp: () => void
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-3 rounded-lg",
      student.flaggedForFollowUp ? "bg-red-900/20 border border-red-800/50" : "bg-slate-700/50"
    )}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium shrink-0">
        {student.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{student.name}</span>
          {student.flaggedForFollowUp && (
            <Badge variant="outline" className="text-[10px] border-red-600 text-red-400">
              Needs Follow-up
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
          <span>Engagement: {student.engagement}%</span>
          <span>Questions: {student.questionsAsked}</span>
          {student.timeAway > 0 && (
            <span className="text-yellow-400">Away: {student.timeAway}m</span>
          )}
        </div>
      </div>
      <div className="w-24">
        <Progress value={student.participation} className="h-1.5 bg-slate-700">
          <div 
            className={cn(
              "h-full rounded-full",
              student.participation >= 70 ? 'bg-green-500' : 
              student.participation >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            )}
            style={{ width: `${student.participation}%` }}
          />
        </Progress>
        <span className="text-[10px] text-slate-500">Participation</span>
      </div>
      {student.flaggedForFollowUp && (
        <Button size="sm" variant="outline" onClick={onScheduleFollowUp}>
          <Send className="h-3 w-3 mr-1" />
          Follow-up
        </Button>
      )}
    </div>
  )
}

// Timeline Item
function TimelineItem({ bookmark, isLast }: { 
  bookmark: SessionInsights['bookmarks'][0]
  isLast: boolean 
}) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'key_moment': return <Bookmark className="h-4 w-4 text-blue-400" />
      case 'question': return <MessageSquare className="h-4 w-4 text-green-400" />
      case 'struggle': return <AlertCircle className="h-4 w-4 text-red-400" />
      case 'breakthrough': return <Zap className="h-4 w-4 text-yellow-400" />
      default: return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
          {getTypeIcon(bookmark.type)}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-slate-700 my-1" />}
      </div>
      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-500">{formatTime(bookmark.timestamp)}</span>
          <Badge variant="outline" className="text-[10px] capitalize">
            {bookmark.type.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-sm text-white">{bookmark.description}</p>
        {bookmark.aiNote && (
          <p className="text-xs text-slate-400 mt-1 italic">{bookmark.aiNote}</p>
        )}
      </div>
    </div>
  )
}

// Engagement Chart (Simplified visual representation)
function EngagementChart({ insights }: { insights: SessionInsights }) {
  // Generate mock data points for the chart
  const dataPoints = useMemo(() => {
    const points = []
    const segments = 20
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments
      // Simulate engagement fluctuation
      const baseEngagement = insights.engagement.averageEngagement
      const variance = Math.sin(progress * Math.PI * 4) * 15
      const randomVariance = (Math.random() - 0.5) * 10
      points.push(Math.max(0, Math.min(100, baseEngagement + variance + randomVariance)))
    }
    return points
  }, [insights])

  const maxValue = Math.max(...dataPoints)
  const minValue = Math.min(...dataPoints)

  return (
    <div className="h-48 flex items-end gap-1">
      {dataPoints.map((value, i) => (
        <div
          key={i}
          className="flex-1 bg-blue-500/50 hover:bg-blue-500 transition-colors rounded-t"
          style={{ height: `${value}%` }}
          title={`${Math.round(value)}% engagement`}
        />
      ))}
    </div>
  )
}
