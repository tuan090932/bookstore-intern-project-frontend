import api from './api.service'

const API_URL = 'books/'

class BookService {
  async getBookDetails(bookId) {
    try {
      const response = await api.get(`${API_URL}${bookId}`)
      return response.data
    } catch (error) {
      console.error('Error getting book details:', error)
      throw error
    }
  }
  
  async getAllBooks() {
    try {
      const response = await api.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Error getting all books:', error)
      throw error
    }
  }

  async getBookByAuthor(authorId) {
    try {
      const params = new URLSearchParams({
        author_id: authorId,
      });
      const response = await api.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting book by author:', error);
      throw error;
    }
  }
  
  async getBookByCategory(categoryId) {
    try {
      const params = new URLSearchParams({
        category_id: categoryId,
      });
      const response = await api.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting book by author:', error);
      throw error;
    }
  }
}

export default new BookService()
