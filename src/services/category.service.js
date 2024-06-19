import api from './api.service'

const API_URL = 'categories/'

class CategoryService {
  async getCategories() {
    const response = await api.get(`${API_URL}`)
    return response.data
  }
}

export default new CategoryService()
