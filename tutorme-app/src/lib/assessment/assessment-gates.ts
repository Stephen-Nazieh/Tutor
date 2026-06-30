/**
 * Pre-deploy gates for assessments (Assessment guardrails).
 *
 * These are pure, testable checks the deploy path runs to BLOCK (not just warn)
 * when a spec invariant is violated. ASMT-8: every open-response question must
 * have a rubric pathway defined before the assessment can be confirmed/deployed.
 */

import { isOpenDmiType } from './question-types'

export interface RubricGateItem {
  questionType?: string | null
  questionLabel?: string | null
  questionNumber?: number | null
  /** Marking guidance / rubric pathway (free text, or a "manual marking" note). */
  rubric?: string | null
}

/**
 * ASMT-8: returns the labels of open-response questions that have NO rubric
 * pathway (empty/whitespace `rubric`). An empty result means the gate passes.
 *
 * Only genuinely open types (`short`/`long`) are gated — closed and auto-graded
 * types don't need a rubric, and untyped legacy items are not blocked.
 */
export function findOpenItemsMissingRubric(items: RubricGateItem[]): string[] {
  const missing: string[] = []
  for (const it of items) {
    if (!isOpenDmiType(it.questionType)) continue
    if (!it.rubric || !it.rubric.trim()) {
      missing.push(
        (it.questionLabel && it.questionLabel.trim()) ||
          (it.questionNumber != null ? `Q${it.questionNumber}` : '?')
      )
    }
  }
  return missing
}
