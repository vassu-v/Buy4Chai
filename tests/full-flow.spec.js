import { test, expect } from '@playwright/test';

test.describe('Full User Flow - Setup to Support', () => {
  const BASE_URL = 'http://localhost:3000';
  const SETUP_URL = `${BASE_URL}/#setup?key=chai123`;

  test('should complete the setup wizard and verify configuration', async ({ page }) => {
    // 1. Access Setup Wizard
    await page.goto(SETUP_URL);
    await expect(page.locator('text=Setup Wizard')).toBeVisible();

    // 2. Identity Step
    await page.locator('section').filter({ hasText: '1. Identity' }).getByPlaceholder('Arjun Sharma').fill('Test User');
    await page.getByPlaceholder('I build open source tools and write about web dev. Every chai helps!').fill('Test Bio');
    await page.getByPlaceholder('https://github.com/yourusername.png').fill('https://example.com/avatar.png');

    // 3. Narrative Step
    await page.getByPlaceholder("I'm a developer from India...").fill('This is my story.');

    // Add a gallery image
    await page.locator('button:has-text("Add Image")').click();
    await page.getByPlaceholder('https://unsplash.com/...').fill('https://example.com/image1.png');

    // Add a project
    await page.locator('button:has-text("Add Project")').click();
    await page.getByPlaceholder('Project Name').fill('Test Project');
    await page.getByPlaceholder('Short description').fill('Test Project Description');
    await page.getByPlaceholder('https://github.com/...').fill('https://github.com/test/project');

    // 4. Socials Step
    await page.locator('div').filter({ hasText: /^GitHubgithub\.com\/$/ }).getByPlaceholder('yourusername').fill('testuser');
    await page.locator('div').filter({ hasText: /^Twittertwitter\.com\/$/ }).getByPlaceholder('yourhandle').fill('testhandle');

    // 5. Gateway Step
    await page.getByPlaceholder('rzp_live_...').fill('rzp_test_valid_123');

    // Toggle UPI
    await page.getByPlaceholder('username@bank').fill('test@upi');
    await page.locator('section').filter({ hasText: '4. Gateway' }).getByPlaceholder('Arjun Sharma').fill('Test Payee');

    // 6. Customize Step
    await page.getByPlaceholder('83.5').fill('80');
    await page.getByPlaceholder('2, 5, 10, 25').fill('1, 5, 10');
    await page.getByPlaceholder('5', { exact: true }).fill('1');
    await page.getByPlaceholder('You made my day!').fill('Thanks for support!');

    // 7. Your Config Step
    const configCode = page.locator('pre');
    await expect(configCode).toContainText('name: "Test User"');
    await expect(configCode).toContainText('gatewayKey: "rzp_test_valid_123"');
    await expect(configCode).toContainText('exchangeRate: 80');

    await page.getByRole('button', { name: 'Done! View My Page' }).click();

    // Note: Since this is a static site and we didn't actually write the generated config back to the disk,
    // the page will still show the default user "Arjun". This is expected behavior as per code.
    await expect(page.locator('text=Hey, I\'m Arjun!')).toBeVisible();
  });

  test('should interact with the Supporter Page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.goto(BASE_URL);

    await expect(page.locator('text=Hey, I\'m Arjun!')).toBeVisible();

    const themeButton = page.locator('nav button');
    await themeButton.click();

    await page.getByRole('button', { name: 'Buy me a chai' }).click();
    await expect(page.locator('text=Support my work')).toBeVisible();

    await expect(page.locator('text=Showing USD')).toBeVisible();
    await page.getByRole('button', { name: 'Switch to INR' }).click();
    await expect(page.locator('text=Showing INR')).toBeVisible();

    await page.getByRole('button', { name: 'Custom Amount (USD)' }).click();
    await page.getByPlaceholder('0.00').fill('0.1');
    await page.getByRole('button', { name: 'Support with Razorpay' }).click();
    await expect(page.locator('text=Please enter a valid amount (min $0.50).')).toBeVisible();

    // Close the modal
    const closeButton = page.locator('button:has(svg.lucide-x)');
    await closeButton.scrollIntoViewIfNeeded();
    await closeButton.click({ force: true });
    await expect(page.locator('text=Support my work')).not.toBeVisible();
  });
});
