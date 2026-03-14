import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events'
import { buildBriefingInstruction } from './prompts'

export const briefingAgent = new LlmAgent({
  name: 'briefing_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Summarizes class progress and briefing for tutors.',
  instruction: buildBriefingInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a briefing event for observability.',
      fn: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    }),
  ],
})
