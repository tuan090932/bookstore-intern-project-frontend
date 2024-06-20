import api from './api.service'

const API_URL = 'books/'

class BookService {
  async getBookDetails(bookId) {
    const response = await api.get(`${API_URL}${bookId}`)
    return response.data
  }
  
  async getAllBooks() {
    const response = await api.get(API_URL);
    return response.data;
  }
}

export default new BookService()
