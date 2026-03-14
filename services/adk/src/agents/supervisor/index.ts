import { LlmAgent, FunctionTool } from '@google/adk'
import { tutorAgent } from '../tutor/index.js'
import { gradingAgent } from '../grading/index.js'
import { contentGeneratorAgent } from '../content-generator/index.js'
import { briefingAgent } from '../briefing/index.js'
import { liveMonitorAgent } from '../live-monitor/index.js'
import { buildSupervisorInstruction } from './prompts.js'
import { logAgentEvent } from '../../tools/agent-events.js'

export const supervisorAgent = new LlmAgent({
  name: 'solocorn_supervisor',
  description: 'Routes requests to specialized agents.',
  instruction: buildSupervisorInstruction(),
  tools: [
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a routing event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    } as any),
  ],
  subAgents: [tutorAgent, gradingAgent, contentGeneratorAgent, briefingAgent, liveMonitorAgent],
})
