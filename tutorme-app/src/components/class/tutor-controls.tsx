/**
 * Tutor Controls Component
 * Broadcast messages and manage the class session
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, AlertTriangle, Send, Plus, ChevronLeft, ChevronRight, X, Grid3X3, MoreHorizontal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Page {
  id: string
  name: string
}

interface TutorControlsProps {
  studentCount: number
  strugglingCount: number
  onBroadcast: (text: string, target: 'all' | 'struggling' | 'needs_help') => void
  // Page navigation props
  pages?: Page[]
  currentPageIndex?: number
  onPageChange?: (index: number) => void
  onAddPage?: () => void
  onDeletePage?: (index: number) => void
}

export function TutorControls({ 
  studentCount, 
  strugglingCount,
  onBroadcast,
  pages = [],
  currentPageIndex = 0,
  onPageChange,
  onAddPage,
  onDeletePage
}: TutorControlsProps) {
  const [broadcastText, setBroadcastText] = useState('')
  const [targetGroup, setTargetGroup] = useState<'all' | 'struggling' | 'needs_help'>('all')

  const handleBroadcast = () => {
    if (!broadcastText.trim()) return
    onBroadcast(broadcastText.trim(), targetGroup)
    setBroadcastText('')
  }

  const quickMessages = [
    { label: 'Let\'s start', text: 'Welcome everyone! Let\'s begin today\'s class session.' },
    { label: 'Good job', text: 'Great work so far! Keep it up.' },
    { label: 'Need help?', text: 'If you\'re stuck, don\'t hesitate to ask questions in chat.' },
    { label: 'Break', text: 'Let\'s take a 5-minute break. See you soon!' },
    { label: 'Wrapping up', text: 'We\'re wrapping up in 10 minutes. Finish your current task.' },
  ]

  const hasPages = pages.length > 0

  return (
    <div className="bg-slate-800 border-t border-slate-700 px-4 py-3">
      <div className="flex items-center gap-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Users className="w-4 h-4" />
            <span>{studentCount} students</span>
          </div>
          {strugglingCount > 0 && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span>{strugglingCount} need attention</span>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-700" />

        {/* Quick Messages: 2 visible on small screens, rest in More (ClassRoom.md: footer streamlining) */}
        <div className="flex items-center gap-2">
          {quickMessages.slice(0, 2).map((msg) => (
            <button
              key={msg.label}
              onClick={() => onBroadcast(msg.text, 'all')}
              className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded text-slate-300 whitespace-nowrap"
            >
              {msg.label}
            </button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2 text-slate-400 border-slate-600 hover:bg-slate-700">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More quick messages</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-slate-800 border-slate-700">
              {quickMessages.map((msg) => (
                <DropdownMenuItem
                  key={msg.label}
                  onClick={() => onBroadcast(msg.text, 'all')}
                  className="text-slate-200 focus:bg-slate-700 focus:text-white cursor-pointer"
                >
                  {msg.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="h-8 w-px bg-slate-700" />

        {/* Page Navigation */}
        {hasPages && onPageChange && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddPage} 
              className="gap-1 h-8 text-xs"
            >
              <Plus className="w-3 h-3" /> New Page
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPageChange(Math.max(0, currentPageIndex - 1))} 
              disabled={currentPageIndex === 0} 
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {pages.map((page, index) => (
                <button 
                  key={page.id} 
                  onClick={() => onPageChange(index)} 
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                    index === currentPageIndex 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Grid3X3 className="w-3 h-3" />
                  <span className="max-w-[60px] truncate">{page.name}</span>
                  {pages.length > 1 && index === currentPageIndex && onDeletePage && (
                    <X 
                      className="w-3 h-3 ml-1 opacity-70 hover:opacity-100 hover:bg-red-500 rounded" 
                      onClick={(e) => { e.stopPropagation(); onDeletePage(index); }} 
                    />
                  )}
                </button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPageChange(Math.min(pages.length - 1, currentPageIndex + 1))} 
              disabled={currentPageIndex === pages.length - 1} 
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex-1" />

        {/* Broadcast Input */}
        <div className="flex items-center gap-2">
          <Select 
            value={targetGroup} 
            onValueChange={(v: 'all' | 'struggling' | 'needs_help') => setTargetGroup(v)}
          >
            <SelectTrigger className="w-36 bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all" className="text-white">All Students</SelectItem>
              <SelectItem value="struggling" className="text-white">Struggling Only</SelectItem>
              <SelectItem value="needs_help" className="text-white">Need Help</SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBroadcast()}
            placeholder="Broadcast message to students..."
            className="w-80 bg-slate-700 border-slate-600 text-white"
          />

          <Button onClick={handleBroadcast} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
