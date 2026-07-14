'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Socket } from 'socket.io-client'
import type { StudentDmiItem } from '@/lib/assessment/student-dmi'

export interface SessionSourceDocument {
  fileName: string
  fileUrl: string
  fileKey?: string
  mimeType: string
}

/** A deployed task as the classroom knows it (student-safe — no answer key). */
export interface SessionRoomTask {
  id: string
  title: string
  content?: string
  source?: string
  dmiItems?: StudentDmiItem[]
  sourceDocument?: SessionSourceDocument
  completedBy?: string[]
}

export interface SessionStudentResponse {
  studentId: string
  studentName: string
  completedAt: number
  answers: Record<string, string>
}

interface RoomStatePayload {
  students?: Array<{ userId: string; name?: string }>
  tasks?: Array<SessionRoomTask & { responses?: Record<string, Record<string, string>> }>
}

interface TaskCompletedEvent {
  taskId: string
  studentId: string
  studentName?: string
  completedAt?: number
  answers?: Record<string, string>
}

/**
 * The single source of truth for a session classroom's deployed tasks and their
 * submissions — held here in the always-mounted classroom, not in the panels.
 *
 * The panels (Materials, Responses) mount only when the user opens them, so if
 * they subscribed to socket events themselves they'd miss everything that
 * happened before they opened (a task deployed earlier, an answer already
 * submitted) and everything after a rejoin. This hook subscribes from the
 * classroom, which is mounted from join, so it captures the join-time
 * `room_state` replay as well as the live `task:*` events — and the panels just
 * render its output.
 */
export function useSessionRoomState(socket: Socket | null, myUserId: string | undefined) {
  const [tasks, setTasks] = useState<SessionRoomTask[]>([])
  // taskId -> studentId -> response
  const [responsesByTask, setResponsesByTask] = useState<
    Record<string, Record<string, SessionStudentResponse>>
  >({})

  useEffect(() => {
    if (!socket) return

    const upsertTask = (t: SessionRoomTask) => {
      if (!t?.id) return
      setTasks(prev =>
        prev.some(x => x.id === t.id)
          ? prev.map(x => (x.id === t.id ? { ...x, ...t } : x))
          : [...prev, t]
      )
    }

    // Join-time replay: hydrate both the deployed tasks and any submissions that
    // already happened (task.responses), naming students from the roster.
    const onRoomState = (state: RoomStatePayload) => {
      if (!Array.isArray(state?.tasks)) return
      const nameById = new Map((state.students ?? []).map(s => [s.userId, s.name || 'Student']))
      setTasks(prev => {
        const byId = new Map(prev.map(t => [t.id, t]))
        for (const t of state.tasks!) {
          if (t?.id) byId.set(t.id, { ...byId.get(t.id), ...t })
        }
        return Array.from(byId.values())
      })
      setResponsesByTask(prev => {
        const next = { ...prev }
        for (const t of state.tasks!) {
          if (!t?.id || !t.responses || typeof t.responses !== 'object') continue
          const perStudent = { ...(next[t.id] ?? {}) }
          for (const [sid, answers] of Object.entries(t.responses)) {
            // Don't clobber a richer live entry that already arrived.
            if (perStudent[sid]) continue
            perStudent[sid] = {
              studentId: sid,
              studentName: nameById.get(sid) || 'Student',
              completedAt: 0,
              answers: (answers as Record<string, string>) ?? {},
            }
          }
          next[t.id] = perStudent
        }
        return next
      })
    }

    const onDeployed = (t: SessionRoomTask) => upsertTask(t)
    const onUpdated = (payload: { task: SessionRoomTask }) => {
      if (payload?.task?.id) upsertTask(payload.task)
    }
    const onCompleted = (evt: TaskCompletedEvent) => {
      if (!evt?.taskId || !evt?.studentId) return
      setResponsesByTask(prev => ({
        ...prev,
        [evt.taskId]: {
          ...(prev[evt.taskId] ?? {}),
          [evt.studentId]: {
            studentId: evt.studentId,
            studentName: evt.studentName || 'Student',
            completedAt: evt.completedAt || 0,
            answers: evt.answers ?? {},
          },
        },
      }))
      // Reflect the completion on the task so the student's own submitted state
      // survives a panel close/reopen.
      setTasks(prev =>
        prev.map(t =>
          t.id === evt.taskId
            ? { ...t, completedBy: Array.from(new Set([...(t.completedBy ?? []), evt.studentId])) }
            : t
        )
      )
    }

    socket.on('room_state', onRoomState)
    socket.on('task:deployed', onDeployed)
    socket.on('task:updated', onUpdated)
    socket.on('task:completed', onCompleted)
    return () => {
      socket.off('room_state', onRoomState)
      socket.off('task:deployed', onDeployed)
      socket.off('task:updated', onUpdated)
      socket.off('task:completed', onCompleted)
    }
  }, [socket])

  const myCompletedTaskIds = useMemo(
    () =>
      new Set(
        tasks.filter(t => myUserId && (t.completedBy ?? []).includes(myUserId)).map(t => t.id)
      ),
    [tasks, myUserId]
  )

  return { tasks, responsesByTask, myCompletedTaskIds }
}
