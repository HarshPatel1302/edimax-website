import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Edimax Creations/)
    // Hero headline is split into word spans; toContainText still matches the joined text
    await expect(page.locator('h1').first()).toContainText("LET'S TURN YOUR BUSINESS INTO A BRAND")
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/services"]')
    await expect(page).toHaveURL('/services')
    await expect(page.locator('h1').first()).toContainText('Services that earn attention')
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1').first()).toContainText('A studio building brands')
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/contact"]')
    await expect(page).toHaveURL('/contact')
    await expect(page.locator('h1').first()).toContainText("Let's build something worth scrolling for")
  })

  test('service cards link to detail page', async ({ page }) => {
    await page.goto('/')
    const card = page.locator('a[href="/services/social-media-management"]').first()
    await expect(card).toBeVisible()
    await card.click()
    await expect(page).toHaveURL('/services/social-media-management')
    await expect(page.locator('h1').first()).toContainText('Social Media Management')
  })
})
