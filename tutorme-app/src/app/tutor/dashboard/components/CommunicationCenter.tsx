'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, isAfter } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Star,
  Clock,
  MoreVertical,
  Plus,
  Sparkles,
  Mail,
  Megaphone,
  ChevronRight,
  Archive,
  Trash2,
  Reply,
  Forward,
  Bookmark,
  Smile,
  Paperclip,
  Mic,
  Bot,
  Check,
  CheckCheck,
  MicOff,
  Pause,
  Play,
  X,
  CalendarDays,
  Tag,
  BarChart3,
  Zap,
  Globe,
  Users,
  FileText,
  Image as ImageIcon,
  Download,
  Hash,
  Settings,
  Volume2,
  Loader2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Bell,
  Eye,
  EyeOff,
  Copy,
  Edit3,
  Trash,
  Radio,
  Wifi,
  WifiOff
} from 'lucide-react'

// ============================================
// TYPES
// ============================================

interface Message {
  id: string
  studentId: string
  studentName: string
  avatar?: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  priority: 'high' | 'normal' | 'low'
  course?: string
  type: 'message' | 'announcement' | 'system'
  attachments?: Attachment[]
  readAt?: string
  labels?: string[]
  isScheduled?: boolean
  scheduledFor?: string
  parentId?: string // For threading
  replyCount?: number
  voiceUrl?: string
  voiceDuration?: number
  translatedContent?: string
  translatedFrom?: string
}

interface Attachment {
  id: string
  name: string
  type: 'image' | 'pdf' | 'document' | 'audio'
  url: string
  size: number
}

interface MessageTemplate {
  id: string
  title: string
  content: string
  category: 'general' | 'course' | 'feedback' | 'reminder' | 'technical'
}

interface QuickReply {
  id: string
  title: string
  content: string
  shortcut?: string
}

interface AIReply {
  id: string
  text: string
  tone: 'formal' | 'casual' | 'friendly' | 'empathetic'
}

interface Label {
  id: string
  name: string
  color: string
}

interface PresenceStatus {
  userId: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: string
}

interface TypingIndicator {
  userId: string
  userName: string
  timestamp: number
}

// ============================================
// MOCK DATA GENERATORS
// ============================================

const generateDemoMessages = (): Message[] => [
  {
    id: '1',
    studentId: 's1',
    studentName: 'Alice Zhang',
    subject: 'Question about homework',
    content: 'Hi, I\'m having trouble understanding problem 3 from yesterday\'s assignment. Could you explain the concept of derivatives again?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: false,
    isStarred: true,
    priority: 'high',
    course: 'Advanced Mathematics',
    type: 'message',
    labels: ['homework', 'urgent'],
    replyCount: 2,
    attachments: []
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'Bob Li',
    subject: 'Missed class notification',
    content: 'I won\'t be able to attend tomorrow\'s class due to a family event. Will there be a recording available?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
    isStarred: false,
    priority: 'normal',
    course: 'Physics 101',
    type: 'message',
    labels: ['attendance'],
    attachments: []
  },
  {
    id: '3',
    studentId: 's3',
    studentName: 'Carol Wang',
    subject: 'Thank you!',
    content: 'Just wanted to say thanks for the extra help yesterday. I finally understood the concept!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isRead: true,
    isStarred: false,
    priority: 'low',
    course: 'English Literature',
    type: 'message',
    readAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    labels: ['feedback'],
    attachments: []
  },
  {
    id: '4',
    studentId: 'system',
    studentName: 'System',
    subject: 'New student enrolled',
    content: 'A new student has enrolled in your Advanced Mathematics course.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    isStarred: false,
    priority: 'normal',
    type: 'system',
    attachments: []
  },
  {
    id: '5',
    studentId: 's4',
    studentName: 'David Chen',
    subject: 'Assignment extension request',
    content: 'I\'m facing some technical issues with my laptop. Could I get a 2-day extension for the upcoming assignment?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: true,
    isStarred: true,
    priority: 'high',
    course: 'Advanced Mathematics',
    type: 'message',
    labels: ['extension', 'technical'],
    attachments: [
      { id: 'a1', name: 'error-screenshot.png', type: 'image', url: '#', size: 1024000 }
    ]
  },
  {
    id: '6',
    studentId: 's5',
    studentName: 'Emma Liu',
    subject: 'Voice message',
    content: '[Voice message]',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false,
    isStarred: false,
    priority: 'normal',
    course: 'Physics 101',
    type: 'message',
    voiceUrl: '#',
    voiceDuration: 45,
    attachments: []
  }
]

