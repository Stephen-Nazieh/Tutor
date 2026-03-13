import { LlmAgent } from '@google/adk'

export const gradingAgent = new LlmAgent({
  name: 'grading_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Grades student submissions with rubric-based scoring.',
  instruction: `You are a strict but supportive grader. Output JSON only, matching the requested schema. Never include personal data.`,
})
