'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tldraw, type Editor } from 'tldraw'
import type { Socket } from 'socket.io-client'
import * as Y from 'yjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Unlock, Wifi, WifiOff } from 'lucide-react'
import 'tldraw/tldraw.css'

interface TldrawMathBoardProps {
  sessionId: string
  socket: Socket | null
  userId?: string
  userName?: string
  role: 'tutor' | 'student'
  className?: string
}

export function TldrawMathBoard({
  sessionId,
  socket,
  userId,
  userName,
  role,
  className = '',
}: TldrawMathBoardProps) {
  const editorRef = useRef<Editor | null>(null)
  const applyingRemoteRef = useRef(false)
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const yDocRef = useRef<Y.Doc | null>(null)
  const yMetaRef = useRef<Y.Map<unknown> | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const canEditRef = useRef(false)
  const queueSnapshotSyncRef = useRef<(() => void) | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const canEdit = role === 'tutor' || !isLocked

  useEffect(() => {
    socketRef.current = socket
  }, [socket])

  useEffect(() => {
    canEditRef.current = canEdit
  }, [canEdit])

  const applyReadonlyState = useCallback((editor: Editor | null, readonly: boolean) => {
    if (!editor) return
    editor.updateInstanceState({ isReadonly: readonly })
  }, [])

  const queueSnapshotSync = useCallback(() => {
    if (!editorRef.current || !canEditRef.current) return
    const yMeta = yMetaRef.current
    if (!yMeta) return
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    syncTimerRef.current = setTimeout(() => {
      if (!editorRef.current || applyingRemoteRef.current) return
      const rawSnapshot = editorRef.current.getSnapshot() as unknown
      // Store a detached JSON-safe snapshot so Yjs always sees state deltas across edits.
      const snapshot =
        typeof structuredClone === 'function'
          ? structuredClone(rawSnapshot)
          : JSON.parse(JSON.stringify(rawSnapshot))
      yMeta.set('snapshot', snapshot)
      yMeta.set('updatedAt', Date.now())
      socketRef.current?.emit('math_tl_snapshot', {
        sessionId,
        snapshot,
      })
    }, 180)
  }, [sessionId])

  useEffect(() => {
    queueSnapshotSyncRef.current = queueSnapshotSync
  }, [queueSnapshotSync])

  useEffect(() => {
    if (!socket) return
    const yDoc = new Y.Doc()
    const yMeta = yDoc.getMap<unknown>('meta')
    yDocRef.current = yDoc
    yMetaRef.current = yMeta

    const onYDocUpdate = (update: Uint8Array, origin: unknown) => {
      if (!socket || origin === 'remote') return
      socket.emit('math_yjs_update', {
        sessionId,
        update: Array.from(update),
      })
    }

    const onYMetaUpdate = () => {
      const snapshot = yMeta.get('snapshot')
      if (!snapshot || !editorRef.current || applyingRemoteRef.current) return
      applyingRemoteRef.current = true
      try {
        editorRef.current.loadSnapshot(snapshot as any)
      } finally {
        window.setTimeout(() => {
          applyingRemoteRef.current = false
        }, 0)
      }
    }

    yDoc.on('update', onYDocUpdate)
    yMeta.observe(onYMetaUpdate)

    const join = () => {
      socket.emit('math_wb_join', {
        sessionId,
        userId,
        name: userName || (role === 'tutor' ? 'Tutor' : 'Student'),
        role,
      })
      socket.emit('math_wb_request_sync', sessionId)
      setIsConnected(true)
    }

    const onConnect = () => join()
    const onDisconnect = () => {
      setIsConnected(false)
    }
    const onState = (state: {
      locked: boolean
      tldrawSnapshot?: Record<string, unknown> | null
    }) => {
      setIsLocked(Boolean(state.locked))
      if (state.tldrawSnapshot && yMeta) {
        yMeta.set('snapshot', state.tldrawSnapshot)
      }
    }
    const onLockChanged = (data: { locked: boolean }) => {
      setIsLocked(Boolean(data.locked))
    }
    const onYjsSync = (payload: { sessionId?: string; update: number[] }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      Y.applyUpdate(yDoc, Uint8Array.from(payload.update || []), 'remote')
    }
    const onYjsUpdate = (payload: { sessionId?: string; actorId?: string; update: number[] }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      if (payload.actorId && payload.actorId === userId) return
      Y.applyUpdate(yDoc, Uint8Array.from(payload.update || []), 'remote')
    }
    const onSnapshot = (payload: { sessionId?: string; actorId?: string; snapshot?: Record<string, unknown> | null }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      if (payload.actorId && payload.actorId === userId) return
      if (!payload.snapshot || !editorRef.current) return
      applyingRemoteRef.current = true
      try {
        editorRef.current.loadSnapshot(payload.snapshot as any)
      } finally {
        window.setTimeout(() => {
          applyingRemoteRef.current = false
        }, 0)
      }
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('math_wb_state', onState)
    socket.on('math_wb_lock_changed', onLockChanged)
    socket.on('math_yjs_sync', onYjsSync)
    socket.on('math_yjs_update', onYjsUpdate)
    socket.on('math_tl_snapshot', onSnapshot)

    if (socket.connected) {
      join()
    }

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('math_wb_state', onState)
      socket.off('math_wb_lock_changed', onLockChanged)
      socket.off('math_yjs_sync', onYjsSync)
      socket.off('math_yjs_update', onYjsUpdate)
      socket.off('math_tl_snapshot', onSnapshot)
      socket.emit('math_wb_leave', sessionId)
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      yMeta.unobserve(onYMetaUpdate)
      yDoc.off('update', onYDocUpdate)
      yDocRef.current = null
      yMetaRef.current = null
    }
  }, [role, sessionId, socket, userId, userName])

  const onMount = useCallback((editor: Editor) => {
    editorRef.current = editor
    applyReadonlyState(editor, !canEdit)
    // Avoid remote font fetch failures (cdn.tldraw.com) from breaking runtime in restricted networks.
    const fontManager = (editor as any).fonts
    if (fontManager && !fontManager.__networkPatched) {
      fontManager.__networkPatched = true
      fontManager.requestFonts = () => {}
      fontManager.ensureFontIsLoaded = async () => undefined
      fontManager.loadRequiredFontsForCurrentPage = async () => undefined
    }
    const existingSnapshot = yMetaRef.current?.get('snapshot')
    if (existingSnapshot) {
      editor.loadSnapshot(existingSnapshot as any)
    }
    const unlisten = editor.store.listen(() => {
      if (applyingRemoteRef.current) return
      queueSnapshotSyncRef.current?.()
    }, { source: 'user', scope: 'document' })
    return () => {
      unlisten()
      editorRef.current = null
    }
  }, [applyReadonlyState, canEdit])

  useEffect(() => {
    applyReadonlyState(editorRef.current, !canEdit)
  }, [applyReadonlyState, canEdit])

  const statusBadge = useMemo(() => {
    if (isConnected) {
      return (
        <Badge variant="outline" className="gap-1">
          <Wifi className="h-3 w-3 text-green-600" />
          Synced
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="gap-1">
        <WifiOff className="h-3 w-3 text-amber-600" />
        Reconnecting
      </Badge>
    )
  }, [isConnected])

  return (
    <div className={`h-full min-h-0 flex flex-col rounded-lg border bg-white ${className}`}>
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Math Whiteboard</h3>
          {statusBadge}
          <Badge variant={canEdit ? 'default' : 'secondary'}>
            {canEdit ? 'Editable' : 'Read only'}
          </Badge>
        </div>
        {role === 'tutor' && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => socket?.emit('math_wb_lock', { sessionId, locked: !isLocked })}
          >
            {isLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {isLocked ? 'Unlock Students' : 'Lock Students'}
          </Button>
        )}
      </div>
      <div className="relative flex-1 min-h-0">
        <Tldraw onMount={onMount} />
      </div>
    </div>
  )
}

export default TldrawMathBoard
