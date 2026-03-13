import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events'
import { buildContentGeneratorInstruction } from './prompts'

export const contentGeneratorAgent = new LlmAgent({
  name: 'content_generator_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Generates learning content and quiz items.',
  instruction: buildContentGeneratorInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a content generation event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    }),
  ],
})
