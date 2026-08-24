const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../../pages/HomePage');

test.describe('Home Products', () => {

  test('@smoke HOME-004 Products are displayed', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  const count = await home.getProductCount();

  expect(count).toBeGreaterThan(0);
  await expect(home.productCards.first()).toBeVisible();
});

  test('HOME-005 Product cards contain names', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await home.getProductCount();
    await expect(home.productCards.first()).toContainText(/.+/);
  });

  test('HOME-006 Product cards contain prices', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await home.getProductCount();
    await expect(home.productCards.first()).toContainText(/\$/);
  });

});