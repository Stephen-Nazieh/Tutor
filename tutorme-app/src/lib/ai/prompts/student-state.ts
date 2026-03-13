export const studentStateAnalysisPrompt = (params: {
  events: Array<{
    type: string
    timestamp: number
    data?: unknown
  }>
  recentQuizScore?: number
  timeSpent: number
}): string => {
  const eventsStr = JSON.stringify(params.events)

  return `Analyze the student's learning state.

Recent events: ${eventsStr}
Recent quiz score: ${params.recentQuizScore ?? 'none'}
Time spent: ${Math.round(params.timeSpent / 60)} minutes

Analyze:
1. Engagement (0-100)
2. Understanding (0-100)
3. Frustration (0-100)
4. Status label (on_track / struggling / stuck)
5. Suggested intervention

Return JSON:
{
  "engagement": 0-100,
  "understanding": 0-100,
  "frustration": 0-100,
  "status": "on_track|struggling|stuck",
  "reason": "Brief reason",
  "suggestedAction": "hint|escalate|nothing"
}`
}
