/**
 * Annotation Panel Component
 *
 * Displays and manages sticky notes, comments, and annotations on the whiteboard.
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MentionInput } from '@/components/mentions/MentionInput'
import { StickyNote, MessageSquare, Check, X, Send, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { renderMentions } from '@/lib/mentions/render-mentions'
import type { AnnotationThread } from '@/lib/whiteboard/annotations'

interface AnnotationPanelProps {
  threads: AnnotationThread[]
  currentUserId: string
  currentUserName: string
  currentUserColor: string
  onCreateThread: (
    type: 'sticky' | 'comment' | 'question',
    position: { x: number; y: number },
    content: string
  ) => void
  onAddReply: (threadId: string, content: string) => void
  onResolveThread: (threadId: string) => void
  onDeleteThread: (threadId: string) => void
  onDeleteReply: (threadId: string, replyId: string) => void
  className?: string
}

export function AnnotationPanel({
  threads,
  currentUserId,
  currentUserName,
  currentUserColor,
  onCreateThread,
  onAddReply,
  onResolveThread,
  onDeleteThread,
  onDeleteReply,
  className,
}: AnnotationPanelProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const selectedThread = threads.find(t => t.id === selectedThreadId)

  const handleReplySubmit = useCallback(() => {
    if (selectedThreadId && replyContent.trim()) {
      onAddReply(selectedThreadId, replyContent.trim())
      setReplyContent('')
    }
  }, [selectedThreadId, replyContent, onAddReply])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleReplySubmit()
      }
    },
    [handleReplySubmit]
  )

  const unresolvedThreads = threads.filter(t => !t.isResolved)
  const resolvedThreads = threads.filter(t => t.isResolved)

  return (
    <div className={cn('flex flex-col rounded-lg border bg-white shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Annotations ({unresolvedThreads.length})</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onCreateThread('sticky', { x: 100, y: 100 }, 'New sticky note')}
          >
            <StickyNote className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        {selectedThread ? (
          // Thread Detail View
          <div className="p-4">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setSelectedThreadId(null)}
            >
              ← Back to list
            </Button>

            {/* Original Post */}
            <div className="mb-4 flex gap-3">
              <Avatar className="h-8 w-8" style={{ backgroundColor: selectedThread.authorColor }}>
                <AvatarFallback>{selectedThread.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{selectedThread.authorName}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedThread.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className="mt-1 rounded-lg p-3 text-sm"
                  style={{ backgroundColor: selectedThread.color }}
                >
                  {renderMentions(selectedThread.content)}
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="ml-11 space-y-3">
              {selectedThread.replies.map(reply => (
                <div key={reply.id} className="flex gap-2">
                  <Avatar className="h-6 w-6" style={{ backgroundColor: reply.authorColor }}>
                    <AvatarFallback className="text-xs">{reply.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 rounded bg-gray-50 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{reply.authorName}</span>
                      {reply.authorId === currentUserId && (
                        <button
                          onClick={() => onDeleteReply(selectedThread.id, reply.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-sm">{renderMentions(reply.content)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="relative ml-11 mt-4">
              <MentionInput
                value={replyContent}
                onChange={setReplyContent}
                onKeyDown={handleKeyDown}
                placeholder="Add a reply... (@ to mention)"
                className="min-h-[80px] text-sm"
              />

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Cmd+Enter to send</span>
                <Button size="sm" onClick={handleReplySubmit} disabled={!replyContent.trim()}>
                  <Send className="mr-1 h-3 w-3" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Thread List View
          <>
            {/* Unresolved Threads */}
            {unresolvedThreads.length === 0 && resolvedThreads.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <MessageSquare className="mx-auto mb-2 h-8 w-8" />
                <p className="text-sm">No annotations yet</p>
              </div>
            ) : (
              <>
                {unresolvedThreads.map(thread => (
                  <div
                    key={thread.id}
                    className="cursor-pointer border-b p-3 hover:bg-gray-50"
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: thread.color }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium">
                            {thread.title || thread.content.slice(0, 30)}
                          </span>
                          {thread.replies.length > 0 && (
                            <span className="rounded bg-gray-100 px-1.5 text-xs">
                              {thread.replies.length}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-gray-500">
                          {thread.authorName} • {new Date(thread.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      {thread.authorId === currentUserId && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onResolveThread(thread.id)}>
                              <Check className="mr-2 h-4 w-4" />
                              Resolve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteThread(thread.id)}
                              className="text-red-600"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                ))}

                {/* Resolved Threads */}
                {resolvedThreads.length > 0 && (
                  <>
                    <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
                      Resolved ({resolvedThreads.length})
                    </div>
                    {resolvedThreads.map(thread => (
                      <div
                        key={thread.id}
                        className="cursor-pointer border-b p-3 opacity-60 hover:bg-gray-50"
                        onClick={() => setSelectedThreadId(thread.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500" />
                          <span className="text-sm line-through">
                            {thread.title || thread.content.slice(0, 30)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
