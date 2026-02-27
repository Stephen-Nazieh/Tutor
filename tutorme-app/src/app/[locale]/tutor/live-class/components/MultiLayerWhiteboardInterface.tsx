'use client'

import { useMemo, useEffect, useState, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TutorWhiteboardManager } from './TutorWhiteboardManager'
import { StudentLiveWhiteboard } from '@/app/[locale]/student/live/components/StudentLiveWhiteboard'
import { PDFCollaborativeViewer } from '@/components/pdf-tutoring/PDFCollaborativeViewer'
import { useSimpleSocket } from '@/hooks/use-simple-socket'
import { LiveSharedDocumentModal, LiveSharedDocument, type LiveDocumentCollaborationPolicy } from './LiveSharedDocumentModal'
import type { VisibleDocumentPayload } from '../../dashboard/components/CourseBuilder'
import { Layers, Users, Radio, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface MultiLayerStudent {
  id: string
  name: string
  status: string
  engagement: number
}

interface MultiLayerWhiteboardInterfaceProps {
  sessionId: string
  roomId: string
  initialCourseId?: string | null
  classSubject?: string
  students: MultiLayerStudent[]
  isSocketConnected: boolean
  onLayerUpdate?: (layerData: unknown) => void
  onPermissionChange?: (permissionData: unknown) => void
}

export function MultiLayerWhiteboardInterface({
  sessionId,
  roomId,
  initialCourseId,
  classSubject,
  students,
  isSocketConnected,
}: MultiLayerWhiteboardInterfaceProps) {
  const { data: session } = useSession()
  const isTutor = session?.user?.role === 'TUTOR'
  const userId = session?.user?.id
  const userName = session?.user?.name || (isTutor ? 'Tutor' : 'Student')
  const socketRole: 'tutor' | 'student' = isTutor ? 'tutor' : 'student'
  const { socket } = useSimpleSocket(roomId, {
    userId,
    name: userName,
    role: socketRole,
  })
  const [shares, setShares] = useState<Record<string, LiveSharedDocument>>({})
  const [activeShareId, setActiveShareId] = useState<string | null>(null)
  const [uploadingPersonalDoc, setUploadingPersonalDoc] = useState(false)
  const announcedSharesRef = useRef<Set<string>>(new Set())

  const connectedStudents = useMemo(
    () => students.filter((student) => student.status === 'online').length,
    [students]
  )

  const publishShare = useCallback((share: LiveSharedDocument) => {
    if (socket) {
      socket.emit('live_doc_share_update', share)
    }
  }, [socket])

  const handleShareRequestFromBuilder = useCallback((payload: VisibleDocumentPayload) => {
    if (!userId || !payload.sourceDocument) return
    const shareId = `share-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const share: LiveSharedDocument = {
      shareId,
      classRoomId: roomId,
      ownerId: userId,
      ownerName: userName,
      title: payload.title,
      description: payload.description,
      fileUrl: payload.sourceDocument.fileUrl,
      mimeType: payload.sourceDocument.mimeType,
      pdfRoomId: `${roomId}:pdf-share:${userId}:${shareId}`,
      visibleToAll: true,
      allowCollaborativeWrite: true,
      collaborationPolicy: {
        allowDrawing: true,
        allowTyping: true,
        allowShapes: true,
      },
      active: true,
      submissions: [],
      updatedAt: Date.now(),
    }
    setShares((prev) => ({ ...prev, [shareId]: share }))
    publishShare(share)
    setActiveShareId(shareId)
  }, [publishShare, roomId, userId, userName])

  const uploadAndSharePersonalDocument = useCallback(async (file: File) => {
    if (!socket || !userId) return
    setUploadingPersonalDoc(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/uploads/documents', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (!uploadRes.ok) return
      const uploadData = await uploadRes.json()
      const shareId = `share-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const share: LiveSharedDocument = {
        shareId,
        classRoomId: roomId,
        ownerId: userId,
        ownerName: userName,
        title: file.name,
        description: 'Student shared document',
        fileUrl: uploadData.url,
        mimeType: file.type,
        pdfRoomId: `${roomId}:pdf-share:${userId}:${shareId}`,
        visibleToAll: true,
        allowCollaborativeWrite: true,
        collaborationPolicy: {
          allowDrawing: true,
          allowTyping: true,
          allowShapes: true,
        },
        active: true,
        updatedAt: Date.now(),
      }
      publishShare(share)
      setActiveShareId(shareId)
    } finally {
      setUploadingPersonalDoc(false)
    }
  }, [publishShare, roomId, socket, userId, userName])

  useEffect(() => {
    if (!socket || !roomId) return

    const handleShareUpdate = (share: LiveSharedDocument) => {
      if (share.classRoomId !== roomId) return
      setShares((prev) => ({ ...prev, [share.shareId]: share }))
      if (
        share.active &&
        (share.visibleToAll || share.ownerId === userId) &&
        !announcedSharesRef.current.has(share.shareId)
      ) {
        announcedSharesRef.current.add(share.shareId)
        toast.info(`Live task available: ${share.title}. Open from Tasks.`)
      }
      if (share.active && (share.visibleToAll || share.ownerId === userId)) {
        setActiveShareId(share.shareId)
      }
    }

    const handleShareSubmission = (data: {
      classRoomId: string
      shareId: string
      userId: string
      userName: string
      submittedAt: number
    }) => {
      if (data.classRoomId !== roomId) return
      setShares((prev) => {
        const current = prev[data.shareId]
        if (!current) return prev
        const existing = current.submissions || []
        if (existing.some((submission) => submission.userId === data.userId)) return prev
        return {
          ...prev,
          [data.shareId]: {
            ...current,
            submissions: [...existing, { userId: data.userId, userName: data.userName, submittedAt: data.submittedAt }],
            updatedAt: Date.now(),
          },
        }
      })
    }

    const handleShareState = (data: { classRoomId: string; shares: LiveSharedDocument[] }) => {
      if (data.classRoomId !== roomId) return
      const next: Record<string, LiveSharedDocument> = {}
      data.shares.forEach((share) => {
        next[share.shareId] = share
      })
      setShares(next)
    }

    socket.on('live_doc_share_update', handleShareUpdate)
    socket.on('live_doc_share_state', handleShareState)
    socket.on('live_doc_task_submitted', handleShareSubmission)
    socket.emit('live_doc_share_state_request', { classRoomId: roomId })

    return () => {
      socket.off('live_doc_share_update', handleShareUpdate)
      socket.off('live_doc_share_state', handleShareState)
      socket.off('live_doc_task_submitted', handleShareSubmission)
    }
  }, [socket, roomId, userId])

  const activeShare = activeShareId ? shares[activeShareId] || null : null
  const canManageActiveShare = Boolean(activeShare && userId && activeShare.ownerId === userId)
  const visibleShares = useMemo(
    () =>
      Object.values(shares)
        .filter((share) => share.active && (share.visibleToAll || share.ownerId === userId))
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [shares, userId]
  )
  const updateActiveSharePolicy = useCallback((policy: LiveDocumentCollaborationPolicy) => {
    if (!activeShare || !canManageActiveShare) return
    publishShare({ ...activeShare, collaborationPolicy: policy })
  }, [activeShare, canManageActiveShare, publishShare])

  if (isTutor) {
    return (
      <>
        <div className="h-full grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
          <div className="min-h-0">
            <TutorWhiteboardManager
              roomId={roomId}
              sessionId={sessionId}
              initialCourseId={initialCourseId}
              classSubject={classSubject}
              students={students.map((student) => ({ id: student.id, name: student.name }))}
              onDocumentVisibleToStudents={handleShareRequestFromBuilder}
            />
          </div>

          <Card className="min-h-0 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Multi-Layer Controls
              </CardTitle>
              <CardDescription>
                Broadcast your board and monitor student boards in real time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border">
                <span className="text-gray-600">Socket</span>
                <Badge variant={isSocketConnected ? 'default' : 'secondary'}>
                  {isSocketConnected ? 'Connected' : 'Offline'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border">
                <span className="text-gray-600 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Online Students
                </span>
                <span className="font-medium">{connectedStudents}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border">
                <span className="text-gray-600">Total Boards</span>
                <span className="font-medium">{students.length + 1}</span>
              </div>

              <div className="pt-2 space-y-2 text-xs text-gray-600">
                <p className="flex items-start gap-1">
                  <Radio className="w-3 h-3 mt-0.5 text-red-500" />
                  <strong>Broadcast</strong>: send your whiteboard to all students in real time.
                </p>
                <p className="flex items-start gap-1">
                  <Eye className="w-3 h-3 mt-0.5 text-blue-500" />
                  <strong>Lock Student Layers</strong>: prevent students from drawing until you unlock.
                </p>
                <p className="flex items-start gap-1">
                  <Eye className="w-3 h-3 mt-0.5 text-muted-foreground" />
                  Switch to <strong>Students</strong> to review individual work quickly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <LiveSharedDocumentModal
          open={Boolean(activeShare)}
          onOpenChange={(open) => {
            if (!open) setActiveShareId(null)
          }}
          share={activeShare}
          viewerRole="tutor"
          canManageShare={canManageActiveShare}
          onVisibilityChange={(visible) => {
            if (!activeShare || !canManageActiveShare) return
            publishShare({ ...activeShare, visibleToAll: visible, active: visible })
          }}
          onWriteAccessChange={(allow) => {
            if (!activeShare || !canManageActiveShare) return
            publishShare({ ...activeShare, allowCollaborativeWrite: allow })
          }}
          onCollaborationPolicyChange={updateActiveSharePolicy}
        />
      </>
    )
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Collaborative Whiteboard
          </CardTitle>
          <CardDescription>
            Draw on your own layer while viewing tutor annotations in real time.
          </CardDescription>
          <div className="pt-2">
            <Button size="sm" variant="outline" disabled={uploadingPersonalDoc} asChild>
              <label className="cursor-pointer">
                {uploadingPersonalDoc ? 'Sharing...' : 'Share My Document'}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt,.md,.doc,.docx,image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    void uploadAndSharePersonalDocument(file)
                    event.currentTarget.value = ''
                  }}
                />
              </label>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100%-84px)] p-3">
          <Tabs defaultValue="student-board" className="h-full">
            <TabsList className="mb-2">
              <TabsTrigger value="student-board">Whiteboard</TabsTrigger>
              <TabsTrigger value="student-pdf">PDF Tutoring</TabsTrigger>
            </TabsList>
            <TabsContent value="student-board" className="h-[calc(100%-40px)] m-0">
              <StudentLiveWhiteboard
                roomId={roomId}
                sessionId={sessionId}
                mode="embedded"
                visibleTaskShares={visibleShares}
                onOpenTask={(shareId) => setActiveShareId(shareId)}
              />
            </TabsContent>
            <TabsContent value="student-pdf" className="h-[calc(100%-40px)] m-0 overflow-auto">
              <PDFCollaborativeViewer roomId={`${roomId}:pdf`} role="student" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <LiveSharedDocumentModal
        open={Boolean(activeShare)}
        onOpenChange={(open) => {
          if (!open) setActiveShareId(null)
        }}
        share={activeShare}
        viewerRole={socketRole}
        canManageShare={canManageActiveShare}
        onVisibilityChange={(visible) => {
          if (!activeShare || !canManageActiveShare) return
          publishShare({ ...activeShare, visibleToAll: visible, active: visible })
        }}
        onWriteAccessChange={(allow) => {
          if (!activeShare || !canManageActiveShare) return
          publishShare({ ...activeShare, allowCollaborativeWrite: allow })
        }}
        onCollaborationPolicyChange={updateActiveSharePolicy}
        onSubmitToTutor={() => {
          if (!socket || !activeShare || !userId) return
          socket.emit('live_doc_task_submit', {
            classRoomId: roomId,
            shareId: activeShare.shareId,
            userId,
            userName,
          })
        }}
        hasSubmitted={Boolean(activeShare?.submissions?.some((submission) => submission.userId === userId))}
      />
    </>
  )
}
