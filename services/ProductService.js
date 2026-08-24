class ProductService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = (baseURL || '').replace(/\/$/, '');
  }

  async getProducts() {
    // try common patterns: GET /products, GET /entries, POST /entries
    const candidates = [`${this.baseURL}/products`, `${this.baseURL}/entries`, `${this.baseURL}/api/products`];
    for (const url of candidates) {
      try {
        const res = await this.request.get(url);
        if (res && res.ok()) return res;
      } catch (e) {}
      try {
        const res2 = await this.request.post(url, { data: {} });
        if (res2 && res2.ok()) return res2;
      } catch (e) {}
    }
    // last resort: GET base
    try { return await this.request.get(this.baseURL); } catch (e) { return null; }
  }

  async getProduct(id) {
    const candidates = [`${this.baseURL}/product/${id}`, `${this.baseURL}/view`, `${this.baseURL}/products/${id}`];
    for (const url of candidates) {
      try {
        const res = await this.request.get(url);
        if (res && res.ok()) return res;
      } catch (e) {}
      try {
        const res2 = await this.request.post(url, { data: { id } });
        if (res2 && res2.ok()) return res2;
      } catch (e) {}
    }
    return null;
  }
}

module.exports = { ProductService };
