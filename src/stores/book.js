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
    async searchBooks(searchTerm) {
      try {
        this.loading = true
        await BookService.searchBooks(searchTerm)
      } catch (error) {
        console.error('Error searching books:', error)
        this.error = error.message || 'Failed to search books'
      } finally {
        this.loading = false
      }
    },

    getBooks() {
      return this.books
    }
  }
})
