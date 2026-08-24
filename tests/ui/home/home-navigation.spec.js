const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../../pages/HomePage');

test.describe('Home Navigation', () => {

  test('@smoke HOME-001 Home page loads successfully', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(page).toHaveTitle(/STORE/i);
  });

  test('HOME-002 Main navigation is visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(home.homeLink).toBeVisible();
    await expect(home.contactLink).toBeVisible();
    await expect(home.aboutLink).toBeVisible();
    await expect(home.cartLink).toBeVisible();
  });

  test('HOME-003 Authentication buttons are visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(home.loginLink).toBeVisible();
    await expect(home.signUpLink).toBeVisible();
  });

});