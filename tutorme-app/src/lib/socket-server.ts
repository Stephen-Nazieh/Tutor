/**
 * Socket.io Server for Live Class System
 * Orchestrates real-time handlers; state, types, auth, constants in @/lib/socket.
 */

// Re-export for consumers
export type {
  StudentStatus,
  StudentState,
  ClassRoom,
  ChatMessage,
  BreakoutRoom,
  PollState,
  DirectMessageRoom,
  WhiteboardState,
  WhiteboardStroke,
  WhiteboardShape,
  WhiteboardText,
} from '@/lib/socket'
export {
  getRoomState,
  getBreakoutRoomState,
  getDMRoomState,
  getUserSocketId,
  isUserOnline,
  broadcastToUser,
} from '@/lib/socket'

// Re-export handler registration functions for backward compatibility
export {
  initBreakoutHandlers,
  initPollHandlers,
  initFeedbackHandlers,
} from './socket/handlers'
