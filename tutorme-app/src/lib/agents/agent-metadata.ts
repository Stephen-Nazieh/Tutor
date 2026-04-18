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
  grading: {
    name: 'Grading Agent',
    description: 'Auto-grades submissions with detailed feedback',
    uiLocations: ['/tutor/courses/[id]/tasks', '/student/quizzes/[id]/results'],
    primaryFunction: 'Assessment grading',
    dataAccess: 'READ: Quiz, StudentAnswer | WRITE: StudentAnswer, QuizScore, ProgressData',
  },
  briefing: {
    name: 'Briefing Agent',
    description: 'Prepares tutors with pre-class insights',
    uiLocations: ['/tutor/dashboard', '/tutor/insights?sessionId=[id]'],
    primaryFunction: 'Tutor preparation',
    dataAccess:
      'READ: LiveSession, ProgressData, Student, Course | WRITE: LiveSession.briefingData',
  },
  liveMonitor: {
    name: 'Live Monitor Agent',
    description: 'Real-time classroom monitoring (1:50 ratio)',
    uiLocations: ['/tutor/insights?sessionId=[id]'],
    primaryFunction: 'Real-time engagement tracking',
    dataAccess: 'READ/WRITE: LiveSession | READ: Student, ProgressData',
  },
} as const
