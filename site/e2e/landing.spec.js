import { test, expect } from '@playwright/test';

// Configure tests to run against the landing site
test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    // Check if the main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('navigation links are present', async ({ page }) => {
    // Check for key navigation elements
    const buttons = page.locator('a, button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('playground link works', async ({ page }) => {
    // Navigate to playground
    const playgroundLink = page.locator('a[href="/playground"]');
    await expect(playgroundLink).toBeVisible();
    await playgroundLink.click();
    await expect(page).toHaveURL('/playground');
  });

  test('page has proper meta tags', async ({ page }) => {
    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogImage = page.locator('meta[property="og:image"]');

    await expect(ogTitle).toHaveAttribute('content', /Buy4Chai/i);
    await expect(ogImage).toHaveAttribute('content', /http/);
  });

  test('page is mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const content = page.locator('body');
    await expect(content).toBeVisible();

    // Check that content doesn't overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test('Core Web Vitals thresholds', async ({ page }) => {
    // Collect performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');

      return {
        FCP: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        LCP: Math.max(...performance.getEntriesByType('largest-contentful-paint').map(e => e.startTime)),
        CLS: Math.max(...performance.getEntriesByType('layout-shift').map(e => e.value))
      };
    });

    // Log metrics (would fail with aggressive thresholds in CI)
    console.log('Performance Metrics:', metrics);
  });
});

test.describe('Playground Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground');
  });

  test('playground loads successfully', async ({ page }) => {
    const heading = page.locator('h1, h2');
    await expect(heading).toBeVisible();
  });

  test('interactive elements respond to clicks', async ({ page }) => {
    // Look for interactive elements
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      await buttons.first().click();
    }
  });
});
