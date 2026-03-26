/**
 * ============================================================================
 * LIVE MONITOR AGENT - MONITORING PROMPTS
 * ============================================================================
 *
 * UI LOCATION:
 * - /tutor/insights?sessionId=[sessionId] - Real-time monitoring panel
 * - Alert notifications during live class
 *
 * EDIT THIS FILE to change how live monitoring works.
 */

import { Student, LiveSession } from '../../shared-data'

export interface StudentActivity {
  studentId: string
  messagesCount: number
  videoOn: boolean
  screenActive: boolean
  lastActivity: Date
  quizResponses: number
  chatSentiment: 'positive' | 'neutral' | 'negative' | 'confused'
}

/**
 * Engagement analysis prompt
 * TRIGGERED BY: Every 30 seconds during live class
 */
export function buildEngagementAnalysisPrompt(
  activities: StudentActivity[],
  sessionTopic: string,
  duration: number // minutes elapsed
): string {
  const activitySummary = activities
    .map(a => {
      const inactive = Date.now() - a.lastActivity.getTime() > 5 * 60 * 1000 // 5 min
      return `
- Student ${a.studentId}:
  - Messages: ${a.messagesCount}
  - Video: ${a.videoOn ? 'ON' : 'OFF'}
  - Active: ${a.screenActive ? 'YES' : 'NO'}
  - Sentiment: ${a.chatSentiment}
  - ${inactive ? 'INACTIVE >5min' : 'Recently active'}
`
    })
    .join('\n')

  return `Analyze student engagement in a live class.

SESSION INFO:
- Topic: ${sessionTopic}
- Duration: ${duration} minutes
- Students: ${activities.length}

STUDENT ACTIVITIES:
${activitySummary}

## ANALYSIS TASK
For each student, calculate engagement score (0-100) based on:
- Message participation (0-30 points)
- Video on (0-20 points)
- Screen active (0-20 points)
- Recent activity (0-20 points)
- Positive sentiment (0-10 points)

## OUTPUT FORMAT (JSON)
{
  "engagementScores": [
    {"studentId": "id", "score": 85, "status": "engaged|distracted|confused|inactive"}
  ],
  "classAverage": 72,
  "atRiskStudents": ["ids of students <50 engagement"],
  "trend": "improving|stable|declining",
  "suggestion": "One sentence suggestion for tutor"
}

Analyze now:`
}

/**
 * Confusion detection prompt
 * TRIGGERED BY: Student sends confusing message OR low quiz score
 */
export function buildConfusionDetectionPrompt(
  studentMessage: string,
  currentTopic: string,
  recentMessages: string[]
): string {
  return `Detect if a student is confused based on their message.

CURRENT TOPIC: ${currentTopic}

RECENT CONTEXT:
${recentMessages.join('\n')}

STUDENT MESSAGE: "${studentMessage}"

## DETECTION CRITERIA
Signs of confusion:
- "I don't understand"
- "Can you repeat?"
- "What do you mean?"
- Off-topic questions
- Incorrect assumptions
- Silence (no messages for long time)

Signs of understanding:
- Correct answers
- "That makes sense"
- Building on concepts
- Asking deeper questions

## OUTPUT FORMAT (JSON)
{
  "isConfused": boolean,
  "confidence": 0.0-1.0,
  "topicOfConfusion": "specific concept they're stuck on",
  "severity": "mild|moderate|severe",
  "suggestedAction": "specific action for tutor",
  "shouldAlertTutor": boolean
}

Detect now:`
}

/**
 * Real-time intervention suggestion
 * TRIGGERED BY: Engagement drops OR multiple confusion alerts
 */
export function buildInterventionPrompt(
  session: LiveSession,
  recentAlerts: string[],
  classEngagement: number
): string {
  return `Suggest real-time interventions for a struggling class.

SESSION TOPIC: ${session.subject}
CLASS ENGAGEMENT: ${classEngagement}%

RECENT ALERTS:
${recentAlerts.map(a => `- ${a}`).join('\n')}

## INTERVENTION OPTIONS
1. Pause for questions
2. Switch to group discussion
3. Show example/demo
4. Slow down pace
5. Switch topics temporarily
6. Call on specific students
7. Use poll/quiz
8. Break time

## OUTPUT FORMAT
Provide 2-3 specific interventions with:
- Action (what to do)
- Timing (when to do it)
- Expected outcome

Format as JSON:
{
  "interventions": [
    {
      "action": "description",
      "timing": "now|in 2 minutes|after current topic",
      "targetStudents": ["specific"|"all"],
      "urgency": "high|medium|low",
      "expectedOutcome": "what should improve"
    }
  ]
}`
}

/**
 * Participation balance prompt
 * TRIGGERED BY: Some students dominating, others silent
 */
export function buildParticipationBalancePrompt(
  participationCounts: Map<string, number>,
  totalDuration: number
): string {
  const participationList = Array.from(participationCounts.entries())
    .map(([id, count]) => `- ${id}: ${count} messages`)
    .join('\n')

  const avgParticipation =
    Array.from(participationCounts.values()).reduce((a, b) => a + b, 0) / participationCounts.size

  return `Analyze participation balance in a live class.

DURATION: ${totalDuration} minutes
AVERAGE PARTICIPATION: ${avgParticipation.toFixed(1)} messages per student

PARTICIPATION COUNTS:
${participationList}

## IDENTIFY
1. Over-participating students (>2x average)
2. Silent students (0 messages or <0.5x average)
3. Balanced participation level

## OUTPUT FORMAT (JSON)
{
  "overParticipating": ["studentIds"],
  "silent": ["studentIds"],
  "balanceScore": 0-100,
  "suggestions": [
    "Direct suggestion for tutor to balance participation"
  ]
}`
}

/**
 * End-of-class summary prompt
 * TRIGGERED BY: Class ends
 */
export function buildClassSummaryPrompt(
  session: LiveSession,
  activities: StudentActivity[]
): string {
  const avgEngagement =
    Array.from(session.engagement.values()).reduce((a, b) => a + b, 0) / session.engagement.size

  const alertCount = session.confusionAlerts.length

  return `Generate end-of-class summary for tutor.

SESSION: ${session.subject}
DURATION: ${Math.round((Date.now() - session.startTime.getTime()) / 60000)} minutes
STUDENTS: ${session.students.length}
AVERAGE ENGAGEMENT: ${avgEngagement.toFixed(1)}%
CONFUSION ALERTS: ${alertCount}

## SUMMARY FORMAT
1. Overall class performance (2-3 sentences)
2. Top 3 engaged students
3. Students who need follow-up
4. Most confusing topics
5. One recommendation for next class

Keep it concise and actionable.`
}
