import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events.js'
import { buildBriefingInstruction } from './prompts.js'

export const briefingAgent = new LlmAgent({
  name: 'briefing_agent',
  model: process.env.ADK_MODEL || 'kimi-k2.5',
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
