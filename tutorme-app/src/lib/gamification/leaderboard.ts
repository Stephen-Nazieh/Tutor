export async function updateLeaderboardEntry() {
  return { success: true }
}

export async function getLeaderboard() {
  return { entries: [], total: 0 }
}

export async function getLeaderboardAroundUser() {
  return []
}

export async function getUserLeaderboardStats() {
  return { rank: null, score: 0, total: 0 }
}

export async function closeLeaderboardPeriod() {
  return { success: true }
}
