/** Static metadata for docs and tooling — import from `@/lib/agents`. */
export const AGENT_METADATA = {
  tutor: {
    name: 'Tutor Agent',
    description: 'Socratic AI tutor for student learning',
    uiLocations: ['/student/ai-tutor', '/student/learn/[id]', '/student/quizzes/[id]'],
    primaryFunction: 'Teaching through questioning',
    dataAccess: 'READ: Student, Conversation, Course, Progress | WRITE: Conversation',
  },
  contentGenerator: {
    name: 'Content Generator Agent',
    description: 'Generates quizzes, lessons, and educational content',
    uiLocations: ['/tutor/insights?tab=builder&courseId=[id]', '/admin/content'],
    primaryFunction: 'Content creation',
    dataAccess: 'READ: Course, Student | WRITE: Quiz, Question, Lesson',
  },
  // grading, briefing and liveMonitor entries removed — those agents are deleted
  // or dead code (their UI locations here were stale/fabricated). Only live agents
  // are listed. Live grading = lib/grading/pci-grader; live-class assist =
  // /api/ai/monitor-assistant.
} as const
