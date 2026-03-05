import { test, expect } from '@playwright/test'

test.describe('Registration entry', () => {
  test('navigates to student registration', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: 'Create Your Account' })).toBeVisible()

    await page.getByRole('button', { name: 'Register as Student' }).click()
    await expect(page).toHaveURL(/\/register\/student/, { timeout: 10000 })
  })
})
