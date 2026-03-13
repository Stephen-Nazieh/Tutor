export const chatResponsePrompt = (params: {
  message: string
  context?: {
    currentVideo?: string
    currentTimestamp?: number
    subject?: string
    previousMessages?: Array<{ role: string; content: string }>
  }
}): string => {
  const ctx = params.context

  const contextStr = ctx
    ? `Context:
${ctx.currentVideo ? `- Current video: ${ctx.currentVideo}` : ''}
${ctx.currentTimestamp ? `- Timestamp: ${ctx.currentTimestamp}s` : ''}
${ctx.subject ? `- Subject: ${ctx.subject}` : ''}
${ctx.previousMessages ? `- Chat history: ${JSON.stringify(ctx.previousMessages.slice(-3))}` : ''}`
    : ''

  return `You are a patient AI tutor. A student is asking you a question.

${contextStr}

Student message: ${params.message}

Please respond in English. Remember:
1. Be friendly and encouraging
2. Guide students to think for themselves
3. Keep answers concise (2-3 sentences)
4. If unsure, suggest consulting a human tutor`
}
