import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('access_token') || ''
  }),
  actions: {
    setUser(user) {
      console.log('setUser', user);
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('access_token', token)
    },
    clearUser() {
      this.user = null
      this.token = ''
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    },
    loadUserFromLocalStorage() {
      const user = localStorage.getItem('user')
      try {
        if (user) {
          this.user = JSON.parse(user)
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
        // Clear invalid user data from localStorage
        localStorage.removeItem('user')
      }
    },
    async logout() {
      try {
        // Perform any additional logout logic here, such as clearing server-side sessions

        // Clear user data and token locally
        this.clearUser()
      } catch (error) {
        console.error('Failed to logout:', error)
      }
    }
  }
})
