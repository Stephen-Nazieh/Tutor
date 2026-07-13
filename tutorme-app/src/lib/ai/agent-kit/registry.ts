/** In-process registry of agents and tools (single source of truth). */
import type { AgentDefinition, Tool } from './types'

const agents = new Map<string, AgentDefinition>()
const tools = new Map<string, Tool>()

export function registerAgent(def: AgentDefinition): AgentDefinition {
  agents.set(def.id, def)
  return def
}

export function getAgent(id: string): AgentDefinition | undefined {
  return agents.get(id)
}

export function listAgents(): AgentDefinition[] {
  return Array.from(agents.values())
}

export function registerTool<I, O>(tool: Tool<I, O>): Tool<I, O> {
  tools.set(tool.name, tool as Tool)
  return tool
}

export function getTool(name: string): Tool | undefined {
  return tools.get(name)
}

export function listTools(): Tool[] {
  return Array.from(tools.values())
}
