class HomePage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutLink = page.getByRole('link', { name: 'About us' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });

    // Categories
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });

    // Products
    this.productCards = page.locator('#tbodyid .card');
    this.categoryContainer = page.locator('#cat');
  }

  async goto() {
  const url = '/';
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });

      // Wait for any of the key UI pieces to be visible to accommodate
      // different browsers/devices rendering speeds.
      await this._waitForAnyVisible([
        this.categoryContainer,
        this.productCards.first(),
        this.homeLink,
      ], 30000);

      return;
    } catch (err) {
      // small backoff and retry for transient navigation failures
      // eslint-disable-next-line no-console
      console.warn(`HomePage.goto attempt ${attempt} failed: ${err.message}`);
      if (attempt === maxAttempts) throw err;
      await new Promise((res) => setTimeout(res, 1000 * attempt));
    }
  }
}

  async _waitForAnyVisible(locators, timeout = 30000) {
    const waits = locators.map((loc) => loc.waitFor({ state: 'visible', timeout }).catch(() => { throw new Error('not-visible'); }));
    try {
      // Promise.any resolves once one locator becomes visible; if none do, ignore.
      await Promise.any(waits);
    } catch (e) {
      // ignore - best-effort sync
    }
  }

  async selectCategory(category) {
    const link = this.page.getByRole('link', { name: category });
    await link.click().catch(() => {});
    try {
      await Promise.any([
        this.productCards.first().waitFor({ state: 'visible', timeout: 15000 }),
        this.categoryContainer.waitFor({ state: 'visible', timeout: 15000 }),
      ]);
    } catch (e) {}
    try { await this.page.waitForLoadState('networkidle'); } catch (e) {}
  }

  async getProductCount() {
  await this.productCards.first().waitFor({
    state: 'visible',
    timeout: 30000,
  });

  return await this.productCards.count();
}
}

module.exports = { HomePage };