import { LlmAgent, FunctionTool } from '@google/adk'
import { logAgentEvent } from '../../tools/agent-events.js'
import { getConversation, appendMessage } from '../../tools/conversations.js'
import { buildPciMasterInstruction } from './prompts.js'

export const pciMasterAgent = new LlmAgent({
  name: 'pci_master_agent',
  model: process.env.ADK_MODEL || 'kimi-k2.5',
  description: 'PCI Master agent for crafting and refining PCI instructions.',
  instruction: buildPciMasterInstruction(),
  tools: [
    new FunctionTool({
      name: 'getConversation',
      description: 'Fetch recent PCI conversation history.',
      func: async ({
        userId,
        sessionId,
      }: {
        userId: string
        sessionId: string
      }) => getConversation(userId, 'pci', sessionId),
    } as any),
    new FunctionTool({
      name: 'appendMessage',
      description: 'Append a PCI message to conversation history.',
      func: async ({
        sessionId,
        role,
        content,
      }: {
        sessionId: string
        role: 'user' | 'assistant'
        content: string
      }) => appendMessage(sessionId, role, content),
    } as any),
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a PCI event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    } as any),
  ],
})
