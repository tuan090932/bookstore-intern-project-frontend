import api from './api.service'

const API_URL = 'auth/'

class AuthService {
  async register(name, email, password, confirmPassword) {
    const response = await api.post(API_URL + 'register', {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    })
    return response.data
  }

  async login(email, password) {
    const response = await api.post(API_URL + 'login', {
      email,
      password
    })
    return response.data
  }

  async logout() {
    await api.post(API_URL + 'logout')
  }

  async getProfile() {
    const response = await api.get(API_URL + 'profile')
    return response.data
  }
}

export default new AuthService()
