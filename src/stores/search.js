import { defineStore } from 'pinia'
import searchService from '@/services/search.service'

export const useSearchStore = defineStore({
  id: 'searchStore',
  state: () => ({
    searchs: [],
    loading: false,
    error: null
  }),
  actions: {
    async getSearchBook(searchTerm) {
      try {
        this.loading = true
        console.log(searchTerm);
        const results = await searchService.searchBooks(searchTerm)
        this.searchs = results
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
