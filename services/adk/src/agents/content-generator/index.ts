import { LlmAgent } from '@google/adk'

export const contentGeneratorAgent = new LlmAgent({
  name: 'content_generator_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Generates learning content and quiz items.',
  instruction: `You generate concise learning materials and assessments. Use Socratic phrasing where possible. Output JSON when asked.`,
})
