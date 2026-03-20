'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Trash2, Clock, BookOpen } from 'lucide-react'

interface Note {
  id: string
  timestamp: number
  content: string
  createdAt: Date
}

interface NotesSidebarProps {
  videoId: string
  currentTime: number
  onSeekToTimestamp: (timestamp: number) => void
}

export function NotesSidebar({ videoId, currentTime, onSeekToTimestamp }: NotesSidebarProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${videoId}`)
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes)
        setNotes(
          parsed.map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt),
          }))
        )
      } catch {
        console.error('Failed to load notes')
      }
    }
  }, [videoId])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes-${videoId}`, JSON.stringify(notes))
    }
  }, [notes, videoId])

  const addNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date(),
    }

    setNotes(prev => [...prev, note].sort((a, b) => a.timestamp - b.timestamp))
    setNewNote('')
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        className="flex h-full w-10 flex-col items-center py-4"
        onClick={() => setIsExpanded(true)}
      >
        <BookOpen className="mb-2 h-5 w-5" />
        <span
          className="writing-mode-vertical rotate-180 text-xs"
          style={{ writingMode: 'vertical-rl' }}
        >
          Notes
        </span>
      </Button>
    )
  }

  return (
    <Card className="flex h-full w-80 flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            Notes
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
            Hide
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        {/* Add Note */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>At {formatTime(currentTime)}</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a note..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addNote()}
            />
            <Button size="icon" onClick={addNote} disabled={!newNote.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notes List */}
        <ScrollArea className="-mx-2 flex-1 px-2">
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <BookOpen className="mx-auto mb-2 h-12 w-12 opacity-30" />
                <p className="text-sm">No notes yet</p>
                <p className="text-xs">Click + to add a note at the current timestamp</p>
              </div>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  className="group rounded-lg border p-3 transition-colors hover:border-blue-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => onSeekToTimestamp(note.timestamp)}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <Clock className="h-3 w-3" />
                      {formatTime(note.timestamp)}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{note.content}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {note.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
