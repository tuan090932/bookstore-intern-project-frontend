// src/store/bookStore.js
import { defineStore } from 'pinia'
import BookService from '@/services/book.service'

export const useBookStore = defineStore({
  id: 'bookStore',
  state: () => ({
    books: [],
    loading: false,
    error: null
  }),
  actions: {

    // This method will be used to fetch all books
    async fetchBooks() {
      try {
        this.loading = true
        const books = await BookService.getAllBooks()
        this.books = books
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = error.message || 'Failed to fetch books'
      } finally {
        this.loading = false
      }
    },

    // This method will be used to fetch book details
    async fetchBookDetails(bookId) {
      try {
        this.loading = true
        const book = await BookService.getBookDetails(bookId)
        return book // Return the book details to be handled in the component
      } catch (error) {
        console.error('Error fetching book details:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    getBooks() {
      return this.books
    }
  }
})
