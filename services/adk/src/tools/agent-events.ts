import { logInfo } from '../observability/logging'

export async function logAgentEvent(input: {
  agent: string
  event: string
  detail?: Record<string, unknown>
}) {
  logInfo('adk.agent.event', input)
  return { ok: true }
}
