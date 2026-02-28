/**
 * Presence + Ownership Cues System
 * 
 * Features:
 * - Editing halos around elements being edited by other users
 * - Soft-lock conflict hints when multiple users edit the same element
 * - Cursor labels and activity indicators
 * - User color assignment and management
 */

import type { WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'

export interface PresenceUser {
  userId: string
  name: string
  color: string
  role: 'tutor' | 'student'
  cursor?: { x: number; y: number }
  lastActivity: number
}

export interface EditingState {
  userId: string
  elementId: string
  elementType: 'stroke' | 'shape' | 'text' | 'connector'
  startedAt: number
  operation: 'drawing' | 'moving' | 'resizing' | 'deleting' | 'editing'
}

export interface ConflictHint {
  id: string
  elementId: string
  users: Array<{ userId: string; name: string; color: string }>
  severity: 'low' | 'medium' | 'high'
  suggestedAction: 'merge' | 'override' | 'cancel' | 'branch'
  detectedAt: number
}

export interface HaloRenderData {
  userId: string
  userName: string
  color: string
  x: number
  y: number
  width: number
  height: number
  operation: string
  opacity: number
}

// Color palette for user assignment
const USER_COLORS = [
  { base: '#FF6B6B', light: '#FFB3B3', dark: '#CC5555' },   // Red
  { base: '#4ECDC4', light: '#A7E6E1', dark: '#3EA39D' },   // Teal
  { base: '#45B7D1', light: '#A2DBE8', dark: '#3792A7' },   // Blue
  { base: '#FFA07A', light: '#FFD0BC', dark: '#CC8062' },   // Salmon
  { base: '#98D8C8', light: '#CCEBE4', dark: '#7AADA0' },   // Mint
  { base: '#F7DC6F', light: '#FBEDB7', dark: '#C6B059' },   // Yellow
  { base: '#BB8FCE', light: '#DDC7E7', dark: '#9672A5' },   // Purple
  { base: '#85C1E2', light: '#C2E0F1', dark: '#6A9AB5' },   // Sky
  { base: '#F8B500', light: '#FCDA80', dark: '#C69100' },   // Gold
  { base: '#52BE80', light: '#A8DFBF', dark: '#429866' },   // Green
  { base: '#EC7063', light: '#F5B7B1', dark: '#BD594F' },   // Coral
  { base: '#5DADE2', light: '#AED6F1', dark: '#4A8AB5' },   // Azure
]

export class PresenceManager {
  private users = new Map<string, PresenceUser>()
  private editingStates = new Map<string, EditingState>() // key: elementId
  private conflictHints = new Map<string, ConflictHint>()
  private colorIndex = 0
  private readonly currentUserId: string

  constructor(currentUserId: string) {
    this.currentUserId = currentUserId
  }

  /**
   * Register or update a user's presence
   */
  updateUser(user: Partial<PresenceUser> & { userId: string }): PresenceUser {
    const existing = this.users.get(user.userId)
    const color = existing?.color || this.assignColor()

    const updated: PresenceUser = {
      name: user.name || existing?.name || 'Unknown',
      color,
      role: user.role || existing?.role || 'student',
      cursor: user.cursor ?? existing?.cursor,
      lastActivity: Date.now(),
      ...user,
    } as PresenceUser

    this.users.set(user.userId, updated)
    return updated
  }

  /**
   * Remove a user from presence
   */
  removeUser(userId: string): void {
    this.users.delete(userId)
    // Clean up their editing states
    this.editingStates.forEach((state, elementId) => {
      if (state.userId === userId) {
        this.editingStates.delete(elementId)
      }
    })
    this.rebuildConflictHints()
  }

  /**
   * Assign a unique color to a user
   */
  private assignColor(): string {
    const color = USER_COLORS[this.colorIndex % USER_COLORS.length].base
    this.colorIndex++
    return color
  }

  /**
   * Start editing an element
   */
  startEditing(
    userId: string,
    elementId: string,
    elementType: EditingState['elementType'],
    operation: EditingState['operation']
  ): EditingState | null {
    // Check if someone else is already editing
    const existing = this.editingStates.get(elementId)
    if (existing && existing.userId !== userId) {
      // Create conflict hint
      this.createConflictHint(elementId, [existing.userId, userId])
      return null // Soft-lock: prevent editing
    }

    const state: EditingState = {
      userId,
      elementId,
      elementType,
      startedAt: Date.now(),
      operation,
    }

    this.editingStates.set(elementId, state)
    return state
  }

  /**
   * Stop editing an element
   */
  stopEditing(userId: string, elementId: string): void {
    const existing = this.editingStates.get(elementId)
    if (existing?.userId === userId) {
      this.editingStates.delete(elementId)
    }
    this.rebuildConflictHints()
  }

  /**
   * Get the user currently editing an element
   */
  getEditor(elementId: string): PresenceUser | null {
    const state = this.editingStates.get(elementId)
    if (!state) return null
    return this.users.get(state.userId) || null
  }

  /**
   * Check if current user can edit an element (soft-lock check)
   */
  canEdit(elementId: string): {
    allowed: boolean
    reason?: 'locked_by_other' | 'conflict'
    lockedBy?: PresenceUser
  } {
    const state = this.editingStates.get(elementId)
    if (!state) return { allowed: true }
    if (state.userId === this.currentUserId) return { allowed: true }

    const locker = this.users.get(state.userId)
    return {
      allowed: false,
      reason: 'locked_by_other',
      lockedBy: locker,
    }
  }

  /**
   * Create a conflict hint
   */
  private createConflictHint(elementId: string, userIds: string[]): ConflictHint {
    const users = userIds
      .map((id) => this.users.get(id))
      .filter((u): u is PresenceUser => !!u)
      .map((u) => ({ userId: u.userId, name: u.name, color: u.color }))

    const hint: ConflictHint = {
      id: `conflict-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      elementId,
      users,
      severity: users.length > 2 ? 'high' : 'medium',
      suggestedAction: 'merge',
      detectedAt: Date.now(),
    }

    this.conflictHints.set(elementId, hint)
    return hint
  }

  /**
   * Rebuild conflict hints based on current state
   */
  private rebuildConflictHints(): void {
    // Group editing states by element
    const byElement = new Map<string, string[]>()
    this.editingStates.forEach((state, elementId) => {
      const list = byElement.get(elementId) || []
      list.push(state.userId)
      byElement.set(elementId, list)
    })

    // Create hints for conflicts
    byElement.forEach((userIds, elementId) => {
      if (userIds.length > 1) {
        this.createConflictHint(elementId, userIds)
      } else {
        this.conflictHints.delete(elementId)
      }
    })
  }

  /**
   * Get all active conflict hints
   */
  getConflictHints(): ConflictHint[] {
    return Array.from(this.conflictHints.values())
  }

  /**
   * Resolve a conflict hint
   */
  resolveConflict(elementId: string, resolution: 'merge' | 'override' | 'cancel'): void {
    this.conflictHints.delete(elementId)

    if (resolution === 'cancel') {
      // Cancel all edits on this element
      this.editingStates.delete(elementId)
    } else if (resolution === 'override') {
      // Override: current user takes over
      const existing = this.editingStates.get(elementId)
      if (existing) {
        this.editingStates.set(elementId, {
          ...existing,
          userId: this.currentUserId,
          startedAt: Date.now(),
        })
      }
    }
    // For 'merge', we keep all editing states and let the CRDT handle it
  }

  /**
   * Calculate halo render data for all elements being edited by others
   */
  getHalosForRendering(
    elements: Array<{ id: string; x: number; y: number; width: number; height: number }>
  ): HaloRenderData[] {
    const halos: HaloRenderData[] = []

    elements.forEach((element) => {
      const editor = this.getEditor(element.id)
      if (editor && editor.userId !== this.currentUserId) {
        const state = this.editingStates.get(element.id)
        if (state) {
          halos.push({
            userId: editor.userId,
            userName: editor.name,
            color: editor.color,
            x: element.x - 4,
            y: element.y - 4,
            width: element.width + 8,
            height: element.height + 8,
            operation: state.operation,
            opacity: this.calculateHaloOpacity(state.startedAt),
          })
        }
      }
    })

    return halos
  }

  /**
   * Calculate halo opacity based on edit duration
   */
  private calculateHaloOpacity(startedAt: number): number {
    const elapsed = Date.now() - startedAt
    const maxOpacity = 0.6
    const minOpacity = 0.2
    const fadeStart = 30000 // 30 seconds

    if (elapsed < fadeStart) {
      return maxOpacity
    }

    const fadeDuration = 60000 // 1 minute fade
    const fadeProgress = Math.min((elapsed - fadeStart) / fadeDuration, 1)
    return maxOpacity - (maxOpacity - minOpacity) * fadeProgress
  }

  /**
   * Get cursor render data for all other users
   */
  getCursorsForRendering(): Array<{
    userId: string
    name: string
    color: string
    x: number
    y: number
    isIdle: boolean
  }> {
    const idleThreshold = 30000 // 30 seconds
    const now = Date.now()

    return Array.from(this.users.values())
      .filter((user) => user.userId !== this.currentUserId && user.cursor)
      .map((user) => ({
        userId: user.userId,
        name: user.name,
        color: user.color,
        x: user.cursor!.x,
        y: user.cursor!.y,
        isIdle: now - user.lastActivity > idleThreshold,
      }))
  }

  /**
   * Get user activity summary
   */
  getActivitySummary(): {
    totalUsers: number
    activeEditors: number
    idleUsers: number
    conflicts: number
  } {
    const now = Date.now()
    const idleThreshold = 60000 // 1 minute

    let idleUsers = 0
    this.users.forEach((user) => {
      if (now - user.lastActivity > idleThreshold) {
        idleUsers++
      }
    })

    return {
      totalUsers: this.users.size,
      activeEditors: this.editingStates.size,
      idleUsers,
      conflicts: this.conflictHints.size,
    }
  }

  /**
   * Clean up stale presence data
   */
  cleanup(staleThreshold: number = 300000): void {
    // 5 minutes
    const now = Date.now()

    this.users.forEach((user, userId) => {
      if (now - user.lastActivity > staleThreshold) {
        this.removeUser(userId)
      }
    })

    // Clean up old conflict hints
    this.conflictHints.forEach((hint, elementId) => {
      if (now - hint.detectedAt > 60000) {
        // 1 minute
        this.conflictHints.delete(elementId)
      }
    })
  }

  /**
   * Get all active users
   */
  getUsers(): PresenceUser[] {
    return Array.from(this.users.values())
  }

  /**
   * Serialize state for persistence
   */
  serialize(): string {
    return JSON.stringify({
      users: Array.from(this.users.entries()),
      editingStates: Array.from(this.editingStates.entries()),
      conflictHints: Array.from(this.conflictHints.entries()),
      colorIndex: this.colorIndex,
    })
  }

  /**
   * Restore state from serialized data
   */
  deserialize(data: string): void {
    try {
      const parsed = JSON.parse(data)
      this.users = new Map(parsed.users)
      this.editingStates = new Map(parsed.editingStates)
      this.conflictHints = new Map(parsed.conflictHints)
      this.colorIndex = parsed.colorIndex || 0
    } catch {
      // Ignore parse errors
    }
  }
}

/**
 * Create a stroke halo (visual indicator around a stroke)
 */
export function createStrokeHalo(
  stroke: WhiteboardStroke,
  user: PresenceUser,
  operation: string
): HaloRenderData {
  // Calculate bounding box of stroke
  const points = stroke.points
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  return {
    userId: user.userId,
    userName: user.name,
    color: user.color,
    x: minX - 8,
    y: minY - 8,
    width: maxX - minX + 16,
    height: maxY - minY + 16,
    operation,
    opacity: 0.5,
  }
}

/**
 * Check if two users are editing the same area
 */
export function areEditingSameArea(
  user1: { cursor?: { x: number; y: number } },
  user2: { cursor?: { x: number; y: number } },
  threshold: number = 100
): boolean {
  if (!user1.cursor || !user2.cursor) return false

  const dx = user1.cursor.x - user2.cursor.x
  const dy = user1.cursor.y - user2.cursor.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  return distance < threshold
}
