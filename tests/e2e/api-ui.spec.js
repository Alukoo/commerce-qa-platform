const { test, expect, request } = require('@playwright/test');

test('API -> UI end-to-end example', async ({ page, playwright }) => {
  // This is a small example illustrating Phase 7: API + UI combination.
  // It demonstrates creating a resource via API, then validating via UI.

  const baseURL = process.env.BASE_URL || 'https://demoblaze.com';

  // Example: call API to ensure product list exists (placeholder)
  const req = await request.newContext({ baseURL });
  const resp = await req.get('/');
  expect(resp.ok()).toBeTruthy();
  await req.dispose();

  // Then validate via UI
  await page.goto('/');
  await expect(page.getByText('CATEGORIES').first()).toBeVisible();
});
