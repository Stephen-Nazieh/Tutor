'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Loader2, Save, Trash2, Eye, Edit3, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CoursePitchGeneratorProps {
  courseId: string
}

export function CoursePitchGenerator({ courseId }: CoursePitchGeneratorProps) {
  const [pitch, setPitch] = useState<string | null>(null)
  const [editedPitch, setEditedPitch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadPitch()
  }, [courseId])

  const loadPitch = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/tutor/courses/${courseId}/pitch`, {
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setPitch(data.pitch)
        setEditedPitch(data.pitch || '')
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  const generatePitch = async () => {
    setIsGenerating(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}/pitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate pitch')
      }

      const data = await res.json()
      setPitch(data.pitch)
      setEditedPitch(data.pitch)
      toast.success('Course pitch generated successfully!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate pitch')
    } finally {
      setIsGenerating(false)
    }
  }

  const savePitch = async () => {
    setIsSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}/pitch`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ pitch: editedPitch }),
      })

      if (!res.ok) throw new Error('Failed to save')

      setPitch(editedPitch)
      setShowEditDialog(false)
      toast.success('Course pitch saved!')
    } catch {
      toast.error('Failed to save pitch')
    } finally {
      setIsSaving(false)
    }
  }

  const deletePitch = async () => {
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch(`/api/tutor/courses/${courseId}/pitch`, {
        method: 'DELETE',
        headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : {},
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Failed to delete')

      setPitch(null)
      setEditedPitch('')
      toast.success('Course pitch deleted')
    } catch {
      toast.error('Failed to delete pitch')
    }
  }

  const renderMarkdown = (text: string) => {
    // Simple markdown to HTML conversion
    return text
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 text-slate-900">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-800">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-4">$&</ul>')
      .replace(/\n\n/g, '<br/><br/>')
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Course Pitch
              </CardTitle>
              <CardDescription>
                Generate a compelling marketing description that persuades students to enroll
              </CardDescription>
            </div>
            {pitch && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                Generated
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pitch ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <Wand2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No course pitch yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Let AI create a persuasive course description that highlights what students will learn, 
                who it's for, and why they should enroll.
              </p>
              <Button 
                onClick={generatePitch} 
                disabled={isGenerating}
                size="lg"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Course Pitch
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                <div 
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(pitch) }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(true)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Full Preview
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditDialog(true)}
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={generatePitch}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  Regenerate
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={deletePitch}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>

              <div className="rounded-lg border bg-amber-50 border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <strong>💡 Tip:</strong> This pitch will be displayed on the course page for students to read. 
                  A compelling pitch can significantly increase enrollment rates!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Pitch Preview</DialogTitle>
            <DialogDescription>
              This is how students will see your course pitch
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(pitch || '') }} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Course Pitch</DialogTitle>
            <DialogDescription>
              Make adjustments to the AI-generated pitch
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editedPitch}
            onChange={(e) => setEditedPitch(e.target.value)}
            rows={20}
            className="font-mono text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={savePitch} disabled={isSaving} className="gap-2">
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
