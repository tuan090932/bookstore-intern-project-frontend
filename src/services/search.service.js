import api from './api.service'

const API_URL = 'books/'

class SearchService {

  // This method will be used to search for books
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
