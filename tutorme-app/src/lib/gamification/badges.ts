export async function initializeBadges() {
  return { success: true }
}

export async function awardBadge(_userId: string, _badgeKey: string) {
  return { awarded: false, badge: null, xpBonus: 0 }
}

export async function getAllBadgesWithProgress() {
  return []
}

export async function getBadgeStats() {
  return { total: 0, earned: 0 }
}

export async function checkAndAwardBadges() {
  return []
}
