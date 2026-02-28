/**
 * Rich Annotations System
 * 
 * Features:
 * - Sticky notes with positioning
 * - Comments and threaded discussions
 * - @mentions with user lookup
 * - Resolve/unresolve threads
 * - Notification system for mentions
 */

import { z } from 'zod'

// =============================================================================
// Schema Definitions
// =============================================================================

export const MentionSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  startIndex: z.number(),
  endIndex: z.number(),
})

export const CommentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  authorColor: z.string(),
  content: z.string().min(1),
  mentions: z.array(z.object({
    userId: z.string(),
    userName: z.string(),
    startIndex: z.number(),
    endIndex: z.number(),
  })),
  timestamp: z.number(),
  editedAt: z.number().optional(),
})

export const AnnotationThreadSchema = z.object({
  id: z.string(),
  type: z.enum(['sticky', 'comment', 'question']),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  authorId: z.string(),
  authorName: z.string(),
  authorColor: z.string(),
  title: z.string().optional(),
  content: z.string(),
  mentions: z.array(z.object({
    userId: z.string(),
    userName: z.string(),
    startIndex: z.number(),
    endIndex: z.number(),
  })),
  replies: z.array(CommentSchema),
  isResolved: z.boolean(),
  resolvedBy: z.string().optional(),
  resolvedAt: z.number().optional(),
  attachedTo: z.string().optional(), // stroke/element ID
  timestamp: z.number(),
  updatedAt: z.number(),
  color: z.string(),
})

export type Mention = z.infer<typeof MentionSchema>
export type Comment = z.infer<typeof CommentSchema>
export type AnnotationThread = z.infer<typeof AnnotationThreadSchema>

// =============================================================================
// Mention Parser
// =============================================================================

export class MentionParser {
  private users: Map<string, { name: string; color: string }> = new Map()

  /**
   * Register available users for mention autocomplete
   */
  registerUsers(users: Array<{ id: string; name: string; color?: string }>): void {
    this.users.clear()
    users.forEach((user) => {
      this.users.set(user.id, {
        name: user.name,
        color: user.color || '#3b82f6',
      })
    })
  }

  /**
   * Parse mentions from content
   */
  parseMentions(content: string): Mention[] {
    const mentions: Mention[] = []
    const mentionRegex = /@([^\s]+)/g
    let match: RegExpExecArray | null

    while ((match = mentionRegex.exec(content)) !== null) {
      const mentionText = match[1]
      const startIndex = match.index
      const endIndex = startIndex + match[0].length

      // Try to find matching user
      for (const [userId, user] of this.users) {
        if (user.name.toLowerCase().includes(mentionText.toLowerCase())) {
          const mention: Mention = {
            userId,
            userName: user.name,
            startIndex,
            endIndex,
          }
          mentions.push(mention)
          break
        }
      }
    }

    return mentions
  }

  /**
   * Get autocomplete suggestions
   */
  getSuggestions(query: string): Array<{ id: string; name: string; color: string }> {
    const lowerQuery = query.toLowerCase().slice(1) // Remove @
    
    return Array.from(this.users.entries())
      .filter(([, user]) => user.name.toLowerCase().includes(lowerQuery))
      .map(([id, user]) => ({
        id,
        name: user.name,
        color: user.color,
      }))
  }

  /**
   * Replace mentions with display names in content
   */
  formatContent(content: string, mentions: Mention[]): string {
    let result = content
    
    // Sort mentions by start index in reverse to avoid index shifting
    const sortedMentions = [...mentions].sort((a, b) => b.startIndex - a.startIndex)
    
    for (const mention of sortedMentions) {
      result =
        result.slice(0, mention.startIndex) +
        `@${mention.userName}` +
        result.slice(mention.endIndex)
    }
    
    return result
  }
}

// =============================================================================
// Annotation Manager
// =============================================================================

export class AnnotationManager {
  private threads = new Map<string, AnnotationThread>()
  private mentionParser = new MentionParser()
  private onMention?: (mention: Mention, thread: AnnotationThread) => void
  private onThreadChange?: (thread: AnnotationThread) => void

  constructor(options: {
    onMention?: (mention: Mention, thread: AnnotationThread) => void
    onThreadChange?: (thread: AnnotationThread) => void
  } = {}) {
    this.onMention = options.onMention
    this.onThreadChange = options.onThreadChange
  }

  /**
   * Register users for mentions
   */
  registerUsers(users: Array<{ id: string; name: string; color?: string }>): void {
    this.mentionParser.registerUsers(users)
  }

