class AuthService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async login(username, password) {
    return this.request.post(`${this.baseURL}/login`, { data: { username, password } });
  }

  async signup(username, password) {
    return this.request.post(`${this.baseURL}/signup`, { data: { username, password } });
  }
}

module.exports = { AuthService };
