class PurchaseService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async purchase(orderData) {
    return this.request.post(`${this.baseURL}/purchase`, { data: orderData });
  }
}

module.exports = { PurchaseService };
