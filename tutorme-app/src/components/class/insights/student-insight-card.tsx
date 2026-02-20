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
  Award
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
  predictedEngagement: number  // 0-100
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
  compact?: boolean  // Compact mode for list view
}

export function StudentInsightCard({
  student,
  isExpanded = false,
  onToggleExpand,
  onSendNudge,
  onInviteToBreakout,
  onViewFullProfile,
  compact = false
}: StudentInsightCardProps) {
  const [showHistory, setShowHistory] = useState(false)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-400" />
      default: return <div className="h-4 w-4 rounded-full bg-yellow-400" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-900/30 border-red-800'
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800'
      default: return 'text-green-400 bg-green-900/30 border-green-800'
    }
  }

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual': return '👁️'
      case 'auditory': return '👂'
      case 'kinesthetic': return '✋'
      default: return '🧠'
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
                "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                student.riskOfStruggle === 'high' ? "bg-red-900/20 border border-red-800/50" : "bg-slate-800 hover:bg-slate-700"
              )}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                {student.riskOfStruggle !== 'low' && (
                  <div className={cn(
                    "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]",
                    student.riskOfStruggle === 'high' ? "bg-red-500" : "bg-yellow-500"
                  )}>
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm truncate">{student.name}</span>
                  {getTrendIcon(student.recentPerformance.trend)}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Avg: {student.recentPerformance.averageScore}%</span>
                  {student.struggleAreas.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-yellow-400">{student.struggleAreas.length} struggles</span>
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
    <Card className={cn(
      "bg-slate-800 border-slate-700 transition-all",
      student.riskOfStruggle === 'high' && "border-red-800/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-sm">
                {getLearningStyleIcon(student.learningStyle)}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg text-white">{student.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={cn("text-[10px]", getRiskColor(student.riskOfStruggle))}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {student.riskOfStruggle} risk
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  <Star className="h-3 w-3 mr-1" />
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
        <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            {getTrendIcon(student.recentPerformance.trend)}
            <div>
              <p className="text-sm text-white capitalize">{student.recentPerformance.trend}</p>
              <p className="text-xs text-slate-400">Performance trend</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{student.recentPerformance.totalSessions} sessions</p>
            <p className="text-xs text-slate-400">Total attended</p>
          </div>
        </div>

        {/* Predicted Engagement */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Predicted Engagement
            </span>
            <span className={cn(
              "font-medium",
              student.predictedEngagement >= 70 ? 'text-green-400' : 
              student.predictedEngagement >= 50 ? 'text-yellow-400' : 'text-red-400'
            )}>
              {student.predictedEngagement}%
            </span>
          </div>
          <Progress value={student.predictedEngagement} className="h-2 bg-slate-700">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                student.predictedEngagement >= 70 ? 'bg-green-500' : 
                student.predictedEngagement >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              )}
              style={{ width: `${student.predictedEngagement}%` }}
            />
          </Progress>
        </div>

        {/* Strengths & Struggles */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1">
              <Award className="h-3 w-3" />
              Strengths
            </h4>
            <div className="flex flex-wrap gap-1">
              {student.strengths.map((strength, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] bg-green-900/30 text-green-400">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1">
              <Target className="h-3 w-3" />
              Focus Areas
            </h4>
            <div className="flex flex-wrap gap-1">
              {student.struggleAreas.map((area, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] bg-red-900/30 text-red-400">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Interventions */}
        {student.recommendedInterventions.length > 0 && (
          <div className="p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
            <h4 className="text-xs font-medium text-blue-400 mb-2 flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              AI Recommendations
            </h4>
            <ul className="space-y-1">
              {student.recommendedInterventions.map((intervention, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-1">
                  <span className="text-blue-400 mt-0.5">•</span>
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
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <History className="h-3 w-3" />
              Previous Session Notes ({student.previousSessionNotes.length})
              {showHistory ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            
            {showHistory && (
              <ScrollArea className="h-32 mt-2">
                <div className="space-y-2">
                  {student.previousSessionNotes.slice(0, 3).map((note, i) => (
                    <div key={i} className="p-2 bg-slate-700/50 rounded text-xs">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Clock className="h-3 w-3" />
                        {note.date.toLocaleDateString()}
                        <span>•</span>
                        {note.topic}
                      </div>
                      <p className="text-slate-300">{note.notes}</p>
                      {note.tutorNote && (
                        <p className="text-yellow-400 mt-1 italic">Tutor: {note.tutorNote}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-700">
          {student.riskOfStruggle !== 'low' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10"
              onClick={onSendNudge}
            >
              <Zap className="h-3 w-3 mr-1" />
              Send Nudge
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={onInviteToBreakout}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            1:1 Session
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={onViewFullProfile}
          >
            <BookOpen className="h-3 w-3 mr-1" />
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
    <div className="p-3 space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
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
          <p className={cn(
            "font-medium capitalize",
            student.riskOfStruggle === 'high' ? 'text-red-400' : 
            student.riskOfStruggle === 'medium' ? 'text-yellow-400' : 'text-green-400'
          )}>
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
          <p className="text-xs text-slate-500 mb-1">Struggle Areas</p>
          <div className="flex flex-wrap gap-1">
            {student.struggleAreas.map((area, i) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-red-900/30 text-red-400 rounded">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {student.recommendedInterventions.length > 0 && (
        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-blue-400 mb-1">💡 Recommendation</p>
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
  onInviteToBreakout
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
          onToggleExpand={() => setExpandedId(expandedId === student.studentId ? null : student.studentId)}
          onSendNudge={() => onSendNudge(student.studentId)}
          onInviteToBreakout={() => onInviteToBreakout(student.studentId)}
          onViewFullProfile={() => onSelectStudent(student.studentId)}
        />
      ))}
    </div>
  )
}
