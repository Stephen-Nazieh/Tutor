/**
 * Prompt Builder for AI Tutor
 * Builds layered prompts with personality, gamification, and mission context
 */

import { commonTeachingModes, fillTemplate } from './common'
import { subjectPrompts } from './index'

export interface PromptConfig {
  language: 'en' | 'zh'
  teachingMode: string
  personality: 'friendly_mentor' | 'strict_coach' | 'corporate_trainer' | 'funny_teacher' | 'calm_professor'
  gamification: {
    level: number
    xp: number
    streakDays: number
    skills: Record<string, number>
  }
  mission?: {
    worldId: string
    worldName: string
    worldEmoji: string
    missionId: string
    missionTitle: string
    missionObjective: string
    missionType: string
    vocabulary?: string[]
    grammarFocus?: string
    difficulty: string
  }
  tier: 'FREE' | 'BASIC' | 'PREMIUM'
  chatHistory: Array<{ role: string; content: string }>
  userMessage: string
}

const personalityPrompts: Record<string, string> = {
  friendly_mentor: `You are a warm, encouraging tutor who believes in the student's potential. 
Tone: Supportive, patient, optimistic
Style: Use "we" and "let's", celebrate small wins, offer reassurance
Example: "That's a great start! Let's build on that idea together."`,

  strict_coach: `You are a disciplined tutor who pushes students to excel.
Tone: Direct, challenging, results-focused
Style: Set high expectations, give constructive criticism, demand effort
Example: "Good, but you can do better. Try again with more precision."`,

  corporate_trainer: `You are a professional tutor focused on practical skills.
Tone: Professional, efficient, goal-oriented
Style: Use business analogies, focus on outcomes, be concise
Example: "Let's optimize your approach. Here's the most efficient method."`,

  funny_teacher: `You are an entertaining tutor who makes learning fun.
Tone: Playful, energetic, uses humor
Style: Use analogies, jokes, memes references (when appropriate)
Example: "Math is like a puzzle, but instead of losing pieces, you lose... wait, that's depressing. Let's try again!"`,

  calm_professor: `You are a knowledgeable, serene tutor who explains deeply.
Tone: Calm, thoughtful, philosophical
Style: Deep explanations, historical context, "big picture" thinking
Example: "Consider this concept from first principles. What is the fundamental nature of..."`
}

export function buildCompletePrompt(config: PromptConfig): string {
  const parts: string[] = []
  
  // 1. Core Identity
  parts.push(`You are an AI tutor helping a student learn.`)
  
  // 2. Teaching Mode
  const mode = commonTeachingModes[config.teachingMode] || commonTeachingModes.socratic
  parts.push(`\n## Teaching Mode: ${mode.name}`)
  parts.push(mode.systemPrompt)
  
  // 3. Personality Layer
  const personality = personalityPrompts[config.personality] || personalityPrompts.friendly_mentor
  parts.push(`\n## Your Personality`)
  parts.push(personality)
  
  // 4. Gamification Context
  parts.push(`\n## Student Progress`)
  parts.push(`- Level: ${config.gamification.level}`)
  parts.push(`- XP: ${config.gamification.xp}`)
  parts.push(`- Streak: ${config.gamification.streakDays} days`)
  if (Object.keys(config.gamification.skills).length > 0) {
    parts.push(`- Skills: ${JSON.stringify(config.gamification.skills)}`)
  }
  
  // 5. Mission Context (if provided)
  if (config.mission) {
    parts.push(`\n## Current Mission`)
    parts.push(`World: ${config.mission.worldEmoji} ${config.mission.worldName}`)
    parts.push(`Mission: ${config.mission.missionTitle}`)
    parts.push(`Objective: ${config.mission.missionObjective}`)
    parts.push(`Type: ${config.mission.missionType}`)
    parts.push(`Difficulty: ${config.mission.difficulty}`)
    if (config.mission.vocabulary?.length) {
      parts.push(`Vocabulary focus: ${config.mission.vocabulary.join(', ')}`)
    }
    if (config.mission.grammarFocus) {
      parts.push(`Grammar focus: ${config.mission.grammarFocus}`)
    }
  }
  
  // 6. Tier Controls
  parts.push(`\n## Tier Settings`)
  if (config.tier === 'FREE') {
    parts.push(`- Response limit: 300 tokens`)
    parts.push(`- Available modes: socratic, direct`)
  } else if (config.tier === 'BASIC') {
    parts.push(`- Response limit: 800 tokens`)
    parts.push(`- Available modes: socratic, direct, lesson`)
  } else {
    parts.push(`- Response limit: 2048 tokens`)
    parts.push(`- All features enabled`)
  }
  
  // 7. Language
  parts.push(`\n## Language`)
  parts.push(config.language === 'zh' ? 'Respond in Chinese (中文)' : 'Respond in English')
  
  // 8. Response Format
  parts.push(`\n## Response Format`)
  parts.push(mode.responseFormat)
  
  // 9. Chat History
  if (config.chatHistory.length > 0) {
    parts.push(`\n## Conversation History`)
    config.chatHistory.slice(-5).forEach(msg => {
      parts.push(`${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
    })
  }
  
  // 10. Current Message
  parts.push(`\n## Current Message`)
  parts.push(`Student: ${config.userMessage}`)
  parts.push(`\nTutor:`)
  
  return parts.join('\n')
}
