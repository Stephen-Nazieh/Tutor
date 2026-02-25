/**
 * Accessibility utilities for WCAG 2.1 AA compliance.
 */

export { AxeRules, WCAG_2_1_AA_TAGS, MIN_TOUCH_TARGET_SIZE, CONTRAST_REQUIREMENTS } from './axe-rules'
export {
  keyboardNavigationTest,
  touchTargetTest,
  ariaLandmarksTest,
  focusTest,
  screenReaderTest,
  navigateToRegistration,
} from './test-helpers'
export type {
  KeyboardNavigationOptions,
  TouchTargetOptions,
  ARIALandmarksOptions,
  FocusTestOptions,
  ScreenReaderOptions,
} from './test-helpers'
