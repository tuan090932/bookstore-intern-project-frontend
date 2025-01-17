import api from './api.service'

const API_URL = 'books/'

class BookService {

  //Fetch the details of a specific book by its ID
  async getBookDetails(bookId) {
    const response = await api.get(`${API_URL}${bookId}`)
    return response.data
  }
  // Fetch details of all books
  async getAllBooks() {
    const response = await api.get(API_URL)
    return response.data
  }

  // Search for books by a search term
  async searchBooks(searchTerm) {
    const response = await api.get(`${API_URL}search`, {
      params: {
        query: searchTerm
      }
    })
    return response.data
  }

  // Fetch books by a specific author's ID
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
  
  // Fetch books by a specific category's ID
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
