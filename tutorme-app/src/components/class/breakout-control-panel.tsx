// @ts-nocheck
/**
 * Enhanced Breakout Room Control Panel
 * Improved orchestration of group activities with smart grouping and monitoring
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  Users, 
  Plus, 
  X,
  AlertCircle,
  CheckCircle,
  Radio,
  DoorOpen,
  Timer,
  MessageSquare,
  MoreVertical,
  Pause,
  Play,
  Trash2,
  Settings2,
  Grid3X3,
  Maximize2,
  RotateCcw,
  Sparkles,
  Brain,
  Shuffle,
  UserPlus,
  Target,
  Megaphone,
  BarChart3,
  RefreshCw,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export interface BreakoutRoom {
  id: string
  name: string
  participants: {
    id: string
    name: string
    avatar?: string
    joinedAt: Date
    engagementScore?: number  // For smart grouping
  }[]
  status: 'forming' | 'active' | 'paused' | 'closed'
  timeRemaining?: number      // seconds
  aiEnabled: boolean
  assignedTask?: {
    id: string
    title: string
    description: string
    type: 'discussion' | 'problem' | 'project' | 'quiz'
  }
  alerts: {
    type: 'confusion' | 'conflict' | 'off_topic' | 'need_help' | 'quiet'
    message: string
    timestamp: Date
    severity: 'low' | 'medium' | 'high'
  }[]
  // Enhanced metrics
  metrics?: {
    messagesExchanged: number
    avgEngagement: number
    participationRate: number
    topicAdherence: number    // 0-100
  }
}

export interface SmartGroupingSuggestion {
  type: 'skill_based' | 'mixed_ability' | 'social' | 'random'
  description: string
  groups: {
    members: string[]  // student IDs
    rationale: string
    predictedOutcome: string
  }[]
}

interface BreakoutControlPanelProps {
  mainRoomId: string
  students: {
    id: string
    name: string
    avatar?: string
    userId: string
    engagementScore?: number
    skillLevel?: 'beginner' | 'intermediate' | 'advanced'
    recentPerformance?: number  // 0-100
  }[]
  breakoutRooms: BreakoutRoom[]
  onCreateRooms: (config: {
    roomCount: number
    participantsPerRoom: number
    distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select' | 'social'
    timeLimit: number
    aiAssistantEnabled: boolean
    suggestedGroups?: SmartGroupingSuggestion
  }) => void
  onCloseRooms: () => void
  onBroadcast: (message: string, target: 'all' | 'specific', roomIds?: string[]) => void
  onJoinRoom: (roomId: string) => void
  onAssignTask: (roomId: string, task: { title: string; description: string; type: string }) => void
  onExtendTime: (roomId: string, minutes: number) => void
  onRotateGroups?: () => void
  isCreating: boolean
}

// Predefined tasks for breakout rooms
const presetTasks = [
  {
    id: 'discuss',
    title: 'Group Discussion',
    description: 'Discuss the key concepts covered in today\'s lesson. Share your understanding and ask clarifying questions.',
    type: 'discussion' as const
  },
  {
    id: 'problem',
    title: 'Problem Solving',
    description: 'Work together to solve the assigned problem set. Each member should contribute their approach.',
    type: 'problem' as const
  },
  {
    id: 'peer-teach',
    title: 'Peer Teaching',
    description: 'Each student takes turns explaining a concept to the group. Teach each other!',
    type: 'discussion' as const
  },
  {
    id: 'project',
    title: 'Mini Project',
    description: 'Collaborate on creating a presentation or solution to the given challenge.',
    type: 'project' as const
  }
]

export function BreakoutControlPanel({
  students,
  breakoutRooms,
  onCreateRooms,
  onCloseRooms,
  onBroadcast,
  onJoinRoom,
  onExtendTime,
  onRotateGroups,
  isCreating
}: BreakoutControlPanelProps) {
  const [broadcastMessage, setBroadcastMessage] = useState('')
  const [showCreatePanel, setShowCreatePanel] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [showInsights, setShowInsights] = useState(false)
  const [config, setConfig] = useState({
    roomCount: 3,
    participantsPerRoom: 4,
    distributionMode: 'random' as const,
    timeLimit: 15,
    aiAssistantEnabled: true
  })

  const selectedRoom = breakoutRooms.find(r => r.id === selectedRoomId)

  const handleCreate = () => {
    onCreateRooms(config)
    setShowCreatePanel(false)
    toast.success(`Creating ${config.roomCount} breakout rooms...`)
  }

  // Generate smart grouping suggestions
  const generateSmartGrouping = useCallback((): SmartGroupingSuggestion | undefined => {
    if (students.length < 4) return undefined
    
    // Simulate AI analysis for smart grouping
    const beginners = students.filter(s => s.skillLevel === 'beginner' || (s.recentPerformance && s.recentPerformance < 60))
    const intermediate = students.filter(s => s.skillLevel === 'intermediate' || (s.recentPerformance && s.recentPerformance >= 60 && s.recentPerformance < 80))
    const advanced = students.filter(s => s.skillLevel === 'advanced' || (s.recentPerformance && s.recentPerformance >= 80))

    if (config.distributionMode === 'skill_based' && beginners.length > 0 && advanced.length > 0) {
      return {
        type: 'skill_based',
        description: 'Group students by similar skill levels for targeted instruction',
        groups: [
          {
            members: beginners.slice(0, 4).map(s => s.id),
            rationale: 'Beginners can work at a comfortable pace with foundational support',
            predictedOutcome: 'Higher confidence and reduced frustration'
          },
          {
            members: intermediate.slice(0, 4).map(s => s.id),
            rationale: 'Intermediate students can build on existing knowledge',
            predictedOutcome: 'Steady progress with peer collaboration'
          },
          {
            members: advanced.slice(0, 4).map(s => s.id),
            rationale: 'Advanced students can tackle complex challenges',
            predictedOutcome: 'Deeper exploration and leadership development'
          }
        ]
      }
    }

    if (config.distributionMode === 'social') {
      return {
        type: 'social',
        description: 'Mix skill levels to promote peer teaching and collaboration',
        groups: [
          {
            members: [
              ...(beginners.slice(0, 2).map(s => s.id)),
              ...(intermediate.slice(0, 1).map(s => s.id)),
              ...(advanced.slice(0, 1).map(s => s.id))
            ],
            rationale: 'Balanced group with mentorship opportunities',
            predictedOutcome: 'Enhanced learning through teaching and diverse perspectives'
          }
        ]
      }
    }

    return undefined
  }, [students, config.distributionMode])

  const smartSuggestion = useMemo(() => generateSmartGrouping(), [generateSmartGrouping])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'forming': return 'bg-blue-500'
      default: return 'bg-slate-500'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'confusion': return '❓'
      case 'conflict': return '⚠️'
      case 'off_topic': return '🎯'
      case 'need_help': return '🆘'
      case 'quiet': return '🔇'
      default: return '🔔'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-900/30'
      case 'medium': return 'text-yellow-400 bg-yellow-900/30'
      default: return 'text-blue-400 bg-blue-900/30'
    }
  }

  const activeAlerts = breakoutRooms.flatMap(r => 
    r.alerts.map(a => ({ ...a, roomName: r.name, roomId: r.id }))
  ).sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 }
    return severityOrder[b.severity] - severityOrder[a.severity]
  })

  // Aggregate metrics
  const aggregateMetrics = useMemo(() => {
    if (breakoutRooms.length === 0) return null
    
    const totalParticipants = breakoutRooms.reduce((acc, r) => acc + r.participants.length, 0)
    const activeRooms = breakoutRooms.filter(r => r.status === 'active').length
    const avgEngagement = breakoutRooms.reduce((acc, r) => acc + (r.metrics?.avgEngagement || 0), 0) / breakoutRooms.length
    const totalAlerts = activeAlerts.length
    
    return { totalParticipants, activeRooms, avgEngagement: Math.round(avgEngagement), totalAlerts }
  }, [breakoutRooms, activeAlerts])

  if (showCreatePanel) {
    return (
      <div className="h-full flex flex-col bg-slate-900 text-white p-6 overflow-auto">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-400" />
                Create Breakout Rooms
              </h2>
              <p className="text-slate-400">Configure and start breakout sessions</p>
            </div>
            <Button variant="outline" onClick={() => setShowCreatePanel(false)}>
              Cancel
            </Button>
          </div>

          {/* Smart Suggestion Banner */}
          {smartSuggestion && (
            <Card className="bg-purple-900/20 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI Grouping Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-3">{smartSuggestion.description}</p>
                <div className="space-y-2">
                  {smartSuggestion.groups.map((group, i) => (
                    <div key={i} className="p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">Group {i + 1}</span>
                        <Badge variant="outline" className="text-[10px]">{group.members.length} members</Badge>
                      </div>
                      <p className="text-xs text-slate-400">{group.rationale}</p>
                      <p className="text-xs text-green-400 mt-1">Expected: {group.predictedOutcome}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-base">Room Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Number of Rooms</label>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setConfig(c => ({ ...c, roomCount: Math.max(1, c.roomCount - 1) }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">{config.roomCount}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setConfig(c => ({ ...c, roomCount: Math.min(10, c.roomCount + 1) }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Students per Room</label>
                  <Select
                    value={config.participantsPerRoom.toString()}
                    onValueChange={(v) => setConfig(c => ({ ...c, participantsPerRoom: parseInt(v) }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 students</SelectItem>
                      <SelectItem value="3">3 students</SelectItem>
                      <SelectItem value="4">4 students</SelectItem>
                      <SelectItem value="5">5 students</SelectItem>
                      <SelectItem value="6">6 students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Time Limit (minutes)</label>
                  <Select
                    value={config.timeLimit.toString()}
                    onValueChange={(v) => setConfig(c => ({ ...c, timeLimit: parseInt(v) }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-base">Distribution Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: 'random', label: 'Random', desc: 'Mix students randomly', icon: <Shuffle className="h-4 w-4" /> },
                  { key: 'skill_based', label: 'Skill Based', desc: 'Group by performance level', icon: <Target className="h-4 w-4" /> },
                  { key: 'social', label: 'Social/Mixed', desc: 'Mix abilities for peer teaching', icon: <UserPlus className="h-4 w-4" /> },
                  { key: 'manual', label: 'Manual', desc: 'You assign students', icon: <Settings2 className="h-4 w-4" /> },
                ].map(({ key, label, desc, icon }) => (
                  <button
                    key={key}
                    onClick={() => setConfig(c => ({ ...c, distributionMode: key as any }))}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      config.distributionMode === key
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-slate-600 bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {config.distributionMode === key && (
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      )}
                      <div className="text-slate-400">{icon}</div>
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-slate-400">{desc}</p>
                      </div>
                    </div>
                  </button>
                ))}

                <div className="pt-4 border-t border-slate-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.aiAssistantEnabled}
                      onChange={(e) => setConfig(c => ({ ...c, aiAssistantEnabled: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-600"
                    />
                    <div>
                      <span className="block">Enable AI Assistant in rooms</span>
                      <span className="text-xs text-slate-400">AI will monitor and assist students</span>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowCreatePanel(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleCreate}>
              <DoorOpen className="h-4 w-4 mr-2" />
              Create {config.roomCount} Rooms
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (breakoutRooms.length === 0) {
    return (
      <div className="h-full flex flex-col bg-slate-900 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Grid3X3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Breakout Rooms</h2>
                <p className="text-sm text-slate-400">Manage small group sessions</p>
              </div>
            </div>
            <Button onClick={() => setShowCreatePanel(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Rooms
            </Button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Breakout Rooms</h3>
            <p className="text-slate-400 mb-6">
              Create breakout rooms to split students into smaller groups for focused discussions or activities.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {students.length} students available
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Grid3X3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Breakout Rooms</h2>
              <p className="text-sm text-slate-400">
                {breakoutRooms.length} active • {aggregateMetrics?.totalParticipants || 0} students
                {aggregateMetrics && (
                  <span className="ml-2">
                    • Avg Engagement: {aggregateMetrics.avgEngagement}%
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onRotateGroups && (
              <Button variant="outline" onClick={onRotateGroups}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Rotate Groups
              </Button>
            )}
            <Button variant="outline" onClick={onCloseRooms}>
              <X className="h-4 w-4 mr-2" />
              Close All
            </Button>
            <Button onClick={() => setShowCreatePanel(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>
        </div>

        {/* Metrics Bar */}
        {aggregateMetrics && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-slate-300">{aggregateMetrics.activeRooms} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-300">{aggregateMetrics.avgEngagement}% Engagement</span>
            </div>
            {aggregateMetrics.totalAlerts > 0 && (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-400">{aggregateMetrics.totalAlerts} Alerts</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Rooms Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {breakoutRooms.map((room) => (
              <Card 
                key={room.id} 
                className={cn(
                  "bg-slate-800 border-slate-700 cursor-pointer transition-all",
                  selectedRoomId === room.id && "border-blue-500 ring-1 ring-blue-500",
                  room.alerts.length > 0 && "border-yellow-700"
                )}
                onClick={() => setSelectedRoomId(selectedRoomId === room.id ? null : room.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(room.status)}`} />
                      <CardTitle className="text-white text-sm">{room.name}</CardTitle>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => { e.stopPropagation(); onJoinRoom(room.id); }}
                          >
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Join Room</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users className="h-3 w-3" />
                    {room.participants.length} participants
                    {room.aiEnabled && (
                      <Badge variant="secondary" className="text-xs bg-purple-600/50">
                        <Brain className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Participants */}
                  <div className="flex -space-x-2">
                    {room.participants.slice(0, 4).map((p) => (
                      <TooltipProvider key={p.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-xs cursor-pointer hover:z-10 hover:ring-2 hover:ring-blue-500"
                              title={p.name}
                            >
                              {p.name.charAt(0).toUpperCase()}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{p.name}</p>
                            {p.engagementScore && (
                              <p className="text-xs text-slate-400">Engagement: {p.engagementScore}%</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    {room.participants.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs">
                        +{room.participants.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Assigned Task */}
                  {room.assignedTask && (
                    <div className="p-2 bg-slate-700/50 rounded text-xs">
                      <p className="text-slate-300 font-medium">{room.assignedTask.title}</p>
                      <p className="text-slate-500 truncate">{room.assignedTask.description}</p>
                    </div>
                  )}

                  {/* Room Metrics */}
                  {room.metrics && (
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="text-slate-400">
                        Messages: <span className="text-white">{room.metrics.messagesExchanged}</span>
                      </div>
                      <div className="text-slate-400">
                        Engagement: <span className="text-white">{Math.round(room.metrics.avgEngagement)}%</span>
                      </div>
                    </div>
                  )}

                  {/* Timer */}
                  {room.timeRemaining && (
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-slate-400" />
                      <span className={room.timeRemaining < 60 ? 'text-red-400' : 'text-slate-300'}>
                        {Math.floor(room.timeRemaining / 60)}:{String(room.timeRemaining % 60).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  {/* Alerts */}
                  {room.alerts.length > 0 && (
                    <div className="space-y-1">
                      {room.alerts.slice(0, 2).map((alert, i) => (
                        <div key={i} className={cn(
                          "flex items-center gap-2 text-xs px-2 py-1 rounded",
                          getSeverityColor(alert.severity)
                        )}>
                          <span>{getAlertIcon(alert.type)}</span>
                          <span className="truncate">{alert.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - Broadcast & Alerts & Room Details */}
        <div className="w-80 border-l border-slate-700 bg-slate-800 p-4 space-y-4 overflow-auto">
          {/* Broadcast */}
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Broadcast to All
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Message to all rooms..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="bg-slate-800 border-slate-600 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && broadcastMessage) {
                    onBroadcast(broadcastMessage, 'all')
                    setBroadcastMessage('')
                    toast.success('Broadcast sent to all rooms')
                  }
                }}
              />
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  disabled={!broadcastMessage}
                  onClick={() => {
                    onBroadcast(broadcastMessage, 'all')
                    setBroadcastMessage('')
                    toast.success('Broadcast sent to all rooms')
                  }}
                >
                  <Radio className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              
              {/* Quick Messages */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-600">
                {['5 min left!', 'Wrap up soon', 'Great work!', 'Need help?'].map((msg) => (
                  <button
                    key={msg}
                    onClick={() => {
                      onBroadcast(msg, 'all')
                      toast.success(`Sent: "${msg}"`)
                    }}
                    className="text-[10px] px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-slate-300 transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Room Details */}
          {selectedRoom && (
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  {selectedRoom.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Assign Task */}
                <div>
                  <label className="text-xs text-slate-400 block mb-2">Assign Task</label>
                  <div className="space-y-1">
                    {presetTasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => {
                          // Would call onAssignTask here
                          toast.success(`Task assigned to ${selectedRoom.name}`)
                        }}
                        className="w-full text-left p-2 text-xs bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                      >
                        <span className="font-medium text-white">{task.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extend Time */}
                <div>
                  <label className="text-xs text-slate-400 block mb-2">Extend Time</label>
                  <div className="flex gap-1">
                    {[5, 10, 15].map(mins => (
                      <Button 
                        key={mins}
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs h-7"
                        onClick={() => {
                          onExtendTime(selectedRoom.id, mins)
                          toast.success(`Extended ${selectedRoom.name} by ${mins}m`)
                        }}
                      >
                        +{mins}m
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Room-specific Broadcast */}
                <div className="pt-2 border-t border-slate-600">
                  <Input
                    placeholder={`Message to ${selectedRoom.name}...`}
                    className="bg-slate-800 border-slate-600 text-xs mb-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const msg = (e.target as HTMLInputElement).value
                        if (msg) {
                          onBroadcast(msg, 'specific', [selectedRoom.id])
                          ;(e.target as HTMLInputElement).value = ''
                          toast.success(`Message sent to ${selectedRoom.name}`)
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  Active Alerts ({activeAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-60 overflow-auto">
                {activeAlerts.map((alert, i) => (
                  <div key={i} className={cn(
                    "p-2 rounded text-sm",
                    getSeverityColor(alert.severity)
                  )}>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span>{getAlertIcon(alert.type)}</span>
                      <span className="font-medium">{alert.roomName}</span>
                      <Badge variant="outline" className="text-[10px] capitalize ml-auto">
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-slate-300">{alert.message}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium mb-3 text-slate-400">Session Stats</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{breakoutRooms.filter(r => r.status === 'active').length}</p>
                <p className="text-xs text-slate-400">Active</p>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{activeAlerts.length}</p>
                <p className="text-xs text-slate-400">Alerts</p>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">
                  {breakoutRooms.reduce((acc, r) => acc + (r.metrics?.messagesExchanged || 0), 0)}
                </p>
                <p className="text-xs text-slate-400">Messages</p>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{aggregateMetrics?.avgEngagement || 0}%</p>
                <p className="text-xs text-slate-400">Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
