import { test, expect } from '@playwright/test'

test.describe('Student registration', () => {
  test('can open register page and submit form', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: 'Sign Up for TutorMe' })).toBeVisible()

    const email = 'e2e-' + Date.now() + '@example.com'
    await page.getByLabel('Full Name').fill('E2E Test User')
    await page.getByLabel('Email').fill(email)
    await page.locator('input[name="password"]').fill('Password1')
    await page.locator('input[name="confirmPassword"]').fill('Password1')

    await page.getByRole('button', { name: 'Student' }).click()
    await page.getByRole('button', { name: 'Create Account' }).click()

    await expect(page).toHaveURL(/\/(student\/dashboard|login)/, { timeout: 15000 })
  })
})
