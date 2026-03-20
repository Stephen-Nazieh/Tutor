/**
 * Enhanced Student Cards with Predictive Insights
 * Pre-session brief and real-time struggle prediction
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Clock,
  Target,
  MessageSquare,
  BookOpen,
  Star,
  Zap,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  History,
  Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StudentInsight {
  studentId: string
  name: string
  avatar?: string

  // Pre-session context
  recentPerformance: {
    trend: 'improving' | 'stable' | 'declining'
    averageScore: number
    lastSessionScore?: number
    totalSessions: number
  }

  // Learning profile
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed'
  strengths: string[]
  struggleAreas: string[]

  // Historical context
  previousSessionNotes: {
    date: Date
    topic: string
    notes: string
    tutorNote?: string
  }[]

  // Predictive insights
  predictedEngagement: number // 0-100
  riskOfStruggle: 'low' | 'medium' | 'high'
  recommendedInterventions: string[]

  // Current session (if in progress)
  currentEngagement?: number
  currentComprehension?: number
  questionsAsked?: number
  handRaised?: boolean
}

interface StudentInsightCardProps {
  student: StudentInsight
  isExpanded?: boolean
  onToggleExpand?: () => void
  onSendNudge?: () => void
  onInviteToBreakout?: () => void
  onViewFullProfile?: () => void
  compact?: boolean // Compact mode for list view
}

export function StudentInsightCard({
  student,
  isExpanded = false,
  onToggleExpand,
  onSendNudge,
  onInviteToBreakout,
  onViewFullProfile,
  compact = false,
}: StudentInsightCardProps) {
  const [showHistory, setShowHistory] = useState(false)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <div className="h-4 w-4 rounded-full bg-yellow-400" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-400 bg-red-900/30 border-red-800'
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-800'
      default:
        return 'text-green-400 bg-green-900/30 border-green-800'
    }
  }

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual':
        return '👁️'
      case 'auditory':
        return '👂'
      case 'kinesthetic':
        return '✋'
      default:
        return '🧠'
    }
  }

  // Compact mode for student list
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors',
                student.riskOfStruggle === 'high'
                  ? 'border border-red-800/50 bg-red-900/20'
                  : 'bg-slate-800 hover:bg-slate-700'
              )}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                {student.riskOfStruggle !== 'low' && (
                  <div
                    className={cn(
                      'absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]',
                      student.riskOfStruggle === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    )}
                  >
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-white">{student.name}</span>
                  {getTrendIcon(student.recentPerformance.trend)}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Avg: {student.recentPerformance.averageScore}%</span>
                  {student.struggleAreas.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-yellow-400">
                        {student.struggleAreas.length} struggles
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="w-80 p-0">
            <CompactTooltipContent student={student} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Full expanded view
  return (
    <Card
      className={cn(
        'border-slate-700 bg-slate-800 transition-all',
        student.riskOfStruggle === 'high' && 'border-red-800/50'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-medium text-white">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-sm">
                {getLearningStyleIcon(student.learningStyle)}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg text-white">{student.name}</CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn('text-[10px]', getRiskColor(student.riskOfStruggle))}
                >
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {student.riskOfStruggle} risk
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  <Star className="mr-1 h-3 w-3" />
                  {student.recentPerformance.averageScore}% avg
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleExpand}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Performance Trend */}
        <div className="flex items-center justify-between rounded-lg bg-slate-700/50 p-3">
          <div className="flex items-center gap-3">
            {getTrendIcon(student.recentPerformance.trend)}
            <div>
              <p className="text-sm capitalize text-white">{student.recentPerformance.trend}</p>
              <p className="text-xs text-slate-400">Performance trend</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {student.recentPerformance.totalSessions} sessions
            </p>
            <p className="text-xs text-slate-400">Total attended</p>
          </div>
        </div>

        {/* Predicted Engagement */}
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-slate-400">
              <Brain className="h-4 w-4" />
              Predicted Engagement
            </span>
            <span
              className={cn(
                'font-medium',
                student.predictedEngagement >= 70
                  ? 'text-green-400'
                  : student.predictedEngagement >= 50
                    ? 'text-yellow-400'
                    : 'text-red-400'
              )}
            >
              {student.predictedEngagement}%
            </span>
          </div>
          <Progress value={student.predictedEngagement} className="h-2 bg-slate-700">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                student.predictedEngagement >= 70
                  ? 'bg-green-500'
                  : student.predictedEngagement >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              )}
              style={{ width: `${student.predictedEngagement}%` }}
            />
          </Progress>
        </div>

        {/* Strengths & Struggles */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-xs font-medium text-slate-400">
              <Award className="h-3 w-3" />
              Strengths
            </h4>
            <div className="flex flex-wrap gap-1">
              {student.strengths.map((strength, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-green-900/30 text-[10px] text-green-400"
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-xs font-medium text-slate-400">
              <Target className="h-3 w-3" />
              Focus Areas
            </h4>
            <div className="flex flex-wrap gap-1">
              {student.struggleAreas.map((area, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-red-900/30 text-[10px] text-red-400"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Interventions */}
        {student.recommendedInterventions.length > 0 && (
          <div className="rounded-lg border border-blue-800/50 bg-blue-900/20 p-3">
            <h4 className="mb-2 flex items-center gap-1 text-xs font-medium text-blue-400">
              <Lightbulb className="h-3 w-3" />
              AI Recommendations
            </h4>
            <ul className="space-y-1">
              {student.recommendedInterventions.map((intervention, i) => (
                <li key={i} className="flex items-start gap-1 text-xs text-slate-300">
                  <span className="mt-0.5 text-blue-400">•</span>
                  {intervention}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Previous Session Notes */}
        {student.previousSessionNotes.length > 0 && (
          <div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <History className="h-3 w-3" />
              Previous Session Notes ({student.previousSessionNotes.length})
              {showHistory ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            {showHistory && (
              <ScrollArea className="mt-2 h-32">
                <div className="space-y-2">
                  {student.previousSessionNotes.slice(0, 3).map((note, i) => (
                    <div key={i} className="rounded bg-slate-700/50 p-2 text-xs">
                      <div className="mb-1 flex items-center gap-2 text-slate-400">
                        <Clock className="h-3 w-3" />
                        {note.date.toLocaleDateString()}
                        <span>•</span>
                        {note.topic}
                      </div>
                      <p className="text-slate-300">{note.notes}</p>
                      {note.tutorNote && (
                        <p className="mt-1 italic text-yellow-400">Tutor: {note.tutorNote}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 border-t border-slate-700 pt-2">
          {student.riskOfStruggle !== 'low' && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-yellow-600/50 text-xs text-yellow-400 hover:bg-yellow-600/10"
              onClick={onSendNudge}
            >
              <Zap className="mr-1 h-3 w-3" />
              Send Nudge
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={onInviteToBreakout}
          >
            <MessageSquare className="mr-1 h-3 w-3" />
            1:1 Session
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={onViewFullProfile}
          >
            <BookOpen className="mr-1 h-3 w-3" />
            Full Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact tooltip content
function CompactTooltipContent({ student }: { student: StudentInsight }) {
  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-medium text-white">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-white">{student.name}</p>
          <p className="text-xs text-slate-400">{student.learningStyle} learner</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-slate-500">Avg Score</p>
          <p className="font-medium text-white">{student.recentPerformance.averageScore}%</p>
        </div>
        <div>
          <p className="text-slate-500">Sessions</p>
          <p className="font-medium text-white">{student.recentPerformance.totalSessions}</p>
        </div>
        <div>
          <p className="text-slate-500">Risk Level</p>
          <p
            className={cn(
              'font-medium capitalize',
              student.riskOfStruggle === 'high'
                ? 'text-red-400'
                : student.riskOfStruggle === 'medium'
                  ? 'text-yellow-400'
                  : 'text-green-400'
            )}
          >
            {student.riskOfStruggle}
          </p>
        </div>
        <div>
          <p className="text-slate-500">Predicted</p>
          <p className="font-medium text-white">{student.predictedEngagement}% engagement</p>
        </div>
      </div>

      {student.struggleAreas.length > 0 && (
        <div>
          <p className="mb-1 text-xs text-slate-500">Struggle Areas</p>
          <div className="flex flex-wrap gap-1">
            {student.struggleAreas.map((area, i) => (
              <span
                key={i}
                className="rounded bg-red-900/30 px-1.5 py-0.5 text-[10px] text-red-400"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {student.recommendedInterventions.length > 0 && (
        <div className="border-t border-slate-700 pt-2">
          <p className="mb-1 text-xs text-blue-400">💡 Recommendation</p>
          <p className="text-xs text-slate-300">{student.recommendedInterventions[0]}</p>
        </div>
      )}
    </div>
  )
}

// List component for multiple students
interface StudentInsightsListProps {
  students: StudentInsight[]
  onSelectStudent: (studentId: string) => void
  onSendNudge: (studentId: string) => void
  onInviteToBreakout: (studentId: string) => void
}

export function StudentInsightsList({
  students,
  onSelectStudent,
  onSendNudge,
  onInviteToBreakout,
}: StudentInsightsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Sort by risk level (high first)
  const sortedStudents = [...students].sort((a, b) => {
    const riskOrder = { high: 3, medium: 2, low: 1 }
    return riskOrder[b.riskOfStruggle] - riskOrder[a.riskOfStruggle]
  })

  return (
    <div className="space-y-3">
      {sortedStudents.map(student => (
        <StudentInsightCard
          key={student.studentId}
          student={student}
          compact={expandedId !== student.studentId}
          isExpanded={expandedId === student.studentId}
          onToggleExpand={() =>
            setExpandedId(expandedId === student.studentId ? null : student.studentId)
          }
          onSendNudge={() => onSendNudge(student.studentId)}
          onInviteToBreakout={() => onInviteToBreakout(student.studentId)}
          onViewFullProfile={() => onSelectStudent(student.studentId)}
        />
      ))}
    </div>
  )
}
