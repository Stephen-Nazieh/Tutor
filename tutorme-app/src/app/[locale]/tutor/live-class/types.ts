export interface LiveStudent {
  id: string
  name: string
  status: 'online' | 'offline' | 'idle' | 'away'
  engagementScore: number
  handRaised: boolean
  attentionLevel: 'high' | 'medium' | 'low'
  lastActive: string
  joinedAt: string
  breakoutRoomId?: string
  reactions: number
  chatMessages: number
  
  // For smart grouping
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  recentPerformance?: number
}

export interface HandRaise {
  id: string
  studentId: string
  studentName: string
  topic?: string
  priority: 'high' | 'normal' | 'low'
  raisedAt: string
  status: 'pending' | 'acknowledged' | 'answered'
}

export interface ChatMessage {
  id: string
  studentId: string
  studentName: string
  content: string
  timestamp: string
  sentiment: 'positive' | 'neutral' | 'negative' | 'confused' | 'question'
  isQuestion?: boolean
  isPinned?: boolean
}

export interface EngagementMetrics {
  totalStudents: number
  activeStudents: number
  averageEngagement: number
  participationRate: number
  totalChatMessages: number
  classDuration: number
  classStartTime: string
  veryEngaged: number
  engaged: number
  passive: number
  disengaged: number
  engagementTrend: 'up' | 'down' | 'stable'
}

export interface Alert {
  id: string
  type: 'disengagement' | 'confusion' | 'technical' | 'participation'
  severity: 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface LiveSessionState {
  sessionId: string
  status: 'preparing' | 'live' | 'paused' | 'ended'
  students: LiveStudent[]
  breakoutRooms: BreakoutRoom[]
  handRaises: HandRaise[]
  messages: ChatMessage[]
  metrics: EngagementMetrics
  alerts: Alert[]
}

// ============================================
// UNIFIED BREAKOUT ROOM TYPES
// ============================================

export interface BreakoutParticipant {
  id: string
  userId: string
  name: string
  avatar?: string
  role: 'tutor' | 'student'
  joinedAt: string
  leftAt?: string
  
  // Real-time state
  isOnline: boolean
  isMuted: boolean
  isVideoOff: boolean
  isScreenSharing: boolean
  
  // Engagement
  engagementScore: number
  attentionLevel: 'high' | 'medium' | 'low'
  handRaised: boolean
}

export interface BreakoutAlert {
  id: string
  type: 'confusion' | 'conflict' | 'off_topic' | 'need_help' | 'quiet'
  message: string
  timestamp: string
  severity: 'low' | 'medium' | 'high'
  participantId?: string
  acknowledged: boolean
}

export interface BreakoutMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  senderRole: 'tutor' | 'student' | 'ai'
  content: string
  timestamp: string
  type: 'text' | 'system' | 'ai_suggestion'
  isQuestion?: boolean
}

export interface BreakoutRoom {
  id: string
  name: string
  mainRoomId: string
  
  // Participants
  participants: BreakoutParticipant[]
  maxParticipants: number
  
  // Status
  status: 'forming' | 'active' | 'paused' | 'closed'
  
  // Time Management
  timeRemaining: number
  timeLimit: number
  startedAt?: string
  endsAt?: string
  
  // AI Features
  aiEnabled: boolean
  aiMode: 'passive' | 'active' | 'socratic'
  
  // Task/Assignment
  assignedTask?: {
    id: string
    title: string
    description: string
    type: 'discussion' | 'problem' | 'project' | 'quiz'
  }
  
  // Topic
  topic?: string
  
  // Alerts & Monitoring
  alerts: BreakoutAlert[]
  
  // Metrics
  metrics: {
    messagesExchanged: number
    avgEngagement: number
    participationRate: number
    topicAdherence: number
    lastUpdated: string
  }
  
  // Video/Daily.co Integration
  videoRoom?: {
    dailyRoomId: string
    url: string
    tutorToken: string
  }
  
  // Chat history
  messages: BreakoutMessage[]
}

export interface SmartGroupingSuggestion {
  type: 'skill_based' | 'mixed_ability' | 'social' | 'random'
  description: string
  confidence: number
  groups: {
    roomIndex: number
    members: string[]
    rationale: string
    predictedOutcome: string
    skillProfile: {
      beginners: number
      intermediate: number
      advanced: number
    }
  }[]
}

export interface BreakoutSessionConfig {
  roomCount: number
  participantsPerRoom: number
  distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select' | 'social'
  timeLimit: number
  aiAssistantEnabled: boolean
  aiMode: 'passive' | 'active' | 'socratic'
  suggestedGroups?: SmartGroupingSuggestion
}

// Preset tasks for breakout rooms
export const PRESET_TASKS = [
  {
    id: 'discuss',
    title: 'Group Discussion',
    description: 'Discuss the key concepts covered in today\'s lesson. Share your understanding and ask clarifying questions.',
    type: 'discussion' as const
  },
  {
    id: 'problem',
    title: 'Problem Solving',
    description: 'Work together to solve the assigned problem set. Each member should contribute their approach.',
    type: 'problem' as const
  },
  {
    id: 'peer-teach',
    title: 'Peer Teaching',
    description: 'Each student takes turns explaining a concept to the group. Teach each other!',
    type: 'discussion' as const
  },
  {
    id: 'project',
    title: 'Mini Project',
    description: 'Collaborate on creating a presentation or solution to the given challenge.',
    type: 'project' as const
  }
]

// Distribution mode options
export const DISTRIBUTION_MODES = [
  { key: 'random', label: 'Random', description: 'Mix students randomly', icon: 'Shuffle' },
  { key: 'skill_based', label: 'Skill Based', description: 'Group by performance level', icon: 'Target' },
  { key: 'social', label: 'Social/Mixed', description: 'Mix abilities for peer teaching', icon: 'UserPlus' },
  { key: 'manual', label: 'Manual', description: 'You assign students', icon: 'Settings2' },
  { key: 'self_select', label: 'Self Select', description: 'Students choose their groups', icon: 'Users' }
] as const

// Alert type config
export const ALERT_CONFIG = {
  confusion: { icon: '❓', label: 'Confusion', color: 'blue' },
  conflict: { icon: '⚠️', label: 'Conflict', color: 'red' },
  off_topic: { icon: '🎯', label: 'Off Topic', color: 'yellow' },
  need_help: { icon: '🆘', label: 'Needs Help', color: 'red' },
  quiet: { icon: '🔇', label: 'Quiet Group', color: 'gray' }
} as const
