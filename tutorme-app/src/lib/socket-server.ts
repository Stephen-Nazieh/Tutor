/**
 * Socket.io Server for Live Class System
 * Orchestrates real-time handlers; state, types, auth, constants in @/lib/socket.
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import * as Y from 'yjs'
import { generateWithFallback } from '@/lib/agents'
import { z } from 'zod'
import { safeJsonParseWithSchema } from '@/lib/ai/json'
import {
  CHAT_HISTORY_MAX,
  CHAT_HISTORY_SLICE_TO_STUDENT,
  LIVE_CLASS_EXPORTS_MAX,
  LIVE_CLASS_SNAPSHOTS_MAX,
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_DM_MESSAGE_LENGTH,
  NAME_MAX_LENGTH,
  PDF_EVENTS_MAX,
  ROOM_CLEANUP_INTERVAL_MS,
  DM_CLEANUP_INTERVAL_MS,
  DM_ROOM_IDLE_CLEANUP_MS,
  LIVE_DOC_CLEANUP_INTERVAL_MS,
  PDF_CLEANUP_INTERVAL_MS,
  ROOM_IDLE_CLEANUP_MS,
  ROOM_ID_MAX_LENGTH,
  USER_ID_MAX_LENGTH,
  LCWB_AI_REGION_RATE_LIMIT_PER_MIN,
  LCWB_AI_REGION_RATE_WINDOW_MS,
  WHITEBOARD_OP_SEEN_MAX,
  WHITEBOARD_OP_SEEN_TRIM,
  WHITEBOARD_DEAD_LETTER_MAX,
  WHITEBOARD_OP_LOG_MAX,
  MAX_STROKES,
  getSocketCorsOrigin,
  socketAuthMiddleware,
  activeRooms,
  directMessageRooms,
  userSocketMap,
  getConversationParticipantIds,
  getPdfCollabRoom,
  getLiveDocumentShareMap,
  expandLiveShareForStudents,
  activeWhiteboards,
  whiteboardOpMetrics,
  whiteboardSelectionPresence,
  lcwbAiRegionRateLimit,
  whiteboardOpSeenIds,
  whiteboardDeadLetters,
  whiteboardOpLog,
  whiteboardOpSeq,
  whiteboardBranches,
  liveClassModeration,
  liveClassSnapshots,
  liveClassExports,
  mathWhiteboardRooms,
  mathSyncMetrics,
  breakoutRooms,
  mainRoomBreakouts,
  getWhiteboardOpMetric,
  trimWhiteboardOpTimestamps,
  applyStrokeOps,
  isValidStroke,
  sanitizeWhiteboardOps,
  pushWhiteboardDeadLetters,
  appendWhiteboardOpLog,
  getLiveClassModerationState,
  appendLiveClassSnapshot,
  getMathSyncMetric,
  trimRecentUpdates,
  getMathWhiteboardRoom,
  trimPdfEvents,
  pdfCollabRooms,
  liveDocumentShares,
  activePolls,
  sessionPolls,
  deployedTasks,
  feedbackPolls,
  feedbackQuestions,
} from '@/lib/socket'
import type {
  StudentState,
  ChatMessage,
  ClassRoom,
  DirectMessageRoom,
  WhiteboardStroke,
  WhiteboardStrokeOp,
  WhiteboardShape,
  WhiteboardText,
  WhiteboardState,
  WhiteboardSelectionPresence,
  LiveClassModerationState,
  LiveClassSnapshot,
  MathWhiteboardRoomState,
  BreakoutRoom,
  PollState,
  PdfCollabRoomState,
  LiveDocumentShare,
} from '@/lib/socket'

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
