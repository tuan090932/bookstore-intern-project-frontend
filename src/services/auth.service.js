import api from './api.service';

const API_URL = 'auth/';

class AuthService {
  async register(userName, name, email, password, confirmPassword) {
    const response = await api.post(API_URL + 'register', {
      user_name: userName,
      name,
      email,
      password,
      password_confirmation: confirmPassword
    });
    return response.data;
  }

  async login(loginField, password) {
    const response = await api.post(API_URL + 'login', {
      [loginField.includes('@') ? 'email' : 'user_name']: loginField,
      password
    });
    return response.data;
  }
  
  async logout(token) {
    await api.post(API_URL + 'logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getProfile(token) {
    const response = await api.get(API_URL + 'profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default new AuthService();
