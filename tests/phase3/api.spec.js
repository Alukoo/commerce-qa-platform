const { test } = require('@playwright/test');

test.describe('Phase3 - API (placeholders)', () => {
  // Auth
  test('API: POST /login - valid', async () => { test.skip(true, 'not implemented'); });
  test('API: POST /login - invalid credentials', async () => { test.skip(true, 'not implemented'); });
  test('API: POST /users - create user', async () => { test.skip(true, 'not implemented'); });

  // Products
  test('API: GET /products - list', async () => { test.skip(true, 'not implemented'); });
  test('API: GET /products/:id - details', async () => { test.skip(true, 'not implemented'); });
  test('API: POST /products - create (admin)', async () => { test.skip(true, 'not implemented'); });

  // Cart
  test('API: POST /cart - add item', async () => { test.skip(true, 'not implemented'); });
  test('API: GET /cart - retrieve', async () => { test.skip(true, 'not implemented'); });

  // Orders
  test('API: POST /orders - create order', async () => { test.skip(true, 'not implemented'); });
  test('API: GET /orders/:id - order details', async () => { test.skip(true, 'not implemented'); });

  // Error handling
  test('API: 400 Bad Request schema validation', async () => { test.skip(true, 'not implemented'); });
  test('API: 401 Unauthorized handling', async () => { test.skip(true, 'not implemented'); });
  test('API: 500 Server error handling', async () => { test.skip(true, 'not implemented'); });
});
