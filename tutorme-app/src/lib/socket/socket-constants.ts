/**
 * Socket server constants (replaces magic numbers across modules).
 */

export const CHAT_HISTORY_MAX = 100
export const CHAT_HISTORY_SLICE_TO_STUDENT = 50
export const MAX_CHAT_MESSAGE_LENGTH = 4096
export const MAX_DM_MESSAGE_LENGTH = 4096
export const ROOM_IDLE_CLEANUP_MS = 4 * 60 * 60 * 1000 // 4 hours
export const DM_ROOM_IDLE_CLEANUP_MS = 1 * 60 * 60 * 1000 // 1 hour
export const ROOM_CLEANUP_INTERVAL_MS = 60 * 60 * 1000 // 1 hour
export const DM_CLEANUP_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes
export const PDF_CLEANUP_INTERVAL_MS = 30 * 60 * 1000
export const LIVE_DOC_CLEANUP_INTERVAL_MS = 30 * 60 * 1000
export const WHITEBOARD_OP_SEEN_MAX = 20000
export const WHITEBOARD_OP_SEEN_TRIM = 10000
export const WHITEBOARD_DEAD_LETTER_MAX = 500
export const WHITEBOARD_OP_LOG_MAX = 4000
export const LIVE_CLASS_SNAPSHOTS_MAX = 80
export const LIVE_CLASS_EXPORTS_MAX = 150
export const PDF_EVENTS_MAX = 500
export const MATH_WB_EMPTY_ROOM_CLEANUP_MS = 3600000 // 1 hour
export const LCWB_AI_REGION_RATE_LIMIT_PER_MIN = 10
export const LCWB_AI_REGION_RATE_WINDOW_MS = 60_000
export const ROOM_ID_MAX_LENGTH = 256
export const USER_ID_MAX_LENGTH = 128
export const NAME_MAX_LENGTH = 200
