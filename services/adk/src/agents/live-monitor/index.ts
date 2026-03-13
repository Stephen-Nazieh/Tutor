import { LlmAgent } from '@google/adk'

export const liveMonitorAgent = new LlmAgent({
  name: 'live_monitor_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Analyzes live class engagement and flags issues.',
  instruction: `You analyze live class signals and output concise alerts and suggested interventions.`,
})
