import { logInfo } from '../observability/logging.js';
export async function logAgentEvent(input) {
    logInfo('adk.agent.event', input);
    return { ok: true };
}
