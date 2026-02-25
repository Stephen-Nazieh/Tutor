import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// ============================================
// TYPES (matching component types)
// ============================================

export interface Message {
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
  parentId?: string
  replyCount?: number
  voiceUrl?: string
  voiceDuration?: number
  translatedContent?: string
  translatedFrom?: string
}

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'pdf' | 'document' | 'audio'
  url: string
  size: number
}

export interface MessageTemplate {
  id: string
  title: string
  content: string
  category: 'general' | 'course' | 'feedback' | 'reminder' | 'technical'
}

export interface QuickReply {
  id: string
  title: string
  content: string
  shortcut?: string
}

export interface AIReply {
  id: string
  text: string
  tone: 'formal' | 'casual' | 'friendly' | 'empathetic'
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface PresenceStatus {
  userId: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: string
}

export interface TypingIndicator {
  userId: string
  userName: string
  timestamp: number
}

// ============================================
// STORE STATE INTERFACE
// ============================================

interface CommunicationState {
  // ==================== Core Data ====================
  messages: Message[]
  templates: MessageTemplate[]
  quickReplies: QuickReply[]
  labels: Label[]
  
  // ==================== UI State ====================
  searchQuery: string
  filter: 'all' | 'unread' | 'starred' | 'high' | 'scheduled'
  selectedMessage: Message | null
  selectedMessages: Set<string>
  showMultiSelect: boolean
  
  // ==================== Dialog States ====================
  showCompose: boolean
  showTemplates: boolean
  showAnnouncement: boolean
  showQuickRepliesManager: boolean
  showAnalytics: boolean
  showFilters: boolean
  
  // ==================== Reply State ====================
  replyText: string
  showAIReplies: boolean
  aiReplies: AIReply[]
  isRecordingVoice: boolean
  voiceRecordingDuration: number
  
  // ==================== Scheduling State ====================
  isScheduling: boolean
  scheduledDate: Date | undefined
  scheduledTime: string
  
  // ==================== Thread View State ====================
  showThread: boolean
  threadMessages: Message[]
  
  // ==================== Real-time State ====================
  typingIndicators: TypingIndicator[]
  presenceStatus: Record<string, PresenceStatus>
  isWebSocketConnected: boolean
  
  // ==================== Compose Form State ====================
  composeTo: string
  composeSubject: string
  composeMessage: string
  composeAttachments: Attachment[]
  selectedLabels: string[]
  composePriority: 'high' | 'normal' | 'low'
  
  // ==================== Actions ====================
  // Core data actions
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  updateMessage: (messageId: string, updates: Partial<Message>) => void
  deleteMessage: (messageId: string) => void
  setTemplates: (templates: MessageTemplate[]) => void
  setQuickReplies: (replies: QuickReply[]) => void
  
  // UI actions
  setSearchQuery: (query: string) => void
  setFilter: (filter: 'all' | 'unread' | 'starred' | 'high' | 'scheduled') => void
  setSelectedMessage: (message: Message | null) => void
  toggleMessageSelection: (messageId: string) => void
  setSelectedMessages: (messageIds: Set<string>) => void
  setShowMultiSelect: (show: boolean) => void
  
  // Dialog actions
  setShowCompose: (show: boolean) => void
  setShowTemplates: (show: boolean) => void
  setShowAnnouncement: (show: boolean) => void
  setShowQuickRepliesManager: (show: boolean) => void
  setShowAnalytics: (show: boolean) => void
  setShowFilters: (show: boolean) => void
  
  // Reply actions
  setReplyText: (text: string) => void
  setShowAIReplies: (show: boolean) => void
  setAiReplies: (replies: AIReply[]) => void
  setIsRecordingVoice: (recording: boolean) => void
  setVoiceRecordingDuration: (duration: number) => void
  incrementVoiceDuration: () => void
  
  // Scheduling actions
  setIsScheduling: (scheduling: boolean) => void
  setScheduledDate: (date: Date | undefined) => void
  setScheduledTime: (time: string) => void
  
