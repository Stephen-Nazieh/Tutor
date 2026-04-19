/**
 * Re-export all socket handler registration functions.
 * Used by socket-server.ts and socket-server-enhanced.ts.
 */

export { registerLiveClassWhiteboardHandlers } from './whiteboard'
export { initBreakoutHandlers } from './breakout'
export { initPollHandlers } from './polls'
export { initFeedbackHandlers } from './feedback'
