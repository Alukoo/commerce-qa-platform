const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../../pages/HomePage');

test.describe('Home Categories', () => {

  test('@smoke HOME-007 Phones category is visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(home.phonesCategory).toBeVisible();
  });

  test('HOME-008 Laptops category is visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(home.laptopsCategory).toBeVisible();
  });

  test('HOME-009 Monitors category is visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await expect(home.monitorsCategory).toBeVisible();
  });

  test('HOME-010 Category navigation works', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await home.selectCategory('Laptops');

    await expect(home.productCards.first()).toBeVisible();
  });

});