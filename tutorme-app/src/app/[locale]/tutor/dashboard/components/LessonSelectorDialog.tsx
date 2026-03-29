'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Layers } from 'lucide-react'
import type { Module } from './builder-types'

interface LessonSelectorDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (moduleId: string, lessonId: string) => void
  modules: Module[]
  itemType?: string
}

export function LessonSelectorDialog({
  isOpen,
  onClose,
  onConfirm,
  modules,
  itemType = 'item',
}: LessonSelectorDialogProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('')
  const [selectedLessonId, setSelectedLessonId] = useState<string>('')

  const selectedModule = modules.find(m => m.id === selectedModuleId)
  const lessons = selectedModule?.lessons || []

  useEffect(() => {
    if (isOpen) {
      // Auto-select first module and lesson if available
      if (modules.length > 0 && !selectedModuleId) {
        setSelectedModuleId(modules[0].id)
        if (modules[0].lessons.length > 0) {
          setSelectedLessonId(modules[0].lessons[0].id)
        }
      }
    }
  }, [isOpen, modules, selectedModuleId])

  const handleConfirm = () => {
    if (selectedModuleId && selectedLessonId) {
      onConfirm(selectedModuleId, selectedLessonId)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Select Target Lesson
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Choose which lesson to save this {itemType} to:
          </p>

          <div className="space-y-2">
            <Label>Lesson</Label>
            <Select
              value={selectedModuleId}
              onValueChange={value => {
                setSelectedModuleId(value)
                const selectedMod = modules.find(m => m.id === value)
                if (selectedMod && selectedMod.lessons.length > 0) {
                  setSelectedLessonId(selectedMod.lessons[0].id)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a lesson" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {lessons.length > 0 && (
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select value={selectedLessonId} onValueChange={setSelectedLessonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map(lesson => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedModuleId || !selectedLessonId}>
            Save to Selected Lesson
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
