import { LlmAgent } from '@google/adk'

export const briefingAgent = new LlmAgent({
  name: 'briefing_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Summarizes class progress and briefing for tutors.',
  instruction: `You are a tutor assistant. Provide concise briefings with action items and watch-outs.`,
})
