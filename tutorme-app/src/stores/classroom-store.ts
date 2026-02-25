import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { StudentState, ChatMessage, BreakoutRoom } from '@/lib/socket-server'
import { AgendaItem } from '@/components/class/session-manager'

// Whiteboard page type
export interface WhiteboardPage {
  id: string
  name: string
  strokes: any[]
  texts: any[]
  shapes: any[]
  backgroundColor: string
  backgroundStyle: 'grid' | 'solid' | 'dots' | 'lines'
  backgroundImage?: string
}

// Breakout message type
export interface BreakoutMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isAi?: boolean
}

// Room data type
export interface RoomData {
  url: string
  token: string
}

interface ClassroomState {
  // ==================== Core State ====================
  // Students
  students: StudentState[]
  
  // Chat
  chatMessages: ChatMessage[]
  
  // Breakout Rooms
  breakoutRooms: BreakoutRoom[]
  currentBreakoutRoom: BreakoutRoom | null
  breakoutMessages: BreakoutMessage[]
  
  // Room Data
  roomData: RoomData | null
  
  // ==================== UI State ====================
  // Tabs
  activeTab: 'classroom' | 'breakouts' | 'aiassistant'
  
  // Panels
  showAssetsPanel: boolean
  showEngagementPanel: boolean
  showSessionTimer: boolean
  showLeaveConfirm: boolean
  
  // Video
  isVideoFullscreen: boolean
  
  // ==================== Whiteboard State ====================
  whiteboardPages: WhiteboardPage[]
  currentPageIndex: number
  
  // ==================== Session State ====================
  agenda: AgendaItem[]
  classStartTime: Date
  
  // ==================== Actions ====================
  // Students
  setStudents: (students: StudentState[]) => void
  updateStudent: (userId: string, updates: Partial<StudentState>) => void
  
  // Chat
  setChatMessages: (messages: ChatMessage[]) => void
  addChatMessage: (message: ChatMessage) => void
  
  // Breakout Rooms
  setBreakoutRooms: (rooms: BreakoutRoom[]) => void
  setCurrentBreakoutRoom: (room: BreakoutRoom | null) => void
  addBreakoutMessage: (message: BreakoutMessage) => void
  setBreakoutMessages: (messages: BreakoutMessage[]) => void
  
  // Room Data
  setRoomData: (data: RoomData | null) => void
  
  // UI State
  setActiveTab: (tab: 'classroom' | 'breakouts' | 'aiassistant') => void
  setShowAssetsPanel: (show: boolean) => void
  setShowEngagementPanel: (show: boolean) => void
  setShowSessionTimer: (show: boolean) => void
  setShowLeaveConfirm: (show: boolean) => void
  setIsVideoFullscreen: (fullscreen: boolean) => void
  
  // Whiteboard
  setWhiteboardPages: (pages: WhiteboardPage[]) => void
  addWhiteboardPage: (page: WhiteboardPage) => void
  deleteWhiteboardPage: (index: number) => void
  setCurrentPageIndex: (index: number) => void
  
  // Session
  setAgenda: (agenda: AgendaItem[]) => void
  updateAgendaItem: (id: string, updates: Partial<AgendaItem>) => void
  setClassStartTime: (time: Date) => void
  
  // Reset
  reset: () => void
}

const initialState = {
  students: [],
  chatMessages: [],
  breakoutRooms: [],
  currentBreakoutRoom: null,
  breakoutMessages: [],
  roomData: null,
  activeTab: 'classroom' as const,
  showAssetsPanel: false,
  showEngagementPanel: false,
  showSessionTimer: true,
  showLeaveConfirm: false,
  isVideoFullscreen: false,
  whiteboardPages: [{
    id: 'page-1',
    name: 'Page 1',
    strokes: [],
    texts: [],
    shapes: [],
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid' as const
  }],
  currentPageIndex: 0,
  agenda: [
    { id: '1', title: 'Introduction & Ice Breaker', duration: 5, type: 'intro', status: 'completed' },
    { id: '2', title: 'Concept Review', duration: 15, type: 'content', status: 'active' },
    { id: '3', title: 'Group Practice', duration: 20, type: 'activity', status: 'pending' },
    { id: '4', title: 'Q&A and Wrap-up', duration: 10, type: 'wrapup', status: 'pending' },
  ],
  classStartTime: new Date(),
}

