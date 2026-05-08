import { LlmAgent, FunctionTool } from '@google/adk';
import { logAgentEvent } from '../../tools/agent-events.js';
import { getConversation, appendMessage } from '../../tools/conversations.js';
import { buildPciMasterInstruction } from './prompts.js';
export const pciMasterAgent = new LlmAgent({
    name: 'pci_master_agent',
    model: process.env.ADK_MODEL || 'kimi-k2.5',
    description: 'PCI Master agent for crafting and refining PCI instructions.',
    instruction: buildPciMasterInstruction(),
    tools: [
        new FunctionTool({
            name: 'getConversation',
            description: 'Fetch recent PCI conversation history.',
            func: async ({ userId, sessionId, }) => getConversation(userId, 'pci', sessionId),
        }),
        new FunctionTool({
            name: 'appendMessage',
            description: 'Append a PCI message to conversation history.',
            func: async ({ sessionId, role, content, }) => appendMessage(sessionId, role, content),
        }),
        new FunctionTool({
            name: 'logAgentEvent',
            description: 'Log a PCI event for observability.',
            func: async (input) => logAgentEvent(input),
        }),
    ],
});
