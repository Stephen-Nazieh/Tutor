import { test, expect } from '@playwright/test'

test.describe('Tutor registration flow', () => {
  test('completes the new tutor signup flow', async ({ page }) => {
    await page.route('**/api/public/username-availability**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ available: true, username: 'solocorn.tutor' }),
      })
    })

    await page.route('**/api/auth/register/tutor', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, user: { id: 'tutor-1', role: 'TUTOR' } }),
      })
    })

    await page.goto('/register/tutor')
    await expect(page.getByRole('heading', { name: 'Become a Solocorn Tutor' })).toBeVisible()

    await page.getByPlaceholder('John').fill('Ava')
    await page.getByPlaceholder('Doe').fill('Chen')
    await page.getByPlaceholder('tutor@example.com').fill(`e2e-tutor-${Date.now()}@example.com`)
    await page.getByPlaceholder('••••••••').first().fill('Password1')
    await page.getByPlaceholder('••••••••').nth(1).fill('Password1')

    await page.getByRole('button', { name: 'Select country' }).click()
    await page.getByRole('option', { name: 'United States' }).click()
    await page.getByPlaceholder('(555) 123-4567').fill('5551234567')

    await page.getByRole('button', { name: 'Next' }).click()

    const comboboxes = page.locator('button[role="combobox"]')
    await comboboxes.nth(0).click()
    await page.getByRole('option', { name: 'Bachelor' }).click()

    await comboboxes.nth(1).click()
    await page.getByRole('option', { name: 'No' }).click()

    await comboboxes.nth(2).click()
    await page.getByRole('option', { name: '3-5 years' }).click()

    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByText('IELTS').click()
    await page.getByText('United States').click()

    await page.getByRole('button', { name: 'Select a country to assign subjects' }).click()
    await page.getByRole('option', { name: 'United States' }).click()
    await page.getByText('SAT/ACT Strategy').click()

    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByPlaceholder('@MrKimTutoring').fill('solocorn.tutor')
    await page.getByRole('button', { name: 'Verify' }).click()
    await page.getByPlaceholder('As per verification documents').fill('Ava Chen')
    await page.getByPlaceholder('Describe your tutoring service (500 characters max)').fill('Experienced SAT and IELTS tutor')

    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByRole('button', { name: 'Register' }).click()

    await page.getByText('I agree to the Terms and Agreements').click()
    await page.getByRole('button', { name: 'Complete Registration' }).click()

    await expect(page).toHaveURL(/\/login\?registered=1/, { timeout: 10000 })
  })
})
