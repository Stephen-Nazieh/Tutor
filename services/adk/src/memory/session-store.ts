const sessions = new Map<string, { summary?: string }>()

export function getSessionSummary(sessionId: string) {
  return sessions.get(sessionId)?.summary
}

export function setSessionSummary(sessionId: string, summary: string) {
  const entry = sessions.get(sessionId) || {}
  sessions.set(sessionId, { ...entry, summary })
}
