/**
 * Mission Context Layer (Layer 5)
 * 
 * Injects current mission/world context for structured learning
 */

export interface MissionContext {
  worldId: string
  worldName: string
  worldEmoji: string
  missionId: string
  missionTitle: string
  missionObjective: string
  missionType: 'lesson' | 'roleplay' | 'simulation' | 'challenge'
  vocabulary?: string[]
  grammarFocus?: string
  difficulty: number
}

/**
 * Build mission context prompt
 */
export function buildMissionContext(context: MissionContext): string {
  return `
Current Learning Context:

🌍 World: ${context.worldEmoji} ${context.worldName}
🎯 Mission: ${context.missionTitle}
📋 Objective: ${context.missionObjective}
⭐ Difficulty: Level ${context.difficulty}
🎮 Type: ${context.missionType}

${context.vocabulary && context.vocabulary.length > 0 
  ? `📚 Target Vocabulary: ${context.vocabulary.join(', ')}` 
  : ''}

${context.grammarFocus 
  ? `📝 Grammar Focus: ${context.grammarFocus}` 
  : ''}

Mission Flow:
1. Briefly introduce today's objective (1 sentence)
2. Teach key vocabulary with simple examples
3. Explain the grammar focus (if applicable)
4. Ask interactive questions
5. ${context.missionType === 'roleplay' ? 'Begin roleplay scenario' : 'Practice exercise'}
6. Speaking challenge
7. Provide feedback and confidence reinforcement

${getMissionTypeInstructions(context.missionType)}`
}

/**
 * Get specific instructions based on mission type
 */
function getMissionTypeInstructions(type: string): string {
  const instructions: Record<string, string> = {
    lesson: `Teaching Mode:
- Structure this as a mini-lesson
- Explain concepts clearly
- Check for understanding frequently
- End with a practice exercise`,

    roleplay: `Roleplay Mode:
- Stay fully in character during the scenario
- Do not explain grammar during roleplay
- Respond naturally as the character would
- After roleplay ends, provide structured feedback:
  1. What was good
  2. What needs improvement
  3. A corrected example
  4. Encouragement`,

    simulation: `Simulation Mode:
- Create a realistic scenario (interview, negotiation, etc.)
- React naturally to user's responses
- Add realistic complications
- Focus on practical communication skills
- Debrief afterward with specific feedback`,

    challenge: `Challenge Mode:
- This is a skill test
- Provide minimal help unless asked
- Evaluate performance against clear criteria
- Give honest but constructive feedback`,
  }

  return instructions[type] || instructions.lesson
}

/**
 * Build world-specific context
 */
export function buildWorldContext(worldId: string, worldName: string): string {
  const worldContexts: Record<string, string> = {
    survival: `Survival World Context:
Focus: Everyday practical English
Scenarios: Ordering food, asking directions, shopping, emergencies
Tone: Practical, immediately useful
Goal: Handle daily situations confidently`,

    workplace: `Workplace World Context:
Focus: Professional communication
Scenarios: Meetings, emails, presentations, negotiations
Tone: Professional, polite, clear
Goal: Advance career through better English`,

    daily_life: `Daily Life World Context:
Focus: Social and casual conversations
Scenarios: Making friends, hobbies, casual chats
Tone: Friendly, natural, relaxed
Goal: Connect with people naturally`,

    academic: `Academic World Context:
Focus: Study and research skills
Scenarios: Essays, presentations, discussions, research
Tone: Formal, analytical, precise
Goal: Succeed in educational settings`,

    social: `Social & Relationships Context:
Focus: Deep conversations and connections
Scenarios: Dating, deep talks, emotional expression
Tone: Warm, empathetic, genuine
Goal: Build meaningful relationships`,

    public_speaking: `Public Speaking Arena Context:
Focus: Presenting to groups
Scenarios: Speeches, pitches, presentations
Tone: Confident, engaging, authoritative
Goal: Speak confidently in front of others`,

    debate: `Debate Arena Context:
Focus: Argumentation and persuasion
Scenarios: Formal debates, persuasive arguments
Tone: Logical, respectful, articulate
Goal: Master persuasive communication`,
  }

  return worldContexts[worldId] || `World: ${worldName}\nFocus: General English improvement`
}

/**
 * Build mission completion evaluation prompt
 */
export function buildMissionEvaluationPrompt(
  missionContext: MissionContext,
  userResponses: string[],
  sessionMetrics: {
    speakingDuration: number
    hesitationCount: number
    correctionCount: number
  }
): string {
  return `
Evaluate the user's performance for this mission:

Mission: ${missionContext.missionTitle}
Objective: ${missionContext.missionObjective}
Target Vocabulary: ${missionContext.vocabulary?.join(', ') || 'N/A'}
Grammar Focus: ${missionContext.grammarFocus || 'N/A'}

User Responses:
${userResponses.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Session Metrics:
- Speaking Duration: ${sessionMetrics.speakingDuration} seconds
- Hesitations: ${sessionMetrics.hesitationCount}
- Corrections Needed: ${sessionMetrics.correctionCount}

Evaluate and return JSON:
{
  "grammarScore": 0-100,
  "vocabularyScore": 0-100,
  "fluencyScore": 0-100,
  "confidenceScore": 0-100,
  "overallScore": 0-100,
  "confidenceDelta": -10 to +10,
  "feedback": {
    "whatWasGood": "string",
    "whatToImprove": "string",
    "encouragement": "string"
  },
  "missionComplete": true/false,
  "suggestedNextSteps": ["string"]
}`
}
