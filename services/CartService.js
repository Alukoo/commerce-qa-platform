class CartService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async addToCart(productId, quantity = 1) {
    return this.request.post(`${this.baseURL}/addtocart`, { data: { productId, quantity } });
  }

  async viewCart() {
    return this.request.post(`${this.baseURL}/viewcart`, { data: {} });
  }

  async deleteItem(itemId) {
    return this.request.post(`${this.baseURL}/deleteitem`, { data: { id: itemId } });
  }
}

module.exports = { CartService };