  /**
   * Create a new annotation thread
   */
  createThread(
    type: AnnotationThread['type'],
    position: { x: number; y: number },
    author: { id: string; name: string; color: string },
    content: string,
    options: {
      title?: string
      attachedTo?: string
      color?: string
    } = {}
  ): AnnotationThread {
    const mentions = this.mentionParser.parseMentions(content)

    const thread: AnnotationThread = {
      id: `thread-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type,
      position,
      authorId: author.id,
      authorName: author.name,
      authorColor: author.color,
      title: options.title,
      content,
      mentions,
      replies: [],
      isResolved: false,
      attachedTo: options.attachedTo,
      timestamp: Date.now(),
      updatedAt: Date.now(),
      color: options.color || this.getDefaultColor(type),
    }

    // Validate with Zod
    const result = AnnotationThreadSchema.safeParse(thread)
    if (!result.success) {
      throw new Error(`Invalid thread: ${result.error.message}`)
    }

    this.threads.set(thread.id, thread)

    // Notify mentioned users
    mentions.forEach((mention) => {
      this.onMention?.(mention, thread)
    })

    this.onThreadChange?.(thread)
    return thread
  }

  /**
   * Add a reply to a thread
   */
  addReply(
    threadId: string,
    author: { id: string; name: string; color: string },
    content: string
  ): Comment | null {
    const thread = this.threads.get(threadId)
    if (!thread || thread.isResolved) return null

    const mentions = this.mentionParser.parseMentions(content)

    const reply: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      authorId: author.id,
      authorName: author.name,
      authorColor: author.color,
      content,
      mentions,
      timestamp: Date.now(),
    }

    // Validate
    const result = CommentSchema.safeParse(reply)
    if (!result.success) return null

    thread.replies.push(reply)
    thread.updatedAt = Date.now()

    // Notify mentioned users
    mentions.forEach((mention) => {
      this.onMention?.(mention, thread)
    })

    this.onThreadChange?.(thread)
    return reply
  }

  /**
   * Edit a comment
   */
  editComment(
    threadId: string,
    commentId: string,
    newContent: string
  ): boolean {
    const thread = this.threads.get(threadId)
    if (!thread) return false

    const comment = thread.replies.find((r) => r.id === commentId)
    if (!comment) return false

    comment.content = newContent
    comment.mentions = this.mentionParser.parseMentions(newContent)
    comment.editedAt = Date.now()
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Delete a comment
   */
  deleteComment(threadId: string, commentId: string): boolean {
    const thread = this.threads.get(threadId)
    if (!thread) return false

    const index = thread.replies.findIndex((r) => r.id === commentId)
    if (index === -1) return false

    thread.replies.splice(index, 1)
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Resolve a thread
   */
  resolveThread(threadId: string, resolverId: string): boolean {
    const thread = this.threads.get(threadId)
    if (!thread || thread.isResolved) return false

    thread.isResolved = true
    thread.resolvedBy = resolverId
    thread.resolvedAt = Date.now()
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Unresolve a thread
   */
  unresolveThread(threadId: string): boolean {
    const thread = this.threads.get(threadId)
    if (!thread || !thread.isResolved) return false

    thread.isResolved = false
    thread.resolvedBy = undefined
    thread.resolvedAt = undefined
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Move a thread to a new position
   */
  moveThread(threadId: string, newPosition: { x: number; y: number }): boolean {
    const thread = this.threads.get(threadId)
    if (!thread) return false

    thread.position = newPosition
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Attach thread to an element
   */
  attachToElement(threadId: string, elementId: string): boolean {
    const thread = this.threads.get(threadId)
    if (!thread) return false

    thread.attachedTo = elementId
    thread.updatedAt = Date.now()

    this.onThreadChange?.(thread)
    return true
  }

  /**
   * Delete a thread
   */
  deleteThread(threadId: string): boolean {
    const deleted = this.threads.delete(threadId)
    if (deleted) {
      this.onThreadChange?.({ id: threadId } as AnnotationThread) // Notify deletion
    }
    return deleted
  }

  /**
   * Get a thread by ID
   */
  getThread(threadId: string): AnnotationThread | null {
    return this.threads.get(threadId) || null
  }

  /**
   * Get all threads
   */
  getAllThreads(): AnnotationThread[] {
    return Array.from(this.threads.values())
  }

  /**
   * Get threads attached to an element
   */
  getThreadsForElement(elementId: string): AnnotationThread[] {
    return Array.from(this.threads.values()).filter(
      (t) => t.attachedTo === elementId
    )
  }

  /**
   * Get unresolved threads
   */
  getUnresolvedThreads(): AnnotationThread[] {
    return Array.from(this.threads.values()).filter((t) => !t.isResolved)
  }

  /**
   * Get resolved threads
   */
  getResolvedThreads(): AnnotationThread[] {
    return Array.from(this.threads.values()).filter((t) => t.isResolved)
  }

  /**
   * Get threads by author
   */
  getThreadsByAuthor(authorId: string): AnnotationThread[] {
    return Array.from(this.threads.values()).filter(
      (t) => t.authorId === authorId
    )
  }

  /**
   * Get mention autocomplete suggestions
   */
  getMentionSuggestions(query: string): Array<{ id: string; name: string; color: string }> {
    return this.mentionParser.getSuggestions(query)
  }

  /**
   * Format content with mentions
   */
  formatContent(content: string, mentions: Mention[]): string {
    return this.mentionParser.formatContent(content, mentions)
  }

  /**
   * Get stats
   */
  getStats(): {
    totalThreads: number
    unresolvedThreads: number
    resolvedThreads: number
    totalComments: number
    threadsByType: Record<string, number>
  } {
    const all = this.getAllThreads()
    const byType: Record<string, number> = {}

    all.forEach((t) => {
      byType[t.type] = (byType[t.type] || 0) + 1
    })

    return {
      totalThreads: all.length,
      unresolvedThreads: all.filter((t) => !t.isResolved).length,
      resolvedThreads: all.filter((t) => t.isResolved).length,
      totalComments: all.reduce((sum, t) => sum + t.replies.length, 0),
      threadsByType: byType,
    }
  }

  /**
   * Export threads as JSON
   */
  exportThreads(): string {
    return JSON.stringify({
      threads: Array.from(this.threads.values()),
      exportedAt: Date.now(),
    })
  }

  /**
   * Import threads from JSON
   */
  importThreads(json: string): void {
    const data = JSON.parse(json)
    if (data.threads) {
      data.threads.forEach((thread: AnnotationThread) => {
        this.threads.set(thread.id, thread)
      })
    }
  }

  /**
   * Get default color for thread type
   */
  private getDefaultColor(type: AnnotationThread['type']): string {
    const colors = {
      sticky: '#fef3c7', // Yellow
      comment: '#dbeafe', // Blue
      question: '#fce7f3', // Pink
    }
    return colors[type]
  }
}

// =============================================================================
// Notification System
// =============================================================================

export interface Notification {
  id: string
  type: 'mention' | 'reply' | 'resolve'
  userId: string
  threadId: string
  threadTitle?: string
  message: string
  timestamp: number
  read: boolean
}

export class AnnotationNotificationSystem {
  private notifications: Notification[] = []
  private onNotification?: (notification: Notification) => void

  constructor(onNotification?: (notification: Notification) => void) {
    this.onNotification = onNotification
  }

  /**
   * Create a notification for a mention
   */
  notifyMention(userId: string, mention: Mention, thread: AnnotationThread): void {
    if (userId !== mention.userId) return

    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type: 'mention',
      userId,
      threadId: thread.id,
      threadTitle: thread.title,
      message: `${thread.authorName} mentioned you in "${thread.title || 'a thread'}"`,
      timestamp: Date.now(),
      read: false,
    }

    this.notifications.push(notification)
    this.onNotification?.(notification)
  }

  /**
   * Create a notification for a reply
   */
  notifyReply(userId: string, thread: AnnotationThread, replyAuthor: string): void {
    if (userId === replyAuthor) return

    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type: 'reply',
      userId,
      threadId: thread.id,
      threadTitle: thread.title,
      message: `${replyAuthor} replied to "${thread.title || 'a thread'}"`,
      timestamp: Date.now(),
      read: false,
    }

    this.notifications.push(notification)
    this.onNotification?.(notification)
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      return true
    }
    return false
  }

  /**
   * Get unread notifications for a user
   */
  getUnreadNotifications(userId: string): Notification[] {
    return this.notifications.filter((n) => n.userId === userId && !n.read)
  }

  /**
   * Get all notifications for a user
   */
  getNotifications(userId: string): Notification[] {
    return this.notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Clear old notifications
   */
  clearOldNotifications(olderThanMs: number = 86400000): void {
    const cutoff = Date.now() - olderThanMs
    this.notifications = this.notifications.filter((n) => n.timestamp > cutoff)
  }
}
