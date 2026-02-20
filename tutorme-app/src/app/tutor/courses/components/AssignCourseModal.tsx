'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  BookOpen, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  BarChart3,
  ArrowRight,
  Loader2,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CourseWithAssignments } from '@/types/course-assignment'
import type { BatchItem } from '@/app/tutor/courses/[id]/builder/layout'
import { useAssignmentPreview } from '@/hooks/use-course-assignments'
import { getDifficultyMismatchWarning } from '@/lib/difficulty-resolver'

interface AssignCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (courseId: string, batchId: string) => Promise<void>
  courses: CourseWithAssignments[]
  batches: BatchItem[]
  preselectedCourseId?: string
  preselectedBatchId?: string
}

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-purple-100 text-purple-700 border-purple-200'
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
}

export function AssignCourseModal({
  isOpen,
  onClose,
  onAssign,
  courses,
  batches,
  preselectedCourseId,
  preselectedBatchId
}: AssignCourseModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(preselectedCourseId || '')
  const [selectedBatchId, setSelectedBatchId] = useState(preselectedBatchId || '')
  const [assigning, setAssigning] = useState(false)
  const [step, setStep] = useState<'select' | 'preview'>('select')
  
  const { preview, loading: previewLoading, generatePreview, clearPreview } = useAssignmentPreview()

  const selectedCourse = courses.find(c => c.id === selectedCourseId)
  const selectedBatch = batches.find(b => b.id === selectedBatchId)

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCourseId(preselectedCourseId || '')
      setSelectedBatchId(preselectedBatchId || '')
      setStep('select')
      clearPreview()
    }
  }, [isOpen, preselectedCourseId, preselectedBatchId, clearPreview])

  // Generate preview when both selections are made
  useEffect(() => {
    if (selectedCourseId && selectedBatchId && step === 'preview') {
      generatePreview(selectedCourseId, selectedBatchId)
    }
  }, [selectedCourseId, selectedBatchId, step, generatePreview])

  const mismatchWarning = selectedCourse && selectedBatch 
    ? getDifficultyMismatchWarning(undefined, selectedBatch.difficulty)
    : null

  const handleAssign = async () => {
    if (!selectedCourseId || !selectedBatchId) return
    
    setAssigning(true)
    try {
      await onAssign(selectedCourseId, selectedBatchId)
      onClose()
    } finally {
      setAssigning(false)
    }
  }

  const canProceed = selectedCourseId && selectedBatchId

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {step === 'select' ? 'Assign Course to Group' : 'Preview Assignment'}
          </DialogTitle>
        </DialogHeader>

        {step === 'select' ? (
          <div className="space-y-6 py-4 overflow-y-auto">
            {/* Course Selection */}
            <div className="space-y-2">
              <Label>Select Course</Label>
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a course..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex items-center gap-2">
                        <span>{course.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {course.stats.moduleCount} modules
                        </Badge>
                        {course.assignments.total > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Assigned to {course.assignments.total} groups
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedCourse && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="text-muted-foreground">{selectedCourse.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{selectedCourse.stats.moduleCount} modules</span>
                    <span>{selectedCourse.stats.lessonCount} lessons</span>
                    <span>{selectedCourse.stats.quizCount} quizzes</span>
                  </div>
                </div>
              )}
            </div>

            {/* Group Selection */}
            <div className="space-y-2">
              <Label>Select Group</Label>
              <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a group..." />
                </SelectTrigger>
                <SelectContent>
                  {batches.map(batch => (
                    <SelectItem key={batch.id} value={batch.id}>
                      <div className="flex items-center gap-2">
                        <span>{batch.name}</span>
                        <Badge className={cn('text-xs', DIFFICULTY_COLORS[batch.difficulty])}>
                          {DIFFICULTY_LABELS[batch.difficulty]}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {batch.enrollmentCount} students
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedBatch && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedBatch.enrollmentCount} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Difficulty: </span>
                    <Badge className={cn('text-xs', DIFFICULTY_COLORS[selectedBatch.difficulty])}>
                      {DIFFICULTY_LABELS[selectedBatch.difficulty]}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Mismatch Warning */}
            {mismatchWarning && (
              <Alert variant="warning" className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700 text-sm">
                  {mismatchWarning}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4 overflow-y-auto">
            {/* Assignment Summary */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-sm">{selectedCourse?.name}</p>
                  <p className="text-xs text-muted-foreground">Course</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{selectedBatch?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {DIFFICULTY_LABELS[selectedBatch?.difficulty || 'beginner']} Group
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                Change
              </Button>
            </div>

            {/* Preview Content */}
            {previewLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-muted-foreground">Generating preview...</span>
              </div>
            ) : preview ? (
              <>
                {/* Resolution Stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{preview.resolution.totalModules}</p>
                    <p className="text-xs text-muted-foreground">Total Modules</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{preview.resolution.visibleModules}</p>
                    <p className="text-xs text-muted-foreground">Visible</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{preview.resolution.adaptedContent}</p>
                    <p className="text-xs text-muted-foreground">Adapted</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{preview.resolution.hiddenModules}</p>
                    <p className="text-xs text-muted-foreground">Hidden</p>
                  </div>
                </div>

                {/* Hidden Items Warning */}
                {preview.hiddenItems.length > 0 && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200">
                    <EyeOff className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <p className="font-medium text-red-700 mb-1">
                        {preview.hiddenItems.length} items will be hidden
                      </p>
                      <p className="text-sm text-red-600">
                        These items are fixed to difficulty levels that don&apos;t match this group.
                      </p>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Adapted Items */}
                {preview.adaptedItems.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Content Adaptations
                    </h4>
                    <ScrollArea className="h-40 border rounded-lg p-3">
                      <div className="space-y-2">
                        {preview.adaptedItems.map((item, idx) => (
                          <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.field}: {item.original} → {item.adapted}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Success Note */}
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700 text-sm">
                    Course content will automatically adapt to match the group&apos;s 
                    <strong> {selectedBatch?.difficulty}</strong> difficulty level.
                  </AlertDescription>
                </Alert>
              </>
            ) : null}
          </div>
        )}

        <DialogFooter className="border-t pt-4">
          {step === 'select' ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => setStep('preview')} 
                disabled={!canProceed}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview Assignment
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep('select')}>
                Back
              </Button>
              <Button 
                onClick={handleAssign} 
                disabled={assigning}
                className="gap-2"
              >
                {assigning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm Assignment
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
