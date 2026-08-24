class ProductPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      name: 'h2.name, h2, .name',
      price: '.price-container, .price, .product-price, .card-text',
      image: '.img-responsive, #imgp, .img-fluid, img',
      addToCart: 'a:has-text("Add to cart"), button:has-text("Add to cart")',
      description: '#more-information, .description, .product-description'
    };
  }

  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for any of the common product elements to appear. Use a best-effort
    // approach so different browsers/devices that render differently still pass.
    try {
      await this._waitForAnyVisible([
        this.nameLocator(),
        this.imageLocator(),
        this.priceLocator(),
        this.descriptionLocator(),
      ], 6000);
    } catch (e) {
      // proceed if none become visible within timeout
    }
  }

  async _waitForAnyVisible(locators, timeout = 6000) {
    const waits = locators.map((loc) => loc.waitFor({ state: 'visible', timeout }).catch(() => { throw new Error('not-visible'); }));
    try {
      await Promise.any(waits);
    } catch (e) {
      // ignore
    }
  }

  nameLocator() { return this.page.locator(this.selectors.name).first(); }
  priceLocator() { return this.page.locator(this.selectors.price).first(); }
  imageLocator() { return this.page.locator(this.selectors.image).first(); }
  descriptionLocator() { return this.page.locator(this.selectors.description).first(); }

  async getName() { return (await this.nameLocator().innerText()).trim(); }
  async getPrice() { return (await this.priceLocator().innerText()).trim(); }
  async isImageVisible() { return await this.imageLocator().isVisible().catch(() => false); }
  async addToCart() {
    const btn = this.page.locator(this.selectors.addToCart).first();
    await btn.click({ force: true });
  }
}

module.exports = ProductPage;
