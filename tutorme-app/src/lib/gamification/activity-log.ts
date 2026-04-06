export const ACTIVITY_EVENTS = {
  XP_EARNED: 'xp_earned',
  DAILY_LOGIN: 'daily_login',
  MISSION_START: 'mission_start',
  MISSION_COMPLETE: 'mission_complete',
  QUEST_COMPLETE: 'quest_complete',
  BADGE_EARNED: 'badge_earned',
  AI_CONVERSATION: 'ai_conversation',
} as const

export type ActivityEvent = (typeof ACTIVITY_EVENTS)[keyof typeof ACTIVITY_EVENTS]

export async function logActivity(_userId: string, _event: ActivityEvent, _metadata?: unknown) {
  return { success: true }
}

export async function getRecentActivities(_userId: string) {
  return []
}

export async function getActivityCounts(_userId: string, _startDate: Date, _endDate: Date) {
  return {}
}

export async function getStreakHistory(_userId: string, _days: number = 30) {
  return []
}

export async function calculateEngagementScore(_userId: string): Promise<number> {
  return 0
}
