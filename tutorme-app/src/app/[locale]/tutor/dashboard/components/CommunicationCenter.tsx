'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useFilteredMessages,
  useMessageStats,
  useSearchQuery,
  useFilter,
  useSelectedMessage,
  useSelectedMessages,
  useShowMultiSelect,
  useShowCompose,
  useShowTemplates,
  useShowAnnouncement,
  useShowQuickRepliesManager,
  useShowAnalytics,
  useShowFilters,
  useReplyText,
  useShowAIReplies,
  useAiReplies,
  useIsRecordingVoice,
  useVoiceRecordingDuration,
  useIsScheduling,
  useScheduledDate,
  useScheduledTime,
  useShowThread,
  useThreadMessages,
  useTypingIndicators,
  usePresenceStatus,
  useIsWebSocketConnected,
  useComposeTo,
  useComposeSubject,
  useComposeMessage,
  useComposeAttachments,
  useSelectedLabels,
  useComposePriority,
  useTemplates,
  useQuickReplies,
  useLabels,
  useCommunicationActions,
  type Message,
  type Attachment,
  type MessageTemplate,
  type QuickReply,
  type AIReply,
  type Label as LabelType,
  type PresenceStatus,
  type TypingIndicator,
} from '@/stores/communication-store'
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
// MOCK DATA GENERATORS
// ============================================

const generateAIReplies = (messageContent: string): AIReply[] => [
  { id: '1', text: 'I\'d be happy to help! Let me explain that concept in more detail during our next session.', tone: 'friendly' },
  { id: '2', text: 'Thank you for reaching out. Here\'s a resource that might help: [link]', tone: 'formal' },
  { id: '3', text: 'No problem at all! This is a common question. The key is to remember that...', tone: 'casual' },
  { id: '4', text: 'I understand your frustration. Let\'s work through this together step by step.', tone: 'empathetic' }
]

// ============================================
// MAIN COMPONENT
// ============================================

