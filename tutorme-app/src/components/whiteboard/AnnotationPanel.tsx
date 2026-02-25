/**
 * Annotation Panel Component
 * 
 * Displays and manages sticky notes, comments, and annotations on the whiteboard.
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  StickyNote, 
  MessageSquare, 
  Check,
  X,
  Send,
  MoreHorizontal,
  AtSign
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { AnnotationThread, Comment } from '@/lib/whiteboard/annotations'

interface AnnotationPanelProps {
  threads: AnnotationThread[]
  currentUserId: string
  currentUserName: string
  currentUserColor: string
  onCreateThread: (type: 'sticky' | 'comment' | 'question', position: { x: number; y: number }, content: string) => void
  onAddReply: (threadId: string, content: string) => void
  onResolveThread: (threadId: string) => void
  onDeleteThread: (threadId: string) => void
  onDeleteReply: (threadId: string, replyId: string) => void
  availableUsers: Array<{ id: string; name: string; color: string }>
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
  availableUsers,
  className,
}: AnnotationPanelProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const selectedThread = threads.find(t => t.id === selectedThreadId)

  const handleReplySubmit = useCallback(() => {
    if (selectedThreadId && replyContent.trim()) {
      onAddReply(selectedThreadId, replyContent.trim())
      setReplyContent('')
    }
  }, [selectedThreadId, replyContent, onAddReply])

  const handleMentionSelect = useCallback((user: { id: string; name: string }) => {
    const beforeMention = replyContent.slice(0, replyContent.lastIndexOf('@'))
    setReplyContent(`${beforeMention}@${user.name} `)
    setShowMentions(false)
    textareaRef.current?.focus()
  }, [replyContent])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleReplySubmit()
    }
  }, [handleReplySubmit])

  const filteredUsers = availableUsers.filter(u => 
    u.name.toLowerCase().includes(mentionQuery.toLowerCase())
  )

  const unresolvedThreads = threads.filter(t => !t.isResolved)
  const resolvedThreads = threads.filter(t => t.isResolved)

  return (
    <div className={cn('bg-white border rounded-lg shadow-sm flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">
            Annotations ({unresolvedThreads.length})
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onCreateThread('sticky', { x: 100, y: 100 }, 'New sticky note')}
          >
            <StickyNote className="w-4 h-4" />
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
            <div className="flex gap-3 mb-4">
              <Avatar className="w-8 h-8" style={{ backgroundColor: selectedThread.authorColor }}>
                <AvatarFallback>{selectedThread.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{selectedThread.authorName}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedThread.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div 
                  className="mt-1 p-3 rounded-lg text-sm"
                  style={{ backgroundColor: selectedThread.color }}
                >
                  {selectedThread.content}
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-3 ml-11">
              {selectedThread.replies.map((reply) => (
                <div key={reply.id} className="flex gap-2">
                  <Avatar className="w-6 h-6" style={{ backgroundColor: reply.authorColor }}>
                    <AvatarFallback className="text-xs">{reply.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-50 p-2 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{reply.authorName}</span>
                      {reply.authorId === currentUserId && (
                        <button
                          onClick={() => onDeleteReply(selectedThread.id, reply.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm mt-1">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="mt-4 ml-11 relative">
              <Textarea
                ref={textareaRef}
                value={replyContent}
                onChange={(e) => {
                  setReplyContent(e.target.value)
                  const lastChar = e.target.value.slice(-1)
                  if (lastChar === '@') {
                    setShowMentions(true)
                    setMentionQuery('')
                  } else if (showMentions) {
                    const query = e.target.value.slice(e.target.value.lastIndexOf('@') + 1)
                    setMentionQuery(query)
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Add a reply... (@ to mention)"
                className="min-h-[80px] text-sm"
              />
              
              {/* Mention suggestions */}
              {showMentions && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border rounded-lg shadow-lg max-h-32 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
                      onClick={() => handleMentionSelect(user)}
                    >
                      <Avatar className="w-5 h-5" style={{ backgroundColor: user.color }}>
                        <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  Cmd+Enter to send
                </span>
                <Button size="sm" onClick={handleReplySubmit} disabled={!replyContent.trim()}>
                  <Send className="w-3 h-3 mr-1" />
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
                <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No annotations yet</p>
              </div>
            ) : (
              <>
                {unresolvedThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div 
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: thread.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {thread.title || thread.content.slice(0, 30)}
                          </span>
                          {thread.replies.length > 0 && (
                            <span className="text-xs bg-gray-100 px-1.5 rounded">
                              {thread.replies.length}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {thread.authorName} • {new Date(thread.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      {thread.authorId === currentUserId && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onResolveThread(thread.id)}>
                              <Check className="w-4 h-4 mr-2" />
                              Resolve
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onDeleteThread(thread.id)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
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
                    <div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-500">
                      Resolved ({resolvedThreads.length})
                    </div>
                    {resolvedThreads.map((thread) => (
                      <div
                        key={thread.id}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer opacity-60"
                        onClick={() => setSelectedThreadId(thread.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-500" />
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
