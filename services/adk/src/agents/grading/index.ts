import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events'
import { buildGradingInstruction } from './prompts'

export const gradingAgent = new LlmAgent({
  name: 'grading_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Grades student submissions with rubric-based scoring.',
  instruction: buildGradingInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a grading event for observability.',
      fn: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    }),
  ],
})
