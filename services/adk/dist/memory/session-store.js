const sessions = new Map();
export function getSessionSummary(sessionId) {
    return sessions.get(sessionId)?.summary;
}
export function setSessionSummary(sessionId, summary) {
    const entry = sessions.get(sessionId) || {};
    sessions.set(sessionId, { ...entry, summary });
}
