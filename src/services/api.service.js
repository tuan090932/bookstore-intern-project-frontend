import axios from 'axios'
import { useUserStore } from '@/stores/user'
import AuthService from '@/services/auth.service'
import router from '@/router/index'

const api = axios.create({
  baseURL: 'http://localhost/api/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Add a request interceptor to attach the access_token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Attach token to the Authorization header
    }
    return config
  },
  (error) => {
    return Promise.reject(error) // Return error if request fails
  }
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const userStore = useUserStore()
    const status = error.response?.status || 500

    // If the error status is 401, the access_token has expired
    if (status === 401) {
      try {
        // Refresh the access_token using the refresh_token
        const response = await AuthService.refreshToken(userStore.refreshToken)
        const { access_token, refresh_token } = response.data

        // Update the access_token and refresh_token in the user store
        userStore.setToken(access_token)
        userStore.setRefreshToken(refresh_token)

        // Retry the original request with the new access_token
        error.config.headers['Authorization'] = `Bearer ${access_token}`
        return api(error.config)
      } catch (refreshError) { // If the refresh token has expired, clear the user store and redirect to the login page
        userStore.clearUser()
        router.push('/login')
      }
    } else if (status === 403) {
      alert('You are forbidden to access this resource.')
    } else if (status === 411) {
      alert('Your login session has ended, please log in again.')
      userStore.clearUser()
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default api
