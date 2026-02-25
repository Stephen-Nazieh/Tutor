/**
 * Quick Action Command Palette
 * Universal search and action launcher with keyboard shortcuts
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorOff,
  MessageSquare,
  Users,
  LayoutGrid,
  Presentation,
  Hand,
  Bell,
  Settings,
  LogOut,
  Plus,
  Clock,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  BarChart3,
  Send,
  Sparkles,
  FileText,
  HelpCircle,
  Keyboard,
  Volume2,
  VolumeX
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CommandAction {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  shortcut?: string
  keywords?: string[]
  category: 'media' | 'classroom' | 'engagement' | 'session' | 'navigation' | 'system'
  action: () => void
  disabled?: boolean
  badge?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  actions: CommandAction[]
  recentActions?: string[]  // IDs of recently used actions
  placeholder?: string
}

export function CommandPalette({ 
  isOpen, 
  onClose, 
  actions,
  recentActions = [],
  placeholder = "Type a command or search..."
}: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Reset search when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedCategory(null)
    }
  }, [isOpen])

  // Filter actions based on search and category
  const filteredActions = useMemo(() => {
    let result = actions

    if (selectedCategory) {
      result = result.filter(a => a.category === selectedCategory)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(action => {
        const titleMatch = action.title.toLowerCase().includes(searchLower)
        const descMatch = action.description?.toLowerCase().includes(searchLower)
        const keywordMatch = action.keywords?.some(k => k.toLowerCase().includes(searchLower))
        return titleMatch || descMatch || keywordMatch
      })
    }

    return result
  }, [actions, search, selectedCategory])

  // Group actions by category
  const groupedActions = useMemo(() => {
    const groups: Record<string, CommandAction[]> = {}
    
    filteredActions.forEach(action => {
      if (!groups[action.category]) {
        groups[action.category] = []
      }
      groups[action.category].push(action)
    })

    return groups
  }, [filteredActions])

  // Get recent actions
  const recentCommandActions = useMemo(() => {
    return recentActions
      .map(id => actions.find(a => a.id === id))
      .filter(Boolean) as CommandAction[]
  }, [recentActions, actions])

  const categoryLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    media: { label: 'Media Controls', icon: <Mic className="h-4 w-4" /> },
    classroom: { label: 'Classroom Tools', icon: <LayoutGrid className="h-4 w-4" /> },
    engagement: { label: 'Student Engagement', icon: <Users className="h-4 w-4" /> },
    session: { label: 'Session Management', icon: <Clock className="h-4 w-4" /> },
    navigation: { label: 'Navigation', icon: <Presentation className="h-4 w-4" /> },
    system: { label: 'System', icon: <Settings className="h-4 w-4" /> },
  }

  const handleAction = useCallback((action: CommandAction) => {
    action.action()
    onClose()
  }, [onClose])

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Command Palette</DialogTitle>
      <CommandInput 
        placeholder={placeholder} 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty className="py-6 text-center text-sm text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <Search className="h-8 w-8 text-slate-400" />
            <p>No commands found</p>
            <p className="text-xs text-slate-400">Try a different search term</p>
          </div>
        </CommandEmpty>

        {/* Recent Actions */}
        {recentCommandActions.length > 0 && !search && !selectedCategory && (
          <CommandGroup heading="Recently Used">
            {recentCommandActions.slice(0, 5).map(action => (
              <CommandItem
                key={action.id}
                onSelect={() => handleAction(action)}
                disabled={action.disabled}
                className={cn(action.disabled && "opacity-50 cursor-not-allowed")}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-slate-400">{action.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{action.title}</span>
                      {action.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    {action.description && (
                      <p className="text-xs text-slate-500">{action.description}</p>
                    )}
                  </div>
                  {action.shortcut && (
                    <kbd className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                      {action.shortcut}
                    </kbd>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Category Filters (when no search) */}
        {!search && !selectedCategory && (
          <CommandGroup heading="Categories">
            <div className="flex flex-wrap gap-2 p-2">
              {Object.entries(categoryLabels).map(([key, { label, icon }]) => {
                const count = actions.filter(a => a.category === key).length
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                  >
                    {icon}
                    <span className="capitalize">{label}</span>
                    <span className="text-xs text-slate-500">({count})</span>
                  </button>
                )
              })}
            </div>
          </CommandGroup>
        )}

        {/* Selected Category Header */}
        {selectedCategory && (
          <CommandGroup>
            <div className="flex items-center justify-between px-2 py-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                ← Back to all
              </button>
              <span className="text-xs text-slate-500">
                {categoryLabels[selectedCategory]?.label}
              </span>
            </div>
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* Grouped Actions */}
        {Object.entries(groupedActions).map(([category, categoryActions]) => (
          <CommandGroup key={category} heading={categoryLabels[category]?.label || category}>
            {categoryActions.map(action => (
              <CommandItem
                key={action.id}
                onSelect={() => handleAction(action)}
                disabled={action.disabled}
                className={cn(action.disabled && "opacity-50 cursor-not-allowed")}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-slate-400">{action.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{action.title}</span>
                      {action.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    {action.description && (
                      <p className="text-xs text-slate-500">{action.description}</p>
                    )}
                  </div>
                  {action.shortcut && (
                    <kbd className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                      {action.shortcut}
                    </kbd>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}

        <CommandSeparator />

        {/* Help Footer */}
        <div className="px-3 py-2 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 rounded">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 rounded">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 rounded">esc</kbd>
              <span>Close</span>
            </span>
          </div>
          <span>{filteredActions.length} commands</span>
        </div>
      </CommandList>
    </CommandDialog>
  )
}

// Hook for keyboard shortcut
export function useCommandPalette(shortcut: string = 'cmd+k') {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey
      
      if (modifier && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { isOpen, setIsOpen }
}

// Predefined action creators for common classroom actions
export function createClassroomActions(options: {
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  isRecording: boolean
  studentsRaisingHands: number
  onToggleAudio: () => void
  onToggleVideo: () => void
  onToggleScreenShare: () => void
  onToggleRecording: () => void
  onMuteAll: () => void
  onCallAttention: () => void
  onOpenWhiteboard: () => void
  onOpenPolls?: () => void
  onOpenBreakouts: () => void
  onOpenEngagement: () => void
  onSendBroadcast: () => void
  onLeaveClass: () => void
}): CommandAction[] {
  return [
    // Media Controls
    {
      id: 'toggle-audio',
      title: options.isAudioEnabled ? 'Mute Microphone' : 'Unmute Microphone',
      description: options.isAudioEnabled ? 'Turn off your microphone' : 'Turn on your microphone',
      icon: options.isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />,
      shortcut: '⌘M',
      keywords: ['mute', 'unmute', 'mic', 'audio'],
      category: 'media',
      action: options.onToggleAudio
    },
    {
      id: 'toggle-video',
      title: options.isVideoEnabled ? 'Stop Video' : 'Start Video',
      description: options.isVideoEnabled ? 'Turn off your camera' : 'Turn on your camera',
      icon: options.isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />,
      shortcut: '⌘V',
      keywords: ['camera', 'video', 'on', 'off'],
      category: 'media',
      action: options.onToggleVideo
    },
    {
      id: 'toggle-screen',
      title: options.isScreenSharing ? 'Stop Screen Share' : 'Share Screen',
      description: options.isScreenSharing ? 'Stop sharing your screen' : 'Share your screen with students',
      icon: options.isScreenSharing ? <MonitorOff className="h-4 w-4" /> : <MonitorUp className="h-4 w-4" />,
      shortcut: '⌘S',
      keywords: ['screen', 'share', 'present', 'display'],
      category: 'media',
      action: options.onToggleScreenShare
    },
    
    // Classroom Tools
    {
      id: 'open-whiteboard',
      title: 'Open Whiteboard',
      description: 'Launch the collaborative whiteboard',
      icon: <LayoutGrid className="h-4 w-4" />,
      keywords: ['whiteboard', 'draw', 'sketch', 'board'],
      category: 'classroom',
      action: options.onOpenWhiteboard
    },
    ...(options.onOpenPolls ? [{
      id: 'open-polls' as const,
      title: 'Create Quick Poll',
      description: 'Launch an interactive poll for students',
      icon: <BarChart3 className="h-4 w-4" />,
      shortcut: '⌘P' as const,
      keywords: ['poll', 'quiz', 'vote', 'question'],
      category: 'classroom' as const,
      action: options.onOpenPolls!,
      badge: 'New' as const
    }] : []),
    {
      id: 'open-breakouts',
      title: 'Manage Breakout Rooms',
      description: 'Create and manage breakout sessions',
      icon: <Users className="h-4 w-4" />,
      keywords: ['breakout', 'groups', 'rooms', 'small group'],
      category: 'classroom',
      action: options.onOpenBreakouts
    },

    // Engagement
    {
      id: 'view-engagement',
      title: 'View Engagement Dashboard',
      description: 'See real-time student engagement analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      keywords: ['engagement', 'analytics', 'students', 'attention'],
      category: 'engagement',
      action: options.onOpenEngagement
    },
    {
      id: 'call-attention',
      title: 'Call for Attention',
      description: 'Send notification to all students to focus',
      icon: <Bell className="h-4 w-4" />,
      keywords: ['attention', 'focus', 'alert', 'notify'],
      category: 'engagement',
      action: options.onCallAttention
    },
    {
      id: 'mute-all',
      title: 'Mute All Students',
      description: 'Mute all student microphones',
      icon: <VolumeX className="h-4 w-4" />,
      keywords: ['mute', 'all', 'students', 'quiet'],
      category: 'engagement',
      action: options.onMuteAll
    },
    {
      id: 'send-broadcast',
      title: 'Send Broadcast Message',
      description: 'Send a message to all students',
      icon: <Send className="h-4 w-4" />,
      shortcut: '⌘B',
      keywords: ['broadcast', 'message', 'announce', 'chat'],
      category: 'engagement',
      action: options.onSendBroadcast
    },

    // Session Management
    {
      id: 'toggle-recording',
      title: options.isRecording ? 'Stop Recording' : 'Start Recording',
      description: options.isRecording ? 'Stop session recording' : 'Record this session',
      icon: options.isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />,
      keywords: ['record', 'save', 'capture', 'video'],
      category: 'session',
      action: options.onToggleRecording
    },

    // System
    {
      id: 'leave-class',
      title: 'Leave Classroom',
      description: 'Exit the current session',
      icon: <LogOut className="h-4 w-4" />,
      shortcut: '⌘Q',
      keywords: ['leave', 'exit', 'quit', 'end'],
      category: 'system',
      action: options.onLeaveClass
    },
  ]
}
