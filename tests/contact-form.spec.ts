import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the contact form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="mobileNumber"]', '+91 9876543210');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    
    // Select services
    await page.check('input[type="checkbox"][value="social-media-management"]');
    await page.check('input[type="checkbox"][value="content-creation"]');
    
    // Add a message
    await page.fill('textarea[name="message"]', 'I would like to discuss a potential project for my business.');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message (this will depend on your toast implementation)
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=Last name must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible();
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form with invalid email
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="mobileNumber"]', '+91 9876543210');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.check('input[type="checkbox"][value="social-media-management"]');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for email validation error
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should validate phone number format', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form with invalid phone number
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="mobileNumber"]', '123456789');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.check('input[type="checkbox"][value="social-media-management"]');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for phone validation error
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible();
  });
});
