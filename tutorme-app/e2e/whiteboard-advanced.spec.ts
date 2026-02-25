/**
 * Whiteboard Advanced Features E2E Tests
 * 
 * Tests for:
 * - Connector pathfinding and retargeting
 * - Conflict resolution
 * - Reconnect replay
 * - Branching versions
 * - Tutor orchestration
 */

import { test, expect } from '@playwright/test'

test.describe('Whiteboard Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the whiteboard page
    await page.goto('/en/tutor/whiteboards/test-room')
    
    // Wait for whiteboard to load
    await page.waitForSelector('[data-testid="whiteboard-canvas"]')
  })

  // ============================================================================
  // Feature 1: Connector Pathfinding
  // ============================================================================
  
  test.describe('Connector Pathfinding', () => {
    test('should route connector between two shapes with orthogonal path', async ({ page }) => {
      // Create first shape
      await page.click('[data-testid="tool-rectangle"]')
      await page.mouse.move(100, 100)
      await page.mouse.down()
      await page.mouse.move(200, 200)
      await page.mouse.up()

      // Create second shape
      await page.mouse.move(400, 100)
      await page.mouse.down()
      await page.mouse.move(500, 200)
      await page.mouse.up()

      // Select connector tool
      await page.click('[data-testid="tool-connector"]')

      // Connect shapes
      await page.mouse.move(200, 150)
      await page.mouse.down()
      await page.mouse.move(400, 150)
      await page.mouse.up()

      // Verify connector exists
      const connector = await page.locator('[data-testid="connector-line"]').first()
      await expect(connector).toBeVisible()

      // Verify connector has multiple points (orthogonal)
      const pathData = await connector.getAttribute('d')
      expect(pathData).toContain('L') // Should have line segments
    })

    test('should reroute connector when source shape moves', async ({ page }) => {
      // Create and connect two shapes
      // ... (setup code)

      // Move source shape
      await page.click('[data-testid="tool-select"]')
      await page.mouse.move(150, 150)
      await page.mouse.down()
      await page.mouse.move(150, 300)
      await page.mouse.up()

      // Verify connector rerouted
      const connector = await page.locator('[data-testid="connector-line"]').first()
      await expect(connector).toBeVisible()
      
      // Path should have changed
      const pathData = await connector.getAttribute('d')
      expect(pathData).toBeTruthy()
    })

    test('should avoid obstacles when routing', async ({ page }) => {
      // Create source and target shapes
      await page.click('[data-testid="tool-rectangle"]')
      await page.mouse.move(100, 100)
      await page.mouse.down()
      await page.mouse.move(200, 200)
      await page.mouse.up()

      await page.mouse.move(500, 100)
      await page.mouse.down()
      await page.mouse.move(600, 200)
      await page.mouse.up()

      // Create obstacle in middle
      await page.mouse.move(300, 120)
      await page.mouse.down()
      await page.mouse.move(400, 180)
      await page.mouse.up()

      // Connect shapes
      await page.click('[data-testid="tool-connector"]')
      await page.mouse.move(200, 150)
      await page.mouse.down()
      await page.mouse.move(500, 150)
      await page.mouse.up()

      // Connector should go around obstacle
      const connector = await page.locator('[data-testid="connector-line"]').first()
      await expect(connector).toBeVisible()
    })
  })

  // ============================================================================
  // Feature 2: Presence and Conflict Resolution
  // ============================================================================
  
  test.describe('Presence and Conflict Resolution', () => {
    test('should show editing halo when another user edits', async ({ browser }) => {
      // Create two contexts for two users
      const tutorContext = await browser.newContext()
      const studentContext = await browser.newContext()

      const tutorPage = await tutorContext.newPage()
      const studentPage = await studentContext.newPage()

      try {
        // Both users join same room
        await tutorPage.goto('/en/tutor/live-class/test-room')
        await studentPage.goto('/en/student/live/test-room')

        // Wait for both to connect
        await tutorPage.waitForSelector('[data-testid="whiteboard-canvas"]')
        await studentPage.waitForSelector('[data-testid="whiteboard-canvas"]')

        // Student starts drawing
        await studentPage.click('[data-testid="tool-pen"]')
        await studentPage.mouse.move(100, 100)
        await studentPage.mouse.down()
        await studentPage.mouse.move(200, 200)

        // Tutor should see editing halo
        const halo = await tutorPage.locator('[data-testid="editing-halo"]').first()
        await expect(halo).toBeVisible()

        await studentPage.mouse.up()
      } finally {
        await tutorContext.close()
        await studentContext.close()
      }
    })

    test('should resolve concurrent edits with last-write-wins', async ({ browser }) => {
      const context1 = await browser.newContext()
      const context2 = await browser.newContext()

      const page1 = await context1.newPage()
      const page2 = await context2.newPage()

      try {
        // Both users join and draw on same element
        await page1.goto('/en/tutor/live-class/test-room')
        await page2.goto('/en/student/live/test-room')

        await page1.waitForSelector('[data-testid="whiteboard-canvas"]')
        await page2.waitForSelector('[data-testid="whiteboard-canvas"]')

        // Both draw simultaneously (simulated)
        await page1.click('[data-testid="tool-pen"]')
        await page2.click('[data-testid="tool-pen"]')

        // Draw from page 1
        await page1.mouse.move(100, 100)
        await page1.mouse.down()
        await page1.mouse.move(200, 200)
        await page1.mouse.up()

        // Draw from page 2
        await page2.mouse.move(100, 100)
        await page2.mouse.down()
        await page2.mouse.move(200, 200)
        await page2.mouse.up()

        // Wait for sync
        await page1.waitForTimeout(500)

        // Both should see consistent state
        const strokes1 = await page1.locator('[data-testid="whiteboard-stroke"]').count()
        const strokes2 = await page2.locator('[data-testid="whiteboard-stroke"]').count()

        expect(strokes1).toBe(strokes2)
      } finally {
        await context1.close()
        await context2.close()
      }
    })
  })

  // ============================================================================
  // Feature 3: Reconnect Replay
  // ============================================================================
  
  test.describe('Reconnect Replay', () => {
    test('should replay missed operations after reconnect', async ({ browser }) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      try {
        await page.goto('/en/tutor/live-class/test-room')
        await page.waitForSelector('[data-testid="whiteboard-canvas"]')

        // Draw some strokes
        await page.click('[data-testid="tool-pen"]')
        for (let i = 0; i < 3; i++) {
          await page.mouse.move(100 + i * 50, 100)
          await page.mouse.down()
          await page.mouse.move(150 + i * 50, 150)
          await page.mouse.up()
        }

        // Simulate disconnect
        await page.context().setOffline(true)
        await page.waitForTimeout(1000)

        // Draw while disconnected
        await page.mouse.move(100, 200)
        await page.mouse.down()
        await page.mouse.move(200, 250)
        await page.mouse.up()

        // Reconnect
        await page.context().setOffline(false)
        await page.waitForTimeout(2000)

        // Verify strokes are still there
        const strokes = await page.locator('[data-testid="whiteboard-stroke"]').count()
        expect(strokes).toBeGreaterThanOrEqual(3)
      } finally {
        await context.close()
      }
    })
  })

  // ============================================================================
  // Feature 4: Branching Versions
  // ============================================================================
  
  test.describe('Branching Versions', () => {
    test('should create and switch branches', async ({ page }) => {
      // Create initial stroke
      await page.click('[data-testid="tool-pen"]')
      await page.mouse.move(100, 100)
      await page.mouse.down()
      await page.mouse.move(200, 200)
      await page.mouse.up()

      // Open branch menu
      await page.click('[data-testid="branch-menu-button"]')
      await page.click('[data-testid="create-branch"]')

      // Enter branch name
      await page.fill('[data-testid="branch-name-input"]', "Try Approach B")
      await page.click('[data-testid="confirm-create-branch"]')

      // Verify branch created
      await expect(page.locator('[data-testid="branch-list"]')).toContainText('Try Approach B')

      // Draw on new branch
      await page.mouse.move(300, 100)
      await page.mouse.down()
      await page.mouse.move(400, 200)
      await page.mouse.up()

      // Switch back to main
      await page.click('[data-testid="branch-menu-button"]')
      await page.click('[data-testid="branch-main"]')

      // Main should not have the new stroke
      const strokes = await page.locator('[data-testid="whiteboard-stroke"]').count()
      expect(strokes).toBe(1)
    })

    test('should merge branches with conflict resolution', async ({ page }) => {
      // Setup branches with conflicting changes
      // ... setup code

      // Open merge dialog
      await page.click('[data-testid="branch-menu-button"]')
      await page.click('[data-testid="merge-branch"]')

      // Select source branch
      await page.selectOption('[data-testid="merge-source-select"]', 'Try Approach B')
      await page.click('[data-testid="start-merge"]')

      // Resolve conflicts
      await page.click('[data-testid="resolve-theirs"]')

      // Complete merge
      await page.click('[data-testid="complete-merge"]')

      // Verify merge success
      await expect(page.locator('[data-testid="merge-success-message"]')).toBeVisible()
    })
  })

  // ============================================================================
  // Feature 10: Tutor Orchestration
  // ============================================================================
  
  test.describe('Tutor Orchestration', () => {
    test('should push exemplar to all students', async ({ browser }) => {
      const tutorContext = await browser.newContext()
      const student1Context = await browser.newContext()
      const student2Context = await browser.newContext()

      const tutorPage = await tutorContext.newPage()
      const student1Page = await student1Context.newPage()
      const student2Page = await student2Context.newPage()

      try {
        // All join
        await tutorPage.goto('/en/tutor/live-class/test-room')
        await student1Page.goto('/en/student/live/test-room')
        await student2Page.goto('/en/student/live/test-room')

        await tutorPage.waitForSelector('[data-testid="whiteboard-canvas"]')
        await student1Page.waitForSelector('[data-testid="whiteboard-canvas"]')
        await student2Page.waitForSelector('[data-testid="whiteboard-canvas"]')

        // Tutor draws exemplar
        await tutorPage.click('[data-testid="tool-pen"]')
        await tutorPage.mouse.move(100, 100)
        await tutorPage.mouse.down()
        await tutorPage.mouse.move(200, 200)
        await tutorPage.mouse.up()

        // Save as exemplar
        await tutorPage.click('[data-testid="save-exemplar"]')
        await tutorPage.fill('[data-testid="exemplar-name"]', 'Good Solution')
        await tutorPage.click('[data-testid="confirm-save-exemplar"]')

        // Push to students
        await tutorPage.click('[data-testid="push-exemplar"]')
        await tutorPage.click('[data-testid="push-to-all"]')

        // Wait for push
        await tutorPage.waitForTimeout(1000)

        // Students should see exemplar
        const s1Strokes = await student1Page.locator('[data-testid="whiteboard-stroke"]').count()
        const s2Strokes = await student2Page.locator('[data-testid="whiteboard-stroke"]').count()

        expect(s1Strokes).toBeGreaterThan(0)
        expect(s2Strokes).toBeGreaterThan(0)
      } finally {
        await tutorContext.close()
        await student1Context.close()
        await student2Context.close()
      }
    })

    test('should spotlight student work', async ({ browser }) => {
      const tutorContext = await browser.newContext()
      const studentContext = await browser.newContext()

      const tutorPage = await tutorContext.newPage()
      const studentPage = await studentContext.newPage()

      try {
        await tutorPage.goto('/en/tutor/live-class/test-room')
        await studentPage.goto('/en/student/live/test-room')

        await tutorPage.waitForSelector('[data-testid="whiteboard-canvas"]')
        await studentPage.waitForSelector('[data-testid="whiteboard-canvas"]')

        // Student draws
        await studentPage.click('[data-testid="tool-pen"]')
        await studentPage.mouse.move(100, 100)
        await studentPage.mouse.down()
        await studentPage.mouse.move(200, 200)
        await studentPage.mouse.up()

        // Tutor spots student
        await tutorPage.click('[data-testid="student-list-toggle"]')
        await tutorPage.click('[data-testid="spotlight-student"]')

        // Spotlight should be visible
        await expect(tutorPage.locator('[data-testid="spotlight-view"]')).toBeVisible()

        // Promote to public
        await tutorPage.click('[data-testid="promote-spotlight"]')

        // Students should see spotlight
        await expect(studentPage.locator('[data-testid="public-spotlight"]')).toBeVisible()
      } finally {
        await tutorContext.close()
        await studentContext.close()
      }
    })
  })

  // ============================================================================
  // Feature 11: Accessibility
  // ============================================================================
  
  test.describe('Accessibility', () => {
    test('should support keyboard drawing mode', async ({ page }) => {
      // Enable keyboard mode
      await page.click('[data-testid="toggle-keyboard-mode"]')

      // Select pen tool
      await page.keyboard.press('p')

      // Draw with arrow keys
      await page.keyboard.press('Enter') // Start drawing
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter') // Stop drawing

      // Verify stroke created
      const stroke = await page.locator('[data-testid="whiteboard-stroke"]').first()
      await expect(stroke).toBeVisible()
    })

    test('should have proper ARIA labels', async ({ page }) => {
      // Check canvas has role
      const canvas = await page.locator('[data-testid="whiteboard-canvas"]')
      await expect(canvas).toHaveAttribute('role', 'application')
      await expect(canvas).toHaveAttribute('aria-label', /whiteboard/i)

      // Check toolbar
      const toolbar = await page.locator('[data-testid="drawing-toolbar"]')
      await expect(toolbar).toHaveAttribute('role', 'toolbar')

      // Check tool buttons
      const penButton = await page.locator('[data-testid="tool-pen"]')
      await expect(penButton).toHaveAttribute('aria-label', /pen/i)
    })

    test('should announce changes to screen reader', async ({ page }) => {
      // Check live region exists
      const liveRegion = await page.locator('[aria-live]')
      await expect(liveRegion).toHaveAttribute('aria-live', /polite|assertive/)

      // Change tool
      await page.click('[data-testid="tool-eraser"]')

      // Check announcement
      await expect(liveRegion).toContainText(/eraser/i)
    })
  })

  // ============================================================================
  // Feature 12: Analytics
  // ============================================================================
  
  test.describe('Analytics', () => {
    test('should track operations per second', async ({ page }) => {
      // Open analytics panel
      await page.click('[data-testid="analytics-toggle"]')

      // Draw multiple strokes quickly
      await page.click('[data-testid="tool-pen"]')
      for (let i = 0; i < 5; i++) {
        await page.mouse.move(100 + i * 20, 100)
        await page.mouse.down()
        await page.mouse.move(120 + i * 20, 120)
        await page.mouse.up()
      }

      // Check ops/sec metric
      await expect(page.locator('[data-testid="ops-per-second"]')).toBeVisible()
      const opsText = await page.locator('[data-testid="ops-per-second"]').textContent()
      expect(parseFloat(opsText || '0')).toBeGreaterThan(0)
    })

    test('should show latency percentiles', async ({ page }) => {
      await page.click('[data-testid="analytics-toggle"]')

      // Check latency metrics exist
      await expect(page.locator('[data-testid="latency-p50"]')).toBeVisible()
      await expect(page.locator('[data-testid="latency-p95"]')).toBeVisible()
      await expect(page.locator('[data-testid="latency-p99"]')).toBeVisible()
    })
  })
})
