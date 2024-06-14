// auth.service.js

import api from './api.service';

const API_URL = 'auth/';

class AuthService {
  async register(name, email, password, confirmPassword) {
    const response = await api.post(API_URL + 'register', {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    });
    return response.data;
  }
}

export default new AuthService();
