import api from './api.service'

const API_URL = 'books/'

class SearchService {

  // This method will be used to search for books
  async searchBooks(searchTerm, currentPage, perPage) {
    const response = await api.get(`${API_URL}search`, {
      params: {
        query: searchTerm,
        page: currentPage,
        per_page: perPage
      }
    })
    return response.data
  }
}

export default new SearchService()
