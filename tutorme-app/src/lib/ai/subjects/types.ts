/**
 * Subject Context Types
 * Defines the structure for subject-specific AI tutoring context
 */

export interface SubjectContext {
  id: string
  name: string
  description: string
  
  // Core concepts organized by difficulty/level
  concepts: ConceptNode[]
  
  // Common mistakes students make
  commonMistakes: CommonMistake[]
  
  // Teaching approach specific to this subject
  pedagogicalApproach: {
    socraticStyle: string
    emphasisAreas: string[]
    questionTemplates: QuestionTemplate[]
  }
  
  // Subject-specific tools that can be used
  availableTools: string[]
  
  // Prompt additions to inject into AI context
  promptAdditions: string
  
  // Special formatting rules
  formatting: {
    useLatex?: boolean
    useDiagrams?: boolean
    useCodeBlocks?: boolean
    customNotation?: string
  }
}

export interface ConceptNode {
  id: string
  name: string
  description: string
  prerequisites: string[]
  commonMisconceptions: string[]
  exampleProblems: ExampleProblem[]
  relatedConcepts: string[]
}

export interface ExampleProblem {
  id: string
  question: string
  hint: string
  solution: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface CommonMistake {
  id: string
  pattern: string
  description: string
  correctivePrompt: string
}

export interface QuestionTemplate {
  id: string
  template: string
  whenToUse: string
  example: string
}

// Supported subjects
export const SUBJECTS = [
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'computer_science',
  'history',
  'english',
  'economics',
  'general'
] as const

export type SubjectId = typeof SUBJECTS[number]
