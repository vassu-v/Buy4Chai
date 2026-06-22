import { test, expect } from '@playwright/test';

test.describe('Landing Site Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing site
    await page.goto('http://localhost:5174/');
    // Wait for the intro animation to finish
    await page.waitForTimeout(3000);
  });

  test('should have a stacked layout on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);

    const cards = page.locator('#how-it-works .group');
    const box1 = await cards.nth(0).boundingBox();
    const box2 = await cards.nth(1).boundingBox();
    if (box1 && box2) {
      expect(box2.y).toBeGreaterThan(box1.y);
    }

    const previewContainer = page.locator('#preview .flex-col');
    await expect(previewContainer).toHaveClass(/flex-col/);
  });

  test('should scale hero animation and show text on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // In the mobile layout for AnimatedHeroDemo, the text is centered using transform: translate(-50%, ...)
    // and left: 50%.
    const heroText = page.locator('h1:has-text("Buy4Chai")');
    await expect(heroText).toBeVisible();

    // We check if it is within the viewport
    const heroBox = await heroText.boundingBox();
    if (heroBox) {
        expect(heroBox.x).toBeGreaterThanOrEqual(0);
        expect(heroBox.x + heroBox.width).toBeLessThanOrEqual(375 + 10); // small allowance
    }
  });

  test('should enable horizontal drag for quotes carousel', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const track = page.locator('.cursor-grab');
    await expect(track).toBeVisible();

    const parent = page.locator('.touch-pan-y');
    await expect(parent).toBeVisible();
  });
});
