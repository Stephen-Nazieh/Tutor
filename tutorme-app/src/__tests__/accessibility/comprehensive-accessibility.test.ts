/**
 * Enterprise-grade accessibility testing with axe-core.
 * WCAG 2.1 AA compliance for global deployment.
 *
 * Run: npm run test:e2e -- src/__tests__/accessibility/comprehensive-accessibility.test.ts
 */

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { AxeRules } from '@/lib/accessibility/axe-rules'
import {
  keyboardNavigationTest,
  touchTargetTest,
  ariaLandmarksTest,
  focusTest,
  screenReaderTest,
  navigateToRegistration,
} from '@/lib/accessibility/test-helpers'

const WCAG_TAGS = [...AxeRules.WCAG2_1_AA]

test.describe('Comprehensive Accessibility Tests', () => {
  test('should have no detectable WCAG 2.1 Level A/AA violations on home page', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })

  test('should have no detectable WCAG 2.1 violations on registration flow', async ({ page }) => {
    await navigateToRegistration(page)
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })

  test('should have no detectable WCAG 2.1 violations on login page', async ({ page }) => {
    await page.goto('/login')
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })

  test('should support keyboard navigation for critical flows', async ({ page }) => {
    await page.goto('/')
    const { passed, violations } = await keyboardNavigationTest(page, {
      focusableSelectors: [
        'button',
        'a[href]',
        'input',
        'select',
        'textarea',
        '[tabindex="0"]',
        '[role="button"]',
        '[role="link"]',
      ],
      minimumFocusableSize: { width: 44, height: 44 },
    })
    expect(passed, `Touch target violations: ${violations.join('; ')}`).toBe(true)
  })

  test('should support mobile accessibility with proper touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 428, height: 926 })
    await page.goto('/')
    const { passed, violations } = await touchTargetTest(page, {
      minimumTouchTargetSize: { width: 44, height: 44 },
      focusableElements: ['button', 'a[href]', 'select', '[role="button"]', '[role="switch"]'],
    })
    expect(passed, `Touch target violations: ${violations.join('; ')}`).toBe(true)
  })

  test('should have proper ARIA landmarks and roles', async ({ page }) => {
    await page.goto('/')
    const { passed, missing } = await ariaLandmarksTest(page, {
      landmarks: ['main'],
    })
    expect(passed, `Missing landmarks: ${missing.join(', ')}`).toBe(true)
  })

  test('should handle focus correctly', async ({ page }) => {
    await page.goto('/')
    const { passed, message } = await focusTest(page, {
      visibleFocus: true,
      focusTargetSize: { width: 44, height: 44 },
    })
    expect(passed, message).toBe(true)
  })

  test('should support screen readers with proper labels', async ({ page }) => {
    await navigateToRegistration(page)
    const { passed, violations } = await screenReaderTest(page, {
      hasAccessibleName: true,
      hasLabel: true,
    })
    expect(passed, `Unlabeled controls: ${violations.join('; ')}`).toBe(true)
  })

  test('should attach accessibility scan results for debugging', async ({ page }, testInfo) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json',
    })
    expect(results.violations).toEqual([])
  })
})
