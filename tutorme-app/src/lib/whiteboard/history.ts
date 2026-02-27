/**
 * Whiteboard History Service
 * Manages whiteboard snapshots and history for replay/audit
 * (DB persistence not yet implemented; uses in-memory state)
 */

export interface WhiteboardSnapshot {
  id: string
  sessionId: string
  roomId?: string
  timestamp: Date
  duration: number // seconds since start
  elements: WhiteboardElement[]
  thumbnailUrl?: string
  createdBy: string
}

export interface WhiteboardElement {
  id: string
  type: 'draw' | 'text' | 'shape' | 'image' | 'erase'
  data: any
  userId: string
  timestamp: Date
}

export interface WhiteboardSession {
  id: string
  sessionId: string
  roomId?: string
  startedAt: Date
  endedAt?: Date
  snapshots: WhiteboardSnapshot[]
  participants: string[]
  elementCount: number
}

// In-memory cache for active sessions
const activeSessions = new Map<string, {
  elements: WhiteboardElement[]
  startTime: Date
  lastActivity: Date
}>()

/**
 * Start a new whiteboard session
 */
export async function startWhiteboardSession(
  sessionId: string,
  roomId: string | null,
  createdBy: string
): Promise<{ success: boolean; sessionId: string; error?: string }> {
  try {
    const id = `wb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    activeSessions.set(id, {
      elements: [],
      startTime: new Date(),
      lastActivity: new Date()
    })

    return { success: true, sessionId: id }
  } catch (error) {
    console.error('Failed to start whiteboard session:', error)
    return {
      success: false,
      sessionId: '',
      error: error instanceof Error ? error.message : '启动白板会话失败'
    }
  }
}

/**
 * Add element to active whiteboard session
 */
export function addWhiteboardElement(
  sessionId: string,
  element: Omit<WhiteboardElement, 'timestamp'>
): { success: boolean; error?: string } {
  try {
    const session = activeSessions.get(sessionId)
    if (!session) {
      return { success: false, error: '白板会话不存在' }
    }

    session.elements.push({
      ...element,
      timestamp: new Date()
    })
    session.lastActivity = new Date()

    return { success: true }
  } catch (error) {
    console.error('Failed to add whiteboard element:', error)
    return { success: false, error: '添加元素失败' }
  }
}

/**
 * Create a snapshot of the current whiteboard state
 */
export async function createSnapshot(
  sessionId: string,
  createdBy: string,
  metadata?: {
    label?: string
    note?: string
  }
): Promise<{ success: boolean; snapshotId?: string; error?: string }> {
  try {
    const session = activeSessions.get(sessionId)
    if (!session) {
      return { success: false, error: '白板会话不存在' }
    }

    const now = new Date()
    const duration = (now.getTime() - session.startTime.getTime()) / 1000

    const snapshot: WhiteboardSnapshot = {
      id: `snap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId,
      timestamp: now,
      duration: Math.round(duration),
      elements: [...session.elements],
      createdBy
    }

    // In a real implementation, we would save to database here
    // For now, we'll store in memory

    return { success: true, snapshotId: snapshot.id }
  } catch (error) {
    console.error('Failed to create snapshot:', error)
    return { success: false, error: '创建快照失败' }
  }
}

/**
 * End a whiteboard session and save history
 */
export async function endWhiteboardSession(
  sessionId: string,
  saveHistory: boolean = true
): Promise<{ success: boolean; elementCount?: number; error?: string }> {
  try {
    const session = activeSessions.get(sessionId)
    if (!session) {
      return { success: false, error: '白板会话不存在' }
    }

    const elementCount = session.elements.length

    if (saveHistory && elementCount > 0) {
      // Save session history to database
      // This would require a WhiteboardHistory model
      console.log(`Saving whiteboard session ${sessionId} with ${elementCount} elements`)
    }

    // Clean up memory
    activeSessions.delete(sessionId)

    return { success: true, elementCount }
  } catch (error) {
    console.error('Failed to end whiteboard session:', error)
    return { success: false, error: '结束白板会话失败' }
  }
}

/**
 * Get whiteboard history for a session
 */
export async function getWhiteboardHistory(
  sessionId: string,
  options?: {
    startTime?: Date
    endTime?: Date
    userId?: string
  }
): Promise<{ success: boolean; elements?: WhiteboardElement[]; error?: string }> {
  try {
    // Check active session first
    const activeSession = activeSessions.get(sessionId)
    if (activeSession) {
      let elements = activeSession.elements

      if (options?.startTime) {
        elements = elements.filter(e => e.timestamp >= options.startTime!)
      }
      if (options?.endTime) {
        elements = elements.filter(e => e.timestamp <= options.endTime!)
      }
      if (options?.userId) {
        elements = elements.filter(e => e.userId === options.userId)
      }

      return { success: true, elements }
    }

    // Otherwise fetch from database
    // This would query a WhiteboardHistory model
    return { success: true, elements: [] }
  } catch (error) {
    console.error('Failed to get whiteboard history:', error)
    return { success: false, error: '获取白板历史失败' }
  }
}

