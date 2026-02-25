'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PDFCollaborativeViewer } from '@/components/pdf-tutoring/PDFCollaborativeViewer'

export interface LiveDocumentCollaborationPolicy {
  allowDrawing: boolean
  allowTyping: boolean
  allowShapes: boolean
}

export interface LiveSharedDocument {
  shareId: string
  classRoomId: string
  ownerId: string
  ownerName: string
  assignedStudentId?: string
  templateShareId?: string
  title: string
  description?: string
  fileUrl: string
  mimeType?: string
  pdfRoomId: string
  visibleToAll: boolean
  allowCollaborativeWrite: boolean
  collaborationPolicy?: LiveDocumentCollaborationPolicy
  active: boolean
  submissions?: Array<{ userId: string; userName: string; submittedAt: number }>
  updatedAt: number
}

interface LiveSharedDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  share: LiveSharedDocument | null
  viewerRole: 'tutor' | 'student'
  canManageShare?: boolean
  onVisibilityChange?: (visible: boolean) => void
  onWriteAccessChange?: (allow: boolean) => void
  onCollaborationPolicyChange?: (policy: LiveDocumentCollaborationPolicy) => void
  onSubmitToTutor?: () => void
  hasSubmitted?: boolean
}

export function LiveSharedDocumentModal({
  open,
  onOpenChange,
  share,
  viewerRole,
  canManageShare = false,
  onVisibilityChange,
  onWriteAccessChange,
  onCollaborationPolicyChange,
  onSubmitToTutor,
  hasSubmitted = false,
}: LiveSharedDocumentModalProps) {
  if (!share) return null
  const isPdf = (share.mimeType || '').includes('pdf') || share.fileUrl.toLowerCase().includes('.pdf')
  const isReadOnly = !share.allowCollaborativeWrite && !canManageShare
  const collaborationPolicy: LiveDocumentCollaborationPolicy = {
    allowDrawing: share.collaborationPolicy?.allowDrawing ?? true,
    allowTyping: share.collaborationPolicy?.allowTyping ?? true,
    allowShapes: share.collaborationPolicy?.allowShapes ?? true,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-[1300px] overflow-hidden p-0">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <DialogTitle>{share.title}</DialogTitle>
              <Badge variant="outline">Owner: {share.ownerName}</Badge>
              <Badge variant={share.visibleToAll ? 'default' : 'secondary'}>
                {share.visibleToAll ? 'Visible to class' : 'Private copy'}
              </Badge>
              <Badge variant="outline">
                Submissions: {share.submissions?.length || 0}
              </Badge>
            </div>
            <DialogDescription>
              {share.description || 'Shared live document session'}
            </DialogDescription>
          </DialogHeader>

          {canManageShare && (
            <div className="grid grid-cols-1 gap-4 border-b px-5 py-3 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Switch checked={share.visibleToAll} onCheckedChange={onVisibilityChange} />
                <Label>Visible to everyone in this live class</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={share.allowCollaborativeWrite} onCheckedChange={onWriteAccessChange} />
                <Label>Allow others to write/type on this document</Label>
              </div>
              <div className="col-span-full grid grid-cols-1 gap-3 rounded-md border bg-muted/20 px-3 py-2 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowDrawing}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowDrawing: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow drawing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowTyping}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowTyping: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow typing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={collaborationPolicy.allowShapes}
                    onCheckedChange={(checked) => onCollaborationPolicyChange?.({ ...collaborationPolicy, allowShapes: checked })}
                    disabled={!share.allowCollaborativeWrite}
                  />
                  <Label>Allow shapes</Label>
                </div>
              </div>
            </div>
          )}

          {!canManageShare && onSubmitToTutor && (
            <div className="border-b px-5 py-3">
              <button
                type="button"
                onClick={onSubmitToTutor}
                disabled={hasSubmitted}
                className="rounded border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-60"
              >
                {hasSubmitted ? 'Submitted to Tutor' : 'Submit to Tutor'}
              </button>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto p-0">
            {isPdf ? (
              <PDFCollaborativeViewer
                roomId={share.pdfRoomId}
                role={viewerRole}
                initialPdfUrl={share.fileUrl}
                forceLocked={isReadOnly}
                showLockControl={canManageShare}
                showCollabStatus={viewerRole === 'tutor'}
                showAiActions={viewerRole === 'tutor'}
                capabilities={{
                  draw: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowDrawing),
                  erase: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowDrawing),
                  text: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowTyping),
                  shapes: canManageShare || (share.allowCollaborativeWrite && collaborationPolicy.allowShapes),
                  select: canManageShare || share.allowCollaborativeWrite,
                  clear: canManageShare || share.allowCollaborativeWrite,
                }}
              />
            ) : (
              <div className="m-4 rounded-lg border bg-muted/20 p-4 text-sm">
                <p className="font-medium">This file is not a PDF.</p>
                <p className="text-muted-foreground">
                  Open the source file in a new tab. PDF canvas annotation is available for PDF files.
                </p>
                <a
                  href={share.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-blue-600 underline"
                >
                  Open source file
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
