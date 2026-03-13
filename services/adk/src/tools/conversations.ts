import { getCache, setCache } from '../adapters/cache/redis'
import { v4 as uuidv4 } from 'uuid'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ConversationState {
  id: string
  studentId: string
  subject: string
  messages: ConversationMessage[]
}

const CONVERSATION_TTL_SECONDS = 60 * 60 * 24
const CONVERSATION_PREFIX = 'adk:conversation:'
const MAX_MESSAGES = 50

export async function getConversation(studentId: string, subject: string, conversationId?: string): Promise<ConversationState> {
  const id = conversationId || `${studentId}:${subject}`
  const key = `${CONVERSATION_PREFIX}${id}`
  const existing = await getCache<ConversationState>(key)
  if (existing) return existing

  const fresh: ConversationState = {
    id,
    studentId,
    subject,
    messages: [],
  }
  await setCache(key, fresh, CONVERSATION_TTL_SECONDS)
  return fresh
}

export async function appendMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
  const key = `${CONVERSATION_PREFIX}${conversationId}`
  const existing = await getCache<ConversationState>(key)
  const base: ConversationState = existing || {
    id: conversationId,
    studentId: conversationId.split(':')[0] || 'unknown',
    subject: conversationId.split(':')[1] || 'general',
    messages: [],
  }

  const updated: ConversationState = {
    ...base,
    messages: [...base.messages, {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date().toISOString(),
    }].slice(-MAX_MESSAGES),
  }

  await setCache(key, updated, CONVERSATION_TTL_SECONDS)
  return updated
}