const generateDemoTemplates = (): MessageTemplate[] => [
  { id: '1', title: 'Welcome Message', content: 'Welcome to the course! I\'m excited to have you join us. If you have any questions, feel free to reach out.', category: 'general' },
  { id: '2', title: 'Assignment Reminder', content: 'Just a friendly reminder that the assignment is due tomorrow. Let me know if you need any help!', category: 'reminder' },
  { id: '3', title: 'Great Work!', content: 'Excellent work on the recent assignment! Your understanding of the concepts has really improved.', category: 'feedback' },
  { id: '4', title: 'Class Cancellation', content: 'Unfortunately, tomorrow\'s class is cancelled due to unforeseen circumstances. We\'ll reschedule soon.', category: 'course' },
  { id: '5', title: 'Technical Support', content: 'I understand you\'re experiencing technical difficulties. Let\'s troubleshoot this together.', category: 'technical' }
]

const generateQuickReplies = (): QuickReply[] => [
  { id: '1', title: 'Thank you', content: 'Thank you for reaching out!', shortcut: '/ty' },
  { id: '2', title: 'Will check', content: 'I\'ll look into this and get back to you shortly.', shortcut: '/check' },
  { id: '3', title: 'Great job', content: 'Great work! Keep it up!', shortcut: '/great' },
  { id: '4', title: 'See you in class', content: 'Looking forward to seeing you in class!', shortcut: '/class' }
]

const generateAIReplies = (messageContent: string): AIReply[] => [
  { id: '1', text: 'I\'d be happy to help! Let me explain that concept in more detail during our next session.', tone: 'friendly' },
  { id: '2', text: 'Thank you for reaching out. Here\'s a resource that might help: [link]', tone: 'formal' },
  { id: '3', text: 'No problem at all! This is a common question. The key is to remember that...', tone: 'casual' },
  { id: '4', text: 'I understand your frustration. Let\'s work through this together step by step.', tone: 'empathetic' }
]

const LABELS: Label[] = [
  { id: 'homework', name: 'Homework', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'urgent', name: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'feedback', name: 'Feedback', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'technical', name: 'Technical', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'attendance', name: 'Attendance', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'extension', name: 'Extension', color: 'bg-orange-100 text-orange-700 border-orange-200' }
]

// ============================================
// MAIN COMPONENT
// ============================================

