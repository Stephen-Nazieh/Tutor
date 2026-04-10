/**
 * Course Builder Components
 * 
 * This module contains all components related to the course builder functionality.
 * The main CourseBuilder component is a complex feature-rich interface for creating
 * and editing course content including lessons, tasks, assessments, and homework.
 * 
 * Due to the complexity of the course builder (supporting drag-drop, AI assistance,
 * real-time collaboration, whiteboard integration, etc.), the main component remains
 * large. Future refactoring should extract:
 * - useCourseBuilderState hook
 * - CourseBuilderLeftPanel (lesson structure)
 * - CourseBuilderRightPanel (task/assessment builders)
 * - InsightsPanel
 */

// Main component (still in parent directory due to extensive usage)
// Import from '../CourseBuilder' if needed within this directory

// Re-export types from builder-types for convenience
export type {
  CourseBuilderProps,
  CourseBuilderRef,
  CourseBuilderInsightsProps,
  CourseBuilderNode,
  CourseBuilderNodeQuiz,
  Lesson,
  Task,
  Assessment,
  Quiz,
  QuizQuestion,
  Content,
  Video,
  Image,
  Document,
  DifficultyLevel,
  DifficultyMode,
  DifficultyVariant,
  WithDifficultyVariants,
  DMIQuestion,
  DMIVersion,
  ImportedLearningResource,
  VisibleDocumentPayload,
  BuilderModalProps,
  InsightsSessionOption,
} from '../builder-types'

// Re-export utilities
export {
  generateId,
  DEFAULT_TASK,
  DEFAULT_HOMEWORK,
  DEFAULT_LESSON,
  DEFAULT_QUIZ,
  DEFAULT_NODE_QUIZ,
  DEFAULT_NODE,
  DEFAULT_CONTENT,
  convertQuizToAssessment,
  normalizeCourseBuilderNodesForAssessments,
  resolveSelectedItem,
  mapGeneratedCourseBuilderNodesToBuilder,
} from '../builder-utils'
