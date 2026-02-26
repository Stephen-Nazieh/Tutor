// @ts-nocheck
/**
 * Playwright accessibility test helpers for WCAG 2.1 AA compliance.
 * Complements axe-core with custom checks for keyboard, touch targets, ARIA, and focus.
 */

import type { Page } from '@playwright/test'
import { MIN_TOUCH_TARGET_SIZE } from './axe-rules'

export interface KeyboardNavigationOptions {
  focusableSelectors?: string[]
  minimumFocusableSize?: { width: number; height: number }
}

export interface TouchTargetOptions {
  minimumTouchTargetSize?: { width: number; height: number }
  focusableElements?: string[]
}

export interface ARIALandmarksOptions {
  landmarks?: string[]
  roles?: string[]
}

export interface FocusTestOptions {
  visibleFocus?: boolean
  focusTargetSize?: { width: number; height: number }
}

export interface ScreenReaderOptions {
  hasAccessibleName?: boolean
  hasLabel?: boolean
}

const DEFAULT_FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex="0"]',
  '[role="button"]:not([disabled])',
  '[role="link"]',
  '[contenteditable="true"]',
]

const DEFAULT_LANDMARKS = ['banner', 'navigation', 'main', 'contentinfo']

/** Verify keyboard-focusable elements meet minimum size (WCAG 2.1 touch target) */
export async function keyboardNavigationTest(
  page: Page,
  options: KeyboardNavigationOptions = {}
): Promise<{ passed: boolean; violations: string[] }> {
  const selectors = options.focusableSelectors ?? DEFAULT_FOCUSABLE_SELECTORS
  const minSize = options.minimumFocusableSize ?? MIN_TOUCH_TARGET_SIZE
  const violations: string[] = []

  for (const sel of selectors) {
    const els = await page.locator(sel).all()
    for (let i = 0; i < els.length; i++) {
      const box = await els[i].boundingBox()
      if (box && (box.width < minSize.width || box.height < minSize.height)) {
        const tag = await els[i].evaluate((e) => e.tagName + (e.id ? '#' + e.id : ''))
        violations.push(`${tag} (${box.width}x${box.height}) below ${minSize.width}x${minSize.height}`)
      }
    }
  }

  return { passed: violations.length === 0, violations }
}

/** Verify touch targets meet minimum size on mobile viewport */
export async function touchTargetTest(
  page: Page,
  options: TouchTargetOptions = {}
): Promise<{ passed: boolean; violations: string[] }> {
  const selectors = options.focusableElements ?? [
    'button',
    'a[href]',
    'select',
    '[role="button"]',
    '[role="switch"]',
  ]
  const minSize = options.minimumTouchTargetSize ?? MIN_TOUCH_TARGET_SIZE
  const violations: string[] = []

  for (const sel of selectors) {
    const els = await page.locator(sel).all()
    for (let i = 0; i < els.length; i++) {
      const box = await els[i].boundingBox()
      if (box && (box.width < minSize.width || box.height < minSize.height)) {
        const tag = await els[i].evaluate((e) => e.tagName + (e.id ? '#' + e.id : ''))
        violations.push(`${tag} (${box.width}x${box.height}) below ${minSize.width}x${minSize.height}`)
      }
    }
  }

  return { passed: violations.length === 0, violations }
}

/** Verify ARIA landmarks and roles exist */
export async function ariaLandmarksTest(
  page: Page,
  options: ARIALandmarksOptions = {}
): Promise<{ passed: boolean; missing: string[] }> {
  const landmarks = options.landmarks ?? DEFAULT_LANDMARKS
  const missing: string[] = []

  const roleToTag: Record<string, string> = {
    banner: 'header',
    main: 'main',
    navigation: 'nav',
    contentinfo: 'footer',
  }

  for (const role of landmarks) {
    const byRole = await page.locator(`[role="${role}"]`).count()
    const tag = roleToTag[role]
    const byTag = tag ? await page.locator(tag).count() : 0
    const hasLandmark = byRole > 0 || byTag > 0
    if (!hasLandmark) {
      missing.push(role)
    }
  }

  return { passed: missing.length === 0, missing }
}

/** Verify focus is visible (outline or box-shadow) */
export async function focusTest(
  page: Page,
  _options: FocusTestOptions = {}
): Promise<{ passed: boolean; message?: string }> {
  const focused = await page.locator(':focus').count()
  if (focused === 0) {
    return { passed: true, message: 'No element focused; focus visibility N/A' }
  }

  const hasVisibleFocus = await page.evaluate(() => {
    const el = document.activeElement
    if (!el) return false
    const style = getComputedStyle(el)
    const outline = style.outlineWidth
    const boxShadow = style.boxShadow
    return (outline && outline !== '0px') || (boxShadow && boxShadow !== 'none')
  })

  return { passed: hasVisibleFocus, message: hasVisibleFocus ? undefined : 'Focused element has no visible focus indicator' }
}

/** Verify form controls have labels (axe covers most; this is a quick check) */
export async function screenReaderTest(
  page: Page,
  _options: ScreenReaderOptions = {}
): Promise<{ passed: boolean; violations: string[] }> {
  const violations: string[] = []

  const inputsWithoutLabel = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea')
    const bad: string[] = []
    inputs.forEach((el) => {
      const id = (el as HTMLInputElement).id
      const hasLabel = id && document.querySelector(`label[for="${id}"]`)
      const hasAriaLabel = (el as HTMLElement).getAttribute('aria-label') || (el as HTMLElement).getAttribute('aria-labelledby')
      const isLabeledByParent = (el as HTMLElement).closest('label')
      if (!hasLabel && !hasAriaLabel && !isLabeledByParent) {
        bad.push((el as HTMLElement).tagName + (id ? '#' + id : ''))
      }
    })
    return bad
  })

  violations.push(...inputsWithoutLabel)

  return { passed: violations.length === 0, violations }
}

/** Navigate to registration flow (role selection then student form) */
export async function navigateToRegistration(page: Page): Promise<void> {
  await page.goto('/register')
  await page.waitForLoadState('domcontentloaded')
}
