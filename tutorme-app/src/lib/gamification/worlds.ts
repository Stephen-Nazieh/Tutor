export async function getWorldsWithStatus(_userId: string) {
  return []
}

export async function getWorldWithMissions(_worldId: string, _userId: string) {
  return { world: null, missions: [] }
}

export async function startMission(_userId: string, _missionId: string) {
  return { started: false }
}

export async function completeMission(_userId: string, _missionId: string) {
  return { completed: false, xpEarned: 0 }
}

export async function getRecommendedMission(_userId: string) {
  return null
}
