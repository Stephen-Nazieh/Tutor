/**
 * ============================================================================
 * AGENTS MODULE - Main Entry Point
 * ============================================================================
 */

// Export all agent functions
export * from './tutor';
export * from './content-generator';
export * from './grading';
export * from './briefing';
export * from './live-monitor';

// Export shared data types
export * from './shared-data';

// Export LLM orchestrator
export { generateWithFallback, chatWithFallback } from './orchestrator-llm';

// Export AI provider status check for API routes
export async function getAIProvidersStatus() {
  try {
    // Import dynamically to avoid issues
    const { isOllamaAvailable } = await import('@/lib/ai/ollama');
    const ollamaAvailable = await isOllamaAvailable();
    
    return {
      kimi: { available: !!process.env.KIMI_API_KEY, name: 'Kimi K2.5' },
      ollama: { available: ollamaAvailable, name: 'Ollama (Local)' },
      zhipu: { available: !!process.env.ZHIPU_API_KEY, name: 'Zhipu GLM' },
    };
  } catch {
    return {
      kimi: { available: !!process.env.KIMI_API_KEY, name: 'Kimi K2.5' },
      ollama: { available: false, name: 'Ollama (Local)' },
      zhipu: { available: !!process.env.ZHIPU_API_KEY, name: 'Zhipu GLM' },
    };
  }
}
