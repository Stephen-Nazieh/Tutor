import { LlmAgent, FunctionTool } from '@google/adk';
import { getStudentProfile } from '../../tools/student.js';
import { getCurriculum } from '../../tools/curriculum.js';
import { getProgressSnapshot } from '../../tools/progress.js';
import { appendMessage, getConversation } from '../../tools/conversations.js';
import { logAgentEvent } from '../../tools/agent-events.js';
import { buildTutorInstruction } from './prompts.js';
export const tutorAgent = new LlmAgent({
    name: 'tutor_agent',
    model: process.env.ADK_MODEL || 'kimi-k2.5',
    description: 'Socratic tutor for student questions',
    instruction: buildTutorInstruction("the student's subject"),
    tools: [
        new FunctionTool({
            name: 'getStudentProfile',
            description: 'Fetch student profile (anonymized).',
            func: async ({ studentId }) => getStudentProfile(studentId),
        }),
        new FunctionTool({
            name: 'getCurriculum',
            description: 'Fetch curriculum for subject.',
            func: async ({ subject }) => getCurriculum(subject),
        }),
        new FunctionTool({
            name: 'getProgressSnapshot',
            description: 'Fetch progress snapshot for student.',
            func: async ({ studentId }) => getProgressSnapshot(studentId),
        }),
        new FunctionTool({
            name: 'getConversation',
            description: 'Fetch recent conversation history.',
            func: async ({ studentId, subject, conversationId }) => getConversation(studentId, subject, conversationId),
        }),
        new FunctionTool({
            name: 'appendMessage',
            description: 'Append a message to conversation history.',
            func: async ({ conversationId, role, content }) => appendMessage(conversationId, role, content),
        }),
        new FunctionTool({
            name: 'logAgentEvent',
            description: 'Log a tutoring event for observability.',
            func: async (input) => logAgentEvent(input),
        }),
    ],
});
