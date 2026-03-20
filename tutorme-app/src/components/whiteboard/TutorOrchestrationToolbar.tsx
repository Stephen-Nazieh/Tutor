/**
 * Tutor Orchestration Toolbar Component
 *
 * Provides tutor controls for pushing exemplars, spotlighting, and bulk operations.
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { MonitorUp, Users, Lock, Unlock, Eraser, Eye, Send, ChevronDown } from 'lucide-react'
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
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    )
  }, [])

  return (
    <div className={cn('rounded-lg border bg-white p-2 shadow-sm', className)}>
      <div className="flex items-center gap-2">
        {/* Push Exemplar */}
        <Button variant="outline" size="sm" className="gap-2" onClick={onPushExemplar}>
          <Send className="h-4 w-4" />
          Push Exemplar
        </Button>

        {/* Spotlight */}
        <Dialog open={showStudentSelector} onOpenChange={setShowStudentSelector}>
          <DialogTrigger asChild>
            <Button
              variant={spotlightStudentId ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
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

              <div className="max-h-64 overflow-y-auto rounded-lg border">
                {/* Online Students */}
                <div className="bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                  Online ({onlineStudents.length})
                </div>
                {onlineStudents.map(student => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleToggleStudent(student.id)}
                      className="rounded"
                    />
                    <span className="text-sm">{student.name}</span>
                    <span className="ml-auto text-xs text-green-600">● Online</span>
                  </label>
                ))}

                {/* Offline Students */}
                {offlineStudents.length > 0 && (
                  <>
                    <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
                      Offline ({offlineStudents.length})
                    </div>
                    {offlineStudents.map(student => (
                      <label
                        key={student.id}
                        className="flex cursor-not-allowed items-center gap-3 px-3 py-2 opacity-50"
                      >
                        <input type="checkbox" disabled className="rounded" />
                        <span className="text-sm">{student.name}</span>
                        <span className="ml-auto text-xs text-gray-400">Offline</span>
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
            <Button variant="outline" size="sm" className="gap-2">
              {lockedLayers.length > 0 ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
              {lockedLayers.length > 0 ? `Locked (${lockedLayers.length})` : 'Lock'}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onLockLayers(['student-personal'])}>
              <Lock className="mr-2 h-4 w-4" />
              Lock Student Boards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUnlockLayers(['student-personal'])}>
              <Unlock className="mr-2 h-4 w-4" />
              Unlock Student Boards
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onToggleGlobalMute}>
              {isGloballyMuted ? (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Unmute All
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
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
          <Eraser className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Active Operations Summary */}
      {(spotlightStudentId || lockedLayers.length > 0 || isGloballyMuted) && (
        <div className="mt-2 flex flex-wrap gap-2 border-t pt-2">
          {spotlightStudentId && (
            <span className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              <Eye className="h-3 w-3" />
              Spotlight Active
              <button onClick={onStopSpotlight} className="ml-1 hover:text-blue-900">
                ×
              </button>
            </span>
          )}
          {lockedLayers.map(layer => (
            <span
              key={layer}
              className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
            >
              <Lock className="h-3 w-3" />
              {layer.replace('-', ' ')}
            </span>
          ))}
          {isGloballyMuted && (
            <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
              <Lock className="h-3 w-3" />
              Globally Muted
            </span>
          )}
        </div>
      )}
    </div>
  )
}
