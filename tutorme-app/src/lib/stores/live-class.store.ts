// @ts-nocheck
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface LiveClassState {
  // Student Management
  students: Map<string, Student>
  handRaised: string[]
  selectedStudent: string | null

  // Chat State
  messages: ChatMessage[]
  currentMessage: string
  isTyping: Set<string>

  // Breakout Rooms
  breakoutRooms: Map<string, BreakoutRoom>
  activeBreakoutSession: string | null

  // Whiteboard State
  whiteboardLayers: Map<string, WhiteboardLayer>
  activeLayer: string
  isBroadcasting: boolean

  // UI State
  activePanel: 'chat' | 'students' | 'whiteboard' | 'agenda'
  videoGridLayout: 'grid' | 'speakers' | 'presenter'
  isFullscreen: boolean

  // Actions
  addStudent: (student: Student) => void
  removeStudent: (studentId: string) => void
  updateStudentState: (studentId: string, state: Partial<Student>) => void
  addMessage: (message: ChatMessage) => void
  joinBreakoutRoom: (studentId: string, roomId: string) => void
  setWhiteboardLayer: (layerId: string, layer: WhiteboardLayer) => void
  broadcastTutor: (isBroadcasting: boolean) => void
}

export const liveClassStore = create<LiveClassState>()(
  immer((set) => ({
    // Initial state
    students: new Map(),
    handRaised: [],
    selectedStudent: null,
    messages: [],
    currentMessage: '',
    isTyping: new Set(),
    breakoutRooms: new Map(),
    activeBreakoutSession: null,
    whiteboardLayers: new Map(),
    activeLayer: 'tutorial',
    isBroadcasting: false,
    activePanel: 'students',
    videoGridLayout: 'grid',
    isFullscreen: false,

    // Actions
    addStudent: (student) =>
      set((state) => {
        state.students.set(student.id, student)
      }),

    updateStudentState: (studentId, updates) =>
      set((state) => {
        const student = state.students.get(studentId)
        if (student) {
          state.students.set(studentId, { ...student, ...updates })
        }
      })
  }))
)

// Selectors for performance
export const useStudents = () => useLiveClassStore((state) => state.students)
export const useActiveStudents = () => useLiveClassStore((state) =>
  Array.from(state.students.values()).filter(s => s.isActive)
)
export const useHandRaised = () => useLiveClassStore((state) => state.handRaised)