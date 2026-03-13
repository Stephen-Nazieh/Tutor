import { Agent } from '@google/adk'
import { tutorAgent } from '../tutor'
import { gradingAgent } from '../grading'
import { contentGeneratorAgent } from '../content-generator'
import { briefingAgent } from '../briefing'
import { liveMonitorAgent } from '../live-monitor'

export const supervisorAgent = new Agent({
  name: 'solocorn_supervisor',
  description: 'Routes requests to specialized agents.',
  instruction: `Route the request to the most appropriate specialist agent.
- TutorAgent: student tutoring chat
- GradingAgent: grading submissions
- ContentGeneratorAgent: generate quizzes or lessons
- BriefingAgent: tutor briefings
- LiveMonitorAgent: live session monitoring`,
  subAgents: [tutorAgent, gradingAgent, contentGeneratorAgent, briefingAgent, liveMonitorAgent],
})
