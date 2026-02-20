/**
 * Unified Context System - Data Definitions
 * Defines the shared data structures for the "Shared Brain"
 */

export type LearningStyle = 'visual' | 'auditory' | 'analytical' | 'mixed'
export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type EmotionalState = 'confident' | 'curious' | 'frustrated' | 'anxious' | 'bored' | 'neutral'

/**
 * Static Student Profile
 * Long-term attributes that change rarely
 */
export interface StudentProfile {
    id: string
    name: string
    age: number
    level: EnglishLevel
    learningStyle: LearningStyle
    interests: string[]
    goals: string[] // e.g., ["improve_speaking", "pass_ielts"]
    preferredVoice?: {
        gender: 'male' | 'female'
        accent: 'us' | 'uk' | 'au'
    }
}

/**
 * Dynamic Learning State
 * Changes frequently based on activity
 */
export interface LearningState {
    currentMood: EmotionalState
    energyLevel: number // 0-100
    recentStruggles: {
        topic: string
        errorType: 'grammar' | 'vocabulary' | 'pronunciation' | 'comprehension' | 'general' | 'other'
        severity: number // 1-10
        detectedAt: number // timestamp
    }[]
    masteredTopics: string[] // Recently mastered
    activeTopics: string[] // Currently working on
}

/**
 * Agent Signal
 * A message or flag passed between agents
 */
export interface AgentSignal {
    id: string
    source: 'personal_tutor' | 'classroom_ta' | 'content_generator' | 'human_tutor'
    type: 'struggle_detected' | 'mastery_achieved' | 'topic_requested' | 'mood_change'
    content: string // Structured or text description
    context?: any // Additional metadata
    timestamp: number
    expiresAt?: number // Some signals are transient
}

/**
 * Aggregated Context
 * The full picture passed to an agent
 */
export interface StudentContext {
    profile: StudentProfile
    state: LearningState
    signals: AgentSignal[]
    sessionSummary?: string // Summary of the immediate previous session
}
