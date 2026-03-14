import { LlmAgent, FunctionTool } from '@google/adk'
import { getStudentProfile } from '../../tools/student.js'
import { getCurriculum } from '../../tools/curriculum.js'
import { getProgressSnapshot } from '../../tools/progress.js'
import { appendMessage, getConversation } from '../../tools/conversations.js'
import { logAgentEvent } from '../../tools/agent-events.js'
import { buildTutorInstruction } from './prompts.js'

export const tutorAgent = new LlmAgent({
  name: 'tutor_agent',
  model: process.env.ADK_MODEL || 'gemini-2.5-flash',
  description: 'Socratic tutor for student questions',
  instruction: buildTutorInstruction("the student's subject"),
  tools: [
    new FunctionTool({
      name: 'getStudentProfile',
      description: 'Fetch student profile (anonymized).',
      func: async ({ studentId }: { studentId: string }) => getStudentProfile(studentId),
    } as any),
    new FunctionTool({
      name: 'getCurriculum',
      description: 'Fetch curriculum for subject.',
      func: async ({ subject }: { subject: string }) => getCurriculum(subject),
    } as any),
    new FunctionTool({
      name: 'getProgressSnapshot',
      description: 'Fetch progress snapshot for student.',
      func: async ({ studentId }: { studentId: string }) => getProgressSnapshot(studentId),
    } as any),
    new FunctionTool({
      name: 'getConversation',
      description: 'Fetch recent conversation history.',
      func: async ({ studentId, subject, conversationId }: { studentId: string; subject: string; conversationId?: string }) =>
        getConversation(studentId, subject, conversationId),
    } as any),
    new FunctionTool({
      name: 'appendMessage',
      description: 'Append a message to conversation history.',
      func: async ({ conversationId, role, content }: { conversationId: string; role: 'user' | 'assistant'; content: string }) =>
        appendMessage(conversationId, role, content),
    } as any),
    new FunctionTool({
      name: 'logAgentEvent',
      description: 'Log a tutoring event for observability.',
      func: async (input: { agent: string; event: string; detail?: Record<string, unknown> }) => logAgentEvent(input),
    } as any),
  ],
})
