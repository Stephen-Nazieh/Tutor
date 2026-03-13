import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events'
import { buildLiveMonitorInstruction } from './prompts'

export const liveMonitorAgent = new LlmAgent({
  name: 'live_monitor_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Analyzes live class engagement and flags issues.',
  instruction: buildLiveMonitorInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a live monitoring event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    }),
  ],
})
