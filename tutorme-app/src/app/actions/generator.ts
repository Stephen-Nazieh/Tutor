'use server'

/**
 * AI Task Generator (Mock)
 * Simulates server-side generation of educational tasks.
 * In a real application, this would connect to an LLM provider (OpenAI, Anthropic, etc).
 */

export async function generateTasksWithAI(prompt: string, config: any) {
    console.log('--- AI GENERATION REQUEST ---')
    console.log('Context Prompt:', prompt)
    console.log('Configuration:', config)
    console.log('-----------------------------')

    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Return mock response that proves the context was received (via the explanation)
    // Logic mirrors the user's config to ensure valid data structure
    return Array.from({ length: config.count }).map((_, i) => ({
        id: `ai-gen-${Date.now()}-${i}`,
        type: config.questionType === 'mixed' ? (i % 2 === 0 ? 'multiple_choice' : 'short_answer') : config.questionType,
        question: `[AI Generated] ${config.subject} Question ${i + 1} (${config.difficulty})`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: `Generated based on context length ${prompt.length} chars. Snippet: ${prompt.substring(0, 30)}...`,
        difficulty: config.difficulty
    }))
}
