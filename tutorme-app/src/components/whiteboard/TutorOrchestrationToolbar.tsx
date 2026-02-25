/**
 * Tutor Orchestration Toolbar Component
 * 
 * Provides tutor controls for pushing exemplars, spotlighting, and bulk operations.
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { 
  MonitorUp, 
  Users,
  Lock,
  Unlock,
  Eraser,
  Eye,
  Send,
  ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { StudentInfo } from '@/lib/whiteboard/orchestration'

interface TutorOrchestrationToolbarProps {
  students: StudentInfo[]
  lockedLayers: string[]
  isGloballyMuted: boolean
  spotlightStudentId?: string
  onPushExemplar: () => void
  onStartSpotlight: (studentId: string) => void
  onStopSpotlight: () => void
  onLockLayers: (layers: string[]) => void
  onUnlockLayers: (layers: string[]) => void
  onClearAll: () => void
  onToggleGlobalMute: () => void
  onSelectStudents: (studentIds: string[]) => void
  className?: string
}

export function TutorOrchestrationToolbar({
  students,
  lockedLayers,
  isGloballyMuted,
  spotlightStudentId,
  onPushExemplar,
  onStartSpotlight,
  onStopSpotlight,
  onLockLayers,
  onUnlockLayers,
  onClearAll,
  onToggleGlobalMute,
  onSelectStudents,
  className,
}: TutorOrchestrationToolbarProps) {
  const [showStudentSelector, setShowStudentSelector] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const onlineStudents = students.filter(s => s.isOnline)
  const offlineStudents = students.filter(s => !s.isOnline)

  const handleSelectAll = useCallback(() => {
    setSelectedStudents(onlineStudents.map(s => s.id))
  }, [onlineStudents])

  const handleClearSelection = useCallback(() => {
    setSelectedStudents([])
  }, [])

  const handleToggleStudent = useCallback((studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }, [])

  return (
    <div className={cn('bg-white border rounded-lg p-2 shadow-sm', className)}>
      <div className="flex items-center gap-2">
        {/* Push Exemplar */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onPushExemplar}
        >
          <Send className="w-4 h-4" />
          Push Exemplar
        </Button>

        {/* Spotlight */}
        <Dialog open={showStudentSelector} onOpenChange={setShowStudentSelector}>
          <DialogTrigger asChild>
            <Button
              variant={spotlightStudentId ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {spotlightStudentId ? 'Viewing Student' : 'Spotlight'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Student to Spotlight</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleSelectAll}>
                  Select All Online
                </Button>
                <Button size="sm" variant="outline" onClick={handleClearSelection}>
                  Clear
                </Button>
              </div>

              <div className="border rounded-lg max-h-64 overflow-y-auto">
                {/* Online Students */}
                <div className="px-3 py-2 bg-green-50 text-xs font-medium text-green-700">
                  Online ({onlineStudents.length})
                </div>
                {onlineStudents.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleToggleStudent(student.id)}
                      className="rounded"
                    />
                    <span className="text-sm">{student.name}</span>
                    <span className="text-xs text-green-600 ml-auto">● Online</span>
                  </label>
                ))}

                {/* Offline Students */}
                {offlineStudents.length > 0 && (
                  <>
                    <div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-500">
                      Offline ({offlineStudents.length})
                    </div>
                    {offlineStudents.map((student) => (
                      <label
                        key={student.id}
                        className="flex items-center gap-3 px-3 py-2 opacity-50 cursor-not-allowed"
                      >
                        <input
                          type="checkbox"
                          disabled
                          className="rounded"
                        />
                        <span className="text-sm">{student.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">Offline</span>
                      </label>
                    ))}
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    onSelectStudents(selectedStudents)
                    setShowStudentSelector(false)
                  }}
                >
                  Apply to Selected
                </Button>
                {spotlightStudentId && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onStopSpotlight()
                      setShowStudentSelector(false)
                    }}
                  >
                    Stop Spotlight
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lock Controls */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {lockedLayers.length > 0 ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              {lockedLayers.length > 0 ? `Locked (${lockedLayers.length})` : 'Lock'}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onLockLayers(['student-personal'])}>
              <Lock className="w-4 h-4 mr-2" />
              Lock Student Boards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUnlockLayers(['student-personal'])}>
              <Unlock className="w-4 h-4 mr-2" />
              Unlock Student Boards
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onToggleGlobalMute}>
              {isGloballyMuted ? (
                <>
                  <Unlock className="w-4 h-4 mr-2" />
                  Unmute All
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Mute All
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear All */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-red-600 hover:text-red-700"
          onClick={onClearAll}
        >
          <Eraser className="w-4 h-4" />
          Clear All
        </Button>
      </div>

      {/* Active Operations Summary */}
      {(spotlightStudentId || lockedLayers.length > 0 || isGloballyMuted) && (
        <div className="mt-2 pt-2 border-t flex flex-wrap gap-2">
          {spotlightStudentId && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
              <Eye className="w-3 h-3" />
              Spotlight Active
              <button 
                onClick={onStopSpotlight}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {lockedLayers.map(layer => (
            <span 
              key={layer}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded"
            >
              <Lock className="w-3 h-3" />
              {layer.replace('-', ' ')}
            </span>
          ))}
          {isGloballyMuted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
              <Lock className="w-3 h-3" />
              Globally Muted
            </span>
          )}
        </div>
      )}
    </div>
  )
}
