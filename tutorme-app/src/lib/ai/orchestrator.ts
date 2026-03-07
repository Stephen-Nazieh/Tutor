/**
 * ============================================================================
 * AI ORCHESTRATOR - Compatibility Layer
 * ============================================================================
 * 
 * This file provides backward compatibility for imports.
 * The main AI orchestrator has been moved to @/lib/agents/
 * 
 * @deprecated Use @/lib/agents instead for new code
 */

// Re-export everything from the new agents module
export * from '@/lib/agents';

// Re-export specific functions that old code might be importing directly
export { generateWithFallback, chatWithFallback } from '@/lib/agents';
