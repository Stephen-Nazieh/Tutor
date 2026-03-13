import { LlmAgent, FunctionTool } from '@google/adk'
import { tutorAgent } from '../tutor'
import { gradingAgent } from '../grading'
import { contentGeneratorAgent } from '../content-generator'
import { briefingAgent } from '../briefing'
import { liveMonitorAgent } from '../live-monitor'
import { buildSupervisorInstruction } from './prompts'
import { logAgentEvent } from '../../tools/agent-events'

export const supervisorAgent = new LlmAgent({
  name: 'solocorn_supervisor',
  description: 'Routes requests to specialized agents.',
  instruction: buildSupervisorInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a routing event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    }),
  ],
  subAgents: [tutorAgent, gradingAgent, contentGeneratorAgent, briefingAgent, liveMonitorAgent],
})