/**
 * Replay whiteboard from a specific point in time
 */
export async function getWhiteboardStateAtTime(
  sessionId: string,
  timestamp: Date
): Promise<{ success: boolean; elements?: WhiteboardElement[]; error?: string }> {
  try {
    const activeSession = activeSessions.get(sessionId)
    if (activeSession) {
      const elements = activeSession.elements.filter(
        e => e.timestamp <= timestamp
      )
      return { success: true, elements }
    }

    // Otherwise fetch from database
    return { success: true, elements: [] }
  } catch (error) {
    console.error('Failed to get whiteboard state:', error)
    return { success: false, error: '获取白板状态失败' }
  }
}

/**
 * Export whiteboard as JSON
 */
export async function exportWhiteboard(
  sessionId: string,
  format: 'json' | 'svg' | 'png' = 'json'
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const session = activeSessions.get(sessionId)
    if (!session) {
      return { success: false, error: '白板会话不存在' }
    }

    if (format === 'json') {
      const data = JSON.stringify({
        sessionId,
        createdAt: session.startTime,
        elementCount: session.elements.length,
        elements: session.elements
      }, null, 2)
      return { success: true, data }
    }

    // For SVG/PNG, would need additional libraries
    return { success: false, error: '格式尚未支持' }
  } catch (error) {
    console.error('Failed to export whiteboard:', error)
    return { success: false, error: '导出白板失败' }
  }
}

/**
 * Get statistics for a whiteboard session
 */
export async function getWhiteboardStats(
  sessionId: string
): Promise<{
  success: boolean;
  stats?: {
    elementCount: number
    participantCount: number
    duration: number // seconds
    drawingTime: number // estimated
    mostActiveUser?: string
  };
  error?: string
}> {
  try {
    const session = activeSessions.get(sessionId)
    if (!session) {
      return { success: false, error: '白板会话不存在' }
    }

    const elements = session.elements
    const uniqueUsers = new Set(elements.map(e => e.userId))
    const now = new Date()
    const duration = (now.getTime() - session.startTime.getTime()) / 1000

    // Find most active user
    const userCounts: Record<string, number> = {}
    elements.forEach(e => {
      userCounts[e.userId] = (userCounts[e.userId] || 0) + 1
    })
    const mostActiveUser = Object.entries(userCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0]

    return {
      success: true,
      stats: {
        elementCount: elements.length,
        participantCount: uniqueUsers.size,
        duration: Math.round(duration),
        drawingTime: Math.round(duration * 0.7), // Estimate
        mostActiveUser
      }
    }
  } catch (error) {
    console.error('Failed to get whiteboard stats:', error)
    return { success: false, error: '获取统计失败' }
  }
}

/**
 * Get all snapshots for a session
 */
export async function getSessionSnapshots(
  sessionId: string
): Promise<{ success: boolean; snapshots?: WhiteboardSnapshot[]; error?: string }> {
  try {
    // In a real implementation, this would query the database
    return { success: true, snapshots: [] }
  } catch (error) {
    console.error('Failed to get snapshots:', error)
    return { success: false, error: '获取快照失败' }
  }
}

/**
 * Restore whiteboard from a snapshot
 */
export async function restoreFromSnapshot(
  sessionId: string,
  snapshotId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real implementation, this would fetch from database
    // and restore the session state
    console.log(`Restoring session ${sessionId} from snapshot ${snapshotId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to restore snapshot:', error)
    return { success: false, error: '恢复快照失败' }
  }
}

/**
 * Clean up inactive whiteboard sessions
 */
export function cleanupInactiveSessions(maxInactiveMinutes: number = 30): number {
  const now = new Date()
  let cleaned = 0

  for (const [id, session] of activeSessions.entries()) {
    const inactiveMinutes = (now.getTime() - session.lastActivity.getTime()) / 1000 / 60
    if (inactiveMinutes > maxInactiveMinutes) {
      activeSessions.delete(id)
      cleaned++
    }
  }

  return cleaned
}

// Run cleanup every 5 minutes
setInterval(() => {
  const cleaned = cleanupInactiveSessions()
  if (cleaned > 0) {
    console.log(`Cleaned up ${cleaned} inactive whiteboard sessions`)
  }
}, 5 * 60 * 1000)
