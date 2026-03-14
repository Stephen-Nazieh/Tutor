import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events.js.js'
import { buildBriefingInstruction } from './prompts.js.js'

export const briefingAgent = new LlmAgent({
  name: 'briefing_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Summarizes class progress and briefing for tutors.',
  instruction: buildBriefingInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a briefing event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    } as any),
  ],
})
