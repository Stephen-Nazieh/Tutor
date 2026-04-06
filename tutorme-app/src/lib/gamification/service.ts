export interface GamificationSummary {
  level: number
  xp: number
  xpToNextLevel: number
  progress: number
  streakDays: number
  longestStreak: number
  skills?: Record<string, number>
}

export async function getOrCreateGamification(_userId: string) {
  return {
    userId: _userId,
    level: 1,
    xp: 0,
    streakDays: 0,
    longestStreak: 0,
    totalStudyMinutes: 0,
  }
}

export function calculateLevel(_xp: number): number {
  return 1
}

export function getXpForNextLevel(_currentLevel: number): number {
  return 100
}

export function getLevelProgress(_xp: number, _level: number): number {
  return 0
}

export async function awardXp(_userId: string, xpEarned: number) {
  return { xpEarned, leveledUp: false, level: 1, xp: 0 }
}

export async function updateStreak(_userId: string) {
  return { streakDays: 0, longestStreak: 0, streakBroken: false }
}

export async function checkDailyLogin(_userId: string) {
  return { firstLoginToday: false, xpEarned: 0, leveledUp: false }
}

export async function updateSkillScores(_userId: string, _scores: Record<string, number>) {
  return { success: true }
}

export async function getGamificationSummary(_userId: string): Promise<GamificationSummary> {
  return {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    progress: 0,
    streakDays: 0,
    longestStreak: 0,
    skills: {},
  }
}

export async function unlockWorld(_userId: string, _worldId: string) {
  return { unlocked: false }
}

export async function canAccessWorld(_userId: string, _requiredLevel: number) {
  return false
}
