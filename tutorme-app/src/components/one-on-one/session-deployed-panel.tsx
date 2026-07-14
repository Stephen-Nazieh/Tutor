'use client'

import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { X, FileText } from 'lucide-react'
import { TaskDocumentCard } from '@/components/task/TaskDocumentCard'

interface SourceDocument {
  fileName: string
  fileUrl: string
  fileKey?: string
  mimeType: string
}

interface DeployedTask {
  id: string
  title: string
  content?: string
  source?: string
  sourceDocument?: SourceDocument
}

/**
 * Both-sides panel showing what the tutor has deployed into the session, live.
 * Listens to the same `task:deployed` / `task:updated` room events the course
 * classroom uses (already broadcast for any session id), so it needs no course.
 * Self-contained: it only reads socket events, so it can't affect the whiteboard.
 */
export function SessionDeployedPanel({
  socket,
  onClose,
}: {
  socket: Socket | null
  onClose: () => void
}) {
  const [deployed, setDeployed] = useState<DeployedTask[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!socket) return
    const upsert = (task: DeployedTask) =>
      setDeployed(prev =>
        prev.some(t => t.id === task.id)
          ? prev.map(t => (t.id === task.id ? { ...t, ...task } : t))
          : [...prev, task]
      )
    const onDeployed = (task: DeployedTask) => {
      if (!task?.id) return
      upsert(task)
      setActiveId(task.id)
    }
    const onUpdated = (payload: { task: DeployedTask }) => {
      if (payload?.task?.id) upsert(payload.task)
    }
    socket.on('task:deployed', onDeployed)
    socket.on('task:updated', onUpdated)
    return () => {
      socket.off('task:deployed', onDeployed)
      socket.off('task:updated', onUpdated)
    }
  }, [socket])

  const active = deployed.find(t => t.id === activeId) ?? null

  return (
    <div className="pointer-events-auto flex h-full w-96 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Materials</h3>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {deployed.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-center text-xs text-slate-500">
          Nothing shared yet. When the tutor deploys a task or material, it appears here.
        </div>
      ) : (
        <>
          {/* Tabs of deployed items */}
          <div className="flex flex-wrap gap-1.5 border-b p-2">
            {deployed.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ' +
                  (t.id === activeId
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }
              >
                <FileText className="h-3 w-3" />
                <span className="max-w-[8rem] truncate">{t.title}</span>
              </button>
            ))}
          </div>

          {/* Active item */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {active ? (
              <>
                <p className="mb-3 text-sm font-semibold text-slate-900">{active.title}</p>
                {active.sourceDocument ? (
                  <div className="h-[60vh] w-full">
                    <TaskDocumentCard sourceDocument={active.sourceDocument} alwaysOpen />
                  </div>
                ) : active.content ? (
                  <div
                    className="prose prose-sm max-w-none text-slate-700"
                    // Tutor-authored task content, shown to their own session.
                    dangerouslySetInnerHTML={{ __html: active.content }}
                  />
                ) : (
                  <p className="text-xs text-slate-400">This item has no preview.</p>
                )}
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
