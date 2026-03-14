import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events.js.js'
import { buildGradingInstruction } from './prompts.js.js'

export const gradingAgent = new LlmAgent({
  name: 'grading_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Grades student submissions with rubric-based scoring.',
  instruction: buildGradingInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a grading event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    } as any),
  ],
})
