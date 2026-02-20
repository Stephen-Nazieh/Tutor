/**
 * E2E: Tutor course config page — groups/batches, share link, schedule.
 * Tutor logs in, creates a course (or opens one), then verifies course config UI.
 */

import { test, expect } from '@playwright/test'

test.describe('Tutor course config', () => {
  test('tutor can open course config and see groups, schedule, and share link', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TUTOR_EMAIL ?? 'tutor@example.com')
    await page.getByLabel(/password/i).fill(process.env.E2E_TUTOR_PASSWORD ?? 'Password1')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/tutor\/dashboard/, { timeout: 10000 })

    // Open Create Course dialog
    await page.getByRole('button', { name: /Create Course/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 })

    // Select subject and create (dialog uses subject as title when no custom title)
    await page.getByRole('combobox').first().click()
    await page.getByRole('option', { name: /Mathematics/i }).click()
    await page.getByRole('button', { name: /Create|Create course/i }).click()

    // Wait for redirect to course config page
    await expect(page).toHaveURL(/\/tutor\/courses\/[^/]+/, { timeout: 15000 })

    // Course config page should show batch/groups and schedule
    await expect(page.getByText(/Batch|Groups|Group|Class schedule|Schedule/i).first()).toBeVisible({
      timeout: 8000,
    })
    // Share / copy link for group
    const shareOrCopy = page.getByRole('button', { name: /Copy|Share|Link/i })
    await expect(shareOrCopy.first()).toBeVisible({ timeout: 5000 })
  })
})
