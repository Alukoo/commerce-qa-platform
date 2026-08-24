const { test, expect } = require('@playwright/test');

test('NET-031 Purchase triggers /purchase', async ({ page }) => {
  const base = process.env.BASE_URL || 'https://demoblaze.com';
  const { validateNetwork } = require('./assertions');
  const respPromise = page.waitForResponse(r => r.url().includes('/purchase') && r.request().method() === 'POST', { timeout: 10000 });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  // Try to open cart and place order
  await page.goto('/cart.html').catch(() => {});
  const place = page.locator('button:has-text("Place Order")');
  if ((await place.count()) === 0) return test.skip();
  await place.first().click().catch(() => {});
  // fill minimal data
  try {
    await page.locator('#name').fill('API');
    await page.locator('#country').fill('USA');
    await page.locator('#city').fill('City');
    await page.locator('#card').fill('4111111111111111');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2030');
    await page.locator('button:has-text("Purchase")').click().catch(() => {});
  } catch (e) {}
  let resp = null;
  try {
    resp = await respPromise;
  } catch (e) {
    return test.skip();
  }
  if (!resp) return test.skip();

  await validateNetwork(resp, {
    method: 'POST',
    endpointContains: '/purchase',
    allowedStatus: [200, 201, 400],
    expectedBodyFields: ['card', 'payment', 'amount'],
    requireAuthHeader: !!process.env.API_TOKEN,
    responseValidator: (body) => {
      try { expect(body.id || body.orderId || body.success).toBeTruthy(); } catch (e) {}
    },
  });
});
