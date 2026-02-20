/**
 * Prompts Index
 * Central hub for all subject-specific prompts
 */

import { 
  commonTeachingModes, 
  buildSystemPrompt as buildCommonPrompt,
  fillTemplate 
} from './common'

// Import subject-specific prompts
import * as english from './english'
import * as math from './math'

// Subject registry - easy to add new subjects
export const subjectPrompts: Record<string, {
  context: string
  topics: Record<string, string>
  modeAdjustments: Record<string, string>
}> = {
  english: {
    context: english.englishContext,
    topics: english.englishTopics,
    modeAdjustments: english.englishModeAdjustments
  },
  math: {
    context: math.mathContext,
    topics: math.mathTopics,
    modeAdjustments: math.mathModeAdjustments
  },
  // Aliases
  mathematics: {
    context: math.mathContext,
    topics: math.mathTopics,
    modeAdjustments: math.mathModeAdjustments
  }
}

// Get available teaching modes
export function getTeachingModes() {
  return Object.entries(commonTeachingModes).map(([key, config]) => ({
    key,
    name: config.name,
    description: config.description
  }))
}

// Build complete prompt for a subject, mode, and topic
export function buildPrompt(
  subject: string,
  mode: string,
  topic: string | null,
  variables: {
    teachingAge: number
    voiceGender: string
    voiceAccent: string
  }
): { systemPrompt: string; useSocratic: boolean } {
  const subjectData = subjectPrompts[subject.toLowerCase()] || {
    context: `Subject: ${subject}`,
    topics: {},
    modeAdjustments: {}
  }
  
  const modeConfig = commonTeachingModes[mode] || commonTeachingModes.socratic
  
  // Build system prompt
  let systemPrompt = fillTemplate(modeConfig.systemPrompt, variables)
  
  // Add subject context
  systemPrompt += `\n\n## Subject Information\n${subjectData.context}`
  
  // Add topic-specific context if available
  if (topic && subjectData.topics[topic]) {
    systemPrompt += `\n\n## Current Topic\n${subjectData.topics[topic]}`
  }
  
  // Add mode adjustments for this subject
  if (subjectData.modeAdjustments[mode]) {
    systemPrompt += `\n\n## Teaching Guidance\n${subjectData.modeAdjustments[mode]}`
  }
  
  // Add response format
  systemPrompt += `\n\n## Response Format\n${modeConfig.responseFormat}`
  
  return {
    systemPrompt,
    useSocratic: modeConfig.useSocraticMethod
  }
}

// Get topic list for a subject
export function getSubjectTopics(subject: string): Array<{id: string; name: string}> {
  const subjectData = subjectPrompts[subject.toLowerCase()]
  if (!subjectData) return []
  
  return Object.entries(subjectData.topics).map(([id, content]) => {
    // Extract topic name from first line
    const match = content.match(/Topic:\s*(.+)/)
    return {
      id,
      name: match ? match[1] : id
    }
  })
}

// Add a new subject dynamically
export function registerSubject(
  code: string,
  context: string,
  topics: Record<string, string>,
  modeAdjustments: Record<string, string>
) {
  subjectPrompts[code.toLowerCase()] = {
    context,
    topics,
    modeAdjustments
  }
}

// Re-export common utilities
export { commonTeachingModes, fillTemplate }
export { buildCompletePrompt, type PromptConfig } from './prompt-builder'