export function CommunicationCenter() {
  const router = useRouter()
  
  // Core state
  const [messages, setMessages] = useState<Message[]>(generateDemoMessages())
  const [templates] = useState<MessageTemplate[]>(generateDemoTemplates())
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(generateQuickReplies())
  const [labels] = useState<Label[]>(LABELS)
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'high' | 'scheduled'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set())
  const [showMultiSelect, setShowMultiSelect] = useState(false)
  
  // Dialog states
  const [showCompose, setShowCompose] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [showQuickRepliesManager, setShowQuickRepliesManager] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // Reply state
  const [replyText, setReplyText] = useState('')
  const [showAIReplies, setShowAIReplies] = useState(false)
  const [aiReplies, setAiReplies] = useState<AIReply[]>([])
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voiceRecordingDuration, setVoiceRecordingDuration] = useState(0)
  
  // Scheduling state
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [scheduledTime, setScheduledTime] = useState('09:00')
  
  // Thread view state
  const [showThread, setShowThread] = useState(false)
  const [threadMessages, setThreadMessages] = useState<Message[]>([])
  
  // Real-time simulation state
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([])
  const [presenceStatus, setPresenceStatus] = useState<Record<string, PresenceStatus>>({})
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false)
  
  // New message form state
  const [composeTo, setComposeTo] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeMessage, setComposeMessage] = useState('')
  const [composeAttachments, setComposeAttachments] = useState<Attachment[]>([])
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [composePriority, setComposePriority] = useState<'high' | 'normal' | 'low'>('normal')

  // Refs
  const voiceRecorderRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ============================================
  // REAL-TIME SIMULATION (WebSocket mock)
  // ============================================
  
  useEffect(() => {
    // Simulate WebSocket connection
    setIsWebSocketConnected(true)
    
    // Simulate typing indicators
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newIndicator: TypingIndicator = {
          userId: 's' + Math.floor(Math.random() * 5 + 1),
          userName: ['Alice', 'Bob', 'Carol', 'David', 'Emma'][Math.floor(Math.random() * 5)],
          timestamp: Date.now()
        }
        setTypingIndicators(prev => [...prev.filter(t => Date.now() - t.timestamp < 3000), newIndicator])
      }
    }, 2000)
    
    // Simulate presence updates
    const presenceInterval = setInterval(() => {
      const statuses: Record<string, PresenceStatus> = {
        s1: { userId: 's1', status: Math.random() > 0.3 ? 'online' : 'away' },
        s2: { userId: 's2', status: Math.random() > 0.5 ? 'online' : 'offline', lastSeen: new Date().toISOString() },
        s3: { userId: 's3', status: 'online' },
        s4: { userId: 's4', status: Math.random() > 0.6 ? 'online' : 'offline' },
        s5: { userId: 's5', status: 'away' }
      }
      setPresenceStatus(statuses)
    }, 5000)
    
    return () => {
      clearInterval(typingInterval)
      clearInterval(presenceInterval)
    }
  }, [])

  // ============================================
  // FILTERED MESSAGES
  // ============================================
  
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.labels?.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && !msg.isRead) ||
      (filter === 'starred' && msg.isStarred) ||
      (filter === 'high' && msg.priority === 'high') ||
      (filter === 'scheduled' && msg.isScheduled)
    
    return matchesSearch && matchesFilter
  })

  // ============================================
  // STATISTICS
  // ============================================
  
  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length,
    unreadHighPriority: messages.filter(m => m.priority === 'high' && !m.isRead).length,
    starred: messages.filter(m => m.isStarred).length,
    withAttachments: messages.filter(m => m.attachments && m.attachments.length > 0).length,
    scheduled: messages.filter(m => m.isScheduled).length,
    responseTime: '2.5 hours', // Mock average response time
    todayMessages: messages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length
  }

  // ============================================
  // HANDLERS
  // ============================================
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const handleReply = () => {
    if (!replyText.trim() && composeAttachments.length === 0) return
    
    const newMessage: Message = {
      id: `reply-${Date.now()}`,
      studentId: selectedMessage?.studentId || '',
      studentName: 'You',
      subject: `Re: ${selectedMessage?.subject}`,
      content: replyText,
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      priority: 'normal',
      type: 'message',
      parentId: selectedMessage?.id,
      attachments: composeAttachments
    }
    
    setMessages(prev => [newMessage, ...prev])
    toast.success(isScheduling ? 'Message scheduled!' : 'Reply sent!')
    setReplyText('')
    setComposeAttachments([])
    setShowAIReplies(false)
    setIsScheduling(false)
    setScheduledDate(undefined)
  }

  const handleAIAssist = () => {
    if (!selectedMessage) return
    const suggestions = generateAIReplies(selectedMessage.content)
    setAiReplies(suggestions)
    setShowAIReplies(true)
  }

  const handleUseTemplate = (template: MessageTemplate) => {
    setReplyText(template.content)
    setShowTemplates(false)
  }

  const handleUseQuickReply = (quickReply: QuickReply) => {
    setReplyText(quickReply.content)
  }

  const handleVoiceRecord = () => {
    if (isRecordingVoice) {
      // Stop recording
      setIsRecordingVoice(false)
      if (voiceRecorderRef.current) {
        clearInterval(voiceRecorderRef.current)
      }
      toast.success(`Voice message recorded (${voiceRecordingDuration}s)`)
      setVoiceRecordingDuration(0)
    } else {
      // Start recording
      setIsRecordingVoice(true)
      setVoiceRecordingDuration(0)
      voiceRecorderRef.current = setInterval(() => {
        setVoiceRecordingDuration(prev => prev + 1)
      }, 1000)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    Array.from(files).forEach(file => {
      const newAttachment: Attachment = {
        id: `att-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
        url: URL.createObjectURL(file),
        size: file.size
      }
      setComposeAttachments(prev => [...prev, newAttachment])
    })
    
    toast.success(`${files.length} file(s) attached`)
  }

  const handleToggleMessageSelection = (messageId: string) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set())
    } else {
      setSelectedMessages(new Set(filteredMessages.map(m => m.id)))
    }
  }

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'archive' | 'delete') => {
    setMessages(prev => prev.map(msg => {
      if (!selectedMessages.has(msg.id)) return msg
      
      switch (action) {
        case 'read': return { ...msg, isRead: true, readAt: new Date().toISOString() }
        case 'unread': return { ...msg, isRead: false }
        case 'star': return { ...msg, isStarred: !msg.isStarred }
        case 'archive': return { ...msg, type: 'message' } // Mark as archived
        case 'delete': return null as any
        default: return msg
      }
    }).filter(Boolean))
    
    setSelectedMessages(new Set())
    setShowMultiSelect(false)
    toast.success(`Messages ${action}ed`)
  }

  const handleAddLabel = (messageId: string, labelId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id !== messageId) return msg
      const currentLabels = msg.labels || []
      if (currentLabels.includes(labelId)) {
        return { ...msg, labels: currentLabels.filter(l => l !== labelId) }
      }
      return { ...msg, labels: [...currentLabels, labelId] }
    }))
  }

  const handleTranslate = (message: Message) => {
    // Mock translation
    setMessages(prev => prev.map(msg => {
      if (msg.id !== message.id) return msg
      return {
        ...msg,
        translatedContent: `[Translated] ${msg.content}`,
        translatedFrom: 'zh-CN'
      }
    }))
    toast.success('Message translated')
  }

  const handleViewThread = (message: Message) => {
    setSelectedMessage(message)
    // Mock thread messages
    setThreadMessages([
      message,
      {
        id: 'reply-1',
        studentId: message.studentId,
        studentName: message.studentName,
        subject: '',
        content: 'Follow-up question about the same topic...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isRead: true,
        isStarred: false,
        priority: 'normal',
        type: 'message',
        parentId: message.id
      },
      {
        id: 'reply-2',
        studentId: 'tutor',
        studentName: 'You',
        subject: '',
        content: 'Thanks for the clarification!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: true,
        isStarred: false,
        priority: 'normal',
        type: 'message',
        parentId: message.id
      }
    ])
    setShowThread(true)
  }

  const getPresenceIndicator = (studentId: string) => {
    const status = presenceStatus[studentId]
    if (!status) return null
    
    return (
      <span className={cn(
        "w-2 h-2 rounded-full absolute bottom-0 right-0 border-2 border-white",
        status.status === 'online' && "bg-green-500",
        status.status === 'away' && "bg-yellow-500",
        status.status === 'offline' && "bg-gray-400"
      )} />
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-base">Communication Center</CardTitle>
            {stats.unread > 0 && (
              <Badge variant="destructive" className="text-xs">
                {stats.unread}
              </Badge>
            )}
            {/* WebSocket connection indicator */}
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
              isWebSocketConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {isWebSocketConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isWebSocketConnected ? 'Live' : 'Offline'}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(true)}>
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAnnouncement(true)}>
              <Megaphone className="w-4 h-4 mr-1" />
              Announce
            </Button>
            <Button size="sm" onClick={() => setShowCompose(true)}>
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search messages, labels, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Messages</h4>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'unread', 'starred', 'high', 'scheduled'].map(f => (
                      <Button
                        key={f}
                        variant={filter === f ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter(f as any)}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Labels</Label>
                  <div className="flex flex-wrap gap-1">
                    {labels.map(label => (
                      <Badge
                        key={label.id}
                        variant="outline"
                        className={cn("cursor-pointer", label.color)}
                      >
                        {label.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant={showMultiSelect ? 'default' : 'outline'}
            size="sm"
            className="h-9"
            onClick={() => {
              setShowMultiSelect(!showMultiSelect)
              setSelectedMessages(new Set())
            }}
          >
            <Check className="w-4 h-4 mr-1" />
            Select
          </Button>
        </div>

        {/* Bulk Actions Bar */}
        {showMultiSelect && selectedMessages.size > 0 && (
          <div className="flex items-center justify-between mt-2 p-2 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-700">
              {selectedMessages.size} selected
            </span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => handleBulkAction('read')}>
                <Check className="w-4 h-4 mr-1" />
                Read
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleBulkAction('star')}>
                <Star className="w-4 h-4 mr-1" />
                Star
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleBulkAction('archive')}>
                <Archive className="w-4 h-4 mr-1" />
                Archive
              </Button>
              <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Typing Indicators */}
        {typingIndicators.length > 0 && (
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <div className="flex -space-x-1">
              {typingIndicators.slice(0, 3).map((t, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs">
                  {t.userName[0]}
                </div>
              ))}
            </div>
            <span>{typingIndicators[0].userName} is typing...</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-1 px-4 pb-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => !showMultiSelect && setSelectedMessage(message)}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md relative",
                    !message.isRead ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200",
                    message.priority === 'high' && !message.isRead && "border-l-4 border-l-red-500",
                    selectedMessages.has(message.id) && "ring-2 ring-blue-500",
                    message.isScheduled && "bg-yellow-50 border-yellow-200"
                  )}
                >
                  {/* Multi-select checkbox */}
                  {showMultiSelect && (
                    <div className="absolute top-3 left-3">
                      <Checkbox
                        checked={selectedMessages.has(message.id)}
                        onCheckedChange={() => handleToggleMessageSelection(message.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  
                  <div className={cn("flex items-start gap-3", showMultiSelect && "pl-8")}>
                    {/* Avatar with presence */}
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={cn(
                          "text-xs",
                          message.type === 'system' ? "bg-gray-200" : "bg-blue-100 text-blue-700"
                        )}>
                          {message.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {message.type !== 'system' && getPresenceIndicator(message.studentId)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-medium text-sm", !message.isRead && "text-blue-900")}>
                            {message.studentName}
                          </span>
                          {message.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          {message.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs px-1 py-0">High</Badge>
                          )}
                          {message.isScheduled && (
                            <Badge variant="outline" className="text-xs bg-yellow-50">
                              <Clock className="w-3 h-3 mr-1" />
                              Scheduled
                            </Badge>
                          )}
                          {message.replyCount && message.replyCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {message.replyCount}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                      
                      {/* Subject & Content */}
                      <p className={cn("text-sm truncate", !message.isRead ? "font-medium text-gray-900" : "text-gray-600")}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {message.voiceUrl ? '🎤 Voice message' : message.content}
                      </p>
                      
                      {/* Labels */}
                      {message.labels && message.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.labels.map(labelId => {
                            const label = labels.find(l => l.id === labelId)
                            if (!label) return null
                            return (
                              <Badge key={labelId} variant="outline" className={cn("text-xs", label.color)}>
                                {label.name}
                              </Badge>
                            )
                          })}
                        </div>
                      )}
                      
                      {/* Attachments indicator */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <Paperclip className="w-3 h-3" />
                          {message.attachments.length} attachment(s)
                        </div>
                      )}
                      
                      {/* Read receipt */}
                      {message.isRead && message.readAt && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                          <CheckCheck className="w-3 h-3" />
                          Read {formatTime(message.readAt)}
                        </div>
                      )}
                    </div>
                    
                    {/* Unread indicator */}
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Quick Stats Footer */}
        <div className="p-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-3">
            <span>{stats.total} total</span>
            <span>•</span>
            <span>{stats.unread} unread</span>
            <span>•</span>
            <span>{stats.todayMessages} today</span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => router.push('/tutor/messages')}>
            Open Full Center
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>

      {/* ============================================
          MESSAGE DETAIL DIALOG
          ============================================ */}
      <Dialog open={!!selectedMessage && !showThread} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {selectedMessage.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {getPresenceIndicator(selectedMessage.studentId)}
                    </div>
                    <div>
                      <DialogTitle className="text-lg">{selectedMessage.subject}</DialogTitle>
                      <p className="text-sm text-gray-500">
                        From: {selectedMessage.studentName} • {formatTime(selectedMessage.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setMessages(prev => prev.map(m => 
                          m.id === selectedMessage.id ? { ...m, isStarred: !m.isStarred } : m
                        ))
                      }}
                    >
                      <Star className={cn("w-4 h-4", selectedMessage.isStarred && "fill-yellow-500 text-yellow-500")} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleTranslate(selectedMessage)}>
                      <Globe className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1 my-4">
                <div className="space-y-4">
                  {/* Original message */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.content}</p>
                    {selectedMessage.translatedContent && (
                      <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-sm text-blue-800">{selectedMessage.translatedContent}</p>
                        <p className="text-xs text-blue-500 mt-1">Translated from {selectedMessage.translatedFrom}</p>
                      </div>
                    )}
                  </div>

                  {/* Voice message player */}
                  {selectedMessage.voiceUrl && (
                    <div className="p-4 bg-purple-50 rounded-lg flex items-center gap-3">
                      <Button size="icon" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 h-2 bg-purple-200 rounded-full">
                        <div className="w-1/3 h-full bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-sm text-purple-700">{selectedMessage.voiceDuration}s</span>
                    </div>
                  )}

                  {/* Attachments */}
                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMessage.attachments.map(att => (
                          <div key={att.id} className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                            {att.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            <span className="text-sm">{att.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(att.size)})</span>
                            <Button size="icon" variant="ghost" className="h-6 w-6">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thread button */}
                  {selectedMessage.replyCount && selectedMessage.replyCount > 0 && (
                    <Button variant="outline" className="w-full" onClick={() => handleViewThread(selectedMessage)}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Thread ({selectedMessage.replyCount} replies)
                    </Button>
                  )}

                  {/* Label management */}
                  <div className="flex flex-wrap gap-2">
                    {labels.map(label => (
                      <Button
                        key={label.id}
                        variant={selectedMessage.labels?.includes(label.id) ? 'default' : 'outline'}
                        size="sm"
                        className={cn("text-xs", selectedMessage.labels?.includes(label.id) && label.color)}
                        onClick={() => handleAddLabel(selectedMessage.id, label.id)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {label.name}
                      </Button>
                    ))}
                  </div>

                  {/* AI Assistant */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Button variant="outline" size="sm" onClick={handleAIAssist} className="gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        AI Reply Assistant
                      </Button>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                          <Bookmark className="w-4 h-4 mr-1" />
                          Templates
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowQuickRepliesManager(true)}>
                          <Zap className="w-4 h-4 mr-1" />
                          Quick Replies
                        </Button>
                      </div>
                    </div>

                    {/* Quick Replies */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickReplies.slice(0, 4).map(qr => (
                        <Button
                          key={qr.id}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleUseQuickReply(qr)}
                        >
                          {qr.title}
                        </Button>
                      ))}
                    </div>

                    {showAIReplies && (
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-gray-500">AI-suggested replies:</p>
                        {aiReplies.map((reply) => (
                          <button
                            key={reply.id}
                            onClick={() => setReplyText(reply.text)}
                            className="w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Bot className="w-3 h-3 text-purple-500" />
                              <span className="text-xs font-medium text-purple-700 capitalize">{reply.tone}</span>
                            </div>
                            <p className="text-sm text-gray-800">{reply.text}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>

              {/* Reply Box */}
              <div className="space-y-3 border-t pt-4">
                {/* Attachments preview */}
                {composeAttachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {composeAttachments.map(att => (
                      <div key={att.id} className="flex items-center gap-1 p-2 bg-gray-100 rounded text-sm">
                        <span>{att.name}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-5 w-5"
                          onClick={() => setComposeAttachments(prev => prev.filter(a => a.id !== att.id))}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Voice recording indicator */}
                {isRecordingVoice && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-700">Recording... {voiceRecordingDuration}s</span>
                    <Button size="sm" variant="destructive" onClick={handleVoiceRecord}>
                      <MicOff className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  </div>
                )}

                {/* Scheduling indicator */}
                {isScheduling && scheduledDate && (
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-700">
                      Scheduled for: {format(scheduledDate, 'PPP')} at {scheduledTime}
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => { setIsScheduling(false); setScheduledDate(undefined); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleVoiceRecord}
                      className={cn(isRecordingVoice && "text-red-500")}
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <CalendarDays className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={(date) => {
                            setScheduledDate(date)
                            setIsScheduling(true)
                          }}
                          disabled={(date) => isAfter(new Date(), date)}
                        />
                        {scheduledDate && (
                          <div className="p-3 border-t">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button onClick={handleReply} disabled={!replyText.trim() && composeAttachments.length === 0}>
                    <Send className="w-4 h-4 mr-2" />
                    {isScheduling ? 'Schedule' : 'Send'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ============================================
          THREAD VIEW DIALOG
          ============================================ */}
      <Dialog open={showThread} onOpenChange={setShowThread}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Message Thread
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4 py-4">
              {threadMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.studentName === 'You' ? "flex-row-reverse" : ""
                  )}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={cn(
                      "text-xs",
                      msg.studentName === 'You' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {msg.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    msg.studentName === 'You' ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"
                  )}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* ============================================
          COMPOSE DIALOG
          ============================================ */}
      <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>Send a message to your students</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Input 
                placeholder="Search students..."
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input 
                placeholder="Enter subject..."
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-2">
                {(['low', 'normal', 'high'] as const).map(p => (
                  <Button
                    key={p}
                    variant={composePriority === p ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setComposePriority(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Labels</Label>
              <div className="flex flex-wrap gap-2">
                {labels.map(label => (
                  <Button
                    key={label.id}
                    variant={selectedLabels.includes(label.id) ? 'default' : 'outline'}
                    size="sm"
                    className={cn("text-xs", selectedLabels.includes(label.id) && label.color)}
                    onClick={() => {
                      setSelectedLabels(prev => 
                        prev.includes(label.id) 
                          ? prev.filter(l => l !== label.id)
                          : [...prev, label.id]
                      )
                    }}
                  >
                    {label.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea 
                placeholder="Type your message..."
                className="min-h-[150px]"
                value={composeMessage}
                onChange={(e) => setComposeMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompose(false)}>Cancel</Button>
            <Button onClick={() => { 
              toast.success('Message sent!'); 
              setShowCompose(false);
              setComposeTo('');
              setComposeSubject('');
              setComposeMessage('');
              setSelectedLabels([]);
            }}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================
          TEMPLATES DIALOG
          ============================================ */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Templates</DialogTitle>
            <DialogDescription>Quick insert saved responses</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2 py-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleUseTemplate(template)}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{template.title}</span>
                    <Badge variant="outline" className="text-xs capitalize">{template.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{template.content}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* ============================================
          QUICK REPLIES MANAGER DIALOG
          ============================================ */}
      <Dialog open={showQuickRepliesManager} onOpenChange={setShowQuickRepliesManager}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Quick Replies</DialogTitle>
            <DialogDescription>Manage your quick response shortcuts</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2 py-4">
              {quickReplies.map((qr) => (
                <div key={qr.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{qr.title}</span>
                    {qr.shortcut && (
                      <Badge variant="outline" className="ml-2 text-xs">{qr.shortcut}</Badge>
                    )}
                    <p className="text-sm text-gray-500 truncate">{qr.content}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setReplyText(qr.content)
                        setShowQuickRepliesManager(false)
                      }}
                    >
                      Use
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowQuickRepliesManager(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================
          ANNOUNCEMENT DIALOG
          ============================================ */}
      <Dialog open={showAnnouncement} onOpenChange={setShowAnnouncement}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Broadcast Announcement
            </DialogTitle>
            <DialogDescription>Send an announcement to all students or specific courses</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Recipients</Label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>All Students</option>
                <option>Advanced Mathematics</option>
                <option>Physics 101</option>
                <option>English Literature</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Announcement title..." />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Your announcement..." className="min-h-[150px]" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="schedule" className="rounded" />
              <Label htmlFor="schedule" className="text-sm cursor-pointer">Schedule for later</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnnouncement(false)}>Cancel</Button>
            <Button 
              onClick={() => { toast.success('Announcement broadcasted!'); setShowAnnouncement(false); }}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Megaphone className="w-4 h-4 mr-2" />
              Broadcast
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================
          ANALYTICS DIALOG
          ============================================ */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Communication Analytics
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.unread}</p>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.unreadHighPriority}</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.responseTime}</p>
              <p className="text-sm text-gray-600">Avg Response</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Message Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm w-20">Today</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(stats.todayMessages / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm">{stats.todayMessages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-20">With Files</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(stats.withAttachments / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm">{stats.withAttachments}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-20">Scheduled</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(stats.scheduled / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm">{stats.scheduled}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