  // Thread actions
  setShowThread: (show: boolean) => void
  setThreadMessages: (messages: Message[]) => void
  
  // Real-time actions
  addTypingIndicator: (indicator: TypingIndicator) => void
  removeTypingIndicator: (userId: string) => void
  clearExpiredTypingIndicators: () => void
  setPresenceStatus: (statuses: Record<string, PresenceStatus>) => void
  updatePresenceStatus: (userId: string, status: PresenceStatus) => void
  setIsWebSocketConnected: (connected: boolean) => void
  
  // Compose form actions
  setComposeTo: (to: string) => void
  setComposeSubject: (subject: string) => void
  setComposeMessage: (message: string) => void
  addComposeAttachment: (attachment: Attachment) => void
  removeComposeAttachment: (attachmentId: string) => void
  clearComposeAttachments: () => void
  toggleSelectedLabel: (labelId: string) => void
  setSelectedLabels: (labels: string[]) => void
  setComposePriority: (priority: 'high' | 'normal' | 'low') => void
  resetComposeForm: () => void
  
  // Bulk actions
  bulkMarkAsRead: (messageIds: Set<string>) => void
  bulkMarkAsUnread: (messageIds: Set<string>) => void
  bulkToggleStar: (messageIds: Set<string>) => void
  bulkDelete: (messageIds: Set<string>) => void
  bulkArchive: (messageIds: Set<string>) => void
  
  // Message actions
  toggleMessageStar: (messageId: string) => void
  markMessageAsRead: (messageId: string) => void
  addLabelToMessage: (messageId: string, labelId: string) => void
  removeLabelFromMessage: (messageId: string, labelId: string) => void
  translateMessage: (messageId: string, translatedContent: string, translatedFrom: string) => void
  
