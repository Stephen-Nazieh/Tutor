'use client'

import { useEffect, useRef, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { X, Send, MessageSquare } from 'lucide-react'
import type { SessionChatMessage } from './use-session-room-state'

/**
 * Room chat for the live session — everyone in the room (tutor + students) can post
 * and everyone sees it. Messages are owned by the classroom (`useSessionRoomState`,
 * hydrated from `room_state.chatHistory` on join and appended on the live
 * `chat_message` event) and passed in, so opening the panel late still shows the
 * full history. Sending emits `chat_message`, which the server broadcasts + persists.
 */
export function SessionChatPanel({
  sessionId,
  socket,
  messages,
  myUserId,
  onClose,
}: {
  sessionId: string
  socket: Socket | null
  messages: SessionChatMessage[]
  myUserId: string | undefined
  onClose: () => void
}) {
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Keep pinned to the newest message as chat grows / the panel opens.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const send = () => {
    const t = text.trim()
    if (!t || !socket) return
    socket.emit('chat_message', { text: t, roomId: sessionId })
    setText('')
  }

  return (
    <div className="pointer-events-auto flex h-full w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          Chat
        </h3>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <p className="mt-6 text-center text-xs text-slate-400">
            No messages yet. Say hello to the room.
          </p>
        ) : (
          messages.map(m => {
            const mine = !!myUserId && m.userId === myUserId
            return (
              <div
                key={m.id}
                className={mine ? 'flex flex-col items-end' : 'flex flex-col items-start'}
              >
                {!mine ? (
                  <span className="mb-0.5 px-1 text-[10px] font-medium text-slate-400">
                    {m.isAI ? 'AI' : m.name}
                  </span>
                ) : null}
                <div
                  className={
                    'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-1.5 text-sm ' +
                    (mine
                      ? 'rounded-br-sm bg-blue-600 text-white'
                      : 'rounded-bl-sm bg-slate-100 text-slate-800')
                  }
                >
                  {m.text}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex items-center gap-2 border-t p-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder={socket ? 'Message the room…' : 'Connecting…'}
          disabled={!socket}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none disabled:opacity-60"
        />
        <button
          onClick={send}
          disabled={!socket || text.trim().length === 0}
          aria-label="Send"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
