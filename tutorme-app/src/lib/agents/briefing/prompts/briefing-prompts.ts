/**
 * ============================================================================
 * BRIEFING AGENT - BRIEFING GENERATION PROMPTS
 * ============================================================================
 *
 * UI LOCATION:
 * - /tutor/dashboard - "AI Briefing" button
 * - /tutor/insights?sessionId=[sessionId] - Pre-class briefing panel
 *
 * EDIT THIS FILE to change how tutor briefings are generated.
 */

import { LiveSession, Student, ProgressData, Course } from '../../shared-data'

export interface BriefingContext {
  session: LiveSession
  students: Student[]
  progressData: ProgressData[]
  course: Course
  recentQuizScores: Array<{ studentId: string; score: number; topic: string }>
}

/**
 * Main briefing generation prompt
 * TRIGGERED BY: Tutor clicks "AI Briefing" button
 */
export function buildClassBriefingPrompt(context: BriefingContext): string {
  const studentSummaries = context.students
    .map(s => {
      const progress = context.progressData.find(p => p.studentId === s.id)
      const recentScore = context.recentQuizScores.find(q => q.studentId === s.id)

      return `
- ${s.name} (Grade ${s.grade}, ${s.currentLevel} level)
  - Learning style: ${s.learningStyle}
  - Current streak: ${s.streak} days
  - Recent struggles: ${progress?.struggles.join(', ') || 'None recorded'}
  - Recent quiz: ${recentScore ? `${recentScore.score}% on ${recentScore.topic}` : 'No recent data'}
`
    })
    .join('\n')

  return `Generate a pre-class briefing for a tutor preparing to teach.

CLASS INFO:
- Subject: ${context.course.subject}
- Students: ${context.students.length}
- Topic: ${context.course.modules[0]?.title || 'general'}

STUDENT PROFILES:
${studentSummaries}

COURSE OBJECTIVES:
${context.course.learningObjectives.map(o => `- ${o}`).join('\n')}

## BRIEFING STRUCTURE

### 1. CLASS OVERVIEW (2-3 sentences)
Overall assessment of class readiness and general vibe.

### 2. STUDENTS NEEDING ATTENTION
List 2-4 students who need extra support, with specific reasons:
- Format: "[Name]: [Issue] - [Suggested approach]"

### 3. READY TO SHINE
List 1-2 students who are excelling and can help others:
- Format: "[Name]: [Strength] - [How to leverage]"

### 4. COMMON MISCONCEPTIONS
Based on the course and past struggles, predict 2-3 concepts students might struggle with today.

### 5. TEACHING STRATEGIES
Suggest 2-3 specific strategies for this class composition.

### 6. ICEBREAKER/OPENER
Suggest a 2-minute opener related to the topic.

### 7. TIME WARNINGS
Note any concepts that typically take longer to explain.

Generate the briefing now:`
}

/**
 * Individual student spotlight prompt
 * TRIGGERED BY: Tutor clicks on a specific student in briefing
 */
export function buildStudentSpotlightPrompt(
  student: Student,
  progress: ProgressData,
  recentConversations: string[]
): string {
  return `Generate a detailed spotlight for tutor about this student.

STUDENT: ${student.name}
GRADE: ${student.grade}
LEVEL: ${student.currentLevel}
LEARNING STYLE: ${student.learningStyle}

PROGRESS DATA:
- Completion: ${progress.completion}%
- Struggles: ${progress.struggles.join(', ')}
- Strengths: ${progress.strengths.join(', ')}
- Time spent: ${progress.timeSpent} minutes

RECENT AI TUTOR CONVERSATIONS:
${recentConversations.slice(-3).join('\n---\n')}

## SPOTLIGHT FORMAT

### Quick Summary
1-sentence summary of this student's current state.

### Learning Profile
How they learn best based on their style and history.

### Watch Out For
2-3 specific things that might trip them up today.

### Engagement Strategy
How to best engage this student in class.

### Questions to Ask Them
2-3 personalized questions to check their understanding.

Generate spotlight now:`
}

/**
 * Teaching strategy suggestion prompt
 */
export function buildTeachingStrategyPrompt(
  learningStyles: string[],
  commonStruggles: string[],
  subject: string
): string {
  return `Suggest teaching strategies for a diverse classroom.

CLASS COMPOSITION:
- Learning styles present: ${[...new Set(learningStyles)].join(', ')}
- Common struggles: ${[...new Set(commonStruggles)].join(', ')}
- Subject: ${subject}

## STRATEGY REQUEST
Provide 3 specific teaching strategies:

1. FOR VISUAL LEARNERS
How to make today's content visual.

2. FOR STRUGGLING STUDENTS
How to support those who are behind.

3. FOR ADVANCED STUDENTS
How to challenge those who are ahead.

Format each as:
**Strategy Name**
- Description
- Time estimate
- Materials needed`
}

/**
 * Post-class reflection prompt
 * TRIGGERED BY: After class ends
 */
export function buildPostClassReflectionPrompt(
  session: LiveSession,
  engagementData: Map<string, number>
): string {
  const engagementSummary = Array.from(engagementData.entries())
    .map(([id, score]) => `- Student ${id}: ${score}% engagement`)
    .join('\n')

  return `Generate a post-class reflection for the tutor.

CLASS DATA:
- Duration: ${session.startTime} to ${session.endTime || 'now'}
- Student engagement scores:
${engagementSummary}

## REFLECTION FORMAT

### Class Summary
3-sentence summary of how the class went.

### High Engagement Moments
When were students most engaged? (if data suggests)

### Low Engagement Moments
When did attention drop? Possible reasons.

### Follow-Up Actions
3 specific actions for next class or individual students.

### Growth Opportunities
What to focus on improving for next time.

Generate reflection now:`
}
