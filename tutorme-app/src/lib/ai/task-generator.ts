/**
 * Backwards-compatible re-export.
 *
 * Canonical task generation service now lives under `@/lib/agents/task-generator`,
 * so app-facing AI capabilities share one "agents" boundary.
 */

export * from '@/lib/agents/task-generator'
