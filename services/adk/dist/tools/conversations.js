import { getCache, setCache } from '../adapters/cache/redis.js';
import { v4 as uuidv4 } from 'uuid';
const CONVERSATION_TTL_SECONDS = 60 * 60 * 24;
const CONVERSATION_PREFIX = 'adk:conversation:';
const MAX_MESSAGES = 50;
export async function getConversation(studentId, subject, conversationId) {
    const id = conversationId || `${studentId}:${subject}`;
    const key = `${CONVERSATION_PREFIX}${id}`;
    const existing = await getCache(key);
    if (existing)
        return existing;
    const fresh = {
        id,
        studentId,
        subject,
        messages: [],
    };
    await setCache(key, fresh, CONVERSATION_TTL_SECONDS);
    return fresh;
}
export async function appendMessage(conversationId, role, content) {
    const key = `${CONVERSATION_PREFIX}${conversationId}`;
    const existing = await getCache(key);
    const base = existing || {
        id: conversationId,
        studentId: conversationId.split(':')[0] || 'unknown',
        subject: conversationId.split(':')[1] || 'general',
        messages: [],
    };
    const updated = {
        ...base,
        messages: [...base.messages, {
                id: uuidv4(),
                role,
                content,
                timestamp: new Date().toISOString(),
            }].slice(-MAX_MESSAGES),
    };
    await setCache(key, updated, CONVERSATION_TTL_SECONDS);
    return updated;
}
