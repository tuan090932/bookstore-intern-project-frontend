import { defineStore } from 'pinia'
import searchService from '@/services/search.service'

export const useSearchStore = defineStore({
  id: 'searchStore',
  state: () => ({
    searchs: [],
    loading: false,
    error: null,
    total: 0,
    perPage: 10,
    currentPage: 1
  }),
  actions: {

    // This method will be used to search for books
    async getSearchBook(searchTerm, currentPage = 1, perPage = 10) {
      try {
        this.loading = true
        const results = await searchService.searchBooks(searchTerm, currentPage, perPage) // Call the searchBooks method from the searchService
        this.searchs = results.data
        this.total = results.total
        this.perPage = perPage
        this.currentPage = currentPage
      } catch (error) {
        console.error('Error searching books:', error)
        this.error = error.message || 'Failed to search books'
      } finally {
        this.loading = false
      }
    },

    getSearchs() {
      return this.searchs
    },

    removeSearchs() {
      this.searchs = []
    }
  }
})
