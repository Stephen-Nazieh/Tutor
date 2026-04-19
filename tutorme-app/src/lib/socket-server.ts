/**
 * Socket.io Server for Live Class System
 * Orchestrates real-time handlers; state, types, auth, constants in @/lib/socket.
 */

import { Server as SocketIOServer } from 'socket.io'
import { whiteboardSelectionPresence } from '@/lib/socket'

// Re-export for consumers
export type {
  StudentStatus,
  StudentState,
  ClassRoom,
  ChatMessage,
  BreakoutRoom,
  WhiteboardOpObservabilitySnapshot,
  MathSyncObservabilitySnapshot,
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
  getWhiteboardState,
  clearWhiteboard,
  exportWhiteboard,
  getWhiteboardOpObservability,
  getMathSyncObservability,
  getPollState,
  getSessionPolls,
} from '@/lib/socket'

// Re-export handler registration functions for backward compatibility
export {
  registerLiveClassWhiteboardHandlers,
  initBreakoutHandlers,
  initPollHandlers,
  initFeedbackHandlers,
} from './socket/handlers'

/** Called when a socket disconnects to clear lcwb selection presence; used by both initSocketServer and enhanced server. */
export function cleanupLcwbPresence(io: SocketIOServer, roomId: string, userId: string): void {
  const presenceMap = whiteboardSelectionPresence.get(roomId)
  if (presenceMap?.has(userId)) {
    presenceMap.delete(userId)
    io.to(roomId).emit('lcwb_selection_presence_remove', { userId })
    if (presenceMap.size === 0) whiteboardSelectionPresence.delete(roomId)
  }
}
