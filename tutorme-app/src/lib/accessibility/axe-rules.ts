/**
 * Axe-core accessibility rules configuration for WCAG 2.1 AA compliance.
 * Used with @axe-core/playwright for enterprise-grade accessibility testing.
 *
 * @see https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
 * @see https://www.w3.org/WAI/WCAG21/quickref/
 */

/** WCAG 2.1 Level A and AA tags for axe-core withTags() */
export const WCAG_2_1_AA_TAGS = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
] as const

/** Axe rules configuration namespace */
export const AxeRules = {
  /** Tags for WCAG 2.1 AA compliance (Level A + AA success criteria) */
  WCAG2_1_AA: WCAG_2_1_AA_TAGS,

  /** Best-practice rules (not strictly WCAG but recommended) */
  BEST_PRACTICE: ['best-practice'] as const,

  /** Combined: WCAG 2.1 AA + best practice */
  WCAG2_1_AA_AND_BEST_PRACTICE: [
    ...WCAG_2_1_AA_TAGS,
    'best-practice',
  ] as const,
} as const

/** Minimum touch target size per WCAG 2.1 Success Criterion 2.5.5 (Level AAA, but recommended for mobile) */
export const MIN_TOUCH_TARGET_SIZE = { width: 44, height: 44 }

/** WCAG 2.1 contrast requirements */
export const CONTRAST_REQUIREMENTS = {
  /** Minimum contrast ratio for normal text (Level AA) */
  minimumContrast: 4.5,
  /** Minimum contrast ratio for large text (18px+ or 14px+ bold) */
  largeTextContrast: 3,
} as const
