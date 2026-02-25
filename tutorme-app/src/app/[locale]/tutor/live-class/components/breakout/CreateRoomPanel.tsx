'use client'

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
import { cn } from '@/lib/utils'
import type { LiveStudent, BreakoutSessionConfig, SmartGroupingSuggestion } from '../../types'
import {
  X,
  Plus,
  Brain,
  Target,
  Shuffle,
  UserPlus,
  Settings2,
  Users,
  CheckCircle,
  Sparkles,
  DoorOpen,
  Clock
} from 'lucide-react'

interface CreateRoomPanelProps {
  config: BreakoutSessionConfig
  setConfig: (config: BreakoutSessionConfig) => void
  suggestion?: SmartGroupingSuggestion
  students: LiveStudent[]
  onCreate: () => void
  onCancel: () => void
}

const DISTRIBUTION_MODES = [
  { key: 'random', label: 'Random', description: 'Mix students randomly', icon: Shuffle },
  { key: 'skill_based', label: 'Skill Based', description: 'Group by performance level', icon: Target },
  { key: 'social', label: 'Social/Mixed', description: 'Mix abilities for peer teaching', icon: UserPlus },
  { key: 'manual', label: 'Manual', description: 'You assign students', icon: Settings2 },
  { key: 'self_select', label: 'Self Select', description: 'Students choose groups', icon: Users },
] as const

export function CreateRoomPanel({
  config,
  setConfig,
  suggestion,
  students,
  onCreate,
  onCancel
}: CreateRoomPanelProps) {
  const onlineStudents = students.filter(s => s.status === 'online')

  return (
    <div className="h-full flex flex-col bg-gray-50 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Create Breakout Rooms
            </h2>
            <p className="text-gray-500">Configure and start breakout sessions</p>
          </div>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>

        {/* Smart Grouping Suggestion Banner */}
        {suggestion && (
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900 text-base flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Grouping Suggestion
                <Badge variant="secondary" className="ml-2">
                  {Math.round(suggestion.confidence * 100)}% confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-800 mb-3">{suggestion.description}</p>
              <div className="space-y-2">
                {suggestion.groups.map((group, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Group {i + 1}</span>
                      <Badge variant="outline" className="text-[10px]">{group.members.length} members</Badge>
                      <div className="flex gap-1 ml-auto">
                        {group.skillProfile.beginners > 0 && (
                          <Badge className="text-[10px] bg-blue-100 text-blue-700">{group.skillProfile.beginners} B</Badge>
                        )}
                        {group.skillProfile.intermediate > 0 && (
                          <Badge className="text-[10px] bg-green-100 text-green-700">{group.skillProfile.intermediate} I</Badge>
                        )}
                        {group.skillProfile.advanced > 0 && (
                          <Badge className="text-[10px] bg-purple-100 text-purple-700">{group.skillProfile.advanced} A</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{group.rationale}</p>
                    <p className="text-xs text-green-600 mt-1">Expected: {group.predictedOutcome}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Room Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Room Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Number of Rooms</label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setConfig({ ...config, roomCount: Math.max(1, config.roomCount - 1) })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">{config.roomCount}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setConfig({ ...config, roomCount: Math.min(10, config.roomCount + 1) })}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Students per Room</label>
                <Select
                  value={config.participantsPerRoom.toString()}
                  onValueChange={(v) => setConfig({ ...config, participantsPerRoom: parseInt(v) })}
                >
                  <SelectTrigger>
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
                <label className="text-sm text-gray-600">Time Limit (minutes)</label>
                <Select
                  value={config.timeLimit.toString()}
                  onValueChange={(v) => setConfig({ ...config, timeLimit: parseInt(v) })}
                >
                  <SelectTrigger>
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

          {/* Distribution Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribution Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DISTRIBUTION_MODES.map(({ key, label, description, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setConfig({ ...config, distributionMode: key as any })}
                  className={cn(
                    "w-full p-3 rounded-lg border text-left transition-colors",
                    config.distributionMode === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {config.distributionMode === key && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                    <div className={cn("text-gray-400", config.distributionMode === key && "text-blue-600")}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                </button>
              ))}

              <div className="pt-4 border-t">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.aiAssistantEnabled}
                    onChange={(e) => setConfig({ ...config, aiAssistantEnabled: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <div>
                    <span className="block text-sm font-medium">Enable AI Assistant in rooms</span>
                    <span className="text-xs text-gray-500">AI will monitor and assist students</span>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    <strong>{onlineStudents.length}</strong> students available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    <strong>{config.roomCount}</strong> rooms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    <strong>{config.timeLimit}</strong> minutes
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={onCreate}>
            <DoorOpen className="h-4 w-4 mr-2" />
            Create {config.roomCount} Room{config.roomCount !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  )
}
