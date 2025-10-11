import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Edimax Creations/);
    
    // Check if the main hero section is visible
    await expect(page.locator('h1')).toContainText("LET'S TURN YOUR BUSINESS INTO A BRAND");
    
    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check if footer is present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Services in navigation
    await page.click('a[href="/services"]');
    
    // Check if we're on the services page
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1')).toContainText('Our Services');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click on About in navigation
    await page.click('a[href="/about"]');
    
    // Check if we're on the about page
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About Edimax Creations');
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Contact in navigation
    await page.click('a[href="/contact"]');
    
    // Check if we're on the contact page
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText("Let's Work Together");
  });

  test('should have working service cards', async ({ page }) => {
    await page.goto('/');
    
    // Check if service cards are present
    const serviceCards = page.locator('[data-testid="service-card"]').or(page.locator('h3').filter({ hasText: 'Social Media Management' }));
    await expect(serviceCards.first()).toBeVisible();
    
    // Click on first service card
    await page.click('a[href="/services/social-media-management"]');
    
    // Check if we're on the service detail page
    await expect(page).toHaveURL('/services/social-media-management');
    await expect(page.locator('h1')).toContainText('Social Media Management');
  });
});
