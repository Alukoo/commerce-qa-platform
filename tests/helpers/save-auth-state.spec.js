const { test } = require('@playwright/test');

// This helper records an authenticated storage state to tests/state/auth.json.
// Usage: `npm run auth:record` (set TEST_USERNAME and TEST_PASSWORD in env)

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
test.skip(!username || !password, 'Skipping auth-record: set TEST_USERNAME and TEST_PASSWORD to enable');

test('record authenticated state', async ({ page }) => {
  await page.goto('/');
  // open login dialog
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Username').fill(username).catch(() => {});
  await page.getByLabel('Password').fill(password).catch(() => {});
  // click login button (selector may vary)
  await page.getByRole('button', { name: 'Log in' }).click().catch(() => {});

  // wait for a known post-login element (logout link/button) or network idle
  const postLogin = page.locator('a:has-text("Log out"), a:has-text("Logout"), button:has-text("Log out"), a:has-text("My Account")');
  try {
    await postLogin.first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    try { await page.waitForLoadState('networkidle'); } catch (e) {}
  }

  await page.context().storageState({ path: 'tests/state/auth.json' });
});
