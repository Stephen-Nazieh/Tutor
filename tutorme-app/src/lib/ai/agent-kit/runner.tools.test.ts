import { describe, it, expect } from 'vitest'
import { runAgent } from './runner'
import { mcqScoreTool } from './tools/mcq-score'
import type { AgentDefinition, GenerateFn } from './types'

/** A mock provider that returns queued responses turn by turn. */
function queuedGenerate(responses: string[]) {
  const calls: { system: string; user: string }[] = []
  let i = 0
  const fn: GenerateFn = async ({ system, user }) => {
    calls.push({ system, user })
    const text = responses[Math.min(i, responses.length - 1)]
    i++
    return { text }
  }
  return { fn, calls }
}

describe('agent-kit tool loop', () => {
  it('executes a tool with validated input and feeds the result back', async () => {
    const { fn, calls } = queuedGenerate([
      JSON.stringify({ tool: 'mcq_score', input: { selected: 'b', correctKey: 'B' } }),
      JSON.stringify({ final: 'Correct — you picked B.' }),
    ])
    const def: AgentDefinition = {
      id: 'grader',
      description: '',
      systemPrompt: 'You grade MCQs.',
      tools: [mcqScoreTool],
    }

    const result = await runAgent(def, { message: 'Is b right if key is B?' }, { generate: fn })

    expect(result.text).toBe('Correct — you picked B.')
    // the tool protocol + tool names were injected into the system prompt
    expect(calls[0].system).toContain('mcq_score')
    // the (case-insensitive) tool result was fed back into the next turn
    expect(calls[1].user).toContain('"correct":true')
  })

  it('rejects invalid tool input and reports it back to the model', async () => {
    const { fn, calls } = queuedGenerate([
      JSON.stringify({ tool: 'mcq_score', input: { selected: 'b' } }), // missing correctKey
      JSON.stringify({ final: 'ok' }),
    ])
    const def: AgentDefinition = {
      id: 'grader',
      description: '',
      systemPrompt: 'x',
      tools: [mcqScoreTool],
    }

    const result = await runAgent(def, { message: 'go' }, { generate: fn })

    expect(result.text).toBe('ok')
    expect(calls[1].user.toLowerCase()).toContain('invalid input')
  })

  it('parse-gates structured assessment validation (no crash on non-JSON)', async () => {
    const def: AgentDefinition = {
      id: 'dmi',
      description: '',
      systemPrompt: 'x',
      guardrailDomain: 'assessment',
    }

    const jsonGen = queuedGenerate([JSON.stringify({ fields: [{ label: 'Q1', type: 'short' }] })])
    const r1 = await runAgent(def, { message: 'go' }, { generate: jsonGen.fn })
    expect(r1.text).toContain('Q1') // returns the model output unchanged

    const textGen = queuedGenerate(['not json at all'])
    const r2 = await runAgent(def, { message: 'go' }, { generate: textGen.fn })
    expect(r2.guardrail).toBeUndefined() // non-JSON → no structured validation
  })
})