export function CommunicationCenter() {
  const router = useRouter()
  
  // Zustand store selectors - granular subscriptions for optimized re-renders
  const filteredMessages = useFilteredMessages()
  const stats = useMessageStats()
  const searchQuery = useSearchQuery()
  const filter = useFilter()
  const selectedMessage = useSelectedMessage()
  const selectedMessages = useSelectedMessages()
  const showMultiSelect = useShowMultiSelect()
  const showCompose = useShowCompose()
  const showTemplates = useShowTemplates()
  const showAnnouncement = useShowAnnouncement()
  const showQuickRepliesManager = useShowQuickRepliesManager()
  const showAnalytics = useShowAnalytics()
  const showFilters = useShowFilters()
  const replyText = useReplyText()
  const showAIReplies = useShowAIReplies()
  const aiReplies = useAiReplies()
  const isRecordingVoice = useIsRecordingVoice()
  const voiceRecordingDuration = useVoiceRecordingDuration()
  const isScheduling = useIsScheduling()
  const scheduledDate = useScheduledDate()
  const scheduledTime = useScheduledTime()
  const showThread = useShowThread()
  const threadMessages = useThreadMessages()
  const typingIndicators = useTypingIndicators()
  const presenceStatus = usePresenceStatus()
  const isWebSocketConnected = useIsWebSocketConnected()
  const composeTo = useComposeTo()
  const composeSubject = useComposeSubject()
  const composeMessage = useComposeMessage()
  const composeAttachments = useComposeAttachments()
  const selectedLabels = useSelectedLabels()
  const composePriority = useComposePriority()
  const templates = useTemplates()
  const quickReplies = useQuickReplies()
  const labels = useLabels()
  
  // Store actions
  const actions = useCommunicationActions()

  // Local state for UI
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Refs
  const voiceRecorderRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ============================================
  // REAL-TIME SIMULATION (WebSocket mock)
  // ============================================
  
  useEffect(() => {
    // Simulate WebSocket connection
    actions.setIsWebSocketConnected(true)
    
    // Simulate typing indicators
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newIndicator: TypingIndicator = {
          userId: 's' + Math.floor(Math.random() * 5 + 1),
          userName: ['Alice', 'Bob', 'Carol', 'David', 'Emma'][Math.floor(Math.random() * 5)],
          timestamp: Date.now()
        }
        actions.addTypingIndicator(newIndicator)
        actions.clearExpiredTypingIndicators()
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
      actions.setPresenceStatus(statuses)
    }, 5000)
    
    return () => {
      clearInterval(typingInterval)
      clearInterval(presenceInterval)
    }
  }, [actions])

  // filteredMessages and stats are already computed by store selectors

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
    
    actions.addMessage(newMessage)
    toast.success(isScheduling ? 'Message scheduled!' : 'Reply sent!')
    actions.setReplyText('')
    actions.clearComposeAttachments()
    actions.setShowAIReplies(false)
    actions.setIsScheduling(false)
    actions.setScheduledDate(undefined)
  }

  const handleAIAssist = () => {
    if (!selectedMessage) return
    const suggestions = generateAIReplies(selectedMessage.content)
    actions.setAiReplies(suggestions)
    actions.setShowAIReplies(true)
  }

  const handleUseTemplate = (template: MessageTemplate) => {
    actions.setReplyText(template.content)
    actions.setShowTemplates(false)
  }

  const handleUseQuickReply = (quickReply: QuickReply) => {
    actions.setReplyText(quickReply.content)
  }

  const handleVoiceRecord = () => {
    if (isRecordingVoice) {
      // Stop recording
      actions.setIsRecordingVoice(false)
      if (voiceRecorderRef.current) {
        clearInterval(voiceRecorderRef.current)
      }
      toast.success(`Voice message recorded (${voiceRecordingDuration}s)`)
      actions.setVoiceRecordingDuration(0)
    } else {
      // Start recording
      actions.setIsRecordingVoice(true)
      actions.setVoiceRecordingDuration(0)
      voiceRecorderRef.current = setInterval(() => {
        actions.incrementVoiceDuration()
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
      actions.addComposeAttachment(newAttachment)
    })
    
    toast.success(`${files.length} file(s) attached`)
  }

  const handleToggleMessageSelection = (messageId: string) => {
    actions.toggleMessageSelection(messageId)
  }

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      actions.setSelectedMessages(new Set())
    } else {
      actions.setSelectedMessages(new Set(filteredMessages.map(m => m.id)))
    }
  }

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'archive' | 'delete') => {
    switch (action) {
      case 'read':
        actions.bulkMarkAsRead(selectedMessages)
        break
      case 'unread':
        actions.bulkMarkAsUnread(selectedMessages)
        break
      case 'star':
        actions.bulkToggleStar(selectedMessages)
        break
      case 'archive':
        actions.bulkArchive(selectedMessages)
        break
      case 'delete':
        actions.bulkDelete(selectedMessages)
        break
    }
    
    actions.setSelectedMessages(new Set())
    actions.setShowMultiSelect(false)
    toast.success(`Messages ${action}ed`)
  }

  const handleAddLabel = (messageId: string, labelId: string) => {
    actions.addLabelToMessage(messageId, labelId)
  }

  const handleTranslate = (message: Message) => {
    // Mock translation
    actions.translateMessage(message.id, `[Translated] ${message.content}`, 'zh-CN')
    toast.success('Message translated')
  }

  const handleViewThread = (message: Message) => {
    actions.setSelectedMessage(message)
    // Mock thread messages
    actions.setThreadMessages([
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
    actions.setShowThread(true)
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
            <Button variant="ghost" size="sm" onClick={() => actions.setShowAnalytics(true)}>
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" onClick={() => actions.setShowAnnouncement(true)}>
              <Megaphone className="w-4 h-4 mr-1" />
              Announce
            </Button>
            <Button size="sm" onClick={() => actions.setShowCompose(true)}>
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
              onChange={(e) => actions.setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Popover open={showFilters} onOpenChange={actions.setShowFilters}>
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
                        onClick={() => actions.setFilter(f as any)}
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
              actions.setShowMultiSelect(!showMultiSelect)
              actions.setSelectedMessages(new Set())
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
                  onClick={() => !showMultiSelect && actions.setSelectedMessage(message)}
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
      <Dialog open={!!selectedMessage && !showThread} onOpenChange={() => actions.setSelectedMessage(null)}>
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
                        actions.toggleMessageStar(selectedMessage.id)
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
                        <Button variant="outline" size="sm" onClick={() => actions.setShowTemplates(true)}>
                          <Bookmark className="w-4 h-4 mr-1" />
                          Templates
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => actions.setShowQuickRepliesManager(true)}>
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
                            onClick={() => actions.setReplyText(reply.text)}
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
                          onClick={() => actions.removeComposeAttachment(att.id)}
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
                    <Button size="sm" variant="ghost" onClick={() => { actions.setIsScheduling(false); actions.setScheduledDate(undefined); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => actions.setReplyText(e.target.value)}
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
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                            actions.setScheduledDate(date)
                            actions.setIsScheduling(true)
                            setCalendarOpen(false)
                          }}
                          disabled={(date) => isAfter(new Date(), date)}
                        />
                        {scheduledDate && (
                          <div className="p-3 border-t">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={scheduledTime}
                              onChange={(e) => actions.setScheduledTime(e.target.value)}
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
      <Dialog open={showThread} onOpenChange={actions.setShowThread}>
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
      <Dialog open={showCompose} onOpenChange={actions.setShowCompose}>
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
                onChange={(e) => actions.setComposeTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input 
                placeholder="Enter subject..."
                value={composeSubject}
                onChange={(e) => actions.setComposeSubject(e.target.value)}
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
                    onClick={() => actions.setComposePriority(p)}
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
                    onClick={() => actions.toggleSelectedLabel(label.id)}
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
                onChange={(e) => actions.setComposeMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => actions.setShowCompose(false)}>Cancel</Button>
            <Button onClick={() => { 
              toast.success('Message sent!'); 
              actions.setShowCompose(false);
              actions.resetComposeForm();
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
      <Dialog open={showTemplates} onOpenChange={actions.setShowTemplates}>
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
      <Dialog open={showQuickRepliesManager} onOpenChange={actions.setShowQuickRepliesManager}>
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
                        actions.setReplyText(qr.content)
                        actions.setShowQuickRepliesManager(false)
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
            <Button onClick={() => actions.setShowQuickRepliesManager(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================
          ANNOUNCEMENT DIALOG
          ============================================ */}
      <Dialog open={showAnnouncement} onOpenChange={actions.setShowAnnouncement}>
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
            <Button variant="outline" onClick={() => actions.setShowAnnouncement(false)}>Cancel</Button>
            <Button 
              onClick={() => { toast.success('Announcement broadcasted!'); actions.setShowAnnouncement(false); }}
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
      <Dialog open={showAnalytics} onOpenChange={actions.setShowAnalytics}>
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
