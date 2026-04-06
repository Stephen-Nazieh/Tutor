export async function onLessonComplete(_userId: string, _lessonId: string) {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function onQuizComplete(
  _userId: string,
  _quizId: string,
  _score: number,
  _isPerfect: boolean
) {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function onAssignmentComplete() {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function onMissionComplete() {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function onSpeakingPracticeComplete() {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function onAiConversationComplete() {
  return { xpEarned: 0, badgesEarned: [], leveledUp: false }
}

export async function checkTimeBasedBadges() {
  return { badgesEarned: [] }
}