export const useClassroomStore = create<ClassroomState>()(
  immer((set) => ({
    ...initialState,
    
    // Students
    setStudents: (students) => set((state) => {
      state.students = students
    }),
    
    updateStudent: (userId, updates) => set((state) => {
      const index = state.students.findIndex(s => s.userId === userId)
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...updates }
      }
    }),
    
    // Chat
    setChatMessages: (messages) => set((state) => {
      state.chatMessages = messages
    }),
    
    addChatMessage: (message) => set((state) => {
      state.chatMessages.push(message)
    }),
    
    // Breakout Rooms
    setBreakoutRooms: (rooms) => set((state) => {
      state.breakoutRooms = rooms
    }),
    
    setCurrentBreakoutRoom: (room) => set((state) => {
      state.currentBreakoutRoom = room
    }),
    
    addBreakoutMessage: (message) => set((state) => {
      state.breakoutMessages.push(message)
    }),
    
    setBreakoutMessages: (messages) => set((state) => {
      state.breakoutMessages = messages
    }),
    
    // Room Data
    setRoomData: (data) => set((state) => {
      state.roomData = data
    }),
    
    // UI State
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab
    }),
    
    setShowAssetsPanel: (show) => set((state) => {
      state.showAssetsPanel = show
    }),
    
    setShowEngagementPanel: (show) => set((state) => {
      state.showEngagementPanel = show
    }),
    
    setShowSessionTimer: (show) => set((state) => {
      state.showSessionTimer = show
    }),
    
    setShowLeaveConfirm: (show) => set((state) => {
      state.showLeaveConfirm = show
    }),
    
    setIsVideoFullscreen: (fullscreen) => set((state) => {
      state.isVideoFullscreen = fullscreen
    }),
    
    // Whiteboard
    setWhiteboardPages: (pages) => set((state) => {
      state.whiteboardPages = pages
    }),
    
    addWhiteboardPage: (page) => set((state) => {
      state.whiteboardPages.push(page)
      state.currentPageIndex = state.whiteboardPages.length - 1
    }),
    
    deleteWhiteboardPage: (index) => set((state) => {
      if (state.whiteboardPages.length <= 1) return
      state.whiteboardPages.splice(index, 1)
      state.currentPageIndex = Math.min(state.currentPageIndex, state.whiteboardPages.length - 1)
    }),
    
    setCurrentPageIndex: (index) => set((state) => {
      state.currentPageIndex = index
    }),
    
    // Session
    setAgenda: (agenda) => set((state) => {
      state.agenda = agenda
    }),
    
    updateAgendaItem: (id, updates) => set((state) => {
      const index = state.agenda.findIndex(item => item.id === id)
      if (index !== -1) {
        state.agenda[index] = { ...state.agenda[index], ...updates }
      }
    }),
    
    setClassStartTime: (time) => set((state) => {
      state.classStartTime = time
    }),
    
    // Reset
    reset: () => set(() => ({ ...initialState })),
  }))
)

// ==================== Optimized Selectors ====================
// These selectors prevent unnecessary re-renders by selecting only specific slices

// Students selectors
export const useStudents = () => useClassroomStore((state) => state.students)
export const useStudentCount = () => useClassroomStore((state) => state.students.length)
export const useStrugglingStudents = () => useClassroomStore((state) => 
  state.students.filter(s => s.status === 'struggling')
)
export const useStrugglingCount = () => useClassroomStore((state) => 
  state.students.filter(s => s.status === 'struggling').length
)

// Chat selectors
export const useChatMessages = () => useClassroomStore((state) => state.chatMessages)
export const useChatMessageCount = () => useClassroomStore((state) => state.chatMessages.length)

// Breakout room selectors
export const useBreakoutRooms = () => useClassroomStore((state) => state.breakoutRooms)
export const useCurrentBreakoutRoom = () => useClassroomStore((state) => state.currentBreakoutRoom)
export const useBreakoutMessages = () => useClassroomStore((state) => state.breakoutMessages)
export const useBreakoutRoomCount = () => useClassroomStore((state) => state.breakoutRooms.length)
export const useBreakoutAlertCount = () => useClassroomStore((state) => 
  state.breakoutRooms.reduce((count, room) => count + (room.alerts?.length || 0), 0)
)

// UI selectors
export const useActiveTab = () => useClassroomStore((state) => state.activeTab)
export const useShowAssetsPanel = () => useClassroomStore((state) => state.showAssetsPanel)
export const useShowEngagementPanel = () => useClassroomStore((state) => state.showEngagementPanel)
export const useShowSessionTimer = () => useClassroomStore((state) => state.showSessionTimer)
export const useShowLeaveConfirm = () => useClassroomStore((state) => state.showLeaveConfirm)
export const useIsVideoFullscreen = () => useClassroomStore((state) => state.isVideoFullscreen)

// Whiteboard selectors
export const useWhiteboardPages = () => useClassroomStore((state) => state.whiteboardPages)
export const useCurrentPageIndex = () => useClassroomStore((state) => state.currentPageIndex)
export const useCurrentWhiteboardPage = () => useClassroomStore((state) => 
  state.whiteboardPages[state.currentPageIndex]
)

// Session selectors
export const useAgenda = () => useClassroomStore((state) => state.agenda)
export const useClassStartTime = () => useClassroomStore((state) => state.classStartTime)

// Room data selector
export const useRoomData = () => useClassroomStore((state) => state.roomData)

// Action selectors (for handlers that need multiple actions)
export const useClassroomActions = () => useClassroomStore((state) => ({
  setStudents: state.setStudents,
  updateStudent: state.updateStudent,
  setChatMessages: state.setChatMessages,
  addChatMessage: state.addChatMessage,
  setBreakoutRooms: state.setBreakoutRooms,
  setCurrentBreakoutRoom: state.setCurrentBreakoutRoom,
  addBreakoutMessage: state.addBreakoutMessage,
  setBreakoutMessages: state.setBreakoutMessages,
  setRoomData: state.setRoomData,
  setActiveTab: state.setActiveTab,
  setShowAssetsPanel: state.setShowAssetsPanel,
  setShowEngagementPanel: state.setShowEngagementPanel,
  setShowSessionTimer: state.setShowSessionTimer,
  setShowLeaveConfirm: state.setShowLeaveConfirm,
  setIsVideoFullscreen: state.setIsVideoFullscreen,
  setWhiteboardPages: state.setWhiteboardPages,
  addWhiteboardPage: state.addWhiteboardPage,
  deleteWhiteboardPage: state.deleteWhiteboardPage,
  setCurrentPageIndex: state.setCurrentPageIndex,
  setAgenda: state.setAgenda,
  updateAgendaItem: state.updateAgendaItem,
  setClassStartTime: state.setClassStartTime,
  reset: state.reset,
}))
