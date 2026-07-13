/**
 * Example tool: a deterministic MCQ scorer. Demonstrates a tool that wraps a
 * pure "script" (no LLM, no I/O) with Zod-validated input — the kind of
 * function an agent should call for anything that must be exact.
 */
import { z } from 'zod'
import { registerTool } from '../registry'
import type { Tool } from '../types'

const input = z.object({
  selected: z.string().describe("the option the student picked, e.g. 'B'"),
  correctKey: z.string().describe("the correct option, e.g. 'B'"),
})

export const mcqScoreTool: Tool<z.infer<typeof input>, { correct: boolean }> = registerTool({
  name: 'mcq_score',
  description: 'Score a multiple-choice answer against the answer key. Case-insensitive.',
  input,
  run: ({ selected, correctKey }) => ({
    correct: selected.trim().toLowerCase() === correctKey.trim().toLowerCase(),
  }),
})
