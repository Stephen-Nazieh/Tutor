/**
 * Memory Service
 * The "Shared Brain" for AI Agents
 * Manages context persistence and retrieval
 */

import { StudentContext, StudentProfile, LearningState, AgentSignal } from './types/context'

// Mock Database (In-Memory for now)
const profiles = new Map<string, StudentProfile>()
const states = new Map<string, LearningState>()
const signals = new Map<string, AgentSignal[]>()
const roomTranscripts = new Map<string, any[]>()

// Initialize with some mock data for testing
const MOCK_STUDENT_ID = 'student-1'
profiles.set(MOCK_STUDENT_ID, {
    id: MOCK_STUDENT_ID,
    name: 'Sarah Chen',
    age: 16,
    level: 'B1',
    learningStyle: 'visual',
    interests: ['music', 'technology', 'travel'],
    goals: ['improve_pronunciation', 'vocabulary_expansion'],
    preferredVoice: { gender: 'female', accent: 'us' }
})

states.set(MOCK_STUDENT_ID, {
    currentMood: 'neutral',
    energyLevel: 80,
    recentStruggles: [],
    masteredTopics: ['present_perfect', 'basic_greetings'],
    activeTopics: ['conditionals', 'phrasal_verbs']
})

signals.set(MOCK_STUDENT_ID, [])

export class MemoryService {
    /**
     * Get the full context for a student
     * Aggregates Profile + State + Signals
     */
    static async getStudentContext(studentId: string): Promise<StudentContext | null> {
        const profile = profiles.get(studentId)
        if (!profile) return null

        const state = states.get(studentId) || this.getInitialState()
        const studentSignals = signals.get(studentId) || []

        // Filter out expired signals
        const activeSignals = studentSignals.filter(s => !s.expiresAt || s.expiresAt > Date.now())

        return {
            profile,
            state,
            signals: activeSignals
        }
    }

    /**
     * Transcript Management
     */
    static appendTranscript(roomId: string, entry: any) {
        const current = roomTranscripts.get(roomId) || []
        roomTranscripts.set(roomId, [...current, entry])
    }

    static getTranscript(roomId: string): any[] {
        return roomTranscripts.get(roomId) || []
    }

    /**
     * Record a new signal from an agent
     */
    static async recordSignal(studentId: string, signal: Omit<AgentSignal, 'id' | 'timestamp'>) {
        const newSignal: AgentSignal = {
            ...signal,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now()
        }

        const currentSignals = signals.get(studentId) || []
        signals.set(studentId, [...currentSignals, newSignal])

        // Auto-update state based on signals
        if (signal.type === 'struggle_detected') {
            await this.updateState(studentId, (state) => {
                state.recentStruggles.push({
                    topic: signal.context?.topic || 'unknown',
                    errorType: signal.context?.errorType || 'general',
                    severity: signal.context?.severity || 5,
                    detectedAt: Date.now()
                })
                // Keep only last 5 struggles
                if (state.recentStruggles.length > 5) state.recentStruggles.shift()
                return state
            })
        }
    }

    /**
     * Update the dynamic learning state
     */
    static async updateState(studentId: string, updateFn: (state: LearningState) => LearningState) {
        const currentState = states.get(studentId) || this.getInitialState()
        const newState = updateFn({ ...currentState })
        states.set(studentId, newState)
    }

    /**
     * Get initial state for new students
     */
    private static getInitialState(): LearningState {
        return {
            currentMood: 'neutral',
            energyLevel: 100,
            recentStruggles: [],
            masteredTopics: [],
            activeTopics: []
        }
    }

    /**
     * Analyze Transcript Summary and update context
     * This is the bridge from Classroom TA to Personal Tutor
     */
    static async processClassSummary(studentId: string, summaryJson: any) {
        // 1. Record the summary signal
        await this.recordSignal(studentId, {
            source: 'classroom_ta',
            type: 'topic_requested', // Or a new type 'class_summary'
            content: `Completed class on ${summaryJson.topic}. Status: ${summaryJson.status}`,
            context: summaryJson
        })

        // 2. Update state based on summary
        await this.updateState(studentId, (state) => {
            // Add struggles
            if (summaryJson.struggles && Array.isArray(summaryJson.struggles)) {
                summaryJson.struggles.forEach((s: string) => {
                    state.recentStruggles.push({
                        topic: s,
                        errorType: 'general',
                        severity: 7,
                        detectedAt: Date.now()
                    })
                })
            }

            // Update active topics
            if (summaryJson.topic) {
                if (!state.activeTopics.includes(summaryJson.topic)) {
                    state.activeTopics.push(summaryJson.topic)
                }
            }

            return state
        })
    }

    /**
     * Record Quiz Result and Update Context
     * Updates student context based on quiz performance
     */
    static async recordQuizResult(studentId: string, result: {
        topic: string
        score: number
        maxScore: number
        questionTypes: string[]
    }) {
        const percentage = result.score / result.maxScore

        // Record signal
        await this.recordSignal(studentId, {
            source: 'personal_tutor',
            type: percentage >= 0.7 ? 'mastery_achieved' : 'struggle_detected',
            content: `Quiz on ${result.topic}: ${result.score}/${result.maxScore} (${Math.round(percentage * 100)}%)`,
            context: result
        })

        // Update state based on performance
        await this.updateState(studentId, (state) => {
            if (percentage < 0.7) {
                // Poor performance - add to struggles
                const existingStruggle = state.recentStruggles.find(s => s.topic === result.topic)
                if (!existingStruggle) {
                    state.recentStruggles.push({
                        topic: result.topic,
                        errorType: 'general',
                        severity: Math.round((1 - percentage) * 10), // Higher severity for lower scores
                        detectedAt: Date.now()
                    })
                    // Keep only last 10 struggles
                    if (state.recentStruggles.length > 10) {
                        state.recentStruggles.shift()
                    }
                }

                // Add to active topics if not already there
                if (!state.activeTopics.includes(result.topic)) {
                    state.activeTopics.push(result.topic)
                }
            } else if (percentage >= 0.85) {
                // Excellent performance - add to mastered topics
                if (!state.masteredTopics.includes(result.topic)) {
                    state.masteredTopics.push(result.topic)
                }

                // Remove from struggles if present
                state.recentStruggles = state.recentStruggles.filter(s => s.topic !== result.topic)
            }

            return state
        })
    }
}