  // Utility actions
  reset: () => void
}

// ============================================
// INITIAL STATE
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

const LABELS: Label[] = [
  { id: 'homework', name: 'Homework', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'urgent', name: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'feedback', name: 'Feedback', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'technical', name: 'Technical', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'attendance', name: 'Attendance', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'extension', name: 'Extension', color: 'bg-orange-100 text-orange-700 border-orange-200' }
]

const initialState = {
  messages: generateDemoMessages(),
  templates: generateDemoTemplates(),
  quickReplies: generateQuickReplies(),
  labels: LABELS,
  searchQuery: '',
  filter: 'all' as const,
  selectedMessage: null,
  selectedMessages: new Set<string>(),
  showMultiSelect: false,
  showCompose: false,
  showTemplates: false,
  showAnnouncement: false,
  showQuickRepliesManager: false,
  showAnalytics: false,
  showFilters: false,
  replyText: '',
  showAIReplies: false,
  aiReplies: [] as AIReply[],
  isRecordingVoice: false,
  voiceRecordingDuration: 0,
  isScheduling: false,
  scheduledDate: undefined as Date | undefined,
  scheduledTime: '09:00',
  showThread: false,
  threadMessages: [] as Message[],
  typingIndicators: [] as TypingIndicator[],
  presenceStatus: {} as Record<string, PresenceStatus>,
  isWebSocketConnected: false,
  composeTo: '',
  composeSubject: '',
  composeMessage: '',
  composeAttachments: [] as Attachment[],
  selectedLabels: [] as string[],
  composePriority: 'normal' as const,
}

// ============================================
// STORE CREATION
// ============================================

export const useCommunicationStore = create<CommunicationState>()(
  immer((set, get) => ({
    ...initialState,
    
    // Core data actions
    setMessages: (messages) => set((state) => {
      state.messages = messages
    }),
    
    addMessage: (message) => set((state) => {
      state.messages.unshift(message)
    }),
    
    updateMessage: (messageId, updates) => set((state) => {
      const index = state.messages.findIndex(m => m.id === messageId)
      if (index !== -1) {
        state.messages[index] = { ...state.messages[index], ...updates }
      }
    }),
    
    deleteMessage: (messageId) => set((state) => {
      state.messages = state.messages.filter(m => m.id !== messageId)
    }),
    
    setTemplates: (templates) => set((state) => {
      state.templates = templates
    }),
    
    setQuickReplies: (replies) => set((state) => {
      state.quickReplies = replies
    }),
    
    // UI actions
    setSearchQuery: (query) => set((state) => {
      state.searchQuery = query
    }),
    
    setFilter: (filter) => set((state) => {
      state.filter = filter
    }),
    
    setSelectedMessage: (message) => set((state) => {
      state.selectedMessage = message
    }),
    
    toggleMessageSelection: (messageId) => set((state) => {
      const newSet = new Set(state.selectedMessages)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      state.selectedMessages = newSet
    }),
    
    setSelectedMessages: (messageIds) => set((state) => {
      state.selectedMessages = messageIds
    }),
    
    setShowMultiSelect: (show) => set((state) => {
      state.showMultiSelect = show
    }),
    
    // Dialog actions
    setShowCompose: (show) => set((state) => {
      state.showCompose = show
    }),
    
    setShowTemplates: (show) => set((state) => {
      state.showTemplates = show
    }),
    
    setShowAnnouncement: (show) => set((state) => {
      state.showAnnouncement = show
    }),
    
    setShowQuickRepliesManager: (show) => set((state) => {
      state.showQuickRepliesManager = show
    }),
    
    setShowAnalytics: (show) => set((state) => {
      state.showAnalytics = show
    }),
    
    setShowFilters: (show) => set((state) => {
      state.showFilters = show
    }),
    
    // Reply actions
    setReplyText: (text) => set((state) => {
      state.replyText = text
    }),
    
    setShowAIReplies: (show) => set((state) => {
      state.showAIReplies = show
    }),
    
    setAiReplies: (replies) => set((state) => {
      state.aiReplies = replies
    }),
    
    setIsRecordingVoice: (recording) => set((state) => {
      state.isRecordingVoice = recording
    }),
    
    setVoiceRecordingDuration: (duration) => set((state) => {
      state.voiceRecordingDuration = duration
    }),
    
    incrementVoiceDuration: () => set((state) => {
      state.voiceRecordingDuration += 1
    }),
    
    // Scheduling actions
    setIsScheduling: (scheduling) => set((state) => {
      state.isScheduling = scheduling
    }),
    
    setScheduledDate: (date) => set((state) => {
      state.scheduledDate = date
    }),
    
    setScheduledTime: (time) => set((state) => {
      state.scheduledTime = time
    }),
    
    // Thread actions
    setShowThread: (show) => set((state) => {
      state.showThread = show
    }),
    
    setThreadMessages: (messages) => set((state) => {
      state.threadMessages = messages
    }),
    
    // Real-time actions
    addTypingIndicator: (indicator) => set((state) => {
      state.typingIndicators.push(indicator)
    }),
    
    removeTypingIndicator: (userId) => set((state) => {
      state.typingIndicators = state.typingIndicators.filter(t => t.userId !== userId)
    }),
    
    clearExpiredTypingIndicators: () => set((state) => {
      const now = Date.now()
      state.typingIndicators = state.typingIndicators.filter(t => now - t.timestamp < 3000)
    }),
    
    setPresenceStatus: (statuses) => set((state) => {
      state.presenceStatus = statuses
    }),
    
    updatePresenceStatus: (userId, status) => set((state) => {
      state.presenceStatus[userId] = status
    }),
    
    setIsWebSocketConnected: (connected) => set((state) => {
      state.isWebSocketConnected = connected
    }),
    
    // Compose form actions
    setComposeTo: (to) => set((state) => {
      state.composeTo = to
    }),
    
    setComposeSubject: (subject) => set((state) => {
      state.composeSubject = subject
    }),
    
    setComposeMessage: (message) => set((state) => {
      state.composeMessage = message
    }),
    
    addComposeAttachment: (attachment) => set((state) => {
      state.composeAttachments.push(attachment)
    }),
    
    removeComposeAttachment: (attachmentId) => set((state) => {
      state.composeAttachments = state.composeAttachments.filter(a => a.id !== attachmentId)
    }),
    
    clearComposeAttachments: () => set((state) => {
      state.composeAttachments = []
    }),
    
    toggleSelectedLabel: (labelId) => set((state) => {
      if (state.selectedLabels.includes(labelId)) {
        state.selectedLabels = state.selectedLabels.filter(l => l !== labelId)
      } else {
        state.selectedLabels.push(labelId)
      }
    }),
    
    setSelectedLabels: (labels) => set((state) => {
      state.selectedLabels = labels
    }),
    
    setComposePriority: (priority) => set((state) => {
      state.composePriority = priority
    }),
    
    resetComposeForm: () => set((state) => {
      state.composeTo = ''
      state.composeSubject = ''
      state.composeMessage = ''
      state.composeAttachments = []
      state.selectedLabels = []
      state.composePriority = 'normal'
    }),
    
    // Bulk actions
    bulkMarkAsRead: (messageIds) => set((state) => {
      state.messages.forEach(msg => {
        if (messageIds.has(msg.id)) {
          msg.isRead = true
          msg.readAt = new Date().toISOString()
        }
      })
    }),
    
    bulkMarkAsUnread: (messageIds) => set((state) => {
      state.messages.forEach(msg => {
        if (messageIds.has(msg.id)) {
          msg.isRead = false
          msg.readAt = undefined
        }
      })
    }),
    
    bulkToggleStar: (messageIds) => set((state) => {
      state.messages.forEach(msg => {
        if (messageIds.has(msg.id)) {
          msg.isStarred = !msg.isStarred
        }
      })
    }),
    
    bulkDelete: (messageIds) => set((state) => {
      state.messages = state.messages.filter(m => !messageIds.has(m.id))
    }),
    
    bulkArchive: (messageIds) => set((state) => {
      state.messages.forEach(msg => {
        if (messageIds.has(msg.id)) {
          msg.type = 'message'
        }
      })
    }),
    
    // Message actions
    toggleMessageStar: (messageId) => set((state) => {
      const msg = state.messages.find(m => m.id === messageId)
      if (msg) {
        msg.isStarred = !msg.isStarred
      }
      if (state.selectedMessage?.id === messageId) {
        state.selectedMessage.isStarred = !state.selectedMessage.isStarred
      }
    }),
    
    markMessageAsRead: (messageId) => set((state) => {
      const msg = state.messages.find(m => m.id === messageId)
      if (msg) {
        msg.isRead = true
        msg.readAt = new Date().toISOString()
      }
      if (state.selectedMessage?.id === messageId) {
        state.selectedMessage.isRead = true
        state.selectedMessage.readAt = new Date().toISOString()
      }
    }),
    
    addLabelToMessage: (messageId, labelId) => set((state) => {
      const msg = state.messages.find(m => m.id === messageId)
      if (msg) {
        const labels = msg.labels || []
        if (!labels.includes(labelId)) {
          msg.labels = [...labels, labelId]
        }
      }
      if (state.selectedMessage?.id === messageId) {
        const labels = state.selectedMessage.labels || []
        if (!labels.includes(labelId)) {
          state.selectedMessage.labels = [...labels, labelId]
        }
      }
    }),
    
    removeLabelFromMessage: (messageId, labelId) => set((state) => {
      const msg = state.messages.find(m => m.id === messageId)
      if (msg && msg.labels) {
        msg.labels = msg.labels.filter(l => l !== labelId)
      }
      if (state.selectedMessage?.id === messageId && state.selectedMessage.labels) {
        state.selectedMessage.labels = state.selectedMessage.labels.filter(l => l !== labelId)
      }
    }),
    
    translateMessage: (messageId, translatedContent, translatedFrom) => set((state) => {
      const msg = state.messages.find(m => m.id === messageId)
      if (msg) {
        msg.translatedContent = translatedContent
        msg.translatedFrom = translatedFrom
      }
      if (state.selectedMessage?.id === messageId) {
        state.selectedMessage.translatedContent = translatedContent
        state.selectedMessage.translatedFrom = translatedFrom
      }
    }),
    
    // Utility actions
    reset: () => set(() => ({ ...initialState })),
  }))
)

// ============================================
// GRANULAR SELECTORS FOR OPTIMIZED RE-RENDERS
// ============================================

// Core data selectors
export const useMessages = () => useCommunicationStore((state) => state.messages)
export const useTemplates = () => useCommunicationStore((state) => state.templates)
export const useQuickReplies = () => useCommunicationStore((state) => state.quickReplies)
export const useLabels = () => useCommunicationStore((state) => state.labels)

// Filtered messages selector (memoized computation)
export const useFilteredMessages = () => useCommunicationStore((state) => {
  const { messages, searchQuery, filter } = state
  return messages.filter(msg => {
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
})

// Statistics selectors (computed values)
export const useMessageStats = () => useCommunicationStore((state) => {
  const { messages } = state
  return {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length,
    unreadHighPriority: messages.filter(m => m.priority === 'high' && !m.isRead).length,
    starred: messages.filter(m => m.isStarred).length,
    withAttachments: messages.filter(m => m.attachments && m.attachments.length > 0).length,
    scheduled: messages.filter(m => m.isScheduled).length,
    responseTime: '2.5 hours', // Mock average response time
    todayMessages: messages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length
  }
})

// UI state selectors
export const useSearchQuery = () => useCommunicationStore((state) => state.searchQuery)
export const useFilter = () => useCommunicationStore((state) => state.filter)
export const useSelectedMessage = () => useCommunicationStore((state) => state.selectedMessage)
export const useSelectedMessages = () => useCommunicationStore((state) => state.selectedMessages)
export const useShowMultiSelect = () => useCommunicationStore((state) => state.showMultiSelect)

// Dialog state selectors
export const useShowCompose = () => useCommunicationStore((state) => state.showCompose)
export const useShowTemplates = () => useCommunicationStore((state) => state.showTemplates)
export const useShowAnnouncement = () => useCommunicationStore((state) => state.showAnnouncement)
export const useShowQuickRepliesManager = () => useCommunicationStore((state) => state.showQuickRepliesManager)
export const useShowAnalytics = () => useCommunicationStore((state) => state.showAnalytics)
export const useShowFilters = () => useCommunicationStore((state) => state.showFilters)

// Reply state selectors
export const useReplyText = () => useCommunicationStore((state) => state.replyText)
export const useShowAIReplies = () => useCommunicationStore((state) => state.showAIReplies)
export const useAiReplies = () => useCommunicationStore((state) => state.aiReplies)
export const useIsRecordingVoice = () => useCommunicationStore((state) => state.isRecordingVoice)
export const useVoiceRecordingDuration = () => useCommunicationStore((state) => state.voiceRecordingDuration)

// Scheduling state selectors
export const useIsScheduling = () => useCommunicationStore((state) => state.isScheduling)
export const useScheduledDate = () => useCommunicationStore((state) => state.scheduledDate)
export const useScheduledTime = () => useCommunicationStore((state) => state.scheduledTime)

// Thread state selectors
export const useShowThread = () => useCommunicationStore((state) => state.showThread)
export const useThreadMessages = () => useCommunicationStore((state) => state.threadMessages)

// Real-time state selectors
export const useTypingIndicators = () => useCommunicationStore((state) => state.typingIndicators)
export const usePresenceStatus = () => useCommunicationStore((state) => state.presenceStatus)
export const usePresenceStatusForUser = (userId: string) => useCommunicationStore((state) => state.presenceStatus[userId])
export const useIsWebSocketConnected = () => useCommunicationStore((state) => state.isWebSocketConnected)

// Compose form selectors
export const useComposeTo = () => useCommunicationStore((state) => state.composeTo)
export const useComposeSubject = () => useCommunicationStore((state) => state.composeSubject)
export const useComposeMessage = () => useCommunicationStore((state) => state.composeMessage)
export const useComposeAttachments = () => useCommunicationStore((state) => state.composeAttachments)
export const useSelectedLabels = () => useCommunicationStore((state) => state.selectedLabels)
export const useComposePriority = () => useCommunicationStore((state) => state.composePriority)

// Action selectors (grouped for convenience)
export const useCommunicationActions = () => useCommunicationStore((state) => ({
  // Core data
  setMessages: state.setMessages,
  addMessage: state.addMessage,
  updateMessage: state.updateMessage,
  deleteMessage: state.deleteMessage,
  setTemplates: state.setTemplates,
  setQuickReplies: state.setQuickReplies,
  
  // UI
  setSearchQuery: state.setSearchQuery,
  setFilter: state.setFilter,
  setSelectedMessage: state.setSelectedMessage,
  toggleMessageSelection: state.toggleMessageSelection,
  setSelectedMessages: state.setSelectedMessages,
  setShowMultiSelect: state.setShowMultiSelect,
  
  // Dialogs
  setShowCompose: state.setShowCompose,
  setShowTemplates: state.setShowTemplates,
  setShowAnnouncement: state.setShowAnnouncement,
  setShowQuickRepliesManager: state.setShowQuickRepliesManager,
  setShowAnalytics: state.setShowAnalytics,
  setShowFilters: state.setShowFilters,
  
  // Reply
  setReplyText: state.setReplyText,
  setShowAIReplies: state.setShowAIReplies,
  setAiReplies: state.setAiReplies,
  setIsRecordingVoice: state.setIsRecordingVoice,
  setVoiceRecordingDuration: state.setVoiceRecordingDuration,
  incrementVoiceDuration: state.incrementVoiceDuration,
  
  // Scheduling
  setIsScheduling: state.setIsScheduling,
  setScheduledDate: state.setScheduledDate,
  setScheduledTime: state.setScheduledTime,
  
  // Thread
  setShowThread: state.setShowThread,
  setThreadMessages: state.setThreadMessages,
  
  // Real-time
  addTypingIndicator: state.addTypingIndicator,
  removeTypingIndicator: state.removeTypingIndicator,
  clearExpiredTypingIndicators: state.clearExpiredTypingIndicators,
  setPresenceStatus: state.setPresenceStatus,
  updatePresenceStatus: state.updatePresenceStatus,
  setIsWebSocketConnected: state.setIsWebSocketConnected,
  
  // Compose form
  setComposeTo: state.setComposeTo,
  setComposeSubject: state.setComposeSubject,
  setComposeMessage: state.setComposeMessage,
  addComposeAttachment: state.addComposeAttachment,
  removeComposeAttachment: state.removeComposeAttachment,
  clearComposeAttachments: state.clearComposeAttachments,
  toggleSelectedLabel: state.toggleSelectedLabel,
  setSelectedLabels: state.setSelectedLabels,
  setComposePriority: state.setComposePriority,
  resetComposeForm: state.resetComposeForm,
  
  // Bulk actions
  bulkMarkAsRead: state.bulkMarkAsRead,
  bulkMarkAsUnread: state.bulkMarkAsUnread,
  bulkToggleStar: state.bulkToggleStar,
  bulkDelete: state.bulkDelete,
  bulkArchive: state.bulkArchive,
  
  // Message actions
  toggleMessageStar: state.toggleMessageStar,
  markMessageAsRead: state.markMessageAsRead,
  addLabelToMessage: state.addLabelToMessage,
  removeLabelFromMessage: state.removeLabelFromMessage,
  translateMessage: state.translateMessage,
  
  // Utility
  reset: state.reset,
}))
