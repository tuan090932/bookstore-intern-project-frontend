import api from './api.service'

const API_URL = 'books/'

class SearchService {
  async searchBooks(searchTerm) {
    const response = await api.get(`${API_URL}search`, {
      params: {
        query: searchTerm
      }
    })
    return response.data
  }
}

export default new SearchService()
